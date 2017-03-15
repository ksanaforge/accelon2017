const {extendObservable,action}=require("mobx");
const filter=require("./filter");
const corpora=require("./corpora");
var search=null,filterMatch=null,groupStat=null;
try {
	search=require("ksana-corpus-search").search;
	groupStat=require("ksana-corpus-search").groupStat;
	filterMatch=require("ksana-corpus-search").filterMatch;
} catch(e){
	search=require("ksana-corpus-lib").search;
	groupStat=require("ksana-corpus-lib").groupStat;
	filterMatch=require("ksana-corpus-lib").filterMatch;
}

const Store=function() {
	this.phrasepostings=[];
	this.scores=[];
	this.matches=[];
	extendObservable(this,{
		matches:[],
		timer:null,
		q:"",
		fuzzy:false,
		get filtered(){
			const cor=corpora.store.cor();
			const corpus=corpora.store.active;
			const excludes=filter.store.asArray||[];
			return filtered=filterMatch(cor,this.matches,excludes)||[];
		},
		get grouphits(){
			const cor=corpora.store.cor();
			const grouphits=groupStat(this.filtered,cor.groupTPoss());
			grouphits.shift();
			return grouphits;
		}
	});
}
const store=new Store();
var searching=false;
const setResult=action(function(opts){
	store.phrasepostings=opts.phrasepostings;
	store.matches=opts.matches;
	store.scores=opts.scores;
	store.timer=opts.timer;
	store.q=opts.q;
	store.fuzzy=opts.fuzzy;
	setTimeout(action(function(){
		//reset n
		const excerpt=require("./excerpt");
		if (!excerpt.store.now) excerpt.store.now=0;
	}),1)

});
const clear=action(function(){
	store.phrasepostings=[];
	store.matches=[];
})
var waitsearch=0;
function setQ(q,cb){
	if (!q || q==store.q && store.matches.length) {
		setTimeout(function(){
			cb&&cb();
		},10);  	
		return;
	}
	action(function(){
		store.q=q; //update q immediately
		if (!q) clear();
	})();

  var searchtimer=setInterval(()=>{
  	const cor=corpora.store.cor();
  	const corpus=corpora.store.active;
  	if (!cor) return;
    if (searching) {
	  waitsearch++;
	  if (waitsearch>50) clearInterval(searchtimer);
      return;
    }
  	waitsearch=0;
    searching=true;
    clearInterval(searchtimer);
    search(cor,q,function(result){
    	const {matches,phrasepostings,timer,fuzzy,scores}=result;
		if (matches) {
	        setResult({phrasepostings,matches,q,timer,fuzzy,scores});
	        searching=false;
	        setTimeout(function(){
	        	cb&&cb();
	        },1);
    	  }
    });
  },100);
}

module.exports={store,setQ,clear};