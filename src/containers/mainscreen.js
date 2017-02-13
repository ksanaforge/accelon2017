const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;

const HomeBar=require("./homebar");
const DBSelector=require("./dbselector");
const BookSelector=require("./bookselector");
const BookResult=require("./bookresult");
const {DBSELECTOR,BOOKSELECTOR,TOCVIEW,BOOKRESULT,READTEXT,EXCERPTVIEW}=require("../actions/params");
const ExcerptView=require("./excerptview");
const TOCView=require("./tocview");
const {isUpdating}=require("../actions/params");
const ReadText=require("./readtext");
const Footer=require("../components/footer");
const styles={
	body:{overflowY:"auto",height:"96%",overflowX:"hidden"}
}
class MainScreen extends React.Component{
  componentWillMount(){
		this.props.execURL();
  }
	componentDidMount(){
		window.addEventListener('hashchange', () => {
			if (!isUpdating()) {
				this.props.execURL();
			}
		})
	}
	getBody(mode){
		const q=this.props.params.q;
		mode=parseInt(mode);
		switch (mode) {
			case DBSELECTOR: return DBSelector;
			case BOOKSELECTOR: return BookSelector;
			case READTEXT: return ReadText;
			case TOCVIEW: return TOCView;
			case BOOKRESULT: return q?BookResult:BookSelector;
			case EXCERPTVIEW: return q?ExcerptView:BookSelector;
		}
		return BookSelector;
	}
	getBodyRef(ref) {
		this.bodyref=ref;
	}
	componentDidUpdate(){
		if (this.bodyref) this.bodyref.scrollTop=0;
	}
	showFooter(){
		const mode=parseInt(this.props.params.m);
		return (mode!==READTEXT)?E(Footer):null;
	}
	render(){
		const cor=this.props.corpora[this.props.activeCorpus];
		if (!cor) return E("div",{},"loading "+this.props.activeCorpus);

		const props=Object.assign({},this.props,{cor});
		return E("div",{}
			,E(HomeBar,props)
			,E("div",{style:styles.body,ref:this.getBodyRef.bind(this)},
				E(this.getBody(this.props.params.m),props)
				,this.showFooter()
			)
			
		)
	}
};

module.exports=MainScreen;