function disp_adclick(adclick_type, query, adclick_charset, target_id) {

	var host = "adclick.clog.jp";

	if(!navigator.userAgent.match(/Mozilla\/4\.0 \(compatible; MSIE 5\.\d*; (Windows|MSN|AOL)/)){
		adclick_charset = "UTF-8";
	}
	if(!target_id){
		target_id = adclick_type;
	}
	var q = query == "" ? "" : query + "&";
	q += "id=" + document.URL + "&";
	var url = location.protocol + "//" + host + "/ad/" + adclick_type + ".php/?" + q + "target_id=" + target_id + "&charset=" + adclick_charset;

	var func = function(){
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('charset', adclick_charset);
		script.setAttribute('src', url);
		var target = document.getElementById(target_id);
		target.appendChild(script);
	}

	if(window.addEventListener){
		window.addEventListener('load', func, false);
	}else if(window.attachEvent){
		window.attachEvent('onload', func);
	}else{
		window.onload = func;
	}
}

// 対象広告表示コールバック
function callback(data) {

	if ( data ) {
		// data中には必要なデータが設定されている事が前提

	    var target = "";
		for ( var i = 0; i < data.length; i++ ) {
		    target = document.getElementById(data[i].tag);

			var div = document.createElement("div");
			
			div.style.width = data[i].width+'px';
			
			// adtype of img for div-resize
			if(data[i].adtype == '1'){
			
				if(data[i].height != '' || data[i].height != '0'){
				
					if(data[i].image_height != '' || data[i].image_height != '0'){
						
						if(data[i].image_height < data[i].height){
							
							if(data[i].display_type == '0'){
								//div.style.height = (data[i].image_height + 30)+'px';
							}
							else{
								div.style.height = data[i].image_height+'px';
							}
						}
						else{
							if(data[i].display_type == '0'){
								//div.style.height = (data[i].height + 30)+'px';
							}
							else{
								div.style.height = data[i].height+'px';
							}
						}
					}
					else{
						div.style.height = data[i].height+'px';
					}
				}
			}
			
			//div.style.overflow = "auto";
			div.style.overflow = "hidden";
			
			// for side of admin
			if(data[i].type == '7'){
				div.style.fontSize = "10px";
				if(data[i].adtype == '1'){
					div.style.marginBottom	= "5px";
				}
			}
			else{
				div.style.fontSize = "12px";
			}
			
			// for text
			if(data[i].adtype == '0'){
			
				// for head of admin
				if(data[i].type == '6'){
					div.style.paddingTop	= '20px';
				}
				
				// for official
				if(data[i].type == '9'){
					div.style.paddingLeft	= '6px';
				}
				
				if(data[i].type == '10'){
					div.style.paddingLeft	= '3px';
				}
				
				div.style.lineHeight = "140%";
				div.style.marginTop		= "0px";
				div.style.marginRight	= "0px";
				div.style.marginLeft	= "0px";
				div.style.marginBottom	= "5px";
			
			}
			else{
			//	div.style.lineHeight	= "140%";
				div.style.marginTop		= "0px";
				div.style.marginRight	= "0px";
				div.style.marginLeft	= "0px";
			//	div.style.marginBottom	= "10px";
			//	div.style.marginBottom	= "3px";
			}

			// for head of admin
			if(data[i].type == '6'){
			//	div.style.display		= "inline";
				div.style.marginRight	= "auto";
				div.style.marginLeft	= "auto";
				div.style.verticalAlign	= "middle";
			}

		//	div.style.padding = "8px";
		//	div.style.borderTop = "1px solid #000066";
		//	div.style.borderLeft = "1px solid #000066";
		//	div.style.borderRight = "1px solid #000066";
		//	div.style.borderBottom = "1px solid #000066";

			// for text at head of blog
			if(data[i].type == '2' && data[i].adtype == '0'){
				if(navigator.userAgent.indexOf("MSIE")!=-1){
					div.setAttribute("className", "main");
				}else{
					div.setAttribute("class", "main");
				}
				div.style.marginLeft	= "5px";
				div.style.paddingTop	= "0px";
				div.style.paddingBottom	= "0px";
				div.style.backgroundColor = "transparent";
			}
			
			// adtype of img
			if( data[i].imageurl && data[i].adtype == '1'){
				
				// img

	        	var anchor = document.createElement("a");
	       		anchor.setAttribute("href", data[i].redirecturl);

				var img = document.createElement("img");
				img.src = data[i].imageurl;
				
				// for blog
				if(data[i].display_type == '0'){
					
					// for sidebar
					if(data[i].type == '1'){
						div.style.lineHeight = "140%";
						div.style.marginRight ="auto";
						div.style.marginLeft ="auto";
					}
					if(data[i].image_height < data[i].height){
						img.height = data[i].image_height;
					}
					else{
						img.height = data[i].height;
					}
					if(data[i].image_width < data[i].width){
						img.width = data[i].image_width;
					}
					else{
						img.width = data[i].width;
					}
				}
				else{
					if(data[i].image_height < data[i].height){
						img.height = data[i].image_height;
					}
					else{
						if(data[i].height !='0' && data[i].height != ''){
							img.height = data[i].height;
						}
						else{
							img.height = data[i].image_height;
						}
					}
					if(data[i].image_width < data[i].width){
						img.width = data[i].image_width;
					}
					else{
						img.width = data[i].width;
					}
				}
		//		img.width = data[i].width;
		//		img.height = data[i].height;
			
				img.setAttribute('border', '0');
				img.setAttribute('alt', data[i].message);
				
				anchor.appendChild(img);
				anchor.setAttribute('target', '_blank');

				div.appendChild(anchor);
			}
			
			// for image at side of blog
			if(data[i].type == '1' && data[i].adtype == '1'){
				var nl = document.createElement("br");
				div.appendChild(nl);
			}
			// add [PR] without admin, official
			if((data[i].display_type == '1' || data[i].display_type == '2') && data[i].adtype == '1'){
			}
			else{
				// テキスト広告 + 画像広告用テキスト部
				var anchor = document.createElement("a");
				anchor.setAttribute("href", data[i].redirecturl);
				
				anchor.setAttribute('target', '_blank');

				var str = '［PR］'+data[i].message;
				anchor.appendChild(document.createTextNode(str));
				
				// for image of blog
				if(data[i].display_type == '0' && data[i].type == '1'){
					anchor.style.fontSize = "10px";
					anchor.style.textAlign = "left";
				}
				anchor.style.textDecoration	= "underline";
				anchor.style.fontWeight		= "normal";
				div.appendChild(anchor);
			}
		    target.appendChild(div);
		}
	} else {
/*
	    var target = document.getElementById("custom1");
		var div = document.createElement("div");
		div.innerHTML = "no object.";		// Debug.
	    target.appendChild(div);
 */
	}
}

