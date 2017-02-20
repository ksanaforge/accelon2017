const patterns={
 taisho:/CBETA, ?T(\d+), .*? p. ?(\d+), ([\dabc\-]+)/g,
}
const markLine=function(doc,i,visitlink){
	if (i>doc.lineCount())return;
	var line=doc.getLine(i);
	line.replace(patterns.taisho,function(m,v,pg,cline,idx){
		const link=document.createElement("span");
		var target=v+'p'+pg+cline;
		link.innerHTML="CBETA "+target;
		link.className="link"
		link.onclick=visitlink;
		link.dataset.target=target;
		doc.markText({line:i,ch:idx},{line:i,ch:idx+m.length},{replacedWith:link});
	})
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