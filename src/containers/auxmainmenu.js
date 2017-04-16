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
const address=require("../model/address");
class AuxMainmenu extends React.Component {
	openMenu(){
		this.setState({opened:true,lasterror:""});
	}
	constructor(props){
		super(props)
		this.state={opened:false,address:this.props.address};
	}
	closemenu(){
		this.setState({opened:false});	
	}
	opennew(){
		this.closemenu();
		address.openNewWindow(this.props.address,this.props.corpus);
	}
	changeAddress(e){
		this.setState({address:e.target.value});
	}
	goAddress(e){
		if (e.key=="Enter") {
			address.setAux(this.props.corpus+"@"+this.state.address);
		}
	}
	render(){
		if (this.state.opened) {
			return E("div",{style:styles.menu},
				E("span",{onClick:this.closemenu.bind(this),style:styles.closebutton},"✕"),
				"　",
				E("input",{value:this.state.address,
					onChange:this.changeAddress.bind(this),
					onKeyPress:this.goAddress.bind(this)}),
				E("br"),
				E("span",{},this.props.cor.getTitle(this.props.address)),
				E("button",{onClick:this.opennew.bind(this)},_("Open New Window"))
			)
		}

		return E("div",{style:styles.container,onClick:this.openMenu.bind(this)},
			E("span",{className:"hamburger"},"☰"))
	}
}

module.exports=AuxMainmenu;