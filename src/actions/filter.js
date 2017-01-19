const UPDATE_EXCLUDE = 'UPDATE_EXCLUDE';
const EXCLUDE = 'EXCLUDE';
const INCLUDE_ALL = 'INCLUDE_ALL';
const SET_FILTERED = 'SET_FILTERED';
const {openCorpus}=require("ksana-corpus");
const kcs=require("ksana-corpus-search")
//const {updateResultView}=require("./occur");

const filterMatch=function(corpus,matches,excludegroup){
	const cor=openCorpus(corpus)
	if (!cor)return;
	return kcs.filterMatch(cor,matches,excludegroup);
}
const updateView=function(dispatch,getState){
	const corpus=getState().activeCorpus;
  const n=getState().activeQuery;
  var query=getState().querys[n];
  if (!query||!query.matches)return;
	var exclude=(getState().filters[corpus]||{}).exclude;	

	const matches=query.matches;
  const filtered=filterMatch(corpus,matches,exclude);
	dispatch({type:SET_FILTERED, filtered, n });
  const excerpts=getState().excerpts;

	//updateResultView(query,dispatch,excerpts);
}
const setExclude=(group,value)=>(dispatch,getState)=>{
	const corpus=getState().activeCorpus;
	dispatch({type:UPDATE_EXCLUDE,corpus,group,value});
	updateView(dispatch,getState);
}
const excludeAll=()=>(dispatch,getState)=>{
	const corpus=getState().activeCorpus;
	const cor=openCorpus(corpus)
	if (!cor)return;
	const groups=cor.groupNames().map(()=>true);
	dispatch({type:EXCLUDE,corpus,groups});
	updateView(dispatch,getState);
}
const includeAll=()=>(dispatch,getState)=>{
	const corpus=getState().activeCorpus;
	dispatch({type:INCLUDE_ALL,corpus});
	updateView(dispatch,getState);	
}
module.exports={INCLUDE_ALL,EXCLUDE,UPDATE_EXCLUDE,SET_FILTERED,
	setExclude,filterMatch,includeAll,excludeAll};