const fetchArticle=function(cor,address,markups,searchresult,cb){
	const article=cor.articleOf(address);
  if (article){
  	const articleFields=cor.meta.articleFields||[];

    cor.getArticleTextTag(article.at , articleFields, (res)=>{
      const fields=loadArticleMarkup(res.fields,markups,article.at);
  	  cb({address,article,rawlines:res.text,fields,kpos:article.start});
    });	
	}
}
const loadArticleMarkup=function(oldfields,markups,article){
  var fields=oldfields||{};
  if (markups && Object.keys(markups).length) {
    for (var type in markups) {
      if (markups[type][article]) {
        fields=Object.assign({},fields,{[type]:markups[type][article]});
      }
    }
  }
  return fields;
}

module.exports={fetchArticle,loadArticleMarkup};