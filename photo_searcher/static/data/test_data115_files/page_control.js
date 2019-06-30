/******************************************************************************/
/* とりネット用JavaScript                                                     */
/******************************************************************************/

/******************************************************************************/
/* Cookie有効チェック                                                         */
/*   Cookieが利用可能かチェックを行う。                                       */
/*   利用可能であれば true を戻し、利用不可であれば false を戻す              */
/******************************************************************************/
function ConfirmCookie() {
	document.cookie = "cookietest=ok";
	if( ReadCookie( "cookietest" ) == "ok" ) {
		return true;
	} else {
		return false;
	}
}

/******************************************************************************/
/* Cookie取得                                                                 */
/*   パラメータで指定されたCookieの値を取得する。                             */
/******************************************************************************/
function ReadCookie( name ) {
	var key       = " " + name + "=";
	var cookiestr = " " + document.cookie + ";";
	var start     = cookiestr.indexOf( key );
	if(start != -1) {
		var end = cookiestr.indexOf( ";", start );
		return unescape( cookiestr.substring( start + key.length, end ));
	}
	return "";
}

/******************************************************************************/
/* Cookie設定                                                                 */
/*   パラメータで指定されたCookieを作成し、値を設定する。                     */
/******************************************************************************/
function CreateCookie( name, value, expire ) {
	if( value == null ) {							/* 値が無ければ cookie を消去 */
		var expire = new Date();
		expire.setTime(expire.getTime() - 1000*60*60*24);		/* １日 */
	}
	document.cookie = name + '=' + (( value == null || value == '' ) ? '' : escape( value ))
	+ (( expire == null ) ? '' : ( '; expires=' + expire.toGMTString() ))
	+ "; domain=.pref.tottori.lg.jp"					
	+ "; path=/";
}

/******************************************************************************/
/* フォントのリサイズを行う                                                   */
/******************************************************************************/
function FontResize(val) {
	if( val == 0 ) {
		fsize = 4;							/* フォントサイズの標準を 4 に設定 */
	}

	fsize = fsize + val;							/* フォントサイズ にパラメータ指定された値をプラスする */

	if( fsize > 6) {							/* フォントサイズ が 6 より大きい時 */
		alert( "これ以上大きくできません" );				/* 警告メッセージの表示 */
		fsize = 6;							/* フォントサイズを 6 に設定 */
		return false;							/* 処理終了 */
	}

	if( fsize < 4 ) {							/* フォントサイズ が 4 より小さい時 */
		alert("これ以上小さくできません");				/* 警告メッセージの表示 */
		fsize = 4;							/* フォントサイズを 6 に設定 */
		return false;							/* 処理終了 */
	}

	SetFontsize( fsize );							/* フォントサイズの設定を実施 */
	CreateCookie( "FontSize", fsize == 4 ? null:fsize, null );		/* Cookieに情報を記録 */

	if( fsize == 4) {							/* フォントサイズが 4 の時 */
		document.location.reload(); 					/* 標準サイズは細かいサイズ違いがあるのでリロードする */
	}
}

/******************************************************************************/
/* フォントサイズの設定を実施                                                 */
/******************************************************************************/
function SetFontsize( val ) {
	var sizing   = new Array('92%','94%','small','100%','101%','102.5%','105%');
	var tagkinds = new Array('div','span','h2','h3','h4','h5','h6','td','address','em','li','dt','dd','p','strong');
	fsize = 4;
	cnt = 0;
	var tagsstr = "";
	if( ! isNaN( val ) && val != "" ) {
		fsize = eval( val );						/* 標準サイズ以外はリサイズ */
		if( fsize != 4 ) {
			document.body.style.fontSize = sizing[fsize - 1];
			for( vi = 0 ; vi < tagkinds.length ; vi ++ ) {
				tags = document.getElementsByTagName(tagkinds[vi]);
				if( tags != null ) {
					for( vj = 0 ; vj < tags.length ; vj++ ) {
						tags[vj].style.fontSize = sizing[fsize - 1];
						cnt ++;
					}
				}
			}
		}
	}

	//元にもどす関連コントロールの非表示
	var typ=document.getElementById("typical");
	if( typ ) {
		typ.style.display = (fsize == 4 ? "none":"block");
	}
	//大きくする関連コントロールの非表示
	var typ=document.getElementById("bigfont");
	if( typ ) {
		typ.style.display = (fsize == 6 ? "none":"block");
	}
	//スペーサー関連コントロールの非表示
	var typ=document.getElementById("spacer");
	if( typ ) {
		typ.style.display = (fsize == 6 ? "block":"none");
	}	
	//非表示等関連コントロールの非表示
	var typ=document.getElementById("hide_switch");
	if( typ ) {
		typ.style.display = (fsize == 4 ? "block":"none");
	}
}

/******************************************************************************/
/* 利用するスタイルシートを設定                                               */
/******************************************************************************/
function setActiveStyleSheet( title ) {
	var i, a, main;
	for( i = 0 ; (a = document.getElementsByTagName("link")[i]) ; i ++ ) {
		if( a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
			a.disabled = true;
			if(a.getAttribute("title") == title) {
				a.disabled = false;
			}
		}
	}
	CreateCookie( "style", getActiveStyleSheet(), null );	/* 現在利用中のスタイルシートの情報をCookieに記録 */
}

