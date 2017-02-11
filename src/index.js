const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const {Provider}=require('react-redux');
const Home=require('./containers/home');
const store = require('./store/configurestore')();
require("./localestring");

ReactDOM.render(
  E(Provider,{store},E(Home)), document.getElementById('root')
)