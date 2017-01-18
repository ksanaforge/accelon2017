const UPDATE_PARAMS_FROM_URL="UPDATE_PARAMS_FROM_URL";
const SET_PARAMS="SET_PARAMS"
function updateParams(params) {
	return Object.assign({type:"UPDATE_PARAMS_FROM_URL"},params);
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
	return setParams({q});
}
module.exports={UPDATE_PARAMS_FROM_URL,updateParams,setParams,setQ}