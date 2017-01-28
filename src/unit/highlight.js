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

module.exports={renderHits}