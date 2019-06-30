// JavaScript Document
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_showHideLayers() { //v6.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v=='hide')?'hidden':v; }
    obj.visibility=v; }
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
  return false;
}

function playFlash() {

	var setFlashNum      = 0;	// 初期値
	var FlashFilesLength = 1;	// フラッシュのファイル数
	
	FlashFiles = new Array(FlashFilesLength);	// 配列初期化
	FlashFiles[0] = '20060624_jamboree.swf'		// ジャンボリー
	var today   = new Date();
	var minutes = today.getMinutes(); // 分
	var sec     = today.getSeconds(); // 秒 

	setFlashNum = minutes % FlashFilesLength;

	var setFlashFile = FlashFiles[setFlashNum];

	document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" width="596" height="225">');
	document.write('<param name="movie" value="/swf/' + setFlashFile + '">');
	document.write('<param name="quality" value="high">');
	document.write('<embed src="/swf/' + setFlashFile + '" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="596" height="225"></embed>');
	document.write('</object>');
}
