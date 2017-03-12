const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {CorpusView}=require("ksana-corpus-view");
const {fetchArticle}=require("../unit/article");
const quoteCopy=require("../unit/quotecopy");
const {notarget2address}=require("../unit/taisho");
const {getAnchorAddress}=require("../unit/anchor");
const decorators=require("../decorators");
const AuxMainmenu=require("./auxmainmenu");
const mode=require("../model/mode");
const address=require("../model/address");
const selection=require("../model/selection");
const markups=require("../model/markups");
const corpora=require("../model/corpora");
const {observer}=require("mobx-react");
const {autorun}=require("mobx");
const {linkpopupmatrix}=require("../unit/popupmatrix");


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
		 (nextProps.params.r!==params.store.r || (this.state.article&&(this.state.article.at!=nextState.article.at)));
		 return !!r;
	}
	*/
	fetchAddress(cor,addr,mrks){
		if (addr&&!this._unmounted) {
			this.setState({message:"loading "+addr});
		}

		if ( parseInt(addr,10).toString(10)==addr) {
			addr=cor.stringify(addr);
		}
		fetchArticle(cor,addr,mrks,function(states){
			console.log(states)
			const r=address.store.aux;
			if (!this._unmounted) {
				this.setState(Object.assign({},states,{addr,cor,message:null,r}));
			}
		}.bind(this));
	}
	componentWillUnmount(){
		this._unmounted=true;
	}
	componentDidMount(){
		autorun(()=>{
			const a=address.store.aux;
			clearTimeout(this.timer);
			this.timer=setTimeout(function(){
				if (!this._unmounted) this.loadtext(this.props);	
			}.bind(this),200);
		});		
	}
	loadtext(props){
		props=props||this.props;
 		if (!address.store.aux)return ;

		const r=address.store.aux.split("@");
		const corpus=r[0].toLowerCase(); //Taisho ==> taisho		
		const cor=corpora.store.cor(corpus);
		if (!cor) {
			corpora.open(corpus);
			return;
		}

		var addr=r[1];
		if (parseInt(addr,10).toString(10)==addr) {
			addr=cor.stringify(addr);
		}
		const range=cor.parseRange(addr);
		const mrks=markups.store.markups[corpus];

		if (!range.start) {
			const a=getAnchorAddress(cor,addr);
			if (a) this.fetchAddress(cor,a,mrks);
		} else {
			if (corpus=="Taisho") { //not page number, sutra id with optional i
				notarget2address(cor,addr,newaddress=>{
					if (this.state.address!=newaddress) {
						this.fetchAddress(cor,newaddress,mrks);
					}
				});
				return;
			}
			this.fetchAddress(cor,addr,mrks);
		}
	}
	updateArticleByAddress(addr){
		const addressH=this.state.cor.stringify(addr);
		address.setMain(addressH);
	}	
	updateMainText(fulladdress){
		const r=fulladdress.split("@");
		const cor=corpora.store.cor(r[0]);
		var a=r[1];
		if (cor) {
			const range=cor.parseRange(a);
			if (!range.start) a=cor.stringify(getAnchorAddress(cor,a));
		}
		corpora.setActive(r[0]);
		address.setMain(a);
	}
	followLinks(cm,links,actions){
		const coords=cm.cursorCoords(cm.getCursor());

		var y=coords.top-linkpopupmatrix.height-80;
		if (y<50) y=coords.top+30;
		var x=coords.left-30;
		
		this.props.showLinkPopup({x,y,links,title:"backlink",actions});
	}
	render(){
		if (this.state.message || !this.state.article) {
			return E("div",{},this.state.message);
		}
		const r=address.store.aux.split("@");
		
		const menuprops=Object.assign({},this.props,{
			cor:this.state.cor,
			corpus:r[0],
			address:this.state.address});
		const cors=corpora.openedCors();
		return E("div",{},
			E("div",{style:styles.abscontainer},
			 E("div",{style:styles.menu},E(AuxMainmenu,menuprops))
			)

			, E(CorpusView,{address:this.state.address,
			fulladdress:address.store.aux,
			decorators,
			id:"aux",
			cor:this.state.cor,
			corpora:cors,
			article:this.state.article,
			rawlines:this.state.rawlines,
			fields:this.props.displayField(this.state.fields),
			followLinks:this.followLinks.bind(this),
			showNotePopup:this.props.showNotePopup, //called by decorators/popupnote 
			copyText:quoteCopy,
			showPageStart:true,
			setSelection:selection.setSelection.bind(this),
			updateArticleByAddress:this.updateArticleByAddress.bind(this),
			openLink:this.updateMainText.bind(this),
			aux:true//open Link will update main text
			})
		);
	}
}
module.exports=observer(ReferenceView);