/******************************************************************************/
/* 利用中のスタイルシートの名前を取得                                         */
/******************************************************************************/
function getActiveStyleSheet() {
	var i, a;
	for( i = 0 ; (a = document.getElementsByTagName("link")[i]) ; i ++ ) {
		if( a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled ) {
			return a.getAttribute("title");
		}
	}
	return null;
}

/******************************************************************************/
/* 優先されるスタイルシートの名前を取得                                       */
/******************************************************************************/
function getPreferredStyleSheet() {
	var i, a;
	for( i = 0; (a = document.getElementsByTagName("link")[i]) ; i ++ ) {
		if( a.getAttribute("rel").indexOf("style") != -1 &&
		    a.getAttribute("rel").indexOf("alt") == -1   &&
		    a.getAttribute("title")) {
			return a.getAttribute( "title" );
		}
	}
	return null;
}

/******************************************************************************/
/* ツールバーの表示／非表示の切り替え                                         */
/******************************************************************************/
function DispToolbar( value ) {
	CreateCookie( "disp_toolbar", value, null );				/* Cookieに情報を記録 */
	document.location.reload();						/* リロード */
}

/******************************************************************************/
/* ツールバーを表示                                                           */
/******************************************************************************/
function TorinetToolbar() {
	if( ConfirmCookie() ) {
		/**************************************************************/
		/* Cookieが利用可能な場合                                     */
		/**************************************************************/
		if( ReadCookie( "disp_toolbar" ) == "0" ) {
			/******************************************************/
			/* ツールバーに表示させるボタンを表示                 */
			/******************************************************/
			document.write( '<div id="display_controller_hide">' );		/* margin-top:-1.8emとmargin-bottom:-2.2emとposition:static; を指定  */
			document.write( '<div id="sitesign"><a href="#lastmenu"><img src="images/spacer.gif" alt="本文にジャンプします。" width="1" height="1" class="float" border=0></a><a name="#top"><img src="images/spacer.gif" alt="鳥取県・とりネットです。" width="1" height="1" class="float" border=0></a></div>' );
			document.write( '<div id="hide_switch2">' );
			document.write( '<a href="http://www.pref.tottori.lg.jp/dd.aspx?menuid=123497">閲覧支援ツールの使い方</a>　<a onclick="DispToolbar( \'1\' ); return false;" href="#" title="閲覧支援ツールのボタンを表示">ツールのボタンを表示</a>' );
			document.write( '</div >' );
			document.write( '<br style="clear:both;">' );
			document.write( '</div><br class="clear">' );
		} else {
			/******************************************************/
			/* 文字サイズ変更ボタンを画面上に表示させる           */
			/******************************************************/
			document.write( '<div id="display_controller">' );
			document.write( '<div id="sitesign"><a href="#lastmenu"><img src="images/spacer.gif" alt="本文にジャンプします。" width="1" height="1" class="float" border=0></a><a name="#top"><img src="images/spacer.gif" alt="鳥取県・とりネットです。" width="1" height="1" class="float" border=0></a></div>' );
			document.write( '<ul id="hide_switch">' );
			document.write( '<li><a href="http://www.pref.tottori.lg.jp/dd.aspx?menuid=123497" title="閲覧支援ツールの使い方">ツールの使い方</a></li>' );
			document.write( '<li><a onclick="DispToolbar( \'0\' ); return false;" href="#" title="ツールのボタンを非表示">ボタンを非表示</a></li>' );
			document.write( '</ul>' );			
			document.write( '<dl id="lettersize_control">' );
			document.write( '<dt>文字サイズ変更</dt>' );
			document.write( '<dd id="bigfont"><a href="#" onclick="FontResize(1); return false;" title="文字サイズを大きくする">大きくする</a></dd>' );
			document.write( '<dd id="typical"><a href="#" onclick="FontResize(0); return false;" title="文字サイズを元にもどす">元にもどす</a></dd>' );
			document.write( '</dl>' );
			document.write( '<dl id="background_control">' );
			document.write( '<dt>背景色変更</dt>' );
			document.write( '<dd id=normalb><a onclick="setActiveStyleSheet(\'normal\'); return false;" href="#" title="標準の背景色にする">標準</a></dd>' );
			document.write( '<dd id=blackb><a onclick="setActiveStyleSheet(\'black\'); return false;" href="#" title="背景色を黒にする">黒</a></dd>' );
			document.write( '<dd id=blueb><a onclick="setActiveStyleSheet(\'blue\'); return false;" href="#" title="背景色を青にする">青</a></dd>' );
			document.write( '</dl>' );
			document.write( '</div>' );
			document.write( '<div id="display_controller_spacer">' );
			document.write( '</div>' );
		}
	} else {
		/**************************************************************/
		/* Cookieが利用不可な場合                                     */
		/**************************************************************/
		document.write( '<div id="display_controller_noncookie">' );	/* margin-top:-1.8emとmargin-bottom:-2.2emとposition:static; を指定  */
		document.write( 'クッキーを有効にしていただくと、文字サイズや背景色の変更機能をご利用いただけます。' );
		document.write( '</div>' );
	}
}

/******************************************************************************/
/* ページの背景色／文字サイズを変更                                           */
/******************************************************************************/
function PageEffector() {
	SetFontsize( ReadCookie( "FontSize" ));					/* 利用する文字サイズの情報を取得     */
	var cookie = ReadCookie( "style" );					/* 利用するスタイルシートの情報を取得 */
	var title  = cookie ? cookie : getPreferredStyleSheet();		/* Cookie情報を生成                   */
	setActiveStyleSheet(title);						/* スタイルシートを設定               */
}
