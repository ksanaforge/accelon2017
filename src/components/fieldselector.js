const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {_}=require("ksana-localization")
const styles={
	container:{whiteSpace: "break-word", display:"inline-block"}
}
class fieldSelector  extends React.Component {
	setItem(item){
		const fieldname=Object.keys(this.props.fields)[item];
		this.props.setField(fieldname, !this.props.hidefields[fieldname]);
	}
	renderItem(item,key){
		return E("label",{key,style:styles.container},E("input",{
			type:"checkbox",id:"cb"+key,
			defaultChecked:!this.props.hidefields[item],
			onChange:this.setItem.bind(this,key)}),

			E("span",{htmlFor:"cb"+key,title:item},
				_(item.replace(/@.*/,""))));//remove text after @
	}
	render(){
		const existfields=Object.keys(this.props.fields).filter(function(field){
			return !!this.props.fields[field];
		}.bind(this));
		return E("div",{},existfields.map(this.renderItem.bind(this)));
	}
}
module.exports=fieldSelector;