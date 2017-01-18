const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const SearchOptions=React.createClass({
	render(){
		return E("span",{},
			"檢索字距"
			,E("input",{size:1})
		)
	}
});
module.exports=SearchOptions;