<!-- Begin to hide script contents from old browsers.
var appVersionLower = navigator.appVersion.toLowerCase();
var iePos = appVersionLower.indexOf('msie');
if( iePos != -1 ) {
    versionMinor = parseFloat( appVersionLower.substring(iePos+5, appVersionLower.indexOf(';',iePos)) );
    versionMajor = parseInt( versionMinor );
} else {
	versionMajor = parseInt( navigator.appVersion );
	versionMinor = parseFloat( navigator.appVersion );
}

/*@cc_on _d=document;eval('var document=_d')@*/

var NS   = (navigator.appName == "Netscape") ? (true) : (false);
var NS4  = (NS && (versionMajor >= 4)) ? (true) : (false);
var IE   = (navigator.appName == "Microsoft Internet Explorer") ? (true) : (false);
var IE4  = (IE && (versionMajor >= 4)) ? (true) : (false);
var IE5  = (document.all && document.getElementById) ? true : false;
var IE55 = (IE && versionMinor >= 5.5);
var MAC  = navigator.appVersion.indexOf("Macintosh") != -1;
var Safari = navigator.userAgent.indexOf('Safari') >= 0;
var FF3 = navigator.userAgent.indexOf('Firefox/3.0') >= 0;

function ap_getwinparam( winw, winh, adjust, resizable, scrollable, status ) 
{
    var left, top;
    switch( adjust ) {
	case 1: //top left aligned
		left = top = 0;
		break;
	case 2: //top right aligned
		left = window.screen.availWidth - winw;
		top = 0;
		break;
	case 3: //centered
		left = (window.screen.availWidth - winw) / 2;
		top = (window.screen.availHeight - winh) / 2;
		break;
	case 4: //bottom left aligned
		left = 0;
		top = window.screen.availHeight - winh;
		break;
	case 5: //bottom right aligned
		left = window.screen.availWidth - winw - 8;
		top = window.screen.availHeight - winh;
		break;
    }
    var option = "";
    if( adjust > 0 ) option = "left=" + left + ",top=" + top;
    option = option + ",width=" + winw + ",height=" + winh;
    if( (!resizable) || (resizable == false) ) 
        option += ",resizable=no";
    else 
        option += ",resizable=yes";
    if( (!scrollable) || (scrollable == false) ) 
        option += ",scrollbars=no";
    else
        option += ",scrollbars=yes";
    if( (!status) || (status == false) ) 
        option += ",status=no";
    else
        option += ",status=yes";
    param = "toolbar=no," + option + ",directories=no,menubar=no";
    return( param );
}

function ap_openwin( winurl, winnm, winw, winh, adjust, resizable, scrollable, status ) 
{
	var param = ap_getwinparam( winw, winh, adjust, resizable, scrollable, status );
    newwin = window.open( winurl, winnm, param );
    return( newwin );
}

function ap_strlen( thisvalue, specialset ) 
{
    var byte1count = 0, byte2count = 0;
    for( var i = 0; i < thisvalue.length; i++ ) {
        thischar = thisvalue.charAt( i );
        if( ((thischar >= '0') && (thischar <= '9')) ||
            ((thischar >= 'A') && (thischar <= 'Z')) ||
            ((thischar >= 'a') && (thischar <= 'z')) ||
            ((thischar == '-') || (thischar == '_')) )
            byte1count++;
        else if( thischar == '(' || thischar == ')' ) {
        	byte1count++;
        }
        else if( specialset != null && specialset.indexOf(thischar) != -1 )
            byte1count++;
        else
            byte2count++;
    }
    return( byte1count + byte2count * 2 );
}

