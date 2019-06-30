/*
 * Superfish v1.4.1 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
(function($){$.superfish={};$.superfish.o=[];$.superfish.op={};$.superfish.defaults={hoverClass:'hover',pathClass:'overideThisToUse',delay:500,animation:{opacity:'show'},speed:'normal',oldJquery:false,disableHI:false,onInit:function(){},onBeforeShow:function(){},onShow:function(){},onHide:function(){}};$.fn.superfish=function(op){var bcClass='sfbreadcrumb',over=function(){var $$=$(this),menu=getMenu($$);getOpts(menu,true);clearTimeout(menu.sfTimer);$$.showSuperfishUl().siblings().hideSuperfishUl()},out=function(){var $$=$(this),menu=getMenu($$);var o=getOpts(menu,true);clearTimeout(menu.sfTimer);if(!$$.is('.'+bcClass)){menu.sfTimer=setTimeout(function(){$$.hideSuperfishUl();if(o.$path.length){over.call(o.$path)}},o.delay)}},getMenu=function($el){return $el.parents('ul.superfish:first')[0]},getOpts=function(el,menuFound){el=menuFound?el:getMenu(el);return $.superfish.op=$.superfish.o[el.serial]},hasUl=function(){return $.superfish.op.oldJquery?'li[ul]':'li:has(ul)'};return this.each(function(){var s=this.serial=$.superfish.o.length;var o=$.extend({},$.superfish.defaults,op);o.$path=$('li.'+o.pathClass,this).each(function(){$(this).addClass(o.hoverClass+' '+bcClass).filter(hasUl()).removeClass(o.pathClass)});$.superfish.o[s]=$.superfish.op=o;$(hasUl(),this)[($.fn.hoverIntent&&!o.disableHI)?'hoverIntent':'hover'](over,out).not('.'+bcClass).hideSuperfishUl();var $a=$('a',this);$a.each(function(i){var $li=$a.eq(i).parents('li');$a.eq(i).focus(function(){over.call($li)}).blur(function(){out.call($li)})});o.onInit.call(this)}).addClass('superfish')};$.fn.extend({hideSuperfishUl:function(){var o=$.superfish.op,$ul=$('li.'+o.hoverClass,this).add(this).removeClass(o.hoverClass).find('>ul').hide().css('visibility','hidden');o.onHide.call($ul);return this},showSuperfishUl:function(){var o=$.superfish.op,$ul=this.addClass(o.hoverClass).find('>ul:hidden').css('visibility','visible');o.onBeforeShow.call($ul);$ul.animate(o.animation,o.speed,function(){o.onShow.call(this)});return this}})})(jQuery);$(document).ready(function(){$("#gNav").superfish({animation:{opacity:"show",height:"show"}})});

// イベントカレンダーで使用
$.auto={init:function(){for(module in $.auto){if($.auto[module].init)$.auto[module].init()}}};$(document).ready($.auto.init);$.auto.hide={init:function(){$('.noScript').hide()}};


/* アコーディオン */
$(document).ready(function() {
	$(".qaBody #main dt, #main .installMethod,.faqBody #main dt").hover(function(){
		$(this).css("cursor","pointer"); 
	},function(){
		$(this).css("cursor","default"); 
		});
	$(".qaBody #main dd, #main .dlMethod,.faqBody #main dd").css("display","none");
	$(".qaBody #main dt, #main .installMethod,.faqBody #main dt,").click(function(){
		$(this).next().slideToggle("normal");
		});
});


/*
 * yuga.js 0.4.2 - 優雅なWeb制作のためのJS
 *
 * Copyright (c) 2007 Kyosuke Nakamura (kyosuke.jp)
 * Licensed under the MIT License:
 */

