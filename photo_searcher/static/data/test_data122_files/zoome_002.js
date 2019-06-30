/*==========================================================================*/
/* zoome                                                                    */
/*==========================================================================*/

/* Initialize ==============================================================*/

if (!zoome)       var zoome           = {};
if (!zoome.util)      zoome.util      = {};
if (!zoome.util.Sys)  zoome.util.Sys  = {};
if (!zoome.util.Ajax) zoome.util.Ajax = {};
if (!zoome.util.Data) zoome.util.Data = {};
if (!zoome.util.Doc)  zoome.util.Doc  = {};
if (!zoome.util.Elem) zoome.util.Elem = {};
if (!zoome.util.HTML) zoome.util.HTML = {};

/* Mission =================================================================*/

/* Mission : zoome.util.Sys ------------------------------------------------*/

zoome.util.Sys = {

  cType : function (t, v) { return (typeof(v) == t);                  },
  isDef : function    (v) { return !this.cType("undefined", v);       },
  isBoo : function    (v) { return  this.cType("boolean",   v);       },
  isFun : function    (v) { return  this.cType("function",  v);       },
  isObj : function    (v) { return  this.cType("object",    v);       },
  isStr : function    (v) { return  this.cType("string",    v);       },
  isArr : function    (v) { return (v instanceof Array);              },
  isFin : function    (v) { return isFinite(v);                       },
  isLen : function    (v) { return (this.isStr(v) && (v.length > 0)); },

  dfDef : function (v0, v1) { return (this.isDef(v0) ? v0 : v1); },
  dfArr : function (v0, v1) { return (this.isArr(v0) ? v0 : v1); },
  dfBoo : function (v0, v1) { return (this.isBoo(v0) ? v0 : v1); },
  dfFin : function (v0, v1) { return (this.isFin(v0) ? v0 : v1); },
  dfFun : function (v0, v1) { return (this.isFun(v0) ? v0 : v1); },
  dfObj : function (v0, v1) { return (this.isObj(v0) ? v0 : v1); },
  dfStr : function (v0, v1) { return (this.isStr(v0) ? v0 : v1); },
  dfLen : function (v0, v1) { return (this.isLen(v0) ? v0 : v1); },
  tr : function (s) { return s.replace(/^( |　)+/,'').replace(/( |　)+$/,''); }
}

/* Mission : zoome.util.HTML -----------------------------------------------*/

zoome.util.HTML = {
  btnUpdate : function () {
    return '<img alt="[編集]" src="/img/btn_edit.gif" width="48" height="16" align="absmiddle" />';
  }
};

/* Mission : zoome.util.Ajax -----------------------------------------------*/

zoome.util.Ajax.Base = function (cls, opts) {
  opts = zoome.util.Sys.dfObj(opts, {});
  cls.Message = function () {
    zoome.util.Ajax.Message(
      arguments[0],
      arguments[1],
      arguments[2]
    );
  };
  cls.Request = function (opts) {
    opts = zoome.util.Sys.dfObj(opts, {});
    new zoome.util.Ajax.Request(
      zoome.util.Sys.dfLen(opts.uri, cls.mame),
      zoome.util.Sys.dfDef(
        opts.par,
        (zoome.util.Sys.isFun(cls.form) ? cls.form().serialize() : {})
      ),
      zoome.util.Sys.dfObj(opts.opts, cls.opts)
    );
  };
  if (zoome.util.Sys.isArr(opts.elems)) {
    opts.elems.each(function (elem) {
      cls[elem] = function (mame) {
        return $(cls.mame + "_" + arguments.callee.mame + (mame ? ("_" + mame) : ""));
      }; cls[elem].mame = elem;
    });
  }
};

