const {extendObservable,action}=require("mobx");
const filter=require("./filter");
const corpora=require("./corpora");
var search=null,filterMatch=null,groupStat=null;

var search,groupState,filterMatch;
if (typeof KsanaCorpusSearch!=="undefined") {
	search=KsanaCorpusSearch.search;
	groupStat=KsanaCorpusSearch.groupStat;
	filterMatch=KsanaCorpusSearch.filterMatch;
} else {
	const KSANACORPUSSEARCH="ksana-corpus-search";
	search=require(KSANACORPUSSEARCH).search;
	groupStat=require(KSANACORPUSSEARCH).groupStat;
	filterMatch=require(KSANACORPUSSEARCH).filterMatch;
}

const Store=function() {
	this.phrasepostings=[];
	this.scores=[];
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
});
const clear=action(function(){
	store.phrasepostings=[];
	store.matches=[];
})
var waitsearch=0;
function setQ(q,cb){
	if (q==store.q && store.matches.length) {
		setTimeout(function(){
			cb&&cb();
		},10);  	
		return;
	}
	action(function(){
		if (!q) {
			clear();
			q="";
		}

		store.q=q; //update q immediately
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

    search(cor,q,function(result){
    	const {matches,phrasepostings,timer,fuzzy,scores}=result;
	        setResult({phrasepostings,matches,q,timer,fuzzy,scores});
	    searching=false;
	    clearInterval(searchtimer);
    	setTimeout(function(){
	     	cb&&cb();
	    },1);
    });
  },100);
}

module.exports={store,setQ,clear};