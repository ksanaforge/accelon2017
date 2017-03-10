const {observable,action}=require("mobx");
const store=observable({
	excerpts:[]
	,extra:0
	,query:{count:0}
  	,batch:0
  	,now:0
	,hitperbatch:20
});

var fetchExcerpts=null;
try {
	fetchExcerpts=require("ksana-corpus-search").excerpt.fetchExcerpts;
} catch(e){
	fetchExcerpts=require("ksana-corpus-lib").excerpt.fetchExcerpts;
}


const searchresult=require("./searchresult");
const mode=require("./mode");
const corpora=require("./corpora");
const setExtraLine=action((l)=>{
	store.extra=l;
	showExcerpt();
});
const setNow=action(now=>{
	now=parseInt(now,10)||0;
	store.now=now;
});
const showExcerpt=action((now)=>{
	//store.now=now;
	//store.extra=extra;
	now=parseInt(now,10)||0;
	var line=store.extra==0?3:store.extra;

	const cor=corpora.store.cor();
	const hits=searchresult.store.filtered;
	var tpos=[];
	store.batch=Math.floor(now/store.hitperbatch);

	for (let i=0;i<store.hitperbatch;i++) {
		const at=store.hitperbatch*store.batch+i;		
		if (at<hits.length && hits[at]) tpos.push(hits[at]);
		else break;
	}
	fetchExcerpts(cor,{tpos,line,
		phrasepostings:searchresult.store.phrasepostings},
		action(function(excerpts){
			store.excerpts=excerpts;
			store.now=now;
	}));	
});
module.exports={store,showExcerpt,setExtraLine,setNow};