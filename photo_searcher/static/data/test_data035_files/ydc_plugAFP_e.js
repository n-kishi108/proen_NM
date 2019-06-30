// Adobe Flash Player

// ----- Initial Value -----
// Help Url
var yjpmAFP_Help = 'http://help.yahoo.co.jp/help/jp/common/sys/sys-10.html';
var yjpmAFP_Kids_Help = 'http://help.yahoo.co.jp/help/jp/kids/tools/tools-10.html';

// YDC Url
var yjpmAFP_ydc = 'http://downloads.yahoo.co.jp/docs/flashplayer/start.html';
var yjpmAFP_Kids_ydc = 'http://downloads.yahoo.co.jp/docs/flashplayer/start_kids.html';

//Id
yjstdYjpmModel.AFP_h = 'yjPluginAFP01';	// 横型
yjstdYjpmModel.AFP_v = 'yjPluginAFP02';	// 縦型

// Element
yjAFP = {
	yjpmImage : 'images/common/ydc_get_flash_player1.gif',
	yjpmAlt : 'Adobe Flash Playerインストールガイド',
	yjpmText : {
		yjpmAFP : 'Adobe Flash Playerは、<a href="' + yjpmAFP_ydc + '" target="plugin">Adobe Flash Playerインストールガイド</a>（Yahoo!ダウンロードセンター）から無料で入手できます。',
		yjpmAFP_k1 : 'には、JavaScriptに対応したブラウザとプレーヤーソフトウエアのAdobe Flash Playerが必要です。Adobe Flash Playerは、<a href="' + yjpmAFP_Kids_ydc + '" target="plugin">Adobe Flash Playerインストールガイド</a>（Yahoo!ダウンロードセンター）から無料でダウンロードできます。'
	}
};

function yjstdPlugMAFP(yjstdPmType, yjstdPmClass, yjstdPmText) {
	if (xLBenv.os.name.indexOf('MacOS9') != -1) {
		if (yjstdYjpmType[yjstdPmType] == 'Normal') {
			return yjstdPmHtml = "<p class='yjSt'>" + yjstdYjpmNG + "</p>";
		} else if (yjstdYjpmType[yjstdPmType] == 'Kids') {
			return yjstdPmHtml = "<p class='yjSt'>" + yjstdYjpmNG_k + "</p>";
		}
	} else {
		if (yjstdYjpmType[yjstdPmType] == 'Normal') {
			return yjstdPmHtml ="<div class='" + yjstdPmClass + "'><a href='" + yjpmAFP_ydc + "' target='plugin'><img src='" + yjstdImgDmn() + yjAFP.yjpmImage + "' alt='" + yjAFP.yjpmAlt + "' class='ydc1'></a></div><p class='yjSt'>" + yjAFP.yjpmText.yjpmAFP + "</p>";
		} else if (yjstdYjpmType[yjstdPmType] == 'Kids') {
			return yjstdPmHtml ="<div class='" + yjstdPmClass + "'><a href='" + yjpmAFP_Kids_ydc + "' target='plugin'><img src='" + yjstdImgDmn() + yjAFP.yjpmImage + "' alt='" + yjAFP.yjpmAlt + "' class='ydc1'></a></div><p class='yjSt'>" + yjstdPmText + yjAFP.yjpmText.yjpmAFP_k1 + "</p>";
		}
	}
}

