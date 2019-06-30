var random = function (lst) {
	return lst[parseInt(Math.random() * (lst.length - 1))];
};

var uniq = function (lst) {
	var results = [];

	var i, value, store = {};
	for (i = 0; i < lst.length; i += 1) {
		value = lst[i];

		if (!(value in store)) {
			store[value] = true;
			results.push(value);
		}
	}

	return results;
};

var map = function (proc, lst) {
	var results = [];

	var i, length = lst.length;
	for (i = 0; i < length; i += 1) {
		results.push(proc(lst[i]));
	}

	return results;
};

var filter = function (predicate, lst) {
	var results = [];

	var i, element, length = lst.length;
	for (i = 0; i < length; i += 1) {
		element = lst[i];

		if (predicate(element)) {
			results.push(element);
		}
	}

	return results;
};

var puts = function (msg) {
	document.writeln(msg);
};

var getComment = function (str) {
	var results = [];

	str = str.replace(/\n/g, '');	
	str = str.match(/<!--.*-->/g).toString();
	str = str.replace(/<!--|\/\//g, '');

	var i, lst = str.split(/-->/);
	for (i = 0; i < lst.length; i += 1) {
		if (lst[i] !== '') {
			results.push(lst[i].replace(/^\s+/, '').replace(/\s+$/, ''));
		}
	}

	return results;
};

var getXMLDocument = function (path) {
	return (function () {
		var doc = null;

		var d = null;
		var err = 'Error handling XMLHttpRequest request.';
		try {
			if (window.ActiveXObject) {
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = false;
				doc.load(path);
			} else if (window.XMLHttpRequest) {
				d = new XMLHttpRequest();
				d.open('GET', path, false);
				d.send(null);
				doc = d.responseXML;
			} else {
				doc = document.implementation.createDocument('', '', null);
				doc.async = false;
				doc.load(path);
			}
		} catch (e) {
			puts(err);
		}

		return doc;
	})();
};

(function () {
	var dom_id = 'iptc_category';
	var path = 'http://www.47news.jp/47topics/xml/';
	var feature = random([
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【移住体験で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/01/articles/2765.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【中国へ売り込みで地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/01/articles/2766.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【農家１０８人株式会社で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/01/articles/2767.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【コミュニティで地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/01/articles/2768.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【外国人経営で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/02/articles/2942.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【クギ１本で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/02/articles/2943.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【空き家を社員寮で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/02/articles/2944.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【リーダー育成で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/02/articles/2945.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【５ミクロンの微生物で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/03/articles/3571.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【大手の下請け返上で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/03/articles/3572.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【究極のラーメン鉢で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/03/articles/3573.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【開発秘話で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/03/articles/3574.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【会期は通年で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/04/articles/3647.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【町議会と協定で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/04/articles/3648.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【市議の大量逮捕で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/04/articles/3649.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【八百長と学芸会で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/04/articles/3650.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【住民の目線で法案で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/bangai_1/articles/3739.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【削減目標、世界一で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/bangai_1/articles/3740.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【紡績工場が世界遺産で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/bangai_1/articles/3741.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【失業者のいない村で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/bangai_1/articles/3742.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【ボルト人形「ボルタ」で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/05/articles/3744.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【温泉街に女子サッカーで地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/05/articles/3745.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【芝生化効果で地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/05/articles/3746.html'
		},
		{
			id: 'chiikisaisei',
			name: '特集',
			title: '【メセナが再びで地域再生】',
			link: 'http://www.47news.jp/localnews/chiikisaisei/05/articles/3747.html'
		}
	]);
	var kosodate = random([
		{
			id: 'kosodate',
			name: '特集',
			title: '「子育て支援」の検索は子育て支援',
			link: 'http://www.47news.jp/cgi-bin/search_kosodate.cgi?WORD=%E5%AD%90%E8%82%B2%E3%81%A6%E6%94%AF%E6%8F%B4'
		},
		{
			id: 'kosodate',
			name: '特集',
			title: '「乳幼児」の検索は子育て支援',
			link: 'http://www.47news.jp/cgi-bin/search_kosodate.cgi?WORD=%E4%B9%B3%E5%B9%BC%E5%85%90'
		},
		{
			id: 'kosodate',
			name: '特集',
			title: '「食育」の検索は子育て支援',
			link: 'http://www.47news.jp/cgi-bin/search_kosodate.cgi?WORD=%E9%A3%9F%E8%82%B2'
		},
		{
			id: 'kosodate',
			name: '特集',
			title: '「健康」の検索は子育て支援',
			link: 'http://www.47news.jp/cgi-bin/search_kosodate.cgi?WORD=%E5%81%A5%E5%BA%B7'
		},
		{
			id: 'kosodate',
			name: '特集',
			title: '「悩み」の検索は子育て支援',
			link: 'http://www.47news.jp/cgi-bin/search_kosodate.cgi?WORD=%E6%82%A9%E3%81%BF'
		},
		{
			id: 'kosodate',
			name: '特集',
			title: '「イベント」の検索は子育て支援',
			link: 'http://www.47news.jp/cgi-bin/search_kosodate.cgi?WORD=%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88'
		},
	]);
	var nankyoku = {
			id: 'nankyoku',
			name: '特集',
			title: '南極生活記者ブログ',
			link: 'http://www.47news.jp/feature/nankyoku/'
		};

	var comments = getComment(document.body.innerHTML.toString());

	// Get IptcCategory
	var categories = (function () {
		var results = [];

		var i, j, category, lst = [];
		for (i = 0; i < comments.length; i += 1) {
			if (comments[i].match(/IptcCategory/g)) {
				category = comments[i];
				category = category.replace(/IptcCategory\(/, '');
				category = category.replace(/\)/, '');
				lst = uniq(category.split(/,/));

				for (j = 0; j < lst.length; j += 1) {
					if ((lst[j]) && (lst[j].match(/\d+/g))) {
						results.push(lst[j]);
					}
				}

				break;
			}
		}
		return results;
	})();

	if (categories.length > 0) {
		// Get XML documents by IptcCategory
		var docs = (function () {
			return map(function (file) {
				return (getXMLDocument(file));
			}, uniq(map(function (category) {
				return path + category.substr(0, 2) + '.xml';
			}, categories)));
		})();

		// Get articles from any categories
		var articles = (function () {
			var results = [];

			map(function (doc) {
				var i, j, k, cats = doc.getElementsByTagName('category');
				var id, name, entries, title, link;

				// Get expected categories
				var ids = filter(function (category) {
					return category.substr(0, 2) === (function () {
						var node = cats[0].getElementsByTagName('id')[0];
						var val = node.childNodes[0].nodeValue;
						return val.substr(0, 2);
					})();
				}, categories);

				// Parse XML document
				for (i = 0; i < cats.length; i += 1) {
					id = cats[i].getElementsByTagName('id')[0];

					for (j = 0; j < ids.length; j += 1) {
						if (id.childNodes[0].nodeValue === ids[j]) {
							name = cats[i].getElementsByTagName('name')[0];
							entries = cats[i].getElementsByTagName('article');

							k = parseInt(Math.random() * (entries.length - 1));
							try {
								title = entries[k].getElementsByTagName('title')[0];
								link = entries[k].getElementsByTagName('link')[0];

								if (title && link) {
									results.push({
										id: id.childNodes[0].nodeValue,
										name: name.childNodes[0].nodeValue,
										title: title.childNodes[0].nodeValue,
										link: link.childNodes[0].nodeValue
									});
								}
							} catch (e) {}
						}
					}
				}
			}, docs);

			return results;
		})();

		// Remove repetition
		var new_articles = map(function (article) {
			var lst = article.split(/:sp:/);
			return {
				id: lst[0],
				name: lst[1],
				title: lst[2],
				link: lst[3]
			};
		}, uniq(map(function (obj) {
			// ':sp:' is field separator
			return obj.id + ':sp:' + obj.name + ':sp:' + obj.title + ':sp:' + obj.link;
		}, articles)));

		new_articles.push(feature);
		new_articles.push(kosodate);
		new_articles.push(nankyoku);

		(function () {
			var txt = '<div class="newsPhoto"><B>特集ページ</B></div>';
			txt += '<div style="width:644px;padding-left:5px;padding-right:5px;">';
			txt += '<table>';

			var cnt = 0;
			for (var i = 0; i < new_articles.length; i += 1) {
				if ((cnt % 2) === 0) {
					txt += '<tr>';

					txt += '<td width="32px" height="32px" align="left" valign="middle">';
					txt += '<img src="http://img.47news.jp/47topics/icons/';
					txt +=  new_articles[i].id;
					txt += '.jpg" width="32px" height="32px" />';
					txt += '</td>';

					txt += '<td width="300px" height="32px" align="left" valign="middle">';
					txt += '<a href="' + new_articles[i].link + '">';
					txt += new_articles[i].title;
					txt += '</a>';
					txt += '</td>';
				} else {
					txt += '<td width="32px" height="32px" align="left" valign="middle">';
					txt += '<img src="http://img.47news.jp/47topics/icons/';
					txt +=  new_articles[i].id;
					txt += '.jpg" width="32px" height="32px" />';
					txt += '</td>';

					txt += '<td width="300px" height="32px" align="left" valign="middle">';
					txt += '<a href="' + new_articles[i].link + '">';
					txt += new_articles[i].title;
					txt += '</a>';
					txt += '</td>';

					txt += '</tr>';
				}
				cnt += 1;
			}

			txt += '</table>';
			txt += '</div>';
			//puts(txt);
			document.getElementById(dom_id).innerHTML = txt;
		})();
	}
})();
