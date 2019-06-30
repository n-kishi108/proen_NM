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
var clickLineVarName3547561773 = 'http://sr-r3.ace.advertising.com/click/site=0000744964/mnum=0000844929/bnum=23634547/cstr=23634547=_4bb59a9d,3547561773,744964^844929^-12^0,1_?/xsxdata=$xsxdata/xsinvid=0';
document.write('<a href="javascript:AdClicked(clickLineVarName3547561773);" target="_self">');
document.write('<img src="http://bannerfarm.ace.advertising.com/CDN/153318/SonyMedical2_C_300x250_100326.gif" border="0" width="300" height="250" alt="Click to learn more...">');
document.write('</a>');