const {SEARCHING,SEARCH_DONE}=require("../actions/search");

const initialState={searching:false};
module.exports=function search(state=initialState,action={}){
	switch(action.type) {
		case SEARCHING:
			return {searching:true, q:action.q ,corpus:action.corpus};
			break;
		case SEARCH_DONE:
			var newstate=Object.assign({searching:false},action);
			delete newstate.type;
			return newstate;
			break;
		default:
			return state;
	}
}