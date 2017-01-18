const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;
const reducer=require('../reducers');
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);
const devtool=window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const configureStore=function(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState, devtool);
//const store=createStore(reducer,applyMiddleware(thunk));

  // When using WebPack, module.hot.accept should be used. In LiveReactload,
  // same result can be achieved by using "module.onReload" hook.
  if (module.onReload) {
    module.onReload(() => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer.default || nextReducer);

      // return true to indicate that this module is accepted and
      // there is no need to reload its parent modules
      return true
    });
  }

  return store;
}
module.exports=configureStore;