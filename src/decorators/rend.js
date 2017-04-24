// tag specified in  -corpus.json  will be render with css class
const createRend=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	if (target instanceof Array) { //array of className
		className=target.join(" ");
		return cm.markText(start,end,{className});
	}
	var className=target;
	const at=target.indexOf("|"); //has attributes
	if (at>0) {
		className=target.substr(0,at);
	} else {
		if (target.indexOf(":")>0) {
			return cm.markText(start,end,{css:target});
		}
	}
	return cm.markText(start,end,{className});
}

module.exports=createRend;