/* yuga.js内で使っているfunction群 */
var yuga = {
	// imageのプリローダー
	preloader: {
		loadedImages: [],
		load: function (url){
			var img = this.loadedImages;
			var l = img.length;
			img[l] = new Image();
			img[l].src = url;
		}
	},
	// URIを解析したオブジェクトを返すfunction
	URI: function(s){
		this.originalPath = s;
		//絶対パスを取得
		this.getAbsolutePath = function(path){
			if (!path.match(/^(mailto:)|(javascript:)/)) {
				var img = new Image();
				img.src = path;
				path = img.src;
				img.src = '#';
			}
			return path;
		};
		this.absolutePath = this.getAbsolutePath(s);
		//同じ文書にリンクしているかどうか
		this.isSelfLink = (this.absolutePath == location.href);
		//絶対パスを分解
		var fields = {'schema' : 2, 'username' : 5, 'password' : 6, 'host' : 7, 'path' : 9, 'query' : 10, 'fragment' : 11};
		var r = /^((\w+):)?(\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(this.absolutePath);
		for (var field in fields) {
			this[field] = r[fields[field]]; 
		}
	}
};

$(function(){
	
	//class="imgLink"でロールオーバーを設定（src属性を_over付きのものに差し替える）
	$('.imgLink img, img.imgLink,.childIndex .section .btn img,.groupBody #gNav img,.groupBody .schoolSection li img,.groupBody #guideNav img, input.imgLink, .asukaBody #gNav img, .asukaBody #utilityNav img,.sweetsIndex .section .btn img').each(function(){
		this.originalSrc = $(this).attr('src');
		this.rolloverSrc = this.originalSrc.replace(/(\.gif|\.jpg|\.png)/, "_over$1");
		yuga.preloader.load(this.rolloverSrc);
	}).hover(function(){
		$(this).attr('src',this.rolloverSrc);
	},function(){
		$(this).attr('src',this.originalSrc);
	});

	//現在のページへのリンク
	$('a[@href]').each(function(){
		var href = new yuga.URI(this.getAttribute('href'));
		if (href.isSelfLink && !href.fragment) {
			$(this).addClass('active');
		}
	});

	$('body.couseBody li.couseNav img, body.aboutBody li.aboutNav img, body.guidelinesBody li.guidelinesNav img, body.jobdataBody li.jobdataNav img, body.qaBody li.qaNav img, body.contactBody li.contactNav img, body.schoolguideBody li.schoolguideNav img, body.opencampusBody li.schoolguideNav img').each(function(){
		this.currentSrc = this.getAttribute('src').replace(/(\.gif|\.jpg|\.png)/, "_active$1");
		$(this).attr('src',this.currentSrc);
	});

	$('body.groupBody #gNav a.active img,body.infoBody #gNav li.infoNav img,.groupBody #guideNav a.active img').each(function(){
		this.currentSrc = this.getAttribute('src').replace(/(\.gif|\.jpg|\.png)/, "_over$1");
		$(this).attr('src',this.currentSrc);
		$(this).hover(function(){
			$(this).attr('src',this.currentSrc);
		},function(){
			$(this).attr('src',this.currentSrc);
		});
	});

	//奇数、偶数を自動追加
	$('div.lecturerContainer #main, .lecturer #main').each(function(){
		$(this).find('div.hL-section:odd').addClass('even');
		$(this).find('div.hL-section:even').addClass('odd');
	});
	$('.recruitmentSubject table').each(function(){
		$(this).find('tr:odd').addClass('odd');
		$(this).find('tr:even').addClass('even');
	});
	$('.sportsBody .yearContainer .schedule table').each(function(){
		$(this).find('tr:odd').addClass('odd');
		$(this).find('tr:even').addClass('even');
	});
	
});

//入力フィールドをクリックするとデフォルトのテキストが消える
var isInitialized = false; function initialize(object) {
	if(!isInitialized) {
		object.value = "";
		object.style.color = "#333"; isInitialized = true;
	}
}

	//外部リンクは別ウインドウを設定
$(document).ready( function () {
	$('a[@href^="http"],area[@href^="http"]').not('[@href^="http://www.sanko.ac.jp/"]').click(function(){
	window.open(this.href, '');
	return false;
	});
	$('a[@href^="http"],area[@href^="http"]').not('[@href^="http://www.sanko.ac.jp/"]').addClass("exLink");
	
	$('a[href$=".pdf"]').click(function(){
	window.open(this.href, '');
	return false;
	});
	
	$('.section a.exLink,table.link a[@href^="http://www.sanko.ac.jp/"]').click(function(){
	window.open(this.href, '');
	return false;
	});
});

//フッターの最初の要素にクラス追加
$(function(){
	$('#footer p + ul, #footer ul li:first-child').addClass("first");
});


/*
	jquery.flatheights.js
	Version: 2007-08-01
*/

/*
======================================================================
	$.changeLetterSize.addHandler(func)
	文字の大きさが変化した時に実行する処理を追加
======================================================================
*/

jQuery.changeLetterSize = {
	handlers : [],
	interval : 1000,
	currentSize: 0
};

(function($) {

	var self = $.changeLetterSize;

	/* 文字の大きさを確認するためのins要素 */
	var ins = $('<ins>M</ins>').css({
		display: 'block',
		visibility: 'hidden',
		position: 'absolute',
		padding: '0',
		top: '0'
	});

	/* 文字の大きさが変わったか */
	var isChanged = function() {
		ins.appendTo('body');
		var size = ins[0].offsetHeight;
		ins.remove();
		if (self.currentSize == size) return false;
		self.currentSize = size;
		return true;
	};

	/* 文書を読み込んだ時点で
	   文字の大きさを確認しておく */
	$(isChanged);

	/* 文字の大きさが変わっていたら、
	   handlers中の関数を順に実行 */
	var observer = function() {
		if (!isChanged()) return;
		$.each(self.handlers, function(i, handler) {
			handler();
		});
	};

	/* ハンドラを登録し、
	   最初の登録であれば、定期処理を開始 */
	self.addHandler = function(func) {
		self.handlers.push(func);
		if (self.handlers.length == 1) {
			setInterval(observer, self.interval);
		}
	};

})(jQuery);

/*
======================================================================
	$(expr).flatHeights()
	$(expr)で選択した複数の要素について、それぞれ高さを
	一番高いものに揃える
======================================================================
*/

(function($) {

	/* 対象となる要素群の集合 */
	var sets = [];

	/* 高さ揃えの処理本体 */
	var flatHeights = function(set) {
		var maxHeight = 0;
		set.each(function(){
			var height = this.offsetHeight;
			if (height > maxHeight) maxHeight = height;
		});
		set.css('height', maxHeight + 'px');
	};

	/* 要素群の高さを揃え、setsに追加 */
	jQuery.fn.flatHeights = function() {
		if (this.length > 1) {
			flatHeights(this);
			sets.push(this);
		}
		return this;
	};

	/* 文字の大きさが変わった時に、
	   setsに含まれる各要素群に対して高さ揃えを実行 */
	$.changeLetterSize.addHandler(function() {
		$.each(sets, function() {
			this.height('auto');
			flatHeights(this);
		});
	});

})(jQuery);


/*
Copyright (c) 2007, KITAMURA Akatsuki

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/


$(function(){
    $('.medIndex .hL-p, .beautyIndex .hL-p, .sportsIndex .hL-p, .childIndex .hL-p,.sportsBody .institutionPhoto li').flatHeights();
    //$('.asukaBody .schoolguide .hL-h').flatHeights();
    $('.asukaBody .lecturerSection .hL-section').flatHeights();
    $('').flatHeights();
    /* div要素を4つずつの組に分ける */
    var sets = [], temp = [];
    $('.medIndex .contentsMain .sectionInner > .hL-summary, .sportsIndex .hL-summary, .beautyIndex .hL-summary, .childIndex .hL-summary, .bridalIndex .hL-summary, .sweetsIndex .hL-summary').each(function(i) {
        temp.push(this);
        if (i % 4 == 3) {
            sets.push(temp);
            temp = [];
        }
    });
    if (temp.length) sets.push(temp);
    /* 各組ごとに高さ揃え */
    $.each(sets, function() {
        $(this).flatHeights();
    });

    /* div要素を4つずつの組に分ける */
    var sets = [], temp = [];
    $('.sportsIndex .hL-h, .medIndex .hL-h, .beautyIndex .hL-h, .childIndex .hL-h, .bridalIndex .hL-h, .bridalBody .hL-dt, .sweetsIndex .hL-h').each(function(i) {
        temp.push(this);
        if (i % 4 == 3) {
            sets.push(temp);
            temp = [];
        }
    });
    if (temp.length) sets.push(temp);
    /* 各組ごとに高さ揃え */
    $.each(sets, function() {
        $(this).flatHeights();
    });

    /* div要素を4つずつの組に分ける */
    var sets = [], temp = [];
    $('.bridalIndex .sectionInner').each(function(i) {
        temp.push(this);
        if (i % 4 == 3) {
            sets.push(temp);
            temp = [];
        }
    });
    if (temp.length) sets.push(temp);
    /* 各組ごとに高さ揃え */
    $.each(sets, function() {
        $(this).flatHeights();
    });

    /* div要素を4つずつの組に分ける */
    var sets = [], temp = [];
    $('.medIndex .btn, .beautyIndex .btn a').each(function(i) {
        temp.push(this);
        if (i % 4 == 3) {
            sets.push(temp);
            temp = [];
        }
    });
    if (temp.length) sets.push(temp);
    /* 各組ごとに高さ揃え */
    $.each(sets, function() {
        $(this).flatHeights();
    });

    /* div要素を3つずつの組に分ける */
    var sets = [], temp = [];
    $('.medBody .mainReference .section, .sportsBody .mainReference .section, .beautyBody .mainReference p, .reccomendLesson dt, .childBody .lecturer dl dd, .bridalBody .mainReference .section p').each(function(i) {
        temp.push(this);
        if (i % 3 == 2) {
            sets.push(temp);
            temp = [];
        }
    });
    if (temp.length) sets.push(temp);
    /* 各組ごとに高さ揃え */
    $.each(sets, function() {
        $(this).flatHeights();
    });

    /* div要素を3つずつの組に分ける */
    var sets = [], temp = [];
    $('.lecturerBox dl, .beautyBody .mainReference h3, .reccomendLesson dd, .childBody .section .item .hL-p, .bridalBody .mainReference .section h3, .sweetsBody .section .item .hL-p, .sweetsBody .section .item h4').each(function(i) {
        temp.push(this);
        if (i % 3 == 2) {
            sets.push(temp);
            temp = [];
        }
    });
    if (temp.length) sets.push(temp);
    /* 各組ごとに高さ揃え */
    $.each(sets, function() {
        $(this).flatHeights();
    });

    /* div要素を2つずつの組に分ける */
    var sets = [], temp = [];
    $('.lecturerContainer .hL-section, .sportsBody .introduction, .sportsBody .item dd, .asukaBody #mainContents .hL-summary, .lecturer .hL-section').each(function(i) {
        temp.push(this);
        if (i % 2 == 1) {
            sets.push(temp);
            temp = [];
        }
    });
    if (temp.length) sets.push(temp);
    /* 各組ごとに高さ揃え */
    $.each(sets, function() {
        $(this).flatHeights();
    });
    
    /* div要素を2つずつの組に分ける */
    var sets = [], temp = [];
    $('.asukaBody #mainContents .schoolguide .hL-h, .asukaBody #mainContents .study .hL-h, .asukaBody #mainContents .guidelines .hL-h').each(function(i) {
        temp.push(this);
        if (i % 2 == 1) {
            sets.push(temp);
            temp = [];
        }
    });
    if (temp.length) sets.push(temp);
    /* 各組ごとに高さ揃え */
    $.each(sets, function() {
        $(this).flatHeights();
    });

});
/*
$(function(){
	$('.asukaBody .schoolguide .hL-h').css("padding-bottom","0");
	$('.asukaBody .schoolguide .hL-h').css("margin-bottom","-10px");
});*/

$(document).ready(function() {
	$(".telList dd:nth-child(3n+0)").css("border","0");
	$(".telList dd:nth-child(3n+0)").css("margin-right","0");
	$(".telList dd:nth-child(2),.telList dd:nth-child(4),.telList dd:nth-child(6),.telList dt:first-child,.telList dd:nth-child(2) + dt,.telList dd:nth-child(4) + dt").css("padding-top","20px");
	$(".telList dd:nth-child(14),.telList dd:nth-child(16)").css("padding-bottom","20px");
});
