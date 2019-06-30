function adpsp_f() {
  return true;
}
function adpsp_v() {
  return;
}
function adpsp_escape(src) {
	if(src == undefined || src == '') return src;
	src = src.replace(/\xD7/g, "X");
	src = src.replace(/\xA0/g, " ");
	src = src.replace(/\xA9/g, "");
	src = src.replace(/\xAE/g, "");
	src = src.replace(/\xE9/g, "e");
	return escape(src).replace(/\+/g, "%2B");
}
function adpsp_n(v){
	if(v == undefined || v == '') return v;
	if(v > 99999) v = 99999;
	return v;
}
window.onerror = adpsp_f;

var adpsp_doc = (parent.frames.length > 0) ? top.document : document;
var adpsp_title = (adpsp_title == undefined || adpsp_title == '')? adpsp_doc.getElementsByTagName('title')[0].text : adpsp_title;

var adpsp_src = adpsp_header + '://' + adpsp_counter_domain + '/adpsp_count/?aid=' + adpsp_aid;
if (!window.navigator.cookieEnabled) adpsp_src += '&off=cookie';
adpsp_src += '&ref=' + escape(adpsp_doc.referrer);
adpsp_src += '&pnm=' + adpsp_escape(adpsp_pnm);
adpsp_src += '&title=' + adpsp_escape(adpsp_title);
adpsp_src += '&url=' + escape(adpsp_doc.URL);
adpsp_src += '&width=' + adpsp_n(screen.width);
adpsp_src += '&height=' + adpsp_n(screen.height);
adpsp_src += '&color=' + adpsp_n(screen.colorDepth);
adpsp_src += '&nocache=' + Math.random();

var adp_img = new Image(1,1);
adp_img.src = adpsp_src;
adp_img.onload = function(){adpsp_v();}
