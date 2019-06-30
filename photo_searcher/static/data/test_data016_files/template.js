var quick_search_cnt = 0;

function quick_search_chk(){
	if(quick_search_cnt == 0) {
		quick_search_cnt = 1;
		document.quick_search.submit();
	}
}

rollovers=function(off,on){
	img=document.getElementsByTagName("img");
	p=[];
	var off_reg=new RegExp(off+"(\.[a-z]+$)","i");
	var on_reg=new RegExp(on+"(\.[a-z]+$)","i");
		for(var x=0,i;i=img[x];x++){
			if(i.src.match(off_reg)){
			p[x]=new Image();
			p[x].src=i.src.replace(off_reg,on+"$1");
			i.bs = i.src;
			i.active = false;
			i.hs = i.src.replace(off_reg,on+"$1");
			i.onmouseover=function(){
				if( this.src.match(off_reg) ){ this.src=this.src.replace(off_reg,on+"$1"); };
			};
			i.onmouseout=function(){
				if(!this.active && this.src.match(on_reg) ){ this.src=this.src.replace(on_reg,off+"$1"); };
			};
		};
	};
};

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\\\s)" + className + "(\\\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){ returnElements.push(current); }
	}
	return returnElements;
}

window.onload = function(){
  rollovers( "_o" , "_h" );
  /*
  var lists_biz = [ getElementsByClassName('net'), getElementsByClassName('keiei'), getElementsByClassName('enterprise'), getElementsByClassName('creative') ];
  var lists_ent = [ getElementsByClassName('pc'), getElementsByClassName('keitai'), getElementsByClassName('kaden'), getElementsByClassName('hobby'), getElementsByClassName('entertainment'), getElementsByClassName('life') ];
  for(var i=0, list; list=lists_biz[i]; i++){
    if(list.length>1||!list.length){ continue; }
    list = list[list.length-1];
    list._class = list.className;
    list.onmouseover = function(){ this.className += " hover-biz"; }
    list.onmouseout = function(){ this.className = this._class; }
  }
  for(var i=0, list; list=lists_ent[i]; i++){
    if(list.length>1||!list.length){ continue; }
    list[0]._class = list[0].className;
    list[0].onmouseover = function(){ this.className += " hover-ent"; }
    list[0].onmouseout = function(){ this.className = this._class; }
  }
*/
  if( document.getElementById("tabChange") ){
    tab_contents = [ document.getElementById("todayRanking"), document.getElementById("weeklyRanking") ];
    triggers = [ document.getElementById("today").getElementsByTagName("A")[0], document.getElementById("weekly").getElementsByTagName("A")[0] ];
    triggers_img = [];
    for( var i=0; i<triggers.length; i++ ){
      triggers[i]._id = i;
      triggers[i].onclick = function(){ _switch(this._id); this.blur(); return false; };
      triggers_img[i] = triggers[i].getElementsByTagName("IMG")[0]
    };
    _switch = function(id){
      for( var i=0; i<triggers.length; i++ ){
        tab_contents[i].style.display = i==id ? "block" : "none";
        triggers_img[i].src = i==id ? triggers_img[i].hs : triggers_img[i].bs;
        triggers_img[i].active = i==id ? true : false;
      }
    }
    _switch(0);
  }

};


