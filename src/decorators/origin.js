const onOriginMouseDown=function(e){
	e.target.action(e.target.dataset.target)
	e.stopPropagation()
}
const createOrigin=function({cm,cor,corpus,start,end,id,tabid,target,actions,fields}){
	const widget=document.createElement("span");
	widget.innerHTML=target.replace(/.+@/,"");
	widget.className="origin";
	widget.dataset.target=target;
	widget.onmousedown=onOriginMouseDown;
	widget.action=actions.openLink;
	widget.cor=cor;
	return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createOrigin;