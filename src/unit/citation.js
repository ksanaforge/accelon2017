const getSelrange=function(cor,krange){
	const r=cor.parseRange(krange);
	const sp=cor.pageOf(r.start)+1;
	const ep=cor.pageOf(r.end)+1;
	var selrange="p."+sp;

	if (ep!==sp) selrange="p"+selrange+'-'+ep;	
	return selrange;
}
const citation=function(cor,krange){
	if (!cor)return "";

	if (cor.meta.id=="mpps") {
		const r=cor.parseRange(krange);
		const getPin=function(rend,kpos){
			if (!rend)return;
			var pin=null;
			if (r.start==r.end) {
				kpos=cor.makeRange(r.start,r.end);
			}
			for (var i=0;i<rend.value.length;i++) {
				if (rend.value[i].substr(0,4)=="pin|") {
					pin=JSON.parse(rend.value[i].substr(4));
				}
				if (kpos<rend.pos[i]) break;
			}
			return pin;
		}
		
		const article=cor.articleOf(r.start).at;
		var rend=cor.getArticleField(article,"rend")[0];

		const pin=getPin(rend,r.range);

		var pinname="〈"+pin.n+pin.t+"〉";

		var gn=cor.getGroupName(krange);
		
		const toc=cor.getTOC(r.start);
		if (!pin.n) {//use article name as 
			gn='〈'+gn+'〉';
			pinname="";
		}

		gn=gn.replace(/(卷\d+).*/,function(m,m1){return m1});

		return "（《大智度論講義》"+gn+pinname+"，"+getSelrange(cor,krange)+"）"
	} else {
		var gn=cor.getGroupName(krange);
		return "《"+gn+"》"+getSelrange(cor,krange);
	};
}
module.exports=citation;