var popuptimer;
const mode=require("../model/mode");
const onLinkMouseOver=function(e){
	const text=e.target.dataset.text;
	const title=e.target.innerHTML;
	const x=e.pageX,y=e.pageY;
	const action=e.target.action;
	const tagname=e.target.dataset.tagname;
	popuptimer=setTimeout(function(){
		action({title,text,x,y,tagname});
	},500);
}
const onLinkMouseLeave=function(e){
	clearTimeout(popuptimer);
}
const createPopupNote=function({cm,cor,corpus,field,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	const layout=mode.store.layout;
	dom.className=field+ (layout?"":(" "+field+"_ori"));
	dom.onmouseover=onLinkMouseOver;
	dom.onmouseleave=onLinkMouseLeave;
	dom.action=actions.showNotePopup;
	dom.cor=cor;
	dom.dataset.tagname=field;
	if (target instanceof Array) {
		var idarr=[],textarr=[];
		for (var i=0;i<target.length;i++) {
			const parts=target[i].split("\t");
			if (parts.length>1) {
				const noteid=parts.shift().match(/^[\d\.]+/), 
				notetext=parts.join("\n").trim();
				idarr.push(noteid?noteid[0]:id);
				textarr.push(noteid+"\n"+notetext);
			} else {
				const noteid=target[i].match(/^[\d\.]+/);
				idarr.push(noteid?noteid[0]:id);
				textarr.push(target[i]);
			}
		}
		dom.innerHTML=idarr.join(";");
		dom.dataset.text=textarr.join("\n\n");
	} else {
		const parts=target.split("\t");
		if (parts.length>1) {
			const noteid=parts.shift().match(/^[\d\.]+/),
			notetext=parts.join("\t").trim();

			dom.innerHTML=noteid?noteid[0]:id;
			dom.dataset.text=notetext;
		} else {
			const nid=target.match(/^[\d\.]+/);
			dom.innerHTML=nid?nid[0]:id;
			dom.dataset.text=target;
		}
	}

	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createPopupNote;
