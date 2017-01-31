const initialState={caretText:""};
const {SET_SELECTION}=require("../actions/selection");
module.exports=function selection(state = initialState ,  action = {}) {
	if (SET_SELECTION == action.type) {
		var newstate= Object.assign({},state,action);
		delete newstate.type;
		return newstate;
	}
	return state;
}