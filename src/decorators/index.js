const ptr=require("./ptr");
const def=require("./def");
const note=require("./note");
const link=require("./link");
const bilink=require("./bilink");
const kepan=require("./kepan");
const figure=require("./figure");
const table=require("./table");
const translation=require("./translation");
const head=require("./head");
const mppsnote=require("./popupnote");
const yinshunnote=require("./popupnote");

/* might be simplified to maketext with className same as type */
const inlinenote=require("./inlinenote");
const jin=require("./jin");
const p=require("./p");
const span=require("./span");
const rend=require("./rend"); //same as span for TEI rend
module.exports={ptr,def,note,link,bilink,figure,table,kepan,translation,head,
	mppsnote,yinshunnote,inlinenote,jin,p,span,rend}