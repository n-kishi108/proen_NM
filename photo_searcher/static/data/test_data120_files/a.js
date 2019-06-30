birthday = '744f5340487c59424u49bb52e28ffc6';
url = 'http://uramon.uki2.ne.jp/uranai/flash/gray.swf?birthday=' + birthday;
document.write('<object id="uranai" width="130" height="230" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0">');
document.write('<param name=movie value="' + url + '" />');
document.write('<param name=flashvars value="ad_ref=http://64lovesong.jugem.jp/?eid=193" />');
document.write('<param name=menu value="false" />');
document.write('<param name=quality value="high" />');
document.write('<param name=allowScriptAccess value="always" />');
document.write('<embed src="' + url + '" width="130" height="230" menu="false" name="uranai" allowScriptAccess="always" flashvars="ad_ref=http://64lovesong.jugem.jp/?eid=193" pluginspage="http://www.macromedia.com/go/getflashplayer">');
document.write('</embed>');
document.write('</object>');

function windowOpen(url, name, option) {
window.open(url, name, option);
}