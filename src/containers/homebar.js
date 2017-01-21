const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const SearchBox=require("./searchbox");
const SearchOptions=require("./searchoptions");
const {openCorpus}=require("ksana-corpus");

class HomeBar extends React.Component {
	render(){
		const cor=openCorpus(this.props.activeCorpus);
		const title=cor.meta.title;
		return E("div",{},
			title
			,E("br")
			,E(SearchBox,this.props)
			//,E(SearchOptions,this.props)
		)
	}
};
module.exports=HomeBar;