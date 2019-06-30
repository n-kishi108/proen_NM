/*
 *  Web/Sponsor Search Library
 *  Copyright (C) Seesaa Inc. 2009
 *  All rights reserved.
 */

function seesaaSearchInterface () {
  this.initialize.apply(this, arguments);
}

seesaaSearchInterface.prototype = {
  initialize: function (args) {
    var params = "hid sid tid c sc target".split(' ');
    for(var i=0;i<params.length;i++){
      this[params[i]] = args[params[i]];
    }
  },
  search : function (keyword) {
    var host = 'match.seesaa.jp';
    var url = 'http://' + host + '/ot_listing.pl?'
    + 'hid='     + this.hid
    + '&sid='    + this.sid
    + '&c='      + ''
    + '&k='      + encodeURIComponent(keyword)
    + '&tid='    + this.tid
    + '&search=' + 1
    + '';

    if(this.target){
      window.open(url, this.target);
    }
    else {
      location.href = url;
    }
  },
  END:""
}

/*
 *  SearchBox Library
 *  Copyright (C) Seesaa Inc. 2009
 *  All rights reserved.
 */

function seesaaSearchBoxInterface () {
  this.initialize.apply(this, arguments);
}

seesaaSearchBoxInterface.prototype = {
  initialize: function (args) {
    var params = "id hid sid tid c sc searchTarget".split(' ');
    for(var i=0;i<params.length;i++){
      this[params[i]] = args[params[i]];
    }
    this.isSSL        = ("https:" == document.location.protocol);
    this.preload      = window.onload;
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
  show: function () {
    var container = document.getElementById(this.id);

    this.constructHeader(container);
    this.constructMain(container);
    this.constructFooter(container);

    if(this.preload)
      this.preload();
  },
  constructMain:   function (container) {
    var form = this.ce("form", { "class":"form" });
    var self = this;
    var inputId = seesaa_id + '-input';

    var doSearch = function (e) {
      var si = new seesaaSearchInterface({
	"hid" : self.hid,
	  "sid" : self.sid,
	  "tid" : self.tid,
	  "target" : self.searchTarget
      });
      var k = document.getElementById(inputId).value;
      si.search(k);
      if ( e.preventDefault ) e.preventDefault();
      return false;
    };
    
    this.addListener(form, "submit", doSearch);

    var input = this.ce("input", { "class":"input", "id":inputId });
    input.name = "p";
    input.type = "text";

    var button = this.ce("button", { "class":"button" });
    button.setAttribute("type", "submit");
    this.addListener(button, "click", doSearch);
    
    var clear = this.ce("div", { "class":"clear" });

    form.appendChild(input);
    form.appendChild(button);
    form.appendChild(clear);

    container.appendChild(form);
  },
  constructHeader: function (container) {},
  constructFooter: function (container) {},
  addListener: function (ele, eType, fn, capture) {
    if(ele.addEventListener) {
      ele.addEventListener(eType, fn, (capture));
    }
    else if(ele.attachEvent) {
      ele.attachEvent('on' + eType, fn);
    }
  },
  END:""
}

if(typeof seesaa_css_path != "undefined")
  document.write('<link rel="stylesheet" href="' + seesaa_css_path + '" type="text/css" />');

if(typeof seesaaSearchBoxContainer == "undefined") {
  seesaaSearchBoxContainer = {};
  seesaaSearchBoxContainerCounter = 0;
  seesaaSearchBoxContainerMaker = function () {
    seesaaSearchBoxContainerCounter = seesaaSearchBoxContainerCounter + 1;
    seesaa_sb_id = 'seesaa-sb-container-' + seesaaSearchBoxContainerCounter;
    seesaaSearchBoxContainer[seesaa_sb_id] = true;
    document.write('<div id="' + seesaa_sb_id + '" class="' + seesaa_css_class + '"></div><div class="' + seesaa_css_class + '-clear"></div>');
  }
}

(function () {
  if(typeof seesaa_sb_id == "undefined"){
    seesaaSearchBoxContainerMaker();
  }
  else {
    var container = document.getElementById(seesaa_sb_id);
    if(container && seesaa_sb_id in seesaaSearchBoxContainer){
      if(seesaaSearchBoxContainer[seesaa_sb_id] == false){
	seesaa_css_class = container.className;
      }
      seesaaSearchBoxContainerMaker();
    }
    else {
      seesaaSearchBoxContainer[seesaa_sb_id] = false;
    }
  }
  
  var args = {
    "id"  : seesaa_sb_id,
    "hid" : seesaa_sb_hostsite_id,
    "sid" : "",
    "tid" : "",
    "c"   : "",
    "sc"  : "",
    "searchTarget" : ""
  };

  if(typeof seesaa_sb_site_id     != "undefined") args.sid = seesaa_sb_site_id;
  if(typeof seesaa_sb_template_id != "undefined") args.tid = seesaa_sb_template_id;
  if(typeof seesaa_search_target  != "undefined") args.searchTarget = seesaa_search_target;

  var ssbf = new seesaaSearchBoxInterface(args);
  window.onload = function () { ssbf.show(); };
})();
