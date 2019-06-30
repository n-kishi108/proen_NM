
/* Onload */
function protectImageLoad() {

	var tagName = 'a';
	var target = null;

	if (document.all) {
		target = document.all.tags(tagName);
	} else if(document.getElementsByTagName) {
		target = document.getElementsByTagName(tagName);
	}

	for (i=0; i<target.length; i++) {
		new imgProtect(target[i]);
	}

	oncontextmenuOffByTagName('img');
}

/* 画像保護処理 */
function imgProtect(a){

	var self = this;
	this.aObj = a;

	/* イベントリスナー登録関数 */
	this.addEvent = function(el, evname, func) {
		if (el.attachEvent) {
			el.attachEvent("on" + evname, func);
		} else {
			el.addEventListener(evname, func, true);
		}
	};

	/* user_imagesディレクトリの画像は保護 */
	function onclickOffByA() {
		var link = self.aObj.href || '';

		if (link.indexOf('/user_images/') > -1) {
			self.aObj.href = '#';
		}
	}

	this.addEvent(a, 'click', onclickOffByA);

}



/* 右クリック禁止処理 */
function oncontextmenuOffByTagName(tagName) {
	var target = null;

	if (document.all) {
		target = document.all.tags(tagName);
	} else if(document.getElementsByTagName) {
		target = document.getElementsByTagName(tagName);
	}
	var i = 0;
	var length = 0;

	if (target) {
		length = target.length;
		for (i=0; i<length; i++) {
			target[i].oncontextmenu = function(){return false;};
		}
	}
}

