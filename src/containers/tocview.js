const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const GoPage=require("../components/gopage");

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
		this.cor=cor;
		const group=parseInt(this.props.params.g)||0;
		cor.getGroupTOC(group,function(toc){
			this.setState({toc});
		}.bind(this));
	}
	gotocitem(e) {
		const kpos=parseInt(e.target.dataset.kpos);
		const address=this.cor.stringify(kpos);
		this.props.readText(address);
	}
	renderItem(item,key){
		const parts=item.split("\t");
		const indent=this.state.indents[parseInt(parts[0])];
		const label=parts[1];
		const kpos=parseInt(parts[2],36);
		const pg=this.cor.pageOf(kpos)+1;
		return E("div",{key},indent,
			E("span",{"data-kpos":kpos,className:"toclabel",
				title:"Page "+pg,onClick:this.gotocitem.bind(this)},label));
	}
	render(){
		if (!this.state.toc) return E("div",{},"loading toc");
		const group=parseInt(this.props.params.g)||0;
		const range=this.cor.groupKRange(group);

		return E("div",{},
			E(GoPage,{corpus:this.props.activeCorpus, range, readText:this.props.readText}),
			this.state.toc.map(this.renderItem.bind(this))
		);
	}
}

module.exports=TOCView;