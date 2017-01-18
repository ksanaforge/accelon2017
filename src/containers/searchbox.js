const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
const SearchBox=React.createClass({
	getInitialState(){
		return {q:this.props.params.q||""}
	}
	,componentWillReceiveProps(nextProps) {
		if (nextProps.params&&nextProps.params.q!==this.state.q) {
			this.setState({q:nextProps.params.q||""});
		}
	}
	,search(){
		this.props.setQ(this.state.q);
		this.input.focus();
	}
	,setRef(ref){
		this.input=ref;
	}
	,onChange(e){
		this.setState({q:e.target.value});
	}
	,onKeyPress(e){
		if (e.key==="Enter") this.search();
	}
	,render(){
		return E("span",{},
			E("input",{ref:this.setRef,value:this.state.q,onChange:this.onChange,onKeyPress:this.onKeyPress})
			,E("button",{onClick:this.search},"檢索")
		)
	}
});
module.exports=SearchBox;