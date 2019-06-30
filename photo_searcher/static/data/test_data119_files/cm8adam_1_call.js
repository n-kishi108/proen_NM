// All rights reserved CheckM8 Inc. (C) 2008
if (typeof(encodeURIComponent) == "undefined")
	window.encodeURIComponent = function(str) {
		var l = ['%00', '%01', '%02', '%03', '%04', '%05', '%06',
				 '%07', '%08', '%09', '%0A', '%0B', '%0C', '%0D',
				 '%0E', '%0F', '%10', '%11', '%12', '%13', '%14',
				 '%15', '%16', '%17', '%18', '%19', '%1A', '%1B',
				 '%1C', '%1D', '%1E', '%1F', '%20', '!', '%22',
				 '%23', '%24', '%25', '%26', "'", '(', ')', '*', '%2B', '%2C',
				 '-', '.', '%2F', '0', '1', '2', '3', '4', '5', '6',
				 '7', '8', '9', '%3A', '%3B', '%3C', '%3D', '%3E', '%3F',
				 '%40', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
				 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
				 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '%5B', '%5C',
				 '%5D', '%5E', '_', '%60', 'a', 'b', 'c', 'd', 'e',
				 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
				 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
				 'z', '%7B', '%7C', '%7D', '~', '%7F'];
		var out, i, len, c;

		out = [];
		len = str.length;
		for(i = 0; i < len; i++) {
			c = str.charCodeAt(i);
			if (c <= 0x007F) {
				out[out.length] = l[c];
			}
			else if (c > 0x07FF) {
				out[out.length] = '%' + (0xE0 | ((c >> 12) & 0x0F)).toString(16).toUpperCase();
				out[out.length] = '%' + (0x80 | ((c >>  6) & 0x3F)).toString(16).toUpperCase();
				out[out.length] = '%' + (0x80 | ((c >>  0) & 0x3F)).toString(16).toUpperCase();
			}
			else {
				out[out.length] = '%' + (0xC0 | ((c >>  6) & 0x1F)).toString(16).toUpperCase();
				out[out.length] = '%' + (0x80 | ((c >>  0) & 0x3F)).toString(16).toUpperCase();
			}
		}
		return out.join('');
	};


