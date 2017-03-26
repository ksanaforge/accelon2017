const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const SortByBook=require("./sortbybook");
const ModeSelector=require("./modeselector");
const {_}=require("ksana-localization");
const {showExcerpt}=require("../model/excerpt");
const searchresult=require("../model/searchresult");
const {observer}=require("mobx-react");
class BookResult extends React.Component {
	constructor(props){
		super(props);
		this.state={sort:true};
	}
	setSort(e){
		this.setState({sort:!this.state.sort});
	}
	render(){
		const mcount=searchresult.store.filtered?searchresult.store.filtered.length:0;

		return E("div",{},
			E("span",{},_("Matches"),":",E("span",{className:"totalhitcount"},mcount))
			," "

			,E(SortByBook,{cor:this.props.cor,
				showExcerpt,
				searchresult:searchresult.store,sort:this.state.sort})
			//,E("label",{},E("input",{type:"checkbox",onChange:this.setSort.bind(this)
			//	,checked:this.state.sort}),
			//	_("Sort by hit"))

		)
	}
};

module.exports=observer(BookResult);