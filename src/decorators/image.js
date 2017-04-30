const createImage=function({cm,cor,start,end,field,id,tabid,target,actions,fields}){
	const container=JSON.stringify(start)==JSON.stringify(end)?"span":"div";
	const widget=document.createElement(container);
	const img=document.createElement("img");
	img.src='data:img/'+field+';base64,'+target;
	img.title=cm.doc.getRange(start,end);
	widget.appendChild(img);

	if (start==end) {
		return cm.setBookmark(end,{widget});	
	} else {
		return cm.markText(start,end,{replacedWith:widget});
	}	
}
module.exports=createImage;
