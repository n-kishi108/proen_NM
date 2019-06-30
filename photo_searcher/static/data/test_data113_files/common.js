
//MediaWriteSWF
function MediaWriteSWF(){
	var SWFVersionTbl = new Array('','','','','4,0,2,0','5,0,0,0','6,0,0,0','7,0,0,0','8,0,0,0','9,0,0,0','10,0,0,0');
	var MDWriteSwfObj= '<object width="' +MDWriteSwfWidth+ '" height="' +MDWriteSwfHeight+ '" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' +SWFVersionTbl[MDWriteSwfVer]+ '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000">'
										+'<param name="movie" value="' +MDWriteSwfURL+ '">'
										+'<param name="bgcolor" value="' +MDWriteSwfBgColor+ '">'
										+'<param name="menu" value="false">'
										+'<param name="quality" value="high">'
										+'<param name="allowScriptAccess" value="always">'
										+'<embed src="' +MDWriteSwfURL+ '" bgcolor="' +MDWriteSwfBgColor+ '" width="' +MDWriteSwfWidth+ '" height="' +MDWriteSwfHeight+ '" menu="false" quality="high" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" allowScriptAccess="always"></embed></object>';
	document.write(MDWriteSwfObj);
	
	//clear
	MDWriteSwfVer = MDWriteSwfWidth = MDWriteSwfHeight = 0;
	MDWriteSwfBgColor = MDWriteSwfURL = '';
}