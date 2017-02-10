const initialState={};

const {SET_MARKUPS}=require("../actions/markup");
module.exports=function(state=initialState,action={}){
	if (action.type==SET_MARKUPS) {
		const payload=Object.assign({},action);
		delete payload.type;
		newstate=Object.assign({},state,{[action.corpus]:payload});
		console.log("SET_MARKUPS",newstate)
		return newstate;
	}
	return state;
}