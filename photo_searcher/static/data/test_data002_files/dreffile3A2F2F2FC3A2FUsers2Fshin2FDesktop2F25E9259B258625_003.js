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
var clickLineVarName5285242181 = 'http://sr-r3.ace.advertising.com/click/site=0000769699/mnum=0000842360/bnum=62394845/cstr=62394845=_4bb8291c,5285242181,769699^842360^71^0,1_?/xsxdata=$xsxdata/xsinvid=0';
document.write('<a href="javascript:AdClicked(clickLineVarName5285242181);" target="_self">');
document.write('<img src="http://bannerfarm.ace.advertising.com/CDN/152919/relo2_B_couple_300x250_100317.JPG" border="0" width="300" height="250" alt="Click to learn more...">');
document.write('</a>');