/************************************************************
 * @name	:	Add AFC Ffrom Search
 * @author	:	Nifty Corporation
 ************************************************************/
google_ad_client = 'ca-nifty-cocolog-user_js';
google_ad_output = 'js';
google_max_num_ads = 4;
google_language = 'ja';
google_encoding = 'utf8';
google_safe = 'high';
google_ad_channel = 'pleasy';
google_adtest = 'off';

AAFS_google_max_num_ads = '7';
AAFS_google_ad_top_num = '3';

var AAFS = function(){ this.init();};

AAFS.prototype = {
    isSuccess : false,
    engines :
    //search engine list
    {"http://www.google.com/search"				: {"qparam" : "q", "qcparam" : "ie", "qcdef" : "utf-8"},
     "http://www.google.co.jp/search"			: {"qparam" : "q", "qcparam" : "ie", "qcdef" : "utf-8"},
     "http://search.yahoo.co.jp/search"			: {"qparam" : "p", "qcparam" : "ei", "qcdef" : "utf-8"},
     "http://search.nifty.com/cgi-bin/search.cgi"		: {"qparam" : "Text", "qcparam" : "ie", "qcdef" : "euc-jp"},
     "http://azby.search.nifty.com/cgi-bin/search.cgi"	: {"qparam" : "Text", "qcparam" : "ie", "qcdef" : "euc-jp"},
     "http://cgi.search.biglobe.ne.jp/cgi-bin/search_bl_top": {"qparam" : "q", "qcparam" : "", "qcdef" : "euc-jp"},
     "http://cgi.search.biglobe.ne.jp/cgi-bin/search2-b"	: {"qparam" : "q", "qcparam" : "", "qcdef" : "shift_jis"},
     "http://search.msn.co.jp/results.aspx"			: {"qparam" : "q", "qcparam" : "", "qcdef" : "utf-8"},
     "http://search.live.com/results.aspx"			: {"qparam" : "q", "qcparam" : "", "qcdef" : "utf-8"},
     "http://search.goo.ne.jp/web.jsp"			: {"qparam" : "MT", "qcparam" : "IE", "qcdef" : "euc-jp"},
     "http://ocnsearch.goo.ne.jp/ocn.jsp"			: {"qparam" : "MT", "qcparam" : "IE", "qcdef" : "euc-jp"},
     "http://www.excite.co.jp/search.gw"			: {"qparam" : "search", "qcparam" : "", "qcdef" : "shift_jis"}
    },

    //sanitize function
    sanitize : function(str){
	return str.replace(/[\\\'\"&<>]/g, '');
    },

    //search queries
    qs : new Array(),

    init : function(){
	if(!this.parseReferrer())
	    if(!this.createAdDiv()){
		this.setGoogleParams();
		this.isSuccess = true;
	    }
    },

    //parse referrer and extract search query
    parseReferrer : function(){
    	if (document.referrer) {
    	    var ref = document.referrer.split('?');

	    var engine = this.engines[ref[0]];

	    //if engines is entried
	    if(engine){
		var datas = ref[1].split('&');
		
		var querystr = '';
		var qcode = engine.qcdef;

		for(var i = 0; i < datas.length; i++){
		    var data = datas[i].split('=');
		    
		    if(data[0] == engine.qparam){
			if(querystr == '')
			    querystr = data[1];
		    }
		}

		//if query exists
		if(querystr != ''){
		    try{
			//if qcode is utf-8
			if(qcode == 'utf-8'){
 			    var queries = querystr.split(/[\+\s]+|(%E3%80%80)+/);

			    for(var i = 0; i < queries.length; i++){
				var query = this.sanitize(decodeURIComponent(queries[i]));
				if(!query.match(/^((\s)|(%E3%80%80))*$/))
				    this.qs.push(query);
			    }
			}
		    }catch(ex){
			return -1;
		    }
		}
	    }	 
	}
	if(this.qs.length > 0) return 0;
	else return -1;
    },

    setGoogleParams : function(){
	if(this.qs.length > 0){
	    google_hints = this.qs.join(',');
	    google_max_num_ads = AAFS_google_max_num_ads;
	}
    },

    isSearchFrom :function(){
        if(this.qs.length > 0){
            return true;
        }else{
            return false;
        }
    },
    
    createAdDiv : function(){
	try{
	    document.write('<div id="google_ads_pivot"></div>');
	    var DS = document.getElementById('google_ads_pivot').parentNode.getElementsByTagName('div');
	    var CN = (document.getElementById('google_ads_pivot').parentNode.className == 'entry') ? 'entry-body-text' : 'entry-body';
	    var ED = document.createElement('div'); ED.id = 'google_ads_top_entry';
	    ED.style.marginBottom = '30px';
	    
	    for(var i = 0, l = DS.length; i < l; i++)
		if(DS[i].className == CN){
		    DS[i].insertBefore(ED, DS[i].firstChild);
		    break;    }
	    if(document.getElementById('google_ads_top_entry')) return 0;
	    else return -1;
	}catch(ex){
	    return -1;
	}
    },

   isOriginalTemplate : function(){
       try{
           if(document.body.className.search(/^layout/) != -1) {
               return true;
           } else {
               return false;
           }
       }catch(ex){
           return false;
       }
   },

   isIe  :function() {
     return document.documentElement.getAttribute("style") == document.documentElement.style;
   },

   isBlackBackGround : function() {
      if(this.isIe()){
          if( this.getContentColor() == '#000000' || ( this.getContentColor == 'transparent' && aafs.gEBC('container') == '#000000' ) ){
               return true;
           } else {
               return false;
           }
      } else {
          if( this.getContentColor() == 'rgb(0, 0, 0)' ||
                ( (this.getContentColor == 'transparent' || this.getContentColor == 'rgba(0, 0, 0, 0)') && aafs.gEBC('container') == 'rgb(0, 0, 0)' ) ){
               return true;
           } else {
               return false;
           }
      }

   },


   changeBlackBackGround : function() {
      if( this.isBlackBackGround() ) {
        this.changeAdHoverBackground('#181818');
      } else if(aafs.getEntryBodyTextColor() == 'rgb(255, 255, 255)' || aafs.getEntryBodyTextColor().toLowerCase() == '#ffffff')  {
        this.changeAdHoverBackground('#999966');
      } else {
         return false;
      }
   },


   getContentColor : function() {
      var divElements = document.getElementsByTagName('div');
      for(var i=0; i<divElements.length; i++){
         if(divElements[i].className == 'content') {
           return (divElements[i].currentStyle || document.defaultView.getComputedStyle(divElements[i], '') ).backgroundColor
         }
      }
   },

   getEntryBodyTextColor : function(){
      var divElements = document.getElementsByTagName('div');
      for(var i=0; divElements.length; i++) {
        if(divElements[i].className == 'entry-body-text') {
          return (divElements[i].currentStyle || document.defaultView.getComputedStyle(divElements[i], '')).color;
        }
      }
    },


   gEBC : function(id) {
      var element = document.getElementById(id);
      return (element.currentStyle || document.defaultView.getComputedStyle(element, '') ).backgroundColor;
   },


   adLine2EntryBodyText : function() {
      var span_tags = document.getElementsByTagName('span');
      for(var i=0; i<span_tags.length; i++){
          if(span_tags[i].className == 'ad_line'){
               span_tags[i].style.color = this.getEntryBodyTextColor();
          }
      }
   },

   changeAdHoverBackground : function(newColor) {
    var dtElements = document.getElementsByTagName('dt');
    for(var i=0; i<dtElements.length; i++){
        dtElements[i].getElementsByTagName('a')[0].onmouseover = function() {
                this.style.backgroundColor = newColor;
        };
        dtElements[i].getElementsByTagName('a')[0].onmouseout = function() {
                this.style.backgroundColor = 'transparent';
        };
    }
  },


   isRichTemplate : function(){
       try{
           if(document.getElementsByTagName('link')[1].getAttribute('href').search(/^http:\/\/template.cocolog-nifty.com\/.+\/component\/styles.css$/) != -1 || location.href.search(/^http:\/\/template.cocolog-nifty.com\/000/) != -1) {
               return true;
           } else {
               return false;
           }
       }catch(ex){
           return false;
       }
   }
};

//analyze search query
var aafs = new AAFS();
//callback method from google adsense
function google_ad_request_done() {
   if (google_ads.length > 0) {

       //Adsense string in bottom
       var AAFS_BTM = '';
       

			 if(aafs.isRichTemplate()) {
					AAFS_BTM = '<div id="mafc_default" class="entry-more"><div class="ads entry-more-text"><div class="ad_header">Sponsored Link</div><dl>';
			 } else if(aafs.isOriginalTemplate()){
				 //cocolog specific
				 AAFS_BTM += '<div class="entry-more adsense" style="text-align:left;display:block !important;overflow:visible !important;position:static !important;"><div class="entry-more-text" style="display:block !important;overflow:visible !important;position:static !important;">'
					 + '<div style="font-weight:bold;padding-bottom:0.2em;display:block !important;overflow:visible !important;position:static !important;">Sponsored Link</div>'
					 + '<div style="display:block !important;overflow:visible !important;position:static !important;">';
			 } else {
                                AAFS_BTM = '<div id="mafc_default" class="entry-more"><div class="ads entry-more-text"><div class="ad_header">Sponsored Link</div><dl>';
                        }

       //Adsense logo in top
       var AAFS_TP_ADS = '';

       for (i = 0; i < google_ads.length; i++) {
	   //alert(aafs.qs.length+'\n'+document.getElementById('google_ads_top_entry')+'\n'+AAFS_google_ad_top_num);
	   if(aafs.isSuccess && document.getElementById('google_ads_top_entry') && i < AAFS_google_ad_top_num){
	       if(i == 0)
       		    if(aafs.isRichTemplate()) {
             		AAFS_TP_ADS = '<div id="mafc_default"><div class="ads entry-more-text"><div class="ad_header">Sponsored Link</div><dl>';
           	} else if(aafs.isOriginalTemplate()){
              		AAFS_TP_ADS = '<div style="padding-top:20px;font-weight:bold;padding-bottom:0.2em;display:block !important;overflow:visible !important;position:static !important;">Sponsored Link</div>'
              		+ '<div style="display:block !important;overflow:visible !important;position:static !important;">';
       		}else{
                      AAFS_TP_ADS = '<div id="mafc_default"><div class="ads entry-more-text"><div class="ad_header">Sponsored Link</div><dl>';
                }


		if(aafs.isRichTemplate()) {
	           AAFS_TP_ADS += '<dt class="optimized">'
       		+ '<a href="' + google_ads[i].url + '">'
       	        + '<span class="ad_title">' + google_ads[i].line1 + '</span>&nbsp;&nbsp;<span class="ad_url">' + google_ads[i].visible_url + '</span><br>'
                + '<span class="ad_line">' + google_ads[i].line2 + google_ads[i].line3 + '</span>'
                + '</a>'
                + '</dt>';


		} else if (aafs.isOriginalTemplate()) {
 	       AAFS_TP_ADS
 		   += '<div style="margin-left:1em;padding-bottom:0.5em;display:block !important;overflow:visible !important;position:static !important;">'
		   + '<span class="ad_title" style="font-weight:bold;line-height:120%;display:block !important;overflow:visible !important;display:inline !important;position:static !important;">'
		   + '<a style="display:block !important;overflow:visible !important;display:inline !important;" href="' + google_ads[i].url + '">' + google_ads[i].line1 + '</a></span>'
		   + ' <span class="ad_url" style="font-size:x-small;display:block !important;overflow:visible !important;display:inline !important;position:static !important;">'
                   + '<a style="overflow:visible !important;display:inline !important;position:static !important;font-weight:normal !important; text-decoration: none !important;" href="' + google_ads[i].url + '">' + google_ads[i].visible_url + '</a></span>'
		   + '<br />'
		   + '<span class="ad_txt" style="line-height:120%;display:block !important;overflow:visible !important;display:inline !important;position:static !important;">'
		   + '<a style="overflow:visible !important;display:inline !important;position:static !important; font-weight:normal !important; text-decoration: none !important;" href="' + google_ads[i].url + '">' + google_ads[i].line2 + '&nbsp;' + google_ads[i].line3 + '</a></span>'
		   + '<span style="display:none;">&nbsp;</span></div>';
       } else {
               AAFS_TP_ADS += '<dt class="optimized">'
                + '<a class="ad_link" href="' + google_ads[i].url + '">'
                + '<span class="ad_title">' + google_ads[i].line1 + '</span>&nbsp;&nbsp;<span class="ad_url">' + google_ads[i].visible_url + '</span><br>'
                + '<span class="ad_line">' + google_ads[i].line2 + google_ads[i].line3 + '</span>'
                + '</a>'
                + '</dt>';
       }
	   if(i == (AAFS_google_ad_top_num - 1)){
		//alert(AAFS_TP_ADS);
		   if(aafs.isRichTemplate()) {
			   document.getElementById('google_ads_top_entry').innerHTML = AAFS_TP_ADS + '</dl></div></div>';
		   } else if(aafs.isOriginalTemplate()){
			   document.getElementById('google_ads_top_entry').innerHTML = AAFS_TP_ADS + '</div>';
		   } else {
                           document.getElementById('google_ads_top_entry').innerHTML = AAFS_TP_ADS + '</dl></div></div>';
                   }

	   }
	   }else{
		if(aafs.isRichTemplate()) {
			AAFS_BTM += '<dt class="optimized">'
				+ '<a href="' + google_ads[i].url + '">'
				+ '<span class="ad_title">' + google_ads[i].line1 + '</span>&nbsp;&nbsp;<span class="ad_url">' + google_ads[i].visible_url + '</span><br>'
				+ '<span class="ad_line">' + google_ads[i].line2 + google_ads[i].line3 + '</span>'
				+ '</a>'
				+ '</dt>';

		} else if (aafs.isOriginalTemplate()) {
	       AAFS_BTM += '<div style="margin-left:1em;padding-bottom:0.5em;display:block !important;overflow:visible !important;position:static !important;">'
		   + '<span class="ad_title" style="line-height:120%;display:block !important;overflow:visible !important;display:inline !important;position:static !important;">'
		   + '<a style="font-weight:bold !important;display:block !important;overflow:visible !important;display:inline !important;" href="' + google_ads[i].url + '">' + google_ads[i].line1 + '</a></span>'
		   + ' <span class="ad_url" style="font-size:x-small;display:block !important;overflow:visible !important;display:inline !important;position:static !important;">'
                   + '<a style="overflow:visible !important;display:inline !important;position:static !important;font-weight:normal !important;text-decoration: none !important;" href="' + google_ads[i].url + '">' + google_ads[i].visible_url + '</a></span>'
		   + '<br />'
		   + '<span class="ad_txt" style="line-height:120%;display:block !important;overflow:visible !important;display:inline !important;position:static !important;">'
		   + '<a style="overflow:visible !important;display:inline !important;position:static !important;font-weight:normal !important;text-decoration: none !important;" href="' + google_ads[i].url + '">' + google_ads[i].line2 + '&nbsp;' + google_ads[i].line3 + '</a></span>'
		   + '<span style="display:none;">&nbsp;</span></div>';
               } else {
                       AAFS_BTM += '<dt class="optimized">'
                               + '<a class="ad_link" href="' + google_ads[i].url + '">'
                               + '<span class="ad_title">' + google_ads[i].line1 + '</span>&nbsp;&nbsp;<span class="ad_url">' + google_ads[i].visible_url + '</span><br>'
                               + '<span class="ad_line">' + google_ads[i].line2 + google_ads[i].line3 + '</span>'
                               + '</a>'
                               + '</dt>';
               }
	   }
       }
       
			 if(aafs.isRichTemplate()) {
					AAFS_BTM += '</dl></div></div>';
			 } else if(aafs.isOriginalTemplate()){
				 AAFS_BTM += '<span style="display:none;">&nbsp;</span></div></div></div>';
			 } else {
					AAFS_BTM += '</dl></div></div>';
                         }
       document.write(AAFS_BTM);
   }else{
       var AAFS_BTM = '';
       if(aafs.isOriginalTemplate()) {
       AAFS_BTM += '<div class="entry-more adsense" style="text-align:left;display:block !important;overflow:visible !important;position:static !important;"><div class="entry-more-text" style="display:block !important;overflow:visible !important;position:static !important;">'
	   + '<div style="padding-top:20px;font-weight:bold;padding-bottom:0.2em;display:block !important;overflow:visible !important;position:static !important;">--- PR ---</div>'
	   + '<div style="display:block !important;overflow:visible !important;position:static !important;">'

	   + '<div style="margin-left:1em;padding-bottom:0.5em;display:block !important;overflow:visible !important;position:static !important;">'

	   + '<span class="ad_title" style="line-height:120%;display:block !important;overflow:visible !important;display:inline !important;position:static !important;"><a style="display:block !important;overflow:visible !important;display:inline !important;" href="http://www.cocolog-nifty.com/">ココログで無料ブログを作ろう</a></span>'
	   + ' <span class="ad_url" style="font-size:x-small;display:block !important;overflow:visible !important;display:inline !important;position:static !important;">'
           + '<a style="overflow:visible !important;display:inline !important;position:static !important;font-weight:normal !important; text-decoration: none !important;" href="http://www.cocolog-nifty.com/">www.cocolog-nifty.com</a></span>'
	   + '<br />'

	   + '<span class="ad_txt" style="font-weight:bold !important;line-height:120%;display:block !important;overflow:visible !important;display:inline !important;position:static !important;">'
           + '<a style="overflow:visible !important;display:inline !important;position:static !important;font-weight:normal !important; text-decoration: none !important;" href="http://www.cocolog-nifty.com/">眞鍋かをりさんも愛用する「ココログ」で、今すぐブログを始めよう！</a></span>'
	   
	   + '<span style="display:none;">&nbsp;</span></div>'

	   + '<span style="display:none;">&nbsp;</span></div>'
	   + '</div></div>';
       } else {
       AAFS_BTM += '<div class="entry-more adsense" style="text-align:left;display:block !important;overflow:visible !important;position:static !important;"><div class="entry-more-text" style="display:block !important;overflow:visible !important;position:static !important;">'
	   + '<div style="padding-top:20px;font-weight:bold;padding-bottom:0.2em;display:block !important;overflow:visible !important;position:static !important;">--- PR ---</div>'
	   + '<div style="display:block !important;overflow:visible !important;position:static !important;">'

	   + '<div style="margin-left:1em;padding-bottom:0.5em;display:block !important;overflow:visible !important;position:static !important;">'

	   + '<span style="line-height:120%;display:block !important;overflow:visible !important;display:inline !important;position:static !important;text-decoration:underline !important;"><a style="display:block !important;overflow:visible !important;display:inline !important;" href="http://www.cocolog-nifty.com/">ココログで無料ブログを作ろう</a></span>'
	   + ' <span style="font-size:x-small;display:block !important;overflow:visible !important;display:inline !important;position:static !important;">www.cocolog-nifty.com</span>'
	   + '<br />'

	   + '<span style="font-weight:bold !important;line-height:120%;display:block !important;overflow:visible !important;display:inline !important;position:static !important;">眞鍋かをりさんも愛用する「ココログ」で、今すぐブログを始めよう！</span>'
	   
	   + '<span style="display:none;">&nbsp;</span></div>'

	   + '<span style="display:none;">&nbsp;</span></div>'
	   + '</div></div>';
       }
       document.write(AAFS_BTM);
   }

   if(!aafs.isRichTemplate() && !aafs.isOriginalTemplate()){
           aafs.adLine2EntryBodyText(); 
           aafs.changeBlackBackGround();
   }

}
document.write('<script type="text/javascript" language="JavaScript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>');
