const createQ=function({cm,cor,start,end,id,tabid,target,actions,fields}){		
	return cm.markText(start,end,{className:"q"});
}

module.exports=createQ;