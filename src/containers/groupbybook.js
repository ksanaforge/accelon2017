const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	container:{overflowY:"auto"}
}
const {groupTitle}=require("../unit/humantext");

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
	sortResult(sort){
		const groupNames=this.props.cor.groupNames();
		if (!sort) {
			return groupNames.map((i,idx)=>idx);
		}
		if (!this.props.searchresult.q||!this.props.searchresult.grouphits)return [];

		var out=[]; //group id,hit

		
		for (var i=0;i<groupNames.length;i++) {
			const hit=this.props.searchresult.grouphits[i] || 0;
			out.push([i,hit]);
		}
		out.sort((a,b)=>b[1]-a[1]);
		return out.map(a=>a[0]);
	}
	rendergroup(g,key){
		if (!this.props.searchresult.q||!this.props.searchresult.grouphits)return;
		const hit=this.props.searchresult.grouphits[g] || 0;
		const gname=this.props.cor.groupNames()[g];
		const title=gname.replace(/;.*/g,"");
		const hint=gname.replace(/.*;/,"");
		const label=groupTitle(hint,this.props.cor);
		if (!hit) return null;

		return E("div",{key,className:"bookresult"},
				"　",
				"(",
				E("span",{className:"hit"},hit),
				")",
				E("span",{className:"bookname",onClick:this.gotogroup.bind(this,g),title},label)
				
		);
	}
	render(){
		const groups=this.sortResult(this.props.sort);
		return E("div",{style:styles.container},
			groups.map(this.rendergroup.bind(this)));	
	}
};

module.exports=GroupByBook;