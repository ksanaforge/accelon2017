const SEARCHING = 'SEARCHING';
const SEARCH_DONE = 'SEARCH_DONE';
const {groupHits}=require("./grouping");
const {openCorpus}=require("ksana-corpus");


const kcs=require("ksana-corpus-search");

function _search(corpus,q,dispatch,getState,cb){
  if (!corpus)return;
  var searchtimer=setInterval(()=>{

  	const cor=openCorpus(corpus);
  	if (!cor) return;
  	
    if (getState().searchresult.searching) {
      console.log("wait searching",getState().searchresult.q);
      return;
    }
    clearInterval(searchtimer);
    dispatch({type:SEARCHING,corpus,q});

    kcs.search(cor,q,function(result){
    	const {matches,phrasepostings,timer}=result;
      
      const exclude=(getState().filters[corpus]||{}).exclude;
      dispatch({type:SEARCH_DONE, corpus, q , matches,phrasepostings,timer });
      
      groupHits(corpus,result,dispatch);
      //updateResultView(query,dispatch,getState().excerpts);
      cb&&cb();
    });
  },10);
}

function search(q) {
  return (dispatch,getState) => {
  	const corpus=getState().activeCorpus;  	
    _search(corpus,q,dispatch,getState);
  };
}

module.exports={search,_search,SEARCH_DONE,SEARCHING};