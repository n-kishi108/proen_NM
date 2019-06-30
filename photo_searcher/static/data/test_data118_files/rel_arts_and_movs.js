var loadXML = function (path) {
	var xmlDoc;

	try {
		if (window.ActiveXObject) {
			xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
			xmlDoc.async = false;
			xmlDoc.load(path);
		} else if (window.XMLHttpRequest) {
			var errorHappendHere = 'Error handling XMLHttpRequest request.';
			var d = new XMLHttpRequest();		
			d.open('GET', path, false);
			d.send(null);
			xmlDoc = d.responseXML;
		} else {
			var errorHappendHere = 'Error.';
			xmlDoc = document.implementation.createDocument('', '', null);
			xmlDoc.async = false;
			xmlDoc.load(path);
		}
	} catch(e) {
		alert(errorHappendHere);
	}

	if (xmlDoc) {
		return xmlDoc;
	} else {
		return null;
	}
};

var xmlMain47 = function (obj) {
	if (obj) {
		if (obj.parse()) {
			obj.write();
		}
	}	
};

/*
 * 関連動画用オブジェクト
 *
 * id		: 関連動画を出力するDOMのID
 * url		: 関連動画を出力するファイルのURL
 * path		: 関連動画用XMLのパス 
 * limit	: 関連動画の最大出力数
 * doc		: 関連動画データ用
 * parse	: パース用関数
 * write	: 出力用関数
 *
 */
var objMovies = {
	id: 'relMovies',
	url: location.href,
	path: 'http://www.47news.jp/movie/related_movie.xml',
	limit: 5,
	doc: {
		titles: new Array(),
		links: new Array(),
		images: new Array(),
		dates: new Array()
	},
	parse: function () {
		var xmlDoc = loadXML(this.path);	

		if (xmlDoc) {
			var items = xmlDoc.getElementsByTagName('item');
			var cnt = 0;

			for (var i = 0; i < items.length; i += 1) {
				var article = items[i].getElementsByTagName('article')[0];

				if ((article.childNodes[0].nodeValue === this.url) &&
					 (cnt <= this.limit)) {

					var title = items[i].getElementsByTagName('title')[0];
					var link = items[i].getElementsByTagName('video')[0];
					var image = items[i].getElementsByTagName('thumb')[0];
					var date = items[i].getElementsByTagName('date')[0];
					this.doc.titles[cnt] = title.childNodes[0].nodeValue;
					this.doc.links[cnt] = link.childNodes[0].nodeValue;
					this.doc.images[cnt] = image.childNodes[0].nodeValue;
					this.doc.dates[cnt] = date.childNodes[0].nodeValue;

					cnt += 1;
				}
			}

			if (this.doc.titles.length > 0) {
				return true;
			} else {
				return false;
			}
		}
	},
	write: function () {
		//var str = '◇関連動画<br />';
		var str = '<table><tr>';
		var str2 = '<div align="left">';
		str2 += '<span>【関連動画】</span>';
		str2 += '<table><tr>';

		for (var i = 0; i < this.doc.titles.length; i += 1) {
			str += '<td valign="top" width="110px" style="padding-right:4px;">';
			str += '<div style="float:left;padding:1 10px;">';
			str += '<a href="';
			str += this.doc.links[i];
			str += '">';
			str += '<img src="';
			str += this.doc.images[i];
			str += '" height="78" width="106" border="0" />';
			str += '</a>';
			str += '<br />';
			str += '<font size="2">';
			str += '<a href="';
			str += this.doc.links[i];
			str += '">';
			str += this.doc.titles[i].split('　')[0];
			str += '</a>';
			str += '</font>';
			str += '</div>';
			str += '</td>';

			if (i < 2) {
				str2 += '<td valign="top" width="110px" style="padding-right:4px;">';
				str2 += '<div style="float:left;">';
				str2 += '<a href="';
				str2 += this.doc.links[i];
				str2 += '">';
				str2 += '<img src="';
				str2 += this.doc.images[i];
				str2 += '" height="78" width="106" border="0" />';
				str2 += '</a>';
				str2 += '<br />';
				str2 += '<font size="2">';
				str2 += '<a href="';
				str2 += this.doc.links[i];
				str2 += '">';
				str2 += this.doc.titles[i].split('　')[0];
				str2 += '</a>';
				str2 += '</font>';
				str2 += '</div>';
				str2 += '</td>';
			}
		}

		str += '</tr></table>';
		str2 += '</tr></table>';
		str2 += '</div>';
		
		if (document.getElementById(this.id)) {
			document.getElementById('rel_movs').style.display = 'block';
			var pos = document.getElementById(this.id);
			pos.innerHTML = str;
			if (document.getElementById('movie_midashi')) {
				var pos2 = document.getElementById('movie_midashi');
				pos2.innerHTML = str2;
			}
		} else {
			document.write(str);
		}
	}
};

