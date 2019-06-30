//-----ヘッダー

document.write('<script src="http://www.google-analytics.com/ga.js" type="text/javascript"> </script>');


//雲あり&バナーあり
function writeBnrmenu_cloud(){
	bannerIf=arguments[0];

	if(bannerIf != ''){
		var menuIf='<div id="header"><iframe width="100%" height="217" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" bordercolor="#FFFFFF" src="http://www.fujitv.co.jp/fujimenu_cloud_b.html?' + bannerIf + '"></iframe></div>';
		document.write(menuIf);

		document.write('<script src="http://seab.fujitv.co.jp/recommend/tlab-beacon.js" type="text/javascript"></script>');

		startGA();
	}else{
		writeFujimenu_cloud();
	}
}


//雲なし&バナーあり
function writeBnrmenu(){
	if(arguments[0] != ''){
//		var bannerIf='<div class="headersuperbansimple"><iframe width="728" height="90" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" border="no" src="http://www.fujitv.co.jp/banner/';
		var bannerIf='<div style="width:100%; background:#ffffff; text-align:center; padding:2px 0 0;"><iframe width="728" height="90" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" border="no" src="http://www.fujitv.co.jp/banner/';
		bannerIf+=arguments[0];
		bannerIf+='/sb.html"></iframe></div>';
		document.write(bannerIf);
	}

	writeFujimenu();
}


//雲あり
function writeFujimenu_cloud(){
	var menuIf='<div id="header"><iframe width="100%" height="144" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" bordercolor="#FFFFFF" src="http://www.fujitv.co.jp/fujimenu_cloud.html"></iframe></div>';
	document.write(menuIf);
	document.write('<script src="http://seab.fujitv.co.jp/recommend/tlab-beacon.js" type="text/javascript"></script>');

	startGA();
}


//雲なし
function writeFujimenu(){
	var menuIf='<iframe width="100%" height="104" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" bordercolor="#FFFFFF" src="http://www.fujitv.co.jp/fujimenu.html"></iframe>';
	document.write(menuIf);
	document.write('<script src="http://seab.fujitv.co.jp/recommend/tlab-beacon.js" type="text/javascript"></script>');

	startGA();
}


//雲ありバナー出力用
function writeBnr_cloud(){
	var bnpass = location.search;
	bnpass = bnpass.replace(/^\?/, "");
	var bannerIf='<div class="headersuperban"><iframe width="728" height="90" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" border="no" src="http://www.fujitv.co.jp/banner/';
	bannerIf+=bnpass;
	bannerIf+='/sb.html"></iframe></div>';
	document.write(bannerIf);
}


function actGA(){}

function startGA(){
document.write('<script type="text/javascript">var pageTracker = _gat._getTracker("UA-2352813-83");pageTracker._setDomainName("fujitv.co.jp");pageTracker._initData();pageTracker._trackPageview();</script>');
}

function writeBasicmenu(){
 writeFujimenu();
}


//-----フッター
function writeFujifooter(){
	var footerIf='<div style="background-color:#FFFFFF; text-align:center;"><iframe width="100%" height="120" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no" bordercolor="#FFFFFF" src="http://www.fujitv.co.jp/fujifooter.html"></iframe></div>';
	document.write(footerIf);

}