const {setExcludeByStr}=require("./filter");
const {_showExcerpt}=require("./excerpt");
const {parseRoute}=require("../unit/hashtag");
const {TOCVIEW,EXCERPTVIEW}=require("./params");
const {_search}=require("./search");
const {SET_PARAMS}=require("../actions/params");
const {openCorpus}=require("ksana-corpus");
const {setActiveCorpus}=require("../actions/corpus");

const search=function(dispatch,getState,params){

	_search(getState().activeCorpus,params.q||"",dispatch,getState,function(){
			const m=parseInt(params.m)||0;
			const p=getState().params;
			dispatch(Object.assign({type:SET_PARAMS},params));
			if (params.ex && params.ex!==p.ex) {
				setExcludeByStr(params.ex,dispatch,getState);
			}
			if (m===EXCERPTVIEW) {
				_showExcerpt(parseInt(params.n)||0,parseInt(params.e)||0,dispatch,getState);
			}
		});	
}	
const execURL=function() {
	return (dispatch,getState) =>{
		var hash=window.location.hash;
		if (hash.match(/%[0-9A-Fa-f]/)) {
			hash=decodeURIComponent(hash);
		}
		const params=parseRoute(hash);
		const p=getState().params;
		const corpus=params.c;
		if (params.c!==p.corpus) {
			openCorpus(params.c,function(err){
				if (!err) {
					dispatch(setActiveCorpus(params.c));
					search(dispatch,getState,params);
				}
			})
		} else {
			search(dispatch,getState,params);
		}


	}
}
module.exports={execURL};