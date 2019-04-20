const onLinkMouseDown=function(e){
	const target=e.target;
	const fulladdress=e.target.target;
	e.stopPropagation();
	if (!target.action) {
		console.error("action openLink is not defined");
	}
	target.action&&target.action(fulladdress,target.cor);	
}
/* TODO , show link only when in cursor ,
to save some dom node*/
const createLink=function({cm,cor,start,end,fields,krange,id,target,active,actions}){
	if (start.ch==end.ch && start.line==end.line) {
		if (target instanceof Array) {
			target=target[0];
		}
		const dom=document.createElement("span");
		dom.className="notelink";
		dom.onmousedown=onLinkMouseDown;
		dom.action=actions.openLink;
		dom.cor=cor;
		dom.innerHTML=target;
		dom.target=target;
		return cm.setBookmark(start,{widget:dom,handleMouseEvents:true});
	} else {
		const dom=document.createElement("span");
		dom.className="link";
		dom.onmousedown=onLinkMouseDown;
		dom.action=actions.openLink;
		dom.cor=cor;
		dom.innerHTML=cm.getRange(start,end);
		dom.target=target;
		
		// 判斷 link (ref 標記) 有沒有在 inlinenote 裡面
		// 像這樣 <note place="inline">..<ref >..</ref>...</note>
		// 判斷方式 : 傳入的 fields 中, 若是 value 是 inlinenote
		// 則其 pos 就是 inlinenote 的範圍
		// 再由 krange 取得本 link 的範圍, 逐一和 inlinenote 的範圍比較
		// 就知道有沒有某個 inlinenote 之間了
		// 2019/4/20 by heaven
		{
			for(i=0;i<fields['span']['pos'].length;i++)
			{
				var span_pos = fields['span']['pos'][i];
				var span_value = fields['span']['value'][i];
				if(span_value == "inlinenote")
				{
					// 找到 inlinenote 標記
					var this_range;
					if(cor.isRange(span_pos)) 
					{
						//const r=cor.breakRange(span_pos);
						// 無法用上面函數, 直接抄過來, 是要將 range 拆出頭和尾
						{
							var maxrange=Math.pow(2,cor.addressPattern.rangebits);
							var this_dis = Math.floor(span_pos%maxrange);
							var this_s = Math.floor(span_pos/maxrange);
							var this_e = this_s + this_dis;		
							this_range = {start:this_s , end:this_e};
						}
						
						// 判斷有沒有在 inlinenote 裡面
						if(krange.start >= this_range.start && krange.end <= this_range.end)
						{
							// clase 加上 inlinenote , 才會變成小字
							dom.className="link inlinenote";
							break;
						}
					}
				}
			}
		}
		return cm.markText(start,end,{replacedWith:dom,handleMouseEvents:true});
		//.onmousedown=onLinkMouseDown;
	}
}
module.exports=createLink;