const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const {Provider}=require('react-redux');
const App=require('./containers/app');
const configureStore=require('./store/configurestore');
const store = configureStore();

ReactDOM.render(
  E(Provider,{store},E(App)),
  document.getElementById('root')
)