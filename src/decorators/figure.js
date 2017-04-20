//obsolete code, not used, see table.js
const createFigure=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	const replacedWith=document.createElement("div");
	var svg=target.replace(/ height=".*?"/,'height="100%"');
	svg=svg.replace(/ width=".*?"/,'width="100%"');
	replacedWith.innerHTML=svg.trim().replace(/\r?\n/g,"");
	replacedWith.className="inlinesvg";
	const ch=end.ch+99; //cover entire line
	console.log(replacedWith.innerHTML)
	return cm.markText({line:start.line,ch:start.ch},{line:end.line,ch},{replacedWith,handleMouseEvents:true});
}
module.exports=createFigure;

