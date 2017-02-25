const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;

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
		return E("div",{key,className:"dbselector"},
			E("span",{className:active?"activedbname":"dbname",
				onClick:this.selectdb.bind(this,item)},
				title+(active?"✓":""))
		);
	}
	render(){
		const corpora=Object.keys(this.props.corpora);
		return E("div",{},corpora.map(this.renderDB.bind(this)));
	}
}

module.exports=DBSelector;