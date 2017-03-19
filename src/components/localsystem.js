const React =require('react');
const E=React.createElement;
const {_}=require("ksana-localization");
class LocalSystem extends React.Component {
	render(){
		var downloadable=window&&
		window.location.protocol=="http:"
		&&window.location.host.indexOf("127.0.0.1")==-1;
		if (!downloadable) return E("span");
		return E("span",{className:"localfile"},
			E("a",{href:"release",target:"_new"},_("local system"))
		)
	}
}
module.exports=LocalSystem;