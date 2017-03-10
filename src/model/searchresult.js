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
	extendObservable(this,{
		matches:[],
		timer:null,
		now:0,
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
    	},1);  	
    	return;
	}

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