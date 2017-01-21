const {setExcludeByStr}=require("./filter");
const {_showExcerpt}=require("./excerpt");
const {parseRoute}=require("../unit/hashtag");
const {EXCERPTVIEW}=require("./params");
const {_search}=require("./search");

function dosearch(corpus,q,dispatch,getState,cb){
	if (getState().params.q!==q) {
		_search(corpus,q,dispatch,getState,cb);
	} else {
		cb&&cb();
	}
}

const execURL=function() {
	return (dispatch,getState) =>{

		const params=parseRoute(window.location.hash);
		const p=getState().params;

		dosearch(getState().activeCorpus,params.q||"",dispatch,getState,function(){
			dispatch(Object.assign({type:"UPDATE_PARAMS_FROM_URL"},params));
			if (params.ex && params.ex!==p.ex) {
				setExcludeByStr(params.ex,dispatch,getState);
			}
			if (parseInt(params.m)==EXCERPTVIEW) {
				_showExcerpt(dispatch,getState);
			}
		});
	}
}
module.exports={execURL};