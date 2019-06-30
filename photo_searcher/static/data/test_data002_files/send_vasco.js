in_cook=0;
if (window.navigator.cookieEnabled) {
in_cook=0;
} else {
in_cook=1;
}

in_pref = "";
if (document.referrer.length !=0 ){
   in_pref = escape(document.referrer);
}else{
   in_pref = "";
}

in_tmpg = '0';

document.write('<ifr'+'ame name="maad" src="http://ld.send.microad.jp/pmad.cgi?blogid='+in_uid+'&in_spotseq='+in_spotseq+'&templateid='+in_templateid+'&charset='+in_charset+'&group='+in_group+'&type=0&HBgColor='+in_HBgColor+'&HBorderColor='+in_HBorderColor+'&HTitleColor='+in_HTitleColor+'&HTextColor='+in_HTextColor+'&HUrlColor='+in_HUrlColor+'&matchurl='+in_matchurl+'&in_cook='+in_cook+'&in_pref='+in_pref+'&in_tmpg='+in_tmpg+'"');
document.write(' width="'+ frame_width +'"'+
' height="'+ frame_height +'"'+
' scrolling="no"'+
' frameborder="no"'+
' marginwidth="0"'+
' marginheight="0"'+
' allowTransparency="true"'+' ></ifr'+'ame>');
