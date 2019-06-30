//=====================================================================

//CSSをOS、ブラウザごとに読み込む関数

//Filename:  cssload.js

//=====================================================================



function cssLoad(){



	//CSSファイル設定

	winIE='/koho/common/css/win_ie.css';

	winNN='/koho/common/css/win_nn.css';

	macIE='/koho/common/css/mac_ie.css';

	macNN='/koho/common/css/mac_nn.css';

	var cssFile='';

	strApp=navigator.appName;

	strAgnt=navigator.userAgent;



	if (strAgnt.indexOf("Win") != -1) {

		if (strApp.indexOf('Microsoft') != -1) {

			cssFile = winIE;

		} else if (strApp.indexOf('Netscape') != -1) {

			cssFile = winNN;

		} else {

			cssFile = winIE; //IEでもNNでもなかったら、IEが標準

		}

	} else if (strAgnt.indexOf("Mac") != -1) {

		if (strApp.indexOf('Microsoft') != -1) {

			cssFile = macIE;

		} else if (strApp.indexOf('Netscape') != -1) {

			cssFile = macNN;

		} else {

			cssFile = macIE;//IEでもNNでもなかったら、IEが標準

		}

	} else {

		cssFile = winIE;//WinでもNNでもなかったら、IEが標準？

	}



	//CSSファイルのリンク書き込み

	if (cssFile != '') {

		document.write('<LINK rel="stylesheet" href="' + cssFile + '">');

	}

}



cssLoad();

function SubWinOpen(winName,url,W,H,f_posX,f_posY){
//サブウインドウオープン
var WinD11 = window.open(url,winName,'top='+f_posY+',left='+f_posX+',screenX='+f_posX+',screenY='+f_posY+',scrollbars=yes,resizable=1,width='+W+',height='+H+'');
WinD11.focus();
}