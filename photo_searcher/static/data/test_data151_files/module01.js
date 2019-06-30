//	Plugin Module	
// 	Version : 1.2
// 	1. Browser
// 	2. Windows Media Player
// 	3. Real Player
// 	4. Adobe Flash Player
// 	5. Adobe Reader
// 	6. Windows Media Player and Adobe Flash Player

// URL Normal
var yjPluginBrw_Help = 'http://help.yahoo.co.jp/help/jp/common/sys/sys-01.html';
var yjPluginBrw_FF   = 'http://www.mozilla-japan.org/products/firefox/';
var yjPluginBrw_IE   = 'http://www.microsoft.com/japan/windows/ie/downloads/default.mspx';
var yjPluginBrw_IE6  = 'http://www.microsoft.com/japan/windows/ie/ie6/downloads/default.mspx';
var yjPluginBrw_SF   = 'http://www.apple.com/jp/safari/';
var yjPluginWMP_Help = 'http://help.yahoo.co.jp/help/jp/common/sys/sys-08.html';
var yjPluginWMP_WMP  = 'http://www.microsoft.com/windows/windowsmedia/player/download/';
var yjPluginWMP_WMP9 = 'http://www.microsoft.com/japan/windows/windowsmedia/software/macintosh/osx/default.aspx';
var yjPluginWMP_WMP7 = 'http://www.microsoft.com/japan/windows/windowsmedia/download/mac71.aspx';
var yjPluginRP_Help  = 'http://help.yahoo.co.jp/help/jp/common/sys/sys-09.html';
var yjPluginRP_WIN   = 'http://japan.real.com/player/?lang=jp&loc=jp&src=ext';
var yjPluginRP_MAC   = 'http://japan.real.com/player/?lang=jp&loc=jp&src=ext';
var yjPluginAFP_Help = 'http://help.yahoo.co.jp/help/jp/common/sys/sys-10.html';
var yjPluginAFP_ALL  = 'http://www.adobe.com/go/getflashplayer_jp';
var yjPluginAR_Help  = 'http://help.yahoo.co.jp/help/jp/common/sys/sys-11.html';
var yjPluginAR_ALL   = 'http://www.adobe.com/jp/products/acrobat/readstep2.html';
// URL Kids
var yjPluginWMP_Kids_Help = 'http://help.yahoo.co.jp/help/jp/kids/tools/tools-41.html';
var yjPluginAFP_Kids_Help = 'http://help.yahoo.co.jp/help/jp/kids/tools/tools-10.html';
var yjPluginAR_Kids_Help  = 'http://help.yahoo.co.jp/help/jp/kids/tools/tools-07.html';

// Type
var yjPluginNormal = 0;
var yjPluginKids   = 1;

// Check Protocol - for Images
function yjImgDmn() {
	var getPtl = window.location.protocol ;
	var checkPtl = "";
	if(getPtl.indexOf("https") != -1) checkPtl = "https://s.yimg.jp/";
	else checkPtl = "http://i.yimg.jp/";
	return checkPtl;}

