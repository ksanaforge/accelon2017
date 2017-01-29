const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {_}=require("ksana-localization");
const {openCorpus}=require("ksana-corpus");

class GoPage extends React.Component {
	constructor(props){
		super(props)
		this.cor=openCorpus(this.props.corpus);
		this.state={page:""}
	}
	gopage(){
		const startbook=this.cor.bookOf(this.props.range[0]);
		const endbook=this.cor.bookOf(this.props.range[1]);
		const pg=(parseInt(this.state.page,10)-1)||0;

		const kpos=this.cor.makeKPos([endbook-1,pg,0,0]);
		const article=this.cor.articleOf(kpos);
		if (!article)return;
		const address=this.cor.stringify(kpos);
		this.props.readText(address);
	}
	setRef(ref){
		this.input=ref;
	}
	onChange(e){
		this.setState({page:e.target.value});
	}
	onKeyPress(e){
		if (e.key==="Enter") this.gopage();
	}
	render(){
		return E("span",{},
			E("button",{onClick:this.gopage.bind(this)},_("Page Number"))
			,E("input",{ref:this.setRef.bind(this),value:this.state.page,size:5,
				onChange:this.onChange.bind(this),onKeyPress:this.onKeyPress.bind(this)})
		)
	}
};
GoPage.propTypes={
	corpus:PT.string.isRequired,
	range:PT.array.isRequired,
}
module.exports=GoPage;