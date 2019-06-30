if ( !livedoorProfileBlogPlugin ) {
    var livedoorProfileBlogPlugin;
    (function () {
        var ld_prof_blog_plugin = function () {};
        ld_prof_blog_plugin.prototype = {
            write : function (cfg) {
                if (cfg.type == 'js')
                    this.outputDiv(cfg);
                else
                    document.write(this.buildtag(cfg));
            },
            buildtag : function (cfg) {
                if (!cfg.type)
                    cfg.type = "normal";
                var defaults = {
                    normal : {
                        width    : 170,
                        height   : 360,
                        color    : "000000",
                        link     : "092bf3",
                        border   : "969999",
                        bgcolor  : "dee1e1",
                        img_size : "160P",
                        img      : 1,
                        name     : 1,
                        intro    : 1,
                        icon     : 1,
                        site     : 1,
                        style    : "default"
                    },
                    minimum : {
                        width    : 68,
                        height   : 18,
                        color    : "000000",
                        link     : "092bf3",
                        border   : "969999",
                        bgcolor  : "dee1e1",
                        img_size : "16",
                        img      : 1,
                        name     : 0,
                        intro    : 0,
                        icon     : 1,
                        site     : 0,
                        style    : "default"
                    },
                    compact : {
                        width    : 150,
                        height   : 70,
                        color    : "000000",
                        link     : "092bf3",
                        border   : "969999",
                        bgcolor  : "ffffff",
                        img_size : "60",
                        img      : 1,
                        name     : 1,
                        intro    : 0,
                        icon     : 1,
                        site     : 0,
                        style    : "gray"
                    }
                };
                for (var i in defaults[cfg.type])
                    if (cfg[i] === undefined)
                        cfg[i] = defaults[cfg.type][i];
                if (cfg.type != "normal")
                    var iframeStyle = 'allowtransparency="true" ';
                else
                    var iframeStyle = "";
                return '<iframe '+iframeStyle+'width="'+cfg.width+'" height="'+cfg.height+'" frameborder="0" src="'+
                    'http://portal.profile.livedoor.com/blogparts/'+cfg.livedoor_id+'/'+cfg.type+
                    '?width='+cfg.width+'&height='+cfg.height+'&color='+cfg.color+'&link='+cfg.link+
                    '&border='+cfg.border+'&bgcolor='+cfg.bgcolor+'&img_size='+cfg.img_size+'&img='+cfg.img+
                    '&name='+cfg.name+'&intro='+cfg.intro+'&icon='+cfg.icon+'&site='+cfg.site+'&style='+cfg.style+'"></iframe>';
            },
            outputDiv : function (cfg) {
                this.cfg = cfg;
                this.base_url = 'http://portal.profile.livedoor.com/';
                this.elm_id = "ld_profile_" + Math.random().toString(36).slice(2);
                document.write('<div id="'+this.elm_id+'"></div>');
                var obj = this;
                setTimeout(function () { obj.loadProfile(); }, 100);
            },
            loadProfile : function () {
                var api_url = this.base_url+"api/user/profile?livedoor_id="+this.cfg.livedoor_id+"&escape=1";
                var obj = this;
                this.callJSONP(api_url, function (json) {
                    try {
                        obj.elm = document.getElementById(obj.elm_id);
                        if ( json.status == "success" ) {
                            var cfg = obj.cfg;
                            var defaults = {
                                img_size : "160P",
                                img      : 1,
                                name     : 1,
                                intro    : 1,
                                icon     : 1,
                                site     : 1
                            };
                            for (var i in defaults)
                                if (cfg[i] === undefined)
                                    cfg[i] = defaults[i];
                            var profile_div = document.createElement('div');
                            profile_div.className = "profbody";
                            if (obj.cfg.img) {
                                var img_div = document.createElement('div');
                                img_div.className = "photo";
                                var img_link = document.createElement('a');
                                img_link.href = json.profile_url;
                                var img = document.createElement('img');
                                img.src = json.icon[cfg.img_size];
                                img.style.border = "none";
                                img_link.appendChild(img);
                                img_div.appendChild(img_link);
                                profile_div.appendChild(img_div);
                            }
                            if (obj.cfg.name) {
                                var name_div = document.createElement('div');
                                name_div.className = "nickname";
                                var name = document.createElement('a');
                                name.href = json.profile_url;
                                name.appendChild(document.createTextNode(json.nickname));
                                name_div.appendChild(name);
                                profile_div.appendChild(name_div);
                            }
                            if (obj.cfg.intro) {
                                var intro = document.createElement('div');
                                intro.className = "message";
                                intro.innerHTML = json.profile.introduction;
                                profile_div.appendChild(intro);
                            }
                            if (obj.cfg.site) {
                                var site_div = document.createElement('div');
                                site_div.className = "mysite";
                                site_div.style.textAlign = "left";
                                var site = document.createElement('a');
                                site.href = json.profile.site_url;
                                site.appendChild(document.createTextNode(json.profile.site_name));
                                site_div.appendChild(site);
                                profile_div.appendChild(site_div);
                            }
                            if (obj.cfg.icon) {
                                var icon = document.createElement('div');
                                icon.className = "proficon";
                                icon.style.textAlign = "right";
                                icon.innerHTML = '<a href="http://cms.profile.livedoor.com/message/send?to='+json.livedoor_id+'" title="\u30E1\u30C3\u30BB\u30FC\u30B8\u9001\u4FE1\u30DA\u30FC\u30B8\u3092\u958B\u304D\u307E\u3059" target="_blank"><img src="http://portal.profile.livedoor.com/blogparts/img/icon_message.gif" alt="\u30E1\u30C3\u30BB\u30FC\u30B8\u3092\u9001\u308B" style="border: none;" /></a> <a href="'+json.profile_url+'" title="\u3053\u306E\u4EBA\u306E\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB\u30DA\u30FC\u30B8\u3092\u958B\u304D\u307E\u3059" target="_blank"><img src="http://portal.profile.livedoor.com/blogparts/img/icon_add_favorite.gif" alt="\u304A\u6C17\u306B\u5165\u308A\u306B\u8FFD\u52A0" style="border: none;" /></a>';
                                profile_div.appendChild(icon);
                            }
                            obj.elm.appendChild(profile_div);
                        }
                        else
                            obj.elm.innerHTML = "\u53D6\u5F97\u5931\u6557";
                    } catch (e) {}
                });
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
                    var obj2 = obj;
                    setTimeout(function() {
                        obj2.head.removeChild(document.getElementById(u_name));
                        try{
                            window[u_name] = null;
                            delete window[u_name];
                        } catch (e) {};
                    }, 200);
                };
                obj.head = document.getElementsByTagName("head").item(0);
                setTimeout(function(){ obj.head.appendChild(scr); }, 100);
            }
        };
        livedoorProfileBlogPlugin = new ld_prof_blog_plugin();
    })();
}
