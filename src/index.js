const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const {Provider}=require('react-redux');
const Home=require('./containers/home');
const store = require('./store/configurestore')();
require("./localestring");

const Main=function(appopts){
	var opts=appopts;
	if (appopts.corpora instanceof Array) {
		var corpora={};
		for (var i=0;i<appopts.corpora.length;i++){
			corpora[appopts.corpora[i]]=undefined;
		}
		opts=Object.assign({},appopts,{corpora});
	}
	
	ReactDOM.render(
	  E(Provider,{store},E(Home,opts)), document.getElementById('root')
	)	
}
module.exports=Main;