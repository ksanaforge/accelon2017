const	groupTitle=function(label,cor){
		const r=label.split("@");
		if (r.length==1 || !cor) return label;
		const categoryNames=cor.meta.groupPrefix||[];
		return categoryNames[parseInt(r[0],0)]+"《"+r[1]+"》";
}
module.exports={groupTitle}