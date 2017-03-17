const React =require('react');
const E=React.createElement;
const {_}=require("ksana-localization");
class LocalFileItem extends React.Component {
	render(){
		return E("label",{},
			E("span",{className:"openlocalbutton"},
				this.props.title||_("Open local cor")),
			E("input",{type:"file",style:{display:"none"},
				accept:".cor",multiple:true,onChange:this.props.openfile})
		)
	}
}

module.exports=LocalFileItem;