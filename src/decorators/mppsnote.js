const onLinkMouseDown=function(e){
	const text=e.target.dataset.text;
	e.target.action({title:e.target.innerHTML,text,x:e.pageX,y:e.pageY});
}
const createMppsNote=function({cm,cor,corpus,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	dom.className="notelink";
	dom.onmousedown=onLinkMouseDown;
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
