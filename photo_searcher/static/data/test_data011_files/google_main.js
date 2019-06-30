if (typeof googleAdsConfig == 'undefined') {
  googleAdsConfig = {
    'space_left'         :  '5',
    'space_right'        :  '5',
    'space_top'          :  '5',
    'space_middle'       : '15',
    'space_bottom'       :  '5',
    'title_font'         : '10',
    'title_space_left'   : '15',
    'title_space_right'  : '15',
    'title_space_top'    :  '0',
    'title_space_bottom' :  '0',
    'ad_space_step'      :  '0',
    'ad_space_left'      : '20',
    'ad_space_right'     :  '0',
    'ad_space_top'       : '15',
    'ad_space_middle'    : '15',
    'ad_space_bottom'    : '15',
    'ad_name_font'       : '10',
    'ad_url_font'        : '10',
    'ad_abst_font'       : '10',
    'hash'               :   ''
  };
}

var google_ad_request_done = function(google_ads) {
    /*
     * Verify that there are actually ads to display.
     */
    if (google_ads.length == 0 || google_ads[0].type != 'text') {
      return;
    }
    google_ad_text_request_done(google_ads);
};

var google_ad_text_request_done = function(google_ads) {
    var s = '';
    var i;

    var rows = 3 + google_ads.length * 2;
    s += '<table width="100%" border="0" cellpadding="0" cellspacing="0">';
    s += '<tr>';
    s += '<td  width="' + googleAdsConfig['space_left']   + '" rowspan="' + rows + '"></td>';
    s += '<td height="' + googleAdsConfig['space_top']    + '"></td>';
    s += '<td  width="' + googleAdsConfig['space_right']  + '" rowspan="' + rows + '"></td>';
    s += '</tr>';
    s += '<tr><td><div style="text-align: left; font-weight: bold; font-size: ' + googleAdsConfig['title_font'] + 'pt; '
                   + 'padding: ' + googleAdsConfig['title_space_top']    + 'px '
                                 + googleAdsConfig['title_space_right']  + 'px '
                                 + googleAdsConfig['title_space_bottom'] + 'px '
                                 + googleAdsConfig['title_space_left']   + 'px;">'
                   + '<a href="' + google_info.feedback_url + '">Ads by Google</a></div></td></tr>';
    var margin_top = googleAdsConfig['space_middle'];
    for(i=0; i < google_ads.length; ++i) {
       s += '<tr><td height="' + margin_top + '"></td></tr>';
       s += '<tr><td>';
       s +=  create_ad_text( google_ads[i].line1, google_ads[i].line2, google_ads[i].line3, google_ads[i].url, google_ads[i].visible_url, i+1);
       s += '</td></tr>';
       margin_top = googleAdsConfig['ad_space_step'];
    }
    s += '<tr><td height="' + googleAdsConfig['space_bottom'] + '"></td></tr>';
    s += '</table>';

    document.write(s);
    return;
};

var create_ad_text = function(text1, text2, text3, url, visible_url, rank) {
      var item_s = '';

      item_s += '<table width="100%" border="0" cellpadding="0" cellspacing="0" '
                     + 'onMouseOver="setBGColorOnMouseOver(this); this.style.cursor=\'pointer\';"'
		     + 'onMouseOut="this.style.backgroundColor=\'\';"'
		     + 'onclick="popupAdSite(\'' + url + '\');">';
      item_s += '<tr>';
      item_s += '<td  width="' + googleAdsConfig['ad_space_left']   + '" rowspan="5"></td>';
      item_s += '<td height="' + googleAdsConfig['ad_space_top']    + '" colspan="2"></td>';
      item_s += '<td  width="' + googleAdsConfig['ad_space_right']  + '" rowspan="5"></td>';
      item_s += '</tr>';
      item_s += '<tr>';
      item_s += '<td align="right" width="20px"><img src="http://plaza.rakuten.co.jp/img/google/icon_a0' + rank + '.gif?' + googleAdsConfig['hash'] + '" align="absmiddle" />&nbsp</td>';
      item_s += '<td align="left">';
      item_s += '<a href="javascript:void(0);"><font style="font-size: ' + googleAdsConfig['ad_name_font'] + 'pt"><strong>' + text1 + '</strong></font></a>';
      item_s += '&nbsp;&nbsp;';
      item_s += '<a href="javascript:void(0);"><font style="font-size: ' + googleAdsConfig['ad_url_font'] + 'pt">' + visible_url + '</font></a>';
      item_s += '</td>';
      item_s += '</tr>';
      item_s += '<tr><td height="' + googleAdsConfig['ad_space_middle'] + '" colspan="2"></td></tr>';
      item_s += '<tr>';
      item_s += '<td align="left" valign="top">&nbsp;</td>';
      item_s += '<td align="left" valign="top"><font style="font-size: ' + googleAdsConfig['ad_abst_font'] + 'pt">' + text2 + text3 + '</font></td>';
      item_s += '</tr>';
      item_s += '<tr><td height="' + googleAdsConfig['ad_space_bottom'] + '" colspan="2"></td></tr>';
      item_s += '</table>';

      return item_s;      
};

var popupAdSite = function(url) {
    window.open(url, "_blank");
};

google_ad_client = 'ca-rakuten-blog_js';
// google_ad_client = 'ca-test';
google_ad_channel = 'main';
google_ad_output = 'js';
google_max_num_ads = '3';
google_ad_type = "text";
google_language = 'ja'; 
google_image_size = '728x90'; 
//google_image_size is required if you are displaying image, Flash or rich media ads.
google_encoding = 'utf8';
google_safe = 'medium';
google_ad_section = 'rakuten1';
google_feedback = 'on';
