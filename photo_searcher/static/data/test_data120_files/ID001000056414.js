tagfriends_dom = document.getElementById;
tagfriends_opera = navigator.userAgent.indexOf("Opera")>-1;
tagfriends_ie4 = document.all && !tagfriends_dom && !tagfriends_opera;
tagfriends_ie5 = document.all && tagfriends_dom && !tagfriends_opera;
tagfriends_ie = tagfriends_ie4 || tagfriends_ie5;
tagfriends_Agent = navigator.userAgent;

function tagfriends_setCookie(str) {
  document.cookie = str;
}

function kids_openUrl(user_url) {
  self.location.href = user_url;
}

function tagfriends_openMap(map_url) {
  var winOption = "width=604,height=400,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0";
  window.open(map_url,'subwin',winOption);
}
function tagfriends_openEvent(event_url) {
  var winOption = "width=504,height=252,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0";
  window.open(event_url,'subevent',winOption);
}
function tagfriends_openLog(log_url) {
  var winOption = "width=420,height=360,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1";
  window.open(log_url,'sublog',winOption);
}

function openMap() {
  var winOption = "width=604,height=400,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0";
  window.open('http://tagfriends.com/map/index.html','subwin',winOption);
}

function openMap_rebecca() {
  var winOption = "width=604,height=400,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0";
  window.open('http://tagfriends.com/rebeccabonbon/map/index.html','subwin',winOption);
}

function openEvent() {
  var winOption = "width=504,height=252,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0";
  window.open('http://tagfriends.com/jp/event/taiku2007.html','subevent',winOption);
}

function openEvent77() {
  var winOption = "width=504,height=252,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=0";
  window.open('http://tagfriends.com/event/tanabata.html','subevent',winOption);
}

function tagfriends_Resize(command, args) {
	var hwArray = args.split(",");
	var newWidth = hwArray[0];
	var newHeight = hwArray[1];
	if (command == "tagresize" && tagfriends_ie && tagfriends_Agent.indexOf('Win') != -1) {	
		if(document.getElementById){
			document.getElementById('tagfriendsobj20100402153602095').style.width = newWidth+'px';
			document.getElementById('tagfriendsobj20100402153602095').style.height = newHeight+'px';
  		} else {
    			document.all['tagfriendsobj20100402153602095'].style.pixelWidth = newWidth;
			document.all['tagfriendsobj20100402153602095'].style.pixelHeight = newHeight;
  		}
	}else if (command == "tagresize"){
		if (document.all && !document.getElementById) {
			document.all['tagfriendsdiv20100402153602095'].style.pixelWidth = newWidth;
			document.all['tagfriendsdiv20100402153602095'].style.pixelHeight = newHeight;
	  	} else {
			document.getElementById('tagfriendsdiv20100402153602095').style.width = newWidth+'px';
			document.getElementById('tagfriendsdiv20100402153602095').style.height = newHeight+'px';
	  	}
	}
}

document.write('<script Language="VBScript">');
document.write('Sub tagfriendsobj20100402153602095_FSCommand(ByVal command,ByVal args)');
document.write('    call tagfriends_Resize(command,args)');
document.write('End Sub');
document.write('</script>');

var docURL = escape(document.URL);
var userHost = escape(document.domain);
var aa = "001000056414";
var headPath = "tool/under_headparts.swf";
var argowner = 001000056414;
var argwidth = 168;
var argheight = 126;

//

