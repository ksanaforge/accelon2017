const loadMarkup=function(cor,json){
//	console.time("loadmarkup"); 18K markups take 100ms
	var out=[];
	for (var i=0;i<json.length;i++) {
		const address=json[i].match(/.*?\t/)[0];
		const kpos=parseInt(address,10);
		if (kpos.toString(10)==address) { //number format
			address=kpos;
		}
		const r=cor.parseRange(address);
		
		const article=cor.articleOf(r.start).at;
		if (!out[article]) out[article]={pos:[],value:[]};	
		out[article].pos.push(r.start==r.end?r.start:r.kRange);
		out[article].value.push(json[i].substr(address.length));
	}
	return out;
}
module.exports={loadMarkup}