const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const ExcerptLine=require("../components/excerptline");
const ModeSelector=require("./modeselector");

const styles={
	container:{},
	table:{width:"100%"}
}
var prevtitle="";
class ExcerptView extends React.Component {
	renderItem(item,key){
		const {grouphit,address,title}=this.excerptTitle(key);
		const header=(title!==prevtitle)? title:"";
		prevtitle=title;
		
		return E(ExcerptLine,Object.assign({},item,{key,header,address,grouphit}));
	}
	excerptTitle(now){
		const cor=openCorpus(this.props.activeCorpus);
		const searchresult=this.props.searchresult;
		const tpos=searchresult.matches[now];
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
	render(){
		prevtitle="";
		if (this.props.searchresult.searching)return E("div",{},"searching");
		const excerpts=this.props.excerpt.excerpts;
		return E("div",{style:styles.container},
				E(ModeSelector,this.props),
				excerpts.map(this.renderItem.bind(this))
		)
	}
}

module.exports=ExcerptView;