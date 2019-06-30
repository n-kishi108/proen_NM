var autoShowReSearchFrame;
if ( typeof _livedoorSearchLoadedSearchFrame == 'undefined' ) {
    LiveDoorSearchReSearch.prototype.initializeFilter = function(args) { 
        args.search_id = args.search_id || 'ld_blogjs_sl';
        args.image_base_url = args.image_base_ur ||  'http://parts.blog.livedoor.jp/img/static/search_frame/blue/';
    };
}

if ( !loadedSearchFrame && autoShowReSearchFrame ) {
    if ( /blog.*livedoor\.com/.test( location.host ) || /blogpark\.jp/.test( location.host ) ) {
        // blog.livedoor.com/* , blogpark.jp
        var research = new LiveDoorSearchReSearch({});
        research.loadSearchedQuery();
        if ( research.has_query ) {
            research.highlightAdsense(['google_afc_1', 'google_afc_2']);
        }
    } else {
        // blog.livedoor.[-]/hogehoge
        livedoorSearchShowReSearchFrame({
            adsense_ids : ['gAdsense_google_jp', 'gAdsense_google_jp2']
        }); 
    }
}
