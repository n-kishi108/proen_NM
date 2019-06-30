var a_agent = navigator.userAgent.toLowerCase();
var a_do = document;
var a_rtu = '';
try {
    a_rtu = top.a_do.referrer;
} 
catch (e) {
    if (parent) {
        if (parent.a_getReferer) {
            try {
                a_rtu = parent.a_getReferer;
            } 
            catch (e1) {
                a_rtu = '';
            }
        }
        else {
            try {
                a_rtu = parent.document.referrer;
            } 
            catch (e2) {
                try {
                    a_rtu = document.referrer;
                } 
                catch (e3) {
                    a_rtu = '';
                }
            }
        }
        parent.a_getReferer = document.location.href;
    }
    else {
        try {
            a_rtu = document.referrer;
        } 
        catch (e4) {
            a_rtu = '';
        }
    }
}

function a_getUrlStat(a_urla, a_urlDoc, a_pname, a_ptitle, a_pbody){

    var a_da = new Date();
    var a_src = a_urla;
    a_src += '?url=' + encodeURIComponent(a_urlDoc)
    a_src += '&pagename=' + encodeURIComponent(a_pname);
    a_src += '&pagetitle=' + encodeURIComponent(a_ptitle);
    a_src += '&pagebody=' + encodeURIComponent(a_pbody);
    a_src += '&ref=' + encodeURIComponent(a_rtu);
    return a_src;
}


function a_log(){
    var a_urla = 'http://203.183.90.6/a.php';
//    var a_urla = '/a.php';
    var a_urlCur = a_do.location.href;

    var a_pname;
    var a_ptitle;
    var a_pbody;
    try {
        a_pname = getElementByClass(a_do.getElementById('pan_l'),"text4").innerHTML;
    } catch(e5) {
        try{
            a_pname = a_do.getElementById('bjn-pan').innerHTML;
        } catch(e51){
            a_pname = '';
        }
    }
    try {
        a_ptitle = getElementByClass(a_do,"text3 main_news_bg2").innerHTML;
    } catch(e6) {
        try{
            a_ptitle = getElementByClass(a_do,"midashi_line2").innerHTML;
        } catch(e61){
            a_ptitle = '';
        }
    }
    try {
        a_pbody = getElementByClass(a_do.getElementById('main_news'),"text2").innerHTML.replace(/^\s+|\s+$/g,'').substring(0,100);
    } catch(e7) {
        a_pbody = '';
    }
    var a_src = a_getUrlStat(a_urla, a_urlCur, a_pname, a_ptitle, a_pbody);

    a_do.write('<img src="' + a_src + '" alt="img" style="border:0" />');
}

function getElementByClass(obj,cls){
    if(obj && obj.hasChildNodes()){
        var nodes=obj.childNodes,len=obj.childNodes.length;
        for(var i=0;i < len;i++){
            if(nodes[i].nodeType==1 && (new RegExp(cls)).test(nodes[i].className)){
                return nodes[i];
            }else{
                var ret=getElementByClass(nodes[i],cls);
                if(ret!=undefined){
                    return ret;
                }
            }
        }
    }
}
a_log()
