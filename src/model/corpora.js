const {extendObservable,action}=require("mobx");
const expandVariant=require("ksana-unihan-variant").expandVariant;

var openCorpus=null
try {
	openCorpus=require("ksana-corpus").openCorpus;
} catch(e){
	openCorpus=require("ksana-corpus-lib").openCorpus;
}

const {connectCorpus}=require("../unit/connect");

const Store=function() {
	extendObservable(this,{
		corpora:{},
		active:'',
	})
	this.cor=function (corpus) {
		if (this.corpora[corpus||this.active]) {
			return openCorpus(corpus||this.active);
		}
	}

};

const store=new Store;
const openedCors=function(){
	const out={};
	for (var i in store.corpora){
		if (store.corpora[i]) {
			out[i]=openCorpus(i);
		}
	}
	return out;
}
const open=(corpus,setActive,cb)=>{
	//console.log("open",corpus)
	const opts={expandVariant};
	openCorpus(corpus,opts,action((err,cor)=>{
		if (err) {

		} else {
			connectCorpus(cor);
			if (setActive) store.active=corpus;
			store.corpora[cor.id]=true;
			store.corpora=Object.assign({},store.corpora);
			cb&&cb();
		}
	}))
};

const setActive=action(corpus=>{
	store.active=corpus;
});
const init=action((_corpora)=>{
	store.corpora=_corpora;
	//store.active=Object.keys(_corpora)[0]
});
module.exports={open,setActive,store,init,openedCors}