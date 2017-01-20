const UPDATE_EXCLUDE = 'UPDATE_EXCLUDE';
const EXCLUDE = 'EXCLUDE';
const INCLUDE_ALL = 'INCLUDE_ALL';
const SET_FILTERED = 'SET_FILTERED';
const {openCorpus}=require("ksana-corpus");
const {setParams}=require("./params");

const kcs=require("ksana-corpus-search")
//const {updateResultView}=require("./occur");
const {packBits,unpackBits}=require("../unit/bitstr");

const filterMatch=function(corpus,matches,excludegroup){
	const cor=openCorpus(corpus)
	if (!cor)return;
	return kcs.filterMatch(cor,matches,excludegroup);
}

const updateExcerpt=function(dispatch,getState){
	const corpus=getState().activeCorpus;  

	var exclude=(getState().filters[corpus]||{}).exclude;	
	const ex=packBits(exclude);
	setParams({ex});


	const matches=getState().search.matches;
	if (!matches) return;
	const filtered=filterMatch(corpus,matches,exclude);
	dispatch({type:SET_FILTERED, filtered });
	const excerpts=getState().excerpts;	
}


const setExclude=(group,value)=>(dispatch,getState)=>{
	const corpus=getState().activeCorpus;
	dispatch({type:UPDATE_EXCLUDE,corpus,group,value});
	updateExcerpt(dispatch,getState);
}
const excludeAll=()=>(dispatch,getState)=>{
	const corpus=getState().activeCorpus;
	const cor=openCorpus(corpus)
	if (!cor)return;
	const groups=cor.groupNames().map(()=>true);
	dispatch({type:EXCLUDE,corpus,groups});
	updateExcerpt(dispatch,getState);
}
const includeAll=()=>(dispatch,getState)=>{
	const corpus=getState().activeCorpus;
	dispatch({type:INCLUDE_ALL,corpus});
	updateExcerpt(dispatch,getState);	
}


module.exports={INCLUDE_ALL,EXCLUDE,UPDATE_EXCLUDE,SET_FILTERED,
	setExclude,filterMatch,includeAll,excludeAll};