const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const BreadCrumbTOC=require("ksana2015-breadcrumbtoc").Component;

class TOCNav extends React.Component {
	constructor (props) {
		super(props);
		this.state={toc:[]};
	}
	loadTOC(kpos){
		if (!this.props.cor)return;

		this.props.cor.getSubTOC(kpos,function(tocs){
			var toc=tocs[0] || [];
			if (toc.length && toc[0].d!==0) {
				toc=toc.slice();
				toc.unshift({d:0,t:" "});
			}
			this.setState({toc});
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
						,buttonClass:"head"
						,onSelect:this.onSelect.bind(this)
						,activeButtonStyle:styles.activeButtonStyle
						,untrimDepth:2//last two level is visible
					})
	}
};

TOCNav.propTypes={
	cor:PT.object.isRequired,
	caretpos:PT.number.isRequired,
	onSelectItem:PT.func
}

const styles={
	activeButtonStyle:{opacity:0.9},
	buttonStyle:{opacity:0.6}
}
module.exports=TOCNav;
