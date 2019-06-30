// for user blog page.
function myblogRewrite() { 
    // todo
    var el1 = document.getElementById('myblog-header-right');
    if (el1) el1.style.visibility = 'visible';
    var el2 = document.getElementById('myblog-header-right-no-login');
    if (el2) el2.style.visibility = 'visible';
}
myblogRewrite();
