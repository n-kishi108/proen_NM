<!--
	if( typeof( jQuery ) == 'undefined' )
	{
		document.write("<script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js\"></script>");
	}
	document.write("<script src=\"http://md.exblog.jp/js/facebox/facebox.js\" type=\"text/javascript\"></script>" );
	document.write("<link href=\"http://md.exblog.jp/js/facebox/facebox.css\" media=\"screen\" rel=\"stylesheet\" type=\"text/css\"/>");

	addEvent( window , 'load' , function(){
		
 		$("img[src*='pds.exblog.jp/']:not([src*='emoticon'])").each( function()
		{
			// 右クリック禁止
			this.oncontextmenu = function(){return false;};
			
			// デフォルトイベント無効
			$(this).attr( "onclick" , "" );
			
			// for Firefox
			$(this).attr( "draggable" , "" );
			$(this).parent("center:first").attr( "draggable" , "" );
			
			// for safari 
			$(this).css("-khtml-user-drag" , "none");
			
			// image tool bar (IE6)
			$(this).attr( "galleryimg" , "no" );
			
			// exblog 
			if( $(this).parent("a:not([onclick*='imgview'])").size() == 1 )
			{
				return;
				
			}else if( ( $(this).parent("center").size() == 1 ) && 
				( $(this).parent("center").parent("a:not([onclick*='imgview'])").size() == 1 ) )
			{
				$(this).parent("center").parent("a:not([onclick*='imgview']):first").attr("draggable", "" );
				return;
			}
			
			var path = $(this).attr("src");
			$(this).wrap( "<a href=\"" + path + "\" rel=\"facebox\" ondrag=\"return false;\" draggable=\"false\" style=\"border-width:0px;\"></a>");
			
		});
		
		jQuery(document).ready(function($) {
		  $('a[rel*=facebox]').facebox()
		}); 
	});
//-->

