const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const SearchBox=require("./searchbox");
const SearchOptions=require("./searchoptions");

class HomeBar extends React.Component {
	render(){
		return E("div",{},
			"印順法師佛學著作集"
			,E("br")
			,E(SearchBox,this.props)
			,E(SearchOptions,this.props)
		)
	}
};
module.exports=HomeBar;