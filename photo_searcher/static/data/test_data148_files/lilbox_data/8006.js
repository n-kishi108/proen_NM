var showPopup=Math.floor(Math.random()*10)%2;
var amznUts={DomainId:"amazon.com",EntityId:"Associates",EventId:"view"};
var _amzn_utils={insertStyleSheet:function(_1,_2,_3){
if(!document.getElementById(_1)){
var _4=document.getElementsByTagName("head");
if(_4[0]){
var _5;
if(document.createElementNS&&_4[0].tagName=="head"){
_5=document.createElementNS("http://www.w3.org/1999/xhtml","link");
}else{
_5=document.createElement("link");
}
_5.id=_1;
_5.rel="stylesheet";
_5.href=this.amznMediaserverURL(_3)+_2;
_5.type="text/css";
_4[0].appendChild(_5);
}
}
},objHasOwnProperty:function(_6,_7){
return Object.prototype.hasOwnProperty?_6.hasOwnProperty(_7):typeof _6[_7]!="function";
},insertAfter:function(_8,_9,_a){
var pn=_9.parentNode;
if(_9==pn.lastChild){
if((!_a)&&(_8===_9)){
return false;
}
pn.appendChild(_8);
}else{
return this.insertBefore(_8,_9.nextSibling,_a);
}
return true;
},insertBefore:function(_c,_d,_e){
if(!_e&&(_c===_d||_c.nextSibling===_d)){
return false;
}
var _f=_d.parentNode;
_f.insertBefore(_c,_d);
return true;
},getById:function(id,_11){
if(this.isAppleWebKit()){
var _12=null;
var _13=_11.childNodes;
for(var i=0;i<_13.length;i++){
if(_12!=null){
return _12;
}
var _15=_13[i];
if(_15&&_15.childNodes&&_15.childNodes.length>0){
var _16=this.getById(id,_15);
if(_16!=null){
_12=_16;
}
}
if(_15&&_15.id==id){
_12=_15;
}
}
return _12;
}else{
var _12=null;
var _13=_11.childNodes;
for(var i in _13){
if(_12!=null){
return _12;
}
var _15=_13[i];
if(_15&&_15.childNodes&&_15.childNodes.length>0){
var _16=this.getById(id,_15);
if(_16!=null){
_12=_16;
}
}
if(_15&&_15.id==id){
_12=_15;
}
}
return _12;
}
},byId:function(id,doc){
if((id)&&((typeof id=="string")||(id instanceof String))){
doc=document;
var ele=doc.getElementById(id);
if(ele&&(ele.id!=id)&&doc.all){
ele=null;
var _1a=doc.all[id];
if(_1a){
if(_1a.length){
for(var i=0;i<_1a.length;i++){
if(_1a[i].id==id){
ele=_1a[i];
break;
}
}
}else{
ele=_1a;
}
}
}
return ele;
}
return id;
},replaceAll:function(str,_1d,_1e){
if(str==null){
return str;
}
var idx=str.indexOf(_1d);
while(idx>-1){
str=str.replace(_1d,_1e);
idx=str.indexOf(_1d);
}
return str;
},msie:"",amzn_isMSIE:function(){
if(this.msie==""){
this.msie=navigator.userAgent.toLowerCase().indexOf("msie")>0;
}
return this.msie;
},msie_6:"",amzn_isMSIE_6:function(){
if(this.msie_6==""){
this.msie_6=/MSIE (5\.5|6\.)/.test(navigator.userAgent);
}
return this.msie_6;
},firefox_1_5:"",isFirefox_1_5:function(){
if(this.firefox_1_5==""){
this.firefox_1_5=navigator.userAgent.toLowerCase().indexOf("firefox/1.5")>0;
}
return this.firefox_1_5;
},firefox_2_0:"",isFirefox_2_0:function(){
if(this.firefox_2_0==""){
this.firefox_2_0=navigator.userAgent.toLowerCase().indexOf("firefox/2.0")>0;
}
return this.firefox_2_0;
},firefox:"",isFirefox:function(){
if(this.firefox==""){
this.firefox=navigator.userAgent.toLowerCase().indexOf("firefox")>0;
}
return this.firefox;
},safari:"",isAppleWebKit:function(){
if(this.safari==""){
this.safari=navigator.userAgent.toLowerCase().indexOf("applewebkit")>0;
}
return this.safari;
},$:function(id){
return this.byId(id,document);
},validateParams:function(_21){
var _22=true;
for(var _23 in _21){
if(_amzn_utils.objHasOwnProperty(_21,_23)){
if(typeof _21[_23]=="undefined"){
_22=false;
return;
}
}
}
return _22;
},clone:function(_24){
if(_24==null){
return _24;
}
var _25=new _24.constructor();
for(var _26 in _24){
if(_amzn_utils.objHasOwnProperty(_24,_26)){
if(typeof _24[_26]=="object"){
_25[_26]=this.clone(_24[_26]);
}else{
_25[_26]=_24[_26];
}
}
}
return _25;
},runPNGTransparencyHackForBkgdImage:function(_27){
if(/MSIE (5\.5|6\.)/.test(navigator.userAgent)&&_27){
var _28=_27.currentStyle.backgroundImage||_27.style.backgroundImage;
if(_28){
var _29=false;
if(_28.match(/^url[("']+(.*\.png)[)"']+$/i)){
var _2a=RegExp.$1;
if(_2a&&_2a.indexOf("_tpng.png")>0){
if(_27.currentStyle.width=="auto"&&_27.currentStyle.height=="auto"){
_27.style.width=_27.offsetWidth+"px";
}
_27.style.backgroundImage="none";
_27.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader"+"(src='"+_2a+"',sizingMethod='scale')";
}
_29=true;
}else{
if(_28=="none"){
_29=true;
}
}
if(_29){
for(var n=0;n<_27.childNodes.length;n++){
if(_27.childNodes[n].style){
_27.childNodes[n].style.position="relative";
}
}
}
}
}
},runPNGTransparencyHack:function(_2c,_2d){
if(typeof _2d=="undefined"){
_2d="US";
}
if(/MSIE (5\.5|6\.)/.test(navigator.userAgent)&&_2c){
if(window.ActiveXObject){
var _2e=_2c.getElementsByTagName("input");
for(var i=0;i<_2e.length;++i){
if(_2e[i].src.indexOf("_tpng.png")>0){
var src=_2e[i].src;
_2e[i].src=this.imageDirectory(_2d)+"/transparent-pixel.gif";
_2e[i].style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"',sizingMethod='scale')";
}
}
var _31=_2c.getElementsByTagName("img");
for(var i=0;i<_31.length;++i){
if(_31[i].src.indexOf("_tpng.png")>0){
var src=_31[i].src;
_31[i].src=this.imageDirectory(_2d)+"/transparent-pixel.gif";
_31[i].style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"',sizingMethod='scale')";
}
}
}
}
},stripTags:function(str){
if(str==null){
return null;
}
return str.replace(/<\/?[^>]+>/gi,"");
},unescapeHTML:function(_33){
var div=document.createElement("div");
div.innerHTML=this.stripTags(_33);
return div.childNodes[0]?div.childNodes[0].nodeValue:"";
},escapeHTML:function(_35){
if(typeof _35=="string"){
var div=document.createElement("div");
var _37=document.createTextNode(_35);
div.appendChild(_37);
return div.innerHTML;
}else{
if(typeof _35=="array"){
for(var i=0;i<_35.length;i++){
_35[i]=this.escapeHTML(_35[i]);
}
}else{
if(typeof _35=="object"){
for(var i in _35){
if(_amzn_utils.objHasOwnProperty(_35,i)){
_35[i]=this.escapeHTML(_35[i]);
}
}
}
}
}
return _35;
},getCampaignID:function(_39,_3a){
switch(_3a){
case "US":
return _39?"213293":"212361";
case "CA":
return _39?"213297":"212529";
case "GB":
return _39?"2842":"2486";
case "DE":
return _39?"2846":"2474";
case "FR":
return _39?"2850":"2498";
case "JP":
return _39?"1023":"759";
}
},getRatingImage:function(_3b,_3c){
if(!_3b){
return "";
}
var _3d;
var _3e=_3b.split(".");
if(_3e&&_3e.length==2){
var _3f=_3e[0]+_3e[1];
_3d="<img style='height:11px; width:56px;border: none;margin:0;' src='"+_amzn_utils.imageDirectory(_3c)+"/star"+_3f+"_tpng.png'/>";
}
return _3d;
},numberOfOccurencesOfSubstr:function(str,_41){
var _42=0;
var pos=str.indexOf(_41);
while(pos!=-1){
_42++;
pos=str.indexOf(str,pos+_41.length);
}
return _42;
},_amzn_popup_onshow_callback:function(){
_amzn_utils.runPNGTransparencyHack(_amzn_utils.$("amzn_popup_div"));
},_amzn_popup_callback_helper:function(){
_amzn_popup.onshow_callback=_amzn_utils._amzn_popup_onshow_callback;
_amzn_popup.onhide_callback=_amzn_utils._amzn_popup_onhide_callback;
},_amzn_popup_onhide_callback:function(){
_amzn_popup.onhide_callback=null;
},getTile:function(_44,_45,_46,_47){
var _48=Math.floor((_45.innerWidth-6*_45.cols)/_45.cols);
var res="<div class='wdgt_tl_pad'>"+"<div class='wdgt_tl' style='height:"+_45.height+"px;width:"+_48+"px'>";
if(typeof _44=="string"&&_44=="INVALID"){
res+="<a target='_blank' href='"+_amzn_utils.getString(_amzn_utils.AmazonCom,_45.marketPlace)+"'><img style='width:40px;height:54px;border:none' src='"+_amzn_utils.imageDirectory(_45.marketPlace)+"/itemNoLongerAvailable-40px.gif'></a>";
res+="</div>";
res+="</div>";
return res;
}
var _4a=escape(_45.createPopupTile(_44));
var _4b="";
var _4c="";
var _4d="";
var _4e="";
var _4f="";
var _50="";
var _51=_amzn_utils.getURL(_44["DetailPageURL"],_45);
var _52=10;
var _53=_48-50;
var _54=_48-50;
var _55=0;
var _56="";
var _57=_45.show_review&&_44["Rating"];
var _58=_45.show_price&&_44["Price"];
if(_45.show_image){
var _59=_44["ThumbImageUrl"];
var _5a=_44["ThumbImageWidth"];
_55=_44["ThumbImageHeight"];
if(!_59||_59==""){
_59=_amzn_utils.imageDirectory(_45.marketPlace)+"/noImageAvailable-40px.gif";
}
if(!_5a||_5a==""){
_5a=40;
}
if(!_55||_55==""){
_55=44;
}
if(_5a>40){
_5a=40;
_55=Math.floor(40*_44["ThumbImageHeight"]/_44["ThumbImageWidth"]);
}
if(_55>60){
_55=60;
_5a=Math.floor(60*_44["ThumbImageWidth"]/_44["ThumbImageHeight"]);
}
if(!_57&&_45.isIAB&&_45.wdgt_height==250){
if(_55>55){
_55=55;
_5a=Math.floor(55*_44["ThumbImageWidth"]/_44["ThumbImageHeight"]);
}
}
_56="<div class='asin_img' ";
if(typeof getWidgetParams!="undefined"){
showPopup=1;
}
if(_45.isWidgetSource&&(_45.templateId=="8001"||_45.templateId=="8002")){
_4b="><a style='float:left;"+_45.style_tile_asin_a()+"' target='_blank' onmouseover='_amzn_utils._amzn_popup_callback_helper();_a=this; _amzn_popup.showpreview(\""+_4a+"\", _a, event, 500,\""+_45.tag+"\",\""+_45.linkCode+"\",\""+_45.creativeId()+"\", \""+_45.marketPlace+"\", \""+_44["ASIN"]+"\", _amzn_utils.getCampaignID(self.isWidgetSource,self.marketPlace));' onmouseout='_amzn_popup.hide()' href='"+_51+"'>"+"<img src='"+_59+"' width='"+_5a+"' height='"+_55+"' style='border: none;margin:0;"+_45.style_tile_asin_img()+"' /></a></div>";
}else{
if(_45.templateId=="8002"&&showPopup=="0"){
_4b="><a style='float:left;"+_45.style_tile_asin_a()+"' target='_blank' onmouseover='' onmouseout='_amzn_popup.hide()' href='"+_51+"'>"+"<img src='"+_59+"' width='"+_5a+"' height='"+_55+"' style='border: none;margin:0;"+_45.style_tile_asin_img()+"' /></a></div>";
}else{
_4b="><a style='float:left;"+_45.style_tile_asin_a()+"' target='_blank' onmouseover='_amzn_utils._amzn_popup_callback_helper();_a=this; _amzn_popup.showpreview(\""+_4a+"\", _a, event, 500,\""+_45.tag+"\",\""+_45.linkCode+"\",\""+_45.creativeId()+"\", \""+_45.marketPlace+"\", \""+_44["ASIN"]+"\");' onmouseout='_amzn_popup.hide()' href='"+_51+"'>"+"<img src='"+_59+"' width='"+_5a+"' height='"+_55+"' style='border: none;margin:0;"+_45.style_tile_asin_img()+"' /></a></div>";
}
}
if(_48>150||_45.isIAB){
_53=_48-50;
}
if(_45.isIAB){
_53-=5;
}
_54=_48-55;
}else{
_53=_48-_52;
_54=_48-_52-5;
}
var _5b=false;
if(_46){
for(var k=0;k<_46.length;k++){
var _5d=_46[k];
if(!(typeof _5d=="undefined"||_5d==null||_5d==""||_5d.length==0)){
_5b=true;
break;
}
}
}
if(_5b){
var _5e=2;
if(_45.show_image){
var _5f=15;
if(_48>=150){
_5f+=15;
}
if(_57){
_5f+=15;
}
if(_58){
_5f+=15;
}
_5f=Math.max(_55,_5f);
_56+="style='height:"+_5f+"px;'";
if(_45.isIAB&&typeof (_47)!="undefined"&&_47>1){
_5f+=_47*14;
}
_5e+=Math.floor((60-_5f)/12);
if(_45.isIAB){
_5e=2;
if(_45.wdgt_height==280){
_5e=1;
if(_47>1){
var _60=1;
if(_45.show_image&&!_58){
_60=2;
}
if(_45.show_image&&!_57&&_60<_47){
_60++;
}
_47=_60;
}
}
if(_45.wdgt_height==250){
_5e=1;
if(_57){
_46="";
}else{
if(_47>1){
_47--;
}
}
}
if(_45.wdgt_height==150){
_46="";
}
}
}
if(_45.isWidgetSource&&(_45.templateId=="8001"||_45.templateId=="8002")){
_50="<div onmouseover='_amzn_utils._amzn_popup_callback_helper();_a=this; _amzn_popup.showpreview(\""+_4a+"\", _a, event, 500,\""+_45.tag+"\",\""+_45.linkCode+"\",\""+_45.creativeId()+"\", \""+_45.marketPlace+"\", \""+_44["ASIN"]+"\", _amzn_utils.getCampaignID(self.isWidgetSource,self.marketPlace));' onmouseout='_amzn_popup.hide()' class='asin_cmnt' style='cursor:pointer;width:"+_48+"px;"+_45.style_tile_comment()+"'>"+_45.trimMultiLineComments(_46,"10",_48-6,_5e)+"</div>";
}else{
if(_45.templateId=="8002"&&showPopup=="0"){
_50="<div onmouseover='' onmouseout='_amzn_popup.hide()' class='asin_cmnt' style='cursor:pointer;width:"+_48+"px;"+_45.style_tile_comment()+"'>"+_45.trimMultiLineComments(_46,"10",_48-6,_5e)+"</div>";
}else{
_50="<div onmouseover='_amzn_utils._amzn_popup_callback_helper();_a=this; _amzn_popup.showpreview(\""+_4a+"\", _a, event, 500,\""+_45.tag+"\",\""+_45.linkCode+"\",\""+_45.creativeId()+"\", \""+_45.marketPlace+"\", \""+_44["ASIN"]+"\");' onmouseout='_amzn_popup.hide()' class='asin_cmnt' style='cursor:pointer;width:"+_48+"px;"+_45.style_tile_comment()+"'>"+_45.trimMultiLineComments(_46,"10",_48-6,_5e)+"</div>";
}
}
}
var _61="";
var _62="";
if(_45.isIAB&&_45.show_image){
_61="padding-left:"+(_5a+2)+"px;";
}
if(_45.isIAB&&typeof (_47)!="undefined"){
_62=_45.trimCharsByWidth(this.escapeHTML(_44["Title"]),"10bold",_53,_47);
}else{
_62=_45.trimCharsByWidth(this.escapeHTML(_44["Title"]),"10bold",_53);
}
if(_45.isWidgetSource&&(_45.templateId=="8001"||_45.templateId=="8002")){
_4c="<div style='"+_45.style_tile_h1()+";"+_61+"' class='asin_h1'><a target='_blank' onmouseover='_amzn_utils._amzn_popup_callback_helper();_a=this; _amzn_popup.showpreview(\""+_4a+"\", _a, event, 500,\""+_45.tag+"\",\""+_45.linkCode+"\",\""+_45.creativeId()+"\", \""+_45.marketPlace+"\", \""+_44["ASIN"]+"\", _amzn_utils.getCampaignID(self.isWidgetSource,self.marketPlace));' onmouseout='_amzn_popup.hide()' style='"+_45.style_tile_a()+_45.style_tile_h1_a()+"' href='"+_51+"'>"+_62+"</a></div>";
}else{
if(_45.templateId=="8002"&&showPopup=="0"){
_4c="<div style='"+_45.style_tile_h1()+";"+_61+"' class='asin_h1'><a target='_blank' onmouseover='' onmouseout='_amzn_popup.hide()' style='"+_45.style_tile_a()+_45.style_tile_h1_a()+"' href='"+_51+"'>"+_62+"</a></div>";
}else{
_4c="<div style='"+_45.style_tile_h1()+";"+_61+"' class='asin_h1'><a target='_blank' onmouseover='_amzn_utils._amzn_popup_callback_helper();_a=this; _amzn_popup.showpreview(\""+_4a+"\", _a, event, 500,\""+_45.tag+"\",\""+_45.linkCode+"\",\""+_45.creativeId()+"\", \""+_45.marketPlace+"\", \""+_44["ASIN"]+"\");' onmouseout='_amzn_popup.hide()' style='"+_45.style_tile_a()+_45.style_tile_h1_a()+"' href='"+_51+"'>"+_62+"</a></div>";
}
}
if(_45.isWidgetSource&&(_45.templateId=="8001"||_45.templateId=="8002")){
_4d="<div style='"+_45.style_tile_h2()+";"+_61+"' class='asin_h2'><a target='_blank' onmouseover='_amzn_utils._amzn_popup_callback_helper();_a=this; _amzn_popup.showpreview(\""+_4a+"\", _a, event, 500,\""+_45.tag+"\",\""+_45.linkCode+"\",\""+_45.creativeId()+"\", \""+_45.marketPlace+"\", \""+_44["ASIN"]+"\", _amzn_utils.getCampaignID(self.isWidgetSource,self.marketPlace));' onmouseout='_amzn_popup.hide()' style='"+_45.style_tile_a()+"' href='"+_51+"'>"+_45.trimCharsByWidth(this.escapeHTML(_44["Subtitle"]),"9",_54)+"</a></div>";
}else{
if(_45.templateId=="8002"&&showPopup=="0"){
_4d="<div style='"+_45.style_tile_h2()+";"+_61+"' class='asin_h2'><a target='_blank' onmouseover='' onmouseout='_amzn_popup.hide()' style='"+_45.style_tile_a()+"' href='"+_51+"'>"+_45.trimCharsByWidth(this.escapeHTML(_44["Subtitle"]),"9",_54)+"</a></div>";
}else{
_4d="<div style='"+_45.style_tile_h2()+";"+_61+"' class='asin_h2'><a target='_blank' onmouseover='_amzn_utils._amzn_popup_callback_helper();_a=this; _amzn_popup.showpreview(\""+_4a+"\", _a, event, 500,\""+_45.tag+"\",\""+_45.linkCode+"\",\""+_45.creativeId()+"\", \""+_45.marketPlace+"\", \""+_44["ASIN"]+"\");' onmouseout='_amzn_popup.hide()' style='"+_45.style_tile_a()+"' href='"+_51+"'>"+_45.trimCharsByWidth(this.escapeHTML(_44["Subtitle"]),"9",_54)+"</a></div>";
}
}
if(_58){
_4e="<div  style='"+_45.style_tile_price()+";"+_61+";' class='asin_price'>"+_44["Price"]+"</div>";
}
if(_57){
_4f="<div style='"+_45.style_tile_review()+";"+_61+"' class='asin_review'>"+_45.getReviewImage(_44["Rating"])+"</div>";
}
_4b=_56+_4b;
if(_48<150&&!_45.isIAB){
res+=_4c;
res+=_4b;
}else{
res+=_4b;
res+=_4c;
}
res+=_4d;
res+=_4e;
res+=_4f;
if(_46){
res+=_50;
}
res+="</div>";
res+="</div>";
return res;
},pageNumberDiv:function(_63,_64,_65,_66){
if(typeof _66=="undefined"){
_66=_63;
}
if(_64){
return "<strong style='"+_65.style_pgn_strong()+"'>"+_66+"</strong>";
}else{
if(!window.nextCallBack){
window.nextCallBack=new Object();
}
if(!window.nextCallBack[_65.marketPlace]){
window.nextCallBack[_65.marketPlace]=new Object();
}
if(!window.nextCallBack[_65.marketPlace][_65.templateId]){
window.nextCallBack[_65.marketPlace][_65.templateId]=new Object();
}
if(!window.nextCallBack[_65.marketPlace][_65.templateId][_65.instanceId]){
window.nextCallBack[_65.marketPlace][_65.templateId][_65.instanceId]=new Object();
}
window.nextCallBack[_65.marketPlace][_65.templateId][_65.instanceId]["showpage"]=_65.showpage;
return "<a style='cursor:pointer;"+_65.style_pgn_a()+"' onclick='javascript:window.nextCallBack[\""+_65.marketPlace+"\"]["+_65.templateId+"]["+_65.instanceId+"].showpage("+_63+","+_65.instanceId+","+_65.templateId+",\""+_65.marketPlace+"\");'>"+_66+"</a>";
}
},calcContrastColor:function(_67){
function f(c,n){
return parseInt(c.substr(n,2),16);
}
var av=(f(_67,1)+f(_67,3)+f(_67,5))/3;
av+=(av>=100)?-100:100;
return "rgb("+av+","+av+","+av+")";
},getDigitalCategory:function(_6b,_6c){
if(_6b=="Book"){
return this.getString(this.Kindle,_6c.marketPlace);
}else{
if(_6b=="Music"){
return this.getString(this.MP3,_6c.marketPlace);
}else{
if(_6b=="DVD"){
return this.getString(this.Unbox,_6c.marketPlace);
}
}
}
},createPopupTile:function(_6d,_6e,_6f){
var _70=335;
var _71=_6d["ThumbImageUrl"];
var _72=64;
var _73=97;
var _74=_6d["ThumbImageWidth"];
var _75=_6d["ThumbImageHeight"];
var _76="";
if(!_71||_71==""){
_71=_amzn_utils.imageDirectory(_6e.marketPlace)+"/noImageAvailable-90px.gif";
_76="width:90px;";
_74="90";
}else{
if(!_74||_74==""||!_75||_75==""){
var _77=_6d["LargeImageUrl"];
if(_77&&_77!=""){
_71=_amzn_utils.getImageURLForDimension(_77,_75,_74);
}
_74=null;
_75=null;
}else{
if(_74>_72||_75>_73){
var _77=_6d["LargeImageUrl"];
if(_77&&_77!=""){
if(_74>_72){
_74=_72;
_75=Math.ceil(_72*_6d["ThumbImageHeight"]/_6d["ThumbImageWidth"])+2;
}
if(_75>_73){
_75=_73;
_74=Math.ceil(_73*_74/_6d["ThumbImageHeight"])+2;
}
_71=_amzn_utils.getImageURLForDimension(_77,_75,_74);
}
}
_76="width:"+_74+"px;";
}
if(_74==null){
_74="65";
}
}
var _78="";
if(_6d["Rating"]){
_78="<div class='asin_review'>"+_6e.getReviewImage(_6d["Rating"])+" ("+_6d["TotalReviews"]+this.getString(this.CustomerReviews,_6e.marketPlace)+")"+"</div>";
}else{
_78="<div valign=top class='asin_review_empty'></div>";
}
var _79="";
var _7a=false;
if(_6d["Price"]){
_79=_6d["Price"];
}else{
_79="";
}
if(_79==""){
_7a=false;
}
var _7b=this.getString(this.Buy,_6e.marketPlace);
var _7c="";
var _7d=false;
var _7e="";
var _7f=false;
if(_6d["isDigital"]=="true"){
if(_6e.marketPlace=="US"&&(_6d["category"]=="Movie"||_6d["category"]=="DVD"||_6d["category"]==""||_6d["category"]=="TV Series Video on Demand"||_6d["category"]=="TV Series Episode Video on Demand")){
_7b=this.getString(this.WatchNow,_6e.marketPlace);
}else{
_7b=this.getString(this.Download,_6e.marketPlace);
}
_7f=true;
_7a=false;
}
if(!_7f&&_6d["DigitalAsinPrice"]){
_7d=true;
_7c=_6d["DigitalAsinPrice"];
if(!_7c||_7c==""){
_7d=false;
_7f=false;
}else{
_7d=true;
_7b+=this.getString(_6d["category"],_6e.marketPlace);
_7e=_amzn_utils.getDigitalCategory(_6d["category"],_6e);
}
}
var _80="";
if(_6f){
_80="<div class='asin_cmnt' style=\"width:317px\";>"+_6f+"</div>";
}
var _81=_amzn_utils.getTextHeightAndWidth(_7b,"100% Verdana, Arial, Helvetica, sans-serif","10",true,"",_6e);
var _82=_amzn_utils.getTextHeightAndWidth(_79,"100% Verdana, Arial, Helvetica, sans-serif","10",false,"",_6e);
var _83=_81[1]+_82[1]+21;
if(_7d){
var _84=_amzn_utils.getTextHeightAndWidth("-or-","100% Verdana, Arial, Helvetica, sans-serif","10",false,"",_6e);
_81=_amzn_utils.getTextHeightAndWidth(this.getString(this.Download,_6e.marketPlace),"100% Verdana, Arial, Helvetica, sans-serif","10",true,"",_6e);
_82=_amzn_utils.getTextHeightAndWidth(_7c,"100% Verdana, Arial, Helvetica, sans-serif","10",false,"",_6e);
}
var _85=_81[1]+_82[1]+21;
var _86=232;
var _87=parseInt(_74)+12;
var _88=250;
if(_7d){
if(_85+_83+5+_84[1]>250){
_88=_85+_83+5+_84[1];
_86=_85+_83+5-18+_84[1];
_87+=_88;
}else{
_87+=250;
}
}else{
_87+=_88;
}
var _89=_amzn_utils.trimTextBlock(this.escapeHTML(_6d["Title"]),"11bold",_86,2,false,_6e);
var _8a=_amzn_utils.trimTextBlock(this.escapeHTML(_6d["Subtitle"]),"10",_86,2,false,_6e);
if(_amzn_utils.amzn_isMSIE()){
_86=_86+4;
}
var _8b=_6e.creativeId();
var _8c="<div id='wdgt_pop_tl' class='wdgt_pop_tl' style=\"background:white;\">"+"<img onclick='_amzn_popup.hideNow()' style='top:0px;display:block;right:0px;position:absolute;border:none;margin:0;float:right;cursor:pointer;padding:0;' src='"+_amzn_utils.imageDirectory(_6e.marketPlace)+"/close-fly-over-new.gif"+"' hspace=0 />"+"<table cellspacing=\"0\" cellpadding=\"0\" style=\"border:5px solid #cccccc;width:"+_87+"px\"><tr><td><table valign=top align=left cellspacing=0 cellpadding=0 style=\"top:0px;left:0px\">"+"<tr valign=top>"+"<td valign=top align=left>"+"<div style=\"padding:6px;\">"+"<a target='_blank' href='"+_amzn_utils.getURL(_6d["DetailPageURL"],_6e,_8b)+"'>"+"<img src='"+_71+"' class='asin_img' hspace=0  style=\""+_76+"\" />"+"</a>"+"</div></td>"+"<td align=left>"+"<div>"+"<table cellspacing=\"0\" cellpadding=\"0\" valign=top style= \"width:"+_88+"px\">"+"<tr>"+"<td>"+"<table cellspacing=\"0\" cellpadding=\"0\" style=\"width:"+_86+"px\">"+"<tr>"+"<td>"+"<a target='_blank' href='"+_amzn_utils.getURL(_6d["DetailPageURL"],_6e,_8b)+"'>"+"<div class='asin_h1' style=\"width:"+_86+"px;\">"+_89+"</div></a>"+"</td>"+"</tr>"+"<tr valign=top>"+"<td valign=top>"+"<a target='_blank'  href='"+_amzn_utils.getURL(_6d["DetailPageURL"],_6e,_8b)+"'>"+"<div class='asin_h2' style=\"width:"+_86+"px;\">"+_8a+"</div></a>"+"</td></tr>"+"<tr valign=top ><td valign=top>"+_78+"</td>"+"</tr>"+"</table>"+"</td>"+"<td align=right valign=\"top\" style=\"width:18px\">"+"</td>"+"</tr>"+"<tr><td valign=left colspan=2>"+"<div class=\"cssbutton\" style=\""+"background:url('"+_amzn_utils.imageDirectory("US")+"/btn-right2-sm-sec.gif') no-repeat right top;"+" width:"+_83+"px;padding-bottom:9px;\">";
var _8d=_6d["DetailPageURL"];
if(_7a){
_8d=_amzn_utils.getString(this.AmazonComLink,_6e.marketPlace)+"gp/aws/cart/add.html?";
_8d+="ASIN.1="+_6d["ASIN"]+"&Quantity.1=1&huc=1&SessionId="+amzn_session_id;
}
_8b=_6e.creativeId();
_8c+="<a target=\"_blank\" href=\""+_amzn_utils.getURL(_8d,_6e,_8b)+"\"><div style=\""+"background:url('"+_amzn_utils.imageDirectory("US")+"/btn-mid-slider2-sm-sec.gif') no-repeat left top;"+" width:"+(_83-7)+"px;\"><span class=\"cssbuttonleft\" >"+_7b+"</span>"+"<span class=\"cssbuttonright\">"+_79+"</span></div></a>"+"</div>";
if(_7d){
_8b=_6e.creativeId();
_8c+="<div class=\"cssbuttonor\">-or-</div>"+"<table  cellspacing=\"0\" cellpadding=\"0\"  valign=top><tr valign=top align=left><td valign=top\">"+"<div class=\"cssbutton\" style=\"width:"+_85+"px;background:url('"+_amzn_utils.imageDirectory("US")+"/btn-right2-sm-sec.gif') no-repeat right top;\">"+"<a target=\"_blank\" href=\""+_amzn_utils.getURL("http://www.amazon.com/dp/"+_6d["DigitalAsin"],_6e,_8b)+"/\"><div style=\"background:url('"+_amzn_utils.imageDirectory("US")+"/btn-mid-slider2-sm-sec.gif') no-repeat left top; width:"+(_85-7)+"px;\"><span class=\"cssbuttonleft\" >";
if(_6e.marketPlace=="US"&&(_6d["category"]=="Movie"||_6d["category"]=="DVD"||_6d["category"]==""||_6d["category"]=="TV Series Video on Demand"||_6d["category"]=="TV Series Episode Video on Demand")){
_8c+=this.getString(this.WatchNow,_6e.marketPlace);
}else{
_8c+=this.getString(this.Download,_6e.marketPlace);
}
_8c+="</span><span class=\"cssbuttonright\">"+_7c+"</span></div></a>"+"</div>"+"</td></tr>"+"<tr><td class=\"cssbuttontype\" align=left>"+this.getString(this.Amazon,_6e.marketPlace)+_7e+"</td></tr>"+"</table>";
}
_8c+="</td>"+"</tr></table></div>"+"</td></tr><tr><td colspan = 2>"+_80+"<div style='clear:left'></div>"+"</td></tr></table>"+"</td></tr></table></div>";
return _8c;
},getImageURLForDimension:function(_8e,_8f,_90){
var _91=_8e.substring(_8e.length-3);
return _8e.substring(0,_8e.length-3)+"_SX"+_90+"_SY"+_8f+"_."+_91;
},recordImpression:function(tag,_93,_94,_95,_96){
var img=document.createElement("IMG");
img.style.width="1px";
img.style.height="1px";
img.style.border="none";
var _98=1;
switch(_95){
case "US":
_98=1;
break;
case "GB":
_98=2;
break;
case "DE":
_98=3;
break;
case "FR":
_98=8;
break;
case "JP":
_98=9;
break;
case "CA":
_98=15;
break;
}
var _99="http";
if(typeof isAmznWC!="undefined"&&(isAmznWC==1||isAmznWC=="1")){
_99="https";
}
if(typeof _96=="undefined"){
_96=this.getString(this.CampaignID,_95);
}
img.src=_99+"://"+this.getString(this.AssocImpVIP,_95)+"/e/ir?"+"o="+_98+"&t="+tag+"&l="+_93+"&camp="+_96+"&creative="+_94;
document.body.appendChild(img);
if(_95=="US"){
var _9a=document.createElement("script");
var _9b="http://z-ecx.images-amazon.com/images/G/01/x-locale/personalization/uts/js/prod-v10.js";
if(_99=="https"){
_9b="https://images-na.ssl-images-amazon.com/images/G/01/x-locale/personalization/uts/js/prod-v10.js";
}
_9a.type="text/javascript";
_9a.src=_9b;
try{
var _9c=document.getElementsByTagName("head")[0];
_9c.appendChild(_9a);
}
catch(e){
}
}
},recordPopover:function(tag,_9e,_9f,_a0,_a1,_a2){
var img=document.createElement("IMG");
img.style.width="1px";
img.style.height="1px";
img.style.border="none";
var _a4=1;
switch(_a0){
case "US":
_a4=1;
break;
case "GB":
_a4=2;
break;
case "DE":
_a4=3;
break;
case "FR":
_a4=8;
break;
case "JP":
_a4=9;
break;
case "CA":
_a4=15;
break;
}
var _a5="http";
if(typeof isAmznWC!="undefined"&&(isAmznWC==1||isAmznWC=="1")){
_a5="https";
}
if(typeof _a2=="undefined"){
_a2=this.getString(this.CampaignID,_a0);
}
img.src=_a5+"://"+this.getString(this.AssocImpVIP,_a0)+"/s/pp?"+"o="+_a4+"&t="+tag+"&l="+_9e+"&camp="+_a2+"&asin="+_a1+"&creative="+_9f;
document.body.appendChild(img);
},getABTreatment:function(){
if(typeof Math!="undefined"&&typeof Math.random!="undefined"){
var _a6=Math.random();
return _a6<0.5;
}
return true;
},getAmazonLogoDimensions:function(_a7){
var _a8=new Object();
switch(_a7){
case "CA":
_a8.height=27;
_a8.width=89;
break;
case "DE":
_a8.height=26;
_a8.width=88;
break;
case "FR":
_a8.height=28;
_a8.width=89;
break;
case "GB":
_a8.height=22;
_a8.width=84;
break;
case "JP":
_a8.height=23;
_a8.width=87;
break;
default:
_a8.height=22;
_a8.width=86;
break;
}
return _a8;
},getGetWidgetButtonDimensions:function(_a9){
var _aa=new Object();
switch(_a9){
case "DE":
_aa.height=18;
_aa.width=95;
break;
case "FR":
_aa.height=18;
_aa.width=79;
break;
case "JP":
_aa.height=18;
_aa.width=94;
break;
default:
_aa.height=18;
_aa.width=82;
break;
}
return _aa;
},getRevampGetWidgetButtonDimensions:function(_ab){
var _ac=new Object();
switch(_ab){
case "DE":
_ac.height=17;
_ac.width=89;
break;
case "FR":
_ac.height=17;
_ac.width=78;
break;
case "JP":
_ac.height=17;
_ac.width=87;
break;
default:
_ac.height=17;
_ac.width=70;
break;
}
return _ac;
},drawFooter:function(_ad){
var _ae;
var _af;
var _b0=new Color(_ad.getBackgroundColor().substring(1));
if(_b0.isDark()){
_ae="amazon-logo-w_tpng.png";
_af="#FFFFFF";
}else{
_ae="amazon-logo-b_tpng.png";
_af="#000000";
}
var _b1=32;
var _b2=_ad.getWidth();
var _b3="left";
var _b4="";
var _b5=230;
if(_b2<132){
_b1=60;
}else{
if(_b2<230){
_b1=50;
}
}
switch(_ad.marketPlace){
case "CA":
_b1=32;
_b5=240;
if(_b2<130){
_b1=65;
}else{
if(_b2<_b5){
_b1=54;
}
}
break;
case "DE":
_b5=260;
_b1=31;
if(_b2<175){
_b1=71;
}else{
if(_b2<_b5){
_b1=53;
}
}
break;
case "FR":
_b5=250;
_b1=33;
if(_b2<150){
_b1=65;
}else{
if(_b2<_b5){
_b1=55;
}
}
break;
case "GB":
break;
case "JP":
_b5=270;
if(_b2<190){
_b1=68;
}else{
if(_b2<_b5){
_b1=50;
}
}
break;
default:
break;
}
if(_ad.isIAB){
if(_ad.wdgt_height==150){
_b1=26;
}else{
if(_ad.width>180){
_b1=37;
}else{
_b1=52;
}
}
if(_amzn_utils.isFirefox()&&(_ad.wdgt_height==250||_ad.wdgt_height==280)&&_ad.marketPlace=="FR"){
_b1++;
}
}
if(_b2<_b5){
_b3="right";
_b4="clear: left; ";
}
var _b6;
if(_ad.showAmazonLogoAsText){
_b6=_amzn_utils.getString(_amzn_utils.AmazonCom,_ad.marketPlace);
}else{
_b6="<img height=\""+this.getAmazonLogoDimensions(_ad.marketPlace).height+"\" width=\""+this.getAmazonLogoDimensions(_ad.marketPlace).width+"\" border=\"0\" alt=\""+_amzn_utils.getString(_amzn_utils.AmazonCom,_ad.marketPlace)+"\" src=\""+_amzn_utils.imageDirectory(_ad.marketPlace)+"/"+_ae+"\"/>";
}
if(_ad.isIAB&&_ad.wdgt_height==150){
_b6="";
}
var res="<div id=\"wdgt_ft\" class='wdgt_ft' style='height: "+_b1+"px;";
var _b8="";
var _b9="10px;";
if(_ad.isIAB&&_ad.marketPlace=="JP"){
_b9="8px";
}
if(_ad.isIAB){
if(_ad.wdgt_height==150){
res+="padding: 0px 5px 0px 3px; "+_ad.style_wdgt_ft()+";'>";
}else{
res+="padding: 0; "+_ad.style_wdgt_ft()+";'>";
}
if(_ad.wdgt_height==150){
_b8="<div class='ft_cnt'><img align=left height=\""+this.getAmazonLogoDimensions(_ad.marketPlace).height+"\" width=\""+this.getAmazonLogoDimensions(_ad.marketPlace).width+"\" border=\"0\" alt=\""+_amzn_utils.getString(_amzn_utils.AmazonCom,_ad.marketPlace)+"\" src=\""+_amzn_utils.imageDirectory(_ad.marketPlace)+"/"+_ae+"\"/>";
}else{
_b8+="<div class='ft_cnt'><a target=\"_blank\" style=\"padding-left:4px;padding-right:5px;padding-top:2px;text-decoration: none; clear:left; float: left;font-size:"+_b9+";color:"+_ad.getGetWidgetColor()+"\" href=\""+_amzn_utils.getString(_amzn_utils.WebsiteUrl,_ad.marketPlace)+"/"+_ad.getEditWidgetTarget+"\">"+_amzn_utils.getString(_amzn_utils.GetWidgetLong,_ad.marketPlace)+"</a>";
}
}else{
res+="padding: 5px 5px 5px 3px; "+_ad.style_wdgt_ft()+";'>";
_b8+="<div class='ft_cnt'><a target=\"_blank\" style=\"text-decoration: none; clear:left; float: left;font-size:10px;color:"+_ad.head_text_color+"\" href=\""+_amzn_utils.getString(_amzn_utils.WebsiteUrl,_ad.marketPlace)+"/"+_ad.getEditWidgetTarget+"\"><img "+" width=\""+this.getGetWidgetButtonDimensions(_ad.marketPlace).width+"\" height=\""+this.getGetWidgetButtonDimensions(_ad.marketPlace).height+"\" border=\"0\" alt=\"Get Widget\""+"border=\"0\" src=\""+_amzn_utils.imageDirectory(_ad.marketPlace)+"/btn-get-widget_tpng.png\"/>"+"</a>";
}
_b8+="<a target=\"_blank\" style=\"padding: 2px 0 0 0px; text-decoration: none; float: "+_b3+"; font-size: "+_b9+"; color: #"+_b0.getBlendingColor().getHex()+" !important;\" "+"href=\""+_amzn_utils.getURL(_amzn_utils.getString(_amzn_utils.PrivacyPolicyLink,_ad.marketPlace),_ad)+"\">"+_amzn_utils.getString(_amzn_utils.PrivacyPolicy,_ad.marketPlace)+"</a>";
if(_ad.isIAB&&_ad.wdgt_height==150){
res+=_b8;
}else{
if(_b2<_b5){
res=res+"<a target=\"_blank\" style=\"text-decoration: none; float: left; font-size:12px; color: "+_af+" !important; \" href=\""+_amzn_utils.getURL(_amzn_utils.getString(_amzn_utils.AmazonComLink,_ad.marketPlace)+"?",_ad)+"\">"+_b6+"</a><br/>"+_b8;
}else{
res=res+_b8+"<a target=\"_blank\" style=\"text-decoration: none; float: right; right: 5px; font-size:12px; color: "+_af+" !important; \" href=\""+_amzn_utils.getURL(_amzn_utils.getString(_amzn_utils.AmazonComLink,_ad.marketPlace)+"?",_ad)+"\">"+_b6+"</a>";
}
}
res+="</div></div>";
return res;
},drawRevampFooter:function(_ba,_bb){
var _bc;
var _bd;
var _be;
if(_bb){
_bd="#FFFFFF";
_be="amazon-logo-w_tpng.png";
}else{
_bd="#000000";
_be="amazon-logo-b_tpng.png";
}
if(_ba.showAmazonLogoAsText){
_bc=_amzn_utils.getString(_amzn_utils.AmazonCom,_ba.marketPlace);
}else{
_bc="<img height=\""+this.getAmazonLogoDimensions(_ba.marketPlace).height+"\" style='top: 5px;' width=\""+this.getAmazonLogoDimensions(_ba.marketPlace).width+"\" border=\"0\" alt=\""+_amzn_utils.getString(_amzn_utils.AmazonCom,_ba.marketPlace)+"\" src=\""+_amzn_utils.imageDirectory(_ba.marketPlace)+"/"+_be+"\"/>";
}
var res="<div id=\"wdgt_ft\" class='wdgt_ft' style='padding:0px; width:100%;"+_ba.style_wdgt_ft()+";'>";
var _c0="10px;";
var _c1="style=\"height:26px;\"";
if(_ba.isIAB&&_ba.marketPlace=="JP"){
_c0="8px";
}
if(_ba.isIAB&&_ba.wdgt_height==150){
var _c2=this.getAmazonLogoDimensions(_ba.marketPlace).height;
var _c3=28-_c2;
res="<div class='wdgt_ft' style='padding:"+_c3+"px 0px 0px 0px; width:100%;"+_ba.style_wdgt_ft()+"'>";
_c1="style=\"height:"+(28-_c3)+"px;\"";
}
res+="<div class='new_ft_cnt'"+_c1+">"+"<a target='_blank' style='color: "+_bd+" !important; width:90px;text-align:left; float: left;' href='"+_amzn_utils.getURL(_amzn_utils.getString(_amzn_utils.AmazonComLink,_ba.marketPlace)+"?",_ba)+"'>"+_bc+"</a> ";
if(!_ba.isIAB||_ba.width>160){
res+="<a target='_blank' onmouseover='' style='float:right; text-align:right;"+_ba.style_wdgt_ft()+";font-size:"+_c0+";padding:2px 0px 0px 0px;' href='"+_amzn_utils.getURL(_amzn_utils.getString(_amzn_utils.PrivacyPolicyLink,_ba.marketPlace),_ba)+"'>"+_amzn_utils.getString(_amzn_utils.PrivacyPolicy,_ba.marketPlace)+"</a>";
}
res+="</div></div>";
return res;
},drawRevampGetWidgetAndEdit:function(_c4,_c5){
var res="";
var _c7=_amzn_utils.getRevampGetWidgetButtonDimensions(_c4.marketPlace);
var _c8="10px;";
if(_c4.isIAB&&_c4.marketPlace=="JP"){
_c8="8px";
}
res+="<table width=\"100%\">"+"<tr style='vertical-align:middle;'>"+"<td align=\"left\">"+"<a target=\"_blank\" style=\"text-decoration: none; clear:left; float: left;\" href=\""+_amzn_utils.getString(_amzn_utils.WebsiteUrl,_c4.marketPlace)+"/"+_c4.getEditWidgetTarget+"\">"+"<img width=\""+_c7.width+"\" height=\""+_c7.height+"\" border=\"0\" align=\"absmiddle\" alt=\""+_amzn_utils.getString(_amzn_utils.GetEditWidgetShort,_c4.marketPlace)+"\""+"src=\""+_amzn_utils.imageDirectory(_c4.marketPlace)+"/"+_c5+"\"/>"+"</a>"+"</td>";
if(_c4.isIAB){
res="<table width=\"100%\">"+"<tr style='vertical-align:middle;'>"+"<td align=\"left\">"+"<a target=\"_blank\" style=\"text-decoration: none; clear:left; float: left;font-size:"+_c8+";color:"+_c4.head_text_color+"\" href=\""+_amzn_utils.getString(_amzn_utils.WebsiteUrl,_c4.marketPlace)+"/"+_c4.getEditWidgetTarget+"\">"+_amzn_utils.getString(_amzn_utils.GetWidgetLong,_c4.marketPlace);
+"</a>"+"</td>";
if(_c4.width<=160&&_c4.isIAB){
res+="<td align=\"right\">";
res+="<a target='_blank' onmouseover='' style='float:right; text-align:right;"+"font-size:"+_c8+";color:"+_c4.head_text_color+";' href='"+_amzn_utils.getURL(_amzn_utils.getString(_amzn_utils.PrivacyPolicyLink,_c4.marketPlace),_c4)+"'>"+_amzn_utils.getString(_amzn_utils.PrivacyPolicy,_c4.marketPlace)+"</a></td>";
}
}
res+="</tr></table>";
return res;
},widgetServerURL:function(_c9){
var _ca=this.getString(this.WSUrl,_c9);
if(typeof isAmznWC!="undefined"&&(isAmznWC==1||isAmznWC=="1")){
_ca=_ca.replace(/^http:\/\//,"https://");
}
return _ca;
},amznMediaserverURL:function(_cb){
var _cc=this.getString(this.WMSUrl,_cb);
if(typeof isAmznWC!="undefined"&&(isAmznWC==1||isAmznWC=="1")){
_cc=_cc.replace(/^http:\/\//,"https://");
}
return _cc;
},imageDirectory:function(_cd){
return this.amznMediaserverURL(_cd)+"/img";
},getURL:function(url,_cf,_d0){
if(url.indexOf("?")==-1){
url+="?";
}
var _d1=_amzn_utils.getString(_amzn_utils.CampaignID,_cf.marketPlace);
if(typeof _d0=="undefined"||_d0==null){
_d0=_cf.creativeId();
}
if(_cf.isWidgetSource&&(_cf.templateId=="8001"||_cf.templateId=="8002")){
_d1=_amzn_utils.getCampaignID(_cf.isWidgetSource,_cf.marketPlace);
}
url+="&camp="+_d1;
url+="&linkCode="+_cf.linkCode+"&tag="+_cf.tag;
url+="&creative="+_d0;
return url;
},ErrorMessage:"ErrorMessage",Price:"Price",Loading:"Loading",Searching:"Searching",PrivacyPolicy:"PrivacyPolicy",NoResultsFor:"NoResultsFor",CustomerReviews:"CustomerReviews",Search:"Search_On_",Showing:"Showing",CampaignID:"CampaignID",AssocImpVIP:"AssocImpVIP",AmazonCom:"AmazonCom",AmazonComLink:"AmazonComLink",PrivacyPolicyLink:"PrivacyPolicyLink",WSUrl:"WidgetServerURL",WMSUrl:"MediaServerURL",WebsiteUrl:"WebsiteUrlURL",GetEditWidgetShort:"GetEditWidgetShort",GetEditWidgetLong:"GetEditWidgetLong",GetWidgetLong:"GetWidgetLong",selectStore:"SelectStore",closeString:"CloseWindow",SortBy:"SortBy",DVD:"DVD",Music:"Music",Book:"Book",Video:"Video",Download:"Download",WatchNow:"WatchNow",Buy:"Buy",Now:"Now",Kindle:"Kindle",MP3:"MP3",Unbox:"Video on Demand",Amazon:"Amazon",NoItemsWishlist:"NoItemsWishlist",DefaultTag:"DefaultTag",WebsiteRefTag:"WebsiteRefTag",WebsiteRefParam:"ref",CompletionVIP:"CompletionVIP",issMktid:"issMktid",getStringForCA:function(key){
switch(key){
case this.ErrorMessage:
return "Could not connect to server. Please try later.";
case this.Price:
return "Price";
case this.Loading:
return "Loading";
case this.Searching:
return "Searching";
case this.PrivacyPolicy:
return "Privacy";
case this.NoResultsFor:
return "No results for"+" ";
case this.CustomerReviews:
return " "+"Reviews";
case this.Search:
return "Search";
case this.GetEditWidgetLong:
return "Get/Edit this widget";
case this.GetEditWidgetShort:
return "Get/Edit widget";
case this.GetWidgetLong:
return "Get Widget";
case this.selectStore:
return "Select an Amazon store";
case this.closeString:
return "Close window";
case this.SortBy:
return "Sort by";
case this.Buy:
return "Buy"+" ";
case this.NoItemsWishlist:
return "No items in the Wish List";
case this.CampaignID:
return "212529";
case this.AssocImpVIP:
return "www.assoc-amazon.ca";
case this.CompletionVIP:
return "completion.amazon.com/search/complete";
case this.issMktid:
return "7";
case this.AmazonCom:
return "Amazon.ca";
case this.AmazonComLink:
return "http://www.amazon.ca/";
case this.PrivacyPolicyLink:
return "http://rcm-ca.amazon.ca/e/cm/privacy-policy.html?o=15";
case this.DefaultTag:
return "amawid-20";
case this.WebsiteRefTag:
return "assoc_wdgt_ca";
case this.WSUrl:
return "http://ws.amazon.ca/widgets";
case this.WMSUrl:
return "http://wms.assoc-amazon.ca/CA";
case this.WebsiteUrl:
return "http://widgets.amazon.ca/";
default:
return "Unknown string";
}
},getStringForDE:function(key){
switch(key){
case this.ErrorMessage:
return "Es konnte keine Verbindung zum Server hergestellt werden. Bitte versuchen Sie es erneut.";
case this.Price:
return "Preis";
case this.Loading:
return "Laden";
case this.Searching:
return "Suchen";
case this.PrivacyPolicy:
return "Information";
case this.NoResultsFor:
return "Keine Suchergebnisse f\xfcr"+" ";
case this.CustomerReviews:
return " "+"Kundenrezensionen";
case this.Search:
return "Suche in";
case this.GetEditWidgetLong:
return "Erhalten/\xc4ndern";
case this.GetEditWidgetShort:
return "Erhalten/\xc4ndern";
case this.GetWidgetLong:
return "Kopieren";
case this.selectStore:
return "Amazon Zielseite ausw\xe4hlen";
case this.closeString:
return "schlie\xdfen";
case this.SortBy:
return "Sortieren nach";
case this.Buy:
return "Kaufen"+" ";
case this.Download:
return "Kaufen";
case this.NoItemsWishlist:
return "Kein Element in der Wunschliste";
case this.CampaignID:
return "2474";
case this.AssocImpVIP:
return "www.assoc-amazon.de";
case this.CompletionVIP:
return "completion.amazon.co.uk/search/complete";
case this.issMktid:
return "4";
case this.AmazonCom:
return "Amazon.de";
case this.AmazonComLink:
return "http://www.amazon.de/";
case this.PrivacyPolicyLink:
return "http://rcm-de.amazon.de/e/cm/privacy-policy.html?o=3";
case this.DefaultTag:
return "amawid0f-21";
case this.WebsiteRefTag:
return "assoc_wdgt_de";
case this.WSUrl:
return "http://ws.amazon.de/widgets";
case this.WMSUrl:
return "http://wms.assoc-amazon.de/DE";
case this.WebsiteUrl:
return "http://widgets.amazon.de/";
default:
return "Unknown string";
}
},getStringForFR:function(key){
switch(key){
case this.ErrorMessage:
return "Connexion au serveur impossible. Veuillez r\xe9essayer plus tard.";
case this.Price:
return "Prix";
case this.Loading:
return "Charger";
case this.Searching:
return "Rechercher";
case this.PrivacyPolicy:
return "Plus d'info";
case this.NoResultsFor:
return "Aucun r\xe9sultat ne correspond \xe0 votre recherche de"+" ";
case this.CustomerReviews:
return " "+"\xc9valuations";
case this.Search:
return "Rechercher";
case this.GetEditWidgetLong:
return "Copier/Editer";
case this.GetEditWidgetShort:
return "Copier/Editer";
case this.GetWidgetLong:
return "Copier";
case this.selectStore:
return "S\xe9lectionner un site Amazon";
case this.closeString:
return "Fermer";
case this.SortBy:
return "Trier par";
case this.Buy:
return "Acheter";
case this.Download:
return "Ajouter";
case this.NoItemsWishlist:
return "Nombre de produits dans la liste Envies Cadeaux";
case this.CampaignID:
return "2498";
case this.AssocImpVIP:
return "www.assoc-amazon.fr";
case this.AmazonCom:
return "Amazon.fr";
case this.CompletionVIP:
return "completion.amazon.co.uk/search/complete";
case this.issMktid:
return "5";
case this.AmazonComLink:
return "http://www.amazon.fr/";
case this.PrivacyPolicyLink:
return "http://rcm-fr.amazon.fr/e/cm/privacy-policy.html?o=8";
case this.DefaultTag:
return "amawid0b-21";
case this.WebsiteRefTag:
return "assoc_wdgt_fr";
case this.WSUrl:
return "http://ws.amazon.fr/widgets";
case this.WMSUrl:
return "http://wms.assoc-amazon.fr/FR";
case this.WebsiteUrl:
return "http://widgets.amazon.fr/";
default:
return "Unknown string";
}
},getStringForGB:function(key){
switch(key){
case this.ErrorMessage:
return "Could not connect to server. Please try later.";
case this.Price:
return "Price";
case this.Loading:
return "Loading";
case this.Searching:
return "Searching";
case this.PrivacyPolicy:
return "Privacy";
case this.NoResultsFor:
return "No results for"+" ";
case this.CustomerReviews:
return " "+"Reviews";
case this.Search:
return "Search";
case this.GetEditWidgetLong:
return "Get/Edit this widget";
case this.GetEditWidgetShort:
return "Get/Edit widget";
case this.GetWidgetLong:
return "Get Widget";
case this.selectStore:
return "Select an Amazon store";
case this.closeString:
return "Close window";
case this.SortBy:
return "Sort by";
case this.Buy:
return "Buy"+" ";
case this.Download:
return "Download";
case this.NoItemsWishlist:
return "No items in the Wish List";
case this.CampaignID:
return "2486";
case this.AssocImpVIP:
return "www.assoc-amazon.co.uk";
case this.AmazonCom:
return "Amazon.co.uk";
case this.CompletionVIP:
return "completion.amazon.co.uk/search/complete";
case this.issMktid:
return "3";
case this.AmazonComLink:
return "http://www.amazon.co.uk/";
case this.PrivacyPolicyLink:
return "http://rcm-uk.amazon.co.uk/e/cm/privacy-policy.html?o=2";
case this.DefaultTag:
return "amawid-21";
case this.WebsiteRefTag:
return "assoc_wdgt_gb";
case this.WSUrl:
return "http://ws.amazon.co.uk/widgets";
case this.WMSUrl:
return "http://wms.assoc-amazon.co.uk/GB";
case this.WebsiteUrl:
return "http://widgets.amazon.co.uk/";
default:
return "Unknown string";
}
},getStringForJP:function(key){
switch(key){
case this.ErrorMessage:
return "\u30b5\u30fc\u30d0\u30fc\u306b\u63a5\u7d9a\u3067\u304d\u307e\u305b\u3093\u3002\u3000\u6642\u9593\u3092\u7f6e\u3044\u3066\u518d\u5ea6\u304a\u8a66\u3057\u304f\u3060\u3055\u3044\u3002";
case this.Price:
return "\u4fa1\u683c";
case this.Loading:
return "\u8aad\u307f\u8fbc\u307f\u4e2d";
case this.Searching:
return "\u691c\u7d22\u4e2d";
case this.PrivacyPolicy:
return "\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u898f\u7d04";
case this.NoResultsFor:
return " "+"\u306b\u8a72\u5f53\u3059\u308b\u3082\u306e\u306f\u3042\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002";
case this.CustomerReviews:
return " "+"\u30ec\u30d3\u30e5\u30fc";
case this.Search:
return "\u30b5\u30fc\u30c1";
case this.GetEditWidgetLong:
return "\u30a6\u30a3\u30b8\u30a7\u30c3\u30c8\u306e\u53d6\u5f97/\u7de8\u96c6";
case this.GetEditWidgetShort:
return "\u30a6\u30a3\u30b8\u30a7\u30c3\u30c8\u306e\u53d6\u5f97/\u7de8\u96c6";
case this.GetWidgetLong:
return "\u3053\u306e\u30ea\u30f3\u30af\u3092\u8cbc\u308b";
case this.selectStore:
return "\u30a2\u30de\u30be\u30f3\u30b9\u30c8\u30a2\u3092\u9078\u3093\u3067\u304f\u3060\u3055\u3044";
case this.closeString:
return "\u9589\u3058\u308b";
case this.SortBy:
return "\u4e26\u3073\u66ff\u3048";
case this.Buy:
return "\u4eca\u3059\u3050\u8cb7\u3046"+" ";
case this.NoItemsWishlist:
return "\u30a6\u30a3\u30c3\u30b7\u30e5\u30ea\u30b9\u30c8\u306b\u5546\u54c1\u304c\u3042\u308a\u307e\u305b\u3093";
case this.CampaignID:
return "759";
case this.AssocImpVIP:
return "www.assoc-amazon.jp";
case this.AmazonCom:
return "Amazon.co.jp";
case this.CompletionVIP:
return "completion.amazon.co.jp/search/complete";
case this.issMktid:
return "6";
case this.AmazonComLink:
return "http://www.amazon.jp/";
case this.PrivacyPolicyLink:
return "http://rcm-jp.amazon.co.jp/e/cm/privacy-policy.html?o=9";
case this.DefaultTag:
return "widgetsamazon-22";
case this.WebsiteRefTag:
return "assoc_wdgt_jp";
case this.WSUrl:
return "http://ws.amazon.co.jp/widgets";
case this.WMSUrl:
return "http://wms.assoc-amazon.jp/JP";
case this.WebsiteUrl:
return "http://widgets.amazon.co.jp/";
default:
return "Unknown string";
}
},getStringForUS:function(key){
switch(key){
case this.ErrorMessage:
return "Could not connect to server. Please try later.";
case this.Price:
return "Price";
case this.Loading:
return "Loading";
case this.Searching:
return "Searching";
case this.PrivacyPolicy:
return "Privacy";
case this.NoResultsFor:
return "No results for"+" ";
case this.CustomerReviews:
return " "+"Reviews";
case this.Search:
return "Search";
case this.GetEditWidgetLong:
return "Get/Edit this widget";
case this.GetEditWidgetShort:
return "Get/Edit widget";
case this.GetWidgetLong:
return "Get Widget";
case this.selectStore:
return "Select an Amazon store";
case this.closeString:
return "Close window";
case this.SortBy:
return "Sort by";
case this.NoItemsWishlist:
return "No items in the Wish List";
case this.Buy:
return "Buy"+" ";
case this.Now:
return "Now";
case this.Amazon:
return "Amazon ";
case this.Download:
return "Download";
case this.WatchNow:
return "WatchNow";
case this.Music:
return "CD";
case this.DVD:
return "DVD";
case this.Book:
return "Book";
case this.Video:
return "Video";
case this.Kindle:
return "Kindle";
case this.MP3:
return "MP3";
case this.Unbox:
return "Video on Demand";
case this.CampaignID:
return "212361";
case this.AssocImpVIP:
return "www.assoc-amazon.com";
case this.CompletionVIP:
return "completion.amazon.com/search/complete";
case this.issMktid:
return "1";
case this.AmazonCom:
return "Amazon.com";
case this.AmazonComLink:
return "http://www.amazon.com/";
case this.PrivacyPolicyLink:
return "http://rcm.amazon.com/e/cm/privacy-policy.html?o=1";
case this.DefaultTag:
return "widgetsamazon-20";
case this.WebsiteRefTag:
return "assoc_wdgt_us";
case this.WSUrl:
return "http://ws.amazon.com/widgets";
case this.WMSUrl:
return "http://wms.assoc-amazon.com/US";
case this.WebsiteUrl:
return "http://widgets.amazon.com/";
default:
return "Unknown string";
}
},getString:function(key,_d9){
switch(_d9){
case "CA":
return this.getStringForCA(key);
case "DE":
return this.getStringForDE(key);
case "FR":
return this.getStringForFR(key);
case "JP":
return this.getStringForJP(key);
case "GB":
return this.getStringForGB(key);
default:
return this.getStringForUS(key);
}
},trimMultiLineComments:function(_da,_db,_dc,_dd,_de){
if(typeof _da=="string"){
_da=[_da];
}
if(_da.length<1){
return _da;
}
if(!_dd){
_dd=1;
}
var _df=_da[0];
for(var i=1;i<_da.length;i++){
_df+="<br/>"+_da[i];
}
_df=_df.replace(/&nbsp;/gi,"&nbsp;<wbr/>");
var _e1;
if(_dd==-1){
_e1=_amzn_utils.splitTextBlock(_df,_db,_dc,false,_de);
}else{
_e1=_amzn_utils.trimTextBlock(_df,_db,_dc,_dd,false,_de);
}
return _e1;
},trimCharsByWidth:function(_e2,_e3,_e4,_e5,_e6){
if(typeof _e2=="string"){
_e2=[_e2];
}
if(_e2.length<1){
return _e2;
}
if(!_e5){
_e5=1;
}
var _e7=_e2[0];
for(var i=1;i<_e2.length;i++){
if(i%2==0){
_e7+=" "+_e2[i];
}else{
_e7+="<b> "+_e2[i]+" </b>";
}
}
_e7=_e7.replace(/&nbsp;/gi,"&nbsp;<wbr/>");
var _e9=_e2.length>1;
var _ea;
if(_e5==-1){
_ea=_amzn_utils.splitTextBlock(_e7,_e3,_e4,_e9,_e6);
}else{
_ea=_amzn_utils.trimTextBlock(_e7,_e3,_e4,_e5,_e9,_e6);
}
return _ea;
},getValidTextBoundary:function(txt,_ec){
if(_ec>=txt.length){
return txt.length;
}
var _ed=txt.substring(0,_ec);
var _ee=_ec;
var _ef=_ed.lastIndexOf("<");
if(_ef!=-1){
var _f0=_ed.lastIndexOf("<br/>");
var _f1=_ed.lastIndexOf("<wbr/>");
var _f2=_ed.lastIndexOf("<b>");
var _f3=_ed.lastIndexOf("</b>");
if(_ef>_f0&&_ef>_f1&&_ef>_f2&&_ef>_f3){
_ee=_ef;
_ed=txt.substring(0,_ee);
}
}
var _f4=_ed.lastIndexOf("&");
if(_f4!=-1){
var _f5=_ed.lastIndexOf(";");
if(_f4>_f5){
_ee=_f4;
}
}
return _ee;
},getClosingTags:function(txt,_f7){
if(!_f7){
return "";
}
var _f8=txt.lastIndexOf("<b>");
var _f9=txt.lastIndexOf("</b>");
var _fa="";
if(_f9<_f8){
_fa="</b>";
}
return _fa;
},limitedIndexOf:function(txt,_fc){
var _fd=15;
var _fe=0;
var _ff=false;
while(_fe<txt.length&&_fe<_fd){
if(txt.charAt(_fe)==_fc){
_ff=true;
break;
}
_fe++;
}
if(!_ff){
_fe=-1;
}
return _fe;
},htmlCharAt:function(txt,_101){
var _102="";
var _103=txt.charAt(_101);
switch(_103){
case "<":
_102=">";
break;
case "&":
_102=";";
break;
}
if(_102!=""){
var _104=txt.substring(_101);
var _105=_amzn_utils.limitedIndexOf(_104,_102);
if(_105!=-1){
_103=_104.substring(0,_105+1);
}
}
return _103;
},calculateBlockHeight:function(text,_107,_108,_109,self){
var _10b=_amzn_utils.getDivId("amzn_wdgts_calculateBlockHeight",self);
var _10c=_amzn_utils.getProcessingDiv(_10b,_107);
if(self.marketPlace=="JP"){
_10c.innerHTML="Apple iPod classic 120GB \u30d6\u30e9\u30c3\u30af";
}else{
_10c.innerHTML="";
}
var _10d=_10c.offsetHeight;
var _10e=text;
if(_109){
_10e=_amzn_utils.replaceAll(_10e,"<b>","");
_10e=_amzn_utils.replaceAll(_10e,"</b>","");
}
_10e=_amzn_utils.replaceAll(_10e,"<br/>","");
_10e=_amzn_utils.replaceAll(_10e,"<wbr/>","");
var _10f=0;
var _110=20;
while(_10e.length>0){
var _111=_110<_10e.length?_110:_10e.length;
_111=_amzn_utils.getValidTextBoundary(_10e,_111);
var _112=_10e.substring(0,_111);
if(_109){
_10c.innerHTML="<b>"+_112+"</b>";
}else{
_10c.innerHTML=_112;
}
if(_10c.offsetHeight>_10f){
_10f=_10c.offsetHeight;
}
_10e=_10e.substring(_111);
}
var _113=0;
if(_10f-2>_10d){
_10f=_10f-_10d;
_113=_10f*_108-_10d;
}else{
_113=_10f*_108;
}
return _113;
},getTextHeightAndWidth:function(text,font,_116,_117,_118,self){
if(!text||text==""){
return [0,0];
}
var _11a=_amzn_utils.getDivId("amzn_wdgts_trimTextBlock",self);
var pDiv=_amzn_utils.getProcessingDiv(_11a,_116);
pDiv.className=_118;
pDiv.style.font=font;
pDiv.style.fontSize=parseInt(_116)+"px";
if(_117){
pDiv.style.fontWeight="bold";
}
pDiv.style.padding="0px 0px 0px 0px";
pDiv.innerHTML=text;
ret=[pDiv.offsetHeight,pDiv.offsetWidth];
pDiv.className="";
return ret;
},trimTextBlock:function(text,_11d,_11e,_11f,_120,self){
if(!text||text==""){
return text;
}
var _122=_amzn_utils.getDivId("amzn_wdgts_trimTextBlock",self);
var _123=_amzn_utils.getProcessingDiv(_122,_11d);
_123.style.width=_11e+"px";
_123.innerHTML="X";
var _124=_123.scrollWidth;
var _125=_amzn_utils.calculateBlockHeight(text,_11d,_11f,false,self);
if(_120){
var _126=_amzn_utils.calculateBlockHeight(text,_11d,_11f,true,self);
if(_126>_125){
_125=_126;
}
}
if(_125<=0){
return "";
}
var _127=text;
_123.innerHTML=_127;
var _128=_127.length;
while(_123.offsetHeight>_125){
var _129=_123.offsetHeight/_125;
var _12a=Math.round((_127.length)/_129);
_12a=_amzn_utils.getValidTextBoundary(_127,_12a);
if(_12a==_128){
break;
}
_128=_12a;
_127=_127.substring(0,_12a);
_123.innerHTML=_127+_amzn_utils.getClosingTags(_127,_120);
}
for(var i=_127.length;i<text.length;i++){
var temp=_amzn_utils.htmlCharAt(text,i);
i+=temp.length-1;
_123.innerHTML=_127+temp+_amzn_utils.getClosingTags(_127+temp,_120)+"&hellip;";
if(_123.scrollWidth>_124){
temp=" "+temp;
_123.innerHTML=_127+temp+_amzn_utils.getClosingTags(_127+temp,_120)+"&hellip;";
}
if(_123.offsetHeight>_125){
_127=_127+_amzn_utils.getClosingTags(_127,_120)+"&hellip;";
break;
}
_127+=temp;
}
_127=_127+_amzn_utils.getClosingTags(_127,_120);
_127=_amzn_utils.splitTextBlock(_127,_11d,_11e,_120,self);
_123.innerHTML=_127;
if(_123.offsetHeight>_125){
_123.innerHTML=_127+"&hellip;";
var _12a=_127.length;
while(_12a>0&&(_123.offsetHeight>_125||_123.scrollWidth>_124)){
_12a--;
_12a=_amzn_utils.getValidTextBoundary(_127,_12a);
_127=_127.substring(0,_12a);
_123.innerHTML=_127+_amzn_utils.getClosingTags(_127,_120)+"&hellip;";
}
_127=_127+_amzn_utils.getClosingTags(_127,_120)+"&hellip;";
}
return _127;
},setDivText:function(tdiv,text,_12f){
var temp=_amzn_utils.getClosingTags(text,_12f);
tdiv.innerHTML=text+temp;
return temp!="";
},splitTextBlock:function(text,_132,_133,_134,self){
if(!text||text==""){
return text;
}
var _136=_amzn_utils.getDivId("amzn_wdgts_splitTextBlock",self);
var _137=_amzn_utils.getProcessingDiv(_136,_132);
_137.style.width=_133+"px";
_137.innerHTML="";
var _138=_137.offsetHeight;
_137.innerHTML="X";
var _139=_137.offsetHeight;
var _13a=_137.scrollWidth;
_137.innerHTML=text;
if(_137.scrollWidth<=_13a){
return text;
}
var _13b=Math.floor(_133/20);
_137.innerHTML="";
var _13c="";
var _13d=false;
var _13e=_amzn_utils.getLineEndIndex(text,0,_13b,_132,_133,_134,_13d,self);
_13c=text.substring(0,_13e);
_13d=_amzn_utils.setDivText(_137,_13c,_134);
var _13f=_amzn_utils.getLineEndIndex(text,_13e,_13b,_132,_133,_134,_13d,self);
while(_13f>0&&_13f>_13e){
var temp=text.substring(_13e,_13f);
_13d=_amzn_utils.setDivText(_137,_13c+temp,_134);
if(_137.scrollWidth>_13a){
temp=" "+temp;
_amzn_utils.setDivText(_137,_13c+temp,_134);
}
_13b=_13f-_13e;
_13e=_13f;
_13c=_13c+temp;
_13f=_amzn_utils.getLineEndIndex(text,_13e,_13b,_132,_133,_134,_13d,self);
}
return _13c+_amzn_utils.getClosingTags(_13c,_134);
},getLineEndIndex:function(txt,_142,_143,_144,_145,_146,_147,self){
var _149=_amzn_utils.getDivId("amzn_wdgts_getLineText",self);
var _14a=_amzn_utils.getProcessingDiv(_149,_144);
var _14b=_142+_143+1;
var bold="";
if(_147){
bold="<b>";
}
if(txt.length<_14b){
_amzn_utils.setDivText(_14a,bold+txt.substring(_142),_146);
_14b=txt.length;
}else{
_amzn_utils.setDivText(_14a,bold+txt.substring(_142,_14b),_146);
}
var _14d=_14a.offsetHeight;
for(;_14b<txt.length&&_14a.offsetWidth<_145&&_14a.offsetHeight<=_14d;_14b++){
var temp=_amzn_utils.htmlCharAt(txt,_14b);
_14b+=temp.length-1;
_amzn_utils.setDivText(_14a,bold+_14a.innerHTML+temp,_146);
}
_14b=(_14b<txt.length)?_14b:txt.length;
_14b=_amzn_utils.getValidTextBoundary(txt.substring(_142),_14b-_142)+_142;
while(_14a.offsetWidth>_145&&_14b>0){
_14b--;
_14b=_amzn_utils.getValidTextBoundary(txt.substring(_142),_14b-_142)+_142;
_amzn_utils.setDivText(_14a,bold+txt.substring(_142,_14b),_146);
}
return _14b;
},getProcessingDiv:function(id,_150){
var pDiv=document.getElementById(id);
var _152=true;
if(!pDiv){
_152=false;
pDiv=document.createElement("div");
pDiv.id=id;
}
pDiv.style.padding="0 5px 0 5px";
pDiv.style.visibility="hidden";
pDiv.style.clear="both";
pDiv.style.position="absolute";
pDiv.style.left="0px";
pDiv.style.top="0px";
pDiv.style.overflow="auto";
pDiv.style.font="100% Verdana, Arial, Helvetica, sans-serif";
pDiv.style.lineHeight="normal";
pDiv.style.fontSize=parseInt(_150)+"px";
pDiv.style.height=null;
pDiv.style.width=null;
if(/bold/.test(_150)){
pDiv.style.fontWeight="bold";
}
if(!_152){
document.body.appendChild(pDiv);
}
return pDiv;
},getDivId:function(_153,self){
return _153+self.marketPlace+self.templateId+self.instanceId;
},addHiddenInputField:function(_155,_156,_157){
var _158=document.createElement("input");
_158.setAttributeNode(this.createHtmlAttribute("type","hidden"));
_158.setAttributeNode(this.createHtmlAttribute("name",_156));
_158.setAttributeNode(this.createHtmlAttribute("value",_157));
_155.appendChild(_158);
},createHtmlAttribute:function(name,_15a){
var _15b=document.createAttribute(name);
_15b.nodeValue=_15a;
return _15b;
},addHtmlForm:function(_15c){
var _15d=document.createElement("form");
_15d.method="POST";
_15d.action=_15c;
var body=document.getElementsByTagName("body")[0];
body.appendChild(_15d);
return _15d;
},getValidParam:function(_15f,_160){
if(typeof _15f=="undefined"||_15f==null){
return _160;
}
return _15f;
},encodetoJSON:function(obj){
var pad=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _165=function(s){
if(/["\\\x00-\x1f]/.test(s)){
return "\""+s.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+s+"\"";
};
var _16a=function(o){
var a=["["],b,i,l=o.length,v;
for(i=0;i<l;i+=1){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(v===null?"null":_amzn_utils.encodetoJSON(v));
b=true;
}
}
a.push("]");
return a.join("");
};
var _171=function(o){
return "\""+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+"\"";
};
if(typeof obj=="undefined"||obj===null){
return "null";
}else{
if(obj instanceof Array){
return _16a(obj);
}else{
if(obj instanceof Date){
return _171(obj);
}else{
if(typeof obj=="string"){
return _165(obj);
}else{
if(typeof obj=="number"){
return isFinite(obj)?String(obj):"null";
}else{
if(typeof obj=="boolean"){
return String(obj);
}else{
var a=["{"],b,v;
for(var i in obj){
if(_amzn_utils.objHasOwnProperty(obj,i)){
v=obj[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(_amzn_utils.encodetoJSON(i),":",v===null?"null":_amzn_utils.encodetoJSON(v));
b=true;
}
}
}
a.push("}");
return a.join("");
}
}
}
}
}
}
}};
function initOnloadFunctions(){
if(typeof (window.addEventListener)!="undefined"){
window.addEventListener("load",main,false);
}else{
var _177=window.onload;
var _178=main;
window.onload=function(){
if(typeof _177=="function"){
_177();
}
_178();
};
}
}
if(typeof amzn_wdgts_vars=="undefined"){
amzn_wdgts_vars=new Array();
}
if(typeof amzn_wdgt=="undefined"){
amzn_wdgt={};
}
if(typeof amzn_wdgt.templateId=="undefined"){
amzn_wdgt.templateId=null;
}
if(typeof amzn_wdgt.marketPlace=="undefined"){
amzn_wdgt.marketPlace="US";
}
if(typeof amzn_wdgts_vars[amzn_wdgt.marketPlace]=="undefined"){
amzn_wdgts_vars[amzn_wdgt.marketPlace]=new Array();
}
if(typeof amzn_wdgts_vars[amzn_wdgt.marketPlace][amzn_wdgt.templateId]=="undefined"){
amzn_wdgts_vars[amzn_wdgt.marketPlace][amzn_wdgt.templateId]=new Array();
}
if(typeof amzn_wdgt.displayTemplate=="undefined"){
amzn_wdgt.displayTemplate="1";
}
var instanceId=amzn_wdgts_vars[amzn_wdgt.marketPlace][amzn_wdgt.templateId].length;
var divId="amazon_widget_"+amzn_wdgt.marketPlace+"_"+amzn_wdgt.templateId+"_"+instanceId;
if(typeof amzn_wdgt.width=="undefined"){
amzn_wdgt.width=0;
}
if(typeof amzn_wdgt.tag=="undefined"){
amzn_wdgt.tag=_amzn_utils.getString(_amzn_utils.DefaultTag,amzn_wdgt.marketPlace);
}
amzn_wdgt.refURL=escape(document.location).replace(/[+]/g,"%2B");
if(typeof wsPreview=="undefined"){
document.write("<div class='"+divId+"' id='"+divId+"'></div>");
}else{
var displayDiv=document.createElement("div");
displayDiv.id="amazon_widget_"+amzn_wdgt.marketPlace+"_"+amzn_wdgt.templateId+"_0";
document.getElementById("preview_section_demo").appendChild(displayDiv);
}
amzn_wdgt.instanceId=instanceId;
amzn_wdgt.isTaken=false;
amzn_wdgts_vars[amzn_wdgt.marketPlace][amzn_wdgt.templateId].push(_amzn_utils.clone(amzn_wdgt));
var x=amzn_wdgts_vars[amzn_wdgt.marketPlace][amzn_wdgt.templateId][amzn_wdgts_vars[amzn_wdgt.marketPlace][amzn_wdgt.templateId].length-1];
var startTimestamp=new Date().getTime();
var initUnloadFunction=function(_179,_17a){
function amznWidgetsUnload(_17b,_17c){
if(typeof _17b.hasLoaded=="undefined"){
var _17d=new Date().getTime();
var _17e=_17d-_17c;
var img=document.createElement("IMG");
img.style.width="1px";
img.style.height="1px";
img.style.border="none";
img.src=_amzn_utils.imageDirectory(_17b.marketPlace)+"/transparent-pixel.gif?"+"locale="+_17b.marketPlace+"&tag="+_17b.tag+"&templateId="+_17b.templateId+"&instanceId="+_17b.instanceId+"&ID="+(typeof _17b.ID!="undefined"?_17b.ID:"NOID")+"&timeSpent="+_17e+"&serviceVersion="+_17b.serviceVersion;
document.body.appendChild(img);
}
}
if(typeof (window.addEventListener)!="undefined"){
window.addEventListener("unload",function(){
amznWidgetsUnload(_179,_17a);
},false);
}else{
var _180=window.onunload;
window.onunload=function(){
if(typeof _180=="function"){
_180();
}
amznWidgetsUnload(_179,_17a);
};
}
};
initUnloadFunction(x,startTimestamp);
if(typeof _amzn_popup=="undefined"){
if(typeof wsPreview=="undefined"){
document.writeln("<script src=\""+_amzn_utils.amznMediaserverURL(amzn_wdgt.marketPlace)+"/js/popup.js\" > </script>");
}else{
var popover=document.createElement("script");
popover.src=_amzn_utils.amznMediaserverURL(amzn_wdgt.marketPlace)+"/js/popup.js";
document.body.appendChild(popover);
}
}
if(!(typeof Nifty=="function"&&typeof NiftyCheck=="function")){
if(typeof wsPreview=="undefined"){
document.writeln("<script src=\""+_amzn_utils.amznMediaserverURL(amzn_wdgt.marketPlace)+"/js/nifty.js\" > </script>");
}else{
var nifty=document.createElement("script");
nifty.src=_amzn_utils.amznMediaserverURL(amzn_wdgt.marketPlace)+"/js/nifty.js";
document.body.appendChild(nifty);
}
}
if(!(typeof Color=="function"&&typeof RGB=="function")){
if(typeof wsPreview=="undefined"){
document.writeln("<script src=\""+_amzn_utils.amznMediaserverURL(amzn_wdgt.marketPlace)+"/js/colors.js\" > </script>");
}else{
var colors=document.createElement("script");
colors.src=_amzn_utils.amznMediaserverURL(amzn_wdgt.marketPlace)+"/js/colors.js";
document.body.appendChild(colors);
}
}
function main(){
var wdgt={getReviewImage:function(_182){
return _amzn_utils.getRatingImage(_182);
},trimCharsByWidth:function(text,_184,_185,_186){
return _amzn_utils.trimCharsByWidth(text,_184,_185,_186,this);
},amazon_generate_widgets_url:function(){
this.numberOfCalls++;
var url=_amzn_utils.widgetServerURL(this.marketPlace)+"/q?"+"Operation=GetResults"+"&URL="+this.refURL+"&InstanceId="+this.instanceId+"&ResponseCount=20"+"&ItemPage="+this.numberOfCalls+"&OmakaseItemCount="+this.omakaseItemCount+"&TemplateId="+this.templateId+"&ServiceVersion="+this.serviceVersion+"&MarketPlace="+this.marketPlace;
if(this.category&&this.category!="All"){
url+="&CategoryRestriction="+this.category;
}
return url;
},getMoreResults:function(){
var res=document.createElement("script");
res.charset="utf-8";
res.src=this.amazon_generate_widgets_url();
document.body.appendChild(res);
},topseller_display_callback:function(data,_18a){
var _18b;
this.hasMoreItems=data.HasMoreItems;
if(this.numberOfCalls==1){
this.omakaseItemCount=data.OmakaseItemCount;
}
if(this.numberOfCalls==1||_18a){
this.resultData=data;
this.topsellers=data.results;
var res="";
this.mergeTemplate();
var _18d=_amzn_utils.$("amazon_widget_"+this.marketPlace+"_"+this.templateId+"_"+this.instanceId);
_18b=_amzn_utils.getById("wdgt_brdr",_18d);
var _18e=_amzn_utils.getById("amzn_wdgt_t_8006_"+this.instanceId,_18d);
var temp=_18e.style.height;
_18e.style.height=null;
this.maxCloudHeight=this.height-_18e.offsetHeight;
_18e.style.height=temp;
_18b.style.height=this.maxCloudHeight+"px";
_amzn_utils.runPNGTransparencyHack(_18d);
if(this.curvedCorners){
this.curveCorners();
}
}else{
for(var i=0;i<data.results.length;i++){
this.topsellers[this.topsellers.length]=data.results[i];
}
var _18d=_amzn_utils.$("amazon_widget_"+this.marketPlace+"_"+this.templateId+"_"+this.instanceId);
_18b=_amzn_utils.getById("wdgt_brdr",_18d);
}
_18b.innerHTML=this.getCloud(this.topsellers,this.maxCloudHeight);
if(typeof loadComplete=="function"){
loadComplete("topseller");
}
},callWebService:function(){
var res=document.createElement("script");
res.charset="utf-8";
res.src=this.amazon_generate_widgets_url();
document.body.appendChild(res);
},getSplitTitle:function(_192){
return this.trimCharsByWidth(_192,this.titleFontSize+"bold",this.width,-1);
},resultWindowSize:5,serviceVersion:"",getEditWidgetTarget:"Amazon-Product-Cloud-Widget/",refURL:null,showTitle:false,innerWidth:300,width:450,height:450,category:"All",backgroundColor:"#FFFFFF",cloudTextColor:"#0000FF",cloudFont:"Verdana",popoverBorderColor:"#FFFFFF",hoverTextColor:"#003399",hoverBackgroundColor:"#E0A366",titleTextColor:"#FFFFFF",title:"Product Cloud - Top",titleFont:"Verdana",titleFontSize:"13px",showTitle:true,cloudFontSize:"13px",showAmazonLogoAsText:false,curvedCorners:true,curveTheseCorners:" tl tr bl br big ",resultData:null,totalNumOfResults:null,numberOfCalls:0,omakaseItemCount:0,hasMoreItems:false,maxCloudHeight:0,totalItemsPerPage:0,currentPage:1,navBarBeginPage:1,navBarEndPage:0,instanceId:0,requestSize:0,templateId:"8006",tag:"",linkCode:"wpc",ccmid:"380609",campaignId:"212361",mergeTemplate:function(){
_amzn_popup.init();
var _193=this.drawOutlineBox();
var _194=_amzn_utils.$("amazon_widget_"+this.marketPlace+"_"+this.templateId+"_"+this.instanceId);
_194.innerHTML=_193;
},curveCorners:function(){
Nifty("div#amzn_wdgt_t_8006_"+this.instanceId,"transparent"+this.curveTheseCorners);
},getBlankTile:function(){
return "&nbsp;<wbr/>";
},getBackgroundColor:function(){
return this.backgroundColor;
},drawFooter:function(){
return _amzn_utils.drawFooter(this);
},drawOutlineBox:function(){
if(!window.nextCallBack){
window.nextCallBack=new Object();
}
if(!window.nextCallBack[this.marketPlace]){
window.nextCallBack[this.marketPlace]=new Object();
}
if(!window.nextCallBack[this.marketPlace][this.templateId]){
window.nextCallBack[this.marketPlace][this.templateId]=new Object();
}
if(!window.nextCallBack[this.marketPlace][this.templateId][this.instanceId]){
window.nextCallBack[this.marketPlace][this.templateId][this.instanceId]=new Object();
}
window.nextCallBack[this.marketPlace][this.templateId][this.instanceId]["goOnClick"]=this.goOnClick;
var _195=this.innerWidth;
var _196="<div id='amzn_wdgt_t_8006_"+this.instanceId+"' class='amzn_wdgt' "+"style='"+this.style_amzn_wdgt()+"'>";
if(this.showTitle){
_196+="<div style='"+this.style_wdgt_hd()+"'>"+this.getSplitTitle(this.title)+"</div>";
}
_196+="<div id='wdgt_brdr'></div>"+this.drawFooter()+"</div>";
return _196;
},getCloudFontSize:function(rank,_198){
if(_198<2){
return this.cloudFontSize;
}
var f=this.cloudFontSize;
var _19a=f-f*0.3;
var _19b=_19a+(2*f*0.3)*(_198-rank)/(_198-1);
_19b=_19b.toFixed(2);
return _19b;
},getCloudTiles:function(_19c,_19d){
var _19e="";
for(var _19f=0;_19f<_19c.length;_19f++){
var _1a0=this.getTile(_19c[_19f],_19d[""+_19c[_19f].ASIN],_19c.length);
if(_19f>0){
_1a0=this.getBlankTile()+_1a0;
}
_19e+=_1a0;
}
return _19e;
},getCloud:function(_1a1,_1a2){
var _1a3="amzm_wdgt_getCloud"+this.marketPlace+this.templateId+this.instanceId;
var _1a4=document.getElementById(_1a3);
if(typeof _1a4=="undefined"||_1a4==null){
_1a4=document.createElement("DIV");
_1a4.id=_1a3;
_1a4.style.visibility="hidden";
_1a4.style.textAlign="left";
_1a4.style.backgroundColor="black";
_1a4.className="amzn_wdgt_cloud";
_1a4.style.top="0px";
_1a4.style.left="0px";
_1a4.style.position="absolute";
_1a4.style.paddingTop=this.wdgt_pad_top+"px";
_1a4.style.paddingRight=this.wdgt_pad_right+"px";
_1a4.style.paddingBottom=this.wdgt_pad_bottom+"px";
_1a4.style.paddingLeft=this.wdgt_pad_left+"px";
document.body.appendChild(_1a4);
}
_1a4.style.lineHeight=Math.ceil(this.cloudFontSize*1.75)+"px";
_1a4.className="amzn_wdgt_cloud";
if(_amzn_utils.amzn_isMSIE()){
_1a4.style.width=this.width+"px";
}else{
_1a4.style.width=(this.width-this.wdgt_pad_right-this.wdgt_pad_left)+"px";
}
if(_amzn_utils.amzn_isMSIE()){
_1a2=_1a2-this.wdgt_pad_top-this.wdgt_pad_bottom;
}
var _1a5=new Array();
for(var i=_1a1.length-1;i>=0;i--){
_1a5[""+_1a1[i].ASIN]=i+1;
}
var _1a7=function(a,b){
if(a.Title<b.Title){
return -1;
}
if(a.Title>b.Title){
return 1;
}
return 0;
};
var _1aa=_1a1.length;
var _1ab=_1aa+1;
var _1ac=_amzn_utils.clone(_1a1);
_1ac=_1ac.sort(_1a7);
var _1ad=this.getCloudTiles(_1ac,_1a5);
_1a4.innerHTML=_1ad;
var _1ae=_1a4.offsetHeight>=_1a2;
while(_1a4.offsetHeight>_1a2&&_1ab!=_1aa){
_1ab=_1aa;
var _1af=_1a4.offsetHeight/_1a2;
_1aa=Math.floor(_1aa/_1af);
_1ac=_1a1.slice(0,_1aa);
_1ac=_1ac.sort(_1a7);
_1ad=this.getCloudTiles(_1ac,_1a5);
_1a4.innerHTML=_1ad;
}
if((_1ae&&_1aa>0)||this.numberOfCalls>10||this.hasMoreItems=="false"){
var _1b0=0;
if(_1a4.offsetHeight<_1a2){
_1aa=_1aa+1;
for(;_1aa<=_1a1.length;_1aa++){
_1ac=_1a1.slice(0,_1aa);
_1ac=_1ac.sort(_1a7);
var temp=_1ad;
_1ad=this.getCloudTiles(_1ac,_1a5);
_1a4.innerHTML=_1ad;
if(_1a4.offsetHeight>_1a2){
_1a4.innerHTML=temp;
_1ad=temp;
break;
}
}
_1b0=Math.round((_1a2-_1a4.offsetHeight)/2);
}
_1ad="<div class=\"amzn_wdgt_cloud\" style=\"position: relative; text-align:left; "+" top: "+_1b0+"px; line-height: "+Math.ceil(this.cloudFontSize*1.75)+"px; \">"+_1ad+"</div>";
}else{
this.getMoreResults();
_1ad="<div class=\"amzn_wdgt_cloud\" align=\"center\" style=\"position: relative; "+" top: "+(_1a2-58)/2+"px; line-height: "+Math.ceil(this.cloudFontSize*1.75)+"px; \">"+"<div class='message' id='loading' style='background-image: url(\""+_amzn_utils.imageDirectory(this.marketPlace)+"/round.gif\");color:black;text-align:center;height: 59px;width: 100px;font:10px Verdana;'>"+"<div class='messagetext' align='center' style='position: relative;top:17px;'><img style='position:relative;top:4px;border:none;margin:0;' src='"+_amzn_utils.imageDirectory(this.marketPlace)+"/loading-spinner.gif'/>&nbsp;&nbsp;"+_amzn_utils.getString(_amzn_utils.Loading,this.marketPlace)+"..."+"</div></div>"+"</div>";
}
return _1ad;
},getTile:function(_1b2,rank,_1b4){
var _1b5="";
var _1b6="";
if(this.showPopovers){
var _1b7=escape(this.createPopupTile(_1b2));
_1b5="_amzn_utils._amzn_popup_callback_helper(); _a=this; _amzn_popup.showpreview(\""+_1b7+"\", _a, event, 500, "+"\""+this.tag+"\", \""+this.linkCode+"\", \""+this.creativeId()+"\", \""+this.marketPlace+"\", \""+_1b2["ASIN"]+"\"); ";
_1b6=" _amzn_popup.hide(); ";
}
var _1b8=this.getCloudFontSize(rank,_1b4);
var _1b9=_1b2["Title"];
var _1ba=20;
if(_1b9.length>_1ba){
_1b9=_1b9.substring(0,_1ba)+"&hellip;";
}
var res="<span style=\"padding: 0 6px 0 0;\">"+"<a target=\"_blank\" onmouseover=' this.style.backgroundColor = \""+this.hoverBackgroundColor+"\"; this.style.color = \""+this.hoverTextColor+"\"; "+_1b5+"'"+"onmouseout='this.style.backgroundColor = \""+this.backgroundColor+"\"; this.style.color = \""+this.cloudTextColor+"\"; "+_1b6+"' style=\"padding: 0 1px 0 1px; text-decoration:none; border:none; font-size:"+_1b8+"px; "+" color: "+this.cloudTextColor+"; font-family: "+this.cloudFont+";\"  href=\""+_amzn_utils.getURL(_1b2["DetailPageURL"],this)+"\">"+_1b9+"</a></span>";
return res;
},createPopupTile:function(_1bc){
return _amzn_utils.createPopupTile(_1bc,this);
},add_pad_helper:function(_1bd){
if(_1bd){
return _1bd+"px ";
}else{
return "0 ";
}
},style_wdgt_pad:function(){
var res="padding: ";
res+=this.add_pad_helper(this.wdgt_pad_top);
res+=this.add_pad_helper(this.wdgt_pad_right);
res+=this.add_pad_helper(this.wdgt_pad_bottom);
res+=this.add_pad_helper(this.wdgt_pad_left);
res+=";";
return res;
},repaint:function(_1bf){
this.resultData.results=this.topsellers;
this.internalRepaint(_1bf);
this.topseller_display_callback(this.resultData,true);
},internalMain:function(_1c0){
this.internalRepaint(_1c0);
this.callWebService();
},isSupportedFont:function(font){
if(font=="Verdana"||font=="Helvetica"||font=="Georgia"||font=="MS Sans"){
return true;
}
return false;
},validateAndSetParams:function(_1c2){
this.serviceVersion=_1c2.serviceVersion;
this.showTitle=_amzn_utils.getValidParam(_1c2.showTitle,false);
this.titleTextColor=_amzn_utils.getValidParam(_1c2.titleTextColor,"#000000");
this.titleFont=_amzn_utils.getValidParam(_1c2.titleFont,"Verdana");
if(!this.isSupportedFont(this.titleFont)){
this.titleFont="Verdana";
}
this.titleFontSize=_amzn_utils.getValidParam(_1c2.titleFontSize,"13px");
this.titleFontSize=parseInt(this.titleFontSize);
this.title=_amzn_utils.getValidParam(_1c2.title,"");
this.category=_amzn_utils.getValidParam(_1c2.category,"All");
this.cloudTextColor=_amzn_utils.getValidParam(_1c2.cloudTextColor,"#003399");
this.cloudFont=_amzn_utils.getValidParam(_1c2.cloudFont,"Verdana");
if(!this.isSupportedFont(this.cloudFont)){
this.cloudFont="Verdana";
}
this.cloudFontSize=_amzn_utils.getValidParam(_1c2.cloudFontSize,"13px");
this.cloudFontSize=parseInt(this.cloudFontSize);
this.hoverTextColor=_amzn_utils.getValidParam(_1c2.hoverTextColor,"#FFFFFF");
this.hoverBackgroundColor=_amzn_utils.getValidParam(_1c2.hoverBackgroundColor,"#E0A366");
this.width=_amzn_utils.getValidParam(_1c2.width,450);
if(this.width<160||this.width>1024){
this.width=400;
}
this.height=_amzn_utils.getValidParam(_1c2.height,450);
if(this.height<60||this.height>1200){
this.height=260;
}
this.backgroundColor=_amzn_utils.getValidParam(_1c2.backgroundColor,"#FFFFFF");
this.showPopovers=_amzn_utils.getValidParam(amzn_wdgt.showPopovers,true);
this.popoverBorderColor=_amzn_utils.getValidParam(_1c2.popoverBorderColor,"#565151");
this.showAmazonLogoAsText=_amzn_utils.getValidParam(_1c2.showAmazonLogoAsText,false);
this.curvedCorners=_amzn_utils.getValidParam(_1c2.curvedCorners,true);
this.innerWidth=this.width-this.wdgt_pad_right-this.wdgt_pad_left;
this.refURL=_1c2.refURL;
this.tag=_1c2.tag;
},topsellers:null,wdgt_pad_top:4,wdgt_pad_left:8,wdgt_pad_bottom:4,wdgt_pad_right:8,internalRepaint:function(_1c3){
this.origParams=_amzn_utils.clone(_1c3);
_1c3=_amzn_utils.escapeHTML(_1c3);
this.validateAndSetParams(_1c3);
this.wdgt_color="#000";
this.pgn_border_bottom_color="#B89373";
this.pgn_bkgd_color="#45301E";
this.pgn_a_color="#CC6600";
_amzn_utils.insertStyleSheet("stylesheet.widgets.amazon.com","/css/widgets.css",this.marketPlace);
},creativeId:function(){
switch(this.marketPlace){
case "US":
return "384005";
case "CA":
return "383525";
case "GB":
return "10570";
case "DE":
return "10810";
case "FR":
return "11050";
case "JP":
return "4591";
}
},style_amzn_wdgt:function(){
return "color:"+this.cloudTextColor+";background: "+this.backgroundColor+"; width: "+this.width+"px"+"; height:"+this.height+"px;"+" line-height: normal; font-family:Verdana, Arial, Helvetica, sans-serif; text-align: left;";
},style_wdgt_hd:function(){
return "color: "+this.titleTextColor+"; "+"font-family: "+this.titleFont+"; "+"font-size: "+this.titleFontSize+"px; font-weight: bold; "+"line-height: 1.2em; "+"padding: 4px 8px 0px 8px";
},style_wdgt_brdr:function(_1c4){
return "";
},style_wdgt_ft:function(){
return "color:"+this.cloudTextColor+" !important;background: "+this.backgroundColor;
},style_wdgt_ft_a:function(){
return "color:"+this.cloudTextColor+" !important;border-bottom: 1px dotted "+this.cloudTextColor+";";
},style_wdgt_pop_tl:function(_1c5){
return ";background: #FFFFFF"+";width:"+_1c5+"px;"+"; border: 5px solid "+this.popoverBorderColor;
},style_tile_a:function(){
return "border-bottom: none; text-decoration:none;color: "+this.wdgt_color+" !important;";
},style_tile_h1:function(){
return "color: "+this.wdgt_color+" !important;";
},style_tile_h1_a:function(){
return "color: "+this.wdgt_color+" !important;";
},style_tile_h2:function(){
return "color: "+this.pgn_a_color+" !important;";
},style_tile_h2_a:function(){
return "color: "+this.pgn_a_color+" !important;";
},style_tile_category:function(){
return "color: "+this.pgn_a_color+" !important;";
},style_tile_price:function(){
return "color: "+this.pgn_a_color+" !important;";
},style_tile_asin_img:function(){
return "border-bottom: none; text-decoration:none;";
},style_tile_asin_a:function(){
return "border-bottom: none; text-decoration:none;";
},display_template_id:1,style_tile_review:function(){
return "color: "+this.pgn_a_color+" !important;";
},style_get_edit_wdgt:function(){
return "color: "+this.cloudTextColor+";border-bottom: 1px dotted "+this.cloudTextColor+";";
},getWidth:function(){
return this.width;
},marketPlace:"JP"};
var _1c6=""+wdgt.display_template_id;
var id=null;
for(var i=0;i<amzn_wdgts_vars[wdgt.marketPlace][wdgt.templateId].length;i++){
var _1c9=amzn_wdgts_vars[wdgt.marketPlace][wdgt.templateId][i];
if(_1c9.displayTemplate==_1c6&&!_1c9.isTaken){
_1c9.isTaken=true;
id=_1c9.instanceId;
break;
}
}
if(id==null){
id=0;
}
wdgt.instanceId=id;
all_amzn_wdgts[wdgt.marketPlace][wdgt.templateId][id]=wdgt;
if(typeof amzn_wdgts_vars[wdgt.marketPlace][wdgt.templateId][id]!="undefined"){
if(typeof amzn_wdgts_vars[wdgt.marketPlace][wdgt.templateId][id].tag=="undefined"){
amzn_wdgts_vars[wdgt.marketPlace][wdgt.templateId][id].tag=_amzn_utils.getString(_amzn_utils.DefaultTag,wdgt.marketPlace);
}
_amzn_utils.recordImpression(amzn_wdgts_vars[wdgt.marketPlace][wdgt.templateId][id].tag,wdgt.linkCode,wdgt.creativeId(),wdgt.marketPlace);
amzn_wdgts_vars[wdgt.marketPlace][wdgt.templateId][id].hasLoaded=true;
wdgt.internalMain(amzn_wdgts_vars[wdgt.marketPlace][wdgt.templateId][id]);
}
}
if(typeof all_amzn_wdgts=="undefined"){
all_amzn_wdgts=new Array();
}
var curr_mkt_place="JP";
if(typeof all_amzn_wdgts[curr_mkt_place]=="undefined"){
all_amzn_wdgts[curr_mkt_place]=new Array();
}
if(typeof all_amzn_wdgts[curr_mkt_place]["8006"]=="undefined"){
all_amzn_wdgts[curr_mkt_place]["8006"]=new Array();
}
var curr_wdgt=all_amzn_wdgts[curr_mkt_place]["8006"];
function clearWidgets(){
amzn_wdgts_vars=new Array();
amzn_wdgts_vars[amzn_wdgt.marketPlace]=new Array();
amzn_wdgts_vars[amzn_wdgt.marketPlace][amzn_wdgt.templateId]=new Array();
all_amzn_wdgts=new Array();
all_amzn_wdgts[amzn_wdgt.marketPlace]=new Array();
all_amzn_wdgts[amzn_wdgt.marketPlace][amzn_wdgt.templateId]=new Array();
amzn_wdgts_vars[amzn_wdgt.marketPlace][amzn_wdgt.templateId].push(_amzn_utils.clone(amzn_wdgt));
}
function product_cloud_display_callback(data){
if(typeof data=="undefined"||typeof data.results=="undefined"){
all_amzn_wdgts[data.MarketPlace]["8006"][data.InstanceId].topseller_display_callback(new Object(),false);
}else{
all_amzn_wdgts[data.MarketPlace]["8006"][data.InstanceId].topseller_display_callback(data,false);
}
}
if(typeof all_amzn_wdgts=="undefined"){
all_amzn_wdgts=new Array();
}
if(typeof all_amzn_wdgts[curr_mkt_place]=="undefined"){
all_amzn_wdgts[curr_mkt_place]=new Array;
}
if(typeof all_amzn_wdgts[curr_mkt_place]["8006"]=="undefined"){
all_amzn_wdgts[curr_mkt_place]["8006"]=new Array();
}
var curr_wdgt=all_amzn_wdgts[curr_mkt_place]["8006"];
initOnloadFunctions();

