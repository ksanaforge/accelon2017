const React=require("react");
const E=React.createElement;
const PT=React.PropTypes;

const maxbutton=10;
class ExcerptPager extends React.Component {
	calbatch(){
		if(!this.props.count) return null;

		var batchcount=Math.floor(this.props.count/this.props.hitperbatch);
		if (batchcount*this.props.hitperbatch<this.props.count) batchcount++;
		var remain=maxbutton;
		var start=this.props.batch||0 ,end=this.props.batch||0;
		while ( remain ) {
			if (start) {remain--;start--}
			if (remain&&end<batchcount) {remain--;end++}
			if (end>=batchcount)break;
		}
		return {start,end};
	}
	onClick(e) {
		const i=parseInt(e.target.dataset.idx);
		if (isNaN(i))return;
		this.props.gobatch(i);
	}
	renderPager(){
		const B=this.calbatch();
		if (!B)return;
		var out=[],className=null;
		for (let i=B.start;i<B.end;i++) {
			className=this.props.batch==i?"selectedpager":"pager";
			out.push( E("span",{className,key:i,"data-idx":i,onClick:this.onClick.bind(this)}, (i+1) ));
		}
		return out;
	}
	render(){
		return E("span",{className:"excerptpager"},
			this.renderPager()
		);
	}
}
ExcerptPager.propTypes={
		count:PT.number.isRequired,
		hitperbatch:PT.number.isRequired,
		batch:PT.number.isRequired,
		gobatch:PT.func.isRequired
}

module.exports=ExcerptPager;