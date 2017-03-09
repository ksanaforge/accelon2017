const {extendObservable,action,autorun}=require("mobx");
const corpora=require("./corpora");
const Store=function() {
	extendObservable(this,{
		filters:{},
		get active () {
			return this.filters[corpora.store.active] ||{};
		},
		get asArray(){
			const active=this.filters[corpora.store.active];
			const out=[];
			for (var i in active) {
				out[i]=active[i];
			}
			return out;
		}
	})
};
const store= new Store;
const setExcludes=action(excludes=>{
	const ex={};
	if (excludes instanceof Array) {
		for (var i=0;i<excludes.length;i++) {
			ex[i]=excludes[i];
		}
	} else {
		ex=excludes;
	}
	const corpus=corpora.store.active;
	store.filters[corpus]=ex;
	store.filters=Object.assign({},store.filters);	
})
const setExclude=action((group,value)=>{
	const corpus=corpora.store.active;
	if (!store.filters[corpus]){
		store.filters[corpus]={}
	}
	const excludes=Object.assign({},store.filters[corpus]);
	if (group instanceof Array) {
		for (var i=0;i<group.length;i++) {
			excludes[group[i]]=value;
		}
	} else {
		excludes[group]=value;			
	}
	while(excludes.length && !excludes[excludes.length-1]) excludes.pop();

	store.filters[corpus]=excludes;
	store.filters=Object.assign({},store.filters);
})

const includeAll=action(()=>{
	const corpus=corpora.store.active;
	store.filters=Object.assign({},store.filters,{[corpus]:{}});
});
const excludeAll=action(()=>{
	const corpus=corpora.store.active;
	const cor=corpora.store.cor(corpus);
	if (!cor)return;
	const groups=cor.groupNames().map(()=>1);

	while(groups.length && !groups[groups.length-1]) groups.pop();
	const excludes={};
	for (var i in groups) excludes[i]=groups[i];
	store.filters=Object.assign({},store.filters,{[corpus]:excludes});
});
autorun(()=>{
	//console.log("filters",store.filters,store.active)
})
module.exports={store, includeAll, excludeAll,setExclude,setExcludes};