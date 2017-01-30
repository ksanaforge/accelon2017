const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {_}=require("ksana-localization");
const {openCorpus}=require("ksana-corpus");
const {BOOKSELECTOR,TOCVIEW,READTEXT,BOOKRESULT,EXCERPTVIEW}=require("../actions/params");

const styles={
	a:{cursor:"pointer"},
	b:{pointerEvents:"none",color:"black"}
}
class ModelSelector extends React.Component{
	tocView(){
		const cor=openCorpus(this.props.activeCorpus);
		this.props.setParams({m:TOCVIEW});
	}
	render(){
		const m=this.props.params.m;
		const hasQ=this.props.searchresult.filtered && this.props.params.q;
		const cor=openCorpus(this.props.activeCorpus);

		const groupname=this.props.params.a?cor.getGroupName(this.props.params.a):"";
		return E("span",{},
			E("a",{style:m==BOOKSELECTOR?styles.b:styles.a,onClick:this.props.selectBook},_("Select Book")),
			" ",
			E("a",{style:m==TOCVIEW?styles.b:styles.a,onClick:this.tocView.bind(this)},_("TOC View")),
			" ",
			hasQ?E("a",{style:m==BOOKRESULT?styles.b:styles.a,onClick:this.props.groupByBook},_("Group By Book")):null,
			" ",
			hasQ?E("a",{style:m==EXCERPTVIEW?styles.b:styles.a,onClick:this.props.showExcerpt},_("Excerpt")):null,
			" ",
			m==READTEXT?E("span",{style:styles.b},groupname):null
		)
	}
}

module.exports=ModelSelector;