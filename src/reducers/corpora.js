const {CORPUS_OPEN,CORPUS_FAIL,SET_CORPORA}=require("../actions/corpus");

const initialstate={};//"yinshun":undefined,"taisho":undefined};

module.exports=function corpora(state = {} , action = {}) {
	if (action.type===CORPUS_OPEN) {
		if (action.cor==state[action.corpus])return state;
		const newstate=Object.assign({},state,{[action.corpus]:action.cor});
		console.log("new corpus open",newstate)
		return newstate;
	} else if (action.type===CORPUS_FAIL) {
		const newstate=Object.assign({},state,{[action.corpus]:null});
		return newstate;
	} else if (action.type===SET_CORPORA) {
		return action.corpora || state;
	}
	return state;
}