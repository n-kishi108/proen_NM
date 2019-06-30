$(function() {
	$('#photo-gallery a').append('<span><img src="/common//images/photo_gallery_ic.gif" alt="画像を拡大する" width="10" height="10"></span>')
	$('#photo-gallery a').lightBox();
	var timer = null;
	$('#photo-gallery a').click(function(){
		timer = setTimeout(function(){
			if($('#jquery-lightbox').length){
				$('#lightbox-nav').bind( 'contextmenu', function(){// img right click
					return false;
				});
				$('img').bind( 'contextmenu', function(){// img right click
					return false;
				});
			}
		}, 400);
	});
});