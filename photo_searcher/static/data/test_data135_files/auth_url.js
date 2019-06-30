if (typeof Hatena == 'undefined') Hatena = {};
if (typeof Hatena.Fotolife == 'undefined') Hatena.Fotolife = {};

Hatena.Fotolife.AuthUrlWindow = new Ten.Class({
    base: [Ten.SubWindow],
    style: {
        margin: '0 0 0 0',
        padding: '0 0 0 0',
        width: '350px',
        height: '60px',
        backgroundColor: '#f3f3f3'
    },
    handleStyle: {
        margin: '0 0 0 0',
        padding: '0 0 0 0',
        position: 'absolute',
        top: '0px',
        left: '0px',
        backgroundColor: '#f3f3f3',
        borderBottom: 'none',
        width: '100%',
        height: '0px'
    },
    containerStyle: {
        position: 'relative',
        zIndex: 100,
        margin: '10px 0 0 0',
        padding: '0 0 0 0'
    },
    closeButtonStyle: {
        position: 'absolute',
        zIndex: 200,
        top: '8px',
        right: '10px',
        cursor: 'pointer'
    },
    draggable: false
},{
    hide: function(){
        this.SUPER.hide.call(this);
        var flvplayer = document.getElementById('flvplayer');
        if (flvplayer)
            flvplayer.style.marginTop = '0px'; 
    }    
});

Hatena.Fotolife.AuthUrlKey = new Ten.Class({
    initialize: function(e) {
        this.element = document.getElementById('authurllink');
        if (! this.element) return;
        this.window = new Hatena.Fotolife.AuthUrlWindow;
        new Ten.Observer(this.element, 'onclick', this, 'showWindow');
    }
},{
    showWindow: function(e) {
        e.stop();
        var pos = Ten.Geometry.getElementPosition(this.element);
        pos.x -= 350 - this.element.offsetWidth;
        pos.y += this.element.offsetHeight + 4;

        if(! this.form) {
            this.form = Ten.Element(
                'form',
                {},
                ''
            );
            var div = Ten.Element(
                'div',
                {
                    style: {
                        textAlign: 'left',
                        marginLeft: '8px'
                    }
                },
                ''
            );
            var pStyle = {
                margin: 0,
                border: 0,
                fontSize: '80%'
            };
            var p = Ten.Element('p'
                ,{style: pStyle }
                ,(Hatena.Fotolife.AuthUrl.match(/\?key=\w*$/))? 'この認証鍵付きのリンクで写真を友人と共有できます' : 'このリンクをメールに貼り付けて写真を共有できます'
            );
            var inputStyle = {
                marginTop: '4px',
                marginBottom: '4px',
                width: '330px'
            }
            this.input = Ten.Element(
                'input',
                {
                    type:'text',
                    value: Hatena.Fotolife.AuthUrl,
                    style: inputStyle
                }
            );
            new Ten.Observer(this.input, 'onclick', this, 'selectUrl');
            div.appendChild(p);
            div.appendChild(this.input);
            this.windowMarginTopForMovie = '45px';

            var hideFoto = document.getElementById('foto-for-html-tag');
            if(!Hatena.Fotolife.AuthUrl.match(/\?key=\w*$/) && Ten.DOM.getElementsByClassName('foto-body').length && hideFoto){
                var hideImage = hideFoto.getElementsByTagName('img')[0];
                var fotolifeImage = new Hatena.Fotolife.FotoImage(hideImage);
                var itemName = (fotolifeImage.ext() == 'flv')? '動画':'写真';
                var pForHtml = Ten.Element('p', {style: pStyle}, 'このHTMLタグで' + itemName + 'をブログに貼ることができます');
                var textareaStyle = {
                    height : '50px',
                    marginTop : '4px',
                    marginBottom : '4px',
                    width: '330px',
                    fontSize : '80%',
                    fontFamily : '"Arial",sans-serif'
                };
                this.textarea = Ten.Element('textarea', {style:textareaStyle}, fotolifeImage.htmlTag());
                new Ten.Observer(this.textarea, 'onclick', this, 'selectHtmlTag');
                div.appendChild(pForHtml);
                div.appendChild(this.textarea);
                this.window.window.style.height = '135px';
                this.windowMarginTopForMovie = '120px';
            }

            this.form.appendChild(div);
            this.window.container.appendChild(this.form);
        }
        var flvplayer = document.getElementById('flvplayer');
        if(flvplayer)  flvplayer.style.marginTop = this.windowMarginTopForMovie;
        this.window.show(pos);
    },
    selectUrl: function(e) {
        if (! this.input) return;
        this.input.select();
    },
    selectHtmlTag: function(e) {
        if (! this.textarea) return;
        this.textarea.select();
    }
});

Ten.DOM.addEventListener('DOMContentLoaded', function() {
     new Hatena.Fotolife.AuthUrlKey;
});
