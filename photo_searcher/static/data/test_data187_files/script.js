function ImgDisp(){
val = document.location.search;
val = val.split("=");
val = unescape(unescape(val[1]));
if (val) val = "<img src=\"images/" + val + "\" border=0>";
else val = "このURLは存在しません。";
document.write(val);
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function random_img1(num1,num2) {
if((num1 - num2) > 0) {
	var big = num1;
	var small = num2;
} 
else {
	var big = num2;
	var small = num1;
}
var range = big - small + 1;
var number = Math.floor(Math.random()*range) + small;
return(number);
}

function random_img2() {
var img_src = "http://decs.nufs.ac.jp/images/top_photo" + random_img1(1,8) + ".jpg";
document.write("<IMG SRC='" + img_src + "'>");
}


function backToTop() {
  var x1 = x2 = x3 = 0;
  var y1 = y2 = y3 = 0;
  if (document.documentElement) {
      x1 = document.documentElement.scrollLeft || 0;
      y1 = document.documentElement.scrollTop || 0;
  }
  if (document.body) {
      x2 = document.body.scrollLeft || 0;
      y2 = document.body.scrollTop || 0;
  }
  x3 = window.scrollX || 0;
  y3 = window.scrollY || 0;
  var x = Math.max(x1, Math.max(x2, x3));
  var y = Math.max(y1, Math.max(y2, y3));
  window.scrollTo(Math.floor(x / 2), Math.floor(y / 2));
  if (x > 0 || y > 0) {
      window.setTimeout("backToTop()", 25);
  }
}
