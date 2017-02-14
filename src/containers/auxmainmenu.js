const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const styles={
	container:{cursor:"pointer"},
	menu:{width:200,height:130,background:"silver",border:"solid 1px gray",borderRadius:"5px",padding:"5px"},
	inputfile:{opacity:0,zIndex:-1},
	uploadbutton:{cursor:"pointer",border:"1px solid black",borderRadius:"3px"},
	closebutton:{cursor:"pointer"},
	error:{background:"red",color:"yellow"}
}
const {_}=require("ksana-localization");
const {loadJSON}=require("../unit/localfile");
class ReadMainmenu extends React.Component {
	openMenu(){
		this.setState({opened:true,lasterror:""});
	}
	constructor(props){
		super(props)
		this.state={opened:false};
	}
	closemenu(){
		this.setState({opened:false});	
	}
	opennew(){
		const r=this.props.params.r.split("@");
		const corpus=(r.length==2)?r[0]:null;
		const address=(r.length==2)?r[1]:this.props.params.r;

		this.closemenu();
		this.props.openNewWindow(address,corpus);
	}
	render(){
		if (this.state.opened) {
			return E("div",{style:styles.menu},
				E("span",{onClick:this.closemenu.bind(this),style:styles.closebutton},"✕"),
				"　",
				E("button",{onClick:this.opennew.bind(this)},_("Open New Window"))
			)
		}

		return E("div",{style:styles.container,onClick:this.openMenu.bind(this)},"☰")
	}
}

module.exports=ReadMainmenu;