const createInlineNote=function({cm,cor,start,end,id,tabid,target,actions,fields}){		
	return cm.markText(start,end,{className:"inlinenote"});
}

module.exports=createInlineNote;