var ad=jugemkey_ad_getList();
jugemkey_header_html = [
'<!-- //jugemkey_header -->',
'	<div id="key_header">',
'',
'		<table class="keycontainer">',
'		<tr>',
'		<td align="left">',
'		',
'		<!--//left_table-->',
'		<table class="keyleft">',
'		<form action="http://jugem.jp/search/" name="search_form" method="get">',
'		<tr>',
'		<td valign="middle" width="90">',
'		<a href="http://jugem.jp/?ref=userheader" title="JUGEMポータル"><img src="http://imaging.jugem.jp/gmoheader/img/key_jugem_logo.gif" alt="JUGEMポータル" width="80" height="19" class="jugemkey" /></a>',
'		</td>',
'		<td valign="middle" class="keysearch">',
'		<input class="jugem_search_input" type="text" name="keyword"/>',
'		<input type="hidden" name="mode" value="blog"/>',
'		<input type="hidden" name="engine" value="2"/>',
'		</td>',
'		<td valign="middle">',
'		<select name="searchselect">',
'		<option selected="" value="">ブログ全体から</option>',
'		<option value="">JUGEM内から</option>',
'		</select>',
'		</td>',
'		<td valign="middle">',
'		<input class="jugem_search_button" type="image" src="http://imaging.jugem.jp/gmoheader/img/key_search.gif"/>',
'		</td>',
'		<td valign="middle" class="keynew">',
		ad,
'		</td>',
'		</tr>',
'		</form>',
'		</table>',
'		<!--//left_table-->		',
'		',
'		</td>',
'		<td>',
'		',
'		<!--//right_table-->',
'		<table class="keyright">',
'		<tr>',
'		<td valign="middle" class="td_start">',
'		<a href="https://secure.jugem.jp/start/input.php" class="keystart" target="_blank">ブログをはじめる</a>',
'		</td>',
'		<td valign="middle" class="td_jugemkey" onmouseout="jugemkey_h_ShowMenu(0, \'key_sub\')" onmouseover="jugemkey_h_ShowMenu(1, \'key_sub\')">',
'		<a href="http://jugemkey.jp" target="_blank"><img src="http://imaging.jugem.jp/gmoheader/img/key_jugemkey.gif" alt="JugemKey" width="92" height="16" /></a>',
'		',
'		<div id="key_sub" style="visibility: hidden;">',
'		<ul class="keyservice">',
'			<li><a href="http://jugem.jp" class="jugem" target="_blank"><img src="http://imaging.jugem.jp/gmoheader/img/key_ico_jugem.gif" /></a>&nbsp;<a href="http://jugem.jp" class="jugem" target="_blank">ブログ</a></li>',
'			<li><a href="http://pookmark.jp" class="pookmark" target="_blank"><img src="http://imaging.jugem.jp/gmoheader/img/key_ico_pookmark.gif" /></a>&nbsp;<a href="http://pookmark.jp" class="pookmark" target="_blank">ブックマーク</a></li>',
'			<li><a href="http://logpi.jp" class="logpi" target="_blank"><img src="http://imaging.jugem.jp/gmoheader/img/key_ico_logpi.gif" valign="middle" /></a>&nbsp;<a href="http://logpi.jp" class="logpi" target="_blank">ライフログ</a></li>',
'			<li><a href="http://calamel.jp" class="calamel" target="_blank"><img src="http://imaging.jugem.jp/gmoheader/img/key_ico_calamel.gif" valign="middle" /></a>&nbsp;<a href="http://calamel.jp" class="calamel" target="_blank">ショッピングガイド</a></li>',
'			<li><a href="http://3mm.jp" class="movie_3mm" target="_blank"><img src="http://imaging.jugem.jp/gmoheader/img/key_ico_3mm.gif" valign="middle" /></a>&nbsp;<a href="http://3mm.jp" class="movie_3mm" target="_blank">動画</a></li>',
'		</ul>',
'		</div>',
'		',
'		</td>',
'		</tr>',
'		</table>',
'		',
'		<!--//right_table-->',
'		',
'		</td>',
'		</tr>',
'		</table>',
'',
'	</div>',
'	<!-- //jugemkey_header -->',
'',
].join("");
document.write(jugemkey_header_html);
document.search_form.keyword.focus();
function jugemkey_ad_getList(){
	var str   = '';
	var url   = new Array(
				'http://grouptube.jp/',
				'http://calamel.jp/',
				'http://heteml.jp/',
				'http://www.petit.cc/',
				'http://muumuu-domain.com/',
				'http://30d.jp/?ref=userheader');
	var title = new Array(
				'新しいコミュニケーションの形',
				'かわいいショップに感激☆カラメル',
				'タフでマッチョなレンタルサーバー',
				'紙のホームページ「プチ」',
				'ドメインが年間651円から',
				'プライベート専用フォトアルバム');
	var num   = Math.floor((Math.random() * 100)) % url.length;
	var adoff = 0;

	if("gmoheaderadoff" in window){
		adoff = gmoheaderadoff;
	}
	if(!adoff) str = '<a href="'+url[num]+'" target="_blank">'+title[num]+'</a>';
	return str;
}
/********************************************************************************
	関数名		ShowMenu
	機能		サブメニューを表示する。
********************************************************************************/
function jugemkey_h_ShowMenu(bMode, sMenuId){
	
	// 表示モードの場合
	if(bMode == 1){

		// サブメニューを表示する
		jugemkey_h_CntrlMenu('Open', sMenuId);
		
	// 非表示モードの場合
	} else {
		// サブメニューを非表示にする
		jugemkey_h_CntrlMenu('Close', sMenuId);
		
	}
	
}