(function()
{
	var nav = window.navigator || {};

	function get_time()
	{
	   	var theDate = new Date();
		var YYYY = new String(theDate.getYear());
		for(i=4-YYYY.length;i>0;i--)
			YYYY = "0" + YYYY;
		var MM = new String(theDate.getMonth()+1);
		if (MM < 1 || MM > 12)
			MM = 1;
		if (MM.length < 2)
			MM = "0" + MM;
		var DD = new String(theDate.getDate());
		if (DD < 1 || DD > 31)
			DD = 1;
		if (DD.length < 2)
			DD = "0" + DD;
		var HH = new String(theDate.getHours());
		if (HH < 0 || HH > 24)
			HH = 1;
		if (HH.length < 2)
			HH = "0" + HH;
	    return "DATE=" + YYYY + MM + DD + "&HOUR=" + HH;
	}
	
	function get_size()
	{
		var width; var height;
		if (self.innerWidth) {
			width = self.innerWidth;
			height = self.innerHeight;
		}
		else if (document.documentElement && document.documentElement.clientWidth) {
			width = document.documentElement.clientWidth;
			height = document.documentElement.clientHeight;
		}
		else if (document.body.clientWidth) {
			width = document.body.clientWidth;
			height = document.body.clientHeight
		}
		else {
			var width  = 1024;
			var height = 768;
		}
		
		var width_group;
		if (width > 1200)
			width_group = "WR_E";
		else if (width > 1000)
			width_group = "WR_D";
		else if (width > 800)
			width_group = "WR_C";
		else if (width > 600)
			width_group = "WR_B";
		else
			width_group = "WR_A";
	
		return "WIDTH=" + width + "&HEIGHT=" + height + "&WIDTH_RANGE=" + width_group;
	}
	
	window.CM8GetLocation = function()
	{
		var encoded = [];
		var loc = document.location.href;
		for (var i = 0; i < loc.length; i++) {
			var code = loc.charCodeAt(i);
			if ((code >= 256) || (code == 32))
				encoded.push(encodeURIComponent(loc.substr(i, 1)));
			else if (code == 92)  // \
				encoded.push("\\\\");
			else if (code == 63)  // ?
				encoded.push("\\q");
			else if (code == 38)  // &
				encoded.push("\\a");
			else if (code == 37)  // %
				encoded.push("\\p");
			else
				encoded.push(loc.substr(i, 1));
		}
		return encoded.join("");
	}
	
		function split(u, k, v)
	{
		var v1 = 0;
		var v2 = 0;
		var i = u.indexOf(k);
		if (i != -1) {
			var v12 = u.substr(i + k.length + 1).replace(/[^ \.0-9].*/, "").split(".");
			v1 = parseInt(v12[0]);
			v2 = parseInt(v12[1]);
			if (isNaN(v1)) {
				v1 = 0;
				v2 = 0;
			}
			if (isNaN(v2))
				v2 = 0;
		}

		var b1 = -1;
		var b2 = -1;
		var r = "OTHER";
		for (var c12 in v) {
			c1 = parseInt(c12.split("_")[1]);
			c2 = parseInt(c12.split("_")[2]);
			if (((c1 < v1) || ((c1 == v1) && (c2 <= v2))) &&
				((c1 > b1) || ((c1 == b1) && (c2 > b2)))) {
				b1 = c1;
				b2 = c2;
				r = v[c12];
			}
		}

		return r;
	}

	function browser()
	{
		// See http://unixpapa.com/js/gecko.html
		var u = nav.userAgent || "";
		var v = nav.vendor || "";
		if (u.indexOf("AOL") != -1)
			return "AOL";
		if (u.indexOf("OmniWeb") != -1)
			return "OTHER";
		if (u.indexOf("Chrome") != -1)
			return "CH0";
		if (v.indexOf("Apple") != -1)
			return "SAFARI";
		if (window.opera)
			return "OPERA";
		if (v.indexOf("iCab") != -1)
			return "OTHER";
		if (v.indexOf("Konqueror") != -1)
			return "OTHER";
		if (u.indexOf("Firefox") != -1)
			return split(u, "Firefox", {_3_0:"FF30",_2_0:(u.indexOf("Navigator/9") == -1)?"FF20":"NN90",_1_5:"FF15",_1_0:"FF10",_0_0:"FF0"});
		if (u.indexOf("Firebird") != -1)
			return "FF0";
		if (v.indexOf("Camino") != -1)
			return "OTHER";
		if (u.indexOf("Netscape") != -1)
			return split(u, "Netscape", {_9_0:"NN90",_7_2:"NN72",_0_0:"NN0"});
		if (u.indexOf("MSIE") != -1)
			if (document.documentMode && (document.documentMode == 8))
				return "IE8"
			else
				return split(u, "MSIE", {_7_0:"IE7",_6_0:"IE6",_5_5:"IE55"});
		if (u.indexOf("Gecko") != -1)
			return split(u, "rv", {_1_7:"MZ17",_0_0:"MZ0"});
		return "OTHER";
	}

	
	CM8UpgProfile =
		"BROWSER=" + browser() + "&" +
		"LOC=" + CM8GetLocation().substr(0,1000) + "&" +
		get_size() + "&" + 
		get_time() +
		"&ORD=" + String(Math.random()).slice(2);
})();


function CM8EncodeProfile(profile)
{
	var attrs = (profile || "").split("&");
	for (var i = 0; i < attrs.length; i++) {
		var index = attrs[i].indexOf("=");
		if (index == -1)
			index = attrs[i].length;
		var attr = attrs[i].substr(0, index);
		var value = attrs[i].substr(index + 1);
		if (attr) {
			if (attr.toLowerCase().indexOf("encoded:") == 0)
{
	attr = attr.substring(8);
}
else
{
	attr = encodeURIComponent(attr);
}
		}
		if (value) {
			if (value.toLowerCase().indexOf("encoded:") == 0)
{
	value = value.substring(8);
}
else
{
	value = encodeURIComponent(value);
}
			value = value.replace(/%2C/g, ",");
		}
		attrs[i] = attr + ((index < attrs[i].length) ? "=" : "") + value;
	}
	return ((attrs.length>0)?"&":"")+attrs.join("&");
}

