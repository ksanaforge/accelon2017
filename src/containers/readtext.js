const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const ReadMain=require("./readmain");
const ReadAux=require("./readaux");
const NotePopup=require("../components/notepopup");
const LinkPopup=require("../components/linkpopup");
const mpps=require("../unit/mpps");
const {openLink}=require("../model/address");
const corpora=require("../model/corpora");
const address=require("../model/address");
const SplitPane=require("react-split-pane");
const styles={container:{},left:{},right:{}};
const mainsizekey="accelon2017.defaultSize";
class ReadText extends React.Component {
	constructor(props){
		super(props);
		const minSize=Math.floor(window.innerWidth * 0.35);
		const w=parseInt(localStorage.getItem(mainsizekey)||"0",10);
		console.log("default size",localStorage.getItem(mainsizekey))
		const defaultSize=w||minSize*2;
		this.state={popupX:0,popupY:0,text:"",title:"",hidefields:{},
		lpopupX:0,lpopupY:0,ltitle:"",links:[],lclose:true,minSize,defaultSize};
	}
	showNotePopup(opts){
		this.setState({popupX:opts.x,popupY:opts.y,text:opts.text,
			title:opts.title,tagname:opts.tagname,popuptimestamp:new Date()});
	}
	showLinkPopup(opts){
		if (!opts) {
			this.setState({lclose:true});
		} else {
			this.setState({lclose:false,lpopupX:opts.x,lpopupY:opts.y,links:opts.links,
			lactions:opts.actions,ltitle:opts.title,lpopuptimestamp:new Date()});			
		}
	}	
	setField(field,on){
		var hidefields=this.state.hidefields;
		hidefields[field]=on;
		this.setState({hidefields});
	}	
	displayField(F){
		var fields={};
		for (var i in F) {
			if (!this.state.hidefields[i]) {
				fields[i]=F[i];
			} else {
				delete fields[i];
			}
		}
		return fields;
	}
	onSplitterDown(){

	}
	onSplitterMove(e){
		if (e.buttons==1) {
			const x=e.clientX;
			e.target.style.left=x;
		}
	}
	onSplitterUp(e){

	}
	onChangeMainSize(size){
		clearTimeout(this.timer);
			this.timer=setTimeout(function(){
	 			localStorage.setItem(mainsizekey, size);	
		},1000);
	}
	render(){
		const props=Object.assign({},this.props,{
			showNotePopup:this.showNotePopup.bind(this),
			showLinkPopup:this.showLinkPopup.bind(this),
			displayField:this.displayField.bind(this),
			hidefields:this.state.hidefields,
			setField:this.setField.bind(this)});
		
		const cors=corpora.openedCors();
		const mainAddress=address.store.main;
		const mainCorpus=corpora.store.active;
		return E("div",{},
			E(NotePopup,{x:this.state.popupX,y:this.state.popupY,openLink,
				text:this.state.text,title:this.state.title,tagname:this.state.tagname,
				timestamp:this.state.popuptimestamp}),
			E(LinkPopup,{x:this.state.lpopupX,y:this.state.lpopupY,openLink,
				title:this.state.ltitle,links:this.state.links,cors,mainAddress,mainCorpus,
				close:this.state.lclose,
				timestamp:this.state.lpopuptimestamp,actions:this.state.lactions}),

			E(SplitPane,{split:"vertical",minSize:this.state.minSize,
				defaultSize:this.state.defaultSize,
				onChange:this.onChangeMainSize.bind(this)
			},
				E("div",{},E(ReadMain,props))
				,E("div",{},E(ReadAux,props))
			)
		);
	}
}
module.exports=ReadText;