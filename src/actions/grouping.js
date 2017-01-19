const UPDATE_HITS="UPDATE_HITS";
const {groupStat}=require("ksana-corpus-search");
const {openCorpus}=require("ksana-corpus");

const groupHits=function(corpus,query,dispatch){
  const cor=openCorpus(corpus);
  if (!cor) return;
	const hits=groupStat(query.matches,cor.groupTPoss());
	hits.shift();
	dispatch({type:UPDATE_HITS,corpus,hits});
}
module.exports={groupHits,UPDATE_HITS}