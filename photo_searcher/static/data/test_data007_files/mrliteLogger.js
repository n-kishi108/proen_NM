/*
	
*/

//acCODE += ' style="display:none"' + " />";
//acCODE += ' style="position:absolute;left:-200;top:-200;visibility:visible"' + " />";
//document.write(acCODE);


var __BEACON;
var __add = ' style="position:absolute;left:-200;top:-200;visibility:visible"' + ">";
var __PTITLE = "&amp;PTITLE=" +escape(document.title)+"' ";
var __match_pattern = /PTITLE=/;
if(typeof xenoCODE != 'undefined') {
	__BEACON = xenoCODE;
}
else if(typeof acCODE != 'undefined') {
	__BEACON = acCODE;
}
else if(typeof mrCODE != 'undefined') {
	__BEACON = mrCODE;
}
var r = __BEACON.match(__match_pattern);
if(!r) {
	// replace last "' " 
	__BEACON = __BEACON.replace(/' $/,__PTITLE);
}
__BEACON+=__add;
document.write(__BEACON);