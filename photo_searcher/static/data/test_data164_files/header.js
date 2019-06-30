//<![CDATA[

var HTTP_SSL           = (location.protocol == "https:") ? "https://" : "http://";
var FAVORITE_DATA_PATH = HTTP_SSL + "az.zozo.jp/SelectWishList.asp";
var FAVORITE_DEL_PATH  = HTTP_SSL + "az.zozo.jp/removeWishList.asp";
var IMAGE_PATH         = HTTP_SSL + "img4.zozo.jp/fix/header/";
var RESORT_PATH        = "http://zozo.jp";
var IMG_SSL            = "https://img4.zozo.jp";
var IMG_HOST           = "http://img4.zozo.jp";

var HEADER_PATH        = HTTP_SSL + "az.zozo.jp/GetHeader.asp";
var HEADER_CSS_PATH    = HTTP_SSL + "az.zozo.jp/GetHeaderCSS.asp";
var CLICK_PATH         = HTTP_SSL + "az.zozo.jp/ClickHeader.asp";
var LOGIN_INFO_PATH    = HTTP_SSL + "az.zozo.jp/GetLoginInfo.asp";

var news_start = 0;
var wishListCount = 0;
/*******************************************************************************
//
// HTTPリクエスト生成
//
*******************************************************************************/

//------------------------------------------
// ヘッダーHTML要求
//------------------------------------------
function SendHtmlRequest()
{
	var url = encodeURI(HEADER_PATH);

	var oScript = document.createElement('script');
	oScript.language = 'javascript';
	oScript.src =url;
	document.getElementsByTagName('head')[0].appendChild(oScript);

	/* ヘッダ関連のCSSの読み込み */
	if( document.all )
	{
		document.createStyleSheet(HEADER_CSS_PATH);
	}
	else
	{
		var oLink = document.createElement("link");
		oLink.rel   = "stylesheet";
		oLink.href  = HEADER_CSS_PATH;
		oLink.media = "all"
		document.getElementsByTagName('head')[0].appendChild(oLink);
	}

}

function onHeader( html )
{
	document
	  .getElementById("lazyheader")
	  .innerHTML = decodeURIComponent( html );
	SetLoginInfo();

}


//---------------------------------------------
// ログイン情報セット
//---------------------------------------------
var loginfo;

function SetLoginInfo()
{
	try{
		var oDate = new Date();
		var oScript = document.createElement('script');
		oScript.language = 'javascript';
		oScript.src = LOGIN_INFO_PATH + '?dummy=' + encodeURIComponent(oDate.toString() + ' ' + oDate.getMilliseconds());
		document.getElementsByTagName('head')[0].appendChild(oScript);
	}catch(e){}
}

function onGetLoginInfo(oData)
{
	if(oData)
	{
		loginfo = oData;
		SetLoginHTML();
	}
}

