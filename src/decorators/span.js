const createSpan=function({cm,cor,start,end,id,tabid,target,actions,fields}){		
	if (target.indexOf(":")>0) {
		return cm.markText(start,end,{css:target});
	} else {
		var className=target;
		if (target instanceof Array) {
			className=target[0];
		}
		return cm.markText(start,end,{className});
	}
}

module.exports=createSpan;