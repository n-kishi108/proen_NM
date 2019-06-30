/*
 広告取得と表示で使用される変数。
 広告表示タグに貼られた値や、ページの情報がadvetise.jsとadvertise.htmlによってここに格納される
*/
//cssのクラス名。advetiese.htmlに定義されているものと対応。
var g_format  = "";
//枠線のcolor
var g_boder   = "";
//背景のcolor
var g_bg      = "";
//リンクテキスト部分のcolor
var g_link    = "";
//textのcolor
var g_text    = "";
//link_url表示部分のcolor
var g_url     = "";
//リファラURL
var g_rf      = "";
//サイトID
var g_client  = 0;
//広告の総数
var g_total   = 0;
//開始位置
var g_scount  = 0;
//終了位置
var g_ecount  = 0;


//広告タグが貼られたページのURLを格納する変数
var g_parent_url = "";

//広告情報が格納される配列
var g_advInfoArr = new Array();

//画面内でのクリック回数のカウント用
var g_clickCount = 0;



/*
 コンバージョンのリクエストを発行する関数
*/
function addConv() {
	var membId = location.search.substring(6);
	var cookieStr = getCookie("pitaclick");
	if(cookieStr != null){
		cookieStr = cookieStr.replace("\"","");
		cookieStr = cookieStr.replace("\"","");
		if(cookieStr.charAt(0) != "0"){
			try {
				actionServ("conversion/",true,"m=" + membId + "&c=" + cookieStr);
			} catch(e){
				return null;
			}
		}
	}
}


/*
 広告取得のリクエストを発行する関数
*/
function getAdv() {
	var search = location.search;
	if(search.length > 1){
		var index = search.indexOf('?', 0);
		rf = search.substr(index + 1).split("&prov-rf-end");
		var queryStr;
		//広告クリック時のlink_urlにタグが貼られていた時の対応
		if(rf.length > 2) {
			queryStr = rf[2];
		} else {
			queryStr = rf[1];
		}
		g_rf = rf[0].split("rf=")[1];
		g_parent_url = queryStr.substring(queryStr.indexOf('url', 0));
		g_parent_url = g_parent_url.substring(4);
		var m_Array = queryStr.split("&");
	}
	var QS = new Array;
	for(idx in m_Array){
		QS.push(m_Array[idx].split("="));
		if(QS[idx][0] == "cl") {
			g_client = QS[idx][1];
		}else if(QS[idx][0] == "to") {
			g_total = QS[idx][1];
		}else if(QS[idx][0] == "sc") {
			g_scount = QS[idx][1];
		}else if(QS[idx][0] == "ec") {
			g_ecount = QS[idx][1];
		}else if(QS[idx][0] == "fm") {
			g_format = QS[idx][1];
		}else if(QS[idx][0] == "bd") {
			g_boder = QS[idx][1];
		}else if(QS[idx][0] == "bg") {
			g_bg = QS[idx][1];
		}else if(QS[idx][0] == "lk") {
			g_link = QS[idx][1];
		}else if(QS[idx][0] == "tx") {
			g_text = QS[idx][1];
		}else if(QS[idx][0] == "ur") {
			g_url = QS[idx][1];
		}
	}

	//広告の総数が12個より多い時、一つの枠に４つ以上の広告を表示しようとしている時は処理しない
	if(g_scount > 12 || g_ecount > 12 || g_ecount - g_scount > 4){
		return;
	}

	//広告の取得
	try {
		actionServ("ptad/",true,"ref="+g_rf+"&s="+g_client+"&to="+g_total+"&st="+g_scount+"&en="+g_ecount+"&url="+g_parent_url,"showAdv");
	} catch(e){
		return null;
	}
}


