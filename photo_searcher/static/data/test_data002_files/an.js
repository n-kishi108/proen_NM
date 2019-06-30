new function(){
	var d=document;
	if(typeof($)=="undefined"){
		var s=d.createElement('script');
		s.setAttribute('src','/js/jquery.js');
		d.getElementsByTagName("head")[0].appendChild(s);
		s=d.createElement('script');
		s.setAttribute('src','/js/heightLine.js');
		d.getElementsByTagName("head")[0].appendChild(s);
		s=d.createElement('script');
		s.setAttribute('src','/js/swfobject.js');
		d.getElementsByTagName("head")[0].appendChild(s);
	}
};

var _an_appkey1, _an_appkey2, _an_appkey3, _an_appkey4, _an_appkey5;
var _an_tag_image = "http://an.mainichi.jp/an/null.gif"; 
var _an_host = document.location.hostname;
var _an_path = document.location.pathname;
var _an_search = document.location.search;
var _an_protocol = document.location.protocol;
var _an_referrer = document.referrer;
var _an_width = screen.width;
var _an_height = screen.height;

function aq_tag(){
	var abc = new Image(1,1);
	var i, rhost, rpath, app1;
	var _cobj = checkCookie()
	var _id= _cobj["username"];
	var _randnum = _cobj["randnum"];
	var now=new Date();
	utctime=now.toGMTString();
	rhost = "";
	rpath = "";
	i = _an_referrer.indexOf("://");
	if (i > 0) {
		_an_referrer = _an_referrer.substring(i + 3, _an_referrer.length);
		i = _an_referrer.indexOf("/");
		if (i > 0) {
			rhost = _an_referrer.substring(0, i);
			rpath = _an_referrer.substring(i, _an_referrer.length);
		}
	}
	if (rhost==_an_host){
		rhost = "";
		rpath = "";
	}
	
	var inbv = document.location.href.split("inb=");
	var inb = inbv[1];
	var _an_appkey1;
	if(typeof inb != "undefined"){
		if(inb.length == 2){
			_an_appkey1 =  "&_an_appkey1="+ _an_path + "?inb=" + inb;
		}
	}
	
	abc.src = _an_tag_image + "?protocol=" + _an_protocol + "&host=" + _an_host + "&path=" + _an_path + "&rhost=" + rhost + "&rpath=" + escape(rpath) + "&app1=" + _an_width + "x" + _an_height + "&username=" +_id + "&time=" + utctime + "&randnum="+_randnum+ "&search&" + _an_search.substring(1,_an_search.length)  + _an_appkey1;
	abc.onload = function(){soWhat();}
}

function soWhat() {return;}

function getCookie(c_name){
	var c_start;
	var c_end;
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
	if (c_start!=-1){
		c_start=c_start + c_name.length+1;
		c_end=document.cookie.indexOf(";",c_start);
		if (c_end==-1) c_end=document.cookie.length;
		return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return null;
}

function setCookie(value,expiredays,v_count,_randnum,_randexpdays){
	var exdate=new Date();
	v_count++;
	exdate.setDate(expiredays);
	var exdateGMT = exdate.toGMTString();
	_datesum=exdate.getHours(expiredays)+exdate.getDay(expiredays)+exdate.getMonth(expiredays)+exdate.getFullYear(expiredays);
	document.cookie="username="+escape(value)+"; path=/"+((expiredays==null)?"":("; expires="+exdateGMT));
	document.cookie="v_count="+v_count+"; path=/"+((expiredays==null)?"":("; expires="+exdateGMT));
	document.cookie="d_count="+_datesum+"; path=/"+((expiredays==null)?"":("; expires="+exdateGMT));
	var randexdate=new Date();
	randexdate.setTime(randexdate.getTime() + _randexpdays*24*3600*1000);
	var randexdateGMT = randexdate.toGMTString();
	document.cookie="an_randnum="+_randnum+"; path=/"+((_randexpdays==null)?"":("; expires="+randexdateGMT));
}

function checkCookie(){
	var exp=3650;
	var _date=new Date();
	var _now=new Date();
	_date.setDate(exp);
	var username=getCookie('username');
	var visits=getCookie('v_count');
	var valsum=getCookie('d_count');
	var an_randnum = getCookie('an_randnum');
	var sumdate=_date.getHours(exp)+_date.getDay(exp)+_date.getMonth(exp)+_date.getFullYear(exp);
	var rand_exp=31;
	
	if(an_randnum == null){
		an_randnum = Math.floor(Math.random() * 10);
		var randexdate=new Date();
		randexdate.setTime(randexdate.getTime() + rand_exp*24*3600*1000);
		var randexdateGMT = randexdate.toGMTString();
		document.cookie="an_randnum="+an_randnum+"; path=/"+((rand_exp==null)?"":("; expires="+randexdateGMT));
	}
	
	if (username!=null){
		if (sumdate != valsum){
			setCookie(username,exp,visits,an_randnum,rand_exp);
		}
	}else{
		username=Math.round(Math.random() * 7777341)+"H"+_now.getTime();
		if (username!=null||username!=""){
			setCookie(username,exp,0,an_randnum,rand_exp);
		}
	}

	var robj = {};
	robj["username"] = username;
	robj["randnum"] = an_randnum;

	return robj;
}

aq_tag();

new function(){
function addEvent(elmObj,listener,func){
	try{
		elmObj.addEventListener(listener,func,false);
	}catch(e){
		elmObj.attachEvent("on"+listener,func);
	}
}
function gnaviMove(){
	if(typeof($) == 'undefined'){
		return;
	}
	var divGnaviRight = $('div.GnaviRight');
	divGnaviRight.width($('div.GnaviRight>ul').width());
	if($("div#Gnavi").width()<=$('div.GnaviLeft').width()+divGnaviRight.width()+20){
		 divGnaviRight.css({float:'left'});
		$('li', divGnaviRight ).css("margin-top",0);
	}else{
		 divGnaviRight.css({float:'right'});
		$('li', divGnaviRight).css("margin-top","5px");
	}
}
addEvent(window,'load',function(){addEvent(window,'resize',gnaviMove);});
};

