const {EXCERPTVIEW,setMode,_updateParams}=require("./params");
//const {packBits,unpackBits}=require("../unit/bitstr");
const SHOW_EXCERPT="SHOW_EXCERPT";
const SET_EXCERPT_LINE="SET_EXCERPT_LINE";
const {fetchExcerpts}=require("ksana-corpus-search/excerpt");

const kcs=require("ksana-corpus-search");

const hitperbatch=20;


const showExcerpt=function(now,extra){
	return (dispatch,getState) =>{
		if (typeof now!=="number") now=getState().params.n||0; //use n in url
		if (typeof extra!=="number") extra=getState().params.e||0; //use n in url
		_showExcerpt(now,extra,dispatch,getState);
	}
}

const _showExcerpt=function(now,extra,dispatch,getState){ //line = 1,3,5
 	const cor=getState().corpora[getState().activeCorpus];
	const searchstate=getState().searchresult;
	const hits=searchstate.filtered;
	const excerptstate=getState().excerpt;
	var tpos=[];
	const batch=Math.floor(now/hitperbatch);

	for (let i=0;i<hitperbatch;i++) {
		const at=hitperbatch*batch+i;		
		if (hits[at]) tpos.push(hits[at]);
		else break;
	}
	var line=extra==0?3:extra;
	fetchExcerpts(cor,{tpos,line,phrasepostings:searchstate.phrasepostings},function(excerpts){
		_updateParams({n:now,a:""},dispatch,getState);
		dispatch({type:SHOW_EXCERPT, excerpts, hitperbatch, batch, now });
		dispatch(setMode(EXCERPTVIEW));
	});
}

module.exports={showExcerpt,_showExcerpt,SHOW_EXCERPT,SET_EXCERPT_LINE,hitperbatch};

