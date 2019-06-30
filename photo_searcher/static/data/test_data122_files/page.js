/*==========================================================================*/
/* http://www.zoome.jp/js/zoome/page.js                                     */
/*==========================================================================*/

/*==========================================================================*/
/* Class                                                                    */
/*==========================================================================*/

/* Initialize ==============================================================*/

if (!zoome)          var zoome              = {};
if (!zoome.page)         zoome.page         = {};
if (!zoome.page.util)    zoome.page.util    = {};
if (!zoome.page.util.Ad) zoome.page.util.Ad = {};

/* Mission =================================================================*/

/* Mission : zoome.page.util.Ad --------------------------------------------*/

zoome.page.util.Ad.map = function (from, dest, opts) {

    opts        = zoome.util.Sys.dfObj(opts, {});
    opts.method = zoome.util.Sys.dfStr(opts.method, "replace");

    if ($(from), $(dest)) {
        if (opts.method == "replace") {
            if ($(dest).parentNode) {
                $(dest).parentNode.replaceChild($(from), $(dest));
            }
        }
        else if (opts.method == "before") {
            if ($(dest).parentNode) {
                $(dest).parentNode.insertBefore($(from), $(dest));
            }
        }
        else if (opts.method == "after") {
            if ($(dest).parentNode) {
                if ($(dest).nextSibling) {
                    $(dest).parentNode.insertBefore(
                        $(from), $(dest).nextSibling
                    );
                }
            }
            else {
                $(dest).parentNode.appendChild($(from));
            }
        }
        else if (opts.method == "first") {
            if ($(dest).firstChild) {
                $(dest).insertBefore($(from), $(dest).firstChild);
            }
            else {
                $(dest).parentNode.appendChild($(from));
            }
        }
        else if (opts.method == "last") {
            $(dest).parentNode.appendChild($(from));
        }

        $(from).style.display = "block";
    }
};

/*==========================================================================*/

/* mission : navi ----------------------------------------------------------*/

var navi1 = {

    name  : "navi1",
    cells : [],

    setup : function () {
        var that = this;
        if ($(this.name)) {

            this.cells.push("my");
            this.cells.push("kanri");
            this.cells.push("contribute");
            this.cells.push("clist");
            this.cells.push("myclip");
            this.cells.push("meito");
            this.cells.push("circle");
            this.cells.push("ashiato");
            this.cells.push("prof");
            this.cells.push("set");
            this.cells.push("message");
            this.cells.push("point");

            if (Prototype.Browser.IE == false) {
                $(this.name + "_list").style.margin = "auto";
            }

            this.cells.each(
                function (name) {
                    that.cetup(name);
                }
            );

            Event.observe(document, "click",
                function (event) {
                    var element = Event.element(event);
                    if (element.nodeName.toLowerCase() != "a") {
                        that.show();
                    }
                }
            );

            $(this.name + "_list").style.display = "block";
        }
    },

    cetup : function (name) {
        var that = this;
        if (this.menu(name)) {
            Event.observe(this.pull(name), "click",
                function (event) {
                    if (that.menu(name).style.display == "block") {
                        that.hide(name);
                        that.manage(false);
                    }
                    else {
                        that.show(name);
                    }
                }
            );
        }
    },

    manage : function (status) {
        if (this.status != status) {
            this.status  = status;
            if ($("super_ad")) {
                if ($('ad1_top')) {
                    if (status) {
                        $('ad1_top').style.position   = 'absolute';
                        $('ad1_top').style.overflow   = 'hidden';
                        $('ad1_top').style.top        = '-9999px';
                        $('ad1_top').style.visibility = 'hidden';
                    }
                    else {
                        $('ad1_top').style.position   = 'relative';
                        $('ad1_top').style.overflow   = 'hidden';
                        $('ad1_top').style.top        = '0px';
                        $('ad1_top').style.visibility = 'visible';
                    }
                }
            }
        }
    },

    show : function (name) {
        var that   = this;
        var status = false;
        this.cells.each(
            function (i) {
                if (that.menu(i)) {
                    if (i == name) {
                        that.menu(i).style.display = "block";
                        status = true;
                    }
                    else {
                        that.hide(i);
                    }
                }
            }
        );
        this.manage(status);
    },

    hide : function (name) {
        this.menu(name).hide();
    },

    menu : function (name) {
        return $(this.name + "_" + name + "_menu");
    },

    pull : function (name) {
        return $(this.name + "_" + name + "_pull");
    }
};

