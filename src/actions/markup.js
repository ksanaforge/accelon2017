const SET_MARKUPS="SET_MARKUPS";
const WRONG_CORPUS="WRONG_CORPUS";
const {openCorpus}=require("ksana-corpus");
const {loadMarkup}=require("../unit/markup");
const loadExternalMarkup=function(json,corpus){
	return (dispatch,getState)=>{
		corpus=corpus||getState().activeCorpus;
		const cor=openCorpus(corpus);
		if (!cor)return {type:WRONG_CORPUS,corpus};

		const markups=loadMarkup(cor,json);

		dispatch({type:SET_MARKUPS,corpus, markups});
	}
}
module.exports={loadExternalMarkup,SET_MARKUPS};