zoome.util.Ajax.Request = function (uri, par, opts) {

  switch ($F("zoome_funktion")) {
    case "circle" : this.uri = $F("circle_circle_uri")  + "/"; break;
    case "mypage" : this.uri = $F("dtmp_url_mypage")    + "/"; break;
    case "www"    : this.uri = $F("zoome_uri_main_www") + "/"; break;
  }

  this.uri += uri;
  this.par  = zoome.util.Sys.dfDef(par,  {});
  this.opts = zoome.util.Sys.dfObj(opts, {});

  if (zoome.util.Sys.isObj(this.par)) {
    this.par.ms_code = zoome.util.Sys.dfStr($F("session_ms_code"), "");
  }

  this.opts.cal = zoome.util.Sys.dfDef(this.opts.cal,     {});
  this.opts.clr = zoome.util.Sys.dfBoo(this.opts.clr,   true);
  this.opts.enc = zoome.util.Sys.dfBoo(this.opts.enc,   true);
  this.opts.dec = zoome.util.Sys.dfBoo(this.opts.dec,   true);
  this.opts.lck = zoome.util.Sys.dfBoo(this.opts.lck,   true);
  this.opts.mes = zoome.util.Sys.dfObj(this.opts.mes,   null);
  this.opts.met = zoome.util.Sys.dfStr(this.opts.met, "post");
  this.opts.pos = zoome.util.Sys.dfFin(this.opts.pos,      1);
  this.opts.res = zoome.util.Sys.dfStr(this.opts.res, "json");

  var that = this;
  this.onEvent = function (f, h, x) {
    if (zoome.util.Sys.isFun(f)) {
      h.message = decodeURIComponent(
        zoome.util.Sys.dfLen(h.message, ""));
      if (that.opts.res == "json") { that.opts.dec ?
        f(h, eval(decodeURIComponent(x.responseText))) :
        f(h, eval(x.responseText));
      }
      else if (that.opts.res == "text") { that.opts.dec ?
        f(h, decodeURIComponent(x.responseText)) :
        f(h, x.responseText);
      }
    }
  };
  this.onLoading = function (x, h) {
    if (that.opts.lck && that.opts.cal.form) {
      that.opts.cal.form().disable(); }
    if (that.opts.cal.ses) { that.opts.cal.ses = true; };
    if (that.opts.mes) { zoome.util.Ajax.Message(
      true, that.opts.mes, {pos:that.opts.pos}); };
    that.onEvent(that.opts.cal.onLoading, h, x);
  };
  this.onSuccess = function (x, h) {
    h.message = decodeURIComponent(h.message);
    if (that.opts.mes) { zoome.util.Ajax.Message(
      true, that.opts.mes, {mes:h.message,pos:that.opts.pos}); };
    if (h.status == 1) {
      if (that.opts.clr && that.opts.cal.form) {
        that.opts.cal.form().reset(); }
      if (zoome.util.Sys.isLen(that.opts.tpl)) {
        if (that.opts.res == "json") { $(that.opts.tpl).innerHTML =
          Jemplate.process((that.opts.tpl + ".tpl"), eval(that.opts.dec ?
            decodeURIComponent(x.responseText) : x.responseText));
        }
        else if (that.opts.res == "text") { $(that.opts.tpl).innerHTML =
          Jemplate.process((that.opts.tpl + ".tpl"), that.opts.dec ?
            decodeURIComponent(x.responseText) : x.responseText);
        }
      }
      if (zoome.util.Sys.isLen(that.opts.pag)) {
        if (that.opts.res == "json") { var page = makePage(eval(that.opts.dec ?
          decodeURIComponent(x.responseText) : x.responseText).page);
          $(that.opts.pag + "_1") && ($(that.opts.pag + "_1").innerHTML = page);
          $(that.opts.pag + "_2") && ($(that.opts.pag + "_2").innerHTML = page);
        }
      }
    }
    that.onEvent(that.opts.cal.onSuccess, h, x);
  };
  this.onFailure = function (x, h) {
    if (that.opts.mes) { var mes = "通信に失敗しました";
      zoome.util.Ajax.Message(
        true, that.opts.mes, {mes:mes,pos:that.opts.pos}); }
    that.onEvent(that.opts.cal.onFailure, h, x);
  };
  this.onComplete = function (x, h) {
    if (that.opts.lck && that.opts.cal.form) {
      that.opts.cal.form().enable(); }
    if (that.opts.cal.ses) { that.opts.cal.ses = false; };
    that.onEvent(that.opts.cal.onComplete, h, x);
  };

  new Ajax.Request(this.uri, {
    parameters : this.par,
    method     : this.opts.met,
    onLoading  : this.onLoading,
    onSuccess  : this.onSuccess,
    onFailure  : this.onFailure,
    onComplete : this.onComplete
  });
};

zoome.util.Ajax.Message = function (status, elem, opts) {
  var that = this.Message;
  if (that.elem) {
    that.elem.removeChild(that.imag);
    that.elem.removeChild(that.mesg);
    document.body.removeChild(that.elem);
    delete that.imag;
    delete that.mesg;
    delete that.elem;
  }
  if (zoome.util.Sys.dfBoo(status, false)) {
    var zuA = zoome.util.Ajax;
    var zuE = zoome.util.Elem;
    var zuS = zoome.util.Sys;
    opts = zuS.dfObj(opts, {});
    opts.pos = zuS.dfFin(opts.pos, 1);
    opts.mes = zuS.dfStr(opts.mes,
      '<img src="/img/loading01.gif" width="16" height="16">');
    if (!zuS.dfBoo(that.comp, false)) {
      that.comp = true;
    };
    that.obj  = elem;
    that.hid  = function (eve) {
      var ele = Event.element(eve);
      switch (ele) {
        case that.obj  : break;
        case that.mesg : break;
        case that.imag : break;
        default : if (!zuS.dfArr(that.btns, []).any(function (id) {
          return ($(id) && ($(id) == ele));
        })) { zoome.util.Ajax.Message(false); };
      }
    }
    that.elem = document.createElement('div');
    that.mesg = document.createElement('div');
    that.imag = document.createElement('img');
    with (that.elem.style) {
      position = 'absolute';
      zIndex   = 65536;
    }
    with (that.mesg.style) {
      background = '#fff';
      border     = '#666 solid 1px';
      color      = '#f60';
      fontSize   = '12px';
      fontWeight = 'bold';
      padding    = '5px';
      position   = 'absolute';
      whiteSpace = 'nowrap';
    }
    with (that.imag.style) {
      display  = 'block';
      position = 'absolute';
    }
    that.mesg.innerHTML = opts.mes;
    that.elem.appendChild(that.mesg);
    that.elem.appendChild(that.imag);
    document.body.appendChild(that.elem);
    if (opts.pos == 1) {
      that.imag.src = '/img/v1.gif';
      zuE.wh0(that.imag, 15, 9);
      zuE.wh0(that.elem,
        Math.max(that.mesg.offsetWidth, that.imag.offsetWidth),
        (that.mesg.offsetHeight + that.imag.offsetHeight - 1));
      zuE.tl1(that.mesg);
      zuE.bc1(that.imag);
      zuE.mAC0(that.elem, elem, 5);
    }
    else if (opts.pos == 2) {
      that.imag.src = '/img/v2.gif';
      zuE.wh0(that.imag, 9, 15);
      zuE.wh0(that.elem,
        (that.mesg.offsetWidth + that.imag.offsetWidth - 1),
        Math.max(that.mesg.offsetHeight, that.imag.offsetHeight));
      zuE.tr1(that.mesg);
      zuE.ml1(that.imag);
      zuE.mRM0(that.elem, elem, 5);
    }
    else if (opts.pos == 3) {
      that.imag.src = '/img/v3.gif';
      zuE.wh0(that.imag, 15, 9);
      zuE.wh0(that.elem,
        Math.max(that.mesg.offsetWidth, that.imag.offsetWidth),
        (that.mesg.offsetHeight + that.imag.offsetHeight - 1));
      zuE.bc1(that.mesg);
      zuE.tc1(that.imag);
      zuE.mBC0(that.elem, elem, 5);
    }
    else if (opts.pos == 4) {
      that.imag.src = '/img/v4.gif';
      zuE.wh0(that.imag, 9, 15);
      zuE.wh0(that.elem,
        (that.mesg.offsetWidth + that.imag.offsetWidth - 1),
        Math.max(that.mesg.offsetHeight, that.imag.offsetHeight));
      zuE.tl1(that.mesg);
      zuE.mr1(that.imag);
      zuE.mLM0(that.elem, elem, 5);
    }
    Event.observe(document, 'click', that.hid);
  }
  else {
    Event.stopObserving(document, 'click', that.hid);
  }
};

