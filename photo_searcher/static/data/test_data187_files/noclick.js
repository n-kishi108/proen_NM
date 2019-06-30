function keepSilenceOnImg(e) {
  if(window.event) e=event;

  // 画像上のイベントかを判定
  var isIMG = false;
  if(e.srcElement) isIMG = (e.srcElement.tagName == "IMG");  // IE
  if(e.target)     isIMG = /Image/.test(String(e.target));   // NN,Moz
  if(isIMG){
  	alert('右クリックはご利用できません');
  	return false;
  }
}
function disableContextOnImg(e) {
  if(window.event) e=event;

  // 画像上のイベントかを判定
  var isIMG = false;
  if(e.srcElement) isIMG = (e.srcElement.tagName == "IMG");  // IE
  if(e.target)     isIMG = /Image/.test(String(e.target));   // NN,Moz
  if(!isIMG) return;

  disableMouseDrag(); // ドラッグを無効化

  // 右ボタンのクリックかを判定
  var btn = 0;
  if(e.which)  btn = e.which;   // for NN4
  if(e.button) btn = e.button;  // for IE,NN6,Moz
  if(btn < 2) return;

  return false;
}
function disableMouseDrag(){
  document.onmousemove = function(){ return false; };
}
function enableMouseDrag(){
  document.onmousemove = "";
}
// EventCapture-------------------------------------------------------
if(document.layers){
  document.captureEvents(Event.MOUSEDOWN);
  document.captureEvents(Event.MOUSEUP);
}
document.onmousedown = disableContextOnImg;
document.onmouseup = enableMouseDrag;
document.oncontextmenu = keepSilenceOnImg;
