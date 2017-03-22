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
const styles={
	container:{display:"flex"},
	left:{flex:8,maxWidth:1000},
	right:{flex:4}
}
class ReadText extends React.Component {
	constructor(props){
		super(props);
		this.state={popupX:0,popupY:0,text:"",title:"",hidefields:{},
		lpopupX:0,lpopupY:0,ltitle:"",links:[],lclose:true};
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
		return E("div",{style:styles.container},
			E(NotePopup,{x:this.state.popupX,y:this.state.popupY,openLink,
				text:this.state.text,title:this.state.title,tagname:this.state.tagname,
				timestamp:this.state.popuptimestamp}),
			E(LinkPopup,{x:this.state.lpopupX,y:this.state.lpopupY,openLink,
				title:this.state.ltitle,links:this.state.links,cors,mainAddress,mainCorpus,
				close:this.state.lclose,
				timestamp:this.state.lpopuptimestamp,actions:this.state.lactions}),

			E("div",{style:styles.left},E(ReadMain,props))
			,E("div",{style:styles.right},E(ReadAux,props))
		);
	}
}
module.exports=ReadText;