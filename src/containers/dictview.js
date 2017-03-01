const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const QSelector=require("../components/qselector");
const stockurls=[
	{name:"Google",url:"https://www.google.com.tw/search?q=$$"}
]
class DictView extends React.Component{
	constructor(props){
		super(props);

		const urls=stockurls.slice();
		const o=window.accelon2017&&window.accelon2017.sites;
		if (o) {
			for (var i=0;i<o.length;i++) {
				urls.push(o[i]);
			}
		}

		this.state={site:0,urls}
	}
	componentWillMount(){
	}
	onSelect(t){
		var url=this.state.urls[this.state.site].url;
		window.open( url.replace("$$",t));
	}
	setExternalSite(idx){
		this.setState({site:idx});
	}
	renderExternalSite(item,key){
		return E("label",{key},
			E("input",{type:"radio",name:"external",
				checked:this.state.site==key,
				onChange:this.setExternalSite.bind(this,key)
			}) ,item.name," ");
	}
	render(){
		const s=this.props.selection;
		var q=s.selectionText?s.selectionText:s.caretText;
		const maxChar=this.state.urls[this.state.site].max;
		if (q.length>20) q=q.substr(0,20);
		return E("div",{},
			E(QSelector,{q,maxChar,onSelect:this.onSelect.bind(this)}),
			E("br"),
			this.state.urls.map(this.renderExternalSite.bind(this))
		)
	}
}
module.exports=DictView;