document.write('<!-- Template Id = 3034 Template Name = 1DSougou Seikatsu - Flash Banner Creative -->\n<!-- Copyright 2002 DoubleClick Inc., All rights reserved. --><script src=\"http://s0.2mdn.net/879366/flashwrite_1_2.js\"><\/script>');document.write('\n');
 
var dcswf = "http://s0.2mdn.net/1429451/yahoo_engel.swf"; 
var dcgif = "http://s0.2mdn.net/1429451/yahoo_engel.gif"; 
var advurl = "http://ad.doubleclick.net/click%3Bh%3Dv8/3972/3/0/%2a/g%3B95010114%3B0-0%3B0%3B13651654%3B1-468/60%3B30459888/30477765/1%3B%3B%7Esscs%3D%3fhttp://www.lifeangel.co.jp/";
var dcadvurl = escape(advurl);
var dcminversion = 6;
var dcmaxversion = 9;
var plugin = false;
var dccreativewidth = "468";
var dccreativeheight = "60";
var dcwmode = "window";
var dcbgcolor = "";


if (((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Mozilla") != -1) && (parseFloat(navigator.appVersion) >= 4) && (navigator.javaEnabled()) && navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
var plugname=navigator.plugins['Shockwave Flash'].description;var plugsub=plugname.substring(plugname.indexOf("."),-1); var plugsubstr=plugsub.substr(-1)
if( plugsubstr >= dcminversion) { plugin = true;}
}
else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.userAgent.indexOf("Opera")<0) && (navigator.userAgent.indexOf("Windows 95")>=0 || navigator.userAgent.indexOf("Windows 98")>=0 || navigator.userAgent.indexOf("Windows NT")>=0) && document.all) 
{
document.write('<script language=VBScript>' + '\n' +
   'dcmaxversion = '+dcmaxversion + '\n' +
   'dcminversion = '+dcminversion + '\n' +
   'Do' + '\n' +
    'On Error Resume Next' + '\n' +
    'plugin = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.\" & dcmaxversion & \"\")))' + '\n' +
    'If plugin = true Then Exit Do' + '\n' +
    'dcmaxversion = dcmaxversion - 1' + '\n' +
    'Loop While dcmaxversion >= dcminversion' + '\n' +
  '<\/script>');
}
if ( plugin )  {
 adcode = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+
  ' ID=FLASH_AD WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'">'+
  '<PARAM NAME=movie VALUE="' + dcswf + '?clickTag='+ dcadvurl +'"><PARAM NAME="AllowScriptAccess" VALUE="always"><PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#'+ dcbgcolor +'><PARAM NAME=wmode VALUE='+ dcwmode +'>'+
  '<EMBED src="' + dcswf + '?clickTag='+ dcadvurl +'" quality=high wmode='+dcwmode+
  ' swLiveConnect=TRUE WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'" bgcolor=#'+ dcbgcolor+
  ' TYPE="application/x-shockwave-flash" ></EMBED></OBJECT>';
if(('j'!="j")&&(typeof dclkFlashWrite!="undefined")){dclkFlashWrite(adcode);}else{document.write(adcode);}
} else if (!(navigator.appName && navigator.appName.indexOf("Netscape")>=0 && navigator.appVersion.indexOf("2.")>=0)){
 document.write('<A TARGET="_blank" HREF="http://ad.doubleclick.net/click%3Bh%3Dv8/3972/3/0/%2a/g%3B95010114%3B0-0%3B0%3B13651654%3B1-468/60%3B30459888/30477765/1%3B%3B%7Esscs%3D%3fhttp://www.lifeangel.co.jp/"><IMG SRC="' + dcgif + '" BORDER=0></A>');
}
//-->

document.write('<NOEMBED><A TARGET=\"_blank\" HREF=\"http://ad.doubleclick.net/click%3Bh%3Dv8/3972/3/0/%2a/g%3B95010114%3B0-0%3B0%3B13651654%3B1-468/60%3B30459888/30477765/1%3B%3B%7Esscs%3D%3fhttp://www.lifeangel.co.jp/\"><IMG SRC=\"http://s0.2mdn.net/1429451/yahoo_engel.gif\" BORDER=0></A></NOEMBED><NOSCRIPT><A TARGET=\"_blank\" HREF=\"http://ad.doubleclick.net/click%3Bh%3Dv8/3972/3/0/%2a/g%3B95010114%3B0-0%3B0%3B13651654%3B1-468/60%3B30459888/30477765/1%3B%3B%7Esscs%3D%3fhttp://www.lifeangel.co.jp/\"><IMG SRC=\"http://s0.2mdn.net/1429451/yahoo_engel.gif\" BORDER=0></A></NOSCRIPT>');