/* Mission : zoome.util.Doc ------------------------------------------------*/

zoome.util.Doc = {
  scroll : function () {
    return {
      x : (zoome.util.Sys.dfFin(document.body.scrollLeft, 0) ||
           zoome.util.Sys.dfFin(document.documentElement.scrollLeft, 0)),
      y : (zoome.util.Sys.dfFin(document.body.scrollTop, 0) ||
           zoome.util.Sys.dfFin(document.documentElement.scrollTop, 0))
    };
  }
};

/* Mission : zoome.util.Elem -----------------------------------------------*/

zoome.util.Elem = {
  alpha : function (e, v) {
    v = zoome.util.Sys.dfFin(v, 100);
    v = Math.max(v,   0);
    v = Math.min(v, 100);
    e.style.filter     = 'alpha(opacity='+v+')';
    e.style.MozOpacity = v / 100;
    e.style.opacity    = v / 100;
    return v;
  },
  tl1 : function (elem) {
    elem.style.top  = 0;
    elem.style.left = 0;
  },
  bl1 : function (elem) {
    elem.style.bottom = 0;
    elem.style.left   = 0;
  },
  tc1 : function (elem) {
    elem.style.top = 0;
    elem.style.left = (elem.parentNode.offsetWidth - elem.offsetWidth) / 2;
  },
  bc1 : function (elem) {
    elem.style.bottom = 0;
    elem.style.left = (elem.parentNode.offsetWidth - elem.offsetWidth) / 2;
  },
  mr1 : function (elem) {
    elem.style.top = (elem.parentNode.offsetHeight - elem.offsetHeight) / 2;
    elem.style.right = 0;
  },
  ml1 : function (elem) {
    elem.style.top = (elem.parentNode.offsetHeight - elem.offsetHeight) / 2;
    elem.style.left = 0;
  },
  tr1 : function (elem) {
    elem.style.top = 0;
    elem.style.right = 0;
  },
  x0 : function (e) {
    var x = 0;
    if (e.getBoundingClientRect) {
      x = zoome.util.Doc.scroll().x
        + e.getBoundingClientRect().left
        + (Prototype.Browser.IE ? -2 : 0);
    }
    else {
      do {
        x += e.offsetLeft;
        e  = e.offsetParent;
      } while (e)
    }
    return x;
  },
  y0 : function (e) {
    var y = 0;
    if (e.getBoundingClientRect) {
      y = zoome.util.Doc.scroll().y
        + e.getBoundingClientRect().top
        + (Prototype.Browser.IE ? -2 : 0)
    }
    else {
      do {
        y += e.offsetTop;
        e  = e.offsetParent;
      } while (e)
    }
    return y;
  },
  xy0 : function (e) { return {x:this.x0(e),y:this.y0(e)}; },
  isTag : function (n, e) { return (e.nodeName.toLowerCase() == n); },
  isDiv : function (elem) { return this.isTag("div", elem); },
  isImg : function (elem) { return this.isTag("img", elem); },

  w0 : function (elem, w) {
    if (zoome.util.Sys.isFin(w)) { elem.style.width = w + "px";
      this.isImg(elem) && (elem.width = w); } return elem.offsetWidth; },
  h0 : function (elem, h) {
    if (zoome.util.Sys.isFin(h)) { elem.style.height = h + "px";
      if (this.isImg(elem)) { elem.height = h; }; } return elem.offsetHeight; },
  wh0 : function (elem, w, h) {
    return { w : this.w0(elem, w), h : this.h0(elem, h) }; },

  aL : function (a, b, o) { a.style.left = zoome.util.Sys.dfFin(o, 0) +
    this.x0(b); return this.xy0(a); },
  aC : function (a, b, o) { a.style.left = zoome.util.Sys.dfFin(o, 0) +
    this.x0(b) - ((a.offsetWidth - b.offsetWidth) / 2); return this.xy0(a); },
  aR : function (a, b, o) { a.style.left = zoome.util.Sys.dfFin(o, 0) +
    this.x0(b) + b.offsetWidth - a.offsetWidth; return this.xy0(a); },
  vT : function (a, b, o) { a.style.top = zoome.util.Sys.dfFin(o, 0) +
    this.y0(b); return this.xy0(a); },
  vM : function (a, b, o) { a.style.top = zoome.util.Sys.dfFin(o, 0) +
    this.y0(b) - ((a.offsetHeight - b.offsetHeight) / 2); return this.xy0(a); },
  vB : function (a, b, o) { a.style.top = zoome.util.Sys.dfFin(o, 0) +
    this.y0(b) + b.offsetHeight - a.offsetHeight; return this.xy0(a); },

  mAL0 : function (a, b, o) { this.aL(a, b);
    return this.vT(a, b, -(a.offsetHeight + zoome.util.Sys.dfFin(o, 0))); },
  mAC0 : function (a, b, o) { this.aC(a, b);
    return this.vT(a, b, -(a.offsetHeight + zoome.util.Sys.dfFin(o, 0))); },
  mAR0 : function (a, b, o) { this.aR(a, b);
    return this.vT(a, b, -(a.offsetHeight + zoome.util.Sys.dfFin(o, 0))); },
  mRT0 : function (a, b, o) { this.vT(a, b);
    return this.aR(a, b, (a.offsetWidth + zoome.util.Sys.dfFin(o, 0))); },
  mRM0 : function (a, b, o) { this.vM(a, b);
    return this.aR(a, b, (a.offsetWidth + zoome.util.Sys.dfFin(o, 0))); },
  mRB0 : function (a, b, o) { this.vB(a, b);
    return this.aR(a, b, (a.offsetWidth + zoome.util.Sys.dfFin(o, 0))); },
  mBL0 : function (a, b, o) { this.aL(a, b);
    return this.vB(a, b, (a.offsetHeight + zoome.util.Sys.dfFin(o, 0))); },
  mBC0 : function (a, b, o) { this.aC(a, b);
    return this.vB(a, b, (a.offsetHeight + zoome.util.Sys.dfFin(o, 0))); },
  mBR0 : function (a, b, o) { this.aR(a, b);
    return this.vB(a, b, (a.offsetHeight + zoome.util.Sys.dfFin(o, 0))); },
  mLT0 : function (a, b, o) { this.vT(a, b);
    return this.aL(a, b, -(a.offsetWidth + zoome.util.Sys.dfFin(o, 0))); },
  mLM0 : function (a, b, o) { this.vM(a, b);
    return this.aL(a, b, -(a.offsetWidth + zoome.util.Sys.dfFin(o, 0))); },
  mLB0 : function (a, b, o) { this.vB(a, b);
    return this.aL(a, b, -(a.offsetWidth + zoome.util.Sys.dfFin(o, 0))); }
};