function SetLoginHTML()
{
	try
	{
		var sBuf = "";
		sBuf = document.getElementById("newheader-tab-msg").innerHTML;

		sBuf = sBuf.replace("%ZoZo_CT_Number%",loginfo.CartNumber);
		sBuf = sBuf.replace("%ZoZo_CT_Price%", loginfo.CartPrice);

		var sMemberID = "";
		if( loginfo.MemberID == "" ){
			if(document.cookie)
			{
				var cookies = document.cookie.split("; ");
				for(var i = 0 ; i < cookies.length ; i++)
				{
					var str = cookies[i].split("=");
					if(str[0] == 'M')
					{
						sMemberID = unescape(str[1]);
					}

					if(str[0] == 'S')
					{
						loginfo.LoginName = unescape(str[1]);
					}

					if(str[0] == 'T')
					{
						loginfo.Point = unescape(str[1]);
					}
				}
			}
		}

		if( sMemberID != "" ){
//			sBuf = sBuf.replace("%ZoZo_Usr_Point%", "&nbsp;" + loginfo.Point + "pt&nbsp;");
			sBuf = sBuf.replace("%ZoZo_Usr_Name%", loginfo.LoginName);
		}
		else if( loginfo.MemberID == "" ){
//			sBuf = sBuf.replace("%ZoZo_Usr_Point%", "");
			sBuf = sBuf.replace("%ZoZo_Usr_Name%", "ゲスト");
		}else{
//			sBuf = sBuf.replace("%ZoZo_Usr_Point%", "&nbsp;" + loginfo.Point + "pt&nbsp;");
			sBuf = sBuf.replace("%ZoZo_Usr_Name%", loginfo.LoginName);
		}
		sBuf = sBuf.replace("%encoded_url%", escape(location.href));
		sBuf = sBuf.replace("%encoded_url%", escape(location.href));
		sBuf = sBuf.replace("%encoded_url%", escape(location.href));

		document.getElementById("newheader-tab-msg").innerHTML = sBuf;

		if( sMemberID != "" ){
			document.getElementById("login_info_login").style.display = 'none';
			document.getElementById("login_info_nologin").style.display = 'none';
		}
		else if( loginfo.MemberID == "" ){
			document.getElementById("login_info_login").style.display = 'none';
			document.getElementById("login_info_autologin").style.display = 'none';
		}else{
			document.getElementById("login_info_nologin").style.display = 'none';
			document.getElementById("login_info_autologin").style.display = 'none';
		}

		document.getElementById("newheader-tab-msg").style.visibility = "visible";

		document.getElementById("no_message").innerHTML = document.getElementById("no_message").innerHTML.replace("%encoded_url%", escape(location.href));
	}
	catch(e){}

}

//==============================================================================
// MY PAGE
//==============================================================================
var newheader;   // コンテンツ
var tab_button;  // タブ
var now_id = -1; // 現在選択中のID
var now_height;  // 現在のメニュー高さ
var intval=0;    // タイマー