/* mission : search --------------------------------------------------------*/

var search0 = {

    name : "search0",
    mesg : "キーワードを入力してください。",
    mode : "",
    form : null,

    tabs : {
        movie : {
            type     : "zoome",
            pagename : "combine_tag",
            form_id  : "search0_form",
            q_sel    : 1
        },
        circle : {
            type     : "zoome",
            pagename : "circle_tag",
            form_id  : "search0_form",
            q_sel    : 2
        },
        google : {
            type     : "google",
            pagename : "web",
            form_id  : "cse-search-box"
        }
    },

    xSetup : function () {
        var mode     = "movie";
        var pagename = $("zoome_pagename").value;
        for (var i in this.tabs) {
            var tabO = this.tabs[i];
            if (tabO.pagename == pagename) {
                mode = i;
            }
        }
        this.xManage(mode);
    },

    xManage : function (mode) {
        var value = "";
        if (this.mode) {
            this.form.q.blur();
            var tabO = this.tabs[this.mode];
            if (tabO.type == "zoome") {
                if (this.form.q.value != this.mesg) {
                    value = this.form.q.value;
                    this.form.q.value = this.mesg;
                }
            }
            else if (this.form.q.value) {
                value = this.form.q.value;
            }
        }
        for (var i in this.tabs) {
            var tabE = $(this.name + "_tab_" + i);
            var tabO = this.tabs[i];
            if (tabE && tabO) {
                if (tabO.form_id != this.tabs[mode].form_id) {
                    $(tabO.form_id).style.display = "none";
                }
                if (i == mode) {
                    var action  = isLen($("zoome_uri_main_search").value) ?
                                  $("zoome_uri_main_search").value :
                                  "http://search.zoome.jp";
                        action += "/" + tabO.pagename;
                    this.form = $(tabO.form_id);
                    this.form.action = action;
                    this.mode = mode;
                    if (tabO.type == "zoome") {
                        $(this.name + "_q_sel").value = tabO.q_sel;
                    }
                    tabE.className = "tab_on";
                }
                else {
                    tabE.className = "tab_off";
                }
            }
        }
        this.form.style.display = "block";
        if (value) {
            this.form.q.value = value;
        }
        if (this.tabs[mode].type == "google") {
            this.form.q.focus();
            this.form.q.blur();
        }
    },

    xFocus : function () {
        if (this.form.q.value == this.mesg) {
            this.form.q.value =  "";
        }
    },

    xBlur : function () {
        if (this.form.q.value == "") {
            this.form.q.value =  this.mesg;
        }
    },

    xSubmit : function () {
        var tabO = this.tabs[this.mode];
        if (tabO.type == "zoome") {
            if (this.form.q.value != this.mesg) {
                this.form.submit();
            }
        }
        else if (this.form.q.value) {
            this.form.submit();
        }
    }
};

/* mission : paste ---------------------------------------------------------*/

