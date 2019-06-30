var rsi_k;
var rsi_now = new Date();
var rsi_csid = 'H08773';
var rsi_td=rsi_now.getFullYear()+'_'+(rsi_now.getMonth()+1)+'_'+rsi_now.getDate();
var rsi_ct=0;
var rsi_beg=document.cookie.indexOf('rsi_ct=');
if(rsi_beg>=0){
rsi_beg=document.cookie.indexOf('=',rsi_beg)+1;
if(rsi_beg>0){
if(rsi_td==document.cookie.substring(rsi_beg,rsi_beg+rsi_td.length)){
rsi_beg+=(rsi_td.length+1);
var rsi_end=document.cookie.indexOf(';',rsi_beg);
if(rsi_end==-1)
rsi_end=document.cookie.length;
var rsi_par=parseInt(document.cookie.substring(rsi_beg,rsi_end));
if(!isNaN(rsi_par))
rsi_ct=rsi_par;
}}}
var rsi_tom=new Date(rsi_now.getTime()+86400000);
var rsi_dom=location.hostname;
rsi_dom=rsi_dom.replace(/.*(\.[\w\-]+\.[a-zA-Z]{3}$)/,'$1');
rsi_dom=rsi_dom.replace(/.*(\.[\w\-]+\.\w+\.[a-zA-Z]{2}$)/,'$1');
rsi_dom=rsi_dom.replace(/.*(\.[\w\-]{4,}\.[a-zA-Z]{2}$)/,'$1');
document.cookie=('rsi_ct='+rsi_td+':'+(rsi_ct+1)+';expires='+rsi_tom.toGMTString()+';path=/;domain='+rsi_dom);
rsi_k = '&ko=' + rsi_td + '__' + Math.floor((rsi_ct+2)/3);
document.writeln('<script type="text/javascript" src="' + 'http' + (location.protocol=='https:'?'s':'') + '://pix04.revsci.net/A06543/a4/0/0/pcx.js?csid=H08773' + rsi_k + '" charset="ISO-8859-1"></s' + 'cript>');