// Text Normal
var yjPluginBrw_Text = ['最新のブラウザ（Internet Explorer/Firefox）は、ボタンを押して移動したサイトで入手できます。さらに詳しい情報は「<a href="' + yjPluginBrw_Help + '">Yahoo! JAPANの推奨ブラウザ</a>」をご覧ください。', '最新のブラウザ（Safari）は、ボタンを押して移動したサイトで入手できます。さらに詳しい情報は「<a href="' + yjPluginBrw_Help + '">Yahoo! JAPANの推奨ブラウザ</a>」をご覧ください。', '最新のブラウザ情報は「<a href="' + yjPluginBrw_Help + '">Yahoo! JAPANの推奨ブラウザ</a>」をご覧ください。'];
var yjPluginWMP_Text = ['Windows Media Playerは、ボタンを押して移動したサイトで入手できます。さらに詳しい情報は「<a href="' + yjPluginWMP_Help + '">Windows Media Playerをインストールするには</a>」をご覧ください。', 'Windows Media Playerの情報は「<a href="' + yjPluginWMP_Help + '">Windows Media Playerをインストールするには</a>」をご覧ください。'];
var yjPluginRP_Text = ['Real Playerは、ボタンを押して移動したサイトで入手できます。さらに詳しい情報は「<a href="' + yjPluginRP_Help + '">Real Playerをインストールするには</a>」をご覧ください。', 'Real Playerの情報は「<a href="' + yjPluginRP_Help + '">Real Playerをインストールするには</a>」をご覧ください。'];
var yjPluginAFP_Text = ['Adobe Flash Playerは、ボタンを押して移動したサイトで入手できます。さらに詳しい情報は「<a href="' + yjPluginAFP_Help + '">Adobe Flash Playerをインストールするには</a>」をご覧ください。'];
var yjPluginAR_Text    = ['Adobe Readerは、ボタンを押して移動したサイトで入手できます。さらに詳しい情報は「<a href="' + yjPluginAR_Help + '">Adobe Readerをインストールするには</a>」をご覧ください。'];
var yjPluginWMPAFP_Text      = ['動画と音声の再生には、プレーヤーソフトウエア（Windows Media Player/Adobe Flash Player）が必要です。それぞれボタンを押して移動したサイトで入手できます。さらに詳しい情報は「<a href="' + yjPluginWMP_Help + '">Windows Media Playerをインストールするには</a>」「<a href="' + yjPluginAFP_Help + '">Adobe Flash Playerをインストールするには</a>」をご覧ください。', '動画と音声の再生には、プレーヤーソフトウエア（Windows Media Player/Adobe Flash Player）が必要です。最新のプレーヤーソフトウエア情報は「<a href="' + yjPluginWMP_Help + '">Windows Media Playerをインストールするには</a>」「<a href="' + yjPluginAFP_Help + '">Adobe Flash Playerをインストールするには</a>」をご覧ください。'];

// Text Kids
var yjPluginWMP_Kids_Text = ['には、プレーヤーソフトウエアの<a href="' + yjPluginWMP_WMP + '" target="plugin">Windows Media Player（無料）</a>が必要です。Windows Media Playerは、ボタンを押して移動したサイトでダウンロードできます。さらにくわしい情報は「<a href="' + yjPluginWMP_Kids_Help + '">Windows Media Playerってなに？</a>」をごらんください。', 'には、プレーヤーソフトウエアの<a href="' + yjPluginWMP_WMP9 + '" target="plugin">Windows Media Player（無料）</a>が必要です。Windows Media Playerは、ボタンを押して移動したサイトでダウンロードできます。さらにくわしい情報は「<a href="' + yjPluginWMP_Kids_Help + '">Windows Media Playerってなに？</a>」をごらんください。', 'には、プレーヤーソフトウエアの<a href="' + yjPluginWMP_WMP7 + '" target="plugin">Windows Media Player（無料）</a>が必要です。Windows Media Playerは、ボタンを押して移動したサイトでダウンロードできます。さらにくわしい情報は「<a href="' + yjPluginWMP_Kids_Help + '">Windows Media Playerってなに？</a>」をごらんください。', 'Windows Media Playerの情報は「<a href="' + yjPluginWMP_Kids_Help + '">Windows Media Playerってなに？</a>」をごらんください。'];
var yjPluginAFP_Kids_Text = ['には、JavaScriptに対応したブラウザとプレーヤーソフトウエアの<a href="' + yjPluginAFP_ALL + '" target="plugin">Adobe Flash Player（無料）</a>が必要です。Adobe Flash Playerは、ボタンを押して移動したサイトでダウンロードできます。さらにくわしい情報は「<a href="' + yjPluginAFP_Kids_Help + '">Flashってなに？</a>」をごらんください。'];
var yjPluginAR_Kids_Text  = ['には、閲覧（えつらん）ソフトウエアの<a href="' + yjPluginAR_ALL + '" target="plugin">Adobe Reader（無料）</a>が必要です。Adobe Readerは、ボタンを押して移動したサイトでダウンロードできます。さらにくわしい情報は「<a href="' + yjPluginAR_Kids_Help + '">PDFってなに？</a>」をごらんください。'];


