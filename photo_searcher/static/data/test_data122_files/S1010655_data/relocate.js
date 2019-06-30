document.write('<!-- Template Id = 13173 Template Name = Banner Creative (Flash) - version from 5 -->\n<!-- Copyright 2002 DoubleClick Inc., All rights reserved. --><script src=\"http://s0.2mdn.net/879366/flashwrite_1_2.js\"><\/script>');document.write('\n');
 
var dcswf = "http://s0.2mdn.net/2250244/tci_sonysonpo_imp_728_90d_100316.swf"; 
var dcgif = "http://s0.2mdn.net/2250244/tci_sonysonpo_imp_728_90d_100316.gif"; 
var advurl = "http://ad.jp.doubleclick.net/click%3Bh%3Dv8/3973/7/f6/%2a/g%3B223608176%3B0-0%3B0%3B47279248%3B3454-728/90%3B36121742/36139620/1%3B%3B%7Esscs%3D%3fhttp://as.dc.impact-ad.jp/ADCLICK/CID=000055243f02034d00000000/acc_random=88288800/SITE=SN.ZOOME.CIRCLE.DAC/AREA=PAGE/AAMSZ=728X90/CL=SB/S0=11283/S1=10997/S2=11135/S3=10928/S4=11156/S5=10473/S6=10200/S7=10198/S8=11180/S9=10553/S10=10655/relocate=http://r.advg.jp/adptg_count/r?adptg_aid=1413&adptg_mid=319&adptg_lid=17";
var dcadvurl = escape(advurl);
var dcminversion = 6;
var dccreativewidth = "728";
var dccreativeheight = "90";
var dcwmode = "window";
var dcbgcolor = "FFFFFF";
var dcallowscriptaccess = "never";

if(typeof(encodeURIComponent)=="function"){dcadvurl=encodeURIComponent(advurl);}
function getFlashVer() {
        var i,a,o,p,s="Shockwave",f="Flash",t=" 2.0",u=s+" "+f,v=s+f+".",rSW=RegExp("^"+u+" (\\d+)");
        if((o=navigator.plugins)&&(p=o[u]||o[u+t])&&(a=p.description.match(rSW)))return a[1];
        else if(!!(window.ActiveXObject))for(i=10;i>0;i--)try{if(!!(new ActiveXObject(v+v+i)))return i}catch(e){}
        return 0;
      }

if (dcminversion<=getFlashVer())  {
 adcode = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+
  ' ID=FLASH_AD WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'">'+
  '<PARAM NAME=movie VALUE="' + dcswf + '"><param name="flashvars" value="clickTag='+ dcadvurl +'"><PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#'+ dcbgcolor +'><PARAM NAME=wmode VALUE='+ dcwmode +'><PARAM NAME="AllowScriptAccess" VALUE="'+dcallowscriptaccess+'">'+
  '<EMBED src="' + dcswf + '?clickTag='+ dcadvurl +'" quality=high wmode='+dcwmode+
  ' swLiveConnect=TRUE WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'" bgcolor=#'+ dcbgcolor+
  ' TYPE="application/x-shockwave-flash" AllowScriptAccess="'+dcallowscriptaccess+'"></EMBED></OBJECT>';
if(('j'!="j")&&(typeof dclkFlashWrite!="undefined")){dclkFlashWrite(adcode);}else{document.write(adcode);}
} else {
 document.write('<A TARGET="_blank" HREF="http://ad.jp.doubleclick.net/click%3Bh%3Dv8/3973/7/f6/%2a/g%3B223608176%3B0-0%3B0%3B47279248%3B3454-728/90%3B36121742/36139620/1%3B%3B%7Esscs%3D%3fhttp://as.dc.impact-ad.jp/ADCLICK/CID=000055243f02034d00000000/acc_random=88288800/SITE=SN.ZOOME.CIRCLE.DAC/AREA=PAGE/AAMSZ=728X90/CL=SB/S0=11283/S1=10997/S2=11135/S3=10928/S4=11156/S5=10473/S6=10200/S7=10198/S8=11180/S9=10553/S10=10655/relocate=http://r.advg.jp/adptg_count/r?adptg_aid=1413&adptg_mid=319&adptg_lid=17"><IMG SRC="' + dcgif + '" alt="" BORDER=0></A>');
}
//-->

document.write('<NOSCRIPT><A TARGET=\"_blank\" HREF=\"http://ad.jp.doubleclick.net/click%3Bh%3Dv8/3973/7/f6/%2a/g%3B223608176%3B0-0%3B0%3B47279248%3B3454-728/90%3B36121742/36139620/1%3B%3B%7Esscs%3D%3fhttp://as.dc.impact-ad.jp/ADCLICK/CID=000055243f02034d00000000/acc_random=88288800/SITE=SN.ZOOME.CIRCLE.DAC/AREA=PAGE/AAMSZ=728X90/CL=SB/S0=11283/S1=10997/S2=11135/S3=10928/S4=11156/S5=10473/S6=10200/S7=10198/S8=11180/S9=10553/S10=10655/relocate=http://r.advg.jp/adptg_count/r?adptg_aid=1413&adptg_mid=319&adptg_lid=17\"><IMG SRC=\"http://s0.2mdn.net/2250244/tci_sonysonpo_imp_728_90d_100316.gif\" alt=\"\" BORDER=0></A></NOSCRIPT>');
