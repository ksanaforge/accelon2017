/*
	TODO , load external Cor
*/
const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const mode=require("../model/mode");
const corpora=require("../model/corpora");
const searchresult=require("../model/searchresult");
const LocalFile=require("../components/localfile");
const LocalSystem=require("../components/localsystem");
const LocalFileItem=require("../components/localfileitem");
const styles={
	opencorbutton:{color:"blue"}
}
const {_}=require("ksana-localization");
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
	openfile(e){
		const id=e.target.files[0];
		for (var i=0;i<e.target.files.length;i++) {
			if (!e.target.files[i])continue;
			const corpus=e.target.files[i];
			corpora.close(corpus.name.replace(".cor",""));
			corpora.open(corpus);
		}
	}
	renderDB(item,key){
		const active=item==corpora.store.active;
		const cor=corpora.store.cor(item);

		var title=item;
		var onClick=this.selectdb.bind(this,item);
		var className=active?"activedbname":"dbname";

		if (cor) {
			title=cor.meta.title;
		} else {
			if (mode.store.fileprotocol) {
				onClick=null;
				className="dbnotopen";
			} else {
				setTimeout(function(){
					corpora.open(item);	
				},0);				
			}
		}
		var downloadurl=cor?cor.url:"";
		var builddate=cor?_("build date")+cor.meta.date:"";
		return E("div",{key,className:"dbselector"},
			E("span",{className,onClick},title),
			cor&&cor.local?E("span",{className:"localcor"},_("local cor"))
				:(downloadurl&&cor?E("a",{href:downloadurl,title:builddate},_("download")):null)	,
			E("span",{},(active?"✓":""))
		);
	}
	render(){
		const items=Object.keys(corpora.store.corpora);
		return E("div",{},
			E("br"),
			E(LocalFile,{openfile:this.openfile.bind(this)}),
			E(LocalSystem),
			items.map(this.renderDB.bind(this))

			);
	}
}

module.exports=DBSelector;