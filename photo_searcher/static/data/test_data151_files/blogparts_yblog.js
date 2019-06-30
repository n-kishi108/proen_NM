var b = 'http://rd.yahoo.co.jp/blog/blogparts/ypc/checker/*http://b.anshin.yahoo.co.jp/b?U=';
b += escape(document.location);
var img_tag = '<img src="' + b + '" width="168" height="64" border="0" usemap="#AnshinCheckerMap">';
document.write('<table border="0" cellpadding="0" cellspacing="0" width="168">\
<tr align="center"><td colspan="5" valign="top" width="168">');
document.write(img_tag);
document.write('</td></tr></table>\
<map name="AnshinCheckerMap">\
<area shape="rect" coords="6,6,28,27" href="http://rd.yahoo.co.jp/ypc/checker01/checker/evt=77088/*http://anshin.yahoo.co.jp/checker/">\
<area shape="rect" coords="30,7,129,27" href="http://rd.yahoo.co.jp/ypc/checker01/checker/evt=77088/*http://anshin.yahoo.co.jp/checker/" alt="Yahoo!あんしんねっとコメントチェッカー">\
<area shape="rect" coords="5,31,161,58" href="http://rd.yahoo.co.jp/ypc/checker01/top/evt=77088/*http://anshin.yahoo.co.jp/">\
<area shape="rect" coords="131,8,160,25" href="http://rd.yahoo.co.jp/ypc/checker01/checker/evt=77088/*http://anshin.yahoo.co.jp/checker/">\
</map>');

