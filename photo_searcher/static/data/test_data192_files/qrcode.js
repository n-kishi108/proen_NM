
//---------------------------------------------------
//  QRCode 表示スクリプト 
//  required: prototype.js
//  desccription: #article_body配下のa.qrcodeにQRCodeを付与
//---------------------------------------------------
Event.observe(window, "load", function(){
	var articleEle = $("block_story");
	if(articleEle == undefined){ return (0); }
	var qrcodeList= articleEle.getElementsByClassName("qrcode");

	$A(qrcodeList).each(function(e){

		var iconImg = document.createElement("IMG");
		iconImg.src = "/media/c/2006/img/icon_qrcode.gif";
		Element.setStyle (iconImg, {
			"width": "60px",
			"padding": "0 5px 0 5px",
			"verticalAlign": "middle"
		});

		var qrCodeWrap = document.createElement("span");
		Element.addClassName(qrCodeWrap, "wrap_qrcode");
		Element.setStyle (qrCodeWrap, {
			"position" : "relative"
		});

		var href = Element.readAttribute(e, "href");
		var qrCodeImg = document.createElement("img");
		var qrCodeUrl = "http://chart.apis.google.com/chart?chs=100x100&cht=qr&chld=l|1&chl=" + escape(href);
		qrCodeImg.src = qrCodeUrl; 
		Element.setStyle(qrCodeImg, {
			"display" : "none",
			"position" : "absolute",
			"top" : "20px",
			"left" : "-15px",
			"border" : "1px solid #000",
			"zIndex": "1000"
		});

		Event.observe(qrCodeWrap, "mouseover", function(e){
			var evEl = Event.findElement(e, "SPAN");
			$(evEl).getElementsBySelector("IMG")[0].show();
		});
		Event.observe(qrCodeWrap, "mouseout", function(e){
			var evEl = Event.findElement(e, "SPAN");
			$(evEl).getElementsBySelector("IMG")[0].hide();
		});

		qrCodeWrap.appendChild(qrCodeImg);
		qrCodeWrap.appendChild(iconImg);
		e.parentNode.insertBefore(qrCodeWrap, e.nextSibling);

	});
});