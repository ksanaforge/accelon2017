const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const ReadMain=require("./readmain");
const styles={
	container:{display:"flex"},
	left:{flex:5},
	right:{flex:2}
}
class ReadText extends React.Component {
	render(){
		return E("div",{style:styles.container},
			E("div",{style:styles.left},E(ReadMain,this.props))
			,E("div",{style:styles.right},E("div",{},this.props.selection.caretText))
		);
	}
}
module.exports=ReadText;