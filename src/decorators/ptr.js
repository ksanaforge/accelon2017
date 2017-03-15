const mode=require("../model/mode");

const onPtrMouseDown=function(e){
	const target=e.target;
	const address=parseInt(target.dataset.target,10);
	e.stopPropagation();
	if (!target.action) {
		console.error("action updateArticleByAddress not defined");
	}
	target.action&&target.action(address,target.tabid);
	e.target.innerHTML=e.target.dataset.id;
}

var entertimer,leavetimer;
const onPtrEnter=function(e){
	const target=e.target;
	clearTimeout(entertimer);
	clearTimeout(leavetimer);
	entertimer=setTimeout(function(){
		const layout=mode.store.layout;
		//+1 to include tailing puncuation
		target.className="ptr"+ (layout?"":(" ptr_ori"));
		const text=target.cor.getText(parseInt(target.dataset.target,10)+1,function(data){
			target.innerHTML=data;
		});
		target.innerHTML=text;//if text is ready, call back will be ignored
	},50);
}
const onPtrLeave=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);

	const target=e.target;
	const layout=mode.store.layout;
	target.className="ptr"+ (layout?"":(" ptr_ori"));
	leavetimer=setTimeout(function(){
		e.target.innerHTML=e.target.dataset.id;
	},50);
}
const createPtr=function({cm,cor,start,end,id,tabid,target,actions,fields}){
	const dom=document.createElement("span");
	const layout=mode.store.layout;
	dom.className="ptr"+ (layout?"":(" ptr_ori"));
	dom.innerHTML=fields.noteid.value[id].replace(/.+\./,"").replace(/^0+/,"");
	dom.dataset.id=dom.innerHTML;
	dom.dataset.target=target;
	dom.onmousedown=onPtrMouseDown;
	dom.cor=cor;
	dom.tabid=tabid;
	dom.action=actions.updateArticleByAddress;
	dom.onmouseenter=onPtrEnter; //problematic for position:absolute
	dom.onmouseleave=onPtrLeave;
	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}
module.exports=createPtr;