const connectCorpus=function(cor,corpora,dispatch){
	const opencorpora=Object.keys(corpora).filter(c=>corpora[c]);
	console.log("connecting",cor.id,"to corpus",opencorpora);
}
module.exports={connectCorpus};