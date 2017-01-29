const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const styles={
	label:{cursor:"pointer"}
}
class TOCView extends React.Component {
	constructor(props){
		super(props);
		const MAX_LEVEL=32;
		var indents=[],s="";
		for (var i=0;i<MAX_LEVEL;i++) {
			indents.push(s);
			s+="　";
		}
		this.state={toc:null,indents};
	}
	componentDidMount(){
		const cor=openCorpus(this.props.activeCorpus);
		const group=this.props.params.g||0;
		cor.getGroupTOC(group,function(toc){
			this.setState({toc});
		}.bind(this));
	}

	renderItem(item){
		const parts=item.split("\t");
		const indent=this.state.indents[parseInt(parts[0])];
		const label=parts[1];
		const kpos=parseInt(parts[2],36);
		return E("div",{},indent,
			E("span",{"data-kpos":kpos,style:styles.label},label));
	}
	render(){
		if (!this.state.toc) return E("div",{},"loading toc");

		return E("div",{},this.state.toc.map(this.renderItem.bind(this)));
	}
}

module.exports=TOCView;