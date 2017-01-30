const createFigure=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	dom.innerHTML=target;
	dom.className="inlinesvg";
	const lastline=cm.getLine(end.line);
	const ch=lastline?lastline.length:end.ch;
	return cm.markText(start,{line:end.line,ch},{replacedWith:dom,handleMouseEvents:true});
}
module.exports=createFigure;