const onclick=function(e){
	const domnode=e.target;
	domnode.action(domnode.dataset.go);
}
const createKepanItem=function(cor,depth,label,target,actions){
	const kepanwidget=document.createElement("div");
	var clsname="kepanlevel kepanlevel"+depth;

	kepanwidget.className=clsname;
	kepanwidget.innerHTML=label;

	kepanwidget.dataset.go=cor.id+"@"+target;
	kepanwidget.onclick=onclick;
	kepanwidget.action=actions.openLink;


	return kepanwidget;
}
const createKepans=function(cor,parent,strings,actions){
	if (typeof strings=="string") strings=[strings];
	for (var i=0;i<strings.length;i++) {
		var indent="";
		var m=strings[i].match(/^(\d)\t(.+?)\t([\d\.pa-z\-]+)/);
		if (m) {
			const depth=parseInt(m[1],10);
			parent.appendChild(createKepanItem(cor,depth,m[2],m[3],actions));
		}
	}
}
const createKepan=function({cm,cor,start,end,id,tabid,target,actions,fields}){
		const widget=document.createElement("div");
		widget.className="kepan";
		createKepans(cor,widget,target,actions);
		
		return cm.setBookmark(start,{widget,handleMouseEvents:true});
}

module.exports=createKepan;