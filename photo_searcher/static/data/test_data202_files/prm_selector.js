
var PrmSelector = function (datapath, elm) {
	this.initialize.apply(this, arguments);
}

PrmSelector.prototype = {
	_target_elm:null,
	
	initialize:function(datapath, idname) {
		this._target_elm = document.getElementById(idname);
		var scope=this;
		this.set(window,"load",function(){scope.jsonLoad(datapath)},false);
	},
	jsonLoad:function(datapath) {
		if (window.location.protocol == "https:") {
			datapath = datapath.replace("http:","https:");
		}
		datapath += "?rn=" + Math.floor(Math.random() * 1000000);

		var scriptElm = document.createElement("script");
		scriptElm.setAttribute("charset", "EUC-JP");
		scriptElm.setAttribute("type", "text/javascript");
		scriptElm.setAttribute("src", datapath);
		document.getElementsByTagName("head")[0].appendChild(scriptElm);
	},
	jsonCallback:function(jsonData) {
		var val;
		var ary = jsonData.data;
		if(typeof s=="object" && s.prop50) {
			val = s.prop50;
		} else {
			val = "grp";
		}
		var num = Math.floor(Math.random() * jsonData.data.length);
		var eff = ary[num].eff;
		if (eff != ""){
			var tag = '<a href="' + ary[num].url + '" onclick="s.un=\'rakutenglobalprod\';s.dynamicAccountSelection=false;s.linkTrackVars=\'eVar45,eVar48,prop50\';s.prop50=\'' + ary[num].stLink + '\';s.eVar45=s.eVar48=\'wi_' + val + '_hdr_' + ary[num].eff + '\';s.tl(this,\'o\',\'gclick\')">' + ary[num].text + '</a>';
		} else {
			var tag = '<a href="' + ary[num].url + '" onclick="s.un=\'rakutenglobalprod\';s.dynamicAccountSelection=false;s.linkTrackVars=\'eVar45,eVar48,prop50\';s.prop50=\'' + ary[num].stLink + '\';s.eVar45=s.eVar48=\'wi_' + val + '_hdr\';s.tl(this,\'o\',\'gclick\')">' + ary[num].text + '</a>';	
		}
		this._target_elm.innerHTML = tag;
	},
	set:function(elm,evt,func,cap){
		if(elm.addEventListener){
			elm.addEventListener(evt,func,cap);
		} else if(elm.attachEvent){
			elm.attachEvent('on'+evt,func);
		} else{
			return false;
		}
	}
}



