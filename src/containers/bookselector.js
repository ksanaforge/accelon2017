const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const {openCorpus}=require("ksana-corpus");
const filterItem=require("../components/filteritem");
const {_}=require("ksana-localization")
const styles={
	container:{overflowY:"auto"},
	btn:{marginLeft:"10px"}
}
const RangeSelector=React.createClass({
	setExclude(group,value){
		this.props.setExclude(group,value);
	}
	,propTypes:{
		activeCorpus:PT.string.isRequired
	}
	,goGroup(group){
		const cor=openCorpus(this.props.activeCorpus);
		const groupKPoss=cor.groupKPoss();
		const kpos=groupKPoss[group];
		this.props.updateArticleByAddress(kpos);
	}
	,firstOccurOfGroup(group){
		var first=0;
		for(let i=0;i<group;i++) {
			if (!this.props.filter.exclude[i]){
				first+=this.props.filter.hits[i];				
			}
		}
		return first;
	}
	,goHit(group){
		const occur=this.firstOccurOfGroup(group);
		this.props.goOccur(occur);
	}	
	,rendergroup(g,key){
		const hit=this.props.filter.hits[key] || 0;
		const exclude=this.props.filter.exclude[key] || false;
		var br=false;
		if (g.substr(0,2)=="\\n") {
			g=g.substr(2);
			br=true;
		}
		const hint=g.replace(/.*;/,"");
		const label=hint;//g.replace(/;.*/,"");
		return E(filterItem,{label,hit,exclude,key,br,idx:key,hint,idx:key,
			setExclude:this.setExclude,goGroup:this.goGroup,goHit:this.goHit});
	}
	,selectall(){
		this.props.includeAll();
	}
	,deselectall(){
		this.props.excludeAll();
	}
	,render(){
		if (!this.props.activeCorpus) return E("div");
		const cor=openCorpus(this.props.activeCorpus);		
		const groupNames=cor.groupNames();
		return E("div",{style:styles.container},
			E("button",{style:styles.btn,onClick:this.selectall},_("Select All")),
			E("button",{style:styles.btn,onClick:this.deselectall},_("Deselect All")),
			groupNames.map(this.rendergroup));	
	}
});

module.exports=RangeSelector;