const SEARCHING = 'SEARCHING';
const SEARCH_DONE = 'SEARCH_DONE';

const {groupStat}=require("ksana-corpus-search");
const {_filterMatch}=require("./filter");

const kcs=require("ksana-corpus-search");
var searching=false;
function _search(corpus,q,dispatch,getState,cb){
  if (!corpus)return;
  var searchtimer=setInterval(()=>{

  	const cor=getState().corpora[getState().activeCorpus];
  	if (!cor) return;

    if (searching) {
      console.log("wait searching",q);
      return;
    }
    clearInterval(searchtimer);
    dispatch({type:SEARCHING,corpus,q});
    
    kcs.search(cor,q,function(result){
    	const {matches,phrasepostings,timer}=result;  
      if (matches) {
        const exclude=(getState().filters[corpus]||{}).exclude;
        const filtered=_filterMatch(cor,result.matches,exclude)||[];
        const grouphits=groupStat(filtered,cor.groupTPoss());
        grouphits.shift();
        dispatch({type:SEARCH_DONE, corpus, q , 
          matches,phrasepostings,timer, grouphits , filtered});        
      }
      searching=false;
      cb&&cb();
    });
  },50);
}

function search(q) {
  return (dispatch,getState) => {
  	const corpus=getState().activeCorpus;  	
    _search(corpus,q,dispatch,getState);
  };
}

module.exports={search,_search,SEARCH_DONE,SEARCHING};