/*==========================================================================*/

//============================================================================
// Ajax
//============================================================================

function xAR(options) { return AjaxRequest(options); }

function AjaxRequest(argv) {

    var vid = argv.vid;

    var iid = argv.iid;
    var mid = argv.mid;
    var rid = argv.rid;

    var uri = argv.uri;
    var par = argv.par;
    var mtd = argv.mtd;

    if (!vid) { vid = argv.ms_name; }
    if (!iid) { iid = vid + "_img"; }
    if (!mid) { mid = vid + "_msg"; }
    if (!rid) { rid = vid + "_res"; }
    if (!mtd) { mtd =       "post"; }

    var onC  = "__AjaxRequestOnComplete(\"";
        onC += vid + "\", \"";
        onC += iid + "\", \"";
        onC += mid + "\", \"";
        onC += rid + "\", xhr, json); eval(";
        onC += vid + ".oc(\"";
        onC += vid + "\", xhr, json));";

    var onL  = "__AjaxRequestOnLoading(\"";
        onL += vid + "\", \"";
        onL += iid + "\", \"";
        onL += mid + "\", \"";
        onL += rid + "\", xhr, json); eval(";
        onL += vid + ".ol(\"";
        onL += vid + "\", xhr, json));";

    var onS  = "__AjaxRequestOnSuccess(\"";
        onS += vid + "\", \"";
        onS += iid + "\", \"";
        onS += mid + "\", \"";
        onS += rid + "\", xhr, json); eval(";
        onS += vid + ".os(\"";
        onS += vid + "\", xhr, json));";

    var onF  = "__AjaxRequestOnFailure(\"";
        onF += vid + "\", \"";
        onF += iid + "\", \"";
        onF += mid + "\", \"";
        onF += rid + "\", xhr, json); eval(";
        onF += vid + ".of(\"";
        onF += vid + "\", xhr, json));";

    var opt = {
        method     : mtd,
        parameters : par,
        onLoading  : function(xhr, json) { eval(onL) },
        onComplete : function(xhr, json) { eval(onC) },

        onSuccess  : function(xhr, json) {
            if (argv.caller) {
                argv.caller.xSuccess(json, eval(xhr.responseText));
            }
            eval(onS);
        },

        onFailure  : function(xhr, json) {
            if (argv.caller) {
                argv.caller.xFailure(json, eval(xhr.responseText));
            }
            eval(onF);
        }
    };

    new Ajax.Request(uri, opt);
}

function __AjaxRequestOnLoading(vid, iid, mid, rid, xhr, json) {
    var img = "<img src='/img/loading01.gif' align='absmiddle'>";
    if ($(iid)) { $(iid).innerHTML = img; }
    if ($(mid)) { $(mid).innerHTML = "";  }
}

function __AjaxRequestOnComplete(vid, iid, mid, rid, xhr, json) {
    if ($(iid)) { $(iid).innerHTML = ""; }
}

function __AjaxRequestOnSuccess(vid, iid, mid, rid, xhr, json) {
    var hash = eval(json);
    var msg  = decodeURIComponent(hash.message);
    if ($(mid)) { $(mid).innerHTML = msg; }
    if ($(rid)) {
        if (hash.status == 1) { $(rid).innerHTML = xhr.responseText; }
    }
}

function __AjaxRequestOnFailure(vid, iid, mid, rid, xhr, json) {
    var msg = "通信に失敗しました";
    if ($(mid)) { $(mid).innerHTML = msg; }
}

/*==========================================================================*/
/* Flash                                                                    */
/*==========================================================================*/

function sw(args) {

    // Shift
    var self = this;

    // Prepare
    var h = args.h;
    var p = args.p;
    var v = args.v;
    var w = args.w;

    // Mission
    var codebase  = "http://fpdownload.macromedia.com";
        codebase += "/pub/shockwave/cabs/flash";
        codebase += "/swflash.cab#version=9,0,0,0";

    var embed  = {
        align             : "middle",
        allowFullScreen   : "true",
        allowScriptAccess : "always",
        bgcolor           : "#000000",
        FlashVars         : v,
        height            : h,
        name              : "player",
        pluginspage       : "http://www.macromedia.com/go/getflashplayer",
        quality           : "high",
        scale             : "noscale",
        src               : p,
        type              : "application/x-shockwave-flash",
        width             : w
    };

    var param  = {
        allowFullScreen   : "true",
        allowScriptAccess : "always",
        bgcolor           : "#000000",
        FlashVars         : v,
        movie             : p,
        quality           : "high",
        scale             : "noscale"
    };

    var object = {
        align             : "middle",
        classid           : "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",
        codebase          : codebase,
        height            : h,
        id                : "player",
        width             : w
    };

    document.write('<object id="zp"');

    for (var name in object) {
        document.write(' ');
        document.write(name);
        document.write('="');
        document.write(object[name]);
        document.write('"');
    }

    document.write('>');

    for (var name in param) {
        document.write('<param name="');
        document.write(name);
        document.write('" value="');
        document.write(param[name]);
        document.write('" />');
    }

    document.write('<embed name="zp"');

    for (var name in embed) {
        document.write(' ');
        document.write(name);
        document.write('="');
        document.write(embed[name]);
        document.write('"');
    }

    document.write(' />');
    document.write('</object>');
}

