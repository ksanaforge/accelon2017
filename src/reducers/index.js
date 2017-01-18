const { combineReducers } =require('redux');
const params=require('./params');

const rootReducer = combineReducers({
  params
});

module.exports=rootReducer;