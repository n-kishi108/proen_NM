<!--
/* name のcookie を設定します */
function setCookie( name , value , expires , path , domain , secure )
{
	document.cookie = name + "=" + escape( value ) + 
					( (expires) ? "; expires=" + expires : "" ) + 
					( (path   ) ? "; path="    + path : ""    ) +
					( (domain ) ? "; domain="  + domain : ""  ) +
					( (secure ) ? "; secure"            : ""  );
}


/* name のcookie を取得します */
function getCookie( name )
{
	var arg = name + "=";
	var alen= arg.length;
	
	var cary= document.cookie.split( "; " );
	var i = 0;
	for( var j = 0 ; j < cary.length ; j++ )
	{
		var cval = unescape( cary[j] );
		
		var reg = new RegExp("^" + arg );
		if( reg.test( cval ) )
		{
			var c = cval.substring( alen ,  cval.length );
			return( c );
		
		}
	}
	return "";
}

/* & で連結されているCookie の値から name を取り出します */
function getSubCookie( c , name )
{
	var els = c.split( "&" );
	name += "=";
	var ret = "";
	for( var i = 0 ; i < els.length  ; i++ )
	{
		var reg = new RegExp( "^" + name );
		if( reg.test( els[i] ) )
		{
			ret = els[ i ];
			ret = ret.substring( name.length  , ret.length );
			return ret ;
		}
	}
	return "";
	
}

/* & で連結されているCookie の値から name を dstに書き換えて返します */
function cnvSubCookie( c , name , dst )
{
	var els = c.split( "&" );
	name += "=";
	var ret_c = "";
	var f = 0; 		// 書き換えフラグ
	
	for( var i = 0 ; i < els.length  ; i++ )
	{
		var reg = new RegExp( "^" + name );
		if( reg.test( els[i] ) )
		{
			var tmp = els[i].split( "=" );
			els[i] = tmp[0] + "=" + dst;
			f = 1;
		}
		
		if( i == ( els.length - 1 ) )
		{
			ret_c += els[i];
		}else
		{
			ret_c += els[i] + "&";
		}
	}
	if( !f )
	{
		// 新規追加の場合
		if( ret_c == '' )
		{
			ret_c = name + dst;
		}else
		{
			ret_c += "&" + name + dst;
		}
	}
	return unescape( ret_c );	
}

-->