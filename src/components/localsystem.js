const React =require('react');
const E=React.createElement;
const {_}=require("ksana-localization");
class LocalSystem extends React.Component {
	render(){
		const title=_("download latest zip and cor files, and open index.html")
		var downloadable=window&&
		window.location.protocol=="http:"
		&&window.location.host.indexOf("127.0.0.1")==-1;
		if (!downloadable) return E("span");
		return E("span",{className:"localfile"},
			E("a",{href:"release",target:"_new",title},_("local system"))
		)
	}
}
module.exports=LocalSystem;