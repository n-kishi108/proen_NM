// init
var xLBenv = {
	os : {
		name     : '不明',
		code     : 'na'
	},
	browser : {
		name     : '不明',
		version  : 0,
		code     : 'na'
	}
};

// error
window.onerror = xLB_err;

// user agent
var xLBua   = navigator.userAgent;

// built-in object
var xLBdcap = document.all;// IE用
var xLBlcap = document.layers;// N4用
var xLBgcap = document.getElementById;// N6用
var xLBopr  = window.opera; // OPERA用

// browser
if (!xLBdcap && xLBgcap && !xLBopr) { //ns6.x ns7.x Gecko
	if (xLBua.indexOf('Netscape6') != -1 || xLBua.indexOf('Netscape/7') != -1) {
		xLBenv.browser.name = "Netscape Navigator";
		xLBtmp  = xLBua.split("/");
		xLBtmpc = xLBtmp[3].split(" ");
		xLBenv.browser.version = parseFloat(xLBtmpc[0]);
		xLBenv.browser.code = "ns6";
	} else if (xLBua.indexOf('KHTML') != -1) {
		xLBenv.browser.name = "Safari";
		xLBenv.browser.code = "safari";
		xLBtmp  = xLBua.split("/");
		xLBtmpc  = xLBtmp[2].split(" ");
		xLBenv.browser.version = parseFloat(xLBtmpc[0]);
		if (xLBenv.browser.version >= 520) {
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
		xLBenv.browser.name = "FirefoxなどのGecko系ブラウザ";
		xLBenv.browser.code = "mozilla";
	}
}

if (xLBlcap) { //ns4.0x ns4.5x
	xLBenv.browser.name = "Netscape Navigator";
	xLBtmp  = xLBua.split("/");
	xLBtmpc = xLBtmp[1].split(" ");
	xLBenv.browser.version = parseFloat(xLBtmpc[0]);
	xLBenv.browser.code = "ns4";
}

if (xLBdcap && xLBgcap && !xLBopr) { //ie5.0x ie5.5 ie6.0 ie7.0 ie8.0
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
	if (xLBua.indexOf('NT 5.2') != -1) { xLBenv.os.code = "winNT5x"; xLBenv.os.name = "Windows Server 2003, Windows XP x64 Edition"; }
	if (xLBua.indexOf('NT 6.0') != -1) { xLBenv.os.code = "winNT5v"; xLBenv.os.name = "Windows Vista, Windows Server 2008"; }
	if (xLBua.indexOf('IA64') != -1 && xLBua.indexOf('NT 5.2') != -1) { xLBenv.os.code = "winNT5x"; xLBenv.os.name = "Windows Server 2003 IA64"; }
	if (xLBua.indexOf('NT 6.0') != -1
		&& (xLBua.indexOf('Win64') != -1 || xLBua.indexOf('IA64') != -1 || xLBua.indexOf('x64') != -1)) { xLBenv.os.code = "winNT5v"; xLBenv.os.name = "Windows Vista x64 Edition"; }
}
if (xLBua.indexOf('Mac') != -1){
	if (xLBua.indexOf('IE 5.2') != -1) { xLBenv.os.code = "MacOSX";  xLBenv.os.name = "MacOSX"; }
	else if(xLBua.indexOf('X') != -1) { xLBenv.os.code = "MacOSX";  xLBenv.os.name = "MacOSX"; }
	else { xLBenv.os.code = "MacOS9";  xLBenv.os.name = "MacOS9"; }
}

// error trap
function xLB_err() {
	return true;
}
