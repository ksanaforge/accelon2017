const createLink=function({cm,cor,field,start,end,id,target,active,actions}){
	return cm.markText(start,end,{className:"k"});
}
module.exports=createLink;