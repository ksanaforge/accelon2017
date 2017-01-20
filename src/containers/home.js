
const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const ParamsActions= require('../actions/params');
const SearchActions=require('../actions/search');
const FilterActions=require('../actions/filter');
const GroupingActions=require('../actions/grouping');

function mapStateToProps(state) {
  return {
  	activeCorpus:state.activeCorpus,
  	params:state.params,
  	filters:state.filters,
  	filter:state.filters[state.activeCorpus]||{exclude:[],hits:[]}
  };
}

function mapDispatchToProps(dispatch) {
	const boundsearch= bindActionCreators(SearchActions, dispatch);
  const boundparams= bindActionCreators(ParamsActions, dispatch);
  const boundgrouping= bindActionCreators(GroupingActions, dispatch);
  const boundfilter= bindActionCreators(FilterActions, dispatch);

	const bound=Object.assign({},boundsearch,boundparams,boundgrouping,boundfilter);
	return bound;  
}

const MainScreen=require('./mainscreen');
module.exports=connect(mapStateToProps, mapDispatchToProps)(MainScreen);
