const  { SET_PARAMS} = require('../actions/params');

const initState={
	q:"",
	m:0, //modes, see mainscreen
	n:0, //showing
	ex:"" //exclude book bits
}

module.exports=function params(state = initState, action = {}) {
  switch (action.type) {
  case SET_PARAMS:
		var newstate=Object.assign({},state,action);
		delete newstate.type;
		if (typeof newstate.m!=="undefined") newstate.m=parseInt(newstate.m);
		if (typeof newstate.n!=="undefined") newstate.n=parseInt(newstate.n);
		return newstate;
  default:
    return state;
  }
}