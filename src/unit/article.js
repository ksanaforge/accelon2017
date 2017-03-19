const {getAnchorAddress}=require("../unit/anchor");

const fetchArticle=function(cor,address,markups,cb){
  const range=cor.parseRange(address);

  if (!range.start) {
    address=getAnchorAddress(cor,address);
  }
  const article=cor.articleOf(address);
  if (article){
    cor.getArticleTextTag(article.at ,  (res)=>{
      const fields=loadArticleMarkup(res.fields,markups,article.at);
      cb&&cb({address,article,rawlines:res.text,fields,kpos:article.start});
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