function myPage(menu_width, id)
{
	//オブジェクト取得
	newheader  = document.getElementById("newheader");
	tab_button = document.getElementById("newheader-tab-button");
	
	//現在高さ取得
	now_height = newheader.style.height.replace("px", "") + "";
	now_height = (now_height == "") ? 0 : eval(now_height);

	//開閉判定
	var close_flg = 0;
	if(now_id != id && now_id != null)
	{
		if(now_height > menu_width)
			closeMenu(1, menu_width, id); //縮める
		else
			openMenu(1, menu_width, id);  //拡げる
	}
	else
	{
		if(now_height >= menu_width)
		{
			closeMenu(1, 0, -1);         //閉じる
			close_flg = 1;
		}
		else
			openMenu(1, menu_width, id); //開く
	}

//	'▼Del. T.Mitsuji 2010/01/26 [RequestID:2274] 各サイトのツールバーの改善
	//クリックカウント
//	if(!close_flg) clickcount(id);
//	'▲Del. T.Mitsuji 2010/01/26 [RequestID:2274] 各サイトのツールバーの改善

	//タブ状態変更
	var img_counter = 3;
	var div_arr = tab_button.getElementsByTagName('DIV');
	for(var i=0; i<div_arr.length; i++)
	{
		//一親等確認
		if(div_arr[i].parentNode.id == "newheader-tab-button")
		{
			//2009/09/11 ニュース削除対応
			if(img_counter != 3){
				var x = div_arr[i].style.backgroundImage;
				//選択確認
				if(close_flg)
				{
					//閉(非選択時)n
					div_arr[i].getElementsByTagName('IMG')[0].src = IMAGE_PATH + "headtab" + img_counter + "_n.gif";
					div_arr[i].style.zIndex = 0;
					div_arr[i].style.borderTop = "0px";
				}
				else if(div_arr[i].id != "newheader-tab-button" + id)
				{
					//開(非選択時)o
					div_arr[i].getElementsByTagName('IMG')[0].src = IMAGE_PATH + "headtab" + img_counter + "_n.gif";
					div_arr[i].style.zIndex = 0;
					div_arr[i].style.borderTop = "1px solid #000000";
				}
				else
				{
					//開(選択時)s
					div_arr[i].getElementsByTagName('IMG')[0].src = IMAGE_PATH + "headtab" + img_counter + "_s.gif";
					div_arr[i].style.zIndex = 3;
					div_arr[i].style.borderTop = "0px";
				}
			}
			img_counter--;
		}
	}
	return 0;
}
//====================================
//メニューを開く
// -----------------------------
// flg: 1(初期化) 0(アクション)
// menu_width: アクション後の幅
// id: アクション対象レイヤーID
//====================================
function openMenu(flg, menu_width, id)
{
	//document.getElementById("item_order").style.visibility = "hidden";
	if(flg)
	{
		//インターバル
		if(intval > 0) clearInterval(intval);
		intval = setInterval("openMenu(0," + menu_width + "," + id + ")", 1);
		
		//IE SELECT BOX対応
		if(navigator.userAgent.indexOf('IE') > -1)
		{
			try{
				var combo = document.getElementsByTagName('SELECT');
				for(var i=0; i<combo.length; i++) combo[i].style.visibility = "hidden";
			}catch(e){}
		}
			
		//メニュー選択
		setMenuDisplay(id);
	}
	else
	{
		var incPnt  = 200;
		var calcMax = menu_width - incPnt;

		if(now_height >= calcMax)
		{
			newheader.style.height = menu_width + "px";
			tab_button.style.top   = eval(menu_width) - 1 + "px";
			
			//Safariフラッシュ対応
			if(navigator.userAgent.indexOf('Safari') > -1)
			{
				try{
					var flash = document.getElementsByTagName('EMBED')[0];
					flash.width = "0px";
					flash.parentNode.width = "0px";
				}catch(e){}
			}
			clearInterval(intval);
			intval = 0;
			now_id = id;
			return;
		}
		//拡大
		now_height += incPnt;
		newheader.style.height = now_height + "px";
		tab_button.style.top   = now_height + "px";
	}
}
//====================================
////メニューを閉じる
// -----------------------------
// flg: 1(初期化) 0(アクション)
// menu_width: アクション後の幅
// id: アクション対象レイヤーID
//====================================
function closeMenu(flg, menu_width, id)
{
	if(flg)
	{
		//インターバル
		if(intval > 0) clearInterval(intval);
		intval = setInterval("closeMenu(0," + menu_width + "," + id + ")", 1);
		
		if(menu_width == 0)
		{
			//Safariフラッシュ対応
			if(navigator.userAgent.indexOf('Safari') > -1)
			{
				try{
					var flash = document.getElementsByTagName('EMBED')[0];
					flash.width = "900px";
					flash.parentNode.width = "900px";
				}catch(e){}
			}
		}
		else
		{
			//メニュー選択
			setMenuDisplay(id);
		}
	}
	else
	{
		var decPnt  = 200;
		var calcMin = menu_width + decPnt;
		
		if(calcMin >= now_height)
		{
			newheader.style.height = menu_width + "px";
			
			if(menu_width == 0)
			{
				setMenuDisplay(id);
			
				//IE SELECT BOX対応
				if(navigator.userAgent.indexOf('IE') > -1)
				{
					try{
						var combo = document.getElementsByTagName('SELECT');
						for(var i=0; i<combo.length; i++) combo[i].style.visibility = "visible";
					}catch(e){}
				}
			}
			else
				menu_width = eval(menu_width) - 1;
			
			tab_button.style.top   = menu_width + "px";
				
			clearInterval(intval);
			intval = 0;
			now_id = id;
			return;
		}
		//縮小
		now_height -= decPnt;
		newheader.style.height = now_height + "px";
		tab_button.style.top   = now_height + "px";
	}
}
//====================================
//コンテンツ取得
// -----------------------------
// id: アクション対象レイヤーID
//====================================
function setMenuDisplay(id)
{
	var cnt_arr = newheader.getElementsByTagName('DIV');
	var counter = 0;
	
	for(var i=0; i<cnt_arr.length; i++)
	{
		if(cnt_arr[i].parentNode.id == "newheader")
		{
			cnt_arr[i].style.display = (counter == id && id != -1) ? "block" : "none";
			counter++;
		}
	}
	
	document.getElementById("item_order").style.visibility = "hidden";
	//お気に入り情報取得
	if(id == 1) setFavorite();
	//ニュース情報取得
	//else if(id == 3) setNews();
}
//====================================
//マウスオーバー時タグスタイル
//----------------------------
// elem:選択タグ
//====================================
function over_style(elem, id)
{
	elem.style.cursor = "pointer";
	
	if(now_id == id ) return;

	//背景画像セット
	elem.src = IMAGE_PATH + "headtab" + id + "_o.gif";
}
//====================================
//マウスアウト時タグスタイル
//----------------------------
// elem:選択タグ
//====================================
function out_style(elem, id)
{
	elem.style.cursor = "auto";
	
	if(now_id == id ) return;
	
	//背景画像セット
	elem.src = IMAGE_PATH + "headtab" + id + "_n.gif";
}

