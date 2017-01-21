const React =require('react');
const ReactDOM =require('react-dom');
const PT=React.PropTypes;
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const ExcerptLine=require("../components/excerptline");
const ModeSelector=require("./modeselector");
const ExcerptNav=require("./excerptnav");

const styles={
	container:{},
	table:{width:"100%"}
}
var prevtitle="";
class ExcerptView extends React.Component {
	getSeqOfBook(grouphits,now){
		var remain=now,acc=0, g=0;
		while (remain>=grouphits[g] && g<grouphits.length) {
			remain-=grouphits[g];
			g++;
		}
		return remain ;
	}
	renderItem(item,key){
		const start=this.props.excerpt.batch*this.props.excerpt.hitperbatch;
		const n=start+key;
		const {grouphit,address,title}=this.excerptTitle(n);
		const header=(title!==prevtitle)? title:"";
		prevtitle=title;

		const seq=this.getSeqOfBook(this.props.searchresult.grouphits,n);
		const highlight=this.props.excerpt.now==n;
		var obj={};
		if (highlight) obj.ref="highlight";
		return E(ExcerptLine,Object.assign(obj,item,{key,seq,header,address,grouphit,highlight}));
	}
	excerptTitle(n){
		const cor=openCorpus(this.props.activeCorpus);
		const searchresult=this.props.searchresult;
		const tpos=searchresult.matches[n];
		const address=cor.fromTPos(tpos).kpos[0];
		if (address) {
			var addressH=cor.stringify(address);
			addressH=addressH.substr(0,addressH.length-2);
			const group=cor.groupOf(address);
			const grouphit=searchresult.grouphits[group];

			const title=cor.getGroupName(address);
			return {grouphit,title,address:addressH};
		} else {
			return {grouphit:0,title:"",address:""};
		}
	}
	gobatch(batch) {
		const hitperbatch=this.props.excerpt.hitperbatch;
		this.props.showExcerpt(batch*hitperbatch);
	}	
	render(){
		prevtitle="";
		const searchresult=this.props.searchresult;
		if (searchresult.searching)return E("div",{},"searching");
		const excerpts=this.props.excerpt.excerpts;

		const count=(searchresult.filtered||{}).length||0;
		const hitperbatch=this.props.excerpt.hitperbatch;
		const batch=this.props.excerpt.batch;

		setTimeout(function(){ //componentDidUpdate only triggered once, don't know why
			ReactDOM.findDOMNode(this.refs.highlight).scrollIntoView();
		}.bind(this),100)

		return E("div",{style:styles.container},
				E(ModeSelector,this.props),
				E(ExcerptNav,{batch,count,hitperbatch,gobatch:this.gobatch.bind(this)}),
				excerpts.map(this.renderItem.bind(this))
		)
	}
}

module.exports=ExcerptView;