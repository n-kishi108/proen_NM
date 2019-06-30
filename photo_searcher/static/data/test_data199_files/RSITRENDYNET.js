//<!-- 2009/12/14 v1.0 created

var impAgw = 'http://js.revsci.net/gateway/gw.js?csid=H08773';
var impAlc = location.href;

function DM_onSegsAvailable(rsinetsegs) {
    var impArsinet = '';
    var impAdt = new Date();
    impAdt.setTime(impAdt.getTime()+86400000*365);
    if ( rsinetsegs.length > 0 ){
        for(var i = 0; i < ((rsinetsegs.length > 11)?11:rsinetsegs.length) ; i++){
            impArsinet += 'S' + i + '=' +((rsinetsegs[i].length >= 12)?rsinetsegs[i].substring(7,12):'0') + '/';
        }
            impArsinet = impArsinet.substring(0, impArsinet.length-1);
        }else{
            impArsinet = 'S0=0';
        }
        document.cookie = "IMPASEG=" + escape(impArsinet) + "; expires=" + impAdt.toGMTString() + "; path=/; domain=nikkeibp.co.jp";
}

if ( impAlc.substring(0,4) == "http" ){
	document.write('<SCR' + 'IPT src="'+ impAgw +'"></SCR' + 'IPT>');
}

