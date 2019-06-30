// cocolog original theme style initialization
window.addEvent('domready', function(){
    if (typeof initStyle == 'function') {
		    if (!$(document.body).getProperty('onload') || !$(document.body).getProperty('onload').match(/initStyle\(\)/)) {
            initStyle();
        }
    }
});

// insert Twitter icon
window.addEvent('domready', function(){
    $A(document.getElementsByTagName('a')).each(function(el) {
        if (el.className == 'share-link share-link-twitter') {
            el.innerHTML = '<img src="http://template.cocolog-nifty.com/images/twitter.gif" width="16" height="16" alt="Twitter" title="Twitter" style="border-style: none;" />';
        }
    });
});
