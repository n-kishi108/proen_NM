var r ;
var g ;
var b ;
var MouseOverBg ;

function ov_callback(json) {

	if (json) {
		var items = json["items"];

		var getBgcontents = "content";
		MouseOverBg = get_MouseOverColor(getBgcontents);
		
		var html = "";
		if(items) {
			for(var i = 0; i <= items.length; i++) {
				var elem = items[i];
				var text;
				var output;
				
				//label
				var label = '<div style="text-align:right;font-size:80%;margin-bottom:1px;filter: alpha(opacity=50);-moz-opacity: 0.5;opacity: 0.5;">インタレストマッチ-<a href="http://ov.yahoo.co.jp/service/int/index.html" target="_blank">広告掲載について</a></div>';
				
				if(i == 0){
					output = elem["output"];
				}else if(i == items.length){
					var ov_obj = document.getElementById('ov_output' + output);
					if(ov_obj){
						ov_obj.innerHTML = html + label;
					}
					break;
				}
				
				if(elem["output"] != output) {
				
					var ov_obj = document.getElementById('ov_output' + output);
					if(ov_obj){
						ov_obj.innerHTML = html + label;
					}
					output = elem["output"];
					html = '';
				}
				
				text = '<div style="overflow: hidden;float:none;border:none;text-align:left;margin:0;padding:0;height:auto;width:auto;background-color:transparent;background-image:none;" class="main">';
				text += '<dl style="font-size:12px;margin:0;padding:5px;line-height:120%;" onMouseOver="this.style.background=\''+ MouseOverBg +'\';" onMouseOut="this.style.background=\'transparent\';">';
				text += '<dt><img src="http://ads.atja.jp/clogif/ov_img/ov_icon_blog_1.gif" style="margin:0 3px 0 0;padding:0px;border:0px;vertical-align:text-bottom;">';
				text += '<b><a href="' + elem["ClickUrl"] + '" target="_blank">';
				text += decodeURIComponent(elem["title"]);
				text += '</a></b>';
				text += '</dt>';
				text += '<dd style="margin:2px 0 0 13px;cursor:pointer;line-height:120%;" onclick="window.open(\'' + elem["ClickUrl"] + '\')">';
				text += decodeURIComponent(elem["description"]);
				text += '<div style="font-size:10px;height: 1em;line-height: 1;">';
				text += decodeURIComponent(elem["siteHost"]);
				text += '</div>';
				text += '</dd>';
				text += '</dl>';
				text += '</div>';
		
				html += text;
				
			}
		}
	}
}

function disp_overture(site_id, query, charset, target_id) {

	if(site_id == "ti-da.net" || site_id == "da-te.jp" || site_id == "soreccha.jp" || site_id == "della-nagoya.jp" || site_id == "osakazine.net" || site_id == "ko-co.jp" || site_id == "kyo2.jp" || site_id == "ashita-sanuki.jp" || site_id == "shiga-saku.net" || site_id == "otemo-yan.net" ){
		var host = "ads.atja.jp";
	} else if(site_id == "hamazo.tv" || site_id == "kitaguni.tv" || site_id == "365blog.jp" || site_id == "naganoblog.jp" || site_id == "junglekouen.com" || site_id == "chesuto.jp"){
		var host = "saakuru.atja.jp/ov";
	} else {
		var host = "www.atja.jp";
	}
	
	if(!navigator.userAgent.match(/Mozilla\/4\.0 \(compatible; MSIE 5\.\d*; (Windows|MSN|AOL)/)){
		charset = "UTF-8";
	}
	var q = query == "" ? "" : query;
	var url = location.protocol + "//" + host + "/clogif/ad_json.php?" + q;
	
	var func = function(){
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('charset', charset);
		script.setAttribute('src', url);
		document.getElementById(target_id).appendChild(script);
	}
	
	if(window.addEventListener){
		window.addEventListener('load', func, false);
	}else if(window.attachEvent){
		window.attachEvent('onload', func);
	}else{
		window.onload = func;
	}

}

function get_MouseOverColor(contents){

	var element=document.getElementById(contents);
	
	if(element){
		if(navigator.userAgent.indexOf("MSIE")!=-1){
			var bgcolor=element.currentStyle.backgroundColor;
		}else{
			var bgcolor=document.defaultView.getComputedStyle(element,null).getPropertyValue("background-color");
		}
		
		if(bgcolor != "transparent" && bgcolor.indexOf("rgba")==-1){
			
			MouseOverBg = get_MouseOverRgb(bgcolor);
			
		} else {
			
			var element2=document.getElementById("container");
			if(element2){
				if(navigator.userAgent.indexOf("MSIE")!=-1){
					var bgcolor=element2.currentStyle.backgroundColor;
				}else{
					var bgcolor=document.defaultView.getComputedStyle(element2,null).getPropertyValue("background-color");
				}
				if(bgcolor != "transparent" && bgcolor.indexOf("rgba")==-1){
					MouseOverBg = get_MouseOverRgb(bgcolor);
				} else {
					MouseOverBg = "#ABABCC";
				}
			}else{
				MouseOverBg = "#9a9a9a";
			}
		}
	}else{
		MouseOverBg = "#9a9a9a";
	}

	return(MouseOverBg);

}

function get_MouseOverRgb(bgcolor){

	if(navigator.userAgent.indexOf("MSIE")!=-1||navigator.userAgent.indexOf("Opera")!=-1){
		color=bgcolor.match(/^#(\w{2})(\w{2})(\w{2})$/);
//	} else if (bgcolor.indexOf("rgba")!=-1) {
//		color=bgcolor.match(/^rgba\(\s*(\d+),\s*(\d+),\s*(\d+),\s*(\d+\))$/);
	} else {
		color=bgcolor.match(/^rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\)$/);
	}
	
	if (!color) {
		/* #ffffff */
		MouseOverBg = "#DFDFFF";
	} else {
		if(navigator.userAgent.indexOf("MSIE")!=-1||navigator.userAgent.indexOf("Opera")!=-1){
			/* IEOpera16 */
			r = parseInt(color[1],16);
			g = parseInt(color[2],16);
			b = parseInt(color[3],16);
		} else {
			/* 10 */
			r = parseInt(color[1]);
			g = parseInt(color[2]);
			b = parseInt(color[3]);
		}
	}
	if (!MouseOverBg){
		if (r+b+g == 765){
			MouseOverBg = "#DFDFFF";
		} else if (r+b+g == 0){
			MouseOverBg = "#9a9a9a";
		} else { 
			if(r > 127){
				r = r-36;
			}else{
				r = r+36;
			}
			if(b > 127){
				b = b-36;
			}else{
				b = b+36;
			}
			if(g > 127){
				g = g-36;
			}else{
				g = g+36;
			}
			MouseOverBg = "#" + r.toString(16) + b.toString(16) + g.toString(16);
		}
	}
	return (MouseOverBg);
}