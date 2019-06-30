function wdoc(url){
	document.write('<scr'+'ipt src="' + url + '"></scr' + 'ipt>');
}

function wasyn(url,id){
	var ele = document.createElement("script");
	ele.type = "text/javascript";
	ele.src = url;
	$(id)[0].appendChild(ele);
}

google.load("jquery", "1");
wdoc("/js/compressed-jplugin.js");

var eosCallback = function(values) {
  eval(values.funcHT);
  eval(values.funcMwin);
}
Heredoc.load("/include/common/eos-header.txt", eosCallback);

