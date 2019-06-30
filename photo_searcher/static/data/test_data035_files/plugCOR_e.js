//	Plugin Module (EUC)
//	Version : 1.5
//	Core

if(xLBenv.browser.name == "Internet Explorer" && xLBenv.browser.version <= 5.00) {  // IE5.00以下の場合{

}else{// それ以外の場合	
	var yjstdYjpmType = {
		Type1 : 'Normal',
		Type2 : 'Kids',
		Type3 : 'English'
	};
	var yjstdYjpmClass = ['yjstdIcnH', 'yjstdIcnV'];
	var yjstdYjpmNG = 'このブラウザではサービスをご利用いただけません。「<a href="http://help.yahoo.co.jp/help/jp/common/sys/sys-01.html">Yahoo! JAPANの推奨ブラウザ</a>」をご覧ください。';
	var yjstdYjpmNG_k = 'このブラウザではご利用いただけません。Yahoo!きっずは、なるべく最新のInternet Explorer（Windows）か、Safari（Macintosh）でご利用ください。';
	var yjstdYjpmNG_e = 'Your browser doesn\'t support Adobe Reader.Please see "<a href="http://help.yahoo.co.jp/help/jp/common/sys/sys-21.html">Yahoo! JAPAN Browser Recommendation</a>."';
	var yjstdYjpmModel = new Array();
	
	// Check Protocol - for Images
	function yjstdImgDmn() {
		var yjstdGetPtl = window.location.protocol ;
		var yjstdCheckPtl = "";
		if(yjstdGetPtl.indexOf("https") != -1) yjstdCheckPtl = "https://s.yimg.jp/";
		else yjstdCheckPtl = "http://i.yimg.jp/";
		return yjstdCheckPtl;
	}

	// yjstdPmType:プラグインタイプ（ノーマル版/きっず版/英語版）, yjstdPmModel:プラグインの種類_（横型/縦型）, yjstdPmText:説明文（任意）
	function yjstdPlugM(yjstdPmType, yjstdPmModel, yjstdPmText){
	
		yjstdPmM = yjstdPmModel.split("_");
		if (yjstdPmM[1] == "h") {
			yjstdPmClass = yjstdYjpmClass[0];
		} else {
			yjstdPmClass = yjstdYjpmClass[1];
		}
	
		var yjstdPmId = yjstdYjpmModel[yjstdPmModel];
	
		document.write('<div id="' + yjstdPmId + '" class="yjstdPlug"></div>');
	
		var pmObj = document.getElementById(yjstdPmId);
	
		//yjstdPmType:プラグインタイプ（ノーマル版/きっず版/英語版）, yjstdPmObj:プラグインの種類, yjstdPmClass:class名（縦/横）, yjstdPmText:説明文
		if (yjstdPmM[0] == 'BRW') {
			yjstdPmHtml = yjstdPlugMBrw(yjstdPmType, yjstdPmClass, yjstdPmText);
		} else if (yjstdPmM[0] == 'WMP') {
			yjstdPmHtml = yjstdPlugMWMP(yjstdPmType, yjstdPmClass, yjstdPmText);
		} else if (yjstdPmM[0] == 'AFP') {
			yjstdPmHtml = yjstdPlugMAFP(yjstdPmType, yjstdPmClass, yjstdPmText);
		} else if (yjstdPmM[0] == 'AR') {
			yjstdPmHtml = yjstdPlugMAR(yjstdPmType, yjstdPmClass, yjstdPmText);
		} else if (yjstdPmM[0] == 'WMPAFP') {
			yjstdPmHtml = yjstdPlugMWMPAFP(yjstdPmType, yjstdPmClass, yjstdPmText);
		} else if (yjstdPmM[0] == 'SL') {
			yjstdPmHtml = yjstdPlugMSL(yjstdPmType, yjstdPmClass, yjstdPmText);
		} else if (yjstdPmM[0] == 'WMPSL') {
			yjstdPmHtml = yjstdPlugMWMPSL(yjstdPmType, yjstdPmClass, yjstdPmText);
		}
	
		pmObj.innerHTML = yjstdPmHtml;
	
	}
}