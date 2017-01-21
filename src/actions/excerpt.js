const {EXCERPTVIEW,setParams}=require("./params");
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


const showExcerpt=function(batch){
	return (dispatch,getState) =>{
		if (typeof batch!=="number") batch=0;
		_showExcerpt(batch,dispatch,getState);
	}
}

const _showExcerpt=function(batch,dispatch,getState){
 	const cor=openCorpus(getState().activeCorpus);

	const searchstate=getState().searchresult;
	const hits=searchstate.matches;
	const excerptstate=getState().excerpt;
	var tpos=[];

	for (let i=0;i<hitperbatch;i++) {
		const at=hitperbatch*batch+i;		
		tpos.push(hits[at]);
	}

	const line=excerptstate.excerptline;
	fetchExcerpts(cor,{tpos,line,phrasepostings:searchstate.phrasepostings},function(excerpts){
		dispatch({type:SHOW_EXCERPT, excerpts, hitperbatch, batch});
		dispatch(setParams({m:EXCERPTVIEW}));
	});
}

module.exports={showExcerpt,_showExcerpt,SHOW_EXCERPT,SET_EXCERPT_LINE,hitperbatch,setExcerptLine};

