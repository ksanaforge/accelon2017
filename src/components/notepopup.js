const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;
const {notepopupmatrix}=require("../unit/popupmatrix");
const LinesMarkers={
	mppsnote:require("../unit/mpps").markNoteLines,
	yinshunnote:require("../unit/yinshun").markNoteLines,
	footnote:require("../unit/mpps").markNoteLines
}
const quoteCopy=require("../unit/quotecopy");

var NotePopup=React.createClass({
	getInitialState:function(){
		return {close:true};
	},
	propTypes:{
		//rule:PT.object.isRequired,
		x:PT.number.isRequired,
		y:PT.number.isRequired,
		text:PT.string.isRequired,
		title:PT.string,
		tagname:PT.string,
		openLink:PT.func.isRequired,
		cor:PT.object
	},
	close:function(){
		this.setState({close:true});
	},
	componentWillReceiveProps:function(nextProps){
		if (nextProps.timestamp!==this.props.timestamp) {
			this.setState({close:false});
		}
	},
	onCopy:function(cm,evt){
		var v=evt.target.value;
		v="("+this.props.title+")"+v
		.replace(/\{k/g,"").replace(/k\}/g,"")
		.replace(/\{b/g,"").replace(/b\}/g,"")
		.replace(/@t(\d+)p/g,function(m,m1){
			return "大正"+m1+"，";
		});
		evt.target.value=v;
		evt.target.select();		
	},
	componentDidUpdate:function(){
		var cm=this.refs.cm;
		if (!cm)return;
		cm=cm.getCodeMirror();
		const markLines=LinesMarkers[this.props.tagname];
		markLines&&markLines(cm,0,cm.lineCount()-1,this.props.openLink,this.props.cor);
	},
	render:function(){
		if (!this.props.text||this.props.x<0 ||this.state.close){
			return E("div",{});
		}
		var style=JSON.parse(JSON.stringify(styles.viewcontrols));
		style.left=this.props.x;
		style.top=this.props.y;
		style.height=notepopupmatrix.height;
		style.width=notepopupmatrix.width;

		if (style.left+style.width>window.innerWidth) {
			style.left=window.innerWidth-style.width;
		}
		if (style.top+style.height>window.innerHeight) {
			style.top=window.innerHeight-style.height;
		}

		if (style.left+style.width>this.props.w) {
				style.left-=style.left+style.width-this.props.w+20;
		} 
		if (style.top+style.height>this.props.h) {
				style.top-=style.top+style.height-this.props.h+20;
		} 
		return	E("div",{style:styles.container},
				E("div",{style,className:"notepopup"},
					E("span",{style:styles.title,className:"notepopuptitle",onClick:this.close}
						,"✕ "+this.props.title),
					E(CodeMirror,{ref:"cm",readOnly:true,value:this.props.text,
						onCopy:this.onCopy
				})
				)
		)
	}
})

var styles={
	container:{position:"relative",zIndex:101},
	viewcontrols:{position:"absolute"}, //for scrollbar
	title:{position:"absolute",top:"-1.5em",zIndex:200},
}
module.exports=NotePopup;