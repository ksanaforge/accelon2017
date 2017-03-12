const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {observer}=require("mobx-react");

const {CorpusView}=window.KsanaCorpusView||require("ksana-corpus-view");
const decorators=require("../decorators");
const quoteCopy=require("../unit/quotecopy");
//const {getExternalField}=require("../unit/fields");
const TOCNav=require("../components/tocnav");
const ReadMainmenu=require("./readmainmenu");
const {fetchArticle,loadArticleMarkup}=require("../unit/article");
const mode=require("../model/mode");
const {openLink}=require("../model/address");
const corpora=require("../model/corpora");
const selection=require("../model/selection");
const searchresult=require("../model/searchresult");
const markups=require("../model/markups");
const address=require("../model/address");
const styles={
	abscontainer:{position:"relative",zIndex:200},
	nav:{position:"absolute",right:100},
	menu:{position:"absolute",left:10,top:10}
}

class ReadMain extends React.Component {
	constructor(props) {
		super(props);
		const kpos=this.getCaretKPos();
	this.state= {article:{at:-1},kpos};
	}
	fetch(props){
		if (this.state.address==address.store.main) {
			return;
		}
		props=props||this.props;
		fetchArticle(this.props.cor,address.store.main,markups.store,(states)=>{
			console.log(states.fields)
			if (!this._unmounted) this.setState(states);
		})  	
	}
	componentWillUpdate(){
		if (!this._unmounted) this.fetch(this.props);
	}
	componentWillMount(){
		this.fetch(this.props);
	}
	componentWillUnmount(){
		this._unmounted=true;
	}
	updateArticleByAddress(a){
		const addressH=this.props.cor.stringify(a);
		address.setMain(addressH);
	}
	getCaretKPos(){
		const r=this.props.cor.parseRange(address.store.main);
		return r.start||0;
	}
	onCursorActivity(cm,kpos) {
		const addressH=this.props.cor.stringify(kpos);
		if (kpos>1) {
			address.setMain(addressH,true);
		}
	}
	render(){
		if (!this.state.article || this.state.article==-1) {
			return E("div",{},"loading");
		}
		const caretpos=this.getCaretKPos();
		const navprops={caretpos,cor:this.props.cor,
			onSelectItem:this.updateArticleByAddress.bind(this)};
		
		const menuprops=Object.assign({},this.props,{
			layout:mode.store.layout,
			fields:this.state.fields,hidefields:this.props.hidefields,
			setField:this.props.setField});

		const cors=corpora.openedCors();
		const layout=(mode.store.layout && this.state.fields.p)?this.state.fields.p.pos:null;

		return E("div",{},
			E("div",{style:styles.abscontainer},
				E("div",{style:styles.nav},E(TOCNav,navprops))
			 ,E("div",{style:styles.menu},E(ReadMainmenu,menuprops))
			)
			,E(CorpusView,{address:address.store.main,
			
			cor:this.props.cor,
				corpora:cors,
			article:this.state.article,
			rawlines:this.state.rawlines||[],
			layout,
			decorators,
			onCursorActivity:this.onCursorActivity.bind(this),
			copyText:quoteCopy,
			fields:this.props.displayField(this.state.fields),
			updateArticleByAddress:this.updateArticleByAddress.bind(this),
			openLink,
			showNotePopup:this.props.showNotePopup,
			showPageStart:true,
			setSelection:selection.setSelection.bind(this),
			searchresult:searchresult.store,
			//theme:"ambiance"
			})
		);
	}
}

module.exports=observer(ReadMain);