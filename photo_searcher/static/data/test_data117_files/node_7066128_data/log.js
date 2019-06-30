var l_uusr=new Array();
var l_uukw=new Array();
l_uusr[0]="google";	l_uukw[0]="q";
l_uusr[1]="yahoo";	l_uukw[1]="p";
l_uusr[2]="msn";		l_uukw[2]="q";
l_uusr[3]="aol";		l_uukw[3]="query";
l_uusr[4]="aol";		l_uukw[4]="encquery";
l_uusr[5]="lycos";	l_uukw[5]="query";
l_uusr[6]="ask";		l_uukw[6]="q";
l_uusr[7]="altavista";	l_uukw[7]="q";
l_uusr[8]="search";	l_uukw[8]="q";
l_uusr[9]="netscape";	l_uukw[9]="s";
l_uusr[10]="cnn";	l_uukw[10]="query";
l_uusr[11]="looksmart";	l_uukw[11]="qt";
l_uusr[12]="about";	l_uukw[12]="terms";
l_uusr[13]="mamma";	l_uukw[13]="query";
l_uusr[14]="alltheweb";	l_uukw[14]="q";
l_uusr[15]="gigablast";	l_uukw[15]="q";
l_uusr[16]="voila";	l_uukw[16]="kw";
l_uusr[17]="virgilio";	l_uukw[17]="qs";
l_uusr[18]="live";	l_uukw[18]="q";
l_uusr[19]="baidu";	l_uukw[19]="wd";
l_uusr[20]="alice";	l_uukw[20]="qs";
l_uusr[21]="seznam";	l_uukw[21]="w";
l_uusr[22]="yandex";	l_uukw[22]="text";
l_uusr[23]="najdi";	l_uukw[23]="q";
l_uusr[24]="iask"; l_uukw[24]="k";
l_uusr[25]="sogou"; l_uukw[25]="query";
l_uusr[26]="qihoo"; l_uukw[26]="kw";
l_uusr[27]="daqi"; l_uukw[27]="content";
l_uusr[28]="soso.com"; l_uukw[28]="w";
l_uusr[29]="3721"; l_uukw[29]="name";
l_uusr[30]="baidu"; l_uukw[30]="word";
l_uusr[31]="qq.com"; l_uukw[31]="w";
l_uusr[32]="zhongsou"; l_uukw[32]="w";
l_uusr[33]="accoona"; l_uukw[33]="qt";
//-- Auto/Organic Keywords to Ignore
var l_uuno=new Array();
//l_uuno[0]="a";
function c1(b, a) {
	if (a) {
		window.l_uu_url += "&" + b ;
	}
}
function c3(b, a) {
	if (a) {
		window.l_uu_url += "&" + a ;
	}
}
function y(b) {
	if (b) {
	b = b.toLowerCase();
	if (b.substring(0, 2) != "zv") {
		b = "zv" + b;
	}
	return b;
	}else {
	return "";
	}
}
function F(b) {
	var a = null;
	b.l_uu_url=a;
	b.uuv=a;
	b.unu=a;
}
function A() {
	var b = null, a = window, d = document, g = new Date, e = g.getTime();

	var n=navigator;
	a.uuv=null,a.unu=null;
	var ul;
	a.l_uu_url = "" + y(a.l_uu_client);

	c3("dt", g.getTime());
	dc(a);
	c1("uuv", a.uuv);
	c1("unu", a.unu);
	c3("search",l_uurg());
	if (n.language) { ul=n.language.toLowerCase(); }
	 else if (n.browserLanguage) { ul=n.browserLanguage.toLowerCase(); }
	//c3("ul",ul);
	var _uu_lc=d.location;
	_uu_lc=_uu_lc.href;
	_uu_lc=_uu_lc.replace(/(.*?)\?(.*)/g,"$1");
	
	if(_uu_lc.substr(_uu_lc.length-1,1)=="/"){
		_uu_lc=_uu_lc+"index.htm";
	}
	//@
	_uu_lc=_uu_lc.replace(/(http\:\/\/)([^\/]*\@)?(.*)/g,"$1$3");
	c3("url", _uu_lc);
	//c3("url", d.location);
	(new Image(1, 1)).src = "http://log.china.cn/uua.gif?" + a.l_uu_url;
	F(a);
}
function dc(a){
	var expire_date = new Date();
	var nx=" expires=Sun, 18 Jan 2038 00:00:00 GMT;";
	expire_date.setDate(expire_date.getDate()+1);
	expire_date.setHours(0);
	expire_date.setMinutes(0);
	expire_date.setSeconds(0);
	var expire_string = expire_date.toGMTString();
	if(document.cookie.indexOf("uuv=1")==-1){
		document.cookie = "uuv=1;expires="+expire_string;
		a.uuv=1;
	}else{
		a.uuv=0;	
	}
	if(document.cookie.indexOf("unu=1")==-1){
		document.cookie = "unu=1;"+nx;
		a.unu=1;
	}else{
		a.unu=0;	
	}
}
function l_uurg() {
var _ur=document.referrer;
 if (_ur=="0" || _ur=="" || _ur=="-") return "uuse=(direct)";
 var i=0,h,k;
 if ((i=_ur.indexOf("://")) < 0) return "";
 h=_ur.substring(i+3,_ur.length);
 if (h.indexOf("/") > -1) {
  h=h.substring(0,h.indexOf("/"));
 }
 for (var ii=0;ii<l_uusr.length;ii++) {
  if (h.toLowerCase().indexOf(l_uusr[ii].toLowerCase()) > -1) {
   if ((i=_ur.indexOf("?"+l_uukw[ii]+"=")) > -1 || (i=_ur.indexOf("&"+l_uukw[ii]+"=")) > -1) {
    k=_ur.substring(i+l_uukw[ii].length+2,_ur.length);
    if ((i=k.indexOf("&")) > -1) k=k.substring(0,i);
    for (var yy=0;yy<l_uuno.length;yy++) {
     if (l_uuno[yy].toLowerCase()==k.toLowerCase()) { _ufno=1; break; }
    }
    return "uuse="+l_uEC(l_uusr[ii])+"&"+"uusk="+l_uEC(k);
   }
  }
 }
k=_ur;
_ur=document.location.href;
var r=h;
 if ((i=_ur.indexOf("://")) < 0) return "";
 h=_ur.substring(i+3,_ur.length);
 if (h.indexOf("/") > -1) {
  h=h.substring(0,h.indexOf("/"));
 }
 if(r==h){
 return "uuse=(local)&uusk="+l_uEC(k);
 }
 return  "uuse=(none)&uusk="+l_uEC(k);
}

function l_uEC(s) {
  var n="";
  if (!s || s=="") return "";
  for (var i=0;i<s.length;i++) {if (s.charAt(i)==" ") n+="+"; else n+=s.charAt(i);}
  return n;
}
if(location.protocol=="http:")
{
A();
}

