

/*







     Copyright (c)2009 京つう All Rights Reserved.

                             http://www.kyo2.jp/



*/

// URL取得
var kyo2url = document.URL;

//ドメイン割り出し
if(kyo2url.indexOf("http://") == 0){
	var _arr = kyo2url.split("/");
	kyo2domain = _arr[2];
	
	//サブドメイン割り出し
	var _getsubdomain = kyo2domain.split(".");
	kyo2subdomain = _getsubdomain[0];
	
	//非表示ブログ一覧
	var blogid = new Array;
		
	blogid[0] = 'web';
	blogid[1] = 'event';
	
	blogid[2] = 'hamamura';			//有料案件「口福門」
	blogid[3] = 'yukinaga';			//有料案件「八島丹山（舞鶴行永）」
	blogid[4] = 'yusaku';			//有料案件「八島丹山（本店）」
	blogid[5] = 'niyama';			//有料案件「八島丹山（本店）」
	blogid[6] = 'yashima';			//有料案件「八島丹山（本店）」
	blogid[7] = 'hyak';				//有料案件「百人力」
	blogid[8] = 'shop801';			//有料案件「801御薗橋商店街」
	blogid[9] = 'event801';			//有料案件「801御薗橋商店街」
	blogid[10] = 'yaoi801';			//有料案件「801御薗橋商店街」
	blogid[11] = 'about801';		//有料案件「801御薗橋商店街」
	blogid[12] = 'konscycleblog';	//有料案件「コンズサイクル」
	blogid[13] = 'kidaorestaff';	//有料案件「京のきだおれ会」
	blogid[13] = 'yamajitoshiyuki';	//有料案件「いつわ法律事務所」
	blogid[14] = 'itsuwabusiness';	//有料案件「いつわ法律事務所」
	blogid[15] = 'itsuwalife';		//有料案件「いつわ法律事務所」
	blogid[16] = 'itsuwamoney';		//有料案件「いつわ法律事務所」
	blogid[17] = 'itsuwacase';		//有料案件「いつわ法律事務所」
	
	blogid[18] = 'faq';				//official
	blogid[19] = 'kyotonoomise';	//official
	blogid[20] = 'kyotonoomise';	//official
}



/*バーをサブドメイン表示さすか非表示にさすか*/
function exchange() {	
	for (i = 0; i < blogid.length; ++i) {
		  if (blogid[i]==kyo2subdomain){
			  return false;		  
			}
	}
	topNavibar();
}





/*topNavibar(S)*/

function topNavibar() {


var elementbody = document.getElementsByTagName('body')[0];
	 elementbody.style.marginTop = '30px';
	 elementbody.style.backgroundPositionY = '30px';  



//topbar
var div1=document.createElement('div');
div1.style.display="block";
div1.style.position="absolute";
div1.style.top="0pt";
div1.style.left="0pt";
div1.style.height="30px";
div1.style.width="100%";
//div1.style.minWidth="740px";
div1.style.MozBackgroundClip="-moz-initial";
div1.style.MozBackgroundOrigin="-moz-initial";
div1.style.MozBackgroundInlinePolicy="-moz-initial";
div1.setAttribute('id','topbar');

//barleft
var div2=document.createElement('div');
div2.style.cssFloat="left";
div2.style.width="120px";
div2.style.height="30px";
div2.setAttribute('id','barleft');
div1.appendChild(div2);


//barright
var div3=document.createElement('div');
div3.style.cssFloat="right";
div3.style.height="30px";
div3.style.width="180px";
div3.style.fontSize="12px";
div3.style.lineHeight="30px";
div3.setAttribute('id','barright');
div1.appendChild(div3);

//barcenter
var div4=document.createElement('div');
div4.style.height="30px";
div4.style.margin="0px";
div4.style.fontSize="12px";
div4.style.lineHeight="30px";
div4.style.height="30px";
div4.style.textAlign="left";
div4.setAttribute('id','barcenter');
div1.appendChild(div4);




//clear
var div5=document.createElement('div');
div5.style.clear="both";
div1.appendChild(div5);
var hr1=document.createElement('hr');
hr1.style.display="none";
div5.appendChild(hr1);

    var oBODY=document.getElementsByTagName('body').item(0);
    oBODY.appendChild(div1);





var msgs = new Array;
// 【センターテキスト（ランダム）】ここから設定	

	msgs[0] = '　<span class="black">[PR]　<a href="http://web.kyo2.jp/">京つうホームページ</a></span>';
	msgs[1] = '　<span class="black">[Hot]　<a href="http://event.kyo2.jp/">京つうイベント情報ニュース</a></span>';
	msgs[2] = '　<span class="black">[Hot]　<a href="http://tryangle.kyo2.jp/">とらいあんぐるあさひ×京つう企画</a></span>';
//	msgs[3] = '　<span class="black">[Hot]　<a href="http://seisannsya.floraclub.jp/">生産者の声・声・声</a></span>';
//	msgs[4] = '　<span class="black">[Hot]　<a href="http://hb101.floraclub.jp/">HB-101使用方法</a></span>';
	
// 【センターテキスト（ランダム）】ここまで設定	
	var shuffle = Math.floor( Math.random() * msgs.length );
	document.getElementById("barcenter").innerHTML = (msgs[shuffle]);

// 【右上テキスト（固定）】ここから設定	
	var msgs2 = '<p><a style="line-height:30px;" href="http://www.kyo2.jp/admin/member_regist.php">新規登録</a>｜<a style="line-height:30px;" href="http://www.kyo2.jp/admin/login.php">ログイン</a>｜<a style="line-height:30px;" href="http://help.clog.jp/" target="_blank">ヘルプ</a></p>';
// 【右上テキスト（固定）】ここまで設定	
	document.getElementById("barright").innerHTML = msgs2;

// 【左上（固定）】ここから設定	
	var msgs3 = '<p><a href="http://www.kyo2.jp/" title="「京つう」はみんなで作る京都ブログマガジンです"><img src="http://www.kyo2.jp/contents/bar/bar_logo.gif" width="44" height="22" /></a></p>';
// 【左上（固定）】ここまで設定	
	document.getElementById("barleft").innerHTML = msgs3;

topbarCSS();
// print barCSS

}
/*randmsg(E)*/









/*barCSS(S)*/
function topbarCSS(){

 //document.write ('<link href="http://www.kyo2.jp/contents/bar/styles.css" rel="stylesheet" type="text/css" />');

 if(document.all)
  document.createStyleSheet('http://www.kyo2.jp/contents/bar/styles.css');
   // stylesheet object createStyleSheet([sURL] [, iIndex])
   // iIndexは省略可。省略するとスタイルシート集合の最後に追加。 

 else if(document.styleSheets){
  var nLink=document.createElement('link');
   // Element createElement(in DOMString tagName)
   // raises(DOMException);
  
  nLink.rel="StyleSheet";
  nLink.type="text/css";
  nLink.href="http://www.kyo2.jp/contents/bar/styles.css";
  var oHEAD=document.getElementsByTagName('head').item(0);
  oHEAD.appendChild(nLink);
   // Node appendChild(in Node newChild)
   // raises(DOMException);
 }
}
/*barCSS(E)*/


//exchange()ではエラーになる
window.onload = exchange;
//window.onload = topNavibar;
