const createHead=function({cm,cor,start,end,id,tabid,target,actions,fields}){		
	return cm.markText(start,end,{className:"head head"+target});
}

module.exports=createHead;