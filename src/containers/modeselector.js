const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {_}=require("ksana-localization");
const {BOOKSELECTOR,READTEXT,BOOKRESULT,EXCERPTVIEW}=require("../actions/params");

const styles={
	a:{cursor:"pointer"},
	b:{pointerEvents:"none",color:"black"}
}
class ModelSelector extends React.Component{
	render(){
		const m=this.props.params.m;
		const hasQ=this.props.searchresult.filtered;
		return E("span",{},
			E("a",{style:m==BOOKSELECTOR?styles.b:styles.a,onClick:this.props.selectBook},_("Select Book")),
			" ",
			hasQ?E("a",{style:m==BOOKRESULT?styles.b:styles.a,onClick:this.props.groupByBook},_("Group By Book")):null,
			" ",
			hasQ?E("a",{style:m==EXCERPTVIEW?styles.b:styles.a,onClick:this.props.showExcerpt},_("View Excerpt")):null,
			" ",
			m==READTEXT?E("span",{style:styles.b},_("Read Text")):null
		)
	}
}

module.exports=ModelSelector;