const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;

const HomeBar=require("./homebar");
const DBSelector=require("./dbselector");
const BookSelector=require("./bookselector");
const BookResult=require("./bookresult");
const mode=require("../model/mode");
const searchresult=require("../model/searchresult");
const {DBSELECTOR,BOOKSELECTOR,TOCVIEW,BOOKRESULT,READTEXT,EXCERPTVIEW}=mode;
const ExcerptView=require("./excerptview");
const TOCView=require("./tocview");

const ReadText=require("./readtext");
const Footer=require("../components/footer");

const {observer}=require("mobx-react");

const corpora=require("../model/corpora");

const {execURL,syncURL}=require("../model/url");

const styles={
	body:{overflowY:"auto",height:"96%",overflowX:"hidden"}
}

class MainScreen extends React.Component{
	componentWillMount(){
		corpora.init(this.props.corpora);
	}
	componentDidMount(){
		execURL(true);
	}
	getBody(m){
		const q=searchresult.store.q;
		m=parseInt(m);
		switch (m) {
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
		const m=parseInt(mode.store.mode);
		return (m!==READTEXT)?E(Footer):null;
	}
	componentWillUpdate(){
		console.log("main screen will update")
	}
	render(){
		console.log("main screen render")
		const cor=corpora.store.cor();
		if (!cor) return E("div",{},"loading "+corpora.store.active);
		const props=Object.assign({},this.props,{cor});

		const bodyElement=this.getBody(mode.store.mode);

		return E("div",{}
			,E(HomeBar,props)
			,E("div",{style:styles.body,ref:this.getBodyRef.bind(this)}
				,E(bodyElement,props)
				,this.showFooter()
			)

		)
	}
};

module.exports=observer(MainScreen);