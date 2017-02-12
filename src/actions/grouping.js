const UPDATE_HITS="UPDATE_HITS";
const {groupStat}=require("ksana-corpus-search");

const groupHits=function(corpus,query,dispatch){
  const cor=getState().corpora[getState().activeCorpus];
  if (!cor) return;
	const hits=groupStat(query.matches,cor.groupTPoss());
	hits.shift();
	dispatch({type:UPDATE_HITS,corpus,hits});
}
module.exports={groupHits,UPDATE_HITS}