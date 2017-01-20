const UPDATE_PARAMS_FROM_URL="UPDATE_PARAMS_FROM_URL";
const SET_PARAMS="SET_PARAMS";
const EXCLUDE = 'EXCLUDE';//already defined in filter.js
const {_search}=require("./search");
const {packBits,unpackBits}=require("../unit/bitstr");

//better in filter.js , but filter.js need params.js, move here to prevent circular dependency
const setExcludeByStr=function(str,dispatch,getState){
	const groups=unpackBits(str,true);
	const corpus=getState().activeCorpus;
	dispatch({type:EXCLUDE,corpus,groups});
}

function updateParams() {
	const params=parseRoute(window.location.hash);

	return (dispatch,getState) =>{
		dosearch(getState().activeCorpus,params.q||"",dispatch,getState);
		if (params.ex && params.ex!==getState().params.ex) {
			setExcludeByStr(params.ex,dispatch,getState);
		}
		dispatch(Object.assign({type:"UPDATE_PARAMS_FROM_URL"},params));
	}
}

function dosearch(corpus,q,dispatch,getState){
	if (getState().params.q!==q) {
		_search(corpus,q,dispatch,getState);
	}
}
function parseRoute(route){
	var regex = /[?#&]([^=#]+)=([^&#]*)/g, params = {}, match ;
	while(match = regex.exec(route)) {
	  params[match[1]] = match[2];
	}
	return params;
}

function setParams(newparams){
	var params=parseRoute(window.location.hash);
	var key;
	for (key in newparams) {
		params[key]=newparams[key];
	}
	var p=[];
	for (key in params) {
		if (params[key]) p.push(key+"="+params[key]);
	}
	window.location.hash=p.join("&");
	return {type:"SET_PARAMS"};
}

function setMode(m) {
	return setParams({m});
}

function setQ(q){
	return (dispatch,getState) =>{
		dosearch(getState().activeCorpus,q,dispatch,getState);
		dispatch(setParams({q,m:1}));
	}
}

module.exports={UPDATE_PARAMS_FROM_URL,updateParams,setParams,setQ, setMode}