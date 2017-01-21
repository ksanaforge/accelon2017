/* call actions from url */

const parseRoute=function(route){
	var regex = /[?#&]([^=#]+)=([^&#]*)/g, params = {}, match ;
	while(match = regex.exec(route)) {
	  params[match[1]] = match[2];
	}
	return params;
}

const setHashTag=function(newparams){
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
}

module.exports={setHashTag,parseRoute};