var paste0 = {

    name    : "paste0",
    script1 : "",
    script2 : "",
    w       : 0,
    h       : 0,

    mode  : {
        s : { w : 360, h : 288 },
        m : { w : 640, h : 512 },
        l : { w : 800, h : 640 },
        x : { w :   0, h :   0 }
    },

    type : ["html", "blog", "page"],

    setup : function () {
        if (this.form()) {

            var that = this;

            this.script1  = '<script type="text/javascript" src="';
            this.script1 += $("zoome_uri_main_www").value;
            this.script2  = '"></script>';

            var value  = this.script1;
                value += "/swfblog?param=";
                value += $("mypage_diary_xml").value;
                value += this.script2;

            this.text("blog").value = value;
            this.check("s").checked = true;
            this.change("s");

            for (var i in this.mode) {
                this.setup_mode(i);
            }

            this.type.each(
                function (type) {
                    that.setup_type(type);
                }
            );
        }
    },

    setup_mode : function (mode) {
        if (this.check(mode)) {
            var that = this;
            Event.observe(this.check(mode), "click",
                function (event) {
                    that.change(mode);
                }
            );
        }
    },

    setup_type : function (type) {

        var that = this;

        if (this.text(type)) {
            Event.observe(this.text(type), "click",
                function (event) {
                    this.focus();
                    this.select();
                }
            );
        }

        if (this.button("copy_" + type)) {
            Event.observe(this.button("copy_" + type), "click",
                function (event) { that.copy(type); }
            );
        }

        if (this.button("preview_" + type)) {
            Event.observe(this.button("preview_" + type), "click",
                function (event) { that.preview(type); }
            );
        }
    },

    change : function (mode) {

        if (mode == "x") {
            this.w = parseInt($("mypage_movie_width").value);
            this.h = Math.round(this.w * 0.8);
        }
        else {
            this.w = this.mode[mode].w;
            this.h = this.mode[mode].h;
        }

        var value  = this.script1;
            value += "/swfwrite?param=";
            value += $("mypage_diary_xml").value;
            value += "&width="  + this.w;
            value += "&height=" + this.h;
            value += this.script2;

        this.text("html").value = value;
    },

    copy : function (type) {
        if (Prototype.Browser.IE == true) {
            window.clipboardData.setData("Text", this.text(type).value);
        }
    },

    preview : function (type) {

        var fh = 15;

        if (parseInt($("mypage_movie_width").value) > 0) {
            if (parseInt($("mypage_movie_height").value) > 0) {
                fh = 30;
            }
        }

        var mw = (type == "html") ? this.w : 180;
        var mh = (type == "html") ? this.h : 150;

        if (Prototype.Browser.IE == true) {
            mw += 30;
            mh += 30;
        }

        var options  = "width="   + (mw +  0);
            options += ",height=" + (mh + fh);
            options += ",resizable=yes";
            options += ",scrollbars=yes";

        var popup = window.open("", "popup", options);

        popup.document.write("<html>");
        popup.document.write("<head><title>プレビュー</title></head>");
        popup.document.write("<title>プレビュー</title>");
        popup.document.write("<style type='text/css'>div.line {");
        popup.document.write("height      : 15px;");
        popup.document.write("line-height : 15px;");
        popup.document.write("font-size   : 10px;");
        popup.document.write("text-align  : center;");
        popup.document.write("}</style></head>");
        popup.document.write("<body style='margin:0px;padding:0px;'>");
        popup.document.write("<div class='line'>プレイヤーのサイズは");
        popup.document.write(this.w + " x " + this.h + "です。</div>");

        if (parseInt($("mypage_movie_width").value) > 0) {
            if (parseInt($("mypage_movie_height").value) > 0) {
                var ow = $("mypage_movie_width").value;
                var oh = $("mypage_movie_height").value;
                popup.document.write("<div class='line'>");
                popup.document.write("動画の解像度は");
                popup.document.write(ow + " x " + oh + "です。</div>");
            }
        }

        popup.document.write(this.text(type).value);
        popup.document.write("</body></html>");
    },

    a : function (type) {
        return $(this.name, "_a_", type);
    },

    button : function (type) {
        return $(this.name + "_button_" + type);
    },

    check : function (type) {
        return $(this.name + "_check_" + type);
    },

    form : function () {
        return $(this.name + "_form");
    },

    text : function (type) {
        return $(this.name + "_text_" + type);
    }
};

/*==========================================================================*/
