const quoteCopy_taisho=function({cor,value,krange}){
	const group=cor.getGroupName(krange).replace(/.*@/,"");
	return "「"+value.replace(/\r?\n/g,"")+"」"+"《"+group+"》T"+cor.stringify(krange);
}
const quoteCopy=function({cor,value,krange}){
	if (cor.id=="taisho") return quoteCopy_taisho({cor,value,krange});
	const r=cor.parseRange(krange);
	const sp=cor.pageOf(r.start)+1;
	const ep=cor.pageOf(r.end)+1;
	var pagerange="p."+sp;
	if (ep!==sp) pagerange="p"+pagerange+'-'+ep;
	return "「"+value+"」（《"+cor.getGroupName(krange)+"》"+"，"+pagerange+"）";
}
module.exports=quoteCopy;