const initialState={};

const {SET_MARKUPS}=require("../actions/markup");
module.exports=function(state=initialState,action={}){
	if (action.type==SET_MARKUPS) {
		newstate=Object.assign({},state,{[action.corpus]:action.markups});
		console.log("SET_MARKUPS",newstate)
		return newstate;
	}
	return state;
}