/*==========================================================================*/
/* Form                                                                     */
/*==========================================================================*/

function FormConfirm(type, that, is_lock) {

    // Mission
    if (!that) { that = document.f; }

    var message = {
        "insert" : "本当に作成してもよろしいですか？",
        "update" : "本当に更新してもよろしいですか？",
        "delete" : "本当に削除してもよろしいですか？"
    };

    var delay = (is_lock == true) ? 1000 : 1;

    if (confirm(message[type]) == true) {
        if (is_lock == true) { screenWait(); }
        var tid = setTimeout(
            function () {
                that.submit();
            },
            delay
        );
    }

    // Return
    return true;
}

/*
    指定された"class_name"をクラス名に持つ<checkbox>タグの選択状態を、
    呼出元の<checkbox>タグの状態に合わせて変更します。
    USAGE:FormCheckboxChangeAll(class_name, this);
*/
function FormCheckboxChangeAll(class_name, that) {
    var checked  = that.checked;
    var elements = document.getElementsByClassName(class_name);
    if (elements) {
        for (var x = 0; x < elements.length; x++) {
            elements[x].checked = checked;
        }
    }
}

/*
    Submitボタンクリック時にマルチプルなSelectBoxを全選択し
    送信するScript

    USAGE:FormSubmit(form_name, box_name)
*/
function FormSubmit(form_name, box_name) {
    var a_box = $(box_name);
    if (a_box) {
        for (var idx = 0; idx < a_box.length; idx++) {
            if (!a_box.options[idx].selected) {
                 a_box.options[idx].selected = true;
            }
        }
    }

    with (document.forms[form_name]) {
        mode.value = 'execute';
        submit();
    }
}

//============================================================================
// Popup
//============================================================================

/*
    汎用サブウィンドウ表示用Script

    USAGE:PopupOpen(url, name, w, h)
*/
function PopupOpen(url, name, w, h) {
    var sw = window.screen.width;
    var sh = window.screen.height;
    var x = Math.floor((sw - w) / 2);
    var y = Math.floor((sh - h) / 2);
    var opt = 'width=' + w + ',height=' + h + ',top=' + y + ',left=' + x;
    window.open(url, name, opt);
}

/*
    汎用サブウィンドウ閉じる用Script

    USAGE:PopupClose()
*/
function PopupClose() {
    window.close();
}

/*
    テーマ別のタグ選択用サブウィンドウ表示用Script

    USAGE:PopupOpenDiaryTag(theme_colname)
*/
function PopupOpenDiaryTag(theme_colname) {
    var elements = document.getElementsByName(theme_colname);
    var open_url = 'hd_theme_tag_list?theme_l_id=' + escape(elements[0].selectedIndex + 1);
    var w = 400;
    var h = 320;
    PopupOpen(open_url, null, w, h);
    return false;
}

//============================================================================
// zHTML
//============================================================================

function makePage(opts) {

    // Shift
    var cpp = opts.cpp; // Number
    var crr = parseInt(opts.crr); // Number
    var mtd = opts.mtd; // String
    var par = opts.par; // Object
    var sum = opts.sum; // Number

    // Prepare
    var num = 10;

    // Mission
    var from = crr - Math.floor((num - 1) / 2);
    var dest = crr + Math.floor((num - 1) / 2);
    var psum = Math.floor(sum / cpp) + ((sum % cpp) ? 1 : 0);

    var parhtml = new String();

    for (var name in par) {
        parhtml += name + ':"' + par[name] + '",';
    }
    parhtml += "page:";

    if (from < 1) {
        var span = 1 - from;
        from += span;
        dest += span;
        (dest > psum) && (dest = psum);
    }

    if (dest > psum) {
        var span = dest - psum;
        dest -= span;
        from -= span;
        (from < 1) && (from = 1);
    }

    var prev = (crr >    1) ? (crr - 1) : 0;
    var next = (crr < dest) ? (crr + 1) : 0;

    var html = new String();

    if ((prev > 0) || (next > 0)) {

        html += "<ul class='change_page_ul'>";

        if (next > 0) {
            html += "<li class='next change_page_li'><a href='javascript:void(0);' ";
            html += "onclick='" + mtd + "({" + parhtml + next + "});'>&#x25b6;</a></li>";
        }

        for (var i = dest; i >= from; i--) {
            if (i != crr) {
                html += "<li class='link change_page_li'><a href='javascript:void(0);' ";
                html += "onclick='" + mtd + "({" + parhtml + i + "});'>";
                html += i;
                html += "</a></li>";
            }
            else {
                html += "<li class='link change_page_li'><span class='now'>" + i + "</span></li>";
            }
        }

        if (prev > 0) {
            html += "<li class='back change_page_li'><a href='javascript:void(0);' ";
            html += "onclick='" + mtd + "({" + parhtml + prev + "});'>&#x25c0;</a></li>";
        }

        html += "</ul>";
    }

    // Return
    return html;
}

//============================================================================
// Class.member
//============================================================================

var Session = {
    lavel     : "session",
    member_id : new Number(),
    ms_code   : new String()
};

