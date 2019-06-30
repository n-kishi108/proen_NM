function __ranking__ () {
	var pathname = location.pathname;
	switch (pathname) {
		case "/" :
			_("/js/ranking/__ranking__news_total_lite.js");
			break;
		case "/ranking/ranking.htm" :
			_("/js/ranking/__ranking__top.js");
			break;
		case "/ranking/news/news-r.htm" :
			_("/js/ranking/__ranking__news_total_heavy.js");
			break;
		case "/ranking/photos/photos-r.htm" :
			_("/js/ranking/__ranking__photos_total_heavy.js");
			break;
		case "/ranking/news/news-r.htm" :
			_("/js/ranking/__ranking__news_top.js");
			break;
		case "/ranking/photos/photos-r.htm" :
			_("/js/ranking/__ranking__photos_top.js");
			break;

		case "/ranking/news/total-r.htm" :
			_("/js/ranking/__ranking__news_total_heavy.js");
			break;
		case "/vancouver2010/ranking/vancouver2010-r.htm" :
			_("/js/ranking/__ranking__news_vancouver2010_heavy.js");
			break;

		case "/ranking/news/affairs-r.htm" :
			_("/js/ranking/__ranking__news_affairs_heavy.js");
			break;

		case "/ranking/news/politics-r.htm" :
			_("/js/ranking/__ranking__news_politics_heavy.js");
			break;

		case "/ranking/news/economy-r.htm" :
			_("/js/ranking/__ranking__news_economy_heavy.js");
			break;

		case "/ranking/news/world-r.htm" :
			_("/js/ranking/__ranking__news_world_heavy.js");
			break;

		case "/ranking/news/sports-r.htm" :
			_("/js/ranking/__ranking__news_sports_heavy.js");
			break;

		case "/ranking/news/entertainments-r.htm" :
			_("/js/ranking/__ranking__news_entertainments_heavy.js");
			break;

		case "/ranking/news/life-r.htm" :
			_("/js/ranking/__ranking__news_life_heavy.js");
			break;

		case "/ranking/news/culture-r.htm" :
			_("/js/ranking/__ranking__news_culture_heavy.js");
			break;

		case "/ranking/news/science-r.htm" :
			_("/js/ranking/__ranking__news_science_heavy.js");
			break;

		case "/ranking/news/release-r.htm" :
			_("/js/ranking/__ranking__news_release_heavy.js");
			break;

		case "/ranking/news/region-r.htm" :
			_("/js/ranking/__ranking__news_region_heavy.js");
			break;

		case "/ranking/photos/total-r.htm" :
			_("/js/ranking/__ranking__photos_total_heavy.js");
			break;

		case "/ranking/photos/affairs-r.htm" :
			_("/js/ranking/__ranking__photos_affairs_heavy.js");
			break;

		case "/ranking/photos/politics-r.htm" :
			_("/js/ranking/__ranking__photos_politics_heavy.js");
			break;

		case "/ranking/photos/economy-r.htm" :
			_("/js/ranking/__ranking__photos_economy_heavy.js");
			break;

		case "/ranking/photos/world-r.htm" :
			_("/js/ranking/__ranking__photos_world_heavy.js");
			break;

		case "/ranking/photos/sports-r.htm" :
			_("/js/ranking/__ranking__photos_sports_heavy.js");
			break;

		case "/ranking/photos/entertainments-r.htm" :
			_("/js/ranking/__ranking__photos_entertainments_heavy.js");
			break;

		case "/ranking/photos/life-r.htm" :
			_("/js/ranking/__ranking__photos_life_heavy.js");
			break;

		case "/ranking/photos/culture-r.htm" :
			_("/js/ranking/__ranking__photos_culture_heavy.js");
			break;

		case "/ranking/photos/science-r.htm" :
			_("/js/ranking/__ranking__photos_science_heavy.js");
			break;

		case "/ranking/photos/release-r.htm" :
			_("/js/ranking/__ranking__photos_release_heavy.js");
			break;

		case "/ranking/photos/region-r.htm" :
			_("/js/ranking/__ranking__photos_region_heavy.js");
			break;
		case "/rss/rss.htm" :
			_("/js/ranking/__ranking__news_total_lite.js");
			break;
		default :

			var re = new RegExp("^/usatoday/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_usatoday_lite.js");
				break;
			}

			var re = new RegExp("^/personnel/|^/obituary/|^/etc/|^/info/|^/feature/|^/special/|^/flash/|^/video/|^/ranking/|^/court/|^/recommend/|^/column/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_total_lite.js");
				break;
			}

			re = new RegExp("^/photos/usatoday/|^/photos/personnel/|^/photos/obituary/|^/photos/etc/|^/photos/info/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__photos_total_lite.js");
				break; 
			}

			re = new RegExp("^/topics/affairs/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_affairs_lite.js");
				break;
			}

			re = new RegExp("^/topics/politics/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_politics_lite.js");
				break;
			}

			re = new RegExp("^/topics/economy/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_economy_lite.js");
				break;
			}

			re = new RegExp("^/topics/world/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_world_lite.js");
				break;
			}

			re = new RegExp("^/topics/sports/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_sports_lite.js");
				break;
			}

			re = new RegExp("^/topics/entertainments/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_entertainments_lite.js");
				break;
			}

			re = new RegExp("^/topics/life/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_life_lite.js");
				break;
			}

			re = new RegExp("^/topics/culture/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_culture_lite.js");
				break;
			}

			re = new RegExp("^/topics/region/");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_region_lite.js");
				break;
			}

			re = new RegExp("^/topics/topics.htm");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_total_lite.js");
				break;
			}

			re = new RegExp("^/photos/photos.htm");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__photos_total_lite.js");
				break;
			}

			re = new RegExp("^/top.htm");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_total_lite.js");
				break;
			}

			re = new RegExp("^/points/points.htm");
			if (re.test(pathname)) {
				_("/js/ranking/__ranking__news_total_lite.js");
				break;
			}

			if (pathname.indexOf("/photos/") == 0) {
				var genreName = pathname.substring("/photos/".length, pathname.indexOf("/", "/photos/".length));
				if( genreName == "" ) {
					_("/js/ranking/__ranking__photos_total_lite.js");
					break;
				} else {
					_("/js/ranking/__ranking__photos_" + genreName + "_lite.js");
					break;
				}
			} else {
				var genreName = pathname.substring(1, pathname.indexOf("/", 1));
				_("/js/ranking/__ranking__news_" + genreName + "_lite.js");
				break;
			}
			break;
	}
}

