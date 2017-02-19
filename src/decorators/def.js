const onDefMouseDown=function(e){
	const target=e.target;
	const address=parseInt(target.dataset.target,10);
	e.stopPropagation();
	if (!target.action) {
		console.error("action updateArticleByAddress is not defined");
	}
	target.action&&target.action(address,target.tabid);
}
const createDef=function({cm,cor,corpus,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	dom.className="def";
	dom.innerHTML=fields.noteid.value[id].replace(/.+\./,"").replace(/^0+/,"");
	dom.dataset.target=target;
	dom.onmousedown=onDefMouseDown;
	dom.action=actions.updateArticleByAddress;
	dom.cor=cor;
	dom.tabid=tabid;
	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}

module.exports=createDef;