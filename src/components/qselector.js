const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
class QSelector extends React.Component{
	onMouseEnter(idx){
		this.setState({selectTo:idx});
	}
	onMouseLeave(){
		this.setState({selectTo:-1});
	}
	onMouseDown(idx){
		this.props.onSelect&&this.props.onSelect(this.props.q.substr(0,idx+1));
	}
	constructor(props){
		super(props);
		this.state={selectTo:-1};
	}
	renderToken(t,key){

		const className="dictbox "+(key<=this.state.selectTo?"selected":"selection");
		return E("span",{key,className,
			onMouseDown:this.onMouseDown.bind(this,key),
			onMouseEnter:this.onMouseEnter.bind(this,key),
			onMouseLeave:this.onMouseLeave.bind(this,key)},
			t);
	}
	render(){
		const q=this.props.q||"";
		return E("span",{},q.split("").map(this.renderToken.bind(this)));
	}
}

module.exports=QSelector;