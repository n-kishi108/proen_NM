// min start
/*@cc_on
@if (@_win32 && @_jscript_version>4)
var __minwindoww = 960;

if(document.getElementById('minscript') && document.getElementById('minscript').getAttribute('src').split('#')[1] ){
	var value=document.getElementById('minscript').getAttribute('src').split('#')[1] ;
	if(!value.match(/[^0-9]/)){
		__minwindoww = new Number(value).valueOf();
	}
}

function getBrowserWidth(){
		if (window.innerWidth){
			return window.innerWidth;}	
		else if (document.documentElement && document.documentElement.clientWidth != 0){
			return document.documentElement.clientWidth;	}
		else if (document.body){return document.body.clientWidth;}		
			return 0;
}

function stopWidth(){
	var MinWidth = getBrowserWidth();
	if (MinWidth <= __minwindoww){
		document.all.WrappingLiquid.style.width=__minwindoww + "px";
	}
	if (MinWidth > __minwindoww){
		document.all.WrappingLiquid.style.width="auto";
	}
}

function addEvent( obj, type, fn ){ 
	  if (obj.addEventListener){ 
      obj.addEventListener( type, fn, false );
   }
   else if (obj.attachEvent){ 
      obj["e"+type+fn] = fn; 
      obj[type+fn] = function(){ obj["e"+type+fn]( window.event ); } 
      obj.attachEvent( "on"+type, obj[type+fn] ); 
   } 
} 

addEvent(window, 'resize', stopWidth);
addEvent(window, 'load', stopWidth);

@end @*/

