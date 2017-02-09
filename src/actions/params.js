const SET_PARAMS="SET_PARAMS";
const {packBits,unpackBits}=require("../unit/bitstr");
const {setHashTag}=require("../unit/hashtag");
const BOOKSELECTOR=0;
const READTEXT=1;
const TOCVIEW=2;
const BOOKRESULT=10;
const EXCERPTVIEW=11;
var _updating=false;
const isUpdating=function(){
	return _updating;
}

function setParams(params,replace){
	setHashTag(params,replace);
	return Object.assign({type:"SET_PARAMS"},params);
}

function _updateParams(params) {
	_updating=true;
	setHashTag(params);
	setTimeout(function(){
		_updating=false;
	},100);
}

function setMode(m) {
	return (dispatch,getState) =>{
		if (!getState().searchresult.q && (m>=BOOKRESULT) )m=0;
		if (m!==getState().params.m) {
			dispatch(setParams({m}));
		}
	}
}

function setQ(q){
	return (dispatch,getState) =>{
		var m=BOOKRESULT;
		dispatch(setParams({q,m}));
	}
}
function setA(a,replace){ //replace =true , do not add new item in browser history
	return (dispatch,getState) =>{
		const m=getState().params.m||BOOKSELECTOR;
		dispatch(setParams({a,m},replace));
	}	
}
const selectBook=function(){
	return (dispatch,getState) =>{
		dispatch(setParams({m:BOOKSELECTOR,g:0}));
	}		
}
const readText=function(a,n){
	return (dispatch,getState) =>{
		var m=READTEXT;
		dispatch(setParams({a,m,n}));
	}
}
const groupByBook=function(){
	return (dispatch,getState) =>{
		dispatch(setParams({m:BOOKRESULT,n:0,g:0}));
	}		
}
module.exports={SET_PARAMS,isUpdating,setParams,_updateParams,setQ, setA,setMode,selectBook,groupByBook
,TOCVIEW,BOOKRESULT,BOOKSELECTOR,READTEXT,EXCERPTVIEW,readText}