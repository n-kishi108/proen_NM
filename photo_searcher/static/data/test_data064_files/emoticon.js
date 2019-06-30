Emoticon = {
    icons: [
        'sun','cloud','rain','snow','thunder','typhoon','mist','sprinkle','aries','taurus',
        'gemini','cancer','leo','virgo','libra','scorpius','sagittarius','capricornus','aquarius','pisces',
        'sports','baseball','golf','tennis','soccer','ski','basketball','motorsports','pocketbell','train',
        'subway','bullettrain','car','rvcar','bus','ship','airplane','house','building','postoffice',
        'hospital','bank','atm','hotel','24hours','gasstation','parking','signaler','toilet','restaurant',
        'cafe','bar','beer','fastfood','boutique','hairsalon','karaoke','movie','upwardright','carouselpony',
        'music','art','drama','event','ticket','smoking','nosmoking','camera','bag','book',
        'ribbon','present','birthday','telephone','mobilephone','memo','tv','game','cd','heart',
        'spade','diamond','club','eye','ear','rock','scissors','paper','downwardright','upwardleft',
        'foot','shoe','eyeglass','wheelchair','newmoon','moon1','moon2','moon3','fullmoon','dog',
        'cat','yacht','xmas','downwardleft','phoneto','mailto','faxto','info01','info02','mail',
        'by-d','d-point','yen','free','id','key','enter','clear','search','new',
        'flag','freedial','sharp','mobaq','one','two','three','four','five','six',
        'seven','eight','nine','zero','ok','heart01','heart02','heart03','heart04','happy01',
        'angry','despair','sad','wobbly','up','note','spa','cute','kissmark','shine',
        'flair','annoy','punch','bomb','notes','down','sleepy','sign01','sign02','sign03',
        'impact','sweat01','sweat02','dash','sign04','sign05','slate','pouch','pen','shadow',
        'chair','night','soon','on','end','clock','appli01','appli02','t-shirt','moneybag',
        'rouge','denim','snowboard','bell','door','dollar','pc','loveletter','wrench','pencil',
        'crown','ring','sandclock','bicycle','japanesetea','watch','think','confident','coldsweats01','coldsweats02',
        'pout','gawk','lovely','good','bleah','wink','happy02','bearing','catface','crying',
        'weep','ng','clip','copyright','tm','run','secret','recycle','r-mark','danger',
        'ban','empty','pass','full','leftright','updown','school','wave','fuji','clover',
        'cherry','tulip','banana','apple','bud','maple','cherryblossom','riceball','cake','bottle',
        'noodle','bread','snail','chick','penguin','fish','delicious','smile','horse','pig',
        'wine','shock'
    ],

    staticURI: StaticURI || '/.shared/',

    is_gecko: (navigator.product == "Gecko"
                  && !navigator.userAgent.toLowerCase().match(/(khtml|camino)/)),
    is_ie6: navigator.userAgent.toLowerCase().match(/msie 6\.\d/),

    replace: function(toMode, text) {
        switch (toMode) {
        case "wysiwyg":
            return text.replace(/\[E:([\w\-]+)\]/g,
                                function(str, name) {
                                    return Emoticon.Icon.getHTML(name);
                                });
        case "textmode":
            return text.replace(/<img [^>]*?class=\"emoticon ([\w\-]+)\".*?\/>/g,
                                function(str, key) {
                                    return '[E:' + key + ']';
                                });
        }
        return '';
    }
};

if (typeof(TC) == 'undefined') {
    document.write('<script type="text/javascript" src="/.shared/js/tc.js"></script>');
    document.write('<script type="text/javascript" src="/.shared/js/tc/window.js"></script>');
}

