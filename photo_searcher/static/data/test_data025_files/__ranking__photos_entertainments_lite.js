function __ranking__photos_entertainments_lite () {
	
	this.URL = "/rss/ranking/photos_entertainments_hour.xml";
	this.ID = "__ranking__";
	this.TITLE_LENGTH = 18;
	
	this.write = function (rss) {
						
		var html = "";
		html += "<div class='parent chrome5'>";
		html += "<h2>";
		if (rss.category != null && rss.category != "") {
			if (rss.link != null && rss.link != "") {
				html += "<a href='" + rss.link + "'  class='cmnLinkmark1'>";
								 html += "「" + rss.category + "」の写真ランキング";
								html += "</a>";
			} else {
								 html += "「" + rss.category + "」の写真ランキング";
							}
		} else {
			if (rss.link != null && rss.link != "") {
				html += "<a href='" + rss.link + "'  class='cmnLinkmark1'>";
				html += "ランキング";
				html += "</a>";
			} else {
				html += "ランキング";
			}
		}
		
		html += "&#160;";
		html += "<span class='menuHeadingnavi1'>";
		if (rss.link != null && rss.link != "") {
			html += "<a href='" + rss.link + "'>";
			html += "もっと見る";
			html += "</a>";
		} else {
			html += "もっと見る";
		}

		html += "</span>";
		html += "</h2>";
		html += "<div class='child c1 first'>";
		html += "<ol class='singlelist1 cmnrankmarkR'>";

		var item = rss.item;
		if (item == null || item.length == 0) {
			return;
		}
		
		for (var i = 0; i < 5; i++) {
			if (item[i] == null) {
				break;
			}
			var title = item[i].title;
			if (title.length > this.TITLE_LENGTH) {
				title = title.substr(0, this.TITLE_LENGTH);
				title += "…";
			} else {
				while (title.length < this.TITLE_LENGTH) {
					title = title + "&nbsp;";
				}
			}
			html += "<li class='r00" + (i + 1) + "'><a href='" + item[i].link + "'>" + title + "</a></li>";
		}
		html += "</ol>";
		html += "</div>";
		html += "</div>";

		document.getElementById(this.ID).innerHTML = html;
	}
}

new RankingReader(new __ranking__photos_entertainments_lite());