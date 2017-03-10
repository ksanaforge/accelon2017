const React =require('react');
const ReactDOM =require('react-dom');
const {observer}=require("mobx-react");
const PT=React.PropTypes;
const E=React.createElement;
const ExcerptLine=require("../components/excerptline");
const ExcerptPager=require("./excerptpager");
const ExcerptSetting=require("./excerptsetting");
const mode=require("../model/mode");
const searchresult=require("../model/searchresult");
const excerpt=require("../model/excerpt");
const address=require("../model/address");
const {highlightExcerpt}=require("../unit/highlight");
const styles={
	container:{},
	table:{width:"100%"}
}
var prevtitle="";
class ExcerptView extends React.Component {
	getSeqOfBook(grouphits,now){
		if (!grouphits)return 0;
		var remain=now,acc=0, g=0;
		while (remain>=grouphits[g] && g<grouphits.length) {
			remain-=grouphits[g];
			g++;
		}
		return remain ;
	}

	openAddress(addr,now){
		address.setMain(addr);
		excerpt.setNow(now);
		mode.readText();
	}
	renderItem(item,key){
		const start=excerpt.store.batch*excerpt.store.hitperbatch;
		const n=start+key;
		const first=(excerpt.store.now%excerpt.store.hitperbatch)==0;
		const {grouphit,address,title,shorttitle}=this.excerptTitle(n);
		

		const header=(title!==prevtitle)? title:"";
		prevtitle=title;
		const now=excerpt.store.now;
		const seq=this.getSeqOfBook(searchresult.store.grouphits,n);
		const scrollto=excerpt.store.now==n;
		var obj={};
		if (scrollto && !first) obj.ref="scrollto"; //no need to scroll if first item is highlighted

		const hits=highlightExcerpt(this.props.cor,excerpt.store.excerpts[key],searchresult.store.phrasepostings);
		return E(ExcerptLine,Object.assign(obj,item,
			{openAddress:this.openAddress.bind(this),key,now,n,seq,header,shorttitle,
				cor:this.props.cor,
				address:address||"",grouphit,scrollto,hits}));
	}
	excerptTitle(n){
		const sr=searchresult.store;
		if (!sr.filtered)return {};
		const tpos=sr.filtered[n];
		const address=this.props.cor.fromTPos(tpos).kpos[0];
		if (address) {
			var addressH=this.props.cor.stringify(address);
			addressH=addressH.substr(0,addressH.length-2);
			const group=this.props.cor.groupOf(address);
			const grouphit=sr.grouphits[group];

			const title=this.props.cor.getGroupName(address);
			const shorttitle=this.props.cor.getGroupName(address,true);
			return {grouphit,title,shorttitle,address:addressH};
		} else {
			return {grouphit:0,title:"",address:""};
		}
	}
	gobatch(batch) {
		const hitperbatch=excerpt.store.hitperbatch;
		excerpt.showExcerpt(batch*hitperbatch);
	}	
	setExtra(extra){
		excerpt.setExtraLine(extra);
	}
	render(){
		prevtitle="";
		const sr=searchresult.store;
		const excerpts=excerpt.store.excerpts;
		if (sr.searching||!excerpts)return E("div",{},"searching");

		const count=(sr.filtered||{}).length||0;
		const hitperbatch=excerpt.store.hitperbatch;
		const batch=excerpt.store.batch;

		setTimeout(function(){ //componentDidUpdate only triggered once, don't know why
			const w=ReactDOM.findDOMNode(this.refs.scrollto);
			w&&w.scrollIntoView();
		}.bind(this),100)
		return E("div",{style:styles.container},
				E(ExcerptPager,{batch,count,hitperbatch,gobatch:this.gobatch.bind(this)}),
				E(ExcerptSetting,{setExtra:this.setExtra.bind(this),
					extra:excerpt.store.extra}),
				excerpts.map(this.renderItem.bind(this)),
				E(ExcerptPager,{batch,count,hitperbatch,gobatch:this.gobatch.bind(this)})
		)
	}
}

module.exports=observer(ExcerptView);