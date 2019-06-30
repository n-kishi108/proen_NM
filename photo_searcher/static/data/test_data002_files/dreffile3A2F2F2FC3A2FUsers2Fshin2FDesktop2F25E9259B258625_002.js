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
var clickLineVarName8784072085 = 'http://sr-r3.ace.advertising.com/click/site=0000769699/mnum=0000757586/bnum=5616785/cstr=5616785=_4bb8291b,8784072085,769699^757586^70^0,1_?/xsxdata=$xsxdata/xsinvid=0';
document.write('<a href="javascript:AdClicked(clickLineVarName8784072085);" target="_self">');
document.write('<img src="http://bannerfarm.ace.advertising.com/CDN/141851/KMaeon_A_brain_300x250_090903.gif" border="0" width="300" height="250" alt="Click to learn more...">');
document.write('</a>');