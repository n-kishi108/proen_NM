var detail;

//detailbox class in "mootools" syntax
var detailbox = new Class({
    div: false,
    drag: false,
    request: false,
    shader: false,
    loadicon: false,
    oldbrowser: (Browser.Engine.trident && Browser.Engine.version <= 4),
    initialize: function() {
        this.div = new Element( 'div', { 'id'     : 'detailw',
                                         'styles' : { 'position'         : 'absolute',
                                                      'left'             : '0px',
                                                      'top'              : '0px',
                                                      'background-color' : 'transparent',
                                                      'z-index'          : 200 },
                                          'morph' : { 'duration'         : 100,
                                                      'link'             : 'cancel' } } );

        this.request = new Request.HTML({ 'url':'/digitalguide/detail.php',
                                          'method':'get',
                                          'onSuccess'  : this.success.bind(this),
                                          'onFailure'  : this.failure.bind(this)
                                         });

        this.shader = new Element( 'div', { 'styles'  : { 'position'         : 'absolute',
                                                          'background-color' : 'black',
                                                          'opacity'          : 0,
                                                          'z-index'          : 100,
                                                          'left'             : 0,
                                                          'top'              : 0,
                                                          'overflow'         : 'auto' },

                                            'events'  : { 'click' : this.hide.bind(this) } } );
        this.drag = new Drag.Move(this.div);

        $$('body')[0].grab(this.div);
        $$('body')[0].grab(this.shader);

        this.loadicon = new Asset.image('/digitalguide/img/ajax-loader.gif');
    },
    show: function(id) {
        this.request.send('id='+id);
        this.shader.setStyle('width',  $$('body')[0].getScrollSize().x);
        this.shader.setStyle('height', $$('body')[0].getScrollSize().y);
        this.shader.fade(0.5);
        if(Browser.Engine.trident && Browser.Engine.version <= 4) $$('select').setStyle('visibility', 'hidden');
        this.div.set('html', '');
        this.div.grab(this.loadicon);
        this.div.setStyle('background-color', 'transparent');
        this.div.setStyle('opacity', 1);

        this.center();
    },
    hide: function() {
        this.div.fade(0);
        if(this.oldbrowser)
            this.shader.get('tween').start('opacity', 0).chain(function(){$$('select').setStyle('visibility', 'visible')});
        else
            this.shader.fade(0);
    },
    success: function(tree, elements, html, js) {
        this.div.setStyle('background-color', 'white');
        this.div.set('html', html);
        this.center();

        this.drag.detach();
        this.drag = new Drag.Move(this.div, {handle: $('detail-draghandle'), container: this.shader});
    },
    failure: function(xhr) {
        this.div.set('html', '<div style="border:2px solid #FF5555;padding:10px;">エラーが生じました。<br>('+xhr.status+' '+xhr.statusText+')<br><br><a style="cursor:pointer" onclick="javascript:detail.hide()">閉じる</a></div>');
        this.center();
        this.div.setStyle('opacity', 1);
    },
    center: function() {
        var scroll = $$('body')[0].getScroll();
        var vpsize = $$('body')[0].getSize();
        var size   = this.div.getSize();

        var desc = $('desccontainer');

        if(desc) {
            var descsize = desc.getSize();
            if(size.y > vpsize.y - 40 && size.y > 100) {
                desc.setStyle('overflow-x', 'auto');
                desc.setStyle('overflow-y', 'scroll');
                desc.setStyle('height', vpsize.y + descsize.y - size.y - 40);
                size   = this.div.getSize();
            }
        }

        this.div.setStyle('left', Math.max(scroll.x + ((vpsize.x - size.x) / 2), scroll.x));
        this.div.setStyle('top' , Math.max(scroll.y + ((vpsize.y - size.y) / 2), scroll.y));
        oldscroll = scroll;
    }
});

window.addEvent('domready', function() {
    detail = new detailbox();
});