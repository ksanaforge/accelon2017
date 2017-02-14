const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	container:{paddingLeft:"20px"},
	active:{fontSize:"200%",cursor:"pointer"},
	db:{cursor:"pointer",fontSize:"200%",borderBottom:"solid 1px blue"}
}
class DBSelector extends React.Component {
	selectdb(db){
		this.props.setC(db);
	}
	onInputKeypress(e){

	}
	renderDB(item,key){
		const active=item==this.props.activeCorpus;
		const cor=this.props.corpora[item];
		var title=item;
		if (!cor) {
			this.props.openCorpus(item);
		} else {
			title=cor.meta.title;
		}
		return E("div",{key,style:styles.container},
			E("span",{style:styles[active?"active":"db"],onClick:this.selectdb.bind(this,item)},
				title+(active?"✓":""))
		);
	}
	render(){
		const corpora=Object.keys(this.props.corpora);
		return E("div",{},corpora.map(this.renderDB.bind(this)));
	}
}

module.exports=DBSelector;