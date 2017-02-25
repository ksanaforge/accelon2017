const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const ReferenceView=require("./referenceview");
const DictView=require("./dictview");
const styles={
	container:{display:"flex",flexDirection:"column",height:"100%"},
	dictionary:{flex:2,overflowY:"auto"},
	reference:{height:"85%"},
}
class ReadAux extends React.Component {
	render(){
		return E("div",{style:styles.container},
			E("div",{style:styles.dictionary},E(DictView,this.props)),
			E("div",{style:styles.reference},E(ReferenceView,this.props))
		)
	}

}

module.exports=ReadAux;