const localization=require("ksana-localization");
const stringtable={
"zh.tw":[
	["inlinenote","內文夾注"],
	["q","引文"],
	["p","段落"],
	["table","表"],
	["figure","圖"],
	["link","連結"],
	["bilink@yinshun","出處"],
	["bilink@taisho","出處"],
	["jin","經文"],
	["ptr","注釋號"],
	["def","注釋"],
	["head","標題"],
	["mppsnote","夾注"],
	["yinshunnote","注解"],
	["kepan","科判"],
	["Search","搜尋"],
	["toc","目錄"],
	["dictionary","詞典"],
	["config","設定"],
	["source","出處"],
	["Select All","全選"],
	["Deselect All","全不選"],
	["Select DB","選資料庫"],
	["Select Book","選書"],
	["Group By Book","檢索所得"],
	["Excerpt","摘要"],
	["Read Text","閱讀內文"],
	["Matches","筆數"],
	["Prev Hit","上一個"],
	["Next Hit","下一個"],
	["Page Number","頁碼"],
	["TOC View","目錄"],
	["Extra Line","摘要行"],
	["Prev Fascicle","上卷"],
	["Next Fascicle","下卷"],
	["Load Markup","載入外部標記"],
	["View First Markup","跳到第一個標記"],
	["Layout On","原書換行"],
	["Layout Off","段落重排"],
	["Open New Window","以新視窗開啟"]
	]
}
for (var locale in stringtable) {
	localization.setLocale(locale);
	for (var j=0;j<stringtable[locale].length;j++) {
		const id=stringtable[locale][j][0],str=stringtable[locale][j][1];
		localization.setString(id,str);
	}
}
localization.setLocale("zh.tw");