function ap_validmp3file( ctrl, minimum, maximum ) 
{
	var exactcount = 0;
	var specialswithspace = "`!@#$%^&*+|=[];\'\",<>?/|";
	if( (minimum > -1) && (static_isnothing(ctrl)) ) {
        alert( "入力必須項目が空白です。");
		return( false );
	}		
	if ( !static_isnothing(ctrl)) 
	{
		var pathvalue = ctrl.value;

		var fileidx = -1;

		if(MAC==true && NS == true)	
			var fileidx = pathvalue.indexOf(":");
		else
			var fileidx = pathvalue.lastIndexOf("\\");

		if ( fileidx < 0 ) 
			var fileidx = pathvalue.lastIndexOf("/");

		var thisvalue = pathvalue.substring(fileidx + 1);
		for( var i = 0; i < thisvalue.length; i++ ) {
			thischar = thisvalue.charAt( i );
			if( specialswithspace.indexOf(thischar) != -1 ) {
				alert( "ファイル名に特殊文字が含まれています。\n`!@#$%^&*+|=[];\'\",<>?/| 文字は使用できません。\n" );
				ctrl.focus();
				return( false ); 
			}
		}
		exactcount = ap_strlen( ctrl.value, specialswithspace );
		if( (minimum > -1) && (exactcount < minimum) ) {
	        alert( "ファイルアドレスの長さは最小 " + minimum + "文字以上にしてください。 現在 (" + exactcount + ")文字です。" );
			ctrl.focus();
			return( false );
		}
		if( (maximum > -1) && (exactcount > maximum) ) {
	        alert( "ファイルアドレスの長さは最大 " + maximum + "文字以下にしてください。現在 (" + exactcount + ")文字です。" );
			ctrl.focus();
			return( false );
		}

	    var extidx = pathvalue.lastIndexOf(".");
		if(MAC == true && NS == true)
		{
			var ext = pathvalue.substring(extidx+1);
		}
		else
		    var ext = pathvalue.substring(extidx+1).toLowerCase();
	
	    if( ext.toLowerCase() != "mp3")  {
	        alert("mp3形式のみアップロードできます。");
	        return ( false );
	    }

	}
	return( true );
}

function ap_validfile( ctrl, minimum, maximum ) 
{
	var exactcount = 0;
	var specialswithspace = "`!@#$%^&*+|=[];\'\",<>?/|";
	if( (minimum > -1) && (static_isnothing(ctrl)) ) {
        alert( "入力必須項目が空白です。");
		return( false );
	}		
	if ( !static_isnothing(ctrl)) {
		var pathvalue = ctrl.value;

		var fileidx = -1;

		if(MAC==true && NS == true)	
			var fileidx = pathvalue.indexOf(":");
		else
			var fileidx = pathvalue.lastIndexOf("\\");

		if ( fileidx < 0 ) 
			var fileidx = pathvalue.lastIndexOf("/");

		var thisvalue = pathvalue.substring(fileidx + 1);
		
		for( var i = 0; i < thisvalue.length; i++ ) {
			thischar = thisvalue.charAt( i );
			if( specialswithspace.indexOf(thischar) != -1 ) {
				alert( "ファイル名に特殊文字が含まれています。\n`!@#$%^&*+|=[];\'\",<>?/| 文字は使用できません。\n" );
				ctrl.focus();
				return( false ); 
			}
		}
		exactcount = ap_strlen( ctrl.value, specialswithspace );
		if( (minimum > -1) && (exactcount < minimum) ) {
	        alert( "ファイルアドレスの長さは最小 " + minimum + "文字以上にしてください。 現在 (" + exactcount + ")文字です。" );
			ctrl.focus();
			return( false );
		}
		if( (maximum > -1) && (exactcount > maximum) ) {
	        alert( "ファイルアドレスの長さは最大 " + maximum + "文字以下にしてください。現在 (" + exactcount + ")文字です。" );
			ctrl.focus();
			return( false );
		}

	    var extidx = pathvalue.lastIndexOf(".");
		if(MAC == true && NS == true)
		{
			var ext = pathvalue.substring(extidx+1);
		}
		else
		    var ext = pathvalue.substring(extidx+1).toLowerCase();
	
	    if((ext.toLowerCase() != "jpg") && (ext.toLowerCase() != "jpe") && (ext.toLowerCase() != "jpeg") && (ext.toLowerCase() != "gif") && (ext.toLowerCase() != "png")) {
	        alert("jpgとgif形式のイメージだけアップロードできます。");
	        return ( false );
	    }
	}
	return( true );
}

