const {extendObservable,action,autorun}=require("mobx");
const corpora=require("./corpora");
const Store=function() {
	extendObservable(this,{
		markups:{}
	})
};
const store= new Store;
const setMarkup=action(function(corpus,name,markups){
	if (!store.markups[corpus]){
		store.markups[corpus]={}
	}
	store.markups[corpus][name]=markups;
	store.markups=Object.assign({},store.markups);
});
module.exports={store,setMarkup};