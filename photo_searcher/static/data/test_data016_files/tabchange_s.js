window["canoBase"] = location.href.replace(/http:\/\/[^\/]+/,'');
if( $('link[rel="canonical"]').length == 1 ){
	window["canoBase"] = $('link[rel="canonical"]').attr('href').replace(/http:\/\/[^\/]+/,'');
}

function getParam(param) {
	var q = document.location.search || document.location.hash;
	if (param == null) { return q; }
	if(q) {
		var pairs = q.substring(1).split("&");
		for (var i=0; i < pairs.length; i++) {
			if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
				return pairs[i].substring((pairs[i].indexOf("=")+1));
			}
		}
	}
	return "";
}

/*--setup--*/

function setuptab() {
tab.setup = {
   //tabs: document.getElementById('tabwidget1').getElementsByTagName('li'),
   tabs: $(".tabwidget:eq(0)")[0].getElementsByTagName('li'),
   pages: []
}

for(var i=0; i<$(".tabdiv").length; i++){
  tab.setup.pages.push($(".tabdiv")[i]);
}

tab.init();
}

function addListenerTab(elem, eventType, func, cap) {
  try{
    if(elem.addEventListener) {
        elem.addEventListener(eventType, func, cap);
    } else if(elem.attachEvent) {
            elem.attachEvent('on' + eventType, func);
    } else {
            alert('ご利用のブラウザーはサポートされていません。');
            return false;
    }
  }catch(e){
    ;
  }
}

setTimeout(function(){

setuptab();

if(getParam("tabid") == ""){
  $(".tabdiv:eq(0)").css('display','block');
  $(".tabimg:eq(0)").attr('src','/images/tab_article.gif');
}

$(".tabimg:eq(0)").mouseover(function(ev){
  $(".tabimg:eq(0)").attr('src','/images/tab_article.gif');
});

$(".tabimg:eq(1)").mouseover(function(ev){
  $(".tabimg:eq(1)").attr('src','/images/tab_prod.gif');
});


$(".tabimg:eq(2)").mouseover(function(ev){
  $(".tabimg:eq(2)").attr('src','/images/tab_gourmet.gif');
});


$(".tabimg:eq(0)").mouseout(function(ev){
  if($(".tabimg:eq(0)").attr('stat') != 'selected'){
    $(".tabimg:eq(0)").attr('src','/images/tab_h_article.gif');
  }
});

$(".tabimg:eq(1)").mouseout(function(ev){
  if($(".tabimg:eq(1)").attr('stat') != 'selected'){
    $(".tabimg:eq(1)").attr('src','/images/tab_h_prod.gif');
  }
});


$(".tabimg:eq(2)").mouseout(function(ev){
  if($(".tabimg:eq(2)").attr('stat') != 'selected'){
    $(".tabimg:eq(2)").attr('src','/images/tab_h_gourmet.gif');
  }
});
},500);
/*--setup end--*/

var tab = {
   init: function(){
      var tabs = this.setup.tabs;
      var pages = this.setup.pages;
      
      for(i=0; i<pages.length; i++) {
         if(i !== 0) pages[i].style.display = 'none';
         tabs[i].onclick = function(){ tab.showpage(this); return false; };
      }

      if(getParam("tabid") != ""){
        tab.showpage(tabs[getParam("tabid")-0]);
      }
   },
   
   showpage: function(obj){
      var tabs = this.setup.tabs;
      var pages = this.setup.pages;
      var num;
      
      if(obj != undefined){
        for(num=0; num<tabs.length; num++) {
          if(tabs[num] === obj) break;
        }
      }else{
        if(getParam("tabid") == ""){
	  num = 0;
	}else{
	  num = getParam("tabid")-0;
	}
      }

      for(var i=0; i<pages.length; i++) {
         if(i == num) {
            pages[num].style.display = 'block';
            tabs[num].className = 'ui-tabs-selected';
	    if(num!=0)$(".tabimg:eq(0)").attr('src','/images/tab_h_article.gif');
	    if(num==0)$(".tabimg:eq(0)").attr('src','/images/tab_article.gif');
	    if(num!=1)$(".tabimg:eq(1)").attr('src','/images/tab_h_prod.gif');
	    if(num==1)$(".tabimg:eq(1)").attr('src','/images/tab_prod.gif');
	    if(num!=2)$(".tabimg:eq(2)").attr('src','/images/tab_h_gourmet.gif');
	    if(num==2)$(".tabimg:eq(2)").attr('src','/images/tab_gourmet.gif');
	    
	    $('.tabimg:not(:eq(' + num + '))').attr('stat','noselect');
	    $('.tabimg:eq(' + num + ')').attr('stat','selected');
         }
         else{
            pages[i].style.display = 'none';
            tabs[i].className = null;
         }
      }
   }
}

$('.textb').val(UnescapeSJIS(getParam("q")));
