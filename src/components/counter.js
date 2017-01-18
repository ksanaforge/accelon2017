const React =require('react');
const { Component, PropTypes }=React;
const E=React.createElement;

const Counter=React.createClass({
	propTypes:{
	  increment: PropTypes.func.isRequired,
	  incrementIfOdd: PropTypes.func.isRequired,
	  incrementAsync: PropTypes.func.isRequired,
	  decrement: PropTypes.func.isRequired,
	  counter: PropTypes.number.isRequired
	}	
  ,render:function() {
    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return E("p",{},
        "Clicked: "+counter+" times "
        ,E("button",{onClick:increment},"+")
        ,E("button",{onClick:decrement},"-")
        ,E("button",{onClick:incrementIfOdd},"Increment if odd")
        ,E("button",{onClick:incrementAsync},"Increment async")
     )
  	}
})
module.exports=Counter;