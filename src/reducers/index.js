const { combineReducers } =require('redux');
const params=require('./params');
const searchresult=require('./searchresult');
const filters=require('./filters');
const activeCorpus=require('./activecorpus');
const excerpt=require('./excerpt');

const rootReducer = combineReducers({
  params,
  filters,
  activeCorpus,
  searchresult,
  excerpt
});

module.exports=rootReducer;