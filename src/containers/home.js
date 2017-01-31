/*
	pagination (now batchperpage) , next page , add now
	show excerpt of one book (set now to beginning of the book) should include following book?
	highlighting

	readtext with corpusview (move cmview,corpusview to ksana-corpus-view)

*/
const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const ParamsActions= require('../actions/params');
const SearchActions=require('../actions/search');
const FilterActions=require('../actions/filter');
const GroupingActions=require('../actions/grouping');
const ExcerptActions=require('../actions/excerpt');
const ExecURLActions=require('../actions/execurl');
const SelectionActions=require('../actions/selection');

function mapStateToProps(state) {
  return {
  	activeCorpus:state.activeCorpus,
  	params:state.params,
  	filters:state.filters,
  	filter:state.filters[state.activeCorpus]||{exclude:[],hits:[]},
  	excerpt:state.excerpt,
  	searchresult:state.searchresult,
  	selection:state.selection
  };
}

function mapDispatchToProps(dispatch) {
	const boundsearch= bindActionCreators(SearchActions, dispatch);
  const boundparams= bindActionCreators(ParamsActions, dispatch);
  const boundgrouping= bindActionCreators(GroupingActions, dispatch);
  const boundfilter= bindActionCreators(FilterActions, dispatch);
  const boundexcerpt= bindActionCreators(ExcerptActions, dispatch);
  const boundexecurl= bindActionCreators(ExecURLActions, dispatch);
  const boundselection=bindActionCreators(SelectionActions, dispatch);

	const bound=Object.assign({},boundsearch,boundparams,boundgrouping,
		boundfilter,boundexcerpt,boundexecurl,boundselection);
	return bound;  
}

const MainScreen=require('./mainscreen');
module.exports=connect(mapStateToProps, mapDispatchToProps)(MainScreen);
