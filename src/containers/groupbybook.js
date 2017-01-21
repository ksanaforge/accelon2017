const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {openCorpus}=require("ksana-corpus");
const styles={
	container:{overflowY:"auto"},
	bookname:{color:"navy",cursor:"pointer"},
	hit:{color:"red"}
}

class GroupByBook extends React.Component {
	gotogroup(n){
		const grouphits=this.props.searchresult.grouphits;
		var g=0,start=0;
		while (n>0 && g<grouphits.length) {
			start+=grouphits[g++];
			n--;
		}
		
		this.props.showExcerpt(start);
	}
	rendergroup(g,key){
		if (!this.props.searchresult.q)return;
		const hit=this.props.searchresult.grouphits[key] || 0;
		const hint=g.replace(/.*;/,"");
		const label=hint;//g.replace(/;.*/,"");
		if (!hit) return null;

		return E("div",{key},
				"　",
				E("span",{style:styles.bookname,onClick:this.gotogroup.bind(this,key)},label),
				"(",
				E("span",{style:styles.hit},hit),
				")"
		);
	}
	render(){
		if (!this.props.activeCorpus) return E("div");
		const cor=openCorpus(this.props.activeCorpus);
		const groupNames=cor.groupNames();
		return E("div",{style:styles.container},
			groupNames.map(this.rendergroup.bind(this)));	
	}
};

module.exports=GroupByBook;