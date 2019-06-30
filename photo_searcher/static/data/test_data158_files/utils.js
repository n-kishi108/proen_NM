function delete_confirm(message){
  if(window.confirm(message || "削除しますか？")){
         return true;
  }else{
         return false;
  }
}


var LDUserAttrClient = function () {
    this.attr = {};
    this.loadAttr();
};
LDUserAttrClient.prototype = {
    loadAttr : function () {
	var cookie = document.cookie;
	var entries = cookie.split(/\s*;\s*/);
	for (var i = 0; i < entries.length; i++) {
            var entry = entries[i].split("=", 2);
            if(entry[0] == ".LUAC"){
		var attrs = entry[1].split("_", 3);
		this.attr["sex"] = attrs[0];
		this.attr["age"] = attrs[1];
		this.attr["pref"] = attrs[2];
		break;
            }
	}
    }
}




