function wyoutube(url){
	 if (AC_FL_RunContent == 0) {
	 	alert("このページでは \"AC_RunActiveContent.js\" が必要です。");
	} else {
		AC_FL_RunContent(
				'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
				'width', '425',
				'height', '350',
				'src', url,
				'quality', 'high',
				'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
				'align', 'middle',
				'play', 'true',
				'loop', 'true',
				'scale', 'showall',
				'wmode', 'window',
				'devicefont', 'false',
				'id', 'blog-door_youtube',
				'bgcolor', '#ffffff',
				'name', 'blog-door_youtube',
				'menu', 'true',
				'allowFullScreen', 'false',
				'allowScriptAccess','sameDomain',
				'movie', url,
				'salign', ''
		); //end AC code
	}
}

function wyoutube2(url){
	 if (AC_FL_RunContent == 0) {
	 	alert("このページでは \"AC_RunActiveContent.js\" が必要です。");
	} else {
		AC_FL_RunContent(
				'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0',
				'width', '180',
				'height', '150',
				'src', url,
				'quality', 'high',
				'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
				'align', 'middle',
				'play', 'true',
				'loop', 'true',
				'scale', 'showall',
				'wmode', 'window',
				'devicefont', 'false',
				'id', 'blog-door_youtube',
				'bgcolor', '#ffffff',
				'name', 'blog-door_youtube',
				'menu', 'true',
				'allowFullScreen', 'false',
				'allowScriptAccess','sameDomain',
				'movie', url,
				'salign', ''
		); //end AC code
	}
}