/*
 広告の表示を行う関数
 広告取得のajax通信のコールバック関数となっている
 @bean 表示する広告情報が格納されたjson文字列
*/
function showAdv(bean) {
	if(bean == null){
		return;
	}
	var adList = bean.adList;

	if(bean == null || bean.length < 1) {
		return;
	}
	var i = 0;
	var tdObj = document.getElementById("f_td");

	var tdObjImg = document.getElementById("l_td");
	tdObjImg.style.margin = 0;
	tdObjImg.style.paddingRight = 0;
	tdObjImg.style.backgroundColor = '#' + g_boder;

	document.getElementById("l_a").style.color = complementary(g_boder, "ffffff");

	// TYPE ERROR
	if(bean == null || bean.length < 1) {
		return;
	}

	try{
		if(g_scount > 12 || g_ecount > 12 || g_ecount - g_scount > 4){
			return;
		}
		for(i = g_scount -1; i < g_ecount; i++) {

			g_advInfoArr[i]=new Array(3);
			g_advInfoArr[i][0]=adList[i].encodedAdv_id;
			g_advInfoArr[i][1]=adList[i].encodedKeyword_id;
			g_advInfoArr[i][2]=adList[i].startDate;
			g_advInfoArr[i][3]=adList[i].mt;


			var div = document.createElement('DIV');
			div.setAttribute('id', 'div' + i);
			div.className = 'r' + g_format;

			var img_flag = false;

			if (adList[i].imageList.length > 0) {
				var style = g_format.substring(1,g_format.length);

				for (j = 0;j< adList[i].imageList.length ;j++) {
					var adv_style = adList[i].imageList[j].adv_style;
					if (style == adv_style){
						var elm0 = document.createElement('A');
						elm0.setAttribute('id', 'link0_' + i);
						elm0.setAttribute('target', '_top');
						elm0.href = getClickUrl(i);
						elm0.style.cursor = "pointer";
						elm0.setAttribute('onmouseover', 'return true;');

						var elm1 = document.createElement('IMG');
						elm1.src = location.protocol + "//img.ad.pitattomatch.com/" + adList[i].imageList[j].adv_image_id;
						elm1.width=adv_style.substring(0,adv_style.indexOf('x'));
						elm1.height=adv_style.substring(adv_style.indexOf('x') + 1,adv_style.length);
						elm1.border=0;
						var index = i;
						elm1.onclick = function () { clickStatistics(index); }
						elm0.appendChild(elm1);
						div.appendChild(elm0);
						img_flag = true;
					}
				}
			}
			if (!img_flag) {
				var table = document.createElement('TABLE');
				table.setAttribute('id', 'table' + i);
				var tbody = document.createElement('TBODY');
				var tr = document.createElement('TR');

				var td = document.createElement('TD');
				td.setAttribute('id', 'td' + i);
				var link_area = document.createElement('A');
				link_area.setAttribute('id', 'link_area' + i);
				link_area.setAttribute('target', '_top');
				var td_div = document.createElement('DIV');
				td_div.setAttribute('id', 'td_div' + i);

				var elm3 = document.createElement('SPAN');
				elm3.setAttribute('id', 'link' + i);

				var uelm = document.createElement('U');
				var elm4 = document.createTextNode(decodeURIComponent(adList[i].adv_title.replace(/\+/g," ")));

				uelm.appendChild(elm4);

				elm3.appendChild(uelm);
				td_div.appendChild(elm3);
				var elm4p = document.createElement('BR');
				td_div.appendChild(elm4p);
				var elm5 = document.createElement('SPAN');
				elm5.setAttribute('id', 'text1_' + i);
				var elm5p = document.createTextNode(decodeURIComponent(adList[i].text1.replace(/\+/g," ")));
				elm5.appendChild(elm5p);
				td_div.appendChild(elm5);

				if(adList[i].imp_url == null){
					var elm6 = document.createTextNode(' ');
					td_div.appendChild(elm6);
				}
				var elm7 = document.createElement('SPAN');
				elm7.setAttribute('id', 'text2_' + i);
				var elm7p = document.createTextNode(decodeURIComponent(adList[i].text2.replace(/\+/g," ")));
				elm7.appendChild(elm7p);
				td_div.appendChild(elm7);

				var urlStr = "";
				if(g_bg != g_url){
					var elm8 = document.createElement('BR');
					td_div.appendChild(elm8);
					urlStr = decodeURIComponent(adList[i].disp_url)
				}

				var elm9 = document.createElement('SPAN');
				elm9.setAttribute('id', 'url_' + i);

				var elm13 = document.createElement('A');
				elm13.setAttribute('id', 'link2_' + i);

				if(g_format == "h234x44" || g_format == "rh234x44"){
					urlStr = "";
				}

				var elm10 = document.createTextNode(urlStr);

				elm9.appendChild(elm10);
				td_div.appendChild(elm9);

				var elm11 = document.createElement('BR');
				td_div.appendChild(elm11);

				if(adList[i].imp_url != null){
					var elm12 = document.createElement('IMG');
					elm12.src = adList[i].imp_url;
					td_div.appendChild(elm12);
				}

				td.appendChild(td_div);
				link_area.appendChild(td);
				tr.appendChild(link_area);
				tbody.appendChild(tr);
				table.appendChild(tbody);
				div.appendChild(table);
				setFormat(i,table,td,td_div,elm3,elm5,elm7,elm9,elm13,link_area);
			}
			tdObj.appendChild(div);
		}
	}catch(e){
		return;
	}
}


