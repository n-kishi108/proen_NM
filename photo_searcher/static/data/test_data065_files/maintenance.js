/* Show/Hide comment form */
function hideCommentForm() {
    var form = document.getElementById('comment-form-data') || document.getElementById('comment-form');
    if (!form) return;
    form.innerHTML = '<div class="comment-form-form maintenance">メンテナンス中のためコメントをご利用いただくことができません。メンテナンスについては<a href="http://info.cocolog-nifty.com/">お知らせココログ</a>をご覧下さい。</div>';
}

/* Show/Hide trackback URL */
var message = 'メンテナンス中のためトラックバックをご利用いただくことができません。メンテナンスについては<a href="http://info.cocolog-nifty.com/">お知らせココログ</a>をご覧ください。';

function hideTrackbackURL() {
    var p = document.getElementsByTagName('p');
    for (var i = 0; i < p.length; i++) {
        if (p[i].className == 'trackback-url') {
            p[i].innerHTML = message;
            return;
        }
    }
    var div = document.getElementsByTagName('div');
    for (var i = 0; i < div.length; i++) {
        if (div[i].className == 'trackbacks-info') {
            div[i].innerHTML = message;
            return;
        }
    }
}

/* Register events */
function hideForMaintenance() {
    hideCommentForm();
    hideTrackbackURL();
}
if (typeof(serviceStatus) != 'undefined' && serviceStatus["apl"] == 'down') {
    if (window.addEventListener) {
        window.addEventListener('load', hideForMaintenance, false);
    }
    else if( window.attachEvent ) {
        window.attachEvent('onload', hideForMaintenance);
    }
    else {
        window['onload'] = hideForMaintenance;
    }
}
