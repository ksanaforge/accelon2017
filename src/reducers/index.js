const { combineReducers } =require('redux');
const params=require('./params');
const search=require('./search');
const filters=require('./filters');
const activeCorpus=require('./activecorpus');

const rootReducer = combineReducers({
  params,
  filters,
  activeCorpus,
  search
});

module.exports=rootReducer;