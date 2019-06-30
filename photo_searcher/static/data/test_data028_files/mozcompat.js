
function RegisterNamespaces(){for(var i=0;i<arguments.length;i++){var splitNS=arguments[i].split(".");var root=window;for(var j=0;j<splitNS.length;j++){var s=splitNS[j];if(!root[s]){root[s]=function(){};}
root=root[s];}
if(!root._Private){root._Private=function(){};root.Error=function(){};}}}
RegisterNamespaces("Msn.Browser","Msn.Debug.Performance");Msn.Browser.IsMozilla=function(){return(typeof document.implementation!='undefined')&&(typeof document.implementation.createDocument!='undefined')&&(typeof HTMLDocument!='undefined');};Msn.Browser.AttachMozillaCompatibility=function(w){function EstablishMode(){var el=w.document.getElementsByName("msn-moz-custom");if(el.length>0){Msn.Browser.MozillaCompatMode=el[0].getAttribute("content").toLowerCase()=="enabled";}
else{Msn.Browser.MozillaCompatMode=false;}}
EstablishMode();function GenWindowEvent(e){window.event=e;}
function Map(el,mozillaType,callback){mozillaType=mozillaType.slice(2);if(mozillaType!="mouseenter"&&mozillaType!="mouseleave"){el.addEventListener(mozillaType,GenWindowEvent,true);}
else{el.addEventListener("mouseover",GenWindowEvent,true);el.addEventListener("mouseout",GenWindowEvent,true);el.addEventListener("mouseover",CheckEnter,false);el.addEventListener("mouseout",CheckLeave,false);}
el.addEventListener(mozillaType,callback,false);}
function CheckEnter(){if(!this.contains(event.fromElement)){event.initEvent("mouseenter",false,false);this.dispatchEvent(event);}}
function CheckLeave(){if(!this.contains(event.toElement)){event.initEvent("mouseleave",false,false);this.dispatchEvent(event);}}
function RemoveMap(el,mozillaType,callback){el.removeEventListener(mozillaType.slice(2),callback,false);}
function GetNonTextNode(n){try{while(n&&n.nodeType!=1){n=n.parentNode;}}
catch(ex){n=null;}
return n;}
w.attachEvent=w.HTMLDocument.prototype.attachEvent=w.HTMLElement.prototype.attachEvent=function(type,callback){Map(this,type,callback);};w.detachEvent=w.HTMLDocument.prototype.detachEvent=w.HTMLElement.prototype.detachEvent=function(type,callback){RemoveMap(this,type,callback);};w.HTMLElement.prototype.__defineGetter__("parentElement",function(){return GetNonTextNode(this.parentNode);});w.HTMLElement.prototype.__defineGetter__("innerText",function(){return this.textContent;});w.HTMLElement.prototype.__defineSetter__("innerText",function(v){var n=document.createTextNode(v);this.innerHTML="";this.appendChild(n);});w.Event.prototype.__defineGetter__("srcElement",function(){var n=GetNonTextNode(this.target);return n;});w.Event.prototype.__defineSetter__("cancelBubble",function(v){if(v){this.stopPropagation();}});function QuickLoc(el){var c={x:0,y:0};while(el){c.x+=el.offsetLeft;c.y+=el.offsetTop;el=el.offsetParent;}
return c;}
w.Event.prototype.__defineGetter__("offsetX",function(){return window.pageXOffset+this.clientX-QuickLoc(this.srcElement).x;});w.Event.prototype.__defineGetter__("offsetY",function(){return window.pageYOffset+this.clientY-QuickLoc(this.srcElement).y;});w.Event.prototype.__defineSetter__("returnValue",function(v){if(!v){this.preventDefault();}this.cancelDefault=v;return v;});w.Event.prototype.__defineGetter__("returnValue",function(){return this.cancelDefault;});w.Event.prototype.__defineGetter__("fromElement",function(){var n;if(this.type=="mouseover"){n=this.relatedTarget;}
else if(this.type=="mouseout"){n=this.target;}
return GetNonTextNode(n);});w.Event.prototype.__defineGetter__("toElement",function(){var n;if(this.type=="mouseout"){n=this.relatedTarget;}
else if(this.type=="mouseover"){n=this.target;}
return GetNonTextNode(n);});w.Event.prototype.__defineGetter__("button",function(){return(this.which==1)?1:(this.which==2)?4:2;});};if(Msn.Browser.IsMozilla()){Msn.Browser.AttachMozillaCompatibility(self);}