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
var clickLineVarName0554885073 = 'http://sr-r3.ace.advertising.com/click/site=0000757868/mnum=0000845346/bnum=80506312/cstr=80506312=_4bb95ee3,0554885073,757868^845346^-12^0,1_?/xsxdata=$xsxdata/xsinvid=0';
document.write('<a href="javascript:AdClicked(clickLineVarName0554885073);" target="_self">');
document.write('<img src="http://bannerfarm.ace.advertising.com/CDN/153382/Scroll_LB_A_rapty_300x250_100329.jpg" border="0" width="300" height="250" alt="Click to learn more...">');
document.write('</a>');