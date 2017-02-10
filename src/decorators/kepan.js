const createIndent=function(strings){
	const out=[];
	if (typeof strings=="string") strings=[strings];
	for (var i=0;i<strings.length;i++) {
		var indent="";
		str=strings[i].replace(/^(\d)\t/,function(m,c){
			const depth=parseInt(c,10);
			for (j=0;j<depth;j++){
				indent+="＞";
			}
			return indent;
		})
		out.push(str);
	}
	return out.join("\n");
}
const createKepan=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		const widget=document.createElement("div");
		widget.className="kepan";
		widget.innerHTML=createIndent(target);
		
		return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createKepan;