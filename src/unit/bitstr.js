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

	return encodeStr(str);
}
const unpackBits=function(str,bool){
	if (!str) return [];
	str=decodeStr(str);
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

const encodeStr=function(str){
	if (str.length<16) return str;
	const s=str.replace(/([0-9])/g,function(m,m1){
			return String.fromCharCode(parseInt(m1)+0x67);
	});
	var out="z",i=0,prev="",count=0;
	while (i<s.length) {
		if (prev==s.charAt(i)) {
			count++;
		} else {
			if (count) out+=count.toString(10)+prev;
			count=1;
		}
		prev=s.charAt(i);
		i++;
	}
	out+=count.toString(10)+prev;
	if (out.length>str.length) return str;
	return out;
}
const decodeStr=function(str){
	if (str.charAt(0)!='z')return str;
	str=str.substr(1);
	var out="";
	str.replace(/(\d+)([a-p])/g,function(m,count,ch){
		count=parseInt(count,10);
		for (var i=0;i<count;i++) {
			out+=ch;
		}
	});
	const s=out.replace(/([g-p])/g,function(m,m1){
		return (m1.charCodeAt(0)-0x67).toString(10);
	});
	return s;
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
const testencode=function(){
	const input="1111111111111100000000ff00000002faaaaaaaaaaaaaaaaaaaaaa000";
	const s=encodeStr(input);
	console.log(s);
	console.log('passed?',decodeStr(s)==input);
}

//test();
//testencode();
module.exports={packBits,unpackBits};