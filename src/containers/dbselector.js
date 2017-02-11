const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {openCorpus}=require("ksana-corpus");
const styles={
	container:{paddingLeft:"20px"},
	active:{fontSize:"200%",cursor:"pointer"},
	db:{cursor:"pointer",fontSize:"200%",borderBottom:"solid 1px blue"}
}
class DBSelector extends React.Component {
	constructor(props){
		super(props);
		this.state={corpora:{}};
	}
	selectdb(db){
		this.props.setC(db);
	}
	renderDB(item,key){
		const active=item==this.props.activeCorpus;
		const cor=openCorpus(item);
		var title=item;
		if (!cor) {
			openCorpus(item,function(err,db){
				setTimeout(function(){
					this.setState({corpora:Object.assign({},this.state.corpora,{[item]:db})});
				}.bind(this),100);
			}.bind(this))
		} else {
			title=cor.meta.title;
		}
		return E("div",{key,style:styles.container},
			E("span",{style:styles[active?"active":"db"],onClick:this.selectdb.bind(this,item)},
				title+(active?"✓":""))
			
		);
	}
	render(){
		return E("div",{},this.props.corpora.map(this.renderDB.bind(this)));
	}
}

module.exports=DBSelector;