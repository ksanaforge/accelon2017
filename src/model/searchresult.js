const {extendObservable,action}=require("mobx");
const filter=require("./filter");
const corpora=require("./corpora");
const kcs=require("ksana-corpus-search");

const Store=function() {
	extendObservable(this,{
		matches:[],
		phrasepostings:[],
		timer:null,
		now:0,
		q:"",
		get filtered(){
			const cor=corpora.store.cor();
			const corpus=corpora.store.active;
			const excludes=filter.store.asArray||[];
			return filtered=kcs.filterMatch(cor,this.matches,excludes)||[];
		},
		get grouphits(){
			const cor=corpora.store.cor();
			const grouphits=kcs.groupStat(this.filtered,cor.groupTPoss());
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
	store.timer=opts.timer;
	store.q=opts.q;
});
const clear=action(function(){
	store.phrasepostings=[];
	store.matches=[];
})
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
      console.log("wait searching",q);
      return;
    }
    searching=true;
    clearInterval(searchtimer);
    kcs.search(cor,q,function(result){
    	const {matches,phrasepostings,timer}=result;
		if (matches) {
	        setResult({phrasepostings,matches,q,timer})
	        searching=false;
	        setTimeout(function(){
	        	cb&&cb();
	        },1);
    	  }
    });
  },50);
}

module.exports={store,setQ,clear};