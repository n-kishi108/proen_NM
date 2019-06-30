// Font Size

function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
  if(navigator.appVersion.indexOf('Macintosh') != -1){
		new sbm();
  }
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);


// Print
var delayprintid;
function printManager() {
var check = window.print;
var result = typeof(check);
	if(result != "undefined") {
		var elm;
			if (!elm) {
				elm = document.createElement("link");
				elm.setAttribute("rel","stylesheet");
				elm.setAttribute("type","text/css");
				elm.setAttribute("media","print");
				elm.setAttribute("href","/css/print.css");
				document.getElementsByTagName("head")[0].appendChild(elm);
			}
			var userAgent = navigator.userAgent.toLowerCase();
			if (userAgent.indexOf('mac')!=-1 && userAgent.indexOf('firefox')!=-1){
					delayprintid = setTimeout(delayPrint,50);
			}else{
				print();
			}
	}else {
	alert('お使いのブラウザではこの機能はサポートされていません。ブラウザのファイルメニューから印刷ください。');
	}

}
function delayPrint(){
	print();
	clearTimeout(delayprintid);
}

//CM2
function ShowListingsCM() {
	if(typeof window.zSr!="undefined"){
		document.write('<div class="AdList">');
		var i=6;
		while (i < zSr.length) {
		var descr = zSr[i++]; // listing description
		var unused1 = zSr[i++]; // (ignore)
		var clickURL = zSr[i++]; // listing link
		var title = zSr[i++]; // listing title
		var sitehost = zSr[i++]; // advertiserfs domain name
		var unused2 = zSr[i++]; // (ignore)
		document.write('<div class="OBody"><a href="' + clickURL + '">' + title + '</a>');
		document.write('<div class="Comment">' + descr.substr(0,33) + '</div>');
		document.write('<a href="' + clickURL + '" class="URL">' + sitehost + '</a></div>');
		}
		document.write('<div class="Credit">インタレストマッチ - <a href="http://ov.yahoo.co.jp/service/int/index.html" target="_blank">広告の掲載について</a></div>');
		document.write('</div>');
	}else{
		document.write('<div class="AdList">');
		document.write('<div class="OBody"><a href="https://form.mainichi.co.jp/annuncio/koudoku/form.html">毎日新聞購読申し込み</a>');
		document.write('<div class="Comment">毎日新聞を購読するとＪＡＬマイレージがたまる</div>');
		document.write('<a href="https://form.mainichi.co.jp/annuncio/koudoku/form.html" class="URL">https://form.mainichi.co.jp/annuncio/koudoku/form.html</a></div>');
		document.write('<div class="OBody"><a href="https://my-mai.mainichi.co.jp/">まいまいクラブ</a>');
		document.write('<div class="Comment">毎日新聞をご愛読くださっている皆さまを対象とした会員制サービス</div>');
		document.write('<a href="https://my-mai.mainichi.co.jp/" class="URL">https://my-mai.mainichi.co.jp/</a></div>');
		document.write('<div class="OBody"><a href="http://premo.mainichi.co.jp/premo/shop/">毎日プレミアムモール</a>');
		document.write('<div class="Comment">ＭＯＴＴＡＩＮＡＩ（もったいない）グッズ販売中！</div>');
		document.write('<a href="http://premo.mainichi.co.jp/premo/shop/" class="URL">http://premo.mainichi.co.jp/premo/shop/</a></div>');
		document.write('</div>');
	}
}

//検索窓
function keyword_analyze(){
	if (navigator.platform.indexOf("Win") != -1) {
		var outstr = "";
		keyword = new Array;
		strArray = new Array;
		re = /[ａ-ｚＡ-Ｚ０-９]{1,}[ァ-ヶー]{1,}|[ァ-ヶー]{1,}[ａ-ｚＡ-Ｚ０-９]{1,}|[ａ-ｚＡ-Ｚ０-９]{1,}[一-龍]{2,}|[一-龍]{2,}[ａ-ｚＡ-Ｚ０-９]{2,}|[ァ-ヶー]{1,}[一-龍]{1,}|[一-龍]{1,}[ァ-ヶー]{1,}|[ァ-ヶー]{2,}|[一-龍]{2,}|[ａ-ｚＡ-Ｚ]{3,}/g;
		var h2 = document.getElementsByTagName('h2').item(0);
		var h2Value = h2.firstChild.nodeValue;
		var text=new Array();
		text=h2Value.split("："); 
		var str = text[1];
		str.replace(re,keyword_count);
		for (i = 0; i < 3; i++) {
			if(typeof strArray[i]!="undefined"){
				if(i == 0) outstr += "<div class=\"RelativeWord\">関連語：";
			strArray[i] = {word:strArray[i], total:keyword[strArray[i]]};
			outstr += "<a href=\"" + "http://search.mainichi.jp/result?st=s&y=&c=&y=1&p="+encodeURI(strArray[i].word)+"\">"+strArray[i].word+"</a>　";
			}
		}
		if(outstr) outstr += "</div>";
		document.write(outstr);
	}
	
	function keyword_count(keyname){
		if(keyword[keyname]){
			keyword[keyname]++;
		}else{
			keyword[keyname]=1;
			strArray.push(keyname);
		}
		return " ";
	}
}