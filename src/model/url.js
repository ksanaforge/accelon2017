const {action,autorun}=require("mobx");
const {parseRoute,setHashTag}=require("../unit/hashtag");

const corpora=require("./corpora");
const address=require("./address");
const mode=require("./mode");
const searchresult=require("./searchresult");

const getDefaultCorpus=function(corpora){
	return Object.keys(corpora)[0];
}
var updating=false;
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
	if (corpus!==corpora.store.active || !corpora.store.cor) {
		corpora.open(corpus,true,function(){
			console.log("open",corpus)
			mode.setMode(m);
			address.setMain(a);
			searchresult.setQ(q);
		});
	} else {
		mode.setMode(urlparams.m);
		searchresult.setQ(urlparams.q);
	}
});

autorun(()=>{
	updating=true;
	console.log("update url")
	const urlparams={
		q:searchresult.store.q,
		a:address.store.main,
		r:address.store.aux,
		l:mode.store.layout,
		m:mode.store.mode,
		c:corpora.store.active
	};
	setHashTag(urlparams);
	setTimeout(function(){
		updating=false;
	},1)
});
module.exports={execURL};