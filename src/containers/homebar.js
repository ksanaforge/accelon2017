const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const SearchBox=require("./searchbox");
const SearchOptions=require("./searchoptions");
const ModeSelector=require("./modeselector");
const {DBSELECTOR,selectDB,store}=require("../model/mode");
const mode=require("../model/mode");
const m=store.mode;
const {_}=require("ksana-localization");

class HomeBar extends React.Component {
	render(){
		const title=this.props.cor&&this.props.cor.meta.title;
		const date=this.props.cor&&_("build date")+this.props.cor.meta.date;
		const opencormessage=_("click and select one or more *.cor file in your local drive");

		return E("div",{className:"homebar homebarbox"}
			,"　"
			,E("span",{onClick:mode!==DBSELECTOR?selectDB:null,
				className:"activedb",title:date},title)
			,"　"
			,this.props.cor?E(SearchBox,this.props):null
			,"　"
			,this.props.cor?E(ModeSelector,this.props):null
			,!this.props.cor?opencormessage:null
			//,E(SearchOptions,this.props)
		)
	}
};
module.exports=HomeBar;