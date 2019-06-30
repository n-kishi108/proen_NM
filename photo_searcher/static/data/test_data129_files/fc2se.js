if(!self._FC2_SEARCH)
{self._FC2_SEARCH=true;(function()
{try
{if(location.protocol!="http:")return;var url=document.URL.replace(/^[^\/]+\/\//,'');if(url.match(/\/search\?q=cache:[^:]+:([^+]+)|&u=([^&]+)&w=/)){url=RegExp.$1+RegExp.$2;}
var num=url.match(/blog(\d+)\.fc2\.com/);if(num!=null)
{num=num[1]*1;}
if(num>126)
{return;}
var visited=(new Date()).getTime();var img=new Image();var keyword='';var pv_count=1;if(document.referrer.match(/[./](?:google|msn|live)\..+[?&]q=([^&]+)|[./]yahoo\..+[?&]p=([^&]+)/i))
{keyword=RegExp.$1||RegExp.$2;}
else
{hour=(new Date()).getHours();pv_count=((hour>=23||hour<=1)?(hour==0?5:4):(hour>=20?3:2));if(visited%pv_count!=0){return;}
img.src="http://search.fc2.com/pv.gif"
+"?url="+encodeURIComponent(url)
+"&pv="+pv_count;var start=(new Date()).getTime();while((new Date()).getTime()-start<250)
{}
return;}
var sent=false,text='';if(document.addEventListener)
{document.addEventListener("DOMContentLoaded",function()
{document.readyState="loaded";},false);}
setTimeout(function()
{var userUnload=window.onunload;var userBeforeunload=window.onbeforeunload;window.onunload=function(ev)
{sendKeyword();if(userUnload)
{userUnload(ev);}}
window.onbeforeunload=function(ev)
{sendKeyword();if(userBeforeunload)
{userBeforeunload(ev);}}
getBody();},1000);function getBody()
{if(document.readyState!="loaded"&&document.readyState!="complete")
{setTimeout(getBody,0);return;}
var bodytext=document.body.innerHTML.replace(/<[^>]+>/g,'').replace(/\s+/g,' ');var decoded_keywords;try
{decoded_keywords=decodeURIComponent(keyword);}
catch(ex)
{decoded_keywords=unescape(keyword);}
var keywords=decoded_keywords.split(/\s|\+/);var word1,text1='',text2='';for(var i=0;i<keywords.length;i++)
{var pos=bodytext.toLowerCase().indexOf(keywords[i].toLowerCase());if(pos!=-1)
{if(text1=='')
{text1=bodytext.substring(pos-100,pos+keywords[i].length+100);word1=keywords[i];}
else
{if(text2=='')
{text2=bodytext.substring(pos-50,pos+keywords[i].length+50);pos=text1.indexOf(word1);text1=bodytext.substring(pos-50,pos+keywords[i].length+50);break;}}}}
if(text1=='')
{var middle=Math.floor(bodytext.length/2);text1=bodytext.substring(middle-100,middle+100);}
else if(text2!='')
{text1+='...'+text2;}
text=text1.replace(/&lt;/,'<').replace(/&gt;/,'>').replace(/&quot;/,'"').replace(/&amp;/,'&');}
function sendKeyword()
{if(sent)
{return;}
sent=true;if(text=='')
{document.readyState="loaded";getBody();}
var doc_title=document.title;if(typeof(doc_title)!="string"){var title=document.getElementsByTagName("title")[0];doc_title=(title?title.innerHTML:"");}
img.src="http://search.fc2.com/search.gif"
+"?url="+encodeURIComponent(url)
+"&pv="+pv_count
+"&keyword="+encodeURIComponent(keyword)
+"&text="+encodeURIComponent(text)
+"&stayed="+(Math.floor(((new Date()).getTime()-visited)/1000))
+"&title="+encodeURIComponent(doc_title.replace(/^\s+/,"").replace(/\s+$/,""));var start=(new Date()).getTime();while((new Date()).getTime()-start<250)
{}}}
catch(ex)
{(new Image()).src="http://search.fc2.com/error.gif"
+"?url="+escape(document.URL)
+"&ref="+escape(document.referrer)
+"&ua="+escape(navigator.userAgent);var start=(new Date()).getTime();while((new Date()).getTime()-start<250)
{}}})();}
