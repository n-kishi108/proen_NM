var txt = '';

if (navigator.userAgent.indexOf("MSIE 6.") >= 0) {
	txt += '<link rel="stylesheet" type="text/css" href="http://www.47news.jp/dropdown0915_ie6.css" />';
} else {
	txt += '<link rel="stylesheet" type="text/css" href="http://www.47news.jp/dropdown0915.css" />';
}

txt += '<ul id="nav47" class="underMenu">';

// top 
txt += '<li class="mainMenu" style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/">TOP</a>' +
       '</li>';

// local news
txt += '<li class="mainMenu" style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/localnews/">地域ニュース' +
       '<!--[if gte IE 7]><!--></a><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->' +

       '<ul>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/localnews/localblock/">都道府県別</a>' +
       '</li>' +
       '<li style="font-size:12px;">' + 
       '<a href="http://www.47news.jp/localnews/hotnews/">ホッとニュース</a>' +
       '</li>' +
       '<li style="font-size:12px;">' + 
       '<a href="http://www.47news.jp/localnews/odekake/">おでかけ</a>' + 
       '</li>' +
       '<li style="font-size:12px;">' + 
       '<a href="http://www.47news.jp/localnews/toretate/">撮れたて</a>' + 
       '</li>' +
       '<li style="font-size:12px;">' + 
       '<a href="http://www.47news.jp/keizai/localkeizai/">地域経済</a>' + 
       '</li>' +
       '<li style="font-size:12px;">' + 
       '<a href="http://www.47news.jp/topics/newproduct/">新商品・新技術</a>' + 
       '</li>' +
       '<li style="font-size:12px;">' + 
       '<a href="http://www.47news.jp/localnews/chiikisaisei/">地域再生</a>' + 
       '</li>' +
       '<li style="font-size:12px;">' + 
       '<a href="http://www.47news.jp/localnews/video/">地域動画</a>' + 
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/localnews/mountain/">山への誘い</a>' + 
       '</li>' +
       '<li style="font-size:12px;">' + 
       '<a href="http://www.47news.jp/service/kosodate/">子育て支援</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/b-gourmet/">ニッポンのGOHAN</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/localnews/tekuteku/">てくてくjapan</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/localnews/furusato/">ふるさと発信</a>' +
       '</li>' +
       '<li class="menuListfoot" style="font-size:12px;">' +
       '<a href="http://www.47news.jp/localnews/hotnews/hotnews_map.html">地図</a>' +
       '</li>' +

       '</ul>' +
       '<!--[if lte IE 6]></td></tr></table></a><![endif]-->' +
       '</li>';

// kyodo news
txt += '<li class="mainMenu" style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/news/">共同ニュース' +
       '<!--[if gte IE 7]><!--></a><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->' +

       '<ul>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_main.html">主要</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_national.html">社会</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_politics.html">政治</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_economics.html">経済</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_world.html">国際</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_culture-entertainment.html">文化・芸能</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_science-environment.html">科学・環境</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_health.html">医療・健康</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_lifestyle-human_interest.html">暮らし・話題</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_securities.html">株</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_exchange.html">為替</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_new_products.html">新商品</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_events.html">予定</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_detail.html">詳報</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_obituaries.html">おくやみ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/newsyotei.html">ニュース予定</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/photonews/">写真</a>' +
       '</li>' +
       '<li class="menuListfoot" style="font-size:12px;">' +
       '<a href="http://www.47news.jp/movie/">動画</a>' +
       '</li>' +

       '</ul>' +
       '<!--[if lte IE 6]></td></tr></table></a><![endif]-->' +
       '</li>';

// topics
txt += '<li class="mainMenu" style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/47topics/">トピックス' +
       '<!--[if gte IE 7]><!--></a><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->' +

       '<ul>' +

       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/47topics/category_new/cat_771.php">話題</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/47topics/category_new/cat_299.php">＠ローカル</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/47topics/category_new/cat_2098.php">政治・経済</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/47topics/category_new/cat_296.php">事件・裁判</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/47topics/category_new/cat_297.php">医療・介護・年金</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/47topics/category_new/cat_298.php">教育</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/47topics/category_new/cat_300.php">エンタメ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/47topics/category_new/cat_2956.php">スポーツ</a>' +
       '</li>' +
       '<li class="menuListfoot" style="font-size:12px;">' +
       '<a href="http://www.47news.jp/47topics/sakura/">桜2010</a>' +
       '</li>' +
       '</ul>' +
       '<!--[if lte IE 6]></td></tr></table></a><![endif]-->' +
       '</li>';

