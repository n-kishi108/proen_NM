/*
 *  Extract Search Query
 *  Copyright (C) Seesaa Inc. 2009
 *  All rights reserved.
 *  Usage: var sq = new seesaaExtractSearchQuery();
 *         var q = sq.ex('http://www.google.com/search?hl=ja&q=%E3%82%B7%E3%83%BC%E3%82%B5%E3%83%BC&btnG=Google+%E6%A4%9C%E7%B4%A2&lr=&aq=f&oq=');
 */

function seesaaExtractSearchQuery () {
  this.initialize.apply(this, arguments);
}

seesaaExtractSearchQuery.prototype = {
  initialize: function (args) {
    if(args){
    }
  },
  getQueryStringParameter: function (paramName, url) {
    /*
      Copyright (c) 2008, Yahoo! Inc. All rights reserved.
      Code licensed under the BSD License:
      http://developer.yahoo.net/yui/license.txt
      version: 2.5.2
    */
    var i, len, idx, queryString, params, tokens;

    url = url || top.location.href;

    idx = url.indexOf("?");
    queryString = idx >= 0 ? url.substr(idx + 1) : url;

    // Remove the hash if any
    idx = queryString.lastIndexOf("#");
    queryString = idx >= 0 ? queryString.substr(0, idx) : queryString;

    params = queryString.split("&");

    for (i = 0, len = params.length; i < len; i++) {
      tokens = params[i].split("=");
      if (tokens.length >= 2) {
	if (tokens[0] === paramName) {
	  //	  return unescape(tokens[1]);
	  return tokens[1];
	}
      }
    }

    return null;
  },
  getSearchEngine: function (url) {
    var searchEngines = [ {
      name  : 'yahoo_japan',
      regex : '^http://(blog-)?search\.yahoo\.co\.jp/search',
      query : 'p',
      charset_query   : 'ei',
      default_charset : 'euc'
    },{
      name  : 'yahoo_japan',
      regex : '^http://search\.yahoo\.co\.jp/bin/(search|query)',
      query : 'p',
      charset_query   : 'ei',
      default_charset : 'euc'
    },{
      name  : 'google',
      regex : '^http://www\.google\.(com|co\.jp)/search',
      query : 'q',
      charset_query   : 'ie',
      default_charset : ''
    },{
      name  : 'biglobe',
      regex : '^http://cgi\.search\.biglobe\.ne\.jp/cgi-bin/(search2-b|search_bl_top)',
      query : 'q',
      charset_query   : '',
      default_charset : 'euc'
    },{
      name  : 'nifty',
      regex : '^http://(azby\.)?search\.nifty\.com/cgi-bin/search\.cgi',
      query : 'Text',
      charset_query   : '',
      default_charset : 'euc'
    },{
      name  : 'excite',
      regex : '^http://(.*)\.excite\.co\.jp/search\.gw',
      query : 'search',
      charset_query   : '',
      default_charset : 'sjis'
    },{
      name  : 'goo',
      regex : '^http://search\.goo\.ne\.jp/web\.jsp',
      query : 'MT',
      charset_query   : 'IE',
      default_charset : 'euc'
    },{
      name  : 'WindowsLive',
      regex : '^http://search\.live\.com/(sp)?results\.aspx',
      query : 'q',
      charset_query   : '',
      default_charset : 'utf8'
    },{
      name  : 'infoseek',
      regex : '^http://search\.www\.infoseek\.co\.jp/Seek',
      query : 'qt'
    },{
      name  : 'Seesaa',
      regex : '^http://blog\.seesaa\.jp/pages/search/list',
      query : 'q'
    },{
      name  : 'livedoor',
      regex : '^http://(sf|search)\.livedoor\.com/search',
      query : 'q',
      charset_query   : 'ie',
      default_charset : 'utf8'
    },{
      name  : 'Ask.jp',
      regex : '^http://ask\.jp/(blog|web)\.asp',
      query : 'q',
      charset_query   : '',
      default_charset : 'utf8'
    },{
      name  : 'MSN',
      regex : '^http://search\.msn\.co\.jp/(sp)?results\.aspx',
      query : 'q'
    },{
      name  : 'So-net',
      regex : '^http://www\.so-net\.ne\.jp/search/web/',
      query : 'query',
      charset_query   : '',
      default_charset : 'utf8'
    } ];
    for(var i=0;i<searchEngines.length;i++){
      var engine = searchEngines[i];
      if(url.match(engine.regex)){
	return engine;
      }
    }
  },
  ex: function (url) {
    var engine = this.getSearchEngine(url);
    if(engine){
      var charset = this.convCharsetQuery(this.getQueryStringParameter(engine.charset_query, url))
	|| engine.default_charset
	|| 'utf8';
      return { query: this.getQueryStringParameter(engine.query, url), charset:charset, engine: engine.name };
    }
  },
  convCharsetQuery: function (code) {
    if(code){
      if(code.match(/utf-8/i))     return 'utf8';
      if(code.match(/euc-jp/i))    return 'euc';
      if(code.match(/shift_jis/i)) return 'sjis';
      if(code.match(/x-sjis/i))    return 'sjis';
    }
  },
  END:""
}


