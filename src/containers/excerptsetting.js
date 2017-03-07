const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const {_}=require("ksana-localization");
class ExcerptSetting extends React.Component {
	setExtra(e){
		this.props.setExtra(parseInt(e.target.value,10));
	}
	render(){
		const extraline=this.props.extra;
		return E("span",{}," ",E("span",{},_("Extra Line")),
			E("label",{},E("input",{onClick:this.setExtra.bind(this),
				defaultChecked:extraline==1,name:"extra",type:"radio",value:1}),_("1")),
			E("label",{},E("input",{onClick:this.setExtra.bind(this),
				defaultChecked:extraline==0,name:"extra",type:"radio",value:0}),_("3")),
			E("label",{},E("input",{onClick:this.setExtra.bind(this),
				defaultChecked:extraline==5,name:"extra",type:"radio",value:5}),_("5"))
		)
	}
}
ExcerptSetting.propTypes={
	extraline:PT.number.isRequired
}
module.exports=ExcerptSetting;