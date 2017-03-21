const createCDATA=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	const widget=document.createElement("div");
	widget.innerHTML=target;
	return cm.setBookmark(end,{widget,handleMouseEvents:true});
}
module.exports=createCDATA;
