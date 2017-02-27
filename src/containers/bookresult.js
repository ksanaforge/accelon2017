const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const GroupByBook=require("./groupbybook");
const ModeSelector=require("./modeselector");
const {_}=require("ksana-localization");
class BookResult extends React.Component {
	constructor(props){
		super(props);
		this.state={sort:true};
	}
	setSort(e){
		this.setState({sort:!this.state.sort});
	}
	render(){
		const mcount=this.props.searchresult.filtered?this.props.searchresult.filtered.length:0;

		return E("div",{},
			E("span",{},_("Matches"),":",mcount),
			" ",
			E("label",{},E("input",{type:"checkbox",onChange:this.setSort.bind(this)
				,checked:this.state.sort}),
				_("Sort by hit")),

			E(GroupByBook,{cor:this.props.cor,
				showExcerpt:this.props.showExcerpt,
				searchresult:this.props.searchresult,sort:this.state.sort})
		)
	}
};

module.exports=BookResult;