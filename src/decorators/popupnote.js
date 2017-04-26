var popuptimer;
const mode=require("../model/mode");
const onLinkMouseOver=function(e){
	const text=e.target.dataset.text;
	const title=e.target.innerHTML;
	const x=e.pageX,y=e.pageY;
	const action=e.target.action;
	const tagname=e.target.dataset.tagname;
	const kpos=parseInt(e.target.dataset.kpos,10)||0;
	popuptimer=setTimeout(function(){
		action({title,text,x,y,tagname,kpos});
	},500);
}
const onLinkMouseLeave=function(e){
	clearTimeout(popuptimer);
}
const createPopupNote=function({cm,cor,corpus,field,kpos,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	const layout=mode.store.layout;
	dom.className=field+ (layout?"":(" "+field+"_ori"));
	dom.onmouseover=onLinkMouseOver;
	dom.onmouseleave=onLinkMouseLeave;
	dom.action=actions.showNotePopup;
	dom.cor=cor;
	dom.dataset.tagname=field;
	dom.dataset.kpos=kpos;
	if (target instanceof Array) {
		target=target.sort(); // for mpps footnote 1.221, 1.222
		var idarr=[],textarr=[];
		for (var i=0;i<target.length;i++) {
			const parts=target[i].split("\t");
			if (parts.length>1) {
				const noteid=parts.shift().match(/^[\d\.]+/), 
				notetext=parts.join("\n").trim();
				idarr.push(noteid?noteid[0]:id);
				textarr.push(noteid+"\n"+notetext);
			} else {
				const noteid=target[i];
				idarr.push(noteid?noteid[0]:id);
				textarr.push(target[i]);
			}
		}
		dom.innerHTML=idarr.join(";");
		dom.dataset.text=textarr.join("\n\n");
	} else {
		const parts=target.split("\t");
		if (parts.length>1) {
			const noteid=parts.shift(),
			notetext=parts.join("\t").trim();

			dom.innerHTML=noteid?noteid:id;
			dom.dataset.text=notetext;
		} else {
			const nid=target.match(/^[\d\.]+/);
			dom.innerHTML=nid?nid:id;
			dom.dataset.text=target;
		}
	}

	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createPopupNote;
