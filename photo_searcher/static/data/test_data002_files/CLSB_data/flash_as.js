<!--
var plugin = 0;
if (typeof(impAswfver)=='undefined')
	var impAswfver=4

if (navigator.mimeTypes && navigator.mimeTypes['application/x-shockwave-flash'] && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
	if (navigator.plugins && navigator.plugins['Shockwave Flash'] && (parseInt(navigator.plugins['Shockwave Flash'].description.substring(navigator.plugins['Shockwave Flash'].description.indexOf('.')-2)) >= impAswfver) )
		plugin = 1;
}
// The <Object> tag is not supported in MSIE for Windows 3.1, but is in all other IE's
else if (navigator.userAgent && navigator.userAgent.indexOf('MSIE') >= 0 && (navigator.userAgent.indexOf('Windows') >= 0) && (navigator.userAgent.indexOf("Windows 3.1") < 0)) {
	document.writeln('<SCR' + 'IPT LANGUAGE="VBScript">');
	document.writeln('on error resume next ');
	document.writeln('if ( '+impAswfver+' = 3 ) then plugin = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.3")))');
	document.writeln('if (('+impAswfver+' <= 4) and (plugin <= 0 )) then plugin = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4")))');
	document.writeln('if (('+impAswfver+' <= 5) and (plugin <= 0 )) then plugin = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5")))');
	document.writeln('if (('+impAswfver+' <= 6) and (plugin <= 0 )) then plugin = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.6")))');
	document.writeln('if (('+impAswfver+' <= 7) and (plugin <= 0 )) then plugin = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.7")))');
	document.writeln('if (('+impAswfver+' <= 8) and (plugin <= 0 )) then plugin = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.8")))');
	document.writeln('if (('+impAswfver+' <= 9) and (plugin <= 0 )) then plugin = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.9")))');
	document.writeln('if (('+impAswfver+' <= 10) and (plugin <= 0 )) then plugin = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.10")))');
	document.writeln('</SCR'+'IPT> ');
}
if ( plugin ) {
	document.write('<OBJECT CLASSID="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
	document.write('  CODEBASE="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=3,0,0,0" ');
	document.writeln(' ID="impAswfid" WIDTH="'+impAwidth+'" HEIGHT="'+impAheight+'">');
	document.writeln('<PARAM NAME="movie" VALUE="' + impAswf + '?clickTag=' + impAurl + '"><PARAM NAME="quality" VALUE="autohigh"><PARAM NAME="bgcolor" VALUE="#FFFFFF"><param name="allowScriptAccess" value="always">'); 
	document.write(' <EMBED src="' + impAswf + '?clickTag=' + impAurl + '" quality="autohigh"  ');
	document.write(' swLiveConnect="FALSE" allowScriptAccess="always" WIDTH="'+impAwidth+'" HEIGHT="'+impAheight+'"');
	document.writeln(' TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">');
	document.writeln(' </EMBED>');
	document.writeln(' </OBJECT>');
} else if (!(navigator.appName && navigator.appName.indexOf("Netscape")>=0 && navigator.appVersion.indexOf("2.")>=0)){
	// Netscape 2.0 will render the code in the <NOSCRIPT> tag, so skip this in that case
	document.writeln('<A href="' + impAurl + '" target="_blank"><IMG SRC="'+impAimg+'" ALT="" WIDTH="'+impAwidth+'" HEIGHT="'+impAheight+'" BORDER="0"></A>');
}
//-->
