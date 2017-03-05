const React =require('react');
const ReactDOM =require('react-dom');
const PT=React.PropTypes;
const E=React.createElement;
const ExcerptLine=require("../components/excerptline");
const ExcerptPager=require("./excerptpager");
const ExcerptSetting=require("./excerptsetting");
const mode=require("../model/mode");
const searchresult=require("../model/searchresult");
const excerpt=require("../model/excerpt");
const address=require("../model/address");
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
	buildlinelengths(rawtext){
		var linelengths=[];
		var acc=0;
		for (let i=0;i<rawtext.length;i++) {
			linelengths.push(acc);
			acc+=rawtext[i].length;
		}
		linelengths.push(acc);
		return linelengths;
	}
	highlights(excerpt){
		if (!searchresult.store.phrasepostings) return [];
		const linebreaks=excerpt.linebreaks;
		const getrawline=(line)=>excerpt.rawtext[line] ;
		const linelengths=this.buildlinelengths(excerpt.rawtext);
		var hl=[];

		for(let j=0;j<excerpt.phrasehits.length;j++) {
			const hits=excerpt.phrasehits[j].hits;
			const phraselengths=searchresult.store.phrasepostings[j].lengths;
			const linecharr=hits.map((hit,idx)=>{

				const phraselength=phraselengths[idx]||phraselengths;//should be kpos width
				const range=this.props.cor.makeRange(hit,hit+phraselength);

				var {start,end}=this.props.cor.toLogicalRange(excerpt.linebreaks,range,getrawline);
				const absstart=linelengths[start.line]+start.ch +start.line //for linefeed ;
				const absend=linelengths[end.line]+end.ch + end.line ;
				hl.push([absstart,absend-absstart,j]);
			});
		}
		return hl;
	}	
	openAddress(addr,now){
		address.setMain(addr);
		mode.readText(now);
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

		const hits=this.highlights(excerpt.store.excerpts[key]);
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
		mode.setExtraLine(extra);
	}
	render(){
		prevtitle="";
		const sr=searchresult.store;
		if (sr.searching)return E("div",{},"searching");
		const excerpts=excerpt.store.excerpts;

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
					extraline:parseInt(mode.store.extraline,10)||0}),
				excerpts.map(this.renderItem.bind(this)),
				E(ExcerptPager,{batch,count,hitperbatch,gobatch:this.gobatch.bind(this)})
		)
	}
}

module.exports=ExcerptView;