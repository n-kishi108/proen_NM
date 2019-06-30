/* 
	<how to>
	
	1.地図用パラメタ設定 
	var conf = new exYmap(lat , lot , layer , mtype , id , object_id , icons , adtype );
	
	2.window.onloadにイベント追加。ymapInit()が呼ばれる
	3.地図のonload完了時にYmapLoaded( id )が呼ばれる
	
*/
var g_exYmap_conf = {};	// global object;

function exYmap(lat , lon , layer , mtype , id , icons , adtype )
{
	var host = document.location.host;
	var adconf;
	
	if( !adtype )
	{
		adtype = 'bottom';
	}
	
	if( host.indexOf("excite.co.jp") >= 0 )
	{
		this.appid = '5xCFO2.xg66EpB1ZVBigh4o4alhWdr4k7goIzAFBPP4l07icKwwUzffONACrxrh1Lw--';
		adId   = 'excite_jp_exblog_koushiki_mapcm';
		adconf = '23105505321';
	}else
	{
		this.appid = 'BafqmVCxg64zmQSxx3fYPJhs3LptsCWLZq90z4jlWxzxvYheazHV..i1SC7hCFRtNQ--';
		adId   = 'excite_jp_exblog_ippan_mapcm';
		adconf = '23105505321';
	}

	this.object_id = id;		// object id
	
	this.map_args = [
		'pos=' + lat + ',' + lon ,
		'layer=' + layer , 
		'mode=' + mtype,
		'visibleCompus=false',
		'visibleCenterMark=false',
		'adPosition=' + adtype ,
		'adId=' + adId , 
		'adConfig=' + adconf ,
		'initialized=YmapLoaded(\'' + this.object_id + '\')'
	];
	if( icons )
	{
		g_exYmap_conf[ this.object_id ] = icons;
	}
}

function ymapInit( conf )
{
    if( typeof( conf ) == 'object')
    {
        var map_div = document.getElementById( "map" + conf.object_id );
        
        var map_text ='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '
                + 'codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="100%" height="100%" id="' + conf.object_id + '" align="middle">'
                + '<param name="allowScriptAccess" value="always" />'
                + '<param name="movie"     value="http://map.yahooapis.jp/MapsService/Flash/V2/?appid=' + conf.appid + '" />'
                + '<param name="quality"   value="high" />'
                + '<param name="bgcolor"   value="#ffffff" />'
                + '<param name="flashvars" value="' + conf.map_args.join('&') + '" />'
                + '<embed src="http://map.yahooapis.jp/MapsService/Flash/V2/?appid=' + conf.appid + '"'
                + 'quality="high" bgcolor="#ffffff" width="100%" height="100%" '
                + 'name="' + conf.object_id + '" align="middle" allowScriptAccess="always" '
                + 'type="application/x-shockwave-flash" '
                + 'pluginspage="http://www.macromedia.com/go/getflashplayer"'
                + 'flashvars="' + conf.map_args.join('&') + '" />'
                + '</object>';
		if( map_div )
		{
			map_div.innerHTML = map_text;
		}
    }
}

function getMap(movieName) 
{
   if (navigator.appName.indexOf("Microsoft") != -1) {
      return window[movieName];
   }else {
      return document[movieName];
   }
}

function YmapAddCategory(id)
{
	getMap( id ).addCategory( "Icon01" , "http://md.exblog.jp/img/ymap/mapIcon01.png", 30, 10, -15 );
	getMap( id ).addCategory( "Icon02" , "http://md.exblog.jp/img/ymap/mapIcon02.png", 30, 10, -15 );
	getMap( id ).addCategory( "Icon03" , "http://md.exblog.jp/img/ymap/mapIcon03.png", 30, 10, -15 );
	getMap( id ).addCategory( "Icon04" , "http://md.exblog.jp/img/ymap/mapIcon04.png", 30, 10, -15 );
	getMap( id ).addCategory( "Icon05" , "http://md.exblog.jp/img/ymap/mapIcon05.png", 30, 10, -15 );
	getMap( id ).addCategory( "Icon06" , "http://md.exblog.jp/img/ymap/mapIcon06.png", 30, 10, -15 );
	getMap( id ).addCategory( "Icon07" , "http://md.exblog.jp/img/ymap/mapIcon07.png", 30, 10, -15 );
	getMap( id ).addCategory( "Icon08" , "http://md.exblog.jp/img/ymap/mapIcon08.png", 30, 10, -15 );
	getMap( id ).addCategory( "IconCafe" , "http://md.exblog.jp/img/ymap/mapIconCafe.png", 30, 10, -15 );
	getMap( id ).addCategory( "IconCamera" , "http://md.exblog.jp/img/ymap/mapIconCamera.png", 30, 10, -15 );
	getMap( id ).addCategory( "IconRestaurant" , "http://md.exblog.jp/img/ymap/mapIconRestaurant.png", 30, 10, -15 );
	getMap( id ).addCategory( "IconSakura" , "http://md.exblog.jp/img/ymap/mapIconSakura.png", 30, 10, -15 );
	
}
function YmapLoaded( id ) 
{
	var icons;
	
	YmapAddCategory(id);
	
	if( g_exYmap_conf[ id ] )
	{
		icons = g_exYmap_conf[ id ];
		if( icons )
		{
			for( var i in icons )
			{
				var icon = icons[i];
				getMap( id ).addIcon( icon.id , icon.lat , icon.lon , icon.popup , icon.cat );
			}
		}
	}
}


