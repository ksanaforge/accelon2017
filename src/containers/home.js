const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;

const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const ParamsActions= require('../actions/params');


function mapStateToProps(state) {
  return {
  	params:state.params,
  	filter:{hits:[],exclude:[]}
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ParamsActions, dispatch);
}

const HomeBar=require("./homebar");
const BookSelector=require("./bookselector");

const Home=React.createClass({
  getInitialState() {
    return {}
  },	
  componentWillMount(){
		this.props.updateParams(this.parseRoute(window.location.hash));
  }
	,componentDidMount(){
		window.addEventListener('hashchange', () => {
			this.props.updateParams(this.parseRoute(window.location.hash));
		})
	}
	,parseRoute(route){
		var regex = /[?#&]([^=#]+)=([^&#]*)/g, params = {}, match ;
		while(match = regex.exec(route)) {
		  params[match[1]] = match[2];
		}
  	console.log("parse route",params)
		return params;
	}
	,render(){
		const selectorProps=Object.assign({},this.props,{activeCorpus:"yinshun"});
		return E("div",{}
			,E(HomeBar,this.props)
			,E(BookSelector,selectorProps)
		)
	}
});


module.exports=connect(mapStateToProps, mapDispatchToProps)(Home);
