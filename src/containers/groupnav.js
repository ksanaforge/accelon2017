const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const {_}=require("ksana-localization");
const styles={
	a:{cursor:"pointer"}
}
class GroupNav extends React.Component{
	next(){
		const cor=openCorpus(this.props.corpus);
		const article=cor.articleOf(this.props.address);
		const next=cor.getArticle(article.at+1);
		this.props.setA(next.startH);
	}
	prev(){
		const cor=openCorpus(this.props.corpus);
		const article=cor.articleOf(this.props.address);
		const prev=cor.getArticle(article.at-1);
		this.props.setA(prev.startH);
	}
	render(){
		const cor=openCorpus(this.props.corpus);
		const groupname=cor.getGroupName(this.props.address);
		const article=cor.articleOf(this.props.address);

		return E("span",{}
			,article.at?
				E("a",{style:styles.a,onClick:this.prev.bind(this)},_("Prev Fascicle")):null
			," "
			,groupname
			," "
			,(article.at+1<cor.articleCount())?
				E("a",{style:styles.a,onClick:this.next.bind(this)},_("Next Fascicle")):null
			);
	}
}
module.exports=GroupNav;