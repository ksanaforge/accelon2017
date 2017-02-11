const React =require('react');
const ReactDOM =require('react-dom');
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
		this.state={toc:null,indents,kpos:0};
	}
	buildToc(rawtoc){
		var toc=[];
		for (var i=0;i<rawtoc.length;i++) {
			const item=rawtoc[i];
			const parts=item.split("\t");
			const depth=parseInt(parts[0]);
			const label=parts[1];
			const kpos=parseInt(parts[2],36);
			toc.push([kpos,depth,label])
		}
		return toc;
	}
	componentDidMount(){
		const cor=openCorpus(this.props.activeCorpus);
		this.cor=cor;
		const group=cor.groupOf(this.props.params.a);
		const kpos=this.cor.parseRange(this.props.params.a).start;

		cor.getGroupTOC(group,function(rawtoc){
			const toc=this.buildToc(rawtoc);
			this.setState({toc,kpos});
		}.bind(this));
	}
	gotocitem(e) {
		const kpos=parseInt(e.target.dataset.kpos);
		const address=this.cor.stringify(kpos);
		this.props.readText(address);
	}
	componentDidUpdate(){ 
		setTimeout(function(){ //scroll to closest toc node
			const ref=this.refs.toclabel_selected;
			if (ref) ref.scrollIntoView(false);
			const container=this.refs.body.parentElement;
			container.scrollTop+=window.innerHeight/2;
		}.bind(this),100); //need to wait react to update DOM
	}
	renderItem(item,key,toc){
		const kpos=item[0], indent=this.state.indents[item[1]], label=item[2];
		const pg=this.cor.pageOf(kpos)+1;
		var extra="";

		if (this.state.kpos>=kpos && key<toc.length-1 && this.state.kpos<toc[key+1][0]) {
			extra=" toclabel_selected"
		}
		return E("div",{key},indent,
			E("span",{"data-kpos":kpos,className:"toclabel"+extra,ref:extra.trim(),
				title:"Page "+pg,onClick:this.gotocitem.bind(this)},label));
	}
	render(){
		if (!this.state.toc) return E("div",{},"loading toc");
		const group=this.cor.groupOf(this.props.params.a);
		const range=this.cor.groupKRange(group);
		
		
		return E("div",{ref:"body"},
			E(GoPage,{corpus:this.props.activeCorpus, range, readText:this.props.readText}),
			this.state.toc.map(this.renderItem.bind(this))
		);
	}
}

module.exports=TOCView;