//
// TITLE    : OS、ブラウザ判別Javascript  野球ページ用
// DATE     : 2007/01/17
// URL      : http://www.nikkansports.com/js/univ.js
// WRITER   : Chiaki Hatanaka, Tomotaka Seo
//


var ua = navigator.userAgent;
var an = navigator.appName;

var Explorer7 = ( ua.indexOf("MSIE 7", 0) >= 0 );
var Explorer6 = ( ua.indexOf("MSIE 6", 0) >= 0 );
var Explorer5 = ( ua.indexOf("MSIE 5", 0) >= 0 );
var Explorer = ( ua.indexOf("MSIE", 0) >= 0 );
var Mozilla5 = ( ua.indexOf("Mozilla/5", 0) >= 0 );
var Mozilla4 = ( ua.indexOf("Mozilla/4", 0) >= 0 );
var Opera = ( an.indexOf ("Opera") != -1 );


// Macintosh
if ( ua.indexOf ("Mac") != -1 )
	{

	// OS X
	for ( i = 0; i < navigator.plugins.length; i++ )
		{
		if ( navigator.plugins[i].filename.indexOf(".") >= 0 )
			{
			if ( Explorer5 )
				{
				document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/univ_macie5x.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
				break;
				} else if ( Mozilla5 || Opera ) {
				document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/univ.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
				break;
				} else if ( Mozilla4 ) {
				document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/standard.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
				break;
				} else {
				document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/standard.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
				}
			} else {

			// OS 9
			if ( Explorer )
				{
				document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/standard.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
				break;
				} else if ( Mozilla5 || Opera ) {
				document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/univ.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
				break;
				} else if ( Mozilla4 ) {
				document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/standard.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
				break;
				} else {
				document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/standard.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
				}
			}
		}

	// フォント調整
	document.writeln('<style type="text/css"><!--');
	document.writeln('*{letter-spacing: -0.05em;}');
	document.writeln('--></style>');

// Windows
	} else {
		if ( Explorer7 || Explorer6 || Mozilla5 || Opera )
			{
			document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/univ.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
			} else if ( Explorer5 ) {
			document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/univ_winie5x.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
			} else if ( Mozilla4 ) {
			document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/standard.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
			} else {
			document.writeln('<link rel="stylesheet" href="http://univ.nikkansports.com/css/standard.css" type="text/css" title="nikkansports.com CSS" media="screen, print" />');
			}
	}


