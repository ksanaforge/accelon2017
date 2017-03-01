const getAnchorAddress=function(cor,anchor){
	 const anchors=cor.getField("a");
   anchor=anchor.replace(/~.+/,"");
   const at=anchors.value.indexOf(anchor);
   if (at>-1) return anchors.pos[at];
}
module.exports={getAnchorAddress:getAnchorAddress}