// 1-1.【Browser】CSS版横型
function yjPluginBrw01(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Server 2003') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1 ) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginBrw_FF + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getfirefox_88x31.png" alt="Firefoxをダウンロード"></a><a href="' + yjPluginBrw_IE + '" target="plugin"><img src="' + yjImgDmn() + 'images/ybb/icon/ieget_animated.gif" alt="Internet Explorerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginBrw_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1 || xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows NT 4.0') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1 ) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginBrw_FF + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getfirefox_88x31.png" alt="Firefoxをダウンロード"></a><a href="' + yjPluginBrw_IE6 + '" target="plugin"><img src="' + yjImgDmn() + 'images/ybb/icon/ieget_animated.gif" alt="Internet Explorerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginBrw_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><div class="icn-h yj-txt yjSt"><a href="' + yjPluginBrw_SF + '" class="yj-txt" target="plugin">[Safariをダウンロード]</a></div><p class="yjSt">');
	document.write( yjPluginBrw_Text[1] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('');}
else {
	document.write('<div class="yjplg"><p class="yjSt">');
	document.write( yjPluginBrw_Text[2] );
	document.write('</p></div>');}
}

// 1-2.【Browser】CSS版縦型
function yjPluginBrw02(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Server 2003') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1 ) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginBrw_FF + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getfirefox_88x31.png" alt="Firefoxをダウンロード"></a><a href="' + yjPluginBrw_IE + '" target="plugin"><img src="' + yjImgDmn() + 'images/ybb/icon/ieget_animated.gif" alt="Internet Explorerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginBrw_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1 || xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows NT 4.0') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1 ) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginBrw_FF + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getfirefox_88x31.png" alt="Firefoxをダウンロード"></a><a href="' + yjPluginBrw_IE6 + '" target="plugin"><img src="' + yjImgDmn() + 'images/ybb/icon/ieget_animated.gif" alt="Internet Explorerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginBrw_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><div class="icn-v yj-txt yjSt"><a href="' + yjPluginBrw_SF + '" class="yj-txt" target="plugin">[Safariをダウンロード]</a></div><p class="yjSt">');
	document.write( yjPluginBrw_Text[1] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('');}
else {
	document.write('<div class="yjplg"><p class="yjSt">');
	document.write( yjPluginBrw_Text[2] );
	document.write('</p></div>');}
}

