const React =require('react');
const ReactDOM =require('react-dom');
const {observer}=require("mobx-react");
const PT=React.PropTypes;
const E=React.createElement;
const searchresult=require("../model/searchresult");
const excerpt=require("../model/excerpt");
const address=require("../model/address");
const mode=require("../model/mode");
const {groupTitle}=require("../unit/humantext");
const {renderHits,highlightExcerpt}=require("../unit/highlight");

class FuzzyResult extends React.Component {
	openAddress(addr,now){
		address.setMain(addr);
		excerpt.setNow(now);
		mode.readText();
	}	
	renderExcerpt(excerpt,key){
		const hits=highlightExcerpt(this.props.cor,excerpt,searchresult.store.phrasepostings);
		const addr=excerpt.linebreaks[0];
		const page=this.props.cor.stringify(addr).match(/p\d+[abc]?/)[0];
		const title=groupTitle(this.props.cor.getGroupName(addr),this.props.cor)+page;
		const score=Math.round(searchresult.store.scores[key]*100);
		return E("div",{className:"excerpt",key},
			E("div",{className:" groupheader"},
				E("span",{className:"fuzzytitle",
					onClick:this.openAddress.bind(this,addr,key)},title), 
				" ",
				E("span",{className:"score"},score+"%")
			),
			renderHits(excerpt.text,hits, (o,t)=> E("span",o,t) )

		);
	}
	render(){
		const excerpts=excerpt.store.excerpts;		
		if (!excerpts||!excerpts.length) {
			return E("div",{},"No found");
		}
		return E("div",{},excerpts.map(this.renderExcerpt.bind(this))
		)
	}
}


module.exports=observer(FuzzyResult);