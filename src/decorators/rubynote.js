const mode=require("../model/mode");
const createRubyNote=function({cm,cor,start,end,id,tabid,target,actions,fields}){		
	const widget=document.createElement("span");
	const layout=mode.store.layout;
	const field="rubynote";
	widget.className=field+ (layout?"":(" "+field+"_ori"));
	widget.innerHTML=target;
	widget.cor=cor;
	return cm.setBookmark(start,{widget});
}

module.exports=createRubyNote;