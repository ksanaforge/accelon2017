const UPDATE_PARAMS_FROM_URL="UPDATE_PARAMS_FROM_URL";
const SET_PARAMS="SET_PARAMS"
const {_search}=require("./search");

function updateParams(params) {
	return (dispatch,getState) =>{
		dosearch(getState().activeCorpus,params.q||"",dispatch,getState);
		dispatch(Object.assign({type:"UPDATE_PARAMS_FROM_URL"},params));
	}
}

function dosearch(corpus,q,dispatch,getState){
	if (getState().params.q!==q) {
		_search(corpus,q,dispatch,getState);
	}
}

function setParams(params){
	var p=[];
	for (key in params) {
		p.push(key+"="+params[key]);
	}
	window.location.hash=p.join("&");
	return {type:"SET_PARAMS"};
}

function setQ(q){
	return (dispatch,getState) =>{
		dosearch(getState().activeCorpus,q,dispatch,getState);
		dispatch(setParams({q,m:1}));
	}
}
function setMode(m) {
	return setParams({m});
}
module.exports={UPDATE_PARAMS_FROM_URL,updateParams,setParams,setQ, setMode}