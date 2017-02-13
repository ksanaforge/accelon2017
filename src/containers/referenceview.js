const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {CorpusView}=require("ksana-corpus-view");
const {fetchArticle}=require("../unit/article");
const {ptr,def,note,link}=require("accelon2016/decorators");
const bilink=require("../decorators/bilink");
const quoteCopy=require("../unit/quotecopy");

class ReferenceView extends React.Component {
	constructor (props) {
		super(props);
		this.state={article:null,message:"loading"};
	}
	shouldComponentUpdate(nextProps,nextState){
		const r= nextProps.params.r&&
		 (nextProps.params.r!==this.props.params.r || (this.state&&(this.state.article!=nextState.article)));
		 return !!r;
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.params.r)return;
		const r=nextProps.params.r.split("@");
		const corpus=r[0];
		var address=r[1];
		const cor=this.props.corpora[corpus];
		if (!cor) {
			this.props.openCorpus(corpus);
			return;
		}
		if ( parseInt(address,10).toString(10)==address) {
			address=cor.stringify(address);
		}
		this.setState({message:"loading "+nextProps.params.r});
		const markups=nextProps.corpusmarkups[corpus];

		fetchArticle(cor,address,markups,null,function(states){
			this.setState(Object.assign({},states,{address,corpus,message:null}));
		}.bind(this));
	}
	updateArticleByAddress(address){
		const cor=this.props.corpora[corpus];
		const addressH=cor.stringify(address);
		this.props.setA(addressH);
	}	
	updateMainText(fulladdress){
		const r=fulladdress.split("@");
		this.props.setParams({c:r[0],a:r[1]});
	}
	render(){
		if (this.state.message) {
			return E("div",{},this.state.message);
		}

		return E(CorpusView,{address:this.state.address,
			decorators:{ptr,def,note,link,bilink},
			corpus:this.state.corpus,
			corpora:this.props.corpora,
			article:this.state.article,
			rawlines:this.state.rawlines,
			fields:this.state.fields,
			copyText:quoteCopy,
			updateArticleByAddress:this.updateArticleByAddress.bind(this),
			openLink:this.updateMainText.bind(this),
			aux:true//open Link will update main text
			})
		
	}
}
module.exports=ReferenceView;