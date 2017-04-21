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
	var pinname="〈"+pin.n+pin.t+"〉";

	var gn=cor.getGroupName(krange);
	const article=cor.articleOf(r.start);
	const toc=cor.getTOC(r.start);

	value=value.replace(/\{k/g,"").replace(/k\}/g,"")
	.replace(/\{b/g,"").replace(/b\}/g,"").replace(/@t/g,"大正")
	.replace(/@y([A-Z][0-9]+)#([0-9]+)/g,function(m,m1){
		return "《印順導師大智度論筆記》"+m1;
	});

	if (!pin.n) {//use article name as 
		gn='〈'+gn+'〉';
		pinname="";
	}

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
const quoteCopy_taixu=function({cor,value,krange,pagerange}){
	const volmaps={
		1:'1',2:3,3:3,4:4,5:6,6:7,7:10,8:16,9:17,10:18,11:18
		,12:20,13:20,14:23,15:24,16:25,17:26,18:27,19:29,20:32
	}
	const address=cor.stringify(krange);
	const compile=address.replace(/p.*/,"");
	const vol=volmaps[compile]||"";

	return value+"（《太虛大師全書》精 第"+compile+"編，大約在第"+vol+"冊，"+pagerange+"）";
}
const quoteCopy=function({cor,value,krange,fields}){
	if (value.length<10 && value!=="-") {
		return value;
	}
	const r=cor.parseRange(krange);
	const sp=cor.pageOf(r.start)+1;
	const ep=cor.pageOf(r.end)+1;
	var pagerange="p."+sp;
	if (ep!==sp) pagerange="p"+pagerange+'-'+ep;

	if (cor.id=="taisho") return quoteCopy_taisho({cor,value,krange,fields});
	if (cor.id=="mpps") return quoteCopy_mpps({cor,value,krange,fields});
	if (cor.id=="taixu") return quoteCopy_taixu({cor,value,krange,fields,pagerange});

	//taixu positing is incorrect, disable quote copy
	//if (cor.id=="taixu") return value;
	
	return "「"+value+"」（《"+cor.getGroupName(krange)+"》"+"，"+pagerange+"）";
}
module.exports=quoteCopy;