// columns
txt += '<li class="mainMenu" style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/columns/">コラム' +
       '<!--[if gte IE 7]><!--></a><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->' +

       '<ul>' +

       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/localnews/column/">新聞コラム</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/sportscolumn/">スポーツ記者コラム</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/entertainment/column.php">エンタメ記者コラム</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/b-gourmet/">B級グルメコラム</a>' +
       '</li>' +
       '<li class="menuListfoot" style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/editorsblog/">４７編集部から</a>' +
       '</li>' +

       '</ul>' +
       '<!--[if lte IE 6]></td></tr></table></a><![endif]-->' +
       '</li>';

// sports
txt += '<li class="mainMenu" style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/sports/">スポーツ' +
       '<!--[if gte IE 7]><!--></a><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->' +

       '<ul>' +

       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/sports/soccer/">サッカー</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/sports/baseball/">野球</a>' + 
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_major_league.php">大リーグ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/archives_world_sports.php">国際大会</a>' +
       '</li>' +
       '<li style="font-size:12px;">' + 
       '<a href="http://www.47news.jp/sports/hibaseball/senbatsu2010/">高校野球</a>' +
       '</li>' +
       '<li style="font-size:12px;">' + 
       '<a href="http://www.47news.jp/sports/hisports/">高校スポーツ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/sports/golf/">ゴルフ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/sports/localsports/track/">陸上</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/sports/sumo/">相撲</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/sports/localsports/basketball/">バスケ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/sports/localsports/volleyball/">バレーボール</a>' +
       '</li>' +
       '<li style="font-size:12px;">' + 
       '<a href="http://www.47news.jp/topics/entertainment/fighting.php">格闘技</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/entertainment/f1.php">モータースポーツ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/sports/localsports/others.php">その他</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/sportscolumn/">コラム</a>' +
       '</li>' +
       '<li class="menuListfoot" style="font-size:12px;">' +
       '<a href="http://www.47news.jp/sports/olympics/vancouver/">バンクーバー冬季五輪</a>' +
       '</li>' +

       '</ul>' +
       '<!--[if lte IE 6]></td></tr></table></a><![endif]-->' +
       '</li>';

// entertainment
txt += '<li class="mainMenu"style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/culture/">エンタメ' +
       '<!--[if gte IE 7]><!--></a><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->' +

       '<ul>' +
       
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/entertainment/book.php">新刊レビュー</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/entertainment/cinema.php">花まるシネマ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/entertainment/music.php">音楽玉手箱</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/entertainment/column.php">エンタメコラム</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/hanryu/">韓流</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/culture/special2010/">新年動画</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/culture/fujitv/index.php">お先にフジテレビ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/mitsuki/">谷村美月ここです。</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/topics/entertainment/marty_index.php">マーティの異国同音</a>' +
       '</li>' +
       '<li class="menuListfoot" style="font-size:12px;">' +
       '<a href="http://www.47news.jp/araki/">アラーキーの幸福写真</a>' +
       '</li>' +

       '</ul>' +
       '<!--[if lte IE 6]></td></tr></table></a><![endif]-->' +
       '</li>';

// money
txt += '<li class="mainMenu"style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/keizai/market/index.html">マネー' +
       '<!--[if gte IE 7]><!--></a><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->' +

       '<ul>' +

       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/keizai/localkeizai/index.html">地域経済</a>' +
       '</li>' +
       '<li class="menuListfoot" style="font-size:12px;">' +
       '<a href="http://www.47news.jp/keizai/market/index.html">マーケット速報</a>' +
       '</li>' +

       '</ul>' +
       '<!--[if lte IE 6]></td></tr></table></a><![endif]-->' +
       '</li>';

// movie
txt += '<li class="mainMenu"style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/movie/">動画' +
       '<!--[if gte IE 7]><!--></a><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->' +

       '<ul>' +

       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/movie/general/">一般ニュース</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/movie/entertainment/">芸能ニュース</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/movie/international/">海外ニュース</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/video/treasure.php">お宝映像</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/localnews/video/">地域動画</a>' +
       '</li>' +
       '<li style="font-size:12px;" class="menuListfoot">' +
       '<a href="http://www.47news.jp/culture/special2010/">新年動画</a>' +
       '</li>' +

       '</ul>' +
       '<!--[if lte IE 6]></td></tr></table></a><![endif]-->' +
       '</li>';

