const {extendObservable,action}=require("mobx");
const expandVariant=require("ksana-unihan-variant").expandVariant;

var openCorpus,closeCorpus;
if (typeof KsanaCorpus!=="undefined") {	
	openCorpus=KsanaCorpus&&KsanaCorpus.openCorpus;
	closeCorpus=KsanaCorpus&&KsanaCorpus.closeCorpus;
} else {
	openCorpus=require("ksana-corpus").openCorpus;
	closeCorpus=require("ksana-corpus").closeCorpus;
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
const close=action((id)=>closeCorpus(id));
const open=(corpus,setActive,cb)=>{
	//console.log("open",corpus)
	const opts={expandVariant};
	openCorpus(corpus,opts,action((err,cor)=>{
		if (err) {
			console.log(err);
		} else {
			if (setActive) store.active=corpus;
			store.corpora[cor.id]=true;
			store.corpora=Object.assign({},store.corpora);
			connectCorpus(cor);
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
module.exports={open,close,setActive,store,init,openedCors}