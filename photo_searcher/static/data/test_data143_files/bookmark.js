  var delm = ',';
  var bookmark_services = seesaa_bookmark_services.split(delm);
  var service_url;
  var alt_str;
  var article_subject = encodeURI(seesaa_article_subject);

  document.write('<div class="bookmark">');
  
  for(var ser in bookmark_services){
      service_url = '';
      var img_url;
    switch(bookmark_services[ser]){
      case 'twitter': 
	service_url = 'http://twitter.com/home/?status=' + article_subject + ' ' + seesaa_article_page_url;
	img_url = seesaa_blog_url + '/img/bookmark/twitter_ico.gif';
	alt_str = 'Twitterでつぶやく';
	break;
      case 'yahoo': 
	service_url = 'javascript:window.location=\'http://bookmarks.yahoo.co.jp/action/bookmark?t=' + encodeURI(article_subject) + '&amp;u=' + seesaa_article_page_url + '&amp;r=my&amp;fr=ybm_netallica\'';
	img_url = seesaa_blog_url + '/img/bookmark/yahoo_ico.gif';
	alt_str = 'Yahoo!ブックマーク';
	break;
      case 'livedoor': 
        service_url = 'http://clip.livedoor.com/clip/add?link=' + seesaa_article_page_url;
	img_url = seesaa_blog_url + '/img/bookmark/livedoor_ico.gif';
	alt_str = 'このエントリをLivedoorクリップに追加';
	break;
      case 'hatena': 
        service_url = 'http://b.hatena.ne.jp/append?' + seesaa_article_page_url;
	img_url = seesaa_blog_url + '/img/bookmark/hatena_ico.gif';
	alt_str = 'このエントリをはてなブックマークする';
	break;
      case 'delicious':
	service_url = 'http://del.icio.us/post?url=' + seesaa_article_page_url + '&title=' + article_subject;
	img_url = seesaa_blog_url + '/img/bookmark/delicious_ico.gif';
	alt_str = "このエントリをdel.icio.usに追加する";
	break;
      case 'nifty':
	service_url = 'http://clip.nifty.com/create?url=' + seesaa_article_page_url + '&amp;title=' + article_subject;
	img_url = seesaa_blog_url + '/img/bookmark/nifty_ico.gif';
	alt_str = "このエントリをニフティクリップに追加";
	break;
      case 'newsing': 
        service_url = 'javascript:window.location=\'http://newsing.jp/add?url=' + seesaa_article_page_url + '\'';
	img_url = seesaa_blog_url + '/img/bookmark/newsing_ico.gif';
	alt_str = 'Newsing It!';
	break;
      case 'buzzurl': 
        service_url = 'http://buzzurl.jp/entry/' + seesaa_article_page_url;
	img_url = seesaa_blog_url + '/img/bookmark/buzzurl_ico.gif';
	alt_str = "Buzzurlにブックマーク";
	break;
      case 'pookmark':
        service_url = 'http://pookmark.jp/post?url=' + seesaa_article_page_url;
	img_url = seesaa_blog_url + '/img/bookmark/pookmark_ico.gif';
	alt_str = "このエントリをPOOKMARKに登録する";
	break;
      case 'choix':
        service_url = 'http://www.choix.jp/bloglink/' + seesaa_article_page_url;
	img_url = seesaa_blog_url + '/img/bookmark/choix_ico.gif';
	alt_str = 'choix';
	break;
      case 'furl':
	service_url = 'http://www.furl.net/savedialog.jsp?t=' + article_subject + '&u=' + seesaa_article_page_url + '&r=&v=1&c=';
	img_url = seesaa_blog_url + '/img/bookmark/furl_ico.gif';
	alt_str = 'furl';
	break;
      case 'reddit':
	service_url = 'http://reddit.com/submit?url=' + seesaa_article_page_url + '&title=' + article_subject;
	img_url = seesaa_blog_url + '/img/bookmark/reddit_ico.gif';
	alt_str = 'reddit';
	break;
      case 'blinklist': 
	service_url = 'http://www.blinklist.com/index.php?Action=Blink/addblink.php&Url=' + seesaa_article_page_url + '&Title=' + article_subject;
	img_url = seesaa_blog_url + '/img/bookmark/blinklist_ico.gif';
	alt_str = 'blinklist';
	break;
      case 'topicit': 
	service_url = 'http://topic.nifty.com/up/add?topic_title=' + article_subject + '&topic_url=' + seesaa_article_page_url;
	img_url = seesaa_blog_url + '/img/bookmark/topicit_ico.gif';
	alt_str = "トピックイット";
	break;
      case 'fc2':
	service_url = 'http://bookmark.fc2.com/user/post?url=' + seesaa_article_page_url + '&amp;title=' + article_subject;
	img_url = seesaa_blog_url + '/img/bookmark/fc2_ico.gif';
	alt_str = "このエントリをFC2ブックマークへ追加";
	break;
      case 'iza':
        service_url = 'http://www.iza.ne.jp/bookmark/add/regist/back/' + seesaa_article_page_url;
	img_url = seesaa_blog_url + '/img/bookmark/iza_ico.gif';
	alt_str = "イザ！ブックマーク";
	break;
      case 'digg': 
	service_url = 'http://digg.com/submit?phase=2&url=' + seesaa_article_page_url + '&title=' + article_subject;
	img_url = seesaa_blog_url + '/img/bookmark/digg_ico.gif';
	alt_str = 'Digg';
	break;
      case 'twitthis':
	service_url = 'http://twitthis.com/twit?url=' + seesaa_article_page_url + '&title=' + article_subject;
	img_url = seesaa_blog_url + '/img/bookmark/twitthis_ico.gif';
	alt_str = 'Twit This';
	break;
      case 'bluedot':
	service_url = 'http://bluedot.us/Authoring.aspx?u=' + seesaa_article_page_url + '&amp;t=' + article_subject;
	img_url = seesaa_blog_url + '/img/bookmark/bluedot_ico.gif';
	alt_str = 'Dot This!';
	break;
    }
    if (service_url) {
	document.write('<a href="' +  service_url + '" target="_blank"><img src=' + img_url + ' alt="' + alt_str + '" title="' + alt_str + '" border="0" hspace="1" /></a>');
    }
  }

  document.write('</div>');
