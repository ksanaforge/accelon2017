const packBits=function(_bits){
	if (!_bits)return "";
	var bits=JSON.parse(JSON.stringify(_bits));
	var byte=Math.floor(bits.length / 8);
	if (bits.length % 8) byte++;
	
	var cells=[];
	for (let i=0;i<byte;i++) cells[i]=0;

	var c=0,ncell=0;
	while (bits.length) {
		const ex=bits.shift()?1:0;
		cells[ncell] +=  Math.pow(2, 7-c) * ex;
		c++;
		if (c%8==0) {
			ncell++;
			c=0;
		}		
	}
	var str="";
	for (let i=0;i<byte;i++) {
		var hex="0"+cells[i].toString(16);
		str+=hex.substr(hex.length-2);
	}
	return str;
}
const unpackBits=function(str,bool){
	if (!str) return [];
	var byte=Math.floor(str.length / 2);
	if (str.length % 2) byte++;
	var arr=[];
	for (let i=0;i<byte;i++) {
		const cell= str.substr(i*2,2) ;
		const v="0000000"+parseInt(cell,16).toString(2);
		var bits=v.substr(v.length-8);
		
		arr=arr.concat(bits.split("").map(i=>parseInt(i)));
	}
	while (arr.length>0 && arr[arr.length-1]==0) arr.pop();
	if (bool) {
		arr=arr.map((i)=>!!i);
	}
	return arr;
}

const test=function(){
	const t1=[1, 1,0,0,0,0,0,1,0,0,  0,0,0,0,0,0,1,1, 0,0,0,0,0,0,1,0,  0,0,0,0,0,0,0,1,1 ];
	//pack from left to right, every 8 bits into a byte
	//and convert byte to string
	//tailing 0 will be ignored
	const str=packBits(t1);
	const t2=unpackBits(str);
	if (JSON.stringify(t1)!==JSON.stringify(t2)) console.error('pack bits error');
}

test();

module.exports={packBits,unpackBits};