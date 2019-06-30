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

var LicenseSetting = {
    center: function() {
        element = this.window;
        size = getSize();
        ww = size.width;
        wh = size.height
        ow = document.all ? document.body.scrollLeft : 0;
        oh = document.all ? size.scroll  : 0;
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
        this.window = $('license_window');
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

        Event.observe(document, 'keypress', this.keypress);
        return false;
    },
    keypress: function(e) {
        if (Event.KEY_ESC == e.keyCode
            || Event.KEY_ESC == e.which
            || Event.KEY_ESC == e.charCode) {
            LicenseSetting.dismiss();
            return false;
        }
        return true;
    },
    dismiss: function() {
        Event.stopObserving(document, 'keypress', this.keypress);
        Element.hide($('overlay'));
        Element.hide(this.window);
    },
    update: function() {
        var license = "none";

        if ($('by').checked) license = "by";
        if ($('by-nc').checked) license = "by-nc";
        if ($('by-nc-nd').checked) license = "by-nc-nd";
        if ($('by-nc-sa').checked) license = "by-nc-sa";
        if ($('by-nd').checked) license = "by-nd";
        if ($('by-sa').checked) license = "by-sa";
        if ($('free').checked) license = "free";

        var requrl = "/manage/photo/rights?license="+license+"&id="+this.target;

        new Ajax.Request(requrl, {
            onSuccess: this.onSuccess.bind(this)
        });

        this.stored[this.target] = [license];
        this.dismiss();
    },
    onSuccess: function(transport) {

        var o = $('cclicense'+this.target);
        var k = o.getElementsByTagName('a');
        var i = o.getElementsByTagName('img');
        var span_object = o.getElementsByTagName('span');

        if(span_object && span_object[0]) {

            switch(transport.responseText) {
                case "by": span_object[0].innerHTML = this.replace[transport.responseText][0]; break;
                case "by-nc": span_object[0].innerHTML = this.replace[transport.responseText][0]; break;
                case "by-nc-nd": span_object[0].innerHTML = this.replace[transport.responseText][0]; break;
                case "by-nc-sa": span_object[0].innerHTML = this.replace[transport.responseText][0]; break;
                case "by-nd": span_object[0].innerHTML = this.replace[transport.responseText][0]; break;
                case "by-sa": span_object[0].innerHTML = this.replace[transport.responseText][0]; break;
                case "free": span_object[0].innerHTML = this.replace[transport.responseText][0]; break;
                default : span_object[0].innerHTML = this.replace["none"][0];
            }
        }

        if(k && k[1]) {
            switch(transport.responseText) {
                case "by": k[1].href = '/license/by'; break;
                case "by-nc": k[1].href = '/license/by-nc'; break;
                case "by-nc-nd": k[1].href = '/license/by-nc-nd'; break;
                case "by-nc-sa": k[1].href = '/license/by-nc-sa'; break;
                case "by-nd": k[1].href = '/license/by-nd'; break;
                case "by-sa": k[1].href = '/license/by-sa'; break;
                case "free": k[1].href = '/license/free'; break;
                default : k[1].href = ''
            }
        }

        var types = ['by', 'nc', 'nd', 'sa'];
        for (var j = 0; j < types.length; j++) {
            $("icon_" + types[j]).style.display = "none";
        }
        var selected_types = transport.responseText.split("-");
        for (var j = 0; j < selected_types.length; j++) {
            $("icon_" + selected_types[j]).style.display = "block";
        }

        /*if(i) {
            for(var j = 0; j < 3; j++) {
                i[j].src = '/img/cmn/' + this.replace[transport.responseText][1][j] + '.gif';
                i[j].alt = i[j].title = this.replace[transport.responseText][0];
            }
        }*/
    },
    replace: {
        "by":         ['表示', ['cc_icon_attribution','blank','blank']],
        "by-nc":      ['表示-非営利', ['cc_icon_attribution','cc_icon_noncomm','blank']],
        "by-nc-nd":   ['表示-非営利-改変禁止', ['cc_icon_attribution','cc_icon_noncomm','cc_icon_noderivs']],
        "by-nc-sa":   ['表示-非営利-継承', ['cc_icon_attribution','cc_icon_noncomm','cc_icon_sharealike']],
        "by-nd":      ['表示-改変禁止', ['cc_icon_attribution','cc_icon_noderivs','blank']],
        "by-sa":      ['表示-継承', ['cc_icon_attribution','cc_icon_sharealike','blank']],
        "free":      ['素材許可(フリーピクス)', ['cc_icon_attribution','cc_icon_sharealike','blank']],
        "none":       ['All rights reserved', ['blank', 'blank', 'blank']]
    }
};
