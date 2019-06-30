
FotoPagerThumb = {};


FotoPagerThumb = new Ten.Class({
    initialize: function(pager) {
        if (!pager) return;

        this.pager = pager;
        this.mouseOver = new Ten.Observer(pager, 'onmouseover', this, 'mouseOverHandler');
        this.mouseOut = new Ten.Observer(pager, 'onmouseout', this, 'mouseOutHandler');
        this.morePreviewButton = Ten.DOM.getElementsByTagAndClassName('div', "pager-thumbs-more", pager)[0];
        this.morePreview = new Ten.Observer(this.morePreviewButton, 'onclick', this, 'previewClickHandler');
        this.thumbs = Ten.DOM.getElementsByTagAndClassName('div', "pager-thumbs", pager)[0];
    }
}, {
    mouseOverHandler: function() {
        var thumbs = Ten.DOM.getElementsByTagAndClassName('a', null, this.thumbs);
        for (var i = 1; i < thumbs.length; i++) {
            var a = thumbs[i];
            if (Ten.DOM.hasClassName(a.parentNode, 'pager-thumbs-more')) {
                continue;
            }
            a.style.display = 'none';
        }
        this.thumbs.style.display = 'block';
    },
    mouseOutHandler: function() {
        this.thumbs.style.display = 'none';
    },
    previewClickHandler: function(ev) {
        ev.stop();
        this.mouseOver.stop();
        this.mouseOut.stop();
        this.morePreview.stop();
        var thumbs = Ten.DOM.getElementsByTagAndClassName('a', null, this.thumbs);
        for (var i = 0; i < thumbs.length; i++) {
            var a = thumbs[i];
            if (Ten.DOM.hasClassName(a.parentNode, 'pager-thumbs-more')) {
                a.style.display = 'none';
                continue;
            }
            a.style.display = 'block';
        }
        this.thumbs.style.display = 'block';
    }
});

new Ten.Observer(window, 'onload', function() {
    new FotoPagerThumb(document.getElementById('pager-next'));
    new FotoPagerThumb(document.getElementById('pager-prev'));
});
