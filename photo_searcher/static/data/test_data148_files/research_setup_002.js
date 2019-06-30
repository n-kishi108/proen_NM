/* ld research */

function LDReSearch() {
    this.initialize.apply(this, arguments);
}

LDReSearch.prototype = {
    initialize: function(args) {
        this.initializeFilter(args);
        this.result = {};
        this.result.search_url = "http://search.livedoor.com/search/";
        this.result.search_param_client_id = "c";
        this.result.search_param_words = "q";
        this.result.search_param_input_enc = "ie";
        this.result.search_param_engine_name = "se";
        this.result.blogsearch_url = "http://search.livedoor.com/search/";
        if (args) {
            this.referrer = args.referrer;
            this.placeholder_id = args.placeholder_id;
            if (args.search_url) {
                this.result.search_url = args.search_url;
            }
            if (args.search_param_client_id) {
                this.result.search_param_client_id = args.search_param_client_id;
            }
            if (args.search_param_words) {
                this.result.search_param_words = args.search_param_words;
            }
            if (args.search_param_input_enc) {
                this.result.search_param_input_enc = args.search_param_input_enc;
            }
            if (args.search_param_engine_name) {
                this.result.search_param_engine_name = args.search_param_engine_name;
            }
            if (args.blogsearch_url) {
                this.result.blogsearch_url = args.blogsearch_url;
            }
            if (args.client_id) {
                this.result.client_id = args.client_id;
            }
            if (args.search_id) {
                this.result.client_id = args.search_id;
            }
        }
    },

    initializeFilter: function(args) {
    },

    getSearchEngineList: function() {
        var list = [
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
                name: 'bing',
                regexp: '^http://www\.bing\.com/search',
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
            }
        ];
        return list;
    },

    findSearchEngine: function(list, referrer) {
        for (var i = 0; i < list.length; i++) {
            if (referrer.match(list[i].regexp)) {
                return list[i];
            }
        }
        return;
    },

    getResult: function() {
        if (this.result.done) {
            return this.result;
        }
        var referrer = this._getReferrer();
        if (!referrer) return;
        var list = this.getSearchEngineList();
        var engine = this.findSearchEngine(list, referrer);
        if (!engine) return;
        var params = this._parseQuery(referrer);
        var query = params[engine.query];
        var input_enc = params[engine.input_enc_key] || engine.input_enc || 'utf-8';
        input_enc = input_enc.toLowerCase();
        if (input_enc != 'utf8' && input_enc != 'utf-8') return;
        this.result.engine_name = engine.name;
        this.result.input_enc = input_enc;
        this.result.query = query;
        this.result.escaped_query = this._escape(query); 
        this.result.input_enc = input_enc;
        if (engine.type == 'site') {
            this.result.search_link_url = [
                this.result.search_url,
                '?' + this.result.search_param_client_id + '=' + this.result.client_id,
                '&' + this.result.search_param_input_enc + '=' + input_enc,
                '&' + this.result.search_param_words + '=' + encodeURIComponent(query),
                '&' + this.result.search_param_engine_name + '=' + engine.name
            ].join('');
        } else {
            return;
        }
        this.result.done = true;
        return this.result;
    },

    getTestFormatter: function() {
        return function(p) {
            return [
                '<dl>',
                '<dd>p.search_url=' + p.search_url + '</dd>',
                '<dd>p.client_id=' + p.client_id + '</dd>',
                '<dd>p.query=' + p.query + '</dd>',
                '</dl>',
                '<form method="GET" action="' + p.search_url + '">',
                '<input type="hidden" name="' + p.search_param_client_id + '" value="' + p.client_id +'">',
                '<input type="hidden" name="' + p.search_param_input_enc + '" value="utf-8">',
                '<input type="text" name="' + p.search_param_words + '" value="' + p.escaped_query + '">',
                '<input type="submit" value="GO"></form>'
            ].join('');
        };
    },

    show: function(formatter) {
        var placeholder = document.getElementById(this.placeholder_id);
        if (!placeholder) {
            alert('placeholder is not found.');
            return;
        }
        var p = this.getResult();
        if (p) {
            placeholder.innerHTML = formatter(p);
        }
    },

    writeWithFormatter: function(formatter) {
        var p = this.getResult();
        if (p) {
            formatter(p);
        }
    },

    _escape: function(str) {
        return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },

    _parseQuery: function(str) {
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

    _getReferrer: function() {
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

    // End of class
    endOfClass: null
}

