const ptr=require("./ptr");
const def=require("./def");
const note=require("./note");
const link=require("./link");
const bilink=require("./bilink");
const k=require("./bilink");
const kepan=require("./kepan");
const figure=require("./table");
const table=require("./table");
const translation=require("./translation");
const head=require("./head");
const rubynote=require("./rubynote");
const mppsnote=require("./popupnote");
const yinshunnote=require("./popupnote");
const footnote=require("./popupnote");
const cdata=require("./cdata");
const jpeg=require("./image");
const png=require("./image");
const inlinesvg=require("./inlinesvg");
const svg=require("./table");
const punc=require("./punc");
const pu=require("./punc");
/* might be simplified to maketext with className same as type */
const inlinenote=require("./inlinenote");
const jin=require("./jin");
const p=require("./p");
const span=require("./span");
const rend=require("./rend"); //same as span for TEI rend
const origin=require("./origin");
const collation=require("./collation");
module.exports={ptr,def,note,link,k,bilink,figure,table,kepan,translation,cdata,
	inlinesvg,
	mppsnote,yinshunnote,inlinenote,jin,p,span,head,rend,footnote,origin,rubynote,png,jpeg,svg
,punc,pu,collation}