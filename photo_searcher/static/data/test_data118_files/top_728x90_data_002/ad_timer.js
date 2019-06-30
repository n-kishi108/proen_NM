var in_cook=1;
if (window.navigator.cookieEnabled) {
  in_cook=0;
} else {
  display();
}

var in_pref = "";
if (document.referrer.length !=0 ){
   in_pref = escape(document.referrer);
}else{
   in_pref = "";
}

var uud = { flag : 0 };
var disp = 0;
var timeout = 3000;

if ( IsDefined('mad_timeout') ){
  timeout = mad_timeout;
}

timer = setTimeout("display()", timeout);

function display(){
  if(uud.flag == 0 && disp == 0){
    uud.flag = 0;
    disp = 1;
    document.getElementById('advertise').innerHTML = timeoutAdTag;
  }
}


function cb(data){
  uud = data;
  clearTimeout(timer);
  if( disp == 0 ){
    if(uud.flag == 1){
      var MicroAdTag = [ 
                         "<ifr","ame frameborder='0' scrolling='no' ",
                         "width=",framewidth,
                         " height=",frameheight,
                         " marginwidth='0' marginheight='0' allowTransparency='true' ",
                         "src='http://ld.send.microad.jp/cmad.cgi?",
                         "charset=",in_charset,
                         "&in_cook=",in_cook,
                         "&in_pref=",in_pref,
                         "&group=",uud.param.group,
                         "&btp_group=",uud.param.btp_group,
                         "&matchurl=",in_matchurl,
                         "&blogid=",uud.param.blogid,
                         "&templateid=",uud.param.templateid,
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

function IsDefined(varID){
  if (window[varID]){
    return true;
  }
  return false;
}
