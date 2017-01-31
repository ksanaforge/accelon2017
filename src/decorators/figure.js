const createFigure=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	dom.innerHTML=target;
	dom.className="inlinesvg";
	const ch=end.ch+99; //cover entire line
	return cm.markText(start,{line:end.line,ch},{replacedWith:dom,handleMouseEvents:true});
}
module.exports=createFigure;