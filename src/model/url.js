const {action,autorun}=require("mobx");
const {parseRoute,setHashTag}=require("../unit/hashtag");
const {packBits,unpackBits}=require("../unit/bitstr");
const corpora=require("./corpora");
const address=require("./address");
const mode=require("./mode");
const searchresult=require("./searchresult");
const excerpt=require("./excerpt");
const filter=require("./filter");
const getDefaultCorpus=function(corpora){
	return Object.keys(corpora)[0];
}
var updating=false;
var synced=false;
const execURL=action((force)=> {
	if (updating && !force)return;
	console.log("execURL")

	var hash=window.location.hash;
	if (hash.match(/%[0-9A-Fa-f]/)) {
		hash=decodeURIComponent(hash);
	}
	const defaultCorpus=getDefaultCorpus(corpora.store.corpora);
	const urlparams=parseRoute(hash);
	const corpus=urlparams.c||defaultCorpus;
	const a=urlparams.a;
	const q=urlparams.q;
	const m=urlparams.m;
	const excludes=unpackBits(urlparams.x);
	filter.setExcludes(excludes);
	const n=parseInt(urlparams.n,10)||0;
	if (a) {
		address.setMain(a);	
	} 

	if (corpus!==corpora.store.active || !corpora.store.cor()) {
		corpora.open(corpus,true,function(){
			
			if (!synced) syncURL();
			
			if (q) {
				searchresult.setQ(q,function(){
					excerpt.showExcerpt(n);
					mode.setMode(m);
				});
			} else {
				mode.setMode(m);
			}
		});	
	} else {
		if (searchresult.store.q!==q){
			searchresult.setQ(q,function(){
				excerpt.showExcerpt(n);
				mode.setMode(m);
			});			
		} else {
			mode.setMode(m);
		}
	}
});
const updateUrl=function(urlparams){
	updating=true;

	console.log("update url",urlparams)
	setHashTag(urlparams);
	setTimeout(function(){
		updating=false;	
	},300);
	
}
var urlupdater=null;
const syncURL=function(){
	const execurl=function(){
		execURL();
	}
	window.removeEventListener('hashchange',execurl);
	window.addEventListener('hashchange', execurl);
	synced=true;
	autorun(()=>{
		const x=packBits(filter.store.asArray);
		const urlparams={
			q:searchresult.store.q,
			a:address.store.main,
			r:address.store.aux,
			l:mode.store.layout,
			m:mode.store.mode,
			c:corpora.store.active,
			e:excerpt.store.extra,
			n:excerpt.store.now,
			x
		};

		clearTimeout(urlupdater);
		urlupdater=setTimeout(updateUrl.bind(this,urlparams),1000);
	});
}
module.exports={execURL};