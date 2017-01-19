const React =require('react');
const E=React.createElement;
const PT=React.PropTypes;
const styles={
	label:{},
	hit:{},
	container:{whiteSpace: "break-word", display:"inline-block"}
}
const humanhit=function(hit){
	if (!hit)return "";
	if (hit<1000) {
		if (hit<10) return Math.floor(hit)+"";
		return Math.floor(hit)+"";
	} else if (hit<1000000) {
		const k=hit/1000;
		if (k<10) return k.toFixed(2)+"k";
		else if (k<100) return k.toFixed(1)+"k";
		return Math.floor(k)+"k"
	}
	return "1M+";
}

class filterItem extends React.Component{
	setExclude(e){
		this.props.setExclude(this.props.idx,!this.props.exclude);
	}
	labelClick(e){
		this.props.goGroup(this.props.idx);
	}
	hitClick(e){
		this.props.goHit(this.props.idx);
	}
	render(){
		const firstitem=this.props.br||this.props.idx==0?" tooltipfirst":"";
		return E("span",{},
			firstitem?E("br"):E("span"),
		  E("span",{style:styles.container,className:"tooltip"}
//		  	,E("span",{className:"tooltiptext"+firstitem},this.props.hint)
		  	,"　"
				,E("input",{type:"checkbox",checked:!this.props.exclude,onChange:this.setExclude.bind(this)})
				,E("span",{onClick:this.labelClick.bind(this)},this.props.label)
				," "

				,E("span",{className:this.props.exclude?"disablefilterhit":"filterhit",
					onClick:this.hitClick.bind(this)}, humanhit(this.props.hit))
			)
		)
	}
};

filterItem.propTypes={
		label:PT.string.isRequired,
		hit:PT.number.isRequired,
		exclude:PT.bool.isRequired,
		setExclude:PT.func.isRequired,
		goGroup:PT.func.isRequired,
		goHit:PT.func.isRequired,
		idx:PT.number.isRequired
	}


module.exports=filterItem;