// school
txt += '<li class="mainMenu"style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/feature/47school/">学び' +
       '<!--[if gte IE 7]><!--></a><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->' +

       '<ul>' +

       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/feature/47school/ikimono/index.php">生きもの大好き</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/feature/47school/kanji/index.php">漢字物語</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/feature/47school/english/">英語で言えた！</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.toonippo.co.jp/photo_studio/insects/index.html" onclick="jumpTo(\'http://www.toonippo.co.jp/photo_studio/insects/index.html\', \'あおもり昆虫記\');return false">あおもり昆虫記</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.japantimes.co.jp/shukan-st/" onclick="jumpTo(\'http://www.japantimes.co.jp/shukan-st/\', \'英語学習\');return false">英語学習</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/feature/47school/kodomo/index.php">こどものページ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/feature/47school/nie/index.php">先生のページ</a>' +
       '</li>' +
       '<li style="font-size:12px;" class="menuListfoot">' +
       '<a href="http://www.47news.jp/feature/47school/link.html">リンク</a>' +
       '</li>' +

       '</ul>' +
       '<!--[if lte IE 6]></td></tr></table></a><![endif]-->' +
       '</li>';

// special
txt += '<li class="mainMenu"style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/tokushu/">特集' +
       '<!--[if gte IE 7]><!--></a><!--<![endif]--><!--[if lte IE 6]><table><tr><td><![endif]-->' +

       '<ul>' +

       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/news/election/sanin2010/">参院選2010</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/localnews/chiikisaisei/">地域再生</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/47topics/e/87707.php">大転換</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/feature/medical/index.html">医療新世紀</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/service/kosodate/">子育て支援</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/feature/saibanin/47news/">裁判員制度</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/feature/mamapapa/">ママパパ繁盛記</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/47topics/e/108829.php">インフルエンザ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/feature/nankyoku/">南極を喰らふ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/feature/woman/womaneye/">ウーマンアイ</a>' +
       '</li>' +
       '<li style="font-size:12px;">' +
       '<a href="http://www.47news.jp/feature/discussion/jp.html">日米パネル討論</a>' +
       '</li>' +
       '<li style="font-size:12px;" class="menuListfoot">' +
       '<a href="http://www.47news.jp/feature/sake/">日本酒　津々浦々</a>' +
       '</li>' +

       '</ul>' +
       '<!--[if lte IE 6]></td></tr></table></a><![endif]-->' +
       '</li>';

// words ranking
txt += '<li class="mainMenu" style="font-size:12px;font-weight:bold;">' +
       '<a class="topMenuOver" href="http://www.47news.jp/blog/press.html">言葉ランキング</a>' +
       '</li>';

txt += '</ul>';
document.write(txt);

document.write('<div class="subLocal">');
document.write('<ul id="subLoc">');
document.write('<li id="newsMain"><a href="http://www.47news.jp/news/archives_main.html">主要</a></li>');
document.write('<li id="newsSocial"><a href="http://www.47news.jp/news/archives_national.html">社会</a></li>');
document.write('<li id="newsPolitics"><a href="http://www.47news.jp/news/archives_politics.html">政治</a></li>');
document.write('<li id="newsEconomy"><a href="http://www.47news.jp/news/archives_economics.html">経済</a></li>');
document.write('<li id="newsInternational"><a href="http://www.47news.jp/news/archives_world.html">国際</a></li>');
document.write('<li id="newsCulture"><a href="http://www.47news.jp/news/archives_culture-entertainment.html">文化・芸能</a></li>');
document.write('<li id="newsScience"><a href="http://www.47news.jp/news/archives_science-environment.html">科学・環境</a></li>');
document.write('<li id="newsMedical"><a href="http://www.47news.jp/news/archives_health.html">医療・健康</a></li>');
document.write('<li id="newsLiving"><a href="http://www.47news.jp/news/archives_lifestyle-human_interest.html">暮らし・話題</a></li>');
document.write('<li id="newsStock"><a href="http://www.47news.jp/news/archives_securities.html">株</a></li>');
document.write('<li id="newsExchange"><a href="http://www.47news.jp/news/archives_exchange.html">為替</a></li>');
document.write('<li id="newsNewitem"><a href="http://www.47news.jp/news/archives_new_products.html">新商品</a></li>');
document.write('<li id="newsSchedule"><a href="http://www.47news.jp/news/archives_events.html">予定</a></li>');
document.write('<li id="newsDetail"><a href="http://www.47news.jp/news/archives_detail.html">詳報</a></li>');
document.write('<li id="newsCondolence"><a href="http://www.47news.jp/news/archives_obituaries.html">おくやみ</a></li>');
document.write('<li id="newsNewsschedule"><a href="http://www.47news.jp/news/newsyotei.html">ニュース予定</a></li>');
document.write('<li id="newsPhoto"><a href="http://www.47news.jp/news/photonews/">写真</a></li>');
document.write('<li id="newsmMovie"><a href="http://www.47news.jp/movie/">動画</a></li>');
document.write('</ul>');
document.write('</div>');
