function disp_search_person_name(person_id,person_name){
	var encode_kperson = encodeURIComponent(person_name);
	var url = '/search.html?s=pl_star&person='
	+ person_id + '&kperson=' + encode_kperson;
	window.location.href = url;
	/*window.opener.location.href = url;*/
	/*window.close();*/
}

function open_program_list(){
	window.open('http://www.television.co.jp/programlist/index.php?AREA='+tv_pref_area()+'&DAY=0','_blank');
}

function get_station_cookie(){
	var value = 'snum1';
	if (document.cookie) {
		var cookies = document.cookie.split("; ");
		for (var i = 0; i < cookies.length; i++) {
			var str = cookies[i].split("=");
			if (str[0] == 'station_key') {
				value = unescape(str[1]);
				break;
			}
		}
	}else{
		set_station_cookie(value);
	}

	return value;
}

function set_station_cookie(pref){
	var period = 30;

	var nowtime = new Date().getTime();
	var clear_time = new Date(nowtime + (60 * 60 * 24 * 1000 * period));
	var expires = clear_time.toGMTString();
	document.cookie = "station_key=" + escape(pref) + "; expires=" + expires + "; path=/";
}

function disp_ctrl(id_name,mode){
	var obj = document.getElementById(id_name);
	if(obj){
		obj.style.display = mode;
	}
}

function init_station(){
	var key = get_station_cookie();
	if(key=='snum1'){
		push_station_snum_button(1);
	}else if(key=='snum2'){
		push_station_snum_button(2);
	}else{
		push_station_snum_button(1);
	}
}

function push_station_snum_button(n){
	if(n==1){
		set_station_cookie('snum1');
		disp_ctrl('push_chijouha_image_on','block');
		disp_ctrl('push_chijouha_image_off','none');
		disp_ctrl('push_bs_image_on','none');
		disp_ctrl('push_bs_image_off','block');
		var obj = document.getElementById('snum1');
		if(obj){
			obj.checked = true;
		}
		var obj = document.getElementById('snum2');
		if(obj){
			obj.checked = false;
		}
	}else{
		set_station_cookie('snum2');
		disp_ctrl('push_chijouha_image_on','none');
		disp_ctrl('push_chijouha_image_off','block');
		disp_ctrl('push_bs_image_on','block');
		disp_ctrl('push_bs_image_off','none');
		var obj = document.getElementById('snum1');
		if(obj){
			obj.checked = false;
		}
		var obj = document.getElementById('snum2');
		if(obj){
			obj.checked = true;
		}
	}
}

var pref_to_area_and_name = {
	'hokkaido':		{'area': 'TV05',	'name': '北海道'},
	'aomori':		{'area': 'TV07',	'name': '青森'},
	'iwate':		{'area': 'TV08',	'name': '岩手'},
	'akita':		{'area': 'TV09',	'name': '秋田'},
	'yamagata':		{'area': 'TV10',	'name': '山形'},
	'miyagi':		{'area': 'TV11',	'name': '宮城'},
	'fukushima':	{'area': 'TV12',	'name': '福島'},
	'tochigi':		{'area': 'TV02',	'name': '栃木'},
	'gunma':		{'area': 'TV02',	'name': '群馬'},
	'ibaraki':		{'area': 'TV02',	'name': '茨城'},
	'tokyo':		{'area': 'TV01',	'name': '東京'},
	'kanagawa':		{'area': 'TV01',	'name': '神奈川'},
	'saitama':		{'area': 'TV01',	'name': '埼玉'},
	'chiba':		{'area': 'TV01',	'name': '千葉'},
	'niigata':		{'area': 'TV13',	'name': '新潟'},
	'nagano':		{'area': 'TV14',	'name': '長野'},
	'yamanashi':	{'area': 'TV15',	'name': '山梨'},
	'shizuoka':		{'area': 'TV16',	'name': '静岡'},
	'ishikawa':		{'area': 'TV17',	'name': '石川'},
	'toyama':		{'area': 'TV18',	'name': '富山'},
	'fukui':		{'area': 'TV19',	'name': '福井'},
	'aichi':		{'area': 'TV04',	'name': '愛知'},
	'gifu':			{'area': 'TV04',	'name': '岐阜'},
	'mie':			{'area': 'TV04',	'name': '三重'},
	'osaka':		{'area': 'TV03',	'name': '大阪'},
	'hyogo':		{'area': 'TV03',	'name': '兵庫'},
	'kyoto':		{'area': 'TV03',	'name': '京都'},
	'wakayama':		{'area': 'TV03',	'name': '和歌山'},
	'nara':			{'area': 'TV03',	'name': '奈良'},
	'shiga':		{'area': 'TV03',	'name': '滋賀'},
	'okayama':		{'area': 'TV20',	'name': '岡山'},
	'kagawa':		{'area': 'TV20',	'name': '香川'},
	'tokushima':	{'area': 'TV21',	'name': '徳島'},
	'ehime':		{'area': 'TV22',	'name': '愛媛'},
	'kouchi':		{'area': 'TV23',	'name': '高知'},
	'hiroshima':	{'area': 'TV24',	'name': '広島'},
	'tottori':		{'area': 'TV25',	'name': '鳥取'},
	'shimane':		{'area': 'TV25',	'name': '島根'},
	'yamaguchi':	{'area': 'TV26',	'name': '山口'},
	'fukuoka':		{'area': 'TV06',	'name': '福岡'},
	'saga':			{'area': 'TV27',	'name': '佐賀'},
	'kumamoto':		{'area': 'TV28',	'name': '熊本'},
	'nagasaki':		{'area': 'TV29',	'name': '長崎'},
	'oita':			{'area': 'TV30',	'name': '大分'},
	'miyazaki':		{'area': 'TV31',	'name': '宮崎'},
	'kagoshima':	{'area': 'TV32',	'name': '鹿児島'},
	'okinawa':		{'area': 'TV33',	'name': '沖縄'}
};

