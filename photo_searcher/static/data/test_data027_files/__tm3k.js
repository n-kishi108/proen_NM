function __tm3k () {
	var httpPath = "http://r.sankei.jp.msn.com/js/ranking/__tm3k.gif";
	var httpsPath = "https://r.sankei.jp.msn.com/js/ranking/__tm3k.gif";
	var l = document.location;
	var p = l.protocol;
	var path = httpPath;
	if (p == "https:") {
		path = httpsPath;
	} else if (p == "file:") {
		return;
	}
	var __tm3k_gif = "http://r.sankei.jp.msn.com/js/ranking/__tm3k.gif";
	var __tm3k_gif__ssl = "https://r.sankei.jp.msn.com/js/ranking/__tm3k.gif";
	var __tm3k_jsver = "-";
	for (var i = 5; i >= 0; i--) {
		document.write("<script language='JavaScript1."+ i +"'>__tm3k_jsver='1."+ i +"';</script>");
		if (__tm3k_jsver && __tm3k_jsver != "-") {
			break;
		}
	}
	var __tm3k_flashver = "-";
	if (navigator.plugins && navigator.plugins.length) {
		for (var i = 0; i < navigator.plugins.length; i++) {
			if (navigator.plugins[i].name.indexOf('Shockwave Flash') != -1) {
				__tm3k_flashver = navigator.plugins[i].description.split('Shockwave Flash ')[1];
				break;
			}
		}
	} else if (window.ActiveXObject) {
		for (var i = 11; i >= 0; i--) {
			try {
				var flash = eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ i +"');");
				if (flash) {
					__tm3k_flashver = i + ".0";
					break;
				}
			} catch (e) {
			}
		}
	}
	var __tm3k_javaenabled = navigator.javaEnabled() ? 1 : 0;
	var __tm3k_ua=navigator.userAgent;
	var __tm3k_referer=location.href;
	var __tm3k_language = "-";
	if (navigator.language) {
		__tm3k_language = navigator.language.toLowerCase();
	} else if (navigator.browserLanguage) {
		__tm3k_language = navigator.browserLanguage.toLowerCase();
	}
	var __tm3k_time = new Date();
	__tm3k_time = __tm3k_time.getTime();
	document.cookie = "__tm3k_time=" + __tm3k_time + ";";	
	var __tm3kImg = new Image(1, 1);
	var path = __tm3k_gif;
	if (location.protocol == "https:") {
		path = __tm3k_gif__ssl;
	}
	path += "?__tm3k_r=" + Math.round(Math.random() *  2147483647) + "" + Math.round(Math.random() *  2147483647) + "" + Math.round(Math.random() *  2147483647);
	path += "&__tm3k_jsver=" + __tm3k_jsver;
	path += "&__tm3k_flashver=" + __tm3k_flashver;
	path += "&__tm3k_javaenabled=" + __tm3k_javaenabled;
	path += "&__tm3k_ua=" + __tm3k_ua;
	path += "&__tm3k_referer=" + __tm3k_referer;
	path += "&__tm3k_language=" + __tm3k_language;
	path += "&__tm3k_time=" + __tm3k_time;
	__tm3kImg.src = path;
	__tm3kImg.onload = function () {
		__tm3k_complete()
	};
}
function __tm3k_complete () {
	return;
}
__tm3k();

