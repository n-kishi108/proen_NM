function seesaaSquareUnderSonet () {
  this.initialize.apply(this, arguments);
}

seesaaSquareUnderSonet.prototype = {
  initialize: function (args) {
    this.args = args;
    this.preload = window.onload;
    if(this.args.id){
      this.container = document.getElementById(this.args.id);
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
  getText: function (ele) {
    var textNodes = [];
    var callback = function (node, args) {
      args.push(node);
    }
    this.findTextNodes(ele, callback, textNodes);

    var text = new String;
    for(var i=0;i<textNodes.length;i++){
      text += textNodes[i].nodeValue;
    }
    return text;
  },
  findTextNodes: function (ele, callback, args) {
    var exceptiveTags = [ "area", "base", "basefont", "br", "col", "colgroup", "frame", "frameset", 
			  "head", "hr", "img", "input", "isindex", "link", "listing", "meta", "optgroup", "option", "param", "plaintext",
			  "rp", "script", "select", "style", "textarea", "title", "xmp" ];
    var exceptionReg = new RegExp('^(' + exceptiveTags.join('|') + ')$', 'i');

    function _findTextNodes (ele, callback, args) {
      for (var i=0;i<ele.childNodes.length;i++) {
	var node = ele.childNodes[i];
	if(node.nodeName.match(exceptionReg))
	  continue;
	if(node.childNodes)
	  _findTextNodes(node, callback, args);
	if(node.nodeType == 3){
	  callback(node, args);
	}
      }
    }
    _findTextNodes(ele, callback, args);
  },
  getBody: function () {
    var adContainer = this.container.parentNode;
    if(adContainer && adContainer.className == 'adView'){
      var articles = adContainer.parentNode;
      var title = articles.getElementsByTagName('h2')[0] || articles.getElementsByTagName('h3')[0];

      var str = new String;
      if(title)
	str = str + this.getText(title);

      var body = this.getElementsByClassName('articles-body', 'div', articles)[0] || this.getElementsByClassName('auto', 'p', articles)[0];

      if(body)
	str = str + this.getText(body);

      return str;
    }
  },
  show: function () {
    if(! this.container){
      return;
    }
    var body = this.getBody();
    if(body.length){
      if(body.length > 128){
	body = body.substr(0, 128);
      }
      delete this.args.query.k;
      this.args.query.kizasi  = 1;
      this.args.query.kizasi_body = body;
      this.showListings();
    }
    else {
      this.showListings();
    }

    if(this.preload){
      this.preload();
    }
  },
  showListings: function () {
    var queryString = [];
    for (var key in this.args.query){
      if(this.args.query.hasOwnProperty(key)){
	queryString.push(key + '=' + encodeURIComponent(this.args.query[key]));
      }
    }

    var iframe = this.ce('iframe');
    iframe.src = 'http://match.seesaa.jp/ot_square.pl?' + queryString.join('&');
    iframe.width  = this.args.frame_width;
    iframe.height = this.args.frame_height;
    iframe.scrolling         = 'no';
    iframe.frameBorder       = 0;
    iframe.marginWidth       = 0;
    iframe.marginHeight      = 0;
    iframe.allowTransparency = true;

    this.container.appendChild(iframe);
  },
  getElementsByClassName: function(className, tag, root, apply) {
    /*
      Copyright (c) 2008, Yahoo! Inc. All rights reserved.
      Code licensed under the BSD License:
      http://developer.yahoo.net/yui/license.txt
      version: 2.5.2
    */
    var reClassNameCache = {};
    var getClassRegEx = function(className) {
      var re = reClassNameCache[className];
      if (!re) {
	re = new RegExp('(?:^|\\s+)' + className + '(?:\\s+|$)');
	reClassNameCache[className] = re;
      }
      return re;
    };
    tag = tag || '*';
    root = (root) || document;
    if (!root) {
      return [];
    }

    var nodes = [],
    elements = root.getElementsByTagName(tag),
    re = getClassRegEx(className);

    for (var i = 0, len = elements.length; i < len; ++i) {
      if ( re.test(elements[i].className) ) {
	nodes[nodes.length] = elements[i];
	if (apply) {
	  apply.call(elements[i], elements[i]);
	}
      }
    }
    return nodes;
  },
  end:"1"
};

if(typeof seesaa_square_under_counter == 'undefined'){
  var seesaa_square_under_counter = 0;
}
seesaa_square_under_counter = seesaa_square_under_counter + 1;

(function () {
  var frame_width; var frame_height;
  switch(seesaa_template_id){
  case '00001':
    frame_width  = 470; frame_height = 23;
    frame_height = frame_height + (seesaa_adcount * 49);
    break;
  case '00002':
    frame_width  = 350; frame_height = 26;
    frame_height = frame_height + (seesaa_adcount * 73);
    break;
  case '00003':
    frame_width = 460; frame_height = 106;
    break;
  case '00004':
    frame_width = 340; frame_height = 129;
    break;
  }

  var border_rgb10 = parseInt(seesaa_border_color.substr(0, 2), 16) + parseInt(seesaa_border_color.substr(2, 2), 16) + parseInt(seesaa_border_color.substr(4, 2), 16);
  var seesaa_sponsor_color = border_rgb10 < 600 ? 'ffeeff' : '000000';

  var id = 'square-under-' + seesaa_square_under_counter;
  document.write('<div id="' + id + '"></div>');

  var obj = new seesaaSquareUnderSonet(
  {
      id: id,
      frame_width: frame_width + 'px',
      frame_height: frame_height + 'px',
      query: {
        hid: seesaa_hostsite_id,
        sid: seesaa_site_id,
        tid: 'sonet_under' + seesaa_template_id,
        c: seesaa_adcount,
        bg_c: seesaa_bg_color,
        title_c: seesaa_title_color,
        text_c: seesaa_text_color,
        border_c: seesaa_border_color,
        sponsor_c: seesaa_sponsor_color,
        bg_reverse_c: seesaa_bg_reverse_color,
        k: decodeURIComponent(seesaa_keyword_list),
        ic: seesaa_keyword_char,
        icon: seesaa_icon,
        c_key: typeof seesaa_article_id != 'undefined' ? seesaa_article_id : ''
      }
  });
  window.onload = function () { obj.show(); }
})();
 

/*
document.write('<ifr' + 'ame name="maad" src="http://match.seesaa.jp/ot_square.pl?'
	       + 'hid='  + seesaa_hostsite_id
	       + '&sid=' + seesaa_site_id     
	       + '&tid=' + 'sonet_under' + seesaa_template_id 
	       + '&c='   + seesaa_adcount
	       // + '&gid=' + seesaa_genre_id
	       // + '&aid=' + seesaa_article_id
	       + '&bg_c='      + seesaa_bg_color
	       + '&title_c='   + seesaa_title_color
	       + '&text_c='    + seesaa_text_color
	       + '&border_c='  + seesaa_border_color
	       + '&sponsor_c=' + seesaa_sponsor_color
	       + '&bg_reverse_c=' + seesaa_bg_reverse_color
	       + '&k='   + seesaa_keyword_list
	       + '&ic='  + seesaa_keyword_char
	       + '&icon='  + seesaa_icon
	       + '"');
document.write(' width="'  + frame_width  + '"' +
	       ' height="' + frame_height + '"' +
	       ' scrolling="no" frameborder="no" marginwidth="0" marginheight="0" allowTransparency="true"></ifr' + 'ame>');
*/
