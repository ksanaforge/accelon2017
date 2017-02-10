const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {openCorpus}=require("ksana-corpus");
const {CorpusView}=require("ksana-corpus-view");
const {fetchArticle}=require("../unit/article");
const {ptr,def,note,link}=require("accelon2016/decorators");

class ReferenceView extends React.Component {
	constructor (props) {
		super(props);
		this.state={article:null};
	}
	shouldComponentUpdate(nextProps,nextState){
		return this.state.article!=nextState.article;
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.params.r)return;
		const r=nextProps.params.r.split("@");
		const corpus=r[0],address=r[1];
		const cor=openCorpus(corpus);
		if (!cor)return;
		fetchArticle(cor,address,null,null,function(states){
			this.setState(Object.assign({},states,{address,corpus}));
		}.bind(this));
	}
	updateArticleByAddress(address){
		const cor=openCorpus(this.props.activeCorpus);
		const addressH=cor.stringify(address);
		this.props.setA(addressH);
	}	
	render(){
		if (!this.state.article) {
			return E("div",{},"loading",this.props.params.r);
		}

		return E(CorpusView,{address:this.state.address,
			decorators:{ptr,def,note,link},
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