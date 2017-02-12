const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {CorpusView}=require("ksana-corpus-view");
const {fetchArticle}=require("../unit/article");
const {ptr,def,note,link}=require("accelon2016/decorators");
const bilink=require("../decorators/bilink");

class ReferenceView extends React.Component {
	constructor (props) {
		super(props);
		this.state={article:null,message:"loading"};
	}
	shouldComponentUpdate(nextProps,nextState){
		return nextProps.params.r&&
		 (nextProps.params.r!==this.props.params.r || (this.state&&(this.state.article!=nextState.article)));
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
	render(){
		if (this.state.message) {
			return E("div",{},this.state.message);
		}

		return E(CorpusView,{address:this.state.address,
			decorators:{ptr,def,note,link,bilink},
			corpus:this.state.corpus,
			article:this.state.article,
			rawlines:this.state.rawlines,
			fields:this.state.fields,
			updateArticleByAddress:this.updateArticleByAddress.bind(this),
			openLink:this.props.openLink,
			showPageStart:true,
			})
		
	}
}
module.exports=ReferenceView;