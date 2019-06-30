Hatena.Fotolife.toggleMore = Ten.Class({
    initialize: function(ul) {
        ul = (typeof ul == 'string') ? document.getElementById(ul) : ul;
        if(ul && ul.tagName == 'UL') {
            this.ul = ul;
            this.on = false;
            this.searchMore();
        }
    }
}, {
    searchMore: function () {
        var li = this.ul.getElementsByTagName('li');
        var afterMore = false;
        this.toggleList = [];
        for(var i=0; i<li.length; i++) {
            if(afterMore) {
                this.toggleList.push(li[i]);
                li[i].style.display = 'none';
            } else if(Ten.DOM.hasClassName(li[i], 'more')) {
                this.more = li[i];
                this.more.style.display = '';
                afterMore = true;
                new Ten.Observer(this.more, 'onclick', this, 'toggle');
            }
        }
    },
    toggle: function (e) {
        e.stop();
        if(e.target.tagName != 'A') return;
        if(this.on) {
            this.toggleVisible();
            this.on = false;
        } else {
            this.toggleVisible();
            this.on = true;
        }
    },
    toggleVisible: function () {
        if(this.toggleList.length < 1) return;
        var style = (this.toggleList[0].style.display == 'none') ? '' : 'none';
        for(var i=0; i<this.toggleList.length; i++) {
            this.toggleList[i].style.display = style;
        }
    }
});

