const {observable,action}=require("mobx");
const filter=require("./filter");
const corpora=require("./corpora");
const kcs=require("ksana-corpus-search");
const store=observable({
	searching:false,
	filtered:[],
	matches:[],
	phrasepostings:[],
	timer:null,
	grouphits:[],
	now:0,
	q:""
})

function setQ(q){
  if (!q || q==store.q)return;

  var searchtimer=setInterval(()=>{
  	const cor=corpora.store.cor;
  	const corpus=corpora.store.active;
  	if (!cor) return;

    if (store.searching) {
      console.log("wait searching",q);
      return;
    }
    store.searching=true;
    clearInterval(searchtimer);

    kcs.search(cor,q,function(result){
    	const {matches,phrasepostings,timer}=result;
		if (matches) {
	        const excludes=(filter.store[corpus]||{}).excludes;
	        const filtered=kcs.filterMatch(cor,result.matches,excludes)||[];
	        const grouphits=kcs.groupStat(filtered,cor.groupTPoss());
	        grouphits.shift();
	        store.filtered=filtered;
	        store.searching=false;
	        store.phrasepostings=phrasepostings;
	        store.matches=matches;
	        store.timer=timer;
	        store.grouphits=grouphits;
	        store.q=q;
    	  }
    });
  },50);
}

module.exports={store,setQ};