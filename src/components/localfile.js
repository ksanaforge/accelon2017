const React =require('react');
const E=React.createElement;

const LocalFileItem=require("./localfileitem");
class LocalFileOther extends React.Component {
	render(){
		return E("span",{className:"localfile"},
			E(LocalFileItem,this.props)
		)
	}
}
module.exports=LocalFileOther;