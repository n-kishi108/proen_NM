/**
* NJMTM-3735
* @release date 2010.03.26
* -- filename: nj.mission.Searcher.js	revision: 180671
* -- filename: nj.mission.ScrollSearcher.js	revision: 180671
* -- filename: nj.mission.AddedList.js	revision: 161308
* -- filename: nj.mission.VideoFilter.js	revision: 166573
* -- filename: nj.mission.SiteAddLayer.js	revision: 165857
* -- filename: nj.mission.ImageAddLayer.js	revision: 168959
* -- filename: nj.mission.VideoAddLayer.js	revision: 165857
* -- filename: nj.mission.ModifyContent.js	revision: 181393
* -- filename: nj.mission.Participation.js	revision: 202831
* -- filename: nj.search.AutoFocus.js	revision: 157481
* -- filename: nj.mission.MissionSuggest.js	revision: 193378
* -- filename: nj.MissionLayer.js	revision: 195384
* -- filename: nhn.WatchInput.js	revision: 50117
* -- filename: nhn.Timer.js	revision: 48421
*/
(function(namespace){var Config=$Class({type:"web",id:{result:"",paging:""},style:{EVENT:"_selectThis",HOVER:"hover",NODE_SELECT:"selected"},thumbSize:"MAX",searchUrl:(typeof SEARCH_SERVER=="string"?SEARCH_SERVER:"http://search.naver.jp"),searchMethod:"jsonp",numPerPage:16,itemTag:"LI"});
var CONST={template:{site:['<div class="thumb">','<img onload="resizeImage( this, 120, 120 )" alt="" src="#thumbUrl#"/>',"</div>",'<div class="listContents">','<h4><a href="#sourceUrl#" target="_blank">#title#</a><!--NIP=a:title,s:#nclkid#,i:0,r:1--></h4>',"<p>#comment#</p>",'<div class="option">','<span class="url"><a href="#sourceUrl#" target="_blank">#shortSourceUrl#</a><!--NIP=a:url,s:#nclkid#,i:0,r:1--></span>',"</div>",'<button class="btnSelect _selectThis">選択</button><!--NIP=a:add,s:#nclkid#,i:0,r:1-->',"</div>"].join("")},PAGE:{THUMB:{MAX:"1",MID:"2",MIN:"3"}},MSG:{ERR_MSG:"一時的にご利用できません。"}};
var fnPrivate={search:function(sQuery,opt){var nPage=parseInt(opt.page)*opt.numPerPage+1;
new $Ajax(opt.url,{type:opt.method,timeout:5,onload:function(oRes){opt.fn(oRes.json())
},ontimeout:function(){opt.fn(false)
}}).request({start:""+nPage,s:""+nPage,display:opt.numPerPage,d:opt.numPerPage,vt:"aj",q:sQuery})
},cutStr:function(sText){var oStr=nj.cutStr(sText,88,{jp:11,upper:8,lower:6,others:6,regTag:"b"});
return oStr.size>88?oStr.str+"...":oStr.str
},checkThumbType:function(oEntry,sSize){var sUrl="";
if(typeof oEntry["n$image"]!="undefined"){var sThumb=oEntry["n$image"] instanceof Array?oEntry["n$image"][0]["n$thumbnail"]["$t"]:oEntry["n$image"]["n$thumbnail"]["$t"];
if(/\?.*type=etc[123]/i.test(sThumb)){sUrl=sThumb.replace(/(\?.*)(type=etc[123])/i,"$1type=etc"+sSize)
}else{if(/.*\/r.[0-9]{2,3}x[0-9]{2,3}/i.test(sThumb)){sUrl=sThumb.replace(/(.*\/r.)([0-9]{2,3}x[0-9]{2,3})/i,"$1160x140")
}else{sUrl=sThumb.replace(/120\/120$/,"160/140")
}}}return sUrl
},getSize:function(oEntry){var oSize={};
if(oEntry["n$image"] instanceof Array){oSize.width=oEntry["n$image"][0]["n$source"]["width"];
oSize.height=oEntry["n$image"][0]["n$source"]["height"]
}else{oSize.width=oEntry["n$image"]["n$source"]["width"];
oSize.height=oEntry["n$image"]["n$source"]["height"]
}return oSize
},refineData:function(oEntry,sType,sSize,sNclkId){return{thumbUrl:this.checkThumbType(oEntry,sSize),shortSourceUrl:curtail(oEntry.link["$t"].replace(/^https?:\/\//,""),480),sourceUrl:oEntry.link["$t"],comment:oEntry.content["$t"],title:oEntry.title["$t"],nclkid:sNclkId}
},addHover:function(el,selectClass,hoverClass){return nj.hover(el,{enter:function(we,el){var wel=$Element(el);
if(!wel.hasClass(selectClass)){wel.addClass(hoverClass)
}},leave:function(we,el){var wel=$Element(el);
if(!wel.hasClass(selectClass)){wel.removeClass(hoverClass)
}}})
}};
var VO=$Class({$init:function(){this._preQuery="";
this._curQuery="";
this._bSearching=false;
this._page=0
},setQuery:function(sQuery){this._preQuery=this._curQuery;
this._curQuery=sQuery
},getQuery:function(){return this._curQuery
},setPage:function(nPage){this._page=nPage
},getPage:function(){return this._page
},isEmptyQuery:function(sQuery){var sNewQuery=$S(sQuery).trim().$value();
if(sNewQuery==""){return false
}else{this.setQuery(sNewQuery);
return true
}},isValidQuery:function(sQuery){var sNewQuery=$S(sQuery).trim().$value();
if(sNewQuery==""){return false
}else{this.setQuery(sNewQuery);
return true
}},isSearching:function(){return this._bSearching
},setSearching:function(bSearching){this._bSearching=bSearching
}});
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({$init:function(oConfig,fnCallback){this._initConfig(oConfig);
this._initCallback(fnCallback||{});
this._getElementRef();
this._initVariable();
this._initEvent()
},_initConfig:function(oConfig){this._config=new Config();
this.setConfig(oConfig)
},_initCallback:function(fnCallback){this._fnCompleted=fnCallback.completed||function(){};
this._fnError=fnCallback.error||function(){};
this._fnEmpty=fnCallback.empty||function(){};
this._fnSelected=fnCallback.selected||function(){};
this._fnPagemove=fnCallback.pagemove||function(){}
},_getElementRef:function(){this._elResult=$(this._config.id.result);
this._elPaging=$(this._config.id.paging)
},_initVariable:function(){this._oSearchData=null;
this._oEventRef=[];
this._vo=new VO();
this._nRequestCount=0
},_initEvent:function(){$Element(this._elResult).delegate("click").bind("."+this._config.style.EVENT,$Fn(this._onselect,this).bind())
},search:function(sQuery,fnStartCallback){if(this._vo.isSearching()){return false
}if(!this._vo.isValidQuery(sQuery)){return false
}fnStartCallback();
this._selectSearch()
},_selectSearch:function(){this._vo.setSearching(true);
fnPrivate.search(this._vo.getQuery(),{url:this._config.searchUrl,method:this._config.searchMethod,numPerPage:this._config.numPerPage,page:0,fn:$Fn(this._response,this).bind()})
},_response:function(oData){if(typeof oData=="boolean"||(oData instanceof Object&&typeof oData["n$options"]=="undefined")){if(this._nRequestCount==0){this._nRequestCount++;
this._selectSearch()
}else{this._nRequestCount=0;
this._vo.setSearching(false);
this._fnError()
}return 
}this._nRequestCount=0;
this._vo.setSearching(false);
if(oData["n$options"]["n$maxIndex"]["$t"]=="0"){this._fnEmpty();
return false
}else{this._oSearchData=oData;
this._makePage(oData)
}this._initPaging(oData["n$options"]["n$maxIndex"]["$t"]);
this._fnCompleted()
},_makePage:function(oData){this._removePageData();
this._addItem(oData)
},_searchPaging:function(nPage){if(this._vo.isSearching()){return 
}this._vo.setPage(nPage);
this._selectPagingSearch()
},_selectPagingSearch:function(){this._vo.setSearching(true);
fnPrivate.search(this._vo.getQuery(),{url:this._config.searchUrl,method:this._config.searchMethod,numPerPage:this._config.numPerPage,page:this._vo.getPage()-1,fn:$Fn(this._responsePaging,this).bind()})
},_responsePaging:function(oData){if(typeof oData=="boolean"||(oData instanceof Object&&typeof oData["n$options"]=="undefined")){if(this._nRequestCount==0){this._nRequestCount++;
this._selectPagingSearch()
}else{this._nRequestCount=0;
this._vo.setSearching(false);
alert(CONST.MSG.ERR_MSG)
}return 
}this._nRequestCount++;
oData.keyword=this._vo.getQuery();
this._oSearchData=oData;
this._makePagingPage(oData)
},_makePagingPage:function(oData){this._detachAll();
this._elResult.innerHTML="";
this._addItem(oData);
this._elPagingRef.setItemCount(oData["n$options"]["n$maxIndex"]["$t"]);
this._elPagingRef.movePageTo(this._vo.getPage());
this._vo.setSearching(false);
document.documentElement.scrollTop="0"
},_addItem:function(oData){var aEntryList=oData.entry;
this.nclkid="w";
try{var sType=oData.id["$t"];
if(sType){if(-1<sType.indexOf("Blog")){this.nclkid="g"
}else{if(-1<sType.indexOf("BBS")){this.nclkid="b"
}}}}catch(e){}if(aEntryList instanceof Array){$A(aEntryList).forEach(function(item,index){this._makeItem(item,index)
},this)
}else{this._makeItem(aEntryList,1)
}},_makeItem:function(oEntry,index){var elLi=$Element("<"+this._config.itemTag+">").attr("index",index).html(nj.replaceStr(CONST.template[this._config.type],fnPrivate.refineData(oEntry,this._config.type,CONST.PAGE.THUMB[this._config.thumbSize],this.nclkid))).$value();
if(!oEntry["n$image"]){var elThumb=$$.getSingle("> DIV.thumb",elLi);
elThumb.parentNode.removeChild(elThumb)
}this._elResult.appendChild(elLi);
this._oEventRef.push(fnPrivate.addHover(elLi,this._config.style.NODE_SELECT,this._config.style.HOVER))
},_onselect:function(wEvent){try{var t=this;
var welLI=$Element(this._findElement(wEvent.element));
if(welLI.hasClass(t._config.style.NODE_SELECT)){return 
}var sIndex=welLI.attr("index");
var oCacheData=this._oSearchData.entry;
var oEntry=(oCacheData instanceof Array?oCacheData[parseInt(sIndex)]:oCacheData);
oEntry.type=this._config.type;
oEntry.keyword=t._vo.getQuery();
oEntry.searchType=this._config.searchType;
this._fnSelected(oEntry,function(){welLI.addClass(t._config.style.NODE_SELECT)
})
}catch(e){window.status=e
}},_findElement:function(element){var parent=element;
do{if(parent.tagName.toUpperCase()==this._config.itemTag){break
}}while(parent=parent.parentNode);
return parent
},_removePageData:function(){this._detachAll();
this._elResult.innerHTML=""
},_detachAll:function(){$A(this._oEventRef).forEach(function(e){e.detachAll()
},this);
this._oEventRef.length=0
},_initPaging:function(nTotal){var t=this;
nTotal=parseInt(nTotal);
this._elPaging.style.display="block";
if(typeof this._elPagingRef=="undefined"){this._elPagingRef=new nhn.Pagination(this._elPaging.id,{item:nTotal,itemPerPage:this._config.numPerPage,pagePerPageList:10,page:1,moveUnit:"page",alignCenter:true,nclk:{attr:"NIP",code:this.nclkid+".page"}}).attach({loaded:function(e){t._fnPagemove()
},click:function(e){e.stop($Event.CANCEL_DEFAULT);
t._searchPaging(e.page)
}})
}else{this._elPagingRef.reset(nTotal)
}},clearCache:function(sQuery){this._oSearchData=null
},setConfig:function(oConfig){function f(sName,obj,oTarget){if(typeof obj[sName]=="object"){for(var sName2 in obj[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,obj[sName],oTarget[sName])
}}else{oTarget[sName]=obj[sName]
}}for(var p in oConfig){f(p,oConfig,this._config)
}}})
})("nj.mission.Searcher");
(function(namespace){var Config=$Class({type:"",id:{area:""},style:{EVENT:"_this",HOVER:"hover",NODE_SELECT:"selected"},node:{COUNT_START:"> DIV.mediaListHeader > P.count > SPAN._start",COUNT_SIZE:"> DIV.mediaListHeader > P.count > SPAN._size",COUNT_TOTAL:"> DIV.mediaListHeader > P.count > EM",LIST:"> UL",LEFT_ARROW:"> DIV.prevBtn",RIGHT_ARROW:"> DIV.nextBtn"},consts:{searchUrl:(typeof SEARCH_SERVER=="string"?SEARCH_SERVER:"http://search.naver.jp"),searchMethod:"jsonp",searchTimeout:5,requestLimit:2,itemTag:"LI",thumbSize:"MAX",minViewSize:6,heightOfArrow:53}});
var consts={template:{image:['<div class="thumb"><img src="#thumbUrl#" alt="" onload="resizeImage( this, 160, 140, #thumbWidth#, #thumbHeight# )" onerror="errorImage(this,\'noimg120\')" class="_this"><!--NIP=a:thumbnail--></div>','<div class="option">',"<span>#width#ｘ#height#</span>",'<span class="url"><a href="#sourceUrl#" target="_blank">#shortSourceUrl#</a><!--NIP=a:url--></span>',"</div>",'<button class="_this">選択</button><!--NIP=a:add-->'].join(""),video:['<div class="thumb">','<img src="#thumbUrl#" alt="" width="120" height="90" class="_this"><!--NIP=a:thumbnail-->','<span class="icoPlay _this"></span>','<span class="playTime _this">#playTime#</span>',"</div>",'<div class="option">','<h4><a href="#originalUrl#" target="_blank" title="#title#">#shortTitle#</a><!--NIP=a:title--></h4>','<span class="url"><a href="#sourceUrl#" target="_blank">#source#</a><!--NIP=a:url--></span>',"</div>",'<button class="_this">選択</button><!--NIP=a:add-->'].join("")},thumb:{MAX:"1",MID:"2",MIN:"3"},msg:{ERR_MSG:"一時的にご利用できません。"}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({$init:function(oConfig,fnCallback){this._initConfig(oConfig);
this._initCallback(fnCallback||{});
this._getElementRef();
this._initVariable();
this._initEvent()
},_initConfig:function(oConfig){this._config=new Config();
fnPrivate.setConfig(oConfig,this._config)
},_initCallback:function(fn){this._fnCompleted=fn.completed||function(){};
this._fnError=fn.error||function(){};
this._fnEmpty=fn.empty||function(){};
this._fnSelected=fn.selected||function(){};
this._fnCalcuSize=fn.size||function(){}
},_getElementRef:function(){this._elBase=$(this._config.id.area);
this._elCountStart=$$.getSingle(this._config.node.COUNT_START,this._elBase);
this._elCountSize=$$.getSingle(this._config.node.COUNT_SIZE,this._elBase);
this._elCountTotal=$$.getSingle(this._config.node.COUNT_TOTAL,this._elBase);
this._welResult=$Element($$.getSingle(this._config.node.LIST,this._elBase));
this._welLeftArrow=$Element($$.getSingle(this._config.node.LEFT_ARROW,this._elBase));
this._welRightArrow=$Element($$.getSingle(this._config.node.RIGHT_ARROW,this._elBase))
},_initVariable:function(){this._bIsMouseOver=false;
this._oBank={};
this._statusVO=new StatusVO();
this._initSize()
},_initSize:function(){var oSize=this._fnCalcuSize();
var nRealWidth=oSize.width-this._config.consts.emptyWidth-(this._config.consts.arrowWidth*2);
var nRealHeight=oSize.height-this._config.consts.paddingHeight;
var nCol=parseInt(nRealWidth/this._config.consts.entryWidth);
var nRow=parseInt(nRealHeight/this._config.consts.entryHeight);
var nCount=nRow*nCol;
this._welResult.css("marginLeft",parseInt((nRealWidth-(nCol*this._config.consts.entryWidth))/2)+"px");
this._statusVO.setViewSize(nCount<this._config.consts.minViewSize?this._config.consts.minViewSize:nCount);
this._statusVO.setArrowHeight(nRow*this._config.consts.entryHeight-this._config.consts.heightOfArrow)
},_initEvent:function(){var self=this;
this._welResult.delegate("click").bind("."+this._config.style.EVENT,$Fn(this.onSelect,this).bind());
this._refAreaHover=nj.hover(this._elBase,{enter:function(){self._bIsMouseOver=true
},leave:function(){self._bIsMouseOver=false
}});
this._initArrowEvent();
$Fn(this.onMouseWheel,this).attach(this._elBase,"mousewheel");
$Fn(this.onResize,this).attach(window,"resize")
},_initArrowEvent:function(){var self=this;
$Fn(this.onLeft,this).attach(this._welLeftArrow.$value(),"click");
$Fn(this.onRight,this).attach(this._welRightArrow.$value(),"click");
this._refLeftArrowHover=nj.hover(this._welLeftArrow.$value(),{enter:function(we,ele){var wel=$Element($$.getSingle("BUTTON",ele));
if(!wel.hasClass(self._config.style.HOVER)){wel.addClass(self._config.style.HOVER)
}},leave:function(we,ele){$Element($$.getSingle("BUTTON",ele)).removeClass(self._config.style.HOVER)
}});
this._refRightArrowHover=nj.hover(this._welRightArrow.$value(),{enter:function(we,ele){var wel=$Element($$.getSingle("BUTTON",ele));
if(!wel.hasClass(self._config.style.HOVER)){wel.addClass(self._config.style.HOVER)
}},leave:function(we,ele){$Element($$.getSingle("BUTTON",ele)).removeClass(self._config.style.HOVER)
}})
},_setCount:function(nStart,nSize,nTotal){this._elCountStart.innerHTML=fnMatome.addComma(nStart,3);
this._elCountSize.innerHTML=fnMatome.addComma(nSize>nTotal?nTotal:nSize,3);
this._elCountTotal.innerHTML=fnMatome.addComma(nTotal,3)
},onMouseWheel:function(wEvent){if(this._bIsMouseOver){if(wEvent.mouse().delta>=0){this.onLeft()
}else{this.onRight()
}}},onResize:function(wEvent){if(this._oBank[this._statusVO.getQuery()]==null){return 
}this._initSize();
this._initArrowHeight();
var nGap=this._statusVO.calcuGap();
if(nGap==0){return 
}this._statusVO.setReadSize(this._statusVO.getViewSize());
if(nGap>0){if(this._hasData()){this._addItem()
}else{this._search()
}}else{this._controlElementView($$("LI",this._welResult.$value()))
}},onLeft:function(wEvent){if(!this._statusVO.hasPrev()){return 
}var nPrevStart=this._statusVO.getStart()-this._statusVO.getViewSize();
nPrevStart=nPrevStart<0?0:nPrevStart;
this._statusVO.setStart(nPrevStart);
this._search()
},onRight:function(wEvent){if(!this._statusVO.hasNext()){return 
}var nNextStart=this._statusVO.getStart()+this._statusVO.getViewSize();
this._statusVO.setStart(nNextStart);
this._search()
},search:function(sQuery,fnStartCallback){if(this._statusVO.isSearching()||!this._statusVO.isValidQuery(sQuery)){return false
}(fnStartCallback||function(){})();
this._statusVO.setStart(0);
this._clearHTML();
this._search()
},_search:function(){if(this._statusVO.isSearching()){return false
}this._statusVO.setSearching(true);
fnPrivate.search({url:this._config.consts.searchUrl,method:this._config.consts.searchMethod,timeout:this._config.consts.searchTimeout,query:this._statusVO.getQuery(),start:this._statusVO.getStart(),viewSize:this._statusVO.getViewSize()},{success:$Fn(this._onResponse,this).bind(),fail:$Fn(this._onResponseFail,this).bind()})
},_onResponse:function(oData){if(oData instanceof Object&&typeof oData["n$options"]=="undefined"){this._onResponseFail();
this._statusVO.setSearching(false);
return 
}var nTotal=parseInt(oData["n$options"]["n$maxIndex"]["$t"]||0);
if(nTotal==0){this._setCount(0,0,0);
this._fnEmpty();
this._statusVO.setSearching(false);
return false
}else{this._statusVO.setTotal(nTotal);
this._statusVO.setSearchTotal(parseInt(oData["n$totalItems"]["$t"]||0));
this._addSearchData(oData);
this._addItem();
this._fnCompleted()
}this._statusVO.setZeroRequestCount();
this._statusVO.setSearching(false)
},_onResponseFail:function(){if(this._statusVO.isLimitCount(this._config.consts.requestLimit)){this._search()
}else{this._statusVO.setSearching(false);
this._fnError()
}},_addSearchData:function(oData){var sQuery=this._statusVO.getQuery();
var nStart=this._statusVO.getStart();
var aResponseData=(oData.entry instanceof Array)?oData.entry:[oData.entry];
var nReadSize=aResponseData.length;
this._statusVO.setReadSize(nReadSize);
if(this._oBank[sQuery]==null){this._oBank[sQuery]=[]
}for(var i=0;
i<nReadSize;
i++){this._oBank[sQuery][i+nStart]=aResponseData[i]
}},_addItem:function(){var nReadSize=this._statusVO.getReadSize();
var aNodeList;
for(var i=0;
i<nReadSize;
i++){aNodeList=$$(this._config.consts.itemTag,this._welResult.$value());
this._makeItem(aNodeList,i)
}this._controlElementView(aNodeList)
},_makeItem:function(aNodeList,nIndex){if(typeof aNodeList[nIndex]=="undefined"){this._makeNewElement(nIndex)
}else{this._replaceOldElement(aNodeList,nIndex)
}},_makeNewElement:function(nIndex){var oEntry=this._oBank[this._statusVO.getQuery()][nIndex];
if(!oEntry){return 
}var element=$Element("<"+this._config.consts.itemTag+">").attr("index",nIndex).html(nj.replaceStr(consts.template[this._config.type],fnPrivate.refineData(oEntry,this._config.type,consts.thumb[this._config.consts.thumbSize]))).$value();
this._welResult.$value().appendChild(element);
fnPrivate.addHover(element,this._config.style.NODE_SELECT,this._config.style.HOVER);
$Element(element).show()
},_replaceOldElement:function(aNodeList,nIndex){var element=aNodeList[nIndex];
element.setAttribute("index",""+(nIndex+this._statusVO.getStart()));
var oEntry=fnPrivate.refineData(this._oBank[this._statusVO.getQuery()][nIndex+this._statusVO.getStart()],this._config.type,consts.thumb[this._config.consts.thumbSize]);
if(!oEntry){return 
}var sMethod=(this._config.type=="image"?"_updateImageNode":"_updateVideoNode");
this[sMethod](element,oEntry,nIndex)
},_updateImageNode:function(element,oEntry,nIndex){$Element(element).removeClass(this._config.style.NODE_SELECT);
var elImg=$$.getSingle("> DIV.thumb > IMG",element);
var elThumb=elImg.parentNode;
var elResolution=$$.getSingle("> DIV.option > SPAN:first-of-type",element);
var elUrl=$$.getSingle("> DIV.option > SPAN.url > A",element);
elThumb.removeChild(elImg);
elThumb.innerHTML='<img src="'+oEntry.thumbUrl+'" alt="" onload="resizeImage( this, 160, 140, '+oEntry.thumbWidth+", "+oEntry.thumbHeight+' )" onerror="errorImage(this,\'noimg120\')" class="_this">';
elResolution.innerHTML=oEntry.width+" x "+oEntry.height;
elUrl.href=oEntry.sourceUrl;
elUrl.innerHTML=oEntry.shortSourceUrl
},_updateVideoNode:function(element,oEntry,nIndex){$Element(element).removeClass(this._config.style.NODE_SELECT);
var elImg=$$.getSingle("> DIV.thumb > IMG",element);
var elPlayTime=$$.getSingle("> DIV.thumb > SPAN.playTime",element);
var elTitle=$$.getSingle("> DIV.option > H4 > A",element);
var elUrl=$$.getSingle("> DIV.option > SPAN.url > A",element);
element.setAttribute("index",""+(nIndex+this._statusVO.getStart()));
elImg.src=oEntry.thumbUrl;
elPlayTime.innerHTML=oEntry.playTime;
elTitle.href=oEntry.originalUrl;
elTitle.setAttribute("title",oEntry.title);
elTitle.innerHTML=oEntry.shortTitle;
elUrl.href=oEntry.sourceUrl;
elUrl.innerHTML=oEntry.source
},_controlElementView:function(aNodeList){var self=this;
var nReadSize=this._statusVO.getReadSize();
setTimeout(function(){$A(aNodeList).forEach(function(element,index){if(index<nReadSize){$Element(element).show()
}else{$Element(element).hide()
}},self)
},0);
var nStart=this._statusVO.getStart();
this._setCount(nStart+1,nStart+this._statusVO.getReadSize(),this._statusVO.getSearchTotal());
this._controlArrow()
},_controlArrow:function(){if(this._statusVO.hasPrev()){this._welLeftArrow.show()
}else{this._welLeftArrow.hide()
}if(this._statusVO.hasNext()){this._welRightArrow.show()
}else{this._welRightArrow.hide()
}this._initArrowHeight()
},_initArrowHeight:function(){this._welLeftArrow.css("height",this._statusVO.getArrowHeight()+"px");
this._welRightArrow.css("height",this._statusVO.getArrowHeight()+"px")
},_hasData:function(){var aData=this._oBank[this._statusVO.getQuery()];
if(aData.length>=this._statusVO.getStart()+this._statusVO.getViewSize()){return true
}else{return false
}},_clearHTML:function(){this._welResult.html("")
},onSelect:function(wEvent){try{var self=this;
var welLI=$Element(fnPrivate.findElement(wEvent.element,this._config.consts.itemTag));
if(welLI.hasClass(this._config.style.NODE_SELECT)){return 
}var oEntry=this._oBank[this._statusVO.getQuery()][parseInt(welLI.attr("index"))];
oEntry.type=this._config.type;
oEntry.keyword=this._statusVO.getQuery();
this._fnSelected(oEntry,function(){welLI.addClass(self._config.style.NODE_SELECT)
})
}catch(e){window.status=e
}}});
var fnPrivate={search:function(option,fn){new $Ajax(option.url,{type:option.method,method:"GET",timeout:option.timeout||5,onload:function(oRes){fn.success(oRes.json())
},ontimeout:function(){fn.fail(false)
}}).request({start:""+(option.start+1),display:option.viewSize,vt:"aj",q:option.query})
},cutStr:function(sText,nSize){var oStr=nj.cutStr(sText,nSize,{jp:11,upper:8,lower:6,others:6,regTag:"b"});
return oStr.size>88?oStr.str+"...":oStr.str
},checkThumbType:function(oEntry,sSize,sType){var sUrl="";
if(typeof oEntry["n$image"]!="undefined"){var sThumb=oEntry["n$image"] instanceof Array?oEntry["n$image"][0]["n$thumbnail"]["$t"]:oEntry["n$image"]["n$thumbnail"]["$t"];
if(sType=="video"){sUrl=sThumb
}else{if(/\?.*type=etc[123]/i.test(sThumb)){sUrl=sThumb.replace(/(\?.*)(type=etc[123])/i,"$1type=etc"+sSize)
}else{if(/.*\/r.[0-9]{2,3}x[0-9]{2,3}/i.test(sThumb)){sUrl=sThumb.replace(/(.*\/r.)([0-9]{2,3}x[0-9]{2,3})/i,"$1160x140")
}else{sUrl=sThumb.replace(/120\/120$/,"160/140")
}}}}return sUrl
},getSize:function(oEntry){var oSize={};
if(oEntry["n$image"] instanceof Array){oSize.width=oEntry["n$image"][0]["n$source"]["width"];
oSize.height=oEntry["n$image"][0]["n$source"]["height"];
oSize.thumbWidth=oSize.width;
oSize.thumbHeight=oSize.height
}else{oSize.width=oEntry["n$image"]["n$source"]["width"];
oSize.height=oEntry["n$image"]["n$source"]["height"];
oSize.thumbWidth=oEntry["n$image"]["n$thumbnail"]["width"];
oSize.thumbHeight=oEntry["n$image"]["n$thumbnail"]["height"]
}return oSize
},refineData:function(oEntry,sType,sSize){var oSize;
if(sType=="image"){oSize=this.getSize(oEntry)
}if(oEntry["n$pgroupUrl"]&&oEntry["n$pgroupUrl"]["$t"]&&/^http:\/\//i.test(oEntry["n$pgroupUrl"]["$t"])==false){oEntry["n$pgroupUrl"]["$t"]="http://"+oEntry["n$pgroupUrl"]["$t"]
}return(sType=="image"?{thumbUrl:this.checkThumbType(oEntry,sSize,sType),originalUrl:oEntry.link["$t"],shortSourceUrl:this.cutStr(oEntry["n$pgroupUrl"]["$t"],143),sourceUrl:oEntry["n$pgroupUrl"]["$t"],width:oSize.width,height:oSize.height,thumbWidth:oSize.thumbWidth,thumbHeight:oSize.thumbHeight}:{thumbUrl:this.checkThumbType(oEntry,sSize,sType),originalUrl:oEntry.link["$t"],sourceUrl:oEntry["n$siteUrl"]["$t"],source:oEntry["n$siteName"]["$t"],title:oEntry.title["$t"].replace(/<\/?b>/ig,""),shortTitle:this.cutStr(oEntry.title["$t"],88),playTime:oEntry["n$playTime"]["$t"]})
},addHover:function(el,selectClass,hoverClass){return nj.hover(el,{enter:function(we,el){var wel=$Element(el);
if(!wel.hasClass(selectClass)){wel.addClass(hoverClass)
}},leave:function(we,el){var wel=$Element(el);
if(!wel.hasClass(selectClass)){wel.removeClass(hoverClass)
}}})
},findElement:function(element,sTag){var parent=element;
do{if(parent.tagName.toUpperCase()==sTag){break
}}while(parent=parent.parentNode);
return parent
},setConfig:function(oSource,oDest){function f(sName,oSource,oTarget){if(typeof oSource[sName]=="object"){for(var sName2 in oSource[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,oSource[sName],oTarget[sName])
}}else{oTarget[sName]=oSource[sName]
}}for(var p in oSource){f(p,oSource,oDest)
}}};
var StatusVO=$Class({$init:function(){this._sPreQuery="";
this._sCurQuery="";
this._bIsRunning=false;
this._nStart=1;
this._nSize=0;
this._nPreViewSize=0;
this._nViewSize=0;
this._nRequestCount=0;
this._nTotal=0;
this._nSearchTotal=0;
this._nReadSize=0;
this._nArrowHeight=0
},setArrowHeight:function(n){this._nArrowHeight=n
},getArrowHeight:function(){return this._nArrowHeight
},setReadSize:function(n){this._nReadSize=n
},getReadSize:function(){return this._nReadSize
},setSearchTotal:function(n){this._nSearchTotal=n
},getSearchTotal:function(){return this._nSearchTotal
},setTotal:function(n){this._nTotal=n
},getTotal:function(){return this._nTotal
},setViewSize:function(n){this._nPreViewSize=this._nViewSize;
this._nViewSize=n
},getViewSize:function(){return this._nViewSize
},calcuGap:function(){return this._nViewSize-this._nPreViewSize
},setQuery:function(s){this._sPreQuery=this._sCurQuery;
this._sCurQuery=s
},getQuery:function(){return this._sCurQuery
},setZeroRequestCount:function(){this._nRequestCount=0
},isLimitCount:function(n){if(this._nRequestCount+1>=n){this._nRequestCount=0;
return true
}else{this._nRequestCount++;
return false
}},setStart:function(n){this._nStart=n
},getStart:function(){return this._nStart
},setSize:function(n){this._nSize=n
},getSize:function(){return this._nSize
},isSearching:function(){return this._bIsRunning
},setSearching:function(b){this._bIsRunning=b
},isValidQuery:function(s){var sNewQuery=fnMatome.trim(s);
if(sNewQuery!=""){this.setQuery(sNewQuery);
return true
}return false
},hasNext:function(){return(this._nStart+this._nViewSize>=this._nTotal)?false:true
},hasPrev:function(){return this._nStart==0||this._nReadSize==0?false:true
}})
})("nj.mission.ScrollSearcher");
(function(namespace){var config={addedList:"addList",NODE:{THUMB_PARENT:"> DIV.thumb",THUMB:"> DIV.thumb > IMG",TITLE:"> DIV.listContents > H3 > A",COMMENT:"> DIV.listContents > P",URL:"> DIV.listContents > DIV.option > SPAN > A"},MSG:{DELETE_ERR:"一時的にご利用できません。",DELETE:"削除しますか？"},TEMPLATE:{video:['<div class="thumb">','<img height="51" width="51" alt="" src="#thumbnailUrl#"/>','<button class="btnEdit _modifyThis">編集</button><!--NIP=a:edit,r:#ordernum#-->','<button class="btnDel _deleteThis">削除</button><!--NIP=a:delete,r:#ordernum#-->',"</div>",'<div class="listContents">','<h3><a href="#endUrl#" target="_blank">#shortTitle#</a><!--NIP=a:itemtitle,r:#ordernum#--></h3>',"<p>#shortComment#</p>",'<div class="option">','<span class="time">#playTime#</span>','<span class="source"><a href="#url#" target="_blank">#source#</a><!--NIP=a:url,r:#ordernum#--></span>',"</div>","</div>"].join(""),other:["<!--NE=a:lnk_ame-->",'<div class="thumb">','<img height="51" width="51" alt="" src="#thumbnailUrl#"/>','<button class="btnEdit _modifyThis">編集</button><!--NIP=a:edit,r:#ordernum#-->','<button class="btnDel _deleteThis">削除</button><!--NIP=a:delete,r:#ordernum#-->',"</div>",'<div class="listContents">','<h3><a href="#endUrl#" target="_blank">#shortTitle#</a><!--NIP=a:itemtitle,r:#ordernum#--></h3>',"<p>#shortComment#</p>",'<div class="option">','<span class="url"><a href="#sourceUrl#" target="_blank">#shortUrl#</a><!--NIP=a:url,r:#ordernum#--></span>',"</div>","</div>"].join("")},URL:"/content.ajax"};
var COMMON={sendServer:function(oData,fn){new $Ajax(config.URL,{timeout:5,onload:function(oRes){fn(oRes.json())
},ontimeout:function(){fn({result:false})
}}).request(oData)
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(fnCallback){this._initCallback(fnCallback||{});
this._getElementRef();
this._initEvent();
this._paginger=nj.mission.Paginger;
this._paginger.init(this._welList.$value())
},_initCallback:function(fnCallback){this._fnEdit=fnCallback.edit||function(){};
this._fnDeleted=fnCallback.deleted||function(){}
},_getElementRef:function(){this._welList=$Element(config.addedList);
this._cache=jCache(jCache.TYPE.ONE).init()
},_initEvent:function(){this._welList.delegate("click").bind("._deleteThis",$Fn(this._deleteElement,this).bind());
this._welList.delegate("click").bind("._modifyThis",$Fn(this._modifyElement,this).bind())
},_getTemplate:function(sType){return config.TEMPLATE[sType=="video"?sType:"other"]
},addElement:function(oData,fn){if($(oData.contentId)){this._modify(oData)
}else{var nLen=this._paginger.length();
this._paginger.beforeAdd();
this._cache.add(oData.contentId,oData);
var sTemplate=this._getTemplate(oData.type);
oData.shortUrl=curtail(oData.sourceUrl,200);
oData=this._setCutStr(oData);
oData=this._escapeHTML(oData);
oData.ordernum=nLen+1;
var welLI=$Element("<LI>").html(this._checkThumb(oData.thumbnailUrl||"",nj.replaceStr(sTemplate,oData))).attr("id",oData.contentId);
welLI.opacity(0);
this._welList.append(welLI);
welLI.appear(0.5)
}},_modify:function(oData){this._cache.add(oData.contentId,oData);
this._setData(oData)
},_setCutStr:function(oData){oData.shortTitle=curtail(oData.title,242);
oData.shortComment=curtail(oData.comment,484);
return oData
},_escapeHTML:function(oData){oData.shortTitle=$S(curtail(oData.title,242)).escapeHTML();
oData.shortComment=$S(curtail(oData.comment,484)).escapeHTML();
return oData
},_setData:function(oData){var el=$(oData.contentId);
oData=this._setCutStr(oData);
oData=this._escapeHTML(oData);
$$.getSingle(config.NODE.TITLE,el).innerHTML=oData.shortTitle;
$$.getSingle(config.NODE.COMMENT,el).innerHTML=oData.shortComment;
if(oData.type=="site"){var elThumb=$$.getSingle(config.NODE.THUMB,el);
if(oData.thumbnailUrl==""){if(elThumb){elThumb.parentNode.removeChild(elThumb)
}}else{if(elThumb){elThumb.src=oData.thumbnailUrl
}else{var oImg=$("<IMG>");
oImg.src=oData.thumbnailUrl;
oImg.height=51;
oImg.width=51;
$Element(oImg).prependTo($Element($$.getSingle(config.NODE.THUMB_PARENT,el)))
}}}$Element(el).hide().show()
},_checkThumb:function(sThumb,str){return sThumb==""?str.replace(/<img[^>]*\/>/,""):str
},_deleteElement:function(wEvent){if(!confirm(config.MSG.DELETE)){return 
}var sContentId=wEvent.element.parentNode.parentNode.id;
COMMON.sendServer({m:"delete","content.contentId":sContentId},$Fn(this._deleteResponse,this).bind())
},_deleteResponse:function(oData,contentId){if(oData.result){this._cache.remove(oData.contentId);
$Element(oData.contentId).leave();
this._paginger.removed();
this._fnDeleted(this._paginger.length(),oData.contentId)
}else{alert(config.MSG.DELETE_ERR)
}},_modifyElement:function(wEvent){var el=wEvent.element.parentNode.parentNode;
this._fnEdit(this._cache.get(el.id))
}}
})("nj.mission.AddedList");
(function(namespace){var config={pagingerId:"sPageNate",numPerPage:5,NODE:{TOTAL:"> SPAN",CURRENT:"> STRONG",PREV:"> A:first-of-type",NEXT:"> A:last-of-type"}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={_curPage:1,init:function(elList,oConfig){this._elList=elList;
this.setConfig(oConfig||{});
this._getElementRef();
this._initEvent()
},_getElementRef:function(){this._paginger=$Element(config.pagingerId);
var elBase=this._paginger.$value();
this._elTotal=$$.getSingle(config.NODE.TOTAL,elBase);
this._elCurrent=$$.getSingle(config.NODE.CURRENT,elBase);
this._elPrev=$$.getSingle(config.NODE.PREV,elBase);
this._elNext=$$.getSingle(config.NODE.NEXT,elBase)
},_initEvent:function(){$Fn(this._goPrev,this).attach(this._elPrev,"click");
$Fn(this._goNext,this).attach(this._elNext,"click")
},length:function(){return this._getList().length
},beforeAdd:function(){var aList=this._getList();
this._curPage=this.calcuTotal(aList.length+1);
this.setPage(this._curPage,this._curPage)._refresh(aList)
},removed:function(){var nMax=this.calcuTotal(this.length());
var nCur=this._curPage;
if(nCur>nMax){nCur=nMax
}this._curPage=nCur;
this.setPage(nMax,nCur)._refresh()
},calcuTotal:function(nLen){return parseInt(nLen/config.numPerPage)+(nLen%config.numPerPage==0?0:1)
},setPage:function(nTotal,nCur){this._total(nTotal)._current(nCur);
return this
},_getList:function(){return $$("> LI",this._elList)
},_current:function(nCur){this._elCurrent.innerHTML=nCur;
return this
},_total:function(nTotal){this._elTotal.innerHTML=nTotal;
return this
},_goPrev:function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
if(this._curPage==1){return 
}this._current(--this._curPage)._refresh();
try{nclkChangeRank(wEvent.currentElement,this._curPage)
}catch(e){}},_goNext:function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
var aList=this._getList();
var nLen=aList.length;
var nMaxPage=this.calcuTotal(nLen);
if(this._curPage==nMaxPage){return 
}this._current(++this._curPage)._refresh(aList);
try{nclkChangeRank(wEvent.currentElement,this._curPage)
}catch(e){}},_refresh:function(aList){aList=aList||this._getList();
var nPage=this._curPage;
$A(aList).forEach(function(element,index){if(index>=((nPage-1)*config.numPerPage)&&index<=(nPage*config.numPerPage)-1){element.style.display="block"
}else{element.style.display="none"
}})
},setConfig:function(oConfig){function f(sName,obj,oTarget){if(typeof obj[sName]=="object"){for(var sName2 in obj[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,obj[sName],oTarget[sName])
}}else{oTarget[sName]=obj[sName]
}}for(var p in oConfig){f(p,oConfig,config)
}}}
})("nj.mission.Paginger");
mFilter={reg:/https?:\/\/([^\/]*)/,_buildVeoh:function(site,n,url){try{var t=site.ht;
var th="";
var _s=url.split("/");
if(!_s){return 
}var uid=_s[_s.length-1];
t=t.replace(/<<0>>/g,uid);
return{url:"http://"+n,html:t,thumb:th,name:site.n,width:site.w,height:site.h}
}catch(e){return false
}},html:function(url){if(!this.reg.test(url)){return false
}var n=this.reg.exec(url)[1];
if(/youtube/.test(n)){n="youtube.com"
}var site=this[n];
if(typeof site=="undefined"){return false
}var r=site.r.exec(url),a=[];
if(!r){return false
}if(n=="www.veoh.com"){return this._buildVeoh(site,n,url)
}for(var i=1;
i<r.length;
i++){a[i-1]=r[i]
}var t=site.ht;
for(i=0;
i<a.length;
i++){t=t.replace(new RegExp("<<"+i+">>","g"),a[i])
}var th=site.th||"";
for(i=0;
i<a.length;
i++){th=th.replace(new RegExp("<<"+i+">>","g"),a[i])
}return{url:"http://"+n,html:t,thumb:th,name:site.n,width:site.w,height:site.h}
},"youtube.com":{r:/(?:http:\/\/)?.*youtube.com\/(?:watch\?v=|v\/)(.{11})/,n:"YouTube",w:425,h:344,th:"http://i.ytimg.com/vi/<<0>>/default.jpg",ht:'<object width="425" height="344" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="movie" value="http://www.youtube.com/v/<<0>>&hl=ja&fs=1" /><param name="allowFullScreen" value="true" /><param name="wmode" value="transparent"/><embed wmode="transparent" src="http://www.youtube.com/v/<<0>>&hl=ja&fs=1" type="application/x-shockwave-flash" allowfullscreen="true" width="425" height="344"></embed></object>'},"video.yahoo.com":{r:/(?:http:\/\/)?video.yahoo.com\/watch\/(.*)\/(.*)/,n:"Yahoo! Video",w:512,h:322,ht:'<object width="512" height="322" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="movie" value="http://d.yimg.com/static.video.yahoo.com/yep/YV_YEP.swf?ver=2.2.18.2" /><param name="flashVars" value="id=<<1>>&vid=<<0>>&lang=en-us&intl=us&embed=1" /><param name="allowFullScreen" value="true" /><param name="wmode" value="transparent"/><embed wmode="opaque" src="http://d.yimg.com/static.video.yahoo.com/yep/YV_YEP.swf?ver=2.2.18.2" type="application/x-shockwave-flash" width="512" height="322" allowFullScreen="true" AllowScriptAccess="always" bgcolor="#000000" flashVars="id=<<1>>&vid=<<0>>&lang=en-us&intl=us&embed=1" ></embed></object>'},"video.ask.jp":{r:/(?:http:\/\/)?video.ask.jp\/watch\.do\?v=(.*)/,n:"Askビデオ",w:488,h:485,ht:'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="488" height="485" id="decowaku-<<0>>"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="wmode" value="opaque"/><param name="movie" value="http://media.video.ask.jp/vcaster/player/decowaku_big.swf?vendor_id=c959cb7e-6549-102a-b11a-00163583b58a&video_id=1e06ba67-634a-4dd6-bbfc-74927abfe3f7&l=156&playDiv=e&logoFlg=Y" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><embed wmode="opaque" src="http://media.video.ask.jp/vcaster/player/decowaku_big.swf?vendor_id=c959cb7e-6549-102a-b11a-00163583b58a&video_id=1e06ba67-634a-4dd6-bbfc-74927abfe3f7&l=156&playDiv=e&logoFlg=Y" quality="high" bgcolor="#ffffff" width="488" height="485" name="decowaku-<<0>>" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>'},"vids.myspace.com":{r:/(?:http:\/\/)?vids.myspace.com\/index\.cfm\?fuseaction=.*=(.*)/,n:"MySpaceTV Videos",w:425,h:360,ht:'<object width="425" height="360" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"><param name="allowFullScreen" value="true"/><param name="wmode" value="opaque"/><param name="movie" value="http://mediaservices.myspace.com/services/media/embed.aspx/m=<<0>>,t=1,mt=video"/><embed wmode="opaque" src="http://mediaservices.myspace.com/services/media/embed.aspx/m=<<0>>,t=1,mt=video" width="425" height="360" allowFullScreen="true" type="application/x-shockwave-flash"></embed></object>'},"www.stickam.jp":{r:/(?:http:\/\/)?www.stickam.jp\/video\/(.*)/,n:"Stickam Japan",w:320,h:240,ht:'<embed wmode="opaque" src="http://player.stickam.jp/player/mediaPlayer/<<0>>-ja" type="application/x-shockwave-flash" scale="noscale" allowFullScreen="true" width="320" height="240" allowScriptAccess="always"></embed>'},"clipcast.jp":{r:/(?:http:\/\/)?clipcast.jp\/v\/(.*)/,n:"ClipCast2",w:425,h:400,th:"http://convertor.clipcast.jp/mediastudio/player/thumbnail/index.php?id=<<0>>&s=5&size=l",ht:'<object width="425" height="400" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"><param value="http://clipcast.jp/player/player.swf?id=<<0>>&v=blog2" name="movie"/><param name="allowScriptAccess" value="always"/><param name="wmode" value="opaque"/><param name="allowFullScreen" value="true"/><embed wmode="opaque" width="425" height="400" type="application/x-shockwave-flash" allowScriptAccess="always" allowFullScreen="true" src="http://clipcast.jp/player/player.swf?id=<<0>>&v=blog2"/></object>'},"www.metacafe.com":{r:/(?:http:\/\/)?www.metacafe.com\/watch\/(.*)\/.+/,n:"Metacafe",w:400,h:345,ht:'<embed src="http://www.metacafe.com/fplayer/<<0>>/tsunami_live.swf" width="400" height="345" wmode="transparent" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"> </embed>'},"cliplife.jp":{r:/(?:http:\/\/)?cliplife.jp\/clip\/\?content_id=(.*)/,n:"ClipLife",w:480,h:390,th:"http://img.cliplife.jp/still/120x90/<<0>>/1.jpg",ht:'<object width="480" height="390" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param value="always" name="allowScriptAccess"/><param name="wmode" value="opaque"/><param value="http://cliplife.jp/img/player_main_03.swf" name="movie"/><param value="high" name="quality"/><param value="#ffffff" name="bgcolor"/><param value="server=stream.cliplife.jp&amp;portal=cliplife.jp&amp;content=<<0>>&amp;type=clip" name="FlashVars"/><embed wmode="opaque" width="480" height="390" flashvars="server=stream.cliplife.jp&amp;portal=cliplife.jp&amp;content=<<0>>&amp;type=clip" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowscriptaccess="always" bgcolor="#ffffff" quality="high" src="http://cliplife.jp/img/player_main_03.swf"/></object>'},"www.watchme.tv":{r:/(?:http:\/\/)?www.watchme.tv\/v\/\?mid=(.*)/,n:"ワッチミーTV",w:340,h:300,th:"http://www.watchme.tv/n/b/0b/v/<<0>>/sample_1.jpg",ht:'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="external<<0>>" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,115,0" width="340" height="300" align="middle"><param name="movie" value="http://www.watchme.tv/p/video_output.swf?mid=<<0>>"></param><param name="allowScriptAccess" value="always" /><param name="wmode" value="opaque"/><embed wmode="opaque" src="http://www.watchme.tv/p/video_output.swf?mid=<<0>>" type="application/x-shockwave-flash" width="340" height="300" allowScriptAccess="always"></embed></object>'},"eyevio.jp":{r:/(?:http:\/\/)?eyevio.jp\/movie\/(.*)/,n:"eyeVio",w:400,h:330,ht:'<iframe src="http://eyevio.jp/embed.do?movieId=<<0>>&amp;width=400&amp;height=330" style="margin: 0px; width: 400px; height: 330px;" frameborder="0" scrolling="no" allowtransparency="true"></iframe>'},"media.putfile.com":{r:/(?:http:\/\/)?media.putfile.com\/(.*)\?pos=home/,n:"Putfile",w:420,h:349,ht:'<object type="application/x-shockwave-flash" data="http://feat.putfile.com/flow/putfile.swf?videoFile=<<0>>" width="420" height="349"><param name="movie" value="http://feat.putfile.com/flow/putfile.swf?videoFile=<<0>>" /><param name="quality" value="high" /><param name="bgcolor" value="#000000"/><param name="allowFullScreen" value="true" /><param name="wmode" value="opaque"/><param name="allowScriptAccess" value="always" /><embed wmode="opaque" src="http://feat.putfile.com/flow/putfile.swf?videoFile=<<0>>" bgcolor="#000000" allowFullScreen="true" allowScriptAccess="always" width=280 height=237></embed></object>'},"www.stickam.com":{r:/(?:http:\/\/)?www.stickam.com\/viewMedia\.do\?mId=(.*)/,n:"Stickam Japan",w:400,h:300,ht:'<embed wmode="opaque" src="http://player.stickam.com/flashVarMediaPlayer/<<0>>" type="application/x-shockwave-flash" scale="noscale" allowFullScreen="true" width="400" height="300" allowScriptAccess="always"></embed>'},"www.spike.com":{r:/(?:http:\/\/)?www.spike.com\/video\/chinese-people\/(.*)/,n:"SPIKE",w:448,h:365,th:"http://img1.ifilmpro.com/resize/image/stills/films/resize/istd/<<0>>.jpg?width=130",ht:'<embed wmode="opaque" width="448" height="365" src="http://www.spike.com/efp" quality="high" bgcolor="000000" name="efp" align="middle" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="flvbaseclip=<<0>>&" allowfullscreen="true"> </embed>'},"www.veoh.com":{r:/(?:http:\/\/)?www.veoh.com\/(videos|browse|collection)\/(.*)/,n:"Veoh Online videos",w:540,h:438,ht:'<object id="reftest"  name="ssss" width="540" height="438" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"><param name="movie" value="http://www.veoh.com/veohplayer.swf?permalinkId=<<0>>&id=anonymous&player=videodetailsembedded&affiliateId=&videoAutoPlay=0"></param><param name="wmode" value="transparent"></param><embed wmode="opaque" src="http://www.veoh.com/veohplayer.swf?permalinkId=<<0>>&id=anonymous&player=videodetailsembedded&affiliateId=&videoAutoPlay=0" allowFullScreen="true" width="540" height="438" bgcolor="#FFFFFF" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object>'},"tv.mofile.com":{r:/(?:http:\/\/)?tv.mofile.com\/(.*)\//,n:"Mofile",w:480,h:409,ht:'<object width="480" height="409" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="allowScriptAccess" value="always"/><param name="movie" value="http://tv.mofile.com/cn/xplayer.swf"/><param name="FlashVars" value="v=<<0>>&autoplay=1&nowSkin=1_1"/><param name="wmode" value="transparent"><embed src="http://tv.mofile.com/cn/xplayer.swf" FlashVars="v=<<0>>&autoplay=1&nowSkin=1_1" width="480" height="409" allowScriptAccess="always" wmode="transparent" type="application/x-shockwave-flash"/></object>'},"www.jumpcut.com":{r:/(?:http:\/\/)?www.jumpcut.com\/view\?id=(.*)/,n:"Jumpcut",w:408,h:324,ht:'<embed wmode="opaque" src="http://www.jumpcut.com/media/flash/jump.swf?id=<<0>>&asset_type=movie&asset_id=<<0>>&eb=1" width="408" height="324" type="application/x-shockwave-flash"></embed>'},"www.livevideo.com":{r:/(?:http:\/\/)?www.livevideo.com\/video.*\/(.*)\/.*.aspx/,n:"LiveVideo.com",w:445,h:369,ht:'<object width="445" height="369" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="allowScriptAccess" value="always"/><param name="movie" value="http://www.livevideo.com/flvplayer/embed/<<0>>&autoStart=0"/><param name="wmode" value="transparent"><embed src="http://www.livevideo.com/flvplayer/embed/<<0>>&autoStart=0" type="application/x-shockwave-flash" quality="high" width="445" height="369" wmode="transparent"></embed></object>'},"anime.mangaspot.com":{r:/(?:http:\/\/)?anime.mangaspot.com\/.*\/(.*)\.htm/,n:"MangaSpot",w:428,h:352,th:"http://px2.vidiac.com/thumbs/<<0>>.jpg",ht:'<object width="428" height="352" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="allowScriptAccess" value="always"/><param name="movie" value="http://anime.mangaspot.com/vidiac.swf"/><param name="FlashVars" value="video=<<0>>"/><param name="wmode" value="transparent"><embed wmode="opaque" src="http://anime.mangaspot.com/vidiac.swf" FlashVars="video=<<0>>" quality="high" bgcolor="#ffffff" width="428" height="352" name="ePlayer" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed></object>'},"www.vimeo.com":{r:/(?:http:\/\/)?www.vimeo.com\/(.*)/,n:"vimeo",w:400,h:300,ht:'<object width="400" height="300" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="allowScriptAccess" value="always"/><param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=<<0>>&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1"/><param name="wmode" value="transparent"><embed wmode="opaque" src="http://vimeo.com/moogaloop.swf?clip_id=<<0>>&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="400" height="300"></embed></object>'},"www.stage264.com":{r:/(?:http:\/\/)?www.stage264.com\/video-(.*)-.*/,n:"STAGE264",w:465,h:400,th:"http://www.stage264.com/images/filmimages/largeminus/<<0>>/1.jpg",ht:'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="465" height="400" id="reftest" align="middle"> <param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /><param name="wmode" value="opaque"/><param name="movie" value="http://www.stage264.com/swf/player.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#898989" /><param name="flashvars" value="config=http://www.stage264.com/api/imgup/getvideoxml/video_id/<<0>>"/><embed wmode="opaque" src="http://www.stage264.com/swf/player.swf" quality="high" bgcolor="#898989" width="465" height="400" name="player" align="middle" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" flashvars="config=http://www.stage264.com/api/imgup/getvideoxml/video_id/<<0>>" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>'},"www.tudou.com":{r:/(?:http:\/\/)?www.tudou.com\/programs\/view\/(.*)\//,n:"Tudou.com",w:400,h:340,ht:'<object width="400" height="340" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"><param name="movie" value="http://www.tudou.com/v/<<0>>"></param><param name="allowScriptAccess" value="always"></param><param name="wmode" value="transparent"></param><embed src="http://www.tudou.com/v/<<0>>" type="application/x-shockwave-flash" width="400" height="340" allowFullScreen="true" wmode="transparent" allowScriptAccess="always"></embed></object>'},"you.video.sina.com.cn":{r:/(?:http:\/\/)?you.video.sina.com.cn\/b\/(.*)-(.*).html/,n:"sina.com",w:480,h:370,ht:'<object id="reftest"  name="ssss" width="480" height="370" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0"><param name="movie" value="http://vhead.blog.sina.com.cn/player/outer_player.swf?auto=1&vid=<<0>>&uid=<<1>>"></param><param name="allowScriptAccess" value="always"></param><param name="wmode" value="transparent"></param><embed wmode="opaque" pluginspage="http://www.macromedia.com/go/getflashplayer" src="http://vhead.blog.sina.com.cn/player/outer_player.swf?auto=1&vid=<<0>>&uid=<<1>>" type="application/x-shockwave-flash" name="ssss" allowFullScreen="true" allowScriptAccess="always" width="480" height="370"></embed></object>'},"v.ku6.com":{r:/(?:http:\/\/)?v.ku6.com\/show\/(.*).html/,n:"Ku6.com",w:450,h:390,ht:'<embed wmode="opaque" src="http://player.ku6.com/refer/<<0>>/v.swf" quality="high" width="450" height="390" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>'},"live.arukikata.co.jp":{r:/(?:http:\/\/)?live.arukikata.co.jp\/clip\/\?id=(.*)/,n:"地球の歩き方LIVE！",w:480,h:390,th:"http://img.cliplife.jp/thumb/<<0>>.jpg",ht:'<object width="480" height="390" id="cliplife_external_b6cb8c0fbbdebaa6db5bc0f27e050e13" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param value="always" name="allowScriptAccess"/><param name="wmode" value="opaque"/><param value="http://live.arukikata.co.jp/player/player_external_03.swf" name="movie"/><param value="high" name="quality"/><param value="#ffffff" name="bgcolor"/><param value="clipinfo=http%3A%2F%2Fstream.cliplife.jp%2Fclipinfo%2Fclipinfo_03.php%3Fcontent_id%3D<<0>>&amp;asp=live.arukikata.co.jp&amp;movie_path=%2Fclip%2F%3Fid%3D<<0>>&amp;nickname=jtb" name="FlashVars"/><embed wmode="opaque" width="480" height="390" flashvars="clipinfo=http%3A%2F%2Fstream.cliplife.jp%2Fclipinfo%2Fclipinfo_03.php%3Fcontent_id%3D<<0>>&amp;asp=live.arukikata.co.jp&amp;movie_path=%2Fclip%2F%3Fid%3D<<0>>&amp;nickname=jtb" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" allowscriptaccess="always" bgcolor="#ffffff" quality="high" src="http://live.arukikata.co.jp/player/player_external_03.swf"/></object>'},"video.fc2.com":{r:/(?:http:\/\/)?video.fc2.com\/content.php\?kobj_up_id=(.*)/,n:"FC2 動画",w:446,h:380,ht:'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="446" height="380" id="flv2" align="middle"><param name="allowScriptAccess" value="always" /><param name="movie" value="http://video.fc2.com/flv2.swf?i=<<0>>&d=20.7&stop=on&require_charge=0&charge_second=0&up_fee_point=0¤t_point=0&movie_stop=off&no_progressive=1&otag=1" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="allowFullScreen" value="true" /><embed wmode="opaque" src="http://video.fc2.com/flv2.swf?i=<<0>>&d=20.7&stop=on&require_charge=0&charge_second=0&up_fee_point=0¤t_point=0&movie_stop=off&no_progressive=1&otag=1" quality="high" bgcolor="#ffffff" width="446" height="380" name="flv2" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" allowFullScreen="true" /></object>'},"revver.com":{r:/(?:http:\/\/)?revver.com\/video\/(.*)\/.+/,n:"Revver",w:480,h:392,th:"http://frame.revver.com/frame/120x90/<<0>>.jpg",ht:'<object width="480" height="392" data="http://flash.revver.com/player/1.0/player.swf?mediaId=<<0>>" type="application/x-shockwave-flash" id="revver<<0>>12223106647423976"><param name="Movie" value="http://flash.revver.com/player/1.0/player.swf?mediaId=1143553"/><param name="FlashVars" value="allowFullScreen=true"/><param name="AllowFullScreen" value="true"/><param name="AllowScriptAccess" value="always"/><param name="wmode" value="opaque"/><embed wmode="opaque" type="application/x-shockwave-flash" src="http://flash.revver.com/player/1.0/player.swf?mediaId=<<0>>" pluginspage="http://www.macromedia.com/go/getflashplayer" allowScriptAccess="always" flashvars="allowFullScreen=true" allowfullscreen="true" height="480" width="392"></embed></object>'},"www.youv.jp":{r:/(?:http:\/\/)?www.youv.jp\/video\/atpvu0-id-(.*)\//,n:"Youv.jp",w:480,h:395,ht:'<object width="480" height="395" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"><param name="movie" value="http://www.youv.jp/video/vp/<<0>>&at=pvb0"/><param name="wmode" value="transparent"/><embed src="http://www.youv.jp/video/vp/<<0>>&at=pvb0" type="application/x-shockwave-flash" wmode="transparent" width="480" height="395"></embed></object>'},"www.freeml.com":{r:/(?:http:\/\/)?www.freeml.com\/ep\.umzx\/grid\/Movie\/node\/MovieEntryFront\/movie_id\/(.*)\/user_id\/(.*)/,n:"MLコミュひろば",w:404,h:330,ht:'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="404" height="330" id="FreemlFlvPlayerOuter" align="middle"><param name="allowScriptAccess" value="always" /><param NAME="wmode" VALUE="transparent" /><param name="movie" value="http://www.freeml.com/movie/FreemlFlvPlayerOuter.swf?mid=<<0>>&puid=<<1>>" /><param name="menu" value="false" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><embed wmode="transparent" src="http://www.freeml.com/movie/FreemlFlvPlayerOuter.swf?mid=<<0>>&puid=<<1>>" menu="false" quality="high" bgcolor="#ffffff" width="404" height="330" name="FreemlFlvPlayerOuter" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>'},"www.clipser.com":{r:/(?:http:\/\/)?www.clipser.com\/watch_video\/(.*)/,n:"clipser",w:425,h:355,ht:'<object width="425" height="355" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"><param name="movie" value="http://www.clipser.com/Play?vid=<<0>>"></param><param name="wmode" value="transparent"></param><embed src="http://www.clipser.com/Play?vid=<<0>>" type="application/x-shockwave-flash" wmode="transparent" width="425" height="355"></embed></object>'},"www.halavideos.net":{r:/(?:http:\/\/)?www.halavideos.net\/.*-vIdEo(.*).html/,n:"Hala Video",w:350,h:275,th:"http://www.halavideos.net/images/videos/min/<<0>>.jpg",ht:'<embed wmode="opaque" width="350" height="275" flashvars="type=flv&amp;height=275&amp;width=350&amp;file=http://www.halavideos.net/get_video/<<0>>.flv&amp;image=http://img.youtube.com/vi/<<0>>/0.jpg&amp;autostart=true&amp;frontcolor=0x000000&amp;backcolor=0xFFFFCC&amp;lightcolor=0x000000&amp;overstretch=true&amp;thumbsinplaylist=true&amp;logo=http://www.halavideos.net/images/copyright.png" allowfullscreen="true" quality="high" name="player" id="player" style="" src="http://www.halavideos.net/swf/player.swf" type="application/x-shockwave-flash"></embed>'},"www.vidiac.com":{r:/(?:http:\/\/)?www.vidiac.com\/video\/(.*).html/,n:"Vidiac.com",w:428,h:352,th:"http://px2.vidiac.com/thumbs/<<0>>.jpg",ht:'<embed wmode="opaque" src="http://www.vidiac.com/vidiac.swf" FlashVars="video=<<0>>" quality="high" bgcolor="#ffffff" width="428" height="352" name="ePlayer" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>'},"video.nifty.com":{r:/(?:http:\/\/)?video.nifty.com\/cs\/catalog\/video_metadata\/catalog_(.*)_1.html/,n:"＠niftyビデオ共有 ",w:480,h:392,ht:'<script language="javascript" type="text/javascript" src="http://dl.video.nifty.com/js/player.js?catalog_id=<<0>>&category_id=0&lg=0&width=480&height=392"><\/script>'},"www.dailymotion.com":{r:/(?:http:\/\/)?www.dailymotion.com\/video\/(.*)/,n:"Dailymotion",w:425,h:335,ht:'<object width="425" height="335" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"><param name="movie" value="http://www.dailymotion.com/swf/<<0>>"></param><param name="wmode" value="transparent"></param><param name="allowfullscreen" value="true"></param><embed src="http://www.dailymotion.com/swf/<<0>>" type="application/x-shockwave-flash" width="425" height="335" wmode="transparent" allowfullscreen="true"></embed></object>'}};
(function(namespace){var config={id:"siteLayer",width:506,style:{DIRECT_INPUT:"directInput",FOG:"fog",GREY:"ready"},NODE:{BASE:"> DIV.shadow > DIV.shadowSide > DIV.subLayerTemplate",CLOSE_BTN:"> A.layerClose",ELEMENT_PARENT:"> DIV.layerContents > DL",URL:"> DIV.layerContents > DL > DD.urlArea > P.url",DIRECT_URL:"> DIV.layerContents > DL > DD.directInputUrl > INPUT",TITLE:"> DIV.layerContents > DL > DD._title > INPUT",COMMENT:"> DIV.layerContents > DL TEXTAREA",THUMB_LIST:"> DIV.layerContents > DL > DD:last-of-type > UL",SUBMIT:"> DIV.layerContents > DIV.btns > BUTTON",UPLOAD_IMG_BTN:"> DIV.layerContents > DL > DD:last-of-type > A > IMG",THUMB_IMG:"IMG",THUMB_RADIO:"INPUT[type=radio]",CHECKED_RADIO:"INPUT[type=radio][checked=true]"},MSG:{URL:"URLを入力してください",TITLE:"タイトルを入力してください",TITLE_ALERT:"ページタイトルが入力されていません。",COMMENT:"紹介コメントを入力してください",SAVE_ERR:"一時的にご利用できません。",OVER_TITLE:"タイトルは、全角100文字以内で入力してください。",OVER_COMMENT:"紹介コメントは、300文字以内で入力してください。",OVER_URL:"URLは、500文字以内で入力してください。",NOT_URL:"URLの入力形式が異なっています。",UPLOAD_FAIL:"1024KB未満の画像のみ対応しています。"},TEMPLATE:['<input type="radio" name="content.thumbnailUrl" value="#thumb#"/>','<img height="58" width="58" alt="直接登録" src="#thumb#"/>'].join(""),thumbRadio:{MAX:4,noImageId:"noImgeType",userImageId:"userImageType"},SEARCH_THUMB_URL:"/siteInfo.ajax",SUBMIT_URL:"/content.ajax",upload:{URL:"/upload.ajax",FILE_TYPE:"*.jpg;*.gif;*.jpeg;*.png"},consts:{MAX_TITLE_LENGTH:100,MAX_COMMENT_LENGTH:300,MAX_URL_LENGTH:500,MISSION_URL:"/odai/"}};
var COMMON={sendServer:function(oData,fn){new $Ajax(oData.q?config.SEARCH_THUMB_URL:config.SUBMIT_URL,{timeout:5,onload:function(oRes){fn(oRes.json(),oData)
},ontimeout:function(){fn({result:false})
}}).request(oData)
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(fnCallback,_config){_config=_config||{};
for(var i in _config){config[i]=_config[i]
}this._initCallback(fnCallback||{});
this._getElementRef();
this._initEvent();
this._initFoggy();
this._initUpload()
},_initCallback:function(fnCallback){this._fnSaved=fnCallback.saved||function(){};
this._fnClosed=fnCallback.closed||function(){}
},_getElementRef:function(){this._welLayer=$Element(config.id);
var elBase=$$.getSingle(config.NODE.BASE,this._welLayer.$value());
this._elForm=elBase;
this._welParent=$Element($$.getSingle(config.NODE.ELEMENT_PARENT,elBase));
this._elClose=$$.getSingle(config.NODE.CLOSE_BTN,elBase);
this._elUrl=$$.getSingle(config.NODE.URL,elBase);
this._elDirectUrl=$$.getSingle(config.NODE.DIRECT_URL,elBase);
this._elTitle=$$.getSingle(config.NODE.TITLE,elBase);
this._elComment=$$.getSingle(config.NODE.COMMENT,elBase);
this._elUploadImageBtn=$$.getSingle(config.NODE.UPLOAD_IMG_BTN,elBase);
this._elThumbList=$$.getSingle(config.NODE.THUMB_LIST,elBase);
this._elSubmit=$$.getSingle(config.NODE.SUBMIT,elBase);
this._bIsIng=false
},_initEvent:function(){$Fn(function(wEvent){this.hide();
wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(this._elClose,"click");
$Fn(function(wEvent){var el=wEvent.element;
if(el.notFirst){if(fnMatome.trim(el.value)==config.MSG.URL){el.value=""
}}else{el.notFirst=true
}},this).attach(this._elDirectUrl,"focus");
$Fn(function(wEvent){var oKey=wEvent.key();
if(oKey.enter){this._elTitle.focus();
wEvent.stop()
}},this).attach(this._elDirectUrl,"keydown");
$Fn(function(wEvent){this._searchThumb()
},this).attach(this._elDirectUrl,"blur");
$Fn(function(wEvent){if(fnMatome.trim(wEvent.element.value)==config.MSG.URL){wEvent.element.value=""
}},this).attach(this._elDirectUrl,"click");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.MSG.TITLE){wEvent.element.value=""
}},this).attach(this._elTitle,"focus");
$Fn(function(wEvent){if(wEvent.key().enter){wEvent.stop();
this._onsubmit()
}},this).attach(this._elTitle,"keydown");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.MSG.COMMENT){wEvent.element.value=""
}},this).attach(this._elComment,"focus");
$Fn(this._onsubmit,this).attach(this._elSubmit,"click")
},_initFoggy:function(){var t=this;
this._foggy=new nhn.Foggy({showDuration:0,showOpacity:nhn.Effect.linear(0.3),hideDuratioin:200,hideOpacity:nhn.Effect.linear(0),zIndex:32000,fps:15}).attach({show:function(){var oArea=$Document().scrollSize();
t._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:"0px"});
t._welLayer.show();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(t._welLayer.height()))/2+nScrollTop;
t._welLayer.css("top",(nTop<0?0:nTop)+"px");
t._checkUploadBtnUI();
if(t._welParent.hasClass(config.style.DIRECT_INPUT)){t._elDirectUrl.select()
}else{t._elTitle.focus()
}t._refResize=$Fn(t._onResize,t).attach(window,"resize")
},hide:function(){t._elComment.focus();
t._clearLayer();
t._welLayer.hide();
t._bIsIng=false;
t._refResize.detach(window,"resize");
t._fnClosed()
}});
this._foggy.getFog().className=config.style.FOG
},_onResize:function(wEvent){var oArea=$Document().scrollSize();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(this._welLayer.height()))/2+nScrollTop;
this._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:(nTop<0?0:nTop)+"px"})
},_initUpload:function(){this._oUploader=new nj.Uploader2(this._elUploadImageBtn,{url:config.upload.URL,filetype:config.upload.FILE_TYPE,data:{},onSuccess:$Fn(this._successUpload,this).bind(),onError:$Fn(this._failUpload,this).bind(),align:true});
this._isInitUploadUI=false
},_successUpload:function(oData){this._addUserThumb(oData.thumbnailUrl)
},_failUpload:function(){alert(config.MSG.UPLOAD_FAIL)
},_clearLayer:function(){this._oCurrentData=null;
this._elDirectUrl.value=config.MSG.URL;
this._elDirectUrl.notFirst=false;
$Element(this._elTitle).addClass(config.style.GREY).attr("value",config.MSG.TITLE);
$Element(this._elComment).addClass(config.style.GREY).attr("value",config.MSG.COMMENT);
this._clearRadio()
},_clearRadio:function(){var elNoImage=$(config.thumbRadio.noImageId);
this._elThumbList.appendChild(elNoImage);
while(true){if(this._elThumbList.childNodes[0]==elNoImage){break
}else{this._elThumbList.removeChild(this._elThumbList.childNodes[0])
}}},_clearRadioExceptDefault:function(){for(var i=0;
i<this._elThumbList.childNodes.length;
i++){if(this._elThumbList.childNodes[i].id!=""){continue
}else{this._elThumbList.removeChild(this._elThumbList.childNodes[i]);
i--
}}},hide:function(){if(this._welLayer.visible()){this._foggy.hide()
}},show:function(oData,fn){try{nclkReplaceArea(this._elForm,"link_amc")
}catch(e){}this._fnCallback=fn;
this._welParent.removeClass(config.style.DIRECT_INPUT);
this._initData(oData);
this._foggy.show(this._welLayer.$value())
},showDirect:function(){try{nclkReplaceArea(this._elForm,"link_amd")
}catch(e){}this._welParent.addClass(config.style.DIRECT_INPUT);
this._fnCallback=function(){};
this._initData({title:config.MSG.TITLE,comment:"",sourceUrl:"",keyword:"",thumbnailUrl:""});
this._foggy.show(this._welLayer.$value())
},modifyShow:function(oData){this._welParent.removeClass(config.style.DIRECT_INPUT);
this._fnCallback=function(){};
this._initData(oData);
this._foggy.show(this._welLayer.$value())
},_checkUploadBtnUI:function(){if(!this._isInitUploadUI){this._oUploader.initUI()
}},_searchThumb:function(oData){var sUrl=fnMatome.trim((oData&&oData.sourceUrl)?oData.sourceUrl:this._elDirectUrl.value);
if(sUrl==""){return 
}if(!this._hasHttpPrefix(sUrl)){sUrl="http://"+sUrl
}if(!fnMatome.validateURL(sUrl)){return 
}COMMON.sendServer({q:sUrl,searchType:(oData&&oData.sourceUrl)?oData.searchType:""},$Fn(this._responseThumb,this).bind())
},_initData:function(oData){this._oCurrentData=oData;
this._elTitle.value=fnMatome.htmlEncode(oData.title.replace(/<\/?[^>]*>/g,""));
this._elComment.value=oData.comment||config.MSG.COMMENT;
this._elUrl.innerHTML=curtail(oData.sourceUrl,242);
if(oData.sourceUrl){this._searchThumb(oData)
}else{this._addThumb(oData.thumbnailUrl==""?[]:[oData.thumbnailUrl])
}},_addUserThumb:function(sThumbUrl){var elUserLI=$(config.thumbRadio.userImageId);
if(elUserLI){$$.getSingle(config.NODE.THUMB_IMG,elUserLI).src=sThumbUrl;
var elRadio=$$.getSingle(config.NODE.THUMB_RADIO,elUserLI);
elRadio.value=sThumbUrl;
elRadio.checked=true
}else{var newThumb=$Element("<LI>").attr("id",config.thumbRadio.userImageId).html(nj.replaceStr(config.TEMPLATE,{thumb:sThumbUrl}));
this._elThumbList.appendChild(newThumb.$value());
$$.getSingle(config.NODE.THUMB_RADIO,newThumb.$value()).checked=true
}},_addThumb:function(aThumb){if(aThumb.length!=0){var nCnt=0;
for(var i=aThumb.length-1;
i>=0;
i--,nCnt++){var thumb=aThumb[i];
if(nCnt==config.thumbRadio.MAX){break
}var newThumb=$Element("<LI>").html(nj.replaceStr(config.TEMPLATE,{thumb:thumb}));
this._elThumbList.insertBefore(newThumb.$value(),$$.getSingle("> LI:first-of-type",this._elThumbList));
$$.getSingle(config.NODE.THUMB_RADIO,newThumb.$value()).checked=true
}}else{$$.getSingle(config.NODE.THUMB_RADIO,this._elThumbList).checked=true
}},_onsubmit:function(wEvent){if(this._bIsIng){return 
}this._bIsIng=true;
var sUrl="";
if(this._welParent.hasClass(config.style.DIRECT_INPUT)){if(!fnMatome.validateBlank(this._elDirectUrl,{msg:config.MSG.URL})){this._interrupted();
return 
}if(!fnMatome.validateDefaultText(this._elDirectUrl,{msg:config.MSG.URL,text:config.MSG.URL})){this._interrupted();
return 
}if(!fnMatome.validateLength(this._elDirectUrl,{msg:config.MSG.OVER_URL,min:0,max:config.consts.MAX_URL_LENGTH})){this._interrupted();
return 
}sUrl=fnMatome.trim(this._elDirectUrl.value);
if(!this._hasHttpPrefix(sUrl)){this._elDirectUrl.value=sUrl="http://"+sUrl
}if(!fnMatome.validateURL(this._elDirectUrl.value)){alert(config.MSG.NOT_URL);
this._interrupted();
this._elDirectUrl.select();
return 
}}else{sUrl=this._oCurrentData.sourceUrl
}if(!fnMatome.validateBlank(this._elTitle,{msg:config.MSG.TITLE_ALERT})){this._interrupted();
return 
}if(!fnMatome.validateDefaultText(this._elTitle,{msg:config.MSG.TITLE_ALERT,text:config.MSG.TITLE})){this._interrupted();
return 
}if(!fnMatome.validateLength(this._elTitle,{msg:config.MSG.OVER_TITLE,min:0,max:config.consts.MAX_TITLE_LENGTH})){this._interrupted();
return 
}fnMatome.clearText(this._elComment,{text:config.MSG.COMMENT});
if(this._elComment.value!=""){if(!fnMatome.validateLength(this._elComment,{msg:config.MSG.OVER_COMMENT,min:0,max:config.consts.MAX_COMMENT_LENGTH})){this._interrupted();
return 
}}var elThumbnailUrl=$$.getSingle(config.NODE.CHECKED_RADIO,this._elThumbList);
var sThumbnailUrl="";
if(elThumbnailUrl){sThumbnailUrl=elThumbnailUrl.value
}COMMON.sendServer({m:(typeof this._oCurrentData.contentId=="undefined"?"save":"update"),"content.missionId":typeof MISSION_ID=="undefined"?this._oCurrentData.missionId:MISSION_ID,"content.url":sUrl,"content.thumbnailUrl":sThumbnailUrl,"content.title":fnMatome.trim(this._elTitle.value),"content.description":fnMatome.trim(this._elComment.value),"content.contentId":this._oCurrentData.contentId||"","content.searchKeyword":this._oCurrentData.keyword||"",referer:this._oCurrentData.referer||""},$Fn(this._response,this).bind())
},_hasHttpPrefix:function(sUrl){return/^http(s?):\/\/.*/i.test(sUrl)
},_interrupted:function(){this._bIsIng=false
},_responseThumb:function(oRes,oData){if(this._bIsIng){return 
}var elParent=$$.getSingle(config.NODE.CHECKED_RADIO,this._elThumbList);
if(elParent&&elParent.parentNode.id==""){$$.getSingle(config.NODE.THUMB_RADIO,$(config.thumbRadio.noImageId)).checked=true
}this._clearRadioExceptDefault();
if(oRes.items.length!=0){this._addThumb(oRes.items||[])
}if(oRes.title){if(fnMatome.trim(this._elTitle.value)==""||fnMatome.trim(this._elTitle.value)==config.MSG.TITLE){this._elTitle.value=oRes.title
}}},_response:function(oRes,oData){if(oRes.result){this._fnSaved({type:oData.type,title:oData["content.title"],comment:oData["content.description"],thumbnailUrl:oData["content.thumbnailUrl"],endUrl:"/odai/"+oData["content.missionId"]+"/"+oRes.resourceId,sourceUrl:oData["content.url"],contentId:oData["content.contentId"]||oRes.contentId},this._fnCallback);
this.hide()
}else{this._bIsIng=false;
alert(oRes.message||config.MSG.SAVE_ERR);
if(oRes.message){location.href=config.consts.MISSION_URL+oData["content.missionId"]
}}}}
})("nj.mission.SiteLayer");
(function(namespace){var config={id:"imageLayer",width:538,style:{FOG:"fog",GREY:"ready"},node:{BASE:"> DIV.shadow > DIV.shadowSide > DIV.subLayerTemplate",RESOLUTION:"> DIV.layerContents > DIV.option > SPAN.size",CLOSE_BTN:"> A.layerClose",COMMENT:"> DIV.layerContents > DIV.inputComment > DL > DD:last-of-type > TEXTAREA",SUBMIT:"> DIV.layerContents > DIV.btns > BUTTON",IMAGE:"> DIV.layerContents > DIV.imgViewArea",TITLE:"> DIV.layerContents > DIV.inputComment > DL > DD:first-of-type > INPUT",URL:"> DIV.layerContents > DIV.option > SPAN.url"},msg:{TITLE:"タイトルを入力してください",COMMENT:"紹介コメントを入力してください",SAVE_ERR:"一時的にご利用できません",OVER_TITLE:"タイトルは、100文字以内で入力してください。",OVER_COMMENT:"紹介コメントは、300文字以内で入力してください。"},SUBMIT_URL:"/content.ajax",consts:{MAX_TITLE_LENGTH:100,MAX_COMMENT_LENGTH:300,MISSION_URL:"/odai/"}};
var COMMON={sendServer:function(oData,fn){new $Ajax(config.SUBMIT_URL,{timeout:5,onload:function(oRes){fn(oRes.json(),oData)
},ontimeout:function(){fn({result:false})
}}).request(oData)
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(fnCallback){this._initCallback(fnCallback||{});
this._getElementRef();
this._initEvent();
this._initFoggy()
},_initCallback:function(fnCallback){this._fnSaved=fnCallback.saved||function(){};
this._fnClosed=fnCallback.closed||function(){};
this._fnBeforeShow=fnCallback.beforeShow||function(){};
this._fnBeforeHide=fnCallback.beforeHide||function(){}
},_getElementRef:function(){var t=this;
t._welLayer=$Element(config.id);
var elBase=$$.getSingle(config.node.BASE,t._welLayer.$value());
t._elResolution=$$.getSingle(config.node.RESOLUTION,elBase);
t._elComment=$$.getSingle(config.node.COMMENT,elBase);
t._elSubmit=$$.getSingle(config.node.SUBMIT,elBase);
t._elClose=$$.getSingle(config.node.CLOSE_BTN,elBase);
t._elImage=$$.getSingle(config.node.IMAGE,elBase);
t._elTitle=$$.getSingle(config.node.TITLE,elBase);
t._elUrl=$$.getSingle(config.node.URL,elBase);
t._bIsIng=false;
t._bIsFocusTitle=false
},_initEvent:function(){$Fn(function(wEvent){this.hide();
wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(this._elClose,"click");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
this._bIsFocusTitle=true;
wEvent.element.focus()
},this).attach(this._elTitle,"focus");
$Fn(function(wEvent){if(wEvent.key().enter){wEvent.stop();
this._onsubmit()
}},this).attach(this._elTitle,"keydown");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.msg.COMMENT){wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elComment,"focus");
$Fn(this._onsubmit,this).attach(this._elSubmit,"click")
},_initFoggy:function(){var t=this;
this._foggy=new nhn.Foggy({showDuration:0,showOpacity:nhn.Effect.linear(0.3),hideDuratioin:200,hideOpacity:nhn.Effect.linear(0),zIndex:32000,fps:15}).attach({show:function(){var oArea=$Document().scrollSize();
t._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:"0px"});
t._welLayer.show();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(t._welLayer.height()))/2+nScrollTop;
t._welLayer.css("top",(nTop<0?0:nTop)+"px");
t._elTitle.focus();
t._refResize=$Fn(t._onResize,t).attach(window,"resize")
},hide:function(){t._clearLayer();
t._welLayer.hide($Event.CANCEL_DEFAULT);
t._bIsIng=false;
t._refResize.detach(window,"resize");
t._fnClosed()
}});
this._foggy.getFog().className=config.style.FOG
},_onResize:function(wEvent){var oArea=$Document().scrollSize();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(this._welLayer.height()))/2+nScrollTop;
this._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:(nTop<0?0:nTop)+"px"})
},_clearLayer:function(){this._oCurrentData=null;
this._elImage.innerHTML="";
this._elResolution.innerHTML="";
this._elUrl.innerHTML="";
$Element(this._elTitle).addClass(config.style.GREY).attr("value",config.msg.TITLE);
$Element(this._elComment).addClass(config.style.GREY).attr("value",config.msg.COMMENT)
},visible:function(){return this._welLayer.visible()
},hide:function(){if(this._welLayer.visible()){this._fnBeforeHide();
this._foggy.hide()
}},show:function(oData,fn){this._fnBeforeShow();
this._fnCallback=fn||function(){};
this._initData(oData);
this._foggy.show(this._welLayer.$value())
},modifyShow:function(oData){this._fnBeforeShow();
this._fnCallback=function(){};
this._initData(oData);
this._foggy.show(this._welLayer.$value())
},_initData:function(oData){var t=this;
this._oCurrentData=oData;
var oImage=new Image();
oImage.onload=function(){if(oImage.width!=oData.width||oImage.height!=oData.height){t._elImage.innerHTML='<img src="'+oData.thumbnailUrl+'"/>'
}else{t._elImage.innerHTML='<img src="'+oData.originalImageUrl+'" width="'+oImage.width+'" height="'+oImage.height+'"/>'
}oImage.onload=function(){}
};
oImage.onerror=function(){t._elImage.innerHTML='<img src="'+oData.thumbnailUrl+'"/>';
oImage.onerror=function(){}
};
oImage.src=oData.originalImageUrl;
this._elResolution.innerHTML=oData.width+" X "+oData.height;
if(oData){if(oData.publication){if(/^http(s?):\/\/.*/i.test(oData.publication)){var sHtml='<a href="'+(oData.sourceUrl||oData.source)+'" target="_blank">';
sHtml+=curtail(oData.sourceUrl,242);
sHtml+="</a>";
this._elUrl.innerHTML=sHtml
}else{this._elUrl.innerHTML="掲載ページ : "+oData.publication
}}else{if((oData.sourceUrl||oData.source)==""&&typeof oData.isDirectInputFlag!="undefined"&&oData.isDirectInputFlag){this._elUrl.innerHTML="掲載ページ : なし（"+oData.source+"さんがアップロード) "
}else{var sHtml='<a href="'+(oData.sourceUrl||oData.source)+'" target="_blank">';
sHtml+=curtail(oData.sourceUrl,242);
sHtml+="</a>";
this._elUrl.innerHTML=sHtml
}}}this._elTitle.value=fnMatome.htmlEncode(oData.title.replace(/<\/?[^>]*>/g,""));
this._elComment.value=fnMatome.htmlEncode(oData.comment||config.msg.COMMENT)
},_onsubmit:function(wEvent){if(this._bIsIng){return 
}this._bIsIng=true;
if(!fnMatome.validateBlank(this._elTitle,{msg:config.msg.TITLE})){this._interrupted();
return 
}if(!this._bIsFocusTitle&&!fnMatome.validateDefaultText(this._elTitle,{msg:config.msg.TITLE,text:config.msg.TITLE})){this._interrupted();
return 
}if(!fnMatome.validateLength(this._elTitle,{msg:config.msg.OVER_TITLE,min:0,max:config.consts.MAX_TITLE_LENGTH})){this._interrupted();
return 
}fnMatome.clearText(this._elComment,{text:config.msg.COMMENT});
if(this._elComment.value!=""){if(!fnMatome.validateLength(this._elComment,{msg:config.msg.OVER_COMMENT,min:0,max:config.consts.MAX_COMMENT_LENGTH})){this._interrupted();
return 
}}COMMON.sendServer({m:this._oCurrentData.contentId?"update":"save","content.missionId":typeof MISSION_ID=="undefined"?this._oCurrentData.missionId:MISSION_ID,"content.source":this._oCurrentData.source,"content.sourceUrl":this._oCurrentData.sourceUrl,"content.url":this._oCurrentData.originalImageUrl,"content.thumbnailUrl":this._oCurrentData.thumbnailUrl,"content.imageResolution":this._oCurrentData.width>0&&this._oCurrentData.height>0?this._oCurrentData.width+"x"+this._oCurrentData.height:"","content.fileSize":this._oCurrentData.fileSize,"content.title":fnMatome.trim(this._elTitle.value),"content.description":fnMatome.trim(this._elComment.value),"content.contentId":this._oCurrentData.contentId||"","content.searchKeyword":this._oCurrentData.keyword||"",referer:this._oCurrentData.referer||""},$Fn(this._response,this).bind())
},_interrupted:function(){this._bIsIng=false
},_response:function(oRes,oData){if(oRes.result){this._fnSaved({type:oData.type,title:oData["content.title"],comment:oData["content.description"],source:oData["content.source"],endUrl:"/odai/"+oData["content.missionId"]+"/"+oRes.resourceId,sourceUrl:oData["content.sourceUrl"],thumbnailUrl:oData["content.thumbnailUrl"],originalImageUrl:oData["content.url"],size:oData["content.fileSize"],width:oData["content.imageResolution"].split("x")[0],height:oData["content.imageResolution"].split("x")[1],contentId:oData["content.contentId"]||oRes.contentId,publication:oRes.publication||"",isDirectInputFlag:oRes.isDirectInputFlag||false},this._fnCallback);
this.hide()
}else{this._bIsIng=false;
alert(oRes.message||config.msg.SAVE_ERR);
if(oRes.message){location.href=config.consts.MISSION_URL+oData["content.missionId"]
}}}}
})("nj.mission.ImageLayer");
(function(namespace){var config={id:"imageDirectLayer",width:538,style:{FOG:"fog",GREY:"ready"},node:{BASE:"div.subLayerTemplate",CLOSE_BTN:"a.layerClose",URL:"input#itemURL",CONFIRM_BTN:"div.urlInputArea button",IMAGE:"div.imgViewArea",TITLE:"input#_imageDirectLayerItemName",BASEURL:"input#baseURL",COMMENT:"textarea#_imageDirectLayerIntroduceContent",SUBMIT:"button.btnEnd"},msg:{URL:"追加する画像のURLを入力してください",TITLE:"タイトルを入力してください",BASEURL:"この画像が掲載されているページのURLを入力してください",COMMENT:"紹介コメントを入力してください",VALID_URL:"URLの入力形式が異なっています。",CONFIRM_URL:"画像URLを入力して、確認ボタンをクリックしてください。",IMAGE_FORMAT_URL:"10MB未満のJPG、JPEG、GIF、PNGのみ対応しています。",REQUIRED_TITLE:"画像タイトルを入力してください。",OVER_TITLE:"タイトルは、100文字以内で入力してください。",REQUIRED_BASEURL:"掲載ページのURLを入力してください。",VALID_BASEURL:"掲載ページのURLの入力形式が異なっています。",OVER_COMMENT:"紹介コメントは、300文字以内で入力してください。",SAVE_ERR:"一時的にご利用できません"},SUBMIT_URL:"/content.ajax",CONFIRM_URL:"/upload.ajax",SITEINFO_URL:"/siteInfo.ajax",consts:{MAX_TITLE_LENGTH:100,MAX_COMMENT_LENGTH:300,MAX_IMAGE_SIZE:10*1024*1024,MISSION_URL:"/odai/"}};
var COMMON={sendServer:function(oData,fn){new $Ajax(config.SUBMIT_URL,{timeout:5,onload:function(oRes){fn(oRes.json(),oData)
},ontimeout:function(){fn({result:false})
}}).request(oData)
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(fnCallback,oOptions){oOptions=oOptions||{};
config.SUBMIT_URL=oOptions.SUBMIT_URL||config.SUBMIT_URL;
config.CONFIRM_URL=oOptions.CONFIRM_URL||config.CONFIRM_URL;
config.SITEINFO_URL=oOptions.SITEINFO_URL||config.SITEINFO_URL;
this._ajaxConfirm=null;
this._ajaxSiteInfo=null;
this._status={imageConfirmed:false};
this._initCallback(fnCallback||{});
this._getElementRef();
this._initEvent();
this._initFoggy();
this._validateRules={url:{elm:this._elUrl,check:[{fn:fnMatome.validateBlank,arg:{msg:config.msg.CONFIRM_URL}},{fn:fnMatome.validateElementURL,arg:{msg:config.msg.VALID_URL}},{fn:fnMatome.checkImageExtension,arg:{msg:config.msg.IMAGE_FORMAT_URL}}]},title:{elm:this._elTitle,check:[{fn:fnMatome.validateBlank,arg:{msg:config.msg.TITLE}},{fn:fnMatome.validateDefaultText,arg:{msg:config.msg.TITLE,text:config.msg.TITLE}},{fn:fnMatome.validateLength,arg:{msg:config.msg.OVER_TITLE,min:0,max:config.consts.MAX_TITLE_LENGTH}}]},baseurl:{elm:this._elBaseurl,check:[{fn:fnMatome.validateBlank,arg:{msg:config.msg.REQUIRED_BASEURL}},{fn:fnMatome.validateDefaultText,arg:{msg:config.msg.BASEURL,text:config.msg.BASEURL}},{fn:fnMatome.validateElementURL,arg:{msg:config.msg.VALID_BASEURL}}]},comment:{elm:this._elComment,check:[{fn:function(el){if(el.value==""||el.value==config.msg.COMMENT){el.value="";
return true
}return fnMatome.validateLength.apply(fnMatome,arguments)
},arg:{msg:config.msg.OVER_COMMENT,min:0,max:config.consts.MAX_COMMENT_LENGTH}}]}}
},_initCallback:function(fnCallback){this._fnSaved=fnCallback.saved||function(){};
this._fnClosed=fnCallback.closed||function(){};
this._fnBeforeShow=fnCallback.beforeShow||function(){};
this._fnBeforeHide=fnCallback.beforeHide||function(){}
},_getElementRef:function(){var t=this;
t._welLayer=$Element(config.id);
var elBase=$$.getSingle(config.node.BASE,t._welLayer.$value());
t._elComment=$$.getSingle(config.node.COMMENT,elBase);
t._elSubmit=$$.getSingle(config.node.SUBMIT,elBase);
t._elConfirmBtn=$$.getSingle(config.node.CONFIRM_BTN,elBase);
t._elBaseurl=$$.getSingle(config.node.BASEURL,elBase);
t._elClose=$$.getSingle(config.node.CLOSE_BTN,elBase);
t._elImage=$$.getSingle(config.node.IMAGE,elBase);
t._elTitle=$$.getSingle(config.node.TITLE,elBase);
t._elUrl=$$.getSingle(config.node.URL,elBase);
t._bIsIng=false
},_initEvent:function(){$Fn(function(wEvent){this.hide();
wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(this._elClose,"click");
this._setGuidePrompto(this._elUrl,config.msg.URL);
$Fn(this._onConfirm,this).attach(this._elUrl,"blur");
$Fn(this._createIfEnterThanFocusCallback(this._elConfirmBtn),this).attach(this._elUrl,"keydown");
this._setGuidePrompto(this._elTitle,config.msg.TITLE);
$Fn(this._createIfEnterThanCallback(this._onsubmit,this),this).attach(this._elTitle,"keydown");
this._setGuidePrompto(this._elBaseurl,config.msg.BASEURL);
$Fn(this._onBaseurlConfirm,this).attach(this._elBaseurl,"blur");
$Fn(this._createIfEnterThanFocusCallback(this._elTitle),this).attach(this._elBaseurl,"keydown");
this._setGuidePrompto(this._elComment,config.msg.COMMENT);
$Fn(this._onsubmit,this).attach(this._elSubmit,"click");
$Fn(this._onConfirm,this).attach(this._elConfirmBtn,"click")
},_createIfEnterThanCallback:function(fn,ctx){var fnCallback=function(wEvent){var oKey=wEvent.key();
if(oKey.enter){wEvent.stop();
fn.apply(ctx,arguments)
}};
return fnCallback
},_createIfEnterThanFocusCallback:function(el){var fnCallback=function(wEvent){var oKey=wEvent.key();
if(oKey.enter){wEvent.stop();
el.focus()
}};
return fnCallback
},_onBaseurlConfirm:function(wEvent){var sUrl=this._elBaseurl.value;
if(this._ajaxSiteInfo){return 
}this._elBaseurl.value=sUrl=this._coverProtocol(sUrl);
if(sUrl&&sUrl.length>0&&(this._elTitle.value==config.msg.TITLE||this._elTitle.value.length==0)){this._ajaxSiteInfo=$Ajax(config.SITEINFO_URL,{method:"post",onload:$Fn(function(oRes){this._ajaxSiteInfo=null;
var oJson=oRes.json();
if(oJson&&oJson.title){$Element(this._elTitle).removeClass(config.style.GREY);
this._elTitle.value=oJson.title||""
}},this).bind()});
this._ajaxSiteInfo.request({q:sUrl})
}},_onConfirm:function(){var sUrl=fnMatome.trim(this._elUrl.value);
if(sUrl==""){return 
}var self=this;
this._status.imageConfirmed=false;
if(this._ajaxConfirm){return 
}this._elUrl.value=sUrl=this._coverProtocol(sUrl);
if(!this.checkItem("url",true)){return 
}this._ajaxConfirm=$Ajax(config.CONFIRM_URL,{method:"post",onload:function(oRes){self._ajaxConfirm=null;
if(!self._welLayer.visible()){return 
}var oJson=oRes.json();
if(!oJson||oJson.result!==true){alert(oJson.errorMessage||"Error");
self._elUrl.blur();
return 
}var aSize=oJson.data.imageResolution.split("x");
self._setCurrentData({thumbnailUrl:oJson.data.thumbnailUrl,fileSize:oJson.data.fileSize,width:aSize[0],height:aSize[1]});
var welImage=$Element("<img>");
welImage.attr("src",self._elUrl.value);
$Element(self._elImage).empty().append(welImage.$value());
self._status.imageConfirmed=true
}});
this._ajaxConfirm.request({m:"imginfo",imageUrl:this._elUrl.value})
},_coverProtocol:function(sUrl){var sUrl=fnMatome.trim(sUrl);
if(sUrl.length==0){return""
}if(!/^http(s?):\/\/.*/i.test(sUrl)){sUrl="http://"+sUrl
}return sUrl
},_initFoggy:function(){var t=this;
this._foggy=new nhn.Foggy({showDuration:0,showOpacity:nhn.Effect.linear(0.3),hideDuratioin:200,hideOpacity:nhn.Effect.linear(0),zIndex:32000,fps:15}).attach({show:function(){var oArea=$Document().scrollSize();
t._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:"0px"});
t._welLayer.show();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(t._welLayer.height()))/2+nScrollTop;
t._welLayer.css("top",(nTop<0?0:nTop)+"px");
t._elUrl.focus();
t._refResize=$Fn(t._onResize,t).attach(window,"resize");
lcs_do({sti:"layer_image_URL"})
},hide:function(){t._clearLayer();
t._welLayer.hide();
t._bIsIng=false;
t._bIsFocusTitle=false;
t._refResize.detach(window,"resize");
t._fnClosed()
}});
this._foggy.getFog().className=config.style.FOG
},_setGuidePrompto:function(el,sValue){$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==sValue){wEvent.element.value=""
}wEvent.element.focus()
},this).attach(el,"focus")
},_assignGuidePrompto:function(el,sValue){$Element(el).addClass(config.style.GREY).$value().value=sValue
},_onResize:function(wEvent){var oArea=$Document().scrollSize();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(this._welLayer.height()))/2+nScrollTop;
this._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:(nTop<0?0:nTop)+"px"})
},_clearLayer:function(){this._oCurrentData=null;
this._elImage.innerHTML="";
this._status.imageConfirmed=false;
this._elUrl.value="";
this._assignGuidePrompto(this._elTitle,config.msg.TITLE);
this._assignGuidePrompto(this._elBaseurl,config.msg.BASEURL);
this._assignGuidePrompto(this._elComment,config.msg.COMMENT)
},show:function(oData,fn){this._fnBeforeShow();
this._fnCallback=fn||function(){};
this._clearLayer();
this._initData(oData);
this._foggy.show(this._welLayer.$value())
},hide:function(){if(this._welLayer.visible()){this._fnBeforeHide();
this._foggy.hide()
}},visible:function(){return this._welLayer.visible()
},modifyShow:function(oData){this._fnBeforeShow();
this._fnCallback=function(){};
this._initData(oData);
this._foggy.show(this._welLayer.$value())
},_setCurrentData:function(oData){for(var i in oData){this._oCurrentData[i]=oData[i]
}return this._oCurrentData
},_initData:function(oData){oData=oData||{};
var _oData={thumbnailUrl:"",source:"",sourceUrl:"",width:0,height:0,fileSize:0,title:"",comment:"",type:"",keyword:"",publication:"",isDirectInputFlag:false};
for(var i in _oData){oData[i]=oData[i]||_oData[i]
}var t=this;
this._oCurrentData=oData;
var sHtml='<a href="'+(oData.sourceUrl||oData.source)+'" target="_blank">';
sHtml+=curtail(oData.sourceUrl,242);
sHtml+="</a>";
this._elComment.value=oData.comment||config.msg.COMMENT
},validate:function(){if(!this._status.imageConfirmed){alert(config.msg.CONFIRM_URL);
this._elUrl.select();
return false
}if(this._oCurrentData.fileSize>config.consts.MAX_IMAGE_SIZE){alert(config.msg.IMAGE_FORMAT_URL);
this._elUrl.select();
return false
}for(var i in this._validateRules){if(!this.checkItem(i)){return false
}}return true
},checkItem:function(sLabel,bNotSelect){var oRule=this._validateRules[sLabel];
for(var i=0,l=oRule.check.length;
i<l;
i++){if(!oRule.check[i]["fn"].call(fnMatome,oRule.elm,oRule.check[i]["arg"],bNotSelect)){return false
}}return true
},_onsubmit:function(wEvent){if(this._bIsIng){return 
}this._bIsIng=true;
if(config.msg.BASEURL!=this._elBaseurl.value){this._elBaseurl.value=this._coverProtocol(this._elBaseurl.value)
}if(!this.validate()){this._interrupted();
return 
}COMMON.sendServer({m:this._oCurrentData.contentId?"update":"save","content.missionId":typeof MISSION_ID=="undefined"?this._oCurrentData.missionId:MISSION_ID,"content.source":this._oCurrentData.source,"content.sourceUrl":fnMatome.trim(this._elBaseurl.value),"content.url":fnMatome.trim(this._elUrl.value),"content.thumbnailUrl":this._oCurrentData.thumbnailUrl,"content.imageResolution":this._oCurrentData.width>0&&this._oCurrentData.height>0?this._oCurrentData.width+"x"+this._oCurrentData.height:"","content.fileSize":this._oCurrentData.fileSize,"content.title":fnMatome.trim(this._elTitle.value),"content.description":fnMatome.trim(this._elComment.value),"content.contentId":this._oCurrentData.contentId||"","content.searchKeyword":this._oCurrentData.keyword||""},$Fn(this._response,this).bind())
},_interrupted:function(){this._bIsIng=false
},_response:function(oRes,oData){if(!this._welLayer.visible()){return 
}if(oRes.result){this._fnSaved({type:oData.type,title:oData["content.title"],comment:oData["content.description"],source:oData["content.source"],endUrl:"/odai/"+oData["content.missionId"]+"/"+oRes.resourceId,sourceUrl:oData["content.sourceUrl"],thumbnailUrl:oData["content.thumbnailUrl"],originalImageUrl:oData["content.url"],size:oData["content.fileSize"],width:oData["content.imageResolution"].split("x")[0],height:oData["content.imageResolution"].split("x")[1],contentId:oData["content.contentId"]||oRes.contentId,publication:oRes.publication||"",isDirectInputFlag:oRes.isDirectInputFlag||false},this._fnCallback);
this.hide()
}else{this._bIsIng=false;
alert(oRes.message||config.msg.SAVE_ERR);
if(oRes.message){location.href=config.consts.MISSION_URL+oData["content.missionId"]
}}}}
})("nj.mission.ImageDirectLayer");
(function(namespace){var config={id:"userImageLayer",style:{FOG:"fog",GREY:"ready",OVER:"hover",UPLOADING:"show"},node:{BASE:"> DIV.shadow > DIV.shadowSide > DIV.subLayerTemplate",CLOSE_BTN:"> A.layerClose",THUMB_CONTAINER:"> DIV.layerContents > DL > DD > OL.imagesList",THUMB:"LI",THUMB_DELBTN:"button.btnDelete",THUMB_INFO:"info",FLASH_CON:"_jFlashUploader",FLASH:"multiUploader",UPLOAD_STATUS:"> DIV.uploadStatus",UPLOAD_INFO:"> DIV.uploadStatus > P > SPAN.uploadStatusInfo",UPLOAD_IMG_BTN:"> DIV.layerContents > DL > DD.multiUpload > DIV.btnUpload > IMG",TITLE:"> DIV.layerContents > DL > DD.imageTitle > .inTxtWrapper > INPUT",COMMENT:"> DIV.layerContents > DL > DD.introduction > .inTxtWrapper > TEXTAREA",SUBMIT:"> DIV.layerContents > DIV.btns > BUTTON"},msg:{TITLE:"タイトルを入力してください",COMMENT:"紹介内容を入力してください",CROP_IMAGE:"アップロードボタンをクリックして、登録する画像を選んでください。",RESULT_ERR:"一時的にご利用できません",OVER_TITLE:"タイトルは、全角100文字以内で入力してください。",OVER_COMMENT:"紹介コメントは、全角300文字以内で入力してください。",OVER_URL:"URLは、500文字以内で入力してください。",UPLOAD_EXT:"JPG、JPEG、GIF、PNGのみ対応しています。",UPLOAD_FAIL:"アップロードに失敗した画像があります。"},template:{UPLOAD_LIMIT:"1回のアップロードで追加できるのは、#max#枚までです。",THUMB:'<img src="#url#" width="#width#" height="#height#" alt="" border="0" /><button class="btnDelete"><span>削除</span></button>',UPLOAD:"<em>#current#</em>/#total#"},consts:{layerWidth:539,submitUrl:"/content.ajax",MAX_TITLE_LENGTH:100,MAX_COMMENT_LENGTH:300,MAX_URL_LENGTH:500,MISSION_URL:"/odai/",MAX_FILE_NUM:18},upload:{FILE_TYPE:[["Images (*.jpg, *jpeg, *.gif, *.png, *.bmp, その他)","*.jpg;*.jpeg;*.gif;*.png;*.bmp;*.pcx;*.ras;*.pbm;*.pgm;*.ppm"]]}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(fnCallback){this._sDocTitle=document.title;
this._initCallback(fnCallback||{});
this._getElementRef();
this._initEvent();
this._initFoggy();
this._SWF=fnCallback.flashInit()
},_initCallback:function(fnCallback){this._fnSaved=fnCallback.saved||function(){};
this._fnBeforeShow=fnCallback.beforeShow||function(){};
this._fnBeforeHide=fnCallback.beforeHide||function(){}
},_getElementRef:function(){this._welLayer=$Element(config.id);
var elBase=$$.getSingle(config.node.BASE,this._welLayer.$value());
this._elClose=$$.getSingle(config.node.CLOSE_BTN,elBase);
this._elThumbList=$$.getSingle(config.node.THUMB_CONTAINER,elBase);
this._elUploadBtn=$$.getSingle(config.node.UPLOAD_IMG_BTN,elBase);
this._elUploadStat=$$.getSingle(config.node.UPLOAD_STATUS,elBase);
this._elUploadInfo=$$.getSingle(config.node.UPLOAD_INFO,elBase);
this._elTitle=$$.getSingle(config.node.TITLE,elBase);
this._elComment=$$.getSingle(config.node.COMMENT,elBase);
this._elSubmit=$$.getSingle(config.node.SUBMIT,elBase);
this._bIsIng=false;
this._bIsFocusTitle=false
},_initEvent:function(){$Fn(function(wEvent){this.hide();
wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(this._elClose,"click");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(!this._bIsFocusTitle&&wEvent.element.value==config.msg.TITLE){wEvent.element.value=""
}wEvent.element.select();
this._bIsFocusTitle=true
},this).attach(this._elTitle,"focus");
$Fn(function(wEvent){if(wEvent.key().enter){wEvent.stop();
this._onsubmit()
}},this).attach(this._elTitle,"keydown");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.msg.COMMENT){wEvent.element.value=""
}wEvent.element.select()
},this).attach(this._elComment,"focus");
$Fn(this._onsubmit,this).attach(this._elSubmit,"click")
},_initFoggy:function(){var t=this;
this._foggy=new nhn.Foggy({showDuration:200,showOpacity:nhn.Effect.linear(0.3),hideDuratioin:200,hideOpacity:nhn.Effect.linear(0),zIndex:32000,fps:15}).attach({show:function(){var oArea=$Document().scrollSize();
t._welLayer.css({left:((oArea.width-config.consts.layerWidth)/2)+"px",top:"0px"});
t._welLayer.show();
if(!t._elFlashObject){if($Agent().flash().installed){t._SWF.put(config.node.FLASH_CON);
t._elFlashObject=$(config.node.FLASH)
}else{var welDialog=$Element($$.getSingle(".noticeNfp"));
$Fn(function(e){welDialog.show();
welDialog.css("zIndex",t._welLayer.css("zIndex")+1);
$Element($$.getSingle(".noFlashStatus")).css("display","block");
e.stop()
}).attach([config.node.FLASH_CON,t._elUploadBtn],"click");
$Fn(function(e){welDialog.hide();
$Element($$.getSingle(".noFlashStatus")).css("display","none");
e.stop()
}).attach($$.getSingle(".ntcNfpLayerClose",welDialog.$value()),"click")
}}var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(t._welLayer.height()))/2+nScrollTop;
t._welLayer.css("top",(nTop<0?0:nTop)+"px");
t._refResize=$Fn(t._onResize,t).attach(window,"resize")
},hide:function(){t._clearLayer();
t._welLayer.hide();
t._refResize.detach(window,"resize");
t._bIsIng=false;
t._bIsFocusTitle=false
}});
this._foggy.getFog().className=config.style.FOG
},_onResize:function(wEvent){var oArea=$Document().scrollSize();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(this._welLayer.height()))/2+nScrollTop;
this._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:(nTop<0?0:nTop)+"px"})
},fileFilter:function(){document.title=this._sDocTitle;
return config.upload.FILE_TYPE
},_addData:function(oData){var THIS=this;
oData=oData||{};
if(oData.url&&oData.thumbnailUrl){var elThumb=document.createElement(config.node.THUMB);
elThumb.innerHTML=nj.replaceStr(config.template.THUMB,{url:oData.thumbnailUrl,width:89,height:89});
var fnInfoAdd=function(oData,sClassName){var elInput=document.createElement("input");
elInput.className=sClassName;
elInput.value=$Json(oData).toString();
elInput.type="hidden";
elThumb.appendChild(elInput)
};
fnInfoAdd(oData,config.node.THUMB_INFO);
$Fn(function(e){$Element(elThumb).addClass(config.style.OVER)
}).attach(elThumb,"mouseover");
$Fn(function(e){$Element(elThumb).removeClass(config.style.OVER)
}).attach(elThumb,"mouseout");
var fnDelete=function(e){while(elThumb.lastChild){elThumb.removeChild(elThumb.lastChild)
}elThumb.parentNode.removeChild(elThumb);
THIS._collect();
e.stop()
};
var elDel=$$.getSingle(config.node.THUMB_DELBTN,elThumb);
$Fn(fnDelete).attach(elDel,"click");
this._elThumbList.appendChild(elThumb);
this._collect()
}else{this._aUploadFailFiles.push(oData.originalFileName||"")
}},uploadStart:function(o){this._nCurrentUploaded=0;
this._nSelectedUploadImages=o.length;
this._aSelectedUploadImages=o;
this._aUploadFailFiles=[];
this._elUploadInfo.innerHTML=nj.replaceStr(config.template.UPLOAD,{current:String(this._nCurrentUploaded),total:this._nSelectedUploadImages});
this._loading(true)
},uploading:function(sValue){var oResult=$Json(sValue).toObject();
this._nCurrentUploaded++;
this._elUploadInfo.innerHTML=nj.replaceStr(config.template.UPLOAD,{current:String(this._nCurrentUploaded),total:this._nSelectedUploadImages});
if(this._nImgCount>=config.consts.MAX_FILE_NUM){this._loading(false);
this._elFlashObject.uploadCancel();
for(var i=this._nCurrentUploaded-1;
i<this._nSelectedUploadImages;
i++){this._aUploadFailFiles.push(this._aSelectedUploadImages[i].name)
}this.informFail(this._aUploadFailFiles);
return 
}this._addData(oResult.qa);
if((this._nSelectedUploadImages<=this._nCurrentUploaded)){var THIS=this;
var fnDelay=function(){THIS.informFail(THIS._aUploadFailFiles);
THIS._loading(false)
};
setTimeout(fnDelay,300);
this._elFlashObject.uploadCancel()
}},informFail:function(aFailFiles){var nUploadFailFiles=aFailFiles.length;
var nEmpty=0;
if(nUploadFailFiles>0){var sMsg=config.msg.UPLOAD_FAIL+"\n";
for(var i=0;
i<nUploadFailFiles;
i++){if(aFailFiles[i]&&aFailFiles[i].length>0){sMsg+="・"+aFailFiles[i]+"\n"
}else{nEmpty++
}}if(nEmpty>0){sMsg+="・ファイル名が確認不可:"+nEmpty+"枚"
}alert(sMsg)
}},uploadError:function(code,message){var THIS=this;
this._aUploadFailFiles.push(this._aSelectedUploadImages[this._nCurrentUploaded].name);
this._nCurrentUploaded++;
if((this._nSelectedUploadImages<=this._nCurrentUploaded)){var THIS=this;
var fnDelay=function(){THIS.informFail(THIS._aUploadFailFiles);
THIS._loading(false)
};
setTimeout(fnDelay,300);
this._elFlashObject.uploadCancel()
}},_loading:function(bIsLoad){if(bIsLoad){$Element(this._elUploadStat).addClass(config.style.UPLOADING)
}else{$Element(this._elUploadStat).removeClass(config.style.UPLOADING)
}},_collect:function(){this._aDatas=[];
var aElements=$$("."+config.node.THUMB_INFO,this._elThumbList);
var nElements=aElements.length;
for(var i=0;
i<nElements;
i++){this._aDatas.push($Json(aElements[i].value).toObject())
}this._nImgCount=(this._aDatas&&this._aDatas.length)?this._aDatas.length:0
},_clearLayer:function(){delete this._aDatas;
this._loading(false);
try{this._elFlashObject.uploadCancel()
}catch(e){}while(this._elThumbList.lastChild){this._elThumbList.removeChild(this._elThumbList.lastChild)
}$Element(this._elTitle).addClass(config.style.GREY).attr("value",config.msg.TITLE);
$Element(this._elComment).addClass(config.style.GREY).attr("value",config.msg.COMMENT)
},hide:function(){if(this._welLayer.visible()){this._fnBeforeHide();
this._foggy.hide()
}},visible:function(){return this._welLayer.visible()
},show:function(){this._fnBeforeShow();
this._initData();
this._foggy.show(this._welLayer.$value())
},_initData:function(){while(this._elThumbList.lastChild){this._elThumbList.removeChild(this._elThumbList.lastChild)
}this._collect();
this._elTitle.value=config.msg.TITLE;
this._elComment.value=config.msg.COMMENT
},_onsubmit:function(wEvent){if(this._bIsIng){return 
}this._bIsIng=true;
this._nCurrentSubmitted=0;
this._aSubmitFailFiles=[];
if(this._nImgCount==0){alert(config.msg.CROP_IMAGE);
this._interrupted();
return 
}if(!fnMatome.validateBlank(this._elTitle,{msg:config.msg.TITLE})){this._interrupted();
return 
}if(!this._bIsFocusTitle&&!fnMatome.validateDefaultText(this._elTitle,{msg:config.msg.TITLE,text:config.msg.TITLE})){this._interrupted();
return 
}if(!fnMatome.validateLength(this._elTitle,{msg:config.msg.OVER_TITLE,min:0,max:config.consts.MAX_TITLE_LENGTH})){this._interrupted();
return 
}fnMatome.clearText(this._elComment,{text:config.msg.COMMENT});
if(this._elComment.value!=""){if(!fnMatome.validateLength(this._elComment,{msg:config.msg.OVER_COMMENT,min:0,max:config.consts.MAX_COMMENT_LENGTH})){this._interrupted();
return 
}}this._elUploadInfo.innerHTML=nj.replaceStr(config.template.UPLOAD,{current:String(this._nCurrentSubmitted),total:this._nImgCount});
this._loading(true);
this._requestSubmit(this._nCurrentSubmitted)
},_requestSubmit:function(n){var oData=this._aDatas[n];
if(oData&&!oData.url){this._aSubmitFailFiles.push(oData.originalFileName);
this._nCurrentSubmitted++;
if(this._nImgCount>this._nCurrentSubmitted){this._requestSubmit(this._nCurrentSubmitted)
}else{this.informFail(this._aSubmitFailFiles)
}return 
}fnMatome.sendServer(config.consts.submitUrl,{m:"save",originalFileName:oData.originalFileName,"content.missionId":MISSION_ID,"content.source":NICK_NAME,"content.url":oData.url,"content.thumbnailUrl":oData.thumbnailUrl,"content.imageResolution":oData.imageResolution,"content.fileSize":oData.fileSize,"content.title":fnMatome.trim(this._elTitle.value),"content.description":fnMatome.trim(this._elComment.value)},$Fn(this._response,this).bind())
},_interrupted:function(){this._bIsIng=false
},_response:function(oRes,oData){if(oRes.result){this._fnSaved({type:oData.type,title:oData["content.title"],comment:oData["content.description"],source:oData["content.source"],sourceUrl:"",endUrl:"/odai/"+oData["content.missionId"]+"/"+oRes.resourceId,thumbnailUrl:oData["content.thumbnailUrl"],originalImageUrl:oData["content.url"],size:oData["content.fileSize"],width:oData["content.imageResolution"].split("x")[0],height:oData["content.imageResolution"].split("x")[1],contentId:oData["content.contentId"]||oRes.contentId,publication:oRes.publication||"",isDirectInputFlag:true})
}else{var sName=oData?oData.originalFileName:"";
this._aSubmitFailFiles.push(oData.originalFileName)
}this._nCurrentSubmitted++;
this._elUploadInfo.innerHTML=nj.replaceStr(config.template.UPLOAD,{current:String(this._nCurrentSubmitted),total:this._nImgCount});
if(this._nImgCount<=this._nCurrentSubmitted){var THIS=this;
var fnDelay=function(){THIS._interrupted();
THIS.informFail(THIS._aSubmitFailFiles);
THIS.hide()
};
setTimeout(fnDelay,300)
}else{this._requestSubmit(this._nCurrentSubmitted)
}}}
})("nj.mission.ImageUserLayer");
(function(namespace){var config={id:"videoLayer",style:{FOG:"fog",GREY:"ready",NOT_PLAY:"videoViewOff",NOT_INPUT:"movieUrlOff"},node:{BASE:"> DIV.shadow > DIV.shadowSide > DIV.subLayerTemplate",CLOSE_BTN:"> A.layerClose",CONTROL:"DL",TITLE:"DL > DD.itemTitle > .inTxtWrapper >  INPUT",COMMENT:"DL > DD.commentIntroduction > .inTxtWrapper > TEXTAREA",PLAY_OPTION:"DL > DD.movieUrl > DIV.option",PLAY_TIME:"DL > DD.movieUrl > DIV.option > SPAN.time",PLAY_SITE:"DL > DD.movieUrl > DIV.option > SPAN.source > A",EMBED_AREA:"DL > DD.movieUrl > DIV.videoView",URL_INPUT_AREA:"DL > DD.movieUrl > DIV.urlInputArea",URL_INPUT_TITLE:"DL > DT.movieUrl",URL_INPUT:"DL > DD.movieUrl > DIV.urlInputArea > DIV.inTxtWrapper > INPUT",URL_GET_DATA:"DL > DD.movieUrl > DIV.urlInputArea > BUTTON",NOT_PLAY:"DL > DD.movieUrl > DIV.exteriorContents",NOT_PLAY_THUMB:"> DIV.thumb > IMG",NOT_PLAY_SITE:"> DIV.listContents > DIV.source > A",NOT_PLAY_LINK:"> DIV.listContents > A.btnGoSite",NOT_PLAY_TIME:"> DIV.thumb > SPAN",SUBMIT:"> DIV.layerContents > DIV.btns > BUTTON"},MSG:{URL:"追加する動画のURLを入力してください",URL_CONFIRM:"再生できる動画がないか、未対応の動画形式のため、まとめに追加できません。",TITLE:"タイトルを入力してください",COMMENT:"紹介コメントを入力してください",SAVE_ERR:"一時的にご利用できません",VIDEO:"<p>登録したい動画のurlを入力後確認ボタンを押してください。<br/>添付した動画をあらかじめ見せてくれます。</p>",VIDEO_INIT:"<p>URL入力後、確認ボタンをクリックしてください。<br/>動画が表示されます。</p>",PARSE_ERR:"入力されたURLのページは、動画がないか、未対応の動画形式です。",OVER_TITLE:"タイトルは、100文字以内で入力してください。",OVER_COMMENT:"紹介コメントは、300文字以内で入力してください。",OVER_URL:"URLは、500文字以内で入力してください。",NOT_URL:"URLの入力形式が異なっています。"},consts:{MAX_TITLE_LENGTH:100,MAX_COMMENT_LENGTH:300,MAX_URL_LENGTH:500,LAYOUT:38,MIN_WIDTH:463,URL:"/content.ajax",MISSION_URL:"/odai/"}};
var COMMON={sendServer:function(oData,fn){new $Ajax(config.consts.URL,{timeout:5,onload:function(oRes){fn(oRes.json(),oData)
},ontimeout:function(){fn({result:false})
}}).request(oData)
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(fnCallback){this._initVariable();
this._initCallback(fnCallback||{});
this._getElementRef();
this._initEvent();
this._initFoggy()
},_initVariable:function(){this._nLayerWidth=config.consts.MIN_WIDTH-config.consts.LAYOUT
},_initCallback:function(fnCallback){this._fnSaved=fnCallback.saved||function(){};
this._fnClosed=fnCallback.closed||function(){};
this._fnBeforeShow=fnCallback.beforeShow||function(){};
this._fnBeforeHide=fnCallback.beforeHide||function(){}
},_getElementRef:function(){this._welLayer=$Element(config.id);
var elBase=$$.getSingle(config.node.BASE,this._welLayer.$value());
this._elClose=$$.getSingle(config.node.CLOSE_BTN,elBase);
this._elTitle=$$.getSingle(config.node.TITLE,elBase);
this._elComment=$$.getSingle(config.node.COMMENT,elBase);
this._welControl=$Element($$.getSingle(config.node.CONTROL,elBase));
this._welOption=$Element($$.getSingle(config.node.PLAY_OPTION,elBase));
this._elPlayTime=$$.getSingle(config.node.PLAY_TIME,elBase);
this._elPlaySite=$$.getSingle(config.node.PLAY_SITE,elBase);
this._welView=$Element($$.getSingle(config.node.EMBED_AREA,elBase));
this._welUrlInputTitle=$Element($$.getSingle(config.node.URL_INPUT_TITLE,elBase));
this._welUrlInputArea=$Element($$.getSingle(config.node.URL_INPUT_AREA,elBase));
this._elUrlInput=$$.getSingle(config.node.URL_INPUT,elBase);
this._elUrlGetData=$$.getSingle(config.node.URL_GET_DATA,elBase);
this._welNotPlay=$Element($$.getSingle(config.node.NOT_PLAY,elBase));
this._elNotPlaySite=$$.getSingle(config.node.NOT_PLAY_SITE,this._welNotPlay.$value());
this._elNotPlayThumb=$$.getSingle(config.node.NOT_PLAY_THUMB,this._welNotPlay.$value());
this._elNotPlayLink=$$.getSingle(config.node.NOT_PLAY_LINK,this._welNotPlay.$value());
this._elNotPlayTime=$$.getSingle(config.node.NOT_PLAY_TIME,this._welNotPlay.$value());
this._elSubmit=$$.getSingle(config.node.SUBMIT,elBase);
this._bIsIng=false
},_initEvent:function(){$Fn(function(wEvent){this.hide();
wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(this._elClose,"click");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.MSG.TITLE){wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elTitle,"focus");
$Fn(function(wEvent){if(wEvent.key().enter){wEvent.stop();
this._onsubmit()
}},this).attach(this._elTitle,"keydown");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.MSG.COMMENT){wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elComment,"focus");
$Fn(function(wEvent){var el=wEvent.element;
if(el.notFirst){if(fnMatome.trim(el.value)==config.MSG.URL){el.value=""
}}else{el.notFirst=true
}},this).attach(this._elUrlInput,"focus");
$Fn(function(wEvent){if(fnMatome.trim(wEvent.element.value)==config.MSG.URL){wEvent.element.value=""
}},this).attach(this._elUrlInput,"click");
$Fn(function(wEvent){if(wEvent.key().enter){wEvent.stop();
$Fn(this._parseURL,this).bind()()
}},this).attach(this._elUrlInput,"keydown");
$Fn(this._onsubmit,this).attach(this._elSubmit,"click");
$Fn(this._parseURL,this).attach(this._elUrlGetData,"click")
},_initFoggy:function(){var t=this;
this._foggy=new nhn.Foggy({showDuration:0,showOpacity:nhn.Effect.linear(0.3),hideDuratioin:200,hideOpacity:nhn.Effect.linear(0),zIndex:32000,fps:15}).attach({show:function(){t._initDisplay(t._sViewMode);
t._initData();
if(t._sViewMode=="userPlay"){t._welOption.hide()
}var oArea=$Document().scrollSize();
t._welLayer.css({left:((oArea.width-config.consts.MIN_WIDTH)/2)+"px",top:"0px",width:t._nLayerWidth+config.consts.LAYOUT+"px"});
t._welLayer.show();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(t._welLayer.height()))/2+nScrollTop;
t._welLayer.css("top",(nTop<0?0:nTop)+"px");
t._refResize=$Fn(t._onResize,t).attach(window,"resize");
if(t._welUrlInputArea.visible()){t._elUrlInput.select()
}else{t._elTitle.focus()
}if(t._sViewMode=="userPlay"){lcs_do({sti:"layer_video_URL"})
}else{lcs_do({sti:"layer_video_search"})
}},hide:function(){t._clearLayer();
t._initDisplay("hide");
t._welLayer.hide();
t._bIsIng=false;
t._refResize.detach(window,"resize");
t._fnClosed()
}});
this._foggy.getFog().className=config.style.FOG
},_onResize:function(wEvent){var oArea=$Document().scrollSize();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(this._welLayer.height()))/2+nScrollTop;
this._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:(nTop<0?0:nTop)+"px"})
},_clearLayer:function(){this._oCurrentData=null;
this._welView.html(config.MSG.VIDEO_INIT);
this._elPlayTime.innerHTML="";
this._elPlaySite.innerHTML="";
$Element(this._elTitle).addClass(config.style.GREY);
this._elTitle.value=config.MSG.TITLE;
$Element(this._elComment).addClass(config.style.GREY);
this._elComment.value=config.MSG.COMMENT;
this._elUrlInput.value=config.MSG.URL;
this._elUrlInput.notFirst=false;
this._bParsed=false;
this._welLayer.css("width",config.consts.MIN_WIDTH);
this._initVariable()
},visible:function(){return this._welLayer.visible()
},hide:function(){if(this._welLayer.visible()){this._fnBeforeHide();
this._foggy.hide()
}},show:function(oData,fn){try{nclkReplaceArea(this._welLayer.$value().firstChild,"vdo_amc")
}catch(e){}this._fnBeforeShow();
this._fnCallback=fn;
this._oCurrentData=oData;
this._sViewMode="searchPlay";
this._foggy.show(this._welLayer.$value())
},showDirect:function(){try{nclkReplaceArea(this._welLayer.$value().firstChild,"vdo_amd")
}catch(e){}this._fnBeforeShow();
this._fnCallback=function(){};
this._sViewMode="userPlay";
this._foggy.show(this._welLayer.$value())
},modifyShow:function(oData){this._fnBeforeShow();
this._fnCallback=function(){};
this._oCurrentData=oData;
this._sVieMode="searchPlay";
this._foggy.show(this._welLayer.$value())
},_initDisplay:function(sMode){if(sMode=="searchPlay"){this._welControl.className("");
this._welNotPlay.hide();
this._welUrlInputTitle.hide();
this._welUrlInputArea.hide();
this._welView.show();
this._welOption.show()
}else{if(sMode=="searchThumb"){this._welControl.className(config.style.NOT_INPUT+" "+config.style.NOT_PLAY);
this._welView.hide();
this._welOption.hide();
this._welUrlInputTitle.hide();
this._welUrlInputArea.hide();
this._welNotPlay.show()
}else{if(sMode=="userPlay"){this._welControl.className("");
this._welNotPlay.hide();
this._welView.show();
this._welOption.show();
this._welUrlInputTitle.show();
this._welUrlInputArea.show()
}else{if(sMode=="userThumb"){this._welControl.className(config.style.NOT_PLAY);
this._welView.hide();
this._welOption.hide();
this._welUrlInputTitle.show();
this._welUrlInputArea.show();
this._welNotPlay.show()
}else{if(sMode=="hide"){this._welNotPlay.hide();
this._welView.hide();
this._welOption.hide();
this._welUrlInputTitle.hide();
this._welUrlInputArea.hide()
}}}}}},_initData:function(sViewType){var oData=this._oCurrentData;
if(oData){this._elTitle.value=oData.title?fnMatome.htmlEncode(oData.title.replace(/<\/?[^>]*>/g,"")):config.MSG.TITLE;
if(oData.title){$Element(this._elTitle).removeClass(config.style.GREY)
}this._elComment.value=oData.comment||config.MSG.COMMENT;
var oVideoFilter=mFilter.html(oData.url);
if(oVideoFilter){this._initDisplay(sViewType||"searchPlay");
this._elPlayTime.innerHTML=oData.playTime;
this._elPlaySite.innerHTML=oData.source;
this._elPlaySite.href=oData.sourceUrl;
this._welView.html(oVideoFilter.html);
this._nLayerWidth=oVideoFilter.width
}else{this._initNotPlay(sViewType||"searchThumb",oData)
}}},_initNotPlay:function(sViewType,oData){this._initDisplay(sViewType);
this._elNotPlaySite=this._elNotPlaySite||$$.getSingle(config.node.NOT_PLAY_SITE,this._welNotPlay.$value());
this._elNotPlayThumb=this._elNotPlayThumb||$$.getSingle(config.node.NOT_PLAY_THUMB,this._welNotPlay.$value());
this._elNotPlayLink=this._elNotPlayLink||$$.getSingle(config.node.NOT_PLAY_LINK,this._welNotPlay.$value());
this._elNotPlayTime=this._elNotPlayTime||$$.getSingle(config.node.NOT_PLAY_PLAYTIME,this._welNotPlay.$value());
this._elNotPlaySite.innerHTML=oData.source;
this._elNotPlaySite.href=oData.sourceUrl;
this._elNotPlayThumb.src=oData.thumbnailUrl;
this._elNotPlayLink.href=/^http:\/\//.test(oData.url)?oData.url:"http://"+oData.url;
this._elNotPlayTime.innerHTML=oData.playTime;
this._nLayerWidth=config.consts.MIN_WIDTH-config.consts.LAYOUT
},_parseURL:function(){var sUrl=fnMatome.trim(this._elUrlInput.value);
if(sUrl==""){return 
}if(!fnMatome.validateLength(this._elUrlInput,{msg:config.MSG.OVER_URL,min:0,max:config.consts.MAX_URL_LENGTH})){return 
}if(!/^http(s?):\/\/.*/i.test(sUrl)){this._elUrlInput.value=sUrl="http://"+sUrl
}if(!fnMatome.validateURL(sUrl)){alert(config.MSG.NOT_URL);
return 
}var oVideoFilter=mFilter.html(sUrl);
if(oVideoFilter){this._welView.html(oVideoFilter.html);
this._oCurrentData={source:oVideoFilter.name||"",sourceUrl:oVideoFilter.url||"",url:sUrl,thumbnailUrl:oVideoFilter.thumb,playTime:"",type:"video"};
this._bParsed=true;
this._welLayer.css("width",oVideoFilter.width+config.consts.LAYOUT+"px");
fnMatome.sendServer("/videoInfo.ajax",{q:sUrl},$Fn(this._responseVideoTitle,this).bind())
}else{fnMatome.sendServer("/videoInfo.ajax",{q:sUrl},$Fn(this._responseVideoInfo,this).bind())
}},_responseVideoTitle:function(oRes){this._oCurrentData.title=oRes.title||"";
this._initData("userPlay")
},_responseVideoInfo:function(oRes){if(typeof oRes.thumbnailUrl=="undefined"){this._initDisplay("userPlay");
this._welView.html(config.MSG.PARSE_ERR)
}else{this._oCurrentData={source:oRes.siteName||"",sourceUrl:oRes.siteUrl||"",url:oRes.url,thumbnailUrl:oRes.thumbnailUrl,playTime:oRes.playTime,type:"video",title:oRes.title||""};
this._initData("userThumb");
this._bParsed=true
}},_onsubmit:function(wEvent){if(this._bIsIng){return 
}this._bIsIng=true;
var sUserUrl="";
if(this._welUrlInputArea.visible()&&!this._bParsed){alert(config.MSG.URL_CONFIRM);
this._elUrlInput.focus();
this._interrupted();
return 
}if(!fnMatome.validateBlank(this._elTitle,{msg:config.MSG.TITLE})){this._interrupted();
return 
}if(!fnMatome.validateDefaultText(this._elTitle,{msg:config.MSG.TITLE,text:config.MSG.TITLE})){this._interrupted();
return 
}if(!fnMatome.validateLength(this._elTitle,{msg:config.MSG.OVER_TITLE,min:0,max:config.consts.MAX_TITLE_LENGTH})){this._interrupted();
return 
}fnMatome.clearText(this._elComment,{text:config.MSG.COMMENT});
if(this._elComment.value!=""){if(!fnMatome.validateLength(this._elComment,{msg:config.MSG.OVER_COMMENT,min:0,max:config.consts.MAX_COMMENT_LENGTH})){this._interrupted();
return 
}}COMMON.sendServer({m:(typeof this._oCurrentData.contentId!="undefined"?"update":"save"),type:this._oCurrentData.type,"content.missionId":typeof MISSION_ID=="undefined"?this._oCurrentData.missionId:MISSION_ID,"content.source":this._oCurrentData.source||"","content.sourceUrl":this._oCurrentData.sourceUrl||"","content.url":this._oCurrentData.url,"content.thumbnailUrl":this._oCurrentData.thumbnailUrl||"","content.videoRunningTime":this._oCurrentData.playTime||"","content.title":fnMatome.trim(this._elTitle.value),"content.description":fnMatome.trim(this._elComment.value),"content.contentId":this._oCurrentData.contentId||"","content.searchKeyword":this._oCurrentData.keyword||"",referer:this._oCurrentData.referer||""},$Fn(this._response,this).bind())
},_interrupted:function(){this._bIsIng=false
},_response:function(oRes,oData){if(oRes.result){this._fnSaved({type:oData.type,title:oData["content.title"],comment:oData["content.description"],source:oData["content.source"],sourceUrl:oData["content.sourceUrl"],endUrl:"/odai/"+oData["content.missionId"]+"/"+oRes.resourceId,thumbnailUrl:oData["content.thumbnailUrl"],url:oData["content.url"],playTime:oData["content.videoRunningTime"],contentId:oData["content.contentId"]||oRes.contentId},this._fnCallback);
this.hide()
}else{this._bIsIng=false;
alert(oRes.message||config.MSG.SAVE_ERR);
if(oRes.message){location.href=config.consts.MISSION_URL+oData["content.missionId"]
}}}}
})("nj.mission.VideoLayer");
(function(namespace){var config={node:{LIST:"> UL",PAGING:"> DIV.spaginate",CUR_PAGE:"> DIV.spaginate > EM",TOTAL_PAGE:"> DIV.spaginate > SPAN",PREV_BTN:"> DIV.spaginate > A:first-of-type",NEXT_BTN:"> DIV.spaginate > A:last-of-type"}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({$init:function(sId,numPerPage,config){this._getElementRef(sId);
this._initVariable(numPerPage);
this._initEvent();
this._config=config||{NCLK_TAGS:{AREA_CODE:undefined,PAGE:undefined}}
},_getElementRef:function(sId){this._welMother=$Element(sId);
var elBase=this._welMother.$value();
this._elList=$$.getSingle(config.node.LIST,elBase);
this._elCurPage=$$.getSingle(config.node.CUR_PAGE,elBase);
this._elTotalPage=$$.getSingle(config.node.TOTAL_PAGE,elBase);
this._elPrevBtn=$$.getSingle(config.node.PREV_BTN,elBase);
this._elNextBtn=$$.getSingle(config.node.NEXT_BTN,elBase)
},_initVariable:function(numPerPage){this._numPerPage=numPerPage;
this._nTotal=this._calcuTotalPage();
if(this._nTotal==1){this._welMother.hide();
return 
}this._nCurPage=1;
this._elTotalPage.innerHTML=this._nTotal
},_calcuTotalPage:function(){return parseInt((this._getChild().length-1)/this._numPerPage)+1
},_initEvent:function(){$Fn(this._onclickPrev,this).attach(this._elPrevBtn,"click");
$Fn(this._onclickNext,this).attach(this._elNextBtn,"click")
},_onclickPrev:function(wEvent){wEvent.stop();
if(this._nCurPage==1){return 
}this._selectView(--this._nCurPage,wEvent)
},_onclickNext:function(wEvent){wEvent.stop();
if(this._nCurPage==this._nTotal){return 
}this._selectView(++this._nCurPage,wEvent)
},_getChild:function(){return $$("> LI",this._elList)
},_selectView:function(targetPage,wEvent){var nViewPage=this._nCurPage-1;
$A(this._getChild()).forEach(function(child,index){if(index>=(this._numPerPage*nViewPage)&&index<this._numPerPage*(nViewPage+1)){child.style.display="block"
}else{child.style.display="none"
}},this);
this._elCurPage.innerHTML=this._nCurPage;
try{var nclkObj=this._config.NCLK_TAGS;
nclkDirectRequest(wEvent.currentElement,wEvent,nclkObj.AREA_CODE,nclkObj.PAGE,this._nCurPage);
wEvent.stop()
}catch(e){}}})
})("SmallPagingHandler");
(function(ns){var config={URL:"/content.ajax",oLayer:nj.mission.SiteLayer,msg:{REMOVE_CONFIRM:"本当に削除しますか？\n一度削除すると元に戻すことはできません。"},refine:function(oData){return{contentId:oData.contentId,title:oData.title,comment:oData.description,sourceUrl:oData.url,thumbnailUrl:oData.thumbnailUrl}
}};
var pkg=$.verifyPackageName(ns);
pkg.container[pkg.name]={init:function(fnCallback){this._initVariable();
this._initCallback(fnCallback);
this._initComponent()
},_initVariable:function(){this._bIng=false
},_initCallback:function(fn){this._fnEdit=fn.edit||function(){};
this._fnRemove=fn.remove||function(){};
this._fnClose=fn.close||function(){}
},_initComponent:function(){config.oLayer.init({saved:$Fn(this._edited,this).bind(),closed:$Fn(this._closed,this).bind()})
},_closed:function(){this._reInit();
this._fnClose()
},edit:function(element,sMissionId,sContentId){this._edit(element,sMissionId);
fnMatome.sendServer(config.URL,{m:"json",missionId:sMissionId,contentId:sContentId},function(oData){config.oLayer.modifyShow(config.refine(oData))
})
},editResource:function(element,sMissionId,sResourceId){this._edit(element,sMissionId);
fnMatome.sendServer(config.URL,{m:"json",missionId:sMissionId,resourceId:sResourceId},function(oData){config.oLayer.modifyShow(config.refine(oData))
})
},_edit:function(element,sMissionId){if(this._bIng){return 
}this._bIng=true;
this._currentElement=element;
this._sMissionId=sMissionId
},_edited:function(oData){oData.missionId=this._sMissionId;
var element=this._currentElement;
this._reInit();
this._fnEdit(oData,element)
},_editThumbnail:function(elParent,oData){var elThumb=$$.getSingle("> DIV.thumb",elParent);
if(elThumb){if(oData.thumbnailUrl==""){elParent.removeChild(elThumb)
}else{var elImg=$$.getSingle("IMG",elThumb);
elImg.src=oData.thumbnailUrl;
elImg.title=oData.title
}}else{if(oData.thumbnailUrl!=""){var template="<a href='"+oData.url+"'>";
template+='<img onload="resizeImage( this, 100, 100);" onerror="errorImage( this, \'noimg100\');"';
template+=' src="'+oData.thumbnailUrl+'" title="'+oData.title+'"/>';
template+="</a>";
$Element("<DIV>").addClass("thumb").html(template).prependTo($Element(elParent))
}}},remove:function(element,sMissionId,sContentId){if(!this._remove(element,sMissionId)){return 
}fnMatome.sendServer(config.URL,{m:"delete","content.contentId":sContentId},$Fn(this._removed,this).bind())
},removeResource:function(element,sMissionId,sResourceId){if(!this._remove(element,sMissionId)){return 
}fnMatome.sendServer(config.URL,{m:"delete","content.contentId":"0",resourceId:sResourceId},$Fn(this._removed,this).bind())
},_remove:function(element,sMissionId){if(this._bIng){return false
}if(!confirm(config.msg.REMOVE_CONFIRM)){return false
}this._bIng=true;
this._currentElement=element;
this._sMissionId=sMissionId;
return true
},_removed:function(oData){oData.missionId=this._sMissionId;
var element=this._currentElement;
this._fnRemove(oData,element)
},_isEmptyContent:function(sCnt){if(sCnt=="1"){location.href="/odai/"+(MISSION_ID||this._sMissionId);
return true
}return false
},_findElement:function(elMe,tagName){tagName=tagName.toLowerCase();
do{if(elMe.tagName.toLowerCase()==tagName){break
}if(elMe.tagName.toLowerCase()=="body"){elMe=false;
break
}}while(elMe=elMe.parentNode);
return elMe
},_reInit:function(){this._currentElement=null;
this._sMissionId="";
this._bIng=false
}}
})("ModifySite");
(function(ns){var config={URL:"/content.ajax",oLayer:nj.mission.ImageLayer,msg:{REMOVE_CONFIRM:"本当に削除しますか？\n一度削除されると元に戻すことはできません。"},refine:function(oData){return{contentId:oData.contentId,title:oData.title,comment:oData.description,source:oData.source,sourceUrl:oData.sourceUrl,originalImageUrl:oData.url,thumbnailUrl:oData.thumbnailUrl,size:oData.fileSize,width:oData.imageResolution.split("x")[0],height:oData.imageResolution.split("x")[1],publication:oData.publication||"",isDirectInputFlag:oData.isDirectInputFlag}
}};
var pkg=$.verifyPackageName(ns);
pkg.container[pkg.name]={init:function(fnCallback){this._initVariable();
this._initCallback(fnCallback);
this._initComponent()
},_initVariable:function(){this._bIng=false
},_initCallback:function(fn){this._fnEdit=fn.edit||function(){};
this._fnRemove=fn.remove||function(){};
this._fnClose=fn.close||function(){}
},_initComponent:function(){config.oLayer.init({saved:$Fn(this._edited,this).bind(),closed:$Fn(this._closed,this).bind()})
},_closed:function(){this._reInit();
this._fnClose()
},edit:function(element,sMissionId,sContentId){if(this._bIng){return 
}this._bIng=true;
this._currentElement=element;
this._sMissionId=sMissionId;
fnMatome.sendServer(config.URL,{m:"json",missionId:sMissionId,contentId:sContentId},function(oData){config.oLayer.modifyShow(config.refine(oData))
})
},_edited:function(oData){oData.missionId=this._sMissionId;
var element=this._currentElement;
this._reInit();
this._fnEdit(oData,element)
},remove:function(element,sMissionId,sContentId){if(this._bIng){return 
}if(!confirm(config.msg.REMOVE_CONFIRM)){return 
}this._bIng=true;
this._currentElement=element;
this._sMissionId=sMissionId;
fnMatome.sendServer(config.URL,{m:"delete","content.contentId":sContentId},$Fn(this._removed,this).bind())
},_removed:function(oData){oData.missionId=this._sMissionId;
var element=this._currentElement;
this._fnRemove(oData,element)
},_isEmptyContent:function(sCnt){if(sCnt=="1"){location.href="/odai/"+(MISSION_ID||this._sMissionId);
return true
}return false
},_findElement:function(elMe,tagName){tagName=tagName.toLowerCase();
do{if(elMe.tagName.toLowerCase()==tagName){break
}if(elMe.tagName.toLowerCase()=="body"){elMe=false;
break
}}while(elMe=elMe.parentNode);
return elMe
},_reInit:function(){this._currentElement=null;
this._sMissionId="";
this._bIng=false
}}
})("ModifyImage");
(function(ns){var config={URL:"/content.ajax",oLayer:nj.mission.VideoLayer,MSG:{REMOVE_CONFIRM:"本当に削除しますか？\n一度削除されると元に戻すことはできません。"},refine:function(oData){return{missionId:oData.missionId,contentId:oData.contentId,title:oData.title,comment:oData.description,source:oData.source,sourceUrl:oData.sourceUrl,url:oData.url,thumbnailUrl:oData.thumbnailUrl,playTime:oData.videoRunningTime}
}};
var pkg=$.verifyPackageName(ns);
pkg.container[pkg.name]={init:function(fnCallback){this._initVariable();
this._initCallback(fnCallback);
this._initComponent()
},_initVariable:function(){this._bIng=false
},_initCallback:function(fn){this._fnEdit=fn.edit||function(){};
this._fnRemove=fn.remove||function(){};
this._fnClose=fn.close||function(){}
},_initComponent:function(){config.oLayer.init({saved:$Fn(this._edited,this).bind(),closed:$Fn(this._closed,this).bind()})
},_closed:function(){this._reInit();
this._fnClose()
},edit:function(element,sMissionId,sContentId){if(this._bIng){return 
}this._bIng=true;
this._currentElement=element;
this._sMissinoId=sMissionId;
fnMatome.sendServer(config.URL,{m:"json",missionId:sMissionId,contentId:sContentId},function(oData){config.oLayer.modifyShow(config.refine(oData))
})
},_edited:function(oData){oData.missionId=this._sMissionId;
var element=this._currentElement;
this._reInit();
this._fnEdit(oData,element)
},remove:function(element,sMissionId,sContentId){if(this._bIng){return 
}if(!confirm(config.MSG.REMOVE_CONFIRM)){return 
}this._bIng=true;
this._currentElement=element;
this._sMissionId=sMissionId;
fnMatome.sendServer(config.URL,{m:"delete","content.contentId":sContentId},$Fn(this._removed,this).bind())
},_removed:function(oData){oData.missionId=this._sMissionId;
var element=this._currentElement;
this._fnRemove(oData,element)
},_isEmptyContent:function(sCnt){if(sCnt=="1"){location.href="/odai/"+(MISSION_ID||this._sMissionId);
return true
}return false
},_findElement:function(elMe,tagName){tagName=tagName.toLowerCase();
do{if(elMe.tagName.toLowerCase()==tagName){break
}if(elMe.tagName.toLowerCase()=="body"){elMe=false;
break
}}while(elMe=elMe.parentNode);
return elMe
},_reInit:function(){this._currentElement=null;
this._sMissionId=null;
this._bIng=false
}}
})("ModifyVideo");
var REMOVE_CONFIRM_MSG="本当に削除しますか？\n一度削除されると元に戻すことはできません。";
function removeContent(sMissionId,sContentId){if(confirm(REMOVE_CONFIRM_MSG)){location.href="/odai/"+sMissionId+"/delete/"+sContentId
}}var bMissionRemoveProcess=false;
function confirmMissionRemove(sMissionId){if(bMissionRemoveProcess){return 
}return bMissionRemoveProcess=confirm(REMOVE_CONFIRM_MSG)
}function confirmRemove(){if(bMissionRemoveProcess){return 
}return bMissionRemoveProcess=confirm(REMOVE_CONFIRM_MSG)
}function removeMission(sMissionId){if(confirm(REMOVE_CONFIRM_MSG)){location.href="/odai/"+sMissionId+"/delete"
}}function removeMissionAjax(sMissionId){if(confirm(REMOVE_CONFIRM_MSG)){fnMatome.sendServer("/odai/"+sMissionId+"/delete",{},function(){location.reload()
})
}}function removeFreeTalk(sEncryptId,sElementId,sType){if(confirm(REMOVE_CONFIRM_MSG)){fnMatome.sendServer("/comment.ajax",{m:"ajaxDelete","comment.commentId":sElementId,"comment.encryptId":sEncryptId,"comment.typeCode":sType},function(oRes,oData){var oResult=(fnMatome.be(oRes.data)?oRes.data:oRes);
if(oResult.result){alert("削除しました。");
location.reload()
}})
}}function removeIW(sMissionId,sContentId){if(confirm(REMOVE_CONFIRM_MSG)){fnMatome.sendServer("/content.ajax",{m:"delete","content.contentId":sContentId},function(oRes){if(oRes.result){alert("削除しました。");
location.reload()
}})
}}(function(namespace){var config={id:{query:"userQuery",directInput:"directInput",asideControl:"asideControl",addedList:"addedItemList",tabList:"tabList",contents:"contents",missionGuide:"missionGuide",asideGuide:"asideMissionGuide",relatedKeyword:"relatedKeyword"},style:{ASIDE_CONTROL:"asideClose",TAB_SELECT:"selected"},NODE:{TAB_CHILD:"> LI",RESULT_AREA:"> DIV.siteListArea",EMPTY_AREA:"> DIV.missionNoContents",EMPTY_QUERY:"> DIV.missionNoContents > P.warning > STRONG",LOADING_AREA:"> DIV.loadingArea"},MSG:{DEFAULT:"キーワードを入力し、検索してください",ADDED_AT_COLLAPSED:"リンクを追加しました。追加した内容を確認しますか?",EMPTY_QUERY:"検索するキーワードを入力してください。"},TAB:["web","blog","bbs"],EXT_TAB:["google","yahoo"],template:{EMPTY_PRE:'<p class="warning">検索ワード<strong>',EMPTY_POST:"</strong>に一致する画像は見つかりませんでした。</p><p>キーワードが正しく入力されているかを確認してください。</p>",DELAY:'<p class="warning">一時的にご利用できません。</p>'},oSearcher:nj.mission.Searcher,oLayer:nj.mission.SiteLayer,oAdded:nj.mission.AddedList};
var COMMON={checkThumbType:function(oEntry,sSize){var sUrl="";
if(typeof oEntry["n$image"]!="undefined"){var sThumb=oEntry["n$image"] instanceof Array?oEntry["n$image"][0]["n$thumbnail"]["$t"]:oEntry["n$image"]["n$thumbnail"]["$t"];
if(/\?.*type=etc[123]/i.test(sThumb)){sUrl=sThumb.replace(/(\?.*)(type=etc[123])/i,"$1type=etc"+sSize)
}else{sUrl=sThumb.replace(/120\/120$/,"160/140")
}}return sUrl
},convertForLayer:function(oEntry){return{thumbnailUrl:this.checkThumbType(oEntry,"1"),sourceUrl:oEntry.link["$t"],comment:"",title:oEntry.title["$t"],type:oEntry.type,keyword:oEntry.keyword,searchType:oEntry.searchType,referer:oEntry.referer||""}
}};
var VO={_nTab:0,tab:function(nTab){if(fnMatome.be(nTab)){this._nTab=nTab
}return this._nTab
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(config){this.setConfig(config||{});
this._getElementRef();
this._initObject();
this._initEvent();
this._afterAction()
},_getElementRef:function(){this._elQuery=$(config.id.query);
this._elSearchBtn=this._elQuery.nextSibling;
this._elDirectInput=$(config.id.directInput);
this._elTabList=$(config.id.tabList);
this._welAddedList=$Element($(config.id.addedList));
var elBase=$(config.id.contents);
this._aResultArea=$$(config.NODE.RESULT_AREA,elBase);
this._aTabChildList=$$(config.NODE.TAB_CHILD,this._elTabList);
this._elRelatedKeyword=$(config.id.relatedKeyword);
this._welMissionGuide=$Element(config.id.missionGuide);
this._welAsideGuide=$Element(config.id.asideGuide);
this._welLoadingArea=$Element($$.getSingle(config.NODE.LOADING_AREA,elBase));
this._welEmptyArea=$Element($$.getSingle(config.NODE.EMPTY_AREA,elBase));
this._elEmptyQuery=$$.getSingle(config.NODE.EMPTY_QUERY,elBase)
},_initObject:function(){var t=this;
this._oAutoFocus=new nj.search.AutoFocus({id:config.id.query});
this._oSearcher=[];
for(var i=0,length=config.TAB.length;
i<length;
i++){var tabName=config.TAB[i];
var searchUrl=(typeof SEARCH_SERVER=="string"?SEARCH_SERVER:"http://search.naver.jp")+"/"+tabName;
var searchMethod="jsonp";
if($A(config.EXT_TAB).has(tabName)){searchUrl="/externalWebSearch.nhn?target="+tabName+"&type=url";
searchMethod="GET"
}this._oSearcher[i]=new config.oSearcher({type:"site",id:{result:tabName+"Result",paging:tabName+"Paging"},style:{EVENT:"_selectThis",HOVER:"listHover",NODE_SELECT:"listSelected"},searchUrl:searchUrl,searchMethod:searchMethod,searchType:tabName,numPerPage:16,thumbSize:"MID"},{completed:function(){t._initDisplay("contents");
t._elQuery.select();
lcs_do()
},error:function(){t._initDisplay("error");
t._elQuery.select()
},selected:$Fn(t._onselectFromSearcher,t).bind(),empty:function(){t._initDisplay("empty");
t._elQuery.select()
},pagemove:function(){lcs_do()
}})
}config.oLayer.init({beforeShow:function(){t._oAutoFocus.off()
},beforeHide:function(){t._oAutoFocus.on()
},saved:$Fn(t._onsavedFromLayer,t).bind()});
config.oAdded.init({edit:$Fn(t._onedit,t).bind(),deleted:$Fn(t._ondeleted,t).bind()})
},_initEvent:function(){var t=this;
$Fn(function(wEvent){var oKey=wEvent.key();
if(oKey.enter){this._search();
wEvent.stop($Event.CANCEL_DEFAULT)
}},this).attach(this._elQuery,"keydown");
$Fn(function(wEvent){var el=wEvent.element;
if(el.notFirst){if(fnMatome.trim(el.value)==config.MSG.DEFAULT){el.value=""
}}else{el.notFirst=true
}},this).attach(this._elQuery,"focus");
$Fn(function(wEvent){if(fnMatome.trim(wEvent.element.value)==config.MSG.DEFAULT){wEvent.element.value=""
}},this).attach(this._elQuery,"click");
$Fn(function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
this._search()
},this).attach(this._elSearchBtn,"click");
$Fn(this._showDirect,this).attach(this._elDirectInput,"click");
$A(this._aTabChildList).forEach(function(tab,index){$Fn(function(wEvent){VO.tab(index);
this._selectTabView();
this._search();
wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(tab,"click")
},this);
$(config.id.asideControl).onclick=function(){var target=$Element(document.getElementsByTagName("body")[0]);
try{nclkChangeCode(this,target.hasClass(config.style.ASIDE_CONTROL)?"unfold":"fold")
}catch(e){}target.toggleClass(config.style.ASIDE_CONTROL)
};
if(fnMatome.be(this._elRelatedKeyword)){$A($$("> LI > A",this._elRelatedKeyword)).forEach(function(keyword){$Fn(function(wEvent){this._elQuery.value=wEvent.element.innerHTML;
this._search();
wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(keyword,"click")
},this)
}$Fn(function(wEvent){var oKey=wEvent.key();
if(oKey.keyCode==27){config.oLayer.hide()
}else{if(wEvent.element.tagName.toUpperCase()!="INPUT"){}}},this).attach(window,"keydown")
},_selectTabView:function(){$A(this._aResultArea).forEach(function(result,index){var tab=this._aTabChildList[index];
if(VO.tab()==index){if($$.getSingle("STRONG",tab).style.display=="none"){$$.getSingle("STRONG",tab).style.display="block";
$$.getSingle("A",tab).style.display="none"
}$Element(tab).addClass(config.style.TAB_SELECT);
result.style.display="block"
}else{if($$.getSingle("A",tab).style.display=="none"){$$.getSingle("STRONG",tab).style.display="none";
$$.getSingle("A",tab).style.display="block"
}$Element(tab).removeClass(config.style.TAB_SELECT);
result.style.display="none"
}},this)
},_initDisplay:function(sType){var t=this;
if(sType=="empty"){t._welMissionGuide.hide();
$Element(t._elTabList.parentNode).show();
t._welLoadingArea.hide();
t._selectTabView();
t._hideResult();
t._welEmptyArea.html(config.template.EMPTY_PRE+"「"+$S(t._elQuery.value).escapeHTML()+"」"+config.template.EMPTY_POST);
t._welEmptyArea.show()
}else{if(sType=="error"){t._oSearcher[VO.tab()].clearCache(t._elQuery.value);
t._welMissionGuide.hide();
$Element(t._elTabList.parentNode).show();
t._welLoadingArea.hide();
t._selectTabView();
t._hideResult();
t._welEmptyArea.html(config.template.DELAY);
t._welEmptyArea.show()
}else{if(sType=="loading"){t._welMissionGuide.hide();
t._elTabList.parentNode.style.display="block";
t._selectTabView();
t._hideResult();
t._welEmptyArea.hide();
t._welLoadingArea.show()
}else{t._welMissionGuide.hide();
t._welEmptyArea.hide();
t._welLoadingArea.hide();
t._elTabList.parentNode.style.display="block";
t._selectTabView()
}}}},_hideResult:function(){$A(this._aResultArea).forEach(function(elResult){$Element(elResult).hide()
})
},_afterAction:function(){this._elQuery.select()
},_search:function(){var t=this;
var sQuery=fnMatome.trim(this._elQuery.value);
if(sQuery==""||sQuery==config.MSG.DEFAULT){alert(config.MSG.EMPTY_QUERY);
this._elQuery.focus();
return 
}var bResult=this._oSearcher[VO.tab()].search(sQuery,function(){t._initDisplay("loading")
})
},_showDirect:function(){config.oLayer.showDirect();
lcs_do({sti:"layer_link_URL"})
},_onselectFromSearcher:function(oEntry,fn){oEntry.referer=config.TAB[VO.tab()]||"";
config.oLayer.show(COMMON.convertForLayer(oEntry),fn);
lcs_do({sti:"layer_link_search"})
},_onedit:function(oEntry){config.oLayer.modifyShow(oEntry)
},_ondeleted:function(nLength,contentId){if(nLength==0){this._welAddedList.hide();
this._welAsideGuide.show()
}},_onsavedFromLayer:function(oEntry,fn){oEntry.type="site";
fn();
config.oAdded.addElement(oEntry);
if(this._isCollapsed()){if(confirm(config.MSG.ADDED_AT_COLLAPSED)){this._openAside()
}}this._showAside()
},_onsavedFromUserLayer:function(oEntry){oEntry.type="site";
config.oAdded.addElement(oEntry);
if(this._isCollapsed()){if(confirm(config.MSG.ADDED_AT_COLLAPSED)){this._openAside()
}}this._showAside()
},_showAside:function(){if(!this._welAddedList.visible()){this._welAsideGuide.hide();
this._welAddedList.show()
}},_isCollapsed:function(){return $Element(document.getElementsByTagName("body")[0]).hasClass(config.style.ASIDE_CONTROL)
},_openAside:function(){$Element(document.getElementsByTagName("body")[0]).removeClass(config.style.ASIDE_CONTROL)
},setConfig:function(oConfig){function f(sName,obj,oTarget){if(typeof obj[sName]=="object"){for(var sName2 in obj[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,obj[sName],oTarget[sName])
}}else{oTarget[sName]=obj[sName]
}}for(var p in oConfig){f(p,oConfig,config)
}}}
})("SitePageController");
(function(namespace){var config={id:{mother:"contents",query:"userQuery",directInput:"directInput",asideControl:"asideControl",addedList:"addedItemList",tabList:"tabList",missionGuide:"missionGuide",asideGuide:"asideMissionGuide",relatedKeyword:"relatedKeyword"},node:{RESULT_AREA:"> DIV.imageType",LOADING_AREA:"> DIV.loadingArea",EMPTY_AREA:"> DIV.missionNoContents",EMPTY_QUERY:"> DIV.missionNoContents > P.warning > STRONG",TAB_CHILD:"> LI"},style:{ASIDE_CONTROL:"asideClose",TAB_SELECT:"selected"},MSG:{DEFAULT:"キーワードを入力し、検索してください",ADDED_AT_COLLAPSED:"画像を追加しました。追加した内容を確認しますか?",EMPTY_QUERY:"検索するキーワードを入力してください。"},template:{EMPTY_PRE:'<p class="warning">検索ワード<strong>',EMPTY_POST:"</strong>に一致する画像は見つかりませんでした。</p><p>キーワードが正しく入力されているかを確認してください。</p>",DELAY:'<p class="warning">一時的にご利用できません。</p>'},oScrollSearcher:nj.mission.ScrollSearcher,oLayer:nj.mission.ImageLayer,oUserLayer:nj.mission.ImageUserLayer,oAdded:nj.mission.AddedList,TAB:["image","yahoo","google","flickr"],EXT_TAB:["yahoo","google","flickr"]};
var COMMON={checkThumbType:function(oEntry,sSize){var sUrl="";
if(typeof oEntry["n$image"]!="undefined"){var sThumb=oEntry["n$image"] instanceof Array?oEntry["n$image"][0]["n$thumbnail"]["$t"]:oEntry["n$image"]["n$thumbnail"]["$t"];
if(/\?.*type=etc[123]/i.test(sThumb)){sUrl=sThumb.replace(/(\?.*)(type=etc[123])/i,"$1type=etc"+sSize)
}else{sUrl=sThumb.replace(/120\/120$/,"160/140")
}}return sUrl
},getSize:function(oEntry){var oSize={};
if(oEntry["n$image"] instanceof Array){oSize.width=oEntry["n$image"][0]["n$source"]["width"];
oSize.height=oEntry["n$image"][0]["n$source"]["height"]
}else{oSize.width=oEntry["n$image"]["n$source"]["width"];
oSize.height=oEntry["n$image"]["n$source"]["height"]
}return oSize
},convertForLayer:function(oEntry){var oSize=this.getSize(oEntry);
return{thumbnailUrl:this.checkThumbType(oEntry,"1"),originalImageUrl:oEntry.link["$t"],source:oEntry["n$domainName"]["$t"],sourceUrl:oEntry["n$pgroupUrl"]["$t"],width:oSize.width,height:oSize.height,fileSize:oEntry["n$fileSize"]["$t"],title:oEntry.title["$t"],comment:"",type:oEntry.type,keyword:oEntry.keyword,isDirectInputFlag:oEntry.isDirectInputFlag,referer:oEntry.referer||""}
}};
var VO={_nTab:0,tab:function(nTab){if(fnMatome.be(nTab)){this._nTab=nTab
}return this._nTab
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(config){this.setConfig(config||{});
this._getElementRef();
this._initComponent();
this._initEvent();
this._afterAction()
},_getElementRef:function(){this._elQuery=$(config.id.query);
this._elSearchBtn=this._elQuery.nextSibling;
this._elDirectInput=$(config.id.directInput);
this._welAddedList=$Element($(config.id.addedList));
this._elTabList=$(config.id.tabList);
if(this._elTabList){this._aTabChildList=$$(config.node.TAB_CHILD,this._elTabList)
}this._elRelatedKeyword=$(config.id.relatedKeyword);
var elBase=$(config.id.mother);
this._welResultArea=$Element($$.getSingle(config.node.RESULT_AREA,elBase));
this._welMissionGuide=$Element(config.id.missionGuide);
this._welAsideGuide=$Element(config.id.asideGuide);
this._welLoadingArea=$Element($$.getSingle(config.node.LOADING_AREA,elBase));
this._welEmptyArea=$Element($$.getSingle(config.node.EMPTY_AREA,elBase));
this._elEmptyQuery=$$.getSingle(config.node.EMPTY_QUERY,elBase)
},_initEvent:function(){var self=this;
$Fn(function(wEvent){var oKey=wEvent.key();
if(oKey.enter){this._search();
wEvent.stop($Event.CANCEL_DEFAULT)
}},this).attach(this._elQuery,"keydown");
$Fn(function(wEvent){var el=wEvent.element;
if(el.notFirst){if(fnMatome.trim(el.value)==config.MSG.DEFAULT){el.value=""
}}else{el.notFirst=true
}},this).attach(this._elQuery,"focus");
$Fn(function(wEvent){if(fnMatome.trim(wEvent.element.value)==config.MSG.DEFAULT){wEvent.element.value=""
}},this).attach(this._elQuery,"click");
$Fn(function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
this._search()
},this).attach(this._elSearchBtn,"click");
$Fn(this._showDirect,this).attach(this._elDirectInput,"click");
$(config.id.asideControl).onclick=function(){var target=$Element(document.getElementsByTagName("body")[0]);
try{nclkChangeCode(this,target.hasClass(config.style.ASIDE_CONTROL)?"unfold":"fold")
}catch(e){}target.toggleClass(config.style.ASIDE_CONTROL);
self._oScrollSearcher.onResize()
};
if(fnMatome.be(this._elRelatedKeyword)){$A($$("> LI > A",this._elRelatedKeyword)).forEach(function(keyword){$Fn(function(wEvent){this._elQuery.value=wEvent.element.innerHTML;
this._search();
wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(keyword,"click")
},this)
}if(this._elTabList){$A(this._aTabChildList).forEach(function(tab,index){$Fn(function(wEvent){VO.tab(index);
this._selectTabView(index);
this._search();
wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(tab,"click")
},this)
}$Fn(function(wEvent){var oKey=wEvent.key();
if(oKey.keyCode==27){config.oLayer.hide();
config.oUserLayer.hide()
}else{if(wEvent.element.tagName.toUpperCase()!="INPUT"&&!config.oLayer.visible()&&!config.oUserLayer.visible()){if(oKey.left){this._oScrollSearcher.onLeft()
}else{if(oKey.right){this._oScrollSearcher.onRight()
}}}}},this).attach(window,"keydown")
},_initComponent:function(){var t=this;
this._oAutoFocus=new nj.search.AutoFocus({id:config.id.query});
this._initScrollSearcher();
config.oLayer.init({beforeShow:function(){t._oAutoFocus.off()
},beforeHide:function(){t._oAutoFocus.on()
},saved:$Fn(t._onsavedFromLayer,t).bind()});
config.oUserLayer.init({beforeShow:function(){t._oAutoFocus.off()
},beforeHide:function(){t._oAutoFocus.on()
},flashInit:fnSetFlashUploader,saved:$Fn(t._onsavedFromUserLayer,t).bind()});
config.oAdded.init({edit:$Fn(t._onedit,t).bind(),deleted:$Fn(t._ondeleted,t).bind()})
},_initScrollSearcher:function(sUrl,sMethod){var t=this;
this._oScrollSearcher=new config.oScrollSearcher({type:"image",id:{area:"imageResult"},consts:{searchUrl:sUrl||(typeof SEARCH_SERVER=="string"?SEARCH_SERVER:"http://search.naver.jp")+"/image",searchMethod:sMethod||"jsonp",minViewSize:2,entryWidth:172,entryHeight:200,arrowWidth:70,emptyWidth:15,paddingHeight:78}},{completed:function(){t._initDisplay("contents");
lcs_do()
},error:function(){t._initDisplay("error");
t._elQuery.select()
},selected:$Fn(t._onselectFromSearcher,t).bind(),empty:function(){t._initDisplay("empty");
t._elQuery.select()
},size:function(){var welWrap=$Element("wrap");
var welHeader=$Element("header");
var welSpot=$Element($$.getSingle("#container > DIV.spot",welWrap.$value()));
var welSearchArea=$Element($$.getSingle("#container > DIV.searchArea",welWrap.$value()));
var welContent=$Element("contents");
var oDocSize=$Document(document).clientSize();
return{width:welContent.width(),height:oDocSize.height-welHeader.height()-welSpot.height()-welSearchArea.height()}
}})
},_afterAction:function(){this._elQuery.select()
},_initDisplay:function(sType){var t=this;
if(sType=="empty"){t._welMissionGuide.hide();
t._welResultArea.hide();
if(t._elTabList){$Element(t._elTabList.parentNode).show()
}t._welLoadingArea.hide();
t._welEmptyArea.html(config.template.EMPTY_PRE+"「"+$S(t._elQuery.value).escapeHTML()+"」"+config.template.EMPTY_POST);
t._welEmptyArea.show()
}else{if(sType=="error"){t._welMissionGuide.hide();
t._welResultArea.hide();
if(t._elTabList){$Element(t._elTabList.parentNode).show()
}t._welLoadingArea.hide();
t._welEmptyArea.html(config.template.DELAY);
t._welEmptyArea.show()
}else{if(sType=="loading"){t._welMissionGuide.hide();
t._welResultArea.hide();
if(t._elTabList){t._elTabList.parentNode.style.display="block"
}t._welEmptyArea.hide();
t._welLoadingArea.show()
}else{t._welMissionGuide.hide();
t._welLoadingArea.hide();
if(t._elTabList){t._elTabList.parentNode.style.display="block"
}t._welEmptyArea.hide();
t._welResultArea.show()
}}}},_search:function(){var t=this;
var sQuery=fnMatome.trim(this._elQuery.value);
if(sQuery==""||sQuery==config.MSG.DEFAULT){alert(config.MSG.EMPTY_QUERY);
this._elQuery.focus();
return 
}var bResult=this._oScrollSearcher.search(sQuery,function(){t._initDisplay("loading")
})
},_showDirect:function(e){config.oUserLayer.show();
e.stop($Event.CANCEL_DEFAULT);
lcs_do({sti:"layer_image_upload"})
},_onselectFromSearcher:function(oData,fn){oData.referer=config.TAB[VO.tab()]||"";
config.oLayer.show(COMMON.convertForLayer(oData),fn);
lcs_do({sti:"layer_image_search"})
},_onedit:function(oData){config.oLayer.modifyShow(oData)
},_ondeleted:function(nLength,contentId){if(nLength==0){this._welAddedList.hide();
this._welAsideGuide.show()
}},_onsavedFromLayer:function(oData,fn){fn();
config.oAdded.addElement(oData);
if(this._isCollapsed()){if(confirm(config.MSG.ADDED_AT_COLLAPSED)){this._openAside()
}}this._showAside()
},_onsavedFromUserLayer:function(oData){config.oAdded.addElement(oData);
if(this._isCollapsed()){if(confirm(config.MSG.ADDED_AT_COLLAPSED)){this._openAside()
}}this._showAside()
},_showAside:function(){if(!this._welAddedList.visible()){this._welAsideGuide.hide();
this._welAddedList.show()
}},_isCollapsed:function(){return $Element(document.getElementsByTagName("body")[0]).hasClass(config.style.ASIDE_CONTROL)
},_openAside:function(){$Element(document.getElementsByTagName("body")[0]).removeClass(config.style.ASIDE_CONTROL)
},_selectTabView:function(index){$A(this._aTabChildList).forEach(function(result,index){var tab=this._aTabChildList[index];
if(VO.tab()==index){if($$.getSingle("STRONG",tab).style.display=="none"){$$.getSingle("STRONG",tab).style.display="block";
$$.getSingle("A",tab).style.display="none"
}$Element(tab).addClass(config.style.TAB_SELECT);
var tabName=config.TAB[index];
var searchUrl=(typeof SEARCH_SERVER=="string"?SEARCH_SERVER:"http://search.naver.jp")+"/"+tabName;
var searchMethod="jsonp";
var searchTimeout=5;
if($A(config.EXT_TAB).has(tabName)){searchUrl="/externalWebSearch.nhn?target="+tabName+"&type=image";
searchMethod="GET"
}if(tabName=="flickr"){searchTimeout=20
}this._oScrollSearcher._config.consts.searchUrl=searchUrl;
this._oScrollSearcher._config.consts.searchMethod=searchMethod;
this._oScrollSearcher._config.consts.searchTimeout=searchTimeout
}else{if($$.getSingle("A",tab).style.display=="none"){$$.getSingle("STRONG",tab).style.display="none";
$$.getSingle("A",tab).style.display="block"
}$Element(tab).removeClass(config.style.TAB_SELECT)
}},this)
},setConfig:function(oConfig){function f(sName,obj,oTarget){if(typeof obj[sName]=="object"){for(var sName2 in obj[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,obj[sName],oTarget[sName])
}}else{oTarget[sName]=obj[sName]
}}for(var p in oConfig){f(p,oConfig,config)
}}}
})("ImagePageController");
(function(namespace){var config={id:{query:"userQuery",directInput:"directInput",asideControl:"asideControl",addedList:"addedItemList",tabList:"tabList",missionGuide:"missionGuide",asideGuide:"asideMissionGuide",relatedKeyword:"relatedKeyword"},node:{RESULT_AREA:"> DIV.imageType",LOADING_AREA:"> DIV.loadingArea",EMPTY_AREA:"> DIV.missionNoContents",EMPTY_QUERY:"> DIV.missionNoContents > P.warning > STRONG",TAB_CHILD:"> LI"},style:{ASIDE_CONTROL:"asideClose",TAB_SELECT:"selected"},MSG:{DEFAULT:"キーワードを入力し、検索してください",ADDED_AT_COLLAPSED:"動画を追加しました。追加した内容を確認しますか?",EMPTY_QUERY:"検索するキーワードを入力してください。"},template:{EMPTY_PRE:'<p class="warning">検索ワード<strong>',EMPTY_POST:"</strong>に一致する画像は見つかりませんでした。</p><p>キーワードが正しく入力されているかを確認してください。</p>",DELAY:'<p class="warning">一時的にご利用できません。</p>'},oScrollSearcher:nj.mission.ScrollSearcher,oLayer:nj.mission.VideoLayer,oAdded:nj.mission.AddedList,TAB:["video","yahoo","google","youtube"],EXT_TAB:["yahoo","google","youtube"]};
var COMMON={checkThumbType:function(oEntry,sSize){var sUrl="";
if(typeof oEntry["n$image"]!="undefined"){var sThumb=oEntry["n$image"] instanceof Array?oEntry["n$image"][0]["n$thumbnail"]["$t"]:oEntry["n$image"]["n$thumbnail"]["$t"];
if(/\?.*type=etc[123]/i.test(sThumb)){sUrl=sThumb.replace(/(\?.*)(type=etc[123])/i,"$1type=etc"+sSize)
}else{sUrl=sThumb.replace(/120\/120$/,"160/140")
}}return sUrl
},convertForLayer:function(oEntry){return{thumbnailUrl:this.checkThumbType(oEntry,"1"),url:oEntry.link["$t"],sourceUrl:oEntry["n$siteUrl"]["$t"],source:oEntry["n$siteName"]["$t"],title:oEntry.title["$t"].replace(/<\/?b>/ig,""),playTime:oEntry["n$playTime"]["$t"],comment:"",type:oEntry.type,keyword:oEntry.keyword,referer:oEntry.referer||""}
}};
var VO={_nTab:0,tab:function(nTab){if(fnMatome.be(nTab)){this._nTab=nTab
}return this._nTab
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(config){this.setConfig(config||{});
this._getElementRef();
this._initObject();
this._initEvent();
this._afterAction()
},_getElementRef:function(){this._elQuery=$(config.id.query);
this._elSearchBtn=this._elQuery.nextSibling;
this._elDirectInput=$(config.id.directInput);
this._welAddedList=$Element($(config.id.addedList));
this._elTabList=$(config.id.tabList);
if(this._elTabList){this._aTabChildList=$$(config.node.TAB_CHILD,this._elTabList)
}this._elRelatedKeyword=$(config.id.relatedKeyword);
this._welMissionGuide=$Element(config.id.missionGuide);
this._welAsideGuide=$Element(config.id.asideGuide);
var elBase=$("contents");
this._welResultArea=$Element($$.getSingle("> DIV.movieType",elBase));
this._welLoadingArea=$Element($$.getSingle(config.node.LOADING_AREA,elBase));
this._welEmptyArea=$Element($$.getSingle(config.node.EMPTY_AREA,elBase));
this._elEmptyQuery=$$.getSingle(config.node.EMPTY_QUERY,elBase)
},_initObject:function(){var t=this;
this._oAutoFocus=new nj.search.AutoFocus({id:config.id.query});
this._initScrollSearcher();
config.oLayer.init({beforeShow:function(){t._oAutoFocus.off()
},beforeHide:function(){t._oAutoFocus.on()
},saved:$Fn(t._onsavedFromLayer,t).bind()});
config.oAdded.init({edit:$Fn(t._onedit,t).bind(),deleted:$Fn(t._ondeleted,t).bind()})
},_initScrollSearcher:function(sUrl,sMethod){var t=this;
this._oScrollSearcher=new config.oScrollSearcher({type:"video",id:{area:"movieResult"},consts:{searchUrl:sUrl||(typeof SEARCH_SERVER=="string"?SEARCH_SERVER:"http://search.naver.jp")+"/video",searchMethod:sMethod||"jsonp",minViewSize:3,entryWidth:144,entryHeight:160,arrowWidth:70,emptyWidth:15,paddingHeight:78}},{completed:function(){t._initDisplay("contents");
lcs_do()
},error:function(){t._initDisplay("error");
t._elQuery.select()
},selected:$Fn(t._onselectFromSearcher,t).bind(),empty:function(){t._initDisplay("empty");
t._elQuery.select()
},size:function(){var welWrap=$Element("wrap");
var welHeader=$Element("header");
var welSpot=$Element($$.getSingle("#container > DIV.spot",welWrap.$value()));
var welSearchArea=$Element($$.getSingle("#container > DIV.searchArea",welWrap.$value()));
var welContent=$Element("contents");
var oDocSize=$Document(document).clientSize();
return{width:welContent.width(),height:oDocSize.height-welHeader.height()-welSpot.height()-welSearchArea.height()}
}})
},_initEvent:function(){var self=this;
$Fn(function(wEvent){var oKey=wEvent.key();
if(oKey.enter){this._search();
wEvent.stop($Event.CANCEL_DEFAULT)
}},this).attach(this._elQuery,"keydown");
$Fn(function(wEvent){var el=wEvent.element;
if(el.notFirst){if(fnMatome.trim(el.value)==config.MSG.DEFAULT){el.value=""
}}else{el.notFirst=true
}},this).attach(this._elQuery,"focus");
$Fn(function(wEvent){if(fnMatome.trim(wEvent.element.value)==config.MSG.DEFAULT){wEvent.element.value=""
}},this).attach(this._elQuery,"click");
$Fn(function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
this._search()
},this).attach(this._elSearchBtn,"click");
$Fn(this._showDirect,this).attach(this._elDirectInput,"click");
$(config.id.asideControl).onclick=function(){var target=$Element(document.getElementsByTagName("body")[0]);
nclkChangeCode(this,target.hasClass(config.style.ASIDE_CONTROL)?"unfold":"fold");
target.toggleClass(config.style.ASIDE_CONTROL);
self._oScrollSearcher.onResize()
};
if(fnMatome.be(this._elRelatedKeyword)){$A($$("> LI > A",this._elRelatedKeyword)).forEach(function(keyword){$Fn(function(wEvent){this._elQuery.value=wEvent.element.innerHTML;
this._search();
wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(keyword,"click")
},this)
}if(this._elTabList){$A(this._aTabChildList).forEach(function(tab,index){$Fn(function(wEvent){VO.tab(index);
this._selectTabView(index);
this._search();
wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(tab,"click")
},this)
}$Fn(function(wEvent){var oKey=wEvent.key();
if(oKey.keyCode==27){config.oLayer.hide()
}else{if(wEvent.element.tagName.toUpperCase()!="INPUT"&&!config.oLayer.visible()){if(oKey.left){this._oScrollSearcher.onLeft()
}else{if(oKey.right){this._oScrollSearcher.onRight()
}}}}},this).attach(window,"keydown")
},_afterAction:function(){this._elQuery.select()
},_initDisplay:function(sType){var t=this;
if(sType=="empty"){t._welMissionGuide.hide();
t._welResultArea.hide();
if(t._elTabList){$Element(t._elTabList.parentNode).show()
}t._welLoadingArea.hide();
t._welEmptyArea.html(config.template.EMPTY_PRE+"「"+$S(t._elQuery.value).escapeHTML()+"」"+config.template.EMPTY_POST);
t._welEmptyArea.show()
}else{if(sType=="error"){t._welMissionGuide.hide();
t._welResultArea.hide();
if(t._elTabList){$Element(t._elTabList.parentNode).show()
}t._welLoadingArea.hide();
t._welEmptyArea.html(config.template.DELAY);
t._welEmptyArea.show()
}else{if(sType=="loading"){t._welMissionGuide.hide();
t._welResultArea.hide();
if(t._elTabList){t._elTabList.parentNode.style.display="block"
}t._welEmptyArea.hide();
t._welLoadingArea.show()
}else{t._welMissionGuide.hide();
t._welLoadingArea.hide();
if(t._elTabList){t._elTabList.parentNode.style.display="block"
}t._welEmptyArea.hide();
t._welResultArea.show()
}}}},_search:function(){var t=this;
var sQuery=fnMatome.trim(this._elQuery.value);
if(sQuery==""||sQuery==config.MSG.DEFAULT){alert(config.MSG.EMPTY_QUERY);
this._elQuery.focus();
return 
}var bResult=this._oScrollSearcher.search(sQuery,function(){t._initDisplay("loading")
})
},_showDirect:function(){config.oLayer.showDirect()
},_onselectFromSearcher:function(oData,fn){oData.referer=config.TAB[VO.tab()]||"";
config.oLayer.show(COMMON.convertForLayer(oData),fn)
},_onedit:function(oData){config.oLayer.modifyShow(oData)
},_ondeleted:function(contentId,nLength){if(nLength==0){this._welAddedList.hide();
this._welAsideGuide.show()
}},_onsavedFromLayer:function(oData,fn){fn();
config.oAdded.addElement(oData);
if(this._isCollapsed()){if(confirm(config.MSG.ADDED_AT_COLLAPSED)){this._openAside()
}}this._showAside()
},_onsavedFromUserLayer:function(oData){config.oAdded.addElement(oData);
if(this._isCollapsed()){if(confirm(config.MSG.ADDED_AT_COLLAPSED)){this._openAside()
}}this._showAside()
},_showAside:function(){if(!this._welAddedList.visible()){this._welAsideGuide.hide();
this._welAddedList.show()
}},_isCollapsed:function(){return $Element(document.getElementsByTagName("body")[0]).hasClass(config.style.ASIDE_CONTROL)
},_openAside:function(){$Element(document.getElementsByTagName("body")[0]).removeClass(config.style.ASIDE_CONTROL)
},_selectTabView:function(index){$A(this._aTabChildList).forEach(function(result,index){var tab=this._aTabChildList[index];
if(VO.tab()==index){if($$.getSingle("STRONG",tab).style.display=="none"){$$.getSingle("STRONG",tab).style.display="block";
$$.getSingle("A",tab).style.display="none"
}$Element(tab).addClass(config.style.TAB_SELECT);
var tabName=config.TAB[index];
var searchUrl=(typeof SEARCH_SERVER=="string"?SEARCH_SERVER:"http://search.naver.jp")+"/"+tabName;
var searchMethod="jsonp";
if($A(config.EXT_TAB).has(tabName)){searchUrl="/externalWebSearch.nhn?target="+tabName+"&type=video";
searchMethod="GET"
}this._oScrollSearcher._config.consts.searchUrl=searchUrl;
this._oScrollSearcher._config.consts.searchMethod=searchMethod
}else{if($$.getSingle("A",tab).style.display=="none"){$$.getSingle("STRONG",tab).style.display="none";
$$.getSingle("A",tab).style.display="block"
}$Element(tab).removeClass(config.style.TAB_SELECT)
}},this)
},setConfig:function(oConfig){function f(sName,obj,oTarget){if(typeof obj[sName]=="object"){for(var sName2 in obj[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,obj[sName],oTarget[sName])
}}else{oTarget[sName]=obj[sName]
}}for(var p in oConfig){f(p,oConfig,config)
}}}
})("VideoPageController");
(function(ns){var config={id:{form:"form",inputArea:"inputArea",searchBtn:"searchImage",uploadBtn:"uploadImage",searchLayer:"searchLayer",submit:"submit"},node:{NOTICE:"> P.notice",TITLE:"> DD._title > INPUT",DUPLICATE_CHECK_BTN:"> DD._title > BUTTON",WARNING:"> DD._title > P",COMMENT:"> DD._comment > TEXTAREA",THUMB_IMAGE:"> DD.itemImage > DIV.thumb",SEARCH_BTN:"> DD.itemImage > BUTTON.btnSearchImage",UPLOAD_BTN:"> DD.itemImage > SPAN.btnMyImage > A > IMG",SUBMIT_BTN:"> DIV.btns > BUTTON",NEXT_VIEW_1:"> DT:nth-of-type(2)",NEXT_VIEW_2:"> DD:nth-of-type(2)",NEXT_VIEW_3:"> DT:last-of-type",NEXT_VIEW_4:"> DD:last-of-type"},width:{search:953,crop:672},style:{FOG:"fog",HOVER:"hover",READY:"ready"},oSearchLayer:nj.mission.SearchLayer,oCropLayer:nj.mission.CropLayer,thumb:{WIDTH:120,HEIGHT:120},msg:{DEFAULT:"追加するワードを入力してください",TITLE:"追加するワードが入力されていません。",COMMENT:"紹介コメントを入力してください",CONFIRM:"追加するワードの重複チェックを行ってください。",OVER_NAME:"追加するワードは、50文字以内で入力してください。",OVER_COMMENT:"紹介コメントは、300文字以内で入力してください。",EDITED:"修正完了しました",UPLOAD_FAIL:"1024KB未満の画像のみ対応しています。",DUPLICATED:"このワードはすでに登録されています。"},upload:{URL:"/upload.ajax",FILE_TYPE:"*.jpg;*.gif;*.jpeg;*.png"},pollCheckUrl:"/content.ajax",consts:{URL:"/content.ajax",MAX_NAME_LENGTH:50,MAX_COMMENT_LENGTH:300,MISSION_URL:"/odai/"}};
var fnPrivate={setConfig:function(oSource,oDest){function f(sName,oSource,oTarget){if(typeof oSource[sName]=="object"){for(var sName2 in oSource[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,oSource[sName],oTarget[sName])
}}else{oTarget[sName]=oSource[sName]
}}for(var p in oSource){f(p,oSource,oDest)
}}};
var pkg=$.verifyPackageName(ns);
pkg.container[pkg.name]={init:function(oConfig){this._initVariable(oConfig);
this._getElementRef();
this._initEvent();
this._initComponent();
this._afterInit()
},_initVariable:function(oConfig){fnPrivate.setConfig(oConfig,config);
this._isChecked=false;
this._sCheckedName=""
},_getElementRef:function(){var b=this._elInputArea=$(config.id.inputArea);
this._elTitle=$$.getSingle(config.node.TITLE,b);
this._elDupCheckBtn=$$.getSingle(config.node.DUPLICATE_CHECK_BTN,b);
this._elWarning=$$.getSingle(config.node.WARNING,b);
this._elComment=$$.getSingle(config.node.COMMENT,b);
this._welThumbImage=$Element($$.getSingle(config.node.THUMB_IMAGE,b));
this._elSearchBtn=$$.getSingle(config.node.SEARCH_BTN,b);
this._elUploadBtn=$$.getSingle(config.node.UPLOAD_BTN,b);
this._elSubmit=$$.getSingle(config.node.SUBMIT_BTN,b.parentNode);
this._welSearchLayer=$Element(config.id.searchLayer);
this._aView=[$$.getSingle(config.node.NEXT_VIEW_1,b),$$.getSingle(config.node.NEXT_VIEW_2,b),$$.getSingle(config.node.NEXT_VIEW_3,b),$$.getSingle(config.node.NEXT_VIEW_4,b),$$.getSingle(config.node.NOTICE,b.parentNode),this._elSubmit.parentNode]
},_initEvent:function(){var self=this;
$Fn(function(wEvent){var oKey=wEvent.key();
if(oKey.enter){this._onSearch();
wEvent.stop($Event.CANCEL_DEFAULT)
}},this).attach(this._elTitle,"keydown");
$Fn(function(wEvent){var el=wEvent.element;
if(el.notFirst){if(fnMatome.trim(el.value)==config.msg.DEFAULT){el.value=""
}}else{el.notFirst=true
}},this).attach(this._elTitle,"focus");
$Fn(function(wEvent){if(fnMatome.trim(wEvent.element.value)==config.msg.DEFAULT){wEvent.element.value=""
}},this).attach(this._elTitle,"click");
$Fn(function(wEvent){var el=wEvent.element;
if(el.notFirst){if(fnMatome.trim(el.value)==config.msg.COMMENT){el.value=""
}}else{el.notFirst=true
}$Element(el).removeClass(config.style.READY)
},this).attach(this._elComment,"focus");
$Fn(function(wEvent){if(fnMatome.trim(wEvent.element.value)==config.msg.COMMENT){wEvent.element.value=""
}$Element(wEvent.element).removeClass(config.style.READY)
},this).attach(this._elComment,"click");
$Fn(function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
this._onSearch()
},this).attach(this._elDupCheckBtn,"click");
$Fn(this._onSubmit,this).attach(this._elSubmit,"click")
},_initComponent:function(){this._initSearchLayer();
this._initUploader()
},_initSearchLayer:function(){var t=this;
t._oSearchLayer=new nj.mission.SearchLayer(config.id.searchLayer,{show:function(){},hide:function(){t._foggySearch.hide()
},completed:function(oData,self){t._selectThumb(oData);
t._oSearchLayer.hide()
},search:function(oData){lcs_do({sti:"layer_word_image"})
}});
t._foggySearch=t._createFoggy().attach({show:function(){var oArea=$Document().scrollSize();
t._oSearchLayer.left((oArea.width-config.width.search)/2);
t._oSearchLayer.show(t._elTitle.value)
},hide:function(){t._oSearchLayer.hide();
document.documentElement.scrollTop=""+(document.documentElement.scrollHeight||document.body.scrollHeight)
}});
t._foggySearch.getFog().className=config.style.FOG;
$Fn(function(wEvent){this._foggySearch.show(this._welSearchLayer.$value())
},this).attach(this._elSearchBtn,"click")
},_initUploader:function(){this._oUploader=new nj.Uploader2(this._elUploadBtn,{url:config.upload.URL,filetype:config.upload.FILE_TYPE,data:{},onSuccess:$Fn(this._selectThumb,this).bind(),onError:function(){alert(config.msg.UPLOAD_FAIL)
},align:true})
},_createFoggy:function(){return new nhn.Foggy({showDuration:0,showOpacity:nhn.Effect.linear(0.7),hideDuratioin:200,hideOpacity:nhn.Effect.linear(0),zIndex:32000,fps:15})
},_afterInit:function(){var t=this;
this._bIsUpdate=false;
if(fnMatome.be(config.recommend)){this._bIsUpdate=true;
this._savedTitle=this._sCheckedName=this._elTitle.value;
this._isChecked=true;
this._showArea();
this._oUploader.initUI();
this._elTitle.setAttribute("disabled","disabled");
if(config.SOURCE.thumbnailUrl!=""){var elBtn=$$.getSingle("BUTTON",this._welThumbImage.$value());
elBtn.onclick=function(){t._welThumbImage.html("");
t._removeData()
}
}this._elComment.select()
}else{this._elTitle.select()
}},_onSearch:function(){if(this._bIsUpdate){return 
}var sName=fnMatome.trim(this._elTitle.value);
if(!fnMatome.validateBlank(this._elTitle,{msg:config.msg.TITLE})){return 
}if(!fnMatome.validateDefaultText(this._elTitle,{msg:config.msg.TITLE,text:config.msg.DEFAULT})){return 
}if(!fnMatome.validateLength(this._elTitle,{msg:config.msg.OVER_NAME,min:0,max:config.consts.MAX_NAME_LENGTH})){return 
}fnMatome.sendServer(config.consts.URL,{m:"ajaxCheckDuplicatedPoll","content.missionId":config.SOURCE.missionId,"content.title":sName},$Fn(this._response,this).bind())
},_response:function(oData){if(oData.resourceId=="0"){$Element(this._elWarning).hide();
this._showArea();
this._elComment.select();
this._isChecked=true;
this._sCheckedName=fnMatome.trim(this._elTitle.value);
this._oUploader.initUI()
}else{$Element(this._elWarning).show()
}},_showArea:function(){$A(this._aView).forEach(function(view){$Element(view).show()
})
},_selectThumb:function(oData){var t=this;
this._welThumbImage.empty();
var welImg=$Element("<IMG>");
welImg.attr({src:oData.thumbnailUrl,width:config.thumb.WIDTH,height:config.thumb.HEIGHT});
var welBtn=$Element("<BUTTON>").className("btnPicDel").html("削除");
welBtn.$value().onclick=function(){t._welThumbImage.html("");
t._removeData()
};
this._welThumbImage.append(welImg);
this._welThumbImage.append(welBtn);
config.SOURCE.thumbnailUrl=oData.thumbnailUrl||"";
config.SOURCE.url=oData.url||"";
config.SOURCE.source=oData.source||"";
config.SOURCE.sourceUrl=oData.sourceUrl||"";
config.SOURCE.imageResolution=oData.imageResolution||"";
config.SOURCE.fileSize=oData.fileSize||""
},_onSubmit:function(wEvent){if(!fnMatome.validateBlank(this._elTitle,{msg:config.msg.TITLE})){return false
}if(!fnMatome.validateDefaultText(this._elTitle,{msg:config.msg.TITLE,text:config.msg.TITLE})){return false
}if(this._sCheckedName!=""){var sName=fnMatome.trim(this._elTitle.value);
this._isChecked=(sName==this._sCheckedName?true:false);
if(fnMatome.be(this._savedTitle)&&this._savedTitle==sName){this._isChecked=true
}}else{this._isChecked=false
}if(!this._isChecked){alert(config.msg.CONFIRM);
this._elTitle.focus();
return false
}config.SOURCE.title=fnMatome.trim(this._elTitle.value);
fnMatome.clearText(this._elComment,{text:config.msg.COMMENT});
if(!fnMatome.validateLength(this._elComment,{msg:config.msg.OVER_COMMENT,min:0,max:config.consts.MAX_COMMENT_LENGTH})){return false
}config.SOURCE.description=this._elComment.value;
fnMatome.sendServer(config.consts.URL,this._makeParam(),$Fn(this._responseSubmit,this).bind())
},_makeParam:function(){return{m:"save","content.missionId":config.SOURCE.missionId,"content.contentId":config.SOURCE.contentId,"content.title":config.SOURCE.title,"content.description":config.SOURCE.description,"content.thumbnailUrl":config.SOURCE.thumbnailUrl,"content.fileSize":config.SOURCE.fileSize,"content.imageResolution":config.SOURCE.imageResolution,"content.source":config.SOURCE.source,"content.sourceUrl":config.SOURCE.sourceUrl,"content.url":config.SOURCE.url}
},_responseSubmit:function(oRes){if(oRes.result){if(config.SOURCE.contentId!=""){alert(config.msg.EDITED)
}location.href=config.SOURCE.returnUrl||"http://"+location.host+config.consts.MISSION_URL+oRes.missionId+"?page=1&viewCode=PR "
}else{if(oRes.resourceId&&oRes.resourceId>0){alert(config.msg.DUPLICATED)
}else{alert(oRes.message||config.msg.HAS_PROBLEM);
if(oRes.message){location.href=config.consts.MISSION_URL+oRes.missionId
}}}},_removeData:function(){config.SOURCE.thumbnailUrl="";
config.SOURCE.url="";
config.SOURCE.source="";
config.SOURCE.sourceUrl="";
config.SOURCE.imageResolution="";
config.SOURCE.fileSize=""
}}
})("PollContentAdd");
(function(ns){var config={id:"directVideoLayer",node:{BASE:"> DIV.shadow > DIV.shadowSide > DIV.subLayerTemplate",VIDEO_INPUT:"> DIV.layerContents > DIV.inputComment > DL > DD.movieUrl2 > DIV.urlInputArea > DIV.inTxtWrapper > INPUT",SURVEY_BTN:"> DIV.layerContents > DIV.inputComment > DL > DD.movieUrl2 > DIV.urlInputArea > BUTTON",CLOSE_BTN:"> A.layerClose",ADD_BTN:"> DIV.layerContents > DIV.btns > BUTTON",VIDEO_VIEW:"> DIV.layerContents > DIV.inputComment > DL > DD.movieUrl2 > DIV.videoView"},msg:{URL:"URLを入力してください",EMPTY_URL:"URLは必ず入力してください。",NOT_URL:"URLの入力形式が異なっています",NOT_VALID:"入力されたURLのページは、動画がないか、未対応の動画形式です。",CONFIRM:"確認ボタンをクリックしてください。"},consts:{LAYOUT:38,MIN_LENGTH:463}};
var pkg=$.verifyPackageName(ns);
pkg.container[pkg.name]={init:function(oConfig,fnCallback){this._initVariable();
this._initCallback(fnCallback||{});
this._getElementRef();
this._initEvent();
this._afterInit(oConfig)
},_initVariable:function(){this._bIsSelect=false;
this._nLayerWidth=config.consts.MIN_LENGTH-config.consts.LAYOUT
},_initCallback:function(fn){this._fnSelect=fn.select||function(){};
this._fnClose=fn.close||function(){}
},_getElementRef:function(){this._welLayer=$Element(config.id);
var elBase=$$.getSingle(config.node.BASE,this._welLayer.$value());
this._elInput=$$.getSingle(config.node.VIDEO_INPUT,elBase);
this._elSurveyBtn=$$.getSingle(config.node.SURVEY_BTN,elBase);
this._elCloseBtn=$$.getSingle(config.node.CLOSE_BTN,elBase);
this._elAddBtn=$$.getSingle(config.node.ADD_BTN,elBase);
this._elVideoView=$$.getSingle(config.node.VIDEO_VIEW,elBase)
},_initEvent:function(){$Fn(this._onClose,this).attach(this._elCloseBtn,"click");
$Fn(this._onSurvey,this).attach(this._elSurveyBtn,"click");
$Fn(this._onAdd,this).attach(this._elAddBtn,"click")
},_afterInit:function(oConfig){},_onSurvey:function(){var sUrl=this._elInput.value;
if(!/^http(s?):\/\/.*/i.test(sUrl)){this._elInput.value=sUrl="http://"+sUrl
}if(!fnMatome.validateURL(this._elInput.value)){alert(config.msg.NOT_URL);
this._elInput.select();
return 
}this._oVideoFilter=mFilter.html(sUrl);
if(this._oVideoFilter){this._elVideoView.innerHTML=this._oVideoFilter.html;
this._bIsSelect=true;
this._nLayerWidth=this._oVideoFilter.width;
this._welLayer.css("width",this._oVideoFilter.width+config.consts.LAYOUT+"px")
}else{this._elVideoView.innerHTML=config.msg.NOT_VALID
}},_onClose:function(){this._fnClose()
},_onAdd:function(){if(!fnMatome.validateBlank(this._elInput,{msg:config.msg.EMPTY_URL})){return 
}if(this._bIsSelect){this._fnSelect({url:this._elInput.value,playTime:"",thumbnailUrl:this._oVideoFilter.thumb,sourceUrl:this._oVideoFilter.url,source:this._oVideoFilter.name})
}else{alert(config.msg.CONFIRM)
}},css:function(sName,sValue){this._welLayer.css(sName,sValue)
},show:function(){this._welLayer.show();
this._elInput.value=config.msg.URL;
this._elInput.select()
},hide:function(){this._welLayer.hide();
this._initVariable();
this._welLayer.css("width",this._nLayerWidth+config.consts.LAYOUT+"px")
},element:function(){return this._welLayer.$value()
}}
})("DirectVideoLayer");
(function(ns){var config={id:{mother:"missionEditor",searchLayer:"searchLayer"},node:{TITLE:"> DL > DD._title > TEXTAREA",SOURCE:"> DL > DD._source > INPUT",SOURCE_URL:"> DL > DD._sourceUrl > INPUT",DATE_YEAR:"> DL > DD._date > INPUT._year",DATE_MONTH:"> DL > DD._date > INPUT._month",DATE_DAY:"> DL > DD._date > INPUT._day",COMMENT:"> DL > DD._comment > TEXTAREA",MEDIA_BASE:"> DL > DD._addImageNUpload > DIV.attachedFile",TO_IMAGE_TAB:"> DL.movieDtl > DT > A",TO_VIDEO_TAB:"> DL.imageDtl > DT > A",SEARCH_VIDEO_BTN:"> DL.movieDtl > DD > DIV.means > A:first-of-type > IMG",DIRECT_VIDEO_BTN:"> DL.movieDtl > DD > DIV.means > A:last-of-type > IMG",VIDEO_THUMB:"> DL.movieDtl > DD > DIV.thumb",SEARCH_IMAGE_BTN:"> DL.imageDtl > DD > DIV.means > A:first-of-type > IMG",UPLOAD_IMAGE_BTN:"> DL.imageDtl > DD > DIV.means > A:last-of-type > IMG",IMAGE_THUMB:"> DL.imageDtl > DD > DIV.thumb",SUBMIT_BTN:"> DIV.btns > BUTTON"},msg:{TITLE:"発言内容を入力してください",TITLE_ALERT:"発言内容が入力されていません。",SOURCE:"出典元を入力してください",SOURCE_URL:"出典元がウェブページの場合は、そのURLを入力してください",YEAR:"インタビューした日付を入力してください",COMMENT:"発言内容に関する紹介コメントを入力してください",YEAR_ERR:"発言日付の年が入力されていません。",YEAR_NUM_ERR:"発言日付の年は、4桁以下の半角数字を入力してください。",MONTH_ERR:"発言日付の月が入力されていません。",MONTH_NUM_ERR:"発言日付の月は、1～12の半角数字を入力してください。",DAY_ERR:"発言日付の日が入力されていません。",DAY_NUM_ERR:"発言日付の日は、1～31の半角数字を入力してください。",NOT_DATE:"発言日付が正しくありません",MOVE_IMAGE_TAB:"動画を登録すると、今登録している画像は削除されます。また、新しく動画を添付しないで\n完了ボタンをクリックすると、現在の画像が登録されます。よろしいですか？",MOVE_VIDEO_TAB:"画像を登録すると、今登録している動画は削除されます。また、新しく画像を添付しないで\n完了ボタンをクリックすると、現在の動画が登録されます。よろしいですか？",OVER_TITLE:"発言内容は、500文字以内で入力してください。",OVER_SOURCE:"出典は、全角50文字以内で入力してください。",OVER_COMMENT:"紹介コメントは、300文字以内で入力してください。",OVER_URL:"出典URLは、500文字以内で入力してください。",NOT_URL:"URLの入力形式が異なっています",HAS_PROBLEM:"一時的にご利用できません。",EDITED:"修正完了しました。",UPLOAD_FAIL:"1024KB未満の画像のみ対応しています。"},upload:{URL:"/upload.ajax",FILE_TYPE:"*.jpg;*.gif;*.jpeg;*.png"},style:{SELECT_IMAGE:"attachedImage",SELECT_VIDEO:"attachedMovie",REMOVE_EVENT:"_removeThis",GREY:"ready",FOG:"fog"},type:{IMAGE:"image",VIDEO:"video"},consts:{SEARCH_LAYER_WIDTH:953,VIDEO_LAYER_WIDTH:463,MAX_SOURCE_LENGTH:50,MAX_URL_LENGTH:500,MAX_TITLE_LENGTH:500,MAX_COMMENT_LENGTH:300,URL:"/content.ajax",MISSION_URL:"/odai/"}};
var fnPrivate={setConfig:function(oSource,oDest){function f(sName,oSource,oTarget){if(typeof oSource[sName]=="object"){for(var sName2 in oSource[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,oSource[sName],oTarget[sName])
}}else{oTarget[sName]=oSource[sName]
}}for(var p in oSource){f(p,oSource,oDest)
}}};
var pkg=$.verifyPackageName(ns);
pkg.container[pkg.name]={init:function(oConfig){this._initVariable(oConfig);
this._getElementRef();
this._initEvent();
this._initComponent();
this._afterInit()
},_initVariable:function(oConfig){fnPrivate.setConfig(oConfig,config)
},_getElementRef:function(){var m=this._elMother=$(config.id.mother);
this._elTitle=$$.getSingle(config.node.TITLE,m);
this._elSource=$$.getSingle(config.node.SOURCE,m);
this._elSourceUrl=$$.getSingle(config.node.SOURCE_URL,m);
this._elDateYear=$$.getSingle(config.node.DATE_YEAR,m);
this._elDateMonth=$$.getSingle(config.node.DATE_MONTH,m);
this._elDateDay=$$.getSingle(config.node.DATE_DAY,m);
this._elComment=$$.getSingle(config.node.COMMENT,m);
this._elSubmit=$$.getSingle(config.node.SUBMIT_BTN,m);
var b=$$.getSingle(config.node.MEDIA_BASE,m);
this._elToImageTab=$$.getSingle(config.node.TO_IMAGE_TAB,b);
this._elToVideoTab=$$.getSingle(config.node.TO_VIDEO_TAB,b);
this._elSearchVideoBtn=$$.getSingle(config.node.SEARCH_VIDEO_BTN,b);
this._elDirectVideoBtn=$$.getSingle(config.node.DIRECT_VIDEO_BTN,b);
this._elVideoThumb=$$.getSingle(config.node.VIDEO_THUMB,b);
this._elSearchImageBtn=$$.getSingle(config.node.SEARCH_IMAGE_BTN,b);
this._elUploadImageBtn=$$.getSingle(config.node.UPLOAD_IMAGE_BTN,b);
this._elImageThumb=$$.getSingle(config.node.IMAGE_THUMB,b);
this._welSearch=$Element(config.id.searchLayer)
},_initEvent:function(){$Fn(function(wEvent){var el=wEvent.element;
if(el.notFirst){if(fnMatome.trim(el.value)==config.msg.TITLE){el.value=""
}}else{el.notFirst=true
}},this).attach(this._elTitle,"focus");
$Fn(function(wEvent){if(fnMatome.trim(wEvent.element.value)==config.msg.TITLE){wEvent.element.value=""
}},this).attach(this._elTitle,"click");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.msg.SOURCE){wEvent.element.value=""
}wEvent.element.select()
},this).attach(this._elSource,"focus");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.msg.SOURCE_URL){wEvent.element.value=""
}wEvent.element.select()
},this).attach(this._elSourceUrl,"focus");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.msg.COMMENT){wEvent.element.value=""
}wEvent.element.select()
},this).attach(this._elComment,"focus");
$Fn(this._onSubmit,this).attach(this._elSubmit,"click");
$Fn(function(wEvent){var welMother=$Element(wEvent.element.parentNode.parentNode.parentNode);
if(fnMatome.be(config.SOURCE.resourceTypeCode)&&config.SOURCE.resourceTypeCode==config.type.VIDEO){if(confirm(config.msg.MOVE_VIDEO_TAB)){welMother.removeClass(config.style.SELECT_VIDEO).addClass(config.style.SELECT_IMAGE)
}}else{welMother.removeClass(config.style.SELECT_VIDEO).addClass(config.style.SELECT_IMAGE)
}wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(this._elToImageTab,"click");
$Fn(function(wEvent){var welMother=$Element(wEvent.element.parentNode.parentNode.parentNode);
if(fnMatome.be(config.SOURCE.resourceTypeCode)&&config.SOURCE.resourceTypeCode==config.type.IMAGE){if(confirm(config.msg.MOVE_IMAGE_TAB)){welMother.removeClass(config.style.SELECT_IMAGE).addClass(config.style.SELECT_VIDEO)
}}else{welMother.removeClass(config.style.SELECT_IMAGE).addClass(config.style.SELECT_VIDEO)
}wEvent.stop($Event.CANCEL_DEFAULT)
},this).attach(this._elToVideoTab,"click");
$Element(this._elImageThumb).delegate("click").bind("."+config.style.REMOVE_EVENT,$Fn(this._onRemoveMedia,this).bind());
$Element(this._elVideoThumb).delegate("click").bind("."+config.style.REMOVE_EVENT,$Fn(this._onRemoveMedia,this).bind())
},_initComponent:function(){this._initSearchLayer();
this._initUpload();
this._initDirectVideo()
},_initSearchLayer:function(){var t=this;
t._oSearchLayer=new nj.mission.SearchLayer({id:config.id.searchLayer,MISSION_NAME:""},{show:function(oData){if(oData.searchType==config.type.IMAGE){lcs_do({sti:"layer_interview_image"})
}else{lcs_do({sti:"layer_interview_video_search"})
}},hide:function(){t._foggySearch.hide()
},completed:function(oData,self){t._selectMedia(oData);
t._oSearchLayer.hide()
},search:function(oData){if(oData.searchType==config.type.IMAGE){lcs_do({sti:"layer_interview_image"})
}else{lcs_do({sti:"layer_interview_video_search"})
}}});
t._foggySearch=t._createFoggy().attach({show:function(){var oArea=$Document().scrollSize();
t._oSearchLayer.left((oArea.width-config.consts.SEARCH_LAYER_WIDTH)/2);
t._oSearchLayer.show()
},hide:function(){t._oSearchLayer.hide();
document.documentElement.scrollTop=""+(document.documentElement.scrollHeight||document.body.scrollHeight)
}});
t._foggySearch.getFog().className=config.style.FOG;
$Fn(function(){t._oSearchLayer.setConfig({consts:{searchType:config.type.IMAGE}},false);
t._foggySearch.show(t._welSearch.$value())
},this).attach(this._elSearchImageBtn,"click");
$Fn(function(){t._oSearchLayer.setConfig({consts:{searchType:config.type.VIDEO}},false);
t._foggySearch.show(t._welSearch.$value())
},this).attach(this._elSearchVideoBtn,"click")
},_initUpload:function(){this._oUploader=new nj.Uploader2(this._elUploadImageBtn,{url:config.upload.URL,filetype:config.upload.FILE_TYPE,data:{},onSuccess:$Fn(this._successUpload,this).bind(),onError:$Fn(this._failUpload,this).bind(),align:true});
this._oUploader.initUI()
},_initDirectVideo:function(){var t=this;
DirectVideoLayer.init({TITLE:config.SOURCE.missionName},{close:function(){t._foggyVideo.hide()
},select:function(oData){t._selectMedia(oData);
t._foggyVideo.hide()
}});
t._foggyVideo=t._createFoggy().attach({show:function(){var oArea=$Document().scrollSize();
DirectVideoLayer.css("left",(oArea.width-config.consts.VIDEO_LAYER_WIDTH)/2+"px");
DirectVideoLayer.show();
lcs_do({sti:"layer_interview_video_url"})
},hide:function(){DirectVideoLayer.hide();
document.documentElement.scrollTop=""+(document.documentElement.scrollHeight||document.body.scrollHeight)
}});
t._foggyVideo.getFog().className=config.style.FOG;
$Fn(function(){this._foggyVideo.show(DirectVideoLayer.element())
},this).attach(this._elDirectVideoBtn,"click")
},_afterInit:function(){this._elTitle.select()
},_selectMedia:function(oData){this[(typeof oData.imageResolution=="undefined"?"_selectMovie":"_selectImage")](oData)
},_selectImage:function(oData){this._elVideoThumb.innerHTML="";
var template='<img height="90" width="120" alt="" src="'+oData.thumbnailUrl+'"/>';
template+='<button class="btnPicDel '+config.style.REMOVE_EVENT+'">画像削除</button>';
this._elImageThumb.innerHTML=template;
config.SOURCE.resourceTypeCode=config.type.IMAGE;
config.SOURCE.thumbnailUrl=oData.thumbnailUrl;
config.SOURCE.fileSize=oData.fileSize;
config.SOURCE.imageResolution=oData.imageResolution;
config.SOURCE.url=oData.url;
config.SOURCE.mediaSourceUrl=oData.sourceUrl
},_selectMovie:function(oData){this._elImageThumb.innerHTML="";
var template='<img height="90" width="120" alt="" src="'+oData.thumbnailUrl+'"/>';
template+='<span class="icoPlay"></span>';
template+='<span class="playTime">'+oData.playTime+"</span>";
template+='<button class="btnMovDel '+config.style.REMOVE_EVENT+'">動画削除</button>';
this._elVideoThumb.innerHTML=template;
config.SOURCE.resourceTypeCode=config.type.VIDEO;
config.SOURCE.thumbnailUrl=oData.thumbnailUrl;
config.SOURCE.url=oData.url;
config.SOURCE.mediaSource=oData.source;
config.SOURCE.mediaSourceUrl=oData.sourceUrl;
config.SOURCE.videoRunningTime=oData.playTime
},_successUpload:function(oData){this._selectImage(oData)
},_failUpload:function(){alert(config.msg.UPLOAD_FAIL)
},_createFoggy:function(){return new nhn.Foggy({showDuration:0,showOpacity:nhn.Effect.linear(0.7),hideDuratioin:200,hideOpacity:nhn.Effect.linear(0),zIndex:32000,fps:15})
},_onRemoveMedia:function(wEvent){$Element(wEvent.element.parentNode).empty();
config.SOURCE.resourceTypeCode="";
config.SOURCE.thumbnailUrl="";
config.SOURCE.fileSize="";
config.SOURCE.imageResolution="";
config.SOURCE.url="";
config.SOURCE.mediaSourceUrl="";
config.SOURCE.mediaSource="";
config.SOURCE.videoRunningTime=""
},_onSubmit:function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
if(!fnMatome.validateBlank(this._elTitle,{msg:config.msg.TITLE_ALERT})){return false
}if(!fnMatome.validateDefaultText(this._elTitle,{msg:config.msg.TITLE_ALERT,text:config.msg.TITLE})){return false
}if(!fnMatome.validateLength(this._elTitle,{msg:config.msg.OVER_TITLE,min:0,max:config.consts.MAX_TITLE_LENGTH})){return false
}config.SOURCE.title=fnMatome.trim(this._elTitle.value);
if(!fnMatome.validateBlank(this._elSource,{msg:config.msg.SOURCE})){return false
}if(!fnMatome.validateDefaultText(this._elSource,{msg:config.msg.SOURCE,text:config.msg.SOURCE})){return false
}if(!fnMatome.validateLength(this._elSource,{msg:config.msg.OVER_SOURCE,min:0,max:config.consts.MAX_SOURCE_LENGTH})){return false
}config.SOURCE.source=fnMatome.trim(this._elSource.value);
if(fnMatome.trim(this._elSourceUrl.value)!=""&&fnMatome.trim(this._elSourceUrl.value)!=config.msg.SOURCE_URL){var sUrl=fnMatome.trim(this._elSourceUrl.value);
if(!/^http(s?):\/\/.*/i.test(sUrl)){this._elSourceUrl.value=sUrl="http://"+sUrl
}if(!fnMatome.validateURL(this._elSourceUrl.value)){alert(config.msg.NOT_URL);
this._elSourceUrl.select();
return false
}if(!fnMatome.validateLength(this._elSourceUrl,{msg:config.msg.OVER_URL,min:0,max:config.consts.MAX_URL_LENGTH})){return false
}}if(!this._checkDate()){return false
}fnMatome.clearText(this._elSourceUrl,{text:config.msg.SOURCE_URL});
fnMatome.clearText(this._elComment,{text:config.msg.COMMENT});
if(!fnMatome.validateLength(this._elComment,{msg:config.msg.OVER_COMMENT,min:0,max:config.consts.MAX_COMMENT_LENGTH})){return false
}config.SOURCE.sourceUrl=fnMatome.trim(this._elSourceUrl.value);
config.SOURCE.description=fnMatome.trim(this._elComment.value);
fnMatome.sendServer(config.consts.URL,this._makeParam(),$Fn(this._response,this).bind())
},_checkDate:function(){if(fnMatome.trim(this._elDateYear.value)==""&&fnMatome.trim(this._elDateMonth.value)==""&&fnMatome.trim(this._elDateDay.value)==""){config.SOURCE.interviewDate="";
return true
}if(!fnMatome.validateBlank(this._elDateYear,{msg:config.msg.YEAR_ERR})){return false
}if(!fnMatome.validateLength(this._elDateYear,{min:0,max:4,msg:config.msg.YEAR_NUM_ERR})){return false
}if(!fnMatome.validateNumeric(this._elDateYear,{msg:config.msg.YEAR_NUM_ERR})){return false
}var sYear=fnMatome.trim(this._elDateYear.value);
if(!fnMatome.isBlank(this._elDateMonth.value)){if(!fnMatome.validateBlank(this._elDateMonth,{msg:config.msg.MONTH_ERR})){return false
}if(!fnMatome.validateLength(this._elDateMonth,{min:0,max:2,msg:config.msg.MONTH_NUM_ERR})){return false
}if(!fnMatome.validateNumeric(this._elDateMonth,{msg:config.msg.MONTH_NUM_ERR})){return false
}if(!fnMatome.validate(this._elDateMonth,{msg:config.msg.MONTH_NUM_ERR,fn:function(element){var sText=new Number(fnMatome.trim(element.value));
if(sText>=1&&sText<=12){return true
}return false
}})){return false
}}else{if(!fnMatome.isBlank(this._elDateDay.value)){if(!fnMatome.validateBlank(this._elDateMonth,{msg:config.msg.MONTH_ERR})){return false
}}}var sMonth=fnMatome.trim(this._elDateMonth.value);
if(!fnMatome.isBlank(this._elDateDay.value)){if(!fnMatome.validateNumeric(this._elDateDay,{msg:config.msg.DAY_NUM_ERR})){return false
}if(!fnMatome.validate(this._elDateDay,{msg:config.msg.DAY_NUM_ERR,fn:function(element){var nText=new Number(fnMatome.trim(element.value));
if(nText>=1&&nText<=31){return true
}return false
}})){return false
}}var sDay=fnMatome.trim(this._elDateDay.value);
if(!fnMatome.isBlank(sDay)){if(parseInt(sDay)>this._calcuMaxDay(parseInt(sYear),parseInt(sMonth))){alert(config.msg.NOT_DATE);
this._elDateDay.select();
return false
}}if(this._isFuture(sYear,sMonth,sDay)){alert(config.msg.NOT_DATE);
this._elDateYear.select();
return false
}var sDate=sYear+"."+(sMonth.length==1?"0":"")+sMonth+(sDay==""?"":"."+(sDay.length==1?"0":"")+sDay);
config.SOURCE.interviewDate=sDate.replace(/\.$/,"");
return true
},_calcuMaxDay:function(nYear,nMonth){var nMaxDay=31;
nYear=parseInt(nYear);
nMonth=parseInt(nMonth);
switch(nMonth){case 4:case 6:case 9:case 11:nMaxDay=30;
break;
case 2:nMaxDay=(nYear%4==0&&(nYear%100!=0||nYear%400==0))?29:28;
break;
default:break
}return nMaxDay
},_isFuture:function(sYear,sMonth,sDay){var nYear=new Number(sYear),nMonth=(sMonth==""?0:new Number(sMonth)),nDay=(sDay==""?0:new Number(sDay));
var oDate=new Date();
var nNowYear=parseInt(oDate.getFullYear());
var nNowMonth=parseInt(oDate.getMonth())+1;
var nNowDay=parseInt(oDate.getDate());
if(nYear>nNowYear){return true
}if(nYear==nNowYear&&nMonth>nNowMonth){return true
}if(nYear==nNowYear&&nMonth==nNowMonth&&nDay>nNowDay){return true
}return false
},_makeParam:function(){var oParam={m:"save","content.missionId":config.SOURCE.missionId,"content.contentId":config.SOURCE.contentId,"content.interviewDate":config.SOURCE.interviewDate,"content.title":config.SOURCE.title,"content.source":config.SOURCE.source,"content.sourceUrl":config.SOURCE.sourceUrl,"content.description":config.SOURCE.description};
if(fnMatome.be(config.SOURCE.resourceTypeCode)&&config.SOURCE.resourceTypeCode!=""){oParam["content.thumbnailUrl"]=config.SOURCE.thumbnailUrl||"";
oParam["content.url"]=config.SOURCE.url||"";
oParam["content.mediaSourceUrl"]=config.SOURCE.mediaSourceUrl||"";
oParam["content.resourceTypeCode"]=config.SOURCE.resourceTypeCode.toUpperCase().substring(0,1);
if(config.SOURCE.resourceTypeCode==config.type.IMAGE){oParam["content.fileSize"]=config.SOURCE.fileSize||"";
oParam["content.imageResolution"]=config.SOURCE.imageResolution||""
}else{oParam["content.mediaSource"]=config.SOURCE.mediaSource||"";
oParam["content.videoRunningTime"]=config.SOURCE.videoRunningTime||""
}}return oParam
},_response:function(oRes){if(oRes.result){if(config.SOURCE.contentId!=""){alert(config.msg.EDITED)
}location.href=config.SOURCE.returnUrl||"http://"+location.host+config.consts.MISSION_URL+oRes.missionId+"?page=1&viewCode=WR"
}else{if(oRes.message){alert(oRes.message);
location.href=config.consts.MISSION_URL+oRes.missionId
}else{if(typeof oRes.validDate!="undefined"&&oRes.validDate===false){alert(config.msg.NOT_DATE)
}else{alert(config.msg.HAS_PROBLEM)
}}}}}
})("InterviewContentAdd");
(function(ns){var config={id:{list:"thumbImageSlider"},node:{LIST:"> UL",LEFT_ARROW:"> BUTTON.btnSlidePre",RIGHT_ARROW:"> BUTTON.btnSlideNext"},style:{SELECTED:"selected",LEFT_DISABLE:"preDim",RIGHT_DISABLE:"nextDim",LEFT_HOVER:"preHover",RIGHT_HOVER:"nextHover"},consts:{THUMB_WIDTH:89,DISPLAY:7}};
var fnPrivate={setConfig:function(oSource,oDest){function f(sName,oSource,oTarget){if(typeof oSource[sName]=="object"){for(var sName2 in oSource[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,oSource[sName],oTarget[sName])
}}else{oTarget[sName]=oSource[sName]
}}for(var p in oSource){f(p,oSource,oDest)
}}};
var pkg=$.verifyPackageName(ns);
pkg.container[pkg.name]={init:function(oConfig){this._initVariable(oConfig);
this._getElementRef();
this._initEvent();
this._initPosition()
},_initVariable:function(oConfig){fnPrivate.setConfig(oConfig,config);
this._bIng=false
},_getElementRef:function(){this._elMother=$(config.id.list);
this._welList=$Element($$.getSingle(config.node.LIST,this._elMother));
this._welLeftArrow=$Element($$.getSingle(config.node.LEFT_ARROW,this._elMother));
this._welRightArrow=$Element($$.getSingle(config.node.RIGHT_ARROW,this._elMother))
},_initEvent:function(){$Fn(this._onLeft,this).attach(this._welLeftArrow.$value(),"click");
$Fn(this._onRight,this).attach(this._welRightArrow.$value(),"click");
nj.hover(this._welLeftArrow.$value(),{enter:function(wEvent,ele){var wel=$Element(ele);
if(wel.hasClass(config.style.LEFT_DISABLE)){return 
}wel.addClass(config.style.LEFT_HOVER)
},leave:function(wEvent,ele){$Element(ele).removeClass(config.style.LEFT_HOVER)
}});
nj.hover(this._welRightArrow.$value(),{enter:function(we,ele){var wel=$Element(ele);
if(wel.hasClass(config.style.RIGHT_DISABLE)){return 
}wel.addClass(config.style.RIGHT_HOVER)
},leave:function(we,ele){$Element(ele).removeClass(config.style.RIGHT_HOVER)
}})
},_initPosition:function(){var nPos=0;
var aList=$$("> LI",this._welList.$value());
$A(aList).forEach(function(li,index){if(li.className==config.style.SELECTED){nPos=index;
$A.Break()
}},this);
this._nTotalPage=this._calcuPage(aList.length-1);
this._nCurrentPage=this._calcuPage(nPos);
this._move(true);
$Element(this._elMother).show()
},_calcuPage:function(nPos){return parseInt(nPos/config.consts.DISPLAY)
},_onLeft:function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
this._delegationLeft()
},_onRight:function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
this._delegationRight()
},_delegationLeft:function(){if(this._nCurrentPage==0){return 
}if(this._bIng==true){return 
}this._bIng=true;
this._nPre=this._nCurrentPage;
this._nCurrentPage--;
this._move()
},_delegationRight:function(){if(this._nCurrentPage==this._nTotalPage){return 
}if(this._bIng==true){return 
}this._bIng=true;
this._nPre=this._nCurrentPage;
this._nCurrentPage++;
this._move()
},_move:function(bIsFirst){var nTop=parseInt(this._welList.css("top"));
var nLeft=-(this._nCurrentPage*config.consts.DISPLAY*config.consts.THUMB_WIDTH);
if(bIsFirst){this._welList.css("left",nLeft+"px")
}else{new nj.fx(this._welList.$value()).tween({sec:0.3,left:{to:nLeft,ease:"easeInCubic"},top:{to:nTop,ease:"easeInCubic"},onComplete:function(){}})
}if(this._nCurrentPage==0){if(!this._welLeftArrow.hasClass(config.style.LEFT_DISABLE)){this._welLeftArrow.addClass(config.style.LEFT_DISABLE)
}}else{this._welLeftArrow.removeClass(config.style.LEFT_DISABLE)
}if(this._nCurrentPage==this._nTotalPage){if(!this._welRightArrow.hasClass(config.style.RIGHT_DISABLE)){this._welRightArrow.addClass(config.style.RIGHT_DISABLE)
}}else{if(this._nCurrentPage<this._nTotalPage&&this._nTotalPage>1){this._welRightArrow.removeClass(config.style.RIGHT_DISABLE)
}}this._bIng=false
}}
})("nj.mission.ThumbnailSlider");
(function(ns){var config={id:{list:"thumbImageSlider"},node:{LIST:"> UL",LEFT_ARROW:"> BUTTON.btnSlidePre",RIGHT_ARROW:"> BUTTON.btnSlideNext"},style:{SELECTED:"selected",LEFT_DISABLE:"preDim",RIGHT_DISABLE:"nextDim",LEFT_HOVER:"preHover",RIGHT_HOVER:"nextHover"},consts:{THUMB_WIDTH:89,DISPLAY:7,URL:"/missionView.ajax",TEMPLATE:"<A href='/odai/{=missionId}/{=resourceId}'><img src='{=thumbUrl}' title='{=title}' width='80' height='80' onerror=\"errorImage(this,'noimg80');\" onload=\"resizeImage(this,80,80);\"/></A><!-- NPI=a:otheritem, r:1, i:{=resourceId} -->",VIDEO_TEMPLATE:"<div class='thumb'><A href='/odai/{=missionId}/{=resourceId}'><img src='{=thumbUrl}' title='{=title}' width='120' height='90' onerror=\"errorImage(this,'noimg120x90');\" onload=\"resizeImage(this,120,90);\"/></A><!-- NPI=a:otheritem, r:1, i:{=resourceId} -->{if deadFlag}<span>配信不可</span>{elseif videoRunningTime}<span>{=videoRunningTime}</span>{/if}</div>"},source:{missionid:"",resourceid:""}};
var fnPrivate={setConfig:function(oSource,oDest){function f(sName,oSource,oTarget){if(typeof oSource[sName]=="object"){for(var sName2 in oSource[sName]){if(typeof oTarget[sName]=="undefined"){oTarget[sName]={}
}f(sName2,oSource[sName],oTarget[sName])
}}else{oTarget[sName]=oSource[sName]
}}for(var p in oSource){f(p,oSource,oDest)
}}};
var pkg=$.verifyPackageName(ns);
pkg.container[pkg.name]={init:function(oConfig){this._initVariable(oConfig);
this._getElementRef();
this._initEvent();
this._initPosition()
},_initVariable:function(oConfig){fnPrivate.setConfig(oConfig,config);
this._oTemplate=$Template(config.source.type=="video"?config.consts.VIDEO_TEMPLATE:config.consts.TEMPLATE);
this._nThumbWidth=config.source.type=="video"?120:80;
this._nThumbHeight=config.source.type=="video"?90:80;
this._bIng=false
},_getElementRef:function(){this._elMother=$(config.id.list);
this._welList=$Element($$.getSingle(config.node.LIST,this._elMother));
this._welLeftArrow=$Element($$.getSingle(config.node.LEFT_ARROW,this._elMother));
this._welRightArrow=$Element($$.getSingle(config.node.RIGHT_ARROW,this._elMother))
},_initEvent:function(){$Fn(this._onLeft,this).attach(this._welLeftArrow.$value(),"click");
$Fn(this._onRight,this).attach(this._welRightArrow.$value(),"click");
nj.hover(this._welLeftArrow.$value(),{enter:function(wEvent,ele){var wel=$Element(ele);
if(wel.hasClass(config.style.LEFT_DISABLE)){return 
}wel.addClass(config.style.LEFT_HOVER)
},leave:function(wEvent,ele){$Element(ele).removeClass(config.style.LEFT_HOVER)
}});
nj.hover(this._welRightArrow.$value(),{enter:function(we,ele){var wel=$Element(ele);
if(wel.hasClass(config.style.RIGHT_DISABLE)){return 
}wel.addClass(config.style.RIGHT_HOVER)
},leave:function(we,ele){$Element(ele).removeClass(config.style.RIGHT_HOVER)
}})
},_initPosition:function(){this._nTotalPage=this._calcuPage(config.source.totalCount);
this._nCurrentPage=config.source.currentPage;
this._nPosition=this._nTotalPage>1?1:0;
if(this._nTotalPage==1){if(!this._welLeftArrow.hasClass(config.style.LEFT_DISABLE)){this._welLeftArrow.addClass(config.style.LEFT_DISABLE)
}if(!this._welRightArrow.hasClass(config.style.RIGHT_DISABLE)){this._welRightArrow.addClass(config.style.RIGHT_DISABLE)
}}this._move(true);
$Element(this._elMother).show()
},_calcuPage:function(nPos){return Math.ceil(nPos/config.consts.DISPLAY)
},_onLeft:function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
this._delegationLeft()
},_onRight:function(wEvent){wEvent.stop($Event.CANCEL_DEFAULT);
this._delegationRight()
},_delegationLeft:function(){if(this._nTotalPage==1||this._bIng||this._bRequest){return 
}this._bIng=true;
this._nCurrentPage--;
if(this._nCurrentPage<=0){this._nCurrentPage=this._nTotalPage
}this._request({page:this._nCurrentPage},this._response);
this._nPosition--;
this._move()
},_delegationRight:function(){if(this._nTotalPage==1||this._bIng||this._bRequest){return 
}this._bIng=true;
this._nCurrentPage++;
if(this._nCurrentPage>this._nTotalPage){this._nCurrentPage=1
}this._request({page:this._nCurrentPage},this._response);
this._nPosition++;
this._move()
},_move:function(bIsFirst){var nTop=parseInt(this._welList.css("top"));
var nLeft=-(this._nPosition*config.consts.DISPLAY*config.consts.THUMB_WIDTH);
if(bIsFirst){this._welList.css("left",nLeft+"px")
}else{var t=this;
new nj.fx(this._welList.$value()).tween({sec:0.3,left:{to:nLeft,ease:"easeInCubic"},top:{to:nTop,ease:"easeInCubic"},onComplete:function(){t._replace()
}})
}},_getThumbnailUrl:function(sUrl,nWidth,nHeight){var sGone="/img/Gone";
var sNoImg="noimg"+nWidth;
var nMwidth=80;
var nMheight=80;
if(nWidth==120&&nHeight==90){sNoImg="noimg120x90"
}if(sUrl&&sUrl.indexOf("/kaze/")>0){if(nWidth>120){nMwidth=160;
nMheight=140
}else{if(nWidth>80){nMwidth=120;
nMheight=120
}}sUrl=sUrl.replace(/\/120\/120/g,"/"+nMwidth+"/"+nMheight)
}else{if(/.*\/r.[0-9]{2,3}x[0-9]{2,3}/i.test(sUrl)){if(nWidth==120){sUrl=sUrl.replace(/(.*\/)(r\.[0-9]{2,3}x[0-9]{2,3})/i,"$1r.120x90")
}else{sUrl=sUrl.replace(/(.*\/)(r\.[0-9]{2,3}x[0-9]{2,3})/i,"$1c.80x80")
}}else{if(sUrl&&sUrl.indexOf(".naver.jp/jthumb.lookup")>0){var sType="etc3";
if(nWidth>120){sType="etc1"
}else{if(nWidth>80){sType="etc2"
}}sUrl=sUrl.replace(/type=etc[123]/g,"type="+sType)
}else{if(!sUrl){sUrl=sGone
}}}}return sUrl
},_replace:function(){if(this._bRequest){var self=this;
$Fn(self._replace,self).delay(0.5);
return 
}var aList=$$("> LI",this._welList.$value());
$A(aList).forEach(function(li,index){if(index<this._nPosition*config.consts.DISPLAY||index>=(this._nPosition+1)*config.consts.DISPLAY){$Element(li).leave()
}},this);
$A(this._waPrev).reverse().forEach(function(item,index){var oLI=$Element("<LI>");
if(item){item.missionid=config.source.missionid;
item.thumbUrl=this._getThumbnailUrl(item.thumbUrl,this._nThumbWidth,this._nThumbHeight);
oLI.html(this._oTemplate.process(item));
if(item.resourceId==config.source.resourceid){oLI.addClass(config.style.SELECTED)
}}this._welList.prepend(oLI)
},this);
$A(this._waNext).forEach(function(item,index){var oLI=$Element("<LI>");
if(item){item.missionid=config.source.missionid;
item.thumbUrl=this._getThumbnailUrl(item.thumbUrl,this._nThumbWidth,this._nThumbHeight);
oLI.html(this._oTemplate.process(item));
if(item.resourceId==config.source.resourceid){oLI.addClass(config.style.SELECTED)
}}this._welList.append(oLI)
},this);
this._nPosition=1;
var nLeft=-(this._nPosition*config.consts.DISPLAY*config.consts.THUMB_WIDTH);
this._welList.css("left",nLeft+"px");
this._welLeftArrow.removeClass(config.style.LEFT_DISABLE);
this._welRightArrow.removeClass(config.style.RIGHT_DISABLE);
this._bIng=false
},_request:function(param,callback){this._bRequest=true;
if(!this._welLeftArrow.hasClass(config.style.LEFT_DISABLE)){this._welLeftArrow.addClass(config.style.LEFT_DISABLE)
}if(!this._welRightArrow.hasClass(config.style.RIGHT_DISABLE)){this._welRightArrow.addClass(config.style.RIGHT_DISABLE)
}param.m="resourceListForNavi";
param.itemPerPage=config.consts.DISPLAY;
param.missionId=config.source.missionid;
fnMatome.sendServer(config.consts.URL,param,$Fn(callback,this).bind())
},_response:function(oData){var t=this;
this._nTotalPage=this._calcuPage(oData.totalCount);
this._nCurrentPage=oData.currentPage;
this._waPrev=$A(oData.prev||oData.current).length(config.consts.DISPLAY,null);
this._waCurrent=$A(oData.current).length(config.consts.DISPLAY,null);
this._waNext=$A(oData.next||oData.current).length(config.consts.DISPLAY,null);
this._waPrev.forEach(function(v,i,o){if(v&&v.thumbUrl){new Image().src=t._getThumbnailUrl(v.thumbUrl,t._nThumbWidth,t._nThumbHeight)
}});
this._waNext.forEach(function(v,i,o){if(v&&v.thumbUrl){new Image().src=t._getThumbnailUrl(v.thumbUrl,t._nThumbWidth,t._nThumbHeight)
}});
this._bRequest=false
}}
})("nj.mission.AjaxThumbnailSlider");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=$Class({KC_ENTER:13,KC_BACKSPACE:8,KC_TAB:9,KC_ENG_KOR:21,KC_SPACE:32,KC_PAGEUP:33,KC_PAGEDN:34,KC_END:35,KC_HOME:36,KC_LARROW:37,KC_UARROW:38,KC_RARROW:39,KC_DARROW:40,KC_INSERT:45,KC_DELETE:46,KC_MINUS:189,KC_ALPHA_A:65,KC_ALPHA_Z:90,KC_ALPHA_V:86,$init:function(oOptions){this._options={id:"q",cancelTags:["INPUT","TEXTAREA","SELECT","EMBED","OBJECT"]};
this._enabled=true;
for(var i in oOptions){if(typeof this._options[i]!="undefined"){this._options[i]=oOptions[i]
}}this.textbox=$(this._options.id);
this._bindEvents()
},_bindEvents:function(){$Fn(this.onKeyDown,this).attach(document,"keydown")
},isCancelTag:function(oElm){var oElm=$Element(oElm);
for(var i in this._options.cancelTags){if(oElm.tag.toUpperCase()==this._options.cancelTags[i]){return true
}}return false
},isCancelKey:function(oKey){var nCode=oKey.keyCode;
if(nCode==224||oKey.meta||nCode==this.KC_BACKSPACE||(nCode>=this.KC_SPACE&&nCode<=this.KC_DARROW)||(nCode!=this.KC_ENG_KOR&&nCode<this.KC_SPACE)||oKey.alt){return true
}return false
},on:function(){this._enabled=true
},off:function(){this._enabled=false
},toggle:function(){if(this._enabled===true){this.off()
}else{this.on()
}},onKeyDown:function(ev){if(!this._enabled){return 
}var oTarget=ev.element;
var oKey=ev.key();
var nCode=oKey.keyCode;
if(!(this.isCancelTag(oTarget)||(oKey.ctrl&&nCode!=this.KC_ALPHA_V))){if(this.isCancelKey(oKey)){return 
}if(nCode==this.KC_SPACE&&oKey.shift){window.scrollTo(0,0);
this.textbox.focus();
this.textbox.select();
ev.stop()
}else{if(oTarget!=this.textbox&&oTarget.tagName.toUpperCase()!="OBJECT"){window.scrollTo(0,0);
this.textbox.focus();
this.textbox.select()
}}}}})
})("nj.search.AutoFocus");
(function(ns){var config={id:{missionSelect:"missionSelect"},node:{KEYWORD:"> DD.searchKeyword > .inTxtWrapper > INPUT",NOTIFY:"> DIV.missionIndex > P",LIST:"._jMissionList"},template:{RECOMMENDATION:['<li><a href="#" class="_selectThis" onclick="return false">#keyword#についてのおすすめサイト</a></li>'].join(""),SUGGESTION:['<a class="_selectThis" href="/odai/#missionId#" onclick="return false">#title#</a>'].join(""),NOT_OPEN:['<li><a class="_selectThis" href="#" onclick="return false">マイページのデフォルトマトメで送り(非公開)</a></li>'].join("")},MSG:{NOTIFY:"リストの中から、追加先のお題を選択してください。",NOTIFY_EMPTY:"入力された検索キーワードと一致するお題を表示します。"},CODE:{S:"9000001",I:"9000002",V:"9000003"},KEYWORD:{S:"のリンク",I:"の画像",V:"の動画"},style:{select:"_selectThis"},color:{activate:"#fff18e"},url:"/similarMission.ajax"};
var pkg=$.verifyPackageName(ns);
pkg.container[pkg.name]={init:function(option,fnCallback,sId){this._initConfig(sId,option);
this._initCallback(fnCallback||{});
this._getElementRef();
this._initVariable(sId);
this._initEvent();
if(option.doSearch){this.searchMissionList()
}},_initConfig:function(sId,option){config.id.missionSelect=sId||config.id.missionSelect;
config.type=option.type;
this._nDefaultCode=config.CODE[option.type];
this._sKeywordTail=config.KEYWORD[option.type]
},_initCallback:function(fn){this._fnSelect=fn.select||function(){};
this._fnEmpty=fn.empty||function(){};
this._fnList=fn.list||function(){}
},_getElementRef:function(){var elBase=$(config.id.missionSelect);
this._elKeyword=$$.getSingle(config.node.KEYWORD,elBase.parentNode);
this._elNotify=$$.getSingle(config.node.NOTIFY,elBase);
this._elList=$$.getSingle(config.node.LIST,elBase)
},_initVariable:function(){this._sBeforeKeyword=this._trim(this._elKeyword.value);
this._oSelected={missionId:"",templateId:""}
},_initEvent:function(){this._oWatchInput=new nhn.WatchInput(this._elKeyword).attach("input",$Fn(this._onkeydown,this).bind());
$Element(this._elList).delegate("click").bind("."+config.style.select,$Fn(this._onselectMission,this).bind())
},_onselectMission:function(wEvent){this._bClickSelected=true;
this._setColor(wEvent.element);
var aId=wEvent.element.parentNode.id.split("_");
if(aId&&wEvent.element){this._selection(aId,wEvent.element.innerHTML)
}wEvent.stop($Event.CANCEL_DEFAULT)
},_setColor:function(elSelected){var aLists=$$("a",this._elList);
if(aLists){var nLists=aLists.length;
for(var i=0;
i<nLists;
i++){$Element(aLists[i]).css("background","none")
}if(elSelected){$Element(elSelected).css("background",config.color.activate)
}}},_selection:function(aId,sHTML){this._oSelected={missionId:aId[0],templateId:aId[1],content:sHTML};
this._fnSelect({missionId:aId[0],templateId:aId[1],keyword:this._elKeyword.value,text:sHTML})
},_onkeydown:function(wEvent){var sKeyword=wEvent.element.value;
if(this._sBeforeKeyword==this._trim(sKeyword)){return 
}this._sBeforeKeyword=this._trim(sKeyword);
this.searchMissionList()
},clearSuggest:function(){this._bClickSelected=false;
while(this._elList.lastChild){this._elList.removeChild(this._elList.lastChild)
}this._fnEmpty()
},searchMissionList:function(sQuery){var self=this;
if(typeof this._oAjax!="undefined"){try{this._oAjax.abort()
}catch(e){}finally{this._oAjax=null
}}this._sBeforeKeyword=sQuery||this._sBeforeKeyword;
if(this._sBeforeKeyword==""){this.clearSuggest()
}this._oAjax=this._sendServer(config.url,{q:this._sBeforeKeyword,type:config.type},function(oData){self._oCache=oData;
if(oData!==false&&oData&&oData.items&&oData.items.length!=0){self._elList.innerHTML="";
$A(oData.items).forEach(function(item){var li=$Element("<LI>").attr("id",item[0]+"_"+item[2]).html('<a class="_selectThis" href="/odai/'+item[0]+'" onclick="return false">'+item[1]+"</a>").$value();
self._elList.appendChild(li)
});
if(!self._bClickSelected){self._selection(new Array("0",self._nDefaultCode),self._sBeforeKeyword+self._sKeywordTail);
(oData.query&&oData.query!="")?self._elNotify.innerHTML=config.MSG.NOTIFY:self._elNotify.innerHTML=config.MSG.NOTIFY_EMPTY
}else{if(self._oSelected.missionId!=0||(self._oSelected.missionId==0&&self._oSelected.content==oData.items[0][1])){self._setColor($$.getSingle("a",$(self._oSelected.missionId+"_"+self._oSelected.templateId)))
}}}else{if(self._sBeforeKeyword==""){self._elNotify.innerHTML=config.MSG.NOTIFY_EMPTY
}}self._oAjax=null
})
},_trim:function(str){return $S(str).trim().$value()
},_sendServer:function(sUrl,oParam,fn){var oAjax=new $Ajax(sUrl,{onload:function(oRes){fn(oRes.json(),oParam)
},ontimeout:function(oRes){fn(false)
},timeout:5}).request(oParam);
return oAjax
},setDefault:function(){this._selection(new Array("0",this._nDefaultCode),this._sBeforeKeyword+this._sKeywordTail)
},reInit:function(){this._initVariable();
this._bClickSelected=false
}}
})("MissionSuggest");
function curtail(sText,nSize){var oStr=nj.cutStr(sText,nSize,11,8,5,6);
return oStr.size>nSize?oStr.str+"...":sText
}(function(namespace){var config={id:{layer:"siteLayer",missionSelect:"missionSelectSite"},width:508,style:{FOG:"fog",GREY:"ready"},NODE:{BASE:"> DIV.shadow > DIV.shadowSide > DIV.subLayerTemplate",CLOSE_BTN:"> A.layerClose",ELEMENT_PARENT:"DL",URL:"DL > DD.urlArea > P.url",TITLE:"DL > DD.itemTitle > label.inTxtWrapper >  INPUT",KEYWORD:"DL > DD.searchKeyword > label.inTxtWrapper >  INPUT",COMMENT:"DL > DD.commentIntroduction > label.inTxtWrapper > TEXTAREA",THUMB_LIST:"DL > DD.setMImage > UL",NOTIFY:"DL > DD.missionSelect > DIV.missionIndex > P",UPLOAD_IMG_BTN:"DL > DD.setMImage > A > IMG",SUBMIT:"> DIV.layerContents > DIV.inputComment > DIV.btns > BUTTON",THUMB_IMG:"IMG",THUMB_RADIO:"INPUT[type=radio]",CHECKED_RADIO:"INPUT[type=radio][checked=true]"},MSG:{URL:"URLを入力してください",TITLE:"タイトルを入力してください",OVER_TITLE:"タイトルは、全角100文字以内で入力してください。",COMMENT:"紹介コメントを入力してください",OVER_COMMENT:"紹介コメントは、全角300文字以内で入力してください。",SAVE_ERR:"一時的にご利用できません。",KEYWORD:"リンク内容を示す言葉を入力してください",MISSION:"追加先のお題を選択してください。",NOTIFY:"リストの中から、追加先のお題を選択してください。",NOTIFY_EMPTY:"入力された検索キーワードと一致するお題を表示します。"},TEMPLATE:['<input type="radio" name="content.thumbnailUrl" value="#thumb#"/>','<img height="58" width="58" alt="" src="#thumb#"/>'].join(""),thumbRadio:{MAX:4,noImageId:"noImgeType",userImageId:"userImageType"},SEARCH_THUMB_URL:"/siteInfo.ajax",SUBMIT_URL:"/content.ajax",consts:{MAX_TITLE_LENGTH:100,MAX_COMMENT_LENGTH:300},upload:{URL:"/upload.ajax",FILE_TYPE:"*.jpg;*.gif;*.jpeg;*.png"}};
var COMMON={trim:function(str){return $S(str).trim().$value()
},sendServer:function(oData,fn){new $Ajax(oData.q?config.SEARCH_THUMB_URL:config.SUBMIT_URL,{timeout:5,onload:function(oRes){fn(oRes.json(),oData)
},ontimeout:function(){fn({result:false})
}}).request(oData)
},htmlEncode:function(str){return str.replace(/&lt;/ig,"<").replace(/&gt;/ig,">").replace(/&quot;/ig,'"').replace(/&amp;/ig,"&")
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(oCompletedLayer,oSearchAutoFocus,_config){_config=_config||{};
for(var i in _config){config[i]=_config[i]
}this._getElementRef(oCompletedLayer);
this._initVariable(oSearchAutoFocus);
this._initEvent();
this._initFoggy();
this._initUpload()
},_getElementRef:function(oCompletedLayer){this._oCompletedLayer=oCompletedLayer;
this._welLayer=$Element(config.id.layer);
var elBase=$$.getSingle(config.NODE.BASE,this._welLayer.$value());
this._welParent=$Element($$.getSingle(config.NODE.ELEMENT_PARENT,elBase));
this._elClose=$$.getSingle(config.NODE.CLOSE_BTN,elBase);
this._elUrl=$$.getSingle(config.NODE.URL,elBase);
this._elTitle=$$.getSingle(config.NODE.TITLE,elBase);
this._elComment=$$.getSingle(config.NODE.COMMENT,elBase);
this._elUploadImageBtn=$$.getSingle(config.NODE.UPLOAD_IMG_BTN,elBase);
this._elThumbList=$$.getSingle(config.NODE.THUMB_LIST,elBase);
this._elKeyword=$$.getSingle(config.NODE.KEYWORD,elBase);
this._elNotify=$$.getSingle(config.NODE.NOTIFY,elBase);
this._elSubmit=$$.getSingle(config.NODE.SUBMIT,elBase);
MissionSuggest.init({doSearch:false,type:"S"},{select:$Fn(this._onSelectMission,this).bind(),empty:$Fn(this._onEmptyMission,this).bind(),list:$Fn(this._onListMission,this).bind()},config.id.missionSelect)
},_initVariable:function(oSearchAutoFocus){this._oMission={missionId:"",templateId:"",title:"",keyword:""};
this._oSearchAutoFocus=oSearchAutoFocus||{on:function(){},off:function(){}}
},_initEvent:function(){var t=this;
this._oCompletedLayer.init({closed:function(){t.hide();
t._fnCallback()
}});
$Fn(function(wEvent){this._foggy.hide();
wEvent.stop()
},this).attach(this._elClose,"click");
$Fn(function(wEvent){$Element(wEvent.element).removeClass("ready");
if(wEvent.element.value==config.MSG.KEYWORD){MissionSuggest._sBeforeKeyword="";
wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elKeyword,"focus");
$Fn(function(wEvent){$Element(wEvent.element).removeClass("ready");
if(wEvent.element.value==config.MSG.TITLE){wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elTitle,"focus");
$Fn(function(wEvent){if(wEvent.key().enter){wEvent.stop();
this._onsubmit()
}},this).attach(this._elTitle,"keydown");
$Fn(function(wEvent){$Element(wEvent.element).removeClass("ready");
if(wEvent.element.value==config.MSG.COMMENT){wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elComment,"focus");
$Fn(this._onsubmit,this).attach(this._elSubmit,"click")
},_initFoggy:function(){var t=this;
this._foggy=new nhn.Foggy({showDuration:0,showOpacity:nhn.Effect.linear(0.3),hideDuratioin:200,hideOpacity:nhn.Effect.linear(0),zIndex:20000,fps:15}).attach({show:function(){var oArea=$Document().scrollSize();
t._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:"0px"});
t._welLayer.show();
t._oSearchAutoFocus.off();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(t._welLayer.height()))/2+nScrollTop;
t._welLayer.css("top",(nTop<0?0:nTop)+"px");
t._checkUploadBtnUI();
t._elTitle.focus();
t._refResize=$Fn(t._onResize,t).attach(window,"resize");
if(/search/.test(document.location.href)){lcs_do({sti:"layer_add_totalsearch"})
}else{lcs_do({sti:"layer_add_linksearch"})
}},hide:function(){t._clearLayer();
t._welLayer.hide();
t._oSearchAutoFocus.on();
t._refResize.detach(window,"resize")
}});
this._foggy.getFog().className=config.style.FOG
},_onResize:function(wEvent){var oArea=$Document().scrollSize();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(this._welLayer.height()))/2+nScrollTop;
this._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:(nTop<0?0:nTop)+"px"})
},_initUpload:function(){this._oUploader=new nj.Uploader2(this._elUploadImageBtn,{url:config.upload.URL,filetype:config.upload.FILE_TYPE,data:{},onSuccess:$Fn(this._successUpload,this).bind(),onError:$Fn(this._failUpload,this).bind(),align:true});
this._isInitUploadUI=false
},_successUpload:function(oData){this._addUserThumb(oData.thumbnailUrl)
},_failUpload:function(){alert("1024KB未満の画像のみ対応しています。")
},_clearLayer:function(){this._oCurrentData=null;
MissionSuggest.reInit();
$Element(this._elTitle).addClass(config.style.GREY).attr("value",config.MSG.TITLE);
$Element(this._elComment).addClass(config.style.GREY).attr("value",config.MSG.COMMENT);
this._clearRadio()
},_clearRadio:function(){var elNoImage=$(config.thumbRadio.noImageId);
this._elThumbList.appendChild(elNoImage);
while(true){if(this._elThumbList.childNodes[0]==elNoImage){break
}else{this._elThumbList.removeChild(this._elThumbList.childNodes[0])
}}},show:function(oData,fn){this._fnCallback=fn;
this._initData(oData);
this._foggy.show(this._welLayer.$value());
if(this._elKeyword.value!=config.MSG.KEYWORD){MissionSuggest.searchMissionList(this._elKeyword.value||" ")
}else{MissionSuggest.clearSuggest()
}},hide:function(){this._foggy.hide()
},_checkUploadBtnUI:function(){if(!this._isInitUploadUI){this._oUploader.initUI()
}},_initData:function(oData){this._bRequest=false;
this._oMission.missionId="";
this._oMission.templateId="";
this._oMission.keyword="";
oData.url=oData.url||oData.sourceUrl;
this._oCurrentData=oData;
this._elTitle.value=COMMON.htmlEncode(oData.title.replace(/<\/?[^>]*>/g,""));
this._elComment.value=oData.comment||config.MSG.COMMENT;
this._elUrl.innerHTML=curtail(decodeURIComponent(oData.url),300);
if(oData.keyword){this._elKeyword.value=oData.keyword;
this._elNotify.innerHTML=config.MSG.NOTIFY
}else{this._elKeyword.value=config.MSG.KEYWORD;
$Element(this._elKeyword).addClass("ready");
this._elNotify.innerHTML=config.MSG.NOTIFY_EMPTY
}this._searchThumb(oData.url)
},_searchThumb:function(sSourceUrl){var sUrl=COMMON.trim(sSourceUrl||this._elUrl.innerHTML);
if(sUrl==""){return 
}if(!this._hasHttpPrefix(sUrl)){sUrl="http://"+sUrl
}COMMON.sendServer({q:sUrl},$Fn(this._responseThumb,this).bind())
},_addUserThumb:function(sThumbUrl){var elUserLI=$(config.thumbRadio.userImageId);
if(elUserLI){$$.getSingle(config.NODE.THUMB_IMG,elUserLI).src=sThumbUrl;
var elRadio=$$.getSingle(config.NODE.THUMB_RADIO,elUserLI);
elRadio.checked=true;
elRadio.value=sThumbUrl
}else{var newThumb=$Element("<LI>").attr("id",config.thumbRadio.userImageId).html('<input type="radio" name="content.thumbnailUrl" value="'+sThumbUrl+'"/><img height="58" width="58" alt="直接登録" src="'+sThumbUrl+'"/>');
this._elThumbList.appendChild(newThumb.$value());
$$.getSingle(config.NODE.THUMB_RADIO,newThumb.$value()).checked=true
}},_addThumb:function(aThumb){if(aThumb.length!=0){var nCnt=0;
for(var i=aThumb.length-1;
i>=0;
i--,nCnt++){var thumb=aThumb[i];
if(nCnt==config.thumbRadio.MAX){break
}var newThumb=$Element("<LI>").html('<input type="radio" name="content.thumbnailUrl" value="'+thumb+'"/><img height="58" width="58" src="'+thumb+'"/>');
this._elThumbList.insertBefore(newThumb.$value(),$$.getSingle("> LI:first-of-type",this._elThumbList));
$$.getSingle(config.NODE.THUMB_RADIO,newThumb.$value()).checked=true
}}else{$$.getSingle(config.NODE.THUMB_RADIO,this._elThumbList).checked=true
}},_onSelectMission:function(oData){this._oMission.missionId=oData.missionId;
this._oMission.templateId=oData.templateId;
this._oMission.keyword=oData.keyword;
this._oMission.title=curtail(oData.text,165);
this._elNotify.innerHTML="「"+curtail(oData.text,165)+"」お題が選択されました。"
},_onEmptyMission:function(){this._oMission.missionId="";
this._oMission.templateId="";
this._oMission.keyword="";
this._oMission.title="";
if(this._oMission.keyword==""){this._elNotify.innerHTML=config.MSG.NOTIFY_EMPTY
}},_onListMission:function(){if(this._oMission.keyword==""){this._elNotify.innerHTML=config.MSG.NOTIFY
}},_onsubmit:function(wEvent){if(this._bRequest){return 
}this._bRequest=true;
var sUrl=this._elUrl.innerHTML;
var sTitle=COMMON.trim(this._elTitle.value);
var sKeyword=COMMON.trim(this._elKeyword.value);
var sComment=COMMON.trim(this._elComment.value);
var elRadio=$$.getSingle(config.NODE.CHECKED_RADIO,this._elThumbList);
if(sKeyword==""){alert(config.MSG.KEYWORD);
this._elKeyword.focus();
this._bRequest=false;
return 
}if(this._oMission.missionId==""&&this._oMission.templateId==""){alert(config.MSG.MISSION);
this._elKeyword.select();
this._bRequest=false;
return 
}if(sTitle==""){alert(config.MSG.TITLE);
this._elTitle.focus();
this._bRequest=false;
return 
}else{if(sTitle.length>config.consts.MAX_TITLE_LENGTH){alert(config.MSG.OVER_TITLE);
this._elTitle.focus();
this._bRequest=false;
return 
}}if(sComment==config.MSG.COMMENT){sComment=""
}if(sComment.length>config.consts.MAX_COMMENT_LENGTH){alert(config.MSG.OVER_COMMENT);
this._elComment.focus();
this._bRequest=false;
return 
}COMMON.sendServer({m:"saveByAutoMission",missionId:this._oMission.missionId,templateId:this._oMission.templateId,"content.url":this._oCurrentData.url,"content.sourceUrl":this._oCurrentData.sourceUrl,"content.thumbnailUrl":elRadio.value,"content.title":sTitle,"content.description":sComment,keyword:this._oMission.keyword,"content.searchKeyword":this._oCurrentData.keyword||""},$Fn(this._response,this).bind());
if(wEvent){wEvent.stop()
}},_hasHttpPrefix:function(sUrl){return/^http(s?):\/\/.*/i.test(sUrl)
},_responseThumb:function(oRes,oData){this._addThumb(oRes.items||[])
},_response:function(oRes,oData){if(oRes.result){this.hide();
this._fnCallback(oRes);
this._oCompletedLayer.show({missionId:oRes.missionId,resourceId:oRes.resourceId,title:this._oMission.title,zIndex:parseInt(this._welLayer.css("zIndex"))},"link")
}else{this._bRequest=false;
alert(oRes.message||config.MSG.SAVE_ERR)
}}}
})("nj.mission.KeywordSiteLayer");
(function(namespace){var config={id:{layer:"imageLayer",missionSelect:"missionSelectImage"},width:538,style:{FOG:"fog",GREY:"ready"},NODE:{BASE:"> DIV.shadow > DIV.shadowSide > DIV.subLayerTemplate",CLOSE_BTN:"> A.layerClose",IMAGE:"> DIV.layerContents > DIV.imgViewArea",URL:"> DIV.layerContents > DIV.option > SPAN.url > A",RESOLUTION:"> DIV.layerContents > DIV.option > SPAN.size",SUBMIT:"> DIV.layerContents > DIV.btns > BUTTON",TITLE:"DL > DD.itemTitle > label.inTxtWrapper >  INPUT",KEYWORD:"DL > DD.searchKeyword > label.inTxtWrapper >  INPUT",COMMENT:"DL > DD.commentIntroduction > label.inTxtWrapper > TEXTAREA",NOTIFY:"DL > DD.missionSelect > DIV.missionIndex > P"},MSG:{TITLE:"タイトルを入力してください",OVER_TITLE:"タイトルは、全角100文字以内で入力してください。",COMMENT:"紹介コメントを入力してください",OVER_COMMENT:"紹介コメントは、全角300文字以内で入力してください。",SAVE_ERR:"一時的にご利用できません。",KEYWORD:"画像内容を示す言葉を入力してください",MISSION:"追加先のお題を選択してください。",NOTIFY:"リストの中から、追加先のお題を選択してください。",NOTIFY_EMPTY:"入力された検索キーワードと一致するお題を表示します。"},SUBMIT_URL:"/content.ajax",consts:{MAX_TITLE_LENGTH:100,MAX_COMMENT_LENGTH:300}};
var COMMON={sendServer:function(oData,fn){new $Ajax(config.SUBMIT_URL,{timeout:5,onload:function(oRes){fn(oRes.json(),oData)
},ontimeout:function(){fn({result:false})
}}).request(oData)
},htmlEncode:function(str){return str.replace(/&lt;/ig,"<").replace(/&gt;/ig,">").replace(/&quot;/ig,'"').replace(/&amp;/ig,"&")
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(oCompletedLayer,oSearchAutoFocus,_config){_config=_config||{};
for(var i in _config){config[i]=_config[i]
}this._getElementRef(oCompletedLayer);
this._initVariable(oSearchAutoFocus);
this._initEvent();
this._initFoggy()
},_getElementRef:function(oCompletedLayer){var t=this;
t._oCompletedLayer=oCompletedLayer;
t._welLayer=$Element(config.id.layer);
var elBase=$$.getSingle(config.NODE.BASE,t._welLayer.$value());
t._elResolution=$$.getSingle(config.NODE.RESOLUTION,elBase);
t._elComment=$$.getSingle(config.NODE.COMMENT,elBase);
t._elSubmit=$$.getSingle(config.NODE.SUBMIT,elBase);
t._elClose=$$.getSingle(config.NODE.CLOSE_BTN,elBase);
t._elImage=$$.getSingle(config.NODE.IMAGE,elBase);
t._elTitle=$$.getSingle(config.NODE.TITLE,elBase);
t._elUrl=$$.getSingle(config.NODE.URL,elBase);
t._elKeyword=$$.getSingle(config.NODE.KEYWORD,elBase);
t._elNotify=$$.getSingle(config.NODE.NOTIFY,elBase);
MissionSuggest.init({doSearch:false,type:"I"},{select:$Fn(this._onSelectMission,this).bind(),empty:$Fn(this._onEmptyMission,this).bind(),list:$Fn(this._onListMission,this).bind()},config.id.missionSelect)
},_initVariable:function(oSearchAutoFocus){this._oMission={missionId:"",templateId:"",title:"",keyword:""};
this._oSearchAutoFocus=oSearchAutoFocus||{on:function(){},off:function(){}}
},_initEvent:function(){var t=this;
this._oCompletedLayer.init({closed:function(){t.hide();
t._fnCallback()
}});
$Fn(function(wEvent){this._foggy.hide();
wEvent.stop()
},this).attach(this._elClose,"click");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.MSG.KEYWORD){MissionSuggest._sBeforeKeyword="";
wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elKeyword,"focus");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.MSG.TITLE){wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elTitle,"focus");
$Fn(function(wEvent){if(wEvent.key().enter){wEvent.stop();
this._onsubmit()
}},this).attach(this._elTitle,"keydown");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.MSG.COMMENT){wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elComment,"focus");
$Fn(this._onsubmit,this).attach(this._elSubmit,"click")
},_initFoggy:function(){var t=this;
this._foggy=new nhn.Foggy({showDuration:0,showOpacity:nhn.Effect.linear(0.3),hideDuratioin:200,hideOpacity:nhn.Effect.linear(0),zIndex:32000,fps:15}).attach({show:function(){var oArea=$Document().scrollSize();
t._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:"0px"});
t._welLayer.show();
t._oSearchAutoFocus.off();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(t._welLayer.height()))/2+nScrollTop;
t._welLayer.css("top",(nTop<0?0:nTop)+"px");
t._elTitle.focus();
t._refResize=$Fn(t._onResize,t).attach(window,"resize");
if(/search/.test(document.location.href)){lcs_do({sti:"layer_add_totalsearch"})
}else{lcs_do({sti:"layer_add_imagesearch"})
}},hide:function(){t._clearLayer();
t._welLayer.hide();
t._oSearchAutoFocus.on();
t._refResize.detach(window,"resize")
}});
this._foggy.getFog().className=config.style.FOG
},_onResize:function(wEvent){var oArea=$Document().scrollSize();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(this._welLayer.height()))/2+nScrollTop;
this._welLayer.css({left:((oArea.width-config.width)/2)+"px",top:(nTop<0?0:nTop)+"px"})
},_clearLayer:function(){this._oCurrentData=null;
this._elImage.innerHTML="";
this._elResolution.innerHTML="";
this._elUrl.innerHTML="";
MissionSuggest.reInit();
$Element(this._elTitle).addClass(config.style.GREY).attr("value",config.MSG.TITLE);
$Element(this._elComment).addClass(config.style.GREY).attr("value",config.MSG.COMMENT)
},show:function(oData,fn){this._fnCallback=fn;
this._initData(oData);
this._foggy.show(this._welLayer.$value());
if(this._elKeyword.value!=config.MSG.KEYWORD){MissionSuggest.searchMissionList(this._elKeyword.value||" ")
}else{MissionSuggest.clearSuggest()
}},hide:function(){this._foggy.hide()
},modifyShow:function(oData){this._initData(oData);
this._foggy.show(this._welLayer.$value())
},_initData:function(oData){var t=this;
this._bRequest=false;
this._oMission.missionId="";
this._oMission.templateId="";
this._oMission.keyword="";
this._oCurrentData=oData;
var oImage=new Image();
oImage.onload=function(){var oResolution=oData.imageResolution.split("x");
if(oImage.width!=oResolution[0]||oImage.height!=oResolution[1]){t._elImage.innerHTML='<img src="'+oData.thumbnailUrl+'"/>'
}else{t._elImage.innerHTML='<img src="'+oData.url+'" width="'+oResolution[0]+'" height="'+oResolution[1]+'"/>'
}};
oImage.onerror=function(){t._elImage.innerHTML='<img src="'+oData.thumbnailUrl+'"/>'
};
oImage.src=oData.url;
this._elResolution.innerHTML=oData.imageResolution;
this._elUrl.href=oData.sourceUrl;
this._elUrl.innerHTML=curtail(oData.sourceUrl,330);
this._elTitle.value=COMMON.htmlEncode(oData.title.replace(/<\/?[^>]*>/g,""));
this._elComment.value=config.MSG.COMMENT;
if(oData.keyword){this._elKeyword.value=oData.keyword;
this._elNotify.innerHTML=config.MSG.NOTIFY
}else{this._elKeyword.value=config.MSG.KEYWORD;
$Element(this._elKeyword).addClass("ready");
this._elNotify.innerHTML=config.MSG.NOTIFY_EMPTY
}},_onSelectMission:function(oData){this._oMission.missionId=oData.missionId;
this._oMission.templateId=oData.templateId;
this._oMission.keyword=oData.keyword;
this._oMission.title=curtail(oData.text,165);
this._elNotify.innerHTML="「"+curtail(oData.text,165)+"」お題が選択されました。"
},_onEmptyMission:function(){if(this._oMission.keyword==""){this._elNotify.innerHTML=config.MSG.NOTIFY_EMPTY
}},_onListMission:function(){if(this._oMission.keyword==""){this._elNotify.innerHTML=config.MSG.NOTIFY
}},_onsubmit:function(wEvent){if(this._bRequest){return 
}this._bRequest=true;
var sTitle=$S(this._elTitle.value).trim().$value();
var sComment=$S(this._elComment.value).trim().$value();
var sKeyword=$S(this._elKeyword.value).trim().$value();
if(sKeyword==""){alert(config.MSG.KEYWORD);
this._elKeyword.focus();
this._bRequest=false;
return 
}if(this._oMission.missionId==""&&this._oMission.templateId==""){alert(config.MSG.MISSION);
this._elKeyword.select();
this._bRequest=false;
return 
}if(sTitle==""){alert(config.MSG.TITLE);
this._elTitle.focus();
this._bRequest=false;
return 
}else{if(sTitle.length>config.consts.MAX_TITLE_LENGTH){alert(config.MSG.OVER_TITLE);
this._elTitle.focus();
this._bRequest=false;
return 
}}if(sComment==config.MSG.COMMENT){sComment=""
}if(sComment.length>config.consts.MAX_COMMENT_LENGTH){alert(config.MSG.OVER_COMMENT);
this._elComment.focus();
this._bRequest=false;
return 
}COMMON.sendServer({m:"saveByAutoMission",missionId:this._oMission.missionId,templateId:this._oMission.templateId,"content.source":this._oCurrentData.source,"content.sourceUrl":this._oCurrentData.sourceUrl,"content.url":this._oCurrentData.url,"content.thumbnailUrl":this._oCurrentData.thumbnailUrl,"content.imageResolution":this._oCurrentData.imageResolution,"content.fileSize":this._oCurrentData.fileSize,"content.title":sTitle,"content.description":sComment,keyword:this._oMission.keyword,"content.searchKeyword":this._oCurrentData.keyword||""},$Fn(this._response,this).bind())
},_response:function(oRes,oData){if(oRes.result){this.hide();
this._fnCallback(oRes);
var oParams={missionId:oRes.missionId,resourceId:oRes.resourceId,title:this._oMission.title,zIndex:parseInt(this._welLayer.css("zIndex"))};
if(this._oCurrentData.scrapCountUrl){oParams.matomeUrl=this._oCurrentData.scrapCountUrl.substring(0,this._oCurrentData.scrapCountUrl.indexOf("/image"))
}this._oCompletedLayer.show(oParams,"image")
}else{this._bRequest=false;
alert(oRes.message||config.MSG.SAVE_ERR)
}}}
})("nj.mission.KeywordImageLayer");
(function(namespace){var config={id:{layer:"videoLayer",missionSelect:"missionSelectVideo"},style:{FOG:"fog",GREY:"ready"},NODE:{BASE:"> DIV.shadow > DIV.shadowSide > DIV.subLayerTemplate",CLOSE_BTN:"> A.layerClose",VIEW:"> DIV.layerContents > DIV.videoView",PLAYTIME:"> DIV.layerContents > DIV.option > SPAN.time",SITE:"> DIV.layerContents > DIV.option > SPAN.source > A",TITLE:"DL > DD.itemTitle > .inTxtWrapper >  INPUT",KEYWORD:"DL > DD.searchKeyword > .inTxtWrapper >  INPUT",COMMENT:"DL > DD.commentIntroduction > label.inTxtWrapper > TEXTAREA",NOTIFY:"DL > DD.missionSelect > DIV.missionIndex > P",SUBMIT:"> DIV.layerContents > DIV.btns > BUTTON",OPTION:"> DIV.layerContents > DIV.option",NOT_PLAY:"> DIV.layerContents > DIV.exteriorContents",NOT_PLAY_SITE:"> DIV.listContents > DIV.source > A",NOT_PLAY_THUMB:"> DIV.thumb > IMG",NOT_PLAY_LINK:"> DIV.listContents > A.btnGoSite",NOT_PLAY_PLAYTIME:"> DIV.thumb > SPAN"},MSG:{TITLE:"タイトルを入力してください",OVER_TITLE:"タイトルは、全角100文字以内で入力してください。",COMMENT:"紹介コメントを入力してください",OVER_COMMENT:"紹介コメントは、全角300文字以内で入力してください。",SAVE_ERR:"一時的にご利用できません。",VIDEO:"<p>登録したい動画のurlを入力後確認ボタンを押してください。<br/>添付した動画をあらかじめ見せてくれます。</p>",PARSE_ERR:"誤った形式の動画URLが入力されました",KEYWORD:"動画内容を示す言葉を入力してください",MISSION:"追加先のお題を選択してください。",NOTIFY:"リストの中から、追加先のお題を選択してください。",NOTIFY_EMPTY:"入力された検索キーワードと一致するお題を表示します。"},consts:{URL:"/content.ajax",LAYOUT:38,MIN_WIDTH:463,MAX_TITLE_LENGTH:100,MAX_COMMENT_LENGTH:300}};
var COMMON={trim:function(str){return $S(str).trim().$value()
},sendServer:function(oData,fn){new $Ajax(config.consts.URL,{timeout:5,onload:function(oRes){fn(oRes.json(),oData)
},ontimeout:function(){fn({result:false})
}}).request(oData)
},htmlEncode:function(str){return str.replace(/&lt;/ig,"<").replace(/&gt;/ig,">").replace(/&quot;/ig,'"').replace(/&amp;/ig,"&")
}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(oCompletedLayer,oSearchAutoFocus,_config){_config=_config||{};
for(var i in _config){config[i]=_config[i]
}this._getElementRef(oCompletedLayer);
this._initVariable(oSearchAutoFocus);
this._initEvent();
this._initFoggy()
},_initCallback:function(fnCallback){this._fnSaved=fnCallback.saved||function(){}
},_getElementRef:function(oCompletedLayer){this._oCompletedLayer=oCompletedLayer;
this._welLayer=$Element(config.id.layer);
var elBase=$$.getSingle(config.NODE.BASE,this._welLayer.$value());
this._elClose=$$.getSingle(config.NODE.CLOSE_BTN,elBase);
this._elPlayTime=$$.getSingle(config.NODE.PLAYTIME,elBase);
this._elSite=$$.getSingle(config.NODE.SITE,elBase);
this._elTitle=$$.getSingle(config.NODE.TITLE,elBase);
this._elComment=$$.getSingle(config.NODE.COMMENT,elBase);
this._elSubmit=$$.getSingle(config.NODE.SUBMIT,elBase);
this._elKeyword=$$.getSingle(config.NODE.KEYWORD,elBase);
this._elNotify=$$.getSingle(config.NODE.NOTIFY,elBase);
this._welView=$Element($$.getSingle(config.NODE.VIEW,elBase));
this._welOption=$Element($$.getSingle(config.NODE.OPTION,elBase));
this._welNotPlay=$Element($$.getSingle(config.NODE.NOT_PLAY,elBase));
MissionSuggest.init({doSearch:false,type:"V"},{select:$Fn(this._onSelectMission,this).bind(),empty:$Fn(this._onEmptyMission,this).bind(),list:$Fn(this._onListMission,this).bind()},config.id.missionSelect)
},_initVariable:function(oSearchAutoFocus){this._oMission={missionId:"",templateId:"",title:"",keyword:""};
this._oSearchAutoFocus=oSearchAutoFocus||{on:function(){},off:function(){}};
this._nVideoWidth=0
},_initEvent:function(){var t=this;
this._oCompletedLayer.init({closed:function(){t.hide();
t._fnCallback()
}});
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.MSG.KEYWORD){MissionSuggest._sBeforeKeyword="";
wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elKeyword,"focus");
$Fn(function(wEvent){this._foggy.hide();
wEvent.stop()
},this).attach(this._elClose,"click");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.MSG.TITLE){wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elTitle,"focus");
$Fn(function(wEvent){if(wEvent.key().enter){wEvent.stop();
this._onsubmit()
}},this).attach(this._elTitle,"keydown");
$Fn(function(wEvent){$Element(wEvent.element).removeClass(config.style.GREY);
if(wEvent.element.value==config.MSG.COMMENT){wEvent.element.value=""
}wEvent.element.focus()
},this).attach(this._elComment,"focus");
$Fn(this._onsubmit,this).attach(this._elSubmit,"click")
},_initFoggy:function(){var t=this;
this._foggy=new nhn.Foggy({showDuration:0,showOpacity:nhn.Effect.linear(0.3),hideDuratioin:200,hideOpacity:nhn.Effect.linear(0),zIndex:32000,fps:15}).attach({show:function(){var oArea=$Document().scrollSize();
t._welLayer.css({left:"0px",top:"0px",width:t._nVideoWidth+config.consts.LAYOUT+"px"}).show();
t._oSearchAutoFocus.off();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(t._welLayer.height()))/2+nScrollTop;
t._welLayer.css({top:(nTop<0?0:nTop)+"px",left:((oArea.width-t._welLayer.width())/2)+"px"});
t._elTitle.focus();
t._refResize=$Fn(t._onResize,t).attach(window,"resize");
if(/search/.test(document.location.href)){lcs_do({sti:"layer_add_totalsearch"})
}else{lcs_do({sti:"layer_add_videosearch"})
}},hide:function(){t._clearLayer();
t._welLayer.hide();
t._oSearchAutoFocus.on();
t._refResize.detach(window,"resize")
}});
this._foggy.getFog().className=config.style.FOG
},_onResize:function(wEvent){var oArea=$Document().scrollSize();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(this._welLayer.height()))/2+nScrollTop;
this._welLayer.css({left:((oArea.width-this._welLayer.width())/2)+"px",top:(nTop<0?0:nTop)+"px"})
},_clearLayer:function(){this._oCurrentData=null;
this._elPlayTime.innerHTML="";
this._elSite.innerHTML="";
MissionSuggest.reInit();
this._welView.html("");
$Element(this._elTitle).addClass(config.style.GREY).attr("value",config.MSG.TITLE);
$Element(this._elComment).addClass(config.style.GREY).attr("value",config.MSG.COMMENT)
},show:function(oData,fn){this._fnCallback=fn;
this._initData(oData);
this._foggy.show(this._welLayer.$value());
if(this._elKeyword.value!=config.MSG.KEYWORD){MissionSuggest.searchMissionList(this._elKeyword.value||" ")
}else{MissionSuggest.clearSuggest()
}},hide:function(){this._foggy.hide();
this._welView.html("")
},showDirect:function(){this._fnCallback=function(){};
this._initDisplay("fromUser");
this._foggy.show(this._welLayer.$value())
},modifyShow:function(oData){this._fnCallback=function(){};
this._initDisplay("play");
this._initData(oData);
this._foggy.show(this._welLayer.$value())
},_initDisplay:function(sMode){if(sMode=="play"){this._welView.show();
this._welOption.show();
this._welNotPlay.hide();
this._welNotPlay.css("visibility","hidden")
}else{if(sMode=="notPlay"){this._welView.hide();
this._welOption.hide();
this._welNotPlay.show();
this._welNotPlay.css("visibility","visible")
}}},_initData:function(oData){this._bRequest=false;
this._oMission.missionId="";
this._oMission.templateId="";
this._oMission.title="";
this._oMission.keyword="";
this._oCurrentData=oData;
this._elTitle.value=oData.title?COMMON.htmlEncode(oData.title.replace(/<\/?[^>]*>/g,"")):config.MSG.TITLE;
this._elComment.value=config.MSG.COMMENT;
if(oData.keyword){this._elKeyword.value=oData.keyword;
this._elNotify.innerHTML=config.MSG.NOTIFY
}else{this._elKeyword.value=config.MSG.KEYWORD;
$Element(this._elKeyword).addClass("ready");
this._elNotify.innerHTML=config.MSG.NOTIFY_EMPTY
}var oVideoFilter=mFilter.html(oData.url);
if(oVideoFilter){this._initDisplay("play");
this._elPlayTime.innerHTML=oData.videoRunningTime;
this._elSite.innerHTML=oData.source;
this._elSite.href=oData.sourceUrl;
this._welView.html(oVideoFilter.html);
this._nVideoWidth=oVideoFilter.width
}else{this._initDisplay("notPlay");
this._elNotPlaySite=$$.getSingle(config.NODE.NOT_PLAY_SITE,this._welNotPlay.$value());
this._elNotPlayThumb=$$.getSingle(config.NODE.NOT_PLAY_THUMB,this._welNotPlay.$value());
this._elNotPlayLink=$$.getSingle(config.NODE.NOT_PLAY_LINK,this._welNotPlay.$value());
this._elNotPlayTime=$$.getSingle(config.NODE.NOT_PLAY_PLAYTIME,this._welNotPlay.$value());
this._elNotPlaySite.innerHTML=oData.source;
this._elNotPlaySite.href=oData.sourceUrl;
this._elNotPlayThumb.src=oData.thumbnailUrl;
this._elNotPlayLink.href=oData.url;
this._elNotPlayTime.innerHTML=oData.videoRunningTime;
this._nVideoWidth=config.consts.MIN_WIDTH-config.consts.LAYOUT
}},_onSelectMission:function(oData){this._oMission.missionId=oData.missionId;
this._oMission.templateId=oData.templateId;
this._oMission.keyword=oData.keyword;
this._oMission.title=curtail(oData.text,165);
this._elNotify.innerHTML="「"+curtail(oData.text,165)+"」お題が選択されました。"
},_onEmptyMission:function(){if(this._oMission.keyword==""){this._elNotify.innerHTML=config.MSG.NOTIFY_EMPTY
}},_onListMission:function(){if(this._oMission.keyword==""){this._elNotify.innerHTML=config.MSG.NOTIFY
}},_onsubmit:function(wEvent){if(this._bRequest){return 
}this._bRequest=true;
var sTitle=$S(this._elTitle.value).trim().$value();
var sComment=$S(this._elComment.value).trim().$value();
var sKeyword=$S(this._elKeyword.value).trim().$value();
if(sKeyword==""){alert(config.MSG.KEYWORD);
this._elKeyword.focus();
this._bRequest=false;
return 
}if(this._oMission.missionId==""&&this._oMission.templateId==""){alert(config.MSG.MISSION);
this._elKeyword.select();
this._bRequest=false;
return 
}if(sTitle==""){alert(config.MSG.TITLE);
this._elTitle.focus();
this._bRequest=false;
return 
}else{if(sTitle.length>config.consts.MAX_TITLE_LENGTH){alert(config.MSG.OVER_TITLE);
this._elTitle.focus();
this._bRequest=false;
return 
}}if(sComment==config.MSG.COMMENT){sComment=""
}if(sComment.length>config.consts.MAX_COMMENT_LENGTH){alert(config.MSG.OVER_COMMENT);
this._elComment.focus();
this._bRequest=false;
return 
}COMMON.sendServer({m:"saveByAutoMission",missionId:this._oMission.missionId,templateId:this._oMission.templateId,"content.source":this._oCurrentData.source,"content.sourceUrl":this._oCurrentData.sourceUrl,"content.url":this._oCurrentData.url,"content.thumbnailUrl":this._oCurrentData.thumbnailUrl||"","content.videoRunningTime":this._oCurrentData.videoRunningTime,"content.title":sTitle,"content.description":sComment,keyword:this._oMission.keyword,"content.searchKeyword":this._oCurrentData.keyword||""},$Fn(this._response,this).bind())
},_response:function(oRes,oData){if(oRes.result){this.hide();
this._fnCallback(oRes);
var oParams={missionId:oRes.missionId,resourceId:oRes.resourceId,title:this._oMission.title,zIndex:parseInt(this._welLayer.css("zIndex")),height:this._welLayer.height()+(mFilter.html(this._oCurrentData.url)?mFilter.html(this._oCurrentData.url).height:0),top:this._welLayer.css("top")};
if(this._oCurrentData.scrapCountUrl){oParams.matomeUrl=this._oCurrentData.scrapCountUrl.substring(0,this._oCurrentData.scrapCountUrl.indexOf("/video"))
}this._oCompletedLayer.show(oParams,"video")
}else{this._bRequest=false;
alert(oRes.message||config.MSG.SAVE_ERR)
}}}
})("nj.mission.KeywordVideoLayer");
(function(namespace){var config={id:{layer:"playVideoLayer",flash:"naverJP_videoSearchFlash"},NODE:{EMBED:"> DIV.movieContent > DIV.dc_1 > DIV.player",TITLE:"> DIV.movieContent > DIV.dc_1 > H3 > A",BODY:"> DIV.movieContent > DIV.dc_1 > P",SOURCE:"> DIV.option DIV.contentsOption SPAN.source A",PLAYTIME:"> DIV.option DIV.contentsOption SPAN.playTime",BTN:"> DIV.option DIV.matomeOption SPAN.btnAppend BUTTON",COUNT:"> DIV.option DIV.matomeOption SPAN.count"},consts:{MIN_TOP:85,IMAGE_NUMBER_HOSTNAME:"static.naver.jp"}};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(){this._getElementRef();
this._initEvent()
},_getElementRef:function(){this._elPlayer=$(config.id.layer);
this._elArea=$$.getSingle(config.NODE.EMBED,this._elPlayer);
this._elTitle=$$.getSingle(config.NODE.TITLE,this._elPlayer);
this._elBody=$$.getSingle(config.NODE.BODY,this._elPlayer);
this._elSource=$$.getSingle(config.NODE.SOURCE,this._elPlayer);
this._elPlayTime=$$.getSingle(config.NODE.PLAYTIME,this._elPlayer);
this._elBtnAppend=$$.getSingle(config.NODE.BTN,this._elPlayer);
this._elCount=$$.getSingle(config.NODE.COUNT,this._elPlayer);
if(this._elCount){this._imageNumber=new nj.widget.ImageNumber({element:this._elCount,hostname:config.consts.COUNT,type:"moviePlayer",value:0,hiddenValue:[0]})
}},_initEvent:function(){var t=this;
jp.hover(this._elBtnAppend,{enter:function(we,el){$Element(el.parentNode).addClass("hover")
},leave:function(we,el){$Element(el.parentNode).removeClass("hover")
}});
$Fn(function(wEvent){t.hide();
$(config.id.flash).closeBlind();
showMissionLayer(t._oData)
},this).attach(this._elBtnAppend,"click")
},show:function(oData){this._oData=oData;
var oFilter=mFilter.html(oData.url);
if(oFilter===false){this.hide();
location.href=oData.url;
return 
}try{$("naverJP_videoSearchFlash").openBlind()
}catch(e){}this._initData(oData,oFilter);
this._show(oFilter.width,oFilter.height)
},_initData:function(oData,oFilter){this._elArea.innerHTML=oFilter.html;
this._elTitle.innerHTML=oData.title;
this._elTitle.href=oData.url;
this._elBody.innerHTML=oData.body;
this._elSource.href=oData.sourceUrl;
this._elSource.innerHTML=oData.source;
this._elPlayTime.innerHTML=oData.videoRunningTime;
this._imageNumber.set(oData.scrapCount,oData.scrapCountUrl)
},_show:function(nW,nH){this._nWidth=nW;
var oDoc=$Document().scrollSize();
var paddingTop=(this._oData.paddingTop||0);
var welPlayer=$Element(this._elPlayer);
welPlayer.css({width:nW+26+"px",left:((oDoc.width-nW)/2)+"px",top:"0px",zIndex:"20000"}).show();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(welPlayer.height()))/2+nScrollTop;
welPlayer.css({top:(nTop<paddingTop?paddingTop:nTop)+"px"});
this._refResize=$Fn(this._onResize,this).attach(window,"resize")
},hide:function(){if(this._elBtnAppend){$Element(this._elBtnAppend).removeClass("hover")
}$Element(this._elPlayer).hide();
this._elArea.innerHTML="";
if(typeof this._refResize!="undefined"){this._refResize.detach(window,"resize")
}},_onResize:function(wEvent){var paddingTop=(this._oData.paddingTop||0);
var welLayer=$Element(this._elPlayer);
var oArea=$Document().scrollSize();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=($Document().clientSize().height-parseInt(welLayer.height()))/2+nScrollTop;
welLayer.css({left:((oArea.width-this._nWidth)/2)+"px",top:(nTop<paddingTop?paddingTop:nTop)+"px"})
}}
})("nj.PlayerVideo");
(function(namespace){var config={id:"completionLayer",width:463,node:{BASE:"> DIV.shadow > DIV.shadowSide > DIV.subLayerTemplate",MSG:"> DIV.layerContents > P:first-of-type",TARGET:"> DIV.layerContents > P.goMission > A",OK_BTN:"> DIV.layerContents > DIV.btns > BUTTON",NOUSER_GUIDE:"> DIV.layerContents > DIV.noUserGuide",CLOSE_BTN:"> A.layerClose"},msg:{PREFIXNOTLOGIN:"Guestとしてまとめに",COMPLETE:"を追加しました。"},isLogin:g_login};
var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]={init:function(fnCallback){this._initCallback(fnCallback);
this._getElementRef();
this._initEvent()
},_initCallback:function(fnCallback){this._fnClose=fnCallback.closed||function(){}
},_getElementRef:function(){this._welLayer=$Element(config.id);
var elBase=$$.getSingle(config.node.BASE,this._welLayer.$value());
this._elMsg=$$.getSingle(config.node.MSG,elBase);
this._elTarget=$$.getSingle(config.node.TARGET,elBase);
this._elOKBtn=$$.getSingle(config.node.OK_BTN,elBase);
this._elCloseBtn=$$.getSingle(config.node.CLOSE_BTN,elBase);
this._elNoUserGuide=$$.getSingle(config.node.NOUSER_GUIDE,elBase)
},_initEvent:function(){$Fn(this._onclose,this).attach(this._elOKBtn,"click");
$Fn(this._onclose,this).attach(this._elCloseBtn,"click")
},_onclose:function(wEvent){this._welLayer.hide();
this._fnClose()
},_modifyMsg:function(sKeyword,sType){var sTypeStr="リンク";
if(sType=="video"){sTypeStr="動画"
}else{if(sType=="image"){sTypeStr="画像"
}}var sPrefixTitle=config.isLogin?"":config.msg.PREFIXNOTLOGIN;
this._elMsg.innerHTML=sPrefixTitle+sTypeStr+config.msg.COMPLETE;
this._elTarget.innerHTML=sKeyword
},show:function(oData,sType){this._modifyMsg(oData.title,sType);
if(this._elNoUserGuide){var welNoUserGuide=$Element(this._elNoUserGuide);
config.isLogin?welNoUserGuide.css("display","none"):welNoUserGuide.css("display","block")
}if(oData.matomeUrl){this._elTarget.href=oData.matomeUrl+"/odai/"+oData.missionId+"/"+oData.resourceId
}else{this._elTarget.href="/odai/"+oData.missionId+"/"+oData.resourceId
}var oArea=$Document().scrollSize();
this._welLayer.css({zIndex:""+(oData.zIndex+1),left:((oArea.width-config.width)/2)+"px",top:"0px"});
this._welLayer.show();
var nScrollTop=(document.body.scrollTop||document.documentElement.scrollTop);
var nTop=0;
if(typeof sType!="undefined"&&sType=="video"){nTop=Math.max(parseInt(oData.top),nScrollTop)+parseInt((parseInt(oData.height)-parseInt(this._welLayer.height()))/2)
}else{nTop=($Document().clientSize().height-parseInt(this._welLayer.height()))/2+nScrollTop
}this._welLayer.css("top",parseInt(nTop)+"px")
}}
})("CompletionLayer");
(function(namespace){var pkg=$.verifyPackageName(namespace);
pkg.container[pkg.name]=function(_oOptions){var oOptions={layer:null,data:{title:"",sourceUrl:"",keyword:"",thumbnailUrl:[]},loginOptions:{},login:g_login,onAfterSubmit:function(){},className:{hover:"hover",checked:"checked"}};
for(var i in _oOptions){oOptions[i]=_oOptions[i]||oOptions[i]
}var elWrap=$$.getSingle(".matomeOption");
var oElements={wrap:elWrap,count:$$.getSingle(".countJoin em",elWrap),button:$$.getSingle(".btnAppend button",elWrap),buttonWrap:$$.getSingle(".btnAppend",elWrap)};
var sClassChecked=oOptions.className.checked;
var fnMatomeSubmit=function(oRes){if(oRes){oElements.count.innerHTML=parseInt(oElements.count.innerHTML)+1;
$Element(oElements.buttonWrap).addClass(sClassChecked)
}if(oOptions.onAfterSubmit){oOptions.onAfterSubmit(oRes)
}};
var fnShowSiteLayer=function(oRes){oOptions.layer.show(oOptions.data,fnMatomeSubmit)
};
var fnOnMouseover=function(wEvent){if(!$Element(oElements.buttonWrap).hasClass(sClassChecked)){$Element(oElements.buttonWrap).addClass(oOptions.className.hover)
}};
var fnOnMouseout=function(wEvent){$Element(oElements.buttonWrap).removeClass(oOptions.className.hover)
};
$Fn(fnShowSiteLayer).attach(oElements.button,"click");
$Fn(fnOnMouseover).attach(oElements.button,"mouseover");
$Fn(fnOnMouseout).attach(oElements.button,"mouseout")
}
})("nj.mission.initAddMatomeLayerButton");
nhn.WatchInput=$Class({elem:null,timer:null,lastValue:"",isIE:false,$init:function(oElement){this.elem=$(oElement);
this.isIE=$Agent().navigator().isIE;
this.oEvent={element:this.elem,currentElement:this.elem};
this._blurFn=$Fn(this._blur,this);
this._focusFn=$Fn(this._focus,this);
this._keypressFn=$Fn(this._keypress,this);
this._fireEventBind=$Fn(this.fireEvent,this).bind("input",this.oEvent);
this._watchAndFireFn=$Fn(this._watchAndFire,this);
this.disabled(false)
},disabled:function(bDisable){if(bDisable){if(!this.isIE){clearInterval(this.timer);
this._blurFn.detach(this.elem,"blur");
this._focusFn.detach(this.elem,"focus")
}this._keypressFn.detach(this.elem,"keypress")
}else{this.lastValue=this.elem.value;
if(!this.isIE){this._blurFn.attach(this.elem,"blur");
this._focusFn.attach(this.elem,"focus")
}this._keypressFn.attach(this.elem,"keypress")
}},_keypress:function(oEvent){this._watchAndFire(oEvent)
},_blur:function(oEvent){this._watchAndFireFn.delay(0);
clearInterval(this.timer)
},_focus:function(oEvent){this.lastValue=this.elem.value;
this.timer=setInterval(this._watchAndFireFn.bind(),200)
},_watchAndFire:function(oEvent){var val=this.elem.value;
if(val==this.lastValue){return false
}this.lastValue=val;
setTimeout(this._fireEventBind,0);
return true
}}).extend(nhn.Component);
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