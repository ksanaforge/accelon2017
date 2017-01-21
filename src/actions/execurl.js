const {setExcludeByStr}=require("./filter");
const {_showExcerpt}=require("./excerpt");
const {parseRoute}=require("../unit/hashtag");
const {EXCERPTVIEW}=require("./params");
const {_search}=require("./search");
const {SET_PARAMS}=require("../actions/params");

const execURL=function() {
	return (dispatch,getState) =>{

		const params=parseRoute(window.location.hash);
		const p=getState().params;
		_search(getState().activeCorpus,params.q||"",dispatch,getState,function(){

			dispatch(Object.assign({type:SET_PARAMS},params));
			if (params.ex && params.ex!==p.ex) {
				setExcludeByStr(params.ex,dispatch,getState);
			}
			if (parseInt(params.m)==EXCERPTVIEW) {
				_showExcerpt(parseInt(params.n)||0,dispatch,getState);
			}
		});
	}
}
module.exports={execURL};