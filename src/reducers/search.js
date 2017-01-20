const {SEARCHING,SEARCH_DONE}=require("../actions/search");
const {SET_FILTERED}=require("../actions/filter");
const initialState={searching:false};
module.exports=function search(state=initialState,action={}){
	switch(action.type) {
		case SEARCHING:
			return {searching:true, q:action.q ,corpus:action.corpus};
		case SEARCH_DONE:
			var newstate=Object.assign({searching:false},action);
			delete newstate.type;
			return newstate;
		case SET_FILTERED:
			var newstate=Object.assign({},state);
			newstate.filtered=action.filtered;
			return newstate;
		default:
			return state;
	}
}