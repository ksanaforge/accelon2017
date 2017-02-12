
/*
  deal with multi target bilink
  do not replace with dom,
  because this will affect selection
  show a clickable target when move into range of link, like a highlight
  open target corpus and show human readible target name (sutra name)

*/

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
const createLink=function({cm,cor,field,start,end,id,target,active,actions}){
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
		const targetcorpus=field.replace(/.+?@/,"");
		dom.target=targetcorpus+"@"+target;
		
		return cm.markText(start,end,{replacedWith:dom,handleMouseEvents:true});
		//.onmousedown=onLinkMouseDown;
	}
}
module.exports=createLink;