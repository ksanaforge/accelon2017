const initialState="yinshun";
const {SET_ACTIVE_CORPUS}=require("../actions/corpus");
module.exports=function(state=initialState,action={}){
	if (action.type==SET_ACTIVE_CORPUS) {
		if (action.corpus) return action.corpus;
	}
	return state;
}