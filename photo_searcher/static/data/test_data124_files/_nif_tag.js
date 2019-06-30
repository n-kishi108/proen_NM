/*
 * _nif_tag.js 1.2 
 * Copyright (C) 2008 NIFTY Corporation. All rights reserved.
 * Date:2008/09/08
 */

function _nInf(){

//For custumize
var _npr = location.protocol;

var tagPath = _npr + "//tag.nifty.com/img/";
var imgPath = "/_nif_tag.gif";

var _ndm;

var elements = document.getElementsByTagName("script");
for(var i=0; i<elements.length; i++){
	var js_src = elements[i].getAttribute("src");
	
	if( js_src != null && js_src.indexOf("_nif_tag.js") != -1 ){
		var js_path = js_src.split("?");
		
		if( js_path.length == 1 ){
			_ndm = document.domain;
		}else{
			var js_query = js_path[1].split("&");
			var ndm_flg = 0;

			for(var j=0; j<js_query.length; j++){
				var js_param = js_query[j].split("=");
				if( js_param.length == 2 && js_param[0] == "domain" && js_param[1] != ""){
						_ndm = js_param[1];
						ndm_flg = 1;
						break;
				}
			}
			
			if(ndm_flg == 0){
				_ndm = document.domain;
			}
			
		}
		break;
	}
}


var _nid = Math.random();
var _nur = _npr + "//" + _ndm + location.pathname + location.search;
var _nrf = document.referrer;

var imgPath = tagPath + _npr.replace(":",".") + _ndm + imgPath;

var tag=new Image();
tag.src = imgPath
        + "?"
        + "_nif_tag_id="
        + _nid
        + "&"
        + "_nif_tag_ur="
        + _nur
        + "&"
        + "_nif_tag_dm="
        + escape(_ndm)
        + "&"
        + "_nif_tag_rf="
        + _nrf;
}

_nInf();
