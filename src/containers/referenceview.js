const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {CorpusView}=require("ksana-corpus-view");
const {fetchArticle}=require("../unit/article");
const quoteCopy=require("../unit/quotecopy");
const {notarget2address}=require("../unit/taisho");
const decorators=require("../decorators");
const AuxMainmenu=require("./auxmainmenu");
const styles={
	abscontainer:{position:"relative",zIndex:200},
	nav:{position:"absolute",right:100},
	menu:{position:"absolute",left:10,top:10}
}

class ReferenceView extends React.Component {
	constructor (props) {
		super(props);
		this.state={article:null,message:"",cor:null};
	}
	/*
	shouldComponentUpdate(nextProps,nextState){
		const r= nextProps.params.r&&
		 (nextProps.params.r!==this.props.params.r || (this.state.article&&(this.state.article.at!=nextState.article.at)));
		 return !!r;
	}
	*/
	fetchAddress(cor,address,markups){
		if (address) this.setState({message:"loading "+address});

		if ( parseInt(address,10).toString(10)==address) {
			address=cor.stringify(address);
		}
		fetchArticle(cor,address,markups,null,function(states){
			const r=this.props.params.r;
			this.setState(Object.assign({},states,{address,cor,message:null,r}));
		}.bind(this));
	}
	componentDidMount(){
		this.loadtext(this.props);
	}
	loadtext(props){
		props=props||this.props;
		if (!props.corpora)return;
		if (!props.params.r)return ;
		const r=props.params.r.split("@");
		const corpus=r[0].toLowerCase(); //Taisho ==> taisho
		var address=r[1];
		const cor=props.corpora[corpus];
		if (!cor) {
			props.openCorpus(corpus);
			return;
		}
		const markups=props.corpusmarkups[corpus];
		if (r[0]=="Taisho") { //not page number, sutra id with optional i
			notarget2address(cor,address,newaddress=>{
				if (this.state.address!=newaddress) {
					this.fetchAddress(cor,newaddress,markups);
				}
			});
			return;
		}

		this.fetchAddress(cor,address,markups);
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.params.r)return;
		if (this.state.r!==nextProps.params.r || nextProps.markups!==this.props.markups && nextProps.markups){
			this.loadtext(nextProps);
		} 
	}
	updateArticleByAddress(address){
		const addressH=this.state.cor.stringify(address);
		this.props.setA(addressH);
	}	
	updateMainText(fulladdress){
		const r=fulladdress.split("@");
		this.props.setParams({c:r[0],a:r[1]});
	}
	render(){
		if (this.state.message || !this.state.article) {
			return E("div",{},this.state.message);
		}
		const menuprops=Object.assign({},this.props,{
			cor:this.state.cor,
			address:this.state.address});
		return E("div",{},
			E("div",{style:styles.abscontainer},
			 E("div",{style:styles.menu},E(AuxMainmenu,menuprops))
			)

			, E(CorpusView,{address:this.state.address,
			decorators,
			id:"aux",
			cor:this.state.cor,
			corpora:this.props.corpora,
			article:this.state.article,
			rawlines:this.state.rawlines,
			fields:this.props.displayField(this.state.fields),
			showNotePopup:this.props.showNotePopup,
			copyText:quoteCopy,
			showPageStart:true,
			updateArticleByAddress:this.updateArticleByAddress.bind(this),
			openLink:this.updateMainText.bind(this),
			aux:true//open Link will update main text
			})
		);
	}
}
module.exports=ReferenceView;