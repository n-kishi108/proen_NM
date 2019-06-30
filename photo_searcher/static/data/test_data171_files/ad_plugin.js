if(typeof Seesaa == "undefined" || !Seesaa)
  var Seesaa = {};

Seesaa.floating = function () {
  this.onload_prehandler = window.onload;
  this.links   = [];
  this.panels  = {};
  this.adData  = {};
  this.hID     = 82;
  this.hshID   = 82;
  this.hsTid   = 'sonet_hotspot';
  this.autoHideSec = 700;
  this.hideSec     = 100;
  this.bodyHeight        = 351;
  this.bodyHeightClose   = 75;
  this.headerHeight      = 0;
  this.headerHeightClose = 0;
  this.bodyWidth         = 222;
  this.panelHeight       = this.bodyHeight;
  this.panelHeightClose  = this.bodyHeightClose;
  this.panelWidth        = this.bodyWidth;
}
Seesaa.floating.prototype = {
  onLoad: function () {
    if(this.onload_prehandler)
      this.onload_prehandler();
    this.start();
  },
  start: function () {
    /*
     * loadYUI -> loadCSS -> loadAdData -> setLinks
     */
    this.getLinks();
    if(this.links.length)
      this.loadYUI();
  },
  setLinks: function () {
    for(var i=0;i<this.links.length;i++){
      var link = this.links[i];
      if(ads_by_seesaa.adData[link.keyword] && ads_by_seesaa.adData[link.keyword].result == 1){
	link.unescapedKeyword = ads_by_seesaa.adData[link.keyword].keyword;
	this.setEvents(link);
      }
    }
  },
  getLinks: function () {
    var links = document.links;
    for (var i=0;i<links.length;i++) {
      var link = links[i];

      if(link.href.match(/^http:\/\/match\.seesaa\.jp\/afr\.pl\?hid=25&sid=([\w:-]+)&k=(.+)&ic=(.+)$/)){
	this.site_id = RegExp.$1;
	link.keyword = RegExp.$2;
	link.panelID = "af-panel-" + i;
	this.links.push(link);
      }
    }
  },
  setEvents: function (link) {
    YAHOO.util.Event.on(link, 'mouseout',   function (e, link) { this.setHideTimer(link.panelID, 'autoHideTimer', this.autoHideSec) }, link, this);
    YAHOO.util.Event.on(link, 'click',     this.createResultPanel, { link:link }, this);
    YAHOO.util.Event.on(link, 'mouseover', this.createSearchPanel, { link:link }, this);
  },
  calcPanelXY : function (e, link, height) {
    var panel = ads_by_seesaa.panels[link.panelID];
    var loc = panel.location || (panel.location = this.panelLocation(e)),
    r = YAHOO.util.Dom.getRegion(link), x, y;

    if(loc.upper){
      y = r.top - height;
    }
    if(loc.under){
      y = r.bottom + 1;
    }
    if(loc.left){
      x = r.right - this.panelWidth;
    }
    if(loc.right){
      x = r.left;
    }

    return [Math.floor(x),Math.floor(y)];
  },
  panelLocation : function (ev) {
    var loc = {}, x = ev.clientX, y = ev.clientY,
    width  = YAHOO.util.Dom.getClientWidth(),
    height = YAHOO.util.Dom.getClientHeight();
      
    if(y + this.panelHeight <= height){
      loc.under = 1;
    }
    else if(y - this.panelHeight > 0) {
      loc.upper = 1;
    }
    else {
      loc.under = 1;
    }

    if(x < width / 2){
      loc.right = 1;
    }
    else if (x > width / 2){
      loc.left  = 1;
    }
    return loc;
  },
  createPanel : function (e, args) {
    var link = args.link;

    var panel = this.panels[link.panelID];
    if(!panel){
      var div = document.createElement("div");
      div.setAttribute('id', link.panelID);
      document.body.appendChild(div);

      panel = new YAHOO.widget.Panel(link.panelID, { width:this.panelWidth + "px", visible:false, draggable:false, close:false, zIndex:3 } );
      this.panels[link.panelID] = panel;
      panel.hideEvent.subscribe(function () { delete this["location"] });
      YAHOO.util.Event.on(div, 'mouseout',  this.hidePanel, link.panelID, this);
      YAHOO.util.Event.on(div, 'mouseover', this.showPanel, link.panelID, this);
    }
    return panel;
  },
  createBody : function (e, args, body) {
    var panel = this.createPanel(e, args), 
    loc = panel.location || (panel.location = this.panelLocation(e)),
    className = [ 'bd' ];
    if(loc.upper){
      if(loc.right)  className.push('l');
      if(loc.left)   className.push('r');
      className.push('yaji');
    }
    else {
      if(args.close) className.push('close');
      className.push('no-yaji');
    }

    var div = document.createElement("div");
    div.className = className.join("-");
    div.appendChild(body);
    return div;
  },
  createHeader : function (e, args, ele){
    var panel = this.createPanel(e, args), 
    loc = panel.location || (panel.location = this.panelLocation(e)),
    className = [ 'hd' ];
    if(args.close) className.push('close');
    if(loc.under){
      if(loc.right)  className.push('l');
      if(loc.left)   className.push('r');
      className.push('yaji');
    }
    else {
      className.push('no-yaji');
    }

    var div = document.createElement("div");
    div.className = className.join("-");
    if(ele){
      div.appendChild(ele);
    }

    var close = document.createElement('span');
    close.className = 'container-close';
    YAHOO.util.Event.on(close, 'click', function (e, panel) { panel.hide(); }, panel);
    div.appendChild(close);
      
    return div;
  },
  createSearchPanel : function (e, args) {
    var link = args.link;
    args.close = true;
    var panel = this.createPanel(e, args);

    var loggingTag = '<img width="0" height="0" border="0" src="http://match.seesaa.jp/floating_imp.pl?agent_id=0&ad_id=0&hostsite_id=' + ads_by_seesaa.hID + '&keyword_id=' + (new Date()).getHours() + '&__=' + (new Date()).getTime() + '" />';
    var searchLink = document.createElement('div');
    searchLink.className = 'search-area';
    searchLink.innerHTML = '<span><b>' + link.unescapedKeyword + '</b>&nbsp;で検索</span>' + loggingTag;
    YAHOO.util.Event.on(searchLink, 'click', this.createResultPanel, { link:link }, this);

    var body = this.createBody(e, args, searchLink);
    panel.cfg.setProperty("xy", this.calcPanelXY(e, link, this.panelHeightClose));
    panel.setHeader(this.createHeader(e, args));
    panel.setBody(body);
    panel.render();
    this.showPanel(e, link.panelID);
  },
  createResultPanel : function (e, args) {
    var link = args.link;
    args.close = false;
    var panel = this.createPanel(e, args);
    YAHOO.util.Event.preventDefault(e);

    var loading = document.createElement('div');
    loading.className = 'bd-loading';
    loading.innerHTML = '<img src="http://match.seesaa.jp/img/cmn/loading.gif" border="0"/>読み込み中';

    var body = this.createBody(e, args, loading);
      
    panel.cfg.setProperty("xy", this.calcPanelXY(e, link, this.panelHeightClose));
    panel.setHeader(this.createHeader(e, args));
    panel.setBody(body);
    panel.render();
    this.showPanel(e, link.panelID);

    var handleSuccess = function(o){
      var data = YAHOO.lang.JSON.parse(o.responseText);

      var panel = this.createPanel(o.argument.e, o.argument.args);

      var innerBody = this.constructInnerBody(o.argument.link, data, link);

      var header = document.createElement('span');
      header.innerHTML = '<span class="strong">' + link.unescapedKeyword + '</span> 検索結果';
      
      var body = this.createBody(o.argument.e, o.argument.args, innerBody);
      panel.cfg.setProperty("xy", this.calcPanelXY(e, link, this.panelHeight));
      panel.setHeader(this.createHeader(e, args, header));
      panel.setBody(body);
      panel.render();
      this.showPanel(e, link.panelID);
    },
    handleFailure = function(o){
      var div = document.createElement('div');
      div.className = 'bd-noitem';
      div.innerHTML = "該当する広告はありません";
      var panel = this.createPanel(o.argument.e, o.argument.args);

      var body = this.createBody(o.argument.e, o.argument.args, div);
      YAHOO.util.Dom.setStyle(body, 'height', this.bodyHeight + 'px');

      panel.setBody(body);
      panel.render();
      this.showPanel(e, link.panelID);
    };
    var ev = { clientX:e.clientX, clientY:e.clientY };  // for IE
    var callback = { success : handleSuccess,
		     failure : handleFailure,
		     scope   : this,
		     argument: { e:ev, args:args } };
      
    var sUrl = '/_pages/user/floating_ad.pl?ic=utf8&c=2&hid=' + this.hID + '&sid=' + this.site_id + '&hshid=' + this.hshID + '&hstid=' + this.hsTid + '&k=' + link.keyword + '&__time=' + (new Date()).getTime();
    
    var request = YAHOO.util.Connect.asyncRequest('GET', sUrl, callback);
  },
  constructInnerBody : function (link, data, fLink) {
    var moreUrl = data.hotspot_link;
  
    var div  = document.createElement("div");
    var span = document.createElement("span");
    var a    = document.createElement("a");

    var innerBody = div.cloneNode(false);

    var bothH5 = div.cloneNode(false);
    bothH5.className = 'both h5';
    var both = div.cloneNode(false);
    both.className = 'both';
      
    var body = div.cloneNode(false);
    body.className = 'ads';

    var spSite = div.cloneNode(false);
    spSite.className = "sp-site";
    spSite.innerHTML = '<a href="http://www.seesaa.co.jp/service/sponsor_guide.html" target="_blank">スポンサーサイト</a>';

    var spMore = a.cloneNode(false);
    spMore.href      = moreUrl;
    spMore.className = 'sp-more';
    spMore.target    = '_blank';
    spMore.innerHTML = '全て見る';

    body.appendChild(spSite);
    body.appendChild(spMore);
    body.appendChild(bothH5.cloneNode(true));
      
    var adCount = 2;
    for(var i=0;i<data.ads.length;i++){
      if(i == adCount)
	break;
      var ad = data.ads[i];
      var link = a.cloneNode(false);
      link.className = "ads-box";
      link.href      = ad.clickurl;
      link.target    = '_blank';
	
      var title = span.cloneNode(false);
      title.className = "ads-title";
      title.appendChild(document.createTextNode(ad.title));
    
      var text = span.cloneNode(false);
      text.className = "ads-text";
      text.appendChild(document.createTextNode(ad.text));
    
      var url = span.cloneNode(false);
      url.className = "ads-url";
      url.appendChild(document.createTextNode(ad.siteurl));
    
      link.appendChild(title);
      link.appendChild(text);
      link.appendChild(url);

      body.appendChild(link);
    }
    innerBody.appendChild(body);
  
    if(data.search && data.search.listing){
      var webSearch = div.cloneNode(false);
      webSearch.className = 'web-search';

      var spSite = div.cloneNode(false);
      spSite.className = "sp-site";
      spSite.innerHTML = '<a href="javascript:void(0);">ウェブサイト検索結果</a>';

      var spMore = a.cloneNode(false);
      spMore.href      = 'http://www.so-net.ne.jp/search/?type=web&charset=utf8&from=blog&query=' + fLink.keyword;
      spMore.className = 'sp-more';
      spMore.target    = '_blank';
      spMore.innerHTML = '全て見る';

      webSearch.appendChild(spSite);
      webSearch.appendChild(spMore);
      webSearch.appendChild(bothH5.cloneNode(true));
	
      var searchCount = 3;
      for(var i=0;i<data.search.listing.length;i++){
	if(i == searchCount)
	  break;
	var res = data.search.listing[i];

	var link = a.cloneNode(false);
	link.className = "web-box";
	link.href      = res.clickurl;
	link.title     = res.text;
	link.target    = '_blank';
	  
	var title = span.cloneNode(false);
	title.className = "web-title";
	title.appendChild(document.createTextNode(this.shorten(res.title, 16)));
	  
//	var text = span.cloneNode(false);
//	text.className = "web-text";
//	text.appendChild(document.createTextNode(this.shorten(res.description, 20)));
	  
	var url = span.cloneNode(false);
	url.className = "web-url";
	url.appendChild(document.createTextNode(this.shorten(res.siteurl, 40)));
	  
	link.appendChild(title);
	//	  link.appendChild(text);
	link.appendChild(url);

	webSearch.appendChild(link);
	webSearch.appendChild(both.cloneNode(true));
      }
      innerBody.appendChild(webSearch);
    }
    return innerBody;
  },
  comma : function (num) {
    var string = new String(num);
    var pointIndex = string.indexOf(".");
    return (pointIndex == -1)
    ? string.replace(/(\d{1,3})(?=(?:\d\d\d)+$)/g, "$1,")
    : string.substring(0, pointIndex)
    .replace(/(\d{1,3})(?=(?:\d\d\d)+$)/g, "$1,") +
    string.substring(pointIndex)
    .replace(/(\d\d\d)(?=\d)/g, "$1,");
  },
  shorten : function (text, num, suffix) {
    var string = new String(text);
    if(string.length > num)
    string = string.substring(0, num) + (suffix ? suffix : '...');
    return string;
  },
  showPanel : function (e, panelID) {
    var panel = this.panels[panelID];
    panel.show();
    this.clearHideTimer(panelID, 'hideTimer');
    this.clearHideTimer(panelID, 'autoHideTimer');
  },
  hidePanel : function (e, panelID) {
    this.setHideTimer(panelID, 'hideTimer', this.hideSec);
  },
  setHideTimer : function (panelID, timerName, mSec) {
    var panel = this.panels[panelID];
    if(panel && !panel[timerName]) {
      var self = this;
      panel[timerName] = setTimeout(function () { self.panels[panelID].hide() }, mSec);
    }
  },
  clearHideTimer : function (panelID, timerName) {
    var panel = this.panels[panelID];
    if(panel && panel[timerName]) {
      clearTimeout(panel[timerName]);
      delete panel[timerName];
    }
  },
  version: function () {
      return 2;
  },
  yuiLoadTimer: null, yuiLoadTimeout: 0,
  yuiLoadCheck: function () {
    this.yuiLoadTimeout++;
    if(typeof YAHOO != "undefined" || this.yuiLoadTimeout > 20){
      clearInterval(this.yuiLoadTimer);
      this.yuiLoadTimer = null;
      if(typeof YAHOO != "undefined")
	this.loadCSS();
    }
  },
  loadYUI: function () {
    var script = 'http://match.seesaa.jp/js/yui/2_5_2/for-floating.js';
    var s = document.createElement('script');
    s.src = script;
    document.body.appendChild(s);
    
    var self = this;
    this.yuiLoadTimer = setInterval(function () { self.yuiLoadCheck() }, 500);
  },
  loadCSS: function () {
    var css = 'http://match.seesaa.jp/css/sonet/floating_v2.css?' + (new Date()).getTime();
    YAHOO.util.Get.css(css, { onSuccess: function () { this.loadAdData() }, scope: this });
  },
  loadAdData: function () {

    var url = 'http://match.seesaa.jp/floating_start_v2.pl?ic=utf8&sid=' + this.site_id + '&hid=' + this.hID + '&url=' + encodeURIComponent(document.location.href) + '&__time=' + (new Date()).getTime();
    var query = [], qIndex = 0;
    for (var i=0 ;i<this.links.length;i++){
      if(!query[qIndex])
	query[qIndex] = new String();
      query[qIndex] += '&k=' + this.links[i].keyword;
      if((url.length + query[qIndex].length) > 1024)
	qIndex = qIndex + 1;
    }
    for(var i=0;i<query.length;i++){
      var done = 0;
      var handlerSuccess = function (o) {
	done++;
	if(done == query.length)
	  this.setLinks();
      };
      YAHOO.util.Get.script(url + query[i], {
	onSuccess: handlerSuccess,
        charset: 'UTF-8',
        scope:this
      });
    }
  }
}

var ads_by_seesaa = new Seesaa.floating();
window.onload = function () { ads_by_seesaa.onLoad(); }
