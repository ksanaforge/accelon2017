const { bindActionCreators } =require('redux');
const { connect } = require('react-redux');
const ParamsActions= require('../actions/params');
const SearchActions=require('../actions/search');
const FilterActions=require('../actions/filter');
const GroupingActions=require('../actions/grouping');
const ExcerptActions=require('../actions/excerpt');
const ExecURLActions=require('../actions/execurl');
const SelectionActions=require('../actions/selection');
const MarkupActions=require('../actions/markup');
const CorpusActions=require('../actions/corpus');
function mapStateToProps(state,ownProps) {
  return {
  	activeCorpus:state.activeCorpus,
  	params:state.params,
  	filters:state.filters,
  	filter:state.filters[state.activeCorpus]||{exclude:[],hits:[]},
  	excerpt:state.excerpt,
  	searchresult:state.searchresult,
  	selection:state.selection,
    corpusmarkups:state.corpusmarkups,
    corpora:state.corpora,
    markups:state.corpusmarkups[state.activeCorpus],
    appOpts:ownProps,
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
  const boundmarkup=bindActionCreators(MarkupActions, dispatch);
  const boundcorpus=bindActionCreators(CorpusActions, dispatch);

	const bound=Object.assign({},boundsearch,boundparams,boundgrouping,
		boundfilter,boundexcerpt,boundexecurl,boundselection,boundmarkup,boundcorpus);
	return bound;  
}

const MainScreen=require('./mainscreen');
module.exports=connect(mapStateToProps, mapDispatchToProps)(MainScreen);
