var renderHits=function(text,hits,func){
	if (!text) return [];
  var i, ex=0,out=[],now;
  hits=hits||[];
  for (i=0;i<hits.length;i+=1) {
    now=hits[i][0];
    if (now>ex) {
      const t=text.substring(ex,now);
      out.push(func({key:i},t));
    }
    const stext=text.substr(now,hits[i][1]);

    out.push(func({key:"h"+i, className:"hl"+hits[i][2]||""},stext));
    ex = now+hits[i][1];
  }
  out.push(func({key:i+1},text.substr(ex)));
  return out;
};
const  buildlinelengths=function(rawtext){
  var linelengths=[];
  var acc=0;
  for (let i=0;i<rawtext.length;i++) {
    linelengths.push(acc);
    acc+=rawtext[i].length;
  }
  linelengths.push(acc);
  return linelengths;
}
const highlightExcerpt=function(cor,excerpt,phrasepostings){
  if (!phrasepostings) return [];
  const linebreaks=excerpt.linebreaks;
  const getrawline=function(line){
    return (line<excerpt.rawtext.length)?excerpt.rawtext[line]:"" ;
  };
  const linelengths=buildlinelengths(excerpt.text.split("\n"));
  var hl=[];

  for(let j=0;j<excerpt.phrasehits.length;j++) {
    const hits=excerpt.phrasehits[j].hits;
    const hitsend=excerpt.phrasehits[j].hitsend;
    const phraselengths=phrasepostings[j].lengths;
    const linecharr=hits.map((hit,idx)=>{
      const range=cor.makeRange(hit,hitsend[idx]);
      var {start,end}=cor.toLogicalRange(excerpt.linebreaks,range,getrawline);
      const absstart=linelengths[start.line]+start.ch +start.line //for linefeed ;
      const absend=linelengths[end.line]+end.ch + end.line ;

      hl.push([absstart,absend-absstart,j]);
    });
  }

  return hl;
} 

module.exports={renderHits,highlightExcerpt}