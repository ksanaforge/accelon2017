const localization=require("ksana-localization");
const stringtable={
"zh.tw":[
	["search","搜尋"],
	["toc","目錄"],
	["dictionary","詞典"],
	["config","設定"],
	["source","出處"],
	["Select All","全選"],
	["Deselect All","全不選"],
	["Select Book","選書"],
	["Group By Book","檢索所得"],
	["View Excerpt","摘要瀏覽"]
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