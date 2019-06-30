var CFLiewin = navigator.userAgent.indexOf('Win') && (document.all);
var CFLflag = false;
if (CFLwidth == undefined) { var CFLwidth = 150 };
if (CFLheight == undefined) { var CFLheight = 208 };
/********************ここから変更20090526*************************/
var CFLaltHTML = '<!-- Adobe Flash Player  --><div class="yjplg"><table><tr><td class="yjSt" align="left" style="padding:5px;">Adobe Flash Playerは、<a href="http://downloads.yahoo.co.jp/docs/flashplayer/start.html" target="plugin">Adobe Flash Playerインストールガイド</a>（Yahoo!ダウンロードセンター）で入手できます。さらに詳しい情報は「<a href="http://help.yahoo.co.jp/help/jp/common/sys/sys-10.html">Adobe Flash Playerをインストールするには</a>」をご覧ください。</td></tr><tr><td class="icn-v" align="center"><a href="http://downloads.yahoo.co.jp/docs/flashplayer/start.html" target="plugin"><img src="http://i.yimg.jp/images/common/ydc_get_flash_player1.gif" alt="Adobe Flash Playerインストールガイド"></a></td></tr></table></div><!-- /Adobe Flash Player  -->';
/********************ここまで変更20090526*************************/
//var CFLfpver = 8;
var CFLfpver = 6;
var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
if (plugin) {
	var desc = plugin.description;
	CFLflag = parseInt(desc.substring(desc.indexOf("Flash")+6,desc.indexOf("Flash")+9)) >= CFLfpver;
} else if (CFLiewin) {
	document.write('<script language="VBScript"\> \n');
	document.write('on error resume next \n');
	document.write('CFLflag = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & CFLfpver )))\n');
	document.write('</script\> \n');
}
if ( CFLflag ) {
	document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
	document.write('codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"');
	//document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"');
	//document.write(' codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"');
	document.write(' id="CFL" width="'+ CFLwidth +'" height="'+ CFLheight +'">');
	document.write('<param name="movie" value="'+ CFLswfuri +'">');
	document.write('<param name="wmode" value="transparent">');
	document.write('<param name="allowScriptAccess" value="always" />');
	document.write('<param name="loop" value="true">');
	document.write('<param name="quality" value="high">');
	document.write('<embed src="'+ CFLswfuri +'" loop="true" wmode="transparent"');
	document.write(' quality="high" swLiveConnect="false"');
	document.write(' width="'+ CFLwidth +'" height="'+ CFLheight +'"');
	document.write(' type="application/x-shockwave-flash"');
	document.write(' allowScriptAccess="always"');
	document.write(' pluginspage="http://www.macromedia.com/go/getflashplayer">');
	document.write('</embed>');
	document.write('</object>');
	//document.write( promo );
} else {
	document.write(CFLaltHTML);
}
function CFLerr() {
	return true;
}
