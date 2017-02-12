const UPDATE_EXCLUDE = 'UPDATE_EXCLUDE';
const EXCLUDE = 'EXCLUDE';
const INCLUDE_ALL = 'INCLUDE_ALL';
const SET_FILTERED = 'SET_FILTERED';
const {setParams}=require("./params");

const kcs=require("ksana-corpus-search")
//const {updateResultView}=require("./occur");
const {packBits,unpackBits}=require("../unit/bitstr");

const _filterMatch=function(cor,matches,excludegroup){
	return kcs.filterMatch(cor,matches,excludegroup);
}

const setExcludeByStr=function(str,dispatch,getState){
	const groups=unpackBits(str,true);
	const corpus=getState().activeCorpus;
	dispatch({type:EXCLUDE,corpus,groups});
}

const updateExcerpt=function(dispatch,getState){
	const corpus=getState().activeCorpus;  

	var exclude=(getState().filters[corpus]||{}).exclude;	
	const ex=packBits(exclude);
	setParams({ex});

	if (!getState().search)return;
	const matches=getState().search.matches;
	if (!matches) return;
	const cor=getState().corpora[corpus];
	const filtered=_filterMatch(cor,matches,exclude);

	dispatch({type:SET_FILTERED, filtered , grouphits});
}


const setExclude=(group,value)=>(dispatch,getState)=>{
	const corpus=getState().activeCorpus;
	dispatch({type:UPDATE_EXCLUDE,corpus,group,value});
	updateExcerpt(dispatch,getState);
}
const excludeAll=()=>(dispatch,getState)=>{
	const corpus=getState().activeCorpus;
	const cor=getState().corpora[getState().activeCorpus];
	if (!cor)return;
	const groups=cor.groupNames().map(()=>1);
	dispatch({type:EXCLUDE,corpus,groups});
	updateExcerpt(dispatch,getState);
}
const includeAll=()=>(dispatch,getState)=>{
	const corpus=getState().activeCorpus;
	dispatch({type:INCLUDE_ALL,corpus});
	updateExcerpt(dispatch,getState);	
}


module.exports={INCLUDE_ALL,EXCLUDE,UPDATE_EXCLUDE,SET_FILTERED,
	setExclude,_filterMatch,includeAll,excludeAll,setExcludeByStr};