Emoticon.Pallet = {
    className: 'emoticon-pallet',
    style: {
        position: 'absolute',
        zIndex: 5,
        backgroundColor: '#fff',
        border: '1px solid #ccc'
    },

    palletImageURI: Emoticon.staticURI + 'images/emoticons.gif',
    captionText: 'For continuous input, Shift + Click.',

    initialize: function() {
        if (this.window) return;
        var pallet = this.createPallet();
        var w = new TC.Window();
        w.quick = true;
        w.setStyle(this.style);
        w.element.className = this.className;
        // If IE6.x, insert an empty iframe behind emoticon pallet
        // to avoid to overwrite pallet with windows control objects.
        if (Emoticon.is_ie6) {
            var iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.zIndex   = -1;
            iframe.width       = '400px';
            iframe.height      = '280px';
            iframe.scrolling   = 'no';
            iframe.frameBorder = 0;
            iframe.src         = 'javascript:false;';
            w.element.appendChild(iframe);
        }
        w.element.appendChild(pallet);
        w.attach();
        this.window = w;
    },

    createPallet: function() {
        var self = this;
        this.insertCallback       = function(evt) { return self.insert(evt) };
        this.resizeWindowCallback = function(evt) { return self.moveWindow(evt) };

        var container = document.createElement("div");
        container.className = 'emoticon-pallet-container';
        container.innerHTML = this.captionText;
        var div = document.createElement("div");
        div.className = 'emoticon-pallet-content';
        for (var i = 0; i < Emoticon.icons.length; i++) {
            var icon = Emoticon.Icon.create(Emoticon.icons[i], this.insertCallback);
            div.appendChild(icon);
        }
        container.appendChild(div);

        TC.setStyle(container,
                    { margin: 0, padding: 0,
                      width: '400px',
                      textAlign: 'center',
                      fontSize:'10px',
                      fontFamily: 'sans-serif',
                      color: '#000000',
                      backgroundColor: '#dedede'
                    });
        TC.setStyle(div,
                    { margin: 0, padding: 0,
                      width: '400px',
                      height: '260px',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: '#fff'
                    });
        TC.setStyle(div, { backgroundImage: 'url(' + this.palletImageURI + ')' });

        return container;
    },

    open: function(editor, button) {
        this.initialize();

        this._editor = editor;
        this.window.show();

        if (editor['event']) {
            button = editor.event.target || editor.event.srcElement;
        }
        var pos = TC.getAbsolutePosition(button);
        this.ox = this.x = pos.left;
        this.window.element.style.left = pos.left + "px";
        this.window.element.style.top  = pos.top  + "px";
        this.moveWindow();

        TC.attachEvent(window, 'resize', this.resizeWindowCallback);
    },

    insert: function(evt) {
        evt = evt || event;
        var emoticon  = evt.target || evt.srcElement;
        if (!emoticon) return;

        if (!evt.shiftKey) {
            TC.detachEvent(window, 'resize', this.resizeWindowCallback);
            this.window.hide();
        }

        var editor = this._editor;
        var name   = emoticon.className.match(/^emoticon ([\w\-]+)/) && RegExp.$1;
        if (!name) return;
        if (editor._editMode == "wysiwyg") {
            var html = Emoticon.Icon.getHTML(name);
            editor.focusEditor();
            Emoticon.is_gecko
                ? editor.execCommand('insertHTML', false, html)
                : editor.insertHTML(html)
                ;
        }
        else {
            var plane = '[E:' + name + ']';
            var e = editor._textArea || editor;
            if (document.selection) {
                e.focus();
                document.selection.createRange().text = plane;
            }
            else if (e['selectionStart']) {
                var length = e.textLength;
                var start  = e.selectionStart;
                var end    = e.selectionEnd;
                e.value = e.value.substring(0, start) + plane + e.value.substr(end, length);
                e.setSelectionRange(start + plane.length, start + plane.length);
            }
            else {
                e.value = e.value + plane;
            }
        }

        return TC.stopEvent(evt);
    },

    moveWindow: function(evt) {
        if (!this.window.visible) {
            TC.detachEvent(window, 'resize', this.resizeWindowCallback);
            return;
        }
        if (this.x < this.ox) this.x = this.ox;
        if (this.x + 420 > document.documentElement.clientWidth) {
            this.x = document.documentElement.clientWidth - 420;
            if (this.x < 2) this.x = 2;
        }
        this.window.element.style.left = this.x + 'px';
    }
};

Emoticon.Icon = {
    style: {
        display:    'block',
        position:   'relative',
        styleFloat: 'left',
        cssFloat:   'left',
        margin:     0,
        border:     '1px solid #fff',
        padding:    0,
        width:      '18px',
        height:     '18px'
    },

    getHTML: function(name) {
        return '<img class="emoticon ' + name + '" src="' + Emoticon.staticURI + 'images/emoticon/' + name + '.gif" alt="' + name + '" style="border:0;" />';
    },

    mouseOver: function() { this.style.border = '1px solid #00f' },
    mouseOut:  function() { this.style.border = '1px solid #fff' },

    element: null,

    create: function(name, insertCallback) {
        var a;
        if (this.element) {
            a = this.element.cloneNode(true);
        }
        else {
            a = document.createElement('a');
            a.appendChild(document.createTextNode(' '));
            a.href = "javascript:void(0)";
            TC.setStyle(a, this.style);
            this.element = a;
        }
        a.className   = 'emoticon ' + name;
        a.title       = name;
        a.onclick     = insertCallback;
        a.onmouseover = this.mouseOver;
        a.onmouseout  = this.mouseOut;
        return a;
    }
};

// preloading emoticon pallet image for IE6.x
if (Emoticon.is_ie6) {
    new Image().src = Emoticon.Pallet.palletImageURI;
}
