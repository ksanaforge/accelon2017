var patterns={
 bold:/\{b[\s\S]+?b\}/g,
 kai:/\{k[\s\S]+?k\}/g,
 taisho:/@t(\d+p\d+[a-c\-0-9]*)/g,
 taisho_full:/@t(\d+p\d+[a-c][0-9]+)/g,
 yinshun_note:/@y([A-Z][0-9]+)#([0-9]+)/g,
 taisho_app:/@a(\d+p.+)/g,
 svg:/\{svg\|(.+?),([\s\S]+?)\|svg\}/g
}
const markLine=function(doc,i,visitlink){
	if (i>doc.lineCount())return;
	var line=doc.getLine(i);

	line.replace(patterns.taisho,function(m,taisho,idx){
		const link=document.createElement("span");
		var target=taisho;
		if (!m.match(patterns.taisho_full)){
			target+="a01";//page without line number
		}
		link.innerHTML="大正"+taisho;
		link.className="link"
		link.onclick=visitlink;
		link.dataset.target=target;
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{replacedWith:link});
	})

	line.replace(patterns.taisho_app,function(m,taisho,idx){
		const link=document.createElement("span");
		var target=taisho;
		link.innerHTML=taisho;
		link.className="taisho_app";
		link.dataset.target=target;
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length+1},{replacedWith:link});
	})

	line.replace(patterns.yinshun_note,function(m,filename,pg,idx){
		const link=document.createElement("span");
		link.innerHTML="《印順導師大智度論筆記》"+filename;
		link.className="link"
		link.onclick=visitlink;
		link.dataset.target="http://ya.ksana.tw/mpps_yinshun_note_img/"+filename.charAt(0)+"/"+filename+".jpg";
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{replacedWith:link});
	})
}
const newwindow=function(e){
	e.target.innerHTML;
	e.stopPropagation();
}
const showsvg=function(e){
	const marks=e.target.doc.getAllMarks();

	for(var i=0;i<marks.length;i++) {
		const rep=marks[i].replacedWith;
		if (!rep)continue;
		svg=rep.children[0];
		if (svg!==e.target && rep.className=='footnotesvg') {
			svg.innerHTML=svg.filename+" ";
			svg.onclick=showsvg;
			svg.className='svgbutton';
			svg.doc=e.target.doc;
		}
	}

	e.target.innerHTML=e.target.svgcontent;
	e.target.className='';
	e.target.onclick=null;
}
const resolveStyleConflict=function(svgcontent,id){
	//stylesheet of svg conflict
	return svgcontent.replace(/st(\d+)/g,function(m,m1){
		return "st"+id+"-"+m1;
	})
}

const replacesvg=function(doc,from,to,svgcontent,count){
	var replacedWith=document.createElement("div");
	var filename=svgcontent.match(/[\.A-Za-z\d\-]+\.svg/) || "mpps.svg";
	if (filename instanceof Array)filename=filename[0];

	var opennew=document.createElement("a");
	opennew.style="z-index:200";
	
	opennew.setAttribute("href","data:image/svg+xml;utf8,"+encodeURI(svgcontent));

	opennew.innerHTML="\u21E9";
	opennew.setAttribute("download",filename);
	opennew.onmousedown=newwindow;

	var svg=document.createElement("span");
	svg.innerHTML=resolveStyleConflict(svgcontent,count);
	svg.filename=filename;
	replacedWith.appendChild(svg);		

	replacedWith.className='footnotesvg';
	replacedWith.appendChild(opennew);

	const start=doc.posFromIndex(from);
	const end=doc.posFromIndex(to);
	doc.markText(start,end,{replacedWith});
}
var markNoteLines=function(doc,from,to,openLink,cor){
	const visitlink=function(e){
		const url=e.target.dataset.target;
		if (url.substr(0,7)==="http://") {
			window.open(url);
		} else {
			openLink("taisho@"+url);
		}
	}

	var M=doc.findMarks({line:from,ch:0},{line:to,ch:65536});
	M.forEach(function(m){m.clear()});

	for (var i=from;i<to+1;i++) {
		markLine(doc, i, visitlink);
	}

	const footnotetext=doc.getValue();

	footnotetext.replace(patterns.bold,function(m,idx,self){
		const start=doc.posFromIndex(idx);
		const end=doc.posFromIndex(idx+m.length);
		var marker=doc.markText({line:start.line,ch:start.ch+2},{line:end.line,ch:end.ch-2},
			{className:"b"});

		//hide control code
		doc.markText({line:start.line,ch:start.ch},{line:start.line,ch:start.ch+2},{className:"hide"});
		doc.markText({line:end.line,ch:end.ch-2},{line:end.line,ch:end.ch},{className:"hide"});
	});

	footnotetext.replace(patterns.kai,function(m,idx,self){
		const start=doc.posFromIndex(idx);
		const end=doc.posFromIndex(idx+m.length);
		var marker=doc.markText({line:start.line,ch:start.ch+2},{line:end.line,ch:end.ch-2},
			{className:"kai"});

		//hide control code
		doc.markText({line:start.line,ch:start.ch},{line:start.line,ch:start.ch+2},{className:"hide"});
		doc.markText({line:end.line,ch:end.ch-2},{line:end.line,ch:end.ch},{className:"hide"});
	});

	var count=0;
	footnotetext.replace(patterns.svg,function(mm,fn,text,idx){
		const m=fn.match(/M(\d+)\.(\d+)/);
		if (!m)return;
		fn=fn+".svg";
		const juan=parseInt(m[1],10),seq=m[2];
		cor.getArticleField(juan,"footnotesvg",function(field){
			const svgs=field[0].value;
			for(var i=0;i<svgs.length;i++) {
				if (svgs[i].indexOf(fn)>-1) {
					replacesvg(doc,idx,idx+mm.length,svgs[i],count);
					break;
				}
			}
		});
		count++;		
	}.bind(this),10);
}
module.exports={markNoteLines};