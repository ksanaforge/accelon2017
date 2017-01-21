const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {_}=require("ksana-localization");
class BookResultPanel extends React.Component{
	render(){
		return E("div",{},
			E("a",{onClick:this.props.showExcerpt},_("View All Excerpt"))
		)
	}
}

module.exports=BookResultPanel;