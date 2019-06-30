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
var clickLineVarName0040665344 = 'http://sr-r3.ace.advertising.com/click/site=0000757868/mnum=0000834574/bnum=31711941/cstr=31711941=_4bb59a9d,0040665344,757868^834574^-12^0,1_?/xsxdata=$xsxdata/xsinvid=0';
document.write('<a href="javascript:AdClicked(clickLineVarName0040665344);" target="_self">');
document.write('<img src="http://bannerfarm.ace.advertising.com/CDN/128880/fighting_D2_multigym_300x250_100331.jpg" border="0" width="300" height="250" alt="Click to learn more...">');
document.write('</a>');