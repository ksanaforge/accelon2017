const UPDATE_PARAMS_FROM_URL="UPDATE_PARAMS_FROM_URL";
const SET_PARAMS="SET_PARAMS";
const {packBits,unpackBits}=require("../unit/bitstr");
const {setHashTag}=require("../unit/hashtag");
const BOOKSELECTOR=0;
const READTEXT=1;
const BOOKRESULT=10;
const EXCERPTVIEW=11;


function setParams(params){
	setHashTag(params);
	return {type:"SET_PARAMS"};
}

function setMode(m) {
	return (dispatch,getState) =>{
		if (!getState().searchresult.q && (m>=BOOKRESULT) )m=0;
		dispatch(setParams({m}));
	}
}

function setQ(q){
	return (dispatch,getState) =>{
		var m=BOOKRESULT;
		if (!getState().searchresult.q && (m>=BOOKRESULT) )m=0;
		dispatch(setParams({q,m}));
	}
}
const selectBook=function(){
	return (dispatch,getState) =>{
		dispatch(setParams({m:BOOKSELECTOR}));
	}		
}

const groupByBook=function(){
	return (dispatch,getState) =>{
		dispatch(setParams({m:BOOKRESULT}));
	}		
}
module.exports={UPDATE_PARAMS_FROM_URL,setParams,setQ, setMode,selectBook,groupByBook
,BOOKRESULT,BOOKSELECTOR,READTEXT,EXCERPTVIEW}