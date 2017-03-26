const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {_}=require("ksana-localization");
const mode=require("../model/mode");
const excerpt=require("../model/excerpt");
const searchresult=require("../model/searchresult");
const address=require("../model/address");


class SearchBox extends React.Component {
	constructor(props){
		super(props)
		this.state={q:searchresult.store.q||""}
	}
	componentWillReceiveProps(nextProps,nextState){
		this.setState({q:searchresult.store.q});
	}
	tryAddress(q){
		var address=false;
		const r=this.props.cor.parseRange(q);
		if (r.start) {
			address=q;
		}
		
		return address;
	}
	search(){
		const a=this.tryAddress(this.state.q);
		if (a) {
			searchresult.setQ("");
			mode.readText();
			address.setMain(a);
		} else {
			searchresult.setQ(this.state.q,function(){
				excerpt.showExcerpt();
				mode.excerptView();
			});
			this.input.focus();
		}
	}
	setRef(ref){
		this.input=ref;
	}
	onChange(e){
		this.setState({q:e.target.value});
	}
	onKeyPress(e){
		if (e.key==="Enter") this.search();
	}
	render(){
		return E("span",{className:"searchbox"},
			E("input",{className:"input",placeholder:_("Puncuation to enable Fuzzy Search"),ref:this.setRef.bind(this),value:this.state.q,
				onChange:this.onChange.bind(this),onKeyPress:this.onKeyPress.bind(this)})
			,E("button",{className:"button",onClick:this.search.bind(this)},_("Search"))
		)
	}
};
module.exports=SearchBox;