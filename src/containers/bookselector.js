const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {openCorpus}=require("ksana-corpus");
const filterItem=require("../components/filteritem");
const {_}=require("ksana-localization");
const styles={
	container:{overflowY:"auto"},
	btn:{marginLeft:"10px"}
}

class RangeSelector extends React.Component {
	setExclude(group,value){
		this.props.setExclude(group,value);
	}

	goGroup(group){
		const cor=openCorpus(this.props.activeCorpus);
		const groupKPoss=cor.groupKPoss();
		const kpos=groupKPoss[group];
		this.props.updateArticleByAddress(kpos);
	}
	firstOccurOfGroup(group){
		var first=0;
		for(let i=0;i<group;i++) {
			if (!this.props.filter.exclude[i]){
				first+=this.props.filter.hits[i];				
			}
		}
		return first;
	}
	goHit(group){
		const occur=this.firstOccurOfGroup(group);
		this.props.goOccur(occur);
	}	
	rendergroup(g,key){
		var hit=0;
		if (this.props.showHit) {
			hit=this.props.filter.hits[key] || 0;			
		}

		const exclude=this.props.filter.exclude[key] || false;
		var br=false;
		if (g.substr(0,2)=="\\n") {
			g=g.substr(2);
			br=true;
		}
		const hint=g.replace(/.*;/,"");
		const label=hint;//g.replace(/;.*/,"");
		return E(filterItem,{label,hit,exclude,key,br,idx:key,hint,idx:key,
			setExclude:this.setExclude.bind(this),goGroup:this.goGroup.bind(this),goHit:this.goHit.bind(this)});
	}
	selectall(){
		this.props.includeAll();
	}
	deselectall(){
		this.props.excludeAll();
	}
	render(){
		if (!this.props.activeCorpus) return E("div",{},"no active corpus");
		const cor=openCorpus(this.props.activeCorpus);		
		const groupNames=cor.groupNames();
		return E("div",{style:styles.container},
			"BOOK SELECTOR",
			E("button",{style:styles.btn,onClick:this.selectall.bind(this)},_("Select All")),
			E("button",{style:styles.btn,onClick:this.deselectall.bind(this)},_("Deselect All")),
			groupNames.map(this.rendergroup.bind(this)));	
	}
};
RangeSelector.propTypes={
		filter:PT.object.isRequired,
		activeCorpus:PT.string.isRequired
}
module.exports=RangeSelector;