// 1-3.【Browser】Table版横型
function yjPluginBrw03(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Server 2003') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1 ) {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	document.write( yjPluginBrw_Text[0] );
	document.write('</td><td class="icn-h"><a href="' + yjPluginBrw_FF + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getfirefox_88x31.png" alt="Firefoxをダウンロード"></a></td><td class="icn-h"><a href="' + yjPluginBrw_IE + '" target="plugin"><img src="' + yjImgDmn() + 'images/ybb/icon/ieget_animated.gif" alt="Internet Explorerをダウンロード"></a></td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1 || xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows NT 4.0') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1 ) {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	document.write( yjPluginBrw_Text[0] );
	document.write('</td><td class="icn-h"><a href="' + yjPluginBrw_FF + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getfirefox_88x31.png" alt="Firefoxをダウンロード"></a></td><td class="icn-h"><a href="' + yjPluginBrw_IE6 + '" target="plugin"><img src="' + yjImgDmn() + 'images/ybb/icon/ieget_animated.gif" alt="Internet Explorerをダウンロード"></a></td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	document.write( yjPluginBrw_Text[1] );
	document.write('</td><td class="icn-h yj-txt yjSt"><a href="' + yjPluginBrw_SF + '" class="yj-txt" target="plugin">[Safariをダウンロード]</a></td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('');}
else {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	document.write( yjPluginBrw_Text[2] );
	document.write('</td></tr></table></div>');}
}

// 1-4.【Browser】Table版縦型
function yjPluginBrw04(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Server 2003') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1 ) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginBrw_FF + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getfirefox_88x31.png" alt="Firefoxをダウンロード"></a><a href="' + yjPluginBrw_IE + '" target="plugin"><img src="' + yjImgDmn() + 'images/ybb/icon/ieget_animated.gif" alt="Internet Explorerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	document.write( yjPluginBrw_Text[0] );
	document.write('</td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1 || xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows NT 4.0') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1 ) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginBrw_FF + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getfirefox_88x31.png" alt="Firefoxをダウンロード"></a><a href="' + yjPluginBrw_IE6 + '" target="plugin"><img src="' + yjImgDmn() + 'images/ybb/icon/ieget_animated.gif" alt="Internet Explorerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	document.write( yjPluginBrw_Text[0] );
	document.write('</td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v yj-txt yjSt"><a href="' + yjPluginBrw_SF + '" class="yj-txt" target="plugin">[Safariをダウンロード]</a></td></tr><tr><td class="yjSt">');
	document.write( yjPluginBrw_Text[1] );
	document.write('</td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('');}
else {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	document.write( yjPluginBrw_Text[2] );
	document.write('</td></tr></table></div>');}
}

// 2-1.【Windows Media Player】CSS版横型
function yjPluginWMP01(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp11.gif" alt="Windows Media Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginWMP_WMP9 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[1]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginWMP_WMP7 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[2]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</p></div>');}
else {
	document.write('<div class="yjplg"><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[1] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[3]);}
	else {
		document.write( yjPluginWMP_Text[1] );}
	document.write('</p></div>');}
}

// 2-2.【Windows Media Player】CSS版縦型
function yjPluginWMP02(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp11.gif" alt="Windows Media Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginWMP_WMP9 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[1]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginWMP_WMP7 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[2]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</p></div>');}
else {
	document.write('<div class="yjplg"><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[1] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[3]);}
	else {
		document.write( yjPluginWMP_Text[1] );}
	document.write('</p></div>');}
}

// 2-3.【Windows Media Player】Table版横型
function yjPluginWMP03(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</td><td class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp11.gif" alt="Windows Media Playerをダウンロード"></a></td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</td><td class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a></td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</td><td class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a></td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[1]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</td><td class="icn-h"><a href="' + yjPluginWMP_WMP9 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a></td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[2]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</td><td class="icn-h"><a href="' + yjPluginWMP_WMP7 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a></td></tr></table></div>');}
else {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[1] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[3]);}
	else {
		document.write( yjPluginWMP_Text[1] );}
	document.write('</td></tr></table></div>');}
}

// 2-4.【Windows Media Player】Table版縦型
function yjPluginWMP04(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp11.gif" alt="Windows Media Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[0]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginWMP_WMP9 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[1]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginWMP_WMP7 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[2]);}
	else {
		document.write( yjPluginWMP_Text[0] );}
	document.write('</td></tr></table></div>');}
else {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginWMP_Text[1] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginWMP_Kids_Text[3]);}
	else {
		document.write( yjPluginWMP_Text[1] );}
	document.write('</td></tr></table></div>');}
}

// 3-1.【Real Player】CSS版横型
function yjPluginRP01(type,text){
var yjPlugin_Text = text;
if (xLBua.indexOf('Win') != -1 ) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginRP_WIN + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getrealp.gif" alt="Real Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginRP_Text[0] );
	document.write('</p></div>');}
else if (xLBua.indexOf('Mac') != -1 ) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginRP_MAC + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getrealp.gif" alt="Real Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginRP_Text[0] );
	document.write('</p></div>');}
else {
	document.write('<div class="yjplg"><p class="yjSt">');
	document.write( yjPluginRP_Text[1] );
	document.write('</p></div>');}
}

// 3-2.【Real Player】CSS版縦型
function yjPluginRP02(type,text){
var yjPlugin_Text = text;
if (xLBua.indexOf('Win') != -1 ) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginRP_WIN + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getrealp.gif" alt="Real Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginRP_Text[0] );
	document.write('</p></div>');}
