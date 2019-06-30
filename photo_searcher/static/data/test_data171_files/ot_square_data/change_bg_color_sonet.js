function changeBgColor (className,bg,bg_reverse) {
  var ele = YAHOO.util.Dom.getElementsByClassName(className);
  if(bg_reverse == ''){ 
      if(bg == 'ffffff'){bg_reverse =  'fff7d7';}
      else if(bg == '000000'){bg_reverse =  '4d4d4d';}
      else {bg_reverse = bg }
  }
  for(var i=0;i < ele.length;i++){
    YAHOO.util.Event.on(ele[i], 'mouseover', function () {this.style.backgroundColor  = '#'+ bg_reverse });
    YAHOO.util.Event.on(ele[i], 'mouseout',  function () {this.style.backgroundColor  = '#'+ bg });
  }
}
