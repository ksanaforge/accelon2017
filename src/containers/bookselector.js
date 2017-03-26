const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const filterItem=require("../components/filteritem");
const {readText}=require("../model/mode");
const address=require("../model/address");
const filter=require("../model/filter");
const {_}=require("ksana-localization");
const {observer}=require("mobx-react");

const styles={
	container:{overflowY:"auto"},
	btn:{marginLeft:"10px"},
	columncontainer:{display:"flex"},
	column:{flex:1}
}
const BookCategorySelector=require("./bookcategoryselector");


class BookSelector extends React.Component {
	setExclude(group,value){
		filter.setExclude(group,value);
	}
	goGroup(group){
		const r=this.props.cor.groupKRange(group);
		const a=this.props.cor.stringify(r[0]);
		address.setMain(a);
		readText();
	}
	firstOccurOfGroup(group){
		var first=0;
		for(let i=0;i<group;i++) {
			if (!filter.store.active[i]){
				first+=filter.store.active.hits[i];				
			}
		}
		return first;
	}
	rendergroups(groups){
		const columns=this.props.cor.meta.displayOptions.groupColumn;
		if (!columns) {
			return groups.map(this.rendergroup.bind(this));
		} else {
			var out=[],items=[],now=0;
			for (var i=0;i<groups.length;i++) {
				if (now<columns.length && i==columns[now]) {
					out.push(E("div",{key:i,style:styles.column},items));
					items=[];
					now++;
				}
				items.push(this.rendergroup(groups[i],i));
			}
			out.push(E("div",{key:i,style:styles.column},items));
			return E("div",{style:styles.columncontainer},out);
		}
	}	
	rendergroup(g,key){
		var hit=0;
		if (this.props.showHit) {
			hit=filter.store.active.hits[key] || 0;
		}
		const exclude=filter.store.active[key] || false;
		var br=false;
		if (g.substr(0,2)=="\\n") {
			g=g.substr(2);
			br=true;
		}
		const hint=g.replace(/.*;/,"");
		const label=hint;//g.replace(/;.*/,"");
		return E(filterItem,{label,hit,exclude,key,br,idx:key,hint,idx:key,
			setExclude:this.setExclude.bind(this),goGroup:this.goGroup.bind(this)});
	}
	selectall(){
		filter.includeAll();
	}
	deselectall(){
		filter.excludeAll();
	}
	render(){
		if (this.props.cor.meta.groupPrefix) {
			return E(BookCategorySelector,this.props);
		}
		const groupNames=this.props.cor.groupNames();
		return E("div",{style:styles.container},
			E("button",{style:styles.btn,onClick:this.selectall.bind(this)},_("Select All")),
			E("button",{style:styles.btn,onClick:this.deselectall.bind(this)},_("Deselect All")),
			this.rendergroups(groupNames));	
	}
};
BookSelector.propTypes={
	cor:PT.object.isRequired
}
module.exports=observer(BookSelector);