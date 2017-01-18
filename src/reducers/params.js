const  { UPDATE_PARAMS_FROM_URL } = require('../actions/params');
const initState={
	q:""
}

module.exports=function params(state = initState, action = {}) {
  switch (action.type) {
  case UPDATE_PARAMS_FROM_URL:
		var newstate=Object.assign({},action);
		delete newstate.type;
		return newstate;
  default:
    return state;
  }
}