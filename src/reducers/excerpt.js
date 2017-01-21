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
	,hitperbatch
};
module.exports=function Excerpt(state = initialState , action = {}) {
  if (SHOW_EXCERPT===action.type) {
  	return {excerpts:action.excerpts,
  		hitperbatch:action.hitperbatch, excerptline:action.excerptline||state.excerptline};
  } else if (SET_EXCERPT_LINE===action.type) {
  	if (state.excerptline!==action.excerptline) {
  		localStorage.setItem("yinshun_excerptline",action.excerptline);
  	}
  	return Object.assign({},state,{excerptline:action.excerptline});
  } else {
  	return state;
  }
};