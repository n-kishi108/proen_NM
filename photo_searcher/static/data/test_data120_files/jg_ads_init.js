if (typeof(Jugem) == 'undefined') Jugem = {};
if (typeof(Jugem.ads) == 'undefined') Jugem.ads = {};

var google_num_ads = 0;
var google_last_ad_type = '';

function google_ad_request_done(google_ads) {
    if (google_ads.length == 0) {
        return;
    }
    google_num_ads += google_ads.length;
    google_last_ad_type = google_ads[0].type;
    Jugem.ads.startRendering(google_ads);
}

Jugem.ads.inactiveRendered = false;

Jugem.ads.startRendering = function(ads) {
    var adAreaInactive = document.getElementById('gInactiveAdContainer');
    var adAreaEntry = document.getElementById('gEntryAdContainer');

    if (!adAreaInactive || Jugem.ads.inactiveRendered) {
        Jugem.ads.renderAds(ads, adAreaEntry);
    } else {
        Jugem.ads.inactiveRendered = true;
        Jugem.ads.renderAds(ads, adAreaInactive);
    }
}

Jugem.ads.renderAds = function(ads, elm) {
    var str = '';
    for (var i=0; i<ads.length; i++) {
        var title = ads[i].line1;
        var line2 = ads[i].line2;
        var line3 = ads[i].line3;
        var url = ads[i].url;
        var visible_url = ads[i].visible_url;
		str += '<div style="margin: 2px 0pt 10px; cursor: pointer;" onclick="window.location.href=\'' + url + '\';">';
       /* str += '<div style="margin: 2px 0pt 10px; cursor: pointer;" onclick="window.location.href=\'' + url + '\';" onmouseover="bgcolor=this.style.backgroundColor; this.style.backgroundColor=\'#cdcdcd\'; return true;" onmouseout="this.style.backgroundColor=bgcolor; return true;">'; */
        str += '<div>';
        str += '<a href="' + url + '" style="text-decoration: underline;"><span style="font-size: 12px; font-weight:normal; line-height: 200%;">' + title + '</span></a>';
        str += '<span style="margin-left: 10px; font-size: 11px; color: rgb(0, 153, 0);">' + visible_url + '</span>';
        str += '</div>';
        str += '<span style="font-size: 12px; font-weight: normal;">' + line2 + line3 + '</span>';
        str += '</div>';
    }
    str += '<div class="jugem_blog_ad_by" style="text-align: right;"><a href="' + google_info.feedback_url + '" target="_blank">Ads by Google</a></div>';

    if (elm) {
        if ('' != str) {
            elm.innerHTML = str;
            elm.style.display = 'block';
        } else {
            elm.style.display = 'none';
        }
    }
};

