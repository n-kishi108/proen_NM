/*=====================
 effecct library @ digitalcom
 090203
======================*/

var kmsEFF = new function(){

	// 初期設定
	var fps = 30;	// frame rate
	
	// 各要素のアニメーション用タイマーを設定
	function kmsElement(elem){
		if(!elem.timer){
			elem.timer = {
				fade : 0,	// alphaAnime
				move : 0,	// positionAnime
				size : 0,	// sizeAnime
				color: 0, // RGBAnime
				margin:0  // marginAnime
			};
			elem.drugObj = {};
		}
		return elem;
	};
	
	// スタイル初期化
	this.initStyle = function(elem,pram){
		var style = elem.currentStyle || document.defaultView.getComputedStyle(elem, '');
		elem.style[pram]  = style[pram];
	};

	// 透過
	this.alpha = function(elem, opacity){
		kmsElement(elem).style.opacity = opacity / 100;
		kmsElement(elem).style.filter = 'alpha(opacity=' + opacity + ')';
	};

	// サイズ
	this.size = function(elem, size){
		kmsElement(elem).style.width  = size.width  + 'px';
		kmsElement(elem).style.height = size.height + 'px';
	};

	// ポジション
	this.position = function(elem, position){
		kmsElement(elem).style.left = position.x + 'px';
		kmsElement(elem).style.top  = position.y + 'px';
	};

	// RGBcolor
	this.RGB = function(elem, cssPropaty, rgb){
		function get16(num){
			var s = rgb[num].toString(16);
			return s.length == 1 ? '0' + s : s;
		}
		var color = '#' +get16(0) + get16(1) + get16(2);
		kmsElement(elem).style[cssPropaty] = color;
	};
	// 
	this.margin = function(elem, cssPropaty, margin){
		kmsElement(elem).style[cssPropaty] = margin + 'px';
	};
	
	// 透過取得
	this.getAlpha = function(elem){
		var alpha;
		if(document.getElementById && !document.all){
			alpha = kmsElement(elem).style.opacity * 100;
		}else if(document.all){
			alpha = (kmsElement(elem).style.filter+'').replace(/\D/g,'');
		}else{
			alpha = 100;
		}
		return Number(alpha);
	};

	// サイズ取得
	this.getSize = function(elem){
		var size = {
			height : Number(kmsElement(elem).style.height.replace('px','')),
			width  : Number(kmsElement(elem).style.width.replace('px',''))
		};
		return size;
	};

	// ポジション取得
	this.getPosition = function(elem){
		var position = {
			x : Number(kmsElement(elem).style.left.replace('px','')),
			y : Number(kmsElement(elem).style.top.replace('px',''))
		};
		return position;
	};

	// RGBcolor取得
	this.getRGB = function(elem, cssPropaty){
		var elemStyle = kmsElement(elem).style[cssPropaty];
		var color;
		if( elemStyle.match(/^#/) ){
			function getS(num){	return elemStyle.charAt(num); }
			elemStyle = elemStyle.substring(1);
			if(elemStyle.length==3){ elemStyle = getS(0) + getS(0) + getS(1) + getS(1) + getS(2)+ getS(2); }
			color = [ parseInt( (getS(0)+getS(1)), 16) ,  parseInt( (getS(2)+getS(3)), 16),  parseInt( (getS(4)+getS(5)), 16) ];
		}
		else{
			elemStyle = elemStyle.replace(/[^0-9|,]/g,'');
			elemStyle = elemStyle.split(',');
			color = [Number(elemStyle[0]), Number(elemStyle[1]), Number(elemStyle[2])];
		}
		return color;
	};


	//otherStyle
	this.getCssPropaty = function(elem, cssPropaty){
		return Number(kmsElement(elem).style[cssPropaty].replace('px',''));
	};

	// ページトップからの絶対位置取得
	this.getAbsPosition = function(elem){
		var position = {
			x : elem.offsetLeft,
			y : elem.offsetTop
		};
		// 親要素を取得して位置情報を修正
		while(elem.offsetParent) {
				elem = elem.offsetParent;
				position.x += elem.offsetLeft;
				position.y += elem.offsetTop;
		}
		return position;
	};

	// エレメントからのマウス相対座標取得
	this.getMouseElement = function(elem, e){
		var elemPos  = kmsEFF.getAbsPosition(elem);
			if(e) {
			position = {
				x : e.pageX - elemPos.x,
				y : e.pageY - elemPos.y
			}
		}else {
			position = {
				x : event.x + document.body.scrollLeft,
				y : event.y + document.body.scrollTop
			}
		}
		return position;
	};

	// ストップ
	this.stopAnime = function(elem){
		var propaty = ['fade', 'move', 'size', 'color'];
		for(i=0; i<propaty.length; i++){
			clearInterval(kmsElement(elem).timer[propaty[i]]);	
		}
	};

	// 透過アニメーション
	// elem     : DOMelement
	// start    : start opacity (0-100)
	// end      : end opacity   (0-100)
	// sec      : animation time(second)
	// callback : callback function *
	this.alphaAnime = function(elem, start, end, sec, callback){
		clearInterval(kmsElement(elem).timer.fade);	
		var frame = 0;
		var tFrame = Math.floor( (sec * 1000) / Math.floor(1000/fps) );
	
		elem.timer.fade = setInterval( function(){
			var o = Math.floor(easingCalc( frame, start, (end-start), tFrame , 'easeNone') );
			kmsEFF.alpha(elem, o);
			if(frame++ == tFrame){ callbackRun(elem, 'fade', callback); }
		}, Math.floor(1000/fps) );
	};

	// サイズアニメーション
	// elem     - DOMelement 
	// start    - start position ({width,height})
	// end      - end position ({width,height})
	// sec      - animation time(second)
	// type     - easingtype
	// callback - callback function *
	this.sizeAnime = function(elem, start, end, sec, type, callback){
		clearInterval(kmsElement(elem).timer.size);	

		var frame = 0;
		var tFrame = Math.floor( (sec * 1000) / Math.floor(1000/fps));
		
		elem.timer.size = setInterval( function(){
			var w = Math.round( easingCalc( frame, start.width, (end.width-start.width), tFrame , type) );
			var h = Math.round( easingCalc( frame, start.height, (end.height-start.height), tFrame , type) );
			kmsEFF.size(elem, {width:w, height:h});
			if(frame++ == tFrame){ callbackRun(elem, 'size', callback); }
		}, Math.floor(1000/fps) );
	};

	// ポジションアニメーション
	// elem     - DOMelement 
	// start    - start position ({x,y})
	// end      - end position ({x,y})
	// sec      - animation time(second)
	// type     - easingtype
	// callback - callback function *
	this.positionAnime = function(elem, start, end, sec, type, callback){
		clearInterval(kmsElement(elem).timer.position);	

		var frame = 0;
		var tFrame = Math.floor( (sec * 1000) / Math.floor(1000/fps));
		
		elem.timer.position = setInterval( function(){
			var left = Math.round( easingCalc( frame, start.x, (end.x-start.x), tFrame , type) );
			var top  = Math.round( easingCalc( frame, start.y, (end.y-start.y), tFrame , type) );
			kmsEFF.position(elem, {x:left, y:top});
			if(frame++ == tFrame){ callbackRun(elem, 'position', callback); }
		}, Math.floor(1000/fps) );
	};

	// RGBアニメーション
	this.RGBAnime = function(elem, cssPropaty, start, end, sec, type, callback){
		clearInterval(kmsElement(elem).timer.color);	

		var frame = 0;
		var tFrame = Math.floor( (sec * 1000) / Math.floor(1000/fps));
		
		elem.timer.color = setInterval( function(){
			var c = [];
			c[0] = Math.floor( easingCalc( frame, start[0], (end[0]-start[0]), tFrame , type) );
			c[1] = Math.floor( easingCalc( frame, start[1], (end[1]-start[1]), tFrame , type) );
			c[2] = Math.floor( easingCalc( frame, start[2], (end[2]-start[2]), tFrame , type) );
			kmsEFF.RGB(elem, cssPropaty, c);
			if(frame++ == tFrame){ callbackRun(elem, 'color', callback); }
		}, Math.floor(1000/fps) );
	};

	// マージンアニメーション
	this.marginAnime = function(elem, cssPropaty, start, end, sec, type, callback){
		clearInterval(kmsElement(elem).timer.margin);	

		var frame = 0;
		var tFrame = Math.floor( (sec * 1000) / Math.floor(1000/fps));
		
		elem.timer.margin = setInterval( function(){
			var m = Math.round( easingCalc( frame, start, (end-start), tFrame , type) );
			kmsEFF.margin(elem, cssPropaty, m);
			if(frame++ == tFrame){ callbackRun(elem, 'margin', callback); }
		}, Math.floor(1000/fps) );
	};

	// mouse event
	this.eventSet = function(elem, handler, func){
		elem[handler] = function(e){
			if(!e){e = window.event;}
			return func.call(this, e);
		}
	};

	// drug
	this.drug = function(elem, startFunc, endFunc, moveFunc, limit){
		function run(e, func){
			if(func)func.call(elem, e);
			return false;
		};
		var save = kmsElement(elem).drugObj;
		var doc = document;
		// press
		kmsEFF.eventSet(elem, "onmousedown", function(e){
			save.start = true;

				// move
				var	x = e.clientX, y = e.clientY;
				save.x = x - elem.offsetLeft;
				save.y = y - elem.offsetTop;
				kmsEFF.eventSet(doc, "onmousemove", function(e){
					if(save.start) {
					var	x = e.clientX, y = e.clientY;
					var pos = {x: x - save.x, y: y - save.y};					
						if(limit) {
							pos.x = Math.max(pos.x, limit.xMin);
							pos.y = Math.max(pos.y, limit.yMin);
							pos.x = Math.min(pos.x, limit.xMax);
							pos.y = Math.min(pos.y, limit.yMax);
						};
						kmsEFF.position(elem, pos);
						run(e, moveFunc);
					}
					return false;
				});
	
			save.onmousedown = doc.onmousedown;
			save.onmouseup = doc.onmouseup;
			doc.onmouseup = elem.onmouseup;
			doc.onmousedown = run;
			return run(e, startFunc);

		});
		// up
		kmsEFF.eventSet(elem, "onmouseup", function(e){
			save.start = false;
			doc.onmousemove = null;
			doc.onmousedown = save.onmousedown;
			doc.onmouseup = save.onmouseup;
			return run(e, endFunc);
		});

	};

	// コールバック
	function callbackRun(elem, interval, callback){
		clearInterval(elem.timer[interval]);	// 参照Intervalクリア
		if(callback){
			callback.call(elem);
		}
	};

	// イージング関数
	function easingCalc(t, b, c, d, type){
		switch(type){
			case 'easeNone':
				return c * t/d + b;
					
			case 'easeInQuad':
				return c * (t/=d) * t + b;
					
			case 'easeOutQuad':
				return -c * (t/=d) * (t-2) + b;
					
			case 'easeInOutQuad':
				if((t/=d/2) < 1) return c/2 * t * t + b;
				return -c/2 * ((--t) * (t-2) - 1) + b;
					
			case 'easeOutInQuad':
				if(t < d/2) return  easingCalc(t*2, b, c/2, d, 'easeOutQuad');
				return easingCalc((t*2)-d, b+c/2, c/2, d, 'easeInQuad');
		
			case 'easeInCubic':
				return c * (t/=d) * t * t + b;
					
			case 'easeOutCubic':
				return c * ((t=t/d-1) * t * t + 1) + b;
					
			case 'easeInOutCubic':
				if((t/=d/2) < 1) return c/2 * t * t * t + b;
				return c/2 * ((t-=2) * t * t + 2) + b;
					
			case 'easeOutInCubic':
				if(t < d/2)return easingCalc(t*2, b, c/2, d,'easeOutCubic');
				return easingCalc((t*2)-d, b+c/2, c/2, d, 'easeInCubic');
		
			case 'easeInQuart':
				return c * (t/=d) * t * t * t + b;
					
			case 'easeOutQuart':
				return -c * ((t=t/d-1) * t * t * t - 1) + b;
					
			case 'easeInOutQuart':
				if ((t/=d/2) < 1) return c/2 * t * t * t * t + b;
				return -c/2 * ((t-=2) * t * t * t - 2) + b;
		
			case 'easeOutInQuart':
				if(t < d/2)return easingCalc(t*2, b, c/2, d, 'easeOutQuart');
				return easingCalc((t*2)-d, b+c/2, c/2, d, 'easeInQuart');
		
			case 'easeInQuint':
				return c * (t/=d) * t * t * t * t + b;
					
			case 'easeOutQuint':
				return c * ((t=t/d-1) * t * t * t * t + 1) + b;
					
			case 'easeInOutQuint':
				if ((t/=d/2) < 1) return c/2 * t * t * t * t * t + b;
				return c/2 * ((t-=2) * t * t * t * t + 2) + b;
		
			case 'easeOutInQuint':
				if(t < d/2) return easingCalc(t*2, b, c/2, d, 'easeOutQuint');
				return easingCalc((t*2)-d, b+c/2, c/2, d,'easeInQuint');
		
			case 'easeInSine':
				return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
					
			case 'easeOutSine':
				return c * Math.sin(t/d * (Math.PI/2)) + b;
					
			case 'easeInOutSine':
				return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		
			case 'easeOutInSine':
				if(t < d/2) return easingCalc(t*2, b, c/2, d, 'easeOutSine');
				return easingCalc((t*2)-d, b+c/2, c/2, d, 'easeInSine');
		
			case 'easeInExpo':
				return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b - c * 0.001;
					
			case 'easeOutExpo':
				return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b;
					
			case 'easeInOutExpo':
				if (t==0) return b;
				if (t==d) return b+c;
				if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b - c * 0.0005;
				return c/2 * 1.0005 * (-Math.pow(2, -10 * --t) + 2) + b;
					
			case 'easeOutInExpo':
				if (t < d/2) return easingCalc(t*2, b, c/2, d, 'easeOutExpo');
				return easingCalc((t*2)-d, b+c/2, c/2, d,  'easeInExpo');
		
			case 'easeInCirc':
				return -c * (Math.sqrt(1 - (t/=d) * t) - 1) + b;
					
			case 'easeOutCirc':
				return c * Math.sqrt(1 - (t=t/d-1) * t) + b;
					
			case 'easeInOutCirc':
				if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t * t) - 1) + b;
				return c/2 * (Math.sqrt(1 - (t-=2) * t) + 1) + b;
					
			case 'easeOutInCirc':
				if (t < d/2) return easingCalc(t*2, b, c/2, d, 'easeOutCirc');
				return easingCalc((t*2)-d, b+c/2, c/2, d,  'easeInCirc');

			case 'easeInBack':
				var s = 1.70158;
				return c*(t/=d)*t*((s+1)*t - s) + b;

			case 'easeOutBack':
				var s = 1.70158;
				return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;

			case 'easeInOutBack':
				var s = 1.70158;
				if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
				else return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
						
			case 'easeInBounce':
				return c - easingCalc(d-t, 0, c, d,'easeOutBounce') + b;
					
			case 'easeOutBounce':
				if ((t/=d) < (1/2.75))   return c * (7.5625 * t * t) + b;
				else if (t < (2/2.75))   return c * (7.5625 * (t-=(1.5/2.75)) * t + .75) + b;
				else if (t < (2.5/2.75)) return c * (7.5625 * (t-=(2.25/2.75)) * t + .9375) + b;
				else                     return c * (7.5625 * (t-=(2.625/2.75)) * t + .984375) + b;
					
			case 'easeInOutBounce':
				if (t < d/2) return easingCalc(t*2, 0, c, d, 'easeInBounce') * .5 + b;
				else return easingCalc(t*2-d, 0, c, d, 'easeOutBounce') * .5 + c * .5 + b;
					
			case 'easeOutInBounce':
				if (t < d/2) return easingCalc(t*2, b, c/2, d,'easeOutBounce');
				else return easingCalc((t*2)-d, b+c/2, c/2, d, 'easeInBounce');			
		}
	};

};