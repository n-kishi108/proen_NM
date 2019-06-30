function switch_cat(category_id){
	get_request('index_category','/index_top/category/'+category_id+'.html');
}

function switch_panel(conpane_id){
	var callback_func = get_search_callback_func(conpane_id);
	get_request('index_controlpanel','/index_top/controlpanel/'+conpane_id+'.html',callback_func);
}

function select_area_now_onair(){
	get_request('index_nowonair','/index_top/nowonair/'+tv_pref_area()+'.html',function(){
		document.getElementById('top_nowonair_pref_text').innerHTML = tv_pref_name();
	});
}

window.onload = function(){
	tv_seatch_init();
	loadCookieColorSet();
	loadCookieFontSet();
/*	get_request('index_sitesearch','/index_top/sitesearch.html'); */
	get_request('index_header','/index_top/header.html'); 
/*	get_request('index_pankuzu','/index_top/pankuzu.html'); */
/*	switch_panel('pl_program'); */
/*	get_request('index_admovie','/index_top/admovie.html'); */
/*	get_request('index_whatsnew','/index_top/whatsnew.html'); */
	/* get_request('index_blognew','/index_top/blognew.html'); */
/*	get_request('index_gotoschool','/index_top/gotoschool.html'); */
/*	get_request('index_viewrank','/index_top/viewrank.html'); */
/*	get_request('index_accessrank','/index_top/accessrank.html'); */
/*	get_request('index_backnumber','/index_top/backnumber.html'); */
/*	get_request('index_entertainment','/index_top/entertainment.html'); */
/*	get_request('index_special','/index_top/special.html'); */
/*	get_request('index_adtext','/index_top/adtext.html'); */
/*	switch_cat('sw_dorama'); */
/*	get_request('index_present','/index_top/present.html'); */
/*	get_request('index_adminibanner','/index_top/adminibanner.html'); */
/*	get_request('index_ticker','/index_top/ticker.html'); */
	get_request('index_download','/index_top/download.html');
/*	get_request('index_books','/index_top/books.html'); */
/*	get_request('index_adscraper','/index_top/adscraper.html'); */
/*	select_area_now_onair(); */
	get_request('index_footer','/index_top/footer.html');
}
