const SET_SELECTION = 'SET_SELECTION';

const setSelection=function(obj){
	return Object.assign({},{type:SET_SELECTION},obj);
}
module.exports={SET_SELECTION,setSelection};