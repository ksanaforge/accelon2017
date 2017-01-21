const  { UPDATE_PARAMS_FROM_URL } = require('../actions/params');
const initState={
	q:"",
	m:0, //modes, see mainscreen
	ex:"" //exclude book bits
}

module.exports=function params(state = initState, action = {}) {
  switch (action.type) {
  case UPDATE_PARAMS_FROM_URL:
		var newstate=Object.assign({},action);
		delete newstate.type;
		if (typeof newstate.m!=="undefined") newstate.m=parseInt(newstate.m);
		return newstate;
  default:
    return state;
  }
}