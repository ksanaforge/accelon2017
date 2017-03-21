/* when a corpus is opened, connect it with already opened */
const {setMarkup}=require("../model/markups");
const BILINKSEP="<";
const regex=/<.+/;
const connect=function(cor1,cor2,output){
	if (cor1===cor2)return;
	if (!cor2.meta.linkTo) return; 
	
	for (var field in cor2.meta.linkTo) {
		if (!cor2.linkingTo(field,cor1)) continue;
		output.push([cor2.id,field,cor2.get(['gfields',field])]);
	}
	return output;
}
const groupByArticle=function(pos,value,cor){
	//group by article
	const markups={};
	for (var i=0;i<pos.length;i++) {
		const kpos=cor.parseRange(pos[i]).start;
		const a=cor.articleOf(kpos).at;
		if (!markups[a]) markups[a]={pos:[],value:[]};
		markups[a].pos.push(pos[i]);
		markups[a].value.push(value[i]);
	}
	return markups;
}
const buildReverseLinks=function(links){

	const corpora=require("../model/corpora");
	var out=[];
	const cors=corpora.openedCors();
	for (var i=0;i<links.length;i++) {
		const corpus=links[i][1].replace(/.*</,"");
		if (!cors[corpus]) continue;
		const sourcecorpus=links[i][0];
		const type=links[i][1].replace(/<.*/,"");
		const fieldname=type+BILINKSEP+sourcecorpus;
		const pv=[];
		const payload=links[i][2];
		
		for (var k=0;k<payload.pos.length;k++) {
			pv.push([payload.value[k],payload.pos[k]]);	
		}
		pv.sort((a,b)=>a[0]-b[0]);//sort by value, will became pos

		const pos=pv.map(a=>a[0]);
		const value=pv.map(a=>a[1]);
		
		const markups=groupByArticle(pos,value,cors[corpus]);
		out.push( [corpus, fieldname, markups]);
	}
	return out;
}

const connectCorpus=function(cor){
	const corpora=require("../model/corpora");
	var output=[];
	for (var db in corpora.store.corpora) {
		if (!corpora.store.corpora[db])continue;
		const tcor=corpora.store.cor(db);
		if (!tcor) continue;

		connect(cor,tcor,output);
		connect(tcor,cor,output);
	}
	const outputlinks=buildReverseLinks(output);
	for (var i=0;i<outputlinks.length;i++) {
		const corpus=outputlinks[i][0], name=outputlinks[i][1], mrks=outputlinks[i][2];
		setMarkup(corpus,name,mrks);
	}	
}

module.exports={connectCorpus};