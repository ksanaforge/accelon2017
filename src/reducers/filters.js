const {UPDATE_EXCLUDE,INCLUDE_ALL,EXCLUDE}=require("../actions/filter");
const {UPDATE_HITS}=require("../actions/grouping");

module.exports=function articlegroup(state = {} , action = {}) {
	const A=action;
	var newstate=state;
	if (A.corpus && !state[A.corpus]) {
		newstate=Object.assign({},state,{[A.corpus]:{exclude:[]}});
	}
	
	if (UPDATE_HITS===A.type)  {
		throw "not used"
		const exclude=newstate[A.corpus].exclude;
		newstate=Object.assign({},newstate,{[A.corpus]:{exclude}});
	} else if (UPDATE_EXCLUDE===A.type) {
		const exclude=newstate[A.corpus].exclude.slice();
		if (A.group instanceof Array) {
				for (var i=0;i<A.group.length;i++) {
						exclude[A.group[i]]=A.value;
				}
		} else {
				exclude[A.group]=A.value;			
		}

		while(exclude.length && !exclude[exclude.length-1]) exclude.pop();

		newstate=Object.assign({},newstate,{[A.corpus]:{exclude}});
	} else if (INCLUDE_ALL===A.type) {
		newstate=Object.assign({},newstate,{[A.corpus]:{exclude:[]}});
	} else if (EXCLUDE===A.type) {
		const exclude=A.groups;
		while(exclude.length && !exclude[exclude.length-1]) exclude.pop();
		newstate=Object.assign({},newstate,{[A.corpus]:{exclude}});
	}

	return newstate;
}
