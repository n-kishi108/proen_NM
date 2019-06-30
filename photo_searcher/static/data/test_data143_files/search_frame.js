/* version Fri Dec 19 13:53:25 JST 2008 */
var loadedSearchFrame;

function JlistingSearchReSearch() {
    this.initialize.apply(this, arguments);
}

JlistingSearchReSearch.prototype = {
    initialize: function(args) {
        this.initializeFilter(args);
        this.search_id  = args.search_id;
        this.iframe_id  = args.iframe_id;
        this.font_color = args.font_color;
        this.referrer   = args.referrer;
        this.theme      = args.theme;
        this.image_base_url = args.image_base_url || 'http://seesaa.search.jlisting.jp/research/img/default/';
        this.has_query  = false;
        this.search_url = "http://seesaa.search.jlisting.jp/search/"; 
        this.blog_search_url = "http://seesaa.search.jlisting.jp/search/"; 
        this.search_link_url = ""; 
        this.iframe_style = args.iframe_style || {};
        this.search_option = args.search_option || {};
        this.adsense_ids = ( typeof args.adsense_ids == 'string' ? [args.adsense_ids] : args.adsense_ids || [] );
    },

    initializeFilter : function( args ) {
    },

    loadSearchedQuery : function( ) {
        var ref = this._getReferer();
        if(!ref) return;
        this.referrer = ref;
        var SearchEngineList = [
            {
                name: 'google',
                regexp: '^http://www\.google\.(co\.jp|com)',
                query: 'q',
                input_enc_key: 'ie',
                input_enc: '',
                type : 'site'
            },
            {
                name: 'yahoo',
                regexp: '^http://search\.yahoo\.(co\.jp|com)',
                query: 'p',
                input_enc_key: 'ei',
                input_enc: '',
                type : 'site'

            },
            {
                name: 'debug',
                regexp: '^http://localhost',
                query: 'q',
                input_enc_key: 'ienc',
                input_enc: '',
                type : 'site'

            },
            {
                name: 'msn',
                regexp: '^http://search\.(msn\.co\.jp|live\.com)/results\.aspx',
                query: 'q',
                input_enc_key: '',
                input_enc: 'utf-8',
                type : 'site'

            },
            {
                name: 'baidu',
                regexp: '^http://www\.baidu\.jp/s',
                query: 'wd',
                input_enc_key: 'ie',
                input_enc: '',
                type : 'site'
            },
            {
                name: 'goo',
                regexp: '^http://search\.goo\.ne\.jp/web\.jsp',
                query: 'MT',
                input_enc_key: 'IE',
                input_enc: 'utf-8',
                type : 'site'
            },
            {
                name: 'nifty',
                regexp: '^http://search\.nifty\.com/websearch/search',
                query: 'q',
                input_enc_key: '',
                input_enc: 'utf-8',
                type : 'site'
            },
            {
                name: 'infoseek',
                regexp: '^http://search\.www\.infoseek\.co\.jp/Web',
                query: 'qt',
                input_enc_key: '',
                input_enc: 'utf-8',
                type : 'site'
            }/*,
            {
                name: 'fc2',
                regexp: '^http://blogsearch\.fc2\.com/',
                query: 't',
                input_enc_key: '',
                input_enc: 'utf-8',
                type : 'blog'
            },
            {
                name: 'baidu',
                regexp: '^http://blog\.baidu\.jp/s',
                query: 'wd',
                input_enc_key: '',
                input_enc: 'utf-8',
                type : 'blog'
            },
            {
                name: 'ask',
                regexp: '^http://ask\.jp/blog\.asp',
                query: 'q',
                input_enc_key: '',
                input_enc: 'utf-8',
                type : 'blog'
            },
            {
                name: 'nifty',
                regexp: '^http://search\.nifty\.com/blogsearch/search',
                query: 'q',
                input_enc_key: '',
                input_enc: 'utf-8',
                type : 'blog'
            },
            {
                name: 'google',
                regexp: '^http://blogsearch\.google\.co\.jp/blogsearch',
                query: 'q',
                input_enc_key: 'ie',
                input_enc: 'utf-8',
                type : 'blog'
            },
            {
                name: 'yahoo',
                regexp: '^http://blog-search\.yahoo.co\.jp/search',
                query: 'p',
                input_enc_key: 'ei',
                input_enc: 'utf-8',
                type : 'blog'
            }*/
        ];
        for(var i = 0; i < SearchEngineList.length; i++) {
            if( ref.match(SearchEngineList[i].regexp) ) {
                var params = this._parseQuery(ref);
                var query  = params[SearchEngineList[i].query];
                var input_enc = params[SearchEngineList[i].input_enc_key]
                          || SearchEngineList[i].input_enc
                          || 'utf-8';
                var engine_name = SearchEngineList[i].name;
                if (input_enc != 'utf-8' && input_enc != 'UTF-8') return; //utf-8 only
                this.query = query;
                this.has_query = true;
                this.escaped_query = this._escape(query); 
                this.input_enc = input_enc;
                this.engine_name = engine_name;
                if ( this.search_option["site"] ) {
                    query = 'site:' + this.search_option["site"] + ' ' + query;
                    delete this.search_option["site"];
                }
                if ( SearchEngineList[i].type == 'site') {
                    this.search_link_url = this.search_url + '?c=' + this.search_id + '&ie=' + input_enc + '&q=' + encodeURIComponent(query) + '&se=' + engine_name;
                    for ( var k in this.search_option ) {
                        this.search_link_url = this.search_link_url + '&' + k + '=' + encodeURIComponent(this.search_option[k]);
                    }
                } else {
                    this.search_link_url = this.blog_search_url + '?c=' + this.search_id + '&q=' + encodeURIComponent(query) + '&se=' + engine_name;
                }
            } 
        }
    },

    createSearchForm : function() {
        if ( !this.has_query ) return;
        if (!this.query || !this.input_enc || !this.engine_name ) return;
        var theme = this.theme ? this.theme + '/' :  '';
        var image_base_url = this.image_base_url  + theme ;
        var font_color = this.font_color || '#fff';
        var iframe_id = this.iframe_id || 'ld_research_frame';

	var iframe = document.createElement("iframe");
        iframe.frameBorder           = 0;
	iframe.id                    = iframe_id;
	iframe.allowTransparency     = 'true';
	iframe.style.zIndex          = ( this.iframe_style.zIndex || 2 );
	//	iframe.style.position        = ( this.iframe_style.position || 'absolute' );
	//	iframe.style.top             = ( this.iframe_style.top || '5px' );
	//      iframe.style.right           = ( this.iframe_style.right || '5px' );
        iframe.style.height          = ( this.iframe_style.height || '87px' );
        iframe.style.width           = ( this.iframe_style.width || '237px' );
        iframe.style.margin          = ( this.iframe_style.margin || 0 );
        iframe.style.scrolling       = ( this.iframe_style.scrolling || 'no' );
	document.getElementsByTagName("body")[0].appendChild(iframe);

        var iframedoc = document.all ? iframe.contentWindow.document : iframe.contentDocument;
        iframedoc.open();
        iframedoc.writeln('<?xml version="1.0" encoding="' + this.input_enc + '"?>'
                   + '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" '
                   + '"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'
                   + '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ja" lang="ja">'
                   + '<head>'
                   + '<meta http-equiv="Content-Type" content="text/html; charset='
                   + this.input_enc
                   + '" />'
                   + '<meta http-equiv="Content-Style-Type" content="text/css" />'
                   + '<meta http-equiv="Content-Script-Type" content="text/javascript" />'
                   + '<style type="text/css">'
                   + '* { margin: 0; padding: 0; }'
                   + 'html { position:absolute; top:0; left:0;}'
                   + 'body { font-weight: bold; background-color: transparent; position:absolute; top:0; left:0;}'
                   + 'a { text-decoration: none; position: relative; z-index: 4; }'
                   + 'a img { border: 0; }'
                   + 'div.searchFrame { width: 232px; height: 87px; word-break: break-all; word-wrap: break-word; overflow: hidden; background-image: url(' + image_base_url + 'frame.png); background-repeat: no-repeat; }'
                   + 'div.searchframe { background: none; position: absolute; }'
                   + 'div.searchframetrick { width: 232px; height: 87px; filter:Progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=crop,src=' + image_base_url + 'frame.png); background: none; position: absolute; top: 0px; left: 0px; }'
                   + 'a.help_btn { display: none; }'
                   + 'a.close_btn { position: absolute; right: 11px; top: 5px; z-index: 3; }'
                   + 'p.more { font-size: 14px; position: absolute; top: 14px; left: 15px; z-index: 1; }'
                   + 'p.more a { color: ' + font_color + ' }'

                   + 'a.re-search { display: block; position: relative; z-index: 2; width: 232px; height: 87px; text-align: center; text-decoration: none; color: #424242; }'
                   + 'a.re-search:hover { text-decoration: underline; color: #009; }'
                   + 'a.re-search span { display: block; padding: 5px 5px 5px 20px; margin: 29px 15px 0 5px; text-align: left; }'
                   + 'a.re-search span { background: #fff url(' + image_base_url + 'search.gif) no-repeat 0 5px; border-color: #46b1da; border: 1px solid #46b1da; -moz-border-radius: 4px;  -webkit-border-radius: 4px; }'
                   + '</style>'
                   + '</head>'

                   + '<body>'
                   + '<div class="searchFrameTrick"></div>'
                   + '<div class="searchFrame">'
                   + '<a href="http://helpguide.livedoor.com/help/search/qa/grp611#3866" class="help_btn" target="_parent"><img src="' + image_base_url + 'help.gif" width="17" height="16" /></a>'
                   + '<a href="javascript:void(0);" onclick="var d = parent.window.document; var search_frame = d.getElementById(\'' + iframe_id + '\'); search_frame.parentNode.removeChild(search_frame);"  class="close_btn"><img src="' + image_base_url + 'close.gif" width="17" height="16" /></a>'
                   + '<a href="' + this.search_link_url + '" target="_parent" class="re-search">'
                   + '<span>'
                   + this.query
                   + '</span>'
                   + '</a>'
                   + '</div>'
                   + '</body></html>' );
        iframedoc.close();

	var self = this;
	var hideFunc = function () {
	  var iframe = document.getElementById(iframe_id);
	  iframe.style.position = 'absolute';
	  iframe.style.top   = '0px';
	  iframe.style.right = '0px';
	}, hideSec = 10000;
	var hideTimer = setTimeout(hideFunc, hideSec);
	this._addListener(iframe, 'mouseover', function () { if(hideTimer) clearTimeout(hideTimer); });
	this._addListener(iframe, 'mouseout',  function () { hideTimer = setTimeout(hideFunc, hideSec);});
    },

    drawSearchFrame : function() {
        if ( !loadedSearchFrame ) {
            loadedSearchFrame = 1;
            var obj = this;
            this._addLoadEvent( function() {
                obj.createSearchForm();
            });
        }
     },

     _escape : function(str){
         return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
     },

    _parseQuery : function(str) {
        var params = new Object();
        if(typeof(str) == 'undefined') return params;
        if(str.indexOf('?', 0) > -1) str = str.split('?')[1];
        var pairs = str.split('&');
        for(var i = 0; i < pairs.length; i++){
            var pair = pairs[i].split("=");
            if(pair[0] != ''){
                var val = pair[1].replace(/\+/g, ' ');
                params[pair[0]] = decodeURIComponent(val);
            }
        }
        return params;
    },

    _getReferer : function() {
        if ( this.referrer ) {
            return this.referrer;
        }
        var d = document;
        var w = window;
        var ref = '';
        if(w.self == w.parent) {
            ref = d.referrer;
            if(!ref) return;
            if(d.parent && d.parent != undefined)
                ref = d.parent.referrer;
            if(ref.match(/^(undefined|unknown|bookmark)$/i))
                ref = '';
        }
        return ref;
    },

    _addLoadEvent: function(func) {
        if(typeof window.addEventListener == 'function'){
            window.addEventListener('load', func, false);
            return true;
        } else if(typeof window.attachEvent == 'object'){
            window.attachEvent('onload', func);
            return true;
        }
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                oldonload();
                func();
            };
        }
    },

    _addListener: function (ele, eType, fn, capture) {
      if(ele.addEventListener) {
        ele.addEventListener(eType, fn, (capture));
      }
      else if(ele.attachEvent) {
        ele.attachEvent('on' + eType, fn);
      }
    }

}

function jlistingSearchShowReSearchFrame( args ) {
    if ( !args && !args.search_id ){
        return;
    }
    var research = new JlistingSearchReSearch(args);
    research.loadSearchedQuery();
    research.has_query && research.drawSearchFrame();
}

document.write('<style type="text/css">');
document.write('#YOOPP { position: fixed; top: 0; right: 0px; }');
document.write('* html body { filter: expression(\'\'); }');
document.write('* html #YOOPP {');
document.write('position: absolute;');
document.write('top: expression(');
document.write(' document.documentElement && document.documentElement.scrollTop ||');
document.write(' document.body && body.scrollTop || 0');
document.write(' + 0 + \'px\'');
document.write(');');
document.write('right: expression(');
document.write(' document.documentElement && document.documentElement.scrollLeft ||');
document.write(' document.body && body.scrollRight || 0');
document.write(' + 0 + \'px\'');
document.write(');');
document.write('}');
document.write('</style>');

jlistingSearchShowReSearchFrame({
      search_id : 'seesaa_sl_rs',
      image_base_url: 'http://blog.seesaa.jp/js/jlisting/img/',
      iframe_id : 'YOOPP',
      iframe_style : {
      }
});

