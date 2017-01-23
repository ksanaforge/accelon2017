const {EXCERPTVIEW,setMode,_updateParams}=require("./params");
//const {packBits,unpackBits}=require("../unit/bitstr");
const SHOW_EXCERPT="SHOW_EXCERPT";
const SET_EXCERPT_LINE="SET_EXCERPT_LINE";
const {fetchExcerpts}=require("ksana-corpus-search/excerpt");

const {openCorpus}=require("ksana-corpus");
const kcs=require("ksana-corpus-search");

const hitperbatch=20;

const setExcerptLine=function(line){
	if (!line) line=1;
	if (line>5) line=5;
	if (line==2||line==4) line==3;
	return {type:SET_EXCERPT_LINE, excerptline:line};
}


const showExcerpt=function(now){
	return (dispatch,getState) =>{
		if (typeof now!=="number") now=getState().params.n||0; //use n in url
		_showExcerpt(now,dispatch,getState);
	}
}

const _showExcerpt=function(now,dispatch,getState){
 	const cor=openCorpus(getState().activeCorpus);
	const searchstate=getState().searchresult;
	const hits=searchstate.matches;
	const excerptstate=getState().excerpt;
	var tpos=[];
	const batch=Math.floor(now/hitperbatch);

	for (let i=0;i<hitperbatch;i++) {
		const at=hitperbatch*batch+i;		
		if (hits[at]) tpos.push(hits[at]);
		else break;
	}
	const line=excerptstate.excerptline;
	fetchExcerpts(cor,{tpos,line,phrasepostings:searchstate.phrasepostings},function(excerpts){
		_updateParams({n:now,a:""},dispatch,getState);
		dispatch({type:SHOW_EXCERPT, excerpts, hitperbatch, batch, now });
		dispatch(setMode(EXCERPTVIEW));
	});
}

module.exports={showExcerpt,_showExcerpt,SHOW_EXCERPT,SET_EXCERPT_LINE,hitperbatch,setExcerptLine};

