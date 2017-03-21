const createImage=function({cm,cor,start,end,field,id,tabid,target,actions,fields}){
	const widget=document.createElement("img");
	widget.src='data:img/'+field+';base64,'+target;
	widget.title=cm.doc.getRange(start,end);
	if (start==end) {
		return cm.setBookmark(end,{widget});	
	} else {
		return cm.markText(start,end,{replacedWith:widget});
	}	
}
module.exports=createImage;
