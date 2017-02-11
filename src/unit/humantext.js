const {openCorpus}=require("ksana-corpus");

const	groupTitle=function(label,corpus){
		const r=label.split("@");
		const cor=openCorpus(corpus);
		if (r.length==1 || !cor) return label;
		const categoryNames=cor.meta.groupPrefix||[];
		return categoryNames[parseInt(r[0],0)]+"《"+r[1]+"》";
}
module.exports={groupTitle}