const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const styles={
	container:{textAlign:"center",background:"#E0E0E0"},
	terminator:{borderTop:"solid 1px silver"}
}

class Footer extends React.Component{
	render(){
		return E("div",{style:styles.container}
			,E("div",{style:styles.terminator},"　")
			,E("div",{},"Powered By Ksana Search Engine")
			,E("div",{},E("a",{target:"_new",href:"http://www.ksana.tw"},"www.ksana.tw"))
			,E("div",{},"Version: 2017.2.24")
			,E("div",{},"　")
		)
	}
}

module.exports=Footer;