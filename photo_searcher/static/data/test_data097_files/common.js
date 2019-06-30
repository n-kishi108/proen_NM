/************************************************
 * 
 * [ブログ公開] JavaScript 共通関数ファイル ( common.js )
 * 
 * Author        : $Author: kosaka_tomohiro $
 * Last Modified : $Date: 2008/09/04 02:01:20 $
 * Version       : $Revision: 1.5 $
 * 
 * (c) CYBER AGENT.LTD
 * 
 ************************************************/

/**
 * 記事一覧画面ブログ検索用条件未入力チェック
 * 
 * <pre>
 * 検索入力フィールドに値が入っていたらsubmit
 * textbox名：sword
 * </pre>
 * 
 * @param object fObj フォームオブジェクト
 */
function checkForm(fObj){
	if (fObj.search_words.value != "") {
//		fObj.action = act;
		fObj.submit();
	}
}

function comment_open(macagna) {
	window.open(macagna, '_blank', 'width=400,height=400,scrollbars=yes,status=yes');
}

function trackback_open(macagna) {
	window.open(macagna, '_blank', 'width=490,height=400,scrollbars=yes,status=yes');
}

function window_open(macagna) {
	 window.open(macagna, '_blank', 'width=400,height=400,scrollbars=yes,status=yes');
}

function A_Li() {
	Sel=document.Link1.OP.selectedIndex;
	Ms=document.Link1.OP.options[Sel].value;
	location.href=Ms;
}

function C_Li() {
	Sel=document.Link2.OP.selectedIndex;
	Ms=document.Link2.OP.options[Sel].value;
	location.href=Ms;
}

/**
 * Aタグ無効化(プレビュー用)
 */
function hrefOff() {
	var tagName = 'a';
	var target = document.getElementsByTagName(tagName) || document.all.tags(tagName) || null;
	var i = 0;
	var length = target.length || 0;
	if (target) {
		for (i=0; i<length; i++) {
			target[i].href = '#';
			target[i].onclick = function(){return false;};
		}
	}
}

/**
 * morePopLink（記事下Menu pop up）
 */

var moreFrame = null;//ボックス

function morePopLink(moreObj,presentTextNode,requestionTextNode,checkListTextNode,presentAnchorHref,requestionAnchorHref,checkListAnchorHref) {

	if (!moreFrame) {
		
		moreFrame = document.createElement('div');
		moreFrame.id = 'moreFrame';
		var moreSubFrame = document.createElement('div');
		moreSubFrame.id = 'moreSubFrame';

		moreFrame.appendChild(moreSubFrame);
		
		if (presentTextNode) {
			//プレゼントON
			var menuPresent = document.createElement('span');
			menuPresent.className = 'menuPresent';
			var menuPresentAnchor = document.createElement('a');
			menuPresentAnchor.href = presentAnchorHref;
			var presentText = document.createTextNode(presentTextNode);

			menuPresentAnchor.appendChild(presentText);
			menuPresent.appendChild(menuPresentAnchor);
			moreSubFrame.appendChild(menuPresent);
		}

		if (requestionTextNode) {
			//相談ON
			var menuRequestion = document.createElement('span');
			menuRequestion.className = 'menuRequestion';
			var menuRequestionAnchor = document.createElement('a');
			menuRequestionAnchor.href = requestionAnchorHref;
			var requestionText = document.createTextNode(requestionTextNode);

			menuRequestionAnchor.appendChild(requestionText);
			menuRequestion.appendChild(menuRequestionAnchor);
			moreSubFrame.appendChild(menuRequestion);
		}
		
		if (checkListTextNode) {
			//チェックリストON
			var menuCheckList = document.createElement('span');
			menuCheckList.className = 'menuCheckList';
			var menuCheckListAnchor = document.createElement('a');
			menuCheckListAnchor.href = checkListAnchorHref;
			var checkListText = document.createTextNode(checkListTextNode);
			menuCheckListAnchor.appendChild(checkListText);

			menuCheckListAnchor.appendChild(checkListText);
			menuCheckList.appendChild(menuCheckListAnchor);	
			moreSubFrame.appendChild(menuCheckList);
		}

		//セット
		moreDisplayImg = document.createElement('img');
		moreDisplayImg.src = 'http://stat.ameba.jp/common_style/img/common/icon/close.gif';
		moreDisplayImg.alt = '閉じる';
		moreDisplayImg.id = 'moreDisplay';

		moreSubFrame.appendChild(moreDisplayImg);

		moreFrame.className = 'moreOff';
		document.body.appendChild(moreFrame);
	}

	//closeボタン
	moreDisplayImg.onclick = function(){
	moreFrame.className = "moreOff";
	}

	//位置を取得
	function cumulativeOffset(element) {
		var valueT = 0, valueL = 0;
		do {
			valueT += element.offsetTop || 0;
			valueL += element.offsetLeft || 0;
			element = element.offsetParent;
		} while (element);
			return [valueL, valueT];
	}

	var pos = cumulativeOffset(moreObj);

	//判定
	if(moreFrame.target == moreObj && moreFrame.className =="moreOn"){
		moreFrame.className = "moreOff";
	} else {
		//位置をセット
		moreFrame.style.left = pos[0] + "px";
		moreFrame.style.top = pos[1] + moreObj.offsetHeight + 2 + "px";
		moreFrame.className = "moreOn";
	}

	moreFrame.target = moreObj;

}

/**
 * アメーババーサーチ、広告ハイライトなどのリファラー
 */
var hintsWord="";
var wordsFromReferrerDe="";
var wordsFromReferrer="";
var fromURL=document.referrer;
(function(){
	if(fromURL){
		var yStr="http://search.yahoo.co.jp/search";
		var gStr="http://www.google.co.jp/search";
		var g2Str="http://www.google.com/search";
		var amStr="http://search.ameba.jp/search";
		var msnStr="http://search.msn.co.jp/results";
		if(fromURL.indexOf(gStr,0)!=-1||fromURL.indexOf(amStr,0)!=-1||fromURL.indexOf(g2Str,0)!=-1||fromURL.indexOf(msnStr,0)!=-1){
			var queryStr="q=";
		}
		else if(fromURL.indexOf(yStr,0)!=-1){
			var queryStr="p=";
		}
		if(queryStr&&fromURL.indexOf(queryStr,0)!=-1){
			var strStart =fromURL.indexOf(queryStr,0);
			fromURL=fromURL.slice(strStart+queryStr.length);
			var queryStrend="&";
			var strEnd =fromURL.indexOf(queryStrend,0);
			if(strEnd==-1){
				var word=fromURL;
			}
			else{
				var word=fromURL.slice(0,strEnd);
			}
		wordsFromReferrer=word;
		wordsFromReferrerDe=decodeURI(word);
		}
	}
}
)();
