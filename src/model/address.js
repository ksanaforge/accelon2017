const {observable,action,autorun}=require("mobx");
const mode=require("./mode");
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
	const corpus=r[0], address=r[1];
	store.aux=fulladdress;
});
const openNewWindow=action((address,corpus)=>{
	var url=window.location.origin+window.location.pathname+"#c="+corpus+"&m="+READTEXT+"&a="+address;
	const win=window.open(url,'_blank');
	win.focus();	
});
autorun(()=>{
	console.log('main address change',store.main);
});
module.exports={store,setMain,setAux,openLink,openNewWindow};