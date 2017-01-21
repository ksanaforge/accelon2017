const React =require('react');
const PT=React.PropTypes;
const E=React.createElement;

const HomeBar=require("./homebar");
const BookSelector=require("./bookselector");
const BookResult=require("./bookresult");
const {BOOKSELECTOR,BOOKRESULT,READTEXT,EXCERPTVIEW}=require("../actions/params");
const ExcerptView=require("./excerptview");
const ReadText=1;
const styles={
	body:{overflowY:"auto",height:"96%"}
}
class MainScreen extends React.Component{
  constructor(props) {
  	super(props)
    this.state= {}
  }
  componentWillMount(){
		this.props.execURL();
  }
	componentDidMount(){
		window.addEventListener('hashchange', () => {
			this.props.execURL();
		})
	}

	getBody(mode){
		if (!this.props.params.q) {
			return BookSelector;
		}
		mode=parseInt(mode);
		switch (mode) {
			case BOOKSELECTOR: return BookSelector;
			case READTEXT: return ReadText;
			case BOOKRESULT: return BookResult; //must have q
			case EXCERPTVIEW: return ExcerptView;    //must have q
		}
		return BookSelector;
	}
	render(){
		return E("div",{}
			,E(HomeBar,this.props)
			,E("div",{style:styles.body},
				E(this.getBody(this.props.params.m),this.props)
			)
		)
	}
};

module.exports=MainScreen;
