const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const ReadMain=require("./readmain");
const ReadAux=require("./readaux");
const styles={
	container:{display:"flex"},
	left:{flex:8},
	right:{flex:4}
}
class ReadText extends React.Component {
	render(){
		return E("div",{style:styles.container},
			E("div",{style:styles.left},E(ReadMain,this.props))
			,E("div",{style:styles.right},E(ReadAux,this.props))
		);
	}
}
module.exports=ReadText;