/* ld google ads */
google_ad_client = 'ca-livedoor-blog_js';
google_max_num_ads = '3';
google_ad_channel = 'blog_2';
google_ad_output = 'js';
google_ad_type = 'text';
google_language = 'ja';
google_country = 'JP';
google_encoding = (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : 'euc-jp');
google_safe = 'high';
google_n_ads_rs = '2';

ld_category_ad_encoding = (typeof(ld_blog_vars) == 'object' ? ld_blog_vars.charset : '');
ld_category_ad_tag = "";
var ld_blog_ads_dw_buffered = {
    'scripts' :
        (typeof(ld_blog_vars) == 'object' && ( // 政治・経済
            ld_blog_vars.blog_category.permalink.match(/\/22\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/23\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/24\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/25\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/26\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/193\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/194\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/162\//)
          ) ) ? 
            [
              'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001138&encoding=' + ld_category_ad_encoding + '&ord=' + (Math.random()*10000000000),
             ] :
        (typeof(ld_blog_vars) == 'object' && ( // 映画
            ld_blog_vars.blog_category.permalink.match(/\/34\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/35\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/36\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/37\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/38\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/39\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/40\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/214\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/215\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/217\//) 
           ) ) ?
            [
               'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001139&encoding=' + ld_category_ad_encoding + '&ord=' + (Math.random()*10000000000)
             ] :
         (typeof(ld_blog_vars) == 'object' && ( // 車・バイク
            ld_blog_vars.blog_category.permalink.match(/\/75\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/76\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/77\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/78\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/79\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/233\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/234\//) 
          ) ) ?
           [
              'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001140&encoding=' + ld_category_ad_encoding + '&ord=' + (Math.random()*10000000000)
            ] :
          (typeof(ld_blog_vars) == 'object' && ( // ゲーム
            ld_blog_vars.blog_category.permalink.match(/\/58\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/59\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/60\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/61\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/62\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/201\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/229\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/230\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/231\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/232\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/305\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/320\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/321\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/322\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/329\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/330\//) 
          ) ) ?
           [
              'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001141&encoding=' + ld_category_ad_encoding + '&ord=' + (Math.random()*10000000000)
            ] : 
          (typeof(ld_blog_vars) == 'object' && ( // ヘルス・ビューティ
            ld_blog_vars.blog_category.permalink.match(/\/102\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/103\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/104\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/105\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/106\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/107\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/108\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/297\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/298\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/299\//) ||
            ld_blog_vars.blog_category.permalink.match(/\/309\//) 
          ) ) ?
           [
              'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001149&encoding=' + ld_category_ad_encoding + '&ord=' + (Math.random()*10000000000)
            ] : 
           [ ], // default

	'buffer' : '',
	'dw_save' : '',
	'getAds' : function () {
	    this.callJSONP(this.scripts.shift(), function (json) {
            if (!json) return;
            ld_category_ad_tag = json.tag;
        });
        return false;
	},
	'callJSONP' : function (api_url, cb_func) {
        var uniq_name = 'ld_ads';
        var scr = document.createElement('script');
        scr.type = 'text/javascript';
        scr.charset = this.charset;
        scr.src = api_url + '&callback=' + uniq_name;
        scr.id = uniq_name;
        var obj = this;
        window[uniq_name] = function (json) {
            cb_func(json);
            var u_name = uniq_name;
            setTimeout(function() {
                obj.head.removeChild(document.getElementById(u_name));
                try{
                    window[u_name] = null;
                    delete window[u_name];
                } catch (e) {};
            }, 200);
        };
        
        obj.head = document.getElementsByTagName('head').item(0);
        setTimeout(function(){ obj.head.appendChild(scr); }, 100);
    }
};

ld_blog_ads_dw_buffered.getAds();

// next portion of this script based on:
// domready.js (http://snipplr.com/view/6029/domreadyjs/)
// copyright (c) 2007 Takanori Ishikawa (MIT-style license)
if (typeof Event == 'undefined') Event = new Object();Event.domReady = { add: function(fn) { if (Event.domReady.loaded) return fn(); var observers = Event.domReady.observers; if (!observers) observers = Event.domReady.observers = []; observers[observers.length] = fn; if (Event.domReady.callback) return; Event.domReady.callback = function() { if (Event.domReady.loaded) return; Event.domReady.loaded = true; if (Event.domReady.timer) { clearInterval(Event.domReady.timer); Event.domReady.timer = null; } var observers = Event.domReady.observers; for (var i = 0, length = observers.length; i < length; i++) { var fn = observers[i]; observers[i] = null; fn(); } Event.domReady.callback = Event.domReady.observers = null; }; var ie = !!(window.attachEvent && !window.opera); var webkit = navigator.userAgent.indexOf('AppleWebKit/') > -1; if (document.readyState && webkit) { Event.domReady.timer = setInterval(function() { var state = document.readyState; if (state == 'loaded' || state == 'complete') { Event.domReady.callback(); } }, 50); } else if (document.readyState && ie) { var src = (window.location.protocol == 'https:') ? '://0' : 'javascript:void(0)'; document.write( '<scr'+'ipt type="text/javascript" defer="defer" src="' + src + '" ' +  'onreadystatechange="if (this.readyState == \'complete\') { Event.domReady.timer = setInterval(function() { Event.domReady.callback(); }, 50); }"' +  '><\/scr'+'ipt>');} else { if (window.addEventListener) { document.addEventListener("DOMContentLoaded", Event.domReady.callback, false); window.addEventListener("load", Event.domReady.callback, false); } else if (window.attachEvent) { window.attachEvent('onload', Event.domReady.callback); } else { var fn = window.onload; window.onload = function() { Event.domReady.callback(); if (fn) fn(); } } } } };

(function(){
    var rs = document.getElementById('ad_rs');
	if (typeof(FromSearchEngine) == 'boolean' && FromSearchEngine) {
       google_max_num_ads = '8';
       google_n_ads_rs = '3';
       google_ad_channel = 'blog_search';
	} else {
       google_max_num_ads = '3';
    }
})();


function google_ad_request_done(google_ads) {
    var from_search_engine = (typeof(FromSearchEngine) == 'boolean' && FromSearchEngine) ? true : false;
    Event.domReady.add(
       function(){
	      var s = '';
	      var i;
	      if (google_ads.length == 0)  return;
          var format_ads = function (ads, addiv, adtype){
             return '<div class="adbox" style="cursor: pointer; margin: 5px; padding: 2px 0 2px 18px;" onclick="javascript:'
                + 'if(typeof(blog_counter_adtrk) == \'function\') { blog_counter_adtrk(\''+addiv+'\', \'' + adtype + '\')};'
                + 'window.location.href=\''
		        + ads.url + '\';" onmouseover="adsHover(this,1);" onmouseout="adsHover(this,0);">' 
		        + '<div class="adtop" style="white-space: nowrap; overflow: hidden; width: 100%;"><a class="adtitle" style="text-decoration:none;">'
		        + '<span style="font-size: 14px; font-weight: bold; text-decoration: underline; line-height:200%;">' + ads.line1 + '</span></a>' 
		        + '<a class="adurl" style="text-decoration:none;margin-left:10px;">' 
		        + '<span style="font-size: 11px;">' + ads.visible_url + '</span></a></div>'
 		        + '<a class="addescription" style="text-decoration:none;">'
 		        + '<span style="font-size: 12px;">' + ads.line2 + '&nbsp;' + ads.line3 + '</span></a></div>';
	      };

	      var len = google_ads.length;

	      var rs = document.getElementById('ad_rs');
	      if (from_search_engine && google_ads.length > google_n_ads_rs && rs) {
		     var s2_num = 0;
		     var s2 = '<div class="gAdsense" id="gAdsense_google_jp2" style="margin: 0 auto; padding: 5px; text-align: left;">'
     		    + '<div style="margin:0 15px; font-size: 11px;"><a href="http://www.google.co.jp/intl/ja/ads/" class="adld">Ads by Google<\
/a></div>';
		     for(i=google_n_ads_rs; i < len; i++) {
    	        s2 += format_ads(google_ads[i], 'ad2', 'google');
			    s2_num++;
		     }
		     len -= s2_num;
		     s2 += '</div>';
	      }

	      s +='<div class="gAdsense" id="gAdsense_google_jp" style="margin: 0 auto; padding: 5px; text-align: left;">' +
	'<div style="margin:0 15px; font-size: 11px;"><a href="http://www.google.co.jp/intl/ja/ads/" class="adld">Ads by Google</a></div>';
	      for(i=0; i < len; i++) {
  	         s += format_ads(google_ads[i], (from_search_engine ? 'ad_rs' : 'ad2'), 'google');
	      }
	      s +='</div>';
          s = '<div id="ad">'+s+'</div>';

          s += ld_category_ad_tag;
          s2 += ld_category_ad_tag;
          
          var ad = document.getElementById('ad') || document.getElementById('ad2');
	      if (from_search_engine) {
		     if (rs) { 
                rs.innerHTML =  s;
                rs.style['display'] = 'block';
	            if (ad && s2) {
                   ad.innerHTML = s2;
                   ad.style['display'] = 'block';
                }
             }
	         else if (ad) {
                ad.innerHTML = s;
                ad.style['display'] = 'block';
             }
	      }
	      else { 
             if (ad) {
                ad.innerHTML = s;
                ad.style['display'] = 'block';
             }
//             else if (rs) { 
//                rs.innerHTML = s;
//                rs.style['display'] = 'block';
//             }
          }
	      return;

       });
}

function adsHover(e,f){
   e.style.background = f ? '#ffffbb' : '';
   e.style.border = f ? '1px solid #ffffbb' : '0';
   e.style.padding = f ? '1px 0 1px 17px' : '2px 0 2px 18px';
   e.className = f ? 'adhover' : 'adbox';
}

document.write('<scr'+'ipt type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></scr'+'ipt>');
