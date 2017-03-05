const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const mode=require("../model/mode");
const corpora=require("../model/corpora");

class DBSelector extends React.Component {
	selectdb(db){
		corpora.setActive(db);
		mode.selectBook();
	}
	onInputKeypress(e){

	}
	renderDB(item,key){
		const active=item==corpora.store.active;
		const cor=corpora.store.corpora[item];

		var title=item;
		if (cor) {
			title=cor.meta.title;
		} else {
			setTimeout(function(){
				corpora.open(item);	
			},0);
		}
		return E("div",{key,className:"dbselector"},
			E("span",{className:active?"activedbname":"dbname",
				onClick:this.selectdb.bind(this,item)},
				title+(active?"✓":""))
		);
	}
	render(){
		const items=Object.keys(corpora.store.corpora);
		return E("div",{},items.map(this.renderDB.bind(this)));
	}
}

module.exports=DBSelector;