/*
 * 関連記事（手動）用オブジェクト
 *
 * id		: 関連記事（手動）を出力するDOMのID
 * url		: 関連記事（手動）を出力するファイルのURL
 * path		: 関連記事（手動）用XMLのパス 
 * doc		: 関連記事（手動）データ用
 * parse	: パース用関数
 * write	: 出力用関数
 *
 */
var objArticles = {
	id: 'relArticles',
	url: location.href,
	path: 'http://www.47news.jp/news/related/related_articles.xml',
	doc: {
		titles: new Array(),
		links: new Array(),
		dates: new Array(),
		authors: new Array()
	},
	parse: function () {
		var xmlDoc = loadXML(this.path);

		if (xmlDoc) {
			var items = xmlDoc.getElementsByTagName('item');

			for (var i = 0; i < items.length; i += 1) {
				var key = items[i].getElementsByTagName('key')[0];

				if (key.childNodes[0].nodeValue === this.url) {
					var articles = items[i].getElementsByTagName('article');

					for (var j = 0; j < articles.length; j += 1) {
						var title = articles[j].getElementsByTagName('title')[0];
						var link = articles[j].getElementsByTagName('link')[0];
						var date = articles[j].getElementsByTagName('date')[0];
						var author = articles[j].getElementsByTagName('author')[0];

						// タイトルかリンクが取得出来なければ、
						// continueを行う
						if (!(title && link)) {
							continue;
						} else if (title.childNodes[0].nodeValue === '' ||
									link.childNodes[0].nodeValue === '') {
							continue;
						}

						this.doc.titles[j] = title.childNodes[0].nodeValue;
						this.doc.links[j] = link.childNodes[0].nodeValue;

						if (date) {
							this.doc.dates[j] = date.childNodes[0].nodeValue;
						} else {
							this.doc.dates[j] = '';
						}

						if (author) {
							this.doc.authors[j] = author.childNodes[0].nodeValue;
						} else {
							this.doc.authors[j] = '';
						}
					}
					break;
				}
			}

			if (this.doc.titles.length > 0) {
				return true;
			} else {
				return false;
			}
		}
	},
	write: function () {
		//var str = '◇関連記事<br />';
		var str = '<ul>';
		for (var i = 0; i < this.doc.titles.length; i += 1) {
			str += '<li>';
			str += '<a href="';
			str += this.doc.links[i];
			str += '" target="_blank">';
			str += this.doc.titles[i];
			str += '</a>';

			if (this.doc.dates[i] != '') {
				str += '[' + this.doc.dates[i] + ']';
			}

			if (this.doc.authors[i] != '') {
				str += '【' + this.doc.authors[i] + '】';
			}

			str += '</li>';
		}
		str += '</ul>';

		if (document.getElementById(this.id)) {
			var pos = document.getElementById(this.id);
			pos.innerHTML = str;
		} else {
			document.write(str);
		}
	}
};

xmlMain47(objMovies);
xmlMain47(objArticles);
