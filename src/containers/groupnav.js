const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {_}=require("ksana-localization");
const styles={
	a:{cursor:"pointer"}
}
class GroupNav extends React.Component{
	next(){
		const article=this.props.cor.articleOf(this.props.address);
		const next=this.props.cor.getArticle(article.at+1);
		this.props.setA(next.startH);
	}
	prev(){
		const article=this.props.cor.articleOf(this.props.address);
		const prev=this.props.cor.getArticle(article.at-1);
		this.props.setA(prev.startH);
	}
	render(){
		const groupname=this.props.cor.getGroupName(this.props.address);
		const article=this.props.cor.articleOf(this.props.address);

		return E("span",{}
			,article.at?
				E("a",{className:"homebar fasciclelink",onClick:this.prev.bind(this)},_("Prev Fascicle")):null
			," "
			,E("span",{className:"homebar activegroup"},groupname)
			," "
			,(article.at+1<this.props.cor.articleCount())?
				E("a",{className:"homebar fasciclelink",onClick:this.next.bind(this)},_("Next Fascicle")):null
			);
	}
}
module.exports=GroupNav;