var _amzn_popup={vertical_offset:"-3px",horizontal_offset:"-3px",start_delay:500,end_delay:500,clientX:0,clientY:0,onshow_callback:null,onhide_callback:null,eventObject:null,init_done:false,paramsForLogging:null,doNothing:null,init:function(){
if(!this.init_done){
var _1=document.createElement("div");
_1.id="amzn_popup_div";
document.body.appendChild(_1);
_1.onmouseover=function(){
if(_amzn_popup){
return _amzn_popup._continue();
}
};
_1.onmouseout=function(){
if(_amzn_popup){
return _amzn_popup._stop();
}
};
this.init_done=true;
}
},showpreview:function(_2,_3,_4,_5,_6,_7,_8,_9,_a){
if(typeof _6=="undefined"){
_6=null;
}
if(typeof _7=="undefined"){
_7=null;
}
if(typeof _8=="undefined"){
_8=null;
}
if(!_6&&!_7&&!_8){
this.paramsForLogging=null;
}else{
this.paramsForLogging=new Object();
this.paramsForLogging.tag=_6;
this.paramsForLogging.linkCode=_7;
this.paramsForLogging.creativeId=_8;
this.paramsForLogging.marketPlace=_9;
this.paramsForLogging.asin=_a;
}
if(!this.init_done){
return;
}
if(this.eventObject==_3){
this._clear_tip();
return;
}
var _b=this.getMouseX_Y(_4);
this.clientX=_b[0];
this.clientY=_b[1];
var _c=this.end_delay;
if(typeof _5!="undefined"||_5==null){
_c=_5;
}
this.show(unescape(_2),_3,_4,_c);
},show:function(_d,_e,e,_10){
if(!this.init_done){
return;
}
if(window.event){
event.cancelBubble=true;
}else{
if(e.stopPropagation){
e.stopPropagation();
}
}
if(typeof _10=="undefined"){
_10=this.end_delay;
}
this._do_hide();
var _11=document.getElementById("amzn_popup_div");
_11.innerHTML=_d;
if((e.type=="click"&&_11.style.visibility=="hidden")||e.type=="mouseover"){
var _12=this;
this._show_handler=setTimeout(function(){
_12._do_show();
},_10);
}else{
if(e.type=="click"){
_11.style.visibility="hidden";
}
}
_11.x=this._get_pos_offset(_e,true);
_11.y=this._get_pos_offset(_e,false);
var pos=this._clear_browser_edge(_e);
_11.style.left=pos[0]+"px";
_11.style.top=pos[1]+"px";
this.eventObject=_e;
return true;
},hide:function(obj){
if(!this.init_done){
return;
}
this._must_hide=true;
var _15=this;
var _16=false;
if(obj&&this.eventObject!=obj){
_16=true;
}
if(this._am_visible&&!_16){
this._clear_tip();
this._hide_handler=setTimeout(function(){
_15._do_hide();
},this.start_delay);
}else{
this._do_hide();
}
return true;
},hideNow:function(){
if(!this.init_done){
return;
}
this._must_hide=true;
var _17=this;
this._hide_handler=setTimeout(function(){
_17._do_hide();
},0);
return true;
},_show_handler:null,_hide_handler:null,_must_hide:true,_am_visible:false,_clear_tip:function(){
if(typeof this._hide_handler!="undefined"||this._hide_handler!==null){
clearTimeout(this._hide_handler);
delete (this._hide_handler);
}
if(typeof this._show_handler!="undefined"||this._show_handler!==null){
clearTimeout(this._show_handler);
delete (this._show_handler);
}
},_get_pos_offset:function(_18,_19){
var _1a=(_19)?_18.offsetLeft:_18.offsetTop;
var _1b=_18.offsetParent;
while(_1b!==null){
_1a=(_19)?_1a+_1b.offsetLeft:_1a+_1b.offsetTop;
_1b=_1b.offsetParent;
}
return _1a;
},_clear_browser_edge:function(obj){
var _1d=document.getElementById("amzn_popup_div");
var _1e=parseInt(this.horizontal_offset,10)*-1;
var _1f=document.all&&!window.opera;
var _20,_21,_22,_23;
if(_1f){
var _24=this.ie_body();
}
_20=_1f?_24.scrollLeft+_24.clientWidth-15:window.pageXOffset+window.innerWidth-15;
_21=_1d.offsetWidth;
var _25=document.getElementById("preview_eys_div");
if(_20-_1d.x<_21){
_1e=_21-obj.offsetWidth;
}
if(_25&&_25!=null){
_1e-=_25.scrollLeft;
}
if(_25&&_25!=null){
_1e-=_25.scrollTop;
}
var _26=_1d.x%_20;
if(_26-_1e+_21>_20){
_1e=_26-(_20-_21-10);
}
_22=_1d.x-_1e;
_1e=parseInt(this.vertical_offset,10)*-1-obj.offsetHeight;
_20=_1f?_24.scrollTop+_24.clientHeight-15:window.pageYOffset+window.innerHeight-18;
_21=_1d.offsetHeight;
var _27=false;
if((_20-_1d.y<_21)||(this.clientY+_21>_20)){
_1e=_21+5;
_27=true;
}
_23=_1d.y-_1e;
if(this.clientX&&this.clientY){
if(!_27&&this.clientY>=_23){
_23=this.clientY+obj.offsetHeight*2/3;
}
}
return [_22,_23];
},getMouseX_Y:function(e){
var x=0;
var y=0;
if(!e){
var e=window.event;
}
if(e.pageX||e.pageY){
x=e.pageX;
y=e.pageY;
}else{
if(e.clientX||e.clientY){
x=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
y=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
}
}
return [x,y];
},ie_body:function(){
return (document.compatMode&&document.compatMode!="BackCompat")?document.documentElement:document.body;
},_do_show:function(){
document.getElementById("amzn_popup_div").style.visibility="visible";
this._am_visible=true;
if(this.paramsForLogging!=null){
_amzn_utils.recordPopover(this.paramsForLogging.tag,this.paramsForLogging.linkCode,this.paramsForLogging.creativeId,this.paramsForLogging.marketPlace,this.paramsForLogging.asin);
}
if(this.onshow_callback!=null&&typeof this.onshow_callback=="function"){
this.onshow_callback();
}
},_do_hide:function(){
if(this._must_hide){
document.getElementById("amzn_popup_div").style.visibility="hidden";
if(this.onhide_callback!=null&&typeof this.onhide_callback=="function"&&this._am_visible){
this.onhide_callback();
}
this._am_visible=false;
this.eventObject=null;
}
this._clear_tip();
},_continue:function(){
this._must_hide=false;
},_stop:function(){
this._must_hide=true;
this.hide();
}};

