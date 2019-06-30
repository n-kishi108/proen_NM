//  ========================================================
//  tlab-beacon.js ---- beacon view class
//  Copyright 2009 TEAM-LAB
//  ========================================================

if ( typeof(TLAB) == 'undefined' ) TLAB = function() {};

TLAB.Beacon = function (arg1) {
	var colledurl = 'http://' + window.location.host + window.location.pathname;
	colledurl = colledurl.replace(/#[^/]+$/, "");
	colledurl = colledurl.replace(/\?[^/]+$/, "");
	colledurl = colledurl.replace(/\/index\.[^/]+$/, "/");
	colledurl = colledurl.replace(/\.htm$/, ".html");
	this.divtag = arg1;
	this.itemcd = escape(colledurl);
	this.imgurl = "http://seab.fujitv.co.jp/recommend/page_beacon.gif?item=" +this.itemcd;
	return this;
}

TLAB.Beacon.prototype.sendRequest = function () {
	var imgElement=document.createElement("img");
	imgElement.src=this.imgurl;
	document.getElementById(this.divtag).appendChild(imgElement);
}

document.write('<div id="tlab-beacon"></div>');
(new TLAB.Beacon("tlab-beacon")).sendRequest();
