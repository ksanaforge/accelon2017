var indexOfSorted = function (array, obj, near) {
  var low = 0, high = array.length, mid;
  while (low < high) {
    mid = (low + high) >> 1;
    if (array[mid] === obj) return mid;
    array[mid] < obj ? low = mid + 1 : high = mid;
  }
  if (near) return low;
  else if (array[low] === obj) return low;else return -1;
};

const createPunc=function({cm,cor,start,end,id,tabid,target,actions,krange,field,fields}){
	var className=field;
	if (field=="punc" && fields.pu) {
		const kpos=indexOfSorted(fields.pu.pos,krange.start);
		if (fields.pu.pos[kpos]==krange.start) {
			className="punc_overlap";
		}
	}
	const widget=document.createElement("span");
	widget.className=className;
	widget.innerHTML=target;
	return cm.setBookmark(start,{widget});
}	

module.exports=createPunc;