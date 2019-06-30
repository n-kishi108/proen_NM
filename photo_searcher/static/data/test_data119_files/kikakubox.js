var tag='';

//ランダムバナー
var images = {
        // 画像とジャンプ先の URL のペア
        url : [
['http://www.47news.jp/47topics/images/banner_tekuteku.jpg', 'http://www.47news.jp/localnews/tekuteku/', 'てくてくjapan'],
['http://www.47news.jp/47topics/images/sakura300_80.jpg', 'http://www.47news.jp/47topics/sakura/', '桜'],
['http://www.47news.jp/47topics/images/banner_japan_j.jpg', 'http://www.47news.jp/47topics/e/157460.php', '日本の実力'],
   ['http://www.47news.jp/47topics/images/banner_odekake02.jpg', 'http://www.47news.jp/localnews/odekake/', 'おでかけ'],
   ['http://img.47news.jp/feature/test/banner/banner_saninsen_300_80.jpg', 'http://www.47news.jp/news/election/sanin2010/', '参議院選挙'],
   ['http://img.47news.jp/feature/test/banner/banner_gorin_mangekyo.jpg', 'http://www.47news.jp/sports/olympics/vancouver/columns/', '五輪万華鏡'],
    ['http://img.47news.jp/feature/test/banner/banner_chiikisaisei.jpg', 'http://www.47news.jp/localnews/chiikisaisei/', '地域再生'],
    ['http://img.47news.jp/feature/test/banner/banner_sake.jpg', 'http://www.47news.jp/feature/sake/', '日本酒　津々浦々'],
    ['http://img.47news.jp/feature/test/banner/saiban_banner_orange.jpg', 'http://www.47news.jp/feature/saibanin/47news/', '裁判員制度'],
    ['http://img.47news.jp/feature/test/banner/banner_shinkan1.jpg', 'http://www.47news.jp/topics/entertainment/book.php', '新刊レビュー'],
    ['http://img.47news.jp/feature/test/banner/banner_shinkan2.jpg', 'http://www.47news.jp/topics/entertainment/book.php', '新刊レビュー'],
    ['http://img.47news.jp/feature/test/banner/banner_shinkan3.jpg', 'http://www.47news.jp/topics/entertainment/book.php', '新刊レビュー'],
    ['http://img.47news.jp/feature/test/banner/banner_yama.jpg', 'http://www.47news.jp/localnews/mountain/', '山への誘い'],
    ['http://img.47news.jp/feature/test/banner/banner_yama2.jpg', 'http://www.47news.jp/localnews/mountain/', '山への誘い'],
    ['http://img.47news.jp/feature/test/banner/banner_woman_eye.jpg', 'http://www.47news.jp/feature/woman/womaneye/', 'ウーマンアイ'],
    ['http://img.47news.jp/feature/test/banner/kanji_banner_pink.png', 'http://www.47news.jp/feature/47school/kanji/index.php', '漢字物語'],
    ['http://img.47news.jp/feature/test/banner/kanji_banner_green.png', 'http://www.47news.jp/feature/47school/kanji/index.php', '漢字物語'],
    ['http://img.47news.jp/feature/test/banner/kanji_banner_blue.png', 'http://www.47news.jp/feature/47school/kanji/index.php', '漢字物語'],
    ['http://img.47news.jp/feature/test/banner/banner_kodomomirai.jpg', 'http://www.47news.jp/service/kosodate/', 'こども未来財団　子育て支援サイト'],
    ['http://img.47news.jp/feature/test/banner/banner_araki.jpg', 'http://www.47news.jp/araki/', 'アラーキーの幸福写真'],
    ['http://img.47news.jp/feature/test/banner/banner_fuji.jpg', 'http://www.47news.jp/culture/fujitv/index.php', 'お先にフジテレビ'],
    ['http://img.47news.jp/feature/test/banner/banner_cinema.jpg', 'http://www.47news.jp/topics/entertainment/cinema.php', '花まるシネマ'],
    ['http://img.47news.jp/feature/test/banner/banner_marty.jpg', 'http://www.47news.jp/topics/entertainment/marty_index.php', 'マーティー'],
    ['http://img.47news.jp/feature/test/banner/banner_ikimono.jpg', 'http://www.47news.jp/feature/47school/ikimono/index.php', '生き物'],
    ['http://img.47news.jp/feature/test/banner/banner_odekake.jpg', 'http://www.47news.jp/localnews/odekake/', 'おでかけ']
               ],

        // 順番のシャッフル
        shuffle : function() {
          for (i = this.url.length; i > 0; --i) {
            tmp = this.url[p = Math.floor(Math.random()*this.url.length)] ;
            this.url[p] = this.url[i-1] ;
            this.url[i-1] = tmp ;
          }
        },

        p : 0, // 表示画像のポインタ
       
        // 画像表示
        put : function() {
          document.write('<div style="padding-bottom:5px;"><a href="'+this.url[this.p][1]+'"><img src="'+this.url[this.p][0]+'" height="80" width="300"alt="'+this.url[this.p][2]+'" border="0"/></a></div>') ;
          if (this.p >= this.url.length) this.p = 0 ;
          this.p++;
        }
      } ;

      images.shuffle() ;
      images.put() ;