//==============================================================================
// お気に入りJSON 動的ロード
//==============================================================================
function loadList()
{
	var jsElement=document.createElement("script");
	var oDate = new Date();
	jsElement.type="text/javascript";
	jsElement.src= FAVORITE_DATA_PATH + '?dummy=' + encodeURIComponent(oDate.toString() + ' ' + oDate.getMilliseconds());
	document.getElementsByTagName("head")[0].appendChild(jsElement);
}
//==============================================================================
// お気に入りデータ表示
//==============================================================================
function setFavorite()
{
	try{
		loadList();
		onLoadData(g_oData);
	}
	catch(e)
	{
		//JSON読込み
		loadList();
	}
}
function onLoadData(g_oData)
{

	//お気に入り登録データ初期化
	var td_tag = document.getElementById("newheader-favorite-table").getElementsByTagName("TD");
	for(var i=0; i<td_tag.length; i++) if(td_tag[i].id != "") td_tag[i].innerHTML = "";
	
	
	//お気に入り登録データ数
	var D = 0;
	try{
		fav_count = g_oData.length - 1;
		wishListCount = fav_count;
	}catch(e)
	{
		//データ取得失敗
		document.getElementById("no_message").style.display = "block";
		return;
	}
	if(fav_count < 1)
	{
		//登録なし
		document.getElementById("no_favorite").style.display = "block";
		document.getElementById("list_status").style.visibility = "hidden";
		document.getElementById("item_order").style.visibility = "hidden";
		return;
	}
	else
	{
		document.getElementById("list_status").style.visibility = "visible";
		document.getElementById("item_order").style.visibility = "visible";
	}
	
	//1ページに表示するアイテム数
	var page_size = 12;
	//総ページ数
	var page_cnt = (fav_count % page_size == 0) ? (fav_count / page_size) : Math.floor((fav_count / page_size) + 1); 
	//ページ詳細バー -----------------------------------------------------------
	var page_bar = document.getElementById("page_bar").getElementsByTagName('DIV')[2];
	//表示中のページ番号
	var page_num = (page_bar.id != "") ? page_bar.id : 1;
	page_bar.id = page_num;
	page_bar.innerHTML = page_cnt + "ページ中" + page_num + "ページ（計：" + fav_count + "点）";
	
	//表示順判定 ---------------------------------------------------------------
	var item_order = document.getElementById("item_order").getElementsByTagName('DIV')[0];
	var order_flg = (item_order.id != "") ? item_order.id : 1;
	order_flg = (order_flg != 0) ? 0 : fav_count-1;

	if(order_flg == 0)
	{
		var orderLink =item_order.getElementsByTagName('SPAN');
		orderLink[0].innerHTML = "新→古";
		orderLink[1].innerHTML = "";

		var oAnchor=document.createElement("A");
		oAnchor.href="javascript:setOrder(0)";
		oAnchor.innerHTML = "古→新";
		orderLink[1].appendChild(oAnchor);
	}
	else
	{
		var orderLink =item_order.getElementsByTagName('SPAN');
		orderLink[1].innerHTML = "古→新";
		orderLink[0].innerHTML = "";

		var oAnchor=document.createElement("A");
		oAnchor.href="javascript:setOrder(1)";
		oAnchor.innerHTML = "新→古";
		orderLink[0].appendChild(oAnchor);
	}
	
	//お気に入りデータ挿入 -----------------------------------------------------
	var td_tag = document.getElementById("newheader-favorite-table").getElementsByTagName("TD");
	var start_num = (page_num-1) * page_size;
	var end_num   = start_num + page_size;
	if(end_num > fav_count) end_num = fav_count
	for(var i=0; i<td_tag.length; i++)
	{
		if(td_tag[i].id != "")
		{
			td_tag[i].innerHTML = makeFavoriteBox(Math.abs(order_flg - start_num));
			if(++start_num >= end_num) break;
		}
	}

	//ページ遷移ボタン ---------------------------------------------------------
	if(page_cnt > 1)
	{
		//前へ
		var objPrev = document.getElementById("prev_link");
		var prev_link = "前の" + page_size + "件";
		objPrev.getElementsByTagName('A')[0].innerHTML = (page_num > 1) ? prev_link : "";
		objPrev.style.display = (page_num > 1) ? "block" : "none";

		//次へ
		var objNext = document.getElementById("next_link");
		if(page_num == page_cnt-1) page_size = fav_count - (page_num * page_size);
		var next_link = "次の" + page_size + "件";

		objNext.getElementsByTagName('A')[0].innerHTML = (page_num < page_cnt) ? next_link : "";
		objNext.style.display = (page_num < page_cnt) ? "block" : "none";
	}
	else
	{
		//前へ
		document.getElementById("prev_link").style.display = "none";
		//次へ
		document.getElementById("next_link").style.display = "none";
	}
	
}
//==============================================================================
// お気に入り アイテムボックスの生成
//==============================================================================
function makeFavoriteBox(id)
{
	var box = "";
	try{
		var ImageURL     = g_oData[id].ImageURL;
		if(location.protocol == "https:") ImageURL = ImageURL.replace(IMG_HOST, IMG_SSL);
		var CategoryName = g_oData[id].CategoryName;
		var BrandName    = g_oData[id].BrandName;
		var PlayerName   = g_oData[id].PlayerName;
		var WishRegistDT  = g_oData[id].WishRegistDT.split(":")[0] + ":" + g_oData[id].WishRegistDT.split(":")[1];
		var Name         = g_oData[id].Name;
		var Price        = g_oData[id].Price;
		var ChildID      = g_oData[id].ChildID;
		
		//取得した変数を下記変数に格納
		box = '<div id="newheader-favorite-box" onmouseover="setbackground(this,' + id + ')" onmouseout="resetbackground(this,' + id + ')">' +
			  '<div id="data">' +
			  '<div id="img">' +
			  '<table border="0" width="55" height="70" cellpadding="0" cellspacing="0">' +
			  '<tr><td valign="middle" align="center">' +
			  '<a href="' + RESORT_PATH + '/?c=gr&gid=' + ChildID + '&rid=1007"><img src="' + ImageURL + '" width="50px" height="60px"></a>' +
			  '</td></tr>' +
			  '</table>' +
			  '</div>' +
			  '<div id="str">' +
			  '<div id="top">' +
			  '<div id="left">' +
			  '<p>' + WishRegistDT + '<input type="checkbox" name="remove' + id + '" id="remove' + id + '" value="' + ChildID + '"></p>' +
			  '</div>' +
			  '<!-- div class="right" id="del' + id + '" onclick="DeleteFavoriteBox(' + ChildID + ');return false;" onmouseover="this.style.cursor=' +
			  "'pointer';" + '" onmouseout="this.style.cursor=' + "'auto';" + '"></div -->' +
			  '</div>' +
			  '<div id="bottom">' +
			  '<p>' + Name + '</p>' +
			  '<p>' + BrandName + '</p>' +
			  '<p>￥' + Price + '</p>' +
			  '</div>' +
			  '</div>' +
			  '</div>' +
			  '</div>';
			  
			  
		box = 	'<div class="fv_goods"><div class="fv_goodsdetail">' + 
				'<a href="' + RESORT_PATH + '/?c=gr&gid=' + ChildID + '&rid=1007"><img src="' + ImageURL + '" width="125px" height="150px"></a>' + 
				'<ul class="data">' + 
				'<li class="brand"><input type="checkbox" name="remove' + id + '" id="remove' + id + '" value="' + ChildID + '"><span>' + BrandName + '</span></li>' + 
				'<li class="price">&yen;' + Price + '</li>' + 
				'<li class="stock"></li>' + 
				'</ul>' + 
				'</div></div>';
								
	}
	catch(e){}
	
	return box;
}

