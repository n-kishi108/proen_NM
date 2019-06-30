/**
 *	関心空間基本スクリプトライブラリ
 *
 *	VERSION=2009072403
 */

var Kanshin = {
	uniqueId: function() { return Kanshin._uniqueIdCache++; },
	_uniqueIdCache: 1,

	show: function(pane) { if ($(pane)) $(pane).style.display = 'block'; },

	hide: function(pane) { if ($(pane)) $(pane).style.display = 'none'; },

	showHide: function(show) {
		for (var i = 1; i < arguments.length; ++i) {
			Kanshin.hide(arguments[i]);
		}
		Kanshin.show(show);
	},

	staticBase: 'http://static.kanshin.com',

	buildUrl: function(urlString) {
		var options = {};
		var url = new Kanshin.Url(urlString);
		
		if (arguments.length > 1) {

			for (var i = 1; i < arguments.length; ++i) {
				if (typeof arguments[i] == 'object') {
					Object.extend(options, arguments[i])
					continue
				}

				url.addParameter(arguments[i])
			}
		}

		if (options) {
			if (options.flash) {
				url.addParameter('action', 'flash;' + options.flash)
			}
		}

		return url.toString()
	},

	jump: function(url) {
		url = Kanshin.buildUrl.apply(this, arguments);
		window.location.href = url;
	},

	redirect: function(url, secs) {
		var timer = 0 + secs;

		new PeriodicalExecuter(function(pe) {
			if (timer > 0) {
				timer -= 1;
				if ($('FnCdTimer')) $('FnCdTimer').update(timer);
				if (timer <= 0) Kanshin.jump(url);
			}
		}, 1)
	},

	openTo: function(target, url) {
		if (target == '_top') {
			top.location.href = url;
		} else {
			window.open(url, target);
		}
	},

	confirm: function(msg) {
		return confirm(msg);
	},

	alert: function(msg) {
		alert(msg);
	},

	set: function(req) {
		var url = '/api/set?' + req + '&dt=' + (new Date()).getTime();
		return new Ajax.Request(url, { method: 'get' });
	},

	window: {
		pageScroll: function() {
			var x, y;

			if (self.pageYOffset) {
				x = self.pageXOffset;
				y = self.pageYOffset;
			} else if (document.documentElement && document.documentElement.scrollTop) {
					// Explorer 6 Strict
				x = document.documentElement.scrollLeft;
				y = document.documentElement.scrollTop;
			} else if (document.body) {
					// all other Explorers
				x = document.body.scrollLeft;
				y = document.body.scrollTop;
			}

			return { x: x, y: y };
		},

		// HTMLのコンテンツ領域のサイズ
		contentSize: function() {
			var w, h;

			if (window.innerHeight && window.scrollMaxY) {
				w = document.body.scrollWidth;
				h = window.innerHeight + window.scrollMaxY;
			} else if (document.body.scrollHeight > document.body.offsetHeight) {
					// all but Explorer Mac
				w = document.body.scrollWidth;
				h = document.body.scrollHeight;
			} else {
					// Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
				w = document.body.offsetWidth;
				h = document.body.offsetHeight;
			}

			return { width: w, height: h };
		},

		// ウィンドウのサイズ
		frameSize: function() {
			var w, h;

			if (self.innerHeight) {
					// all except Explorer
				w = self.innerWidth;
				h = self.innerHeight;
			} else if (document.documentElement && document.documentElement.clientHeight) {
					// Explorer 6 Strict Mode
				w = document.documentElement.clientWidth;
				h = document.documentElement.clientHeight;
			} else if (document.body) {
					// other Explorers
				w = document.body.clientWidth;
				h = document.body.clientHeight;
			}

			return { width: w, height: h };
		},

		// contentsSize()とframeSize()の大きいほう
		pageSize: function() {
			var w, h;

			var outer = Kanshin.window.contentSize();
			var inner = Kanshin.window.frameSize();

			// for small pages with total height less then height of the viewport
			if (outer.height < inner.height) {
				h = inner.height;
			} else {
				h = outer.height;
			}

			// for small pages with total width less then width of the viewport
			if (outer.width < inner.width) {
				w = inner.width;
			} else {
				w = outer.width;
			}

			return { width: w, height: h };
		}
	},

	mouse: {
		inside: function(e, elm) {
			var elm = $(elm);
			if (elm) { return Position.within(elm, Event.pointerX(e), Event.pointerY(e)); }
			else { return false; }
		},
		pos: function(e) {
			return { x: Event.pointerX(e), y: Event.pointerY(e) };
		},
		distance: function(e, pos) {
			var curPos = this.pos(e);
			var x = pos.x - curPos.x;
			var y = pos.y - curPos.y;
			return Math.sqrt((x * x) + (y - y) ^ 2);
		}
	},

	form: {
		enable: function(elm) { $(elm).disabled = ''; },
		disable: function(elm) { $(elm).disabled = 'disabled'; },
		setEnable: function(elm, f) {
			if (f) {
				Kanshin.form.enable(elm);
			} else {
				Kanshin.form.disable(elm);
			}
		},
		select: function(elm, f) { Event.observe( $(elm), 'change', f, false); },

		checkEmpty: function(msg) {
			for (var i = 1; i < arguments.length; ++i) {
				if (!Field.present(arguments[i])) {
					Kanshin.alert(msg);
					return false;
				}
			}
			return true;
		},

		clear: function(form) {
			var tags = $(form).getElementsByTagName('input');

			$A(tags).each(function(elm) {
				switch (elm.type) {
					case 'text':
						elm.value = '';
						break;

					case 'checkbox':
					case 'radio':
						elm.checked = false;
						break;

					case 'submit':
					case 'reset':
					case 'button':
					case 'hidden':
						break;

					default:
						alert(elm.type);
						break;
				}
			});

			tags = $(form).getElementsByTagName('select');
			$A(tags).each(function(elm) { elm.selectedIndex = 0 });
		},

		dummy: ''
	},

	remote: null,

	cart: {
		add: function(cart_name, id) {
			/** 未実装 */
			return true;
		}
	},

	log: function(elm) {
		/** aタグでなければ */
		var url = window.location.href.replace(/#.*$/, '');

		var arg_begin = 0;
		var redirect_url = '';

		if (elm.href) {
			redirect_url = elm.href;
			arg_begin += 1;
		}

		var action = 'action=log.click';
		for (var i = arg_begin; i < arguments.length; ++i) {
			action += ';' + arguments[i];
		}

		if (redirect_url) {
			action += ';' + encodeURIComponent(redirect_url);
		}

		url = Kanshin.buildUrl(url, action);

		if (elm.target) {
			Kanshin.openTo(elm.target, url);
		} else {
			Kanshin.jump(url);
		}

		return false;
	},

	tracker: function(page) {
		Kanshin.dom.accessViaImage('/data/tracker?page=' + encodeURIComponent(page));

		if (urchinTracker) urchinTracker(page);
	},
	
	/**
		tracker経由でクリックをログする
	 */
	trackerLogClick: function(to, label) {
		if (!to) return false;
		
		var url = '/data/action?tracker.log;' + [encodeURIComponent(to), label, '', Math.random()].join(';');
		
		return new Ajax.Request(url, {
			asynchronous: false,
			encoding: 'UTF-8',
			method: 'get'
		}).transport;
	}, 
	
	context: function(context) {
		Kanshin.dom.accessViaImage('/data/set_link_context?ctx=' + encodeURIComponent(context));
	},

	cookie: {
		get: function(name, default_value) {
			var ck = Kanshin.cookie._parse();
			return (ck[name] != undefined ? ck[name] : default_value);
		},

		set: function(name, value) {
			var ck = Kanshin.cookie._parse();
			ck[name] = value;
			document.cookie = name + '=' + encodeURIComponent(value);
			return value;
		},

		_parse: function() {
			if (!Kanshin.cookie._cache) {
				Kanshin.cookie._cache = document.cookie.split('; ').inject(
						{},
						function(h, s) { var v = s.split('=', 2); h[v[0]] = v[1]; return h }
					)
			}

			return Kanshin.cookie._cache
		},

		_store: function() {
		},

		_cache: null
	},

	createObject: function(type, data, width, height) {
		var object = '<object type="' + type +'" data="' + data + '" width="' + width + '" height="' + height + '" />';
		object += '<param name="movie" value="' + data + '" />';
		object += '<param name="wmode" value="transparent" />';
		object += '</object>';
		document.write(object);
	},

	switchClassName: function(elm, a, b) {
		elm = $(elm);
		elm.removeClassName(a);
		elm.addClassName(b);
	},

	onReady: function(fn) {
		if (this._ready) {
			this._ready.push(fn);
		} else {
			fn();
		}
	},


	_onReady: function(e) {
		var list = this._ready;
		delete this._ready;

		list.each(function(fn) {
			fn();
		});
	},

	_ready: [],

	onLoad: function(fn) {
		if (this.load) {
			this.load.push(fn);
		} else {
			fn();
		}
	},

	_onLoad: function(e) {
		var list = this.load;
		delete this.load;

		list.each(function(fn) {
			fn();
		});
	},

	ElementExtensions: {
		getBounds: function(elm) {
			return Kanshin.geo.Rect.create(elm.cumulativeOffset(), elm.getDimensions());
		},

		isInViewport: function(elm) {
			return elm.getBounds().isOverlapped(Kanshin.geo.viewport());
		},

		isInViewportAll: function(elm) {
			return elm.getBounds().isFullyOverlapped(Kanshin.geo.viewport());
		}
	},

	load: []
}

Kanshin.dom = {
	head: function() {
		return Kanshin.dom.uniqueTag('head');
	},

	body: function() {
		return Kanshin.dom.uniqueTag("body");
	},

	uniqueTag: function(tagName) {
		return document.getElementsByTagName(tagName).item(0);
	},

	create: function(tagName, attribs, styles) {
		var elm = document.createElement(tagName);

		if (attribs) {
			for (var name in attribs) {
				elm[name] = attribs[name];
			}
		}

		if (styles) {
			for (var name in styles) {
				if (styles[name] === null) continue;

				elm.style[name] = '' + styles[name];
			}
		}

		return elm;
	},

	destroy: function(elm) {
		if (elm = $(elm)) {
			var p;
			if (p = $(elm.parentNode)) p.removeChild(elm);
		}
	},

	accessViaImage: function(url) {
				url += (url.match(/\?/) ? '&' : '?');
		url += 'rnd=' + Math.round(Math.random() * 2147483647);

		var i = new Image(1,1);
		i.src = url;
		i.onload = function() { return; }
	},

	sibling: function(elm) {
		elm = $(elm);
		while (elm && (elm = elm.nextSibling)) {
			if (elm.nodeType == 1) return elm;
		}

		return null;
	},

	find: function(userParams) {
		var _params = {
			tagName: '*',
			parent: null,
			className: null,
			attributes: { },
			checker: null
		}

		if (userParams) Object.extend(_params, userParams);

		var parent = (_params.parent ? $(_params.parent) : document);
		var elms = parent.getElementsByTagName(_params.tagName ? _params.tagName : '*');
		return $A(elms).findAll(this._finder);
	},

	_finder: function(elm) {
		// 変数_paramsは、findの中で定義される_paramsが参照される。

		if (_params.className) {
			if (!elm.className.match(new RegExp("(^|\\s)" + className + "(\\s|$)"))) return false;
		}

		if (_params.attributes) {
			for (var name in _params.attributes) {
				if (elm[name] != _params.attributes[name]) return false;
			}
		}

		if (_params.checker) {
			if (!_params.checker(elm)) return false;
		}

		return true;
	}
}

Kanshin.css = {
	load: function(src, media) {
		if (!Kanshin.css.find(src)) {
			var attrs = { href: src, rel: 'stylesheet', type: 'text/css', media: (media ? media : 'all') }

			Kanshin.dom.head().appendChild(
				Kanshin.dom.create('link', attrs)
			);
		}
	},

	unload: function(src) {
		var link = Kanshin.css.find(src);

		if (link) {
			Kanshin.dom.head().removeChild(link);
		}
	},

	find: function(src) {
		var re = new RegExp(src);

		return $A(document.getElementsByTagName('link')).detect(function(elm) {
							return (elm.rel == 'stylesheet' && elm.href.match(re));
						});
	}
}

Kanshin.js = {
	load: function(src, charset) {
		Kanshin.dom.head().appendChild(
			Kanshin.dom.create('script', { src: src, type: 'text/javascript', charset: charset })
		);
	}
}

Kanshin.Overlay = Class.create();
Kanshin.Overlay.prototype = {
	initialize: function(options) {
		options = options || {}

		var attribs = {
			id: options.id || 'overlay' + Kanshin.uniqueId(),
			onclick: function () { this.hide(); return false; }.bind(this)
		}

		var styles = {
			display: 'none',
			position: 'absolute',
			top: '0',
			left: '0',
			zIndex: options.zIndex || '1500',
			width: '100%',
			backgroundImage: options.backgroundImage || "url(" + Kanshin.staticBase + "/images/overlay.png)"
		}

		this.elm = new Kanshin.dom.create('div', attribs, styles);

		var body = Kanshin.dom.body();
		body.insertBefore(this.elm, body.firstChild);
	},

	show: function() {
		if (this.elm.visible()) return;

		this._resize();
		this.elm.show();

		if (Kanshin.Overlay.openOverlayCount == 0) {
			if (Kanshin.remote) Kanshin.remote.dontClose = true;
			this._setFormSelectVisibility("hidden");
		}

		Kanshin.Overlay.openOverlayCount += 1;
	},

	hide: function() {
		if (!this.elm.visible()) return;

		this.elm.hide();

		Kanshin.Overlay.openOverlayCount -= 1;

		if (Kanshin.Overlay.openOverlayCount == 0) {
			if (Kanshin.remote) Kanshin.remote.dontClose = false;
			this._setFormSelectVisibility("visible");
		}
	},

	attach: function(elm) {
		Kanshin.dom.destroy(elm);
		elm.show();
		this.elm.appendChild(elm);
	},

	_resize: function() {
		this.elm.style.height = (Kanshin.window.pageSize().height + 'px');
	},

	_setFormSelectVisibility: function(visibility) {
		$A(document.getElementsByTagName("select")).each(function(elm) {
			elm.style.visibility = visibility;
		});
	}
}

Object.extend(Kanshin.Overlay, {
	show: function() {
		Kanshin.Overlay.cache = Kanshin.Overlay.cache || new Kanshin.Overlay({id: 'overlay'});
		Kanshin.Overlay.cache.show();
	},

	hide: function() {
		if (Kanshin.Overlay.cache) Kanshin.Overlay.cache.hide();
	},

	openOverlayCount: 0,
	cache: null
})

// 互換性のために定義
Object.extend(
	Kanshin,
	{
		sibling: Kanshin.dom.sibling,
		overlay: Kanshin.Overlay
	}
)

Kanshin.Url = Class.create()
Kanshin.Url.prototype = {
	initialize: function(url) {
		this.url = url
		this.separator = (url.indexOf('?') < 0 ? '?' : '&');
	},

	addParameter: function(name, value) {
		var params
		params = name
		if (value === undefined) {
			if (params.indexOf('=') < 0) {
				params += '=' + encodeURIComponent($F(name))
			}
		} else {
			params += '=' + encodeURIComponent(value)
		}

		this.url += this.separator + params
		this.separator = '&'

		return this
	},

	toString: function() {
		return this.url
	}
}

Kanshin.ToolTips = Class.create();
Kanshin.ToolTips.prototype = {
	initialize: function(elm, tips, option) {

		this.tips = tips;
		this.option = (option) ? option : {timeout: 3};

		var _position = Position.cumulativeOffset(elm);
		Element.setStyle(this.tips, {
			position: 'absolute',
			left: _position[0] + 'px',
			top: _position[1] + Element.getHeight(elm) + 'px',
			zIndex: Element.getStyle(elm ,'z-index') + 10
		});

		this.show();

		$(this.tips).onmouseover = function(e) { this.stopTimer(); }.bind(this);
		$(this.tips).onmouseout = function(e) { this.startTimer(); }.bind(this);
		$(this.tips).onclick = function(e) { this.hide(); }.bind(this);
	},
	show: function() { Kanshin.show(this.tips); this.startTimer(); },
	hide: function() { Kanshin.hide(this.tips); this.stopTimer(); },
	startTimer: function() {
		if (this._timer) { this.stopTimer(); }
		this._timer = new PeriodicalExecuter(function() { this.hide(); }.bind(this), this.option.timeout);
	},
	stopTimer: function() { this._timer.stop(); }
};

/*
 * Usage: new Kanshin.AlphaImage( el | els );
 */
Kanshin.AlphaImage = Class.create();
Kanshin.AlphaImage.prototype = {
	blank:	'/image/1x1.gif',
	filter: 'DXImageTransform.Microsoft.AlphaImageLoader',

	initialize: function(elems) {
		if (/MSIE (5\.5|6\.)/.test(navigator.userAgent)) {
			this.elems = (elems instanceof Array) ? elems.flatten() : $A([elems]);
			this.load();
		}
	},

	load: function() {
		$A(this.elems).each(function(elem) {
			if (elem.tagName.toLowerCase() == 'img') {
				this.fixwidth(elem);
				this.fixit(elem, elem.src);
				elem.src = this.blank;
				elem.runtimeStyle.behavior = 'none';
			} else {
				var matches = elem.getStyle('background-image').match(/^url[("']+(.*\.png)['")]+$/i);
				if (matches) {
					this.fixwidth(elem);
					this.fixit(elem, matches[1], 'crop');
					if (elem.tagName.toLowerCase() == 'a' && !elem.getStyle('cursor')) {
						elem.style.cursor = 'pointer';
					}
					this.fixchild(elem);
					elem.runtimeStyle.behavior = 'none';
				}
			}
		}.bind(this));
	},

	fixwidth: function(elem) {
		if (elem.getStyle('width') == 'auto' && elem.getStyle('height') == 'auto') {
			elem.setStyle({width: elem.getDimensions().width + 'px'});
		}
	},

	fixit: function (elem, src, method) {
		if (elem.filters[this.filter]) {
			var filter = elem.filters[this.filter];
			filter.enabled = true;
			filter.src = src;
			filter.sizingMethod = method;
		} else {
			var sizing = '';
			if (method) { sizing = ", sizingMethod='" + method + "'"; }
			elem.setStyle({filter: 'progid:' + this.filter + "(src='" + src + "'" + sizing + ")"});
		}
	},

	fixchild: function(elem, recursive) {
		$A(elem.childNodes).each(function(childNode) {
			if (childNode.style) {
				childNode.setStyle({position: 'relative'});
			}
			if (recursive && childNode.hasChildNodes()) {
				this.fixchild(childNode, recursive);
			}
		}.bind(this));
	}
};

Kanshin.category = {
	100:	{title: 'ブック'},
	200:	{title: 'グッズ'},
	300:	{title: 'グルメ'},
	400:	{title: 'エンターテイメント'},
	500:	{title: 'ミュージック'},
	600:	{title: 'スポーツ'},
	700:	{title: 'レジャー'},
	800:	{title: 'コンピュータ'},
	900:	{title: 'アート'},
	1000: {title: 'ノンカテゴリー'}
};
$R(1, 10).each(function(i) {
	Kanshin.category[i*100].icon = Kanshin.staticBase + '/images/icon/icon_cat'+('0'+i).slice(-2)+'.gif';
});

/*
 * thanks to: http://slightlyblue.com/blog/2006/08/javascript_1.html
 */
Kanshin.SmartScroll = {
	targetScrollTop : 0,	// we're gonna make the $(parentid).scrollTop -> targetScrollTop
	dist : 0,
	timer : 0,
	count : 0,
	parentid : 0,
	lastDist : 0,
	//speedStore : [],		// for debug
	options : {},
	defaultOptions : {
		time : 1*1000,		// [ms]
		unit : 50			// [ms]
	},
	scrollTo : function( element, parent, options ){
		this.options.time = this.defaultOptions.time;
		this.options.unit = this.defaultOptions.unit;
		if( options ){
			this.options.time = ( options.time ) ? options.time : this.options.time;
			this.options.unit = ( options.unit ) ? options.unit : this.options.unit;
		}
		clearInterval( this.timer );
		this.parentid = parent;

		this.scrollTopMax = this.$(parent).scrollHeight - this.$(parent).offsetHeight + parseInt(this.$(parent).style.borderTopWidth) + parseInt(this.$(parent).style.borderBottomWidth);

		if( navigator.userAgent.match( "MSIE" ) ){
			this.targetScrollTop = ( element ) ? this.$(element).offsetTop : 0;
		}else{
			var targetOffsetTop = ( element ) ? this.$(element).offsetTop : this.$(parent).offsetTop;
			this.targetScrollTop = targetOffsetTop - this.$(parent).offsetTop;
		}
		this.targetScrollTop = ( this.targetScrollTop > this.scrollTopMax ) ? this.scrollTopMax : this.targetScrollTop;

		this.dist = this.targetScrollTop - this.$(parent).scrollTop;
		this.lastDist = 0;
		this.timer = setInterval('Kanshin.SmartScroll.update()', this.options.unit );
		this.count = 0;
		//this.speedStore = [];
		this.update();
	},
	update : function(){
		var dist = this.targetScrollTop - this.$(this.parentid).scrollTop;
		var speed = 2 * dist * this.options.unit / ( this.options.time - this.options.unit * this.count );
		//this.speedStore.push( speed );
		speed = ( speed > 0 ) ? Math.ceil( speed ) : Math.floor( speed );
		if( Math.abs(dist) <= Math.abs(speed) ){
			// got there
			clearInterval( this.timer );
			this.$(this.parentid).scrollTop = this.targetScrollTop;
			return;
		}else if( this.lastDist == dist ){
			// stuck
			clearInterval( this.timer );
			this.$(this.parentid).scrollTop = this.targetScrollTop;
			return;
		}
		var scrollTop = this.$(this.parentid).scrollTop + speed;
		this.$(this.parentid).scrollTop = scrollTop;
		this.lastDist = dist;
		this.count++;
		if( this.count == this.options.time / this.options.unit ){
			// timeout
			clearInterval( this.timer );
			this.$(this.parentid).scrollTop = this.targetScrollTop;
		}
	},
	$ : function(id) {
		return document.getElementById(id);
	}
}

/*
	アコーディオンイフェクト
*/

Kanshin.Accordion = Class.create({
	initialize: function(container, height) {
		var self = this;
		var wait = 1.0;

		var pending = null;
		var pendingTarget = null;

		function cancelPending(ev) {
			if (pending) {
				pending.stop();
				pending = null;
			}
		}

		function trigerPanelOpen(ev) {
			if (self._opening) return;

			if (pendingTarget == ev.element()) return;

			cancelPending();
			pendingTarget = ev.element();

			pending = new PeriodicalExecuter(function(pe) {
				cancelPending();
				self.open(this._index);
			}.bind(this), wait);
		}

		function openPanel(ev) {
			cancelPending();
			self.open(this._index);
		}

		this._current = null;
		this._panelHeight = height;
		this._panels = container.childElements().collect(function(elm, index) {
			elm.show();

			var panel = new Kanshin.AccordionPanel(this, elm, index);

			panel.observe('mouseover', trigerPanelOpen);
			panel.observe('mousemove', trigerPanelOpen);
			panel.observe('mouseout', cancelPending);
			panel.observe('click', openPanel);

			return panel;
		}.bind(this));

		this.open(0);

		this._panels.each(function(panel, index) {
		});
	},

	open: function(index, now) {
		if (this._opening) return;
		if (this._current && this._current._index == index) return;

		var opening, closing;
		if (this._current) {
			this._current.close();
			closing = this._current;
		}
		this._current = null;

		if (index >= 0 && this._panels.length > index) {
			this._current = this._panels[index];
			this._current.open();
			opening = this._current;
		}

		if (now) {
			if (opening) opening.setHeight(this._panelHeight);
			if (closing) closing.setHeight(0);
		} else {
			this.animate(opening, closing);
		}
	},

	animate: function(opening, closing) {
		new Kanshin.AccordionEffect(opening, closing, this._panelHeight, {
			duration: 0.3,
			beforeStart: function() {
				this._opening = true;
			}.bind(this),
			afterFinish: function() {
				this._opening = false;
			}.bind(this)
		});
	},

	_openDone: function(ev) {
		this._opening = false;
		console.log(this);
	}
});

Kanshin.AccordionPanel = Class.create({
	initialize: function(accordion, elm, index) {
		var self = this;
		this._accordion = accordion;

		var children = elm.childElements();
		this._head = children[0];
		this._body = children[1];
		this._index = index;

		this._body.setStyle({ height: 0, overflow: 'hidden' });

		this._head.show();
		this._body.show();
	},

	open: function() {
		this._head.addClassName('hilite');
	},

	close: function() {
		this._head.removeClassName('hilite');
	},

	setHeight: function(h) {
		this._body.setStyle({ height: h + 'px' });
	},

	observe: function(event, f) {
		Event.observe(this._head, event, f.bind(this));
	}
});

Kanshin.AccordionEffect = function(opening, closing, height) {
	return new Effect.Tween(null,
		0,
		height,
		arguments[3] || { },
		function(p) {
			p = p.round();
			if (opening) opening.setHeight(p);
			if (closing) closing.setHeight(height - p);
		}
	);
}

/*
	ボタンの配列と、パネルとして表示される要素の配列を渡し、
	タブとして機能させるためのクラス
*/

Kanshin.Tab = Class.create({
	initialize: function(tabs, panels) {
		this._tabs = tabs;
		this._panels = panels;

		this._tabs.each(function(tab, index) {
			var panel = this._panels[index];

			Event.observe(tab, 'click', function(ev) {
				Event.stop(ev);

				this._tabs.each(function(e2) { e2.removeClassName('hilite'); });
				this._panels.each(Element.hide);

				tab.addClassName('hilite');
				if(panel) panel.show();
			}.bind(this));
		}.bind(this));
	}
});

/*
	画像複数登録インタフェースのためのクラス
*/

Kanshin.MultiImageUploader = Class.create({
	initialize: function(images) {
		// private class to manage image info
		var ImageFormElement = Class.create({
			initialize: function(info) {
				Object.extend(this, info);
			},

			status: function() {
				var status;

				if (this.url) {
					status = 'uploaded';
				} else if (this.inputForm.value) {
					status = 'waiting';
				} else {
					status = 'none';
				}

				return status;
			},

			showDomElementsOfState: function() {
				this.container.childElements().invoke('hide');
				this.moveButtonElm.show();
				this.upButtonElm.hide();
				this.downButtonElm.hide();

				switch (this.status()) {
					case 'uploaded':
						this.imageElm.show();
						this.deleteButtonElm.show();
						break;
					case 'waiting':
						this.waitStatusElm.show();
						this.cancelButtonElm.show();
						this.inputElm.show();
						break;
					case 'none':
					default:
						this.addStatusElm.show();
						this.inputElm.show();
						this.upButtonElm.hide();
						this.downButtonElm.hide();

						return true;
				}

				return false;
			},

			clear: function() {
				this.id = null;
				this.url = '';
				this.imageIdElm.value = '';
				this.imageUrlElm.src = '';

				var formElm = new Element('input');
				formElm.value = '';
				formElm.type = 'file';
				formElm.name = this.inputForm.name + 'test';
				formElm.size = this.inputForm.size;
				
				this.inputElm.insert(formElm);
				this.inputForm.remove();
				this.inputForm = formElm;
			},

			swap: function(nextInfo) {
				var tmpInputForm = this.inputForm;

				this.inputForm.remove();
				this.inputElm.appendChild(nextInfo.inputForm);
				this.inputForm = nextInfo.inputForm;

				nextInfo.inputElm.appendChild(tmpInputForm);
				nextInfo.inputForm = tmpInputForm;

				var tmp;

				tmp = this.inputForm.name;
				this.inputForm.name = nextInfo.inputForm.name;
				nextInfo.inputForm.name = tmp;

				tmp = this.imageIdElm.value;
				this.imageIdElm.value = nextInfo.imageIdElm.value;
				nextInfo.imageIdElm.value = tmp;

				tmp = this.imageUrlElm.src;
				this.imageUrlElm.src = nextInfo.imageUrlElm.src;
				nextInfo.imageUrlElm.src = tmp;

				tmp = this.url;
				this.url = nextInfo.url;
				nextInfo.url = tmp;

				tmp = this.id;
				this.id = nextInfo.id;
				nextInfo.id = tmp;
			},

			isNotEmpty: function() {
				return this.status() != 'none';
			}
		});

		this.images = images.collect(function(info, index) {
			var elm = $(info.element);

			info.index = index;
			info.container = elm;
			info.addStatusElm = elm.down('.addStatus');
			info.waitStatusElm = elm.down('.waitStatus');
			info.moveButtonElm = elm.down('.moveButton');
			info.upButtonElm = info.moveButtonElm.down('.upButton');
			info.downButtonElm = info.moveButtonElm.down('.downButton');
			info.cancelButtonElm = elm.down('.cancelButton');
			info.deleteButtonElm = elm.down('.deleteButton');
			info.imageElm = elm.down('.image');
			info.inputElm = elm.down('.inputElement');

			info.imageElm.select('input').each(function(input) {
				if (info.id) input.value = info.id;
				info.imageIdElm = input;
			}.bind(this));

			info.imageElm.select('img').each(function(img) {
				if (info.url) img.src = info.url;
				info.imageUrlElm = img;
			}.bind(this));

			info.upButtonElm.observe('click', this.up.bindAsEventListener(this));
			info.downButtonElm.observe('click', this.down.bindAsEventListener(this));
			info.cancelButtonElm.observe('click', this.cancel.bindAsEventListener(this));
			info.deleteButtonElm.observe('click', this.doDelete.bindAsEventListener(this));

			info.inputElm.select('input').each(function(input) {
				info.inputForm = input;
				input.observe('change', this.updated.bindAsEventListener(this));
			}.bind(this));

			info = new ImageFormElement(info);

			return info;
		}.bind(this));

		this.updated();
	},

	updated : function(ev) {
		this.images.each(function(info) { info.container.hide(); });

		this.images.each(function(info, index) {
			info.container.show();
			info.showDomElementsOfState();

			if (info.isNotEmpty()) {
				if (index > 0) {
					info.upButtonElm.show();
				}

				if (index < this.images.length - 1 && this.images[index + 1].isNotEmpty()) {
					info.downButtonElm.show();
				}
			} else {
				throw $break;
			}

		}.bind(this));
	},

	swapFormElement : function(elm) {
		var targetFound = false;

		this.images.each(function(info, i) {
			var isTarget = (elm.id == info.element);
			targetFound |= isTarget;

			if (targetFound) {
				if (isTarget) {
					info.clear();
					info.inputForm.observe('change', this.updated.bindAsEventListener(this));
				}
				var nextInfo = this.images[i + 1];
				if (nextInfo) {
					info.swap(nextInfo);
				}
			}
		}.bind(this));

		this.updated();
	},

	moveFormElement : function(info, direction) {
		var anotherInfo;

		switch (direction) {
			case 'up':
				anotherInfo = this.images[info.index - 1];
				break;
			case 'down':
				anotherInfo = this.images[info.index + 1];
				break;
		}

		if (anotherInfo) {
			info.swap(anotherInfo);
			this.updated();
		}
	},

    cancel: function(ev) {
		this.swapFormElement(this.findTargetElm(ev));
	},

	doDelete : function(ev) {
		if (Kanshin.confirm('画像を削除してもいいですか？')) {
			this.swapFormElement(this.findTargetElm(ev));
		}
	},

	up : function(ev) {
		this.moveFormElement(this.findTargetInfo(ev), 'up');
	},

	down : function(ev) {
		this.moveFormElement(this.findTargetInfo(ev), 'down');
	},

	findTargetElm: function(ev) {
		var eventElm = ev.element();
		return eventElm.up('.imageContainer');
	},

	findTargetInfo: function(ev) {
		var elm = this.findTargetElm(ev);
		
		return this.images.find(function(info) {
			return (elm.id == info.element);
		});
	}
});

Kanshin.geo = {
	viewport: function() {
		return Kanshin.geo.Rect.create(document.viewport.getScrollOffsets(), document.viewport.getDimensions());
	}
};

Kanshin.geo.Rect = Class.create({
	initialize: function(p1, p2, p3, p4) {
		switch (arguments.length) {
			case 1: // size only
				this.origin = Element._returnOffset(0, 0);
				this.size = p1;
				break;
			case 2: // origin and size
				this.origin = p1;
				this.size = p2;
				break;
			case 4: // left, top, right, bottom
				this.origin = Element._returnOffset(p1, p2);
				this.size = {width: p3 - p1, height: p4 - p2};
				break;
			default:
				this.origin = Element._returnOffset(0, 0);
				this.size = {width: 0, height: 0};
				break;
		}

		this.left = this.origin.left;
		this.top = this.origin.top;
		this.right = this.origin.left + this.size.width;
		this.bottom = this.origin.top + this.size.height;
	},

	empty: function() {
		return (this.size.width <= 0 || this.size.height <= 0);
	},

	equal: function(r) {
		return (!this.empty() && !r.empty() && this.left == r.left && this.top == r.top && this.right == r.right && this.bottom == r.bottom);
	},

	intersect: function(r) {
		return Kanshin.geo.Rect.create(
					Math.max(this.left, r.left),
					Math.max(this.top, r.top),
					Math.min(this.right, r.right),
					Math.min(this.bottom, r.bottom));
	},

	union: function(r) {
		return Kanshin.geo.Rect.create(
					Math.min(this.left, r.left),
					Math.min(this.top, r.top),
					Math.max(this.right, r.right),
					Math.max(this.bottom, r.bottom));
	},

	isOverlapped: function(r) {
		return !this.intersect(r).empty();
	},

	isFullyOverlapped: function(r) {
		var r2 = this.union(r);
		return (r2.equal(this) || r2.equal(r));
	}
});

Kanshin.geo.Rect.create = function(p1, p2, p3, p4) {
	var r;
	if (p4 != undefined) r = new Kanshin.geo.Rect(p1, p2, p3, p4);
	else if (p2 != undefined) r = new Kanshin.geo.Rect(p1, p2);
	else if (p1 != undefined) r = new Kanshin.geo.Rect(p1);
	else r = null;

	if (!r || r.empty()) return new Kanshin.geo.Rect(0, 0, 0, 0);
	return r;
}



Element.addMethods(Kanshin.ElementExtensions);

Event.observe(document, 'dom:loaded', Kanshin._onReady.bindAsEventListener(Kanshin));
Event.observe(window, 'load', Kanshin._onLoad.bindAsEventListener(Kanshin));

function reload() {
	location.reload(true);
}

var K = Kanshin
