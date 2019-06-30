// http://japan.cnet.com//media/scripts/common/sbm.js

var g_URL;
var g_Site;
//var g_title; 

//window.onload=init_sbm_data;

function init_sbm_data(){
  g_URL  = get_documenturl();
  g_Site = get_site(g_URL);
  load_bookmarkcount(g_URL);
}

function load_bookmarkcount(url){
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.charset = "utf-8";
	s.src = "http://api.japan.cnet.com/api.php?srv=meta_bc&op=json&cb=insertSbmCount&url=" + url + '&title=' + document.title;
	document.body.appendChild(s);
}

function insertSbmCount(sbmData){
	var all_count  = 0;
	for(var i = 0; i < sbmData.length; i++){
		var sbm = sbmData[i];
		set_href(     "sbm_url_"        + id_conv(sbm.id), sbm.add_url);
		set_href(     "sbm_list_url_"  + id_conv(sbm.id), sbm.view_url);
        
        if(g_Site == "gamespot")
        {
  		   set_innerHTML("sbm_count_" + id_conv(sbm.id), "(" + sbm.count + ")");
        }else{
  		   set_innerHTML("sbm_count_" + id_conv(sbm.id), sbm.count);
        }
        
		all_count += sbm.count;
	}
	
	set_href(     "sbm_url_newsing" ,  "http://newsing.jp/add?url=" + g_URL);

	if( $('sbm_all_count_top') ){     $('sbm_all_count_top').innerHTML    = all_count; }
	if( $('sbm_all_count_bottom') ){  $('sbm_all_count_bottom').innerHTML = all_count; }
}

function set_href(id, value)
{
	var elm1 = $(id);
	var elm2 = $(id + "_top"  );
	var elm3 = $(id + "_bottom");
	var elm4 = $(id + "_EXTPOSITION");

    if( elm1 ){ elm1.href = value; }
    if( elm2 ){ elm2.href = value; }
    if( elm3 ){ elm3.href = value; }
    if( elm4 ){ elm4.href = value; }
}

function set_innerHTML(id, value)
{
	var elm1 = $(id);
	var elm2 = $(id + "_top"  );
	var elm3 = $(id + "_bottom");
	var elm4 = $(id + "_EXTPOSITION");

    if( elm1 ){ elm1.innerHTML = value; }
    if( elm2 ){ elm2.innerHTML = value; }
    if( elm3 ){ elm3.innerHTML = value; }
    if( elm4 ){ elm4.innerHTML = value; }
}

function id_conv(sbm_id, div_id)
{
	var ids = {
		"hbm": "hatena" ,
		"bzl": "ecnavi",
		"lvd": "livedoor",
		"ybm": "yahoo",
		"pma": "pookmark",
		"saf": "saaf"
	};
	
	return ids[sbm_id];
}

function get_documenturl()
{
	var tmp_URL = document.URL;
	tmp_URL = tmp_URL.replace(/\?.*/, "");
	var url_member = tmp_URL.split("/");
	if( url_member[url_member.length - 1].match(/-\d+,/) ){
		url_member[url_member.length - 1] = url_member[url_member.length - 1].replace(/-\d+,/, ",");
		return url_member.join("/");
	}else{
		return tmp_URL;
	}
}

function get_site(url)
{
	if( url.match(/japan\.gamespot\.com/) ){
		return "gamespot";
	}else{
		return "cnet";
	}
}
