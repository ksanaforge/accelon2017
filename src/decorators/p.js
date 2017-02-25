const createP=function({cm,cor,corpus,field,start,end,id,tabid,target,actions,fields}){
	if (start.ch==0) { //taisho has p within line
		const dom=document.createElement("span");
		dom.className="p";
		return cm.setBookmark(start,{widget:dom});		
	}
//	return cm.markText(start,end,{className:"p",clearWhenEmpty:false});
}
module.exports=createP;