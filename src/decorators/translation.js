const createTranslation=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		const widget=document.createElement("div");
		widget.className="translation";
		widget.innerHTML=target;
		return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createTranslation;