function static_isnothing( ctrl ) 
{
	if ( typeof(ctrl) == null || typeof(ctrl) == "undefined")
		return ( true );
		
    var thisvalue = ctrl.value;
    if( thisvalue.length == 0 ) {
        return( true ); 
    }
    spacecount = 0;
    for( var i = 0; i < thisvalue.length; i++ ) {
        thischar = thisvalue.charAt( i );
        if( thischar == ' ' ) spacecount++;
    }
    if( spacecount == thisvalue.length ) {
	    return( true ); 
	}
	return( false );
}


function ap_copyright() 
{
	var url = document.location.href;
	url = url.replace(/http\:\/\//gi,"");
	var host = url.substring(0,url.indexOf("."));
	if (url.indexOf("/") >= 0) 
	{
		var path = url.substring(url.indexOf("/")+1,url.length);

		if ( path.indexOf(".asp") >= 0 )
			path = path.substring(0,path.indexOf(".asp")+4);
		else if( path.lastIndexOf("/") >= 0 )
			path = path.substring(0,path.lastIndexOf("/"));
		else
			path = path;
	}
	else
		var path = "";

	var adurl = "/exblog/" + host + "/" + path; adurl = adurl.replace(/\//gi,"%2F");

	var out = "";
	out += ("<DIV STYLE=\"BORDER-TOP:1PX SOLID #555;MARGIN-TOP:20;PADDING-BOTTOM:10;WIDTH:750PX;\"></DIV>");
	out += ("<FONT size=-2 color=#666666>Copyright &copy; 1997-2005 Excite Japan Co., Ltd. All Rights Reserved.</FONT><BR>");
	out += ("<font size=-1>");
	out += ("<a href=http://www.excite.co.jp/help/info?hp=5 target=_top>免責事項</a> - ");
	out += ("<a href=http://www.excite.co.jp/exblog/faq/ target=_top>ヘルプ</a> - ");
	out += ("<a href=http://www.excite.co.jp/relocate/co=jp/xhm/universal_footer;http://www.excite.co.jp/help/link?hp=3 target=_top>エキサイトをスタートページに</a> | ");
	out += ("<a href=http://bb.excite.co.jp/ target=_top>BB.excite</a> | <a href=http://woman.excite.co.jp/ target=_top>Woman.excite</a> | ");
	out += ("<a href=http://www.excite.co.jp/ target=_top>エキサイト ホーム</a>");
	out += ("</font>");
	out += ("<DIV STYLE=\"MARGIN-BOTTOM:30;\"></DIV>");
	out += ("<IMG SRC=\"http://logping.exblog.jp/3rd/ping_exblog.dcg?SN=xbg&SP=" + adurl + "&SLC=jp&rnd=" + Math.random( ) + "\" WIDTH=1 HEIGHT=1 BORDER=0>");
	out += ("<iframe width=1 height=1 marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no src=\"http://www.excite.co.jp/exblog/1pt/\"></iframe>");
    document.writeln( out );
}

function ap_head(uid,nid,rtnurl) 
{
	var out = "";
	out += ("<TABLE WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING=0>");
	out += ("<TR BGCOLOR=#000000>");
	out += ("	<TD WIDTH=12 VALIGN=TOP><IMG SRC=http://md.exblog.jp/img/hm/corner12.gif WIDTH=12 HEIGHT=12 BORDER=0></TD>");
	out += ("	<TD WIDTH=120><A HREF=http://www.excite.co.jp/><IMG SRC=http://md.exblog.jp/img/hm/logo_excite.gif WIDTH=120 HEIGHT=50 BORDER=0 ALT=logo_excite></A></TD>");
	out += ("	<TD WIDTH=200><A HREF=http://blog.excite.co.jp/><IMG SRC=http://md.exblog.jp/img/hm/logo_blog.jpg WIDTH=200 HEIGHT=50 BORDER=0 ALT=exblog></A></TD>");
	out += ("	<TD WIDTH=99% ALIGN=RIGHT></TD></TR>");
	out += ("</TABLE>");
	out += ("<TABLE WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING=0>");
	out += ("<TR HEIGHT=20 BGCOLOR=#EEEEEE>");
	out += ("	<TD WIDTH=12></TD>");
	out += ("	<TD ALIGN=LEFT>無料で作れるお手軽ウェブログツールです。</FONT></TD>");
	out += ("	<TD ALIGN=RIGHT>");
	out += ("		<A HREF=http://www.excite.co.jp/><B>ホーム</B></A> |");
	out += ("		<A HREF=http://blog.excite.co.jp/><B>ブログトップ</B></A> |");
	out += ("		<A HREF=http://www.excite.co.jp/sitemap/><B>サイトマップ</B></A>");
	out += ("		&nbsp;&nbsp;");
	out += ("		</TD></TR>");
	out += ("<TR><TD COLSPAN=3 HEIGHT=20></TD></TR>");
	out += ("</TABLE>");
    document.writeln( out );
}

function getFormValue( formName )
{
	if( typeof formName == 'string' ) 
	{
		return formName;
	}else{
		return formName.value;
	}
}
	
function isNothing( formName ) {

	var thisvalue = getFormValue( formName );

    if( thisvalue.length == 0 ) {
        alert( "この内容には必ず入力してください。");
        if( typeof (formName.focus ) != 'undefined' ){	
        	// IE:Object   Mozila:function  ....
			formName.focus();
		}
       return( true ); 
    }
    spacecount = 0;
    for( var i = 0; i < thisvalue.length; i++ ) {
        thischar = thisvalue.charAt( i );
        if( thischar == ' ' ) spacecount++;
    }
    if( spacecount == thisvalue.length ) {
	    alert( "この内容には必ず入力してください。");
	    if( typeof( formName.forcus ) != 'undefined' ){
			formName.focus();
		}
	    return( true ); 
	}
	return( false );
}

function isNumeric( formName ) {
    var charDetected = 0, markDetected = 0, dotCount = 0;
    var numeric = formName.value;
    if( numeric == null || numeric == "" || numeric.length == 0 ) {
        return( false );
    }
    for( var i = 0; i < numeric.length; i++ ) {
      thischar = numeric.charAt( i );
      if( !((thischar >= '0') && (thischar <= '9')) ) {
        return( false );
        }
    } //end of for
    return( true );
}

function isValidNumeric( formName, minimum, maximum ) {
    var numeric = formName.value;
    if( isNumeric( formName ) == false ) {
        alert( "この内容には必ず数値を入力してください。" );
        return( false );
    }
    var quantity = parseInt( numeric, 10 );
    if( minimum == -1 || maximum == -1 ) //range not defined
        return( true );
    if( (quantity < minimum) || (quantity > maximum) ) {
        alert( "この値は最小 (" + minimum + ") から最大 (" + maximum + ") まで可能です。もう一度入力してください。");
        return( false );
    }
    return( true );
}

function getExactCount( formName ) {
    var thisvalue = getFormValue( formName );
    var byte1count = 0, byte2count = 0;
    var specialset = " `~!@#$%^&*()_+|\\=-[]{};':\",./<>?";
    for( var i = 0; i < thisvalue.length; i++ ) {
        thischar = thisvalue.charAt( i );
        if( ((thischar >= '0') && (thischar <= '9')) ||
            ((thischar >= 'A') && (thischar <= 'Z')) ||
            ((thischar >= 'a') && (thischar <= 'z')) ||
            ((thischar == '-') || (thischar == '_')) )
            byte1count++;
        else if( thischar == '(' || thischar == ')' ) {
        	byte1count++;
        	//byte1count++;
        }
        else if( specialset.indexOf(thischar) != -1 )
            byte1count++;
        else
            byte2count++;
    }
    return( byte1count + byte2count * 2 );
}

function chkEscapeChar(str) {
	var escape_char = new Array();
	escape_char = ['`', ' ', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '=', '+', '|', '\\', '}', ']', '{', '[', '\'', ':', ';', '?', '/', '>', '<', '.', ',', '-', '"', '	'];

	var error_code = 0;
	var i;
	
	for(i=0 ; i < escape_char.length ; i++){
		ret = str.indexOf(escape_char[i]);
		if( ret >= 0 ) error_code +=1;
	}

	return(error_code);
}

function validUserid(home){

    if (home.search(/^\d/) != -1 || home.search(/[_\W]/) != -1 )  return(false);
    else return(true);
}

function ap_jsview(str){
	str = str.replace(/\'/g,"\\'");
	return str;
}

function isValidID( formName, minimum, maximum ) {
    var thisvalue = formName.value;
    if( thisvalue.length == 0 ) {
        alert( "この内容には必ず入力してください。" );
        formName.focus();
        return( false ); 
    }
    var exactcount = 0;
    var specialset = " `~!@#$%^&*()_+|\\=-[]{};':\",./<>?";
    for( var i = 0; i < thisvalue.length; i++ ) {
        thischar = thisvalue.charAt( i );
        if( specialset.indexOf(thischar) != -1 ) {
	        alert( "この内容には特殊文字は使用できません。" );
	        formName.focus();
	        return( false ); 
            }
    }
    exactcount = getExactCount( formName );
    if( minimum == -1 || maximum == -1 ) //range not defined
        return( true );
    if( (exactcount < minimum) || (exactcount > maximum) ) {
        alert( "最小(" + minimum + ") から最大(" + maximum + ") 文字以内で入力してください。 日本語または特殊文字は1つあたり2文字と認識されます。" );
        return( false );
    }
    return( true );
}

function isValidBlob( formName, maxlength ) { 
	var exactcount = getExactCount( formName );
    if( exactcount > maxlength ) { 
        alert( "内容が多すぎますので " + (exactcount-maxlength) + "文字以上を減らした後、もう一度行ってください。." );
	    if( typeof( formName.forcus ) != 'undefined' ){
			formName.focus();
		}
        return( false ); 
    } else {
        return( true ); 
    }
}

function isValidBlob1( formName, maxlength ) { 
	var exactcount = getExactCount( formName );
    if( exactcount > maxlength ) { 
        alert( "内容は 10,000字以内でお願いします。" );
        formName.focus();
        return( false ); 
    } else {
        return( true ); 
    }
}

function ap_mkahref(url, value)
{
	var rtnstr = "";
	rtnstr = "<A HREF=" + url + ">" + value + "</A>";
	return rtnstr;
}

function ap_mkdivID(name, align, value)
{
	var rtnstr;
	if (align != "") 
		align = " ALIGN=" + align;
	rtnstr = "<DIV ID=" + name + align + ">" + value + "</DIV>";
	return ( rtnstr );
}

function ap_mkdiv(name, align, value)
{
	var rtnstr;
	if (align != "") 
		align = " ALIGN=" + align;
	rtnstr = "<DIV CLASS=" + name + align + ">" + value + "</DIV>";
	return ( rtnstr );
}

function ap_getwinw( winobj ) 
{
	var w;
    if( NS ) {
    	w = winobj.innerWidth;
    } else {
    	w = winobj.document.body.clientWidth;
    	if( winobj != self )
    	    w += 12; 
    }
    return( w );
}

function ap_getwinh( winobj ) 
{
	var h;
    if( NS ) { 
    	h = winobj.innerHeight;
    } else {
    	h = winobj.document.body.clientHeight;
    	if( winobj != self )
    	    h += (23 + 8);
    }
    return( h );
}

function ap_adjustwinh( basewin, adjusttagnm, preferredh, resizable, scrollable, status, plusy ) 
{
    basewin.focus();
    if( !IE4 ) 
        return;
    if( !eval("document.images." + adjusttagnm) ) 
        return;
    w = ap_getwinw( basewin );
    h = ap_getwinh( basewin );
    y = eval( "document.images." + adjusttagnm + ".offsetTop" );
    if( h == y ) 
        return;
    neww = w + 10;
    if( resizable == true ) neww += (16+2);
    if( scrollable == true ) neww += (16);
    if( status == true ) neww += 0;
    newh = y + plusy;
    if( resizable == true ) newh += 2;
    if( scrollable == true ) newh += 0;
    if( status == true ) newh += 0;
    if( newh >= window.screen.availHeight )
        newh = Math.min( newh, h );
    if( preferredh > 0 ) newh = Math.min( preferredh, newh );
    self.window.resizeTo( neww, newh );
}



/*
	クライアント側での禁止タグチェック
*/
function chkscript( formName ) { 
	var thisvalue = " " + getFormValue( formName );
	/*
	 HTML特殊文字 &#200～&#255  &#00～&#199
	*/
	var psary = thisvalue.match(/&#2[0-5][0-5];|&#1?\d\d;/gi);
	if ( psary != null )
	{
		var pstmp = "";
		for(var i = 0; i < psary.length ; i++ ){
			pstmp = psary[i].replace(/&#/gi,"");
			pstmp = pstmp.replace(/\;/gi,"");
			eval("thisvalue = thisvalue.replace(/" + psary[i] + "/gi,\"" + String.fromCharCode(parseInt(pstmp)) + "\")");
		}
	}
	/*
	コメント表記 <!-- -->
	*/
	var psscp = thisvalue.match(/<\!\-\-.*\-\->/gi);
	if ( psscp != null )
	{
		for(var i = 0; i < psscp.length ; i++ ){
			alert(psscp[i] + "はセキュリティー上使用できません。");
			//formName.focus();
			return true;
		}
	}
	/*
	javascript :
	.cookie
	.domain
	.location
	document.
	alert (hogehoge)
	escape (hogehoge)
	oepn (hogehoge)
	fromCharCode (hogehoge)
	*/
//	var psscp = thisvalue.match(/(javascript *:|\.cookie|\.domain|\.location|document\.|alert *\(.*\)|escape *\(.*\)|: *expression|open *\(.*\)|eval *\(.*\)|fromCharCode *\(.*\))/gi);
	var psscp = thisvalue.match(/(javascript *:|\.cookie|\.domain|\.location|document\.|alert *\(.*\)|escape *\(.*\)|open *\(.*\)|eval *\(.*\)|fromCharCode *\(.*\))/gi);
	if ( psscp != null )
	{
		for(var i = 0; i < psscp.length ; i++ ){
			alert(psscp[i] + "はセキュリティー上使用できません。");
			//formName.focus();
			return true;
		}
	}
	/*
	javascript event
	*/
	var psscp = thisvalue.match(/(onabort|onafterupdate|onbeforeupdate|onblur|onclick|ondataavailable|ondatasetchanged|ondatasetcomplete|ondblclick|ondragstart|onerror|onfilterchange|onfocus|onhelp|onkeydown|onkeypress|onkeyup|onload|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onresize|onrowenter|onrowexit|onscroll|onselectstart|oncontextmenu) *\=/gi);
	if ( psscp != null )
	{
		for(var i = 0; i < psscp.length ; i++ ){
			alert(psscp[i] + "はセキュリティー上使用できません。");
			//formName.focus();
			return true;
		}
	}
	/*
	HTML タグ
	*/
	var thisvalueexception = thisvalue.replace(/<object width="[0-9]+" height="[0-9]+"><param name="movie" value="http:\/\/www\.youtube(\-nocookie|)\.com\/v\/[0-9a-zA-Z\-_&=]+"><\/param>(<param name="wmode" value="transparent"><\/param>|)<param name="allowFullScreen" value="true"><\/param>(<param name="allowscriptaccess" value="always"><\/param>|)<embed src="http:\/\/www.youtube(\-nocookie|).com\/v\/[0-9a-zA-Z\-_&=]+" type="application\/x\-shockwave\-flash"( allowscriptaccess="always"|) allowfullscreen="true"( allowscriptaccess="always"|)( wmode="transparent"|) width="[0-9]+" height="[0-9]+"><\/embed><\/object>/gi, "");
			thisvalueexception = thisvalueexception.replace(/<script type="text\/javascript" charset="(euc\-jp|utf\-8|shift_jis|iso\-2022\-jp)" src="http:\/\/blog\.with2\.net\/vote\/form\.php\?[0-9a-zA-Z&=_%\-]+"><\/script>/gi, "");
			thisvalueexception = thisvalueexception.replace(/<object width='[0-9]+' height='[0-9]+'><param name='movie' value='http:\/\/www\.digibook\.net\/p\/[0-9a-zA-Z_\-]+\/'\/><param name='wmode' value='transparent'\/><embed src='http:\/\/www\.digibook\.net\/p\/[0-9a-zA-Z_\-]+\/' type='application\/x\-shockwave\-flash' wmode='transparent' width='[0-9]+' height='[0-9]+'><\/embed><\/object>/gi, "");
			thisvalueexception = thisvalueexception.replace(/<iframe width="[0-9]+" height="[0-9]+" src="http:\/\/ext\.nicovideo\.jp\/thumb\/[0-9a-zA-Z]+" scrolling="no" style="border:solid 1px #CCC;" frameborder="0"><a href="http:\/\/www\.nicovideo\.jp\/watch\/[a-zA-Z0-9]+">[^<>]*<\/a><\/iframe>/gi, "");
			thisvalueexception = thisvalueexception.replace(/<script type="text\/javascript" src="http:\/\/ext\.nicovideo\.jp\/thumb_watch\/[0-9a-zA-Z=&\?]+"( charset="utf\-8"|)><\/script>/gi, "");
			thisvalueexception = thisvalueexception.replace(/<script type="text\/javascript" src="http:\/\/geki\.excite\.co\.jp\/play\/[0-9a-zA-Z_\-]+(\?w=[0-9]+&h=[0-9]+|)"><\/script>/gi, "");
			thisvalueexception = thisvalueexception.replace(/<script src="http:\/\/video\.excite\.co\.jp\/parts\/\?(&?[wh]{1}=[0-9]+)*&?v=[0-9a-zA-Z]+(&?[wh]{1}=[0-9]+)*"><\/script>/gi, "");

	var pstag = thisvalueexception.match(/<\/?(FORM|FRAME|FRAMESET|IFRAME|META|NOFRAMES|NOSCRIPT|OBJECT|PARAM|SCRIPT|SERVER|CODE|STYLE|LINK|APPLET|EMBED|BGSOUND)+[^<>]*>/gi);
	if ( pstag != null )
	{
		for(var i = 0; i < pstag.length ; i++ ){
			alert(pstag[i] + "はセキュリティー上使用できません。");
			//formName.focus();
			return true;
		}
	}
	var exetag = thisvalue.match(/<a\shref="(.*\.exe)".*[\/>|>].*<\/a>/i);
//		var exetag = thisvalue.match(/<a\shref="(.+?\.exe)".+?[\/>|>].+?<\/a>/i);
	if ( exetag != null )
	{
		alert( RegExp.$1 + "はセキュリティー上使用できません。");
		return true;
	}
	
	// css expression
	i
	thisvalue = thisvalue.replace(/\/\*[^*]*\*\//ig , "" );
	var expression_tag = thisvalue.match( /(: *(e|&#101;|&#x65;|\\0065)(x|&#120;|&#x78;|\\0078)(p|&#112;|&#x70;|\\0070)(r|&#114;|&#x72;|\\0072)(e|&#101;|&#x65;|\\0065)(s|&#115;|&#x73;|\\0073)(s|&#115;|&#x73;|\\0073)(i|&#105;|&#x69;|\\0069)(o|&#111;|&#x6f;|\\006f)(n|&#110;|&#x6e;|\\006e))/i );
	if ( expression_tag != null )
	{
		alert( RegExp.$1 + "はセキュリティー上使用できません。");
		return true;
	}

	
	return false;
}

function addEvent( obj , evt , func )
{
	if( obj.addEventListener )
	{
		obj.addEventListener( evt , func , false );
		return true;
	}else if( obj.attachEvent )
	{
		obj.attachEvent( "on" + evt , func );
		return true;
	}else
	{
		return false;
	}
}

// This stops the javascript from hiding -->

