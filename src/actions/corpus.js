const SET_ACTIVE_CORPUS="SET_ACTIVE_CORPUS";
const CORPUS_OPEN="CORPUS_OPEN";
const CORPUS_FAIL="CORPUS_FAIL";
const ksanaCorpus=require("ksana-corpus");
const {connectCorpus}=require("../unit/connect");

const {EXCERPTVIEW}=require("./params");
const {_search}=require("./search");
const {SET_PARAMS}=require("../actions/params");
const {setExcludeByStr}=require("./filter");
const {_showExcerpt}=require("./excerpt");

const searchq=function(corpus,params,dispatch,getState){
	_search(corpus,params.q||"",dispatch,getState,function(){
			const m=parseInt(params.m)||0;
			const p=getState().params;
			if (params.ex && params.ex!==p.ex) {
				setExcludeByStr(params.ex,dispatch,getState);
			}
			if (m===EXCERPTVIEW) {
				_showExcerpt(parseInt(params.n)||0,parseInt(params.e)||0,dispatch,getState);
			}
	});	
}	

const setActiveCorpus=function(corpus){
	return (dispatch,getState)=>{
		if (getState().corpora[corpus]) { //only when successfully opened
			dispatch({type:SET_ACTIVE_CORPUS, corpus});
		}
	}
}
const _openCorpus=function(corpus,setActive,params,dispatch,getState){
	const switchCorpus=function(){
		if (params) dispatch(Object.assign({type:SET_PARAMS},params));
		if (params) console.log('search',params.q)
		searchq(corpus,params||{},dispatch,getState);
		if (setActive) {
			dispatch(setActiveCorpus(corpus));
		}
	}
	if (getState().corpora[corpus]==undefined) {
		ksanaCorpus.openCorpus(corpus,function(err,cor){
			if (cor&& cor===getState().corpora[corpus]) return;
			if (cor) {
				dispatch({type:CORPUS_OPEN,corpus,cor});
				connectCorpus(cor,getState().corpora,dispatch);
				switchCorpus();
			} else {
				dispatch({type:CORPUS_FAIL,corpus});
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
module.exports={SET_ACTIVE_CORPUS,setActiveCorpus,openCorpus,_openCorpus,CORPUS_FAIL,CORPUS_OPEN};