const loadMarkup=function(cor,json){
//	console.time("loadmarkup"); 18K markups take 100ms
	var out=[];
	for (var i=0;i<json.length;i++) {
		if (typeof json[i]=="string") {
			json[i]=json[i].split("\t");
		}
		var address=json[i][0];
		const kpos=parseInt(json[i][0],10);
		if (kpos.toString(10)==address) { //number format
			address=kpos;
		}
		const r=cor.parseRange(address);
		
		const article=cor.articleOf(r.start).at;
		if (!out[article]) out[article]={pos:[],value:[]};	
		out[article].pos.push(r.start==r.end?r.start:r.range);
		out[article].value.push(json[i][1]);
	}
	return out;
}
module.exports={loadMarkup}