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
		this.state={popupX:0,popupY:0,text:"",title:""};
	}
	showNotePopup(opts){
		this.setState({popupX:opts.x,popupY:opts.y,text:opts.text,title:opts.title});
	}	
	render(){
		const props=Object.assign({},this.props,{showNotePopup:this.showNotePopup.bind(this)});
		return E("div",{style:styles.container},
			E(NotePopup,{x:this.state.popupX,y:this.state.popupY,openLink:this.props.openLink,
				text:this.state.text,title:this.state.title,markLines:mpps.markLines}),
			E("div",{style:styles.left},E(ReadMain,props))
			,E("div",{style:styles.right},E(ReadAux,props))
		);
	}
}
module.exports=ReadText;