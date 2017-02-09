const createKepan=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		const widget=document.createElement("div");
		widget.className="kepan";
		if (target instanceof Array) {
			widget.innerHTML=target.join("\n");
		} else{
			widget.innerHTML=target;	
		}
		
		return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createKepan;