function OnRemoveWishList(result, smessage){

	switch(result){
		case 0:
			alert('お気に入りを削除をしました。');
			break;
		default:
			alert('お気に入りの削除に失敗しました。');
			break;
	}

	//表示中のアイテムを全消去
	setFavorite();
	var page_bar = document.getElementById("page_bar").getElementsByTagName('DIV')[2];
	page_bar.id = 1;
	ResetFavoriteBox();
}

//===================================
//表示リセット
//===================================
function ResetFavoriteBox()
{
	//表示中のアイテムを全消去
	var td_tag = document.getElementById("newheader-favorite-table").getElementsByTagName("TD");
	for(var i=0; i<td_tag.length; i++) if(td_tag[i].id != "") td_tag[i].innerHTML = "";
	
	//リセット
	onLoadData(g_oData);
}
//===================================
// 表示順設定
// flg: 1(新→古) 0(古→新)
//===================================
function setOrder(flg)
{
	//表示順識別フラグの登録
	var item_order = document.getElementById("item_order").getElementsByTagName('DIV')[0];
	item_order.id = flg;
	
	//ページ番号リセット
	var page_bar = document.getElementById("page_bar").getElementsByTagName('DIV')[2];
	page_bar.id = 1;
	
	//リセット
	ResetFavoriteBox();
}
//===================================
// ページ番号設定
// flg: 1(前へ) 0(次へ)
//====================================
function setPage(flg)
{
	//ID更新
	var page_bar = document.getElementById("page_bar").getElementsByTagName('DIV')[2];
	page_bar.id = (flg == 1) ? eval(page_bar.id) - 1 : eval(page_bar.id) + 1;

	//リセット
	ResetFavoriteBox();
}

