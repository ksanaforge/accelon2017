/*
	TODO , load external Cor
*/
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const mode=require("../model/mode");
const corpora=require("../model/corpora");
const searchresult=require("../model/searchresult");
class DBSelector extends React.Component {
	constructor(props){
		super(props);
		this.state={noimage:{}};
	}
	selectdb(db){
		searchresult.clear();
		corpora.setActive(db);
		mode.selectBook();
	}
	onInputKeypress(e){

	}
	onImgError(db){
		var noimage=this.state.noimage;
		noimage[db]=true;
		this.setState({noimage});
	}
	renderDB(item,key){
		const active=item==corpora.store.active;
		const cor=corpora.store.cor(item);

		var title=item;
		if (cor) {
			title=cor.meta.title;
		} else {
			setTimeout(function(){
				corpora.open(item);	
			},0);
		}
		const src="img/"+item+".png";
		const className=active?"activedbname":"dbname";
		const onClick=this.selectdb.bind(this,item);
		return E("div",{key,className:"dbselector"},
			this.state.noimage[item]?E("span",{className,onClick},title)
			  :E("img",{className,src,onClick,onError:this.onImgError.bind(this,item)}),
			E("span",{},(active?"✓":""))
		);
	}
	render(){
		const items=Object.keys(corpora.store.corpora);
		return E("div",{},items.map(this.renderDB.bind(this)));
	}
}

module.exports=DBSelector;