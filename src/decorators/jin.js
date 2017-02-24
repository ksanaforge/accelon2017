const createJin=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		return cm.markText(start,end,{className:"jin"});
}

module.exports=createJin;