var Zoome = {
    lavel           : "zoome",
    service         : new String(),
    funktion        : new String(),
    pagename        : new String(),
    pagemode        : new String(),
    uri_upload      : new String(),
    uri_main_circle : new String(),
    uri_main_mypage : new String(),
    uri_main_www    : new String()
};

function classSetup(object) {
    for (var k in object) {
        if (k != "lavel") {
            var element = $(object.lavel + "_" + k);
            if (element) { object[k] = element.value; }
        }
    }
    return object;
}

//============================================================================
// Ajax
//============================================================================

function xAL(element, options) {
    if (isDef(element)) {
        if (dfBoo(options.status, true) == true) {
            var html = "<img src='/img/loading01.gif' align='absmiddle'>";
            element.innerHTML = html;
        }
        else {
            element.innerHTML = "";
        }
    }
}

//============================================================================
// Flash
//============================================================================

function xFL(options) {

    // Shift
    options = dfDef(options, {});

    // Prepare
    options.w = dfDef(options.w, 0);
    options.h = dfDef(options.h, 0);
    options.i = dfDef(options.i, "zp");
    options.p = dfDef(options.p, "");
    options.v = dfDef(options.v, "");

    // Mission
    var codebase  = "http://fpdownload.macromedia.com";
        codebase += "/pub/shockwave/cabs/flash";
        codebase += "/swflash.cab#version=9,0,0,0";

    var parObj = {
        align             : "middle",
        classid           : "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",
        codebase          : codebase,
        height            : options.h,
        id                : options.i,
        width             : options.w
    };

    var parPar = {
        allowFullScreen   : "true",
        allowScriptAccess : "always",
        bgcolor           : "#000000",
        FlashVars         : options.v,
        movie             : options.p,
        quality           : "high",
        scale             : "noscale"
    };

    var parEmb = {
        align             : "middle",
        allowFullScreen   : "true",
        allowScriptAccess : "always",
        bgcolor           : "#000000",
        FlashVars         : options.v,
        height            : options.h,
        name              : options.i,
        pluginspace       : "http://www.macromedia.com/go/getflashplayer",
        quality           : "high",
        scale             : "noscale",
        src               : options.p,
        type              : "application/x-shockwave-flash",
        width             : options.w
    };

    var domObj = document.createElement("object");
    var htmObj = "<object";

    for (var k in parObj) {
        var v = parObj[k];
        domObj.setAttribute(k, parObj[k]);
        htmObj += ' ' + k + '="' + v + '"';
    }

    domObj.style.width  = options.w;
    domObj.style.height = options.h;
    htmObj += ' style="width:' + options.w;
    htmObj += 'px;height:'     + options.h;
    htmObj += 'px;">';

    for (var k in parPar) {
        var v = parPar[k];
        var domPar = document.createElement("param");
        domPar.setAttribute("name", k);
        domPar.setAttribute("value", v);
        domObj.appendChild(domPar);
        htmObj += '<param name="' + k + '" value="' + v + '" />';
    }

    var domEmb = document.createElement("embed");
    htmObj += '<embed';

    for (var k in parEmb) {
        var v = parEmb[k];
        domEmb.setAttribute(k, parEmb[k]);
        htmObj += ' ' + k + '="' + v + '"';
    }

    if (!isIE()) {
        domObj.appendChild(domEmb);
    }

    domEmb.style.width  = options.w;
    domEmb.style.height = options.h;
    htmObj += ' style="width:' + options.w;
    htmObj += 'px;height:'     + options.h;
    htmObj += 'px;" /></object>';

    // Return
    return {dom:domObj,html:htmObj};
}

// Flash : AS ----------------------------------------------------------------

function zCircle()  { return classSetup(Circle);  }
function zMypage()  { return classSetup(Mypage);  }
function zSession() { return classSetup(Session); }
function zWWW()     { return classSetup(WWW);     }
function zZoome()   { return classSetup(Zoome);   }

// Flash : JS ----------------------------------------------------------------

function zMovie() {
    var movie = {
        zp       : 1,
        zpmcmedn : 1,
        zpmcmedp : 1,
        zpmcmmtu : 1,
        zpmmdian : 1,
        zpmmdiab : 1,
        zpmmdiap : 1,
        zpmmidxn : 1,
        zpmwdmtu : 1,
        zpmwmovn : 1
    };
    var element = null;
    for (var k in movie) {
        if (movie[k] == 1) {
            if (document[k]) {
                element = document[k];
                break;
            }
        }
    }
    return element;
}

function zAuthor(id) {
    return document[dfDef(id, "zp")].zAuthor() || null;
}

function zCodename(id) {
    return document[dfDef(id, "zp")].zCodename() || null;
}

function zRelease(id) {
    return document[dfDef(id, "zp")].zRelease() || null;
}

function zDevelop(id) {
    return document[dfDef(id, "zp")].zDevelop() || null;
}

function zVersion(id) {
    return document[dfDef(id, "zp")].zVersion() || null;
}

function zMovieBL(id) {
    return document[dfDef(id, "zp")].zMovieBL() || 0;
}

function zMovieBT(id) {
    return document[dfDef(id), "zp"].zMovieBT() || 0;
}

function zMovieDuration(id) {
    return document[dfDef(id, "zp")].zMovieDuration() || 0;
}

function zMovieHeight(id) {
    return document[dfDef(id, "zp")].zMovieHeight() || 0;
}

function zMovieStatus(id) {
    return document[dfDef(id, "zp")].zMovieStatus() || "";
}

function zMovieTime(id) {
    return document[dfDef(id, "zp")].zMovieTime() || 0;
}

function zMovieWidth(id) {
    return document[dfDef(id, "zp")].zMovieWidth() || 10;
}

function xMoviePause(id) {
    document[dfDef(id, "zp")].xMoviePause();
}

function xMoviePlay(id) {
    document[dfDef(id, "zp")].xMoviePlay();
}

