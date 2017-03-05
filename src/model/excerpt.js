const {observable,action}=require("mobx");
const store={
	excerpts:[]
	,excerptline:3
	,query:{count:0}
  ,batch:0
  ,now:0
	,hitperbatch:0
};
const showExcerpt=action((now)=>{
	store.now=now;
});
module.exports={store,showExcerpt};