if (!livedoorProfileClap){
    var livedoorProfileClap = function (l_id, b_nm, e_id) {
        this.l_id = l_id;
        this.b_nm = b_nm;
        this.e_id = e_id;
        this.rnd = Math.random().toString(36).slice(2);
        this.elm_id = "livedoor_profile_clap_count_" + this.rnd;
        document.write("<span id='"+this.elm_id+"' class='clap'></span>");
        var obj = this;
        setTimeout(function () { obj.init(); }, 100);
    };
    livedoorProfileClap.prototype = {
        init : function () {
            this.elm = null;
            this.link_elm = null;
            this.assistant = null;
            this.key = null;
            this.head = null;
            this.x = null;
            this.y = null;
            this.w = null;
            this.d = false;
            this.base_url = "http://portal.profile.livedoor.com/";
            this.count();
        },
        count : function () {
            var api_url = this.base_url+"api/blog_clap/count?l_id="+this.l_id+"&b_nm="+this.b_nm+"&e_id="+this.e_id;
            var obj = this;
            this.callJSONP(api_url, function (json) {
                try {
                    if ( json.status == "success" ) {
                        obj.elm = document.getElementById(obj.elm_id);
                        if (obj.elm.hasChildNodes())
                            obj.elm.childNodes.item(1).innerHTML = json.count+"\u62CD\u624B";
                        else {
                            var clap_img  = document.createElement('img');
                            var clap_link = document.createElement('a');
                            clap_img.src = obj.base_url + "img/cmn/clapping.gif";
                            clap_link.href = "javascript:void(0)";
                            clap_link.innerHTML = json.count+"\u62CD\u624B";
                            clap_link.onclick = function (evt) {
                                var pos = obj.mousePos(evt);
                                obj.x = pos.x;
                                obj.y = pos.y;
                                obj.w = pos.w;
                                if ( obj.w && obj.w < (obj.x+400) )
                                    obj.x = obj.w - 400;
                                obj.preCountup();
                            };
                            obj.elm.appendChild(clap_img);
                            obj.elm.appendChild(clap_link);
                        }
                    }
                    else if (json.status == "inactive")
                        return;
                    else
                        obj.elm.innerHTML = "\u53D6\u5F97\u5931\u6557";
                } catch (e) {}
            });
        },
        preCountup : function () {
            var api_url = this.base_url+"api/blog_clap/clapkey?l_id="+this.l_id+"&b_nm="+this.b_nm+"&e_id="+this.e_id;
            var obj = this;
            this.callJSONP(api_url, function (json) {
                if ( json.status == "success" )
                    obj.key = json.key;
                else
                    return;
                obj.countup();
            });
        },
        countup : function () {
            if (this.d)
                return;
            var api_url = this.base_url+"api/blog_clap/countup?l_id="+this.l_id+"&b_nm="+this.b_nm+"&e_id="+this.e_id+"&ck="+this.key+"&escape=1";
            var obj = this;
            this.callJSONP(api_url, function (json) {
                try {
                    obj.d = true;
                    if ( json.status == "success" ) {
                        obj.assistant = document.createElement('div');
                        obj.assistant.innerHTML = obj.buildAssistant(json.assistant);
                        obj.assistant.style.position = "absolute";
                        obj.assistant.style.top  = (20 + obj.y)+'px';
                        obj.assistant.style.left = (20 + obj.x)+'px';
                        obj.assistant.style.zIndex = "9999";
                        document.body.appendChild(obj.assistant);
                        document.getElementById("livedoor-profile-assistant-close-"+obj.rnd).onclick = function () { obj.closeAssistant(); };
                        obj.assistant_handle = document.getElementById("livedoor-profile-assistant-handle-"+obj.rnd);
                        obj.assistant_handle.onmousedown = function (evt) { obj.dragStart(evt); };
                    }
                    else if (json.status == "inactive")
                        return;
                    else {
                        obj.assistant = document.createElement('div');
                        if (json.error == "reject.time")
                            obj.assistant.innerHTML = obj.buildError({ title : "\u9023\u7D9A\u30AF\u30EA\u30C3\u30AF\u30A8\u30E9\u30FC", text : "\u3057\u3070\u3089\u304F\u5F85\u3063\u3066\u304B\u3089\u3082\u3046\u4E00\u5EA6\u62CD\u624B\u3057\u3066\u304F\u3060\u3055\u3044\u3002" });
                        else
                            obj.assistant.innerHTML = obj.buildError({ title : "\u30A8\u30E9\u30FC", text : "\u62CD\u624B\u306B\u5931\u6557\u3057\u307E\u3057\u305F\u3002" });
                        obj.assistant.style.position = "absolute";
                        obj.assistant.style.top = (obj.y+20)+'px';
                        obj.assistant.style.left = (obj.x+20)+'px';
                        obj.assistant.style.zIndex = "9999";
                        document.body.appendChild(obj.assistant);
                        document.getElementById("livedoor-profile-assistant-close-"+obj.rnd).onclick = function () { obj.closeError(); };
                        obj.assistant_handle = document.getElementById("livedoor-profile-assistant-handle-"+obj.rnd);
                        obj.assistant_handle.onmousedown = function (evt) { obj.dragStart(evt); };
                    }
                } catch (e) {}
            });
        },
        closeAssistant : function () {
            document.body.removeChild(this.assistant);
            this.d = false;
            this.count();
        },
        closeError : function () {
            document.body.removeChild(this.assistant);
            this.d = false;
        },
        dragStart : function (evt) {
            var pos = this.mousePos(evt);
            this.sx = pos.x;
            this.sy = pos.y;
            var obj = this;
            this.assistant_handle.onmouseup = function () { obj.dragEnd(); };
            this.assistant_handle.style.width = '500px';
            this.assistant_handle.style.padding = '100px';
            this.assistant_handle.style.top  = '-100px';
            this.assistant_handle.style.left = '-100px';
            this.assistant_handle.onmousemove = function (evt) {
                var pos = obj.mousePos(evt);
                obj.x = obj.x + pos.x - obj.sx;
                obj.y = obj.y + pos.y - obj.sy;
                obj.sx = pos.x;
                obj.sy = pos.y;
                obj.assistant.style.top  = (20 + obj.y)+'px';
                obj.assistant.style.left = (20 + obj.x)+'px';
            };
        },
        dragEnd : function () {
            this.assistant_handle.style.padding = 0;
            this.assistant_handle.style.top  = 0;
            this.assistant_handle.style.left = 0;
            this.assistant_handle.style.width = '340px';
            this.assistant_handle.onmouseup = null;
            this.assistant_handle.onmousemove = null;
        },
        mousePos : function (evt) {
            var x; var y; var w;
            if (evt){
                x = evt.pageX;
                y = evt.pageY;
                w = window.innerWidth;
            }else{
                if ( document.documentElement && document.documentElement.clientWidth != 0 ){
                    x = window.event.clientX + document.documentElement.scrollLeft;
                    y = window.event.clientY + document.documentElement.scrollTop;
                    w = document.documentElement.clientWidth;
                }  else if ( document.body ) {
                    x = window.event.clientX + document.body.scrollLeft;
                    y = window.event.clientY + document.body.scrollTop;
                    w = document.body.clientWidth;
                }
            }
            return { 'x' : x, 'y' : y, 'w' : w };
        },
        callJSONP : function (api_url, cb_func) {
            var uniq_name = "ld_profile_callback_" + Math.random().toString(36).slice(2);
            var scr = document.createElement("script");
            scr.type = "text/javascript";
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
            obj.head = document.getElementsByTagName("head").item(0);
            setTimeout(function(){ obj.head.appendChild(scr); }, 100);
        },
        buildAssistant : function (assistant) {
            var recommend_url = "";
            for (var i = 0; i < assistant.recommend_urls.length; ++i){
                recommend_url = recommend_url + "<li class='livedoor-profile-assistant-recomend-no1' style='min-height: 1em; position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; position: relative; display: block; list-style-type: none; margin: 0 0 5px 0; padding: 0 4em 0 20px; background: url("+this.base_url+"img/clap/icon_arrow.gif) no-repeat 0 0; font-size: 110%; zoom: 1;'><a href='" + assistant.recommend_urls[i].url + "' target='_blank' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; text-decoration: none; margin: 0; padding: 0; color: #092bf3;'>" + assistant.recommend_urls[i].title + "</a><span style='display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; text-decoration: none; margin: 0; padding: 0; position: absolute; top: 0; right: 0; color: #666;'>";
                if (assistant.recommend_urls[i].count != -1)
                    recommend_url = recommend_url + assistant.recommend_urls[i].count + "\u62CD\u624B";
                recommend_url = recommend_url + "</span></li>";
            }
            return "<div class='livedoor-profile-assistant' id='livedoor-profile-assistant-"+this.rnd+"' style='position: static; display: inline; float: none; height: auto; color: #333; text-align: left; display: block; position: absolute; width: 358px; margin: 0; padding: 0; border: solid 1px #666; background: "+assistant.color+"; font-size: 16px; zoom: 1;'><div id='livedoor-profile-assistant-handle-"+this.rnd+"' style='position: static; display: inline; float: none; margin: 0; padding: 0; border: none; zoom: 1; text-align: left; display: block; position: absolute; margin: 0; padding: 0; width: 340px; height: 2.5em; z-index: 10000; background: url("+this.base_url+"img/cmn/spacer.gif); cursor: move;'></div><div class='livedoor-profile-assistant-header' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; position: relative; margin: 0; padding: 0;'><h1 style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; margin: 0; padding: 4px 0 2px; zoom: 1;'><span style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; padding-left: 25px; background: url("+this.base_url+"img/clap/clapping.gif) no-repeat 5px 0; font-size: 14px; color: #fff;'>"+assistant.name+"\u3055\u3093\u304B\u3089\u3072\u3068\u3053\u3068</span></h1><span style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; cursor: pointer;'><img src='"+this.base_url+"img/clap/close.gif' width='15' height='15' alt='\u9589\u3058\u308B' class='livedoor-profile-assistant-close' style='position: static; display: inline; float: none; width: 15px; height: 15px; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; position: absolute; top: 4px; right: 4px; border: none;' id='livedoor-profile-assistant-close-"+this.rnd+"' /></span></div><div class='livedoor-profile-assistant-body' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; margin: 0 3px 3px; padding: 0; background: #fff;'><div class='livedoor-profile-assistant-name' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; float: left; width: 106px; margin: 0; padding: 0 4px 10px 0;'><img src='"+assistant.image+"' width='96' height='96' alt='' style='position: static; display: inline; float: none; width: 96px; height: 96px; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; margin: 10px 0 0 10px; border: none;' /></div><div class='livedoor-profile-assistant-comment' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; float: left; width: 232px; margin: 10px 0; padding: 0; background: #f7f6f4 url("+this.base_url+"img/clap/comment_bottom.gif) no-repeat left bottom;'><p class='livedoor-profile-assistant-text' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; min-height: 50px; _height: 50px; margin: 0; padding: 10px 5px 0 20px; line-height: 1.3; background: #f7f6f4 url("+this.base_url+"img/clap/comment_top.gif) no-repeat left top;'>"+assistant.comment+"</p><p class='livedoor-profile-assistant-link' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; margin: 0; padding: 10px 0 10px; font-size: 95%; text-align: center;'><a href='"+assistant.profile_url+"' target='_blank' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; color: #092bf3;'>\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u3092\u898B\u308B</a></p></div><div class='livedoor-profile-assistant-message' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; clear: left; width: 332px; margin: 0 0 0 10px; padding: 0px 0 7px 0; background: url("+this.base_url+"img/clap/input_comment_bottom.gif) no-repeat left bottom;'><iframe allowtransparency='true' width='332' frameborder='0' src='"+this.base_url+"blog_clap/message?l_id="+this.l_id+"&b_nm="+this.b_nm+"&e_id="+this.e_id+"' style='position: static; display: inline; float: none; width: 332px; height: 4em; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left;'></iframe></div><div class='livedoor-profile-assistant-recomend' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; clear: left; margin: 0; padding: 0px 10px 10px 10px; "+assistant.color+";'><h3 style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; margin: 8px 0 0 0; padding: 0; font-size: 90%;'>\u3053\u3061\u3089\u3082\u30AA\u30B9\u30B9\u30E1\uFF01</h3><ul style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; margin: 5px 0 0 0; padding: 0; font-size: 83%;'>"+recommend_url+"</ul></div></div></div>";
        },
        buildError : function (err) {
            return "<div class='livedoor-profile-assistant' id='livedoor-profile-assistant-"+this.rnd+"' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; position: absolute; width: 358px; margin: 0; padding: 0; border: solid 1px #666; background: #999999; font-size: 100%;'><div id='livedoor-profile-assistant-handle-"+this.rnd+"' style='position: static; display: inline; float: none; margin: 0; padding: 0; border: none; zoom: 1; text-align: left; display: block; position: absolute; margin: 0; padding: 0; width: 340px; height: 2.5em; z-index: 10000; background: url("+this.base_url+"img/cmn/spacer.gif); cursor: move;'></div><div class='livedoor-profile-assistant-header'  style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; position: relative; margin: 0; padding: 0;'><h1 style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; margin: 0; padding: 4px 0 2px;'><a href='"+this.base_url+"' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; padding-left: 25px; background: url("+this.base_url+"img/clap/clapping.gif) no-repeat 5px 0; font-size: 14px; color: #fff;'>livedoor\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB</a></h1><span style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; position: absolute; top: 4px; right: 4px; cursor: pointer;'><img src='"+this.base_url+"img/clap/close.gif' width='15' height='15' alt='\u9589\u3058\u308B' id='livedoor-profile-assistant-close-"+this.rnd+"' style='position: static; display: inline; float: none; width: 15px; height: 15px; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; border: none;' /></span></div><div class='livedoor-profile-assistant-body' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; margin: 0 3px 3px; padding: 0; background: #fff;'><div class='livedoor-profile-assistant-name' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; float: left; width: 106px; margin: 0; padding: 0 4px 10px 0;'><img src='"+this.base_url+"/img/cmn/assistant/error.gif' width='96' height='96' alt='' style='position: static; display: inline; float: none; width: 96px; height: 96px; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; margin: 10px 0 0 10px; border: none;' /></div><div class='livedoor-profile-assistant-comment' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; float: left; width: 232px; margin: 10px 0; padding: 0; background: #f7f6f4 url("+this.base_url+"img/clap/comment_bottom.gif) no-repeat left bottom;'><p class='livedoor-profile-assistant-text' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; min-height: 50px; _height: 50px; margin: 0; padding: 10px 5px 0 20px; line-height: 1.3; background: #f7f6f4 url("+this.base_url+"img/clap/comment_top.gif) no-repeat left top;'><span style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; font-weight: bold;'>"+err.title+"</span>"+err.text+"</p><p class='livedoor-profile-assistant-link' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; margin: 0; padding: 10px 0 10px; font-size: 95%; text-align: center;'></p></div><div class='livedoor-profile-assistant-recomend' style='position: static; display: inline; float: none; width: auto; height: auto; margin: 0; padding: 0; border: none; background: none; color: #333; text-align: left; display: block; clear: left; height: 1px;'></div></div></div>";
        }
    };
}
