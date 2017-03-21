const getExternalField=function(cor,article){
	if (cor.meta.id=="taisho") {
		if (article.at==4772) {
			return {
				kepan:{
					pos:[209887401,209887401,209887405],
					value:["甲一","乙一","乙二"]
				}
			}
		}
	}
}
module.exports={getExternalField}