else if (xLBua.indexOf('Mac') != -1 ) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginRP_MAC + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getrealp.gif" alt="Real Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginRP_Text[0] );
	document.write('</p></div>');}
else {
	document.write('<div class="yjplg"><p class="yjSt">');
	document.write( yjPluginRP_Text[1] );
	document.write('</p></div>');}
}

// 3-3.【Real Player】Table版横型
function yjPluginRP03(type,text){
var yjPlugin_Text = text;
if (xLBua.indexOf('Win') != -1 ) {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	document.write( yjPluginRP_Text[0] );
	document.write('</td><td class="icn-h"><a href="' + yjPluginRP_WIN + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getrealp.gif" alt="Real Playerをダウンロード"></a></td></tr></table></div>');}
else if (xLBua.indexOf('Mac') != -1 ) {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	document.write( yjPluginRP_Text[0] );
	document.write('</td><td class="icn-h"><a href="' + yjPluginRP_MAC + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getrealp.gif" alt="Real Playerをダウンロード"></a></td></tr></table></div>');}
else {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	document.write( yjPluginRP_Text[1] );
	document.write('</td></tr></table></div>');}
}

// 3-4.【Real Player】Table版縦型
function yjPluginRP04(type,text){
var yjPlugin_Text = text;
if (xLBua.indexOf('Win') != -1 ) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginRP_WIN + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getrealp.gif" alt="Real Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	document.write( yjPluginRP_Text[0] );
	document.write('</td></tr></table></div>');}
else if (xLBua.indexOf('Mac') != -1 ) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginRP_MAC + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getrealp.gif" alt="Real Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	document.write( yjPluginRP_Text[0] );
	document.write('</td></tr></table></div>');}
else {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	document.write( yjPluginRP_Text[1] );
	document.write('</td></tr></table></div>');}
}

// 4-1.【Adobe Flash Player】CSS版横型
function yjPluginAFP01(type,text){
var yjPlugin_Text = text;
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginAFP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginAFP_Kids_Text[0]);}
	else {
		document.write( yjPluginAFP_Text[0] );}
	document.write('</p></div>');}

// 4-2.【Adobe Flash Player】CSS版縦型
function yjPluginAFP02(type,text){
var yjPlugin_Text = text;
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginAFP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginAFP_Kids_Text[0]);}
	else {
		document.write( yjPluginAFP_Text[0] );}
	document.write('</p></div>');}

// 4-3.【Adobe Flash Player】Table版横型
function yjPluginAFP03(type,text){
var yjPlugin_Text = text;
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginAFP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginAFP_Kids_Text[0]);}
	else {
		document.write( yjPluginAFP_Text[0] );}
	document.write('</td><td class="icn-h"><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr></table></div>');}

// 4-4.【Adobe Flash Player】Table版縦型
function yjPluginAFP04(type,text){
var yjPlugin_Text = text;
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginAFP_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginAFP_Kids_Text[0]);}
	else {
		document.write( yjPluginAFP_Text[0] );}
	document.write('</td></tr></table></div>');}

// 5-1.【Adobe Reader】CSS版横型
function yjPluginAR01(type,text){
var yjPlugin_Text = text;
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginAR_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/howto/getacro.gif" alt="Adobe Readerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginAR_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginAR_Kids_Text[0]);}
	else {
		document.write( yjPluginAR_Text[0] );}
	document.write('</p></div>');}

// 5-2.【Adobe Reader】CSS版縦型
function yjPluginAR02(type,text){
var yjPlugin_Text = text;
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginAR_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/howto/getacro.gif" alt="Adobe Readerをダウンロード"></a></div><p class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginAR_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginAR_Kids_Text[0]);}
	else {
		document.write( yjPluginAR_Text[0] );}
	document.write('</p></div>');}

