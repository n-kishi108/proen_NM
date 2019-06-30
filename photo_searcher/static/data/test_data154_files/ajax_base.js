function disp(target_id,disp_text){
	var obj = document.getElementById(target_id);
	if(obj){
		obj.innerHTML = disp_text;
	}else{
		obj = document.getElementById('debug');
		if(obj){
			obj.innerHTML = disp_text;
		}else{
			obj = document.getElementById('error');
			if(obj){
				obj.innerHTML = disp_text;
			}
		}
	}
}

function inp(target_id){
	var obj = document.getElementById(target_id);
	if(obj){
		return obj.innerHTML;
	}

	return '';
}

function abs_url(url){
	var out_url = url;
	if(!url.match(/^https?:\/\//)){
		if(url.match(/^\//)){
			out_url = document.URL.replace(/^(https?:\/\/[^\/]+).*$/,'$1'+url);
		}else{
			var tmp_array = document.URL.split('/');
			var tmp_url = url.split('../');
			for(var i=0;i<tmp_url.length;i++){
				tmp_array.pop();
			}
			out_url = tmp_array.join('/') + '/' + tmp_url[tmp_url.length-1];
		}
	}

	return out_url;
}

function create_xmlhttp(target_id){
	var xmlhttp = null;
	try{
		xmlhttp = new XMLHttpRequest();
	}catch(err_id){
		try{
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(err_id){
			try{
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(err_id){
				xmlhttp = null;
			}
		}
	}
	if(!xmlhttp){
		disp(target_id,'Error!');
	}

	return xmlhttp;
}

function get_request_buff(url,func){
	var buff = new Object();
	var xmlhttp = create_xmlhttp('debug');
	if(xmlhttp){
		var nochash;
		if(url.match(/\?/)){
			nochash = '&' + (new Date()).getTime();
		}else{
			nochash = '?' + (new Date()).getTime();
		}
		xmlhttp.open('GET',url+nochash, true);
		xmlhttp.onreadystatechange = function(){
			var text = '';
			if(
				xmlhttp.readyState == 4 &&
				xmlhttp.status == 200
			){
				text = xmlhttp.responseText;
				buff['respons'] = text;
				init_defain();
				if(func){
					func(buff);
				}
			}
		};
		xmlhttp.send(null);
	}

	return buff;
}

function get_request(target_id,url,func,debug){
	var xmlhttp = create_xmlhttp(target_id);
	if(xmlhttp){
		var nochash;
		if(url.match(/\?/)){
			nochash = '&' + (new Date()).getTime();
		}else{
			nochash = '?' + (new Date()).getTime();
		}
		xmlhttp.open('GET',url+nochash, true);
		xmlhttp.onreadystatechange = function(){
			var text = '';
			if(
				xmlhttp.readyState == 4 &&
				xmlhttp.status == 200
			){
				text = xmlhttp.responseText;
				if(debug){
					text += xmlhttp.readyState + ':' + xmlhttp.status
				}
				disp(target_id,text);
				init_defain();
				if(func){
					func();
				}
			}else{
				if(debug){
					text = xmlhttp.readyState + ':' + xmlhttp.status;
					disp(target_id,text);
				}
			}
		};
		xmlhttp.send(null);
	}
}

function post_request(target_id,url,data,func,debug){
	var xmlhttp = create_xmlhttp(target_id);
	if(xmlhttp){
		xmlhttp.open('POST',url, true);
		xmlhttp.onreadystatechange = function(){
			if(
				xmlhttp.readyState == 4 &&
				xmlhttp.status == 200
			){
				var text = xmlhttp.responseText;
				if(debug){
					text += xmlhttp.readyState + ':' + xmlhttp.status
				}
				disp(target_id,text);
				init_defain();
				if(func){
					func();
				}
			}else{
				if(debug){
					text = xmlhttp.readyState + ':' + xmlhttp.status;
					disp(target_id,text);
				}
			}
		};
		xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlhttp.send(data);
	}
}

function make_post_data(form_id){
	var obj = document.getElementById(form_id);

	var elm = obj.elements;
	var data = '';
	for(var i=0; i<elm.length; i++){
		var type = elm[i].type;
		var name = elm[i].name;
		var val = encodeURIComponent(elm[i].value);

		if(type=='radio' || type=='checkbox'){
			if(elm[i].checked==true){
				data += name + '=' + val + '&';
			}
		}else if(name){
			data += name + '=' + val + '&';
		}
	}
	data += 'utf8=1';

	return data;
}

function replace_tmpl_hash(tmpl,hash){
	var tmp_tmpl = tmpl;
	tmp_tmpl = tmp_tmpl.replace(/%7B%5B/g,'{[');
	tmp_tmpl = tmp_tmpl.replace(/%5D%7D/g,']}');
	for(var key in hash){
		tmp_tmpl = tmp_tmpl.replace(eval('/\\{\\[' + key + '\\]\\}/g'),hash[key]);
	}

	return tmp_tmpl;
}

function dynamic_load(script_id,url){
	if(document.all){
		eval(document.all(script_id)).src = url;
	}else{
		var target = document.getElementById(script_id);
		var suorce = document.createElement('script');
		suorce.src = url;
		suorce.id = script_id;
		target.parentNode.replaceChild(suorce,target);
	}
}