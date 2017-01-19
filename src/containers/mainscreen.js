const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;

const HomeBar=require("./homebar");
const BookSelector=require("./bookselector");
const BookResult=require("./bookresult");
const Excerpt=0;
const ReadText=1;
class MainScreen extends React.Component{
  constructor(props) {
  	super(props)
    this.state= {}
  }
  componentWillMount(){
		this.props.updateParams(this.parseRoute(window.location.hash));
  }
	componentDidMount(){
		window.addEventListener('hashchange', () => {
			this.props.updateParams(this.parseRoute(window.location.hash));
		})
	}
	parseRoute(route){
		var regex = /[?#&]([^=#]+)=([^&#]*)/g, params = {}, match ;
		while(match = regex.exec(route)) {
		  params[match[1]] = match[2];
		}
		return params;
	}
	getBody(mode){
		mode=parseInt(mode);
		switch (mode) {
			case 0: return BookSelector;
			case 1: return BookResult;
			case 2: return Excerpt;
			case 3: return ReadText;
		}
		return BookSelector;
	}
	render(){
		return E("div",{}
			,E(HomeBar,this.props)
			,E(this.getBody(this.props.params.m),this.props)
		)
	}
};

module.exports=MainScreen;
