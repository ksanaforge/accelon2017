const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;
const CodeMirror=require("ksana-codemirror").Component;
const {linkpopupmatrix}=require("../unit/popupmatrix");
var LinkPopup=React.createClass({
	getInitialState:function(){
		return {close:true,mainAddress:null,mainCorpus:null};
	},
	propTypes:{
		x:PT.number.isRequired,
		title:PT.string,
		cors:PT.object.isRequired, //open corpus
		links:PT.oneOf[PT.object.isRequired,PT.array.isRequired],
		tagname:PT.string,
		openLink:PT.func.isRequired
	},
	close:function(){
		this.setState({close:true});
		this.props.actions.highlightAddress(0);
	},
	componentWillReceiveProps:function(nextProps){
		if (nextProps.timestamp!==this.props.timestamp) {
			const mainAddress=nextProps.mainAddress;
			const mainCorpus=nextProps.mainCorpus;
			this.setState({close:false,mainAddress,mainCorpus});
		}
	},
	componentDidUpdate:function(){
		var cm=this.refs.cm;
		if (!cm)return;
		cm=cm.getCodeMirror();
	}
	,linkmouseover:function(e){
		const links=this.props.links;
		const link=links[e.target.dataset.id];
		if (!link)return;
		this.props.actions.highlightAddress(link.from);
	}
	,linkclick:function(e){
		const links=this.props.links;
		const link=links[e.target.dataset.id];
		if (!link)return;

		this.props.actions.openLink(link.corpus+"@"+link.to);
	}
	,sortLinks:function(){
		const links=this.props.links;
		const arr=[];
		for (var i in links){
			arr.push([links[i],i]);
		}
		arr.sort(function(a,b){
			const cor=this.props.cors[a[0].corpus];
			const a1=cor.parseRange(a[0].to).start;
			const b1=cor.parseRange(b[0].to).start;
			return a1>b1?(b1<a1?1:0):-1;
		}.bind(this));
		return arr;
	}
	,renderLinks:function(){
		var out=[];
		const links=this.sortLinks(this.props.links);
		const maincor=this.props.cors[this.state.mainCorpus];
		const mainr=maincor.parseRange(this.state.mainAddress);
		for (var key in links){
			const link=links[key][0];
			const id=links[key][1];
			const cor=this.props.cors[link.corpus];
			const shortname=cor.getGroupName(link.to);
			const r=cor.parseRange(link.to);
			const m=link.to.match(/(p\d+)/);
			const page=m?m[1]:link.to;
			const originate= mainr.start>r.start&&mainr.start<r.end;
			out.push(E("div",{key,className:originate?"backlink_originate":"backlink"
				,"data-id":id
				,onMouseOver:this.linkmouseover
				,onClick:this.linkclick},shortname+" "+page));
		}
		return out;
	},
	render:function(){
		if (this.props.x<0 ||this.state.close || !this.props.links.length){
			return E("div",{});
		}
		var style=JSON.parse(JSON.stringify(styles.viewcontrols));
		style.left=this.props.x;
		style.top=this.props.y;
		style.height=linkpopupmatrix.height;
		style.width=linkpopupmatrix.width;

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
				E("div",{style,className:"linkpopup"},
					E("span",{style:styles.title,className:"linkpopuptitle",onClick:this.close}
						,"✕ "+this.props.title),
					E("div",{style:styles.links}
						,this.renderLinks())
				)
		)
	}
})

var styles={

	links:{height:"100%",overflow:"auto"},
	container:{position:"relative",zIndex:101},
	viewcontrols:{position:"absolute"}, //for scrollbar
	title:{position:"absolute",top:"-1.5em",zIndex:200},
}
module.exports=LinkPopup;