/*
 広告を表示させるTable要素を生成
*/
function setFormat(index,table,td,td_div,elm3,elm5,elm7,elm9,elm13,link_area) {

	table.className = g_format;
	table.style.borderColor = '#' + g_boder;
	table.style.backgroundColor = '#' + g_bg;
	table.style.margin = 0;
	table.style.paddingRight = 0;

	td.style.verticalAlign = "top";
	td.style.margin = 0;
	td.style.paddingRight = 0;
	td.style.cursor = "pointer";


	td_div.style.overflow = 'hidden';
	var sWidth = getStyleValue('.' + g_format, 'width');
	var wideInt = parseInt(sWidth.substring(0,sWidth.length-2));

	var marginInt = 0;

	if(wideInt >= 200){
		marginInt = 10;
	}
	if(wideInt >= 300){
		marginInt = 25;
	}
	td_div.style.width = wideInt-marginInt-7 + "px";
	td_div.style.marginLeft = marginInt;
	td_div.style.paddingRight = 0;


	link_area.style.cursor = "pointer";
	link_area.href = getClickUrl(index);
	link_area.style.textDecoration = 'none';
	link_area.setAttribute('onmouseover', 'return true;');
	link_area.setAttribute('onclick', 'clickDefend(this);');


	elm3.style.fontWeight = 'bold';
	elm3.style.color = complementary(g_bg, g_link);
	//枠からはみ出す恐れのある広告サイズのフォントを調節
	if(g_format == "h182x74" || g_format == "rh182x74" || g_format == "h234x44" || g_format == "rh234x44"){
		elm3.style.fontSize = "7.5pt";
	}
	if(g_format == "h234x44" || g_format == "rh234x44"){
		elm3.style.fontSize = "7.5pt";
	}

	elm5.style.color = complementary(g_bg, g_text);
	elm7.style.color = complementary(g_bg, g_text);

	//広告サイズと表示デザイン調整
	if(g_format == "v120x112" || g_format == "rv120x112"){
		elm5.style.fontSize = "9pt";
		elm7.style.fontSize = "9pt";
	}

	elm9.style.color = complementary(g_bg, g_url);
	elm9.style.whiteSpace = 'nowrap';

}


/*
 広告クリック時のURLを生成するための関数
 @idx 広告リストのindex
*/
function getClickUrl(idx) {
	var advId = g_advInfoArr[idx][0];
	var keyId = g_advInfoArr[idx][1];
	var yyyyMMddDate = g_advInfoArr[idx][2];
	var matchingType = g_advInfoArr[idx][3];
	var url = "redirect/" + "?a=" + advId + "&k=" + keyId + "&s=" + g_client + "&d=" + yyyyMMddDate + "&m=" + matchingType;
	return url;
}


/*
 画像広告クリック時の動作を定義した関数
 @idx 広告リストのindex
*/
function clickStatistics(idx) {
	if (g_clickCount == 0){
		g_clickCount++;
		top.location.href = getClickUrl(idx);
	}else{
		top.location.href = "javascript:void(0);";
	}
}


/*
 連続クリックを防止するための関数
 @obj a要素
*/
function clickDefend(obj){
	if (g_clickCount == 0){
		g_clickCount++;
	}else{
		obj.href = "javascript:void(0);";
	}
}