function xMovieSeek(time, id) {
    document[dfDef(id, "zp")].xMovieSeek(dfNum(time, 0));
}

function xMovieIsBTDNA(id) {
    return document[dfDef(id, "zp")].xMovieIsBTDNA();
}

function xTelopDelete(telop_ids, id) {
    document[dfDef(id, "zp")].xTelopDelete(telop_ids);
}

//============================================================================
// dHTML
//============================================================================

// dHTML : Simple ------------------------------------------------------------

function getDW() {
    var dw = new Number();
    dw = (dw && (dw > 0)) ? dw : document.body.scrollWidth;
    dw = (dw && (dw > 0)) ? dw : 0;
    dw = Math.max(dw, getWW());
    return dw;
}

function getDH() {
    var dh = new Number();
    dh = (dh && (dh > 0)) ? dh : document.body.scrollHeight;
    dh = (dh && (dh > 0)) ? dh : 0;
    dh = Math.max(dh, getWH());
    return dh;
}

function getWL() {
    var wl = new Number();
    wl = (wl && (wl > 0)) ? wl : document.body.scrollLeft;
    wl = (wl && (wl > 0)) ? wl : window.pageXOffset;
    wl = (wl && (wl > 0)) ? wl : 0;
    return wl;
}

function getWT() {
    var wt = new Number();

    wt = (wt && (wt > 0)) ? wt : document.body.scrollTop;
    wt = (wt && (wt > 0)) ? wt : window.pageYOffset;
    wt = (wt && (wt > 0)) ? wt : 0;
    return wt;
}

function getWW() {
    var ww = new Number();
    ww = (ww && (ww > 0)) ? ww : document.body.clientWidth;
//  ww = (ww && (ww > 0)) ? ww : document.documentElement.clientWidth;
//  ww = (ww && (ww > 0)) ? ww : self.innerWidth;
    ww = (ww && (ww > 0)) ? ww : 0;
    return ww;
}

function getWH() {
    var wh = new Number();
    wh = (wh && (wh > 0)) ? wh : document.body.clientHeight;
//  wh = (wh && (wh > 0)) ? wh : document.documentElement.clientHeight;
//  wh = (wh && (wh > 0)) ? wh : self.innerHeight;
    wh = (wh && (wh > 0)) ? wh : 0;
    return wh;
}

function getEW(el) {
    var ew = new Number();
    ew = (ew && (ew > 0)) ? ew : parseInt(el.getAttribute("width"));
    ew = (ew && (ew > 0)) ? ew : parseInt(el.style.width);
    ew = (ew && (ew > 0)) ? ew : 0;
    return ew;
}

function getEH(el) {
    var eh = new Number();
    eh = (eh && (eh > 0)) ? eh : parseInt(el.getAttribute("height"));
    eh = (eh && (eh > 0)) ? eh : parseInt(el.style.height);
    eh = (eh && (eh > 0)) ? eh : 0;
    return eh;
}

function xECM(el) {
    el.style.left = getWL() + ((getWW() - getEW(el)) / 2);
    el.style.top  = getWT() + ((getWH() - getEH(el)) / 2);
}

function xESH(el) {
    el = isStr(el) ? $(el) : el;
    if (el) {
        var b = dfLen(el.style.display, "block");
        var a = (b != "none") ? "none" : "block";
        el.style.display = a;
    }
}

// dHTML : Element -----------------------------------------------------------

function elementAlpha(element, value) {
    value = dfNum(value, 100);
    value = (value >=   0) ? value :   0;
    value = (value <= 100) ? value : 100;
    element.style.filter     = "alpha(opacity=" + value + ")";
    element.style.MozOpacity = Math.round(value) / 100;
    element.style.opacity    = Math.round(value) / 100;
    return value;
}

// dHTML : Screen ------------------------------------------------------------

function screenDark(options) {

    // Shift
    options = isObj(options) ? options : new Object();

    // Prepare
    options.destroy = dfBoo(options.destroy, true);
    options.even    = dfBoo(options.even,    true);
    options.follow  = dfBoo(options.follow,  true);
    options.lock    = dfBoo(options.lock,    true);

    // Mission
    screenEven(true);

    var bg = document.createElement("div");
    var fg = document.createElement("div");
    var mg = document.createElement("div");

    bg.id = "zoomeScreenDarkBg";
    fg.id = "zoomeScreenDarkFg";
    mg.id = "zoomeScreenDarkMg";

//  bg.style.backgroundColor = "#ff0000";
    bg.style.position        = "absolute";
    bg.style.left            = 0;
    bg.style.top             = 0;
    bg.style.width           = getDW();
    bg.style.height          = getDH();
    bg.style.backgroundColor = "#000000";
    bg.style.filter          = "alpha(opacity=80)";
    bg.style.MozOpacity      = 0.8;
    bg.style.opacity         = 0.8;
    bg.style.zIndex          = 16;

//  fg.style.backgroundColor = "#00ff00";
    fg.style.position        = "absolute";
    fg.style.left            = getWL();
    fg.style.top             = getWT();
    fg.style.width           = getWW();
    fg.style.height          = getWH();
    fg.style.zIndex          = 32;

//  mg.style.backgroundColor = "#0000ff";
    mg.style.position        = "absolute";
    mg.style.zIndex          = 64;

    document.body.appendChild(bg);
    document.body.appendChild(fg);
    document.body.appendChild(mg);

    if (isDef(options.content)) {
        if (isObj(options.content)) {
            mg.appendChild(options.content);
        }
        else if (isStr(options.content)) {
            mg.innerHTML = options.content;
        }

        if (!Prototype.Browser.IE) { mg.cleanWhitespace(); }

        var fc = mg.firstChild;
        fc.style.top  = 0;
        fc.style.left = 0;
        mg.setAttribute("width",  fc.getAttribute("width"));
        mg.setAttribute("height", fc.getAttribute("height"));
        mg.style.width  = zoome.util.Elem.w0(fc);
        mg.style.height = zoome.util.Elem.h0(fc);
        xECM(mg);
    }

    if (options.follow == true) {
        window.onscroll = function () {
            xECM(fg);
            xECM(mg);
        };
    }

    if (options.lock == false) {
        bg.onclick = screenKrad;
        fg.onclick = screenKrad;
    }

    // Return
    return {bg:bg,fg:fg,mg:mg};
}

