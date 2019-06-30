function getSize () {
    return {
        width  :  window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth
            || 0,
            height :  window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight
            || 0,
            scroll :  document.documentElement.scrollTop
                || document.body.scrollTop
                || 0
            }
}

var PrivacySetting = {
    center: function() {
        size = getSize();
        element = this.window;
        ww = size.width;
        wh = size.height
        ow = document.all ? document.body.scrollLeft : 0;
        oh = document.all ? size.scroll : 0;
        var w = element.offsetWidth;
        var h = element.offsetHeight;
        var top  = (wh/2 + oh) - (h/2);
        var left = (ww/2 + ow) - (w/2);
        if(top < 0) top = 0;
        if(left < 0) left = 0;
        element.style.position = document.all ? 'absolute' : 'fixed';
        element.style.top = top + "px";
        element.style.left = left + "px";
    },
    show: function(id) {
        if(!this.stored || !this.stored[id]) return true;
        this.target = id;
        var level = this.stored[id][0];
        var open = this.stored[id][1];
        this.window = $('privacy_window');
        if(level < 0) {
            this.window = $('reason_window');
            $('reason_text').innerHTML = this.stored[id][2] ? this.stored[id][2] : '';
        }
        var ol = $('overlay');
        if (!ol) {
            ol = document.createElement('div');
            ol.id = 'overlay';
            document.body.appendChild(ol);
        } else {
            Element.show(ol);
        }
        ol.style.height = (document.all ? document.body.scrollHeight : document.body.offsetHeight) + 'px';
        Element.show(this.window);
        this.center();
        if(level == 2) {
            if ($('friends')) {
                $('friends').checked = 1;
            } else {
                $('private').checked = 1;
            }
        } else if(level == 3) {
            if ($('group')) {
                $('group').checked = 1;
            } else {
                $('private').checked = 1;
            }
        } else if(level == 1) {
            $('public').checked = 1;
        } else {
            $('private').checked = 1;
        }
        var g = this.window.getElementsByTagName('ul');
        if(!g) return true;
        if(g.length < 2) return false;
        g = g[g.length - 1].getElementsByTagName('input');
        if(!g) return true;
        for(var i = 0; i < g.length; i++) {
            g[i].checked = (1 << i) & open ? 1 : 0;
        }
        Event.observe(document, 'keypress', this.keypress);
        return false;
    },
    keypress: function(e) {
        if (Event.KEY_ESC == e.keyCode
            || Event.KEY_ESC == e.which
            || Event.KEY_ESC == e.charCode) {
            PrivacySetting.dismiss();
            return false;
        }
        return true;
    },
    dismiss: function() {
        Event.stopObserving(document, 'keypress', this.keypress);
        Element.hide($('overlay'));
        Element.hide(this.window);
    },
    open_groups: function() {
        var g = this.window.getElementsByTagName('ul');
        if(!g || g.length < 2) return -1;
        g = g[g.length - 1].getElementsByTagName('input');
        if(!g) return -1;
        var o = 0;
        for(var i = 0; i < g.length; i++) {
            if (g[i].checked) o |= (1 << i);
        }
        return o;
    },
    update: function() {
        var ol = 0;
        var og = this.open_groups();
        if ($('public').checked) ol = 1;
        if ($('friends') && $('friends').checked) ol = 2;
        if ($('group') && $('group').checked) {
            if (og == 0) {
                alert('グループが選択されていません。');
                return;
            }
            ol = 3;
        }
        var requrl = "/manage/photo/visibility?open_level="+ol+(og>=0?"&open_groups="+og:'')+"&id="+this.target;
        new Ajax.Request(requrl, {
            onSuccess: this.onSuccess.bind(this)
        });
        this.stored[this.target] = [ol, og];
        this.dismiss();
    },
    onSuccess: function(transport) {
        var o = $('privacy'+this.target);
        var i = o.getElementsByTagName('img');
        if(transport.responseText < 0) return;
        if(i && i[0]) {
            i[0].src = '/img/cmn/v_' + this.replace[transport.responseText][0] + '.gif';
            i[0].alt = i[0].title = this.replace[transport.responseText][1];
        }
        o = o.getElementsByTagName('span');
        if(o && o[0]) {
            o[0].innerHTML = this.replace[transport.responseText][1];
        }
    },
    replace: {
        1: ['open', '公開'],
        2: ['limited', '友達まで公開'],
        3: ['limited', '家族まで公開'],
        0: ['private', '非公開']
    }
};
