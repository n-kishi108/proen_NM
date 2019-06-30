
// スタイルシート
document.write('<style type="text/css">');
document.write('ul.ul_newsList {margin: 0 0 0 22px !important;padding:0 !important;}');
document.write('ul.ul_newsList li {position:relative;line-height:150%;list-style-image:url("http://img.47news.jp/images/dsicon.gif");padding:0 !important;margin:0 0 3px;}');
document.write('</style>');

//Twitter
AddClipsUrl    = location.href; 
AddClipsTitle  = document.title;
AddClipsId = "1DE32854B89E6";
AddClipsBcolor="#78BE44";
AddClipsNcolor="#D1E9C0";
AddClipsTcolor="#666666";
AddClipsType="0";
AddClipsVerticalAlign="middle";
AddClipsDefault="bookmark";
document.write('<TABLE><TR><TD valign=middle>') ;
document.write('<a href="javascript:location.href=\'http://twitter.com/home?status=\'+encodeURI(window.location.href)" target="_blank"> <img height="20" border="0" align=bottom title="twitterにこのエントリを登録" alt="twitterにこのエントリを登録" src="http://img.47news.jp/images/twitter.jpg"/></a>') ;
document.write('</TD><TD>') ;
document.write('<script type="text/javascript" src="http://js.addclips.org/v2/addclips.js" charset="utf-8"></script>') ;
document.write('</TD></TR></TABLE>') ;

// リンクアイコン
document.write('<div align="right">');
document.write('<span class="font12">');
document.write('<a href="http://www.47news.jp/"><img src="http://img.47news.jp/47icon/aicon_house.png" border="0" align="absmiddle" width="16" height="16"> ホーム</a>');
document.write('<a href="http://www.47news.jp/news/"><img src="http://img.47news.jp/47icon/aicon_journal.png" border="0" align="absmiddle" width="16" height="16"> 共同ニュース</a>');
document.write('</span>');
document.write('</div>');