function _(url) {
	var s = document.createElement("script");
	s.src = url;
	s.charset = "Shift_JIS";
	document.getElementsByTagName("head")[0].appendChild(s);
}

Function.prototype.b = function() {
  var __method = this, args = $R(arguments), object = args.shift();
  return function() {
    return __method.apply(object, args.concat($R(arguments)));
  }
}

var $R = Array.from = function(iterable) {
  if (!iterable) return [];
  if (iterable.toArray) {
    return iterable.toArray();
  } else {
    var results = [];
    for (var i = 0; i < iterable.length; i++)
      results.push(iterable[i]);
    return results;
  }
}

var RankingReaderBase = {
	create: function() {
		return function() {
			this.initialize.apply(this, arguments);
		}
	}
}

RankingReader = RankingReaderBase.create();
RankingReader.prototype = {
	initialize : function (template) {
		this.template = template;
		this.rss = new Array();
		this.xhr = this.getXhr();
		this.request();
	},
	getXhr : function () {
		var xhr = null;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest(); 
		} else if (window.ActiveXObject) { 
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP"); 
			} catch (e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		return xhr;
	},
	request : function (template) {
		try {
		    this.xhr.open("GET", this.template.URL, true);
			this.xhr.onreadystatechange = this.onReadyStateChange.b(this);
			this.xhr.setRequestHeader("pragma", "no-cache");
			this.xhr.setRequestHeader("Cache-Control", "no-cache");
			this.xhr.setRequestHeader("If-Modified-Since", "Wed, 15 Nov 1995 00:00:00 GMT");
			this.xhr.send(null);
		} catch (e) {
		}
	},
	onReadyStateChange : function () {
		if (this.xhr.readyState == 4 && this.xhr.status == 200) {
			this.parseXml(this.xhr.responseXML);
		}
	},
	parseXml : function (xml) {
		try {
			this.rss["title"] = this.getNodeValue(xml, "title");
			this.rss["link"] = this.getNodeValue(xml, "link");
			this.rss["description"] = this.getNodeValue(xml, "description");
			this.rss["copyright"] = this.getNodeValue(xml, "copyright");
			this.rss["pubDate"] = this.getNodeValue(xml, "pubDate");
			this.rss["category"] = this.getNodeValue(xml, "category");

			this.rss["item"] = new Array();

            // NameSpaceの設定
            // パスに注意が必要です。最後の"/"がないとエラーになります。
            var cf = "http://www.microsoft.com/schemas/rss/core/2005/";
            var photo = "http://www.pheed.com/pheed/";
            var sd = "http://www.sankei-digital.co.jp/ns/sd/";
            
			var itemNodes = xml.getElementsByTagName("item");
			for (var i = 0; i < itemNodes.length; i++) {

				var itemNode = itemNodes[i];
				var item = new Array();
				item["title"] = this.getNodeValue(itemNode, "title");
				item["link"] = this.getNodeValue(itemNode, "link");
				item["description"] = this.getNodeValue(itemNode, "description");
				item["guid"] = this.getNodeValue(itemNode, "guid");
				item["pubDate"] = this.getNodeValue(itemNode, "pubDate");

				if (navigator.userAgent.indexOf("MSIE") != -1) {
				    // IE の場合、getElementsByTagNameNS()のメッソドがありません。
					item["imgsrc"] = this.getNodeValue(itemNode, "photo:imgsrc");
					item["thumnail"] = this.getNodeValue(itemNode, "photo:thumnail");
					item["subject"] = this.getNodeValue(itemNode, "photo:subject");
					var rankNode = itemNode.getElementsByTagName("sd:rank")[0];
					item["prev"] = rankNode.getAttribute("prev");
					item["current"] = rankNode.getAttribute("current");
					item["highestPosition"] = rankNode.getAttribute("highestPosition");
				} else {
					item["imgsrc"] = this.getNsNodeValue(itemNode, photo, "imgsrc");
					item["thumnail"] = this.getNsNodeValue(itemNode, photo, "thumnail");
					item["subject"] = this.getNsNodeValue(itemNode, photo, "subject");
					var rankNode = itemNode.getElementsByTagNameNS(sd, "rank")[0];
					item["prev"] = rankNode.getAttribute("prev");
					item["current"] = rankNode.getAttribute("current");
					item["highestPosition"] = rankNode.getAttribute("highestPosition");
				}
				this.rss["item"][item["current"] - 1] = item;
			}
		} catch (e) {
		}
		this.template.write(this.rss);
	},
    getNodeValue : function (parentNode, nodeName) {
        try {
            var elements = parentNode.getElementsByTagName(nodeName);
            if (elements == null) {
                return null;
            }
            var element = elements[0];
            if (element == null) {
                return null;
            }
            var firstChild = element.firstChild;
            if (firstChild == null) {
                return null;
            }
            var nodeValue = firstChild.nodeValue;
            return nodeValue;
        } catch (e) {
        }
        return null;
    },
    getNsNodeValue : function (parentNode, ns, nodeName) {
        try {
            var elements = parentNode.getElementsByTagNameNS(ns, nodeName);
            if (elements == null) {
                return null;
            }
            var element = elements[0];
            if (element == null) {
                return null;
            }
            var firstChild = element.firstChild;
            if (firstChild == null) {
                return null;
            }
            var nodeValue = firstChild.nodeValue;
            return nodeValue;
        } catch (e) {
        }
        return null;
    }
}
__ranking__();