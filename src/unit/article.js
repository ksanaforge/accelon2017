const fetchArticle=function(cor,address,markups,searchresult,cb){
	const article=cor.articleOf(address);
  if (article){
  	const articleFields=cor.meta.articleFields||[];

  	const externalFields=markups&&markups.fields?markups.fields[article.at]:null;
    cor.getArticleTextTag(article.at , articleFields, (res)=>{
    	var fields=res.fields||{};
	  	if (externalFields && markups) {
	  		const type=markups.meta.type;
    		fields=Object.assign({},res.fields,{[type]:externalFields});
    	}
  	  cb({address,article,rawlines:res.text,fields,kpos:article.start});
    });	
	}
}
module.exports={fetchArticle};