/********************************************************************************
	関数名		CtrlEvent
	機能		イベントを管理する
********************************************************************************/
function jugemkey_h_CntrlEvent(act, obj, event, funcname, capture){
	switch(act){
		case 'add' :
			if(obj.addEventListener) obj.addEventListener(event, funcname, capture);
			else if(obj.attachEvent) obj.attachEvent("on" + event, funcname);
			break;
		case 'remove' :
			if(obj.removeEventListener) obj.removeEventListener(event, funcname, capture);
			else if(obj.detachEvent) obj.detachEvent("on" + event, funcname);
			break;
	}
}


/********************************************************************************
	関数名		CntrlMenu
	機能		サブメニューを表示する
********************************************************************************/
//タイマー管理用配列
var jugemkey_h_MenuTimer = {};
function jugemkey_h_CntrlMenu(act, idname){
	// 開くまでの待ち時間 
	var ActOpenT = 50;

	// 閉じるまでの待ち時間 
	var ActCloseT = 100;

	switch(act){
		case 'Open' :
			if(jugemkey_h_MenuTimer[idname]){ clearTimeout(jugemkey_h_MenuTimer[idname]); }
			jugemkey_h_MenuTimer[idname] = setTimeout("document.getElementById('"+idname+"').style.visibility = 'visible';", ActOpenT);
			break;
		case 'Close' :
			if(jugemkey_h_MenuTimer[idname]){ clearTimeout(jugemkey_h_MenuTimer[idname]); }
			jugemkey_h_CntrlEvent('add', 'document.documentElement', 'click', '_CloseAll', true);
			jugemkey_h_MenuTimer[idname] = setTimeout("jugemkey_h_CntrlMenu('_Close', '"+idname+"')", ActCloseT);
			break;
		case '_Close' :
			document.getElementById(idname).style.visibility = 'hidden';
			break;
		case '_CloseAll' :
			for(i in jugemkey_h_MenuTimer){
				clearTimeout(jugemkey_h_MenuTimer[i]);
				document.getElementById(i).style.visibility = 'hidden';
			}
			jugemkey_h_CntrlEvent('remove', 'document.documentElement', 'click', '_CloseAll', true);
			break;
	}
}