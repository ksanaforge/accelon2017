const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const {CorpusView}=require("ksana-corpus-view");
const {ptr,def,note,link}=require("accelon2016/decorators");
const figure=require("../decorators/figure");
const kepan=require("../decorators/kepan");
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

class ReadText extends React.Component {
  constructor(props) {
  	super(props);
  	const kpos=this.getCaretKPos();
    this.state= {article:null,kpos};
  }
  fetch(props){
  	props=props||this.props;
		const cor=openCorpus(props.activeCorpus);
		fetchArticle(cor,props.params.a,props.markups,props.searchresult,(states)=>{
			if (!this._unmounted) this.setState(states);
		})  	
  }
  componentWillReceiveProps(nextProps) {
		const cor=openCorpus(this.props.activeCorpus);
  	if(cor.articleOf(this.props.params.a).at!==cor.articleOf(nextProps.params.a).at ) {
  		this.fetch(nextProps);
  	}
  	if (nextProps.markups != this.props.markups && Object.keys(nextProps.markups).length){
	  	const article=cor.articleOf(nextProps.params.a);
	  	const newfields=loadArticleMarkup(this.state.fields,nextProps.markups,article.at);
	  	if (newfields!==this.state.fields) this.setState({fields:newfields});
  	}
  }
	componentWillMount(){
		const cor=openCorpus(this.props.activeCorpus);
		this.fetch(this.props);
	}
	componentWillUnmount(){
		this._unmounted=true;
	}
	updateArticleByAddress(address){
		const cor=openCorpus(this.props.activeCorpus);
		const addressH=cor.stringify(address);
		this.props.setA(addressH);
	}
	getCaretKPos(){
		const cor=openCorpus(this.props.activeCorpus);
		const r=cor.parseRange(this.props.params.a);
		return r.start;
	}
	onCursorActivity(cm,kpos) {
		const cor=openCorpus(this.props.activeCorpus);
		const addressH=cor.stringify(kpos);
		if (kpos>1) {
			this.props.setA(addressH,true);
		}
	}
	render(){
		if (!this.state.article) {
			return E("div",{},"loading");
		}
		const caretpos=this.state.kpos;
		const navprops={caretpos,corpus:this.props.activeCorpus,
			onSelectItem:this.updateArticleByAddress.bind(this)};
		return E("div",{},
			E("div",{style:styles.abscontainer},
				E("div",{style:styles.nav},E(TOCNav,navprops))
			 ,E("div",{style:styles.menu},E(ReadMainmenu,this.props))
			)
			,E(CorpusView,{address:this.props.params.a,
			decorators:{ptr,def,note,link,figure,kepan},
			corpus:this.props.activeCorpus,
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

module.exports=ReadText;