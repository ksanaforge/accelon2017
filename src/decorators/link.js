const onLinkMouseDown=function(e){
	const target=e.target;
	const fulladdress=e.target.target;
	e.stopPropagation();
	if (!target.action) {
		console.error("action openLink is not defined");
	}
	target.action&&target.action(fulladdress);	
}
/* TODO , show link only when in cursor ,
to save some dom node*/
const createLink=function({cm,cor,start,end,id,target,active,actions}){
	if (start.ch==end.ch && start.line==end.line) {
		const dom=document.createElement("span");
		dom.className="notelink";
		dom.onmousedown=onLinkMouseDown;
		dom.action=actions.updateArticleByAddress;
		dom.cor=cor;
		dom.innerHTML=target;
		return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
	} else {
		const dom=document.createElement("span");
		dom.className="link";
		dom.onmousedown=onLinkMouseDown;
		dom.action=actions.openLink;
		dom.cor=cor;
		dom.innerHTML=cm.getRange(start,end);
		dom.target=target;
		
		return cm.markText(start,end,{replacedWith:dom,handleMouseEvents:true});
		//.onmousedown=onLinkMouseDown;
	}
}
module.exports=createLink;