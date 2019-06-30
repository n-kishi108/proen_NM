
function drawFlashTag(arg, suffix){
   var os = getOSType();
   var browser = getBrowserName();

   if(os == "MacOS"){
	switch(browser){
	 case "Explorer":var tag = "embed";break;
	 case "Safari":var tag = "object";break;
	 case "Opera":var tag = "object";break;
	 default:var tag = "both";break;
    	}
   }else{
	switch(browser){
	 case "Safari":var tag = "object";break;
	 case "Opera":var tag = "object";break;
	 default:var tag = "both";break;
    	}
   }
  doDrawFlashTag(tag, arg, suffix);
}

function doDrawFlashTag(tag, arg, suffix){
    var str = "";
	if(suffix == ""){
		var w = 360;
		var h = 30;
	}else{
		var w = 210;
		var h = 40;
	}

    if(tag != "embed"){
     str = str + "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0\" width=\""+ w + "\" height=\"" + h + "\" id=\"soundplayer" + suffix + "\" align=\"middle\">\n";
     str = str + "<param name=\"allowScriptAccess\" value=\"sameDomain\" />\n";
     str = str + "<param name=\"movie\" value=\"soundplayer" + suffix + ".swf?spath=" + arg + "\" /><br>";
     str = str + "<param name=\"quality\" value=\"high\" />\n";
     str = str + "<param name=\"bgcolor\" value=\"#ffffff\" />\n";
     if (tag=="both"){str = str + "<embed src=\"soundplayer" + suffix + ".swf?spath=" + arg + "\" quality=\"high\" bgcolor=\"#ffffff\" width=\"" + w + "\" height=\"" + h + "\" name=\"soundplayer" + suffix + "\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />\n"};
     str = str + "</object>\n";
    }else{
     str = str + "<embed src=\"soundplayer" + suffix + ".swf?spath=" + arg + "\" quality=\"high\" bgcolor=\"#ffffff\" width=\"" + w + "\" height=\"" + h + "\" name=\"soundplayer" + suffix + "\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />\n";
    }
  window.document.write(str);
}


//　Macintosh           　->  MacOS
//　Windows95/98/NT/2000/XP  ->　Windows
//　UNIX                  ->　UNIX
function getOSType()
{
    var uAgent  = navigator.userAgent.toUpperCase();
    if (uAgent.indexOf("MAC") >= 0) return "MacOS";
    if (uAgent.indexOf("WIN") >= 0) return "Windows";
    if (uAgent.indexOf("X11") >= 0) return "UNIX";
    return "";
}
//　Firefox ->  Firefox
//　Netscape Navigator ->  Netscape
//　Internet Explorer  ->　Explorer
//　Safari  ->　Safari
//　Opera  ->　Opera
function getBrowserName()
{
    var aName  = navigator.appName.toUpperCase();
    var uName = navigator.userAgent.toUpperCase();
    if (uName.indexOf("SAFARI") >= 0)  return "Safari";
    if (uName.indexOf("OPERA") >= 0)  return "Opera";
    if (uName.indexOf("FIREFOX") >= 0)  return "Firefox";
    if (aName.indexOf("NETSCAPE") >= 0)  return "Netscape";
    if (aName.indexOf("MICROSOFT") >= 0) return "Explorer";
    return "";
}
function getBrowserVersion()
{
	var browser = getBrowserName();
	var version = 0;
	var s = 0;
	var e = 0;
	var appVer  = navigator.appVersion;
	var uName  = navigator.userAgent.toUpperCase();
	if (browser == "Safari")
	{
		s = uName.indexOf("SAFARI/",0);
		version = (uName.substring(s+7,s+99));
		if (version < 400) version = 1;
		if (version >= 400) version = 2;
	}
	if (browser == "Opera")
	{
		s = uName.indexOf("OPERA",0) + 6;
		e = uName.indexOf(" ",s);
		version = parseFloat(uName.substring(s,e));
	}
	if (browser == "Firefox")
	{
		s = uName.indexOf("FIREFOX/",0);
		version = parseFloat(uName.substring(s+8,s+8+3));
	}
	if (browser == "Netscape")
	{
		s = appVer.indexOf(" ",0);
		version = eval(appVer.substring(0,s));
		if (version >= 5) version++;
	}
	if (browser == "Explorer")
	{
		appVer  = navigator.userAgent;
		s = appVer.indexOf("MSIE ",0) + 5;
		e = appVer.indexOf(";",s);
		version = eval(appVer.substring(s,e));
	}
	return version;
}

function setTrackbackMessage () {
    if ((typeof(blogConfig) != 'undefined') && blogConfig &&
        (blogConfig["moderate_feedback_trackbacks"] != "1")) {
        return;
    }
    var e;
    var elems = document.getElementsByTagName( "*" );
    for (var i = 0; i < elems.length; i++) {
        var cName = elems[i].getAttribute("className") || elems[i].getAttribute("class");
        if (cName && cName.match("^trackback-url")) {
            e = elems[i];
            break;
        }
        else if (cName && cName.match("^trackbacks-info")) {
            e = elems[i].getElementsByTagName( "p" )[0];
            break;
        }
    }
    if (!e) return;
    var msg = document.createElement( "p" );
    msg.appendChild(document.createTextNode( "（トラックバックは記事投稿者が公開するまで表示されません。）" ));
    e.appendChild(msg);
}

if (window.addEventListener) 
    window.addEventListener('load', setTrackbackMessage, false);
else if (window.attachEvent)
    window.attachEvent('onload', setTrackbackMessage);

function replace_mynifty_link()
{
    if (!document.getElementById){
        return;
    }
    var element = document.getElementById('nifty_rss_reader');
    if (!element){
        setTimeout("replace_mynifty_link();", 100);
        return;
    }
    var anchors = element.getElementsByTagName('a')
    if (anchors.length == 0){
        return;
    }
    var url = "javascript:void(window.open('https://my.nifty.com/my/weblogclip_qlink_popup?cmd=add&adr='+encodeURI(location.href),'my_blogclip','scrollbars=yes,resizable=yes,width=810,height=550'))";
    anchors[0].setAttribute('href', url);
}

replace_mynifty_link();

// loading config
if (typeof blogConfig == 'undefined') {
    var links = document.getElementsByTagName('link');
    for (var i = 0; i < links.length; i++) {
        if ((links[i].getAttribute('rel') == 'alternate') &&
            (links[i].getAttribute('type') == 'application/atom+xml')) {
            var blogURL = links[i].getAttribute('href').replace(/atom.xml$/, '');
            document.write('<script type="text/javascript" src="' + blogURL + '/.config.js"></script>');
            break;
        }
    }
}

/* Loading maintenace mode settings */
if (typeof(serviceStatus) == 'undefined') {
    document.write('<script type="text/javascript" src="/.shared-pleasy/js/service_status.js"></script>');
    document.write('<script type="text/javascript" src="/.shared-pleasy/js/maintenance.js"></script>');
}

/* Loading BTM script */
document.write('<script src="/.nifty-loadmod/pleasy/js/jizai.js" type="text/javascript" charset="utf-8" language="Javascript"></script>');
