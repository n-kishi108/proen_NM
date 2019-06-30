var nameColorSet   = "pagecolor";		// クッキーの名前

function loadCookie(){
}

function loadCookieColorSet(){
	if (document.cookie) {
		var value = 'c-black';
		// 発行したクッキーの取得（読み込み）
		var cookies = document.cookie.split("; ");
		for (var i = 0; i < cookies.length; i++) {
			var str = cookies[i].split("=");
			if (str[0] == nameColorSet) {
				value = unescape(str[1]);
				break;
			}
		}
		cc(value);
	}else{
		// クッキーが存在しない場合（初回アクセス時）
		// setCookieColorSet("c-black");
		cc("c-black");
	}
}

function setCookie(CSSnameColorSet){
}

function setCookieColorSet(CSSnameColorSet){
	var period = 30;					// 有効期限日数

	// 有効期限の作成
	var nowtime = new Date().getTime();
	var clear_time = new Date(nowtime + (60 * 60 * 24 * 1000 * period));
	var expires = clear_time.toGMTString();
	// クッキーの発行（書き込み）
	document.cookie = nameColorSet + "=" + escape(CSSnameColorSet) + "; expires=" + expires;
}

function cc(CSSnameColorSet){
	document.getElementById('ColorStyle').href="/common/css/"+CSSnameColorSet+".css";
	setCookieColorSet(CSSnameColorSet);
}
