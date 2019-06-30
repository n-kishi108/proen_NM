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


seesaaInterestMatchInterface.prototype.mkCtxtUrl = function () {
  if(this.loadTwice && this.failedFirst){
    if(document.location.href.match(/(https?:\/\/[^\/]+\/).+/)){
      return RegExp.$1
    }
  }
  return document.location.href;
};
seesaaInterestMatchInterface.prototype.constructHeader = function (container) {
};
seesaaInterestMatchInterface.prototype.constructFooter = function (container) {
};
seesaaInterestMatchInterface.prototype.constructListing = function (container) {
  for(var i=0;i<this.ads.length;i++){
    title    = this.ads[i][0];
    text     = this.ads[i][1];
    url      = this.ads[i][2];
    sitehost = this.ads[i][3];
    
    var link = this.ce('a', { "class": "seesaa-adLink" });
    
    link.href = url;
    link.target = '_blank';
    link.title  = text;
    
    var box = this.ce('span', { "class": "adBox" });
    box.appendChild(this.ce('span', { "class": "adTitle" }, '【ＰＲ】 ' + title));
    
    link.appendChild(box);
    container.appendChild(link);
  }
};

var seesaa_im_source  = 'seesaa_jp_cat_ctxt';
var seesaa_im_type    = 'cmn_header';
var seesaa_id         = 'common-header-ads';
var seesaa_adcount    = '1';
var seesaa_image      = false;

var seesaa_gid_candidate = 'aut0101 aut0102 aut0103 aut0301 aut0302 mot0100 mot0200 mot0300 boo0101 boo0102 boo0103 boo0104 boo0105 sof0201 sof0202 ele0200 spe0102 hea0501 hea0502 hea0503 car0200 edu0500 fin0101 fin0102 fin0201 fin0203 fin0302 ins0100 ins0200 ins0201 ins0202 ins0203 ins0204 ins0300 tra0100 com0300 rea0300 rea0301 rea0302 rea0303 pro0103 pro0104 pro0200 pro0300 pro0800 pro0801';

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
    "loadTwice"  : true,
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

  var simf = new seesaaInterestMatchInterface(args);
  window.onload = function () { simf.show(); };
})();
