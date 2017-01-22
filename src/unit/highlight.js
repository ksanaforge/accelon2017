var renderHits=function(text,hits,func){
	if (!text) return [];
  var i, ex=0,out=[],now;
  hits=hits||[];
  for (i=0;i<hits.length;i+=1) {
    now=hits[i][0];
    if (now>ex) {
      out.push(func({key:i},text.substring(ex,now)));
    }
    out.push(func({key:"h"+i, className:"hl"+hits[i][2]||""},text.substr(now,hits[i][1])));
    ex = now+hits[i][1];
  }
  out.push(func({key:i+1},text.substr(ex)));
  return out;
};

module.exports={renderHits}