/*
 *  Copyright (C) Seesaa Inc. 2008
 *  All rights reserved.
 */

if(typeof seesaaInterestMatchScriptLoading == 'undefined')
  var seesaaInterestMatchScriptLoading = false;

function seesaaInterestMatchInterface () {
  this.initialize.apply(this, arguments);
}

seesaaInterestMatchInterface.prototype = {
  initialize: function (args) {
    if(args){
      this.id  = args.id;
      this.c   = args.c;
      this.img = args.img;
      this.imSource = args.imSource;
      this.imType   = args.imType;
      this.ctxtId   = args.ctxtId;
      this.ctxtKeywords = args.ctxtKeywords;
      this.traceClick   = args.traceClick;
      this.loadTwice    = args.loadTwice;
      this.grokIM       = args.grokIM;
      this.params       = args.params;
      this.preload      = window.onload;
      this.failedFirst  = false;
      this.loadCounter  = 0;
      this.isSSL        = ("https:" == document.location.protocol);
      this.ads          = [];
    }
  },
  ce: function (tag, attr, innerTxt) {
    var ele = document.createElement(tag);
    if(attr){
      if("id" in attr) {
	ele.setAttribute("id", attr["id"]);
      }
      if("class" in attr) {
	ele.className = attr["class"];
      }
    }
    if(innerTxt)
      ele.appendChild(document.createTextNode(innerTxt));
    return ele;
  },
  showListings: function () {
    var container = this.ce('div');

    var i=6;
    if(typeof zSr != "undefined"){
      while (i < zSr.length) {
	var text    = zSr[i++];
	var unused1  = zSr[i++];
	var url      = zSr[i++];
	var title    = zSr[i++];
	var sitehost = zSr[i++];
	var unused2  = zSr[i++];
	this.ads.push([ title, text, url, sitehost ]);
      }
      zSr = new Array();
    }

    if(this.ads.length == 0 && this.loadTwice && this.failedFirst == false){
      this.failedFirst = true;
      this.loadIM();
      return;
    }

    this.constructHeader(container);
    this.constructListing(container);
    this.constructFooter(container);
      
    var self = this;
    setTimeout(function () {
      var div = document.getElementById(self.id);
      if(div){
	if(div.firstChild){
	  div.replaceChild(container, div.firstChild);
	}
	else {
	  div.appendChild(container);
	}
	self.afterShowListings();
      }
    }, 100);
    seesaaInterestMatchScriptLoading = false;
    this.loadCounter++;
  },
  adboxOrder: function () { return [ 'title', 'text', 'url' ] },
  constructListing: function (container) {
    var listing = this.ce('div', { "class": "seesaa-adBox" });

    var line = this.ce('div', { "class": "adHr" });
    for(var i=0;i<this.ads.length;i++){
      if(i==0) container.appendChild(line);
      var title    = this.ads[i][0];
      var text     = this.ads[i][1];
      var url      = this.ads[i][2];
      var sitehost = this.ads[i][3];

      if(this.traceClick){
	url = this.addRedirector(url);
      }

      var link = this.ce('a', { "class": "seesaa-adLink" });

      link.href = url;
      link.target = '_blank';
      link.title  = text;

      if(this.img){
	var imgHost = this.isSSL ? "https://ssl.seesaa.jp/match" : "http://match.seesaa.jp";
	var image = this.ce('span', { "class" : "adImage" });
	var img     = this.ce('img');
	img.src     = imgHost + '/sitethumb.pl?url=' + encodeURIComponent(sitehost);
	img.onclick = 'window.open("\'' + url + '\' ,\'_blank\')"';
	image.appendChild(img);
	link.appendChild(image);
      }
      
      var box = this.ce('span', { "class": "adBox" });
      var order = this.adboxOrder();
      for(var j=0;j<order.length;j++){
	switch(order[j]){
	case 'title':
	  box.appendChild(this.ce('span', { "class": "adTitle" }, title));
	  break;
	case 'text':
	  box.appendChild(this.ce('span', { "class": "adText"  }, text));
	  break;
	case 'url':
	  box.appendChild(this.ce('span', { "class": "adUrl"   }, sitehost));
	  break;
	}
      }
      link.appendChild(box);
      link.appendChild(this.ce('span', { "class": "adBoth" }));
      listing.appendChild(link);
      listing.appendChild(line.cloneNode(true));

      if((i + 1) % 2 == 0){
	listing.appendChild(this.ce('span', { "class": "adBoth2" }));
      }
    }

    for(var i=this.ads.length;i<this.c;i++){
      var empty = this.emptyListing();
      if(empty) {
	if(i==0) container.appendChild(line);
        listing.appendChild(empty, i);
	listing.appendChild(line.cloneNode(true));
      }
    }

    listing.appendChild(this.ce('span', { "class": "adBoth" }));
    container.appendChild(listing);
  },
  constructHeader: function (container) {
  },
  sponsorText: "インタレストマッチ − 広告掲載について",
  sponsorUrl: "http://www.seesaa.co.jp/service/sponsor_guide.html",
  constructFooter: function (container) {
    if(this.ads.length){
      var spo = this.ce('span', { "class": "adSponsor" });
      var spoLink = this.ce('a', { "class": "adSponsorUrl" }, this.sponsorText);
      spoLink.href   = this.sponsorUrl;
      spoLink.target = '_blank';
      spo.appendChild(spoLink);
      
      container.appendChild(this.ce('span', { "class": "adBoth" }));
      container.appendChild(spo);
    }
  },
  emptyListing: function () {
  },
  afterShowListings: function () {
  },
  show: function () {
    if(seesaaInterestMatchScriptLoading){
      var self = this;
      setTimeout(function () { self.show() }, 100);
      this.loadCounter++;
    }
    else {
      if(this.loadCounter < 100){
	seesaaInterestMatchScriptLoading = true;
	this.loadIM();
      }
      if(this.loadCounter > 100){
	seesaaInterestMatchScriptLoading = false;
      }
    }
  },
  addRedirector: function (url) {
    return url;
  },
  imUrl: function () {
    if(this.grokIM && grokIMResult){
      this.ctxtKeywords = grokIMResult.keywords;
      this.ctxtId       = grokIMResult.ctxtId;
    }

    var imUrl = (this.isSSL ? 'https://ssl.seesaa.jp/ov_js_flat/?' : 'http://im.seesaa.ov.yahoo.co.jp/js_flat/?')
    + 'source=' + this.imSource
    + '&type='  + this.imType
    + '&ctxtKeywords=' + encodeURIComponent(this.ctxtKeywords.join(','))
    + '&ctxtId='       + encodeURIComponent(this.ctxtId)
    + '&ctxtUrl='      + encodeURIComponent(this.mkCtxtUrl())
    + '&ctxtCat=default_cat'
    + '&keywordCharEnc=utf8'
    + '&outputCharEnc=utf8'
    + '&maxCount=' + this.c
    + '&t='        + (new Date()).getTime()
    + '';
    return imUrl;
  },
  mkCtxtUrl: function () {
    return document.location.href;
  },
  grokIMTargetText: function () {
    var head = document.getElementsByTagName('head')[0];
    var text = [];
    if(head){
      var title = head.getElementsByTagName('title')[0];
      if(title)
	text.push(title.textContent);

      var meta = head.getElementsByTagName('meta');
      for (var i=0;i<meta.length;i++){
	if(meta[i].name == 'description')
	  text.push(meta[i].content);
      }
    }
    return new String(text.join(' '));
  },
  loadIM: function () {
    if(this.grokIM){
      var host = this.isSSL ? "https://ssl.seesaa.jp/match" : "http://match.seesaa.jp";
      var body = this.grokIMTargetText();
      if(body && body.length && body.length > 128){
	body = body.substr(0, 128);
      }
      var sUrl = host + '/kizasi/grokIM.pl?'
      + 'source=' + this.imSource
      + '&body='  + encodeURIComponent(body)
      + '&t='     + (new Date()).getTime()
      + '';
      var self = this;
      this.loadScript(sUrl, function () { self.loadIMScript(); });
    }
    else {
      this.loadIMScript();
    }
  },
  loadIMScript: function () {
    var scriptUrl = this.imUrl();
    if(scriptUrl){
      var self  = this;
      this.loadScript(scriptUrl, function () { self.showListings(); });
    }
    else {
	seesaaInterestMatchScriptLoading = false;
    }
    if(this.preload)
      this.preload();
  },
  loadScript: function (sUrl, onload) {
    var s     = document.createElement('script');
    s.src     = sUrl;
    s.type    = 'text/javascript';
    s.charset = 'utf-8';
    s.onload  = onload;
    
    if( document.all ){
      s.onreadystatechange = function () {
	switch(s.readyState) {
	  case 'loaded' :
	  s.onload();
	  break;
	}
      };
    }
    document.body.appendChild(s);
  },
  END:""
};


