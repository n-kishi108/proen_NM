//SearchBox
function chSearch(str) {
    document.getElementById('searchMenu').style.display = 'none';

    switch(str) {
    case 'web':
	document.getElementById('searchTarget').firstChild.src = "http://blog.so-net.ne.jp/_css_header/icn_search_web.gif";
	document.searchForm.type.value = str;
	break;
    case 'blog':
	document.getElementById('searchTarget').firstChild.src = "http://blog.so-net.ne.jp/_css_header/icn_search_blog.gif";
	document.searchForm.type.value = str;
	document.searchForm.site.value = '';
	break;
    case 'sonetblog':
	document.getElementById('searchTarget').firstChild.src = "http://blog.so-net.ne.jp/_css_header/icn_search_sonetblog.gif";
	document.searchForm.type.value = 'blog';
	document.searchForm.site.value = 'sonet';
	break;
    }
}

function searchWin_open(targetWin) {
    document.getElementById(targetWin).style.display = 'block';
}
function searchWin_close(targetWin) {
    document.getElementById(targetWin).style.display = 'none';
}
function searchForm_submit() {
    result = document.searchForm.query.value.length;
    if ( !(result == 0) ) document.searchForm.submit();
}
