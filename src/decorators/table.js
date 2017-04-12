const adjustsize=function(e){
	const ins=e.target.value=="＋";
	replacedWith=e.target.parentElement;
	var ratio=replacedWith.ratio;
	ratio=ins?ratio*1.1:ratio/1.1;
	if (ratio>5)ratio=5;
	if (ratio<0.3)ratio=0.3;

	replacedWith.ratio=ratio;

	replacedWith.style.width=Math.floor(replacedWith.w*ratio)+"%";
	replacedWith.style.height=Math.floor(replacedWith.h*ratio)+"%";
	e.stopPropagation();
}
const newwindow=function(e){
	e.target.innerHTML;
	e.stopPropagation();
}
const createTable=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	// ..\unit\mpps contains the code to replace of svg in footnote 
	
	const replacedWith=document.createElement("div");
	//var svgcontent=target.replace(/ height=".*?"/,'height="100%"');
	//svgcontent=svgcontent.replace(/ width=".*?"/,'width="100%"').replace(/\r?\n/g,"");
	const filename=target.match(/y[\.a-z\d\-]+\.svg/) || "yinshun.svg";

	var svgcontent=target.replace(/<!--.+?-->\r?\n?/g,"")
	.replace(/<!DOCTYPE.+?>\r?\n/,"").replace(/<\?xml.+>\r?\n/,"");
	replacedWith.className="inlinesvg";

	const opennew=document.createElement("a");
	opennew.style="z-index:200"
	
	opennew.setAttribute("href","data:image/svg+xml;utf8,"+encodeURI(svgcontent));

	opennew.innerHTML="\u21E9"
	opennew.setAttribute("download",filename);
	opennew.onmousedown=newwindow;

	const svg=document.createElement("div");
	svg.innerHTML=svgcontent;
	
	//replacedWith.appendChild(smaller);
	//replacedWith.appendChild(larger);
	replacedWith.appendChild(opennew);
	replacedWith.appendChild(svg);

	const ch=end.ch+255; //cover entire line

	return cm.markText({line:start.line,ch:0},{line:end.line,ch},
		{replacedWith,handleMouseEvents:true});
}
module.exports=createTable;