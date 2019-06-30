if (typeof Hatena == 'undefined')
    var Hatena = {};

if (typeof Hatena.Fotolife == 'undefined')
    Hatena.Fotolife = {};

if (typeof Hatena.Fotolife.FavoriteEdit == 'undefined')
    Hatena.Fotolife.FavoriteEdit = {};

Hatena.Fotolife.FavoriteEdit = new Ten.Class({
    initialize: function(el, username) {
        this.anchor   = el;
        this.username = username;
        this.isFollow = this.anchor.className.indexOf('following') < 0 ? 0 : 1;
        this.loadingIcon = this.anchor.parentNode.appendChild(
            new Ten.Element('span', { className: 'loadingicon', style: { display: 'none' } },
                new Ten.Element('img', {
                    style: { margin: '0 5px 0 0' },
                    src: '/images/loading.gif'
                }),
                '保存中...'
            )
        );
    },
    init: function(el, username) {
        new Ten.Observer(el, 'onclick', function(e) {
            e.stop();
            var favoriteEdit = new Hatena.Fotolife.FavoriteEdit(el, username);
            favoriteEdit.toggle();
        });
    }
}, {
    toggle: function() {
        this.loadingIcon.style.display = 'inline-block';
        this.anchor.style.display = 'none';

        var url = 'http://f.hatena.ne.jp/' + this.username + '/follow/edit';
        new Ten.XHR(url, {
            method: 'POST',
            data: {
                update: this.isFollow ? 'unfollow' : 'follow',
                mode : "enter",
                name: this.username,
                rkm : Hatena.Visitor.RKM
            }
        }, this, 'onComplete');
    },
    onComplete: function() {
        this.isFollow = Math.abs( this.isFollow - 1 );
        if ( !this.isFollow ) {
            this.anchor.className = 'follow-btn';
            this.anchor.innerHTML = 'お気に入りに追加';
        } else {
            this.anchor.className = 'follow-btn following';
            this.anchor.innerHTML = 'お気に入りから解除';
        }

        this.loadingIcon.style.display = 'none';
        this.anchor.style.display = 'inline-block';
    }
});
