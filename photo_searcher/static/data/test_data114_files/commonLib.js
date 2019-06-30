mac = (navigator.appVersion.indexOf("Mac")>-1) ? true : false; // Mac
ie = (document.all) ? true : false; // IE
safari = (navigator.appVersion.indexOf("Safari")>-1) ? true : false; // Safari
gecko = (navigator.userAgent.indexOf("Gecko/") > -1)? true : false; // Gecko

function copyright() {
	y = new Date().getFullYear();
	document.write('2001-'+y);
}

function goHome(url) {
	if (window.opener) {
		try {
			window.opener.location.href='http://book.mycom.co.jp/wd/';
			window.opener.focus();
		} catch(e) {
			window.open('http://book.mycom.co.jp/wd/','_blank');
		}
	} else {
		window.open('http://book.mycom.co.jp/wd/','_blank');
	}
	return false
}

function openWin(wUrl,wName,wWidth,wHeight,wScroll,wResize,wStatus,wCenter){
	wOption1 = "toolbar=no,location=no,directories=no,status=" + wStatus + ",menubar=no,scrollbars=" + wScroll + ",resizable=" + wResize + ",width=" + wWidth + ",height=" + ((safari && (wStatus == "yes" || wStatus == 1))?(wHeight+16):wHeight);
	if (wCenter == "yes" || wCenter == 1) {
		scWidthCenter = screen.availWidth / 2;
		scHeightCenter = screen.availHeight / 2;
		wOption2 = ",left=" + (scWidthCenter - (wWidth / 2)) + ",top=" + (scHeightCenter - (wHeight / 2));
	}
	else {
		wOption2 = "";
	}
	w = window.open(wUrl,wName,wOption1+wOption2);
	w.focus();
}

function incSwf(fName,w,h,bgColor,cName) {
	document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="' + w + '" height="' + h + '" align="middle" class="' + cName + '">\n');
	document.write('<param name="allowScriptAccess" value="sameDomain" />\n');
	document.write('<param name="movie" value="../../js/' + fName + '" />\n');
	document.write('<param name="loop" value="false" />\n');
	document.write('<param name="menu" value="false" />\n');
	document.write('<param name="quality" value="high" />\n');
	document.write('<param name="bgcolor" value="' + bgColor + '" />\n');
	document.write('<embed src="../../js/' + fName + '" loop="false" menu="false" quality="high" bgcolor="' + bgColor + '" width="' + w + '" height="' + h + '" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" class="' + cName + '" />\n');
	document.write('</object>\n');
}

// マウスオーバーポップアップ
var IE = 0,NN = 0,N6 = 0;
if(document.all) IE = true;
else if(document.layers) NN = true;
else if(document.getElementById) N6 = true;
function OnLink(Msg,mX,mY,nX,nY){
var pX = 0,pY = 0;
var sX = -5,sY = 30;
if(IE){
MyMsg = document.all(Msg).style;
MyMsg.visibility = "visible";
}
if(NN){
MyMsg = document.layers[Msg];
MyMsg.visibility = "show";
}
if(N6){
MyMsg = document.getElementById(Msg).style;
MyMsg.visibility = "visible";
}
if(IE){
pX = document.body.scrollLeft;
pY = document.body.scrollTop;
MyMsg.left = mX + pX + sX;
MyMsg.top = mY + pY + sY;
}
if(NN || N6){
MyMsg.left = nX+ sX;
MyMsg.top = nY + sY;
}
}
function OffLink(Msg){
if(IE) document.all(Msg).style.visibility = "hidden";
if(NN) document.layers[Msg].visibility = "hide";
if(N6) document.getElementById(Msg).style.visibility = "hidden";
}