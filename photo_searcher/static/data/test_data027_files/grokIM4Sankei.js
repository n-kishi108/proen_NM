//-- core ------------------------------------------------------------------------------------------
var GROK={};GROK.util={randomChoice:function(args){return args[Math.floor(Math.random()*args.length)];},textWrap:(function(){if(/opera/.test(navigator.userAgent.toLowerCase())){return function(str){return String(str).replace(/(.)/g,'$1'+'&#8203;');};}else{return function(str){return String(str).replace(/(.)/g,'$1'+'<wbr />');};}})(),strip:function(str){return String(str).replace(/^[ \s]*/gim,'').replace(/[ \s]*$/gim,'');},getText:function(node){var targetNode=node||document.body;var children=targetNode.childNodes,texts=[];for(var child,type,nodeName,i=0,len=children.length;i<len;i++){child=children.item(i);type=child.nodeType;if(type===1){nodeName=child.nodeName;if((nodeName!='SCRIPT')&&(nodeName!='NOSCRIPT')){texts[texts.length]=arguments.callee(child);}}else if(type===3){texts[texts.length]=child.data;}else if(type===8){}}
return texts.join('');},getTextByMark:function(startMark,endMark,node){var texts=this.getTextsByMark(startMark,endMark,node);return(texts.length>0)?texts[0]:'';},getTextsByMark:function(startMark,endMark,node){var html,targetTextList=[],targetNode=node||document.body,patern,matchList=null;html=targetNode.innerHTML;patern=new RegExp(startMark+'[\\s\\S]*?'+endMark,'gim');matchList=html.match(patern);if(matchList){for(var i=0,len=matchList.length;i<len;i++){targetTextList[targetTextList.length]=this.strip(matchList[i].replace(/<\/?[^>]+>/gim,''));}}
return targetTextList;},getElementsByClassName:function(className,node){var targetNode=node||document,children=targetNode.getElementsByTagName('*')||document.all,elements=[];for(var i=0,len1=children.length;i<len1;i++){var classNames=children[i].className.split(' ');for(var j=0,len2=classNames.length;j<len2;j++){if(classNames[j]===className){elements[elements.length]=children[i];break;}}}
return elements;},map:function(args,func){var results=[];for(var i=0,len=args.length;i<len;i++){results[results.length]=func(args[i]);}
return results;},addListener:(function(){if(window.addEventListener){return function(node,type,func){node.addEventListener(type,func,false);};}else if(window.attachEvent){return function(node,type,func){var wrapperFunc=function(){func.call(node,window.event);};node.attachEvent('on'+type,wrapperFunc);};}else{return function(node,type,func){node['on'+type]=func;};}})(),kishEncode:function(targetStr){if(targetStr===''){return'';}
var encstr='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()'.split('');var chrcode,bitcnt,rest;chrcode=bitcnt=rest=0;for(var i=0,len=targetStr.length,result='';i<len;i++){chrcode=targetStr.charCodeAt(i);rest<<=16;rest|=chrcode;bitcnt+=16;while(bitcnt>=6){result+=encstr[rest>>(bitcnt-6)];rest&=(1<<(bitcnt-6))-1;bitcnt-=6;}}
if(bitcnt){result+=encstr[rest<<(6-bitcnt)];}
return result;},domReady:{set:function(fn){if(GROK.util.domReady.loaded){return fn();}
GROK.util.domReady.observer=fn;GROK.util.domReady.callback=function(){if(GROK.util.domReady.loaded){return;}
GROK.util.domReady.loaded=true;if(GROK.util.domReady.timer){clearInterval(GROK.util.domReady.timer);GROK.util.domReady.timer=null;}
GROK.util.domReady.observer();GROK.util.domReady.callback=GROK.util.domReady.observer=null;GROK.util.domReady.set=null;};var ie=!!(window.attachEvent&&!window.opera);var webkit=navigator.userAgent.indexOf('AppleWebKit/')>-1;if(document.readyState&&webkit){GROK.util.domReady.timer=setInterval(function(){var state=document.readyState;if(state=='loaded'||state=='complete'){GROK.util.domReady.callback();}},50);}else if(document.readyState&&ie&&window==window.top){(function(){try{document.documentElement.doScroll('left');}catch(e){setTimeout(arguments.callee,50);return;}
GROK.util.domReady.callback();})();}else{if(window.addEventListener){document.addEventListener("DOMContentLoaded",GROK.util.domReady.callback,false);window.addEventListener("load",GROK.util.domReady.callback,false);}else if(window.attachEvent){window.attachEvent('onload',GROK.util.domReady.callback);}else{var bkfn=window.onload;window.onload=function(){GROK.util.domReady.callback();if(bkfn){bkfn();}};}}}}};GROK.factory=function(spec,custom){var grok={};grok.log=function(msg){var now=(new Date()).getTime();this.logs[this.logs.length]=[msg,now];if(this.verbose){this.logImpl(msg+' [ '+now+' ]');}};grok.logImpl=function(msg){if(!!console&&!!console.log){console.log(msg);}};grok.invoke=function(){this.log('invoke');this.extractTargetText();this.loadGrokData();};grok.extractTargetText=function(){this.log('extractText');var targetText=this.extractTargetTextImpl();this.targetText=targetText.substring(0,Math.min(200,targetText.length));this.log(this.targetText);};grok.extractTargetTextImpl=function(){this.log('"extractTargetTextImpl" is default');var texts=[GROK.util.getTextByMark('<!-- grok target title start -->','<!-- grok target title end -->'),GROK.util.getTextByMark('<!-- grok target body start -->','<!-- grok target body end -->')];texts=texts.concat(GROK.util.getTextsByMark('<!-- grok target start -->','<!-- grok target end -->'));texts = texts.concat(GROK.util.getTextsByMark('<!-- grok target others start -->', '<!-- grok target others end -->'));return GROK.util.strip(texts.join(' '));};grok.loadGrokData=function(){this.log('loadGrokData');this.log('grokLoading');this.loadStat='grokLoading';this.grokSrc=[this.spec.grokHost,'/CM2.py/','?Mode=','im','&Source=',this.spec.source,'&Type=',this.spec.type,'&ResultMax=','5','&ForPC=','true','&OutputCoding=',this.spec.codec,'&OutputFormat=','jsonp','&TargetText=',GROK.util.kishEncode(this.targetText),'&UseKish=','true','&CallbackFunc=','GROK.grok.setGrokData'].join('');if(this.verbose){this.grokSrc+='&Verbose=true';}
var sc=document.createElement('script');sc.type='text/javascript';sc.charset=this.spec.srcCodec;sc.src=this.grokSrc;document.body.appendChild(sc);setTimeout(function(){GROK.grok.checkTimeout(GROK.grok);},10000);};grok.setGrokData=function(grokData){this.log('setGrokData');this.loadStat='grokLoadComplete';this.log('grokLoadComplete');this.grokData=grokData;this.buildOvrSrcWithGrok();this.loadAdData();};grok.checkTimeout=function(that){if(that.loadStat=='grokLoading'){that.log('grokTimeout');that.loadStat='grokTimeout';that.timeoutImpl();}};grok.timeoutImpl=function(){this.log('"grok.timeoutImpl" is not overridden');this.buildOvrSrcWithoutGrok();this.loadAdData();};grok.buildOvrSrcWithGrok=function(){this.log('buildOvrSrcWithGrok');var keys='',keyQuery,src;keys=GROK.util.map(this.grokData.resultSet.results[0].ctxtKeys,function(elm){return encodeURIComponent(elm);}).join(',');keyQuery=(keys)?'&ctxtKeywords='+keys:'';src=[this.spec.ovrHost,'/js_flat/','?source=',this.spec.source,'&type=',this.spec.type,keyQuery,'&ctxtId=',this.grokData.resultSet.results[0].ctxtId,'&ctxtUrl=',encodeURIComponent(document.location.href.split('#')[0]),'&ctxtCat=',GROK.util.randomChoice(this.spec.ctxtCatList),'&keywordCharEnc=','utf8','&outputCharEnc=',this.spec.codec,'&maxCount=',this.spec.maxAdCount].join('');if(this.spec.ref){src+='&ref='+this.spec.ref;}
if(this.spec.gen){src+='&gen='+this.spec.gen;}
if(this.spec.age){src+='&age='+this.spec.age;}
if(this.spec.start){src+='&start='+this.spec.start;}
this.ovrSrc=src;return src;};grok.buildOvrSrcWithoutGrok=function(){this.log('buildOvrSrcWithoutGrok');var src=[this.spec.ovrHost,'/js_flat/','?source=',this.spec.source,'&type=',this.spec.type,'&ctxtId=',GROK.util.randomChoice(this.spec.defaltCtxtIdList),'&ctxtUrl=',encodeURIComponent(document.location.href.split('#')[0]),'&ctxtCat=',GROK.util.randomChoice(this.spec.ctxtCatList),'&keywordCharEnc=','utf8','&outputCharEnc=',this.spec.codec,'&maxCount=',this.spec.maxAdCount].join('');if(this.spec.ref){src+='&ref='+this.spec.ref;}
if(this.spec.gen){src+='&gen='+this.spec.gen;}
if(this.spec.age){src+='&aef='+this.spec.age;}
this.ovrSrc=src;return src;};grok.loadAdData=function(){this.log('loadAdData');var iframe,iframeDoc,iframeWindow;try{iframe=document.createElement('iframe');var iframeStyle={width:'0px',height:'0px',border:'0px',borderStyle:'hidden'};for(var p in iframeStyle){iframe.style[p]=iframeStyle[p];}}catch(e){}
document.body.appendChild(iframe);iframeWindow=iframe.contentWindow;iframeDoc=iframe.contentDocument||iframe.contentWindow.document;var html=['<html xmlns="http://www.w3.org/1999/xhtml" lang="ja" xml:lang="ja">','<head>','<meta http-equiv="Content-Type" content="text/html; charset=',this.spec.srcCodec,'" />','<script type="text/javascript" src="'+this.ovrSrc+'" charset="',this.spec.srcCodec,'" ></script>','</head>','<body>','</body>','</html>'].join('');iframeDoc.open();iframeDoc.write(html);iframeDoc.close();(function(that,parent,iframe){var tryCount=0,limit=100;(function(){if(tryCount>limit){that.log('loadAd timeOut tryCount:'+tryCount);}else if(typeof(iframeWindow.zSr)=='undefined'){that.log('loadAdData try'+String(tryCount+1));tryCount++;setTimeout(arguments.callee,100);}else if(Object.prototype.toString.call(iframeWindow.zSr)=='[object Array]'){that.log('adData loaded, tryCount:'+tryCount);that.setAds(iframeWindow.zSr,parent,iframe);}else{tryCount++;}})();})(this,document.body,iframe);};grok.setAds=(function(){var addedHosts={};return function(zSr,parent,iframe){this.log('setAds');if(Object.prototype.toString.call(this.ads)!=='[object Array]'){this.ads=[];}
var i=6,end=zSr.length;while(i<end){var descr=zSr[i++],unused1=zSr[i++],clickUrl=zSr[i++],title=zSr[i++],host=zSr[i++],unused2=zSr[i++];if(!(addedHosts[host])){addedHosts[host]=1;this.ads[this.ads.length]={descr:descr,clickUrl:clickUrl,title:title,host:host};}}
parent.removeChild(iframe);this.dispAds();};})();grok.dispAds=function(){this.log('dispAds');this.dispAdsImpl();};grok.dispAdsImpl=function(){this.log('"dispAdsImpl" is not implemented');};(function(spec,custom){this.targetText='';this.grokSrc='';this.ovrSrc='';this.grokData=undefined;this.ads=[];this.loadStat='ready';this.logs=[];this.spec=spec||{};this.spec.grokHost=spec.grokHost||'http://grok.kizasi.jp/api';this.spec.ovrHost=spec.ovrHost||'http://im.sankei.ov.yahoo.co.jp';this.spec.source=spec.source||'overture_jp_pc_test';this.spec.type=spec.type||'kz';this.spec.codec=spec.codec||'utf8';this.spec.maxAdCount=spec.maxAdCount||5;this.spec.srcCodec={'utf8':'UTF-8','euc-jp':'EUC-JP','shiftjis':'Shift_JIS'}[this.spec.codec];this.spec.srcCodec=this.spec.srcCodec||'UTF-8';this.spec.defaltCtxtIdList=spec.defaltCtxtIdList||['sensi001','sensi002','sensi003','sensi004'];this.spec.ctxtCatList=spec.ctxtCatList||['default_automotive','default_business','default_career','default_education','default_entertainment','default_fashion','default_finance','default_home','default_travel'];this.verbose=!!(spec.verbose)?true:false;custom=custom||{};for(var p in custom){grok[p]=custom[p];}}).apply(grok,arguments);return grok;};

