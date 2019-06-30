window.onload = function(){
window.navi_tagName = "img";
window.navi_array = new Array();

function navi(obj){
this.image = obj;
this.image.n1 = new Image();
this.image.n1.src = obj.src;
this.image.n0 = new Image();
this.image.n0.src = obj.src.replace("_n1","_n0");
this.image.onmouseover = function(){ if(this.n0) this.src = this.n0.src; }
this.image.onmouseout = function(){ this.src = this.n1.src; }
}

var tmp = document.getElementsByTagName(navi_tagName);
for(var i=0 ; i<tmp.length ; i++){
if(!tmp[i].src || !tmp[i].src.match(/.*_n1\.[a-zA-Z0-9]+/)) continue;

navi_array[navi_array.length] = new navi(tmp[i]);
}
} 

