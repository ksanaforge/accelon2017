const calFascicle=function(cor,krange){
	const group=cor.groupOf(krange);
	const grange=cor.groupKRange(group)
	const r=cor.parseRange(grange[0]);
	const a=cor.articleOf(krange).at;
	const b=cor.articleOf(r.start).at;
	return (a-b+1);
}

const getTailPunc=function(str){
	const m=str.match(/([。！；、．•？…」）︶｝︸〕︺】︼》︾〉﹀﹂』]*)$/);
	if (m) return m[1]
}

const getCopyText=function(cor,krange,fields){
	if (!fields.head && !fields.p) return null;
	const r=cor.parseRange(krange);
	var f1=[],f2=[];
	if (fields.p) {
		f1=cor.trimField(fields.p,r.start,r.end).pos;
	}
	if (fields.head) {
		const f3=cor.trimRangeField(fields.head,r.start,r.end).pos;
		for (var i=0;i<f3.length;i++) {
			const rr=cor.parseRange(f3[i]);
			f2.push(rr.start);
		}
	}
	const para=f1.concat(f2);
	para.sort();

	if (!para||!para.length) return null;
	const out=[];
	var prev=r.start,tail="";
	for (var i=0;i<para.length;i++){
		var t=(cor.getText(cor.makeRange(prev,para[i]))||[]).join("");
		if (t.substr(0,tail.length)==tail) {
			t=t.substr(tail.length);
		}
		tail=getTailPunc(t);
		prev=para[i];
		out.push(t);
	}
	var t2=(cor.getText(cor.makeRange(para[para.length-1],r.end))||[]).join("");
	if (t2.substr(0,tail.length)==tail) {
		t2=t2.substr(tail.length);
	}	
	out.push(t2);
	return out.join("\n");
}

const citation=require("./citation");
const quoteCopy_mpps=function({cor,value,krange,fields}){
	const text=getCopyText(cor,krange,fields);
	if (text) value=text;

	value=value.replace(/\{k/g,"").replace(/k\}/g,"")
	.replace(/\{b/g,"").replace(/b\}/g,"").replace(/@t/g,"大正")
	.replace(/@y([A-Z][0-9]+)#([0-9]+)/g,function(m,m1){
		return "《印順導師大智度論筆記》"+m1;
	});

	return "「"+value+"」"+citation(cor,krange);
}

const quoteCopy_taisho=function({cor,value,krange,fields}){
	const text=getCopyText(cor,krange,fields);
	if (text) value=text;

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
	return "《"+group+"》卷"+fascicle+"：「"+value+"」（大正"+vol+"，"+shortaddress+"）";
}
const taixu_vol=function(compilation,page){ //編, 頁
	const volmaps={
		1:{1:1,531:2},
		2:{1:3},
		3:{1:3},
		4:{1:4,475:5},
		5:{1:6,581:7},
		6:{1:7,301:8,899:9},
		7:{1:10,515:11,911:12,1267:13,1725:14,2409:15},
		8:{1:16},
		9:{1:17},
		10:{1:18},
		11:{1:18,167:19},
		12:{1:20},
		13:{1:20,243:21,751:22,1333:23},
		14:{1:23,247:24},
		15:{1:24},
		16:{1:25},
		17:{1:26,555:27},
		18:{1:27,229:28},
		19:{1:29,443:30,1005:31},
		20:{1:32}
	}
	//太虛大師全書 共二十編 ，精裝32冊，「編」重置頁碼
	//故必須用「編」及「頁碼」計算冊
	//根據厚觀法師 2017.4.21 21:40 寄來太虛大師全書「二十編與精裝三十二冊對照表」

	const ranges=volmaps[compilation];
	if (!ranges)return "";
	var vol="";
	for (var end in ranges) {
		if ( page>=parseInt(end,10)) {
			vol=ranges[end];
		}
	}

	return vol?"精 第"+vol+"冊，":"";
}
const quoteCopy_taixu=function({cor,value,krange,pagerange,fields}){
	const text=getCopyText(cor,krange,fields);
	if (text) value=text;

	const r=cor.parseRange(krange);
	const page=cor.pageOf(r.start)+1;
	const address=cor.stringify(krange);
	const compilation=address.replace(/p.*/,"");
	const vol=taixu_vol(compilation,page);

	const gn=cor.getGroupName(krange);
	return "《"+gn+"》：「"+value+"」（《太虛大師全書》"+"，"+vol+pagerange+"）";
}
const quoteCopy_yinshun=function({cor,value,krange,fields,pagerange}){
	const text=getCopyText(cor,krange,fields);
	if (text) value=text;

	var gn=cor.getGroupName(krange);
	const regexs=[/（.*?）/,/第[一二三四五]冊/];
	var sub="";
	regexs.forEach(function(regex){
		if (gn.match(regex)){
			sub=gn.match(regex)[0];
			gn=gn.replace(regex,"");
		}
	})
	return "「"+value+"」（《"+gn+"》"+sub+"，"+pagerange+"）";
}
const quoteCopy=function({cor,value,krange,fields}){

	if (value.length<10 && value!=="-") {
		return value;
	}

	const text=getCopyText(cor,krange,fields);
	if (text) value=text;

	const r=cor.parseRange(krange);
	const sp=cor.pageOf(r.start)+1;
	const ep=cor.pageOf(r.end)+1;
	var pagerange="p."+sp;
	if (ep!==sp) pagerange="p"+pagerange+'-'+ep;
	if (cor.id=="taisho") return quoteCopy_taisho({cor,value,krange,fields});
	if (cor.id=="mpps") return quoteCopy_mpps({cor,value,krange,fields});
	if (cor.id=="taixu") return quoteCopy_taixu({cor,value,krange,fields,pagerange});
	if (cor.id=="yinshun") return quoteCopy_yinshun({cor,value,krange,fields,pagerange});

	//taixu positing is incorrect, disable quote copy
	//if (cor.id=="taixu") return value;
	
	return "「"+value+"」（《"+cor.getGroupName(krange)+"》"+"，"+pagerange+"）";
}
module.exports=quoteCopy;