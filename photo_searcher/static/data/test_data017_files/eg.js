<!-- Begin to hide script contents from old browsers.
var NL = "\r\n";

function UpdateCategory(eid){
	ap_openwin("http://www.exblog.jp/adm/chgcategory_view.asp?eid=" + eid, "chgcategory", 420, 195, 3, false, true, false);
}

function delPost(writer,eid,serial,rtnurl){

	var response = confirm("本当に削除しますか?" );
	if (response == true)
		self.location.href = "http://upload.exblog.jp/delete_exec.asp?eid=" + eid + "&srl=" + serial + "&writer=" + writer + "&rtnurl=" + rtnurl;
	else
		return;
}

function InsBookmark(eid){
	self.location.href = "http://www.exblog.jp/blog/insbookmark_exec.asp?eid=" + eid;
}

function imgview(imgsrc,imgwidth,imgheight,slt)
{
	ppscr = true;
	if( slt == "0" )
	{
		ap_openwin("http://www.exblog.jp/blog_logo.asp?slt=" + slt + "&imgsrc=" + imgsrc, "imgpopup", imgwidth, imgheight, 1, true, false, false);
	}
	else
	{
		if ( imgwidth > 700 ){
			ppscr = true;
			imgwidth = 700;
		}
		if ( imgheight > 500 ){
			ppscr = true;
			imgheight = 500;
		}
		if ( ppscr == true )
			imgwidth = imgwidth + 18;
		ap_openwin("http://www.exblog.jp/blog_logo.asp?slt=" + slt + "&imgsrc=" + imgsrc, "imgpopup", imgwidth, imgheight, 1, true, ppscr, false);
	}
}

