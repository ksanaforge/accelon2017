const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {_}=require("ksana-localization");
const mode=require("../model/mode");
const address=require("../model/address");
const excerpt=require("../model/excerpt");
const {DBSELECTOR,BOOKSELECTOR,TOCVIEW,READTEXT,EXCERPTVIEW}=mode;

const searchresult=require("../model/searchresult");
const GroupNav=require("./groupnav");
const GoPage=require("../components/gopage");
const {observer}=require("mobx-react");
class ModelSelector extends React.Component{
	gotopage(){
		const group=this.props.cor.groupOf(address.store.main);
		const range=this.props.cor.groupKRange(group);
		
		return E(GoPage,{cor:this.props.cor, range, readText:mode.readText});
	}
	showExcerpt(){
		excerpt.showExcerpt();
		mode.excerptView();
	}
	render(){
		const m=mode.store.mode;
//		const showBookResult=searchresult.store.filtered && searchresult.store.filtered.length 
//				&& searchresult.store.q;
		const hasExcerpt=searchresult.store.filtered&&searchresult.store.filtered.length;

		return E("span",{},
			E("a",{className:(m==BOOKSELECTOR?"activemodelink":"modelink"),onClick:mode.selectBook},_("Home Page")),
			" ",
			m==READTEXT?E("a",{className:(m==TOCVIEW?"activemodelink":"modelink"),onClick:mode.tocView},_("TOC View")):null,
			" ",
//			showBookResult?E("a",{className:(m==BOOKRESULT?"activemodelink":"modelink"),onClick:mode.groupByBook},_("Group By Book")):null,
//			" ",
			hasExcerpt?E("a",{className:(m==EXCERPTVIEW?"activemodelink":"modelink"),onClick:this.showExcerpt},_("Excerpt")):null,
			" ",
			m==READTEXT?E(GroupNav,{setAddress:address.setMain,address:address.store.main,cor:this.props.cor}):null,
			" ",
			(m==READTEXT||m==TOCVIEW)?this.gotopage():null
		)
	}
}

module.exports=observer(ModelSelector);