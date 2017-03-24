const createInlineSVG=function({cm,cor,start,end,field,id,tabid,target,actions,fields}){
	const widget=document.createElement("img");
	widget.src="data:image/svg+xml;utf8,"+encodeURI(target);
	widget.style="height:2em";
	if (start==end) {
		return cm.setBookmark(end,{widget});	
	} else {
		return cm.markText(start,end,{replacedWith:widget});
	}	
}
module.exports=createInlineSVG;
