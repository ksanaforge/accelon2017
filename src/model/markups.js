const {extendObservable,action,autorun}=require("mobx");
const Store=function() {
	this.markups={};
	extendObservable(this,{
		age:{}
	})
};

const store= new Store;
const setMarkup=action(function(corpus,name,markups){
	if (!store.markups[corpus]){
		store.markups[corpus]={}
	}
	store.markups[corpus][name]=markups;
	store.markups=Object.assign({},store.markups);
	store.age[corpus]=new Date();
	store.age=Object.assign({},store.age);
});


const {loadMarkup}=require("../unit/markup");
const loadExternalMarkup=function(meta,json,cor){
	const markups=loadMarkup(cor,json);
	setMarkup(cor.id,meta.type,markups);
}
module.exports={store,setMarkup,loadExternalMarkup};