/*
 cssクラスで定義されたpropertyの値を取得する関数
 @className cssのクラス名
 @property  property名
*/
function getStyleValue(className, property) {
	className = className.toLowerCase( );
	if(property.indexOf( "-" ) != -1 ) property = property.camelize();
	var rules = document.styleSheets[0].rules //IE
	  || document.styleSheets[0].cssRules; //Mozilla
	for(var i = rules.length - 1; i >= 0; i--) {
		var rule = rules[i];
		if( rule.selectorText.toLowerCase() != className
		  || rule.style[property] == "" ) {
			continue;
		}
		var ret = rule.style[property] || rule.style.getPropertyValue(property);
		return ret;
	}
	return null;
}


/*
 camelize(CSSプロパティ名をJavaScriptでの名前に変換)
*/
String.prototype.camelize = function( ) {
	return this.replace( /-([a-z])/g,
	  function( $0, $1 ) { return $1.toUpperCase( ) } );
}

/*
 deCamelize
*/
String.prototype.deCamelize = function( ) {
	return this.replace( /[A-Z]/g,
	  function( $0 ) { return "-" + $0.toLowerCase( ) } );
}


/*
 補色を取得する関数(と思われる)
 @color1
 @color2
*/
function complementary(color1, color2){
	var colNum;
	var r1 = parseInt("0x" + color1.substring(0, 2));
	var g1 = parseInt("0x" + color1.substring(2, 4));
	var b1 = parseInt("0x" + color1.substring(4, 6));

	var r2 = parseInt("0x" + color2.substring(0, 2));
	var g2 = parseInt("0x" + color2.substring(2, 4));
	var b2 = parseInt("0x" + color2.substring(4, 6));

	var ss = Math.abs(r1 - r2) + Math.abs(g1 - g2) + Math.abs(b1 - b2);
	var ms = Math.abs((((r1 * 299) + (g1 * 587) + (b1 * 114)) / 1000) - (((r2 * 299) + (g2 * 587) + (b2 * 114)) / 1000));

	if (ss < 160 && ms < 50){
		if(r1 >= 128){
			r2 = 60;
		}else{
			r2 = 225;
		}

		if(g1 >= 128){
			g2 = 60;
		}else{
			g2 = 225;
		}

		if(b1 >= 128){
			b2 = 60;
		}else{
			b2 = 225;
		}
	}
	color2 = numToString(r2) + numToString(g2) + numToString(b2);

	return "#" + color2;
}


/*
 数値を文字列に変換
 @num 数値
*/
function numToString(num){
	var str = num.toString(16);
	if(str.length == 1){
		str = "0" + str;
	}
	return str;
}


/*
 cookieの値を取得するための関数
 @cookieName クッキー名
*/
function getCookie(cookieName){
	cookieName = cookieName + "=";
	myValue = null;
	myStr = document.cookie + ";" ;
	myOfst = myStr.indexOf(cookieName);
	if (myOfst != -1){
		myStart = myOfst + cookieName.length;
		myEnd   = myStr.indexOf(";" , myStart);
		myValue = unescape(myStr.substring(myStart,myEnd));
	}
	return myValue;
}


/*
 ajaxによる通信を行うための関数
 @url        リクエストを送るurl
 @isAsync    非同期通信を行う場合はtrue,行わない場合はfalse
 @sendParam  パラメータ文字列
 @funcStr    コールバック関数
*/
function actionServ(url, isAsync, sendParam, funcStr){

	xmlHttp = createXMLHttpRequest();
	try {
		if (xmlHttp){
			xmlHttp.onreadystatechange = function() {
				if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)){
					if(funcStr != ""){
						eval(funcStr + "(eval(xmlHttp.responseText))");
					}
					return null;
				}
				if ((xmlHttp.readyState == 4) && (xmlHttp.status == 404)){
					return null;
				}
			}
			xmlHttp.open("POST",url, isAsync);
			xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
			xmlHttp.send(sendParam);

		}
	} catch(e){}
}


/*
 xmlHttpObjectの生成
*/
function createXMLHttpRequest() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest()
	} else if (window.ActiveXObject) {
		try {
			return new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e2) {
			}
		}
	} else {
		return null;
	}
}


