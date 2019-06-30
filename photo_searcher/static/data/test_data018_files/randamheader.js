window.onload = function(){ 

var imgobj01 = new Image(1000,180);
var imgobj02 = new Image(1000,180);
var imgobj03 = new Image(1000,180);
var imgobj04 = new Image(1000,180);
var imgobj05 = new Image(1000,180);
var imgobj06 = new Image(1000,180);
var imgobj07 = new Image(1000,180);
var imgobj08 = new Image(1000,180);
var imgobj09 = new Image(1000,180);
var imgobj10 = new Image(1000,180);
imgobj01.src = "http://www.blog-door.com/img/toplogo.png";
imgobj02.src = "http://www.blog-door.com/img/toplogo2.png";
imgobj03.src = "http://www.blog-door.com/img/toplogo3.png";
imgobj04.src = "http://www.blog-door.com/img/toplogo4.png";
imgobj05.src = "http://www.blog-door.com/img/toplogo5.png";
imgobj06.src = "http://www.blog-door.com/img/toplogo6.png";
imgobj07.src = "http://www.blog-door.com/img/toplogo7.png";
imgobj08.src = "http://www.blog-door.com/img/toplogo8.png";
imgobj08.src = "http://www.blog-door.com/img/toplogo9.png";
imgobj09.src = "http://www.blog-door.com/img/toplogo10.png";

var imgs = new Array();
imgs[0]=imgobj01;
imgs[1]=imgobj02;
imgs[2]=imgobj03;
imgs[3]=imgobj04;
imgs[4]=imgobj05;
imgs[5]=imgobj06;
imgs[6]=imgobj07;
imgs[7]=imgobj08;
imgs[8]=imgobj09;
imgs[9]=imgobj10;

var n = Math.floor(imgs.length*Math.random());
var img = imgs[Math.floor(n)];
var imgobj = document.getElementById('topheader');
imgobj.src = img.src;


}
