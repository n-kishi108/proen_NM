// env.js 1.1.1

// init
var xLBenv = window.xLBenv = {
	os : {
		name     : '不明',
		code     : 'na'
	},
	browser : {
		name     : '不明',
		version  : 0,
		code     : 'na'
	},
	flash : {
		isInstall : false,
		version   : 0
	},
	wmp : {
		isInstall : false,
		version   : 0
	},
	activex : {
		enable    : false
	}
};

(function(){

// user agent
var xLBua   = navigator.userAgent;

// built-in object
var xLBdcap = document.all;
var xLBlcap = document.layers;
var xLBgcap = document.getElementById;
var xLBopr  = window.opera; //Opera

// browser
if (!xLBdcap && xLBgcap && !xLBopr) { //ns6.x ns7.x Gecko
	if (xLBua.indexOf('Netscape6') != -1 || xLBua.indexOf('Netscape/7') != -1) {
		xLBenv.browser.name = "Netscape Navigator";
		xLBtmp  = xLBua.split("/");
		xLBtmpc = xLBtmp[3].split(" ");
		xLBenv.browser.version = parseFloat(xLBtmpc[0]);
		xLBenv.browser.code = "ns6";
	} else if (xLBua.indexOf('Chrome/') != -1) {
		xLBenv.browser.name = "Google Chrome";
		xLBenv.browser.code = "chrome";
		xLBenv.browser.version = parseFloat(xLBua.split("Chrome/")[1].split(" ")[0]);
	} else if (xLBua.indexOf('KHTML') != -1) {
		xLBenv.browser.name = "Safari";
		xLBenv.browser.code = "safari";
		xLBtmp  = xLBua.split("/");
		xLBtmpc  = xLBtmp[2].split(" ");
		xLBenv.browser.version = parseFloat(xLBtmpc[0]);
		if (xLBenv.browser.version >= 525) {
			xLBtmp = xLBua.split("Version/")[1].split(" ")[0];
			xLBenv.browser.version = xLBtmp.split(".")[0] + "." + xLBtmp.split(".")[1];
		} else if (xLBenv.browser.version >= 520) {
			xLBenv.browser.version = "3.0";
		} else if (xLBenv.browser.version >= 412) {
			xLBenv.browser.version = "2.0";
		} else if (xLBenv.browser.version >= 312) {
			xLBenv.browser.version = "1.3";
		} else if (xLBenv.browser.version >= 125) {
			xLBenv.browser.version = "1.2";
		} else if (xLBenv.browser.version >= 100) {
			xLBenv.browser.version = "1.1";
		} else if (xLBenv.browser.version >= 85) {
			xLBenv.browser.version = "1.0";
		} else {
			xLBenv.browser.version = "";
		}
	} else if (xLBua.indexOf('Firefox') != -1) {
		xLBenv.browser.name = "Firefox";
		xLBenv.browser.code = "mozilla";
		xLBtmp  = xLBua.split("Firefox/");
		xLBtmpc  = xLBtmp[1].split(" ");
		xLBenv.browser.version = parseFloat(xLBtmpc[0]);
	} else {
		xLBenv.browser.name = "その他ブラウザ";
		xLBenv.browser.code = "other";
		xLBenv.browser.version = "";
	}
}

if (xLBlcap) { //ns4.0x ns4.5x
	xLBenv.browser.name = "Netscape Navigator";
	xLBtmp  = xLBua.split("/");
	xLBtmpc = xLBtmp[1].split(" ");
	xLBenv.browser.version = parseFloat(xLBtmpc[0]);
	xLBenv.browser.code = "ns4";
}

if (xLBdcap && xLBgcap && !xLBopr) { //ie
	xLBenv.browser.name = "Internet Explorer";
	xLBtmp  = xLBua.split("MSIE ");
	xLBtmpc = xLBtmp[1].split(";");
	xLBenv.browser.version = parseFloat(xLBtmpc[0]);
	xLBenv.browser.code = "ie5";
}

if (xLBdcap && !xLBgcap) { //ie4.0x
	xLBenv.browser.name = "Internet Explorer";
	xLBtmp  = xLBua.split("MSIE ");
	xLBtmpc = xLBtmp[1].split(";");
	xLBenv.browser.version = parseFloat(xLBtmpc[0]);
	xLBenv.browser.code = "ie4";
}

if (xLBopr) { //Opera
	xLBenv.browser.name = "Opera";
	xLBenv.browser.code = "opera";
	xLBenv.browser.version = "";
}

// OS
if (xLBua.indexOf('Win') != -1) {
	if (xLBua.indexOf('95') != -1)     { xLBenv.os.code = "win95";  xLBenv.os.name = "Windows 95"; }
	if (xLBua.indexOf('98') != -1)     { xLBenv.os.code = "win98";  xLBenv.os.name = "Windows 98"; }
	if (xLBua.indexOf('4.90') != -1)   { xLBenv.os.code = "win98";  xLBenv.os.name = "Windows ME"; }
	if (xLBua.indexOf('NT 4.0') != -1) { xLBenv.os.code = "winNT4"; xLBenv.os.name = "Windows NT 4.0"; }
	if (xLBua.indexOf('NT 5.0') != -1) { xLBenv.os.code = "winNT5"; xLBenv.os.name = "Windows 2000"; }
	if (xLBua.indexOf('NT 5.1') != -1) { xLBenv.os.code = "winNT5"; xLBenv.os.name = "Windows XP"; }
	if (xLBua.indexOf('SV1') != -1) { xLBenv.os.code = "winNT5s"; xLBenv.os.name = "Windows XP SP2, SP3"; }
	if (xLBua.indexOf('IEMB3') != -1) { xLBenv.os.code = "winNT5s"; xLBenv.os.name = "Windows XP SP2, SP3"; }
	if (xLBua.indexOf('NT 5.1') != -1 && xLBua.indexOf('MSIE 7') != -1) { xLBenv.os.code = "winNT5s"; xLBenv.os.name = "Windows XP SP2, SP3"; }
	if (xLBua.indexOf('NT 5.1') != -1 && xLBua.indexOf('MSIE 8') != -1) { xLBenv.os.code = "winNT5s"; xLBenv.os.name = "Windows XP SP2, SP3"; }
	if (xLBua.indexOf('NT 5.2') != -1) { xLBenv.os.code = "winNT5.2"; xLBenv.os.name = "Windows Server 2003, Windows XP x64 Edition"; }
	if (xLBua.indexOf('NT 6.0') != -1) { xLBenv.os.code = "winNT6"; xLBenv.os.name = "Windows Vista"; }
	if (xLBua.indexOf('NT 6.0') != -1
		&& (xLBua.indexOf('Win64') != -1 || xLBua.indexOf('IA64') != -1 || xLBua.indexOf('x64') != -1)) { xLBenv.os.code = "winNT6"; xLBenv.os.name = "Windows Vista x64 Edition"; }
	if (xLBua.indexOf('NT 6.1') != -1) { xLBenv.os.code = "winNT6.1"; xLBenv.os.name = "Windows 7"; }
}
if (xLBua.indexOf('Mac OS X') != -1) {
	xLBenv.os.code = "mac"; xLBenv.os.name = "Mac OS X";
} else if (xLBua.indexOf('Mac') != -1) {
	xLBenv.os.code = "mac"; xLBenv.os.name = "Mac OS";
}

// WindowsMediaPlayer
var wmplugin = (navigator.mimeTypes && navigator.mimeTypes["video/x-ms-asf"]) ? navigator.mimeTypes["video/x-ms-asf"].enabledPlugin : 0;
var wmpObj7 ='<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" width="1" height="1" id="WMP7" viewastext></object> \n'+'<script language="VBScript"\> \n'+'on error resume next \n'+'WMP7obj = (WMP7.URL = "") \n'+'</script\> \n';
var wmpObj6 ='<object classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95" width="1" height="1" id="WMP6" viewastext></object> \n'+'<object classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" width="1" height="1" id="WMP7" viewastext></object> \n'+'<script language="VBScript"\> \n'+'on error resume next \n'+'WMP6obj = (WMP6.FileName = "") \n'+'WMP7obj = (WMP7.URL = "") \n'+'</script\> \n';

if (wmplugin) {
	xLBenv.wmp.isInstall = true;
	xLBenv.wmp.version = -1;
} else if (xLBenv.browser.code.indexOf('ie') != -1 && xLBenv.os.code.indexOf('win') != -1) {
	if (xLBenv.os.name.indexOf('Windows Vista') != -1) {
	document.write(wmpObj7);
	} else {
	document.write(wmpObj6);
	}
	try {
		if (WMP7obj) {
			xLBenv.activex.enable = true;
			xLBenv.wmp.isInstall = true;
			xLBenv.wmp.version = parseInt(WMP7.versionInfo);
		} else if(WMP6obj) {
			xLBenv.activex.enable = true;
			xLBenv.wmp.isInstall = true;
			xLBenv.wmp.version = 6;
		}
	} catch(e) {}
}
if (isNaN(xLBenv.wmp.version) || xLBenv.wmp.version == 0) { xLBenv.wmp.isInstall = false; }

// Flash
var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
if (plugin) {
	xLBenv.flash.isInstall = true;
	var desc = plugin.description;
	xLBenv.flash.version = eval(desc.substring(desc.indexOf("Flash")+6, desc.indexOf("Flash")+9));
} else if (xLBenv.browser.code.indexOf('ie') != -1 && xLBenv.os.code.indexOf('win') != -1) {
	if (!xLBenv.flash.isInstall) {
		document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="5" height="5" id="swf" name="swf" viewastext style="display:none;"><param name="movie" value="http://i.yimg.jp/images/help/env/void.swf"></object>');
		try {
			xLBenv.flash.version = Math.floor(window['swf'].FlashVersion() / 0x10000);
		} catch(e) {}
		if (!isNaN(xLBenv.flash.version)) {
			xLBenv.flash.isInstall = true;
		}
	}
}

if (isNaN(xLBenv.flash.version) || xLBenv.flash.version == 0) { xLBenv.flash.isInstall = false; }

})();
