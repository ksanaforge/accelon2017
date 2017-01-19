const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const GroupByBook=require("./groupbybook");
const BookResultPanel=require("./bookresultpanel");

class BookResult extends React.Component {
	render(){
		return E("div",{},
			E(BookResultPanel,this.props),
			E(GroupByBook,this.props)
		)
	}
};

module.exports=BookResult;