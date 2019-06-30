/* AdFit's ad delivery script. */
var emerge = false;

var ADUC = function(){
  this.prepared = false;
  this.initialize();
};

ADUC.prototype = {
  cookie : {
    get : function(name){
      var search = escape(name) + '=';
      if (document.cookie.length>0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1){
          offset += search.length;
          end     = document.cookie.indexOf(';',offset);
          if(end == -1) {
            end = document.cookie.length;
          }
          val = unescape(document.cookie.substring(offset,end));
          return val? val : true;
        }
      }
      return null;
    },

    clear : function(name){
      time = new Date(new Date().getTime()-10000).toGMTString();
      name = escape(name);
      document.cookie = name+"=1;expires="+time+";path=/;"
    },

    check : function(){
      if(navigator.cookieEnabled != undefined){
        return navigator.cookieEnabled;
      }
      do{
        var name = "test"+Math.random();
      }while(document.cookie.indexOf(name) != -1);
      document.cookie = name+"=test;path=/;"
      if(this.get(name)){
        this.clear(name);
        return true;
      }
      else return false;
    },

    getOptoutCookie : function(name){
      if (document.cookie.length>0) {
        offset = document.cookie.indexOf(name);
        if (offset != -1){
          return true;
        }
      }
      return false;
    },

    checkOptout : function(){
      return (this.getOptoutCookie("BTA002"))? true : false;
    }

  },

  browser : {
  check : function(){
	return ( ( this.IE && !this.Sleipnir )  || ( !this.Firefox && this.Gecko )  || ( this.Safari && !this.MobileSafari )  || this.Chrome );
    },
    Firefox: (navigator.userAgent.indexOf('Firefox/') > -1) ,
    IE: (!!(window.attachEvent && !window.opera)) && (navigator.appVersion.indexOf('MSIE 6') > -1 || navigator.appVersion.indexOf('MSIE 7') > -1 || navigator.appVersion.indexOf('MSIE 8') > -1),
    Gecko:  navigator.userAgent.indexOf('Gecko/') != -1 && navigator.userAgent.indexOf('KHTML') == -1 && navigator.appVersion.charAt(0) >= '2',
    Safari: navigator.userAgent.indexOf('AppleWebKit/') != -1 && (navigator.appVersion.indexOf('Version/3') > -1 || navigator.appVersion.indexOf('Version/2') > -1 || navigator.appVersion.indexOf('Version/4') > -1),
    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/),
    //can judge unless version 100 
    Opera:  (!!window.opera) && navigator.appVersion.substring(0,4) >= '9',
    Chrome: (navigator.userAgent.indexOf('Chrome/') > -1),
    Sleipnir: (navigator.userAgent.indexOf('Sleipnir/') > -1)
  },

  supported : function(){
    return (this.browser.check() && this.cookie.check() && !this.cookie.checkOptout() );
  },

  initialize : function(){
    this.prepare();
  },

  prepare : function(){
    if(this.supported()){
      this.prepared = true;
    }
  }
};

aduc = new ADUC();
params = '?rnd=1270015834&site='+ A4Usite +'&cont='+ A4Ucont +'&type='+ A4Utype;
if (typeof(A4Upos) != "undefined"){ params += '&pos='+ A4Upos; }
if (typeof(A4Utg) != "undefined"){ params += '&tg='+ A4Utg;}
params += '&cl='+ A4Uclient +'&domain='+A4Udomain;

if(!aduc.prepared || emerge){
  var imp_beacon_path = "http://log.ad4u.drecom.jp/img/ad_id_191/gen_3/ad4usess_/opt_1/access.gif?timestamp=" + (new Date()).getTime();
  var click_beacon_path = "http://log.ad4u.drecom.jp/img/bt_id_/ad_id_191/ad4usess_/gen_2/click.gif?timestamp=" + (new Date()).getTime();
  document.write("\n    <iframe width=\""+A4Uwidth + "\" height=\""+A4Uheight+"\" frameborder=\"0\"\n     src=\"http:\/\/grp101.ias.rakuten.co.jp\/content\/ad\/DCBT\/banners\/iframe\/1460.html"+ params +"\" scrolling=\"no\"  ><\/iframe>\n  ");
  (new Image()).src = imp_beacon_path
}else{
  var iframe_tag = '<iframe width="'+ A4Uwidth +'" height="'+ A4Uheight +'" frameborder="0" src="http://grp101.ias.rakuten.co.jp/content/ad/DCBT/delivery/ad/191.html' + params + '" scrolling="no" ></iframe>';
  document.write(iframe_tag);
};

rnd = parseInt(Math.random()*1000);
// volume measurement 2.0%
if(A4Utype=="rect"){
  if (rnd < 20) {
    document.write('<script type="text/javascript" src="http://image.ias.rakuten.co.jp/content/ad/DCBT/delivery/script/165.js"></scr');
    document.write('ipt>');
  }
// volume measurement 1.0%
}else{
  if (rnd < 10) {
    document.write('<script type="text/javascript" src="http://image.ias.rakuten.co.jp/content/ad/DCBT/delivery/script/162.js"></scr');
    document.write('ipt>');
  }
}