//===================================
//削除処理
function DeleteFavoriteBox(id)
{
	//Delete処理 ====================
	alert("(header.js) DeleteFavoriteBox :" + id);
	//===============================
	
	//リセット
	ResetFavoriteBox();
}
//===================================
//お気に入りアイテム背景画像変更
function setbackground(oBack, id)
{
	try{
	oBack.style.backgroundImage = "url('" + IMAGE_PATH + "icon_newheader_favoritebox1.gif')";
	oBack.style.color="#FFFFFF";
	document.getElementById("del" + id).style.backgroundImage = "url('" + IMAGE_PATH + "icon_mypage_box4.gif')";
	}catch(e){}
}
function resetbackground(oBack, id)
{
	try{
	oBack.style.backgroundImage = "url('" + IMAGE_PATH + "icon_newheader_favoritebox.gif')";
	oBack.style.color="#000000";
	document.getElementById("del" + id).style.backgroundImage = "url('" + IMAGE_PATH + "icon_mypage_box1.gif')";
	}catch(e){}
}


var g_mOnRemoveWishList;
//===================================
//お気に入り削除
//===================================
function removeWishList()
{
	var svalue = "";
	for(var i=0; i < wishListCount; i++)
	{
		var elementName = "remove" + i;
		var element = document.getElementById(elementName);
		if (element != null)
		{
			if (element.checked) svalue += element.value + ",";
		}
	}
	
	if (svalue != "")
	{
		var oDate = new Date();
		var oScript = document.createElement('script');
		{
			oScript.language = 'javascript';
			oScript.src = FAVORITE_DEL_PATH + '?caid=5&csid='+svalue+'&dummy=' + encodeURIComponent(oDate.toString() + ' ' + oDate.getMilliseconds());
//window.prompt("",oScript.src);
		}
		
		document.getElementsByTagName('head')[0].appendChild(oScript);
	}
}





//==============================================================================
// ニュース
//==============================================================================
var number;
var myInterval;
var counter;
var position;
var newsflash;
var news;

/*
function setNews()
{
	try{ onSelectNewsList(oData); }
	catch(e){}
}
*/

function onSelectNewsList(oData)
{
	if(oData)
	{
		//ヘッドライン生成
		number = 0;
		news   = oData;
		if(news_start == 0) NewsFlash(0);
	}
}

