const SET_ACTIVE_CORPUS="SET_ACTIVE_CORPUS";
const SET_CORPORA="SET_CORPORA";
const CORPUS_OPEN="CORPUS_OPEN";
const CORPUS_FAIL="CORPUS_FAIL";
const ksanaCorpus=require("ksana-corpus");
const {connectCorpus}=require("../unit/connect");

const {EXCERPTVIEW}=require("./params");
const {_search}=require("./search");
const {SET_PARAMS}=require("../actions/params");
const {setExcludeByStr}=require("./filter");
const {_showExcerpt}=require("./excerpt");

const setActiveCorpus=function(corpus){
	return (dispatch,getState)=>{
		if (getState().corpora[corpus]) { //only when successfully opened
			dispatch({type:SET_ACTIVE_CORPUS, corpus});
		}
	}
}
const _openCorpus=function(corpus,setActive,params,dispatch,getState){
	const switchCorpus=function(){
		if (setActive) {
			dispatch(setActiveCorpus(corpus));
		}
		searchq(corpus,params||{},dispatch,getState,function(){
			if (params) dispatch(Object.assign({type:SET_PARAMS},params));
		});
	}
	if (getState().corpora[corpus]==undefined) {
		ksanaCorpus.openCorpus(corpus,function(err,cor){
			if (cor&& cor===getState().corpora[corpus]) return;
			if (cor) {
				dispatch({type:CORPUS_OPEN,corpus,cor});
				connectCorpus(cor,getState().corpora,dispatch);
				switchCorpus();
			}
		})
	} else {
		switchCorpus();
	}
}

const openCorpus=function(corpus,setActive,params){
	return (dispatch,getState)=>{
		return _openCorpus(corpus,setActive,params,dispatch,getState);
	}
}
const setCorpora=function(corpora){
	return {type:SET_CORPORA,corpora}
}
module.exports={SET_ACTIVE_CORPUS,SET_CORPORA,CORPUS_FAIL,CORPUS_OPEN,
	setActiveCorpus,openCorpus,_openCorpus,searchq,setCorpora};