const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const {Provider}=require('react-redux');
const Home=require('./containers/home');
const SelectDB=require('./containers/selectdb');
const configureStore=require('./store/configurestore');
const store = configureStore();
const ksanacorpus=require("ksana-corpus");
require("./localestring");

/* open db on demand 
   reducer corpora show available and opened database
*/
const openDB=function(cb,corpus){
	corpus=corpus||store.getState().activeCorpus;
	ksanacorpus.openCorpus(corpus,function(err,db){
		if (err) {
			console.error("cannot open "+corpus+".cor");
		} else {
			cb&&cb();
		}
	});
}
ReactDOM.render(
  E(Provider,{store},E(Home)),
	 document.getElementById('root')
)
