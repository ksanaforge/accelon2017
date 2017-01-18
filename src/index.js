const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const {Provider}=require('react-redux');
const Home=require('./containers/home');
const SelectDB=require('./containers/selectdb');
const configureStore=require('./store/configurestore');
const store = configureStore();
const ksanacorpus=require("ksana-corpus");
const openDB=function(cb){
	ksanacorpus.openCorpus("yinshun",function(err,db){
		if (err) {
			console.error("cannot open yinshun.cor");
		} else {
			console.log(db);
			cb&&cb();
		}
	});
}
const renderPage=function(){
	ReactDOM.render(
	  E(Provider,{store},E(Home)),
	  document.getElementById('root')
	)
}

openDB(renderPage);