const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {_}=require("ksana-localization");
const {DBSELECTOR,BOOKSELECTOR,TOCVIEW,READTEXT,BOOKRESULT,EXCERPTVIEW}=require("../actions/params");
const GroupNav=require("./groupnav");
const GoPage=require("../components/gopage");
class ModelSelector extends React.Component{
	tocView(){
		this.props.setParams({m:TOCVIEW});
	}
	gotopage(){
		const group=this.props.cor.groupOf(this.props.params.a);
		const range=this.props.cor.groupKRange(group);
		
		return E(GoPage,{cor:this.props.cor, range, readText:this.props.readText});
	}
	render(){
		const m=this.props.params.m;
		const hasQ=this.props.searchresult.filtered && this.props.params.q;

		return E("span",{},
			E("a",{className:(m==BOOKSELECTOR?"activemodelink":"modelink"),onClick:this.props.selectBook},_("Select Book")),
			" ",
			E("a",{className:(m==TOCVIEW?"activemodelink":"modelink"),onClick:this.tocView.bind(this)},_("TOC View")),
			" ",
			hasQ?E("a",{className:(m==BOOKRESULT?"activemodelink":"modelink"),onClick:this.props.groupByBook},_("Group By Book")):null,
			" ",
			hasQ?E("a",{className:(m==EXCERPTVIEW?"activemodelink":"modelink"),onClick:this.props.showExcerpt},_("Excerpt")):null,
			" ",
			m==READTEXT?E(GroupNav,{setA:this.props.setA,address:this.props.params.a,cor:this.props.cor}):null,
			" ",
			(m==READTEXT||m==TOCVIEW)?this.gotopage():null


		)
	}
}

module.exports=ModelSelector;