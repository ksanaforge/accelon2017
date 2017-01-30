const  {SHOW_EXCERPT,SET_EXCERPT_LINE,hitperbatch} = require('../actions/excerpt');
/*
{text:"a\na\na"}
	,{text:"b\nb\nb"}
	,{text:"c\nc\nc"}
	,{text:"d\nd\nd"}
	,{text:"e\ne\ne"}
*/
const initialState={
	excerpts:[]
	,excerptline:parseInt(localStorage.getItem("yinshun_excerptline"),10)||3
	,query:{count:0}
  ,batch:0
  ,now:0
	,hitperbatch
};
module.exports=function Excerpt(state = initialState , action = {}) {
  if (SHOW_EXCERPT===action.type) {
  	return {excerpts:action.excerpts,batch:action.batch,now:action.now,
  		hitperbatch:action.hitperbatch, excerptline:action.excerptline||state.excerptline};
  } else {
  	return state;
  }
};