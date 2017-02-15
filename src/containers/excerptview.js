const React =require('react');
const ReactDOM =require('react-dom');
const PT=React.PropTypes;
const E=React.createElement;
const ExcerptLine=require("../components/excerptline");
const ExcerptNav=require("./excerptnav");
const ExcerptSetting=require("./excerptsetting");


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
		if (!this.props.searchresult.phrasepostings) return [];
		const linebreaks=excerpt.linebreaks;
		const getrawline=(line)=>excerpt.rawtext[line] ;
		const linelengths=this.buildlinelengths(excerpt.rawtext);
		var hl=[];

		for(let j=0;j<excerpt.phrasehits.length;j++) {
			const hits=excerpt.phrasehits[j].hits;
			const phraselengths=this.props.searchresult.phrasepostings[j].lengths;
			const linecharr=hits.map((hit,idx)=>{

				const phraselength=phraselengths[idx]||phraselengths;//should be kpos width
				const range=this.props.cor.makeKRange(hit,hit+phraselength);

				var {start,end}=this.props.cor.toLogicalRange(excerpt.linebreaks,range,getrawline);
				const absstart=linelengths[start.line]+start.ch +start.line //for linefeed ;
				const absend=linelengths[end.line]+end.ch + end.line ;
				hl.push([absstart,absend-absstart,j]);
			});
		}
		return hl;
	}	
	openAddress(addr,now){
		this.props.readText(addr,now);
	}
	renderItem(item,key){
		const start=this.props.excerpt.batch*this.props.excerpt.hitperbatch;
		const n=start+key;
		const first=(this.props.excerpt.now%this.props.excerpt.hitperbatch)==0;
		const {grouphit,address,title,shorttitle}=this.excerptTitle(n);
		

		const header=(title!==prevtitle)? title:"";
		prevtitle=title;
		const now=this.props.excerpt.now;
		const seq=this.getSeqOfBook(this.props.searchresult.grouphits,n);
		const scrollto=this.props.excerpt.now==n;
		var obj={};
		if (scrollto && !first) obj.ref="scrollto"; //no need to scroll if first item is highlighted

		const hits=this.highlights(this.props.excerpt.excerpts[key]);
		return E(ExcerptLine,Object.assign(obj,item,
			{openAddress:this.openAddress.bind(this),key,now,n,seq,header,shorttitle,
				cor:this.props.cor,
				address:address||"",grouphit,scrollto,hits}));
	}
	excerptTitle(n){
		const searchresult=this.props.searchresult;
		if (!searchresult.filtered)return {};
		const tpos=searchresult.filtered[n];
		const address=this.props.cor.fromTPos(tpos).kpos[0];
		if (address) {
			var addressH=this.props.cor.stringify(address);
			addressH=addressH.substr(0,addressH.length-2);
			const group=this.props.cor.groupOf(address);
			const grouphit=searchresult.grouphits[group];

			const title=this.props.cor.getGroupName(address);
			const shorttitle=this.props.cor.getGroupName(address,true);
			return {grouphit,title,shorttitle,address:addressH};
		} else {
			return {grouphit:0,title:"",address:""};
		}
	}
	gobatch(batch) {
		const hitperbatch=this.props.excerpt.hitperbatch;
		this.props.showExcerpt(batch*hitperbatch);
	}	
	setExtra(extra){
		this.props.setParams({e:extra});
	}
	render(){
		prevtitle="";
		const searchresult=this.props.searchresult;
		if (searchresult.searching)return E("div",{},"searching");
		const excerpts=this.props.excerpt.excerpts;

		const count=(searchresult.filtered||{}).length||0;
		const hitperbatch=this.props.excerpt.hitperbatch;
		const batch=this.props.excerpt.batch;

		setTimeout(function(){ //componentDidUpdate only triggered once, don't know why
			const w=ReactDOM.findDOMNode(this.refs.scrollto);
			w&&w.scrollIntoView();
		}.bind(this),100)

		return E("div",{style:styles.container},
				E(ExcerptNav,{batch,count,hitperbatch,gobatch:this.gobatch.bind(this)}),
				E(ExcerptSetting,{setExtra:this.setExtra.bind(this),
					extraline:parseInt(this.props.params.e,10)||0}),
				excerpts.map(this.renderItem.bind(this)),
				E(ExcerptNav,{batch,count,hitperbatch,gobatch:this.gobatch.bind(this)})
		)
	}
}

module.exports=ExcerptView;