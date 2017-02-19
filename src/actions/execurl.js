const {parseRoute}=require("../unit/hashtag");

const {searchq,_openCorpus,setActiveCorpus}=require("./corpus");

const {SET_PARAMS}=require("../actions/params");
const getDefaultCorpus=function(corpora){
	return Object.keys(corpora)[0];
}
const execURL=function() {
	return (dispatch,getState) =>{
		var hash=window.location.hash;
		if (hash.match(/%[0-9A-Fa-f]/)) {
			hash=decodeURIComponent(hash);
		}
		const defaultCorpus=getDefaultCorpus(getState().corpora);
		const params=parseRoute(hash);
		const p=getState().params;
		const corpus=params.c;
		if (params.c!=getState().activeCorpus) {
			const setActive=true;
			_openCorpus(params.c||defaultCorpus,setActive,params,dispatch,getState);
		} else {
			dispatch(Object.assign({type:SET_PARAMS},params));
			searchq(corpus,params||{},dispatch,getState);
		}
	}
}
module.exports={execURL};