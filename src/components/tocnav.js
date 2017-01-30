const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const BreadCrumbTOC=require("ksana2015-breadcrumbtoc").Component;
const {openCorpus}=require("ksana-corpus");

class TOCNav extends React.Component {
	constructor (props) {
		super(props);
		this.state={toc:[]};
	}
	loadTOC(kpos){
		if (!this.props.corpus)return;
		const cor=openCorpus(this.props.corpus);
		if (!cor)return;
		cor.getSubTOC(kpos,function(tocs){
			this.setState({toc:tocs[0]||[]});
		}.bind(this));
	}
	componentWillReceiveProps(nextProps){
		if (nextProps.caretpos!==this.props.caretpos) {
			this.loadTOC(nextProps.caretpos);
		}
	}
	componentDidMount() {
		this.loadTOC(this.props.caretpos);
	}
	onSelect(idx,address){
		this.props.onSelectItem&&this.props.onSelectItem(address);
	}
	render(){
		return E(BreadCrumbTOC,{toc:this.state.toc,pos:this.props.caretpos
						,buttonStyle:styles.buttonStyle
						,onSelect:this.onSelect.bind(this)
						,activeButtonStyle:styles.activeButtonStyle
						,untrimDepth:2//last two level is visible
					})
	}
};

TOCNav.propTypes={
	corpus:PT.string.isRequired,
	caretpos:PT.number.isRequired,
	onSelectItem:PT.func
}

const styles={
	activeButtonStyle:{opacity:0.9,fontWeight:700},
	buttonStyle:{opacity:0.7,fontWeight:700,color:"blue"},	
	selectedButton:{background:"blue",color:"white"}
}
module.exports=TOCNav;
