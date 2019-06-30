var nameFontSet   = "pagefont";		// クッキーの名前

function loadCookieFontSet(){
	if (document.cookie) {
		// 発行したクッキーの取得（読み込み）
		var value = 'f-def';
		var cookies = document.cookie.split("; ");
		for (var i = 0; i < cookies.length; i++) {
			var str = cookies[i].split("=");
			if (str[0] == nameFontSet) {
				value = unescape(str[1]);
				break;
			}
		}
		fc(value);
	}else{
		// クッキーが存在しない場合（初回アクセス時）
		// setCookieFontSet("f-def");
		fc("f-def");
	}
}

function setCookieFontSet(CSSnameFontSet){
	var period = 30;					// 有効期限日数

	// 有効期限の作成
	var nowtime = new Date().getTime();
	var clear_time = new Date(nowtime + (60 * 60 * 24 * 1000 * period));
	var expires = clear_time.toGMTString();
	// クッキーの発行（書き込み）
	document.cookie = nameFontSet + "=" + escape(CSSnameFontSet) + "; expires=" + expires;
}

function fc(CSSnameFontSet){
	document.getElementById('FontStyle').href="http://blog.television.co.jp/common/css/"+CSSnameFontSet+".css";
	setCookieFontSet(CSSnameFontSet);
}





/*
function fc(CSSnameFontSet){
	document.getElementById('FontStyle').href="css/"+CSSnameFontSet+".css";
}
*/
