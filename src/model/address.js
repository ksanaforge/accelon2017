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
const openLink=action((fulladdress)=>{
	const r=fulladdress.split("@");
	if (!corpora.store.corpora[r[0]]) {
		corpora.open(r[0],false,function(){
			setTimeout(action(function(){//wait connect
				store.aux=fulladdress;	
			}),500);
		});
	} else {
		store.aux=fulladdress;	
	}	
});
const openNewWindow=action((address,corpus)=>{
	var url=window.location.origin+window.location.pathname+"#c="+corpus+"&m="+READTEXT+"&a="+address;
	const win=window.open(url,'_blank');
	win.focus();	
});
autorun(()=>{
	//console.log('main address change',store.main,store.aux);
});
module.exports={store,setMain,setAux,openLink,openNewWindow};