const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	container:{overflowY:"auto"}
}
const {observer}=require("mobx-react");
const {groupTitle}=require("../unit/humantext");
const excerpt=require("../model/excerpt");
const searchresult=require("../model/searchresult");
const {_}=require("ksana-localization");
class SortByBook extends React.Component {
	gotogroup(n){
		const grouphits=searchresult.store.grouphits;
		var g=0,start=0;
		while (n>0 && g<grouphits.length) {
			start+=grouphits[g++];
			n--;
		}
		excerpt.showExcerpt(start);
	}
	sortResult(sort){
		const groupNames=this.props.cor.groupNames();
		if (!sort) {
			return groupNames.map((i,idx)=>idx);
		}
		if (!searchresult.store.q||!searchresult.store.grouphits)return [];

		var out=[]; //group id,hit

		
		for (var i=0;i<groupNames.length;i++) {
			const hit=searchresult.store.grouphits[i] || 0;
			out.push([i,hit]);
		}
		out.sort((a,b)=>b[1]-a[1]);
		return out.map(a=>a[0]);
	}
	rendergroup(g,key){
		if (!searchresult.store.q||!searchresult.store.grouphits)return;
		const hit=searchresult.store.grouphits[g] || 0;
		const gname=this.props.cor.groupNames()[g];
		const title=gname.replace(/;.*/g,"");
		const hint=gname.replace(/.*;/,"");
		const label=groupTitle(hint,this.props.cor);
		if (!hit) return null;

		return E("li",{key,className:"bookresult"},
				E("a",{},
					E("span",{className:"hit"},hit),
					E("span",{className:"bookname",onClick:this.gotogroup.bind(this,g),title},label)
				)				
		);
	}
	render(){
		const groups=this.sortResult(this.props.sort);
		const groupWithHits=searchresult.store.grouphits.filter(item=>!!item).length;
		return E("div",{className:"mui-dropdown"},
  				E("button",{ className:"mui-btn",
  				 "data-mui-toggle":"dropdown"},
    				_("total book")+" "+groupWithHits,
    			E("span",{className:"mui-caret"})
 				),
 				E("ul",{className:"mui-dropdown__menu"},
					groups.map(this.rendergroup.bind(this)))
			);	
		}
};

module.exports=observer(SortByBook);