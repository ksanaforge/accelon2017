const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;
class QSelector extends React.Component{
	onMouseEnter(idx){
		if (this.props.maxChar&&idx>=this.props.maxChar)  idx=this.props.maxChar-1;
		this.setState({selectTo:idx});
	}
	onMouseLeave(){
		this.setState({selectTo:-1});
	}
	onMouseDown(idx){
		const tokens=this.toToken(this.props.q);
		if (this.props.maxChar&&idx>=this.props.maxChar)  idx=this.props.maxChar-1;
		tokens.length=idx+1;
		this.props.onSelect&&this.props.onSelect(tokens.join(""));
	}
	constructor(props){
		super(props);
		this.state={selectTo:-1};
	}
	renderToken(t,key){
		const className=(key<=this.state.selectTo?"selected":"selection");
		return E("span",{key,className,
			onMouseDown:this.onMouseDown.bind(this,key),
			onMouseEnter:this.onMouseEnter.bind(this,key),
			onMouseLeave:this.onMouseLeave.bind(this,key)},
			t);
	}
	toToken(q){ //stupid, should reuse tokenizer
		var out=[],i=0;
		while (i<q.length){
			var c=q.charCodeAt(i);
			if (c>=0xd800&&c<=0xdbff) {
				out.push(q[i]+q[i+1]);
				i++;
			} else if (c>=0x3400&&c<=0x9FFF) {
				out.push(q[i]);
			} else {
				var s="";
				while (i<q.length&&(c<0x3400||c>0x9fff)) {
					s+=q[i++];
					c=q.charCodeAt(i);
				}
				out.push(s);
			}
			i++;
		}
		return out;
	}
	render(){
		const q=this.props.q||"";
		return E("span",{className:"dictbox"},this.toToken(q).map(this.renderToken.bind(this)));
	}
}

module.exports=QSelector;