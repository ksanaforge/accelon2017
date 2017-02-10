const { combineReducers } =require('redux');
const params=require('./params');
const searchresult=require('./searchresult');
const filters=require('./filters');
const activeCorpus=require('./activecorpus');
const excerpt=require('./excerpt');
const selection=require('./selection');
const corpusmarkups=require("./corpusmarkups");
const corpora=require("./corpora");
const rootReducer = combineReducers({
  params,
  filters,
  activeCorpus,
  searchresult,
  excerpt,
  selection,
  corpusmarkups,
  corpora
});

module.exports=rootReducer;