var seesaaInterestMatchInterfaceViaSearch = function () {
  this.initialize.apply(this, arguments);
};
seesaaInterestMatchInterfaceViaSearch.prototype = new seesaaInterestMatchInterface();

seesaaInterestMatchInterfaceViaSearch.prototype.sponsorText = "スポンサーサイト";
seesaaInterestMatchInterfaceViaSearch.prototype.imUrl = function () {
  var sq = new seesaaExtractSearchQuery();
    var search = sq.ex(document.referrer);
    if(search){
    search.query = search.query.replace(/site%3a[^ |\+]+/i, '');

    var imUrl = 'http://match.seesaa.jp/ot_square.pl?'
      + 'hid='  + this.params['hid']
      + '&tid=' + 'js_flat'
      + '&k='   + search.query
      + '&ic='  + search.charset
      + '&c='   + this.c
      + '&serveUrl=' + encodeURIComponent(document.location.href)
      + '&t='   + (new Date()).getTime()
      + '';
    return imUrl;
  }
};
seesaaInterestMatchInterfaceViaSearch.prototype.constructHeader = function (container) {
    if(this.ads.length){
      var spo = this.ce('span', { "class": "adSponsor" });
      var spoLink = this.ce('a', { "class": "adSponsorUrl" }, "スポンサーサイト");
      spoLink.href   = 'http://www.seesaa.co.jp/service/sponsor_guide.html';
      spoLink.target = '_blank';
      spo.appendChild(spoLink);
      
      container.appendChild(this.ce('span', { "class": "adBoth" }));
      container.appendChild(spo);
    }
};
seesaaInterestMatchInterfaceViaSearch.prototype.constructFooter = function (container) {};
seesaaInterestMatchInterfaceViaSearch.prototype.afterShowListings = function () {
  var container = document.getElementById(this.id);
  if(container)
    container.style.display = 'block';
};

