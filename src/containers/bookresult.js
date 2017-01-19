const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {openCorpus}=require("ksana-corpus");
const styles={
	container:{overflowY:"auto"},
	bookname:{color:"navy"},
	hit:{color:"red"}
}

const BookResult=React.createClass({
	rendergroup(g,key){
		if (!this.props.filter.hits)return;
		const hit=this.props.filter.hits[key] || 0;
		const hint=g.replace(/.*;/,"");
		const label=hint;//g.replace(/;.*/,"");
		if (!hit) return null;

		return E("div",{key},
				E("span",{style:styles.bookname},label),
				"(",
				E("span",{style:styles.hit},hit),
				")"
		);
	}
	,render(){
		console.log("render Bookresult")
		if (!this.props.activeCorpus) return E("div");
		const cor=openCorpus(this.props.activeCorpus);		
		const groupNames=cor.groupNames();
		return E("div",{style:styles.container},
			groupNames.map(this.rendergroup));	
	}
});

module.exports=BookResult;