var horiday_list = {
	'20061223': '天皇誕生日',
	'20070101': '元日',
	'20070108': '成人の日',
	'20070211': '建国記念の日',
	'20070212': '振替休日',
	'20070321': '春分の日',
	'20070429': '昭和の日',
	'20070430': '振替休日',
	'20070503': '憲法記念日',
	'20070504': 'みどりの日',
	'20070505': 'こどもの日',
	'20070716': '海の日',
	'20070917': '敬老の日',
	'20070923': '秋分の日',
	'20070924': '振替休日',
	'20071008': '体育の日',
	'20071103': '文化の日',
	'20071123': '勤労感謝の日',
	'20071223': '天皇誕生日',
	'20071224': '振替休日'
}

function get_area_cookie(){
	var value = 'tokyo';
	if (document.cookie) {
		var cookies = document.cookie.split("; ");
		for (var i = 0; i < cookies.length; i++) {
			var str = cookies[i].split("=");
			if (str[0] == 'area_pref_key') {
				value = unescape(str[1]);
				break;
			}
		}
	}else{
		set_area_cookie(value);
	}

	return value;
}

function set_area_cookie(pref){
	var period = 30;

	var nowtime = new Date().getTime();
	var clear_time = new Date(nowtime + (60 * 60 * 24 * 1000 * period));
	var expires = clear_time.toGMTString();
	document.cookie = "area_pref_key=" + escape(pref) + "; expires=" + expires + "; path=/";
}

function tv_pref(pref,key){
	return pref_to_area_and_name[pref][key];
}

function tv_pref_area(){
	return tv_pref(get_area_cookie(),'area');
}

function tv_pref_name(){
	return tv_pref(get_area_cookie(),'name');
}

function tv_set_area(obj,id_name){
	set_area_cookie(obj.options[obj.options.selectedIndex].value);
	switch_panel(id_name);
	select_area_now_onair();
}

function tv_select_pref(pref){
	set_area_cookie(pref);
	opener.document.location = opener.document.URL;
}

function common_tmpl_pref(){
	var tmpl_name = 'tmpl_pref';
	var tmp_tmpl = document.getElementById(tmpl_name).innerHTML;

	var str = replace_tmpl_hash(tmp_tmpl,{
		'pref_name': tv_pref_name(),
		'area_code': tv_pref_area()
	});

	disp(tmpl_name,str);
}

function program_tmpl_day(){
	var tmpl_name = 'templ_day';
	var tmp_tmpl = document.getElementById(tmpl_name).innerHTML;

	var tmp_time = new Date();
	var now_time = tmp_time.getTime();
	var dweek = ['日','月','火','水','木','金','土'];
	var hweek = ['holiday','def','def','def','def','def','eve'];
	var str = '';
	for(var i=0; i<8; i++){
		tmp_time.setTime(now_time+1000*60*60*24*i);
		if(tmp_time.getHours()<5){
			tmp_time.setTime(now_time+1000*60*60*24*(i-1));
		}
		var year = tmp_time.getYear();
		if(year<2000){
			year = year+1900;
		}
		year = ''+year;
		var mon = '0'+(tmp_time.getMonth()+1);
		var day = '0'+tmp_time.getDate();
		var date_str = year+mon.substr(mon.length-2,2)+day.substr(day.length-2,2);
		str += replace_tmpl_hash(tmp_tmpl,{
			'li_class': hweek[horiday_list[date_str]?0:tmp_time.getDay()],
			'area_code': tv_pref_area(),
			'day_num': i,
			'wday': dweek[tmp_time.getDay()],
			'mon': tmp_time.getMonth()+1,
			'day': tmp_time.getDate()
		});
	}

	disp(tmpl_name,str);
}

