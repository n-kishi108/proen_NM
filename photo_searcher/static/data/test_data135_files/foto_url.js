if (typeof Hatena == 'undefined') Hatena = {};
if (typeof Hatena.Fotolife == 'undefined') Hatena.Fotolife = {};

Hatena.Fotolife.FotoUrlWindow = new Ten.Class({
    base: [Ten.SubWindow],
    style: {
        margin: '0 0 0 291px',
        padding: '0',
        width: '410px',
        height: '240px',
        backgroundColor: '#fff'
    },
    containerStyle: {
        position: 'relative',
        margin: '34px 0 0 0',
        padding: '0'
    }
/*
    style: {
        margin: '0',
        padding: '0',
        width: '350px',
        height: '224px',
        backgroundColor: '#fff'
    },
    handleStyle: {
        margin: '0',
        padding: '0',
        position: 'absolute',
        top: '0px',
        left: '0px',
        backgroundColor: '#fff',
        borderBottom: 'none',
        width: '100%',
        height: '0px'
    },
    containerStyle: {
        position: 'relative',
        zIndex: 100,
        margin: '10px 0 0 0',
        padding: '0'
    },
    closeButtonStyle: {
        position: 'absolute',
        zIndex: 200,
        top: '8px',
        right: '10px',
        cursor: 'pointer'
    },
    draggable: false
*/
});

Hatena.Fotolife.FotoImageList = new Ten.Class({
    initialize: function() {
        var li = new Ten.Selector('li.selected').getElements();
        this.images = [];
        if (li.length > 0){
            for (var i=0; i < li.length; i++) {
                var img = li[i].getElementsByTagName('img')[0];
                this.images[i] = new Hatena.Fotolife.FotoImage(img, i);
            }
        }
    }
},{
    htmlTag: function() {
        var tag = '';
        for (var i in this.images) {
            var img = this.images[i];
            tag += img.htmlTag() + '\n';
        }
        return tag;
    },
    hatenaSyntax: function() {
        var syntax = '';
        for (var i in this.images) {
            var img = this.images[i];
            syntax += img.hatenaSyntax() + '\n';
        }
        return syntax;
    }
});

Hatena.Fotolife.FotoImage = new Ten.Class({
    initialize: function(image, index) {
        this.image = image;
        this.index = index;
    }
},{
    date: function() {
        return this.image.id.match(/([0-9]{8})/)[0];
    },
    id: function() {
        return this.image.id.match(/([0-9]{14})/)[0];
    },
    ext: function() {
        return this.image.className.match(/(jpg|png|gif|flv)/)[0];
    },
    e: function() {
        return this.ext().substr(0,1);
    },
    imageUrl: function() {
        var name = Hatena.Author.name || Hatena.Author;
        var initial = name.substr(0,1);
        return 'http://img.f.hatena.ne.jp/images/fotolife/' + initial + '/' + name + '/' + this.date() + '/' + this.id() + '.' + this.ext();
    },
    pageUrl: function() {
        var name = Hatena.Author.name || Hatena.Author;
        var initial = name.substr(0,1);
        return 'http://f.hatena.ne.jp/' + name + '/' + this.id();
    },
    hatenaSyntax: function() {
        var type = (this.ext() == 'flv')? 'movie' : 'image';
        return 'f:id:' + Hatena.Author + ':' + this.id() + this.e() + ':' + type;
    },
    htmlTag: function() {
        if(this.ext() == 'flv') {
            return this.objTag();
        } else {
            return '<a href="' + this.pageUrl() + '">' + this.imgTag() + '</a>';
        }
    },
    imgTag: function() {
        return '<img src="' + this.imageUrl() + '" alt="' + this.image.alt + '">';
    },
    objTag: function() {
        var name = Hatena.Author.name || Hatena.Author;
        return '<object data="http://f.hatena.ne.jp/tools/flvplayer_s.swf" type="application/x-shockwave-flash" width="320" height="276">'
            + '<param name="movie" value="http://f.hatena.ne.jp/tools/flvplayer_s.swf"></param>'
            + '<param name="FlashVars" value="fotoid=' + this.id() + '&user=' + name + '"></param>'
            + '<param name="wmode" value="transparent"></param>'
            + '</object>';
    }
});

Hatena.Fotolife.FotoUrl = new Ten.Class({
    initialize: function() {
        this.window = new Hatena.Fotolife.FotoUrlWindow;
        var tb = document.getElementById('map-button-top') || document.getElementById('delete-button-top');
        var bb = document.getElementById('delete-button-bottom');
        if (tb) {
            this.topButton = Ten.Element('input', {
                value: 'ブログに貼り付ける',
                name: 'showfotourl',
                type: 'button',
                style: { marginLeft: ''}
            });
            this.topButton.setAttribute('class', 'showfotourl-btn');
            Ten.DOM.insertAfter(this.topButton, tb);
            new Ten.Observer(this.topButton, 'onclick', this, 'showTopWindow');
        }
        if (bb) {
            this.bottomButton = Ten.Element('input', {
                value: 'ブログに貼り付ける',
                name: 'showfotourl',
                type: 'button',
                style: { marginLeft: '1em'}
            });
            this.bottomButton.setAttribute('class', 'showfotourl-btn');
            Ten.DOM.insertAfter(this.bottomButton, bb);
            new Ten.Observer(this.bottomButton, 'onclick', this, 'showBottomWindow');
        }
    }
},{
    showTopWindow: function(e){
        this.showWindow(this.topButton);
        e.stop();
    },
    showBottomWindow: function(e){
        this.showWindow(this.bottomButton);
        e.stop();
    },
    showWindow: function(element) {
        var pos = Ten.Geometry.getElementPosition(element);
        pos.x -= 410 - element.offsetWidth;
        pos.y += element.offsetHeight + 4;
        this.window.container.innerHTML = '';
        var images = new Hatena.Fotolife.FotoImageList;
        var tag = Ten.Element(
            'textarea',
            { rows: 5, style: { fontSize: '90%', height: '5em', width: '380px', padding: '2px', backgroundColor: '#eee' } },
            images.htmlTag()
        );
        var syntax = Ten.Element(
            'textarea',
            { rows: 5, style: { fontSize: '90%', height: '5em', width: '380px', padding: '2px', backgroundColor: '#eee' } },
            images.hatenaSyntax()
        );
        var form = Ten.Element('form', {},
           Ten.Element('dl', { style: { textAlign: 'left', marginLeft: '12px', padding: '0' } },
               Ten.Element('dt', { style: { margin: '0', padding: '0', fontSize: '80%' } }, 'HTMLタグ'),
               Ten.Element('dd', { style: { margin: '0', padding: '0' } }, tag),
               Ten.Element('dt', { style: { margin: '4px 0 0 0', padding: '0', fontSize: '80%' } }, 'はてな記法'),
               Ten.Element('dd', { style: { margin: '0', padding: '0' } }, syntax)
           )
        );
        new Ten.Observer(tag, 'onclick', [function() {tag.select()}], '0');
        new Ten.Observer(syntax, 'onclick', [function() {syntax.select()}], '0');
        this.window.container.appendChild(form);
        this.window.show(pos);
    }
});

Ten.DOM.addEventListener('DOMContentLoaded', function() {
     new Hatena.Fotolife.FotoUrl;
});
