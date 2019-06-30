// core 
Function.prototype.addMethod=function(name,func)
{if(!this.prototype[name])
{this.prototype[name]=func;}
return this;};Function.addMethod("as",function(ns,isSingleton)
{var chain=(ns?ns.split('.'):[]);if(chain.length>0)
{var base=window;for(var ndx=0;ndx<chain.length-1;++ndx)
{var token=chain[ndx];if(token)
{if(!base[token])
{base[token]={};}
base=base[token];}}
base[chain.last()]=(isSingleton?new this():this);}
return this;});Function.addMethod("ns",function(ns)
{this.as(ns,1);});String.addMethod("trim",function()
{return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1");});String.addMethod("collapse",function()
{return this.replace(/\s+/g,' ').trim();});String.addMethod("wrap",function(delim){
var close, delims = {"(":")","{":"}","[":"]","<":">","":"","":"","":"","":""};
  if ( delims[delim] )
  {
    close = delims[delim];
  }
else
{var m=(/^<(\w+)(\s+\w+\s*=\s*"[^"]*")*\s*>$/).exec(delim);if(m)
{close="</"+m[1]+">";}}
return delim+this+(close?close:delim);});String.addMethod("format",function()
{var fmt=this;for(var ndx=0;ndx<arguments.length;++ndx)
{fmt=fmt.replace(new RegExp('\\{'+ndx+'\\}',"g"),arguments[ndx]);}
return fmt;});Array.addMethod("last",function()
{return(this.length>0?this[this.length-1]:void(0));});Array.addMethod("remove",function(obj)
{for(var ndx=this.length-1;ndx>=0;--ndx)
{if(this[ndx]===obj)
{this.splice(ndx,1);}}
return this;});Array.addMethod("contains",function(obj)
{for(var ndx=0;ndx<this.length;++ndx)
{if(this[ndx]===obj)
{return 1;}}
return 0;});Array.addMethod("push",function(obj)
{this[this.length]=obj;return this.length;});Array.addMethod("shift",function()
{return this.splice(0,1)[0];});Array.addMethod("splice",function(start,delCount)
{var delta;var addCount=arguments.length-2;if(start>this.length)
{start=this.length;}
if(start+delCount>this.length)
{delCount=this.length-start;}
var deleted=[];for(var ndx=0;ndx<delCount;++ndx)
{deleted.push(this[start+ndx]);}
if(addCount>delCount)
{delta=addCount-delCount;for(ndx=this.length+delta-1;ndx>=start+delta;--ndx)
{this[ndx]=this[ndx-delta];}}
else if(addCount<delCount)
{delta=delCount-addCount;for(ndx=start+addCount;ndx<this.length-delta;++ndx)
{this[ndx]=this[ndx+delta];}
for(;ndx<this.length-1;++ndx)
{delete this[ndx];}
this.length-=delta;}
for(ndx=0;ndx<addCount;++ndx)
{this[start+ndx]=arguments[2+ndx];}
return deleted;});(function()
{var dom=this;Function.addMethod("hook",function(element,eventName)
{if(element)
{var isSafari=checkSafari();if(!isSafari&&element.addEventListener)
{element.addEventListener(eventName,this,false);}
else if(!isSafari&&element.attachEvent)
{element.attachEvent('on'+eventName,this);}
else
{var handlers=element["x"+eventName];if(handlers&&handlers.constructor==Array)
{if(handlers.contains(this))
{handlers=null;}
else
{handlers.push(this);}}
else
{handlers=element["x"+eventName]=[this];}
if(handlers)
{element['on'+eventName]=function(ev)
{var returnValue=true;ev=dom.Event(ev);for(var ndx=0;ndx<handlers.length;++ndx)
{var handlerReturn=handlers[ndx](ev);if(typeof handlerReturn!="undefined"&&!handlerReturn)
{returnValue=false;}}
return returnValue;};element=null;}}}
return this;});Function.addMethod("unhook",function(element,eventName)
{if(element)
{var isSafari=checkSafari();if(!isSafari&&element.removeEventListener)
{element.removeEventListener(eventName,this,false);}
else if(!isSafari&&element.detachEvent)
{element.detachEvent('on'+eventName,this);}
else
{var arr=element["x"+eventName];if(arr&&arr.constructor==Array)
{arr.remove(this);}
else
{element["on"+eventName]=null;}}}
return this;});dom.CancelEvent=function(ev)
{ev=dom.Event(ev);if(ev)
{ev.cancelBubble=true;if(ev.stopPropagation)
{ev.stopPropagation();}
ev.returnValue=false;if(ev.preventDefault)
{ev.preventDefault();}}
return false;};dom.Event=function(ev)
{return(ev?ev:window.event);};dom.Target=function(ev)
{ev=dom.Event(ev);var target=(ev.target?ev.target:ev.srcElement);if(target&&target.nodeType!=1)
{target=dom.ParentElem(target);}
return target;};dom.InnerText=function(el)
{var text='';for(var ndx=0;ndx<el.childNodes.length;ndx++)
{var child=el.childNodes[ndx];if(child.nodeType==1)
{text+=dom.InnerText(child);}
else if(child.nodeType==3)
{text+=child.data;}}
return text;};dom.NextElem=function(element,tagName)
{var nextElement=element.nextSibling;while(nextElement&&(nextElement.nodeType!=1||(tagName&&nextElement.nodeName!=tagName)))
{nextElement=nextElement.nextSibling;}
return nextElement;};dom.PrevElem=function(element,tagName)
{var prevElement=element.previousSibling;while(prevElement&&(prevElement.nodeType!=1||(tagName&&prevElement.nodeName!=tagName)))
{prevElement=prevElement.previousSibling;}
return prevElement;};dom.ParentElem=function(element,tagName)
{var parentNode=element.parentNode;while(parentNode&&(parentNode.nodeType!=1||(tagName&&parentNode.nodeName!=tagName)))
{parentNode=parentNode.parentNode;}
return parentNode;};dom.ChildElem=function(parentNode,tagName,immediate)
{var element=null,childNode;for(var ndx=0;!element&&ndx<parentNode.childNodes.length;++ndx)
{childNode=parentNode.childNodes[ndx];if(childNode.nodeType==1)
{if(!tagName||childNode.nodeName==tagName)
{element=childNode;}}}
if(!immediate)
{for(ndx=0;!element&&ndx<parentNode.childNodes.length;++ndx)
{childNode=parentNode.childNodes[ndx];if(childNode.nodeType==1)
{element=dom.ChildElem(childNode,tagName);}}}
return element;};dom.ForEach=function(func,parent,tagName)
{for(var ndx=0;ndx<parent.childNodes.length;++ndx)
{var child=parent.childNodes[ndx];if(child.nodeType==1&&(!tagName||child.nodeName==tagName))
{if(func(child))
{break;}}}};dom.ChildCount=function(element,nodeName)
{var count=0;var ndx,child;for(ndx=0;ndx<element.childNodes.length;++ndx)
{child=element.childNodes[ndx];count+=(child.nodeType==1&&(!nodeName||child.nodeName==nodeName)?1:0);}
return count;}
dom.AddClass=function(element,className)
{var originalValue=element.className;if(originalValue)
{var originalClasses=originalValue.collapse().split(' ');var newClasses=className.collapse().split(' ');for(var ndx=0;ndx<newClasses.length;++ndx)
{var newClass=newClasses[ndx];if(!originalClasses.contains(newClass))
{element.className+=' '+newClass;}}}
else
{element.className=className;}
return element.className;};dom.DelClass=function(element,className)
{var originalValue=element.className;if(originalValue)
{var classes=originalValue.collapse().split(' ');var oldClasses=className.collapse().split(' ');for(var ndx=0;ndx<oldClasses.length;++ndx)
{classes.remove(oldClasses[ndx]);}
var newValue=classes.join(' ');if(newValue!=originalValue)
{element.className=newValue;}}
return element.className;};dom.HasClass=function(element,className)
{return element.className.collapse().split(' ').contains(className);};dom.Updated=function()
{if(dom.Access&&typeof dom.Access.Updated=='function')
{dom.Access.Updated();}};function checkSafari()
{return(navigator.userAgent.indexOf("Safari")>=0);}}).ns("Msn.DOM");(function()
{var bind=this;var allBindings=[];Function.addMethod("bindMSN",function(sel,args)
{var elements;switch(typeof sel)
{case'object':elements=(sel.nodeType==1||sel.nodeType==9)?[sel]:(sel.length?sel:null);break;case'string':elements=bind.Select(sel);break;}
if(elements)
{for(var ndx=0;ndx<elements.length;++ndx)
{var element=elements[ndx];var binding=new this(element,args);if(element.bindings)
{element.bindings.push(binding);}
else
{element.bindings=[binding];}
allBindings.push(binding);}}
return this;});bind.Unbind=function(element,recurse)
{var ndx;if(element.bindings&&element.bindings.length)
{for(ndx=0;ndx<element.bindings.length;++ndx)
{var binding=element.bindings[ndx];if(binding&&typeof binding.dispose=='function')
{binding.dispose();}
allBindings.remove(binding);}
element.bindings=null;}
if(recurse)
{for(ndx=0;ndx<element.childNodes.length;++ndx)
{var child=element.childNodes[ndx];if(child.nodeType==1)
{bind.Unbind(child,recurse);}}}};bind.Select=function(cssSelector)
{function getIdentifier()
{var identifier=null;if(cssSelector)
{if(cssSelector.charAt(pos)=='*')
{identifier='*';}
else
{while(pos<cssSelector.length)
{var ch=cssSelector.charAt(pos);if(('a'<=ch&&ch<='z')||('A'<=ch&&ch<='Z')||('0'<=ch&&ch<='9')||ch=='-')
{identifier=(identifier?identifier+ch:ch);++pos;}
else
{break;}}}}
return identifier;}
function skipSpace()
{while(pos<cssSelector.length&&cssSelector.charAt(pos)==' ')
{++pos;}}
function getCombinator()
{var combinator=null;skipSpace();switch(cssSelector.charAt(pos))
{case'+':case'>':combinator=cssSelector.charAt(pos);++pos;skipSpace();break;}
return combinator;}
function getHashOrClass()
{++pos;return getIdentifier();}
function getSimpleSelector()
{var selector=null;var element=getIdentifier();if(element!==null)
{selector=new SimpSelector(element);}
while(cssSelector&&pos<cssSelector.length)
{var ch=cssSelector.charAt(pos);if(ch=='#')
{if(!selector)
{selector=new SimpSelector();}
selector.setID(getHashOrClass());}
else if(ch=='.')
{if(!selector)
{selector=new SimpSelector();}
selector.addClass(getHashOrClass());}
else
{break;}}
return selector;}
function getSelectors()
{var selectors=[];var simpleSelector=getSimpleSelector();if(simpleSelector)
{selectors.push(simpleSelector);while(pos<cssSelector.length)
{var combinator=getCombinator();simpleSelector=getSimpleSelector();if(simpleSelector)
{if(combinator)
{simpleSelector.setComb(combinator);}
selectors.push(simpleSelector);}
else
{break;}}}
return selectors;}
function SimpSelector(element)
{var simp=this;var id='';var combinator=null;var classes=null;simp.setID=function(idValue)
{id=idValue;};simp.setComb=function(comb)
{combinator=comb;};simp.addClass=function(className)
{if(classes)
{classes.push(className);}
else
{classes=[className];}};simp.getNodes=function(parent)
{var ndx,node,nextElement,nodeList=[];if(id)
{switch(combinator)
{case'>':for(ndx=0;ndx<parent.childNodes.length;++ndx){if(parent.childNodes[ndx].nodeType==1&&parent.childNodes[ndx].id==id)
{node=parent.childNodes[ndx];break;}}
break;case'+':nextElement=getNextElement(parent);if(nextElement&&nextElement.id==id)
{node=nextElement;}
break;default:node=parent.getElementById(id);break;}
if(node&&(!element||element=='*'||element.toLowerCase()==node.nodeName.toLowerCase())&&checkClasses(node))
{nodeList.push(node);}}
else if(element&&element!='*')
{switch(combinator)
{case'>':for(ndx=0;ndx<parent.childNodes.length;++ndx)
{node=parent.childNodes[ndx];if(node.nodeType==1&&node.nodeName.toLowerCase()==element&&checkClasses(node))
{nodeList.push(node);}}
break;case'+':nextElement=getNextElement(parent);if(nextElement&&nextElement.nodeName.toLowerCase()==element&&checkClasses(nextElement))
{nodeList.push(nextElement);}
break;default:var elements=parent.getElementsByTagName(element);for(ndx=0;ndx<elements.length;++ndx)
{if(checkClasses(elements[ndx]))
{nodeList.push(elements[ndx]);}}
break;}}
else
{switch(combinator)
{case'>':for(ndx=0;ndx<parent.childNodes.length;++ndx)
{node=parent.childNodes[ndx];if(node.nodeType==1&&checkClasses(node))
{nodeList.push(node);}}
break;case'+':nextElement=getNextElement(parent);if(nextElement&&checkClasses(nextElement))
{nodeList.push(nextElement);}
break;default:checkNodeClasses(parent,nodeList);break;}}
return nodeList;};function checkNodeClasses(parent,nodes)
{for(var ndx=0;ndx<parent.childNodes.length;++ndx)
{var node=parent.childNodes[ndx];if(node.nodeType==1)
{if(checkClasses(node))
{nodes.push(node);}
checkNodeClasses(node,nodes);}}}
function checkClasses(element)
{var okay=1;if(classes)
{var className=element.className;if(className)
{var classNames=className.collapse().split(' ');for(var ndx=0;ndx<classes.length;++ndx)
{if(!classNames.contains(classes[ndx]))
{okay=0;break;}}}
else
{okay=0;}}
return okay;}}
function applySelector(elements,simpleSelector)
{var matchedElements=[];for(var ndx=0;ndx<elements.length;++ndx)
{matchedElements=matchedElements.concat(simpleSelector.getNodes(elements[ndx]));}
return matchedElements;}
var pos=0;var sels=getSelectors();var elements=[document];for(var ndx=0;ndx<sels.length&&elements.length>0;++ndx)
{elements=applySelector(elements,sels[ndx]);}
return elements;};function getNextElement(element)
{var nextElement=element.nextSibling;while(nextElement&&nextElement.nodeType!=1)
{nextElement=nextElement.nextSibling;}
return nextElement;}
(function()
{bind.Unbind(document,1);allBindings=[];}).hook(window,"unload");}).ns("Msn.Bind");(function(el,args)
{if(!args){args={};}
var dom=Msn.DOM;var d=document;var w=window;var elMoreDIV=d.getElementById("more");elMoreDIV.style.display="none";var elMoreUL=d.getElementById("xnav");var elMoreLI=d.createElement("li");elMoreLI.className="cssServicelist";var elMoreA=d.createElement("a");elMoreA.href="#";elMoreA.className="expand";elMoreA.innerHTML=argWithDefault(args.more,"more");elMoreLI.appendChild(elMoreA);elMoreUL.appendChild(elMoreLI);toggle.hook(elMoreA,"click");function toggle(ev)
{var state=elMoreDIV.style.display;var expand;if(state=="block")
{state="none";expand="expand";elMoreLI.className="cssServicelist";}
else
{state="block";expand="collapse";elMoreLI.className="last cssServicelist ";}
elMoreDIV.style.display=state;elMoreA.className=expand;ev=dom.Event(ev);return dom.CancelEvent(ev);}
this.dispose=function()
{el=null;elMoreDIV=null;elMoreUL=null;elMoreLI=null;elMoreA=null;};function argWithDefault(arg,def)
{return(typeof arg!="undefined"?arg:def)}}).as("Msn.Header");(function(el,args)
{if(!args){args={};}
var dom=Msn.DOM;var d=document;var w=window;var searchParam=argWithDefault(args.searchParam,"");var searchParams=argWithDefault(args.searchParams,"");var searchText=argWithDefault(args.searchSite,"");var searchUrl=argWithDefault(args.searchUrl,"");var searchWeb=argWithDefault(args.searchWeb,"");if(searchText!=="")
{var elSiteSearch=d.getElementById("sitesearch");var elSiteInput=d.createElement("input");elSiteInput.className="button";elSiteInput.id="site";elSiteInput.name="site";elSiteInput.type="submit";elSiteInput.value=searchText;elSiteSearch.appendChild(elSiteInput);var elWebInput=d.getElementById("web");elWebInput.value=searchWeb;doSiteSearch.hook(elSiteInput,"click");var elSearchText=d.getElementById("q");doEnter.hook(elSearchText,"keypress");}
function doEnter(ev)
{if(ev.keyCode==13)
{doSiteSearch(null);ev=dom.Event(ev);return dom.CancelEvent(ev);}}
function doSiteSearch(ev)
{if(ev!==null)
{if(dom.Target(ev).id!="site")
return;}
var term=encodeURIComponent(d.getElementById("q").value);var url=searchUrl+"?"+searchParam+"="+term;if(searchParams)
{url=url+"&"+searchParams.replace("&amp;","&");}
window.top.location.href=url;ev=dom.Event(ev);return dom.CancelEvent(ev);}
this.dispose=function()
{el=null;};function argWithDefault(arg,def)
{return(typeof arg!="undefined"?arg:def)}}).as("Msn.SiteSearch");


// report
if(!window.Msn){window.Msn={};}
Msn.Report=new function(){var me=this;var w=window;this.TrackEvent=function(cm,ce,hl,tgt,gt1){if(!gt1){gt1='';}
if(Msn.Linktracking){var cr={prop11:cm,prop13:ce,prop14:hl,prop16:gt1,prop15:w.s.pageName};Msn.Linktracking.TrackReport(tgt,cr);}
if(Msn.Gtracking){var tu=Msn.Gtracking.CreateReport2(tgt,cm,ce,hl,gt1);if(tu){Msn.Gtracking.TrackReport(tu);}}};this.TrackForm=function(frm){var cr,rd=true;if(Msn.Linktracking){cr=Msn.Linktracking.CreateReport(frm);if(cr){rd=Msn.Linktracking.TrackReport(frm.getAttribute("action"),cr);}}
if(Msn.Gtracking){var tu=Msn.Gtracking.CreateReport(frm);if(tu){rd=Msn.Gtracking.TrackReport(tu);}}
return rd;};return this;};


// gtrack
if(!window.Msn){window.Msn={};}
Msn.Gtracking=new function(){var elC=null;var my=this;var i=null;var d=document;var w=window;var dbg=false;var tb="http://g.msn.com/_0USHP/22";var dl=1000;var sd=500;var ex=["g.msn.com"];if(w.gTrackExclude){ex=w.gTrackExclude;}
if(w.gTrackDebug){dbg=(w.gTrackDebug!==false);}
var reUrl=/^(([^:\/?#]+)\:)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;var ub=null;var di='';var pi='';var ps='';var tp='';var dst=null;var tid=null;var tw=null;var nt="gt_no_oob";function stopAsync(){w.clearTimeout(tid);if(i){i.onerror=i.onload=null;i=null;}}
function track(){var a=getAnchor(event.srcElement);if(a&&a.id!=nt&&event.button!=2){stopAsync();tw=null;if(event.returnValue!==false){var tu=my.CreateReport(event.srcElement);if(tu){dst=a.href;tw=self;if(event.shiftKey||event.ctrlKey||((navigator.userAgent.indexOf("Firefox") > 0) && (event.button == 1))){tw=null;}
var sTarget=a.getAttribute("target");if(tw&&sTarget){while(tw&&sTarget!=tw.name){tw=(tw===tw.parent?null:tw.parent);}}
if(dbg){w.alert("Tracking: "+pu(tu));}
i=new Image();if(tw){Msn.DOM.CancelEvent(event);i.onload=iOL;i.onerror=iOE;tid=w.setTimeout(iTO,dl);}
i.src=tu;}}}}
function getAnchor(el){while(el&&el.tagName!="A"&&el.tagName!="AREA"){el=el.parentElement;}
return el;}
function iOL(){if(i&&this===i){doNav();}}
function iOE(){if(i&&this===i){doNav("Track Error");}}
function iTO(){doNav("Track Timeout");}
function doNav(msg){stopAsync();if(tw){if(dbg){w.alert((msg?msg+'\n':'')+"Navigate: "+pu(dst));}
else if(document.all){try{var a=tw.document.getElementById(nt);if(!a){a=tw.document.createElement("a");a.id=nt;tw.document.body.appendChild(a);}
else if(a.removeAttribute){a.removeAttribute("target");}
a.href=dst;a.click();}
catch(e){tw.location=dst;}}
else{tw.location=dst;}}}
this.CreateReport=function(el,cmp){var tu='';try{init();if(elC){var tn=null;var tgt=null;var hl=null;var gt1='';var cm='';var ce=-1;while(el){switch(el.tagName){case"A":case"AREA":if(!tn){tn=el;tgt=getDst(el.getAttribute("href"));if(!tgt){return'';}
if(!hl){hl=el.innerText;if(!hl){hl=el.getAttribute("alt");}}
gt1=getGT1(tgt);}
break;case"IMG":if(!hl){hl=el.getAttribute("alt");}
break;case"FORM":if(!tn){tn=el;tgt=getDst(el.getAttribute("action"));if(!tgt){break;}
hl="[form submission]";ce=1;}
break;}
if(el.id){if(tn&&ce<0){ce=getCe(el,tn);}
cm=">"+el.id+cm;}
el=el.parentElement;}
if(tgt){if(cm.length>0){cm=cm.substring(1);}
else{cm="body";if(ce<0){ce=getCe(d.body,tn);}}
if(cmp){cm=cm+'|'+cmp;}
tu=mb(tb)+"?"+tgt+"&&ps="+ps+"&pi="+pi+"&di="+di+"&gt1="+gt1+"&ce="+(ce>0?ce:0)+"&cm="+encodeURIComponent(cm)+"&hl="+encodeURIComponent(hl)+"&su="+tp;}}
else if(dbg){w.alert("No ctag on the page.");}}
catch(e){if(dbg){w.alert("Error: "+e.name+"\n"+e.message);}}
return tu;};this.CreateReport2=function(tgt,cm,ce,hl,gt1){var tu='';try{init();if(elC){if(tgt){tu=mb(tb)+"?"+tgt+"&&ps="+ps+"&pi="+pi+"&di="+di+"&gt1="+gt1+"&ce="+(ce>0?ce:0)+"&cm="+encodeURIComponent(cm)+"&hl="+encodeURIComponent(hl)+"&su="+tp;}}
else if(dbg){w.alert("No ctag on the page.");}}
catch(e){if(dbg){w.alert("Error: "+e.name+"\n"+e.message);}}
return tu;};function init(){if(elC===null){elC=d.getElementById("ctag");if(elC){var s=elC.getAttribute("src");di=qsVal(s,'di');pi=qsVal(s,'pi');ps=qsVal(s,'ps');tp=qsVal(s,'tp');}
else{elC='';}
var ms=d.getElementsByTagName("META");for(var n=0;n<ms.length;++n){var nm=ms[n].getAttribute("name");if(nm&&nm.toLowerCase()=="g-link"){var y,c=ms[n].getAttribute("content");if(c){var ca=c.split(';');if(ca[0]){y=parseInt(ca[0]);if(!isNaN(y)){dl=y;}}
if(ca[1]){tb=ca[1];}
if(ca[2]){y=parseInt(ca[2]);if(!isNaN(y)){sd=y;}}}
break;}}
var elBase=d.getElementsByTagName("BASE");if(elBase.length==1){ub=elBase[0].getAttribute("href");}}}
function qsVal(p,t){var re=new RegExp("[?&]"+t+"=([^&]+)","i");var ar=re.exec(p);return(ar?ar[1]:'');}
function mb(url){var re=/([^\/]+)\/[^\/\?]+\/?(\?.*)?$/;var arr=re.exec(url);if(arr){var nm=arr[1],fc=nm.charAt(0);if(dbg&&nm.substring(0,3)!="_1_"){url=url.replace(nm,(fc=='_'?'_1':'_1_')+nm);}
else if(fc!="_"){url=url.replace(nm,'_'+nm);}}
return url;}
function getGT1(u){var re=/[\?\&]GT1=(\d+)/i;var ar=re.exec(u);return(ar?ar[1]:'');}
function getDst(su){var u=null;var ar=reUrl.exec(su);if(!ar){u=su;}
else if((ar[4]&&noLog(ar[4].toLowerCase()))||(ar[2]&&ar[2].toLowerCase()=="javascript")){u=null;}
else if(!ub||ar[2]){u=su;}
else{u=ub+su;}
return u;}
function noLog(s){if(ex&&ex.length){for(var n=0;n<ex.length;++n){if(s===ex[n]){return true;}}}
return false;}
function getCe(rt,tn){if(!rt){return 0;}
if(rt==tn){return 1;}
var ce=df(rt,tn);return(ce>0?ce:0);}
function df(cn,tn,x){if(!x){x=-1;}
for(var n=0;x<0&&n<cn.childNodes.length;++n){var c=cn.childNodes[n];if(c.nodeType==1){if(c==tn){return-x;}
if(!c.id){switch(c.tagName){case'A':case'AREA':var href=c.getAttribute("href");if(href&&href.indexOf("javascript:")!==0){--x;}
break;}
x=df(c,tn,x);}}}
return x;}
this.TrackClick=function(el,cmp){stopAsync();var tu=my.CreateReport(el,cmp);if(tu){var img=new Image();img.src=tu;if(dbg){w.alert("Tracking: "+pu(tu));}}};this.TrackReport=function(tu){if(tu){if(dbg){w.alert("Tracking: "+pu(tu));}
else{var img=new Image();img.src=tu;var t1=new Date(),t2=new Date();while(t2.getTime()-t1.getTime()<sd){t2=new Date();}}}
return!dbg;};this.SetDebug=function(flag){dbg=(flag!==false);};function pu(u){var s='';var ar=reUrl.exec(u);if(!ar){s=u;}
else if(!ar[7]){s=ar[1]+ar[3]+ar[5]+(ar[8]?ar[8]:'');}
else{s=ar[1]+ar[3]+ar[5]+'\n\t?'+ar[7].replace(/\&/g,'\n\t&')+
(ar[8]?'\n\t'+ar[8]:'');}
return s;}
this.oncreate=function(){if(d.attachEvent){d.attachEvent("onclick",track);w.attachEvent("onunload",my.ondestroy);}};this.ondestroy=function(){if(d.detachEvent){w.detachEvent("onunload",my.ondestroy);d.detachEvent("onclick",track);}};this.oncreate();return this;};