const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {CorpusView}=window.KsanaCorpusView||require("ksana-corpus-view");
const {ptr,def,note,link}=require("accelon2016/decorators");
const figure=require("../decorators/figure");
const kepan=require("../decorators/kepan");
const bilink=require("../decorators/bilink");
const quoteCopy=require("../unit/quotecopy");
const {_updateParams}=require("../actions/params");
//const {getExternalField}=require("../unit/fields");
const TOCNav=require("../components/tocnav");
const ReadMainmenu=require("./readmainmenu");
const {fetchArticle,loadArticleMarkup}=require("../unit/article");

const styles={
	abscontainer:{position:"relative",zIndex:200},
	nav:{position:"absolute",right:100},
	menu:{position:"absolute",left:10,top:10}
}

class ReadMain extends React.Component {
  constructor(props) {
  	super(props);
  	const kpos=this.getCaretKPos();
    this.state= {article:null,kpos};
  }
  fetch(props){
  	props=props||this.props;
		fetchArticle(this.props.cor,props.params.a,props.markups,props.searchresult,(states)=>{
			if (!this._unmounted) this.setState(states);
		})  	
  }
  componentWillReceiveProps(nextProps) {
  	if(this.props.cor.articleOf(this.props.params.a).at!==this.props.cor.articleOf(nextProps.params.a).at ) {
  		this.fetch(nextProps);
  	}
  	if (nextProps.markups != this.props.markups && nextProps.markups){
	  	const article=this.props.cor.articleOf(nextProps.params.a);
	  	const newfields=loadArticleMarkup(this.state.fields,nextProps.markups,article.at);
	  	if (newfields!==this.state.fields) this.setState({fields:newfields});
  	}
  }
	componentWillMount(){
		this.fetch(this.props);
	}
	componentWillUnmount(){
		this._unmounted=true;
	}
	updateArticleByAddress(address){
		const addressH=this.props.cor.stringify(address);
		this.props.setA(addressH);
	}
	getCaretKPos(){
		const r=this.props.cor.parseRange(this.props.params.a);
		return r.start;
	}
	onCursorActivity(cm,kpos) {
		const addressH=this.props.cor.stringify(kpos);
		if (kpos>1) {
			this.props.setA(addressH,true);
		}
	}
	render(){
		if (!this.state.article) {
			return E("div",{},"loading");
		}
		const caretpos=this.getCaretKPos();
		const navprops={caretpos,cor:this.props.cor,
			onSelectItem:this.updateArticleByAddress.bind(this)};
		return E("div",{},
			E("div",{style:styles.abscontainer},
				E("div",{style:styles.nav},E(TOCNav,navprops))
			 ,E("div",{style:styles.menu},E(ReadMainmenu,this.props))
			)
			,E(CorpusView,{address:this.props.params.a,
			decorators:{ptr,def,note,link,figure,kepan,bilink},
			cor:this.props.cor,
			corpora:this.props.corpora,
			article:this.state.article,
			rawlines:this.state.rawlines,
			layout:!!this.props.params.l,
			onCursorActivity:this.onCursorActivity.bind(this),
			copyText:quoteCopy,
			fields:this.state.fields,
			updateArticleByAddress:this.updateArticleByAddress.bind(this),
			openLink:this.props.openLink,
			showPageStart:true,
			setSelection:this.props.setSelection.bind(this),
			searchresult:this.props.searchresult,
			//theme:"ambiance"
			})
		);
	}
}

module.exports=ReadMain;