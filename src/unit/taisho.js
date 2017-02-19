/*轉 大正  阿含部 子經號 為  冊頁碼 */
const notarget2address=function(cor,no_target,cb){
	var n=parseInt(no_target,10);
	if (n.toString(10)==no_target && n>=cor.parseRange("1p1a0100").start) {
		return no_target;//return as it is , not a sid
	}
	

	if (no_target.indexOf(".")>-1) { //has sub sid
		const m=no_target.match(/(\d+)\.(.*)/);
		if (!m) return no_target;
		var sid=m[1],target=m[2];
		while (sid.length<4) sid="0"+sid;
		cor.getField("subsid@"+sid,function(fielddata){
			if (typeof fielddata.value[0]=="number") { //n26,99,100 sub sid is number, n125 is string(two level)
				target=parseInt(target);
			}
			const at=fielddata.value.indexOf(target);
			if (at>-1) {
				cb(fielddata.pos[at]);
			}
		})
		
	} else { // an sid, search group name
		const groupnames=cor.groupNames();
		const sid=no_target.replace(/^0+/,"");
		for (var i=0;i<groupnames.length;i++) {
			if (groupnames[i].replace(/;.*/,"").replace(/^0+/,"")==sid) {
				const g=cor.groupKRange(i);
				var address= cor.stringify(g[0]);
				console.log("address",address)
				cb&&cb(address);
				return address;
			}
		}
	}
}
module.exports={notarget2address}