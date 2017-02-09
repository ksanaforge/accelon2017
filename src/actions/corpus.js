const SET_ACTIVE_CORPUS="SET_ACTIVE_CORPUS";

const setActiveCorpus=function(corpus){
	return {type:SET_ACTIVE_CORPUS, corpus};
}
module.exports={SET_ACTIVE_CORPUS,setActiveCorpus}
