function renderCmnHeader ( textColor, bgColor, logoImg) {
//  var common_header_pr_list = [
//      { "title" : '⇒ドクモブログでおしゃれテクをヌスメ！',     "url" : "http://www.seesaa.jp/r.pl?id=16",    "desc" : "" },
//      { "title" : '<img src="http://blog.seesaa.jp/images_e/68.gif" border="0" />フォトアルバムをブログに貼ろう', "url" : "http://www.seesaa.jp/r.pl?id=38", "desc" : "" },
//      { "title" : '⇒BlogPartsでブログをプチ着せ替え',  "url" : "http://www.seesaa.jp/r.pl?id=19",    "desc" : "" }
//  ];
//  var common_header_pr = common_header_pr_list[Math.floor(Math.random() * common_header_pr_list.length)];

  var common_header_pr_html = '<scr' + 'ipt src=\'http://static.adlantis.jp/javascripts/AdLantisLoader.js?20090519\' type=\'text/javascript\' charset=\'utf-8\'></scr' + 'ipt>'
    + '<!-- Begin: Adlantis, Zone: [ユーザブログ共通ヘッダーテキスト] -->'
    + '<div class=\'adlantiss_frame zid_iaT6uv8OCEbdrVR%2FelK5eg%3D%3D color_' + textColor + ' container_div autosize\'></div>'
    + '<!-- End: Adlantis -->';

  document.write('<link rel="stylesheet" href="http://blog.seesaa.jp/css/common-header.css" type="text/css" />'
		 + '<style type="text/css">'
		 + '#common-header a.seesaa-adLink,'
		 + '#common-header a.adTitle{'
		 + 'color: ' + textColor + ';'
		 + '}'
		 + '#common-header .bgcolor{'
		 + 'background: ' + bgColor + ';'
		 + '}'
		 + '</style>'
		 + '<div id="common-header">'
		 + '<div class="wrap bgcolor">'
		 + '  <div class="leftbox">'
		 + '    <div class="logo">'
		 + '      <a href="http://blog.seesaa.jp"><img src="http://blog.seesaa.jp/img/common_header/logo/' + logoImg + '" alt="Seesaaブログ" border="0" /></a>'
		 + '    </div>'
		 + '    <div class="prbox bgcolor">'
		 + '      <div class="pr1 bgcolor" id="common-header-ads"><script type="text/javascript" src="http://match.seesaa.jp/-/js/square_seesaa_cmn_header.js" charset="UTF-8"></script></div>'
		 + '      <div class="pr2 bgcolor">' + common_header_pr_html + '</div>'
		 + '      <div class="both"></div>'
		 + '    </div>'
		 + '    <div class="both"></div>'
		 + '  </div>'
		 + '  <div class="rightbox bgcolor"><div id="sbContainer" class="seesaaSearchBox"></div>'
		 + '  <script type="text/javascript"><!--\n'
		 + '  seesaa_sb_id          = "sbContainer";'
		 + '  seesaa_sb_hostsite_id = 96;'
		 + '  seesaa_sb_template_id = "seesaa_hotspot";'
		 + '  seesaa_css_path       = "http://match.seesaa.jp/css/seesaa/sb/cmn_header.css";'
		 + '  seesaa_search_target  = "_blank";\n'
		 + '  //--></script>'
		 + '  <script type="text/javascript" src="http://match.seesaa.jp/-/js/sb_seesaa_cmn_header.js" charset="UTF-8"></script>'
		 + '  </div>'
		 + '  <div class="both"></div>'
		 + '</div>'
		 + '</div>'
		 + '<span id="iphone-link" style="display:none; padding-top:3px;text-align:right;"><a href="javascript:document.cookie=\'force_pc=0; max-age=15768000; path=/\'; document.location=\'./\'">iPhone専用ページを表示</a></span>'
		 + '<script> if (0 <= navigator.userAgent.indexOf(\'iPhone\')) { document.getElementById(\'iphone-link\').style.display = \'block\'; } </script>'
		 + '');
}
