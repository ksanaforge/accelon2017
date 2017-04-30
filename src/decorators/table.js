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
//give each style a unique name
const resolveStyleConflict=function(svgcontent,id){
	return svgcontent.replace(/st(\d+)/g,function(m,m1){
		return "st"+id+"-"+m1;
	})
}
const createTable=function({cm,cor,start,end,id,tabid,target,actions,field,fields}){
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

	replacedWith.appendChild(opennew);

	const svg=document.createElement("div");
	svg.innerHTML=resolveStyleConflict(svgcontent,field[0]+id);
	replacedWith.appendChild(svg);


	var startch=start.ch;
	var textline=cm.getLine(start.line);
	if (!textline) textline="";
	const endline=cm.getLine(end.line);
	var endch=255;
	if (endline) {
		endch=endline.length;
	}

	const textbefore=textline.substr(0,start.ch);

	c=cor.kcount(textbefore);
	if (!c)startch=0;
	
	if (start.line==end.line && start.ch==endch){
		return cm.setBookmark(start,{widget:replacedWith
			,handleMouseEvents:true});
	} else {
		return cm.markText({line:start.line,ch:startch},{line:end.line,ch:endch},
			{replacedWith,handleMouseEvents:true});
	}
}
module.exports=createTable;