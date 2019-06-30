var box = {};
window.addEvent('domready', function(){
    $A(document.getElementsByTagName('a')).each(function(el) {
        if (el.className == 'mb') {
            el.href = el.href.replace('/.shared/image.html?','');
        }
    });
    box = new MultiBox('mb', {useOverlay: true, showControls: false});
});
