
params = "?";

if (typeof(become_partner) == 'undefined')
	params += "partner=undefined";
else
	params += "partner=" + become_partner;
if (typeof(become_query) != 'undefined')
	params += "&q=" + become_query;
if (typeof(become_css_type) == 'undefined')
	params += "&css_type=default.css";
else
	params += "&css_type=" + become_css_type + ".css";
if (typeof(become_genre) == 'undefined')
	params += "&genre=1";
else
	params += "&genre=" + become_genre;
if (typeof(become_prd_num) == 'undefined')
	params += "&num=5";
else
	params += "&num=" + become_prd_num;
if (typeof(become_border) == 'undefined')
	border = 0;
else 
	border = become_border;
if (typeof(become_border_color) == 'undefined')
	border_color = "black";
else
	border_color = become_border_color;
if (typeof(become_image_size) == 'undefined')
	params += "&image_size=100";
else 
	params += "&image_size=" + become_image_size;

document.write('<iframe marginwidth="0" marginheight="0" hspace="0" vspace="0" style="border: ' + border + 'px solid #000000; border-color:' + border_color + ';" src="http://partner.become.co.jp/render_shop' + params + '" frameborder="0" scrolling="no" width="' + become_win_width + '" height="' + become_win_height + '"></iframe>');
