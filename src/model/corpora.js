const {extendObservable,action}=require("mobx");
const {openCorpus}=require("ksana-corpus")
const Store=function() {
	extendObservable(this,{
		corpora:{},
		active:'',
		get cor () {
			return this.corpora[this.active]
		}
	})
};

const store=new Store;
const open=action((corpus,setActive,cb)=>{
	openCorpus(corpus,(err,cor)=>{
		if (err) {

		} else {
			store.corpora[corpus]=cor;
			if (setActive) store.active=corpus;
			store.corpora=Object.assign({},store.corpora);
			cb&&cb();
		}
	})
});

const setActive=action(corpus=>{
	store.active=corpus;
});
const init=action((_corpora)=>{
	store.corpora=_corpora;
	store.active=Object.keys(_corpora)[0]
});
module.exports={open,setActive,store,init}