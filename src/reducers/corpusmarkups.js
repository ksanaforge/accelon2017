const initialState={};

const {SET_MARKUPS}=require("../actions/markup");
module.exports=function(state=initialState,action={}){
	if (action.type==SET_MARKUPS) {
		const payload=Object.assign({},action);
		delete payload.type;
		const corpusmarkup=state[action.corpus]||{};
		const newcorpusmarkup=Object.assign({},corpusmarkup,{[action.name]:action.markups});
		var newstate=Object.assign({},state,{[action.corpus]:newcorpusmarkup});
		console.log("SET_MARKUPS",newstate);
		return newstate;
	}
	return state;
}