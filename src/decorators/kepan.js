var linktimer;
const onKepanMouseOver=function(e){
	const action=e.target.action;
	const go=e.target.dataset.go;
	console.log("goto",go);
	popuptimer=setTimeout(function(){
		action(go);
	},400);
}
const onKepanMouseLeave=function(e){
	clearTimeout(popuptimer);
}

const createKepanItem=function(cor,depth,label,target,actions,tabid){
	const kepanwidget=document.createElement("div");
	var clsname="kepanlevel kepanlevel"+depth;

	if (tabid!="aux") {
		kepanwidget.dataset.go=cor.id+"@"+target;
		kepanwidget.action=actions.openLink;
		kepanwidget.onmouseover=onKepanMouseOver;
		kepanwidget.onmouseleave=onKepanMouseLeave;
		clsname+=" kepanresponsive"
	}
	kepanwidget.className=clsname;
	kepanwidget.innerHTML=label;

	return kepanwidget;
}
const createKepans=function(cor,parent,strings,actions,tabid){
	if (typeof strings=="string") strings=[strings];
	for (var i=0;i<strings.length;i++) {
		var indent="";
		var m=strings[i].match(/^(\d)\t(.+?)\t([\d\.pa-z\-]+)/);
		if (m) {
			const depth=parseInt(m[1],10);
			parent.appendChild(createKepanItem(cor,depth,m[2],m[3],actions,tabid));
		}
	}
}
const createKepan=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		const widget=document.createElement("div");
		widget.className="kepan";
		createKepans(cor,widget,target,actions,tabid);

		return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createKepan;