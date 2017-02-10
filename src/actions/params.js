const SET_PARAMS="SET_PARAMS";
const {packBits,unpackBits}=require("../unit/bitstr");
const {setHashTag}=require("../unit/hashtag");
const BOOKSELECTOR=0;
const READTEXT=1;
const TOCVIEW=2;
const DBSELECTOR=3;
const BOOKRESULT=10;
const EXCERPTVIEW=11;
var _updating=false;
const isUpdating=function(){
	return _updating;
}

function setParams(params,replacehistory){
	setHashTag(params,replacehistory);
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
function setA(a,replacehistory){ //replacehistory =true , do not add new item in browser history
	return (dispatch,getState) =>{
		const m=getState().params.m||BOOKSELECTOR;
		dispatch(setParams({a,m},replacehistory));
	}	
}
function setC(corpus,replacehistory){
	return (dispatch,getState) =>{
		dispatch(setParams({c:corpus,m:BOOKSELECTOR},replacehistory));
	}	
}
function setRef(corpus,address,replacehistory) {
	return (dispatch,getState) =>{
		const m=getState().params.m||BOOKSELECTOR;
		dispatch(setParams({r:corpus,ra:address,m},replacehistory));
	}	
}
function setLayout(l,replacehistory){
	return (dispatch,getState) =>{
		const m=getState().params.m||BOOKSELECTOR;
		dispatch(setParams({l:l?1:0,m},replacehistory));
	}	
}
const selectBook=function(){
	return (dispatch,getState) =>{
		dispatch(setParams({m:BOOKSELECTOR,g:0}));
	}		
}
const selectDB=function(){
	return (dispatch,getState) =>{
		dispatch(setParams({m:DBSELECTOR,g:0,a:0,n:0,r:0}));
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

const openLink=function(fulladdress,replacehistory){
	const r=fulladdress.split("@");
	const corpus=r[0], address=r[1];
	if (!address) return {type:"INVALID_LINK"};
	return setParams({r:fulladdress,m:READTEXT},replacehistory);
}
module.exports={SET_PARAMS,isUpdating,setParams,_updateParams,setQ, setA, setC,selectDB,setLayout,setMode,selectBook,groupByBook
,TOCVIEW,DBSELECTOR,BOOKRESULT,BOOKSELECTOR,READTEXT,EXCERPTVIEW,readText,openLink}