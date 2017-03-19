/* when a corpus is opened, connect it with already opened */
const {setMarkup}=require("../model/markups");
var output=[]; // corpus, id, links_in_all_article

const connect=function(cor1,cor2,output,taskqueue){
	if (cor1===cor2)return;
	if (cor2.meta.linkTo) {
		for (var field in cor2.meta.linkTo) {
			if (field.indexOf("@"+cor1.id)==-1) continue;
			const articles=cor2.meta.linkTo[field];
			const keys=articles.map(a=>["afields",a,field]);
			
			taskqueue.push((function(cor,keys,f){
				var corid=cor.id;
				return (
					function(data,_cor,paths){
						if (!(typeof data=='object' && data.__empty)) {
							const field=paths[0][2]
							output.push([_cor.id,field,data]);
						}
						cor.get(keys,{recursive:true},taskqueue.shift());
					}
				);
			})(cor2,keys)
			);
		}
	}
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
		const corpus=links[i][1].replace(/.*@/,"");
		if (!cors[corpus]) continue;
		const sourcecorpus=links[i][0];
		const type=links[i][1].replace(/@.*/,"");
		const fieldname=type+"@"+sourcecorpus;
		const pv=[];
		const payload=links[i][2];
		
		for (var j=0;j<payload.length;j++) {//article
			for (var k=0;k<payload[j].pos.length;k++) {
				pv.push([payload[j].value[k],payload[j].pos[k]]);	
			}
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
	var taskqueue=[];
	for (var db in corpora.store.corpora) {
		if (!corpora.store.corpora[db])continue;
		const tcor=corpora.store.cor(db);
		if (!tcor) continue;

		connect(cor,tcor,output,taskqueue);
		connect(tcor,cor,output,taskqueue);
	}

	if (taskqueue.length) {
		taskqueue.push(function(data,_cor,paths){
			const field=paths[0][2];
			output.push([_cor.id,field,data]);
			const outputlinks=buildReverseLinks(output);
			for (var i=0;i<outputlinks.length;i++) {
				const corpus=outputlinks[i][0], name=outputlinks[i][1], mrks=outputlinks[i][2];
				setMarkup(corpus,name,mrks);
			}
			output=[];
		});	
		taskqueue.shift()({__empty:true});
	}
}

module.exports={connectCorpus};