var cmadlocation="http://ld.send.microad.jp/cmad.cgi";

var in_cook=window.navigator.cookieEnabled;
var in_pref = "";
if(document.referrer.length!=0) in_pref = escape(document.referrer);

var uud={flag:0};
var disp=0;
var timeout=3000;

if(window['mad_timeout']) timeout=mad_timeout;

var Matimer=setTimeout("MadTimeoutdisp()",timeout);

function MadTimeoutdisp(){
  if(uud.flag==0 && disp==0){
    disp=1;
    if(window['timeoutAdTag']) document.getElementById('advertise').innerHTML=timeoutAdTag;
  }
}


function Madcb(data){
  var second_param;
  uud=data;
  clearTimeout(Matimer);
  if(disp==0){
    if(uud.flag==0){
      if(window['showAdTagFunction']) eval(showAdTagFunction);
    }else{
      for(var keyname in uud.param){
        if(keyname=='jclb')continue;
        second_param=second_param+"&"+keyname+"="+uud.param[keyname]
      }
      document.write(["<ifr","ame frameborder='0' scrolling='no' ","width=",framewidth," height=",frameheight," marginwidth='0' marginheight='0' allowTransparency='true' ","src='",cmadlocation,"?charset=",in_charset,"&in_cook=",in_cook,"&in_pref=",in_pref,second_param,"'","/></ifr","ame>"].join(""));
    }
    disp = 1;
  }
}


function cb(data){
  uud = data;
  clearTimeout(Matimer);
  if( disp == 0 ){
    if(uud.flag == 1){
      for(i in uud.param){
        alert(i);
      }
      var MicroAdTag = [ 
                         "<ifr","ame frameborder='0' scrolling='no' ",
                         "width=",framewidth,
                         " height=",frameheight,
                         " marginwidth='0' marginheight='0' allowTransparency='true' ",
                         "src='",cmadlocation,
                         "?charset=",in_charset,
                         "&in_cook=",in_cook,
                         "&in_pref=",in_pref,
                         "&group=",uud.param.group,
                         "&btp_group=",uud.param.btp_group,
                         "&matchurl=",in_matchurl,
                         "&blogid=",uud.param.blogid,
                         "&templateid=",uud.param.templateid,
                         "&matchurl=",in_matchurl,
                         "&HBgColor=",in_HBgColor,
                         "&HBorderColor=",in_HBorderColor,
                         "&HTitleColor=",in_HTitleColor,
                         "&HTextColor=",in_HTextColor,
                         "&HUrlColor=",in_HUrlColor,
                         "'",
                         "/></ifr","ame>"
                       ].join("");
      document.write(MicroAdTag);
    }else{
      eval(showAdTagFunction);
    }
    uud.flag = 0;
    disp = 1;
  }
}
