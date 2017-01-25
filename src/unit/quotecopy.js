const quoteCopy=function({cor,value,krange}){
		const r=cor.parseRange(krange);
		const sp=cor.pageOf(r.start);
		const ep=cor.pageOf(r.end);
		var pagerange="，pp."+sp;
		if (ep!==sp) pagerange+='-'+ep;
		return "「"+value+"」（《"+cor.getGroupName(krange)+"》"+pagerange+"）";
}
module.exports=quoteCopy;