CM8UpgProfile = CM8EncodeProfile(window.CM8Profile) + "&" + CM8UpgProfile;

if (CM8Cat.toLowerCase().indexOf("encoded:") == 0)
{
	CM8Cat = CM8Cat.substring(8);
}
else
{
	CM8Cat = encodeURIComponent(CM8Cat);
}

if (typeof(decodeURIComponent) == "undefined")
	window.decodeURIComponent = function(str) {
		function checkcode() { 
			var d1, d2; 
			d1 = str.charAt(i++); 
			d2 = str.charAt(i++); 
			if (isNaN(parseInt(d1, 16)) || isNaN(parseInt(d2, 16)))
				return null;
			return parseInt(d1 + d2, 16); 
		} 
		function checkutf8() { 
			var c = str.charCodeAt(i++); 
			if (c == 37) {
				if ((c = checkcode()) == null) return null; 
			} 
			if ((c >> 6) != 2)
				return null;
			return c;
		} 
		var out, i, len; 
		var c, c2, c3; 
  
		out = []; 
		len = str.length; 
		i = 0; 
		while(i < len) { 
			c = str.charCodeAt(i++); 
			if (c == 37) { 
				if ((c = checkcode()) == null) return ""; 
			} 
			else { 
				out[out.length] = String.fromCharCode(c); 
				continue; 
			} 
			switch(c >> 4) { 
				case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: { 
					// 0xxxxxxx 
					out[out.length] = String.fromCharCode(c); 
					break; 
				} 
				case 12: case 13: { 
					// 110x xxxx   10xx xxxx 
					if ((c2 = checkutf8()) == null) return ""; 
					out[out.length] = String.fromCharCode(((c & 0x1F) << 6) | (c2 & 0x3F)); 
					break; 
				} 
				case 14: { 
					// 1110 xxxx  10xx xxxx  10xx xxxx 
					if ((c2 = checkutf8()) == null) return ""; 
					if ((c3 = checkutf8()) == null) return ""; 
					out[out.length] = String.fromCharCode(((c & 0x0F) << 12) | 
						((c2 & 0x3F) << 6) | ((c3 & 0x3F) << 0)); 
					break; 
				} 
				default: { 
					return ""; 
				} 
			} 
		} 
		return out.join(''); 
	};


if ((typeof(CM8RichMedia) != "undefined") &&
    ((CM8RichMedia.toString().toLowerCase() == "no") ||
	 (CM8RichMedia.toString().toLowerCase() == "false")))
	CM8RichMedia = "";
else
	CM8RichMedia = "r";

var CM8ShowAd = function(F, I)
{
	if (F.toLowerCase().indexOf("encoded:") == 0)
{
	F = F.substring(8);
}
else
{
	F = encodeURIComponent(F);
}
	F = decodeURIComponent(F);
	if (document.getElementById('CM8_FORMAT_' + F) == null)
		document.write('<DIV ID="CM8_FORMAT_' + F + '" STYLE="display:none"></DIV>');
	if (typeof(CM8MultiShow) != "undefined")
		CM8MultiShow(F, I);
};

if (! window.CM8InternalFSF) {
	window.CM8InternalFSF = true;
	document.write("<SCR" + "IPT LANGUAGE='JAVASCRIPT' SRC='" +
		((document.location.protocol=="https:")?"https:":"http:") +
		"//" + CM8Server + "/adam/detect?" +
		"req=f" + CM8RichMedia +
		"&cat=" + CM8Cat + "&" + CM8UpgProfile +
		"'></SCR" + "IPT>");
}
