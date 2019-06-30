// common.js i-SITE Portal Common JavaScript
// Copyright (c) 2005 Coming System Corp. All Rights Reserved.

//エレメントの表示、非表示とイメージの差し替えをトグル動作
function ToggleVisible(targetID, imageID, linkImage, linkImageCollapsed)
{
  if (document.getElementById) 
  {
    var target = document.getElementById(targetID);
//  ValidatorUpdateDisplay(target);
    if(target != null)
      SetVisible(target.style.display == "none" ? true : false, targetID, imageID, linkImage, linkImageCollapsed);
  }
}

//エレメントの表示、非表示とイメージの差し替えをトグル動作,対象はカンマ区切りID文字列
function ToggleAllVisible(targetIDs, imageID, linkImage, linkImageCollapsed)
{
  if (document.getElementById) 
  {
    var tctla = targetIDs.split(",");
    for(vi=0; vi<tctla.length; vi++)
      ToggleVisible(tctla[vi],'','','');
  }
}

//エレメントを非表示にしたり、表示、非表示時のイメージ差し替えも可能
function SetVisible(show, targetID, imageID, linkImage, linkImageCollapsed)
{
  if (document.getElementById) 
  {
    var target = document.getElementById(targetID);
//  ValidatorUpdateDisplay(target);
    if (show)
      target.style.display = "";
    else
      target.style.display = "none";
  		
    if (linkImageCollapsed != "") 
    {
      var image = document.getElementById(imageID);
      if (target.style.display == "none")
        image.src = linkImageCollapsed;
      else
        image.src = linkImage;
    }
  }
}

// クッキー有効チェック
function doCookieCheck()
{
  document.cookie = "cookietest=ok; ";
  var bcheck = (getCookie("cookietest") == "ok") //判定はできる
  document.cookie = "cookietest=; ";
  return true;
}
 
// クッキー取得
function getCookie(name)
{
  var key = " " + name + "=";
  var cookiestr = " " + document.cookie + ";";
  var start = cookiestr.indexOf(key);
  if(start != -1) 
  {
    var end = cookiestr.indexOf(";", start);
    return unescape(cookiestr.substring(start + key.length, end));
  }
  return "";
}

// Cookie 設定 expire期限日付文字列　
function setCookie(name, value, expire)
{
  if(value == null)
  { //消去
    var expire = new Date();
    expire.setTime(expire.getTime() - 1000*60*60*24);  //１日
  }
  document.cookie
    = name + '=' + ((value == null || value == '') ? '' : escape(value))
    + ((expire == null) ? '' : ('; expires=' + expire.toGMTString())) 
    + "; path=/";
}

// BodyタグでのOnFocus処理
function BodyOnFocus()
{
  if(document.getElementById("windowname") != null)
    document.getElementById("windowname").alt = "[" + window.name + "]";  
  if(window.name == "" || window.name.indexOf("isite_") != 0)
  {
    if(getCookie("ThemeID") != "" && getCookie("DefThemeID") != getCookie("ThemeID")) //DefThemeID:ブラウザのデフォルトテーマ
      alert("テーマが切り替ります。");
    setCookie("ThemeID", null, null);
    return;
  }
  var paraa = window.name.substring(6, window.name.length).split("_");
  if(getCookie("ThemeID") != paraa[0] && !(getCookie("ThemeID") == "" && getCookie("DefThemeID") == paraa[0]))
    alert("テーマが切り替ります。");
  setCookie("ThemeID", paraa[0], null);
}

//XMLHttpRequestの機種依存補正
if (window.ActiveXObject && !window.XMLHttpRequest)
{
  window.XMLHttpRequest = function()
    {
      try
      {
        return (new ActiveXObject('Msxml2.XMLHTTP')); //ie6
      }
      catch (e) {}

      try
      {
        return (new ActiveXObject('Microsoft.XMLHTTP')); //ie5
      }
      catch (e) {}

      return (null);
    }
}

//タイムアウト、楽観的排他処理チェック dosaveで上書き保存
function aliveCheck(ticks, dosave)
{
  try
  {
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', document.location + "&modticks=" + ticks + "&tmp=" + (new Date()).getTime() , false);
　  xmlhttp.send(null);
//    return confirm("" + document.location + "," + xmlhttp.readyState + "," + xmlhttp.status + "," + xmlhttp.getAllResponseHeaders());
    if (xmlhttp.readyState == 4)
    {
      if(xmlhttp.status == 304)
        return true;  //データ破棄は生じない
      if(xmlhttp.status == 500)
        return alert("タイムアウト等によりデータの保存ができません。編集画面に戻ります。(必要に応じてデータを退避してください。)")
      if(dosave && xmlhttp.status == 200)
        return confirm("他のユーザーがデータを変更しました。強制的にデータを上書きしてもよろしいですか？");
    }
    return true;
  }
  catch(e)
  {
    return true;  //エラー時は強制実行
  }
}

//継承オフフラグ
var inherit_off = false;
if (location.search.length > 1) {
  var aarg = location.search.substr(1).split("&");
  for(var vi in aarg){
    if(aarg[vi] == "inherit=off")
        inherit_off = true;
  }
}