function setNews()
{
		try
		{
			document.getElementById("newheader-news-foot").style.visibility = "visible";
			document.getElementById("no_news").style.display = "none";
			
			//ニュースデータ数取得
			var MaxNewsLine = 18;
			var news_count = news.length - 1;
			if(news_count > MaxNewsLine) news_count = MaxNewsLine;
	
			document.getElementById('newslist').innerHTML = '';
			
			var newslist = "";
			for(i in news)
			{
				var NewsLink = RESORT_PATH + '/news/' + news[i].NewsFileName;
				NewsLink = "<a href='" + NewsLink + "'>" + news[i].Title2 + "</a>";
				var ShopLink = RESORT_PATH + "/shop/" + news[i].ShopPath + "/";
				ShopLink = "<a href='" + ShopLink + "'>" + news[i].ShopName + "</a>";
				newslist = newslist + "<br>・" + NewsLink + "&nbsp;(&nbsp;" + ShopLink + "&nbsp;&nbsp;" + SetNewsDate(news[i].OpenDT) + "&nbsp;)";
				
				if(MaxNewsLine-- < 0) break;
			}
			document.getElementById('newslist').innerHTML = newslist;
		}
		catch(e){}
}
function SetNewsDate(newsdate)
{
	var buf = newsdate.split("/")[2].split(" ");
	return buf[0] + "日 " + buf[1].slice(0, 5);
}

//=====================================
// ヘッダーニュース動作制御
//=====================================
var timeout = 0;
function NewsFlash(flg)
{
	if(news)
	{
		switch ( flg )
		{
		case 0: //初期化
			try
			{
				newsflash = document.getElementById("newsline");
				counter   = 0;
				position  = 180;
				newsflash.style.top = "0px";
				newsflash.style.left = position + "px";
				
				newsflash.href = RESORT_PATH + '/news/' + news[number].NewsFileName;
				newsflash.innerHTML = news[number].Title;
				
			 	myInterval=setInterval("NewsFlash(1)",130);
			 	
			 	
			 	news_start = 1;
			 	//if(timeout != 0) clearTimeout(timeout);
		 	}
			catch(e)
			{
				number = flg;
				//timeout = setTimeout('NewsFlash(0)', 2000);
			}
		 	break;
		case 1: //文字列移動
			if(position > 0)
			{
				position-=10;
				newsflash.style.left = position + "px";
			}
			else
			{
				clearInterval( myInterval );
				setTimeout("NewsFlash(2)", 2000); //2秒待機
			}
			break;
		case 2: //停止後再動作
			myInterval=setInterval("NewsFlash(3)",150);
			break;
		case 3: //先頭文字消去
			if (counter >= (news[number].Title).length)
			{
				position = 180;
				newsflash.style.left = position + "px";
				number = ( number >= (news.length-2) ) ? 0 : (number+1);
				clearInterval( myInterval );
				setTimeout("NewsFlash(0)", 2000); //2秒待機
			}
			else
				newsflash.innerHTML = news[number].Title.slice(++counter);
			break;
		}
	}
}
//=====================================
// ヘッダーニュースリンククリック処理
//=====================================
function jump()
{
	location.href = document.getElementById("newsline").href;
}
//=====================================
// クリックカウント送信処理
//=====================================
var counter = 0;
function clickcount(tab)
{
	try{
	    var id = "click_header";
	    var path = CLICK_PATH;
	    //パス付加
	    path += "?p=" + location.hostname + location.pathname;
	    //タブID付加
	    path += "&tab=" + tab + "&uq=" + counter++;
	    //ユニークカウンター付加
	    path += "&uq=" + counter++;
	    
	    if(document.getElementById(id) == null)
	    {
	    	//IMG生成
		    var imgElement=document.createElement("img");
		    imgElement.id = id;
			imgElement.width = "1px";
			imgElement.height = "1px";
			imgElement.border = "0px";
			imgElement.src = encodeURI(path);
			//20080411 tashiro
			//document.body.appendChild(imgElement);
			//document.getElementById("click_header").appendChild(imgElement);
		}
		else
		{
			document.getElementById(id).src = encodeURI(path);
		}
	}
	catch(e){}
}
//]]>