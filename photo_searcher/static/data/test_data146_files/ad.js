// next portion of this script based on:
// domready.js (http://snipplr.com/view/6029/domreadyjs/)
// copyright (c) 2007 Takanori Ishikawa (MIT-style license)
if (typeof Event == 'undefined') Event = new Object();Event.domReady = { add: function(fn) { if (Event.domReady.loaded) return fn(); var observers = Event.domReady.observers; if (!observers) observers = Event.domReady.observers = []; observers[observers.length] = fn; if (Event.domReady.callback) return; Event.domReady.callback = function() { if (Event.domReady.loaded) return; Event.domReady.loaded = true; if (Event.domReady.timer) { clearInterval(Event.domReady.timer); Event.domReady.timer = null; } var observers = Event.domReady.observers; for (var i = 0, length = observers.length; i < length; i++) { var fn = observers[i]; observers[i] = null; fn(); } Event.domReady.callback = Event.domReady.observers = null; }; var ie = !!(window.attachEvent && !window.opera); var webkit = navigator.userAgent.indexOf('AppleWebKit/') > -1; if (document.readyState && webkit) { Event.domReady.timer = setInterval(function() { var state = document.readyState; if (state == 'loaded' || state == 'complete') { Event.domReady.callback(); } }, 50); } else if (document.readyState && ie) { var src = (window.location.protocol == 'https:') ? '://0' : 'javascript:void(0)'; document.write( '<scr'+'ipt type="text/javascript" defer="defer" src="' + src + '" ' +  'onreadystatechange="if (this.readyState == \'complete\') { Event.domReady.timer = setInterval(function() { Event.domReady.callback(); }, 50); }"' +  '><\/scr'+'ipt>');} else { if (window.addEventListener) { document.addEventListener("DOMContentLoaded", Event.domReady.callback, false); window.addEventListener("load", Event.domReady.callback, false); } else if (window.attachEvent) { window.attachEvent('onload', Event.domReady.callback); } else { var fn = window.onload; window.onload = function() { Event.domReady.callback(); if (fn) fn(); } } } } };

var ld_blog_ads_dw_buffered = {
  'scripts' : 
   // 304
   (typeof(ld_blog_vars) == 'object' && ld_blog_vars.blog_category.permalink.match(/\/304\//) ) ?
      [
         'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001129&isJS=true&encoding=' + (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '') + '&ord=' + (Math.random()*10000000000),
         'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001130&isJS=true&encoding=' + (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '') + '&ord=' + (Math.random()*10000000000),
         'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001131&isJS=true&encoding=' + (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '') + '&ord=' + (Math.random()*10000000000),
         'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001132&isJS=true&encoding=' + (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '') + '&ord=' + (Math.random()*10000000000)
      ] :
   // 349
   (typeof(ld_blog_vars) == 'object' && ld_blog_vars.blog_category.permalink.match(/\/349\//) ) ?
      [
         'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9000936&isJS=true&encoding=' + (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '') + '&ord=' + (Math.random()*10000000000),
         'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9000937&isJS=true&encoding=' + (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '') + '&ord=' + (Math.random()*10000000000),
         'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001116&isJS=true&encoding=' + (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '') + '&ord=' + (Math.random()*10000000000),
         'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001117&isJS=true&encoding=' + (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '') + '&ord=' + (Math.random()*10000000000)
      ] :
   // 149
   (typeof(ld_blog_vars) == 'object' && ld_blog_vars.blog_category.permalink.match(/\/149\//) ) ?
      [
         'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001157&isJS=true&encoding=' + (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '') + '&ord=' + (Math.random()*10000000000),
         'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001121&isJS=true&encoding=' + (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '') + '&ord=' + (Math.random()*10000000000)
      ] :
   // default
   [
      'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001121&isJS=true&encoding=' + (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '') + '&ord=' + (Math.random()*10000000000)
   ],

  'buffer' : '',
  'dw_save' : '',
  'getAds' : function () {
    this.buffer += '<div class="gAdsense" style="margin:5px 0;padding:5px 0;text-align: left;">'
                +  '<div style="text-align:left;margin:0 auto; font-size: 11px;" class="adld">Ads by livedoor</div>';
    this.dw_save = window.document.write;
    this.callJS(this.scripts.shift());
  },
  'callJS' : function (url) {
    var obj = this;
    window.document.write = function (s) {
      obj.buffer += s;
      if (obj.scripts.length)
        obj.callJS(obj.scripts.shift());
      else
        obj.printAds();
    };
    document.writeln('<scr' + 'ipt type="text/javasc' + 'ript" src="' + url + '"></scri' + 'pt>');
  },
  'printAds' : function () {
    var addiv = 'ad2';
    var adtype = 'ld_adult';

    window.document.write = this.dw_save;
    this.buffer += '</div>';
    this.buffer = this.buffer.replace(/<a href=/g, '<a onclick="javascript:if(typeof(blog_counter_adtrk) == \'function\') { blog_counter_adtrk(\''+addiv+'\', \'' + adtype + '\')}" href=' );
    this.buffer = '<div id="ad">'+this.buffer+'</div>';

    var str = this.buffer;
    Event.domReady.add(
        function() {
           var ad = document.getElementById('ad') || document.getElementById('ad2');
           if (ad) {
              ad.innerHTML = str;
              ad.style['display'] = 'block';
           }
        }
    );
  }

};
ld_blog_ads_dw_buffered.getAds();
