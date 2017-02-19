var popuptimer;
const onLinkMouseOver=function(e){
	e.target.leave=false;
	const text=e.target.dataset.text;
	const title=e.target.innerHTML;
	const x=e.pageX,y=e.pageY;
	const action=e.target.action;
	popuptimer=setTimeout(function(){
		action({title,text,x,y});
	},500);
}
const onLinkMouseLeave=function(e){
	clearTimeout(popuptimer);
}
const createMppsNote=function({cm,cor,corpus,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	dom.className="notelink";
	dom.onmouseover=onLinkMouseOver;
	dom.onmouseleave=onLinkMouseLeave;
	dom.action=actions.showNotePopup;
	dom.cor=cor;
	if (target instanceof Array) {
		var idarr=[],textarr=[];
		for (var i=0;i<target.length;i++) {
			const parts=target[i].split("\t");
			const noteid=parts[0].replace(/.*\./,""), notetext=parts[1].trim();
			idarr.push(noteid);
			textarr.push(noteid);
		}
		dom.innerHTML=idarr.join(";");
		dom.dataset.text=textarr.join("\t");
	} else {
		const parts=target.split("\t");
		const noteid=parts[0].replace(/.*\./,""),notetext=parts[1].trim();
		dom.innerHTML=noteid;
		dom.dataset.text=notetext;
	}

	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createMppsNote;
