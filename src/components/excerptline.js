const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const {renderHits}=require("../unit/highlight");

const styles={
	tr:{background:"white",borderBottom:"1px gray solid"},
	text:{whiteSpace:"pre",display:"block"},
	hl:{color:"red"},
	table:{width:"100%"},
	grouphit:{color:"red"},
	seq:{marginLeft:3},
	pb:{},
	highlight:{background:"pink"},
	header:{background:"lightblue"}
}
class ExcerptLine extends React.Component {
	highlightText(text,hits){
    return renderHits(text,hits, (o,t)=> E("span",o,t) )
	}
	render() {
		var pb=this.props.address;
		pb=pb.substr(pb.indexOf("p")+1).replace(".","-");
		return E("div",{},
			this.props.header?E("div",{style:this.props.highlight?styles.highlight:styles.header},
				this.props.header
				,"("
				,E("span",{style:styles.grouphit},this.props.grouphit)
				,")"
			)
			:null

			,E("table",{style:styles.table},
				E("tbody",{},
				E("tr",{style:styles.tr},
					E("td",{},E("span",{style:styles.seq},this.props.seq+1)),
					E("td",{style:styles.pb},pb),
					E("td",{style:styles.text}, this.highlightText(this.props.text,this.props.hits))
				)
				)
			)
		)
	}
}
ExcerptLine.propTypes={
	seq:PT.number.isRequired,
	header:PT.string.isRequired,
	text:PT.string.isRequired,
	address:PT.string.isRequired,
	grouphit:PT.number.isRequired
}
module.exports=ExcerptLine;