//谷村美月
tag+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="300" height="80" id="ver01" align="middle">';
tag+='<param name="allowScriptAccess" value="always" />';
tag+='<param name="movie" value="http://img.47news.jp/flash/mitsuki.swf" />';
tag+='<param name="quality" value="high" />';
tag+='<param name="wmode" value="transparent" />';
tag+='<param name="bgcolor" value="#ffffff" />';
tag+='<embed src="http://img.47news.jp/flash/mitsuki.swf" quality="high" bgcolor="#ffffff" width="300" height="80" name="ver01" align="middle" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
tag+='</object>';

//注目コンテンツ
tag+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="300" height="310" id="ver01" align="middle">';
tag+='<param name="allowScriptAccess" value="always" />';
tag+='<param name="movie" value="http://img.47news.jp/flash/chumoku.swf" />';
tag+='<param name="quality" value="high" />';
tag+='<param name="wmode" value="transparent" />';
tag+='<param name="bgcolor" value="#ffffff" />';
tag+='<embed src="http://img.47news.jp/flash/chumoku.swf" quality="high" bgcolor="#ffffff" width="300" height="310" name="ver01" align="middle" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
tag+='</object>';

//リアルタイムアクセスランキング
tag+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="300" height="175" id="ver01" align="middle">';
tag+='<param name="allowScriptAccess" value="always" />';
tag+='<param name="movie" value="http://img.47news.jp/flash/ranking300.swf" />';
tag+='<param name="quality" value="high" />';
tag+='<param name="wmode" value="transparent" />';
tag+='<param name="bgcolor" value="#ffffff" />';
tag+='<embed src="http://img.47news.jp/flash/ranking300.swf" quality="high" bgcolor="#ffffff" width="300" height="175" name="ver01" align="middle" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
tag+='<style TYPE="text/css"><!--' ;
tag+='a:hover.accMouseOver{ background-color : #dec092; color: red; }' ;
tag+='--></style>' ;
tag+='</object>';
tag+='<table bgcolor=#d1d1d1 width="300" style="margin-bottom: 5px;"><td bgcolor="#d1d1d1" align="right"><a class="accMouseOver" style="color:black;font-size:12px;" href="http://www.47news.jp/AccessAnal/index.html">■47ニュース アクセスランキング一覧へ</a></td></table>' ;

//企画ボックス
tag+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="300" height="90" id="ver01" align="middle">';
tag+='<param name="allowScriptAccess" value="always" />';
tag+='<param name="movie" value="http://img.47news.jp/flash/kikakubox.swf" />';
tag+='<param name="quality" value="high" />';
tag+='<param name="bgcolor" value="#ffffff" />';
tag+='<embed src="http://img.47news.jp/flash/kikakubox.swf" quality="high" bgcolor="#ffffff" width="300" height="90" name="ver01" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
tag+='</object>';

//おすすめコンテンツ
//tag+='<script type="text/javascript" src="http://www.47news.jp/js/osusume.js" charset="utf-8"></script>';

//厳選ニュース
tag+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="300" height="230" id="ver01" align="middle">';
tag+='<param name="allowScriptAccess" value="always" />';
tag+='<param name="movie" value="http://img.47news.jp/flash/sidenews300.swf" />';
tag+='<param name="quality" value="high" />';
tag+='<param name="bgcolor" value="#ffffff" />';
tag+='<embed src="http://img.47news.jp/flash/sidenews300.swf" quality="high" bgcolor="#ffffff" width="300" height="230" name="ver01" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
tag+='</object>';

//Extra
//gtag+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="300" height="130" id="ver01" align="middle">';
//gtag+='<param name="allowScriptAccess" value="always" />';
//gtag+='<param name="movie" value="http://img.47news.jp/flash/localextra.swf" />';
//gtag+='<param name="quality" value="high" />';
//gtag+='<param name="bgcolor" value="#ffffff" />';
//gtag+='<embed src="http://img.47news.jp/flash/localextra.swf" quality="high" bgcolor="#ffffff" width="300" height="130" name="ver01" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
//gtag+='</object>';

//スポーツ
tag+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="300" height="220" id="ver01" align="middle">';
tag+='<param name="allowScriptAccess" value="always" />';
tag+='<param name="movie" value="http://img.47news.jp/flash/sportssidenews300.swf" />';
tag+='<param name="quality" value="high" />';
tag+='<param name="bgcolor" value="#ffffff" />';
tag+='<embed src="http://img.47news.jp/flash/sportssidenews300.swf" quality="high" bgcolor="#ffffff" width="300" height="220" name="ver01" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
tag+='</object>';

//昨日のアクセスランキング
//gtag+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="300" height="165" id="ver01" align="middle">';
//gtag+='<param name="allowScriptAccess" value="always" />';
//gtag+='<param name="movie" value="http://img.47news.jp/flash/sideranking300.swf" />';
//gtag+='<param name="quality" value="high" />';
//gtag+='<param name="bgcolor" value="#ffffff" />';
//gtag+='<embed src="http://img.47news.jp/flash/sideranking300.swf" quality="high" bgcolor="#ffffff" width="300" height="165" name="ver01" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';
//gtag+='</object>';

// ライムライト
tag+='<BR><CENTER><a href="http://www.llnw.jp/" target="_blank"><img src="http://img.47news.jp/flash/limelight.jpg" border="0"><BR>「本サイトのコンテンツ配信は、ライムライト・ネットワーク社のCDNを利用しています。」</a></CENTER>';

document.write(tag);