// 5-3.【Adobe Reader】Table版横型
function yjPluginAR03(type,text){
var yjPlugin_Text = text;
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginAR_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginAR_Kids_Text[0]);}
	else {
		document.write( yjPluginAR_Text[0] );}
	document.write('</td><td class="icn-h"><a href="' + yjPluginAR_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/howto/getacro.gif" alt="Adobe Readerをダウンロード"></a></td></tr></table></div>');}

// 5-4.【Adobe Reader】Table版縦型
function yjPluginAR04(type,text){
var yjPlugin_Text = text;
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginAR_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/howto/getacro.gif" alt="Adobe Readerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	if (type == yjPluginNormal) {
		document.write( yjPluginAR_Text[0] );}
	else if (type == yjPluginKids) {
		document.write( yjPlugin_Text + yjPluginAR_Kids_Text[0]);}
	else {
		document.write( yjPluginAR_Text[0] );}
	document.write('</td></tr></table></div>');}

// 6-1.【Windows Media Player and Adobe Flash Player】CSS版横型
function yjPluginWMPAFP01(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp11.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginWMP_WMP9 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('<div class="yjplg"><div class="icn-h"><a href="' + yjPluginWMP_WMP7 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</p></div>');}
else {
	document.write('<div class="yjplg"><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[1] );
	document.write('</p></div>');}
}

// 6-2.【Windows Media Player and Adobe Flash Player】CSS版縦型
function yjPluginWMPAFP02(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp11.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginWMP_WMP9 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</p></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('<div class="yjplg"><div class="icn-v"><a href="' + yjPluginWMP_WMP7 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></div><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</p></div>');}
else {
	document.write('<div class="yjplg"><p class="yjSt">');
	document.write( yjPluginWMPAFP_Text[1] );
	document.write('</p></div>');}
}

// 6-3.【Windows Media Player and Adobe Flash Player】Table版横型
function yjPluginWMPAFP03(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1) {
	document.write('<div class="yjplg"><table><tr><td colspan="2" class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</td><td class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp11.gif" alt="Windows Media Playerをダウンロード"></a></td><td class="icn-h"><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1) {
	document.write('<div class="yjplg"><table><tr><td colspan="2" class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</td><td class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a></td><td class="icn-h"><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1) {
	document.write('<div class="yjplg"><table><tr><td colspan="2" class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</td><td class="icn-h"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a></td><td class="icn-h"><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><table><tr><td colspan="2" class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</td><td class="icn-h"><a href="' + yjPluginWMP_WMP9 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a></td><td class="icn-h"><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('<div class="yjplg"><table><tr><td colspan="2" class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</td><td class="icn-h"><a href="' + yjPluginWMP_WMP7 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a></td><td class="icn-h"><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr></table></div>');}
else {
	document.write('<div class="yjplg"><table><tr><td colspan="2" class="yjSt">');
	document.write( yjPluginWMPAFP_Text[1] );
	document.write('</td></tr></table></div>');}
}

// 6-4.【Windows Media Player and Adobe Flash Player】Table版縦型
function yjPluginWMPAFP04(type,text){
var yjPlugin_Text = text;
if (xLBenv.os.name.indexOf('Windows XP') != -1 || xLBenv.os.name.indexOf('Windows Vista') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp11.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('Windows ME') != -1 || xLBenv.os.name.indexOf('Windows 2000') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('Windows 98') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginWMP_WMP + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOSX') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginWMP_WMP9 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</td></tr></table></div>');}
else if (xLBenv.os.name.indexOf('MacOS9') != -1) {
	document.write('<div class="yjplg"><table><tr><td class="icn-v"><a href="' + yjPluginWMP_WMP7 + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/getwmp_mac71.gif" alt="Windows Media Playerをダウンロード"></a><a href="' + yjPluginAFP_ALL + '" target="plugin"><img src="' + yjImgDmn() + 'images/common/get_flash_player.gif" alt="Flash Playerをダウンロード"></a></td></tr><tr><td class="yjSt">');
	document.write( yjPluginWMPAFP_Text[0] );
	document.write('</td></tr></table></div>');}
else {
	document.write('<div class="yjplg"><table><tr><td class="yjSt">');
	document.write( yjPluginWMPAFP_Text[1] );
	document.write('</td></tr></table></div>');}
}