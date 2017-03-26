const {observable,action,autorun}=require("mobx");

const {packBits,unpackBits}=require("../unit/bitstr");
const BOOKSELECTOR=0, READTEXT=1,TOCVIEW=2,DBSELECTOR=3,EXCERPTVIEW=11;
	//BOOKRESULT=10,
	
const isFileProtocol=function(){
	return (typeof window!=="undefined" && window.location.protocol=="file:");
}
const store=observable({
	mode:BOOKSELECTOR, //mode
	fileprotocol:isFileProtocol(),
	layout:0,//layout
	extraline:3
})

const setMode=action(m=> {
	store.mode=parseInt(m,10)||BOOKSELECTOR;
});

const setLayout=action(l=>{
	store.layout=l;
});

const selectBook=action(()=>{
	store.mode=BOOKSELECTOR;
});

const selectDB=action(()=>{
	store.mode=DBSELECTOR;
});
const readText=action(()=>{
	store.mode=READTEXT;
});
/*const groupByBook=action(()=>{
	store.mode=BOOKRESULT;
});*/

const tocView=action(()=>{
	store.mode=TOCVIEW;
});

const excerptView=action(()=>{
	store.mode=EXCERPTVIEW;
})
module.exports={store,setMode,setLayout,
	readText,selectDB,selectBook,tocView,excerptView,
	BOOKSELECTOR, READTEXT,TOCVIEW,DBSELECTOR,EXCERPTVIEW
	//BOOKRESULT,
};