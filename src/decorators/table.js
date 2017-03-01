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
const createTable=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	const replacedWith=document.createElement("div");
	var svgcontent=target.replace(/ height=".*?"/,'height="100%"');
	svgcontent=svgcontent.replace(/ width=".*?"/,'width="100%"').replace(/\r?\n/g,"");
	//replacedWith.className="inlinesvg";
	replacedWith.w=70;
	replacedWith.h=50;
	replacedWith.ratio=1;
	replacedWith.style="width:70%;height:50%;"
	const larger=document.createElement("input");
	larger.type="button";
	larger.style="z-index:200"
	larger.onmousedown=adjustsize;
	larger.value="＋"
	const smaller=document.createElement("input");
	smaller.type="button";
	smaller.style="z-index:200"
	smaller.value="－"
	smaller.onmousedown=adjustsize;


	const svg=document.createElement("div");
	svg.innerHTML=svgcontent;
	replacedWith.appendChild(smaller);
	replacedWith.appendChild(larger);
	replacedWith.appendChild(svg);


	const ch=end.ch+99; //cover entire line
	return cm.markText(start,{line:end.line,ch},{replacedWith,handleMouseEvents:true});
}
module.exports=createTable;