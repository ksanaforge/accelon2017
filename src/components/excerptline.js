const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {renderHits}=require("../unit/highlight");
const {groupTitle}=require("../unit/humantext");

class ExcerptLine extends React.Component {
	highlightText(text,hits){
    return renderHits(text,hits, (o,t)=> E("span",o,t) )
	}
	openAddress(){
		this.props.openAddress(this.props.address,this.props.n);
	}
	render() {
		var pb=this.props.address||"";
		pb=pb.substr(pb.indexOf("p")+1).replace(".","-");
		return E("div",{},
			this.props.header?E("div",{className:"excerpt groupheader",
				title:this.props.shorttitle},
				groupTitle(this.props.header,this.props.cor)
				,"("
				,E("span",{className:"excerpt hitcount"},this.props.grouphit)
				,")"
			)
			:null
			,E("table",{className:"excerpt excerpttable"},
				E("tbody",{},
				E("tr",{className:"excerpt group"},
					E("td",{},E("span",{className:"excerpt seq"},this.props.seq+1)),
					E("td",{},E("a",{onClick:this.openAddress.bind(this)},
						E("span",{className:"excerpt "+(this.props.n==this.props.now?"pb_now":"excerptpb")},pb))),
					E("td",{className:"excerpt excerptline"}, this.highlightText(this.props.text,this.props.hits))
				)
				)
			)
		)
	}
}
ExcerptLine.propTypes={
	seq:PT.number.isRequired,
	header:PT.string,
	text:PT.string.isRequired,
	address:PT.string.isRequired,
	grouphit:PT.number
}
module.exports=ExcerptLine;