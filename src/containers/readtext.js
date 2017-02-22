const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const ReadMain=require("./readmain");
const ReadAux=require("./readaux");
const NotePopup=require("../components/notepopup");
const mpps=require("../unit/mpps");
const styles={
	container:{display:"flex"},
	left:{flex:8},
	right:{flex:4}
}
class ReadText extends React.Component {
	constructor(props){
		super(props);
		this.state={popupX:0,popupY:0,text:"",title:"",hidefields:{}};
	}
	showNotePopup(opts){
		this.setState({popupX:opts.x,popupY:opts.y,text:opts.text,title:opts.title,tagname:opts.tagname});
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
			displayField:this.displayField.bind(this),
			hidefields:this.state.hidefields,
			setField:this.setField.bind(this)});
		return E("div",{style:styles.container},
			E(NotePopup,{x:this.state.popupX,y:this.state.popupY,openLink:this.props.openLink,
				text:this.state.text,title:this.state.title,tagname:this.state.tagname}),
			E("div",{style:styles.left},E(ReadMain,props))
			,E("div",{style:styles.right},E(ReadAux,props))
		);
	}
}
module.exports=ReadText;