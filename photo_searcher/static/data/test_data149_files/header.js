(function () {
    
    var hd = document.createElement('div');
    var str = '';
    
    //document.body.style.paddingTop = '21px';
    
    str += '<div id="header2" style="z-index:10001"><table cellspacing="0" class="blog-common-header" id="header">';
    str += '<tr>';
    str += '<th><span class="common-header-logo"><a href="http://www.livedoor.com/"><img height="17" width="43" alt="livedoor" src="http://parts.blog.livedoor.jp/img/user_blog/livedoor/logo_livedoor.gif" /></a><a href="http://blog.livedoor.com/"><img height="17" width="48" alt="livedoor Blog - ' + unescape('%u7121%u6599/%u6709%u6599%u30D6%u30ED%u30B0%u30B5%u30FC%u30D3%u30B9') + '" src="http://parts.blog.livedoor.jp/img/user_blog/livedoor/logo_blog.gif" /></a></span></th>';
    str += '<td class="catprbox"><span class="commopn-header-category">';
    if (typeof(ld_blog_vars) == 'object' && ld_blog_vars.blog_category) {
       for (var i = 0; i < ld_blog_vars.blog_category.hierarchy.length; i++) {
          if (i > 0) { str += ' &gt; ' }
          str += '<a href="' + ld_blog_vars.blog_category.hierarchy[i].permalink + '">' + ld_blog_vars.blog_category.hierarchy[i].name + '</a>';
       }
    }
    str += '</span></td>';
    str += '<td class="newstickerbox"><span class="common-header-pr"></span></td>';
    str += '<td class="pickuptheme">';
//        str += '<img alt="' + unescape('%u30AA%u30FC%u30B9%u30C8%u30E9%u30EA%u30A2%u3078%u884C%u3053%u3046%u2606%u30B8%u30A7%u30C3%u30C8%u30B9%u30BF%u30FC%u822A%u7A7A') + '" src="http://parts.blog.livedoor.jp/img/user_blog/livedoor/pickup.gif" /><a href="http://blogpark.jp/common_theme_pickup?id=194510">' + unescape('%u30AA%u30FC%u30B9%u30C8%u30E9%u30EA%u30A2%u3078%u884C%u3053%u3046%u2606%u30B8%u30A7%u30C3%u30C8%u30B9%u30BF%u30FC%u822A%u7A7A') + '</a>';
        str += '<a href="http://myyoutube.livedoor.com/">' + unescape('%u82B8%u80FD%u4EBA%u3068%u3042%u306A%u305F%u3092Youtube%u3067%u3064%u306A%u3050%uFF01') + '</a>';
    str += '</td>';
    str += '<td class="startblogbox">';
    str += '<form method="get" action="http://search.rd.livedoor.com/c/blog/">';
    str += '<input type="hidden" name="c" value="ld_blogjp_sb" />';
    str += '<input type="hidden" name="ie" value="' + (ld_blog_vars ? ld_blog_vars.charset : 'utf8')  + '" />';
    str += '<input type="text" id="header2_query" name="q" value="" class="text" />';
    str += '<input type="image" src="http://parts.blog.livedoor.jp/img/user_blog/livedoor/websearch.gif" value="' + unescape('%u30A6%u30A7%u30D6%u691C%u7D22') + '" />';
    str += '</form>';
    str += '</td>';
    str += '</tr>';
    str += '</table></div>';
    str += '<style type="text/css">';
    str += 'table#header{width:100%;height:20px !important;font-size:10px !important;font-family:"' + unescape('%uFF2D%uFF33%20%uFF30%u30B4%u30B7%u30C3%u30AF') + '",Arial,Helvetica !important;}';
    str += 'table#header a{text-decoration:none!important;}';
    str += 'table#header td{height:16px !important;}';
    str += 'table#header td.newstickerbox{width:97%;text-align:left;}';
    str += 'table#header td.startblogbox{width:1%;white-space:nowrap;padding: 0;}';
    str += 'table#header td.startblogbox img{margin-right:3px;border:0;vertical-align:middle;}';
    str += 'table#header td.startblogbox a.header-nav-livedoor{margin-right:5px;border-right:1px solid;padding-right:5px;}';
    str += 'table#header td.newstickerbox div{width:200px!important;height:14px !important;text-align:left !important;padding-left:10px;}';
    str += 'table#header td.catprbox{width:1%;white-space:nowrap;}';
    str += 'table#header td.catprbox span{margin-right:15px;}';
    str += 'table#header td.pickuptheme{width:1%;white-space:nowrap;}';
    str += 'table#header td.pickuptheme a{margin:0 5px;}';
    str += 'table#header th{width:1%;}';
    str += 'table#header th img{margin:0;}';
    str += 'table#header img{border:0;vertical-align:top;}';
    str += 'table#header form{margin:0 10px 0 0;padding:1px 0 0 0;}';
    str += 'table#header form input.text{width: 200px;}';
    str += 'table#header span.commopn-header-category{margin-right:20px;}';
    str += 'table#header span.common-header-logo{white-space: nowrap;margin: 0 20px 0 10px;zoom: 1;}';
    str += 'table#header input.text{vertical-align:top;background:#ffffd6 url(http://parts.blog.livedoor.jp/img/user_blog/livedoor/search_icon.gif) no-repeat 4px 1px;padding:0 5px 0 21px;border:1px solid #ccc;-moz-border-radius:2px;-webkit-border-radius:2px;margin-right:5px;}';
    str += 'table#header .highlight input.text{background:#ff5 url(http://parts.blog.livedoor.jp/img/user_blog/livedoor/search_icon.gif) no-repeat 4px 1px;}';
    str += '</style>';
    
    hd.innerHTML = str;

    document.body.appendChild(hd);
    
    var deleteCount = 0;
    var deleteOldHeader = function () {
        if (deleteCount++ > 0) return;
        var tables = document.getElementsByTagName("table");
        for(var i=0;  i<tables.length; i++) {
            if(tables[i].id == "header" && tables[i].parentNode.tagName == "BODY" && tables[i].parentNode.id != "header2") {
                tables[i].parentNode.removeChild(tables[i]);
                break;
            }
        }
        if (typeof(ld_blog_vars) == 'object') {
            ld_category_ad_encoding = ld_blog_vars.charset;
            if(ld_blog_vars.blog_category.id == 149 || ld_blog_vars.blog_category.permalink.match(/\/149\//)) {
                load_ads([
                    'http://app.click.livedoor.com/A-affiliate2/mobile?site=5&keyword=hs9001156&encoding=' + ld_category_ad_encoding + '&ord=' + (Math.random()*10000000000)
                ]);
            }
        }
    };
    
    if (navigator.userAgent.indexOf('AppleWebKit/') > -1) {
        var _interval = window.setInterval(function () {
            var st = document.readyState;
            if (st == 'complete' || st == 'loaded') {
                window.clearInterval(_interval);
                deleteOldHeader();
            }
        }, 100);
    } else if (window.attachEvent && !window.opera) {
        this.ie = 1;
        document.write('<script defer src="javascript:void(0)" onreadystatechange="if (document.readyState == \'complete\') livedoorHelp.setHelp();"></script>');
        window.attachEvent('onload', deleteOldHeader);
    } else {
        document.addEventListener("DOMContentLoaded", deleteOldHeader, false);
        window.addEventListener("load", deleteOldHeader, false);
    }
    
    var load_library_on_load = function (script_src, onload_callback_func) {
       var head = document.getElementsByTagName('head').item(0);
       var scr = document.createElement('script');
       scr.type = 'text/javascript';
       scr.onreadystatechange = function () {
          if (window.opera || this.readyState != 'loaded' || this.className == 'processed')
             return;
          this.className = 'processed';
          onload_callback_func();
       };
       scr.onload = function () {
          if (this.className == 'processed')
             return;
          this.className = 'processed';
          onload_callback_func();
       };
       if (scr.className == 'processed'){
          onload_callback_func();
       }
       scr.src = script_src;
       head.appendChild(scr);
       window.setTimeout(function(){
                            if (scr.className != 'processed')
                               onload_callback_func();
                         }, 300);
    };

    load_library_on_load(
       "http://parts.blog.livedoor.jp/js/research_setup.js",
       function () {
          var ldReSearch = new LDReSearch(
             {
                client_id: 'ld_blogjs_sl'
             }
          );

          var ldReSearchFormatter = function(p) {
             var hd = document.createElement('div');
             var str = [
                '<div id="ReSearchFormWrapper">',
                '<div id="ReSearchForm" style="position: relative;float: right;width: 232px;height: 100px;background: url(http://parts.blog.livedoor.jp/img/static/search_frame/blue/frame.png) no-repeat; word-break: break-all; word-wrap: break-word; overflow: hidden;">',
                '<a href="http://helpguide.livedoor.com/help/search/qa/grp611#3866" class="HelpBtn" style="display:none">',
                '<img src="http://parts.blog.livedoor.jp/img/static/search_frame/help.gif" width="17" height="16" border="0"/>',
                '</a>',
                '<a href="#" onclick="document.getElementById(\'ReSearchFormWrapper\').style.visibility = \'hidden\'" class="CloseBtn" style="position: absolute;right: 20px;top: 5px;">',
                '<img src="http://parts.blog.livedoor.jp/img/static/search_frame/blue/close.gif" width="17" height="16" border="0"/>',
                '</a>',
                '<a href="' + p.search_link_url + '" class="ReSearchLink" style="display: block;position: relative;z-index: 2;width: 232px;height: 87px;text-align: center;text-decoration: none;color: #424242;"><span style="display: block;padding: 5px 5px 5px 20px;margin: 29px 15px 0 5px;text-align: left;font-weight: bold;background: #fff url(http://parts.blog.livedoor.jp/img/static/search_frame/blue/search.gif) no-repeat 0 5px;border-color: #46b1da;border: 1px solid #46b1da;font-weight: bold; -moz-border-radius: 4px; -webkit-border-radius: 4px;">' + p.query + '</span></a>',
                '</div>',
                '</div>',
                '<style type="text/css">',
                '#ReSearchFormWrapper {',
                'position:fixed;',
                'right:3px;',
                'top:0;',
                'width:232px;',
                'height:100px;',
                'z-index:10001;',
                '}',
                '* html body { filter: expression(""); }',
                '* html #ReSearchFormWrapper {',
                'position: absolute;',
                'top: expression(',
                'document.documentElement && document.documentElement.scrollTop  ||',
                'document.body && body.scrollTop  || 0',
                '+ 0 + "px"',
                ');',
                'right: expression(',
                'document.documentElement && document.documentElement.scrollLeft ||',
                'document.body && body.scrollRight || 0',
                '+ 3 + "px"',
                ');',
                '}',
                '</style>',
             ].join('');

             hd.innerHTML = str;
             document.getElementById('header2').appendChild(hd);
          };
          ldReSearch.writeWithFormatter(ldReSearchFormatter);
       }
    );

    var call_jsonp = function (api_url, cb_func) {
        var uniq_name = 'ld_ads';
        var scr = document.createElement('script');
        scr.type = 'text/javascript';
        scr.charset = this.charset;
        scr.src = api_url + '&callback=' + uniq_name;
        scr.id = uniq_name;
        var obj = this;
        window[uniq_name] = function (json) {
            cb_func(json);
            var u_name = uniq_name;
            setTimeout(function() {
                obj.head.removeChild(document.getElementById(u_name));
                try{
                    window[u_name] = null;
                    delete window[u_name];
                } catch (e) {};
            }, 200);
        };
        
        obj.head = document.getElementsByTagName('head').item(0);
        setTimeout(function(){ obj.head.appendChild(scr); }, 100);
    };
    
    var load_ads = function (script_list) {
        call_jsonp(script_list.shift(), function (json) {
            if (!json) return;
            var element = document.createElement('div');
            element.id = "ld_header_ads";
            element.innerHTML = json.tag;
            document.getElementById('header2').appendChild(element);
        });
        return false;
    };
    
    var add_listener = (
       function() {
          if ( window.addEventListener ) {
             return function(target, type, func) {
                target.addEventListener(type, func, false);
                return true;
             };
          } else if( window.attachEvent ) {
             return function(target, type, func) {
                target.attachEvent("on"+type, func);
                return true;
             };
          } else {
             return function(target, type, func) {
                return false;
             };
          }
       })();
    
    add_listener(document, "mouseup",
       function(){
          var txt = '';
          if (window.getSelection) { txt = window.getSelection(); }
          else if (document.getSelection) { txt = document.getSelection(); }
          else if (document.selection) { txt = document.selection.createRange().text; }

          if (txt && txt != '') {
             var elm = document.getElementById('header2_query');
             if (elm) { elm.value = txt; }
          }
       }
    );
    
 })();