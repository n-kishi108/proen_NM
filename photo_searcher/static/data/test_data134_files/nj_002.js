/**
* 비밀번호 변경 페이지 주소 수정
* @release date 2010.03.31
* -- filename: nhn.Timer.js	revision: 48421
* -- filename: nhn.Effect.js	revision: 48421
* -- filename: nhn.Transition.js	revision: 48509
* -- filename: nhn.Foggy.js	revision: 83441
* -- filename: nhn.Pagination.js	revision: 154026
* -- filename: nhn.TextAreaExpander.js	revision: 152895
* -- filename: nj.Base.js	revision: 140529
* -- filename: nj.tool.validate.js	revision: 195818
* -- filename: nj.tool.validate.rules.js	revision: 184373
* -- filename: nj.Login.js	revision: 204336
* -- filename: nj.crypto.js	revision: 129183
* -- filename: nj.fx.js	revision: 49884
* -- filename: nj.ImageCrop.js	revision: 66856
* -- filename: nj.mission.jCache.js	revision: 131724
* -- filename: nj.mission.CropLayer.js	revision: 138206
* -- filename: nj.mission.SearchLayer.js	revision: 202830
* -- filename: nj.RadioBox.js	revision: 119715
* -- filename: nj.SwfPutter.js	revision: 158495
* -- filename: nj.Uploader2.js	revision: 164624
* -- filename: rsa_base64.js	revision: 69475
* -- filename: rsa_jsbn.js	revision: 69475
* -- filename: rsa_jsbn2.js	revision: 69475
* -- filename: rsa_prng4.js	revision: 69475
* -- filename: rsa_rng.js	revision: 69475
* -- filename: rsa_rsa.js	revision: 69475
* -- filename: rsa_rsa2.js	revision: 69475
* -- filename: Base64.js	revision: 126768
* -- filename: selectComponent.js	revision: 153400
* -- filename: lcslog.js	revision: 140894
* -- filename: nj.SetCutStr.js	revision: 81892
* -- filename: nj.mission.FreeTalk.js	revision: 204464
* -- filename: nj.mission.UserAction.js	revision: 196168
* -- filename: nj.tool.js	revision: 157481
* -- filename: nj.mission.initReportForm.js	revision: 157481
* -- filename: nj.vendor.js	revision: 145119
* -- filename: nj.widget.BookmarkToolbar.js	revision: 157483
* -- filename: nclktag_v1.js	revision: 153428
* -- filename: nj.mission.FlashUtil.js	revision: 180671
* -- filename: nj.widget.CommentIconBox.js	revision: 154109
* -- filename: nhn.LayerRelation.js	revision: 157405
* -- filename: nhn.AutoComplete.js	revision: 157405
* -- filename: nhn.AjaxSuggestJP.js	revision: 173220
* -- filename: nj.function.js	revision: 162094
* -- filename: flashObject_jp.js	revision: 158775
*/
nhn.Timer=$Class({_timer:null,_lastest:null,_remained:0,_delay:null,_callback:null,$init:function(){},start:function(fpCallback,nDelay){var self=this;
this.abort();
this.fireEvent("wait");
this._lastest=new Date().getTime();
this._remained=0;
this._delay=nDelay;
this._callback=fpCallback;
this.resume();
return true
},_clearTimer:function(){var bFlag=false;
if(this._timer){clearInterval(this._timer);
bFlag=true
}this._timer=null;
return bFlag
},abort:function(){var bRet;
if(bRet=this._clearTimer()){this.fireEvent("abort")
}return bRet
},pause:function(){var nPassed=new Date().getTime()-this._lastest;
this._remained=this._delay-nPassed;
if(this._remained<0){this._remained=0
}return this._clearTimer()
},resume:function(){var self=this;
if(!this._callback){return false
}var fpGo=function(nDelay,bRecursive){self._clearTimer();
self._timer=setInterval(function(){self.fireEvent("run");
var r=self._callback();
self._lastest=new Date().getTime();
if(!r){clearInterval(self._timer);
self._timer=null;
self.fireEvent("end");
return 
}self.fireEvent("wait");
if(bRecursive){fpGo(self._delay,false)
}},nDelay)
};
if(this._remained){fpGo(this._remained,true);
this._remained=0
}else{fpGo(this._delay,false)
}return true
}}).extend(nhn.Component);
nhn.Effect=function(fpFunc){if(this instanceof arguments.callee){throw new Error("You can't create a instance of this")
}var regnum=/^(\-?[0-9\.]+)(%|px|pt|em)?$/;
var regrgb=/^rgb\(([0-9]+)\s?,\s?([0-9]+)\s?,\s?([0-9]+)\)$/i;
var reghex=/^#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})$/i;
var reg3to6=/^#([0-9A-F])([0-9A-F])([0-9A-F])$/i;
var getValue=function(v){var unit;
if(regnum.test(v)){v=parseFloat(v),unit=RegExp.$2
}else{if(regrgb.test(v)){v=[parseInt(RegExp.$1),parseInt(RegExp.$2),parseInt(RegExp.$3)],unit="color"
}else{if(reghex.test(v=v.replace(reg3to6,"#$1$1$2$2$3$3"))){v=[parseInt(RegExp.$1,16),parseInt(RegExp.$2,16),parseInt(RegExp.$3,16)],unit="color"
}}}return{value:v,unit:unit}
};
return function(fixs,fixd){var unit;
if(arguments.length>1){fixs=getValue(fixs),fixd=getValue(fixd),unit=fixd.unit
}else{fixd=getValue(fixs),fixs=null,unit=fixd.unit
}if(fixs&&fixd&&fixs.unit!=fixd.unit){throw new Error("unit error")
}fixs=fixs&&fixs.value;
fixd=fixd&&fixd.value;
var cacheValue,cacheResult;
var fp=function(p){var s=fixs;
var d=fixd;
var getResult=function(s,d){return(d-s)*fpFunc(p)+s+unit
};
if(unit=="color"){var r=parseInt(getResult(s[0],d[0]))<<16;
r|=parseInt(getResult(s[1],d[1]))<<8;
r|=parseInt(getResult(s[2],d[2]));
r=r.toString(16).toUpperCase();
for(var i=0;
6-r.length;
i++){r="0"+r
}return"#"+r
}return getResult(s,d)
};
if(fixs===null){fp.setStart=function(s){if(isNaN(parseInt(s))){s=0+unit
}s=getValue(s);
if(s.unit!=unit){throw new Error("unit eror")
}fixs=s.value
}
}return fp
}
};
nhn.Effect.linear=nhn.Effect(function(s){return s
});
nhn.Effect.easeIn=nhn.Effect(function(s){y=Math.sqrt(1-(s*s));
return(1-y)
});
nhn.Effect.easeOut=nhn.Effect(function(s){y=Math.sqrt((2-s)*s);
return y
});
nhn.Effect.overphase=nhn.Effect(function(s){s/=0.69643223;
y=Math.sqrt((2-s)*s)+0.1;
return y.toFixed(7)
});
nhn.Effect.bounce=nhn.Effect(function(s){if(s<(1/2.75)){return(7.5625*s*s)
}else{if(s<(2/2.75)){return(7.5625*(s-=(1.5/2.75))*s+0.75)
}else{if(s<(2.5/2.75)){return(7.5625*(s-=(2.25/2.75))*s+0.9375)
}else{return(7.5625*(s-=(2.625/2.75))*s+0.984375)
}}}});
(function(){var b=$Element.prototype.css;
$Element.prototype.css=function(k,v){if(k=="opacity"){return typeof v!="undefined"?this.opacity(parseFloat(v)):this.opacity()
}return v!="undefined"?b.call(this,k,v):b.call(this,k)
}
})();
nhn.Transition=$Class({_fps:15,_queue:null,_timer:null,_waiting:true,_playing:false,$init:function(oOptions){this._queue=[];
this._timer=new nhn.Timer();
this.option({effect:nhn.Effect.linear,correction:false});
this.option(oOptions||{})
},fps:function(nFPS){if(arguments.length>0){this._fps=nFPS;
return this
}return this._fps
},abort:function(){this._queue=[];
this._timer.abort();
if(this._playing){this.fireEvent("abort")
}this._waiting=true;
this._playing=false;
this._now=null
},start:function(){this.abort();
return this.precede.apply(this,arguments)
},pause:function(){if(this._timer.abort()){this.fireEvent("pause")
}},resume:function(){var self=this;
if(!this._now){return 
}if(this._waiting==false&&this._playing==true){this.fireEvent("resume")
}this._goOn();
this._waiting=false;
this._playing=true;
this._timer.start(function(){var bEnd=!self._goOn();
if(bEnd){self._waiting=true;
setTimeout(function(){self._try()
},0)
}return !bEnd
},this._now.interval)
},precede:function(nDuration,oEl){if(typeof nDuration=="function"){this._queue.push(nDuration)
}else{var oStuff={duration:nDuration,lists:[]};
for(var oArg=arguments,nLen=oArg.length,i=1;
i<nLen-1;
i+=2){var oValues=[];
$H(oArg[i+1]).forEach(function(sEnd,sKey){if(/^(@|style\.)(\w+)/i.test(sKey)){oValues.push(["csses",RegExp.$2,sEnd])
}else{oValues.push(["attrs",sKey,sEnd])
}});
oStuff.lists.push({element:"tagName" in oArg[i]?$Element(oArg[i]):oArg[i],values:oValues})
}this._queue.push(oStuff)
}this._try();
return this
},_dequeue:function(){var oStuff=this._queue.shift();
if(!oStuff){return 
}if(typeof oStuff=="function"){return oStuff
}var aLists=oStuff.lists;
for(var i=0,nLen=aLists.length;
i<nLen;
i++){var oEl=aLists[i].element;
for(var j=0,aValues=aLists[i].values,nJLen=aValues.length;
j<nJLen;
j++){var sType=aValues[j][0];
var fpFunc=aValues[j][2];
if(typeof fpFunc!="function"){if(fpFunc instanceof Array){fpFunc=this.option("effect")(fpFunc[0],fpFunc[1])
}else{fpFunc=this.option("effect")(fpFunc)
}}if(fpFunc.setStart){if(oEl instanceof $Element){switch(sType){case"csses":fpFunc.setStart(oEl.css(aValues[j][1]));
break;
case"attrs":fpFunc.setStart(oEl.$value()[aValues[j][1]]);
break
}}else{fpFunc.setStart(oEl.getter(aValues[j][1]))
}}aValues[j][2]=fpFunc
}}return oStuff
},_try:function(){var self=this;
if(!this._waiting){return false
}var oStuff;
do{oStuff=this._dequeue();
if(!oStuff){if(this._playing){this.fireEvent("end");
this._playing=false;
this.abort()
}return false
}if(!this._playing){this.fireEvent("start")
}if(typeof oStuff=="function"){this._playing=true;
oStuff.call(this)
}}while(typeof oStuff=="function");
var nInterval=1000/this._fps;
this._now={lists:oStuff.lists,ratio:0,interval:nInterval,step:nInterval/oStuff.duration};
this.resume();
return true
},_goOn:function(){var oNow=this._now;
var nRatio=oNow.ratio;
var aLists=oNow.lists;
var oEq={};
nRatio=parseFloat(nRatio.toFixed(5));
if(nRatio>1){nRatio=1
}var bCorrection=this.option("correction");
for(var i=0,nLen=aLists.length;
i<nLen;
i++){var oEl=aLists[i].element;
for(var j=0,aValues=aLists[i].values,nJLen=aValues.length;
j<nJLen;
j++){if(oEl instanceof $Element){var sKey=aValues[j][1];
var sValue=aValues[j][2](nRatio);
if(bCorrection){var sUnit=/[0-9]([^0-9]*)$/.test(sValue)&&RegExp.$1||"";
if(sUnit){var nValue=parseFloat(sValue);
var nFloor;
var a=nValue;
nValue+=oEq[sKey]||0;
nValue=parseFloat(nValue.toFixed(5));
if(i==nLen-1){sValue=Math.round(nValue)+sUnit
}else{nFloor=parseFloat(/(\.[0-9]+)$/.test(nValue)&&RegExp.$1||0);
sValue=parseInt(nValue)+sUnit;
oEq[sKey]=nFloor
}}}switch(aValues[j][0]){case"csses":oEl.css(sKey,sValue);
break;
case"attrs":oEl.$value()[sKey]=sValue;
break
}}else{oEl.setter(aValues[j][1],aValues[j][2](nRatio))
}}}oNow.ratio+=oNow.step;
return nRatio!=1
}}).extend(nhn.Component);
nhn.Foggy=$Class({_elFog:null,_bFogAppended:false,_oExcept:null,_bFogVisible:false,_oTransition:null,$init:function(oOptions){this.option({showDuration:200,showOpacity:nhn.Effect.linear(0.5),hideDuration:200,hideOpacity:nhn.Effect.linear(0),zIndex:32000,fps:15});
this.option(oOptions||{});
this._elFog=$("<div>");
this._bFogAppended=false;
this._oExcept={};
this._oTransition=new nhn.Transition().fps(this.option("fps"));
this._fOnResize=$Fn(this._fitFogToDocument,this);
this._fOnScroll=$Fn(this._fitFogToDocumentScrollSize,this)
},_appendFog:function(){if(this._bFogAppended){return 
}document.body.insertBefore(this._elFog,document.body.firstChild);
$Element(this._elFog).opacity(0);
this._bFogAppended=true
},_getScroll:function(wDocument){var o={top:0,left:0};
o.top=window.pageYOffset||document[wDocument._docKey].scrollTop;
o.left=window.pageXOffset||document[wDocument._docKey].scrollLeft;
return o
},_fitFogToDocument:function(){var wDocument=$Document();
this._elFog.style.left=this._getScroll(wDocument).left+"px";
this._elFog.style.width=wDocument.clientSize().width+"px";
var self=this;
clearTimeout(this._nTimer);
this._nTimer=null;
this._nTimer=setTimeout(function(){var oSize=wDocument.clientSize();
self._elFog.style.top=self._getScroll(wDocument).top+"px";
self._elFog.style.height=oSize.height+"px";
self._elFog.style.left=self._getScroll(wDocument).left+"px";
self._elFog.style.width=wDocument.clientSize().width+"px"
},100)
},_fitFogToDocumentScrollSize:function(){var oSize=$Document().scrollSize();
this._elFog.style.left="0";
this._elFog.style.top="0";
this._elFog.style.width=oSize.width+"px";
this._elFog.style.height=oSize.height+"px"
},getFog:function(){return this._elFog
},show:function(elExcept){var self=this;
if(this._bFogVisible){return 
}if(elExcept){this._oExcept.element=elExcept;
var sPosition=$Element(elExcept).css("position");
if(sPosition=="static"){this._oExcept.position=elExcept.style.position;
elExcept.style.position="relative"
}this._oExcept.zIndex=elExcept.style.zIndex;
elExcept.style.zIndex=this.option("zIndex")+1
}this._elFog.style.zIndex=this.option("zIndex");
this._elFog.style.display="none";
this._appendFog();
this._fitFogToDocumentScrollSize();
this._fOnResize.attach(window,"resize");
this._fOnScroll.attach(window,"scroll");
this._elFog.style.display="block";
this._bFogVisible=true;
this._oTransition.start(this.option("showDuration"),this._elFog,{"@opacity":this.option("showOpacity")}).precede(function(){self.fireEvent("show")
})
},hide:function(){var self=this;
if(!this._bFogVisible){return 
}this._bFogVisible=false;
this._oTransition.start(this.option("hideDuration"),this._elFog,{"@opacity":this.option("hideOpacity")}).precede(function(){self._elFog.style.display="none";
var elExcept=self._oExcept.element;
if(elExcept){if(self._oExcept.position){elExcept.style.position=self._oExcept.position
}elExcept.style.zIndex=self._oExcept.zIndex
}this._oExcept={};
self._fOnResize.detach(window,"resize");
self._fOnScroll.detach(window,"scroll");
self.fireEvent("hide")
})
}}).extend(nhn.Component);
nhn.Pagination=new $Class({$init:function(sId,oOption){this._elPageList=$(sId);
this._elCurrentPage=$("<strong>");
this._elPage=$("<a>");
$Element(this._elPage).attr("href","#");
this._elAPrevEndPage=cssquery.getSingle("a.pre_end",this._elPageList);
this._elAPrevPage=cssquery.getSingle("a.pre",this._elPageList);
this._elANextEndPage=cssquery.getSingle("a.next_end",this._elPageList);
this._elANextPage=cssquery.getSingle("a.next",this._elPageList);
this._elSpanPrevEndPage=cssquery.getSingle("span.pre_end",this._elPageList);
this._elSpanPrevPage=cssquery.getSingle("span.pre",this._elPageList);
this._elSpanNextEndPage=cssquery.getSingle("span.next_end",this._elPageList);
this._elSpanNextPage=cssquery.getSingle("span.next",this._elPageList);
this._fClickPage=$Fn(this._onClickPageList,this);
this._fClickPage.attach(this._elPageList,"click");
this.option({item:10,itemPerPage:10,pagePerPageList:10,page:1,moveUnit:"pagelist",alignCenter:false});
if(oOption){this.option(oOption)
}this.setItemCount(this.option("item"));
this.movePageTo(this.option("page"));
$Element(this._elPageList).addClass("loaded")
},getItemCount:function(){return this.option("item")
},setItemCount:function(nItem){this.option({item:nItem})
},getCurrentPage:function(){return this._nCurrentPage
},_getLastPage:function(){return Math.ceil(this.getItemCount()/this.option("itemPerPage"))
},_getRelativePage:function(sRelative){var nPage=null;
if(this.option("moveUnit")=="page"){switch(sRelative){case"pre":nPage=this.getCurrentPage()-1;
break;
case"next":nPage=this.getCurrentPage()+1;
break
}}else{var nThisPageList=this._getPageList(this.getCurrentPage());
switch(sRelative){case"pre_end":var nLastPageOfPrePageList=(nThisPageList-1)*this.option("pagePerPageList");
nPage=1;
break;
case"pre":var nLastPageOfPrePageList=(nThisPageList-1)*this.option("pagePerPageList");
nPage=nLastPageOfPrePageList;
break;
case"next":var nFirstPageOfNextPageList=(nThisPageList)*this.option("pagePerPageList")+1;
nPage=nFirstPageOfNextPageList;
break;
case"next_end":nPage=this._getLastPage();
break
}}return nPage
},_getPageList:function(nThisPage){if(this.option("alignCenter")){var nLeft=Math.floor(this.option("pagePerPageList")/2);
var nPageList=nThisPage-nLeft;
if(nPageList<1){nPageList=1
}if(nPageList>this._getLastPage()){nPageList=this._getLastPage()
}return nPageList
}return Math.ceil(nThisPage/this.option("pagePerPageList"))
},_onClickPageList:function(e){e.stop($Event.CANCEL_DEFAULT);
var nPage=null;
var el=e.element;
if(el.tagName!="A"){el=cssquery.getSingle("! a",el);
if(!el){return 
}}var we=$Element(el);
if(we.hasClass("pre_end")||we.hasClass("pre")||we.hasClass("next")||we.hasClass("next_end")){if(we.hasClass("pre_end")){nPage=this._getRelativePage("pre_end")
}else{if(we.hasClass("pre")){nPage=this._getRelativePage("pre")
}else{if(we.hasClass("next")){nPage=this._getRelativePage("next")
}else{if(we.hasClass("next_end")){nPage=this._getRelativePage("next_end")
}}}}}else{var nPage=parseInt($Element(el).text())
}if(!this.fireEvent("click",{element:el,page:nPage})){return 
}this.movePageTo(nPage)
},movePageTo:function(nPage){this._empty();
var nLastPage=this._getLastPage();
if(nLastPage==0){$Element(this._elPageList).addClass("no-result")
}else{if(nLastPage==1){$Element(this._elPageList).addClass("only-one")
}else{$Element(this._elPageList).removeClass("only-one").removeClass("no-result")
}}if(nPage<1){nPage=1
}if(nPage>nLastPage){nPage=nLastPage
}this._nCurrentPage=nPage;
this._paginate(nPage);
this.fireEvent("loaded",{page:nPage})
},reset:function(nItemCount){if(typeof nItemCount=="undefined"){var nItemCount=this.option("item")
}else{var nItemCount=nItemCount
}this.setItemCount(nItemCount);
this.movePageTo(1)
},_paginate:function(nPage){this._empty();
var nLastPage=this._getLastPage();
var nThisPageList=this._getPageList(nPage);
var nLastPageList=this._getPageList(nLastPage);
if(this.option("alignCenter")){var nLeft=Math.floor(this.option("pagePerPageList")/2);
var nFirstPageOfThisPageList=nPage-nLeft;
if(nFirstPageOfThisPageList<1){nFirstPageOfThisPageList=1
}var nLastPageOfThisPageList=nFirstPageOfThisPageList+this.option("pagePerPageList")-1;
if(nLastPageOfThisPageList>nLastPage){nFirstPageOfThisPageList=nLastPage-this.option("pagePerPageList")+1;
if(nFirstPageOfThisPageList<1){nFirstPageOfThisPageList=1
}nLastPageOfThisPageList=nLastPage
}}else{var nFirstPageOfThisPageList=(nThisPageList-1)*this.option("pagePerPageList")+1;
var nLastPageOfThisPageList=(nThisPageList)*this.option("pagePerPageList");
if(nLastPageOfThisPageList>nLastPage){nLastPageOfThisPageList=nLastPage
}}if((nThisPageList>1)||(this.option("moveUnit")=="page"&&nPage>1)){if(this._elAPrevEndPage){$Element(this._elPageList).append(this._elAPrevEndPage)
}$Element(this._elPageList).append(this._elAPrevPage);
try{if(this._options.nclk){$Element(this._elPageList).append(nclkCreateCommnetNode(this._options.nclk.attr,this._options.nclk.code,"prev"))
}}catch(e){}}else{if(this._elSpanPrevEndPage){$Element(this._elPageList).append(this._elSpanPrevEndPage)
}if(this._elSpanPrevPage){$Element(this._elPageList).append(this._elSpanPrevPage)
}}for(var i=nFirstPageOfThisPageList;
i<=nLastPageOfThisPageList;
i++){if(i==nPage){var el=this._elCurrentPage.cloneNode(true)
}else{var el=this._elPage.cloneNode(true)
}if(i==nFirstPageOfThisPageList){$Element(el).addClass("first-child")
}$Element(el).text(i.toString());
$Element(this._elPageList).append(el);
try{if(this._options.nclk){$Element(this._elPageList).append(nclkCreateCommnetNode(this._options.nclk.attr,this._options.nclk.code,i))
}}catch(e){}}if((nThisPageList<nLastPageList)||(this.option("moveUnit")=="page"&&nPage<nLastPage)){$Element(this._elPageList).append(this._elANextPage);
if(this._elANextEndPage){$Element(this._elPageList).append(this._elANextEndPage)
}try{if(this._options.nclk){$Element(this._elPageList).append(nclkCreateCommnetNode(this._options.nclk.attr,this._options.nclk.code,"next"))
}}catch(e){}}else{if(this._elSpanNextPage){$Element(this._elPageList).append(this._elSpanNextPage)
}if(this._elSpanNextEndPage){$Element(this._elPageList).append(this._elSpanNextEndPage)
}}},_empty:function(){if(this._elAPrevEndPage){this._elAPrevEndPage=this._elAPrevEndPage.cloneNode(true)
}if(this._elAPrevPage){this._elAPrevPage=this._elAPrevPage.cloneNode(true)
}if(this._elANextEndPage){this._elANextEndPage=this._elANextEndPage.cloneNode(true)
}if(this._elANextPage){this._elANextPage=this._elANextPage.cloneNode(true)
}if(this._elSpanPrevEndPage){this._elSpanPrevEndPage=this._elSpanPrevEndPage.cloneNode(true)
}if(this._elSpanPrevPage){this._elSpanPrevPage=this._elSpanPrevPage.cloneNode(true)
}if(this._elSpanNextEndPage){this._elSpanNextEndPage=this._elSpanNextEndPage.cloneNode(true)
}if(this._elSpanNextPage){this._elSpanNextPage=this._elSpanNextPage.cloneNode(true)
}$Element(this._elPageList).empty()
}}).extend(nhn.Component);
if(typeof nhn=="undefined"){nhn={}
}nhn.TextAreaExpander=$Class({bReduce:false,$init:function(el,htOptions){this.el=$(el);
this.wel=$Element(this.el);
this.option({nInterval:100,nMaxHeight:500,nMinHeight:59,nLineHeight:14,nMaxByte:100,sOverMessage:"입력 가능한 최대 바이트 수를 초과 하였습니다."});
this.option(htOptions);
this._setProperty();
this._bindEvent();
this.setMinHeight()
},_setProperty:function(){this.wel.css({overflow:"hidden","line-height":this.option("nLineHeight")+"px"});
this.el.setAttribute("maxlength",this.option("nMaxByte"));
this.nLineHeight=this.option("nLineHeight");
this.nGap=this.el.offsetHeight-this.el.clientHeight;
this.nMinHeight=this.option("nMinHeight");
this.nMaxHeight=this.option("nMaxHeight");
this.bGecko=!($Agent().navigator().ie||$Agent().navigator().opera)
},_bindEvent:function(){$Fn(this._onFocus,this).attach(this.el,"focus");
$Fn(this._onBlur,this).attach(this.el,"blur")
},_onFocus:function(){this.bReduce=true;
this._clearTimer();
if(this.bStart){this.nTimer=setInterval($Fn(function(){if(this.sPrev!=this.el.value||this.bReduce){this.bReduce=false;
this.checkMaxByte();
this._checkHeight()
}},this).bind(),this.option("nInterval"))
}},checkMaxByte:function(){var nBytes=this.option("nMaxByte");
var wsText=$S(this.el.value);
if(nBytes!=0){if(wsText.$value()!=this.sPrev){if(wsText.bytes()>nBytes){alert(this.option("sOverMessage"));
this.el.value=this.sPrev;
return true
}}}this.sPrev=wsText.$value();
return false
},setMinHeight:function(){this.wel.css({height:this.nMinHeight+"px",overflowY:"hidden"})
},_checkHeight:function(bEnter){var nCurrentHeight=this.el.scrollHeight;
if(this.bGecko){if(nCurrentHeight<=this.nMaxHeight){this.setMinHeight();
this.wel.css({height:this.el.scrollHeight+"px",overflowY:"hidden"});
return 
}}else{nCurrentHeight+=this.nLineHeight
}if(this.nMinHeight>=nCurrentHeight){this.setMinHeight()
}else{if(this.nMaxHeight<nCurrentHeight){this.wel.css({height:this.nMaxHeight+"px",overflowY:"auto"})
}else{this.wel.css({height:nCurrentHeight+"px",overflowY:"hidden"})
}}},_onBlur:function(){this._clearTimer()
},_clearTimer:function(){if(this.nTimer){clearInterval(this.nTimer);
this.nTimer=null
}},focus:function(){this.el.focus()
},startCheck:function(){this.bStart=true
},stopCheck:function(){this.bStart=false
}}).extend(nhn.Component);
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({_defaultError:{requiredError:"{name}が入力されていません。",minError:"{name}は{length}文字以上で入力してください。",maxError:"{name}は{length}文字以下で入力してください。"},$init:function(oOptions){this.elements={};
this.errors={};
this._initialize=false;
this._events={};
this._structure={$selector:"body"};
this._options={validate:{}}
},setOptions:function(oOptions){for(i in oOptions){if(i=="validate"){var oValidate=oOptions.validate;
for(rules in oValidate){for(rule in oValidate[rules]){if(this._options.validate[rules]){this._options.validate[rules][rule]=oValidate[rules][rule]
}}}}else{this._options[i]=oOptions[i]
}}},setElements:function(){this.elements=this.parseStructure(this._structure)
},parseStructure:function(oStructure,oParent){if(!oStructure){return 
}else{if(typeof (oStructure)=="string"){var oElm=null;
if(oParent){oElm=$$(oStructure,oParent)[0]
}else{oElm=$$(oStructure)[0]
}if(!oElm){alert('"'+oStructure+'" が取得できません。')
}return{$element:$Element(oElm)}
}else{if(typeof (oStructure)=="object"){var obj={};
if(oParent){var oElm=$$(oStructure.$selector,oParent)[0]
}else{var oElm=$$(oStructure.$selector)[0]
}obj.$element=$Element(oElm);
for(sKey in oStructure){if(sKey!="$selector"){obj[sKey]=this.parseStructure(oStructure[sKey],obj.$element.$value())
}}return obj
}}}},validate:function(){var oValidate=this._options.validate;
var oErrors={};
var bHasErrors=false;
for(var sItem in oValidate){var oValue=oValidate[sItem].getValue(this);
var oError={};
var bHasError=false;
var bPass=false;
for(var sType in oValidate[sItem]){if(bHasError||bPass){break
}if(sType=="getValue"){continue
}if(typeof (oValidate[sItem][sType])=="function"){if(!oValidate[sItem][sType](this,oValue)){oError[sType]=oValidate[sItem][sType+"Error"].replace("{name}",oValidate[sItem].name||sItem);
bHasError=true
}continue
}if(sType.slice(-5)!="Error"&&!oValidate[sItem][sType+"Error"]){oValidate[sItem][sType+"Error"]=this._defaultError[sType+"Error"]
}switch(sType){case"required":if((typeof (oValue)=="string"&&oValue.length<1)||(typeof (oValue)=="number"&&!oValue)||!oValue){if(oValidate[sItem][sType]==false){bPass=true;
break
}oError[sType]=oValidate[sItem][sType+"Error"];
bHasError=true
}break;
case"max":if(oValue.length>oValidate[sItem][sType]){oError[sType]=oValidate[sItem][sType+"Error"].replace("{length}",oValidate[sItem][sType]);
bHasError=true
}break;
case"min":if(oValue.length<oValidate[sItem][sType]){oError[sType]=oValidate[sItem][sType+"Error"].replace("{length}",oValidate[sItem][sType]);
bHasError=true
}break
}if(oError[sType]){oError[sType]=oError[sType].replace("{name}",oValidate[sItem].name||sItem)
}}if(bHasError){oErrors[sItem]=oError;
bHasErrors=true
}}if(bHasErrors){this.errors=oErrors;
return false
}else{return true
}},showError:function(){var sMessage="";
for(var sKey in this.errors){for(var sType in this.errors[sKey]){sMessage+="・"+this.errors[sKey][sType]+"\n"
}}alert(sMessage)
},_setAjaxForm:function(oElm,sUrl,oOptions,oContext){if(!oContext){oContext=this
}$Fn(function(ev){var oForm=$Element(ev.currentElement);
if(!sUrl){sUrl=oForm.attr("action")
}if(!oOptions){oOptions={}
}var oParams={};
var oInputs=$$("input, textarea, select",oForm.$value());
$A(oInputs).forEach(function(v,i,o){var oInput=$Element(oInputs[i]);
var sName=oInput.attr("name");
var sValue=oInput.$value().value;
if(!sName){return 
}if((oInput.attr("type")=="checkbox"||oInput.attr("type")=="radio")&&!oInput.$value().checked){sValue=""
}oParams[sName]=sValue
});
try{var oAjax=$Ajax(sUrl,oOptions)
}catch(e){alert(e);
ev.stop();
return false
}oAjax.request(oParams);
ev.stop();
return false
},oContext).attach(oElm,"submit")
},_bindEvents:function(){}})
})("nj.Base");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={__singleAlphaLower:"abcdefghijklmnopqrstuvwxyz",__singleAlphaUpper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",__hankaku:"ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮｯﾞﾟｰ､｡｢｣",__reAlphaNumeric:new RegExp("^[0-9a-zA-Z]+$","i"),__reValidPassword:new RegExp("^[0-9a-zA-Z~!@#$%^&*()_+|{}:\"<>?'-=`]+$","i"),__reEmail:new RegExp("^[-\\w]+[-+.\\w]*@(\\w+(\\.?[-\\w])*)(\\.\\w+)+$","i"),__reMobileDomain:new RegExp("^("+["docomo.ne.jp","ezweb.ne.jp","(i.|)softbank.ne.jp","(d|h|t|c|r|k|n|s|q).vodafone.ne.jp","(.*.?|)sky.(tu-ka|tkk|tkc).ne.jp","(d(.?).|wm.|)?pdx.ne.jp","disney.ne.jp","emnet.ne.jp","(.*.|)mnx.ne.jp","mopera.(net|ne.jp)","exweb.ne.jp","(.*.|)ezweb.ne.jp","page.ttm.ne.jp","willcom.com"].join("|")+")$","i"),_getStr:function(oValue){var sValue="";
if(oValue===null){sValue=""
}else{if(typeof oValue=="undefined"){sValue=""
}else{if(typeof oValue=="number"){sValue=oValue.toString()
}else{sValue=oValue
}}}return sValue
},_getByte:function(oValue){var sValue=nj.tool.validate._getStr(oValue);
var nByte=0;
var sHankaku=this.__hankaku;
for(var i=0,l=sValue.length;
i<l;
i++){var nCode=sValue.charAt(i).charCodeAt(0);
if(sHankaku.indexOf(sValue.charAt(i))>=0){nByte+=1
}else{if(nCode>=256){nByte+=2
}else{nByte+=1
}}}return nByte
},checkRequired:function(sValue){if(sValue===""||sValue===null||sValue===false||typeof sValue==="undefined"){return false
}return true
},checkMaxLen:function(sValue,nLen){if(nj.tool.validate._getStr(sValue).length>nLen){return false
}return true
},checkMinLen:function(sValue,nLen){if(nj.tool.validate._getStr(sValue).length<nLen){return false
}return true
},checkMaxByte:function(sValue,nLen){if(nj.tool.validate._getByte(sValue)>nLen){return false
}return true
},checkMinByte:function(sValue,nLen){if(nj.tool.validate._getByte(sValue)<nLen){return false
}return true
},checkMaxValue:function(oValue,nMax){var nValue=oValue.valueOf();
if(nValue>nMax){return false
}return true
},checkMinValue:function(oValue,nMin){var nValue=oValue.valueOf();
if(nValue<nMin){return false
}return true
},checkRegExp:function(oValue,re){sValue=nj.tool.validate._getStr(oValue);
if(!re.test(sValue)){return false
}return true
},checkAlphaNumeric:function(oValue){return nj.tool.validate.checkRegExp(oValue,nj.tool.validate.__reAlphaNumeric)
},checkValidPassword:function(oValue){return nj.tool.validate.checkRegExp(oValue,nj.tool.validate.__reValidPassword)
},checkEmail:function(oValue){return nj.tool.validate.checkRegExp(oValue,nj.tool.validate.__reEmail)
},checkMobileEmail:function(oValue){var sValue=nj.tool.validate._getStr(oValue);
var aSplitValue=sValue.split("@");
if(aSplitValue.length!=2){return false
}var sDomain=aSplitValue[1];
if(!sDomain){return false
}return nj.tool.validate.checkRegExp(sDomain,nj.tool.validate.__reMobileDomain)
},checkNotMobileEmail:function(oValue){return !nj.tool.validate.checkMobileEmail(oValue)
},checkEqual:function(oValue,sLabel,oContext){oContext=oContext||this;
if(oValue==oContext.getValue(sLabel)){return true
}return false
},filterTrim:function(sValue){return sValue.replace(/(^[\s　]*)|([\s　]*$)/g,"")
},filterAlphaUpper:function(sValue){var sRet="";
for(var i=0,l=sValue.length;
i<l;
i++){if(this.__singleAlphaLower.search(sValue[i])===-1){sRet+=sValue[i]
}else{sRet+=sValue[i].toUpperCase()
}}return sRet
},filterAlphaLower:function(sValue){var sRet="";
for(var i=0,l=sValue.length;
i<l;
i++){if(this.__singleAlphaUpper.search(sValue[i])===-1){sRet+=sValue[i]
}else{sRet+=sValue[i].toLowerCase()
}}return sRet
},filterCut:function(sValue,nLen){var sRet=sValue.slice(0,nLen);
return sRet
},filterCutByte:function(sValue,nMaxByte){var nByte=0;
var nItemByte=1;
var sHankaku=this.__hankaku;
var sRet="";
for(var i=0,l=sValue.length;
i<l;
i++){var nCode=sValue.charAt(i).charCodeAt(0);
if(sHankaku.indexOf(sValue.charAt(i))>=0){nByte+=1
}else{if(nCode>=256){nByte+=2
}else{nByte+=1
}}if(nByte>nMaxByte&&i>-1){return sRet
}sRet+=sValue.charAt(i)
}return sValue
},setFormValidate:function(elForm,oRules,fnErrorCallback){if(!elForm){return 
}var sFormId=$Element(elForm).attr("id");
if(!sFormId){sFormId=nj.tool.validate.getUniqueId();
$Element(elForm).attr("id",sFormId)
}oRules=oRules||{};
fnErrorCallback=fnErrorCallback||function(oErrors){var aMessage=[];
for(var i in oErrors){aMessage.push(oErrors[i].message)
}alert(aMessage.join("\n"))
};
var aInputs=$$(["input[type=text]","input[type=password]","input[type=radio]","input[type=checkbox]","textarea","select"].join(","),elForm);
$A(aInputs).forEach(function(el,i){var sName=$Element(el).attr("name");
if(!sName||!oRules[sName]){return 
}var oRule=oRules[sName];
if(!oRule.value){oRule.value=function(){return el.value
}
}oRules[sName]=oRule
});
var oValidator=new nj.tool.validate.Validator(oRules);
var fnOnSubmit=function(ev){if(!oValidator.valid()){var oErrors=oValidator.getErrors();
ev.stop();
fnErrorCallback.apply(oValidator,[oErrors,{id:sFormId}])
}};
$Fn(fnOnSubmit).attach(elForm,"submit");
return oValidator
},getUniqueId:function(nNum,sPrefix){sPrefix=sPrefix||"_f";
nNum=nNum||1000000;
var sId=sPrefix+(new Date()).getTime()+""+Math.round(Math.random()*nNum);
if($(sId)){return nj.tool.validate.getUniqueId(nNum)
}else{return sId
}}}
})("nj.tool.validate");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({_errorMessages:{required:"{name}が未入力です。",minLen:"{name}は最小{minLen}文字です。",maxLen:"{name}は最大{maxLen}文字です。",minByte:"{name}は最小{minByte}バイトです。",maxByte:"{name}は最大{maxByte}バイトです。",email:"{name}は無効なメールアドレスです。",mobileEmail:"{name}に携帯電話のメールアドレスは使用できません。",notMobileEmail:"{name}には携帯電話のメールアドレスは入力できません。",equal:"{name}が一致しません",common:"{name}にエラーが存在します。"},$init:function(oOptions){this._options=oOptions;
this._errors={}
},addError:function(sLabel,sType,oValue,oRule){var sMessage="";
if(typeof (oRule.check[sType+"Error"])=="string"){sMessage=oRule.check[sType+"Error"]
}else{if(this._errorMessages[sType]){sMessage=this._errorMessages[sType]
}else{sMessage=this._errorMessages.common
}}var oReplaces=oRule.check;
oReplaces.name=oRule.name||sLabel;
oReplaces.value=oValue;
for(var i in oReplaces){sMessage=sMessage.replace("{"+i+"}",oReplaces[i])
}this._errors[sLabel]={value:oValue,message:sMessage,type:sType}
},getValue:function(sLabel){var oRule=this._options[sLabel];
if(!oRule){return null
}if(typeof oRule.value=="function"){return oRule.value()
}return oRule.value
},getErrors:function(){return this._errors
},getError:function(sLabel){if(this._errors[sLabel]){return this._errors[sLabel]
}return null
},isError:function(sLabel,sType){var oError=this.getError(sLabel);
if(oError){if(sType){if(oError.type==sType){return true
}return false
}return true
}return false
},getMethodName:function(sPrefix,sName){return sPrefix+sName.substr(0,1).toUpperCase()+sName.substr(1)
},checkByType:function(sLabel,sType,fnError){fnError=fnError||function(){};
var oRule=this._options[sLabel];
if(!oRule||!oRule.check||!oRule.check[sType]){return null
}var oValue=oRule.value;
if(typeof oValue=="function"){oValue=oValue()
}if(typeof oRule.check[sType]=="function"){if(!oRule.check[sType].apply(this,[oValue])){fnError(sLabel,sType,oValue,oRule);
return false
}}var sCheckMethod=this.getMethodName("check",sType);
if(typeof nj.tool.validate[sCheckMethod]=="function"){if(!nj.tool.validate[sCheckMethod].apply(this,[oValue,oRule.check[sType]])){fnError(sLabel,sType,oValue,oRule);
return false
}}return true
},check:function(sLabel,fnError){var self=this;
var sFilterCallbackSuffix="Callback";
var reFilterCallback=new RegExp(".*"+sFilterCallbackSuffix+"$");
if(!fnError){fnError=function(){self.addError.apply(self,arguments)
}
}var oRule=this._options[sLabel];
var oValue=oRule.value;
if(typeof oValue=="function"){oValue=oValue()
}for(var sType in oRule.filter){if(typeof oRule.filter[sType]=="function"&&!reFilterCallback.test(sType)){var oValue=oRule.filter[sType].apply(this,[oValue])
}var sFilterMethod=this.getMethodName("filter",sType);
if(typeof nj.tool.validate[sFilterMethod]=="function"){oValue=nj.tool.validate[sFilterMethod](oValue,oRule.filter[sType],oRule.filter[sType]);
if(typeof oRule.filter[sType+sFilterCallbackSuffix]=="function"){oRule.filter[sType+sFilterCallbackSuffix](oValue)
}}}if(oRule.check&&oRule.check.required){if(!nj.tool.validate.checkRequired(oValue)){fnError(sLabel,"required",oValue,oRule);
return false
}}for(var sType in oRule.check){if(sType=="required"){continue
}if(typeof oRule.check[sType]=="function"){if(!oRule.check[sType].apply(this,[oValue])){fnError(sLabel,sType,oValue,oRule);
return false
}}var sCheckMethod=this.getMethodName("check",sType);
if(typeof nj.tool.validate[sCheckMethod]=="function"){if(!nj.tool.validate[sCheckMethod].apply(this,[oValue,oRule.check[sType]])){fnError(sLabel,sType,oValue,oRule);
return false
}}}return true
},valid:function(){this._errors={};
var nCount=0;
for(var sLabel in this._options){if(this.check(sLabel)===false){nCount+=1
}}if(nCount>0){return false
}return true
}})
})("nj.tool.validate.Validator");
nj.tool.validate.rules={create:function(sTemplate,oRule){oRule=oRule||{};
var _oRule=nj.tool.validate.rules[sTemplate]||{};
for(var i in _oRule){if(typeof _oRule[i]=="object"){if(typeof oRule[i]=="undefined"){oRule[i]={}
}for(var j in _oRule[i]){if(typeof oRule[i][j]=="undefined"){oRule[i][j]=_oRule[i][j]
}}}if(typeof oRule[i]=="undefined"){oRule[i]=_oRule[i]
}}return oRule
},allEmail:{name:"メールアドレス",check:{required:true,email:true,emailError:"無効なメールアドレスです。",maxByte:66,maxByteError:"{name}は{maxByte}文字以内で入力してください。"},filter:{trim:true}},email:{name:"メールアドレス",check:{required:true,email:true,emailError:"無効なメールアドレスです。",notMobileEmail:true,notMobileEmailError:"携帯電話のメールアドレスは使用できません。",maxByte:66,maxByteError:"{name}は{maxByte}文字以内で入力してください。"},filter:{trim:true}},mobileEmail:{name:"携帯電話メールアドレス",check:{email:true,emailError:"無効なメールアドレスです。",mobileEmail:true,mobileEmailError:"携帯電話のメールアドレスを入力してください。"}},password:{name:"パスワード",check:{validPassword:true,validPasswordError:"入力内容に誤りがあります。",minLen:4,minLenError:"入力内容に誤りがあります。",maxLen:10,maxLenError:"入力内容に誤りがあります。"}},nickname:{name:"ユーザー名",check:{required:true,maxLen:20}},captchaValue:{name:"CAPTCHA",check:{required:true,requiredError:"画像の中に表示されている文字を4桁の半角で入力してください。",minLen:4,minLenError:"画像の中に表示されている文字を4桁の半角で入力してください。",maxLen:4,maxLenError:"画像の中に表示されている文字を4桁の半角で入力してください。"}}};
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({resizeFn:null,scrollFn:null,$init:function(oOptions){var self=this;
this._structure={$selector:"div#LoginPanel",message:"p.attention",formArea:{$selector:"div#LoginPanelForm",form:{$selector:"form",txtNaverid:"li.nvrId input",txtPassword:"li.pass input",chkAutosave:"input#idSaveCheck",btnSubmit:"p.loginBtn input"}},btnClose:"div.closeBtn"};
this._options={reset:true,errorTitle:"ログイン失敗",left:0,top:0,loginApi:null,proxyUrl:null,rsaKeysApi:null,onLogin:function(){},onLoginParams:{},onLoginFailure:function(){},overlay:null,base64:true,codes:{SUCCESS:1,RSA_KEY_NAME_BLANK:100,EMAIL_BLANK:200,EMAIL_INVALID:201,MOBILE_EMAIL:202,UNREGISTERED_EMAIL:203,EMAIL_AND_PASSWORD_BLANK:210,PASSWORD_BLANK:300,PASSWORD_INVALID:301,PASSWORD_MISMATCH:302,IN_PENALTY:400,SESSION_FAIL:500,SERVER_INTERNAL_ERROR:600},validateRules:{email:nj.tool.validate.rules.create("allEmail",{name:"メールアドレス",value:function(){return self.elements.formArea.form.txtNaverid.$element.$value().value
}}),password:nj.tool.validate.rules.create("password",{name:"パスワード",value:function(){return self.elements.formArea.form.txtPassword.$element.$value().value
},check:{required:true}})}};
this.setOptions(oOptions);
this.setElements();
if(this._options.validateRules){this.validate=new nj.tool.validate.Validator(this._options.validateRules)
}this._submittedEmail="";
this._currentLoginParams=null;
this._login=false;
this._bindEvents();
nj.Login.__instance=this
},open:function(oOptions){if(!oOptions){oOptions={}
}var oOffset={top:this._options.top,left:this._options.left};
if(oOptions.element){var oElm=$Element(oOptions.element);
oOffset=oElm.offset()
}if(oOptions.left){oOffset.left=oOptions.left
}if(oOptions.top){oOffset.top=oOptions.top
}this.elements.$element.css({position:"absolute"});
this.elements.$element.$value().style.top=oOffset.top+"px";
this.elements.$element.$value().style.left=oOffset.left+"px";
this._currentLoginParams=null;
if(oOptions.onLoginParams){this._currentLoginParams=oOptions.onLoginParams
}if(this._options.reset){this.reset()
}this.displayFormArea();
if(oOptions.center){this._setWindowPos();
this.resizeFn=$Fn(this._resize,this).attach(window,"resize");
this.scrollFn=$Fn(this._resize,this).attach(window,"scroll")
}else{if(this.resizeFn){this.resizeFn.detach(window,"resize");
this.scrollFn.detach(window,"scroll")
}}if(this._options.overlay){var self=this;
this._options.overlay.show(function(oOverlay){self.elements.$element.show();
$Fn(function(ev){self.close()
},self).attach(self._options.overlay.element.$value(),"click")
})
}else{this.elements.$element.show()
}},close:function(){this.reset();
this.elements.$element.hide();
if(this._options.overlay){this._options.overlay.hide()
}if(this.resizeFn){this.resizeFn.detach(window,"resize");
this.resizeFn=null
}if(this.scrollFn){this.scrollFn.detach(window,"scroll");
this.scrollFn=null
}},isLogin:function(){if(this._login===true){return true
}return false
},reset:function(){var oForm=this.elements.formArea.form;
oForm.txtNaverid.$element.$value().value="";
oForm.txtPassword.$element.$value().value=""
},displayFormArea:function(){this.elements.message.$element.empty().hide();
this.elements.formArea.$element.show()
},getOnLoginParams:function(){if(this._currentLoginParams){return this._currentLoginParams
}else{return this._options.onLoginParams
}},getSubmittedEmail:function(){return this._submittedEmail
},_bindEvents:function(){var self=this;
var oForm=this.elements.formArea.form;
$Fn(this._onFormSubmit,this).attach(oForm.$element,"submit");
this._bindFocusEvent(oForm.txtNaverid.$element);
this._bindFocusEvent(oForm.txtPassword.$element);
$Fn(function(ev){this.close();
ev.stop();
return false
},this).attach(this.elements.btnClose.$element,"click")
},_bindFocusEvent:function(oElm){var sClass="focus";
var sMsgClass="message";
$Fn(function(ev){oElm.addClass(sClass);
oElm.removeClass(sMsgClass)
},this).attach(oElm,"focus");
$Fn(function(ev){oElm.removeClass(sClass);
if(oElm.$value().value==""){oElm.addClass(sMsgClass)
}},this).attach(oElm,"blur")
},_onFormSubmit:function(ev){if(this.validate&&!this.validate.valid()){var sErrorMessage="";
if(this.validate.isError("email","required")&&this.validate.isError("password","required")){sErrorMessage="メールアドレスとパスワードが未入力です。"
}else{if(!this.validate.isError("password")&&this.validate.isError("email","required")){sErrorMessage="メールアドレスが未入力です。"
}else{if(!this.validate.isError("email")&&this.validate.isError("password","required")){sErrorMessage="パスワードが未入力です。"
}else{if(this.validate.isError("email")||this.validate.isError("password")){sErrorMessage="入力内容に誤りがあります。"
}else{sErrorMessage="入力内容に誤りがあります。"
}}}}this._showErrorMessage("<strong>"+sErrorMessage+"</strong><br />");
ev.stop();
return 
}var sRsaKeysApi=this._options.rsaKeysApi;
this._submittedEmail=this.elements.formArea.form.txtNaverid.$element.$value().value;
try{nj.crypto.initRsaKeys(sRsaKeysApi,this._onRsaKeysLoad,this)
}catch(e){alert(e)
}ev.stop()
},_showErrorMessage:function(sMessage,sTitle){this.elements.message.$element.show().html(sMessage);
this.elements.formArea.form.txtPassword.$element.$value().value=""
},_onRsaKeysLoad:function(){if(!nj.crypto.hasRsaKeys()){alert(nj.crypto.error.rsa);
return 
}var self=this;
var oForm=this.elements.formArea.form;
var oKeys=nj.crypto.getSplitRsaKey();
var oParams={email:nj.crypto.rsaEncrypt(oForm.txtNaverid.$element.$value().value,null,null,this._options.base64),password:nj.crypto.rsaEncrypt(oForm.txtPassword.$element.$value().value,null,null,this._options.base64),rsaKeyName:oKeys.keyname,autoLogin:""};
if(this._options.base64){oParams.enc="b"
}if(oForm.chkAutosave.$element.$value().checked){oParams.autoLogin="Y"
}var oOptions={method:"post",type:"iframe",proxy:this._options.proxyUrl,onload:function(oRes){var oJson=oRes.json();
if(oJson.status!=self._options.codes.SUCCESS){self._showErrorMessage(oJson.message);
if(self._options.onLoginFailure){self._options.onLoginFailure(oRes,self.getOnLoginParams())
}self._login=false;
return 
}self.reset();
self._login=true;
self._options.onLogin(oRes,self.getOnLoginParams())
}};
var oAjax=$Ajax(this._options.loginApi,oOptions);
oAjax.request(oParams)
},_setWindowPos:function(){this._setElmCenter($("LoginPanel"))
},_resize:function(){this._setWindowPos()
},_getPosition:function(el){var pos={x:el.offsetLeft,y:el.offsetTop};
while(el.offsetParent){el=el.offsetParent;
pos.x+=el.offsetLeft;
pos.y+=el.offsetTop;
if(el!=document.body&&el!=document.documentElement){pos.x-=el.scrollLeft;
pos.y-=el.scrollTop
}}return pos
},_getContentSize:function(elm){elm=$Element(elm);
if(elm.css("display")=="none"){elm.css("visibility","hidden");
elm.show();
var hideFlg=true
}var w=elm.width();
var h=elm.height();
if(hideFlg){elm.hide();
elm.css("visibility","visible")
}return{w:w,h:h}
},_getWindowSize:function(){var wSize=new Object();
if($Agent().navigator().ie){wSize.w=document.documentElement.clientWidth;
wSize.h=document.documentElement.clientHeight
}else{wSize.w=window.innerWidth;
wSize.h=window.innerHeight
}return wSize
},_getPageSize:function(){var xScroll,yScroll;
if(document.compatMode&&document.compatMode!="BackCompat"){xScroll=document.documentElement.scrollWidth;
yScroll=document.documentElement.scrollHeight
}else{xScroll=document.body.scrollWidth;
yScroll=document.body.scrollHeight
}var windowWidth,windowHeight;
if(self.innerHeight){windowWidth=self.innerWidth;
windowHeight=self.innerHeight
}else{if(document.compatMode&&document.compatMode!="BackCompat"){windowWidth=document.documentElement.clientWidth;
windowHeight=document.documentElement.clientHeight
}else{windowWidth=document.body.clientWidth;
windowHeight=document.body.clientHeight
}}var pageHeight=Math.max(windowHeight,yScroll);
var pageWidth=Math.max(windowWidth,xScroll);
arrayPageSize=new Array(pageWidth,pageHeight,windowWidth,windowHeight);
return arrayPageSize
},_setElmCenter:function(elm){elm=$Element(elm);
var wSize=this._getWindowSize();
var pSize=this._getPageSize();
var cSizeObj=this._getContentSize(elm);
var st=document.documentElement.scrollTop||document.body.scrollTop;
var sl=document.documentElement.scrollLeft||document.body.scrollLeft;
elm.css({left:"0px",top:"0px"});
elm.css({left:parseInt(pSize["2"]/2-cSizeObj.w/2+sl)+"px",top:parseInt(pSize["3"]/2-cSizeObj.h/2+st)+"px"})
},windowClick:function(e){if(!e.element.tagName.match(/^a$/i)){e.stop()
}}}).extend(nj.Base)
})("nj.Login");
nj.Login.setHtml=function(oOptions){try{lcs_do({sti:"layer_login"})
}catch(e){}var oLayerOptions={id:"LoginPanel"};
if(oOptions&&oOptions.layer){for(var i in oOptions.layer){oLayerOptions[i]=oOptions.layer[i]
}}var oOverlayOptions=null;
if(oOptions&&oOptions.overlay){oOverlayOptions={show:false};
for(var i in oOptions.overlay){oOverlayOptions[i]=oOptions.overlay[i]
}}var sImgServer="http://static.naver.jp/nvCommon";
var sHtml='<div class="LoginPanelArea"><h1><a href="http://naver.jp"><img height="10" width="53" alt="NAVER" src="'+sImgServer+'/img/h1_naver_s.gif" class="h1logo" /></a><img src="'+sImgServer+'/img/h1_login.gif" alt="ログイン" class="h1title" /></h1><p class="info">利用には無料会員登録が必要です。</p><div id="LoginPanelForm" style="display: block;"><form action="#" id="loginForm" name="loginForm" style="margin:0px;padding:0;"><div class="registerArea"><h2><a href="{joinURL}"><img src="'+sImgServer+'/img/btn_register.gif" alt="無料会員登録" /></a></h2><dl><dt>無料会員登録で何ができる？</dt>	<dd><ul><li>・みんなが今、見つけた「いいよね」を<span class="picktxt">"ピック"</span>していくサービス <em class="picktxt">pick</em></li>	<li>・無料で<span class="fontVerdana">5GB</span>のファイル保存<em><span class="fontVerdana">N</span>ドライブ</em></li></ul>	</dd></dl><!--/.registerArea--></div>	<div class="loginArea"><h2 style="display:none;">ログインフォーム</h2><p class="attention" style="display: none;"></p><ul class="formList">	<li class="nvrId"><h3 style="display:none;">メールアドレス</h3><div class="cont"><input type="text" class="input message" value="" /></div>	<!--上に変更<div class="cont"><input type="text" class="input" onfocus="this.style.backgroundImage=\'none\'" style="background-image: none;" /></div>--></li><li class="pass"><h3 style="display:none;">パスワード</h3><div class="cont"><input type="password" class="input message" maxlength="30" value="" /></div></li></ul><p class="loginBtn"><input type="image" src="'+sImgServer+'/img/btn_login_s.gif" alt="ログイン" /></p><ul class="supportNavi"><li class="idSave"><input type="checkbox" id="idSaveCheck" checked /><label for="idSaveCheck"> 次回から入力を省略</label></li><li class="lost"><a href="{myInfoURL}">パスワードをお忘れの方</a></li></ul>	<!--/.loginArea--></div></form><!--/#LoginPanelForm--></div><div class="closeBtn"><img height="9" width="9" src="'+sImgServer+'/img/btn_close.gif" alt="閉じる" /></div><!--/.LoginPanelArea--></div>';
var myInfoURL="https://ssl.naver.jp/reminder/form";
var joinURL="https://ssl.naver.jp/join";
sHtml=sHtml.replace("{myInfoURL}",myInfoURL).replace("{joinURL}",joinURL);
var loginDivElmObj=$("<div>");
loginDivElmObj.id=oLayerOptions.id;
var oOverlay=null;
if(oOverlayOptions){oOverlay=new nj.ui.Overlay(oOverlayOptions)
}$Element(document.body).append(loginDivElmObj);
$Element(loginDivElmObj).html(sHtml).css({display:"none",zIndex:999});
return oOverlay
};
nj.Login.getInstance=function(){if(typeof nj.Login.__instance=="object"){return nj.Login.__instance
}return null
};
if(typeof (nj.crypto)=="undefined"){nj.crypto={_NAVER_RSA_KEYS:null,error:{rsa:"暗号化キーが取得できなかったためログイン処理を行えません。画面を更新するか再度時間をおいてアクセスして下さい。"},initRsaKeys:function(sUrl,fCallback,oContext){fCallback=fCallback||function(){};
oContext=oContext||document.window;
var oAjax=new $Ajax(sUrl,{type:"jsonp",method:"get",jsonp_charset:"utf-8",onload:function(oRes){nj.crypto.setRsaKeys(oRes.json());
fCallback.call(oContext)
}});
oAjax.request()
},setRsaKeys:function(oRes){if(!nj.crypto.hasRsaKeys()){if(!oRes){alert(nj.crypto.error.rsa);
return false
}else{nj.crypto._NAVER_RSA_KEYS=oRes;
return true
}}},hasRsaKeys:function(){if(nj.crypto._NAVER_RSA_KEYS==null){return false
}else{return true
}},rsaEncrypt:function(sPlain,sEvalue,sNvalue,bBase64){if(typeof bBase64=="undefined"){bBase64=true
}if(!nj.crypto._NAVER_RSA_KEYS){return null
}if(sPlain.length==0){return""
}if(bBase64){sPlain=Base64.encode(sPlain)
}var sSessionKey=nj.crypto._NAVER_RSA_KEYS.session_key;
var oKeys=nj.crypto.getSplitRsaKey();
sEvalue=sEvalue||oKeys.evalue;
sNvalue=sNvalue||oKeys.nvalue;
var oRsa=new RSAKey();
oRsa.setPublic(sEvalue,sNvalue);
var sCrypt=oRsa.encrypt(sPlain);
return sCrypt
},getSplitRsaKey:function(){var aSplitRsakey=nj.crypto._NAVER_RSA_KEYS.rsa_key.split(",");
if(aSplitRsakey.length<3){return 
}var oRes={keyname:aSplitRsakey[0],evalue:aSplitRsakey[1],nvalue:aSplitRsakey[2]};
return oRes
}}
}(function(B){var A=$.verifyPackageName(B);
A.container[A.name]=$Class({$init:function(){this.easeObj=$(arguments[0]);
if(!this.easeObj){return 
}this.defaultOptions={sec:1,ease:"linear",delay:0,onStart:null,onStartParams:null,onUpdate:null,onUpdateParams:null,onComplete:null,onCompleteParams:null,axis:null};
this.onEasing=false;
this.objects=[];
this.easingFunctionsLowerCase={};
for(var C in easingFunctions){this.easingFunctionsLowerCase[C.toLowerCase()]=easingFunctions[C]
}},_toNum:function(C){return(C+"").match(/[0-9\.]/)?Number((C+"").replace(/[^0-9\.-]/g,"")):0
},_fill:function(C,D){return C.replace(/\[(.*?)\]/g,function(F,E){var G=E.replace(/^\s*(.*?)\s*/,"$1");
return D[G]?D[G]:D[G]==0?D[G]:""
})
},_easeFunc:function(C){return !C?null:(typeof C=="function")?C:this.easingFunctionsLowerCase[C.toLowerCase()]
},tween:function(C){var F={};
F.target=this.easeObj;
F.targetPropeties={};
for(var D in this.defaultOptions){if(C[D]||C[D]==0){F[D]=C[D];
delete C[D]
}else{F[D]=this.defaultOptions[D]
}}F.easing=this._easeFunc.call(this,F.ease);
for(var D in C){var E=C[D];
var H=(!!E.from||E.from==0)?E.from:this._toNum($Element(this.easeObj).css(D));
if(D=="alpha"){var H=(!!E.from||E.from==0)?E.from:this._toNum($Element(this.easeObj).css("opacity"))
}F.targetPropeties[D]={direct:{from:H,to:E.to-H},unit:E.unit||"",template:E.template||"[value]px",filter:E.filter||function(I){return{value:I}
},easing:this._easeFunc.call(this,E.ease)||F.easing};
if(D=="height"&&F.axis=="center"){F.targetPropeties.top={direct:{from:this._toNum($Element(this.easeObj).css("top")),to:-(E.to-H)/2},unit:E.unit||"",template:E.template||"[value]px",filter:E.filter||function(I){return{value:I}
},easing:this._easeFunc.call(this,E.ease)||F.easing}
}if(D=="width"&&F.axis=="center"){F.targetPropeties.left={direct:{from:this._toNum($Element(this.easeObj).css("left")),to:-(E.to-H)/2},unit:E.unit||"",template:E.template||"[value]px",filter:E.filter||function(I){return{value:I}
},easing:this._easeFunc.call(this,E.ease)||F.easing}
}}var G=this;
setTimeout(function(){F.startTime=(new Date()-0);
F.endTime=(F.sec*1000)+F.startTime;
if(typeof F.onStart=="function"){if(F.onStartParams){F.onStart.apply(F,F.onStartParams)
}else{F.onStart()
}}G.objects.push(F);
if(!G.onEasing){G.onEasing=true;
G._eventLoop.call(G)
}},F.delay*1000)
},_eventLoop:function(){var D=(new Date()-0);
for(var G=0;
G<this.objects.length;
G++){var E=this.objects[G];
var M=D-E.startTime;
var I=E.endTime-E.startTime;
if(M>=I){for(var L in E.targetPropeties){var C=E.targetPropeties[L];
var K=C.direct.from;
var J=C.direct.to;
if(L=="alpha"){$Element(E.target).opacity(C.filter(J+K).value)
}else{$Element(E.target).css(L,this._fill(C.template,C.filter(J+K)))
}}this.objects.splice(G,1);
if(typeof E.onComplete=="function"){if(E.onCompleteParams){E.onComplete.apply(E,E.onCompleteParams)
}else{E.onComplete()
}}}else{for(var L in E.targetPropeties){var C=E.targetPropeties[L];
var K=C.direct.from;
var J=C.direct.to;
var F=C.easing(M,K,J,I);
if(L=="alpha"){$Element(E.target).opacity(C.filter(F).value)
}else{$Element(E.target).css(L,this._fill(C.template,C.filter(F)))
}}if(typeof E.onUpdate=="function"){if(E.onUpdateParams){E.onUpdate.apply(E,E.onUpdateParams)
}else{E.onUpdate()
}}}}if(this.objects.length>0){var H=this;
setTimeout(function(){H._eventLoop()
},10)
}else{this.onEasing=false
}}});
easingFunctions={linear:function(D,C,F,E){return F*D/E+C
},easeInQuad:function(D,C,F,E){return F*(D/=E)*D+C
},easeOutQuad:function(D,C,F,E){return -F*(D/=E)*(D-2)+C
},easeInOutQuad:function(D,C,F,E){if((D/=E/2)<1){return F/2*D*D+C
}return -F/2*((--D)*(D-2)-1)+C
},easeInCubic:function(D,C,F,E){return F*(D/=E)*D*D+C
},easeOutCubic:function(D,C,F,E){return F*((D=D/E-1)*D*D+1)+C
},easeInOutCubic:function(D,C,F,E){if((D/=E/2)<1){return F/2*D*D*D+C
}return F/2*((D-=2)*D*D+2)+C
},easeOutInCubic:function(D,C,F,E){if(D<E/2){return easingFunctions.easeOutCubic(D*2,C,F/2,E)
}return easingFunctions.easeInCubic((D*2)-E,C+F/2,F/2,E)
},easeInQuart:function(D,C,F,E){return F*(D/=E)*D*D*D+C
},easeOutQuart:function(D,C,F,E){return -F*((D=D/E-1)*D*D*D-1)+C
},easeInOutQuart:function(D,C,F,E){if((D/=E/2)<1){return F/2*D*D*D*D+C
}return -F/2*((D-=2)*D*D*D-2)+C
},easeOutInQuart:function(D,C,F,E){if(D<E/2){return easingFunctions.easeOutQuart(D*2,C,F/2,E)
}return easingFunctions.easeInQuart((D*2)-E,C+F/2,F/2,E)
},easeInQuint:function(D,C,F,E){return F*(D/=E)*D*D*D*D+C
},easeOutQuint:function(D,C,F,E){return F*((D=D/E-1)*D*D*D*D+1)+C
},easeInOutQuint:function(D,C,F,E){if((D/=E/2)<1){return F/2*D*D*D*D*D+C
}return F/2*((D-=2)*D*D*D*D+2)+C
},easeOutInQuint:function(D,C,F,E){if(D<E/2){return easingFunctions.easeOutQuint(D*2,C,F/2,E)
}return easingFunctions.easeInQuint((D*2)-E,C+F/2,F/2,E)
},easeInSine:function(D,C,F,E){return -F*Math.cos(D/E*(Math.PI/2))+F+C
},easeOutSine:function(D,C,F,E){return F*Math.sin(D/E*(Math.PI/2))+C
},easeInOutSine:function(D,C,F,E){return -F/2*(Math.cos(Math.PI*D/E)-1)+C
},easeOutInSine:function(D,C,F,E){if(D<E/2){return easingFunctions.easeOutSine(D*2,C,F/2,E)
}return easingFunctions.easeInSine((D*2)-E,C+F/2,F/2,E)
},easeInExpo:function(D,C,F,E){return(D==0)?C:F*Math.pow(2,10*(D/E-1))+C-F*0.001
},easeOutExpo:function(D,C,F,E){return(D==E)?C+F:F*1.001*(-Math.pow(2,-10*D/E)+1)+C
},easeInOutExpo:function(D,C,F,E){if(D==0){return C
}if(D==E){return C+F
}if((D/=E/2)<1){return F/2*Math.pow(2,10*(D-1))+C-F*0.0005
}return F/2*1.0005*(-Math.pow(2,-10*--D)+2)+C
},easeOutInExpo:function(D,C,F,E){if(D<E/2){return easingFunctions.easeOutExpo(D*2,C,F/2,E)
}return easingFunctions.easeInExpo((D*2)-E,C+F/2,F/2,E)
},easeInCirc:function(D,C,F,E){return -F*(Math.sqrt(1-(D/=E)*D)-1)+C
},easeOutCirc:function(D,C,F,E){return F*Math.sqrt(1-(D=D/E-1)*D)+C
},easeInOutCirc:function(D,C,F,E){if((D/=E/2)<1){return -F/2*(Math.sqrt(1-D*D)-1)+C
}return F/2*(Math.sqrt(1-(D-=2)*D)+1)+C
},easeOutInCirc:function(D,C,F,E){if(D<E/2){return easingFunctions.easeOutCirc(D*2,C,F/2,E)
}return easingFunctions.easeInCirc((D*2)-E,C+F/2,F/2,E)
},easeInElastic:function(E,C,I,H,D,G){var F;
if(E==0){return C
}if((E/=H)==1){return C+I
}if(!G){G=H*0.3
}if(!D||D<Math.abs(I)){D=I;
F=G/4
}else{F=G/(2*Math.PI)*Math.asin(I/D)
}return -(D*Math.pow(2,10*(E-=1))*Math.sin((E*H-F)*(2*Math.PI)/G))+C
},easeOutElastic:function(E,C,I,H,D,G){var F;
if(E==0){return C
}if((E/=H)==1){return C+I
}if(!G){G=H*0.3
}if(!D||D<Math.abs(I)){D=I;
F=G/4
}else{F=G/(2*Math.PI)*Math.asin(I/D)
}return(D*Math.pow(2,-10*E)*Math.sin((E*H-F)*(2*Math.PI)/G)+I+C)
},easeInOutElastic:function(E,C,I,H,D,G){var F;
if(E==0){return C
}if((E/=H/2)==2){return C+I
}if(!G){G=H*(0.3*1.5)
}if(!D||D<Math.abs(I)){D=I;
F=G/4
}else{F=G/(2*Math.PI)*Math.asin(I/D)
}if(E<1){return -0.5*(D*Math.pow(2,10*(E-=1))*Math.sin((E*H-F)*(2*Math.PI)/G))+C
}return D*Math.pow(2,-10*(E-=1))*Math.sin((E*H-F)*(2*Math.PI)/G)*0.5+I+C
},easeOutInElastic:function(E,C,H,G,D,F){if(E<G/2){return easingFunctions.easeOutElastic(E*2,C,H/2,G,D,F)
}return easingFunctions.easeInElastic((E*2)-G,C+H/2,H/2,G,D,F)
},easeInBack:function(D,C,G,F,E){if(E==undefined){E=1.70158
}return G*(D/=F)*D*((E+1)*D-E)+C
},easeOutBack:function(D,C,G,F,E){if(E==undefined){E=1.70158
}return G*((D=D/F-1)*D*((E+1)*D+E)+1)+C
},easeInOutBack:function(D,C,G,F,E){if(E==undefined){E=1.70158
}if((D/=F/2)<1){return G/2*(D*D*(((E*=(1.525))+1)*D-E))+C
}return G/2*((D-=2)*D*(((E*=(1.525))+1)*D+E)+2)+C
},easeOutInBack:function(D,C,G,F,E){if(D<F/2){return easingFunctions.easeOutBack(D*2,C,G/2,F,E)
}return easingFunctions.easeInBack((D*2)-F,C+G/2,G/2,F,E)
},easeInBounce:function(D,C,F,E){return F-easingFunctions.easeOutBounce(E-D,0,F,E)+C
},easeOutBounce:function(D,C,F,E){if((D/=E)<(1/2.75)){return F*(7.5625*D*D)+C
}else{if(D<(2/2.75)){return F*(7.5625*(D-=(1.5/2.75))*D+0.75)+C
}else{if(D<(2.5/2.75)){return F*(7.5625*(D-=(2.25/2.75))*D+0.9375)+C
}else{return F*(7.5625*(D-=(2.625/2.75))*D+0.984375)+C
}}}},easeInOutBounce:function(D,C,F,E){if(D<E/2){return easingFunctions.easeInBounce(D*2,0,F,E)*0.5+C
}else{return easingFunctions.easeOutBounce(D*2-E,0,F,E)*0.5+F*0.5+C
}},easeOutInBounce:function(D,C,F,E){if(D<E/2){return easingFunctions.easeOutBounce(D*2,C,F/2,E)
}else{return easingFunctions.easeInBounce((D*2)-E,C+F/2,F/2,E)
}}}
})("nj.fx");
$Element.prototype.storage=function(sKey,vValue){var oData=$Element._getStorageData(this._element);
var leng=arguments.length;
if(leng==1){return oData[sKey]
}else{oData[sKey]=vValue;
return this
}};
$Element._getStorageData=function(oEle){var uid=oEle._uid;
var oData=$Element._storageData[uid];
if(!oData){uid=oEle._uid=++$Element._storageData._uid;
oData=$Element._storageData[uid]={}
}return oData
};
$Element.prototype.cleanStorage=function(sKey){var leng=arguments.length;
var uid=this._element._uid;
if(uid){if(leng==1){delete $Element._storageData[uid][sKey]
}else{if(leng==0){delete $Element._storageData[uid]
}}}return this
};
$Element._storageData={_uid:0};
nhn.DragArea=$Class({_bIsEventAttached:false,$init:function(el,oOptions){this.option({className:"dragable",flowOut:true,threshold:0});
this.option(oOptions||{});
this._el=el;
this._oDragInfo=null;
this._bIsDragging=false;
this._wfOnMouseDown=$Fn(this._onMouseDown,this);
this._wfOnMouseMove=$Fn(this._onMouseMove,this);
this._wfOnMouseUp=$Fn(this._onMouseUp,this);
this._wfOnDragStart=$Fn(this._onDragStart,this);
this._wfOnSelectStart=$Fn(this._onSelectStart,this);
this.attachEvent()
},_findElement:function(el){var self=this;
var sClass="."+this.option("className");
var isParentOf=function(el){if(!self._el.tagName||self._el===el){return true
}return $Element(self._el).isParentOf(el)
};
var el=cssquery.test(el,sClass)?el:cssquery.getSingle("! "+sClass,el);
if(!isParentOf(el)){el=null
}return el
},isEventAttached:function(){return this._bIsEventAttached
},isDragging:function(){return this._bIsDragging&&this._oDragInfo.prepare==false
},attachEvent:function(){if(this.isEventAttached()){return 
}this._wfOnMouseDown.attach(this._el,"mousedown");
this._wfOnDragStart.attach(this._el,"dragstart");
this._wfOnSelectStart.attach(this._el,"selectstart");
this._bIsEventAttached=true
},detachEvent:function(){if(!this.isEventAttached()){return 
}this._wfOnMouseDown.detach(this._el,"mousedown");
this._wfOnDragStart.detach(this._el,"dragstart");
this._wfOnSelectStart.detach(this._el,"selectstart");
this._bIsEventAttached=false
},_onMouseDown:function(e){var el=this._findElement(e.element);
if(!el){return 
}var oPos=e.pos();
this._oDragInfo={prepare:true,button:e._event.button,handle:el,element:el,pageX:oPos.pageX,pageY:oPos.pageY};
this._bIsDragging=true;
this.fireEvent("handledown",{handle:el,element:el,event:e});
this._wfOnMouseMove.attach(document,"mousemove");
this._wfOnMouseUp.attach(document,"mouseup");
e.stop($Event.CANCEL_DEFAULT)
},_onMouseMove:function(e){if(!this._bIsDragging){return 
}var bIsIE=$Agent().navigator().ie;
if(bIsIE&&this._oDragInfo.button!=e._event.button){this._onMouseUpFn.bind();
return 
}var oInfo=this._oDragInfo;
var oPos=e.pos();
if(oInfo.prepare){var nThreshold=this.option("threshold");
if(nThreshold){var oDiff={pageX:oPos.pageX-oInfo.pageX,pageY:oPos.pageY-oInfo.pageY};
var nDistance=Math.sqrt(oDiff.pageX*oDiff.pageX+oDiff.pageY*oDiff.pageY);
if(nThreshold>nDistance){return 
}}var el=this._findElement(e.element);
var oParam={area:this._el,handle:oInfo.handle,element:oInfo.element,event:e};
if(!this.fireEvent("dragstart",oParam)){this._bIsDragging=false;
return 
}var eDrag=$Element(oParam.element);
oInfo.prepare=false;
oInfo.handle=oParam.handle;
oInfo.element=oParam.element;
oInfo.objectX=parseInt(eDrag.css("left"))||0;
oInfo.objectY=parseInt(eDrag.css("top"))||0
}var oGap={x:oPos.pageX-oInfo.pageX,y:oPos.pageY-oInfo.pageY};
var oParam={area:this._el,handle:oInfo.handle,element:oInfo.element,event:e,x:oInfo.objectX+oGap.x,y:oInfo.objectY+oGap.y,gapX:oGap.x,gapY:oGap.y};
if(!this.fireEvent("beforedrag",oParam)){return 
}if(this.option("flowOut")==false){var oElement=oParam.element;
var oParent=cssquery.getSingle("! [@position!=static]",oParam.element);
var aSize=[oElement.offsetWidth,oElement.offsetHeight];
var oRect=oParent?{width:oParent.clientWidth,height:oParent.clientHeight}:$Document().clientSize();
if($Agent().navigator().ie||$Agent().navigator().safari){oRect.width=Number($Element(oParent).css("width").replace("px",""));
oRect.height=Number($Element(oParent).css("height").replace("px",""))
}if(oParam.x!==null){if(oParam.x<0){oParam.x=0
}else{if(oParam.x+aSize[0]>oRect.width){oParam.x=oRect.width-aSize[0]
}}}if(oParam.y!==null){if(oParam.y<0){oParam.y=0
}else{if(oParam.y+aSize[1]>oRect.height){oParam.y=oRect.height-aSize[1]
}}}}var oDrag=oInfo.element;
if(oParam.x!==null){oDrag.style.left=oParam.x+"px"
}if(oParam.y!==null){oDrag.style.top=oParam.y+"px"
}if(!this.fireEvent("drag",oParam)){return 
}},_onMouseUp:function(e){if(!this._bIsDragging){return 
}this._wfOnMouseMove.detach(document,"mousemove");
this._wfOnMouseUp.detach(document,"mouseup");
var oInfo=this._oDragInfo;
if(oInfo.prepare!==true){var oDrag=oInfo.element;
var eDrag=$Element(oDrag);
if(!this.fireEvent("dragend",{area:this._el,handle:oInfo.handle,element:oInfo.element,event:e,x:parseInt(eDrag.css("left"))||0,y:parseInt(eDrag.css("top"))||0})){return 
}}if(this._bIsDragging){this.fireEvent("handleup",{handle:oInfo.handle,element:oInfo.element,event:e})
}this._bIsDragging=false
},_onDragStart:function(e){e.stop()
},_onSelectStart:function(e){if(this._findElement(e.element)){e.stop()
}}}).extend(nhn.Component);
nj.ImageCrop=$Class({_oOption:"",$init:function(sId,sUrl,oOption,sLayerId,fCallBack){this._cropElement=$(sId);
this._oOption=oOption;
this.fCallBack=fCallBack||function(){};
this.isSmallSize=false;
this._oimgCropper=$Element(cssquery.getSingle(".img_cropper",this.crop));
this._oBackgroundEle=$Element(cssquery.getSingle(".background",this.crop));
this._oScroll=$Element(cssquery.getSingle(".img_scroll",this.crop));
this._oMaskEle=$Element(cssquery.getSingle(".mask",this.crop));
this._oCropArea=$Element(cssquery.getSingle(".crop_area",this.crop));
this._oCropObjectArea=$Element(cssquery.getSingle(".crop_object",this.crop));
this._oCropObject=$Element(cssquery.getSingle(".crop_object img",this.crop));
this._oPriview=$Element(cssquery.getSingle(".crop_preview",this.crop));
this._oPriviewBack=$Element(cssquery.getSingle(".crop_preview img",this.crop));
this._oforSize=$Element(cssquery.getSingle(".crop_hidden",this.crop));
this._oLayerId=sLayerId?$Element($(sLayerId)):"";
this.border={width:this.deletePx(this._oCropArea.css("borderRightWidth"))+this.deletePx(this._oCropArea.css("borderLeftWidth")),height:this.deletePx(this._oCropArea.css("borderTopWidth"))+this.deletePx(this._oCropArea.css("borderBottomWidth"))};
this.setEtc(sUrl)
},setEtc:function(sUrl){this.dragActionSet();
this.setCropLimited();
this._previewRate=this._oOption.thumbSize.x/this._oOption.thumbSize.y;
var fn=$Fn($Fn(this.imageLoad,this).bind(sUrl));
this._oforSize.storage("loadFunc",fn);
fn.attach(this._oforSize.$value(),"load");
this._oforSize.attr("src",sUrl);
this.beforeScrollGap={x:0,y:0}
},setRate:function(){this._previewRate.x=this._oOption.thumbSize.x/this._oOption.thumbSize.y;
this._previewRate.y=this._oOption.thumbSize.x/this._oOption.thumbSize.y;
SSS
},setCropLimited:function(){var x=this._oOption.thumbSize.x;
var y=this._oOption.thumbSize.y;
if(x>y){this.croplimited={x:40,y:y*40/x}
}else{this.croplimited={x:x*40/y,y:40}
}},dragActionSet:function(){var aDragPoint=cssquery(".drag_point",this.crop);
$Element(aDragPoint[0]).storage("action","topLeftResize");
$Element(aDragPoint[1]).storage("action","topRightResize");
$Element(aDragPoint[2]).storage("action","bottomLeftResize");
$Element(aDragPoint[3]).storage("action","bottomRightResize")
},smallImageSizeThanThumbSize:function(sUrl,width,height,thumbSize){this._oPriviewBack.attr({src:sUrl,width:thumbSize.x,height:thumbSize.y}).css({width:thumbSize.x+"px",height:thumbSize.y+"px"});
this.fCallBack({x:width,y:height},thumbSize);
this.isSmallSize=true
},imageLoad:function(sUrl,eEvent){var fn=this._oforSize.storage("loadFunc");
fn.detach(this._oforSize.$value(),"load");
this._oforSize.cleanStorage();
var width=parseInt(eEvent.element.width);
var height=parseInt(eEvent.element.height);
var thumbSize=this._oOption.thumbSize;
if(width<thumbSize.x||height<thumbSize.y){this.smallImageSizeThanThumbSize(sUrl,width,height,thumbSize);
return 
}this._oBackgroundEle.attr("src",sUrl);
this._oPriviewBack.attr("src",sUrl);
this._oCropObject.attr("src",sUrl);
this.realSize={width:width,height:height};
this.scroll={};
this.backgroundSize={};
var imageSize=this._oOption.imageSize;
if(width<=height){height=imageSize.y;
width=imageSize.y*this.realSize.width/this.realSize.height;
if(width>imageSize.x){height=imageSize.x*this.realSize.height/this.realSize.width;
width=imageSize.x
}this.backgroundSize.height=Math.round(height);
this.backgroundSize.width=Math.round(width);
if(thumbSize.x>width||thumbSize.y>height){this.backgroundSize.width=Math.round(imageSize.x);
this.backgroundSize.height=Math.round(imageSize.x*this.realSize.height/this.realSize.width);
height=this.backgroundSize.height;
width=this.backgroundSize.width;
this._oScroll.addClass("yScroll");
this.backgroundSize.height=imageSize.y;
this.scroll.gapX=16;
this.scroll.gapY=0;
this.setScrollEvent();
if(this._oLayerId){this._oLayerId.addClass("scrollWidth")
}}}else{height=imageSize.x*this.realSize.height/this.realSize.width;
width=imageSize.x;
if(height>imageSize.y){height=imageSize.y;
width=imageSize.y*this.realSize.width/this.realSize.height
}this.backgroundSize.height=Math.round(height);
this.backgroundSize.width=Math.round(width);
if(thumbSize.x>width||thumbSize.y>height){this.backgroundSize.width=Math.round(imageSize.y*this.realSize.width/this.realSize.height);
this.backgroundSize.height=Math.round(imageSize.y);
height=this.backgroundSize.height;
width=this.backgroundSize.width;
this._oScroll.addClass("xScroll");
this.backgroundSize.width=imageSize.x;
this.scroll.gapX=0;
this.scroll.gapY=16;
this.setScrollEvent();
if(this._oLayerId){this._oLayerId.addClass("scrollHeight")
}}}width=Math.round(width);
height=Math.round(height);
this._oOption.currentSize={width:width,height:height};
this.cropSetting(width,height);
this.imageSetting(width,height);
this.setDrag();
this._oimgCropper.addClass("on")
},setScrollEvent:function(){$Fn(this.onScroll,this).attach(this._oScroll.$value(),"scroll")
},onScroll:function(e){var top=e.element.scrollTop;
var left=e.element.scrollLeft;
var xRate=this._oPriviewBack.$value().width/this._oBackgroundEle.$value().width;
var yRate=this._oPriviewBack.$value().height/this._oBackgroundEle.$value().height;
var leftValue=this.deletePx(this._oCropObject.css("left"));
var topValue=this.deletePx(this._oCropObject.css("top"));
this._oCropObject.css({left:Math.round(leftValue-left+this.beforeScrollGap.x)+"px",top:Math.round(topValue-top+this.beforeScrollGap.y)+"px"});
this._oPriviewBack.css({left:Math.round((leftValue-left+this.beforeScrollGap.x)*xRate)+"px",top:Math.round((topValue-top+this.beforeScrollGap.y)*yRate)+"px"});
this.beforeScrollGap={x:left,y:top}
},setDrag:function(){$Element(this._cropElement).show();
this.drag=new nhn.DragArea(document,{className:"jsCrop",flowOut:false}).attach({dragstart:$Fn(this.imageDragStart,this).bind(),beforedrag:$Fn(this.imageBeforeDrag,this).bind(),drag:$Fn(this.imageDrag,this).bind()})
},imageDragStart:function(oEvent){this._org=oEvent.event.pos()
},imageBeforeDrag:function(oEvent){var richButton=$Element(oEvent.element);
if(!richButton.hasClass("drag")){var before=oEvent.event.pos();
var richCropArea=this._oCropArea;
var setObj=this[richButton.storage("action")](before,oEvent);
if(setObj){this.previewReWrite(setObj);
richCropArea.css(setObj);
this._oCropObjectArea.css(setObj);
this._org=before;
oEvent.stop()
}else{return false
}}},topLeftResize:function(oBefore,oEvent){var gapY=Math.round(this._org.clientY-oBefore.clientY);
var gapX=Math.round((gapY)*this._previewRate);
var richCropArea=this._oCropArea;
var width=this.deletePx(richCropArea.css("width"));
var height=this.deletePx(richCropArea.css("height"));
var setObj={width:(width+gapX)+"px",height:(height+gapY)+"px"};
var richCropObject=this._oCropObject;
var top=this.deletePx(richCropArea.css("top"))-gapY;
var left=this.deletePx(richCropArea.css("left"))-gapX;
var top2=this.deletePx(richCropObject.css("top"))+gapY;
var left2=this.deletePx(richCropObject.css("left"))+gapX;
if(!(top>=0&&left>=0)||this.croplimited.x>width+gapX||this.croplimited.y>height+gapY){oEvent.stop();
return false
}richCropArea.css({top:top+"px",left:left+"px"});
richCropObject.css({top:top2+"px",left:left2+"px"});
return setObj
},topRightResize:function(oBefore,oEvent){var gapY=Math.round(this._org.clientY-oBefore.clientY);
var gapX=Math.round((gapY)*this._previewRate);
var richCropArea=this._oCropArea;
var width=this.deletePx(richCropArea.css("width"));
var height=this.deletePx(richCropArea.css("height"));
var realTop=this.deletePx(richCropArea.css("top"));
var realLeft=this.deletePx(richCropArea.css("left"));
var top=realTop-gapY;
var left=realLeft-gapX;
var richCropObject=this._oCropObject;
var realTop2=this.deletePx(richCropObject.css("top"));
var realLeft2=this.deletePx(richCropObject.css("left"));
var top2=realTop2+gapY;
var left2=realLeft2+gapX;
var currentSizeX=this.deletePx(this._oimgCropper.css("width"));
var currentSizeY=this.deletePx(this._oimgCropper.css("height"));
var setObj={width:(width+gapX)+"px",height:(height+gapY)+"px"};
if(top<0||realTop+height+this.border.height>currentSizeY||realLeft+width+gapX+this.border.width>currentSizeX||this.croplimited.x>width+gapX||this.croplimited.y>height+gapY){oEvent.stop();
return false
}richCropArea.css({top:top+"px"});
richCropObject.css({top:top2+"px"});
return setObj
},bottomLeftResize:function(oBefore,oEvent){var gapY=Math.round((this._org.clientY-oBefore.clientY));
var gapX=Math.round((gapY)*this._previewRate);
var richCropArea=this._oCropArea;
var width=this.deletePx(richCropArea.css("width"));
var height=this.deletePx(richCropArea.css("height"));
var realLeft=this.deletePx(richCropArea.css("left"));
var realTop=this.deletePx(richCropArea.css("top"));
var left=realLeft+gapX;
var top=realLeft+gapY;
var setObj={width:(width-gapX)+"px",height:(height-gapY)+"px"};
var richCropObject=this._oCropObject;
var left2=this.deletePx(richCropObject.css("left"))-gapX;
var currentSizeY=this.deletePx(this._oimgCropper.css("height"));
if(!(left>=0)||(this.deletePx(setObj.height)+realTop+this.border.height>currentSizeY)||this.croplimited.x>width-gapX||this.croplimited.y>height-gapY){oEvent.stop();
return false
}richCropArea.css({left:left+"px"});
richCropObject.css({left:left2+"px"});
return setObj
},bottomRightResize:function(oBefore,oEvent){var gapY=Math.round(this._org.clientY-oBefore.clientY);
var gapX=Math.round((gapY)*this._previewRate);
var richCropArea=this._oCropArea;
var width=this.deletePx(richCropArea.css("width"));
var height=this.deletePx(richCropArea.css("height"));
var realTop=this.deletePx(richCropArea.css("top"));
var realLeft=this.deletePx(richCropArea.css("left"));
var top=realTop-gapY;
var left=realLeft-gapX;
var richCropObject=this._oCropObject;
var realTop2=this.deletePx(richCropObject.css("top"));
var realLeft2=this.deletePx(richCropObject.css("left"));
var top2=realTop2+gapY;
var left2=realLeft2+gapX;
var currentSizeX=this.deletePx(this._oimgCropper.css("width"));
var currentSizeY=this.deletePx(this._oimgCropper.css("height"));
var setObj={width:(width-gapX)+"px",height:(height-gapY)+"px"};
if((currentSizeX<=(realLeft+width+this.border.width))||(currentSizeY<=(realTop+height+this.border.height))||(this.deletePx(setObj.width)+realLeft+this.border.width)>=currentSizeX||(this.deletePx(setObj.height)+realTop+this.border.height)>=currentSizeY||this.croplimited.x>width-gapX||this.croplimited.y>height-gapY){oEvent.stop();
return false
}return setObj
},imageDrag:function(oEvent){var positionX=oEvent.x;
var positionY=oEvent.y;
var xRate=this._oPriviewBack.$value().width/this._oBackgroundEle.$value().width;
var yRate=this._oPriviewBack.$value().height/this._oBackgroundEle.$value().height;
var beforeX=this.beforeScrollGap.x;
var beforeY=this.beforeScrollGap.y;
this._oCropObject.css({left:Math.round((-positionX)-beforeX)+"px",top:Math.round((-positionY)-beforeY)+"px"});
this._oPriviewBack.css({left:Math.round(-(positionX+beforeX)*xRate)+"px",top:Math.round(-(positionY+beforeY)*yRate)+"px"})
},imageSetting:function(nWidth,nHeight){setTimeout($Fn(function(){this._oMaskEle.attr({width:this.backgroundSize.width,height:this.backgroundSize.height});
this._oBackgroundEle.attr({width:nWidth,height:nHeight})
},this).bind(),0)
},cropSetting:function(nWidth,nHeight){var thumbSize=this._oOption.thumbSize;
this._oCropArea.css({width:thumbSize.x+"px",height:thumbSize.y+"px"});
this._oCropObject.attr({width:nWidth,height:nHeight});
this._oimgCropper.css({width:this.backgroundSize.width+"px",height:this.backgroundSize.height+"px"});
this._oScroll.css({width:this.backgroundSize.width+this.scroll.gapX+"px",height:this.backgroundSize.height+this.scroll.gapY+"px"});
this._oPriview.css({width:thumbSize.x+"px",height:thumbSize.y+"px"});
this._oPriviewBack.attr({width:nWidth,height:nHeight}).css({width:nWidth+"px",height:nHeight+"px"});
this.previewImageLength={width:nWidth,height:nHeight}
},previewReWrite:function(oSetObj){var gapx=this._oOption.thumbSize.x-this.deletePx(oSetObj.width);
var realgapx=(this.previewImageLength.width*gapx)/this.deletePx(oSetObj.width);
var gapy=this._oOption.thumbSize.y-this.deletePx(oSetObj.height);
var realgapy=(this.previewImageLength.height*gapy)/this.deletePx(oSetObj.height);
var richCropArea=this._oCropArea;
this._oPriviewBack.attr({width:Math.round(this.previewImageLength.width+realgapx),height:Math.round(this.previewImageLength.height+realgapy)}).css({left:Math.round((((-this.deletePx(richCropArea.css("left"))-this.beforeScrollGap.x)*(this.previewImageLength.width+realgapx))/this._oBackgroundEle.$value().width))+"px",top:Math.round((((-this.deletePx(richCropArea.css("top"))-this.beforeScrollGap.y)*(this.previewImageLength.height+realgapy))/this._oBackgroundEle.$value().height))+"px",width:Math.round(this.previewImageLength.width+realgapx)+"px",height:Math.round(this.previewImageLength.height+realgapy)+"px"})
},deletePx:function(sNumber){if(sNumber=="auto"){sNumber="0"
}return Number(sNumber.replace("px",""))
},getInfo:function(){if(this.isSmallSize){return false
}var richCropArea=this._oCropArea;
var left=this.deletePx(richCropArea.css("left"))+this.beforeScrollGap.x;
var top=this.deletePx(richCropArea.css("top"))+this.beforeScrollGap.y;
var width=this.deletePx(richCropArea.css("width"));
var height=this.deletePx(richCropArea.css("height"));
return{point:{x:left*this.realSize.width/this._oOption.currentSize.width,y:top*this.realSize.height/this._oOption.currentSize.height},realSize:{x:width*this.realSize.width/this._oOption.currentSize.width,y:height*this.realSize.height/this._oOption.currentSize.height},thumbSize:{x:this._oOption.thumbSize.x,y:this._oOption.thumbSize.y}}
},reset:function(){if(this.drag){this.drag.detachEvent()
}this._oPriviewBack.attr({width:"0",height:"0"}).css({width:"0px",height:"0px",left:"0px",top:"0px"});
this._oimgCropper.removeClass("on").css({width:"",height:""});
this._oScroll.removeClass("yScroll").removeClass("xScroll").css({width:"",height:""});
this._oBackgroundEle.attr({src:"",width:"",height:""});
this._oMaskEle.attr({width:"",height:""});
this._oCropArea.css({left:"0px",top:"0px",width:"",height:""});
this._oCropObject.attr({src:"",width:"",height:""}).css({width:"",height:"",left:"0px",top:"0px"});
this._oCropObjectArea.css({width:"",height:""});
this._oPriviewBack.attr({width:"0",height:"0"});
this._oforSize.attr("src","")
},reLoadImg:function(sUrl){this.setEtc(sUrl)
}});
function jCache(sType){if(sType==jCache.TYPE.TWO){return{_aCache:null,init:function(){this._aCache={};
return this
},add:function(sKeyword,nPage,oValue){if(typeof this._aCache[sKeyword]=="undefined"){this._aCache[sKeyword]=[]
}this._aCache[sKeyword][nPage]=oValue
},remove:function(sKeyword){if(typeof this._aCache[sKeyword]=="undefined"){return 
}this._aCache[sKeyword].length=0;
delete this._aCache[sKeyword]
},get:function(sKeyword,nPage){return this._aCache[sKeyword][nPage]
},has:function(sKeyword,nPage){if(typeof this._aCache[sKeyword]=="undefined"||typeof this._aCache[sKeyword][nPage]=="undefined"){return false
}else{return true
}}}
}else{if(sType==jCache.TYPE.ONE){return{_oCache:null,init:function(){this._oCache={};
return this
},add:function(sKey,oValue){this._oCache[sKey]=oValue
},remove:function(sKey){this._oCache[sKey]=null;
delete this._oCache[sKey]
},get:function(sKey){return this._oCache[sKey]
},has:function(sKey){if(typeof this._oCache[sKey]=="undefined"){return false
}else{return true
}}}
}}}jCache.TYPE={ONE:"DEPTH1",TWO:"DEPTH2"};
(function(namespace){var CONST={ID:"cropLayer",WIDTH:672,NODE:{BASE:"> DIV.shadow > DIV.shadowSide > DIV.subLayerTemplate ",SIZE:"> DIV.layerContents > UL STRONG",LAYER_CONTENT:"> DIV.layerContents",SELECT_FILE_BTN:"> DIV.layerContents > A.btnImgSelect > IMG",CLOSE_BTN:"> A.layerClose",OK_BTN:"> DIV.layerContents > DIV.btns > BUTTON"},UPLOAD:{URL:"/upload.ajax",FILE_TYPE:"*.jpg;*.gif;*.jpeg;*.png"},CROP:{URL:"/crop.ajax",ERR_MSG:"一時的にご利用できません"},MSG:{SELECT_IMAGE:"アップロードボタンをクリックして、登録する画像を選んでください。",UPLOAD_EXT:"JPG、JPEG、GIF、PNGのみ対応しています。",UPLOAD_FAIL:"1024KB未満の画像のみ対応しています。"}};
var COMMON={sendServer:function(oData,fn){new $Ajax(CONST.CROP.URL,{timeout:5,onload:function(oRes){fn(oRes.json())
},ontimeout:function(){fn({result:false})
}}).request(oData)
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({$init:function(oConfig,oFnCallback){this.setConst({ID:oConfig.id});
this._oFnCallback=oFnCallback||{};
this._getElementRef();
this._initUpload();
this._initCropLayer();
this._afterInit(oConfig.size)
},_getElementRef:function(){this._welCrop=$Element(CONST.ID);
var elBase=$$.getSingle(CONST.NODE.BASE,this._welCrop.$value());
this._elLayerContent=$$.getSingle(CONST.NODE.LAYER_CONTENT,elBase);
this._elSize=$$.getSingle(CONST.NODE.SIZE,elBase);
this._elSelectImageBtn=$$.getSingle(CONST.NODE.SELECT_FILE_BTN,elBase);
this._elCloseBtn=$$.getSingle(CONST.NODE.CLOSE_BTN,elBase);
this._elOkBtn=$$.getSingle(CONST.NODE.OK_BTN,elBase)
},_initUpload:function(){this._oUploader=new nj.Uploader2(this._elSelectImageBtn,{url:CONST.UPLOAD.URL,filetype:CONST.UPLOAD.FILE_TYPE,data:{},onSuccess:$Fn(this._successUpload,this).bind(),onError:$Fn(this._failUpload,this).bind(),align:true,msgNotAllowedExt:CONST.MSG.UPLOAD_EXT})
},_initCropLayer:function(){$Fn(this.hide,this).attach(this._elCloseBtn,"click");
$Fn(this._onclickUploadCropImage,this).attach(this._elOkBtn,"click")
},_afterInit:function(sSize){this._elSize.innerHTML=sSize
},_onclickUploadCropImage:function(wEvent){if(typeof this._oCropComponent=="undefined"){alert(CONST.MSG.SELECT_IMAGE);
return 
}var oInfo=this._oCropComponent.getInfo();
if(oInfo===false){this._response({result:true,imageResolution:this._imageResolution,url:this._url,thumbnailUrl:this._url})
}else{var oData={x:parseInt(oInfo.point.x),y:parseInt(oInfo.point.y),width:parseInt(oInfo.realSize.x),height:parseInt(oInfo.realSize.y),fileName:this._fileName};
COMMON.sendServer(oData,$Fn(this._response,this).bind())
}wEvent.stop()
},_response:function(oData){if(oData.result){oData.imageResolution=this._imageResolution;
oData.thumbnailUrl=oData.url;
oData.url=this._url;
if(typeof this._oFnCallback.completed!="undefined"){this._oFnCallback.completed(oData,this)
}}else{alert(CONST.CROP.ERR_MSG)
}},_successUpload:function(oData){this._url=oData.url;
this._fileName=oData.fileName;
this._imageResolution=oData.imageResolution;
if(typeof this._oCropComponent=="undefined"){this._initCropComponent(oData.url)
}else{this._oCropComponent.reset();
this._oCropComponent.reLoadImg(oData.url)
}},_failUpload:function(){alert(CONST.MSG.UPLOAD_FAIL)
},_initCropComponent:function(sUrl){this._oCropComponent=new nj.ImageCrop(this._elLayerContent.id,sUrl,{imageSize:{x:525,y:350},thumbSize:{x:95,y:95}},this._welCrop.attr("id"))
},hide:function(){this._welCrop.hide();
if(typeof this._oFnCallback.hide!="undefined"){this._oFnCallback.hide()
}},show:function(){if(typeof this._oFnCallback.show!="undefined"){this._oFnCallback.show()
}this._welCrop.show();
if(!this._bIsInitUpload){this._oUploader.initUI();
this._bIsInitUpload=true
}},left:function(nL){this._welCrop.css("left",nL+"px")
},width:function(){return CONST.WIDTH
},setConst:function(oConst){function f(sName,obj,oTarget){if(typeof obj[sName]=="object"){for(var sName2 in obj[sName]){if(typeof oTarget[sName]=="undefined"){oTaget[sName]=={}
}f(sName2,obj[sName],oTarget[sName])
}}else{oTarget[sName]=obj[sName]
}}for(var p in oConst){f(p,oConst,CONST)
}}})
})("nj.mission.CropLayer");
(function(namespace){var CONST={WIDTH:953,PAGE:{WIDTH:903,THUMB:{MAX:"1",MID:"2",MIN:"3"}}};
var config={id:"searchLayer",node:{BASE:"> DIV.shadow > DIV.shadowSide > DIV.subLayerTemplate",QUERY:"> DIV.layerContents > DIV.search_input > INPUT",SEARCH_BTN:"> DIV.layerContents > DIV.search_input > BUTTON",CLOSE_BTN:"> A.layerClose",LIST_PART:"> DIV.layerContents > DIV.bg_listArea",NO_CONTENT:"> DIV.layerContents > DIV.bg_listArea > DIV.noContents",NO_CONTENT_INPUT:"> DIV.layerContents > DIV.bg_listArea > DIV.noContents > P.warning > STRONG",SLIDE_PART:"> DIV.layerContents > DIV.bg_listArea > DIV.listSlide > DIV.subListSlide",PAGING_PART:"> DIV.layerContents > DIV.bg_listArea > DIV.paginate",LOADING_AREA:"> DIV.layerContents > DIV.loadingArea",PAGINATE_LOADING:"> DIV.layerContents > DIV.bg_listArea > DIV.paginateLoading",TITLE:"> H3",DESCRIPTION:"> P.leadText"},style:{SELECT_EVENT:"_selectThis",VIDEO_TYPE:"movieSearchLayer",IMAGE_TYPE:"imageSearchLayer"},template:{IMAGE:['<div class="thumb">','<img alt="" src="#thumbUrl#" onerror="imgOnError(this);" class="_selectThis"/>',"</div>",'<div class="option">',"<span>#widthHeight#</span>",'<span class="url"><a href="#siteUrl#" target="_blank">#shortUrl#</a></span>',"</div>",'<button class="_selectThis">選択</button>'].join(""),VIDEO:['<div class="thumb">','<img src="#thumbUrl#" alt="" width="158" height="120" class="_selectThis">','<span class="icoPlay"></span>','<span class="playTime">#playTime#</span>',"</div>",'<div class="option">','<h4><a href="#url#" target="_blank">#title#</a></h4>','<span class="url"><a href="#sourceUrl#" target="_blank">#source#</a></span>',"</div>",'<button class="_selectThis">選択</button>'].join(""),EMPTY_PRE:'<p class="warning">検索ワード<strong>',EMPTY_POST:"</strong>に一致する画像は見つかりませんでした。</p><p>キーワードが正しく入力されているかを確認してください。</p>",DELAY:'<p class="warning">一時的にご利用できません。</p>'},type:{IMAGE:"image",VIDEO:"video"},msg:{IMAGE_TYPE:"画像追加",VIDEO_TYPE:"動画追加",ERR_MSG:"一時的にご利用できません。",EMPTY_QUERY_MSG:"検索するキーワードを入力してください。"},consts:{thumbSize:"MAX",searchUrl:(typeof SEARCH_SERVER=="string"?SEARCH_SERVER:"http://search.naver.jp"),searchType:"image",numPerPage:15},MISSION_NAME:""};
var COMMON={search:function(sQuery,oOption){new $Ajax(config.consts.searchUrl+"/"+config.consts.searchType,{type:"jsonp",timeout:5,onload:function(oRes){oOption.fn(oRes.json())
},ontimeout:function(){oOption.fn(false)
}}).request({start:parseInt(oOption.paging)*config.consts.numPerPage+1,display:config.consts.numPerPage,sm:"tab_jum",vt:"aj",q:sQuery})
},replaceTemplate:function(oData,template){return template.replace(/#([A-Za-z0-9_]+)#/g,function(m,property){return oData[property]||""
})
},cutStr:function(html){return nj.cutStr(html,130,11,8,5,6).str
},checkThumbType:function(oEntry,sSize,sType){var sUrl="";
if(typeof oEntry["n$image"]!="undefined"){var sThumb=oEntry["n$image"] instanceof Array?oEntry["n$image"][0]["n$thumbnail"]["$t"]:oEntry["n$image"]["n$thumbnail"]["$t"];
if(sType==config.type.VIDEO){sUrl=sThumb
}else{if(/\?.*type=etc[123]/i.test(sThumb)){sUrl=sThumb.replace(/(\?.*)(type=etc[123])/i,"$1type=etc"+sSize)
}else{if(/.*\/r.[0-9]{2,3}x[0-9]{2,3}/i.test(sThumb)){sUrl=sThumb.replace(/(.*\/r.)([0-9]{2,3}x[0-9]{2,3})/i,"$1160x140")
}else{sUrl=sThumb.replace(/120\/120$/,"160/140")
}}}}return sUrl
},getSize:function(oEntry){var oSize={};
if(oEntry["n$image"] instanceof Array){oSize.width=oEntry["n$image"][0]["n$source"]["width"];
oSize.height=oEntry["n$image"][0]["n$source"]["height"]
}else{oSize.width=oEntry["n$image"]["n$source"]["width"];
oSize.height=oEntry["n$image"]["n$source"]["height"]
}return oSize
},refineData:function(oEntry){var oSize;
if(config.consts.searchType==config.type.IMAGE){oSize=this.getSize(oEntry)
}return(config.consts.searchType==config.type.IMAGE?{thumbUrl:this.checkThumbType(oEntry,"1",config.consts.searchType),siteUrl:oEntry["n$pgroupUrl"]["$t"],shortUrl:COMMON.cutStr(oEntry["n$pgroupUrl"]["$t"]).replace(/^http:\/\//i,""),widthHeight:oSize.width+"x"+oSize.height}:{thumbUrl:this.checkThumbType(oEntry,"1",config.consts.searchType),playTime:oEntry["n$playTime"]["$t"],title:COMMON.cutStr(oEntry.title["$t"]),source:oEntry["n$siteName"]["$t"],sourceUrl:oEntry["n$siteUrl"]["$t"],url:oEntry.link["$t"]})
},addHover:function(el){return nj.hover(el,{enter:function(we,el){$Element(el).addClass("hover")
},leave:function(we,el){$Element(el).removeClass("hover")
}})
},findLI:function(ele){var elParent=ele.parentNode;
do{if(elParent.tagName.toUpperCase()=="LI"){break
}}while(elParent=elParent.parentNode);
return elParent
}};
var DataCache={_cache:{},add:function(key,value){this._cache[key]=value
},remove:function(key){if(this.has(key)){this._cache[key]=null;
delete this._cache[key]
}},get:function(key){return this._cache[key]
},has:function(key){return(typeof this._cache[key]=="undefined"?false:true)
}};
var EventRef={page:[],item:[]};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({$init:function(config,fnCallback){this.setConfig((typeof config=="string"?{id:config}:config),true);
this._initCallback(fnCallback||{});
this._getElementRef();
this._initVariable();
this._initEvent()
},_initCallback:function(fnCallback){this._fnShow=fnCallback.show||function(){};
this._fnHide=fnCallback.hide||function(){};
this._fnCompleted=fnCallback.completed||function(){};
this._fnSearch=fnCallback.search||function(){}
},_getElementRef:function(){this._welSearch=$Element(config.id);
var elBase=$$.getSingle(config.node.BASE,this._welSearch.$value());
this._elQuery=$$.getSingle(config.node.QUERY,elBase);
this._elSearchBtn=$$.getSingle(config.node.SEARCH_BTN,elBase);
this._elCloseBtn=$$.getSingle(config.node.CLOSE_BTN,elBase);
this._elNoContentQuery=$$.getSingle(config.node.NO_CONTENT_INPUT,elBase);
this._welListPart=$Element($$.getSingle(config.node.LIST_PART,elBase));
this._welNoContent=$Element($$.getSingle(config.node.NO_CONTENT,elBase));
this._welSlidePart=$Element($$.getSingle(config.node.SLIDE_PART,elBase));
this._welPagingPart=$Element($$.getSingle(config.node.PAGING_PART,elBase));
this._welLoadingArea=$Element($$.getSingle(config.node.LOADING_AREA,elBase));
this._welPaginateLoading=$Element($$.getSingle(config.node.PAGINATE_LOADING,elBase));
this._elTitle=$$.getSingle(config.node.TITLE,elBase);
this._elDescription=$$.getSingle(config.node.DESCRIPTION,elBase)
},_initVariable:function(){this._bSearching=false;
this._sPreQuery="";
this._sCurQuery="";
this._setPageNum(0,0);
this._elDescription=config.MISSION_NAME;
this._nRequestCount=0
},_setPageNum:function(nPre,nCur){this._nPrePage=nPre;
this._nCurPage=nCur
},_initEvent:function(){$Fn(function(wEvent){var oKey=wEvent.key();
if(oKey.enter){this._search();
wEvent.stop()
}else{if(oKey.keyCode==27){this.hide()
}}},this).attach(this._elQuery,"keydown");
$Fn(function(wEvent){this._search();
wEvent.stop()
},this).attach(this._elSearchBtn,"click");
$Fn(function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
this.hide()
},this).attach(this._elCloseBtn,"click")
},_setQuery:function(sNewQuery){this._sPreQuery=this._sCurQuery;
this._sCurQuery=sNewQuery
},_reInitStatus:function(){this._setPageNum();
this._aPageNodeRef=[]
},_isValidQuery:function(sNewQuery){var sNewQuery=$S(this._elQuery.value).trim().$value();
if(sNewQuery==""){return"empty"
}else{if(sNewQuery==this._sCurQuery){return"duplicate"
}else{this._setQuery(sNewQuery);
this._reInitStatus();
return true
}}},_onselect:function(wEvent){var aData=DataCache.get(this._sCurQuery)[this._nCurPage-1]["entry"];
var element=COMMON.findLI(wEvent.element);
var oEntry=(aData instanceof Array?aData[parseInt(element.id.split("_")[2])]:aData);
var oSize;
if(config.consts.searchType==config.type.IMAGE){oSize=COMMON.getSize(oEntry)
}this._fnCompleted(config.consts.searchType==config.type.IMAGE?{url:oEntry.link["$t"],source:oEntry["n$domainName"]["$t"],sourceUrl:oEntry["n$pgroupUrl"]["$t"],imageResolution:oSize.width+"x"+oSize.height,thumbnailUrl:COMMON.checkThumbType(oEntry,"1",config.consts.searchType),fileSize:oEntry["n$fileSize"]["$t"],title:oEntry.title["$t"]}:{url:oEntry.link["$t"],sourceUrl:oEntry["n$siteUrl"]["$t"],source:oEntry["n$siteName"]["$t"],playTime:oEntry["n$playTime"]["$t"],thumbnailUrl:COMMON.checkThumbType(oEntry,"1",config.consts.searchType)})
},_isSearching:function(){return this._bSearching
},_setSearching:function(bSearching){this._bSearching=bSearching
},_search:function(){if(this._isSearching()){return 
}var bResult=this._isValidQuery();
if(bResult!==true){if(bResult=="empty"){alert(config.msg.EMPTY_QUERY_MSG)
}this._elQuery.select();
return 
}this._setPageDisplay("newIng");
this._selectSearch()
},_selectSearch:function(){this._setSearching(true);
COMMON.search(this._sCurQuery,{paging:"0",fn:$Fn(this._response,this).bind()})
},_searchPaging:function(nPageNum){if(this._isSearching()){return 
}this._setPageDisplay("pageIng");
this._setPageNum(this._nCurPage,nPageNum);
this._selectPagingSearch(nPageNum)
},_selectPagingSearch:function(nPage){var oData=DataCache.get(this._sCurQuery);
this._setSearching(true);
COMMON.search(this._sCurQuery,{paging:""+(nPage-1),fn:$Fn(this._responsePaging,this).bind()})
},_response:function(oData){if(typeof oData=="boolean"||(oData instanceof Object&&typeof oData["n$options"]=="undefined")){if(this._nRequestCount==0){this._nRequestCount++;
this._selectSearch()
}else{this._nRequestCount=0;
this._setSearching(false);
this._setPageDisplay("error")
}return 
}this._nRequestCount=0;
if(oData["n$options"]["n$maxIndex"]["$t"]=="0"){this._setPageNum(0,0);
this._setPageDisplay("empty")
}else{this._setPageNum(0,1);
DataCache.add(this._sCurQuery,[oData]);
this._makePage(oData)
}this._setSearching(false);
this._elQuery.select();
this._fnSearch({searchType:config.consts.searchType,curPage:1})
},_responsePaging:function(oData){if(typeof oData=="boolean"||(oData instanceof Object&&typeof oData["n$options"]=="undefined")){if(this._nRequestCount==0){this._nRequestCount++;
this._selectPagingSearch(this._nCurPage)
}else{this._nRequestCount=0;
this._setPageNum(this._nPrePage,this._nPrePage);
this._setSearching(false);
this._setPageDisplay("hidePageLoading");
alert(config.msg.ERR_MSG)
}return 
}this._nRequestCount=0;
var oCachedData=DataCache.get(this._sCurQuery);
oCachedData[""+(this._nCurPage-1)]=oData;
DataCache.add(this._sCurQuery,oCachedData);
this._makePagingPage(oData);
this._fnSearch({searchType:config.consts.searchType,curPage:this._nCurPage})
},_makePage:function(oData){this._removePageData();
this._initPaging(oData["n$options"]["n$maxIndex"]["$t"]);
this._setPageDisplay("content");
this._addItem(this._createPage(),oData);
this._welSlidePart.css("left","0px")
},_makePagingPage:function(oData){this._oPagination.setItemCount(oData["n$options"]["n$maxIndex"]["$t"]);
this._oPagination.movePageTo(this._nCurPage);
if(this._hasMakePage()){this._aPageNodeRef[this._nCurPage].show();
this._welSlidePart.css("left",(this._nCurPage<this._nPrePage?-CONST.PAGE.WIDTH:0)+"px")
}else{this._addItem(this._createPage(),oData)
}this._setPageDisplay("hidePageLoading");
this._rollingPage()
},_hasMakePage:function(){return typeof this._aPageNodeRef[this._nCurPage]!="undefined"
},_createPage:function(){var welList=$Element("<UL>").attr("id","paging_"+this._nCurPage);
welList.delegate("click").bind("."+config.style.SELECT_EVENT,$Fn(this._onselect,this).bind());
EventRef.page.push(welList);
return welList
},_addItem:function(welPage,oData){var oEntry=oData.entry;
if(oEntry instanceof Array){$A(oEntry).forEach(function(item,index){this._makeAndInsertItem(welPage,item,index)
},this)
}else{this._makeAndInsertItem(welPage,oEntry,1)
}this._aPageNodeRef[this._nCurPage]=welPage;
this._insertPage(welPage)
},_makeAndInsertItem:function(welPage,oEntry,index){var elLi=$Element("<LI>").attr("id","search_"+this._nCurPage+"_"+index).html(COMMON.replaceTemplate(COMMON.refineData(oEntry),config.template[config.consts.searchType.toUpperCase()])).$value();
welPage.append(elLi);
EventRef.item.push(COMMON.addHover(elLi))
},_insertPage:function(wel){var isInsert=false;
var aUL=$$("> UL",this._welSlidePart.$value());
for(var i=0,length=aUL.length;
i<length;
i++){var ul=aUL[i];
var n=parseInt(ul.id.split("_")[1]);
if(n>this._nCurPage){ul.parentNode.insertBefore(wel.$value(),ul);
isInsert=true;
break
}}if(!isInsert){this._welSlidePart.append(wel)
}this._welSlidePart.css("left",(this._nCurPage<this._nPrePage?-CONST.PAGE.WIDTH:0)+"px")
},_rollingPage:function(){this._aPageNodeRef[this._nPrePage].hide();
this._welSlidePart.css("left","0px");
this._setSearching(false)
},_setPageDisplay:function(state){switch(state){case"init":this._welListPart.hide();
this._welPagingPart.hide();
this._welLoadingArea.hide();
break;
case"newIng":this._welListPart.hide();
this._welPagingPart.hide();
this._welLoadingArea.show();
break;
case"pageIng":this._welListPart.show();
this._welPaginateLoading.show();
break;
case"hidePageLoading":this._welPaginateLoading.hide();
break;
case"empty":this._welSearch.addClass("listView");
this._welLoadingArea.hide();
this._welListPart.show();
this._welSlidePart.hide();
this._welPagingPart.hide();
this._welNoContent.html(config.template.EMPTY_PRE+$S(this._sCurQuery).escapeHTML()+config.template.EMPTY_POST);
this._welNoContent.show();
break;
case"error":this._welSearch.addClass("listView");
this._welLoadingArea.hide();
this._welListPart.show();
this._welSlidePart.hide();
this._welPagingPart.hide();
this._welNoContent.html(config.template.DELAY);
this._welNoContent.show();
break;
case"content":this._welSearch.addClass("listView");
this._welLoadingArea.hide();
this._welNoContent.hide();
this._welListPart.show();
this._welSlidePart.show();
this._welPagingPart.show();
break
}},_initPaging:function(nTotal){var t=this;
nTotal=parseInt(nTotal);
if(typeof this._oPagination=="undefined"){this._oPagination=new nhn.Pagination(this._welPagingPart.attr("id"),{item:nTotal,itemPerPage:config.consts.numPerPage,pagePerPageList:10,page:1,moveUnit:"page",alignCenter:true}).attach({loaded:function(e){},click:function(e){e.stop();
t._searchPaging(e.page)
}})
}else{this._oPagination.reset(nTotal)
}},_removePageData:function(){this._detachEvent();
this._welSlidePart.empty()
},_detachEvent:function(){$A(EventRef.item).forEach(function(event){event.detachAll()
});
EventRef.item.length=0;
$A(EventRef.page).forEach(function(page){page.undelegate("click")
});
EventRef.page.length=0
},hide:function(){this._welSearch.hide().removeClass("listView");
this._fnHide();
this._initVariable();
this._removePageData();
this._setSearching(false)
},show:function(sQuery){this._fnShow({searchType:config.consts.searchType});
this._welSearch.show();
this._setPageDisplay("init");
this._elQuery.value=sQuery||"";
if(this._elQuery.value==""){this._elQuery.select()
}else{this._search()
}},left:function(nL){this._welSearch.css("left",nL+"px")
},setConfig:function(oConfig,bIsInner){function f(sName,obj,oTarget){if(typeof obj[sName]=="object"){for(var sName2 in obj[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,obj[sName],oTarget[sName])
}}else{oTarget[sName]=obj[sName]
}}for(var p in oConfig){f(p,oConfig,config)
}if(!bIsInner){this._setDOM()
}},_setDOM:function(){if(config.consts.searchType==config.type.IMAGE){this._welSearch.removeClass(config.style.VIDEO_TYPE).addClass(config.style.IMAGE_TYPE);
this._elTitle.innerHTML=config.msg.IMAGE_TYPE
}else{if(config.consts.searchType==config.type.VIDEO){this._welSearch.removeClass(config.style.IMAGE_TYPE).addClass(config.style.VIDEO_TYPE);
this._elTitle.innerHTML=config.msg.VIDEO_TYPE
}}}})
})("nj.mission.SearchLayer");
(function(namespace){var config={NAME:"A",CLASS:"njRadioBtn",EVENT_CLASS:"_selectTypeRadio",SELECT_CLASS:"radioChecked",TEXT:"<span>選択</span>",MSG_LOCK:""};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({_welSelectedButton:null,_isLock:false,$init:function(aRadio,oOption){this._aRadio=aRadio;
oOption=oOption||{};
this._callback=oOption.callback||function(){};
config.MSG_LOCK=oOption.lockMsg||"";
var sEventClass=this._createEventClass();
$A(aRadio).forEach(function(radio){radio.style.position="absolute";
radio.style.left="-10000px";
radio.onclick=$Fn(this._onselectRadio,this).bind();
var elReplacer=this._createElement(radio.checked,sEventClass);
radio.parentNode.insertBefore(elReplacer,radio);
if(radio.checked){this._welSelectedButton=$Element(elReplacer)
}},this);
$Element(oOption.parent||aRadio[0].form||this._findParent(aRadio[0])).delegate("click").bind("."+sEventClass,$Fn(this._onselectRadio,this).bind())
},_createElement:function(isChecked,sEventClass){return $Element("<"+config.NAME+">").className(config.CLASS).addClass(sEventClass).addClass((isChecked?config.SELECT_CLASS:"")).html(config.TEXT).$value()
},_onselectRadio:function(wEvent){wEvent=wEvent instanceof $Event?wEvent:$Event(wEvent);
var element=(wEvent.element.tagName.toUpperCase()==config.NAME?wEvent.element:wEvent.element.previousSibling);
if(this._isLock){if(element.nextSibling.value!=this.value()&&config.MSG_LOCK!=""){alert(config.MSG_LOCK)
}return 
}this._unSelect()._select(element);
wEvent.stop($Event.CANCEL_DEFAULT);
return this._callback(wEvent,element.nextSibling)
},_createEventClass:function(){return config.EVENT_CLASS+new Date().getMilliseconds()
},get:function(){return this._welSelectedButton.$value().nextSibling
},value:function(sValue){if(typeof sValue=="undefined"){return this._welSelectedButton.$value().nextSibling.value
}else{if(this._isLock){return this
}this._unSelect();
var elSelectedRadio;
$A(this._aRadio).forEach(function(radio){var welReplacer=$Element(radio.previousSibling);
if(radio.value==sValue){elSelectedRadio=radio;
radio.checked=true;
this._welSelectedButton=welReplacer;
welReplacer.addClass(config.SELECT_CLASS)
}else{welReplacer.removeClass(config.SELECT_CLASS)
}},this);
this._callback({element:elSelectedRadio},elSelectedRadio);
return this
}},lock:function(){this._isLock=true
},unlock:function(){this._isLock=false
},isLock:function(){return this._isLock
},_unSelect:function(){if(this._welSelectedButton){this._welSelectedButton.removeClass(config.SELECT_CLASS)
}return this
},_select:function(el){this._welSelectedButton=$Element(el).addClass(config.SELECT_CLASS);
el.nextSibling.checked=true
},_findParent:function(el){var elParent=el;
do{elParent=elParent.parentNode
}while(elParent.tagName.toLowerCase()!="form"&&elParent.tagName.toLowerCase()!="body");
return elParent
},setConfig:function(oValue){for(var p in oValue){config[p]=oValue[p]
}}})
})("nj.RadioButton");
var SwfPutter=$Class({$init:function(){this.vars=null;
this.fElm=null;
this.params={allowScriptAccess:"always",allowFullScreen:"true",swLiveConnect:"true",wmode:"transparent",quality:"high",loop:"false",menu:"false"};
var options=this.opt=this._getOptions(arguments[0]);
this.cFpVersion=new this._FPVersion(this.opt.fp.split("."));
this.isIE=$Agent().navigator().ie;
var url=location+"";
this.protocol=url.match("^https?");
(this.protocol)?this.protocol=this.protocol[0]:this.protocol="http"
},_getOptions:function(param){var option={fp:"9.0.0",id:""};
if(typeof param=="undefined"){param=new Object
}for(var x in param){option[x]=param[x]
}return option
},put:function(elmID){var fpVersion;
(this.opt.fp=="any")?fpVersion=true:fpVersion=this._getFPVersion();
if(elmID){this.fElm=$Element(elmID)
}if(!fpVersion){this._makeInvalidTag();
if(this.opt&&this.opt.callbacks&&this.opt.callbacks.fnInvalidVersion){this.opt.callbacks.fnInvalidVersion()
}return 
}if(!this._fpValid(fpVersion)&&!$Agent().navigator().ie){this._makeInvalidTag();
return 
}(this.fElm)?this.fElm.html(this._makeTag()):document.write(this._makeTag())
},addVars:function(vars){this.vars=this._makeParam(vars)
},addParam:function(param){for(var k in param){this.params[k]=param[k]
}},_makeTag:function(){if(this.isIE){var fHTML='<object id="'+this.opt.id+'" codebase="'+this.protocol+"://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+this.cFpVersion.major+","+this.cFpVersion.minor+","+this.cFpVersion.rev+',0" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" type="application/x-shockwave-flash" width="'+this.opt.w+'" height="'+this.opt.h+'">';
fHTML+='<param name="movie" value="'+this.opt.src+'" />';
for(var k in this.params){fHTML+='<param name="'+k+'" value="'+this.params[k]+'" />'
}if(this.vars){fHTML+='<param name="FlashVars" value="'+this.vars+'" />'
}fHTML+="</object>"
}else{var fHTML='<embed type="application/x-shockwave-flash" pluginspage="'+this.protocol+'://www.adobe.com/go/getflashplayer" src="'+this.opt.src+'" id="'+this.opt.id+'" name="'+this.opt.id+'" width="'+this.opt.w+'" height="'+this.opt.h+'" ';
for(var k in this.params){fHTML+=k+'="'+this.params[k]+'" '
}if(this.vars){fHTML+='FlashVars="'+this.vars+'" '
}fHTML+="/>"
}return fHTML
},_makeInvalidTag:function(){if(this.opt.invalid){(this.fElm)?this.fElm.html(this.opt.invalid):document.write(this.opt.invalid)
}},_makeParam:function(obj){var paramAry=new Array();
for(var k in obj){paramAry.push(k+"="+obj[k])
}return paramAry.join("&")
},_FPVersion:function(verAry){this.major=(verAry[0])?parseInt(verAry[0]):0;
this.minor=(verAry[1])?parseInt(verAry[1]):0;
this.rev=(verAry[2])?parseInt(verAry[2]):1
},_fpValid:function(fpVersion){if(fpVersion.major<this.cFpVersion.major){this._errorAlert(fpVersion);
return false
}if(fpVersion.major>this.cFpVersion.major){return true
}if(fpVersion.minor<this.cFpVersion.minor){this._errorAlert(fpVersion);
return false
}if(fpVersion.minor>this.cFpVersion.minor){return true
}if(fpVersion.rev<this.cFpVersion.rev){this._errorAlert(fpVersion);
return false
}if(fpVersion.rev>this.cFpVersion.rev){return true
}return true
},_errorAlert:function(fpVersion){var installedFpVerStr=fpVersion.major+"."+fpVersion.minor+"."+fpVersion.rev;
alert("現在インストールされているFlash Playerのバージョンは"+installedFpVerStr+"ですが、このコンテンツのご利用には、"+this.opt.fp+"以上のバージョンが必要です")
},_getFPVersion:function(){var FPVersion=new this._FPVersion([0,0,0]);
if(navigator.plugins&&navigator.mimeTypes.length){var fp=navigator.plugins["Shockwave Flash"];
if(!fp){return null
}if(fp.description){FPVersion=new this._FPVersion(fp.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));
return FPVersion
}}else{if(window.ActiveXObject){try{return this._makeIEVer(new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"))
}catch(e){}try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
FPVersion=new this._FPVersion([6,0,21]);
axo.AllowScriptAccess="always";
return this._makeIEVer(axo)
}catch(e){}try{return this._makeIEVer(new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"))
}catch(e){}try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
return new this._FPVersion([3,0,18])
}catch(e){}}}return null
},_makeIEVer:function(axo){return new this._FPVersion(axo.GetVariable("$version").split(" ")[1].split(","))
}});
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({$init:function(element,option){this._elTarget=element;
this._initOption(option||{})
},_initOption:function(option){this.options={url:option.url||"",data:option.data||{},filetype:option.filetype||"*.jpg;*.gif;*.jpge;*.png",onSelect:option.onSelect||function(){},onSuccess:option.onSuccess||function(){},onError:option.onError||function(){},onBeforeSelect:option.onBeforeSelect||function(self){return false
},msgNotAllowedExt:"JPG、JPEG、GIF、PNGのみ対応しています。",align:option.align||false}
},initUI:function(){if(this._elDiv){return 
}var t=this;
var o=t.options;
t._elDiv=$("<DIV>");
t._elInput=t._createFileForm();
t._elTarget.parentNode.insertBefore(t._elDiv,t._elTarget);
var oStyle;
if(o.align){oStyle={position:"absolute",width:t._elTarget.offsetWidth+"px",marginLeft:-t._elTarget.offsetWidth/2+"px",height:t._elTarget.offsetHeight+"px",overflow:"hidden",zIndex:10000,left:"50%"}
}else{oStyle={position:"absolute",width:t._elTarget.offsetWidth+"px",height:t._elTarget.offsetHeight+"px",overflow:"hidden",zIndex:"10000"}
}$Element(t._elDiv).css(oStyle).opacity(0);
t._elDiv.appendChild(t._elInput);
t._addEvent()
},_addEvent:function(){var t=this;
t._elDiv.onmouseover=t.onmouseover=$Fn(t.MouseOver,t).bindForEvent();
t._elDiv.onmouseout=t.onmouseout=$Fn(t.MouseOut,t).bindForEvent();
t._elDiv.onmousedown=t.onmousedown=$Fn(t.MouseDown,t).bindForEvent();
t._elDiv.onmouseup=t.onmouseup=$Fn(t.MouseUp,t).bindForEvent()
},_getTmpId:function(){return(new Date).getMilliseconds()+Math.floor(Math.random()*100000)
},_createElement:function(sName,oAttributes){var element=$("<"+sName+">");
for(var p in oAttributes){element.setAttribute(p,oAttributes[p])
}return element
},_checkExtension:function(sFile){var ext=/\.([^\.\/]*)$/.test(sFile)?RegExp.$1:"";
var aTypes=this.options.filetype.split(";");
for(var i=0;
i<aTypes.length;
i++){aTypes[i]=aTypes[i].replace(/^\s+|\s+$/,"");
aTypes[i]=aTypes[i].replace(/\./g,"\\.");
aTypes[i]=aTypes[i].replace(/\*/g,"[^\\.\\/\\\\]+");
if((new RegExp(aTypes[i]+"$","gi")).test(sFile)){return true
}}return false
},send:function(){var t=this;
var elForm=null;
var elIframe=null;
var sName="tmpFrame_"+t._getTmpId();
var func=sName+"_func";
try{elIframe=document.createElement("<iframe name='"+sName+"'>")
}catch(e){elIframe=$("<IFRAME>");
elIframe.setAttribute("name",sName)
}$Element(elIframe).attr("src","about:blank").css({position:"absolute",width:"1px",height:"1px",left:"-100px",top:"-100px"});
document.body.appendChild(elIframe);
try{elForm=document.createElement("<form enctype='multipart/form-data'>")
}catch(e){elForm=$("<FORM>");
elForm.setAttribute("enctype","multipart/form-data")
}$Element(elForm).css({position:"absolute",width:"1px",height:"1px",left:"-100px",overflow:"hiddden"});
elForm.target=sName;
elForm.method="post";
elForm.action=t.options.url+"?callback_func="+func;
elForm.appendChild(this._elInput);
elForm.appendChild(this._createElement("input",{type:"hidden",name:"callback_func",value:func}));
for(var p in this.options.data){elForm.appendChild(this._createElement("input",{type:"hidden",name:p,value:this.options.data[p]}))
}document.body.appendChild(elForm);
nj.Uploader2.__tmpFunc[func+"_success"]=function(pairs){t.options.onSuccess(pairs);
setTimeout(function(){elIframe.parentNode.removeChild(elIframe);
document.body.removeChild(elForm)
},10)
};
nj.Uploader2.__tmpFunc[func+"_error"]=function(pairs){t.options.onError(pairs);
setTimeout(function(){elIframe.parentNode.removeChild(elIframe);
document.body.removeChild(elForm)
},10)
};
elForm.submit();
t.reset()
},reset:function(){this._elInput.onchange=null;
this._elInput.parentNode.removeChild(this._elInput);
this._elInput=this._elDiv.appendChild(this._createFileForm())
},MouseOver:function(e){if(this._elTarget.onmouseover){this._elTarget.onmouseover(e)
}},MouseOut:function(e){if(this._elTarget.onmouseout){this._elTarget.onmouseout(e)
}},MouseDown:function(e){var t=this,sResult="";
if(t.options.onBeforeSelect){sResult=t.options.onBeforeSelect(t)
}if(t._elTarget.onmousedown){t._elTarget.onmousedown(e)
}if(sResult){t._elInput.disabled=true;
alert(sResult);
setTimeout(function(){t._elInput.disabled=false
},100)
}},MouseUp:function(e){if(this._elTarget.onmouseup){this._elTarget.onmouseup(e)
}},_createFileForm:function(){var t=this;
var elInput=null;
var nFontSize=parseInt(Math.max(t._elTarget.offsetHeight,t._elTarget.offsetWidth/5));
try{elInput=$("<INPUT>");
elInput.setAttribute("type","file");
elInput.setAttribute("name","Filedata");
elInput.style.fontSize=nFontSize+"px";
elInput.style.width="100%";
elInput.style.height="100%"
}catch(e){}$Element(elInput).css({position:"absolute",top:"0px",right:"0px"});
try{elInput.style.cursor="pointer"
}catch(err){elInput.style.cursor="hand"
}elInput.onchange=function(){if(!t._checkExtension(this.value)){var ext=/\.([^\.\/]*)$/.test(this.value)?RegExp.$1:".";
alert(t.options.msgNotAllowedExt.replace("%s",ext));
return false
}t.options.onSelect(this.value);
t.send()
};
return elInput
},free:function(){var d=this._elDiv;
d.onmouseover=null;
d.onmouseout=null;
d.onmousedown=null;
d.onmouseup=null;
d.parentNode.removeChild(d);
this._elDiv=d=null
}});
pkg.container[pkg.name]["__tmpFunc"]={}
})("nj.Uploader2");
var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var b64pad="=";
function hex2b64(h){var i;
var c;
var ret="";
for(i=0;
i+3<=h.length;
i+=3){c=parseInt(h.substring(i,i+3),16);
ret+=b64map.charAt(c>>6)+b64map.charAt(c&63)
}if(i+1==h.length){c=parseInt(h.substring(i,i+1),16);
ret+=b64map.charAt(c<<2)
}else{if(i+2==h.length){c=parseInt(h.substring(i,i+2),16);
ret+=b64map.charAt(c>>2)+b64map.charAt((c&3)<<4)
}}while((ret.length&3)>0){ret+=b64pad
}return ret
}function b64tohex(s){var ret="";
var i;
var k=0;
var slop;
for(i=0;
i<s.length;
++i){if(s.charAt(i)==b64pad){break
}v=b64map.indexOf(s.charAt(i));
if(v<0){continue
}if(k==0){ret+=int2char(v>>2);
slop=v&3;
k=1
}else{if(k==1){ret+=int2char((slop<<2)|(v>>4));
slop=v&15;
k=2
}else{if(k==2){ret+=int2char(slop);
ret+=int2char(v>>2);
slop=v&3;
k=3
}else{ret+=int2char((slop<<2)|(v>>4));
ret+=int2char(v&15);
k=0
}}}}if(k==1){ret+=int2char(slop<<2)
}return ret
}function b64toBA(s){var h=b64tohex(s);
var i;
var a=new Array();
for(i=0;
2*i<h.length;
++i){a[i]=parseInt(h.substring(2*i,2*i+2),16)
}return a
}var dbits;
var canary=244837814094590;
var j_lm=((canary&16777215)==15715070);
function BigInteger(a,b,c){if(a!=null){if("number"==typeof a){this.fromNumber(a,b,c)
}else{if(b==null&&"string"!=typeof a){this.fromString(a,256)
}else{this.fromString(a,b)
}}}}function nbi(){return new BigInteger(null)
}function am1(i,x,w,j,c,n){while(--n>=0){var v=x*this[i++]+w[j]+c;
c=Math.floor(v/67108864);
w[j++]=v&67108863
}return c
}function am2(i,x,w,j,c,n){var xl=x&32767,xh=x>>15;
while(--n>=0){var l=this[i]&32767;
var h=this[i++]>>15;
var m=xh*l+h*xl;
l=xl*l+((m&32767)<<15)+w[j]+(c&1073741823);
c=(l>>>30)+(m>>>15)+xh*h+(c>>>30);
w[j++]=l&1073741823
}return c
}function am3(i,x,w,j,c,n){var xl=x&16383,xh=x>>14;
while(--n>=0){var l=this[i]&16383;
var h=this[i++]>>14;
var m=xh*l+h*xl;
l=xl*l+((m&16383)<<14)+w[j]+c;
c=(l>>28)+(m>>14)+xh*h;
w[j++]=l&268435455
}return c
}if(j_lm&&(navigator.appName=="Microsoft Internet Explorer")){BigInteger.prototype.am=am2;
dbits=30
}else{if(j_lm&&(navigator.appName!="Netscape")){BigInteger.prototype.am=am1;
dbits=26
}else{BigInteger.prototype.am=am3;
dbits=28
}}BigInteger.prototype.DB=dbits;
BigInteger.prototype.DM=((1<<dbits)-1);
BigInteger.prototype.DV=(1<<dbits);
var BI_FP=52;
BigInteger.prototype.FV=Math.pow(2,BI_FP);
BigInteger.prototype.F1=BI_FP-dbits;
BigInteger.prototype.F2=2*dbits-BI_FP;
var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC=new Array();
var rr,vv;
rr="0".charCodeAt(0);
for(vv=0;
vv<=9;
++vv){BI_RC[rr++]=vv
}rr="a".charCodeAt(0);
for(vv=10;
vv<36;
++vv){BI_RC[rr++]=vv
}rr="A".charCodeAt(0);
for(vv=10;
vv<36;
++vv){BI_RC[rr++]=vv
}function int2char(n){return BI_RM.charAt(n)
}function intAt(s,i){var c=BI_RC[s.charCodeAt(i)];
return(c==null)?-1:c
}function bnpCopyTo(r){for(var i=this.t-1;
i>=0;
--i){r[i]=this[i]
}r.t=this.t;
r.s=this.s
}function bnpFromInt(x){this.t=1;
this.s=(x<0)?-1:0;
if(x>0){this[0]=x
}else{if(x<-1){this[0]=x+DV
}else{this.t=0
}}}function nbv(i){var r=nbi();
r.fromInt(i);
return r
}function bnpFromString(s,b){var k;
if(b==16){k=4
}else{if(b==8){k=3
}else{if(b==256){k=8
}else{if(b==2){k=1
}else{if(b==32){k=5
}else{if(b==4){k=2
}else{this.fromRadix(s,b);
return 
}}}}}}this.t=0;
this.s=0;
var i=s.length,mi=false,sh=0;
while(--i>=0){var x=(k==8)?s[i]&255:intAt(s,i);
if(x<0){if(s.charAt(i)=="-"){mi=true
}continue
}mi=false;
if(sh==0){this[this.t++]=x
}else{if(sh+k>this.DB){this[this.t-1]|=(x&((1<<(this.DB-sh))-1))<<sh;
this[this.t++]=(x>>(this.DB-sh))
}else{this[this.t-1]|=x<<sh
}}sh+=k;
if(sh>=this.DB){sh-=this.DB
}}if(k==8&&(s[0]&128)!=0){this.s=-1;
if(sh>0){this[this.t-1]|=((1<<(this.DB-sh))-1)<<sh
}}this.clamp();
if(mi){BigInteger.ZERO.subTo(this,this)
}}function bnpClamp(){var c=this.s&this.DM;
while(this.t>0&&this[this.t-1]==c){--this.t
}}function bnToString(b){if(this.s<0){return"-"+this.negate().toString(b)
}var k;
if(b==16){k=4
}else{if(b==8){k=3
}else{if(b==2){k=1
}else{if(b==32){k=5
}else{if(b==4){k=2
}else{return this.toRadix(b)
}}}}}var km=(1<<k)-1,d,m=false,r="",i=this.t;
var p=this.DB-(i*this.DB)%k;
if(i-->0){if(p<this.DB&&(d=this[i]>>p)>0){m=true;
r=int2char(d)
}while(i>=0){if(p<k){d=(this[i]&((1<<p)-1))<<(k-p);
d|=this[--i]>>(p+=this.DB-k)
}else{d=(this[i]>>(p-=k))&km;
if(p<=0){p+=this.DB;
--i
}}if(d>0){m=true
}if(m){r+=int2char(d)
}}}return m?r:"0"
}function bnNegate(){var r=nbi();
BigInteger.ZERO.subTo(this,r);
return r
}function bnAbs(){return(this.s<0)?this.negate():this
}function bnCompareTo(a){var r=this.s-a.s;
if(r!=0){return r
}var i=this.t;
r=i-a.t;
if(r!=0){return r
}while(--i>=0){if((r=this[i]-a[i])!=0){return r
}}return 0
}function nbits(x){var r=1,t;
if((t=x>>>16)!=0){x=t;
r+=16
}if((t=x>>8)!=0){x=t;
r+=8
}if((t=x>>4)!=0){x=t;
r+=4
}if((t=x>>2)!=0){x=t;
r+=2
}if((t=x>>1)!=0){x=t;
r+=1
}return r
}function bnBitLength(){if(this.t<=0){return 0
}return this.DB*(this.t-1)+nbits(this[this.t-1]^(this.s&this.DM))
}function bnpDLShiftTo(n,r){var i;
for(i=this.t-1;
i>=0;
--i){r[i+n]=this[i]
}for(i=n-1;
i>=0;
--i){r[i]=0
}r.t=this.t+n;
r.s=this.s
}function bnpDRShiftTo(n,r){for(var i=n;
i<this.t;
++i){r[i-n]=this[i]
}r.t=Math.max(this.t-n,0);
r.s=this.s
}function bnpLShiftTo(n,r){var bs=n%this.DB;
var cbs=this.DB-bs;
var bm=(1<<cbs)-1;
var ds=Math.floor(n/this.DB),c=(this.s<<bs)&this.DM,i;
for(i=this.t-1;
i>=0;
--i){r[i+ds+1]=(this[i]>>cbs)|c;
c=(this[i]&bm)<<bs
}for(i=ds-1;
i>=0;
--i){r[i]=0
}r[ds]=c;
r.t=this.t+ds+1;
r.s=this.s;
r.clamp()
}function bnpRShiftTo(n,r){r.s=this.s;
var ds=Math.floor(n/this.DB);
if(ds>=this.t){r.t=0;
return 
}var bs=n%this.DB;
var cbs=this.DB-bs;
var bm=(1<<bs)-1;
r[0]=this[ds]>>bs;
for(var i=ds+1;
i<this.t;
++i){r[i-ds-1]|=(this[i]&bm)<<cbs;
r[i-ds]=this[i]>>bs
}if(bs>0){r[this.t-ds-1]|=(this.s&bm)<<cbs
}r.t=this.t-ds;
r.clamp()
}function bnpSubTo(a,r){var i=0,c=0,m=Math.min(a.t,this.t);
while(i<m){c+=this[i]-a[i];
r[i++]=c&this.DM;
c>>=this.DB
}if(a.t<this.t){c-=a.s;
while(i<this.t){c+=this[i];
r[i++]=c&this.DM;
c>>=this.DB
}c+=this.s
}else{c+=this.s;
while(i<a.t){c-=a[i];
r[i++]=c&this.DM;
c>>=this.DB
}c-=a.s
}r.s=(c<0)?-1:0;
if(c<-1){r[i++]=this.DV+c
}else{if(c>0){r[i++]=c
}}r.t=i;
r.clamp()
}function bnpMultiplyTo(a,r){var x=this.abs(),y=a.abs();
var i=x.t;
r.t=i+y.t;
while(--i>=0){r[i]=0
}for(i=0;
i<y.t;
++i){r[i+x.t]=x.am(0,y[i],r,i,0,x.t)
}r.s=0;
r.clamp();
if(this.s!=a.s){BigInteger.ZERO.subTo(r,r)
}}function bnpSquareTo(r){var x=this.abs();
var i=r.t=2*x.t;
while(--i>=0){r[i]=0
}for(i=0;
i<x.t-1;
++i){var c=x.am(i,x[i],r,2*i,0,1);
if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1))>=x.DV){r[i+x.t]-=x.DV;
r[i+x.t+1]=1
}}if(r.t>0){r[r.t-1]+=x.am(i,x[i],r,2*i,0,1)
}r.s=0;
r.clamp()
}function bnpDivRemTo(m,q,r){var pm=m.abs();
if(pm.t<=0){return 
}var pt=this.abs();
if(pt.t<pm.t){if(q!=null){q.fromInt(0)
}if(r!=null){this.copyTo(r)
}return 
}if(r==null){r=nbi()
}var y=nbi(),ts=this.s,ms=m.s;
var nsh=this.DB-nbits(pm[pm.t-1]);
if(nsh>0){pm.lShiftTo(nsh,y);
pt.lShiftTo(nsh,r)
}else{pm.copyTo(y);
pt.copyTo(r)
}var ys=y.t;
var y0=y[ys-1];
if(y0==0){return 
}var yt=y0*(1<<this.F1)+((ys>1)?y[ys-2]>>this.F2:0);
var d1=this.FV/yt,d2=(1<<this.F1)/yt,e=1<<this.F2;
var i=r.t,j=i-ys,t=(q==null)?nbi():q;
y.dlShiftTo(j,t);
if(r.compareTo(t)>=0){r[r.t++]=1;
r.subTo(t,r)
}BigInteger.ONE.dlShiftTo(ys,t);
t.subTo(y,y);
while(y.t<ys){y[y.t++]=0
}while(--j>=0){var qd=(r[--i]==y0)?this.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
if((r[i]+=y.am(0,qd,r,j,0,ys))<qd){y.dlShiftTo(j,t);
r.subTo(t,r);
while(r[i]<--qd){r.subTo(t,r)
}}}if(q!=null){r.drShiftTo(ys,q);
if(ts!=ms){BigInteger.ZERO.subTo(q,q)
}}r.t=ys;
r.clamp();
if(nsh>0){r.rShiftTo(nsh,r)
}if(ts<0){BigInteger.ZERO.subTo(r,r)
}}function bnMod(a){var r=nbi();
this.abs().divRemTo(a,null,r);
if(this.s<0&&r.compareTo(BigInteger.ZERO)>0){a.subTo(r,r)
}return r
}function Classic(m){this.m=m
}function cConvert(x){if(x.s<0||x.compareTo(this.m)>=0){return x.mod(this.m)
}else{return x
}}function cRevert(x){return x
}function cReduce(x){x.divRemTo(this.m,null,x)
}function cMulTo(x,y,r){x.multiplyTo(y,r);
this.reduce(r)
}function cSqrTo(x,r){x.squareTo(r);
this.reduce(r)
}Classic.prototype.convert=cConvert;
Classic.prototype.revert=cRevert;
Classic.prototype.reduce=cReduce;
Classic.prototype.mulTo=cMulTo;
Classic.prototype.sqrTo=cSqrTo;
function bnpInvDigit(){if(this.t<1){return 0
}var x=this[0];
if((x&1)==0){return 0
}var y=x&3;
y=(y*(2-(x&15)*y))&15;
y=(y*(2-(x&255)*y))&255;
y=(y*(2-(((x&65535)*y)&65535)))&65535;
y=(y*(2-x*y%this.DV))%this.DV;
return(y>0)?this.DV-y:-y
}function Montgomery(m){this.m=m;
this.mp=m.invDigit();
this.mpl=this.mp&32767;
this.mph=this.mp>>15;
this.um=(1<<(m.DB-15))-1;
this.mt2=2*m.t
}function montConvert(x){var r=nbi();
x.abs().dlShiftTo(this.m.t,r);
r.divRemTo(this.m,null,r);
if(x.s<0&&r.compareTo(BigInteger.ZERO)>0){this.m.subTo(r,r)
}return r
}function montRevert(x){var r=nbi();
x.copyTo(r);
this.reduce(r);
return r
}function montReduce(x){while(x.t<=this.mt2){x[x.t++]=0
}for(var i=0;
i<this.m.t;
++i){var j=x[i]&32767;
var u0=(j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&x.DM;
j=i+this.m.t;
x[j]+=this.m.am(0,u0,x,i,0,this.m.t);
while(x[j]>=x.DV){x[j]-=x.DV;
x[++j]++
}}x.clamp();
x.drShiftTo(this.m.t,x);
if(x.compareTo(this.m)>=0){x.subTo(this.m,x)
}}function montSqrTo(x,r){x.squareTo(r);
this.reduce(r)
}function montMulTo(x,y,r){x.multiplyTo(y,r);
this.reduce(r)
}Montgomery.prototype.convert=montConvert;
Montgomery.prototype.revert=montRevert;
Montgomery.prototype.reduce=montReduce;
Montgomery.prototype.mulTo=montMulTo;
Montgomery.prototype.sqrTo=montSqrTo;
function bnpIsEven(){return((this.t>0)?(this[0]&1):this.s)==0
}function bnpExp(e,z){if(e>4294967295||e<1){return BigInteger.ONE
}var r=nbi(),r2=nbi(),g=z.convert(this),i=nbits(e)-1;
g.copyTo(r);
while(--i>=0){z.sqrTo(r,r2);
if((e&(1<<i))>0){z.mulTo(r2,g,r)
}else{var t=r;
r=r2;
r2=t
}}return z.revert(r)
}function bnModPowInt(e,m){var z;
if(e<256||m.isEven()){z=new Classic(m)
}else{z=new Montgomery(m)
}return this.exp(e,z)
}BigInteger.prototype.copyTo=bnpCopyTo;
BigInteger.prototype.fromInt=bnpFromInt;
BigInteger.prototype.fromString=bnpFromString;
BigInteger.prototype.clamp=bnpClamp;
BigInteger.prototype.dlShiftTo=bnpDLShiftTo;
BigInteger.prototype.drShiftTo=bnpDRShiftTo;
BigInteger.prototype.lShiftTo=bnpLShiftTo;
BigInteger.prototype.rShiftTo=bnpRShiftTo;
BigInteger.prototype.subTo=bnpSubTo;
BigInteger.prototype.multiplyTo=bnpMultiplyTo;
BigInteger.prototype.squareTo=bnpSquareTo;
BigInteger.prototype.divRemTo=bnpDivRemTo;
BigInteger.prototype.invDigit=bnpInvDigit;
BigInteger.prototype.isEven=bnpIsEven;
BigInteger.prototype.exp=bnpExp;
BigInteger.prototype.toString=bnToString;
BigInteger.prototype.negate=bnNegate;
BigInteger.prototype.abs=bnAbs;
BigInteger.prototype.compareTo=bnCompareTo;
BigInteger.prototype.bitLength=bnBitLength;
BigInteger.prototype.mod=bnMod;
BigInteger.prototype.modPowInt=bnModPowInt;
BigInteger.ZERO=nbv(0);
BigInteger.ONE=nbv(1);
function bnClone(){var r=nbi();
this.copyTo(r);
return r
}function bnIntValue(){if(this.s<0){if(this.t==1){return this[0]-this.DV
}else{if(this.t==0){return -1
}}}else{if(this.t==1){return this[0]
}else{if(this.t==0){return 0
}}}return((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0]
}function bnByteValue(){return(this.t==0)?this.s:(this[0]<<24)>>24
}function bnShortValue(){return(this.t==0)?this.s:(this[0]<<16)>>16
}function bnpChunkSize(r){return Math.floor(Math.LN2*this.DB/Math.log(r))
}function bnSigNum(){if(this.s<0){return -1
}else{if(this.t<=0||(this.t==1&&this[0]<=0)){return 0
}else{return 1
}}}function bnpToRadix(b){if(b==null){b=10
}if(this.signum()==0||b<2||b>36){return"0"
}var cs=this.chunkSize(b);
var a=Math.pow(b,cs);
var d=nbv(a),y=nbi(),z=nbi(),r="";
this.divRemTo(d,y,z);
while(y.signum()>0){r=(a+z.intValue()).toString(b).substr(1)+r;
y.divRemTo(d,y,z)
}return z.intValue().toString(b)+r
}function bnpFromRadix(s,b){this.fromInt(0);
if(b==null){b=10
}var cs=this.chunkSize(b);
var d=Math.pow(b,cs),mi=false,j=0,w=0;
for(var i=0;
i<s.length;
++i){var x=intAt(s,i);
if(x<0){if(s.charAt(i)=="-"&&this.signum()==0){mi=true
}continue
}w=b*w+x;
if(++j>=cs){this.dMultiply(d);
this.dAddOffset(w,0);
j=0;
w=0
}}if(j>0){this.dMultiply(Math.pow(b,j));
this.dAddOffset(w,0)
}if(mi){BigInteger.ZERO.subTo(this,this)
}}function bnpFromNumber(a,b,c){if("number"==typeof b){if(a<2){this.fromInt(1)
}else{this.fromNumber(a,c);
if(!this.testBit(a-1)){this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this)
}if(this.isEven()){this.dAddOffset(1,0)
}while(!this.isProbablePrime(b)){this.dAddOffset(2,0);
if(this.bitLength()>a){this.subTo(BigInteger.ONE.shiftLeft(a-1),this)
}}}}else{var x=new Array(),t=a&7;
x.length=(a>>3)+1;
b.nextBytes(x);
if(t>0){x[0]&=((1<<t)-1)
}else{x[0]=0
}this.fromString(x,256)
}}function bnToByteArray(){var i=this.t,r=new Array();
r[0]=this.s;
var p=this.DB-(i*this.DB)%8,d,k=0;
if(i-->0){if(p<this.DB&&(d=this[i]>>p)!=(this.s&this.DM)>>p){r[k++]=d|(this.s<<(this.DB-p))
}while(i>=0){if(p<8){d=(this[i]&((1<<p)-1))<<(8-p);
d|=this[--i]>>(p+=this.DB-8)
}else{d=(this[i]>>(p-=8))&255;
if(p<=0){p+=this.DB;
--i
}}if((d&128)!=0){d|=-256
}if(k==0&&(this.s&128)!=(d&128)){++k
}if(k>0||d!=this.s){r[k++]=d
}}}return r
}function bnEquals(a){return(this.compareTo(a)==0)
}function bnMin(a){return(this.compareTo(a)<0)?this:a
}function bnMax(a){return(this.compareTo(a)>0)?this:a
}function bnpBitwiseTo(a,op,r){var i,f,m=Math.min(a.t,this.t);
for(i=0;
i<m;
++i){r[i]=op(this[i],a[i])
}if(a.t<this.t){f=a.s&this.DM;
for(i=m;
i<this.t;
++i){r[i]=op(this[i],f)
}r.t=this.t
}else{f=this.s&this.DM;
for(i=m;
i<a.t;
++i){r[i]=op(f,a[i])
}r.t=a.t
}r.s=op(this.s,a.s);
r.clamp()
}function op_and(x,y){return x&y
}function bnAnd(a){var r=nbi();
this.bitwiseTo(a,op_and,r);
return r
}function op_or(x,y){return x|y
}function bnOr(a){var r=nbi();
this.bitwiseTo(a,op_or,r);
return r
}function op_xor(x,y){return x^y
}function bnXor(a){var r=nbi();
this.bitwiseTo(a,op_xor,r);
return r
}function op_andnot(x,y){return x&~y
}function bnAndNot(a){var r=nbi();
this.bitwiseTo(a,op_andnot,r);
return r
}function bnNot(){var r=nbi();
for(var i=0;
i<this.t;
++i){r[i]=this.DM&~this[i]
}r.t=this.t;
r.s=~this.s;
return r
}function bnShiftLeft(n){var r=nbi();
if(n<0){this.rShiftTo(-n,r)
}else{this.lShiftTo(n,r)
}return r
}function bnShiftRight(n){var r=nbi();
if(n<0){this.lShiftTo(-n,r)
}else{this.rShiftTo(n,r)
}return r
}function lbit(x){if(x==0){return -1
}var r=0;
if((x&65535)==0){x>>=16;
r+=16
}if((x&255)==0){x>>=8;
r+=8
}if((x&15)==0){x>>=4;
r+=4
}if((x&3)==0){x>>=2;
r+=2
}if((x&1)==0){++r
}return r
}function bnGetLowestSetBit(){for(var i=0;
i<this.t;
++i){if(this[i]!=0){return i*this.DB+lbit(this[i])
}}if(this.s<0){return this.t*this.DB
}return -1
}function cbit(x){var r=0;
while(x!=0){x&=x-1;
++r
}return r
}function bnBitCount(){var r=0,x=this.s&this.DM;
for(var i=0;
i<this.t;
++i){r+=cbit(this[i]^x)
}return r
}function bnTestBit(n){var j=Math.floor(n/this.DB);
if(j>=this.t){return(this.s!=0)
}return((this[j]&(1<<(n%this.DB)))!=0)
}function bnpChangeBit(n,op){var r=BigInteger.ONE.shiftLeft(n);
this.bitwiseTo(r,op,r);
return r
}function bnSetBit(n){return this.changeBit(n,op_or)
}function bnClearBit(n){return this.changeBit(n,op_andnot)
}function bnFlipBit(n){return this.changeBit(n,op_xor)
}function bnpAddTo(a,r){var i=0,c=0,m=Math.min(a.t,this.t);
while(i<m){c+=this[i]+a[i];
r[i++]=c&this.DM;
c>>=this.DB
}if(a.t<this.t){c+=a.s;
while(i<this.t){c+=this[i];
r[i++]=c&this.DM;
c>>=this.DB
}c+=this.s
}else{c+=this.s;
while(i<a.t){c+=a[i];
r[i++]=c&this.DM;
c>>=this.DB
}c+=a.s
}r.s=(c<0)?-1:0;
if(c>0){r[i++]=c
}else{if(c<-1){r[i++]=this.DV+c
}}r.t=i;
r.clamp()
}function bnAdd(a){var r=nbi();
this.addTo(a,r);
return r
}function bnSubtract(a){var r=nbi();
this.subTo(a,r);
return r
}function bnMultiply(a){var r=nbi();
this.multiplyTo(a,r);
return r
}function bnDivide(a){var r=nbi();
this.divRemTo(a,r,null);
return r
}function bnRemainder(a){var r=nbi();
this.divRemTo(a,null,r);
return r
}function bnDivideAndRemainder(a){var q=nbi(),r=nbi();
this.divRemTo(a,q,r);
return new Array(q,r)
}function bnpDMultiply(n){this[this.t]=this.am(0,n-1,this,0,0,this.t);
++this.t;
this.clamp()
}function bnpDAddOffset(n,w){while(this.t<=w){this[this.t++]=0
}this[w]+=n;
while(this[w]>=this.DV){this[w]-=this.DV;
if(++w>=this.t){this[this.t++]=0
}++this[w]
}}function NullExp(){}function nNop(x){return x
}function nMulTo(x,y,r){x.multiplyTo(y,r)
}function nSqrTo(x,r){x.squareTo(r)
}NullExp.prototype.convert=nNop;
NullExp.prototype.revert=nNop;
NullExp.prototype.mulTo=nMulTo;
NullExp.prototype.sqrTo=nSqrTo;
function bnPow(e){return this.exp(e,new NullExp())
}function bnpMultiplyLowerTo(a,n,r){var i=Math.min(this.t+a.t,n);
r.s=0;
r.t=i;
while(i>0){r[--i]=0
}var j;
for(j=r.t-this.t;
i<j;
++i){r[i+this.t]=this.am(0,a[i],r,i,0,this.t)
}for(j=Math.min(a.t,n);
i<j;
++i){this.am(0,a[i],r,i,0,n-i)
}r.clamp()
}function bnpMultiplyUpperTo(a,n,r){--n;
var i=r.t=this.t+a.t-n;
r.s=0;
while(--i>=0){r[i]=0
}for(i=Math.max(n-this.t,0);
i<a.t;
++i){r[this.t+i-n]=this.am(n-i,a[i],r,0,0,this.t+i-n)
}r.clamp();
r.drShiftTo(1,r)
}function Barrett(m){this.r2=nbi();
this.q3=nbi();
BigInteger.ONE.dlShiftTo(2*m.t,this.r2);
this.mu=this.r2.divide(m);
this.m=m
}function barrettConvert(x){if(x.s<0||x.t>2*this.m.t){return x.mod(this.m)
}else{if(x.compareTo(this.m)<0){return x
}else{var r=nbi();
x.copyTo(r);
this.reduce(r);
return r
}}}function barrettRevert(x){return x
}function barrettReduce(x){x.drShiftTo(this.m.t-1,this.r2);
if(x.t>this.m.t+1){x.t=this.m.t+1;
x.clamp()
}this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);
this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);
while(x.compareTo(this.r2)<0){x.dAddOffset(1,this.m.t+1)
}x.subTo(this.r2,x);
while(x.compareTo(this.m)>=0){x.subTo(this.m,x)
}}function barrettSqrTo(x,r){x.squareTo(r);
this.reduce(r)
}function barrettMulTo(x,y,r){x.multiplyTo(y,r);
this.reduce(r)
}Barrett.prototype.convert=barrettConvert;
Barrett.prototype.revert=barrettRevert;
Barrett.prototype.reduce=barrettReduce;
Barrett.prototype.mulTo=barrettMulTo;
Barrett.prototype.sqrTo=barrettSqrTo;
function bnModPow(e,m){var i=e.bitLength(),k,r=nbv(1),z;
if(i<=0){return r
}else{if(i<18){k=1
}else{if(i<48){k=3
}else{if(i<144){k=4
}else{if(i<768){k=5
}else{k=6
}}}}}if(i<8){z=new Classic(m)
}else{if(m.isEven()){z=new Barrett(m)
}else{z=new Montgomery(m)
}}var g=new Array(),n=3,k1=k-1,km=(1<<k)-1;
g[1]=z.convert(this);
if(k>1){var g2=nbi();
z.sqrTo(g[1],g2);
while(n<=km){g[n]=nbi();
z.mulTo(g2,g[n-2],g[n]);
n+=2
}}var j=e.t-1,w,is1=true,r2=nbi(),t;
i=nbits(e[j])-1;
while(j>=0){if(i>=k1){w=(e[j]>>(i-k1))&km
}else{w=(e[j]&((1<<(i+1))-1))<<(k1-i);
if(j>0){w|=e[j-1]>>(this.DB+i-k1)
}}n=k;
while((w&1)==0){w>>=1;
--n
}if((i-=n)<0){i+=this.DB;
--j
}if(is1){g[w].copyTo(r);
is1=false
}else{while(n>1){z.sqrTo(r,r2);
z.sqrTo(r2,r);
n-=2
}if(n>0){z.sqrTo(r,r2)
}else{t=r;
r=r2;
r2=t
}z.mulTo(r2,g[w],r)
}while(j>=0&&(e[j]&(1<<i))==0){z.sqrTo(r,r2);
t=r;
r=r2;
r2=t;
if(--i<0){i=this.DB-1;
--j
}}}return z.revert(r)
}function bnGCD(a){var x=(this.s<0)?this.negate():this.clone();
var y=(a.s<0)?a.negate():a.clone();
if(x.compareTo(y)<0){var t=x;
x=y;
y=t
}var i=x.getLowestSetBit(),g=y.getLowestSetBit();
if(g<0){return x
}if(i<g){g=i
}if(g>0){x.rShiftTo(g,x);
y.rShiftTo(g,y)
}while(x.signum()>0){if((i=x.getLowestSetBit())>0){x.rShiftTo(i,x)
}if((i=y.getLowestSetBit())>0){y.rShiftTo(i,y)
}if(x.compareTo(y)>=0){x.subTo(y,x);
x.rShiftTo(1,x)
}else{y.subTo(x,y);
y.rShiftTo(1,y)
}}if(g>0){y.lShiftTo(g,y)
}return y
}function bnpModInt(n){if(n<=0){return 0
}var d=this.DV%n,r=(this.s<0)?n-1:0;
if(this.t>0){if(d==0){r=this[0]%n
}else{for(var i=this.t-1;
i>=0;
--i){r=(d*r+this[i])%n
}}}return r
}function bnModInverse(m){var ac=m.isEven();
if((this.isEven()&&ac)||m.signum()==0){return BigInteger.ZERO
}var u=m.clone(),v=this.clone();
var a=nbv(1),b=nbv(0),c=nbv(0),d=nbv(1);
while(u.signum()!=0){while(u.isEven()){u.rShiftTo(1,u);
if(ac){if(!a.isEven()||!b.isEven()){a.addTo(this,a);
b.subTo(m,b)
}a.rShiftTo(1,a)
}else{if(!b.isEven()){b.subTo(m,b)
}}b.rShiftTo(1,b)
}while(v.isEven()){v.rShiftTo(1,v);
if(ac){if(!c.isEven()||!d.isEven()){c.addTo(this,c);
d.subTo(m,d)
}c.rShiftTo(1,c)
}else{if(!d.isEven()){d.subTo(m,d)
}}d.rShiftTo(1,d)
}if(u.compareTo(v)>=0){u.subTo(v,u);
if(ac){a.subTo(c,a)
}b.subTo(d,b)
}else{v.subTo(u,v);
if(ac){c.subTo(a,c)
}d.subTo(b,d)
}}if(v.compareTo(BigInteger.ONE)!=0){return BigInteger.ZERO
}if(d.compareTo(m)>=0){return d.subtract(m)
}if(d.signum()<0){d.addTo(m,d)
}else{return d
}if(d.signum()<0){return d.add(m)
}else{return d
}}var lowprimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509];
var lplim=(1<<26)/lowprimes[lowprimes.length-1];
function bnIsProbablePrime(t){var i,x=this.abs();
if(x.t==1&&x[0]<=lowprimes[lowprimes.length-1]){for(i=0;
i<lowprimes.length;
++i){if(x[0]==lowprimes[i]){return true
}}return false
}if(x.isEven()){return false
}i=1;
while(i<lowprimes.length){var m=lowprimes[i],j=i+1;
while(j<lowprimes.length&&m<lplim){m*=lowprimes[j++]
}m=x.modInt(m);
while(i<j){if(m%lowprimes[i++]==0){return false
}}}return x.millerRabin(t)
}function bnpMillerRabin(t){var n1=this.subtract(BigInteger.ONE);
var k=n1.getLowestSetBit();
if(k<=0){return false
}var r=n1.shiftRight(k);
t=(t+1)>>1;
if(t>lowprimes.length){t=lowprimes.length
}var a=nbi();
for(var i=0;
i<t;
++i){a.fromInt(lowprimes[i]);
var y=a.modPow(r,this);
if(y.compareTo(BigInteger.ONE)!=0&&y.compareTo(n1)!=0){var j=1;
while(j++<k&&y.compareTo(n1)!=0){y=y.modPowInt(2,this);
if(y.compareTo(BigInteger.ONE)==0){return false
}}if(y.compareTo(n1)!=0){return false
}}}return true
}BigInteger.prototype.chunkSize=bnpChunkSize;
BigInteger.prototype.toRadix=bnpToRadix;
BigInteger.prototype.fromRadix=bnpFromRadix;
BigInteger.prototype.fromNumber=bnpFromNumber;
BigInteger.prototype.bitwiseTo=bnpBitwiseTo;
BigInteger.prototype.changeBit=bnpChangeBit;
BigInteger.prototype.addTo=bnpAddTo;
BigInteger.prototype.dMultiply=bnpDMultiply;
BigInteger.prototype.dAddOffset=bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo=bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo=bnpMultiplyUpperTo;
BigInteger.prototype.modInt=bnpModInt;
BigInteger.prototype.millerRabin=bnpMillerRabin;
BigInteger.prototype.clone=bnClone;
BigInteger.prototype.intValue=bnIntValue;
BigInteger.prototype.byteValue=bnByteValue;
BigInteger.prototype.shortValue=bnShortValue;
BigInteger.prototype.signum=bnSigNum;
BigInteger.prototype.toByteArray=bnToByteArray;
BigInteger.prototype.equals=bnEquals;
BigInteger.prototype.min=bnMin;
BigInteger.prototype.max=bnMax;
BigInteger.prototype.and=bnAnd;
BigInteger.prototype.or=bnOr;
BigInteger.prototype.xor=bnXor;
BigInteger.prototype.andNot=bnAndNot;
BigInteger.prototype.not=bnNot;
BigInteger.prototype.shiftLeft=bnShiftLeft;
BigInteger.prototype.shiftRight=bnShiftRight;
BigInteger.prototype.getLowestSetBit=bnGetLowestSetBit;
BigInteger.prototype.bitCount=bnBitCount;
BigInteger.prototype.testBit=bnTestBit;
BigInteger.prototype.setBit=bnSetBit;
BigInteger.prototype.clearBit=bnClearBit;
BigInteger.prototype.flipBit=bnFlipBit;
BigInteger.prototype.add=bnAdd;
BigInteger.prototype.subtract=bnSubtract;
BigInteger.prototype.multiply=bnMultiply;
BigInteger.prototype.divide=bnDivide;
BigInteger.prototype.remainder=bnRemainder;
BigInteger.prototype.divideAndRemainder=bnDivideAndRemainder;
BigInteger.prototype.modPow=bnModPow;
BigInteger.prototype.modInverse=bnModInverse;
BigInteger.prototype.pow=bnPow;
BigInteger.prototype.gcd=bnGCD;
BigInteger.prototype.isProbablePrime=bnIsProbablePrime;
function Arcfour(){this.i=0;
this.j=0;
this.S=new Array()
}function ARC4init(key){var i,j,t;
for(i=0;
i<256;
++i){this.S[i]=i
}j=0;
for(i=0;
i<256;
++i){j=(j+this.S[i]+key[i%key.length])&255;
t=this.S[i];
this.S[i]=this.S[j];
this.S[j]=t
}this.i=0;
this.j=0
}function ARC4next(){var t;
this.i=(this.i+1)&255;
this.j=(this.j+this.S[this.i])&255;
t=this.S[this.i];
this.S[this.i]=this.S[this.j];
this.S[this.j]=t;
return this.S[(t+this.S[this.i])&255]
}Arcfour.prototype.init=ARC4init;
Arcfour.prototype.next=ARC4next;
function prng_newstate(){return new Arcfour()
}var rng_psize=256;
var rng_state;
var rng_pool;
var rng_pptr;
function rng_seed_int(x){rng_pool[rng_pptr++]^=x&255;
rng_pool[rng_pptr++]^=(x>>8)&255;
rng_pool[rng_pptr++]^=(x>>16)&255;
rng_pool[rng_pptr++]^=(x>>24)&255;
if(rng_pptr>=rng_psize){rng_pptr-=rng_psize
}}function rng_seed_time(){rng_seed_int(new Date().getTime())
}if(rng_pool==null){rng_pool=new Array();
rng_pptr=0;
var t;
if(navigator.appName=="Netscape"&&navigator.appVersion<"5"&&window.crypto){var z=window.crypto.random(32);
for(t=0;
t<z.length;
++t){rng_pool[rng_pptr++]=z.charCodeAt(t)&255
}}while(rng_pptr<rng_psize){t=Math.floor(65536*Math.random());
rng_pool[rng_pptr++]=t>>>8;
rng_pool[rng_pptr++]=t&255
}rng_pptr=0;
rng_seed_time()
}function rng_get_byte(){if(rng_state==null){rng_seed_time();
rng_state=prng_newstate();
rng_state.init(rng_pool);
for(rng_pptr=0;
rng_pptr<rng_pool.length;
++rng_pptr){rng_pool[rng_pptr]=0
}rng_pptr=0
}return rng_state.next()
}function rng_get_bytes(ba){var i;
for(i=0;
i<ba.length;
++i){ba[i]=rng_get_byte()
}}function SecureRandom(){}SecureRandom.prototype.nextBytes=rng_get_bytes;
function parseBigInt(str,r){return new BigInteger(str,r)
}function linebrk(s,n){var ret="";
var i=0;
while(i+n<s.length){ret+=s.substring(i,i+n)+"\n";
i+=n
}return ret+s.substring(i,s.length)
}function byte2Hex(b){if(b<16){return"0"+b.toString(16)
}else{return b.toString(16)
}}function pkcs1pad2(s,n){if(n<s.length+11){alert("Message too long for RSA");
return null
}var ba=new Array();
var i=s.length-1;
while(i>=0&&n>0){ba[--n]=s.charCodeAt(i--)
}ba[--n]=0;
var rng=new SecureRandom();
var x=new Array();
while(n>2){x[0]=0;
while(x[0]==0){rng.nextBytes(x)
}ba[--n]=x[0]
}ba[--n]=2;
ba[--n]=0;
return new BigInteger(ba)
}function RSAKey(){this.n=null;
this.e=0;
this.d=null;
this.p=null;
this.q=null;
this.dmp1=null;
this.dmq1=null;
this.coeff=null
}function RSASetPublic(N,E){if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,16);
this.e=parseInt(E,16)
}else{alert("Invalid RSA public key")
}}function RSADoPublic(x){return x.modPowInt(this.e,this.n)
}function RSAEncrypt(text){var m=pkcs1pad2(text,(this.n.bitLength()+7)>>3);
if(m==null){return null
}var c=this.doPublic(m);
if(c==null){return null
}var h=c.toString(16);
if((h.length&1)==0){return h
}else{return"0"+h
}}RSAKey.prototype.doPublic=RSADoPublic;
RSAKey.prototype.setPublic=RSASetPublic;
RSAKey.prototype.encrypt=RSAEncrypt;
function pkcs1unpad2(d,n){var b=d.toByteArray();
var i=0;
while(i<b.length&&b[i]==0){++i
}if(b.length-i!=n-1||b[i]!=2){return null
}++i;
while(b[i]!=0){if(++i>=b.length){return null
}}var ret="";
while(++i<b.length){ret+=String.fromCharCode(b[i])
}return ret
}function RSASetPrivate(N,E,D){if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,16);
this.e=parseInt(E,16);
this.d=parseBigInt(D,16)
}else{alert("Invalid RSA private key")
}}function RSASetPrivateEx(N,E,D,P,Q,DP,DQ,C){if(N!=null&&E!=null&&N.length>0&&E.length>0){this.n=parseBigInt(N,16);
this.e=parseInt(E,16);
this.d=parseBigInt(D,16);
this.p=parseBigInt(P,16);
this.q=parseBigInt(Q,16);
this.dmp1=parseBigInt(DP,16);
this.dmq1=parseBigInt(DQ,16);
this.coeff=parseBigInt(C,16)
}else{alert("Invalid RSA private key")
}}function RSAGenerate(B,E){var rng=new SecureRandom();
var qs=B>>1;
this.e=parseInt(E,16);
var ee=new BigInteger(E,16);
for(;
;
){for(;
;
){this.p=new BigInteger(B-qs,1,rng);
if(this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE)==0&&this.p.isProbablePrime(10)){break
}}for(;
;
){this.q=new BigInteger(qs,1,rng);
if(this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE)==0&&this.q.isProbablePrime(10)){break
}}if(this.p.compareTo(this.q)<=0){var t=this.p;
this.p=this.q;
this.q=t
}var p1=this.p.subtract(BigInteger.ONE);
var q1=this.q.subtract(BigInteger.ONE);
var phi=p1.multiply(q1);
if(phi.gcd(ee).compareTo(BigInteger.ONE)==0){this.n=this.p.multiply(this.q);
this.d=ee.modInverse(phi);
this.dmp1=this.d.mod(p1);
this.dmq1=this.d.mod(q1);
this.coeff=this.q.modInverse(this.p);
break
}}}function RSADoPrivate(x){if(this.p==null||this.q==null){return x.modPow(this.d,this.n)
}var xp=x.mod(this.p).modPow(this.dmp1,this.p);
var xq=x.mod(this.q).modPow(this.dmq1,this.q);
while(xp.compareTo(xq)<0){xp=xp.add(this.p)
}return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq)
}function RSADecrypt(ctext){var c=parseBigInt(ctext,16);
var m=this.doPrivate(c);
if(m==null){return null
}return pkcs1unpad2(m,(this.n.bitLength()+7)>>3)
}RSAKey.prototype.doPrivate=RSADoPrivate;
RSAKey.prototype.setPrivate=RSASetPrivate;
RSAKey.prototype.setPrivateEx=RSASetPrivateEx;
RSAKey.prototype.generate=RSAGenerate;
RSAKey.prototype.decrypt=RSADecrypt;
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";
var chr1,chr2,chr3,enc1,enc2,enc3,enc4;
var i=0;
input=Base64._utf8_encode(input);
while(i<input.length){chr1=input.charCodeAt(i++);
chr2=input.charCodeAt(i++);
chr3=input.charCodeAt(i++);
enc1=chr1>>2;
enc2=((chr1&3)<<4)|(chr2>>4);
enc3=((chr2&15)<<2)|(chr3>>6);
enc4=chr3&63;
if(isNaN(chr2)){enc3=enc4=64
}else{if(isNaN(chr3)){enc4=64
}}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)
}return output
},decode:function(input){var output="";
var chr1,chr2,chr3;
var enc1,enc2,enc3,enc4;
var i=0;
input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");
while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));
enc2=this._keyStr.indexOf(input.charAt(i++));
enc3=this._keyStr.indexOf(input.charAt(i++));
enc4=this._keyStr.indexOf(input.charAt(i++));
chr1=(enc1<<2)|(enc2>>4);
chr2=((enc2&15)<<4)|(enc3>>2);
chr3=((enc3&3)<<6)|enc4;
output=output+String.fromCharCode(chr1);
if(enc3!=64){output=output+String.fromCharCode(chr2)
}if(enc4!=64){output=output+String.fromCharCode(chr3)
}}output=Base64._utf8_decode(output);
return output
},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");
var utftext="";
for(var n=0;
n<string.length;
n++){var c=string.charCodeAt(n);
if(c<128){utftext+=String.fromCharCode(c)
}else{if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);
utftext+=String.fromCharCode((c&63)|128)
}else{utftext+=String.fromCharCode((c>>12)|224);
utftext+=String.fromCharCode(((c>>6)&63)|128);
utftext+=String.fromCharCode((c&63)|128)
}}}return utftext
},_utf8_decode:function(utftext){var string="";
var i=0;
var c=c1=c2=0;
while(i<utftext.length){c=utftext.charCodeAt(i);
if(c<128){string+=String.fromCharCode(c);
i++
}else{if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);
string+=String.fromCharCode(((c&31)<<6)|(c2&63));
i+=2
}else{c2=utftext.charCodeAt(i+1);
c3=utftext.charCodeAt(i+2);
string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));
i+=3
}}}return string
}};
var SelectBox=$Class({$init:function(){this.info=this._initOption(arguments[0]);
var select=$(this.info.id);
if(!select){return 
}this._getAttribute(select);
this._setEvent();
this.control=new SelectBox.Control(this);
this.input=new SelectBox.Input(this);
this.box=new SelectBox.NullBox(this);
this._initFirstValue();
this._realignElement();
if(this.info.loadEvent){$Fn(this._initFirstValue,this).attach(window,"load")
}},_initOption:function(argu){var options={keepTitle:false,boxType:"basic",handlerType:"basic",boxY:0,align:"left",spanClass:"seljs_selected",spanTitleClass:"seljs_title",boxClass:"seljs_option",boxOverClass:"seljs_mover",focusClass:"sopen",maxHeight:1200,loadEvent:true,BtnClick:false,cols:false,multiColumn:0,disableMsg:""};
argu=argu||{};
for(var x in argu){options[x]=argu[x]
}return options
},_getAttribute:function(select){var t=this;
var agent=$Agent().navigator();
t.info.base=select;
t.info.parent=select.parentNode;
t.info.title=select.getAttribute("title")||false;
t.info.name=select.getAttribute("name")||"";
t.info.width=0;
t.info.selected=-1;
t.info.list=[];
t.info.optionType=[];
t.info.imgList=[];
$A($$("OPTION",select)).forEach(function(option,index){var newValue=option.firstChild.nodeValue;
t.info.optionType.push("normal");
t.info.list.push([newValue,(option.getAttribute("value")||"")]);
var sSrc=(agent.safari?option.getAttribute("style")||"none":$Element(option).css("backgroundImage"));
var sAlt=option.getAttribute("title")||"";
t.info.imgList.push(sSrc!="none"?[sSrc.replace(/.*url\(\"?([^\"]+)\"?\)/,"$1"),sAlt]:["",""]);
if(option.defaultSelected){t.info.selected=index
}},t);
t.info.width=parseInt(select.offsetWidth||select.style.width)
},_setEvent:function(){var t=this;
var select=t.info.base;
t.Onchange=(t._isValidEvent(select.onchange)||t._nullEvent);
t.Onkeydown=(t._isValidEvent(select.onkeydown)||t._nullEvent);
t.Onkeypress=(t._isValidEvent(select.onkeypress)||t._nullEvent);
t.Onmouseout=(t._isValidEvent(select.onmouseout)||t._nullEvent);
t.Onmouseover=(t._isValidEvent(select.onmouseover)||t._nullEvent);
t.Onclick=(t._isValidEvent(select.onclick)||t._nullEvent);
t.Onfocus=(t._isValidEvent(select.onfocus)||t._nullEvent);
t.Onblur=(t._isValidEvent(select.onblur)||t._nullEvent)
},_isValidEvent:function(func){return(func&&typeof func=="function")?func:false
},_initFirstValue:function(){var t=this;
var nSelected=t.info.selected;
var aList=t.info.list;
if(aList.length==0){return 
}if(t.info.selected<0){if(t.info.title){t.input.setTitle(t.info.title)
}else{t.input.setValue(aList[0][0],aList[0][1])
}}else{t.input.setValue(aList[nSelected][0],aList[nSelected][1])
}},_realignElement:function(){this.info.base.style.display="none";
this.info.base.removeAttribute("name");
this.info.parent.insertBefore(this.input._span,this.info.base)
},_getIndex:function(value){var index=-1;
$A(this.info.list).forEach(function(aData,i){if(aData[1]==value){index=i;
$A.Break()
}},this);
return index
},length:function(){return this.info.list.length
},getValue:function(){return{displayValue:(this.control.index.now==-1?this.info.title:this.info.list[this.control.index.now][0]),value:(this.control.index.now==-1?"":this.info.list[this.control.index.now][1]),index:this.control.index.now}
},setTitle:function(){if(this.info.title){this.control.changeIndex(-1);
this.control.initAllIndex(-1);
this.input.setTitle(this.info.title)
}},setValue:function(value,initFirstValue){var index=this._getIndex(value);
if(index==-1){return 
}this.control.changeIndex(index);
this.control.initAllIndex(index);
if(initFirstValue===true){this.info.selected=index
}},addValue:function(viewValue,value,imgSrc,imgAlt){var index=this._getIndex(value);
if(index!=-1){return this
}this.info.list.push([viewValue,value]);
this.info.imgList.push([imgSrc||"",imgAlt||""]);
if(!this.box.nullBox){this.box.refresh()
}return this
},readonly:function(b){this.info.enable=b?false:true
},enable:function(){this.info.enable=true;
this.input.enable()
},disable:function(isHide){this.info.enable=false;
this.input.disable(isHide)
},focus:function(){this.input.focus()
},show:function(){this.box.show()
},hide:function(){this.box.hide()
},_remove:function(index){this.info.list.splice(index,1);
this.info.imgList.splice(index,1);
if(!this.box.nullBox){this.box.refresh();
if(index==this.control.index.now&&this.length()!=0){this.control.changeIndex(0);
this.box.changeChildStyle(0)
}}},removeValue:function(value){var index=this._getIndex(value);
if(index==-1){return 
}this._remove(index);
return this
},removePart:function(size){var length=this.info.list.length;
if(length>size){for(var index=length;
index>=size;
index--){this._remove(index)
}}},recovery:function(){this.input._span.display="none";
this.info.base.style.display="block";
this.info.base.name=this.info.name;
this.input._hidden.name=""
},rrecovery:function(){this.info.base.style.display="none";
this.info.base.removeAttribute("name");
this.input._span.display="block";
this.input._hidden.name=this.info.name
},Onchange:null,Onkeydown:null,Onkeypress:null,Onmouseout:null,Onmouseover:null,Onclick:null,Onfocus:null,Onblur:null,BtnClick:null,_nullEvent:function(){}});
SelectBox.fireEvent=function(func,event,select){func.call(select,event,select)
};
SelectBox.EXTRA_WIDTH={ie:0,firefox:0,opera:0,safari:0,getWidth:function(agent){return(agent.ie?this.ie:agent.firefox?this.firefox:agent.safari?this.safari:this.opera)
},setWidth:function(extra){for(var p in extra){if(this[p]<extra[p]){this[p]=extra[p]
}}}};
SelectBox.Factory={newHandler:function(control){return new SelectBox.Handler(control)
},newBox:function(select){return new SelectBox.Box(select)
},newOption:function(select,box,index){return new SelectBox.Option(select,box,index)
}};
SelectBox.DOCTYPE="xhtml";
SelectBox.BOX_LIST=[];
SelectBox.CHECK_AREA=function(event){var element=event.element;
var elementID=[];
if(!!element){for(var i=0;
element!=null&&element.nodeType==1;
i++){elementID[i]=element.id||"";
element=element.parentNode
}}var hasID=false;
for(var i=0;
i<SelectBox.BOX_LIST.length;
i++,hasID=false){var box=SelectBox.BOX_LIST[i];
for(var j=0;
j<elementID.length;
j++){if(box[0]==elementID[j]||box[1]==elementID[j]){hasID=true;
break
}}if(hasID==false){$Element(box[1]).hide()
}}};
$Fn(SelectBox.CHECK_AREA,window).attach(document,"click");
SelectBox.Input=$Class({$init:function(select){this.select=select;
this.info=select.info;
this._createDOM();
this._addEvent()
},_createDOM:function(){this._span=$("<SPAN>");
this._span.className=this.info.spanTitleClass;
this._span.appendChild(this._input=this._createInput());
this._span.appendChild(this._hidden=this._createHidden());
if(this.info.selected>0){this._onfocus()
}},_createInput:function(){return $Element("<INPUT>").attr({id:(this.id=this.info.id+"Input"),type:"text",readOnly:"readOnly",value:""}).css({width:this.info.width+"px"}).$value()
},_createHidden:function(){return $Element("<INPUT>").attr({type:"hidden",name:this.info.name,value:""}).hide().$value()
},_addEvent:function(){$Fn(this._onfocus,this).attach(this._input,"focus");
$Fn(this._onblur,this).attach(this._input,"blur");
$Fn(this._onclick,this).attach(this._input,"click");
$Fn(this._onkeydown,this).attach(this._input,"keydown")
},setValue:function(viewValue,value){if(this.info.keepTitle){this._hidden.value=value
}else{this._input.value=viewValue;
this._hidden.value=value
}},setHiddenValue:function(value){this._hidden.value=value
},setTitle:function(title){this._input.value=title;
this._hidden.value=""
},getPos:function(){var agent=$Agent().navigator();
var inputElement=$Element(this._input);
var pos=inputElement.offset();
var leftGap=Math.abs(parseInt($Element(document.body).css("borderLeftWidth")));
var topGap=parseInt(inputElement.css("borderTopWidth"));
var left=Math.ceil((agent.firefox?pos.left+(leftGap*2):pos.left));
var top=(agent.ie?pos.top-topGap:pos.top);
return{x:parseInt(left),y:parseInt(top)+parseInt(this._input.offsetHeight)}
},getWidth:function(){return this._input.offsetWidth
},getBorderWidth:function(){var ele=$Element(this._input);
var width=0;
if(SelectBox.DOCTYPE=="transitional"){if(!$Agent().navigator().ie){width=parseInt(ele.css("borderLeftWidth")||0)+parseInt(ele.css("borderRightWidth")||0)
}}else{if(SelectBox.DOCTYPE=="loose"||SelectBox.DOCTYPE=="xhtml"){width-=parseInt(ele.css("marginLeft")||0)+parseInt(ele.css("marginRight")||0);
width-=parseInt(ele.css("paddingLeft")||0)+parseInt(ele.css("paddingRight")||0)
}}return width
},focus:function(){this._input.focus()
},enable:function(){this._input.disabled=false;
this._hidden.disabled=false;
if(this._span.style.display=="none"){this._span.style.display="inline"
}},disable:function(isHide){this._input.disabled=true;
this._hidden.disabled=true;
if(isHide){this._span.style.display="none"
}},_onclick:function(e){if(this.info.enable==false){if(this.info.disableMsg!=""){alert(this.info.disableMsg)
}return 
}this.select.box.display();
SelectBox.fireEvent(this.select.Onclick,e,this.select)
},_onfocus:function(e){this._span.className=this._span.className+" "+this.info.focusClass;
SelectBox.fireEvent(this.select.Onfocus,e,this.select)
},_blurStyle:function(cName){return cName.replace(new RegExp(this.info.focusClass),"")
},_onblur:function(e){this._span.className=this._blurStyle(this._span.className);
if(!this.select.control.isFireOnchange()){this.select.control.firedOnchange();
this.select.Onchange(e,this.select)
}SelectBox.fireEvent(this.select.Onblur,e,this.select)
},_onkeydown:function(e){if(this.info.enable==false){return 
}this.select.control.keydown(e);
SelectBox.fireEvent(this.select.Onkeydown,e,this.select)
}});
SelectBox.Control=$Class({$init:function(select){this.select=select;
this.handler=SelectBox.Factory.newHandler(this);
this.index={now:-1,mouse:-1,old:-1,pre:-1};
this._isBlur=true;
this._initIndex()
},_initIndex:function(){if(this.select.info.selected<0){if(!this.select.info.title){this.initAllIndex(0)
}}else{this.initAllIndex(this.select.info.selected)
}},initAllIndex:function(index){this.setIndex(index,SelectBox.Control.NOW);
this.setIndex(index,SelectBox.Control.MOUSE);
this.setIndex(index,SelectBox.Control.OLD);
this.setIndex(index,SelectBox.Control.PRE)
},getIndex:function(){return this.index
},setIndex:function(index,what){this.index[what]=index
},keydown:function(e){var isFireKey=false;
var index=(this.index.now==this.index.mouse?this.index.now:this.index.mouse);
var k=e.key();
if(k.alt&&k.down){this.select.box.display()
}else{if(k.up||k.down||k.left||k.right||(k.keyCode>=33&&k.keyCode<=36)){var keyStr=(k.up?SelectBox.Control.UP:k.down?SelectBox.Control.DOWN:k.left?SelectBox.Control.LEFT:k.right?SelectBox.Control.RIGHT:false);
var next=-1;
if(keyStr){this.select.box.pressedArrow();
next=this.handler.nextIndex(keyStr,index)
}else{next=(k.keyCode==33||k.keyCode==36?0:this.handler.getMaxIndex())
}this.select.box.focus(next);
e.stop()
}else{if(k.enter){if(this.index.mouse!=-1){this.changeIndex(parseInt(this.index.mouse))
}this.select.box.hide();
isFireKey=true;
this.select.input.focus();
e.stop()
}else{if(k.keyCode==9){this.select.box.hide();
isFireKey=true
}else{if(k.keyCode==27){this.select.box.hide()
}else{if(k.keyCode>=65&&k.keyCode<=90){this._compareFirstChar(k.keyCode,e)
}else{if(k.keyCode>=48&&k.keyCode<=57){this._compareFirstChar((k.shift?this._matchingTable[new String(k.keyCode)]:k.keyCode),e)
}else{if(k.keyCode>=96&&k.keyCode<=105){this._compareFirstChar(k.keyCode-48,e)
}}}}}}}}SelectBox.fireEvent(this.select.Onkeydown,e,this.select);
if(!this.isFireOnchange()){if(isFireKey&&k.keyCode!=27){this.firedOnchange();
this.select.Onchange(e,this.select)
}}},_matchingTable:{48:29,49:33,50:64,51:35,52:36,53:37,54:94,55:38,56:42,57:40},_compareFirstChar:function(code,e){var matchResult=this._matchFirstChar(code,this.index.now+1);
if(matchResult!=-1){this.select.box.focus(matchResult);
e.stop()
}},_matchFirstChar:function(code,start){var matchIndex=this._runMatching(code,start,this.select.info.list.length);
if(start>0&&matchIndex==-1){matchIndex=this._runMatching(code,0,start)
}return matchIndex
},_runMatching:function(code,start,end){var matchIndex=-1;
var options=this.select.info.list;
for(var i=start;
i<end;
i++){var value=new String(options[i][0]);
if(value.charAt(0).toUpperCase().charCodeAt(0)==code){matchIndex=i;
break
}}return matchIndex
},changeIndex:function(index){this.changeValue(index);
this.index.pre=this.index.now;
this.index.now=index;
this.index.mouse=index
},changeValue:function(index){if(index!=-1){this.select.input.setValue(this.select.info.list[index][0],this.select.info.list[index][1])
}},firedOnchange:function(){this.index.old=this.index.now
},isFireOnchange:function(){if(this._isBlur==true){return this.index.old==this.index.now
}else{this._isBlur=true;
return true
}},setIsBlur:function(flag){this._isBlur=flag
}});
SelectBox.Control.UP="UP";
SelectBox.Control.DOWN="DOWN";
SelectBox.Control.LEFT="LEFT";
SelectBox.Control.RIGHT="RIGHT";
SelectBox.Control.NOW="now";
SelectBox.Control.MOUSE="mouse";
SelectBox.Control.OLD="old";
SelectBox.Control.PRE="pre";
SelectBox.Handler=$Class({$init:function(control){this.control=control;
this.list=control.select.info.list
},nextIndex:function(key,index){var row=parseInt(index);
var maxRow=this.getMaxIndex();
var nextIndex=index;
if(key=="UP"){nextIndex=(index>0?row-1:index)
}else{if(key=="DOWN"){if(index==-1){nextIndex=0
}else{if(row!=maxRow){nextIndex=row+1
}else{nextIndex=index
}}}}return nextIndex
},getMaxIndex:function(){return this.list.length-1
}});
SelectBox.Option=$Class({$init:function(select,box,index){this.select=select;
this._box=box;
this._index=index;
this._element=this._initElement()
},_initElement:function(){var li=$("<LI>");
li.setAttribute("index",this._index);
var imgSrc=this.select.info.imgList[this._index][0];
var imgAlt=this.select.info.imgList[this._index][1];
if(imgSrc!=""){var img=$("<IMG>");
img.src=imgSrc;
img.alt=imgAlt;
li.appendChild(img)
}$Fn(this._onmouseover,this).attach(li,"mouseover");
$Fn(this._onclick,this).attach(li,"click");
li.appendChild(document.createTextNode(this.select.info.list[this._index][0]));
return li
},changeStyle:function(){this._box.initLIStyle();
this._element.className=this.select.info.boxOverClass
},focus:function(){this.changeStyle();
this.select.control.changeIndex(this._index)
},getElement:function(){return this._element
},_onmouseover:function(e){this.changeStyle(this._index);
this.select.control.index.mouse=this._index
},_onclick:function(e){var isFireOnchange=false;
var readIndex=this._index;
if(this.select.control.index.now!=this._index){isFireOnchange=true;
this.focus()
}this._box.hide();
this.select.input.focus();
if(isFireOnchange){this.select.control.firedOnchange();
this.select.Onchange(e,this.select)
}},getOffset:function(){return{top:this._element.offsetTop,height:this._element.offsetHeight}
}});
SelectBox.NullBox=$Class({$init:function(select){this.select=select
},display:function(){this.select.box=SelectBox.Factory.newBox(this.select);
this.select.box.show()
},focus:function(index){this.select.control.changeIndex(index)
},changeChildStyle:function(){},pressedArrow:function(){},hide:function(){},nullBox:true});
SelectBox.Box=$Class({$init:function(select){this.select=select;
this.info=select.info;
this._optionList=[];
this._hasScroll=false;
this._isArrow=false;
this._initBox();
this._addEvent()
},_initBox:function(){this._createUL();
this._checkHeight()
},refresh:function(){if($Agent().navigator().ie&&$Agent().navigator().version==6){document.body.removeChild($Element(this.element).parent().$value())
}else{document.body.removeChild(this.element)
}this.element=null;
this._createUL();
this._checkHeight();
this._addEvent()
},_createUL:function(){var ul=$("<UL>");
ul.setAttribute("id",this.info.id+"optionList");
var width=this.info.width-this.select.input.getBorderWidth()+"px";
$Element(ul).css({left:-1000,top:-1000,display:"block",zIndex:"30000"});
document.body.appendChild(this.element=ul);
if($Agent().navigator().ie&&$Agent().navigator().version==6){$Element(ul).wrap($Element("<DIV>").$value())
}ul.className=this.info.boxClass;
ul.ondragstart=function(){return false
};
ul.onselectstart=function(){return false
};
for(var i=0;
i<this.info.list.length;
i++){this._optionList[i]=SelectBox.Factory.newOption(this.select,this,i);
if(this.info.multiColumn){$Element(this._optionList[i].getElement()).css({display:"inline",width:width}).css(($Agent().navigator().ie?"styleFloat":"cssFloat"),"left")
}ul.appendChild(this._optionList[i].getElement())
}if(this.info.multiColumn){var welLI=$Element(this._optionList[0].getElement());
width=((parseInt(width)+parseInt(welLI.css("paddingLeft"))+parseInt(welLI.css("paddingRight")))*this.info.multiColumn)+"px"
}else{if(this.element.offsetWidth>parseInt(width)){width=this.element.offsetWidth+SelectBox.EXTRA_WIDTH.getWidth($Agent().navigator())+"px"
}}$Element(this.element).css("width",width).hide();
SelectBox.BOX_LIST.push([this.select.input.id,ul.id])
},_checkHeight:function(){var element=$Element(this.element);
element.show().css({left:"-1000px",top:"-1000px"});
if(this.element.offsetHeight>this.info.maxHeight){this._hasScroll=true;
this.element.style.height=this.info.maxHeight+"px"
}element.hide()
},_addEvent:function(){$Fn(this.hide,this).attach(window,"resize")
},changeChildStyle:function(index){this._optionList[index].changeStyle()
},initLIStyle:function(){for(var i=0;
i<this._optionList.length;
i++){this._optionList[i].getElement().className=""
}},focus:function(index){this._optionList[index].focus();
if(this._hasScroll){if(this._isArrow){this._moveScroll(index)
}else{this._moveHotKeyScroll(index)
}this._isArrow=false
}},pressedArrow:function(){this._isArrow=true
},_moveScroll:function(index){var box={start:this.element.scrollTop,end:this.info.maxHeight+this.element.scrollTop};
var offset=this._optionList[index].getOffset();
if(offset.top<box.start){this.element.scrollTop-=offset.height
}else{if((offset.top+offset.height)>box.end){this.element.scrollTop+=offset.height
}}},_moveHotKeyScroll:function(index){if(index==-1){return 
}var box={start:this.element.scrollTop,end:this.info.maxHeight+this.element.scrollTop,height:this.info.maxHeight};
var offset=this._optionList[index].getOffset();
var viewPosition=offset.top+offset.height;
if(viewPosition<box.start){this.element.scrollTop=offset.top
}else{if(offset.top>box.end){this.element.scrollTop=viewPosition-box.height
}}},display:function(){this[this.element.style.display=="none"?"show":"hide"]()
},show:function(){if(this.select.control.index.now!=-1){this.changeChildStyle(this.select.control.index.now)
}var pos=this.select.input.getPos();
var nX=0,nY=0;
if(this.info.align=="left"){nX=pos.x+"px";
nY=(pos.y+this.info.boxY)+"px"
}$Element(this.element).css({left:nX,top:nY}).show();
if(this._hasScroll){this._moveHotKeyScroll(this.select.control.index.now)
}},hide:function(){$Element(this.element).hide()
},isShow:function(){return $Element(this.element).visible()
},_onmouseout:function(e){}});
var lcs_isie=(navigator.appName=="Microsoft Internet Explorer");
var lcs_isns=(navigator.appName=="Netscape");
var lcs_isopera=(navigator.appVersion.indexOf("Opera")>=0);
var lcs_ismac=(navigator.userAgent.indexOf("MAC")>=0);
var lcs_add={};
var lcs_bc={};
var lcs_ver="v0.4.11";
var lcs_count=0;
lcs_obj=[];
function lcs_do(etc){if(!lcs_SerName){var lcs_SerName="lcs.naver.jp"
}var rs="";
var index;
try{var lcs_Addr=(window.location.protocol?window.location.protocol:"http:")+"//"+lcs_SerName+"/m?"
}catch(e){return 
}try{rs=lcs_Addr+"u="+encodeURIComponent(document.URL)+"&e="+(document.referrer?encodeURIComponent(document.referrer):"")
}catch(e){}try{if(typeof lcs_add.i=="undefined"){lcs_add.i=""
}for(var index in lcs_add){if(typeof lcs_add[index]!="function"){rs+="&"+index+"="+encodeURIComponent(lcs_add[index])
}}for(var index in etc){if((index.length>=3&&(typeof etc[index]!="function"))||index=="qy"){rs+="&"+index+"="+encodeURIComponent(etc[index])
}}lcs_getBrowserCapa();
for(var index in lcs_bc){if(typeof lcs_bc[index]!="function"){rs+="&"+index+"="+encodeURIComponent(lcs_bc[index])
}}if(lcs_count>0){var timeStr=(new Date).getTime();
rs+="&ts="+timeStr
}rs+="&EOU";
if(document.images){var obj=(new Image());
lcs_obj.push(obj);
obj.src=rs
}else{document.write('<img src="'+rs+'" width="1" height="1" border="0" />')
}lcs_count++
}catch(e){return 
}}function lcs_do_gdid(gdid,etc){try{if(gdid){lcs_add.i=gdid;
if(etc){lcs_do(etc)
}else{lcs_do()
}}}catch(e){}}function lcs_getBrowserCapa(){lcs_getOS();
lcs_getlanguage();
lcs_getScreen();
lcs_getWindowSize();
lcs_getColorDepth();
lcs_getJavaEnabled();
lcs_getJavascriptVer();
lcs_getCookieEnabled();
lcs_getSwfVer();
lcs_getSLVersion();
lcs_getConnectType();
lcs_getPlugIn()
}function lcs_getOS(){var lcs_os="";
try{(navigator.platform?lcs_os=navigator.platform:"")
}catch(e){}lcs_bc.os=lcs_os
}function lcs_getlanguage(){var lcs_ln="";
try{(navigator.userLanguage?lcs_ln=navigator.userLanguage:(navigator.language)?lcs_ln=navigator.language:"")
}catch(e){}lcs_bc.ln=lcs_ln
}function lcs_getScreen(){var lcs_sr="";
try{if(window.screen&&screen.width&&screen.height){lcs_sr=screen.width+"x"+screen.height
}else{if(window.java||self.java){var sr=java.awt.Toolkit.getDefaultToolkit().getScreenSize();
lcs_sr=sr.width+"x"+sr.height
}}}catch(e){lcs_sr=""
}lcs_bc.sr=lcs_sr
}function lcs_getWindowSize(){lcs_bc.bw="";
lcs_bc.bh="";
try{lcs_bc.bw=document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.clientWidth;
lcs_bc.bh=document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.clientHeight
}catch(e){}}function lcs_getColorDepth(){lcs_bc.c="";
try{if(window.screen){lcs_bc.c=screen.colorDepth?screen.colorDepth:screen.pixelDepth
}else{if(window.java||self.java){var c=java.awt.Toolkit.getDefaultToolkit().getColorModel().getPixelSize();
lcs_bc.c=c
}}}catch(e){lcs_bc.c=""
}}function lcs_getJavaEnabled(){lcs_bc.j="";
try{lcs_bc.j=navigator.javaEnabled()?"Y":"N"
}catch(e){}}function lcs_getCookieEnabled(){lcs_bc.k="";
try{lcs_bc.k=navigator.cookieEnabled?"Y":"N"
}catch(e){}}function lcs_getConnectType(){var lcs_ct="";
try{if(lcs_isie&&!lcs_ismac&&document.body){var obj=document.body.addBehavior("#default#clientCaps");
lcs_ct=document.body.connectionType;
document.body.removeBehavior(obj)
}}catch(e){}lcs_bc.ct=lcs_ct
}function lcs_getJavascriptVer(){var j="1.0";
try{if(String&&String.prototype){j="1.1";
if(j.search){j="1.2";
var dt=new Date,no=0;
if(dt.getUTCDate){j="1.3";
var i,ie=navigator.appVersion.indexOf("MSIE");
if(ie>0){var apv=parseInt(i=navigator.appVersion.substring(ie+5));
if(apv>3){n_apv=parseFloat(i)
}}if(lcs_isie&&lcs_ismac&&apv>=5){j="1.4"
}if(no.toFixed){j="1.5";
var a=new Array;
if(a.every){j="1.6";
i=0;
var obj=new Object;
var test=function(obj){var i=0;
try{i=new Iterator(obj)
}catch(e){}return i
};
i=test(obj);
if(i&&i.next){j="1.7"
}if(a.reduce){j="1.8"
}}}}}}}catch(e){}lcs_bc.jv=j
}function lcs_getSwfVer(){var flashVer="";
var isWin=false;
try{isWin=(navigator.appVersion.toLowerCase().indexOf("win")!=-1)?true:false;
if(navigator.plugins!=null&&navigator.plugins.length>0){if(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"]){var swVer2=navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"";
var flashDescription=navigator.plugins["Shockwave Flash"+swVer2].description;
var descArray=flashDescription.split(" ");
var tempArrayMajor=descArray[2].split(".");
var versionMajor=tempArrayMajor[0];
var versionMinor=tempArrayMajor[1];
flashVer=parseInt(versionMajor,10)+"."+parseInt(versionMinor,10)
}}else{if(navigator.userAgent.toLowerCase().indexOf("webtv/2.6")!=-1){flashVer="4.0"
}else{if(navigator.userAgent.toLowerCase().indexOf("webtv/2.5")!=-1){flashVer="3.0"
}else{if(navigator.userAgent.toLowerCase().indexOf("webtv")!=-1){flashVer="2.0"
}else{if(lcs_isie&&isWin&&!lcs_isopera){var version="";
var axo;
try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
version=axo.GetVariable("$version")
}catch(e){}if(!version){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
version="WIN 6,0,21,0";
axo.AllowScriptAccess="always";
version=axo.GetVariable("$version")
}catch(e){}}if(!version){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
version="WIN 3,0,18,0";
version=axo.GetVariable("$version")
}catch(e){}}if(!version){try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
version="WIN 2,0,0,11"
}catch(e){}}if(version.indexOf(",")>0){version=version.replace(/%20/,"");
version=version.replace(/[a-zA-Z]*[^0-9]/,"");
var verArray=version.split(",");
version=parseInt(verArray[0],10)+"."+parseInt(verArray[1],10)
}flashVer=version
}}}}}}catch(e){}lcs_bc.fv=flashVer
}function lcs_getSLVersion(){var lcs_sl="";
try{if(navigator.plugins&&navigator.plugins.length>0){lcs_sl=navigator.plugins["Silverlight Plug-In"].description||navigator.plugins["WPFe Plug-In"].description;
if(lcs_sl=="1.0.30226.2"){lcs_sl="2.0.30226.2"
}}else{var wrap,obj;
if(typeof ActiveXObject!="undefined"){try{obj=new ActiveXObject("AgControl.AgControl")
}catch(e){}}else{wrap=document.createElement("div");
wrap.innerHTML='<object type="application/x-silverlight" style="position:absolute;" />';
document.body.insertBefore(wrap,document.body.firstChild);
obj=wrap.firstChild
}if(/\bopera\b/i.test(navigator.userAgent)){for(var start=new Date().getTime();
typeof obj.isVersionSupported=="undefined"&&(new Date().getTime()-start<1000);
){}}if(typeof obj.isVersionSupported!="undefined"){for(var major=0;
major<9;
major++){for(var minor=0;
minor<=9;
minor++){var v=major+"."+minor;
if(obj.isVersionSupported(v)){lcs_sl=v
}else{break
}}}}if(obj){obj=null
}if(wrap){document.body.removeChild(wrap)
}}if(lcs_sl.indexOf(".")>0){var verArray=lcs_sl.split(".");
lcs_sl=verArray[0]+"."+verArray[1]
}}catch(e){}lcs_bc.sl=lcs_sl
}function lcs_getPlugIn(){var plArr={};
var lcs_p="";
if(navigator.plugins&&navigator.plugins.length>0){try{var piArr=navigator.plugins;
for(var i=0;
i<piArr.length;
i++){plArr[piArr[i].name]=""
}}catch(e){}}else{try{if(lcs_bc.fv!=""){plArr["Shockwave Flash"]=""
}if(lcs_bc.sl!=""){plArr.Silverlight=""
}}catch(e){}try{if(new ActiveXObject("SWCtl.SWCtl")){plArr["Shockwave Director"]=""
}}catch(e){}try{if(new ActiveXObject("rmocx.RealPlayer G2 Control")||new ActiveXObject("RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)")||new ActiveXObject("RealVideo.RealVideo(tm) ActiveX Control (32-bit)")){plArr.RealPlayer=""
}}catch(e){}try{var index=navigator.userAgent.indexOf("MSIE");
if(index!=-1){var ie_ver=parseFloat(navigator.userAgent.substring(index+4+1));
if(ie_ver<7){if(new ActiveXObject("QuickTime.QuickTime")){plArr.QuickTime=""
}if(new ActiveXObject("MediaPlayer.MediaPlayer.1")){plArr["Windows Media"]=""
}else{var obj_item=document.getElementsByTagName("object");
for(var i=0;
i<obj_item.length;
i++){if(obj_item[i].classid){var clsid=obj_item[i].classid.toUpperCase();
if(clsid=="CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6"||clsid=="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95"){if(new ActiveXObject("MediaPlayer.MediaPlayer.1")){plArr["Windows Media"]=""
}}}}}}}}catch(e){}}for(var index in plArr){if(typeof plArr[index]!="function"){lcs_p+=index+";"
}}lcs_bc.p=lcs_p.length?lcs_p.substr(0,lcs_p.length-1):lcs_p
}(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({_getOptionSet:function(arg){var option={widthSize:115,jpSize:12,engUpperSize:8,engLowSize:5,others:6,regTag:false,onchange:false};
if(typeof arg=="undefined"){arg=new Object
}for(var i in arg){option[i]=arg[i]
}return option
},$init:function(oOption){var options=this.opt=this._getOptionSet(arguments[0]);
if(!options.element||options.element.length==0){return 
}if(options.element.length){var _this=this;
$A(options.element).forEach(function(v,i){_this.setCut(v,i)
})
}else{this.setCut(options.element)
}},setCut:function(element,idx){var el=$Element(element);
var html=el.html();
var txt=el.text().replace(/\n/g,"").replace(/^\s+|\s+$/g,"");
var cutStr=nj.cutStr(txt,this.opt.widthSize,this.opt.jpSize,this.opt.engUpperSize,this.opt.engLowSize,this.opt.others);
if(cutStr.str==txt){return 
}if(this.opt.onchange){this.opt.onchange(html,idx)
}var retxt=cutStr.str;
var regTag=this.opt.regTag;
if(regTag){var reg=new RegExp("<"+regTag+">|</"+regTag+">","ig");
var reArr=html.replace(reg,"{0}").split("{0}");
if(reArr.length>1){var reInt=[];
$A(reArr).forEach(function(v,i){reInt.push((i==0)?v.length:reInt[i-1]+v.length)
});
reInt=$A(reInt).unique().$value();
var re="";
$A(reInt).forEach(function(v,i){var reVal=retxt.substring((i==0)?0:reInt[i-1],reInt[i]);
re+=((i+1)%2==0)?"<"+regTag+">"+reVal+"</"+regTag+">":reVal
});
retxt=re
}}if(retxt.slice(-3)=="..."){retxt=retxt
}else{if(retxt.slice(-2)==".."){retxt=retxt+"."
}else{if(retxt.slice(-1)=="."){retxt=retxt+".."
}else{retxt=retxt+"..."
}}}el.html(retxt)
}})
})("nj.SetCutStr");
(function(ns){var Config=function(){return{id:{freeTalk:"freeTalkList",freeTalkEditor:"freeTalk_editor"},style:{EVENT_REPLAY:"_replay",EVENT_UPDATE:"_update",EVENT_REMOVE:"_remove",EVENT_REPORT:"_report"},node:{VIEW_TEXT:"> DIV.listContents > DIV.dc_1 > DIV.dc_2 > DIV.dc_3 > P",VIEW_THUMB:"> DIV.thumb",VIEW_CONTENT:"> DIV.listContents",EDITOR:"> LI",EDITOR_THUMB:"> DIV.thumb > A",EDITOR_INPUT_AREA:"DIV.reInputArea DIV.inputArea",EDITOR_TEXT:"DIV.reInputArea TEXTAREA",EDITOR_ICON:"DIV.reInputArea P.selectIcon BUTTON",EDITOR_WRITE:["DIV.reInputArea INPUT.submitButton","DIV.reInputArea BUTTON.btnWrite"].join(", "),EDITOR_CANCEL:["DIV.reInputArea INPUT.cancelButton","DIV.reInputArea BUTTON.btnCancel"].join(", "),COMMENT_OPTION:"DIV.option",COMMENT_OPTION_USER:"SPAN.userId > A"},template:{HEADER_COMMENT:['<div class="thumb"><a href="#myUrl#/#userNickName#"><img src="#userProfileImage#" alt="" width="51" height="51" onerror="errorImage(this,\'user51\');"/></a></div>','<div class="listContents"><div class="dc_1"><div class="dc_2"><div class="dc_3">'].join(""),NORMAL_PRE_COMMENT:['<p><span class="#iconClass#"></span>#comment#</p>','<div class="option">','<span class="userId"><a href="#myUrl#/#userNickName#">#userNickName#</a>さん</span> ',"<span>#time#</span> "].join(""),COMMENT_OPTION_REPLAY:'<span><a href="#" class="_replay">返信</a></span> ',COMMENT_OPTION_UPDATE:'<span><a href="#" class="_update">修正</a></span> ',COMMENT_OPTION_REMOVE:'<span><a href="#" class="_remove">削除</a></span> ',NORMAL_POST_COMMENT:"</div>",DELETED_COMMENT:'<p class="notPublic">#comment#</p>',FOOTER_COMMENT:['<span class="vertex"></span>',"</div></div></div></div>"].join("")},consts:{URL:"/comment.ajax",DEPTH:4,TIME:"1分前",MAX_LENGTH:2000,defaultIconClass:"commentIcon01",defaultIconText:"いい情報をありがとうございます！"},mode:{UPDATE:"update",REPLAY:"replay",VIEW:"view",SAVE:"save",REPORT:"report",INPUT_AREA_FOCUS:"selectIconFocus"},msg:{F:{EMPTY:"書き込みが入力されていません。",OVER_INPUT:"書き込みは、全角2000文字以内で入力してください。",ADMIN_DELETE:"このコメントは運営スタッフにより非表示となっています。"},OTHER:{EMPTY:"コメントが入力されていません。",OVER_INPUT:"コメントは、全角2000文字以内で入力してください。",ADMIN_DELETE:"このコメントは運営スタッフにより非表示となっています。"},PROTECT_DUAL_ACTION:"書き込みが完了していないため、次の操作にうつることはできません。\n今の書き込みを取りやめるには、キャンセルをクリックしてください。",ERR_HAS_CHILD_REMOVE:"返信がついた書き込みは削除できません。",ERR_HAS_CHILD_UPDATE:"返信がついた書き込みは修正できません。",ERR:"一時的にご利用できません",CONFIRM_REMOVE:"本当に削除しますか？\n一度削除すると元に戻すことはできません。",ERR_ALREADY_REMOVED:"もう削除されたコメントです。"},returnCode:{OK:"0",ALREADY_REMOVED:"1",HAS_CHILD:"2"},isDeleted:{OK:"0",DELETED:"1"}}
};
var EditorManager=$Class({$init:function(oConfig){this._initVariable(oConfig);
this._getElementRef();
this._initEvent();
this._commentIconBox=nj.widget.CommentIconBox.init()
},_initVariable:function(oConfig){this._config=oConfig;
this._bIng=false
},_initCallback:function(fn){this._fnWrite=fn.write||function(){};
this._fnCancel=fn.cancel||function(){}
},_getElementRef:function(){this._elEditorMother=$(this._config.id.freeTalkEditor);
this._elEditor=$$.getSingle(this._config.node.EDITOR,this._elEditorMother);
this._elUserLink=$$.getSingle(this._config.node.EDITOR_THUMB,this._elEditor);
this._elUserThumb=this._elUserLink;
this._elTextArea=$$.getSingle(this._config.node.EDITOR_TEXT,this._elEditor);
this._elIcon=$$.getSingle(this._config.node.EDITOR_ICON,this._elEditor);
this._elWrite=$$.getSingle(this._config.node.EDITOR_WRITE,this._elEditor);
this._elCancel=$$.getSingle(this._config.node.EDITOR_CANCEL,this._elEditor);
this._elInputArea=$$.getSingle(this._config.node.EDITOR_INPUT_AREA,this._elEditor)
},_initEvent:function(){$Fn(this._onWrite,this).attach(this._elWrite,"click");
$Fn(this._onCancel,this).attach(this._elCancel,"click");
if(this._elIcon){$Fn(this._onClickIcon,this).attach(this._elIcon,"click");
this._initHoverIconEvent(this._elIcon)
}},_initHoverIconEvent:function(el){$Element(this._elInputArea).removeClass(this._config.mode.INPUT_AREA_FOCUS);
$Fn(function(ev){$Element(this._elInputArea).addClass(this._config.mode.INPUT_AREA_FOCUS)
},this).attach(el,"mouseover");
$Fn(function(ev){$Element(this._elInputArea).removeClass(this._config.mode.INPUT_AREA_FOCUS)
},this).attach(el,"mouseout")
},_onClickIcon:function(wEvent){var self=this;
this._commentIconBox.toggle(wEvent.element,function(oRet){$Element(self._elIcon).className(oRet.className);
return true
})
},_onWrite:function(wEvent){this._delegateWrite()
},_onCancel:function(wEvent){this._delegateCancel()
},_delegateWrite:function(){if(this._bIng==true){return 
}this._bIng=true;
if(!fnMatome.validateBlank(this._elTextArea,{msg:this._config.msg[fnPrivate.getMessageType(this._config.TYPE_CODE)].EMPTY})){this._bIng=false;
return 
}if(!fnMatome.validateLength(this._elTextArea,{msg:this._config.msg[fnPrivate.getMessageType(this._config.TYPE_CODE)].OVER_INPUT,min:0,max:this._config.consts.MAX_LENGTH})){this._bIng=false;
return 
}var bIsUpdate=(this._oData.mode==this._config.mode.UPDATE?true:false);
var oParam={m:bIsUpdate?"ajaxUpdate":"ajaxInsert","comment.content":fnMatome.trim(this._elTextArea.value),"comment.iconClass":""};
if(this._elIcon){oParam["comment.iconClass"]=$Element(this._elIcon).className().split(" ")[0]
}if(bIsUpdate){oParam["comment.commentId"]=this._oData.element.id
}else{oParam["comment.encryptId"]=this._config.TARGET_ID;
oParam["comment.typeCode"]=this._config.TYPE_CODE;
oParam["comment.parentId"]=this._oData.element.id
}fnMatome.sendServer(this._config.consts.URL,oParam,$Fn(this._responseWrite,this).bind())
},_responseWrite:function(oRes){this._restoreEditor();
this._bIng=false;
this._fnWrite(this._oData.element,fnMatome.be(oRes.data)?oRes.data:oRes)
},_delegateCancel:function(){this._restoreEditor();
this._fnCancel(this._oData.element)
},update:function(oData,fnCallback){oData.mode=this._config.mode.UPDATE;
this._initOpen(oData,fnCallback);
this._attachUpdateEditor();
if(this._elIcon){$Element(this._elIcon).className(oData.iconClass)
}this._elTextArea.select()
},replay:function(oData,fnCallback){oData.mode=this._config.mode.REPLAY;
this._initOpen(oData,fnCallback);
this._attachReplayEditor();
if(this._elIcon){$Element(this._elIcon).className(this._config.consts.defaultIconClass)
}this._elTextArea.focus()
},_initOpen:function(oData,fnCallback){this._oData=oData;
this._initCallback(fnCallback||{});
this._checkThumb();
this._elTextArea.value=oData.comment
},_attachUpdateEditor:function(){this._oData.element.parentNode.insertBefore(this._elEditor,this._oData.element)
},_attachReplayEditor:function(){var elChild=$$.getSingle("> UL",this._oData.element);
if(elChild==null){elChild=$("<UL>");
this._oData.element.appendChild(elChild)
}$Element(this._elEditor).prependTo(elChild)
},_checkThumb:function(){var self=this;
this._elUserLink.href=this._config.MY_URL+"/"+this._config.USER_NICK;
var sTagName="IMG";
if(this._elUserThumb.tagName.toUpperCase()==sTagName){var oImg=$('<img width="51" height="51" src="'+this._config.USER_THUMB+'" onerror="errorImage(this,\'user51\');"/>');
this._elUserThumb.src=oImg.src;
this._elUserThumb.onerror=function(){errorImage(self._elUserThumb,"user51")
}
}else{this._elUserThumb.innerHTML='<img width="51" height="51" src="'+this._config.USER_THUMB+'" onerror="errorImage(this,\'user51\');"/>';
this._elUserThumb=$$.getSingle("IMG",this._elUserThumb)
}},_restoreEditor:function(){this._commentIconBox.hide();
this._elEditorMother.appendChild(this._elEditor)
}});
var aConvertData=[["&amp;","&"],["&lt;","<"],["&gt;",">"]];
var fnPrivate={setConfig:function(oSource,oDest){function f(sName,oSource,oTarget){if(typeof oSource[sName]=="object"){for(var sName2 in oSource[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,oSource[sName],oTarget[sName])
}}else{oTarget[sName]=oSource[sName]
}}for(var p in oSource){f(p,oSource,oDest)
}},htmlToText:function(sHtml){sHtml=sHtml.replace(/<br\/?>/ig,"\n");
sHtml=sHtml.replace(/<span[^>]+>(.*)<\/span>/ig,"");
for(var i=aConvertData.length-1;
i>=0;
i--){sHtml=sHtml.replace(new RegExp(aConvertData[i][0],"g"),aConvertData[i][1])
}return sHtml
},textToHtml:function(sText){for(var i=0,len=aConvertData.length;
i<len;
i++){sText=sText.replace(new RegExp(aConvertData[i][1],"g"),aConvertData[i][0])
}sText=sText.replace(/\n/g,"<br/>");
return sText
},findLI:function(element){var parent=element.parentNode;
do{if(parent.tagName.toUpperCase()=="LI"||parent.tagName.toUpperCase()=="BODY"){break
}}while(parent=parent.parentNode);
return parent
},getMessageType:function(sCurrentType){return(sCurrentType=="F"?sCurrentType:"OTHER")
}};
var pkg=$.verifyPackageName(ns);
pkg.container[pkg.name]=$Class({$init:function(oConfig,fnCallback){this._initVariable(oConfig||{});
this._initCallback(fnCallback||{});
this._getElementRef();
this._initEvent()
},_initVariable:function(oConfig){this._config=new Config();
fnPrivate.setConfig(oConfig,this._config);
if(this._config.USER_THUMB==""){this._config.USER_THUMB="/img/Gone"
}this._sMode=this._config.mode.VIEW
},_initCallback:function(fn){this._fnCreate=fn.create||function(){};
this._fnReplay=fn.replay||function(){};
this._fnUpdate=fn.update||function(){};
this._fnRemove=fn.remove||function(){};
this._fnReport=fn.report||function(){};
this._fnIsLogin=fn.isLogin||function(){}
},_getElementRef:function(){this._welFreeTalkList=$Element(this._config.id.freeTalk);
this._oEditorManager=new EditorManager(this._config)
},_initEvent:function(){this._welFreeTalkList.delegate("click").bind("."+this._config.style.EVENT_REPLAY,$Fn(this._onReplay,this).bind());
this._welFreeTalkList.delegate("click").bind("."+this._config.style.EVENT_UPDATE,$Fn(this._onUpdate,this).bind());
this._welFreeTalkList.delegate("click").bind("."+this._config.style.EVENT_REMOVE,$Fn(this._onRemove,this).bind())
},newComment:function(oData){var self=this;
fnMatome.sendServer(this._config.consts.URL,{m:"ajaxInsert","comment.typeCode":this._config.TYPE_CODE,"comment.encryptId":this._config.TARGET_ID,"comment.parentId":"","comment.content":oData.comment,"comment.iconClass":oData.iconClass},function(oRes){self._responseNewComment.call(self,oRes)
})
},responseNewComment:function(oRes){return this._responseNewComment(oRes)
},_responseNewComment:function(oRes){var items;
var oResult=fnMatome.be(oRes.data)?oRes.data:oRes;
if(oRes.pick){items=["REMOVE"];
oResult.content[0].iconClass="commentIcon00"
}else{items=(oResult.content[0].isReplyable=="Y")?["REPLAY","UPDATE","REMOVE"]:["UPDATE","REMOVE"]
}var welNewComment=$Element("<LI>");
if(oResult.result){welNewComment.attr("id",oResult.content[0].id).html(nj.replaceStr(this._makeTemplate(items,false),{userNickName:oResult.content[0].userNick,iconClass:String(oResult.content[0].iconClass),userProfileImage:oResult.content[0].profile,comment:addHyperLink(oResult.content[0].comment),time:this._config.consts.TIME,myUrl:this._config.MY_URL})).prependTo(this._welFreeTalkList);
this._fnCreate({element:$(oResult.content[0].id),totalUser:oResult.totalUser,total:oResult.total});
this._welFreeTalkList.show()
}else{alert(oResult.message||this._config.msg.ERR)
}},_beforeAction:function(sModeOfInvoke,element){var self=this;
if(!this._fnIsLogin(function(){self.logined();
self.replay(element)
},this)){return false
}if(this._sMode!=this._config.mode.VIEW){alert(this._config.msg.PROTECT_DUAL_ACTION);
return false
}return true
},_onReplay:function(we){we.stop($Event.CANCEL_DEFAULT);
this._delegateReplay(fnPrivate.findLI(we.element))
},_onUpdate:function(we){we.stop($Event.CANCEL_DEFAULT);
this._delegateUpdate(fnPrivate.findLI(we.element))
},_onRemove:function(we){we.stop($Event.CANCEL_DEFAULT);
this._delegateRemove(fnPrivate.findLI(we.element))
},_onReport:function(we){we.stop($Event.CANCEL_DEFAULT);
this._delegateReport(fnPrivate.findLI(we.element))
},_delegateReplay:function(element){if(!this._beforeAction(this._config.mode.REPLAY,element)){return 
}this._closeAccess(this._config.mode.REPLAY);
this._oEditorManager.replay({element:element,comment:""},{write:$Fn(this._responseReplay,this).bind(),cancel:$Fn(this._responseReplayCancel,this).bind()})
},_responseReplay:function(element,oResult){if(oResult.result){var elParent=$$.getSingle("> UL",element);
if(elParent==null){elParent=element.appendChild($("<UL>"))
}var aTemplateOption=(this._isLastDepth(element)?["UPDATE","REMOVE"]:["REPLAY","UPDATE","REMOVE"]);
var welNewComment=$Element("<LI>");
var sTemplate=nj.replaceStr(this._makeTemplate(aTemplateOption,false),{userNickName:oResult.content[0].userNick,userProfileImage:oResult.content[0].profile,comment:addHyperLink(oResult.content[0].comment),iconClass:oResult.content[0].iconClass,time:this._config.consts.TIME,myUrl:this._config.MY_URL});
welNewComment.attr("id",oResult.content[0].id).html(sTemplate).prependTo($Element(elParent));
this._removeDepthParentRemoveNode(welNewComment.$value());
this._fnReplay({element:element,totalUser:oResult.totalUser,total:oResult.total})
}else{alert(oResult.message||this._config.msg.ERR)
}this._openAccess()
},_responseReplayCancel:function(element){if($$("> UL > LI",element).length==0){element.removeChild($$.getSingle("> UL",element))
}this._openAccess()
},_removeDepthParentUpdateNode:function(element){this._removeOption($$.getSingle(" > DIV.listContents A."+this._config.style.EVENT_UPDATE,fnPrivate.findLI(element)))
},_removeDepthParentRemoveNode:function(element){this._removeOption($$.getSingle(" > DIV.listContents A."+this._config.style.EVENT_REMOVE,fnPrivate.findLI(element)))
},_removeOption:function(element){if(element){element.parentNode.parentNode.removeChild(element.parentNode)
}},_delegateUpdate:function(element){if(!this._beforeAction(this._config.mode.UPDATE)){return 
}if(!this._canUpdate()){return 
}this._closeAccess(this._config.mode.UPDATE);
this._hideComment(element);
var elIconClass=$$.getSingle(this._config.node.VIEW_TEXT+" span",element);
var sIconClassName="";
if(elIconClass){sIconClassName=elIconClass.className.split(" ")[0]
}this._oEditorManager.update({element:element,comment:fnPrivate.htmlToText($Element($$.getSingle(this._config.node.VIEW_TEXT,element)).html().replace(/<\/?a[^>]*>/gi,"")),iconClass:sIconClassName},{write:$Fn(this._responseUpdate,this).bind(),cancel:$Fn(this._responseUpdateCancel,this).bind()})
},_responseUpdate:function(element,oResult){this._showComment(element);
if(oResult.result){if(oResult.resultCode==this._config.returnCode.OK){$$.getSingle(this._config.node.VIEW_TEXT,element).innerHTML=('<span class="'+oResult.content[0].iconClass+'"></span>'+addHyperLink(oResult.content[0].comment));
this._fnUpdate({element:element,totalUser:oResult.totalUser,total:oResult.total})
}else{if(oResult.resultCode==this._config.returnCode.HAS_CHILD){alert(this._config.msg.ERR_HAS_CHILD_UPDATE)
}}}else{alert(oResult.message||this._config.msg.ERR)
}this._openAccess()
},_responseUpdateCancel:function(element){this._showComment(element);
this._openAccess()
},_delegateRemove:function(element){if(!this._beforeAction(this._config.mode.REMOVE)){return 
}if(!this._canRemove(element)){return 
}this._closeAccess();
if(!confirm(this._config.msg.CONFIRM_REMOVE)){this._openAccess();
return 
}var self=this;
fnMatome.sendServer(this._config.consts.URL,{m:"ajaxDelete","comment.commentId":element.id,"comment.encryptId":this._config.TARGET_ID,"comment.typeCode":this._config.TYPE_CODE},function(oRes,oData){self._responseRemove((fnMatome.be(oRes.data)?oRes.data:oRes),element)
})
},_responseRemove:function(oResult,elComment){var sId=elComment.id;
if(oResult.result){if(oResult.resultCode==this._config.returnCode.OK||oResult.resultCode==this._config.returnCode.ALREADY_REMOVED){var elParent=elComment.parentNode;
elParent.removeChild(elComment);
if(oResult.resultCode==this._config.returnCode.OK){this._fnRemove({id:sId,totalUser:oResult.totalUser,total:oResult.total})
}else{alert(this._config.msg.ERR_ALREADY_REMOVED)
}if(elParent.id!=this._config.id.freeTalk){this._restoreParentOption(fnPrivate.findLI(elParent))
}}else{if(oResult.resultCode==this._config.returnCode.HAS_CHILD){alert(this._config.msg.ERR_HAS_CHILD_REMOVE)
}}}else{alert(oResult.message||this._config.msg.ERR)
}this._openAccess()
},_restoreParentOption:function(element){if(!this._hasChild(element)){if($$.getSingle("> DIV.listContents SPAN.userId > A",element).innerHTML==this._config.USER_NICK){var elOption=$$.getSingle("DIV.option",element);
elOption.innerHTML=elOption.innerHTML+this._config.template.COMMENT_OPTION_REMOVE
}}},_canUpdate:function(){if(this._sMode!=this._config.mode.VIEW){return false
}return true
},_canRemove:function(element){if(this._hasChild(element)){alert(this._config.msg.ERR_HAS_CHILD_REMOVE);
return false
}return true
},_hasChild:function(element){return($$("UL LI",element).length>0)?true:false
},_closeAccess:function(sMode){this._sMode=sMode
},_openAccess:function(){this._sMode=this._config.mode.VIEW
},_hideComment:function(element){$Element($$.getSingle(this._config.node.VIEW_THUMB,element)).hide();
$Element($$.getSingle(this._config.node.VIEW_CONTENT,element)).hide()
},_showComment:function(element){$Element($$.getSingle(this._config.node.VIEW_THUMB,element)).show();
$Element($$.getSingle(this._config.node.VIEW_CONTENT,element)).show()
},_makeTemplate:function(aOption,bIsDeleted){var template=[this._config.template.HEADER_COMMENT];
if(bIsDeleted){template.push(this._config.template.DELETED_COMMENT)
}else{template.push(this._config.template.NORMAL_PRE_COMMENT);
$A(aOption).forEach(function(sOption){template.push(this._config.template["COMMENT_OPTION_"+sOption])
},this);
template.push(this._config.template.NORMAL_POST_COMMENT)
}template.push(this._config.template.FOOTER_COMMENT);
return template.join("")
},_isLastDepth:function(element){var elMother=this._welFreeTalkList.$value();
var elParent=element.parentNode;
var nDepth=0;
do{if(elParent.tagName.toUpperCase()=="UL"){nDepth++
}if(elParent.id==elMother.id){break
}}while(elParent=elParent.parentNode);
return(nDepth+1==this._config.consts.DEPTH?true:false)
},replay:function(ele){this._delegateReplay(ele)
},update:function(ele){this._delegateUpdate(ele)
},report:function(ele){this._delegateReport(ele)
},remove:function(ele){this._delegateRemove(ele)
},setConfig:function(oConfig){fnPrivate.setConfig(oConfig,this._config)
},logined:function(){$A($$(this._config.node.COMMENT_OPTION,this._welFreeTalkList.$value())).forEach(function(elOption){var elUser=$$.getSingle(this._config.node.COMMENT_OPTION_USER,elOption);
if(elUser.href.indexOf(this._config.USER_NUM)!=-1){elOption.innerHTML=elOption.innerHTML+this._config.template.COMMENT_OPTION_UPDATE+this._config.template.COMMENT_OPTION_REMOVE
}},this)
},movePage:function(nPage,oPaging){this._oPaging=oPaging;
this._nCurrentPage=nPage;
fnMatome.sendServer(this._config.consts.URL,{"comment.encryptId":this._config.TARGET_ID,"comment.typeCode":this._config.TYPE_CODE,page:""+nPage},$Fn(this._responseMovePage,this).bind())
},_responseMovePage:function(oData){var self=this;
var aNewPage=[];
var nPreDepth=0;
function makeOptionType(sIsEdited,nDepth,sHasChild,postId,isReplyable){var ret=[];
if(isReplyable=="Y"){ret.push("REPLAY")
}if(sIsEdited=="Y"){if(postId=="0"){ret.push("UPDATE")
}if(sHasChild=="N"){ret.push("REMOVE")
}}return ret
}function makeComment(oCmt){var str=nj.replaceStr(self._makeTemplate(makeOptionType(oCmt.isEdited,oCmt.depth,oCmt.hasChild,oCmt.postId,oCmt.isReplyable),oCmt.isDeleted==self._config.isDeleted.DELETED),{userNickName:oCmt.userNick||"",userProfileImage:oCmt.profile,comment:oCmt.isDeleted==self._config.isDeleted.DELETED?self._config.msg[fnPrivate.getMessageType(self._config.TYPE_CODE)].ADMIN_DELETE:oCmt.comment,time:oCmt.updated||"",myUrl:self._config.MY_URL,iconClass:oCmt.iconClass==""?"commentIcon00":oCmt.iconClass});
return str
}var nLast=oData.data.content.length-1;
$A(oData.data.content).forEach(function(oComment,index){if(index==0){if(oComment.depth!=0){aNewPage.push("<li>");
for(var i=oComment.depth;
i>0;
i--){aNewPage.push("<ul>");
if(i-1==0){aNewPage.push('<li id="'+oComment.id+'">');
aNewPage.push(makeComment(oComment))
}else{aNewPage.push("<li>")
}}}else{aNewPage.push('<li id="'+oComment.id+'">');
aNewPage.push(makeComment(oComment))
}}else{if(oComment.depth==nPreDepth){aNewPage.push("</li>");
aNewPage.push('<li id="'+oComment.id+'">');
aNewPage.push(makeComment(oComment))
}else{if(oComment.depth>nPreDepth){aNewPage.push("<ul>");
aNewPage.push('<li id="'+oComment.id+'">');
aNewPage.push(makeComment(oComment))
}else{if(oComment.depth<nPreDepth){for(var i=nPreDepth-oComment.depth;
i>0;
i--){aNewPage.push("</li></ul>")
}aNewPage.push('<li id="'+oComment.id+'">');
aNewPage.push(makeComment(oComment))
}}}}if(index==nLast){if(oComment.depth!=0){for(var i=oComment.depth;
i>0;
i--){aNewPage.push("</li></ul>")
}}aNewPage.push("</li>")
}nPreDepth=oComment.depth
},this);
this._welFreeTalkList.html("");
var elUL=$Element("<UL>").html(aNewPage.join("")).$value();
do{this._welFreeTalkList.$value().appendChild(elUL.childNodes[0])
}while(elUL.childNodes.length>0);
this._oPaging.setItemCount(oData.data.total);
this._oPaging.movePageTo(this._nCurrentPage)
}})
})("nj.mission.FreeTalk");
(function(ns){var Config=function(){return{id:{inputArea:"freeTalkNewInputArea",writeBtn:"freeTalkNewInputBtn"},msg:{F:{DEFAULT:"書き込みが入力されていません。",EMPTY:"書き込みが入力されていません。",OVER_INPUT:"書き込みは、全角2000文字以内で入力してください。"},OTHER:{DEFAULT:"コメントが入力されていません。",EMPTY:"コメントが入力されていません。",OVER_INPUT:"コメントは、全角2000文字以内で入力してください。"}},style:{FOCUS:"ready",INPUT_AREA_FOCUS:"selectIconFocus"},node:{BTN_ICON:"p.selectIcon button",INPUT_AREA:".inputArea"},consts:{MAX_LENGTH:2000,F_TYPE:"F",defaultIconClass:"commentIcon01",defaultIconText:"いい情報をありがとうございます！"}}
};
var fnPrivate={setConfig:function(oSource,oDest){function f(sName,oSource,oTarget){if(typeof oSource[sName]=="object"){for(var sName2 in oSource[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,oSource[sName],oTarget[sName])
}}else{oTarget[sName]=oSource[sName]
}}for(var p in oSource){f(p,oSource,oDest)
}},getMessageType:function(sCurrentType){return(sCurrentType=="F"?sCurrentType:"OTHER")
}};
var pkg=$.verifyPackageName(ns);
pkg.container[pkg.name]=$Class({$init:function(oConfig,fnCallback){this._initVariable(oConfig);
this._initCallback(fnCallback||{});
this._getElementRef();
this._initEvent();
this._commentIconBox=nj.widget.CommentIconBox.init()
},_initVariable:function(oConfig){this._config=new Config();
fnPrivate.setConfig(oConfig,this._config)
},_initCallback:function(fn){this._fnIsLogin=fn.isLogin||function(){}
},_getElementRef:function(){this._elTextArea=$(this._config.id.inputArea);
this._elWriteBtn=$(this._config.id.writeBtn);
if(this._elTextArea){var welWrap=$Element(this._elTextArea).parent().parent().parent();
this._elIconBtn=welWrap.query(this._config.node.BTN_ICON);
if(this._elIconBtn){this._elTextArea.value=this._config.consts.defaultIconText
}this._elInputArea=welWrap.query(this._config.node.INPUT_AREA)
}},_initEvent:function(){$Fn(function(wEvent){var welTextarea=$Element(wEvent.element);
if(welTextarea.parent().hasClass(this._config.style.FOCUS)){welTextarea.$value().value="";
welTextarea.parent().removeClass(this._config.style.FOCUS)
}welTextarea.$value().select()
},this).attach(this._elTextArea,"focus");
if(this._elIconBtn){$Fn(this._onClickIcon,this).attach(this._elIconBtn,"click");
this._initHoverIconEvent(this._elIconBtn)
}$Fn(this._onWrite,this).attach(this._elWriteBtn,"click")
},_initHoverIconEvent:function(el){$Element(this._elInputArea).removeClass(this._config.style.INPUT_AREA_FOCUS);
$Fn(function(ev){$Element(this._elInputArea).addClass(this._config.style.INPUT_AREA_FOCUS)
},this).attach(el,"mouseover");
$Fn(function(ev){$Element(this._elInputArea).removeClass(this._config.style.INPUT_AREA_FOCUS)
},this).attach(el,"mouseout")
},_onClickIcon:function(ev){var self=this;
this._commentIconBox.toggle(ev.element,function(oRet){if($Element(self._elTextArea).parent().hasClass(self._config.style.FOCUS)){self._elTextArea.value=oRet.value
}$Element(self._elIconBtn).className(oRet.className);
return true
})
},_onWrite:function(){var self=this;
if(this._fnIsLogin(function(){self._oFreeTalk.logined();
self._addNewComment()
})){this._addNewComment()
}},_addNewComment:function(){if(!this.validate(this._elTextArea)){return 
}var oCommentData={comment:null,iconClass:null};
oCommentData.comment=fnMatome.trim(this._elTextArea.value);
if(this._elIconBtn){$Element(this._elTextArea).parent().addClass(this._config.style.FOCUS);
oCommentData.iconClass=$Element(this._elIconBtn).className().split(" ")[0];
this._elIconBtn.className=this._config.consts.defaultIconClass;
this._elTextArea.value=this._config.consts.defaultIconText
}this.newComment(oCommentData)
},validate:function(elTextarea){if(!fnMatome.validateBlank(elTextarea,{msg:this._config.msg[fnPrivate.getMessageType(this._oFreeTalk._config.TYPE_CODE)].EMPTY})){return false
}if(!fnMatome.validateDefaultText(elTextarea,{msg:this._config.msg[fnPrivate.getMessageType(this._oFreeTalk._config.TYPE_CODE)].DEFAULT,text:this._config.msg[fnPrivate.getMessageType(this._oFreeTalk._config.TYPE_CODE)].DEFAULT})){return false
}if(!fnMatome.validateLength(elTextarea,{msg:this._config.msg[fnPrivate.getMessageType(this._oFreeTalk._config.TYPE_CODE)].OVER_INPUT,min:0,max:this._config.consts.MAX_LENGTH})){return false
}return true
},newComment:function(oValues){return this._oFreeTalk.newComment(oValues)
},setTalkList:function(oFreeTalk){this._oFreeTalk=oFreeTalk
}})
})("nj.mission.CommentInput");
(function(namespace){var config={node:{COUNT:"P.pickCount",BUTTON:"P.pickButton",COMMANT1:".commet > EM",COMMANT2:".commant > EM",ALREADY:"P.text_1",SELF:"P.text_2"},style:{PICKED:"picked",SELECT:"select"},msg:{ERROR:"一時的にご利用できません"},URL:"/sympathy.ajax"};
this._event;
this._element;
this._sMissionId;
this._sResourceId;
this._fn;
function _minanoHeadSympathy(oResult,element,sMissionId){var welAlready=$Element($$.getSingle(config.node.ALREADY,element));
var welSelf=$Element($$.getSingle(config.node.SELF,element));
var welCount=$Element($$.getSingle(config.node.COUNT,element));
var welButton=$Element($$.getSingle(config.node.BUTTON,element));
var welButtonA=$Element(welButton.query("A"));
if(oResult.result){sympathy.CommentLayer.init().open({target:element,top:5,left:0,type:"evaluation",commentConfirm:"/odai/"+sMissionId+"#userComments",encryptId:oResult.encryptId,typeCode:oResult.typeCode,pickUrl:oResult.postUrl,data:oResult.data});
welCount.html(oResult.count+"<span>ピック</span>");
welButtonA.opacity(0)
}else{var welMsg;
switch(oResult.message){case"selfed":welMsg=welSelf;
break;
case"duplicated":welMsg=welAlready;
break;
case"unknown":alert("データ不整合によるエラーです。");
return ;
break
}welMsg.show();
setTimeout(function(){welMsg.hide()
},1000)
}$Element(element).addClass(config.style.PICKED);
welButton.empty()
}function findLI(ele){var elParent=ele.parentNode;
do{if(elParent.tagName.toUpperCase()=="LI"){break
}if(elParent.tagName.toUpperCase()=="BODY"){elParent={addClass:function(){},removeClass:function(){}};
break
}}while(elParent=elParent.parentNode);
return elParent
}function _resourceSympathy(oResult,element,sMissionId,sResourceId){var elBase=element;
var welCount=$Element($$.getSingle(config.node.COUNT,elBase));
var welAlready=$Element($$.getSingle(config.node.ALREADY,elBase));
var welSelf=$Element($$.getSingle(config.node.SELF,elBase));
var welLI=findLI(elBase);
var welGrandParent=$Element(welLI);
var welCount=$Element($$.getSingle(config.node.COUNT,elBase));
var welButton=$Element($$.getSingle(config.node.BUTTON,elBase));
var welButtonA=$Element(welButton.query("A"));
var welCommant=null;
if(welLI.tagName){welCommant=$Element($$.getSingle(config.node.COMMANT1,welLI))||$Element($$.getSingle(config.node.COMMANT2,welLI))
}welGrandParent.addClass(config.style.SELECT);
if(oResult.result){var fnCallback;
sympathy.CommentLayer.init().open({target:element,top:-5,left:0,type:"good",commentConfirm:"/odai/"+sMissionId+"/"+sResourceId+"#userComments",encryptId:oResult.encryptId,typeCode:oResult.typeCode,pickUrl:oResult.postUrl,data:oResult.data});
fnCallback=function(){welGrandParent.removeClass(config.style.SELECT)
};
welCount.html(oResult.count+"<span>ピック</span>");
welButtonA.opacity(0);
if(welCommant!=null){welCommant.html("("+oResult.data.total+")")
}setTimeout(function(){fnCallback()
},1000)
}else{var welMsg;
switch(oResult.message){case"selfed":welMsg=welSelf;
break;
case"duplicated":welMsg=welAlready;
break;
case"unknown":alert("データ不整合によるエラーです。");
return ;
break
}welMsg.show();
setTimeout(function(){welMsg.hide();
welGrandParent.removeClass(config.style.SELECT)
},1000)
}$Element(elBase).addClass(config.style.PICKED);
welButton.empty()
}function _sympathy(){if($Element(this._element).hasClass(config.style.PICKED)){return 
}var THIS=this;
var oParam={missionId:this._sMissionId};
if(typeof this._sResourceId=="undefined"){oParam.m="missionSympathy"
}else{oParam.m="resourceSympathy";
oParam.resourceId=this._sResourceId
}new $Ajax(config.URL,{timeout:5,onload:function(oRes){if(typeof THIS._sResourceId=="undefined"){_minanoHeadSympathy(oRes.json(),THIS._element,THIS._sMissionId)
}else{_resourceSympathy(oRes.json(),THIS._element,THIS._sMissionId,THIS._sResourceId)
}},ontimeout:function(oRes){alert(config.msg.ERROR)
}}).request(oParam)
}var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(event,element,sMissionId,sResourceId,fn){this._event=event;
this._element=element;
this._sMissionId=sMissionId;
this._sResourceId=sResourceId;
this._fn=fn||function(){};
if(g_login){_sympathy()
}else{openLayerLogin($Fn(_sympathy,this).bind())
}$Event(event).stopDefault()
}
})("sympathy");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({$init:function(oOptions){oOptions=oOptions||{};
this._options={disabled:false,commentApi:"/comment.ajax",params:{},staticUrl:"http://static.naver.jp",selector:{wrapForm:".inputComments",wrapConfirm:".submitComments",inputDescription:"._inputDescription",inputArea:".inputArea",responseGood:"._response_good",responseEvaluation:"._response_evaluation",btnIcon:".selectIcon button",btnClose:"a.layerClose",textarea:"textarea",btnSubmit:"input.submitButton",commentConfirm:"._commentConfirm",speechBalloon:".speechBalloon",pickLink:".pickLink",pickUrl:".pickLink > A",commant1:".commet > EM",commant2:".commant > EM"},defaultClass:"commentIcon01",defaultText:"いい情報をありがとうございます！",inputAreaHoverClass:"selectIconFocus",readyClass:"ready",zIndex:100,onSubmitBefore:function(){},onSubmitAfter:function(){},descriptionEvaluation:"お題を作ったユーザーにコメントで感想を伝えませんか？",descriptionGood:"{name}を追加したユーザーにコメントで感想を伝えませんか？",matomeTypeName:"お題",textAreaExpander:{nMinHeight:43,nInterval:100,nMaxHeight:185,nLineHeight:15,sOverMessage:"",nMaxByte:2000*2}};
for(var i in oOptions){this._options[i]=oOptions[i]||this._options[i]
}if($Agent().navigator().ie){this._options.textAreaExpander.nMinHeight-=2
}var welRoot=this._setHtml();
this._elements={root:welRoot,wrapForm:$Element(welRoot.query(this._options.selector.wrapForm)),wrapConfirm:$Element(welRoot.query(this._options.selector.wrapConfirm)),inputDescription:$Element(welRoot.query(this._options.selector.inputDescription)),inputArea:$Element(welRoot.query(this._options.selector.inputArea)),responseGood:$Element(welRoot.query(this._options.selector.responseGood)),responseEvaluation:$Element(welRoot.query(this._options.selector.responseEvaluation)),btnIcon:$Element(welRoot.query(this._options.selector.btnIcon)),btnClose:$Element(welRoot.query(this._options.selector.btnClose)),textarea:$Element(welRoot.query(this._options.selector.textarea)),btnSubmit:$Element(welRoot.query(this._options.selector.btnSubmit)),commentConfirm:$Element(welRoot.query(this._options.selector.commentConfirm)),speechBalloon:$Element(welRoot.query(this._options.selector.speechBalloon)),pickLink:$Element(welRoot.query(this._options.selector.pickLink)),pickUrl:$Element(welRoot.query(this._options.selector.pickUrl))};
this._elements.response=this._elements.responseGood;
this._commentIconBox=nj.widget.CommentIconBox.init();
this._bindEvents();
this._textAreaExpander=this._initTextAreaExpander();
this._currentEncryptId=null;
this._currentTypeCode=null;
this._currentPickUrl=null;
this._currentOption=null
},open:function(oOptions){if(this._options.disabled){var welOK=$Element($$.getSingle("P.text_3",oOptions.target));
welOK.show();
setTimeout(function(){welOK.hide()
},1000);
return 
}oOptions=oOptions||{};
_oOptions={target:null,top:0,left:0,type:null,commentConfirm:"#userComments",encryptId:null,typeCode:null,pickUrl:null,data:null};
for(var i in _oOptions){if(typeof oOptions[i]=="undefined"){oOptions[i]=_oOptions[i]
}}this._currentEncryptId=oOptions.encryptId;
this._currentTypeCode=oOptions.typeCode;
this._currentPickUrl=oOptions.pickUrl;
this._currentData=oOptions.data;
this._currentOption=oOptions;
this._elements.responseGood.hide();
this._elements.responseEvaluation.hide();
if(oOptions.type=="good"){this._elements.inputDescription.html(this._options.descriptionGood.replace(/{name}/ig,this._options.matomeTypeName));
this._elements.response=this._elements.responseGood;
this._elements.pickLink.show();
this._elements.pickUrl.$value().href=this._currentPickUrl
}else{if(oOptions.type=="evaluation"){this._elements.inputDescription.html(this._options.descriptionEvaluation);
this._elements.response=this._elements.responseEvaluation;
this._elements.pickLink.hide()
}}this._elements.response.show();
this._elements.wrapForm.show();
this._elements.wrapConfirm.hide();
this._commentIconBox.hide();
this._elements.btnIcon.className(this._options.defaultClass);
this._elements.textarea.$value().value=this._options.defaultText;
this._elements.textarea.parent().addClass(this._options.readyClass);
this._textAreaExpander.setMinHeight();
this._elements.commentConfirm.attr("href",oOptions.commentConfirm);
this._elements.root.show().css({display:"block",zIndex:this._options.zIndex});
this.adjustPosition();
this._addPickComment()
},_addPickComment:function(){var oRes={data:this._currentData,pick:true};
var oParams=this._options.params;
if(this._currentTypeCode){oParams["comment.typeCode"]=this._currentTypeCode
}this._options.onSubmitAfter.call(this,oRes,oParams)
},adjustPosition:function(){if(!this._elements.root.visible()){return 
}var oOptions=this._currentOption;
var welTarget=$Element(oOptions.target);
var oTargetOffset=welTarget.offset();
var nTargetWidth=welTarget.width();
var nTargetHeight=welTarget.height();
var nLayerWidth=this._elements.root.width();
var nLeft=Math.round(oTargetOffset.left)+Math.round(nTargetWidth/2)-Math.round(nLayerWidth/2)+Math.round(oOptions.left);
if(nLeft<0){this._elements.speechBalloon.css("left",(nLayerWidth/2+nLeft)+"px");
nLeft=0
}else{this._elements.speechBalloon.css("left","50%")
}this._elements.root.offset(Math.round(oTargetOffset.top)+Math.round(nTargetHeight)+Math.round(oOptions.top),nLeft)
},showConfirm:function(){this._elements.response.hide();
this._elements.wrapForm.hide();
this._elements.pickLink.hide();
this._elements.wrapConfirm.show();
this._commentIconBox.hide()
},close:function(){this._elements.root.hide();
this._commentIconBox.hide()
},_bindEvents:function(){$Fn(this._onFocusTextarea,this).attach(this._elements.textarea.$value(),"focus");
$Fn(this._onClickIcon,this).attach(this._elements.btnIcon.$value(),"click");
this._bindHoverIcon(this._elements.btnIcon.$value());
$Fn(this._onClickClose,this).attach(this._elements.btnClose.$value(),"click");
$Fn(this._onClickSubmit,this).attach(this._elements.btnSubmit.$value(),"click");
$Fn(this.close,this).attach(this._elements.commentConfirm.$value(),"click");
$Fn(this.adjustPosition,this).attach(window,"resize")
},_bindHoverIcon:function(el){$Element(el).removeClass(this._options.inputAreaHoverClass);
$Fn(function(ev){this._elements.inputArea.addClass(this._options.inputAreaHoverClass)
},this).attach(el,"mouseover");
$Fn(function(ev){this._elements.inputArea.removeClass(this._options.inputAreaHoverClass)
},this).attach(el,"mouseout")
},_initTextAreaExpander:function(){var oTextAreaExpander=new sympathy.TextAreaExpander(this._elements.textarea.$value(),this._options.textAreaExpander);
oTextAreaExpander.startCheck();
return oTextAreaExpander
},_onFocusTextarea:function(ev){var welTextarea=$Element(ev.element);
if(welTextarea.parent().hasClass(this._options.readyClass)){welTextarea.$value().value="";
welTextarea.parent().removeClass(this._options.readyClass)
}},_onClickIcon:function(ev){var self=this;
this._commentIconBox.toggle(this._elements.btnIcon.$value(),function(oRet){if(self._elements.textarea.parent().hasClass(self._options.readyClass)){self._elements.textarea.$value().value=oRet.value
}self._elements.btnIcon.className(oRet.className);
return true
});
ev.stop()
},_onClickClose:function(ev){this.close();
ev.stop()
},_onClickSubmit:function(ev){var self=this;
var oParams=this._options.params;
if(this._currentEncryptId){oParams["comment.encryptId"]=this._currentEncryptId
}if(this._currentTypeCode){oParams["comment.typeCode"]=this._currentTypeCode
}oParams["comment.content"]=this._elements.textarea.$value().value;
oParams["comment.iconClass"]=this._elements.btnIcon.className().split(" ")[0];
oParams["comment.parentId"]="";
oParams.m="ajaxInsert";
if(!this._options.onSubmitBefore.call(this)){return 
}fnMatome.sendServer(this._options.commentApi,oParams,function(oRes){if(self._options.onSubmitAfter.call(self,oRes,oParams)){self.showConfirm();
var element=self._currentOption.target;
var elEm=$Element($$.getSingle(self._options.selector.commant1,element.parentNode))||$Element($$.getSingle(self._options.selector.commant2,element.parentNode));
if(elEm!=null){elEm.html("("+oRes.data.total+")")
}}});
ev.stop()
},_setHtml:function(){var welDiv=$Element("<div>").addClass("popupLayer02").addClass("submitEvaluation").hide();
var sHtml='<div class="layerBodyWrapper"><div class="layerContentsBody"><p class="response _response_good"><strong>ピック</strong>しました。</p><p class="response _response_evaluation"><strong>ピック</strong>しました。</p><dl class="inputComments"><dt class="_inputDescription"><dt><dd class="inputCommentsForm"><div class="inputArea"><p class="selectIcon"><button class="commentIcon01"><span>アイコンを選択</span></button></p><label class="ready"><textarea rows="3" cols="20"></textarea></label></div><input type="image" alt="書き込む" class="submitButton" src="{url}/mission/img/submitEvaluation_btn_submit.gif"/></dd></dl><p class="pickLink"><a href="#">ピックした投稿を確認</a></p> <p class="response submitComments" style="display:none;"><strong>コメントを書き込みました。</strong><br/><a class="_commentConfirm" href="#userComments">コメントを確認する</a></p><a class="layerClose" href="#"><img width="13" height="13" alt="閉じる" src="{url}/mission/img/submitEvaluation_btn_close.gif"/></a></div><span class="speechBalloon">?</span></div>';
sHtml=sHtml.replace(/\{url\}/ig,this._options.staticUrl);
welDiv.html(sHtml).appendTo(document.body);
return welDiv
}})
})("sympathy.CommentLayer");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(){return sympathy.CommentLayer.__instance
}
})("sympathy.CommentLayer.getInstance");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(oOptions){sympathy.CommentLayer.__instance=(sympathy.CommentLayer.getInstance()||new sympathy.CommentLayer(oOptions));
return sympathy.CommentLayer.__instance
}
})("sympathy.CommentLayer.init");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({checkMaxByte:function(){return false
}}).extend(nhn.TextAreaExpander)
})("sympathy.TextAreaExpander");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(obj){var f=function(){};
f.prototype=obj;
return new f
}
})("nj.tool.clone");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(obj1,obj2){var oRet=nj.tool.clone(obj1);
var oObj2=nj.tool.clone(obj2);
for(var i in oObj2){oRet[i]=oObj2[i]
}return oRet
}
})("nj.tool.mergeObject");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(sSelector,nWidth,oOptions){var aElements=$$(sSelector);
oOptions=oOptions||{};
oOptions.widthSize=nWidth;
var _oOptions={jpSize:12,engUpperSize:8,engLowSize:5,others:6,regTag:false,onchange:function(){}};
for(var i in _oOptions){if(typeof oOptions[i]=="undefined"){oOptions[i]=_oOptions[i]
}if(i=="onchange"){var fOnChange=oOptions.onchange;
oOptions.onchange=function(v,nIndex){fOnChange(v,aElements[nIndex])
}
}}oOptions.element=null;
var oCutStr=new nj.SetCutStr(oOptions);
function restoreCutStrOptions(){oCutStr.opt.widthSize=nWidth;
oCutStr.opt.jpSize=oOptions.jpSize;
oCutStr.opt.engUpperSize=oOptions.engUpperSize;
oCutStr.opt.engLowSize=oOptions.engLowSize;
oCutStr.opt.others=oOptions.others;
oCutStr.opt.regTag=oOptions.regTag
}function setCutStrOptions(nNewWidth,sType){oCutStr.opt.widthSize=nNewWidth;
var oDefinedOptions=nj.tool.cutstrOptions[sType];
if(!oDefinedOptions){return 
}oCutStr.opt.jpSize=oDefinedOptions.jpSize;
oCutStr.opt.engUpperSize=oDefinedOptions.engUpperSize;
oCutStr.opt.engLowSize=oDefinedOptions.engLowSize;
oCutStr.opt.others=oDefinedOptions.others;
oCutStr.opt.regTag=oDefinedOptions.regTag
}$A(aElements).forEach(function(v,i){var sElmCutStr=$Element(v).attr("_cutstr");
v.innerHTML=v.innerHTML.replace(/&nbsp;/g," ");
if(sElmCutStr&&sElmCutStr.length>0){var aElmCutStr=sElmCutStr.split(",");
var nElmCutStrWidth=aElmCutStr[0].valueOf();
var sElmCutStrType=aElmCutStr[1];
setCutStrOptions(nElmCutStrWidth,sElmCutStrType);
oCutStr.setCut(v,i);
restoreCutStrOptions()
}else{oCutStr.setCut(v,i)
}})
}
})("nj.tool.setCutStr");
nj.tool.cutstrOptions={xsmall:{jpSize:8,engUpperSize:5,engLowSize:4,others:3,regTag:"b"},small:{jpSize:10,engUpperSize:7,engLowSize:4,others:5,regTag:"b"},medium:{jpSize:12,engUpperSize:8,engLowSize:5,others:6,regTag:"b"},large:{jpSize:14,engUpperSize:9,engLowSize:6,others:7,regTag:"b"},xlarge:{jpSize:16,engUpperSize:10,engLowSize:7,others:8,regTag:"b"},xxlarge:{jpSize:18,engUpperSize:12,engLowSize:8,others:9,regTag:"b"}};
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(nMinVersion){var oFlash=$Agent().flash();
if(oFlash.installed&&oFlash.version>=nMinVersion){return true
}else{return false
}}
})("nj.tool.hasFlash");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(nMinVersion,oFoggyOptions,oCookieOptions){if($Agent().navigator().mobilesafari){return 
}var oCookie=$Cookie();
var nMinVersion=nMinVersion||9;
oFoggyOptions=oFoggyOptions||{};
oFoggyOptions.zIndex=oFoggyOptions.zIndex||32000;
oCookieOptions=oCookieOptions||{key:"FlashPluginAlert",domain:"naver.jp",days:7};
if(oCookie.get(oCookieOptions.key)=="false"){return null
}if(!nj.tool.hasFlash(nMinVersion)){var elDialog=$$.getSingle(".noticeNfp");
if(elDialog===null){return false
}var oDialog=$Element(elDialog);
oDialog.css("zIndex",oFoggyOptions.zIndex+1);
$Fn(function(){oFoggy.hide();
oDialog.hide();
oCookie.set(oCookieOptions.key,false,oCookieOptions.days,oCookieOptions.domain)
}).attach($$.getSingle(".ntcNfpLayerClose",oDialog.$value()),"click");
var oFoggy=new nhn.Foggy(oFoggyOptions);
oFoggy.getFog().className="fog";
oFoggy.attach({show:function(){oDialog.show()
}});
oFoggy.show();
return false
}else{return true
}}
})("nj.tool.checkFlashAndDialog");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(sTitle,nRetry,nDelay){var oNavigator=$Agent().navigator();
if(!oNavigator.ie){return false
}sTitle=sTitle||document.title;
nRetry=nRetry||5;
nDelay=nDelay||200;
nCount=0;
var fCallback=function(){if(document.title!=sTitle){document.title=sTitle
}if(nRetry==-1){setTimeout(fCallback,nDelay)
}else{nCount++;
if(nCount<nRetry){setTimeout(fCallback,nDelay)
}}};
setTimeout(fCallback,nDelay);
return true
}
})("nj.tool.resetDocumentTitle");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(sUrl,sApiUrl,oParams){$Ajax(sApiUrl,{method:"get",onload:function(oRes){oData=oRes.json();
if(oData.result!==true){alert(oData.message);
return 
}location.href=sUrl
}}).request(oParams)
}
})("nj.tool.movePageOrAlertAjax");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(el,callback){$A(el.childNodes).forEach(function(el){if(el.nodeType==3){callback(el)
}else{if(el.nodeType==1){nj.tool.forEachTextNode(el,callback)
}}})
}
})("nj.tool.forEachTextNode");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(el,nMax,fnGetLen,fnCutStr){var nLen=0;
var nValueLen=0;
fnGetLen=fnGetLen||function(sValue){return sValue.length
};
fnCutStr=fnCutStr||function(sValue,nOver){return sValue.slice(0,-(nOver))
};
var callback=function(el){var sReplacedValue=nj.tool.replaceEntityToStr(el.nodeValue);
nValueLen=fnGetLen(sReplacedValue);
if(nLen>=nMax){el.nodeValue=""
}else{if(nLen+nValueLen>=nMax){var nOver=nLen+nValueLen-nMax;
if(nOver!=0){el.nodeValue=fnCutStr(sReplacedValue,nOver)
}}}nLen+=nValueLen
};
nj.tool.forEachTextNode(el,callback)
}
})("nj.tool.cutStrTextNode");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(el,nMax,oOptions){oOptions=oOptions||{others:6,jpSize:12,engUpperSize:8,engLowerSize:5};
var sHankaku="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝｧｨｩｪｫｬｭｮｯﾞﾟｰ､｡｢｣";
var nIndex=0;
var nTotalLen=0;
var fnGetLen=function(sValue){var nLen=0;
if(nTotalLen<nMax){nIndex=0
}for(var i=0;
i<sValue.length;
i++){var nSize=0;
var code=sValue.charAt(i).charCodeAt(0);
if(sHankaku.indexOf(sValue.charAt(i))>=0){nSize=oOptions.others
}else{if(code>=256){nSize=oOptions.jpSize
}else{if(code>=65&&code<=90){nSize=oOptions.engUpperSize
}else{if(code>=97&&code<=122){nSize=oOptions.engLowerSize
}else{nSize=oOptions.others
}}}}nLen+=nSize;
nTotalLen+=nSize;
if(nTotalLen<nMax){nIndex+=1
}}return nLen
};
var fnCutStr=function(sValue){var sRetValue=sValue.slice(0,nIndex);
if(sRetValue.slice(-3)=="..."){sRetValue=sRetValue
}else{if(sRetValue.slice(-2)==".."){sRetValue=sRetValue+"."
}else{if(sRetValue.slice(-1)=="."){sRetValue=sRetValue+".."
}else{sRetValue=sRetValue+"..."
}}}return sRetValue
};
nj.tool.cutStrTextNode(el,nMax,fnGetLen,fnCutStr)
}
})("nj.tool.cutStrTextNodeWidth");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(sText){return sText.replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#039;/g,"'")
}
})("nj.tool.replaceEntityToStr");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(sUrl){var sEncoded=sUrl.replace(/[^-_.!~*'%()a-zA-Z0-9;/?:@&=+$,]+/gi,function(sStr,nPos,sSource){return encodeURIComponent(sStr)
});
return sEncoded
}
})("nj.tool.encodeUri");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(sQuery){var oRet={};
var aData=sQuery.split("%2C");
for(var i in aData){var aItem=aData[i].split("%3A");
oRet[aItem[0]]=aItem[1]
}return oRet
}
})("nj.tool.convertEncodedQueryToObject");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(nNum,sPrefix){sPrefix=sPrefix||"_uniq";
nNum=nNum||1000000;
var sId=sPrefix+(new Date()).getTime()+""+Math.round(Math.random()*nNum);
if($(sId)){return nj.tool.getUniqueId(nNum)
}else{return sId
}}
})("nj.tool.getUniqueId");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({$init:function(oOptions){oOptions=oOptions||{};
var _oOptions={name:"",days:7,domain:location.hostname,path:"/"};
for(var i in _oOptions){oOptions[i]=oOptions[i]||_oOptions[i]
}this._options=oOptions;
this.cookie=new $Cookie()
},_toObject:function(sDatas){var oDatas={};
if(!sDatas){return oDatas
}var aDatas=sDatas.split(",");
for(var i in aDatas){var aPart=aDatas[i].split(":");
if(aPart.length==2){oDatas[$S(aPart[0]).trim()]=aPart[1]
}}return oDatas
},_toText:function(oDatas){var aDatas=[];
for(var i in oDatas){aDatas.push($S(i.toString()).trim()+":"+oDatas[i])
}var sDatas=aDatas.join(",");
return sDatas
},set:function(sName,sValue){var oDatas=this.getAll()||{};
oDatas[$S(sName).trim()]=sValue;
var sDatas=this._toText(oDatas);
this.cookie.set(this._options.name,sDatas,this._options.days,this._options.domain,this._options.path)
},get:function(sName){var oDatas=this.getAll();
return oDatas[sName]
},getAll:function(){var sDatas=this.getText();
return this._toObject(sDatas)
},getText:function(){return this.cookie.get(this._options.name)
},remove:function(sName){var oDatas=this.getAll();
if(typeof oDatas[sName]=="undefined"){return 
}delete oDatas[sName];
this.cookie.set(this._options.name,this._toText(oDatas),this._options.days,this._options.domain,this._options.path)
},removeAll:function(){this.cookie.remove(this._options.name,this._options.domain,this._options.path)
}})
})("nj.tool.StructuredCookie");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({$init:function(oOptions){oOptions=oOptions||{};
this._data=oOptions.data||{}
},set:function(sName,sValue){this._data[sName]=sValue
},get:function(sName){return this._data[sName]
},remove:function(sName){delete this._data[sName]
},sync:function(){this._data=this.getAll()
},save:function(){var sData=this._toText(this._data);
this.cookie.set(this._options.name,sData,this._options.days,this._options.domain,this._options.path)
}}).extend(nj.tool.StructuredCookie)
})("nj.tool.PresetStructuredCookie");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(){var elForm=$$.getSingle("form[name=reportForm]");
var oValidate=new nj.tool.validate.setFormValidate(elForm,{"spamReport.spamTargetStr":{name:"対象項目",check:{required:true}},"spamReport.reasonValue":{name:"報告内容",check:{required:true}},"spamReport.reasonDesc":{name:"報告理由詳細",check:{required:true,maxByte:1000*2,maxByteError:"{name}は1000文字以内で入力してください。"},filter:{trim:true}}},function(oErrors){for(var i in this._options){var welInput=$Element($$.getSingle("[name="+i+"]",elForm));
var welError=$Element(welInput.parent().query("strong"));
if(this.isError(i)){welError.show();
welError.html(this.getError(i).message)
}else{welError.hide()
}}});
return oValidate
}
})("nj.mission.initReportForm");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({name:"",icon:{src:"",width:0,height:0},url:{site:""},params:{},windowStyle:{},__defaultWindowStyle:"location=yes,toolbar=yes,scrollbars=yes,resizable=yes",$init:function(){},open:function(sLabel,oParams){var sUrl=this._getQueryUrl(sLabel,oParams);
if(!sUrl){return false
}location.href=sUrl
},openWindow:function(sLabel,oParams,sTitle,sStyle){var sUrl=this._getQueryUrl(sLabel,oParams);
if(!sUrl){return false
}sTitle=sTitle||sLabel;
sStyle=sStyle||this.windowStyle[sLabel]||this.__defaultWindowStyle;
window.open(sUrl,sTitle,sStyle);
return true
},_getQueryUrl:function(sLabel,oParams){var sUrl=this.url[sLabel];
var _oParams=this.params[sLabel];
if(!sUrl){return 
}oParams=nj.tool.mergeObject(_oParams,oParams);
var aQuery=[];
for(var sKey in oParams){var sValue=oParams[sKey];
aQuery.push(sKey+"="+encodeURIComponent(sValue))
}var sQuery=aQuery.join("&");
if(sQuery.length==0){return sUrl
}return sUrl+"?"+sQuery
}})
})("nj.vendor.Base");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({name:"はてなブックマーク",icon:{src:"http://static.naver.jp/mission/img/ico_hatena.gif",width:16,height:14},url:{site:"http://b.hatena.ne.jp/",post:"http://b.hatena.ne.jp/my/add.confirm",popup:"http://b.hatena.ne.jp/add"},params:{post:{url:"",title:""},popup:{url:"",title:"",mode:"confirm",is_bm:1}},windowStyle:{popup:"location=yes,links=no,scrollbars=no,toolbar=no,width=550,height=550"},$init:function(){}}).extend(nj.vendor.Base)
})("nj.vendor.HatenaBookmark");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({name:"Yahoo!ブックマーク",icon:{src:"http://static.naver.jp/mission/img/ico_byahoo.gif",width:15,height:15},url:{site:"http://bookmarks.yahoo.co.jp/",popup:"http://bookmarks.yahoo.co.jp/bookmarklet/showpopup"},params:{popup:{t:"",u:"",opener:"bm",ei:"UTF-8",fr:"ybm_blog"}},windowStyle:{popup:"location=yes,links=no,scrollbars=no,toolbar=no,width=550px,height=480px"},$init:function(){}}).extend(nj.vendor.Base)
})("nj.vendor.YahooBookmark");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({name:"Delicious",icon:{src:"http://static.naver.jp/mission/img/ico_delicio.gif",width:16,height:16},url:{site:"http://delicious.com/",popup:"http://delicious.com/post"},params:{popup:{url:"",title:"",notes:"",v:5,noui:1,jump:"doclose"}},windowStyle:{popup:"location=yes,links=no,scrollbars=no,toolbar=no,width=550,height=550"},$init:function(){}}).extend(nj.vendor.Base)
})("nj.vendor.Delicious");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({name:"livedoor クリップ",icon:{src:"http://static.naver.jp/mission/img/ico_livedoor.gif",width:16,height:16},url:{site:"http://clip.livedoor.com/",post:"http://clip.livedoor.com/redirect"},params:{post:{link:"",title:"",ie:"utf-8"}},$init:function(){}}).extend(nj.vendor.Base)
})("nj.vendor.LivedoorClip");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({name:"Buzzurl",icon:{src:"http://static.naver.jp/mission/img/ico_buzzurl.gif",width:16,height:12},url:{site:"http://buzzurl.jp/",post:"http://buzzurl.jp/config/add/confirm"},params:{post:{url:"",title:"",comment:""}},$init:function(){}}).extend(nj.vendor.Base)
})("nj.vendor.Buzzurl");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({name:"Twitter",icon:{src:"http://static.naver.jp/mission/img/ico_twitter.gif",width:14,height:14},url:{site:"http://twitter.com/",post:"http://twitter.com/home/"},params:{post:{status:""}},$init:function(){}}).extend(nj.vendor.Base)
})("nj.vendor.Twitter");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({$init:function(oOptions){this._vendor={hatenaBookmark:new nj.vendor.HatenaBookmark(),yahooBookmark:new nj.vendor.YahooBookmark(),delicious:new nj.vendor.Delicious(),livedoorClip:new nj.vendor.LivedoorClip(),buzzurl:new nj.vendor.Buzzurl(),twitter:new nj.vendor.Twitter()};
this._options={sendmailUrl:"",sendmailParams:{"mail.missionId":null,"mail.resourceId":null},target:"._bookmarkArea",url:"",title:"",notes:"",iconWidth:16,iconHeight:16,cookie:{name:"nj.widget.BookmarkToolbar",days:7,domain:location.hostname,path:"/"}};
this.setOptions(oOptions);
this.cookie=new $Cookie();
this.setConfig();
this._structure={$selector:this._options.target+" div.bookmartArea",btnOpen:"a",layer:{$selector:"div.bookmarkLayer",btnClose:"a.btnClose",list:"ul"}};
this._appendHtmlBase();
this.setElements();
this._bindEvents()
},setOptions:function(oOptions){oOptions=oOptions||{};
if(oOptions.url){oOptions.url=nj.tool.encodeUri(oOptions.url)
}this.$super.setOptions(oOptions)
},setConfig:function(oConfig){this._config=oConfig||[{name:"twitter",img:this._vendor.twitter.icon,fn:this._vendor.twitter.openWindow,ctx:this._vendor.twitter,args:["post",{status:this._options.title+"　"+this._options.url}],directPost:true,nclkcode:"twitter"},{name:"はてな",img:this._vendor.hatenaBookmark.icon,fn:this._vendor.hatenaBookmark.openWindow,ctx:this._vendor.hatenaBookmark,args:["popup",{url:this._options.url,title:this._options.title}],directPost:true,nclkcode:"hatena"},{name:"Yahoo",img:this._vendor.yahooBookmark.icon,fn:this._vendor.yahooBookmark.openWindow,ctx:this._vendor.yahooBookmark,args:["popup",{u:this._options.url,t:this._options.title}],directPost:true,nclkcode:"yahoo"},{name:"del.icio.us",img:this._vendor.delicious.icon,fn:this._vendor.delicious.openWindow,ctx:this._vendor.delicious,args:["popup",{url:this._options.url,title:this._options.title,notes:this._options.notes}],nclkcode:"delicious"},{name:"livedoor",img:this._vendor.livedoorClip.icon,fn:this._vendor.livedoorClip.openWindow,ctx:this._vendor.livedoorClip,args:["post",{link:this._options.url,title:this._options.title}],nclkcode:"livedoor"},{name:"Buzzurl",img:this._vendor.buzzurl.icon,fn:this._vendor.buzzurl.openWindow,ctx:this._vendor.buzzurl,args:["post",{url:this._options.url,title:this._options.title,comment:this._options.notes}],nclkcode:"buzzurl"}];
this.setFavoriteButton();
var oSendMail=nj.widget.BookmarkToolbar.sendMail;
this._config.push({name:oSendMail.name,img:oSendMail.img,fn:oSendMail.open,ctx:oSendMail,args:[this._options.sendmailUrl,this._options.sendmailParams],directPost:true,nclkcode:"mail"})
},save:function(sName){this.cookie.set(this._options.cookie.name,sName,this._options.cookie.days,this._options.cookie.domain,this._options.cookie.path)
},setFavoriteButton:function(){var sName=this.cookie.get(this._options.cookie.name);
if(!sName){return 
}$A(this._config).forEach(function(oConfig){if(sName==oConfig.name&&!oConfig.directPost){oConfig.directPost=true;
try{oConfig.nclkcode="favorite"
}catch(e){}return 
}});
return 
},setElements:function(){var self=this;
this.$super.setElements();
var aLiSize=[110,100,83];
var welUl=this.elements.layer.list.$element;
var welLastDirectLink=this.elements.btnOpen.$element;
try{welComment=$Element(nclkCreateCommnetNode("NIP","bookmark"));
welLastDirectLink.after(welComment.$value());
welLastDirectLink=welComment
}catch(e){welLastDirectLink=this.elements.btnOpen.$element
}$A(this._config).forEach(function(oConfig,i){var welLink=$Element("<a>").attr("href","#");
var welImg=$Element("<img>").attr(oConfig.img);
welImg.attr({alt:oConfig.name,title:oConfig.name});
var fnCallback=$Fn(function(ev){if(!oConfig.directPost){self.save(oConfig.name)
}oConfig.fn.apply(oConfig.ctx,oConfig.args);
ev.stop($Event.CANCEL_DEFAULT)
});
if(oConfig.directPost){welDirectLink=$Element(welLink.$value().cloneNode(true));
welDirectLink.append(welImg.$value().cloneNode(true));
fnCallback.attach(welDirectLink.$value(),"click");
welLastDirectLink.after(welDirectLink.$value());
welLastDirectLink.after(document.createTextNode(" "));
welLastDirectLink=welDirectLink;
try{welComment=$Element(nclkCreateCommnetNode("NIP",oConfig.nclkcode));
welLastDirectLink.after(welComment.$value());
welLastDirectLink=welComment
}catch(e){}}welLink.html(oConfig.name);
fnCallback.attach(welLink.$value(),"click");
var welLi=$Element("<li>");
welLi.css("width",aLiSize[i%3]+"px");
welUl.append(welLi);
welLi.append(welImg.$value());
welLi.append(document.createTextNode(" "));
welLi.append(welLink.$value());
try{welComment=$Element(nclkCreateCommnetNode("NIP",oConfig.nclkcode,null,"l"));
welLi.append(welComment.$value())
}catch(e){}})
},_bindEvents:function(){$Fn(this.onOpen,this).attach(this.elements.btnOpen.$element.$value(),"click");
$Fn(this.onClose,this).attach(this.elements.layer.btnClose.$element.$value(),"click")
},onOpen:function(ev){this.elements.layer.$element.show();
ev.stop($Event.CANCEL_DEFAULT)
},onClose:function(ev){this.elements.layer.$element.hide();
ev.stop($Event.CANCEL_DEFAULT)
},_appendHtmlBase:function(){var elTarget=$$.getSingle(this._options.target);
if(!elTarget){return false
}elTarget.innerHTML='<div class="bookmartArea"><a href="#">ブックマーク・紹介する</a><div class="bookmarkLayer" style="display:none;"><div class="subBookmarkLayer"><h3>ブックマーク・紹介する</h3><ul></ul><a class="btnClose" href="#"><img width="15" height="15" alt="閉じる" src="http://static.naver.jp/mission/img/btn_close5.gif"/></a><!--NIP=a:close--></div><span class="shadow"></span></div></div>';
return true
}}).extend(nj.Base)
})("nj.widget.BookmarkToolbar");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={name:"メールで紹介",img:{src:"http://static.naver.jp/mission/img/ico_wmail.gif",width:17,height:15},windowStyle:"location=yes,toolbar=yes,scrollbars=yes,resizable=yes",open:function(sUrl,oParams){var aQuery=[];
for(var sKey in oParams){var sValue=oParams[sKey];
aQuery.push(sKey+"="+encodeURIComponent(sValue))
}var sQuery=aQuery.join("&");
window.open(sUrl+"?"+sQuery,this.name,this.windowStyle)
}}
})("nj.widget.BookmarkToolbar.sendMail");
var nclkVersion="0.9.3";
var nclkDetect=navigator.userAgent.toLowerCase();
var nclkIsSafari=(nclkDetect.indexOf("safari")!=-1?true:false);
if(!nclkMaxDepth){var nclkMaxDepth=10
}if(!nclkMaxEvtTarget){var nclkMaxEvtTarget=4
}if(!nclkServer){var nclkServer="cc.naver.jp"
}var nclkModule="cc";
if(!nclk_evt){var nclk_evt=1
}if(!nclk_nsc){var nclk_nsc="decide.me"
}if(!g_pid){var g_pid=""
}if(!g_sid){var g_sid=""
}var nclkImg=[];
var fEnableNclk=false;
function nclkAddEvent(obj,type,fn){if(obj.addEventListener){obj.addEventListener(type,fn,false)
}else{if(obj.attachEvent){obj.attachEvent("on"+type,fn)
}}}function nclk_do(){if(nclk_evt==1||nclk_evt==2){nclkAddEvent(document,"click",nclkGenerateCC)
}fEnableNclk=true
}function nclkGenerateCC(e){var evt=e||window.event;
var evtTarget;
var evtTarget=evt.target||evt.srcElement;
var evtNodeName=evtTarget.nodeName;
var realTarget,blankTarget,firstTarget;
var arrStr,arrPos;
var w,mode,area;
var checkVal;
var nextObj;
var goUpDepth=-1;
mode=0;
if(evt.button==2){return 
}if(evtTarget.nodeType==3){evtTarget=evtTarget.parentNode
}if(evtTarget.parentNode&&evtTarget.parentNode.nodeName=="A"){evtTarget=evtTarget.parentNode
}firstTarget=evtTarget;
while(goUpDepth<=nclkMaxEvtTarget){if(goUpDepth>=nclkMaxEvtTarget){if(nclk_evt==2){checkVal=0;
realTarget=firstTarget;
break
}else{return 
}}else{checkVal=nclkCheckHeader(evtTarget);
if(checkVal==0){if(evtTarget.parentNode){evtTarget=evtTarget.parentNode;
goUpDepth++
}else{checkVal=0;
realTarget=firstTarget;
break
}}else{realTarget=evtTarget;
break
}}}switch(checkVal){case 0:case 1:case 2:case 3:if(nclk_evt==2){mode=nclkCheckMode(realTarget);
clink=nclkMakeRequestStr(realTarget,evt,mode,"ncs.blank","","")
}else{return 
}break;
case 4:mode=nclkCheckMode(realTarget);
area=nclkFindArea(realTarget,1);
if(area==undefined){area=""
}nextObj=nclkSearchNextObj(realTarget);
if(nextObj){arrStr=nclkParseNCStr(checkVal,nextObj.data)
}else{arrStr=false
}if(!arrStr){arrStr=new Array();
arrStr[0]="";
arrStr[1]="";
arrStr[2]="";
arrStr[3]="";
arrStr[5]=false
}else{if(arrStr[4]=="0"){mode=0
}else{if(arrStr[4]=="1"){mode=1
}}}area=(arrStr[5]?area+"*"+arrStr[0]:area+"."+arrStr[0]);
clink=nclkMakeRequestStr(realTarget,evt,mode,area,arrStr[1],arrStr[2],arrStr[3]);
break;
case 5:mode=nclkCheckMode(realTarget);
area=nclkFindArea(realTarget,2);
if(area==undefined){area=""
}nextObj=nclkSearchNextObj(realTarget);
if(nextObj){arrStr=nclkParseNCStr(checkVal,nextObj.data)
}else{arrStr=false
}if(!arrStr){arrStr[0]="";
arrStr[1]="";
arrStr[2]="";
arrStr[3]=""
}else{if(arrStr[4]=="0"){mode=0
}else{if(arrStr[4]=="1"){mode=1
}}}clink=nclkMakeRequestStr(realTarget,evt,mode,area,arrStr[1],arrStr[2],arrStr[3]);
break;
case 6:mode=nclkCheckMode(realTarget);
nextObj=nclkSearchNextObj(realTarget);
if(nextObj){arrStr=nclkParseNCStr(checkVal,nextObj.data)
}else{arrStr=false
}if(!arrStr){arrStr[0]="";
arrStr[1]="";
arrStr[2]="";
arrStr[3]=""
}else{if(arrStr[4]=="0"){mode=0
}else{if(arrStr[4]=="1"){mode=1
}}}clink=nclkMakeRequestStr(realTarget,evt,mode,arrStr[0],arrStr[1],arrStr[2],arrStr[3]);
break;
default:return 
}nclkSendToCC(realTarget,mode,clink)
}function nclkSearchNextObj(realTarget){var nextObj=realTarget.nextSibling;
if(nextObj.nodeType==3){nextObj=nextObj.nextSibling
}return nextObj
}function nclkCheckHeader(obj){var headerType=0;
if(!obj){return 0
}var nextObj=obj.nextSibling;
var arrStr;
var firstChar;
var restStr;
if(nextObj){if(nextObj.nodeType==3){nextObj=nextObj.nextSibling
}if(nextObj!=null&&nextObj.nodeType==8&&nextObj.data.indexOf("=")>0){arrStr=nclkTrim(nextObj.data).split("=");
firstChar=arrStr[0].charAt(0);
restStr=arrStr[0].substring(1);
if(firstChar!="N"){return 0
}if(restStr=="E"){headerType=1
}else{if(restStr=="I"){headerType=2
}else{if(restStr=="EI"||restStr=="IE"){headerType=3
}else{if(restStr=="IP"||restStr=="PI"){headerType=4
}else{if(restStr=="P"){headerType=5
}else{if(arrStr[0].length==1){headerType=6
}else{headerType=0
}}}}}}}else{headerType=0
}}else{headerType=0
}return headerType
}function nclkFindArea(obj,areaRange){var depth=0;
var p=obj;
var slb;
var data;
var arrStr,arrArea;
var area="";
var prevFinish=0;
var returnVal;
var headerKey;
if(!p){return 
}if(areaRange==1){prevFinish=1
}else{if(areaRange==2){prevFinish=0
}}while(p=p.parentNode){slb=p;
while(slb=slb.previousSibling){if(slb.nodeType==8){data=nclkTrim(slb.data);
if(data.indexOf("=")>0){arrStr=data.split("=");
if(arrStr[0].charAt(0)!="N"){continue
}headerKey=arrStr[0].substring(1);
if(headerKey=="I"&&prevFinish==0){arrArea=arrStr[1].split(":");
if(arrArea[0]=="a"){area=arrArea[1]
}prevFinish++;
break
}else{if(headerKey=="E"&&prevFinish==1){if(prevFinish==1){arrArea=arrStr[1].split(":");
if(arrArea[0]=="a"){if(area==""){area=arrArea[1]
}else{area=arrArea[1]+"."+area
}}}prevFinish++;
break
}else{if((headerKey=="EI"||headerKey=="IE")&&prevFinish==0){arrArea=arrStr[1].split(":");
if(arrArea[0]=="a"){area=arrArea[1]
}prevFinish+=2;
break
}}}}}}depth++;
if(prevFinish>=2){returnVal=area;
break
}if(depth>=nclkMaxDepth){returnVal=false;
break
}}return returnVal
}function getServiceType(){var serviceType;
if(window.g_ssc!=undefined&&window.g_query!=undefined){serviceType=1
}else{serviceType=0
}return serviceType
}function nclkDirectRequest(obj,evt,area,code,rank){try{if(!fEnableNclk){return 
}var mode=0;
var _area=area;
if(code&&code.length>0){_area=area+"."+code
}var clink=nclkMakeRequestStr(obj,evt,mode,_area,rank,"","");
if(clink){nclkSendToCC(obj,mode,clink)
}}catch(e){}}function nclkMakeRequestStr(obj,evt,mode,area,rank,gdid,sign){var clink="";
var tempURL="";
var arrPos=nclkGetCoord(obj,evt);
var w,mode;
var serviceType=getServiceType();
w=nclkXWindowSize(window);
if(obj.href&&obj.href.indexOf("http://"+nclkServer)==0){tempURL=obj.href
}else{tempURL="http://"+nclkServer+"/"+nclkModule+"?";
tempURL+="a="+area+"&r="+rank+"&i="+gdid;
tempURL+="&w="+w+"&px="+arrPos[0]+"&py="+arrPos[1];
tempURL+="&sx="+arrPos[2]+"&sy="+arrPos[3]+"&m="+mode;
if(serviceType==0){tempURL+="&nsc="+nclk_nsc
}else{if(serviceType==1){tempURL+="&ssc="+g_ssc+"&q="+encodeURIComponent(g_query)+"&s="+g_sid+"&p="+g_pid;
if(sign){tempURL+="&g="+sign
}}else{return""
}}}if(obj.href&&obj.href.indexOf("http://"+nclkServer)==0){clink=tempURL
}else{if(obj.href&&obj.href.indexOf("http://"+nclkServer)!=0&&obj.nodeName.toLowerCase()!="img"){try{var h=obj.href;
if(obj.outerHTML&&!window.XMLHttpRequest){var l=location;
h=(/\shref=\"([^\"]+)\"/i.test(obj.outerHTML)&&RegExp.$1).replace(/\\/g,"\\\\").replace(/%([A-Z0-9]{2})/ig,"\\$1");
(d=document.createElement("div")).innerHTML=h;
h=d.innerText.replace(/\\([A-Z0-9]{2})/gi,"%$1").replace(/\\\\/g,"\\");
if(!/^https?:\/\//i.test(h)){h=l.protocol+"//"+l.host+(/^\//.test(h)?"":"/")+h
}h=h.replace(/\/\.\//g,"/")
}clink=tempURL+"&u="+encodeURIComponent(h)
}catch(e){clink=tempURL+"&u="+encodeURIComponent(obj.href)
}}else{clink=tempURL+"&u=about%3Ablank"
}}return clink
}function nclkCheckMode(obj){if(obj.href){if((obj.target&&obj.target!="_self"&&obj.target!="_top"&&obj.target!="_parent")||(obj.href.toLowerCase().indexOf("javascript:")!=-1)||(obj.getAttribute("href",2)&&obj.getAttribute("href",2).charAt(0)=="#")||(obj.href.indexOf("#")!=-1&&(obj.href.substr(0,obj.href.indexOf("#"))==document.URL))||obj.nodeName.toLowerCase()=="img"){mode=0
}else{mode=1
}}else{mode=0
}return mode
}function nclkSendToCC(obj,mode,clink){var temp;
if(mode==1){temp=obj.innerHTML;
obj.href=clink;
if(obj.innerHTML!=temp){obj.innerHTML=temp
}}else{if(document.images){var timestr=new Date().getTime();
clink+="&time="+timestr;
if(nclkIsSafari&&!obj.href){var b=c=new Date();
while((b.getTime()-c.getTime())<100){b=new Date()
}var o=new Image();
nclkImg.push(o);
o.src=clink
}else{var o=new Image();
nclkImg.push(o);
o.src=clink
}}}}function nclkGetCoord(obj,theEvent){var px=py=sx=sy=-1;
var ifrId=nclkCheckIframe(obj);
if(ifrId){var ifrOffset=nclkFindPos(document.getElementById(ifrId));
if(theEvent.clientX&&theEvent.clientX!=undefined){dBody=document.body;
if(dBody.clientLeft&&dBody.clientTop){ifrSx=theEvent.clientX-dBody.clientLeft;
ifrSy=theEvent.clientY-dBody.clientTop
}else{ifrSx=theEvent.clientX;
ifrSy=theEvent.clientY
}}px=ifrOffset[0]+ifrSx;
py=ifrOffset[1]+ifrSy;
if(document.body&&(document.body.scrollTop||document.body.scrollLeft)){dBody=document.body;
sx=px-dBody.scrollLeft;
sy=py-dBody.scrollTop
}else{if(document.documentElement&&(document.documentElement.scrollTop||document.documentElement.scrollLeft)){dElement=document.documentElement;
sx=px-dElement.scrollLeft;
sy=py-dElement.scrollTop
}else{sx=px;
sy=py
}}}else{if(theEvent.clientX&&theEvent.clientX!=undefined){dBody=document.body;
if(dBody.clientLeft&&dBody.clientTop){sx=theEvent.clientX-dBody.clientLeft;
sy=theEvent.clientY-dBody.clientTop
}else{sx=theEvent.clientX;
sy=theEvent.clientY
}}if(document.body&&(document.body.scrollTop||document.body.scrollLeft)){px=document.body.scrollLeft+(sx<0?0:sx);
py=document.body.scrollTop+(sy<0?0:sy)
}else{if(document.documentElement&&(document.documentElement.scrollTop||document.documentElement.scrollLeft)){dElement=document.documentElement;
if(dElement.scrollLeft!=undefined){px=dElement.scrollLeft+(sx<0?0:sx)
}if(dElement.scrollTop!=undefined){py=dElement.scrollTop+(sy<0?0:sy)
}}else{px=(sx<0?0:sx);
py=(sy<0?0:sy)
}}if(theEvent.pageX){px=theEvent.pageX
}if(theEvent.pageY){py=theEvent.pageY
}}return[px,py,sx,sy]
}function nclkParseNCStr(headerType,str){str=nclkTrim(str);
var sp;
var body;
var argArr;
var retVal;
var area="",rank="",gdid="",sign="",mode,bSsupport=false;
var areaPos=2;
switch(headerType){case 4:areaPos=4;
break;
case 5:areaPos=3;
break;
case 6:areaPos=2;
break;
case 1:case 2:case 3:default:return 
}body=str.substring(areaPos);
argArr=body.split(",");
for(var i=0;
i<argArr.length;
i++){retVal=argArr[i].split(":");
if(retVal[0]=="a"){area=retVal[1]
}else{if(retVal[0]=="r"){rank=retVal[1]
}else{if(retVal[0]=="i"){gdid=retVal[1]
}else{if(retVal[0]=="g"){sign=retVal[1]
}else{if(retVal[0]=="m"){mode=retVal[1]
}else{if(retVal[0]=="s"&&retVal[1]){area=retVal[1]+"."+area;
bSsupport=true
}}}}}}}return[area,rank,gdid,sign,mode,bSsupport]
}function nclkTrim(str){return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"")
}function nclkGetScrollBarWidth(){var inner=document.createElement("p");
inner.style.width="200px";
inner.style.height="200px";
var outer=document.createElement("div");
outer.style.position="absolute";
outer.style.top="0px";
outer.style.left="0px";
outer.style.visibility="hidden";
outer.style.width="200px";
outer.style.height="150px";
outer.style.overflow="hidden";
outer.appendChild(inner);
document.body.appendChild(outer);
var w1=inner.offsetWidth;
outer.style.overflow="scroll";
var w2=inner.offsetWidth;
if(w1==w2){w2=outer.clientWidth
}document.body.removeChild(outer);
return(w1-w2)
}function nclkFindPos(obj){var curleft=curtop=0;
try{if(obj.offsetParent){do{curleft+=obj.offsetLeft;
curtop+=obj.offsetTop
}while(obj=obj.offsetParent)
}else{if(obj.x||obj.y){if(obj.x){curleft+=obj.x
}if(obj.y){curtop+=obj.y
}}}}catch(e){}return[curleft,curtop]
}function nclkXWindowSize(win){if(!win){win=window
}var winWidth=0;
if(win.innerWidth){winWidth=win.innerWidth;
if(typeof (win.innerWidth)=="number"){var scrollbarWidth=nclkGetScrollBarWidth();
winWidth=win.innerWidth-scrollbarWidth
}}else{if(document.documentElement&&document.documentElement.clientWidth){winWidth=document.documentElement.clientWidth
}else{if(document.body&&(document.body.clientWidth||document.body.clientHeight)){winWidth=document.body.clientWidth
}}}return winWidth
}function nclkCheckIframe(obj){var oriURL=document.URL;
var p=obj.parentNode;
var docObj;
var ifrId;
while(p&&1){if(p.nodeName.toLowerCase()=="#document"){if(p.parentWindow){docObj=p.parentWindow
}else{docObj=p.defaultView
}try{if(docObj.frameElement!=null&&docObj.frameElement!=undefined){if(docObj.frameElement.nodeName.toLowerCase()=="iframe"){ifrId=docObj.frameElement.id;
if(!ifrId){return false
}return ifrId
}else{return false
}}else{return false
}}catch(e){return false
}}else{p=p.parentNode;
if(p==null||p==undefined){return false
}}}}function nclkAppendCommnetNode(el,attr,code,rank){if(!el){return 
}var rawNode;
if(el instanceof $Element){rawNode=el.$value()
}else{if(el instanceof String){rawNode=$(el)
}else{rawNode=el
}}var comNode=nclkCreateCommnetNode(attr,code,rank);
if(!comNode){return 
}nclkInsertAfter(comNode,rawNode)
}function nclkCreateCommnetNode(attr,code,rank,serviceCode,id){if(!code){return 
}if(serviceCode){code=serviceCode+"."+code
}var text=attr+"=a:"+code;
if(rank&&rank!=""){text+=",r:"+rank
}if(id&&id!=""){text+=",i:"+id
}return document.createComment(text)
}function nclkInsertAfter(newElement,targetElement){var parent=targetElement.parentNode;
if(parent.lastChild==targetElement){parent.appendChild(newElement)
}else{if(targetElement.nextSibling&&targetElement.nextSibling.nodeType==8){nclkInsertAfter(newElement,targetElement.nextSibling)
}else{parent.insertBefore(newElement,targetElement.nextSibling)
}}}function nclkChangeCode(elTarget,sNewcode,fBackward){try{var nClickTag;
if(elTarget.nodeType==8){nClickTag=elTarget
}else{nClickTag=elTarget.nextSibling
}if(nClickTag&&nClickTag.nodeType==8){var value=nclkTrim(nClickTag.nodeValue);
nClickTag.nodeValue=value.replace(/^NE|NIP|NPI=a:([0-9a-zA-Z]+),{0,1}r{0,1}.*$/g,function(a,b){return a.replace(b,sNewcode)
})
}}catch(e){}}function nclkChangeRank(elTarget,sNewRank){try{var nClickTag=elTarget.nextSibling;
if(nClickTag.nodeType==8){var value=nclkTrim(nClickTag.nodeValue);
nClickTag.nodeValue=value.replace(/^NE|NIP|NPI=a:[0-9a-zA-Z]+,r:([0-9]*).*$/,function(a,b){return a.replace(b,sNewRank)
})
}}catch(e){}}function nclkGetArea(obj){if(!obj){return 
}if(typeof (obj)=="string"){obj=document.getElementById(obj)
}try{var o=nclkFindAreaNode(obj);
if(!o){return 
}var nClickTag;
if(o.nodeType==8){nClickTag=o
}else{nClickTag=o.nextSibling
}if(nClickTag.nodeType==8){var value=nclkTrim(nClickTag.nodeValue);
value.match(/^NE=a:([0-9a-zA-Z_]+)*$/g);
return RegExp.$1
}}catch(e){}}function nclkReplaceArea(obj,sNewArea){try{var o=nclkFindAreaNode(obj);
if(!o){return 
}var nClickTag;
if(o.nodeType==8){nClickTag=o
}else{nClickTag=o.nextSibling
}if(nClickTag.nodeType==8){var value=nclkTrim(nClickTag.nodeValue);
nClickTag.nodeValue=value.replace(/^NE=a:([0-9a-zA-Z_]+)*$/g,function(a,b){return a.replace(b,sNewArea)
})
}}catch(e){}}function nclkFindAreaNode(obj){var depth=0;
var p=obj;
var slb;
if(!p){return 
}if(p&&p.nextSibling&&p.nextSibling.nodeType==8&&nclkTrim(p.nextSibling.nodeValue).match(/^NE=a:([0-9a-zA-Z]+)/g)){return p
}try{while(p=p.parentNode){slb=p;
while(slb=slb.previousSibling){if(slb.nodeType==8){if(nclkTrim(slb.nodeValue).match(/^NE=a:([0-9a-zA-Z]+)/g)){return slb
}}}depth++;
if(depth>=nclkMaxDepth){break
}}}catch(e){}return null
}function nclkReplaceComment(elTarget,sOld,sNew){try{var nClickTag=elTarget.nextSibling;
if(nClickTag.nodeType==8){var value=nClickTag.nodeValue;
nClickTag.nodeValue=value.replace(sOld,sNew)
}}catch(e){}}var flType={imageMatome:0};
function InitFlash(type,option){var oRetVal;
switch(type){case flType.imageMatome:oRetVal=new ImageMatomeManager(option);
break;
default:break
}return oRetVal
}function EnableFlashNavigation(flID,holderID){return new nj.FlashNavigator(flID,holderID)
}(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({bFF:false,rgIgnoreTags:["input","textarea","button"],$init:function(oOption){this.option=oOption||{fullScreen:false,evtkb:true,evtmw:true};
oAgent=new $Agent().navigator();
if(oAgent){if(oAgent.firefox){this.bFF=oAgent.firefox
}}this.exEls=$A(new Array());
this._setExcludeElements(oOption)
},setContainerID:function(id){this.flId=id
},setFlashObject:function(_obj){this.flObj=_obj
},setContainerObject:function(containerID){this.cObj=$Element(containerID)
},getIsHandleKeyboardEvent:function(){return this.option.evtkb
},getIsHandleMouseWheelEvent:function(){return this.option.evtmw
},_setExcludeElements:function(option){var rgElements=document.getElementsByTagName("input");
for(var i=0;
i<rgElements.length;
i++){if(rgElements[i].type&&rgElements[i].type=="text"){this.exEls.push(rgElements[i])
}}if(option&&option.excludeElements){this.exEls.$value().concat(option.excludeElements)
}},_isIgnoreElements:function(el){var tagName=el.tagName.toLowerCase();
for(var i=0;
i<this.rgIgnoreTags.length;
i++){if(tagName==this.rgIgnoreTags[i]){return true
}}return false
},onKeyDown:function(ev){var evt=$Event(ev);
if(evt.element&&(this._isIgnoreElements(evt.element)||(this.exEls&&this.exEls.has(evt.element)))){return 
}var key=evt.key();
if(key.left||key.right){try{if(evt.element.id===this.flId){return 
}}catch(e){}var op=(key.left)?"left":"right";
this.flObj.setInteraction("keyboard",op)
}},onMouseWheel:function(ev){var evt=$Event(ev);
if(this.exEls&&this.exEls.has(evt.element)){return 
}var mouse=evt.mouse();
if(!this.option.fullScreen){this.flObj.setInteraction("wheel",mouse.delta);
evt.stop($Event.CANCEL_ALL)
}else{this.flObj.setInteraction("wheel",mouse.delta)
}}})
})("nj.FlashNavigatorHandler");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({bFF:false,$init:function(sID,cID,handler){this.flObj=this.find(sID);
if(!this.flObj){return 
}oAgent=new $Agent().navigator();
if(oAgent){if(oAgent.firefox){this.bFF=oAgent.firefox
}}this.handler=(!handler)?new nj.FlashNavigatorHandler():handler;
this.handler.setFlashObject(this.flObj);
this.handler.setContainerObject(cID);
this.handler.setContainerID(sID);
this.elmContent=$(cID);
this._bindEvent()
},_bindEvent:function(){if(this.handler.getIsHandleKeyboardEvent()){$Fn(this.handler.onKeyDown,this.handler).attach(document,"keydown")
}if(this.handler.getIsHandleMouseWheelEvent()){$Fn(this.handler.onMouseWheel,this.handler).attach(this.elmContent,"mouseWheel");
if(this.bFF){$Fn(this.handler.onMouseWheel,this.handler).attach(this.elmContent,"DOMMouseScroll")
}}},find:function(sID,oDoc){oDoc=oDoc||document;
return oDoc[sID]||oDoc.all[sID]
}})
})("nj.FlashNavigator");
var ImageMatomeManager=$Class({$init:function(option){this._init();
this._getOption(option)
},_getOption:function(option){var defParam={ids:{query:"q",searchForm:"searchForm",flImageMatome:"flashContent",header:"header"},cssQuerys:{backlink:{key:".backLink",base:"header"}},bFlags:{fScroll:true,fResize:true},flashParams:{id:"matomeImageFlash",minHeight:600,searchURL:(typeof SEARCH_SERVER=="string"?SEARCH_SERVER:"http://search.naver.jp")+"/image"}};
this.option=option||{};
this._objCopy(this.option,defParam)
},_objCopy:function(src,dest){for(var k in dest){if(!src[k]){src[k]=dest[k]
}if(typeof src[k]=="object"){this._objCopy(src[k],dest[k])
}}},_getQuery:function(){return $(this.option.ids.query).value
},_initElement:function(){this.oFlashMatome=$Agent().navigator().ie?$$.getSingle("> OBJECT",$(this.option.ids.flImageMatome)):$$.getSingle("> EMBED",$(this.option.ids.flImageMatome));
this.elBackToSearch=$$.getSingle(this.option.cssQuerys.backlink.key,$(this.option.cssQuerys.backlink.base));
this.headerHeight=$Element($(this.option.ids.header)).height();
if(this.oFlashMatome&&this.option.bFlags.fResize){setInterval($Fn(this._resize,this).bind(),500);
this._resize()
}if(this.oFlashMatome&&this.option.bFlags.fScroll){EnableFlashNavigation(this.option.flashParams.id,this.option.ids.flImageMatome)
}},_resize:function(){if(!this.option.bFlags.fResize){return 
}if(!this.oFlashMatome){return 
}var nMin=this.option.flashParams.minHeight;
var padding=this.headerHeight;
var nHeight=new $Document().clientSize().height-padding;
if(nHeight>nMin){this.oFlashMatome.height=nHeight
}else{this.oFlashMatome.height=nMin
}},_back:function(e){$Event(e).stop();
var url=this.option.flashParams.searchURL;
if(this.oFlashMatome&&this.oFlashMatome.getSearchInfo){var param=this.oFlashMatome.getSearchInfo();
if(param){url+="?"+param
}}location.href=url
},_search:function(e){$Event(e).stop();
var query=this._getQuery();
if(query&&this.oFlashMatome&&this.oFlashMatome.setSearchQuery){this.oFlashMatome.setSearchQuery(query)
}},_init:function(){$Fn(function(){this._initElement();
$Fn(this._search,this).attach($(this.option.ids.searchForm),"submit");
if(this.elBackToSearch){$Fn(this._back,this).attach(this.elBackToSearch,"click")
}nj.tool.checkFlashAndDialog(9)
},this).attach(window,"load")
}});
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=jindo.$Class({$init:function(oOptions){oOptions=oOptions||{};
this._options={selector:"ul.iconList",displayClass:"popUpView",focusClass:"focus",currentButtonClass:"_commentIconButtonCurrent"};
for(var i in oOptions){this._options[i]=oOptions[i]
}this.display=false;
this._element=this._setElements();
this._currentButton;
this._bindEvents()
},toggle:function(el,fnOnClick){if(this.display&&$Element(el).hasClass(this._options.currentButtonClass)){this.hide()
}else{this.show(el,fnOnClick)
}},show:function(el,fnOnClick){this._onClick=fnOnClick||function(){return true
};
var welClick=$Element(el);
var oOffset=welClick.offset();
var nHeight=welClick.height();
this._element.show().offset(Math.round(oOffset.top)+Math.round(nHeight),Math.round(oOffset.left)).addClass(this._options.displayClass);
this.display=true;
if(this._currentButton){this._currentButton.removeClass(this._options.currentButtonClass)
}this._currentButton=$Element(el);
this._currentButton.addClass(this._options.currentButtonClass)
},hide:function(){this._element.hide().removeClass(this._options.displayClass);
this.display=false
},_bindEvents:function(){var self=this;
this._element.delegate("click").bind("button",function(ev){self._onClickButton.apply(self,arguments)
});
this._element.delegate("mouseover").bind("button",function(ev){$Element(ev.element).parent().addClass(self._options.focusClass)
});
this._element.delegate("mouseout").bind("button",function(ev){$Element(ev.element).parent().removeClass(self._options.focusClass)
})
},_onClickButton:function(ev){var welIconButton=$Element(ev.element);
var sClassName=welIconButton.attr("class").split(" ")[0];
var oParams={className:sClassName,value:welIconButton.attr("title")};
if(this._onClick(oParams)===true){this.hide()
}},_setElements:function(){var welUl=$Element("<ul>").addClass("iconList");
var sHtml='<li class="firstChild"><button class="commentIcon01" title="いい情報をありがとうございます！"><span>アイコン1</span></button></li><li><button class="commentIcon02" title="とっても面白いですね～♪ "><span>アイコン2</span></button></li><li><button class="commentIcon03" title="内容が充実していて、助かります～ "><span>アイコン3</span></button></li><li><button class="commentIcon04" title="欲しかった情報を見つけることができました！ "><span>アイコン4</span></button></li><li><button class="commentIcon05" title="すごいなぁ、と感動しました！"><span>アイコン5</span></button></li><li><button class="commentIcon00" title=""><span>アイコン6</span></button></li>';
welUl.html(sHtml).appendTo(document.body);
return welUl
}})
})("nj.widget.CommentIconBox");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(){return nj.widget.CommentIconBox.__instance
}
})("nj.widget.CommentIconBox.getInstance");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(oOptions){nj.widget.CommentIconBox.__instance=(nj.widget.CommentIconBox.getInstance()||new nj.widget.CommentIconBox(oOptions));
return nj.widget.CommentIconBox.__instance
}
})("nj.widget.CommentIconBox.init");
nhn.LayerRelation=$Class({_layer:null,_links:null,_visible:false,_timer:null,$init:function(oEl,oOptions){this.option({checkEvent:"",showDelay:0,hideDelay:100});
this.option(oOptions||{});
this._layer=$(oEl);
this._links=[this._layer];
this._timer=new nhn.Timer();
if(this.option("checkEvent")){$Fn(function(oEvent){if(!this._visible){return 
}var oEl=oEvent.element;
if(this._check(oEl)){this._timer.abort();
return 
}this.hide()
},this).attach(document,this.option("checkEvent"))
}},_check:function(oEl){var eEl=$Element(oEl);
for(var i=0,oLink;
oLink=this._links[i];
i++){if(oEl==oLink||eEl.isChildOf(oLink)){return true
}}return false
},_find:function(oEl){for(var i=0,oLink;
oLink=this._links[i];
i++){if(oLink==oEl){return i
}}return -1
},link:function(oEl){if(arguments.length>1){for(var i=0,len=arguments.length;
i<len;
i++){this.link(arguments[i])
}return this
}if(this._find(oEl)!=-1){return this
}this._links.push(oEl);
return this
},unlink:function(oEl){if(arguments.length>1){for(var i=0,len=arguments.length;
i<len;
i++){this.unlink(arguments[i])
}return this
}var nIndex=this._find(oEl);
if(nIndex==-1){return this
}this._links.splice(nIndex,1);
return this
},show:function(nDelay){var self=this;
if(typeof nDelay=="undefined"){nDelay=this.option("showDelay")
}this._timer.start(function(){if(self.fireEvent("show",{layer:self._layer})){self._visible=true
}var sGroup=self.option("group");
if(!sGroup){return 
}var aInstances=self.constructor._instances;
for(var i=0,len=aInstances.length;
i<len;
i++){var oInst=aInstances[i];
if(oInst!==self&&oInst.option("group")==sGroup){oInst.hide()
}}},nDelay);
return this
},hide:function(nDelay){var self=this;
if(typeof nDelay=="undefined"){nDelay=this.option("hideDelay")
}this._timer.start(function(){if(self.fireEvent("hide",{layer:self._layer})){self._visible=false
}},nDelay);
return this
},toggle:function(){return this[this._visible?"hide":"show"]()
}}).extend(nhn.Component);
nhn.AutoComplete=$Class({_data:[],input:null,suggest:null,suggestLayer:null,watcher:null,listbox:null,template:"",$init:function(oInputEl,oSuggestEl,oOptions){var opt=this._options;
var self=this;
var cookie=$Cookie();
var vDisabled=false;
if(cookie.get("NaverSuggestUse")){vDisabled=(cookie.get("NaverSuggestUse")=="use")?false:true
}this.option({listbox:"ac_listbox",async:false,disabled:vDisabled,query:function(keyword,asyncCallback){return[]
}});
this.option(oOptions);
this._data=[];
this.input=$Element(oInputEl).attr("autocomplete","off");
this.suggest=$Element(oSuggestEl);
this.suggestLayer=new nhn.LayerRelation(oSuggestEl,{checkEvent:"mousedown",hideDelay:0});
this.listbox=this._findElement("."+opt.listbox,this.suggest.$value())[0];
this.listbox=this.listbox?$Element(this.listbox):null;
this.suggestLayer.attach({show:function(e){self.suggest.removeClass("ac_layerHide")
},hide:function(e){self.suggest.addClass("ac_layerHide")
}}).link(this.input).link(this.suggest);
if(this.listbox){this.template=this.listbox.html().replace(/^\s+|\s+$/g,"")
}this._onInput=$Fn(this.onInput,this).bind();
this.watcher=new nhn.WatchInput(oInputEl);
this.watcher.attach("input",this._onInput);
$Fn(this.onClick,this).attach(this.input,"click");
this.paint()
},query:function(pFunc){var opt=this._options;
if(typeof pFunc=="undefined"){return opt.query
}opt.query=pFunc;
return this
},async:function(bAsync){if(typeof bAsync=="undefined"){return this._options.async
}this._options.async=!!bAsync;
return this
},disabled:function(bDisabled){if(typeof bDisabled=="undefined"){return this._options.disabled
}this._options.disabled=bDisabled=!!bDisabled;
this.watcher.disabled(bDisabled);
this._data=[];
if(!!bDisabled&&this.suggest.visible()){this.suggest.hide()
}this.paint();
return this
},_findElement:function(sSelector,oParent){var p=oParent||document;
var ret=$A();
var tag="";
var cls="";
if(!/^(\w+|\*)?(?:\.(\w+))?$/.test(sSelector)){return[]
}tag=RegExp.$1||"*";
cls=RegExp.$2?RegExp.$2+" ":"";
$A(p.getElementsByTagName(tag)).forEach(function(v,i,a){if(cls){if((v.className+" ").indexOf(cls)>-1){ret.push(v)
}}else{ret.push(v)
}});
return ret.$value()
},paint:function(){if(this._options.disabled){return false
}if(!this.listbox){return false
}var list=[];
var tpl=this.template;
var data=this._data;
function tpl_replace(s,d){for(var x in d){if(!d.propertyIsEnumerable(x)){continue
}s=s.replace(new RegExp("<!--@"+x+"@-->","g"),d[x])
}return s
}this.suggest[data.length?"removeClass":"addClass"]("ac_noList");
this.suggest[this._options.disabled?"addClass":"removeClass"]("ac_disabled");
for(var i=0;
i<data.length;
i++){list[list.length]=tpl_replace(tpl,data[i])
}this.listbox.html(list.join(""));
return this
},show:function(){if(this._options.disabled){return false
}this.suggestLayer.show();
return this
},hide:function(){if(this._options.disabled){return false
}this.suggestLayer.hide();
return this
},onInput:function(event){var opt=this._options;
var val=this.input.$value().value;
var self=this;
this._data=[];
if(opt.async){opt.query(val,function(data){self.onDataLoad(data)
})
}else{this.onDataLoad(opt.query(val))
}},onDataLoad:function(data){this._data=data;
if(!this.input.$value().value){if(this.suggest.visible()){this.suggestLayer.hide()
}return 
}if(!this.suggest.visible()){this.suggestLayer.show()
}this.paint()
},onClick:function(evt){if(this.suggest.visible()){this.suggestLayer.hide()
}else{if(this.input.$value().value&&!this.suggest.visible()){this.suggestLayer.show()
}}}}).extend(nhn.Component);
nhn.AjaxSuggestJP=$Class({_request:null,_cache:{},_data_max_length:10,messagebox1:null,messagebox2:null,selected:null,hideClass:"ac_layerHide",_data_m:[],template_m:"",$init:function(oInputEl,oSuggestEl,oOptions){var opt=this._options;
var self=this;
this.option({listbox:"_resultBox1",messagebox1:"guideText",messagebox2:"guideText2",query_var:"{query}",request_type:"xhr",request_method:"get",request_data:{},listbox_size:10,cookieDomain:"naver.jp",onSetPosition:function(){return true
}});
this.option(oOptions);
this.query_var(opt.query_var);
this._data_m=[];
opt.async=true;
opt.query=$Fn(this._remoteQuery,this).bind();
this.listbox=this._findElement("."+opt.listbox,this.suggest.$value())[0];
this.listbox=this.listbox?$Element(this.listbox):null;
this.messagebox1=this._findElement("."+opt.messagebox1,this.suggest.$value())[0];
this.messagebox1=this.messagebox1?$Element(this.messagebox1):null;
this.messagebox2=this._findElement("."+opt.messagebox2,this.suggest.$value())[0];
this.messagebox2=this.messagebox2?$Element(this.messagebox2):null;
if(opt.disabled){this._showSuggestOff()
}else{this._showSuggestOn()
}if(this.listbox){this.template=this.listbox.html().replace(/^\s+|\s+$/g,"")
}var _positioning=false;
this.suggestLayer.attach({show:function(e){if(_positioning){return 
}self.setPosition();
_positioning=true;
if(!opt.disabled&&self.input.text().length!=0){self.onInput()
}},hide:function(e){if(self.selected){var oFirst=self.selected.first();
if(oFirst){oFirst.removeClass("selected")
}}self.selected=null
}});
$Fn(function(){this.setPosition()
},this).attach(window,"resize");
this.onKeyDownFn=$Fn(this.onKeyDown,this).attach(this.input,"keydown");
this.onMouseOverFn=$Fn(this.onMouseOver,this).attach(this.suggest,"mouseover");
this.paint()
},setPosition:function(){if(!this._options.onSetPosition.apply(this)){return 
}var par=this.input.parent();
var pos=par.offset();
this.suggest.offset(Math.round(pos.top+par.height()),Math.round(pos.left))
},query_var:function(sQueryVar){var opt=this._options;
if(typeof sQueryVar=="undefined"){return opt.query_var
}opt.query_var=sQueryVar;
opt.query_var_regexp=new RegExp(sQueryVar.replace(/([\?\.\*\+\-\/\(\)\{\}\[\]\:\!\^\$\\])/g,"\\$1"),"g");
return this
},disabled:function(bDisabled){if(typeof bDisabled=="undefined"){return this._options.disabled
}bDisabled=!!bDisabled;
if(bDisabled){this._data_m=[]
}return this.$super.disabled(bDisabled)
},_remoteQuery:function(keyword,callback){var opt=this._options;
var url=opt.url.replace(opt.query_var_regexp,keyword);
var dat=$H(opt.request_data);
var self=this;
if(opt.disabled){return false
}this._data=[];
this._data_m=[];
keyword=keyword.replace(/^\s+|\s+$/g,"");
if(!keyword){return callback([])
}if(typeof this._cache[keyword]!="undefined"){this._data=this._cache[keyword].data;
this._data_m=this._cache[keyword].data_m;
return callback(this._data)
}try{this._request.abort();
this._request=null
}catch(e){}dat.map(function(v,k,o){if(typeof v=="string"){return v.replace(opt.query_var_regexp,keyword)
}else{return v
}});
function trim(s){return s.replace(/^\s+|\s+$/g,"")
}this._request=$Ajax(url,{type:opt.request_type,method:opt.request_method,onload:function(req){try{var json=req.json();
var items=json.items;
self._data=[];
var aItems=[];
aItems=items[0].concat(items[1]).slice(0,self._data_max_length);
$A(aItems).forEach(function(v,i,a){if(i>=self._data_max_length||!v[0]){return 
}self._data[self._data.length]={encoded:encodeURIComponent(v[0]),txt:trim(v[0]).replace("$","$$")}
});
if(json.query){self._cache[json.query[0].toLowerCase()]={data:self._data,data_m:self._data_m}
}callback(self._data)
}catch(e){return 
}}}).request(dat.$value())
},onInput:function(){if(this._options.disabled){this.suggestLayer.show()
}else{this.suggestLayer.show();
this.$super.onInput()
}},onKeyDown:function(event){if(this.input.attr("autocomplete")=="on"){return 
}var key=event.key();
var opt=this._options;
var item=null,children=null;
var len=0;
var len_m=0;
var idx=-1;
if(!key.down&&!key.up){return 
}if(this.selected&&!this.selected.$value().parentNode){this.selected=null
}len=this.listbox.$value().childNodes.length;
if(!this.selected){if(key.down){if(len){this.selected=this.listbox.first()
}}if(this.selected&&this.selected.first()){this.selected.first().addClass("selected");
this.watcher.disabled(true);
this.input.$value().value=this.selected.first().text();
this.watcher.disabled(false);
this.show()
}return 
}item=this.selected.first().removeClass("selected").parent().$value();
if(key.down){if(item.nextSibling){this.selected=this.selected.next()
}}else{if(item.previousSibling){this.selected=this.selected.prev()
}else{this.selected=null
}}if(this.selected){this.selected.first().addClass("selected");
this.watcher.disabled(true);
this.input.$value().value=this.selected.first().text();
this.watcher.disabled(false);
if(this.selected.isChildOf(this.listbox)){idx=this.listbox.indexOf(this.selected)
}}else{this.hide()
}},onMouseOver:function(event){var el=event.element;
if(!el||!el.tagName||el.tagName.toUpperCase()!="A"){return false
}if(!el.parentNode||!el.parentNode.tagName||el.parentNode.tagName.toUpperCase()!="LI"){return false
}if(this.selected&&this.selected.first()){this.selected.first().removeClass("selected")
}this.selected=$Element(el.parentNode);
this.selected.first().addClass("selected")
},onClick:function(evt){var opt=this._options;
if(this.suggest.visible()){this.suggestLayer.hide()
}else{if(this.input.$value().value&&!this.suggest.visible()){this.suggestLayer.show()
}}},paint:function(){if(this._options.disabled){return false
}if(!this.listbox){return false
}var list=[];
var tpl=this.template;
var data=this._data_m;
var opt=this._options;
var self=this;
function tpl_replace(s,d){for(var x in d){if(!d.propertyIsEnumerable(x)){continue
}s=s.replace(new RegExp("@"+x+"@","g"),d[x])
}return s
}this.$super.paint();
this.suggest.removeClass("smartSearchNone");
this.suggest.removeClass("smartSearchDisabled");
this.suggest.removeClass("searchSingle");
if(opt.disabled){this.suggest.addClass("smartSearchDisabled");
if(this.messagebox1){this.messagebox1.removeClass(this.hideClass)
}if(this.messagebox2){this.messagebox2.addClass(this.hideClass)
}}else{if(!this._data_m.length&&!this._data.length){this.suggest.addClass("smartSearchNone");
if(this.messagebox1){this.messagebox1.addClass(this.hideClass)
}if(this.messagebox2){this.messagebox2.removeClass(this.hideClass)
}}else{if(this.messagebox1){this.messagebox1.addClass(this.hideClass)
}if(this.messagebox2){this.messagebox2.addClass(this.hideClass)
}if(!this._data_m.length){this.suggest.addClass("searchSingle")
}else{if(!this._data.length){}else{}}}}if(this._data.length>opt.listbox_size){setTimeout(function(){var children=self.listbox.child(null,1);
var lastItem=children[opt.listbox_size-1].$value()
},100)
}else{this.listbox.css("height","").css("overflow","")
}for(var i=0;
i<data.length;
i++){list[list.length]=tpl_replace(tpl,data[i])
}return this
},getViewHeight:function(lastItem){var viewHeight=lastItem.offsetTop+lastItem.offsetHeight;
var parent=lastItem.parentNode;
while(parent!==lastItem.offsetParent){viewHeight-=parent.offsetTop;
parent=parent.offsetParent
}return viewHeight
},toggle:function(){var opt=this._options;
this.suggestLayer.toggle()
},_showSuggestOff:function(){if(this.messagebox1){this.messagebox1.removeClass(this.hideClass)
}$Element($$.getSingle(".suggestSwithch")).removeClass(this.hideClass);
if(this.messagebox2){this.messagebox2.addClass(this.hideClass)
}$Element($$.getSingle(".suggestOff")).addClass(this.hideClass);
this.listbox.addClass(this.hideClass);
this.input.attr("autocomplete","on")
},_showSuggestOn:function(){if(this.messagebox2){this.messagebox1.addClass(this.hideClass)
}$Element($$.getSingle(".suggestSwithch")).addClass(this.hideClass);
if(this.messagebox2){this.messagebox2.removeClass(this.hideClass)
}$Element($$.getSingle(".suggestOff")).removeClass(this.hideClass);
this.input.attr("autocomplete","off")
},unuseSuggest:function(event){var cookie=$Cookie();
var opt=this._options;
cookie.set("NaverSuggestUse","unuse",21900,opt.cookieDomain);
opt.disabled=true;
this._showSuggestOff();
this.listbox.addClass(this.hideClass);
$Event(event).stop()
},useSuggest:function(event){var cookie=$Cookie();
var opt=this._options;
cookie.set("NaverSuggestUse","use",21900,opt.cookieDomain);
opt.disabled=false;
this._showSuggestOn();
if(this.input.text().length!=0){this.onInput()
}this.listbox.removeClass(this.hideClass);
$Event(event).stop()
},enableBorder:function(){var oCss={position:"absolute",display:"none",width:"540px"};
if($("acBorderIframe")!=null){this.suggestBorder=$Element("acBorderIframe").css(oCss);
return 
}this.suggestBorder=this.suggest.parent().append($Element("<IFRAME>").attr({id:"acBorderIframe",frameBorder:"0"}).css(oCss))
},disableBorder:function(){if($("acBorderIframe")!=null){$Element("acBorderIframe").hide()
}this.suggestBorder={show:function(){return this
},hide:function(){return this
},css:function(){return this
},offset:function(){return this
}}
}}).extend(nhn.AutoComplete);
function searchFromList(o){var txt=o.textContent||o.innerText;
$("q").value=txt;
$("q").form.submit();
return false
}function imgOnError(obj){obj.onerror=null;
var type=(typeof imgOnError.oData[obj.name]=="undefined"?"default":obj.name);
if(type=="tab_video"||type=="mb_video"){try{$Element(obj.parentNode).addClass("noImage")
}catch(e){}}$Element(obj).attr({src:(typeof STATIC_SERVER=="undefined"?imgOnError.oData.staticServer:STATIC_SERVER)+imgOnError.oData[type]["src"],width:imgOnError.oData[type]["w"],height:imgOnError.oData[type]["h"]})
}imgOnError.oData={staticServer:"http://static.naver.jp",total_search:{src:"/nv2search/img/no_image_65x65.gif",w:"65",h:"65"},tab_search:{src:"/nv2search/img/no_image_80x65_2.gif",w:"80",h:"65"},thumb_slide:{src:"/nv2search/img/no_image_80x65.gif",w:"80",h:"65"},slide_image:{src:"/new_search/img/no_image2.gif",w:"80",h:"80"},mb_image:{src:"/nv2search/img/no_image_80x80.gif",w:"80",h:"80"},mb_video:{src:"/nv2search/img/no_image_76x57.gif",w:"76",h:"57"},tab_video:{src:"/new_search/img/no_image5.gif",w:"120",h:"90"},tab_image:{src:"/new_search/img/no_image6.gif",w:"104",h:"104"},detail_image:{src:"/new_search/img/fig_tabimage_noimage.gif",w:"362",h:"272"},matome_search:{src:"/matome/img/user_21X21.gif",w:"21",h:"21"},shp_search:{src:"/nv2search/img/no_image_80x80.gif",w:"80",h:"80"},siteranking:{src:"/siteranking/img/no_movImage_120x90.gif",w:"120",h:"90"},"default":{src:"/new_search/img/no_image.gif",w:"100",h:"100"}};
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(event,oElm,sArgs,sQuerySelector){sQuerySelector=sQuerySelector||"input[name='q']";
var oQuery=$$.getSingle(sQuerySelector);
var oNullQueryHref=$Element(oElm).attr("nullqueryhref");
if(oNullQueryHref&&oQuery&&$S(oQuery.value).trim().$value().length<1){oElm.href=oNullQueryHref
}else{var a=oElm.getAttribute("rel");
var h=oElm.href;
if(a=="internal"){try{var t=oElm.innerHTML;
var q=document.getElementById("q").value.replace(/^\s+|\s+$/g,"");
if(q){var r=/(\?|&)q=(.+?)(&|$)/;
q=encodeURIComponent(q);
if(r.test(h)){h=h.replace(r,"$1q="+q+"$3")
}else{h+="?q="+q
}oElm.href=h
}if(oElm.innerHTML!=t){oElm.innerHTML=t
}}catch(e){}}}if(oElm.id!="searchSubmit"&&window.nclkGenerateCC){return nclkGenerateCC(event)
}}
})("nj.common.replaceHrefIfNullQuery");
function getInitialData(){if($("flashAtomData")){return $("flashAtomData").innerHTML
}else{return""
}}function setInteraction(type,value){if(type=="keyboard"){if(value==8){return history.back()
}}}(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({bFF:false,rgIgnoreTags:["input","textarea","button"],$init:function(oOption){this.option=oOption||{fullScreen:false,evtkb:true,evtmw:true};
oAgent=new $Agent().navigator();
if(oAgent){if(oAgent.firefox){this.bFF=oAgent.firefox
}}this.exEls=$A(new Array());
this._setExcludeElements(oOption)
},setContainerID:function(id){this.flId=id
},setFlashObject:function(_obj){this.flObj=_obj
},setContainerObject:function(containerID){this.cObj=$Element(containerID)
},getIsHandleKeyboardEvent:function(){return this.option.evtkb
},getIsHandleMouseWheelEvent:function(){return this.option.evtmw
},_setExcludeElements:function(option){var rgElements=document.getElementsByTagName("input");
for(var i=0;
i<rgElements.length;
i++){if(rgElements[i].type&&rgElements[i].type=="text"){this.exEls.push(rgElements[i])
}}if(option&&option.excludeElements){this.exEls.$value().concat(option.excludeElements)
}},_isIgnoreElements:function(el){var tagName=el.tagName.toLowerCase();
for(var i=0;
i<this.rgIgnoreTags.length;
i++){if(tagName==this.rgIgnoreTags[i]){return true
}}return false
},onKeyDown:function(ev){var evt=$Event(ev);
if(evt.element&&(this._isIgnoreElements(evt.element)||(this.exEls&&this.exEls.has(evt.element)))){return 
}var key=evt.key();
if(key.left||key.right){try{if(evt.element.id===this.flId){return 
}}catch(e){}var op=(key.left)?"left":"right";
this.flObj.setInteraction("keyboard",op)
}},onMouseWheel:function(ev){var evt=$Event(ev);
if(this.exEls&&this.exEls.has(evt.element)){return 
}var mouse=evt.mouse();
if(!this.option.fullScreen){this.flObj.setInteraction("wheel",mouse.delta);
evt.stop($Event.CANCEL_ALL)
}else{this.flObj.setInteraction("wheel",mouse.delta)
}}})
})("nj.FlashNavigatorHandler");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({bFF:false,$init:function(sID,cID,handler){this.flObj=this.find(sID);
if(!this.flObj){return 
}oAgent=new $Agent().navigator();
if(oAgent){if(oAgent.firefox){this.bFF=oAgent.firefox
}}this.handler=(!handler)?new nj.FlashNavigatorHandler():handler;
this.handler.setFlashObject(this.flObj);
this.handler.setContainerObject(cID);
this.handler.setContainerID(sID);
this.elmContent=$(cID);
this._bindEvent()
},_bindEvent:function(){if(this.handler.getIsHandleKeyboardEvent()){$Fn(this.handler.onKeyDown,this.handler).attach(document,"keydown")
}if(this.handler.getIsHandleMouseWheelEvent()){$Fn(this.handler.onMouseWheel,this.handler).attach(this.elmContent,"mouseWheel");
if(this.bFF){$Fn(this.handler.onMouseWheel,this.handler).attach(this.elmContent,"DOMMouseScroll")
}}},find:function(sID,oDoc){oDoc=oDoc||document;
return oDoc[sID]||oDoc.all[sID]
}})
})("nj.FlashNavigator");
function addHyperLink(sStr){return sStr.replace(/((?:http:\/\/|https:\/\/|www\.)(?:[\w\-/:\#\?\=\&\;\%\~\+]+\.)+(?:[\w\-/:\#\?\=\&\;\%\~\+]+){1})/gim,function($0,$1){return/^www\./.test($1)?"<A href='http://"+$1+"'>"+$1+"</A>":"<A href='"+$1+"'>"+$1+"</A>"
})
}if(typeof nhn=="undefined"){nhn={}
}nhn.FlashObject=(function(){var FlashObject={};
FlashObject.find=function(sID,oDoc){oDoc=oDoc||document;
return oDoc[sID]||oDoc.all[sID]
};
var getAbsoluteXY=function(oEl){var oPhantom=null;
var bSafari=/Safari/.test(navigator.userAgent);
var bIE=/MSIE/.test(navigator.userAgent);
var fpSafari=function(oEl){var oPos={left:0,top:0};
if(oEl.parentNode.tagName.toLowerCase()=="object"){oEl=oEl.parentNode
}for(var oParent=oEl,oOffsetParent=oParent.offsetParent;
oParent=oParent.parentNode;
){if(oParent.offsetParent){oPos.left-=oParent.scrollLeft;
oPos.top-=oParent.scrollTop
}if(oParent==oOffsetParent){oPos.left+=oEl.offsetLeft+oParent.clientLeft;
oPos.top+=oEl.offsetTop+oParent.clientTop;
if(!oParent.offsetParent){oPos.left+=oParent.offsetLeft;
oPos.top+=oParent.offsetTop
}oOffsetParent=oParent.offsetParent;
oEl=oParent
}}return oPos
};
var fpOthers=function(oEl){var oPos={left:0,top:0};
for(var o=oEl;
o;
o=o.offsetParent){oPos.left+=o.offsetLeft;
oPos.top+=o.offsetTop
}for(var o=oEl.parentNode;
o;
o=o.parentNode){if(o.tagName=="BODY"){break
}if(o.tagName=="TR"){oPos.top+=2
}oPos.left-=o.scrollLeft;
oPos.top-=o.scrollTop
}return oPos
};
return(bSafari?fpSafari:fpOthers)(oEl)
};
var getScroll=function(){var bIE=/MSIE/.test(navigator.userAgent);
if(bIE){var sX=document.documentElement.scrollLeft||document.body.scrollLeft;
var sY=document.documentElement.scrollTop||document.body.scrollTop;
return{scrollX:sX,scrollY:sY}
}else{return{scrollX:window.pageXOffset,scrollY:window.pageYOffset}
}};
var getInnerWidthHeight=function(){var bIE=/MSIE/.test(navigator.userAgent);
var obj={};
if(bIE){obj.nInnerWidth=document.documentElement.clientWidth||document.body.clientWidth;
obj.nInnerHeight=document.documentElement.clientHeight||document.body.clientHeight
}else{obj.nInnerWidth=window.innerWidth;
obj.nInnerHeight=window.innerHeight
}return obj
};
FlashObject.getPositionObj=function(sID){var targetObj=FlashObject.find(sID);
if(targetObj==null){return null
}var absPosi=getAbsoluteXY(targetObj);
var scrollPosi=getScroll();
var obj={};
obj.absoluteX=absPosi.left;
obj.absoluteY=absPosi.top;
obj.scrolledX=obj.absoluteX-scrollPosi.scrollX;
obj.scrolledY=obj.absoluteY-scrollPosi.scrollY;
obj.browserWidth=getInnerWidthHeight().nInnerWidth;
return obj
};
return FlashObject
})();