const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const styles={
	container:{cursor:"pointer"},
	menu:{width:200,height:200,background:"silver"},
	inputfile:{opacity:0,zIndex:-1},
	uploadbutton:{cursor:"pointer",border:"1px solid black",borderRadius:"3px"}
}
const {_}=require("ksana-localization");
const {loadJSON}=require("../unit/localfile");
class ReadMainmenu extends React.Component {
	openMenu(){
		this.setState({opened:true});
	}
	constructor(props){
		super(props)
		this.state={opened:true};
	}
	closemenu(){
		this.setState({opened:false});	
	}
	loadmarkup(e){
		loadJSON(e.target.files[0],json=>{
			this.props.loadExternalMarkup(json);
		});
	}
	render(){
		if (this.state.opened) {
			return E("div",{style:styles.menu},
				E("button",{onClick:this.closemenu.bind(this)},"✕"),
				E("br"),
				E("label",{htmlFor:"upload",style:styles.uploadbutton},_("Load Markup")),
				E("input",{type:"file",style:styles.inputfile,accept:".json",
					id:"upload",onChange:this.loadmarkup.bind(this)})
			)
		}

		return E("div",{style:styles.container,onClick:this.openMenu.bind(this)},"☰")
	}
}

module.exports=ReadMainmenu;