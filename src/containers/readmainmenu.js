const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const FieldSelector=require("../components/fieldselector");
const {loadExternalMarkup}=require("../model/markups");
const styles={
	container:{cursor:"pointer"},
	inputfile:{opacity:0,zIndex:-1},	
	closebutton:{cursor:"pointer"},
	error:{background:"red",color:"yellow"}
}
const {_}=require("ksana-localization");
const {loadJSON}=require("../unit/localfile");
const mode=require("../model/mode");
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
			
			if (meta.corpus!==this.props.cor.id) {
				this.setState({lasterror:"markup is not for this corpus"});
			} else {
				this.setState({lasterror:"",first:meta.first});
				loadExternalMarkup(meta,json,this.props.cor);
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
		mode.setLayout(this.props.layout?0:1,true);
	}

	render(){
		const layout=this.props.layout;
		const hasP=this.props.fields&&this.props.fields.p &&
		this.props.fields.p.pos&&this.props.fields.p.pos.length;
		if (this.state.opened) {
			return E("div",{className:"readmainmenu"},
				E("span",{onClick:this.closemenu.bind(this),style:styles.closebutton},"✕"),
				"　",
				hasP?E("button",{onClick:this.togglelayout.bind(this)},layout?_("Layout Off"):_("Layout On")):null,
				E("br"),
				E(FieldSelector,{fields:this.props.fields,hidefields:this.props.hidefields,setField:this.props.setField}),
				E("br"),"　",
				E("label",{htmlFor:"upload",className:"uploadmarkupbutton"},_("Load Markup")),
				E("input",{type:"file",style:styles.inputfile,accept:".json",
					id:"upload",onChange:this.loadmarkup.bind(this)}),
				this.renderFirstMarkup(),
				E("span",{style:styles.error},this.state.lasterror)
			)
		}

		return E("div",{style:styles.container,onClick:this.openMenu.bind(this)},
			E("span",{className:"hamburger"},"☰"))
	}
}

module.exports=ReadMainmenu;