document.write('<link rel="stylesheet" href="http://img.47news.jp/news/image_list.css" type="text/css" />') ;
//document.write('<div class="newsPhoto"><B><a href="https://www.google.com/adsense/support/bin/request.py?contact=abg_afc" target="_blank">Ads by Google</a></B></div>') ;
// Googleアドセンス（新バージョン)
document.write('<div id="googleAdsense" style="width:644px;"></div>');
function google_ad_request_done(google_ads) {
	var s = '';
	var i;

	if (google_ads.length == 0) {
		return;
	}

	if (google_ads[0].type == "image") {
                s += '<div class="newsPhoto"><B><a href="https://www.google.com/adsense/support/bin/request.py?contact=abg_afc" target="_blank">Ads by Google</a></B></div>' ;
		s += '<a target="_blank" href="' + google_ads[0].url +
			'" target="_top" title="go to ' + google_ads[0].visible_url +
			'"><img border="0" src="' + google_ads[0].image_url +
			'"width="' + google_ads[0].image_width +
			'"height="' + google_ads[0].image_height + '"></a>';
	} else if (google_ads[0].type == "flash") {
                s += '<div class="newsPhoto"><B><a href="https://www.google.com/adsense/support/bin/request.py?contact=abg_afc" target="_blank">Ads by Google</a></B></div>' ;
		s += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' +
			' codebase="http://download.macromedia.com/pub/shockwave/abs/flash/swflash.cab#version=6,0,0,0"' +
			' WIDTH="' + google_ad.image_width +
			'" HEIGHT="' + google_ad.image_height + '">' +
			'<PARAM NAME="movie" VALUE="' + google_ad.image_url + '">' +
			'<PARAM NAME="quality" VALUE="high">' +
			'<PARAM NAME="AllowScriptAccess" VALUE="never">' +
			'<EMBED src="' + google_ad.image_url +
			'" WIDTH="' + google_ad.image_width +
			'" HEIGHT="' + google_ad.image_height +
			'" TYPE="application/x-shockwave-flash"' +
			' AllowScriptAccess="never" ' +
			' PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED></OBJECT>';
	} else if (google_ads[0].type == "html") {
		s += google_ads[0].snippet;
	} else if (google_ads[0].type == "text") {
//		s += '<div style="text-align:left">◇Ads by Google</div>';
                s += '<div class="newsPhoto"><B><a href="https://www.google.com/adsense/support/bin/request.py?contact=abg_afc" target="_blank">Ads by Google</a></B></div>' ;
		if (google_ads.length == 1) {
			s += '<a target="_blank" href="' + google_ads[0].url + '" ' +
				'onmouseout="window.status=\'\'" ' +
				'onmouseover="window.status=\'go to ' +
				google_ads[0].visible_url + '\';return true;" ' +
				'style="text-decoration:none">' +
				'<span style="text-decoration:underline;font-size:20pt">' +
				'<b>' + google_ads[0].line1 + '</b><br></span>' +
				'<span style="color:#000000;font-size:16pt">' +
				google_ads[0].line2 + ' ' +
				google_ads[0].line3 + '<br></span>' +
				'<span style="color:#008000;font-size:14pt">' +
				google_ads[0].visible_url + '</span></a><br>';
		} else if (google_ads.length > 1) {
			//s += '<div style="padding: 14px 0pt 0pt 0px; width: 644px;"><ul class="ul_newsList">' ;
			s += '<div style="padding: 0px 0pt 0pt 0px; width: 644px;"><ul class="ul_newsList">' ;

			for (i = 0; i < google_ads.length; ++i) {
				s += '<li><a target="_blank" href="' + google_ads[i].url + '" ' +
					'onmouseout="window.status=\'\'" ' +
					'onmouseover="window.status=\'go to ' +
					google_ads[i].visible_url + '\';return true;" ' +
					'style="text-decoration:none">' +
					'<span style="text-decoration:underline">' +
					google_ads[i].line1 + '</span>&nbsp;' +
					'<span style="color:#008000">' +
					google_ads[i].visible_url + '</span><br>' +
					'<span style="color:#000000">' +
					google_ads[i].line2 + '&nbsp;' +
					google_ads[i].line3 + '</span></a></li>';
			}
				s += '</ul></div>' ;
		}
	}

	document.getElementById('googleAdsense').innerHTML = s;
	return;
}
google_ad_client = 'ca-kyodo_js';
google_ad_channel = 'cn336x280';
google_ad_output = 'js';
google_max_num_ads = '5';
google_ad_type = 'text,image,flash,html';
google_language = 'ja';
google_image_size = '336x280';
google_encoding = 'utf-8';
google_safe = 'high';
//google_ad_test = 'on';
document.write('<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>');
document.write('<br />');

document.write('<div class="newsPhoto"><b>関連記事</b></div>');
// 関連記事（手動）
document.write('<div id="relArticles" style="width:644px;"></div>');

// 関連記事（自動）
document.write('<div id="bt_ra" style="width:644px;">');
document.write('<img width="16" height="16" alt="ロード中" src="http://img.47news.jp/cgi-bin/ra/image/indicator.gif">関連記事を取得中...');
document.write('</div>');
var bt_deco = 0;
var bt_zoom = 1;
var bt_movie = 0;
var bt_photo = 0;
document.write('<script type="text/javascript" src="http://www.47news.jp/cgi-bin/ra/bt_related_article.js" charset="utf-8"></script>');
// 関連動画
document.write('<br />');
document.write('<div id="rel_movs" class="newsPhoto" style="display:none;"><b>関連動画</b></div>') ;
document.write('<div id="relMovies" style="width:644px;"></div>');
document.write('<script type="text/javascript" src="http://www.47news.jp/js/rel_arts_and_movs.js"></script>');
// 特集ページ
document.write('<div id="iptc_category"></div>');
document.write('<script type="text/javascript" src="http://www.47news.jp/js/iptc_category.js"></script>');
// おすすめコンテンツ
document.write('<script type="text/javascript" src="http://www.47news.jp/js/osusume_top.js" charset="utf-8"></script>');



