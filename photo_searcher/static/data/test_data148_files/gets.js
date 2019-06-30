i2i_icon_type='4';

/////////////////////
function i2iCookieCk(Cname){

	Cfl='0';
	C=document.cookie;
	Cc='';

	if(C.length>0){
		Ch=C.indexOf(Cname+'=');
		if(Ch !=-1){
			Ch+=Cname.length+1;
			Th=C.indexOf(';',Ch);
			if(Th==-1)Th=C.length;
			Cc=C.substring(Ch,Th);
		}else{
			Cfl='1';
		}
	}else{
		Cfl='1';
	}
	return[Cfl,Cc];
}



function definedAlert(varID) { 
	if (window[varID]) { 
		return true; 
	}
	return false; 
}


timerID = 10;
function timerX(num){

	ua = navigator.userAgent;
	if( ua.indexOf( "Firefox" ) > -1 ){
		Atime=8500;
	}else{
		Atime=3500;
	}

	if(num==1){
		i2iDisable();
	}else{
		timerID = setTimeout("timerX(1)",Atime);
	}

}

function i2iAdview(i2i_icon_type){

	if(i2i_icon_type=='2'){
		icon_ichi='right';
		icon_file='04.swf';
	}else if(i2i_icon_type=='3'){
		icon_ichi='left';
		icon_file='03w.swf';
	}else if(i2i_icon_type=='4'){
		icon_ichi='right';
		icon_file='04w.swf';
	}else{
		icon_ichi='left';
		icon_file='03.swf';
	}


	
	if(i2i_icon_type=='2'){
		icon_ad='http://img.i2i.jp/ac/bin/adset2/flimg/no_black_flac.gif';
		icon_link='http://ad3.i2i.jp/click.php?ad_id=19';
		icon_img='';
	}else if(i2i_icon_type=='3'){
		icon_ad='http://img.i2i.jp/ac/bin/adset2/flimg/no_white_flac.gif';
		icon_link='http://ad3.i2i.jp/click.php?ad_id=18';
		icon_img='';
	}else if(i2i_icon_type=='4'){
		icon_ad='http://img.i2i.jp/ac/bin/adset2/flimg/no_white_flac.gif';
		icon_link='http://ad3.i2i.jp/click.php?ad_id=18';
		icon_img='';
	}else{
		icon_ad='http://img.i2i.jp/ac/bin/adset2/flimg/no_black_flac.gif';
		icon_link='http://ad3.i2i.jp/click.php?ad_id=19';
		icon_img='';
	}

	


	document.write('<div id=i2iAdconmini style="position:absolute;display:none;top:0px;'+icon_ichi+':0px;width:70px;height:15px;z-index:58473;">');
	document.write('<a href=http://ac3.i2i.jp/bin/getslink.php?00212847&&&'+icon_link+' target=_blank>');	document.write('<img src='+icon_ad+' border=0></a>');
	document.write(icon_img);
	document.write('</div>');


	document.write('<div id=i2iAdcon style="position:absolute;top:0px;'+icon_ichi+':0px;width:50px;height:41px;z-index:58473;">');
	document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="50" height="41" id="03" align="middle">');
	document.write('<param name="allowScriptAccess" value="sameDomain" />');
	document.write('<param name="movie" value="http://img.i2i.jp/ac/bin/icon/'+icon_file+'" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><param name="bgcolor" value="#ffffff" /><embed src="http://img.i2i.jp/ac/bin/icon/'+icon_file+'" quality="high" wmode="transparent" bgcolor="#ffffff" width="50" height="41" name="03" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
	document.write('</object>');
	document.write('</div>');





}





function i2iDisable(){
	if(document.all){
		obj=i2iAdcon;
		objm=i2iAdconmini;

	}else{
		obj=document.getElementById('i2iAdcon');
		objm=document.getElementById('i2iAdconmini');

	}

	str=obj.style.display;
	obj.style.display='none';

	objm.style.display='block';

}




/////////////////////
UQname='i2iUpad';
UQzen='i2iZenkai';
/////////////////////


if(!definedAlert('HARIconMultiFrag')){

	UQar=i2iCookieCk(UQname);
	UQzenar=i2iCookieCk(UQzen);

	T=new Date;
	Tp=T.getTime()+1000*60*60*24*1;
	T.setTime(Tp);
	Tg=T.toGMTString();

	UQ=0;
	if(UQzenar[0]==1){

		Num=parseInt(1);
		document.cookie=UQname+'='+Num+'; expires='+Tg;
		document.cookie=UQzen+'='+Tp+'; expires='+Tg;

		UQ=parseInt(1);

	}else{

		Num=parseInt(UQar[1]);
		Num++;
		document.cookie=UQname+'='+Num+'; expires='+Tg;

		Nama=Num%1;

		if(Nama==0){
			UQ=parseInt(1);
		}
	}

	/////////////////////


	if(UQ==1){
		if(!definedAlert('i2i_icon_type')){
			i2i_icon_type=3;
		}
		if(i2i_icon_type==''){
			i2i_icon_type=3;
		}

		i2iAdview(i2i_icon_type);

			}

	HARIconMultiFrag='on';

}

ID='00212847';
GID='133.51.2.174.1270190732';
Gtag='';
Uagent='Mozilla%2F5.0%20%28Windows%3B%20U%3B%20Windows%20NT%206.1%3B%20ja%3B%20rv%3A1.9.2.2%29%20Gecko%2F20100316%20Firefox%2F3.6.2';

/////////////////////

function kaigyohosei(str){

	var St=new RegExp('%0A','ig');
	var BB='';
	str=str.replace(St,BB)

	var St=new RegExp('%0D','ig');
	var BB='';
	str=str.replace(St,BB)

	return(str);

}



function iscookie(Cname){
	Cfl='0';
	C=document.cookie;
	Cc='';

	if(C.length>0){
		Ch=C.indexOf(Cname+'=');
		if(Ch !=-1){
			Ch+=Cname.length+1;
			Th=C.indexOf(';',Ch);
			if(Th==-1)Th=C.length;
			Cc=C.substring(Ch,Th);
		}else{
			Cfl='1';
		}
	}else{
		Cfl='1';
	}
	return[Cfl,Cc];
}

/////////////////////
MFname='MFac'+ID;
ACname='ACac'+ID;
UQname='UQac'+ID;
/////////////////////

MFar=iscookie(MFname);

if(MFar[0]==1){
	T=new Date;
	T.setTime(T.getTime()+1000*60*60*24*365);
	Tg=T.toGMTString();

	document.cookie=MFname+'='+GID+'; expires='+Tg;
}else{
	GID=MFar[1];
}
/////////////////////
UQ=0;

UQar=iscookie(UQname);
if(UQar[0]==1){
	T=new Date;
	T.setTime(T.getTime()+1000*60*30);
	Tg=T.toGMTString();

	document.cookie=UQname+'='+GID+'; expires='+Tg;
	UQ=parseInt(1);
}else{
	UQ=parseInt(0);
}
/////////////////////
AC=0;

ACar=iscookie(ACname);

T=new Date;
T.setTime(T.getTime()+1000*60*60*24*365);
Tg=T.toGMTString();

//AC=eval(parseInt(ACar[1])+1);
if(isNaN(ACar[1])||ACar[1]==''){
	ACar[1]=0;
}
AC=eval(parseInt(ACar[1])+1);

document.cookie=ACname+'='+AC+'; expires='+Tg;

/////////////////////

i2iTitle='';
i2iUrl='';
i2iReff='';

i2i_T2=typeof top;

if(Gtag=='off2'){
	i2iReff=escape(document.referrer);
}else if(i2i_T2=='object'){
	i2iReff=escape(top.document.referrer);
}else{
	i2iReff=escape(document.referrer);
}

if(Gtag=='off' || Gtag=='off2'){
	i2iTitle=escape(document.title);
	i2iUrl=escape(document.URL);
}else if(i2i_T2=='object'){
	i2iTitle=escape(top.document.title);
	i2iUrl=escape(top.document.URL);
}else{
	i2iTitle=escape(document.title);
	i2iUrl=escape(document.URL);
}

i2iTitle=kaigyohosei(i2iTitle);


Lines=new Array();
Lines[0]='idname='+ID;
Lines[1]='gid='+GID;
Lines[2]='uq='+UQ;
Lines[3]='ac='+AC;
Lines[4]='usra='+Uagent;
Lines[5]='reff='+i2iReff;
Lines[6]='url='+i2iUrl;
Lines[7]='etitle='+i2iTitle;

Line='';
Llen=Lines.length;
for(i=0;i<Llen;i++){
	if(i==Llen-1){
		Line+=Lines[i];
	}else{
		Line+=Lines[i]+'&';
	}
}

document.write('<scr'+'ipt type=text/javascript src=\"http://ac3.i2i.jp/bin/rows.php?'+Line+'\"></scr'+'ipt>');


var mad_client_id='4438';
var mad_group_id='';
document.write('<scr'+'ipt type=text/javascript src="http://send.microad.jp/js/conv0000.js"></scr'+'ipt>');

