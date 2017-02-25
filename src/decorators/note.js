const onNoteMouseDown=function(e){

}
var entertimer,leavetimer;
const onNoteEnter=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);
	const target=e.target;
	entertimer=setTimeout(function(){
		target.innerHTML=target.dataset.target;	
	},400);
}

const onNoteLeave=function(e){
	clearTimeout(entertimer);
	clearTimeout(leavetimer);

	const target=e.target;
	leavetimer=setTimeout(function(){
		e.target.innerHTML=e.target.dataset.id;
	},50);
}

const note=function({cm,cor,start,end,id,target}){
	const dom=document.createElement("span");
	dom.className="note";
	dom.innerHTML=id;
	dom.dataset.id=id;
	dom.dataset.target=target;
	dom.onmousedown=onNoteMouseDown;
	dom.onmouseenter=onNoteEnter;
	dom.onmouseleave=onNoteLeave;
	dom.cor=cor;
	return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
}

module.exports=note;