const {observable,action,autorun}=require("mobx");
const store=observable({
	caretText:"",
	selectionText:""
});
const setSelection=action((s)=>{
	for (var i in s){
		store[i]=s[i];
	}
});

module.exports={store,setSelection};