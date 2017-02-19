var patterns={
 bold:/\{([^k]+?)\}/g,
 kai:/\{k(.+?)k\}/g,
 taisho:/t(\d+)p(\d+)([a-c]?)/,
 taisho_full:/@t(\d+p\d+[a-c][0-9]+)/,
 yinshun_note:/y([A-Z][0-9]+)p[0-9]+/
}
const markLine=function(doc,i,visitlink){
	if (i>doc.lineCount())return;
	var line=doc.getLine(i);


	line.replace(patterns.taisho_full,function(m,taisho,idx){
		const link=document.createElement("span");
		link.innerHTML="大正"+taisho;
		link.className="link"
		link.onclick=visitlink;
		link.dataset.target=taisho;
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length+3},{replacedWith:link});
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

var markLines=function(doc,from,to,openLink){
	const visitlink=function(e){
		openLink("taisho@"+e.target.dataset.target);
	}

	var M=doc.findMarks({line:from,ch:0},{line:to,ch:65536});
	M.forEach(function(m){m.clear()});
	for (var i=from;i<to+1;i++) {
		markLine(doc, i, visitlink);
	}
}
module.exports={markLines};