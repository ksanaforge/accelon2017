const {setExcludeByStr}=require("./filter");
const {_showExcerpt}=require("./excerpt");
const {parseRoute}=require("../unit/hashtag");
const {TOCVIEW,EXCERPTVIEW}=require("./params");
const {_search}=require("./search");
const {SET_PARAMS}=require("../actions/params");

const execURL=function() {
	return (dispatch,getState) =>{

		var hash=window.location.hash;
		if (hash.match(/%[0-9A-Fa-f]/)) {
			hash=decodeURIComponent(hash);
		}
		const params=parseRoute(hash);
		const p=getState().params;
		const m=parseInt(params.m);
		_search(getState().activeCorpus,params.q||"",dispatch,getState,function(){

			dispatch(Object.assign({type:SET_PARAMS},params));
			if (params.ex && params.ex!==p.ex) {
				setExcludeByStr(params.ex,dispatch,getState);
			}

			if (m===EXCERPTVIEW) {
				_showExcerpt(parseInt(params.n)||0,dispatch,getState);
			}

			
		});
	}
}
module.exports={execURL};