var seesaa_other_params = { hid:seesaa_hostsite_id };
var seesaa_im_source    = 'partner_test';
var seesaa_id           = 'viasearch-ad-area';
var seesaa_css_path     = 'http://match.seesaa.jp/css/seesaa/viasearch/index.css';

if(typeof seesaa_css_path != "undefined")
  document.write('<link rel="stylesheet" href="' + seesaa_css_path + '" type="text/css" />');

if(typeof seesaaImContainer == "undefined") {
  seesaaImContainer = {};
  seesaaImContainerCounter = 0;
  seesaaImContainerMaker = function () {
    seesaaImContainerCounter = seesaaImContainerCounter + 1;
    seesaa_id = 'seesaa-im-container-' + seesaaImContainerCounter;
    seesaaImContainer[seesaa_id] = true;
    document.write('<div id="' + seesaa_id + '" class="' + seesaa_css_class + '"></div>');
  }
}

(function () {
  if(typeof seesaa_id == "undefined"){
    seesaaImContainerMaker();
  }
  else {
    var container = document.getElementById(seesaa_id);
    if(container && seesaa_id in seesaaImContainer){
      if(seesaaImContainer[seesaa_id] == false){
	seesaa_css_class = container.className;
      }
      seesaaImContainerMaker();
    }
    else {
      seesaaImContainer[seesaa_id] = false;
    }
  }
  
  var args = {
    "imSource" : seesaa_im_source,
    "imType"   :"",
    "id"  : seesaa_id,
    "c"   : seesaa_adcount,
    "img" : false,
    "ctxtId" : "",
    "ctxtKeywords" : [],
    "traceClick" : false,
    "loadTwice"  : false,
    "grokIM"     : false,
    "params"     : {}
  };

  function seesaaRandomChoice (arr, c) {
    var list = [];
    while (list.length < c) {
      list.push(arr.splice(Math.floor(Math.random() * arr.length), 1));
    }
    return c == 1 ? list[0] : list;
  }

  if(typeof seesaa_gid_candidate != "undefined"){
    seesaa_gid = seesaaRandomChoice(seesaa_gid_candidate.split(' '), 1);
  }

  if(typeof seesaa_image        != "undefined") args.img          = seesaa_image;
  if(typeof seesaa_im_type      != "undefined") args.imType       = seesaa_im_type;
  if(typeof seesaa_gid          != "undefined") args.ctxtId       = seesaa_gid;
  if(typeof seesaa_keyword_list != "undefined") args.ctxtKeywords = seesaa_keyword_list;
  if(typeof seesaa_other_params != "undefined") args.params       = seesaa_other_params;

  var simf = new seesaaInterestMatchInterfaceViaSearch(args);
  window.onload = function () { simf.show(); };
})();

document.write(''
	       + '<style type="text/css">\n'
	       + '#viasearch-ad-area { width:' + (seesaa_template_id == '4001' ? '380px' : '300px') + ';}\n' 
	       + '#viasearch-ad-area .seesaa-adLink,'
	       + '#viasearch-ad-area .adHr {'
	       + 'background-color:#' + seesaa_bg_color + ';'
	       + '}\n'
	       + '#viasearch-ad-area .adTitle,' 
	       + '#viasearch-ad-area .adUrl,'
	       + '#viasearch-ad-area .adSponsorUrl {'
	       + 'color:#' + seesaa_title_color + ';'
	       + '}\n'
	       + '#viasearch-ad-area .adText {'
	       + 'color:#' + seesaa_text_color + ';'
	       + '}\n'
	       + '</style>');
