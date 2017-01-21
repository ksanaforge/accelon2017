const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const ExcerptLine=require("../components/excerptline");
const styles={
	container:{overflowY:"auto",height:"96%"},
	table:{width:"100%"}
}
var prevtitle="";
class ExcerptView extends React.Component {
	renderItem(item,key){
		const {address,title}=this.excerptTitle(key);
		const header=(title!==prevtitle)? title:"";
		prevtitle=title;
	
		return E(ExcerptLine,Object.assign({},item,{key,header,address}));
	}
	excerptTitle(now){
		const cor=openCorpus(this.props.activeCorpus);
		const matches=this.props.searchresult.matches;
		const tpos=matches[now];
		const address=cor.fromTPos(tpos).kpos[0];
		if (address) {
			var addressH=cor.stringify(address);
			addressH=addressH.substr(0,addressH.length-2);
			const title=cor.getGroupName(address);
			return {title,address:addressH};
		} else {
			return {title:"",address:""};
		}
	}
	render(){
		prevtitle="";
		if (this.props.searchresult.searching)return E("div",{},"searching");
		const excerpts=this.props.excerpt.excerpts;
		return E("div",{style:styles.container},
				excerpts.map(this.renderItem.bind(this))
		)
	}
}

module.exports=ExcerptView;