function areaset_tmpl_select_pref(){
	var tmpl_name = 'tmpl_select_pref';
	var tmp_tmpl = document.getElementById(tmpl_name).innerHTML;

	var pref = pref_to_area_and_name;
	var str = '';

	for(var key in pref){
		str += replace_tmpl_hash(tmp_tmpl,{
			'value': key,
			'view_val': pref[key]['name'],
			'selected': (key==get_area_cookie() ? 'selected' : '')
		});

		if(key==get_area_cookie()){
			
		}
	}

	disp(tmpl_name,str);
}

function get_search_callback_func(id_name){
	var callback_func = init_defain;

	if(id_name=='pl_program'){
		callback_func = function(){
			common_tmpl_pref();
			program_tmpl_day();
			init_defain();
		}
	}else if(id_name=='pl_program_areaset'){
		callback_func = function(){
			common_tmpl_pref();
			areaset_tmpl_select_pref();
			init_defain();
		}
	}else if(id_name=='pl_genre'){
		callback_func = function(){
			common_tmpl_pref();
			init_defain();
		}
	}else if(id_name=='pl_genre_areaset'){
		callback_func = function(){
			common_tmpl_pref();
			areaset_tmpl_select_pref();
			init_defain();
		}
	}else if(id_name=='pl_keyword'){
		callback_func = function(){
			common_tmpl_pref();
			init_defain();
		}
	}else if(id_name=='pl_keyword_areaset'){
		callback_func = function(){
			common_tmpl_pref();
			areaset_tmpl_select_pref();
			init_defain();
		}
	}else if(id_name=='pl_star'){
		callback_func = function(){
			common_tmpl_pref();
			init_defain();
		}
	}else if(id_name=='pl_star_areaset'){
		callback_func = function(){
			common_tmpl_pref();
			areaset_tmpl_select_pref();
			init_defain();
		}
	}

	return callback_func;
}

function search_action(url){
	if(!url){
		url = make_post_data('search_action_form');
	}
	if(document.URL.match(/\/search\.html/)){
		disp_search_list(url);
	}else{
		location.href = '/search.html?'+url;
	}
}

function setPref(pref){
	if( !window.opener || window.opener.closed ){
		window.open( "/","newwtv" );
		set_area_cookie( pref );
	} else {
		tv_select_pref( pref );
	}
	window.close();
}

function setUrl(url){
	if( !window.opener || window.opener.closed ){
		window.open( url,"newwtv" );
	} else {
		window.opener.location.href=url;
	}
	window.close();
}

var global_focus_object_id = '';

function site_search_action(){
	var obj = document.getElementById('site_search_input_textbox');
	if(obj){
		var url = ('http://www.google.co.jp/search?'
			+'hl=ja&q=site%3Awww.television.co.jp+'
			+encodeURIComponent(obj.value)+'&safe=off'
		);
		window.open(url,'_blank');
	}
}

function blog_search_action(){
	var robj = document.getElementById('blog_search_input_radio');
	var title = '';
	if(robj){
		if(robj.checked){
			title = 'title';
		}
	}

	var obj = document.getElementById('blog_search_input_textbox');
	if(obj){
		var url = ('http://www.google.co.jp/search?'
			+'hl=ja&q=site%3Ablog.television.co.jp+'
			+encodeURIComponent(obj.value)+'&safe=off&as_occt='+title
		);
		window.open(url,'_blank');
	}
}

function tv_seatch_init(){
	var set_onfocus = function(id_name){
		var obj = document.getElementById(id_name);
		if(obj){
			obj.onfocus = function(){
				global_focus_object_id = id_name;
			}
			obj.form.onsubmit = function(){return false};
		}
	}
	set_onfocus('site_search_input_textbox');
	set_onfocus('blog_search_input_textbox');
	set_onfocus('input_search_keyword');
	set_onfocus('input_search_kperson');

	document.onkeydown = function(evt){
		var key_code;
		if(document.all){
			key_code = event.keyCode;
		}else{
			key_code = evt.keyCode;
		}
		if(key_code==13){
			if(global_focus_object_id=='site_search_input_textbox'){
				site_search_action();
			}else if(global_focus_object_id=='blog_search_input_textbox'){
				blog_search_action();
			}else if(global_focus_object_id=='input_search_kperson'){
				search_action();
			}else if(global_focus_object_id=='input_search_kperson'){
				search_action();
			}
		}
	}
}

function init_defain(){
	init_station();
	tv_seatch_init();
}

function flip(el, pic) {
	el.oldpic       = el.src;
	el.onmouseover  = function() { el.src = pic }
	el.onmouseout   = function() { el.src = el.oldpic }
	el.onmouseover();
}
