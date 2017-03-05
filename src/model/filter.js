const {extendObservable,action,autorun}=require("mobx");
const corpora=require("./corpora");
const Store=function() {
	extendObservable(this,{
		filters:{},
		get active () {
			return this.filters[corpora.store.active] || {hits:[],excludes:{}};
		}
	})
};
const store= new Store;
const setExclude=action((group,value)=>{
	const corpus=corpora.store.active;
	if (!store.filters[corpus]){
		store.filters[corpus]={excludes:{},hits:[]}
	}
	const excludes=Object.assign({},store.filters[corpus].excludes);
	if (group instanceof Array) {
		for (var i=0;i<group.length;i++) {
			excludes[group[i]]=value;
		}
	} else {
		excludes[group]=value;			
	}

	while(excludes.length && !excludes[excludes.length-1]) excludes.pop();

	store.filters[corpus].excludes=excludes;
	store.filters=Object.assign({},store.filters);
})

const includeAll=action(()=>{
	const corpus=corpora.store.active;
	store.filters=Object.assign({},store.filters,{[corpus]:{excludes:{}}});
});
const excludeAll=action(()=>{
	const corpus=corpora.store.active;
	const cor=corpora.store.corpora[corpus];
	if (!cor)return;
	const groups=cor.groupNames().map(()=>1);

	while(groups.length && !groups[groups.length-1]) groups.pop();
	const excludes={};
	for (var i in groups) excludes[i]=groups[i];
	store.filters=Object.assign({},store.filters,{[corpus]:{excludes}});
});
autorun(()=>{
//	console.log("filters",store.filters,store.active)
})
module.exports={store, includeAll, excludeAll,setExclude};