const createRend=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	if (target.indexOf(":")>0) {
		return cm.markText(start,end,{css:target});
	} else {
		const at=target.indexOf("|");
		var className=target;
		if (at>0) {
			payload=target.substr(at+1);
			className=target.substr(0,at);
		}

		if (target instanceof Array) {
			className=target.join(" ");
		}
		return cm.markText(start,end,{className});
	}
}

module.exports=createRend;