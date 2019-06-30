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
var clickLineVarName5005308821 = 'http://sr-r3.ace.advertising.com/click/site=0000744964/mnum=0000845346/bnum=64744036/cstr=64744036=_4bb95ecf,5005308821,744964^845346^-12^0,1_?/xsxdata=$xsxdata/xsinvid=0';
document.write('<a href="javascript:AdClicked(clickLineVarName5005308821);" target="_self">');
document.write('<img src="http://bannerfarm.ace.advertising.com/CDN/153382/Scroll_LB_A_rapty_300x250_100329.jpg" border="0" width="300" height="250" alt="Click to learn more...">');
document.write('</a>');