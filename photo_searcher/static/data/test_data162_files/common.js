$(function(){
	//検索窓使用画像プリロード
	$('body').append('<div id="preload"></div>')
	
	//検索窓focus
	var $searchspan = $('.search span.text');
	$($searchspan).hover(function(){
		$(this).css('border-color','#dac369');
	},
	function(){
		$(this).css('border-color','#cccccc');
	});
	var $searchtext = $('.search input[@type="text"]');
	$($searchtext[0]).focus(function(){
		$(this).css('background','#e7e3a4');
		if(this.value == 'キーワードを入力'){
			this.value = '';
			$(this).css('color','#333333');
		}
		if($('.search div.tip-box').length != 0){
			$('.search div.tip-box').remove();
		}
	});
	$($searchtext[0]).blur(function(){
		$(this).css('background','#f2f1e2');
		if(this.value == ''){
			this.value = 'キーワードを入力';
			$(this).css('color','#999999');
		}
	});
	
	if($searchtext.length >= 2){
		$($searchtext[1]).focus(function(){
			$(this).css({
				'background':'#e7e3a4',
				'color':'#333333'
			});
			if(this.value == 'キーワードを入力'){
				this.value = '';
				$(this).css('color','#333333');
			}
		});
		$($searchtext[1]).blur(function(){
			$(this).css('background','#f2f1e2');
		});
	}

	//検索窓関連の動き
	function searchEffect(){
		var temp = '検索キーワードを入力してください。';
		var searchHtml = ''
		+'<div class="tip-box">'
		+'<div class="inner-top"></div>'
		+'<div class="inner-con"><p>' + temp + '</p>'
		+'</div>'
		+'<div class="inner-bottom"></div>'
		+'</div>';

		if($searchtext[0].value == 'キーワードを入力' || $searchtext[0].value == ''){
			$('#header .search').css('position','relative');
			tipDelete();
			$('#header .search').append(searchHtml);
			return false;
		}
		else{
			return mysearch();
		}
	}
	
	//tipボックス消去
	function tipDelete(){
		$('#header .search .tip-box').remove();
	}

	//テキストエリアフォーカス状態でEnterkeyを押したとき
	$($searchtext[0]).keypress(function(key){
		var keycode = key.charCode || key.keyCode || 0;
		if(keycode == '13'){
			return searchEffect();
		}
	})

	//検索ボタンhover
	var $searchbt = $('.search input[@type="image"]');
	$($searchbt).bind('mouseover',
		function(){
			var $btsrc = $(this).attr('src');
			if($btsrc.match(/on\.gif/) == null && $btsrc.match(/on2\.gif/) == null){
				var src = $btsrc.split('.gif');
				$btsrc = src[0] + 'on.gif';
				$(this).attr('src',$btsrc);
			}
		}
	);
	$($searchbt).bind('mouseout',
		function(){
			var $btsrc2 = $(this).attr("src");
			if($btsrc2.match(/on\.gif/)){
				var src2 = $btsrc2.split('on.gif');
				$btsrc2 = src2[0] + '.gif';
				$(this).attr('src',$btsrc2);
			}
			else if($btsrc2.match(/on2\.gif/)){
				var src2b = $btsrc2.split('on2.gif');
				$btsrc2 = src2b[0] + '.gif';
				$(this).attr('src',$btsrc2);
			}
		}
	);

	//検索ボタンclick
	$($searchbt[0]).click(searchEffect);
	if($searchtext.length >= 2){
		$($searchbt[1]).click(function(){
			if($searchtext[1].value == 'キーワードを入力'){
				$searchtext[1].value = '';
			}
		});
	}

	//検索ボタンmousedown
	$($searchbt).bind('mousedown',
		function(){
			var $btsrc3 = $(this).attr('src');
			var src3 = $btsrc3.split('.gif');
			if($btsrc3.match(/on\.gif/)){
				$btsrc3 = src3[0] + '2.gif';
				$(this).attr('src',$btsrc3);
			}
			else{
				$btsrc3 = src3[0] + 'on2.gif';
				$(this).attr('src',$btsrc3);
			}
		}
	);

	//検索ボタンmouseup
	$($searchbt).mouseup(function(){
		var $btsrc4 = $(this).attr('src');
		if($btsrc4.match(/on2\.gif/)){
			var src4 = $btsrc4.split('on2.gif');
			$btsrc4 = src4[0] + 'on.gif';
			$(this).attr('src',$btsrc4);
		}
	});
	
	//body内のどこかをクリックしたときにtip-box消去
	$('body').click(tipDelete);

	//escキーでtip-box消去
	$('body').keypress(function(key){
		var keycode = key.charCode || key.keyCode || 0;
		if(keycode == '27'){
			return tipDelete();
		}
	});

	//スクロールでtip-box消去
	$(window).scroll(tipDelete);

	//画像にlabel処理
	var $label = $('label');
	if($('img',$label).length != 0){
		$('img',$label).click(function(){
			$(this).parent('label').click();
		});
	}

	//アンカーナビ罫線処理
	var $anchor = $('#main-content .anchor');
	$($anchor).each(function(){
		var $anchorlist = $('li',this).get();
		$($anchorlist.pop()).addClass('noborder');
	});

	//2段組背景処理
	var $wrap2a = $('#main-content .wrap2a');
	$($wrap2a).each(function(){
		var $wrap2acol = $('div.colum',this);
		if($wrap2acol.length == 2){
			$(this).addClass('has2colum');
		}
	});
	
	//テーブル見出し中身空の時は背景色白
	var $tableTh = $('table th');
	$tableTh.each(function(){
		if($(this).html() == '&nbsp;'){
			$(this).css('background','#ffffff');
		}
	});
	//別ウインドウ
	var $blank = ('.link-blank');
	$($blank).each(function(){
		if($('a',$blank).length !=0){
			$('a',this).click(function(){
				window.open(this.href,'');
				return false;
			});
		}
		else{
			$(this).click(function(){
				window.open(this.href,'');
				return false;
			});
		}
	});
	$('.blank').click(function(){
		window.open(this.href,'');
		return false;
	});

	//スムーススクロール
	//aがname属性のみを持つときはid属性を付加
	$($('a')).each(function(){
		if($($('a').attr('name')).length > 0){
			$(this).attr('id',$(this).attr('name'));
		}
	});
	//hrefが#から始まるもので#tab-content1～3のもの意外にマッチ
	var $ancohrlink = $('a[@href^="#"][@href!="#tab-content1"][@href!="#tab-content2"][@href!="#tab-content3"][@href!="#tab-content4"][@href!="#tab-content5"]');
	$($ancohrlink).click(function(){
		$($(this).attr('href')).ScrollTo(500);
		return false;
	});
	
	//プラグイン自動挿入
	//adobeReader
	var $pdfExtension = $("#content-area a[@href$='\.pdf']");
	var pdfHtml = ''
	+'<div class="section plugin">'
	+'<div class="wrap">'
	+'<div class="text">'
	+'<p>PDF形式のファイルをご覧になるには、Adobe Readerが必要です。<br>Adobe Readerは、Adobe Systems Incorporatedの登録商標です。</p>'
	+'<p class="link-blank"><a href="http://www.adobe.com/jp/products/acrobat/readstep2.html" target="_blank">Adobe Reader（無料）をダウンロード</a></p>'
	+'</div>'
	+'<div class="img">'
	+'<p><a href="http://www.adobe.com/jp/products/acrobat/readstep2.html" target="_blank"><img src="/common/images/bt_adobereader.gif" alt="Adobe Readerのダウンロード" width="112" height="33" border="0"></a></p>'
	+'</div>'
	+'</div>'
	+'</div>';
	if($pdfExtension.length != 0){
		$("#main-content").append(pdfHtml);
	}
	
	//PDFリンクアイコン付加、別ウインドウリンク
	$($pdfExtension).each(function(){
		if($("img",this).length == 0){
			$(this).before('<img src="/common/images/ic_pdf.gif" alt="PDF" width="12" height="13" class="link-pdf">');
		}
	});
	$($pdfExtension).click(function(){
		window.open(this.href,'');
		return false;
	})
	//イベントシステム外ページカテゴリー画像
	/*$('#event-category-image').each(
		function(){
			var categoryImg = '<a href="/event/index.html"><img src="/event/__icsFiles/metafile/2008/01/30/ic_event.gif" alt="イベント" width="180" height="27"></a>'
			$(this).html(categoryImg);
		}
	);*/
	
/* コピーガード
---------------------------------------　*/
// 画像処理
	$('img').bind( 'contextmenu', function(){	// img right click
		if(this.className != 'copy'){
			return false;
		}
	});

// テキスト処理
	$().bind( 'selectstart',function(){//ie
		return false;
	});
	$('body').css({//mozilla & Safari
		'-moz-user-select':'none',
		'-khtml-user-select':'none'
	});
});