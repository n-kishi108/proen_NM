ezbaxStime = new Date();
ezbaxTid = ezbaxGenID(ezbaxStime.getTime());
ezbaxWIN = navigator.platform.substring(0,3)=="Win";
ezbaxWN4 = ezbaxWIN && navigator.appName=="Netscape" && navigator.appVersion.charAt(0)<=4;
ezbaxPrm = ezbaxBrp = ezbaxPmt = ezbaxDfr = ezbaxLayer = "";
function ezbaxSkey() { return "i$%^KGjn" }
function ezbaxLayPop(p) {
	var w = window.open("http://ax.itgear.jp/popup.html?hiroshimachogo="+p,"ezbax","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,width=468,height=60");
	if (w.closed==undefined) location.replace("http://ax.itgear.jp/violation.html");
}
if (!ezbaxWN4 && !ezbaxGetCookie("s")) {
	ezbaxSetCookie("s", 1, 1800000);
	window.onunload = function () {
		if ((new Date()) - ezbaxStime < 500) ezbaxLayPop("refresh");
	};
}
function ezbaxAnalyze() {
	var vid, dsp="", lng="", ref="", ppn=0;
	if (!(vid=ezbaxGetCookie("vid"))) vid=ezbaxTid;
	ezbaxSetCookie("vid", vid, 31557600000);
	if (vid==ezbaxTid) vid = ezbaxGetCookie("vid");
	dsp = window.screen ? screen.width+"x"+screen.height+"/"+screen.colorDepth : "/";
	lng = (navigator.language || navigator.browserLanguage).substring(0,3);
	if (lng.length>2 && (lng.charAt(2)=='-' || lng.charAt(2)=='/')) lng=lng.substring(0,2);
	ezbaxPrm = vid+"/"+dsp+"/"+lng+"/";
	ezbaxBrp = "0";
	if (window.ActiveXObject) eval("try{if(new ActiveXObject('ShockwaveFlash.ShockwaveFlash'))ezbaxBrp='1'}catch(e){}");
	else if (navigator.plugins) for (i=0; i<navigator.plugins.length; i++) { if (navigator.plugins[i].name.indexOf("Shockwave Flash") != -1) { ezbaxBrp="1"; break; }}
	else ezbaxBrp = "0";
	ezbaxBrp += (navigator.javaEnabled()?"1":"0");
	if (document.getElementById) eval("try{ref=ezbaxGetReferrer(window)}catch(e){ref=document.referrer}");
	else ref = ezbaxGetReferrer(window);
	if (ref.indexOf("http") != 0) ref="";
	if (ref==document.referrer) ezbaxDfr="defer";
	ezbaxPrm += ppn+"/"+ezbaxTid+"/"+ezbaxBrp+"/"+ezbaxPmt+"&"+ref;
	ezbaxSend();
}
function ezbaxGenID(n) {
	var sh = "0000" + (Math.floor(n / 0x100000) & 0xFFFFF).toString(16);
	var sl = "0000" + (          (n % 0x100000) & 0xFFFFF).toString(16);
	return (sh.substring(sh.length-5) + sl.substring(sl.length-5)).toUpperCase();
}
function ezbaxGetReferrer(win) {
	if (win!=win.parent && win.document.referrer==win.parent.location.href)
			return ezbaxGetReferrer(win.parent);
	else	return win.document.referrer;
}
function ezbaxGetCookie(name) {
	name = "ezbax_hiroshimachogo_"+name+"=";
	var c = document.cookie+";";
	var p = c.indexOf(name)+name.length;
	return p<name.length ? "" : unescape(c.substring(p,c.indexOf(";",p)));
}
function ezbaxSetCookie(name, val, exp) {
	exp = exp ? "; expires="+(new Date(ezbaxStime.getTime()+exp)).toGMTString() : "";
	document.cookie = "ezbax_hiroshimachogo_"+name+"="+escape(val)+"; path=/"+exp;
}
function ezbaxSend() {
	if (document.layers)
		document.writeln('<layer top="0" left="0"><img src="http://ax3.itgear.jp/hiroshimachogo/1/ad.cgi?',ezbaxPrm,'" border="0"><','/layer>');
	else {
		document.writeln('<script src="http://ax3.itgear.jp/hiroshimachogo/1/lay.js?',ezbaxPrm,'" '+ezbaxDfr+'><','/script>');
		var ins = document.all && document.body ? 1 : 0;
		document.write('<img src="" width="0" height="0" style="position:absolute">');
		var divw = 1 ? "150" : document.body ? (document.compatMode=="CSS1Compat" ? document.documentElement.clientWidth : document.body.clientWidth) : 0;
		divw = divw ? divw+"px" : "100%";
		var ad1 = '<a target="_blank" href="http://ax.itgear.jp/?f=axp"><img src="http://img.ezbbs.net/ax.gif" border=0 style="display:inline;visibility:visible;width:30px;height:30px;margin:0px;border:0px;padding:0px;filter:none"><'+'/a>';
		var ad2 = '<a target="_blank" href="http://ax.itgear.jp/?f=axp"><img src="http://img.ezbbs.net/lay.gif" border=0 style="display:inline;visibility:visible;width:120px;height:30px;margin:0px;border:0px;padding:0px;filter:none"><'+'/a>';
		ezbaxLayer = '<div style="position:absolute;left:0px;top:0px;width:'+divw+';height:30px;z-index:999;text-align:left">'+ad1+ad2+'<'+'/div>';
		if (ezbaxWIN && ins && document.body.insertAdjacentHTML) document.body.insertAdjacentHTML("AfterBegin",ezbaxLayer);
		else document.write(ezbaxLayer);
		ezbaxCheckAd();
	}
}
function ezbaxCheckAd() {
	if (!document.all || !ezbaxWIN) return;
	var dbd = document.compatMode=="CSS1Compat" ? document.documentElement : document.body;
	if (dbd && document.readyState=="complete") {
		if (ezbaxDfr!="defer" && (dbd.clientWidth<150*0.6 || dbd.clientHeight<30*0.8)) return ezbaxLayPop("frame");
		if (1) {
			for (var i = 0; i < document.all.tags("OBJECT").length; i++) {
				var obj = ezbaxSetAbsPos(document.all.tags("OBJECT")(i));
				if (obj.absLeft<150*0.6 && obj.absTop<30*0.8 && obj.offsetWidth>150*0.4 && obj.offsetHeight>30*0.4) return ezbaxLayPop("object");
			}
		}
		var z = 0;
		for (var i = 0; i < document.all.length; i++) {
			if (z < document.all(i).style.zIndex)
				z = document.all(i).style.zIndex;
		}
		var exist = false;
		for (var i = 0; i < document.images.length; i++) {
			if (document.images[i].src.indexOf("http://img.ezbbs.net/ax") == 0) {
				exist = true;
				document.images[i].style.zIndex = ++z;
				if (document.images[i].parentNode.parentNode.parentNode.tagName != "BODY") return ezbaxLayPop("position");
			}
		}
		if (!exist) {
			document.body.insertAdjacentHTML("AfterBegin",ezbaxLayer);
			ezbaxCheckAd();
		}
	}
	else window.setTimeout("ezbaxCheckAd()", 500);
}
function ezbaxSetAbsPos(obj) {
	obj.absLeft = obj.absTop = 0;
	for (var elm=obj; elm.parentNode; elm=elm.parentNode) {
		obj.absLeft += elm.offsetLeft;
		obj.absTop  += elm.offsetTop;
	}
	return obj;
}
function ezbaxGoAnalyze() {
	ezbaxOnerrorBak = window.onerror;
	window.onerror = function () {
		if (ezbaxPrm == "") return true;
		window.onerror = ezbaxOnerrorBak;
		ezbaxPrm += "0/"+ezbaxTid+"/"+ezbaxBrp+"/"+ezbaxPmt+"&"+document.referrer;
		ezbaxSend();
		return true;
	}
	ezbaxAnalyze();
	window.onerror = ezbaxOnerrorBak;
}
if (ezbaxWN4) window.onload = ezbaxGoAnalyze;
else ezbaxGoAnalyze();
