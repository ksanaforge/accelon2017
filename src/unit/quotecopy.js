const calFascicle=function(cor,krange){
	const group=cor.groupOf(krange);
	const grange=cor.groupKRange(group)
	const r=cor.parseRange(grange[0]);
	const a=cor.articleOf(krange).at;
	const b=cor.articleOf(r.start).at;
	return (a-b+1);
}
const getPin=function(rend,kpos){
	if (!rend)return;
	var pin=null;
	for (var i=0;i<rend.value.length;i++) {
		if (rend.value[i].substr(0,4)=="pin|") {
			pin=JSON.parse(rend.value[i].substr(4));
		}
		if (kpos<rend.pos[i]) break;
	}
	return pin;
}
const quoteCopy_mpps=function({cor,value,krange,fields}){
	const r=cor.parseRange(krange);
	const sp=cor.pageOf(r.start)+1;
	const ep=cor.pageOf(r.end)+1;
	var selrange="p."+sp;

	const rend=fields&&fields.rend;
	if (ep!==sp) selrange="p"+selrange+'-'+ep;
	
	const pin=getPin(rend,krange);
	const pinname="〈"+pin.n+pin.t+"〉";

	var gn=cor.getGroupName(krange);
	const article=cor.articleOf(r.start);
	const toc=cor.getTOC(r.start);

	gn=gn.replace(/(卷\d+).*/,function(m,m1){return m1});
	return "「"+value+"」（《大智度論講義》"+gn+pinname+"，"+selrange+"）";
}

const quoteCopy_taisho=function({cor,value,krange}){
	const group=cor.getGroupName(krange).replace(/.*@/,"");
	const address=cor.stringify(krange);
	const vol=address.replace(/p.*/,"");
	var shortaddress=address.replace(/.*p/,"").replace(/\d\d-/,"-");

	if (shortaddress.replace(/.*-/,"").length>=4) {
		shortaddress=shortaddress.substr(0,shortaddress.length-2);		
	} else { //same line
		shortaddress=shortaddress.replace(/-.*/,"");
	}
	var fascicle=calFascicle(cor,krange);
	return "《"+group+"》卷"+fascicle+"：「"+value.replace(/\r?\n/g,"")+"」（大正"+vol+"，"+shortaddress+"）";
}
const quoteCopy=function({cor,value,krange,fields}){
	if (value.length<10) {
		return value;
	}
	if (cor.id=="taisho") return quoteCopy_taisho({cor,value,krange,fields});
	if (cor.id=="mpps") return quoteCopy_mpps({cor,value,krange,fields});
	const r=cor.parseRange(krange);
	const sp=cor.pageOf(r.start)+1;
	const ep=cor.pageOf(r.end)+1;
	var pagerange="p."+sp;
	if (ep!==sp) pagerange="p"+pagerange+'-'+ep;
	return "「"+value+"」（《"+cor.getGroupName(krange)+"》"+"，"+pagerange+"）";
}
module.exports=quoteCopy;