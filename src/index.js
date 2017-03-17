const React=require("react");
const ReactDOM=require("react-dom");
const E=React.createElement;
const MainScreen=require('./containers/mainscreen');
const {useStrict}=require("mobx");
const mode=require("./model/mode");
require("./localestring");
useStrict(true);

const Main=function(appopts){
	//if (window && window.location.protocol=="file:") {
		mode.selectDB();
	//}
	
	var opts=appopts;
	if (appopts.corpora instanceof Array) {
		var corpora={};
		for (var i=0;i<appopts.corpora.length;i++){
			corpora[appopts.corpora[i]]=undefined;
		}
		opts=Object.assign({},appopts,{corpora});
	}

	ReactDOM.render(E(MainScreen,opts), document.getElementById('root'))	
}
module.exports=Main;