const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const GroupByBook=require("./groupbybook");
const ModeSelector=require("./modeselector");
const {_}=require("ksana-localization");
class BookResult extends React.Component {
	render(){
		const mcount=this.props.searchresult.filtered?this.props.searchresult.filtered.length:0;

		return E("div",{},
			E("span",{},_("Matches"),":",mcount),
			E(GroupByBook,this.props)
		)
	}
};

module.exports=BookResult;