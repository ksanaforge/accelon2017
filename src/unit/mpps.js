var patterns={
 bold:/\{([^k]+?)\}/g,
 kai:/\{k(.+?)k\}/g,
 taisho:/@t(\d+p\d+[a-c\-0-9]*)/g,
 taisho_full:/@t(\d+p\d+[a-c][0-9]+)/g,
 yinshun_note:/@y([A-Z][0-9]+)#([0-9]+)/g,
 taisho_app:/@a(\d+p.+)/g
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
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length+1},{replacedWith:link});
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
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length+1},{replacedWith:link});
	})

	line.replace(patterns.bold,function(m,m1,idx){
		var marker=doc.markText({line:i,ch:idx+1},{line:i,ch:idx+m.length-1},
			{className:"bold"});
		//hide control code
		doc.markText({line:i,ch:idx},{line:i,ch:idx+1},{className:"hide"});
		doc.markText({line:i,ch:idx+m.length-1},{line:i,ch:idx+m.length},{className:"hide"});
	});

	line.replace(patterns.kai,function(m,m1,idx){
		var marker=doc.markText({line:i,ch:idx+2},{line:i,ch:idx+m.length-2},
			{className:"kai"});
		//hide control code
		doc.markText({line:i,ch:idx},{line:i,ch:idx+2},{className:"hide"});
		doc.markText({line:i,ch:idx+m.length-2},{line:i,ch:idx+m.length},{className:"hide"});
	});
}

var markNoteLines=function(doc,from,to,openLink){
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
}
module.exports={markNoteLines};