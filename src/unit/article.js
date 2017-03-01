const _fetch=function(cor,address,markups,cb){
  const article=cor.articleOf(address);
  if (article){
    const articleFields=cor.meta.articleFields||[];

    cor.getArticleTextTag(article.at , articleFields, (res)=>{
      const fields=loadArticleMarkup(res.fields,markups,article.at);

      cb&&cb({address,article,rawlines:res.text,fields,kpos:article.start});
    }); 
  }
}
const fetchArticle=function(cor,address,markups,cb){
  const range=cor.parseRange(address);

  if (!range.start) {
    cor.getField("a",function(anchors){
      address=address.replace(/~.+/,"");
      const at=anchors.value.indexOf(address);
      if (at>-1) {
        _fetch(cor,anchors.pos[at],markups,cb);
      }
    }.bind(this));
  } else {
    _fetch(cor,address,markups,cb);
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