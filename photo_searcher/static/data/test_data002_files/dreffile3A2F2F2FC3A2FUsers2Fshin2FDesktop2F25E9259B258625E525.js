function AdClicked(url)
{
    var clickLineDisabled = "$dcli";
    if(clickLineDisabled=="1")
    {
        return;
    }

    var winOpen = "1";
    if(winOpen == "1")
    {
        window.open(url,"");
    }else
    {
        parent.location.href=url;
    }
}
var clickLineVarName6345651004 = 'http://sr-r3.ace.advertising.com/click/site=0000780938/mnum=0000730782/bnum=30589735/cstr=30589735=_4bb8291c,6345651004,780938^730782^70^0,1_?/xsxdata=$xsxdata/xsinvid=0';
document.write('<a href="javascript:AdClicked(clickLineVarName6345651004);" target="_self">');
document.write('<img src="http://bannerfarm.ace.advertising.com/CDN/136046/travelzoo_U_300x250_100315.gif" border="0" width="300" height="250" alt="Click to learn more...">');
document.write('</a>');