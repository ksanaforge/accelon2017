const createCollation=function({cm,cor,start,end,id,tabid,target,actions,krange,field,fields}){
	if (krange.start==krange.end) { //insert
		const widget=document.createElement("span");
		widget.className="collation_insert";
		widget.innerHTML=target;
		return cm.setBookmark(start,{widget});
	} else { //replace or delete
		if (target) { //replace
			const widget=document.createElement("span");
			widget.className="collation_insert";
			widget.innerHTML=target;
			const d=cm.markText(start,end,{className:"collation_delete"});
			const newtext=cm.setBookmark(start,{widget});
			return [d,newtext];
		} else {
			return cm.markText(start,end,{className:"collation_delete"});
		}
	}
}	

module.exports=createCollation;