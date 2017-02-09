const {UPDATE_EXCLUDE,INCLUDE_ALL,EXCLUDE}=require("../actions/filter");
const {UPDATE_HITS}=require("../actions/grouping");

module.exports=function articlegroup(state = {} , action = {}) {
	const A=action;
	var newstate=state;
	if (A.corpus && !state[A.corpus]) {
		newstate=Object.assign({},state,{[A.corpus]:{hits:[],exclude:[]}});
	}
	
	if (UPDATE_HITS===A.type)  {
		const exclude=newstate[A.corpus].exclude;
		const hits=A.hits;
		newstate=Object.assign({},newstate,{[A.corpus]:{hits,exclude}});
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

		const hits=newstate[A.corpus].hits;
		newstate=Object.assign({},newstate,{[A.corpus]:{hits,exclude}});
	} else if (INCLUDE_ALL===A.type) {
		const hits=newstate[A.corpus].hits;
		newstate=Object.assign({},newstate,{[A.corpus]:{hits,exclude:[]}});
	} else if (EXCLUDE===A.type) {
		const hits=newstate[A.corpus].hits;			
		const exclude=A.groups;
		while(exclude.length && !exclude[exclude.length-1]) exclude.pop();
		newstate=Object.assign({},newstate,{[A.corpus]:{hits,exclude}});
	}

	return newstate;
}
