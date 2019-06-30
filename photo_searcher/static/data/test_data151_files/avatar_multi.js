// 京 
var avtcounter = 0;
var jumpurl = "";

function avt_maintenance ( x , y )
{

	var imgurl = "http://avtimg.yahoo.co.jp/img/avatar/avatarmaintain_" + x +"x"+ y +".gif"
	var alt = "メンテナンス"
	var default_return = '<div id=yjpavt_default_' + avtcounter + ' style="position:relative; width:' + x + 'px; height:' + y + 'px; overflow:visible;"><img id=yjpavt_image_default' + avtcounter + ' src="' + imgurl + '" border=0 name=yjpavt_image_default' + avtcounter + ' alt=\"' + alt + '\"></div>';
		
	document.write(default_return);

	avtcounter ++;
	jumpurl = "";

}


function avt_unestaAvatar_jump( imgurl , link , alt ,x ,y )
{
	if (jumpurl == ""){
		jumpurl = link;
	}

	var default_return = '<div id=yjpavt_default_' + avtcounter + ' style="position:relative; width:' + x + 'px; height:' + y + 'px; overflow:visible;"><a href=\"' + jumpurl + '\"><img id=yjpavt_image_default' + avtcounter + ' src="' + imgurl + '" border=0 name=yjpavt_image_default' + avtcounter + ' alt=\"' + alt + '\"></a></div>';

	document.write(default_return);

	avtcounter ++;
	jumpurl = "";
}

function avt_getAvatar_jump_yae(avt_now,yae_jumpurl,alt,x,y)
{
	
	if (avt_now=="") {
		return false;
	}else{

		document.write('<div id=yjpavt_character_' + avtcounter + ' style="position:relative; width:' + x + 'px; height:' + y + 'px; overflow:visible">');

		var arrName = avt_now.split(",");
		var length = arrName.length;
		var for_count = 0;


		var layerno = 0;
		for(i=0; i < length ; i++)
		{
			layerno = avt_getLayer(arrName[i]);

			document.write('<div id=yjpavt_layer' + avtcounter + '_' + layerno + ' style="position:absolute; left:0px; top:0px; width:' + x + 'px; height:' + y + 'px; z-index:' + layerno + ' ; overflow:hidden;">');
			document.write('<img id=yjpavt_image' + avtcounter + '_' + layerno + ' src="' + avt_getImagePath(arrName[i]) + '" border=0 name=yjpavt_image' + avtcounter + '_' + layerno + ' alt="アバター">');
			document.write('</div>');
		}

		var rap_img_layer = 200;
		document.write('<div id=yjpavt_layer' + avtcounter + '_' + rap_img_layer + ' style="position:absolute; left:0px; top:0px; width:' + x + 'px; height:' + y + 'px; z-index:' + rap_img_layer + ' ; overflow:hidden;">');

		if(yae_jumpurl==""){	
			document.write('<img style="z-index:' + rap_img_layer + ';" id=yjpavt_rap_' + avtcounter + ' src="http://ai.yimg.jp/images/clear.gif" border=0 alt="'+alt+'" width=' + x + ' height=' + y + ' title="'+alt+'">' );
		}else{
			document.write('<a href="' + yae_jumpurl + '">');
			document.write('<img style="z-index:' + rap_img_layer + ';" id=yjpavt_rap_' + avtcounter + ' src="http://ai.yimg.jp/images/clear.gif" border=0 alt="'+alt+'" width=' + x + ' height=' + y + ' title="'+alt+'">' );
			//document.write('<img style="z-index:' + rap_img_layer + ';" id=rap_' + avtcounter + ' src="http://ai.yimg.jp/images/clear.gif" border=0 alt=\"'+ alt +'\" width=' + x + ' height=' + y + ' >' );
			document.write('</a>');
		}

		document.write('</div>');
		document.write("</div>");
	
		avtcounter = avtcounter + 1;
	}
}

function avt_getAvatar_jump(avt_now, id, x,y)
{
	
	if (avt_now=="") {
		return false;
	}else{
		if (id=="") {
			return false;
		}

		if ( jumpurl == "" ){
			jumpurl = get_AvatarProfile(id);
		}
	
		document.write('<div id=yjpavt_character_' + avtcounter + ' style="position:relative; width:' + x + 'px; height:' + y + 'px; overflow:visible">');

		var arrName = avt_now.split(",");
		var length = arrName.length;
		var for_count = 0;


		var layerno = 0;
		for(i=0; i < length ; i++)
		{
			layerno = avt_getLayer(arrName[i]);

			document.write('<div id=yjpavt_layer' + avtcounter + '_' + layerno + ' style="position:absolute; left:0px; top:0px; width:' + x + 'px; height:' + y + 'px; z-index:' + layerno + ' ; overflow:hidden;">');
			document.write('<img id=yjpavt_image' + avtcounter + '_' + layerno + ' src="' + avt_getImagePath(arrName[i]) + '" border=0 name=yjpavt_image' + avtcounter + '_' + layerno + ' alt="アバター ">');
			document.write('</div>');
		}

		var rap_img_layer = 200;
		document.write('<div id=yjpavt_layer' + avtcounter + '_' + rap_img_layer + ' style="position:absolute; left:0px; top:0px; width:' + x + 'px; height:' + y + 'px; z-index:' + rap_img_layer + ' ; overflow:hidden;">');
		document.write('<a href="' + jumpurl + '">');
		document.write('<img style="z-index:' + rap_img_layer + ';" id=yjpavt_rap_' + avtcounter + ' src="http://ai.yimg.jp/images/clear.gif" border=0 alt="" width=' + x + ' height=' + y + ' >' );
		document.write('</a>');
		document.write('</div>');

		document.write("</div>");
	
		avtcounter = avtcounter + 1;
		jumpurl = "";
	}
}

function jump_AvatarProfile(id)
{
	document.location = "http://avatar.yahoo.co.jp/my/other.html?yid=" + id;
}

function get_AvatarProfile(id)
{
	return "http://avatar.yahoo.co.jp/my/other.html?yid=" + id;
}

function avt_getLayer(ImgName)
{
	return ImgName.substring(3,5);
}


function avt_getImagePath(ImgName)
{
	
	Brood = ImgName.substring(0,1);
	ImgName = ImgName.substring(0,10) + ".gif";
	TempCat = ImgName.substring(1,2)
	Cat = avt_getCat(TempCat);
	Brood = avt_getBrood(Brood);

	return "http://k.yimg.jp/images/"+ Brood +"/"+ Cat +"/"+ ImgName;
}


function avt_getCat(TempCat)
{
	var Cat;
	switch(TempCat)
	{
	case "a":
		Cat="cat1";
	break;
	
	case "b":
		Cat="cat2";
	break;
	
	case "c":
		Cat="cat3";
	break;
	
	case "d":
	case "e":
	case "f":
	case "g":
	case "h":
		Cat="cat4";
	break;
	
	case "o":
		Cat="cat5";
	break;
	
	case "i":
	case "r":
		Cat="cat6";
	break;
	
	case "s":
		Cat="cat7";
	break;
	
	}
	return Cat
}


function avt_getBrood(TempBrood)
{
	var Brood;
	switch(TempBrood)
	{
	case "1":
		Brood="avt11";
	break;
	
	case "2":
		Brood="avt12";
	break;
	
	case "3":
		Brood="avt21";
	break;
	
	case "4":
		Brood="avt22";
	break;
	}
	return Brood;
}
