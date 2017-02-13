const createLink=function({cm,cor,field,start,end,id,target,active,actions}){
	return cm.markText(start,end,{className:"bilink"});
}
module.exports=createLink;