function runComment(form,bglevel){
	var remoteURL = "";
	var cmtstr	= "";
	var scrtstr = "";

	if( bglevel > 4 )
	{
		if( isNothing(form.name) ) return( false );
		if( !isValidBlob(form.name, 30) ) return( false );
		if( isNothing(form.passwd) ) return( false );
		if( !isValidBlob(form.homepage, 100) ) return( false );
		if( form.homepage.value != 0 && form.homepage.value.search(/http\:\/\//gi) < 0 ){
			alert("ホームページアドレスが正しくありません。\r\nもう一度入力してください。");
			form.homepage.focus();
			return( false );
		}
		if( form.homepage.value.search(/ /) > 0  ){
			alert("スペースが含まれています。スペースを削除してください。");
			form.homepage.focus();
			return( false );
		}
		if( form.homepage.value == "http://" )
			form.homepage.value = "";
	}

	if(form.security.checked == true) scrtstr = "0";
	else  scrtstr = "1";

	if( isNothing(form.comment) ) return( false );
	if( !isValidBlob(form.comment, 1024) ) return( false );

	var postserial = form.srl.value;
	if(!document.getElementById("cmt" + postserial + "hid")) document.getElementById("cmtcnt" + postserial).innerHTML = parseInt(document.getElementById("cmtcnt" + postserial).innerHTML) + 1;
	return( true );
}

function delnotice(eid,ntcserial){
	var response = confirm("本当に削除しますか?" );
	if (response == true)
	{
		window.location.href = "http://www.exblog.jp/adm/notice_exec.asp?eid=" + eid + "&srl=" + ntcserial;
	}
	else
		return;
}

function delComment(eid,postserial,cmtserial,writer,adview,hosturl){
	var response = confirm( "本当に削除しますか?" );
	if (response == true)
	{
		remoteURL = "http://" + unescape(hosturl) + "/pg/delcomment_exec.asp?";
		remoteURL += "eid=" + eid + "&srl=" + postserial + "&cmtserial=" + cmtserial + "&writer=" + escape(writer) + "&adview=" + adview;
		self.frames.cmtviewfrm.location.href = remoteURL;
		document.getElementById("cmtcnt" + postserial).innerHTML = parseInt(document.getElementById("cmtcnt" + postserial).innerHTML) - 1;
	}
	else
		return;
}

function delCommentNA(eid,postserial,cmtserial,writer,adview,hosturl){
	var response = confirm( "本当に削除しますか?" );
	if (response == true)
	{
		remoteURL = "http://" + unescape(hosturl) + "/pg/delcomment_exec.asp?";
		remoteURL += "eid=" + eid + "&srl=" + postserial + "&cmtserial=" + cmtserial + "&writer=" + escape(writer) + "&adview=" + adview;
		self.frames.cmtviewfrm.location.href = remoteURL;
		document.getElementById("nacmtcnt" + postserial).innerHTML = parseInt(document.getElementById("nacmtcnt" + postserial).innerHTML) - 1;
	}
	else
		return;
}

function admitComment(eid,postserial,cmtserial,adview,hosturl){
	remoteURL = "http://" + unescape(hosturl) + "/pg/admitcomment_exec.asp?";
	remoteURL += "eid=" + eid + "&srl=" + postserial + "&cmtserial=" + cmtserial + "&adview=" + adview;
	self.frames.cmtviewfrm.location.href = remoteURL;
	document.getElementById("cmtcnt" + postserial).innerHTML = parseInt(document.getElementById("cmtcnt" + postserial).innerHTML) + 1;
	document.getElementById("nacmtcnt" + postserial).innerHTML = parseInt(document.getElementById("nacmtcnt" + postserial).innerHTML) - 1;
}

function delComment_view(eid,postserial,cmtserial,hosturl)
{
	ap_openwin("http://" + unescape(hosturl) + "/pg/delcomment_view.asp?eid=" + eid + "&srl=" + postserial + "&cmtserial=" + cmtserial, "delcomment", 400, 300, 3, false, false, false);
}

function deltrackback(eid,postserial,trbserial,adview,hosturl)
{
	var response = confirm( "本当に削除しますか?" );
	if (response == true)
	{
		remoteURL = "http://" + unescape(hosturl) + "/pg/deltrackback_exec.asp?";
		remoteURL += "eid=" + eid + "&srl=" + postserial + "&trbserial=" + trbserial + "&adview=" + adview;


		self.frames.cmtviewfrm.location.href = remoteURL;
		var el = document.getElementById("trbcnt" + postserial);
		if( el )
			el.innerHTML = parseInt(document.getElementById("trbcnt" + postserial).innerHTML) - 1;
	}
	else
		return;
}

function admitTrackback(eid,postserial,trbserial,adview,hosturl){
	remoteURL = "http://" + unescape(hosturl) + "/pg/admittrackback_exec.asp?";
	remoteURL += "eid=" + eid + "&srl=" + postserial + "&trbserial=" + trbserial + "&adview=" + adview;
	self.frames.cmtviewfrm.location.href = remoteURL;
	if(document.getElementById("trbcnt" + postserial).innerHTML.length == 0)
	{
		document.getElementById("trbcnt" + postserial).innerHTML = 1;
	}else
	{
		document.getElementById("trbcnt" + postserial).innerHTML = parseInt(document.getElementById("trbcnt" + postserial).innerHTML) + 1;
	}
	document.getElementById("natrbcnt" + postserial).innerHTML = parseInt(document.getElementById("natrbcnt" + postserial).innerHTML) - 1;
}

function deltrackbackNA(eid,postserial,trbserial,adview,hosturl)
{
	var response = confirm( "本当に削除しますか?" );
	if (response == true)
	{
		remoteURL = "http://" + unescape(hosturl) + "/pg/deltrackback_exec.asp?";
		remoteURL += "eid=" + eid + "&srl=" + postserial + "&trbserial=" + trbserial + "&adview=" + adview;


		self.frames.cmtviewfrm.location.href = remoteURL;
		var el = document.getElementById("natrbcnt" + postserial);
		if( el )
			el.innerHTML = parseInt(document.getElementById("natrbcnt" + postserial).innerHTML) - 1;
	}
	else
		return;
}

function instrackback(eid,subject,hosturl,postserial)
{
	var trburl = "http://" + unescape(hosturl) + "/tb/" + postserial;
	var url	   = "http://" + unescape(hosturl) + "/" + postserial;

	ap_openwin("http://upload.exblog.jp/blog_tool.asp?eid=" + eid + "&url=" + escape(url) + "&title=" + subject + "&trburl=" + escape(trburl), "instrackback", 601, 550, 3, false, true, false);
}

function instrackbackNA(eid,subject,hosturl,postserial)
{
	var trburl = "http://" + unescape(hosturl) + "/tb/" + postserial;
	var url	   = "http://" + unescape(hosturl) + "/" + postserial;
	ap_openwin("http://upload.exblog.jp/blog_tool.asp?eid=" + eid + "&url=" + escape(url) + "&title=" + subject + "&trburl=" + escape(trburl) + "&trba=1", "instrackback", 601, 550, 3, false, true, false);
}

function cmtview(serial,eid,hosturl)
{
	var remoteURL = "";
	var formURL = "";
	var cmtcont = "";
	var rtnurl = "";
	remoteURL = "http://" + unescape(hosturl) + "/c" + serial;
	cmtcont = document.getElementById("cmt" + serial).innerHTML;
	if ( cmtcont == "" || cmtcont.search(/TRACK_TOP/gi) > 0 )
	{
		self.frames.cmtviewfrm.location.href = remoteURL;
	}
	else
		document.getElementById("cmt" + serial).innerHTML = "";
}

function cmtviewpg(serial,eid,hosturl,pg,flag)
{
	remoteURL = "http://" + unescape(hosturl) + "/pg/blog_" + ((flag == 1) ? "viewcmt" : "comment") + ".asp?eid=" + eid + "&srl=" + serial + "&pg=" + pg;
	self.frames.cmtviewfrm.location.href = remoteURL;
}


function trbview(serial,eid,hosturl)
{
	var remoteURL = "";
	var cmtcont = "";
	remoteURL = "http://" + unescape(hosturl) + "/t" + serial;
	cmtcont = document.getElementById("cmt" + serial).innerHTML;
	if ( cmtcont == "" || cmtcont.search(/COMMENT_INPUT/gi) > 0 )
		self.frames.cmtviewfrm.location.href = remoteURL;
	else
		document.getElementById("cmt" + serial).innerHTML = "";
}


function leapYear(year)
{
	if (year % 4 == 0) return true;
	else return false;
}

function getDays(month, year)
{
	var ar = new Array(12);
	ar[0] = 31;
	ar[1] = (leapYear(year)) ? 29 : 28;
	ar[2] = 31;
	ar[3] = 30;
	ar[4] = 31;
	ar[5] = 30;
	ar[6] = 31;
	ar[7] = 31;
	ar[8] = 30;
	ar[9] = 31;
	ar[10] = 30;
	ar[11] = 31;

	return ar[month];
}

function getMonthName(month) {
	var ar = new Array(12);
	ar[0] = "January";
	ar[1] = "February";
	ar[2] = "March";
	ar[3] = "April";
	ar[4] = "May";
	ar[5] = "June";
	ar[6] = "July";
	ar[7] = "August";
	ar[8] = "September";
	ar[9] = "October";
	ar[10] = "November";
	ar[11] = "December";
	
	return ar[month];
}

function getMonthStr(month) {
	var ar = new Array(12);
	ar[0] = "01";
	ar[1] = "02";
	ar[2] = "03";
	ar[3] = "04";
	ar[4] = "05";
	ar[5] = "06";
	ar[6] = "07";
	ar[7] = "08";
	ar[8] = "09";
	ar[9] = "10";
	ar[10] = "11";
	ar[11] = "12";
	
	return ar[month];
}

function calendar(acvstr,calstr,hosturl)
{
	hosturl = unescape(hosturl);

	var out = "" ;
	if ( acvstr == "" )
		var now = new Date();
	else
	{	
		var calary = acvstr.split("-");
		if ( calary[1] == "10" )
			var tmpint = parseInt(calary[1]) - 1;
		else
			var tmpint = parseInt(calary[1].replace(/0/,"")) - 1;
		if ( tmpint == 0 ) tmpint = "00";
		if( tmpint < 10 ) calary[1] = "0" + tmpint.toString();
		else calary[1] = tmpint.toString();
		eval("var now = new Date(" + calary[0] + "," + calary[1] + "," + calary[2] + ")");
	}

	var year = now.getFullYear();
	var month = now.getMonth();
	var monthName = getMonthName(month);
	var date = now.getDate();
	now = null;
	var firstDayInstance = new Date(year, month, 1);
	var firstDay = firstDayInstance.getDay() + 1;
	firstDayInstance = null;
	var lastDate = getDays(month, year);
	var todaydate = new Date();
	var todaymonth = todaydate.getMonth();
	var todayday   = todaydate.getDate();
	todaydate = null;

	var today_page = year + "-" + getMonthStr(month) + "-01";
	var pre_mpage = "";
	if ( month == 0 )
		pre_mpage += (year-1) + "-12-01";
	else
		pre_mpage += year + "-" + getMonthStr(month-1) + "-01";

	var next_mpage = "";
	if ( month == 11 )
		next_mpage += (year+1) + "-01-01";
	else
		next_mpage += year + "-" + getMonthStr(month+1) + "-01";

	out += "<DIV CLASS=CAL_TOP>" + calstr + "</DIV>";
	out += "<DIV CLASS=CAL>";
	out += "<DIV CLASS=CAL_HEAD>";
	out += "<A HREF=http://" + hosturl + "/m" + pre_mpage + "><SPAN CLASS=CAL><</SPAN></A>"
	out += " <A HREF=http://" + hosturl + "/m" + today_page + ">" + monthName + " " + year + "</A> ";
	out += "<A HREF=http://" + hosturl + "/m" + next_mpage + "><SPAN CLASS=CAL>></SPAN></A></DIV>";
	out += "<DIV CLASS=CAL_BODY>";
	out += "<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=1 WIDTH=100%>";

	var weekDay = new Array(7)
	weekDay[0] = "S";
	weekDay[1] = "M";
	weekDay[2] = "T";
	weekDay[3] = "W";
	weekDay[4] = "T";
	weekDay[5] = "F";
	weekDay[6] = "S";

	out += "<TR CLASS=CAL_TR>";
	for (var dayNum = 0; dayNum < 7; ++dayNum)
	{
		if( dayNum == 0 )
			out += "<TD WIDTH=15% CLASS=CAL_SUN>" + weekDay[dayNum] + "</TD>";
		else if( dayNum == 6 )
			out += "<TD WIDTH=15% CLASS=CAL_SAT>" + weekDay[dayNum] + "</TD>";
		else
			out += "<TD WIDTH=14% CLASS=CAL_DAY>" + weekDay[dayNum] + "</TD>";
	}
	out += "</TR>";

	var digit = 1;
	var curCell = 1;
	var eql = 0;
	var dayhref = "";
	var opentd = "";
	var closetd = "</TD>";
	for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row)
	{
		out += "<TR CLASS=CAL_TR>";
		for (var col = 1; col <= 7; ++col)
		{
			if( col == 1 || col == 7 )
				weektd = "<TD WIDTH=15% CLASS=CAL>";
			else
				weektd = "<TD WIDTH=14% CLASS=CAL>";

			if (digit > lastDate)	break;
			if (curCell < firstDay)
			{
				out += weektd + closetd;
				curCell++;
			}
			else 
			{
				if ( digit < 10 ) digitstr = "0" + digit.toString();
				else digitstr = digit.toString();

				if ( s_calendar[eql] == digit )
				{
					dayhref = "<A HREF=http://" + hosturl + "/d" + year + "-" + getMonthStr(month) + "-" + digitstr + "><B>" + digit + "</B></A>";
					eql = eql + 1;
				}
				else
					dayhref = digit.toString();

				if ( digit == todayday && month == todaymonth )
				{ 
					out += weektd.replace(/CAL/gi,"CAL_TODAY") + dayhref + closetd;
				}
				else
					out += weektd + dayhref + closetd;

				digit++;
			}
		}
		out += "</TR>";
	}
	out += "</TABLE>";
	out += "</DIV>";
	out += "</DIV>";
	out += "<DIV CLASS=CAL_BOTTOM></DIV>";
	document.writeln(out);
}