function screenKrad(options) {

    // Shift
    options = dfObj(options, {});

    // Prepare
    options.destroy = dfBoo(options.destroy, true);

    // Mission
    var bg = $("zoomeScreenDarkBg");
    var fg = $("zoomeScreenDarkFg");
    var mg = $("zoomeScreenDarkMg");

    if (isDef(mg) &&(options.destroy == false)) {
        mg.childNodes.each(
            function (child) {
                child.style.display    = "none";
                child.style.visibility = "hidden";
                document.body.appendChild(child);
            }
        );
    }

    isDef(mg) && document.body.removeChild(mg);
    isDef(fg) && document.body.removeChild(fg);
    isDef(bg) && document.body.removeChild(bg);

    screenEven(false);
}

function screenManage() {
    var bg = $("zoomeScreenDarkBg");
    var fg = $("zoomeScreenDarkFg");
    var mg = $("zoomeScreenDarkMg");

    if (!Prototype.Browser.IE) { mg.cleanWhitespace(); }

    var fc = mg.firstChild;
    mg.setAttribute("width",  fc.getAttribute("width"));
    mg.setAttribute("height", fc.getAttribute("height"));
    mg.style.width  = zoome.util.Elem.w0(fc);
    mg.style.height = zoome.util.Elem.h0(fc);
    xECM(mg);
}

function screenEven(status) {
    status = dfBoo(status, true);
    var names = ["iframe", "embed", "object", "select"];
    var value = (status == true) ? "hidden" : "visible";
    for (var a = 0; a < names.length; a++) {
        var elements = document.getElementsByTagName(names[a]);
        for (var b = 0; b < elements.length; b++) {
            elements[b].style.visibility = value;
        }
    }
}

function screenWait(options) {

    // Shift
    options = dfObj(options, {});

    // Mission
    var content = document.createElement("div");
    var message = "しばらくおまちください・・・";

    content.style.position   = "absolute";
    content.style.width      = "500px";
    content.style.height     = "25px";
    content.style.lineHeight = "25px";
    content.style.textAlign  = "center";
    content.style.color      = "#ffffff";
    content.style.fontFamily = "monospace";
    content.style.fontSize   = "16px";
    content.style.fontWeight = "bold";
    content.innerHTML        = message;

    options.content = content;

    var elements = screenDark(options);
    var mode     = false;
    var speed    = 10;
    var value    = 100;

    var iid = setInterval(
        function () {
            if (content) {
                elementAlpha(content, value);
                if (mode == true) {
                    value += speed;
                    value  = (value < 100) ? value :   100;
                    mode   = (value < 100) ? true  : false;
                }
                else {
                    value -= speed;
                    value  = (value > 0) ? value : 0;
                    mode   = (value > 0) ? false : true;
                }
            }
            else {
                clearInterval(iid);
            }
        },
        100
    );

    // Return
    return elements;
}

//============================================================================
// System
//============================================================================

// System : Env --------------------------------------------------------------

function isIE() {
    return Prototype.Browser.IE;
}

// System : Value ------------------------------------------------------------

function dfDef(value0, value1) {
    return isDef(value0) ? value0 : value1;
}

function dfArr(value0, value1) {
    return isArr(value0) ? value0 : value1;
}

function dfBoo(value0, value1) {
    return isBoo(value0) ? value0 : value1;
}

function dfNum(value0, value1) {
    return isNum(value0) ? value0 : value1;
}

function dfObj(value0, value1) {
    return isObj(value0) ? value0 : value1;
}

function dfStr(value0, value1) {
    return isStr(value0) ? value0 : value1;
}

function dfLen(value0, value1) {
    return isLen(value0) ? value0 : value1;
}

function dfMin(value, min) {
    value = dfNum(value, min);
    return (value > min) ? value : min;
}

function dfMax(value, max) {
    value = dfNum(value, max);
    return (value < max) ? value : max;
}

function dfRan(value, def, min, max) {
    value = dfNum(value, def);
    value = dfMin(value, min);
    value = dfMax(value, max);
    return value;
}

function isDef(value) {
    return (typeof(value) == "undefined") ? false : true;
}

function isArr(value) {
    return (typeof(value) == "array") ? true : false;
}

function isBoo(value) {
    return (typeof(value) == "boolean") ? true : false;
}

function isNum(value) {
    return isFinite(value) ? true : false;
}

function isObj(value) {
    return (typeof(value) == "object") ? true : false;
}

function isStr(value) {
    return (typeof(value) == "string") ? true : false;
}

function isLen(value) {
    return (isStr(value) && (value.length > 0)) ? true : false;
}

function ch (text) {
    if (isLen(text)) {
        text = text.replace(/&/g, "&amp;");
        text = text.replace(/"/g, "&quot;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");

        text = text.replace(/\r\n?/g, "\n");
        text = text.replace(/\n/g, "<br />");
    }
    return text;
}

function cl (text) {
    if (isLen(text)) {
        text = text.replace(/&/g, "&amp;");
        text = text.replace(/"/g, "&quot;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");

        text = text.replace(/\r\n?/g, "\n");
        text = text.replace(/\n/g, " ");
        text = text.replace(/\t/g, " ");
    }
    return text;
}

//============================================================================
// Zoome
//============================================================================

function goBack() {
    if (isLen($("common_uri_back").value)) {
        document.location = $("common_uri_back").value;
    }
}

function goNext() {
    if (isLen($("common_uri_next").value)) {
        document.location = $("common_uri_next").value;
    }
}

//============================================================================
