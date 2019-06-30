//#######################################################
//## Copyright 2007 Rakuten, Inc. All rights reserved. ##
//##    v1.0                                           ##
//#######################################################
// $Id: rakuten_dynamic.js,v 1.7 2008/05/19 02:25:32 kkawamura Exp $


//--- DEF of URI of adserver
var rakuten_adserver = 'dynamic.rakuten.co.jp';
var rakuten_service_dir = '/rcm/1.0/i/html';

if(typeof(rakuten_service) == "undefined"){
	rakuten_service_dir = '/rcm/1.0/i/html';
}else{
	switch (rakuten_service) {
		case 'all':
			rakuten_service_dir = '/rcm/1.0/g/html';
			break;
		case 'ichiba':
			rakuten_service_dir = '/rcm/1.0/i/html';
			break;
		case 'travel':
			rakuten_service_dir = '/rcm/1.0/t/html';
			break;
		default:
			rakuten_service_dir = '/rcm/1.0/i/html';
			break;
	}
}

//var rakuten_adserver_uri = 'http://' + rakuten_adserver + '/rcm/1.0/i/html';
var rakuten_adserver_uri = 'http://' + rakuten_adserver + rakuten_service_dir;

//--- Initializing parameters ---
var rakuten_parameters = '';
var rakuten_URL;
var rakuten_refURL;
var rakuten_ad_width = '';
var rakuten_ad_height = '';

//--- extracting parameters ---
if (typeof(encodeURIComponent) == 'function') {
	rakuten_URL = encodeURIComponent(location.href);
	rakuten_refURL = encodeURIComponent(document.referrer);
	//--- colors ---
	if(typeof(rakuten_color_bg) != "undefined"){
		rakuten_parameters += '&color_bg=' + rakuten_color_bg;
	}
	if(typeof(rakuten_color_border) != "undefined"){
		// simple design default color set
		if(rakuten_color_border == ''
		&& rakuten_template.charAt(0) == 's'){
			rakuten_color_border = 'cccccc';
		}
		rakuten_parameters += '&color_border=' + rakuten_color_border;
	}
	if(typeof(rakuten_color_text) != "undefined"){
		rakuten_parameters += '&color_text=' + rakuten_color_text;
	}
	if(typeof(rakuten_color_link) != "undefined"){
		rakuten_parameters += '&color_link=' + rakuten_color_link;
	}
	if(typeof(rakuten_color_price) != "undefined"){
		rakuten_parameters += '&color_price=' + rakuten_color_price;
	}
	if(typeof(rakuten_affiliateId) != "undefined"){
		rakuten_parameters += '&affiliateId=' + rakuten_affiliateId;
	}

	//--- target ---
	if(typeof(rakuten_target) != "undefined"){
		rakuten_parameters += '&target=' + rakuten_target;
	}
	if(typeof(rakuten_media_id) != "undefined"){
		rakuten_parameters += '&mediaId=' + rakuten_media_id;
	}

	//--- template ---
	switch (rakuten_template){
	case '160_600_img':
	case '160_600_txt':
	case 's_160_600_img':
	case 's_160_600_txt':
		rakuten_parameters += '&template=' + rakuten_template;
		rakuten_ad_width = 160;
		rakuten_ad_height = 600;
		break;
	case '148_800_img':
	case '148_800_txt':
	case 's_148_800_img':
	case 's_148_800_txt':
		rakuten_parameters += '&template=' + rakuten_template;
		rakuten_ad_width = 148;
		rakuten_ad_height = 800;
		break;
	case '468_120_img':
	case 's_468_120_img':
		rakuten_parameters += '&template=' + rakuten_template;
		rakuten_ad_width = 468;
		rakuten_ad_height = 120;
		break;
	case '468_60_txt':
	case 's_468_60_txt':
		rakuten_parameters += '&template=' + rakuten_template;
		rakuten_ad_width = 468;
		rakuten_ad_height = 60;
		break;
	case '728_180_img':
	case 's_728_180_img':
		rakuten_parameters += '&template=' + rakuten_template;
		rakuten_ad_width = 728;
		rakuten_ad_height = 180;
		break;
	case '728_90_txt':
	case 's_728_90_txt':
		rakuten_parameters += '&template=' + rakuten_template;
		rakuten_ad_width = 728;
		rakuten_ad_height = 90;
	        break;
	case '200_200_img':
	case '200_200_txt':
	case 's_200_200_img':
	case 's_200_200_txt':
		rakuten_parameters += '&template=' + rakuten_template;
		rakuten_ad_width = 200;
		rakuten_ad_height = 200;
	        break;
	case '300_250_img':
	case '300_250_txt':
	case 's_300_250_img':
	case 's_300_250_txt':
		rakuten_parameters += '&template=' + rakuten_template;
		rakuten_ad_width = 300;
		rakuten_ad_height = 250;
	        break;
	case '336_280_img':
	case '336_280_txt':
	case 's_336_280_img':
	case 's_336_280_txt':
		rakuten_parameters += '&template=' + rakuten_template;
		rakuten_ad_width = 336;
		rakuten_ad_height = 280;
	        break;
	}//switch template end

	document.write('<if' + 'rame width="' + rakuten_ad_width + '" height="' + rakuten_ad_height + '" frameBorder="0" src="' + rakuten_adserver_uri + '?url=' + rakuten_URL + rakuten_parameters + '" scrolling=\"no\"></ifr' + 'ame>');

}