function fnd_calenda(hosturl,acvstr,kwd)
{
	var out = "" ;
	if ( acvstr == "" )
		var now = new Date();
	else
	{	
		var calary = acvstr.split("-");
		if ( calary[1] == "10" )
			var tmpint = parseInt(calary[1]) - 1;
		else
			var tmpint = parseInt(calary[1].replace(/0/,"")) - 1;
		if ( tmpint == 0 ) tmpint = "00";
		if( tmpint < 10 ) calary[1] = "0" + tmpint.toString();
		else calary[1] = tmpint.toString();
		eval("var now = new Date(" + calary[0] + "," + calary[1] + "," + calary[2] + ")");
	}

	var year = now.getFullYear();
	var month = now.getMonth();
	var monthName = getMonthName(month);
	var date = now.getDate();
	now = null;
	var firstDayInstance = new Date(year, month, 1);
	var firstDay = firstDayInstance.getDay() + 1;
	firstDayInstance = null;
	var lastDate = getDays(month, year);
	var todaydate = new Date();
	var todayyear  = todaydate.getFullYear();
	var todaymonth = todaydate.getMonth();
	var todayday   = todaydate.getDate();
	todaydate = null;

	var today_page = year + "-" + getMonthStr(month) + "-01";
	var pre_mpage = "";
	if ( month == 0 )
		pre_mpage += (year-1) + "-12-01";
	else
		pre_mpage += year + "-" + getMonthStr(month-1) + "-01";

	var next_mpage = "";
	if ( month == 11 )
		next_mpage += (year+1) + "-01-01";
	else
		next_mpage += year + "-" + getMonthStr(month+1) + "-01";

	out += "<DIV CLASS=CAL>";
	out += "<DIV CLASS=CAL_HEAD>";
	out += "<A HREF=http://" + hosturl + "?kwd=" + kwd + "&acv=" + pre_mpage + "&dtm=" + pre_mpage + "><SPAN CLASS=CAL><</SPAN></A> "
	out += "<A HREF=http://" + hosturl + "?kwd=" + kwd + "&acv=" + today_page + "&dtm=" + today_page + ">" + monthName + " " + year + "</A> ";
	if ( year >= todayyear && month >= todaymonth )
		out += "<SPAN CLASS=CAL>></SPAN>";
	else
		out += "<A HREF=http://" + hosturl + "?kwd=" + kwd + "&acv=" + next_mpage + "&dtm=" + next_mpage + "><SPAN CLASS=CAL>></SPAN></A>";
	out += "</DIV>";
	out += "<DIV CLASS=CAL_BODY>";
	out += "<TABLE BORDER=0 CELLPADDING=0 CELLSPACING=1 WIDTH=100%>";

	var weekDay = new Array(7)
	weekDay[0] = "S";
	weekDay[1] = "M";
	weekDay[2] = "T";
	weekDay[3] = "W";
	weekDay[4] = "T";
	weekDay[5] = "F";
	weekDay[6] = "S";

	out += "<TR CLASS=CAL_TR>";
	for (var dayNum = 0; dayNum < 7; ++dayNum)
	{
		if( dayNum == 0 )
			out += "<TD WIDTH=15% CLASS=CAL_SUN>" + weekDay[dayNum] + "</TD>";
		else if( dayNum == 6 )
			out += "<TD WIDTH=15% CLASS=CAL_SAT>" + weekDay[dayNum] + "</TD>";
		else
			out += "<TD WIDTH=14% CLASS=CAL_DAY>" + weekDay[dayNum] + "</TD>";
	}
	out += "</TR>";

	var digit = 1;
	var curCell = 1;
	var opentd = "";
	var closetd = "</TD>";
	for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row)
	{
		out += "<TR CLASS=CAL_TR>";
		for (var col = 1; col <= 7; ++col)
		{
			if( col == 1 || col == 7 )
				weektd = "<TD WIDTH=15% CLASS=CAL>";
			else
				weektd = "<TD WIDTH=14% CLASS=CAL>";

			if (digit > lastDate)	break;
			if (curCell < firstDay)
			{
				out += weektd + closetd;
				curCell++;
			}
			else 
			{
				if ( digit < 10 ) digitstr = year + "-" + getMonthStr(month) + "-0" + digit.toString();
				else digitstr = year + "-" + getMonthStr(month) + "-" + digit.toString();

				if ( digit == todayday && month == todaymonth )
				{ 
					out += weektd.replace(/CAL/gi,"CAL_TODAY");
					out += "<A HREF=http://" + hosturl + "?kwd=" + kwd + "&acv=" + today_page + "&dtm=" + digitstr + ">" + digit.toString() + "</A>";
				}
				else if ( digit < todayday && month == todaymonth )
				{ 
					out += weektd.replace(/CAL/gi,"CAL_DAY");
					out += "<A HREF=http://" + hosturl + "?kwd=" + kwd + "&acv=" + today_page + "&dtm=" + digitstr + ">" + digit.toString() + "</A>";
				}
				else if ( month != todaymonth )
				{ 
					out += weektd.replace(/CAL/gi,"CAL_DAY");
					out += "<A HREF=http://" + hosturl + "?kwd=" + kwd + "&acv=" + today_page + "&dtm=" + digitstr + ">" + digit.toString() + "</A>";
				}
				else
					out += weektd + digit.toString();

				out += closetd;
				digit++;
			}
		}
		out += "</TR>";
	}
	out += "</TABLE>";
	out += "</DIV>";
	out += "</DIV>";
	out += "<DIV CLASS=CAL_BOTTOM></DIV>";
	document.writeln(out);
}
// This stops the javascript from hiding -->