//-- custom ----------------------------------------------------------------------------------------
GROK.customMethods = {};
GROK.customMethods.dispAdsImpl = function() {
    // 広告枠リスト(adAreaSpecList)に従い、広告を表示する
    for (var i = 0, limit = this.spec.adAreaSpecList.length; i < limit; i++){
        var f = this.spec.adAreaSpecList[i].dispFunc;
        f = (typeof f === 'function') ? f : this[f];
        if (typeof f === 'function'){
            f(this.spec.adAreaSpecList[i].container,
              this.ads.splice(0, this.spec.adAreaSpecList[i].maxAds));
        }
    }
};
GROK.customMethods.dispAdsMain = function(container, adData){
    var dispAd = function(adContainer, adHTML) {
        if (!!(adContainer) && !!(adHTML)) {
            adContainer.innerHTML = [adHTML].join('');
            adContainer.style.display = 'block';
        }
    };
    var buildAd = function(adData){
        if (adData.length < 1) {return '';}
        var adMarkups = [
            '<div class="parent chrome1 adIMm">',
              '<div class="child c1">',
                '<ul class="singlelist1 cmnListmark3">'
        ];
        for (var i = 0, len = adData.length;i < len;i++){
            adMarkups = adMarkups.concat([
                  '<li>',
                    '<a href="', adData[i].clickUrl, '" target="_blank">',
                      '<span class="title">', adData[i].title, '</span>',
                      '<p>',
                      adData[i].descr, '&nbsp;',
                      '<span class="url">', adData[i].host, '</span>',
                      '</p>',
                    '</a>',
                  '</li>'
            ]);
        }
        adMarkups = adMarkups.concat([
                '</ul>',
                '<span class="credit">',
                  '<a href="http://ov.yahoo.co.jp/service/int/index.html" target="_blank">',
                    'インタレストマッチ - 広告の掲載について',
                  '</a>',
                '</span>',
              '</div>',
              '<div style="clear:both">',
              '</div>',
            '</div>'
        ]);
        return adMarkups.join('');
    };
    dispAd(
        container,
        buildAd(adData)
    );
};
GROK.customMethods.dispAdsSide = function(container, adData){
    var dispAd = function(adContainer, adHTML) {
        if (!!(adContainer) && !!(adHTML)) {
            adContainer.innerHTML = [adHTML].join('');
            adContainer.style.display = 'block';
        }
    };
    var buildAd = function(adData){
        if (adData.length < 1) {return '';}
        var adMarkups = [
            '<div class="parent chrome5 adIMs">',
              '<h2><span class="pr">[PR]</span>&#160;おすすめ情報</h2>',
              '<div class="child c1">',
                '<ul class="singlelist1 cmnListmark3">'
        ];
        for (var i = 0, len = adData.length;i < len;i++){
            adMarkups = adMarkups.concat([
                  '<li>',
                    '<a href="', adData[i].clickUrl, '" target="_blank">',
                      '<span class="title">', adData[i].title, '</span>',
                      '<p>',
                      adData[i].descr, '&nbsp;',
                      '<span class="url">', adData[i].host, '</span>',
                      '</p>',
                    '</a>',
                  '</li>'
            ]);
        }
        adMarkups = adMarkups.concat([
                '</ul>',
                '<span class="credit">',
                  '<a href="http://ov.yahoo.co.jp/service/int/index.html" target="_blank">',
                    'インタレストマッチ - 広告の掲載について',
                  '</a>',
                '</span>',
              '</div>',
              '<div style="clear:both">',
              '</div>',
            '</div>'
        ]);
        return adMarkups.join('');
    };
    dispAd(
        container,
        buildAd(adData)
    );
};
(function (){
    GROK.util.domReady.set(function(){
        var adAreaSpecList = [],
            adContainer = document.getElementById('grokInstantContainer'),
            funcName = (grokIM4SankeiConfig.layout == 'main') ? 'dispAdsMain' : 'dispAdsSide';
        adAreaSpecList.push({
            dispFunc : funcName,
            container: adContainer,
            maxAds   : grokIM4SankeiConfig.maxAdCount
        });
        var spec = {
            source        : grokIM4SankeiConfig.source,
            type          : grokIM4SankeiConfig.type,
            maxAdCount    : grokIM4SankeiConfig.maxAdCount,
            codec         : grokIM4SankeiConfig.codec,
            adAreaSpecList: adAreaSpecList
        };
        GROK.grok = GROK.factory(spec, GROK.customMethods);
        GROK.grok.invoke();
    });
})();
