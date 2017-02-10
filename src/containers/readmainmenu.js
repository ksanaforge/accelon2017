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
	loadmarkup(e){
		this.setState({lasterror:"loading"});
		loadJSON(e.target.files[0],json=>{
			const meta=json.shift();
			
			if (meta.corpus!==this.props.activeCorpus) {
				this.setState({lasterror:"markup is not for this corpus"});
			} else {
				this.setState({lasterror:"",first:meta.first});
				this.props.loadExternalMarkup(meta,json,this.props.activeCorpus);
			}
		});
	}
	gotofirst(){
		this.setState({first:null,opened:false});
		this.props.setA(this.state.first);
	}
	renderFirstMarkup(){
		if (this.state.first) {
			return E("button",{onClick:this.gotofirst.bind(this)},_("View First Markup"));
		}
	}
	togglelayout(){
		this.props.setLayout(this.props.params.l?0:1,true);
	}
	render(){
		const layout=this.props.params.l;
		if (this.state.opened) {
			return E("div",{style:styles.menu},
				E("span",{onClick:this.closemenu.bind(this),style:styles.closebutton},"✕"),
				"　",
				E("button",{onClick:this.togglelayout.bind(this)},layout?_("Layout Off"):_("Layout On")),
				E("br"),
				E("br"),"　",
				E("label",{htmlFor:"upload",style:styles.uploadbutton},_("Load Markup")),
				E("input",{type:"file",style:styles.inputfile,accept:".json",
					id:"upload",onChange:this.loadmarkup.bind(this)}),
				this.renderFirstMarkup(),
				E("span",{style:styles.error},this.state.lasterror)
			)
		}

		return E("div",{style:styles.container,onClick:this.openMenu.bind(this)},"☰")
	}
}

module.exports=ReadMainmenu;