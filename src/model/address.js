const {observable,action,autorun}=require("mobx");
const mode=require("./mode");
const corpora=require("./corpora");
const store=observable({
	main:'',
	n:0,
	aux:''
});

const setMain=action((address)=>{
	store.main=address;
});
const setAux=action((address)=>{
	store.aux=address;
});
const openLink=action((fulladdress,cor)=>{
	if (fulladdress.indexOf("http:")==0||
		fulladdress.indexOf("https:")==0) {
		window.open(fulladdress);
		return;
	}
	const r=fulladdress.split("@");

	if (r.length==1) {
		store.aux=cor.id+"@"+r;
		return;
	}

	const corpus=r[0].toLowerCase();
	//taixu positioning is invalid, remove this line when fixed
	if (corpus=="taixu")return;

	if (!corpora.store.corpora[corpus]) {
		if (mode.store.fileprotocol) {
			store.aux=fulladdress;	
		} else {
			corpora.open(corpus,false,function(){
				setTimeout(action(function(){//wait connect
					store.aux=fulladdress;	
				}),500);
			});
		}
	} else {
		store.aux=fulladdress;	
	}	
});
const openNewWindow=action((addr,corpus)=>{
	var url=window.location.origin+window.location.pathname+"#c="+corpus+"&m="+mode.READTEXT+"&a="+addr;
	const win=window.open(url,'_blank');
	win.focus();	
});
autorun(()=>{
	//console.log('main address change',store.main,store.aux);
});
module.exports={store,setMain,setAux,openLink,openNewWindow};