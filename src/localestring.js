const localization=require("ksana-localization");
const stringtable={
"zh.tw":[
	["inlinenote","內文夾注"],
	["span","其他樣式"],
	["rend","其他樣式"],
	["p","段落"],
	["table","表"],
	["figure","圖"],
	["link","連結"],
	["bilink","出處"],
	["noteid","出處"],
	["jin","經文"],
	["ptr","注釋號"],
	["def","注釋"],
	["head","標題"],
	["mppsnote","夾注"],
	["footnote","腳注"],
	["origin","出處"],
	["a","錨"],
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
	["Home Page","主頁面"],
	["Group By Book","檢索所得"],
	["Excerpt","摘要"],
	["Read Text","閱讀內文"],
	["Matches","總筆數"],
	["Sort by hit","按筆數排序"],
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
	["Open New Window","以新視窗開啟"],
	["Puncuation to enable Fuzzy Search","條件含有標點符號啟用模糊搜尋"],
	["Open local cor","開啟本機資料庫"],
	["click and select one or more *.cor file in your local drive",
	"↓↓請開啟本機資料庫"],
	["Require Cor:","需要資料庫："],
	["local cor","本機"],
	["local system","單機版"],
	["download","下載"],
	["build date","建置於"]
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