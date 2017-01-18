const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const Counter =require('../components/Counter');
const CounterActions= require('../actions/counter');

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

module.exports=connect(mapStateToProps, mapDispatchToProps)(Counter);
