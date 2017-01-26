const quoteCopy=function({cor,value,krange}){
		const r=cor.parseRange(krange);
		const sp=cor.pageOf(r.start);
		const ep=cor.pageOf(r.end);
		var pagerange="p."+sp;
		if (ep!==sp) pagerange="p"+pagerange+'-'+ep;
		return "「"+value+"」（《"+cor.getGroupName(krange)+"》"+"，"+pagerange+"）";
}
module.exports=quoteCopy;