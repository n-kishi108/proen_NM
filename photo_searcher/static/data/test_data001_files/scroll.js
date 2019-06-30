if(document.referrer)
{
	var _ex_succession_is = 1;
	if(navigator.userAgent && navigator.userAgent.match(/MSIE ([0-9]+|[0-9]+\.[0-9]+)/i))
	{
		if(parseFloat(RegExp.$1) < 7)
		{
			_ex_succession_is --;
		}
	}

	var _ex_succession_engines = [
		['.google.co.jp','q']
		,['.google.com','q']
		,['.yahoo.co.jp','p']
		,['search.msn.co.jp','q']
		,['www.infoseek.co.jp','qt']
		,['.goo.ne.jp','MT']
		,['.excite.co.jp','search']
		,['.excite.co.jp','q']
		,['kotochu.fresheye.com','kw']
		,['search.biglobe.ne.jp','q']
		,['cgi.search.biglobe.ne.jp','q']
		,['search.nifty.com','q']
		,['livedoor.com','q']
		,['www.baidu.jp','wd']
		,['www.bing.com','q']
	];

	for(var _ex_succession_p = 0;_ex_succession_p < _ex_succession_engines.length;_ex_succession_p ++)
	{
		var _ex_succession_regexp = new RegExp('^http:\\/\\/[a-zA-Z0-9_\\-\\.%]*' + _ex_succession_engines[_ex_succession_p][0].replace('.', '\\.') + '\\/[a-zA-Z0-9\\-_\\.,:%~\\+#=\\?&\\/]*[&\\?]{1}' + _ex_succession_engines[_ex_succession_p][1] + '=([a-zA-Z0-9%\\+\\*\\-\\.\\@_]+)&{0,1}');
		if(document.referrer.match(_ex_succession_regexp))
		{
			_ex_succession_is ++;
			break;
		}
	}

	if(_ex_succession_is == 2)
	{
		document.write("<scr");
		document.write("ipt src=\"http://www.exblog.jp/search/succession/js/parse.asp?s=scroll&r=" + encodeURIComponent(document.referrer) + "\" charset=\"utf-8\"><");
		document.write("/scr");
		document.write("ipt>");
	}
}