document.write('<div>');
if(tagfriends_ie && tagfriends_Agent.indexOf('Win') != -1){
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="168" HEIGHT="126" id="tagfriendsobj20100402153602095" ALIGN="">');
	document.write('<PARAM NAME=movie VALUE="http://cdn.tagfriends.com/swf/tag09110502.swf?owner=001000056414&url=' + docURL + '&userhost=' + userHost + '">');
	document.write('<PARAM NAME="allowScriptAccess" value="always">');
	document.write('<PARAM NAME=quality VALUE=high>');
	document.write('<PARAM NAME=bgcolor VALUE=#FFFFFF>');
	document.write('<PARAM NAME="scale" value="noscale">');
	document.write('<EMBED src="http://cdn.tagfriends.com/swf/tag09110502.swf?owner=001000056414&url=' + docURL + '&userhost=' + userHost + '" quality=high bgcolor=#FFFFFF swLiveConnect="true" scale="noscale" WIDTH="168" HEIGHT="126" NAME="tagfriendsobj20100402153602095" ALIGN="" allowScriptAccess="always" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>');
	document.write('</OBJECT>');	
	// HEAD
	if(argwidth == 168 && argowner != 111000000013){
		document.write('<BR>');
		document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="168" HEIGHT="14" ALIGN="">');
		document.write('<PARAM NAME="allowScriptAccess" value="always" />');
		document.write('<PARAM NAME=movie VALUE="http://cdn.tagfriends.com/swf/'+headPath+'">');
		document.write('<PARAM NAME=quality VALUE=high>');
		document.write('<PARAM NAME=bgcolor VALUE=#FFFFFF>');
		document.write('<PARAM NAME=wmode VALUE=transparent>');
		document.write('<EMBED src="http://cdn.tagfriends.com/swf/'+headPath+'" quality=high bgcolor=#FFFFFF wmode=transparent WIDTH="168" HEIGHT="14" ALIGN="" allowScriptAccess="always" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>');
		document.write('</OBJECT>');
	}



	// SEARCH
	document.write('<BR>');
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="168" HEIGHT="50" ALIGN="">');
	document.write('<PARAM NAME="allowScriptAccess" value="always" />');
	document.write('<PARAM NAME=movie VALUE="http://cdn.tagfriends.com/swf/tool/under_searchspace.swf?host='+userHost+'">');
	document.write('<PARAM NAME=quality VALUE=high>');
	document.write('<PARAM NAME=bgcolor VALUE=#FFFFFF>');
	document.write('<PARAM NAME=wmode VALUE=transparent>');
	document.write('<EMBED src="http://cdn.tagfriends.com/swf/tool/under_searchspace.swf?host='+userHost+'" quality=high bgcolor=#FFFFFF wmode=transparent WIDTH="168" HEIGHT="50" ALIGN="" allowScriptAccess="always" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>');
	document.write('</OBJECT>');


	// CM
	document.write('<BR>');
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="168" HEIGHT="98" ALIGN="">');
	document.write('<PARAM NAME="allowScriptAccess" value="always" />');
	document.write('<PARAM NAME=movie VALUE="http://ad.tagfriends.com/swf/tool/under_infospace.swf?owner=001000056414&url=' + docURL + '">');
	document.write('<PARAM NAME=quality VALUE=high>');
	document.write('<PARAM NAME=bgcolor VALUE=#FFFFFF>');
	document.write('<PARAM NAME=wmode VALUE=transparent>');
	document.write('<EMBED src="http://ad.tagfriends.com/swf/tool/under_infospace.swf?owner=001000056414&url=' + docURL + '" quality=high bgcolor=#FFFFFF wmode=transparent WIDTH="168" HEIGHT="98" ALIGN="" allowScriptAccess="always" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>');
	document.write('</OBJECT>');

}else{
	document.write('<div id="tagfriendsdiv20100402153602095" style="width:168px; height:126px; z-index:1">');
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="100%" height="100%" id="tagfriends" align="">');
	document.write('<PARAM NAME="allowScriptAccess" value="always" />');
	document.write('<PARAM NAME=movie VALUE="http://cdn.tagfriends.com/swf/tag09110502.swf?owner=001000056414&url=' + docURL + '&userhost=' + userHost + '"/>');
	document.write('<PARAM NAME="quality" value="high" />');
	document.write('<PARAM NAME="scale" value="noscale" />');
	document.write('<PARAM NAME=bgcolor VALUE=#FFFFFF/>');
	document.write('<EMBED src="http://cdn.tagfriends.com/swf/tag09110502.swf?owner=001000056414&url=' + docURL + '&userhost=' + userHost + '" quality="high" swLiveConnect="true" bgcolor=#FFFFFF scale="noscale" width="100%" height="100%" name="tagfriends" align="" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
	document.write('</OBJECT>');
	document.write('</div>');
	// HEAD
	if(argwidth == 168 && argowner != 111000000013){
		document.write('<div style="width:168px; height:14px">');
		document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="168" HEIGHT="14" ALIGN="">');
		document.write('<PARAM NAME="allowScriptAccess" value="always" />');
		document.write('<PARAM NAME=movie VALUE="http://cdn.tagfriends.com/swf/'+headPath+'">');
		document.write('<PARAM NAME=quality VALUE=high>');
		document.write('<PARAM NAME=bgcolor VALUE=#FFFFFF>');
		document.write('<PARAM NAME=wmode VALUE=transparent>');
		document.write('<EMBED src="http://cdn.tagfriends.com/swf/'+headPath+'" quality=high bgcolor=#FFFFFF wmode=transparent WIDTH="168" HEIGHT="14" ALIGN="" allowScriptAccess="always" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>');
		document.write('</OBJECT>');
		document.write('</div>');
	}



	// SEARCH
	document.write('<div style="width:168px; height:50px">');
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="168" HEIGHT="50" ALIGN="">');
	document.write('<PARAM NAME="allowScriptAccess" value="always" />');
	document.write('<PARAM NAME=movie VALUE="http://cdn.tagfriends.com/swf/tool/under_searchspace.swf?host='+userHost+'">');
	document.write('<PARAM NAME=quality VALUE=high>');
	document.write('<PARAM NAME=bgcolor VALUE=#FFFFFF>');
	document.write('<PARAM NAME=wmode VALUE=transparent>');
	document.write('<EMBED src="http://cdn.tagfriends.com/swf/tool/under_searchspace.swf?host='+userHost+'" quality=high bgcolor=#FFFFFF wmode=transparent WIDTH="168" HEIGHT="50" ALIGN="" allowScriptAccess="always" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>');
	document.write('</OBJECT>');
	document.write('</div>');


	// CM
	document.write('<div style="width:168px; height:98px">');
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="168" HEIGHT="98" ALIGN="">');
	document.write('<PARAM NAME="allowScriptAccess" value="always" />');
	document.write('<PARAM NAME=movie VALUE="http://ad.tagfriends.com/swf/tool/under_infospace.swf?owner=001000056414&url=' + docURL + '">');
	document.write('<PARAM NAME=quality VALUE=high>');
	document.write('<PARAM NAME=bgcolor VALUE=#FFFFFF>');
	document.write('<PARAM NAME=wmode VALUE=transparent>');
	document.write('<EMBED src="http://ad.tagfriends.com/swf/tool/under_infospace.swf?owner=001000056414&url=' + docURL + '" quality=high bgcolor=#FFFFFF wmode=transparent WIDTH="168" HEIGHT="98" ALIGN="" allowScriptAccess="always" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>');
	document.write('</OBJECT>');
	document.write('</div>');

}
document.write('</div>');



var flag = "off";
function tagfriendsLayerOpen(path){
	if(flag == "off"){
		tagfriends_setEffect(path)
		flag = "on";
	}
}
function tagfriendsLayerClose(){
	if(flag == "on"){
		objBody.removeChild(tagfrends_Layer);
		flag = "off";
	}
}

var tagfrends_Layer;
var objBody;
function tagfriends_setEffect(path){
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	tagfrends_Layer = document.createElement('div');
	tagfrends_Layer.id = "tagfriends_effect";
	tagfrends_Layer.style.position = "absolute";
	tagfrends_Layer.style.top = scrollTop+"px";
	tagfrends_Layer.style.left = "0px";
	tagfrends_Layer.style.width = "100%";
	tagfrends_Layer.style.height = "100%";
	tagfrends_Layer.style.zIndex = "100";
	tagfrends_Layer.innerHTML = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="100%" HEIGHT="100%" id="tagfriends_effect" ALIGN=""><PARAM NAME=movie VALUE="http://cdn.tagfriends.com/swf/'+path+'"><PARAM NAME="allowScriptAccess" value="always"><PARAM NAME=quality VALUE=high><PARAM NAME=wmode VALUE=transparent><PARAM NAME="scale" value="noscale"><EMBED src="http://cdn.tagfriends.com/swf/'+path+'" quality=high wmode=transparent scale="noscale" WIDTH="100%" HEIGHT="100%" NAME="tagfriends_effect" ALIGN="" allowScriptAccess="always" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>';
	objBody = document.getElementsByTagName("body").item(0);
	objBody.appendChild(tagfrends_Layer);
}


function tagfriendsHappyLayerOpen(path,time){
	if(flag == "off"){
		tagfriends_HappySetEffect(path,time)
		flag = "on";
	}
}
function tagfriends_HappySetEffect(path,time){
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	tagfrends_Layer = document.createElement('div');
	tagfrends_Layer.id = "tagfriends_effect";
	tagfrends_Layer.style.position = "absolute";
	tagfrends_Layer.style.top = scrollTop+"px";
	tagfrends_Layer.style.left = "0px";
	tagfrends_Layer.style.width = "100%";
	tagfrends_Layer.style.height = "100%";
	tagfrends_Layer.style.zIndex = "100";
	tagfrends_Layer.innerHTML = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH="100%" HEIGHT="100%" id="tagfriends_effect" ALIGN=""><PARAM NAME=movie VALUE="http://cdn.tagfriends.com/swf/'+path+'?happyNowTime='+time+'"><PARAM NAME="allowScriptAccess" value="always"><PARAM NAME=quality VALUE=high><PARAM NAME=wmode VALUE=transparent><PARAM NAME="scale" value="noscale"><EMBED src="http://cdn.tagfriends.com/swf/'+path+'?happyNowTime='+time+'" quality=high wmode=transparent scale="noscale" WIDTH="100%" HEIGHT="100%" NAME="tagfriends_effect" ALIGN="" allowScriptAccess="always" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>';
	objBody = document.getElementsByTagName("body").item(0);
	objBody.appendChild(tagfrends_Layer);
}


