const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const GroupByBook=require("./groupbybook");
const ModeSelector=require("./modeselector");

class BookResult extends React.Component {
	render(){
		return E("div",{},
			E(GroupByBook,this.props)
		)
	}
};

module.exports=BookResult;