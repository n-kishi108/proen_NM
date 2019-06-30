/*
 * swapimages.js
 *
 */

var swapImage = {
	className : 'swpImg',
	defaultName : '_df',
	hoverName : '_ov',
	
	init : function() {
		this.set('IMG');
		this.set('INPUT');
	},
	
	set : function(tagName) {
		var parent = this;
		var length = document.getElementsByTagName(tagName).length;
		for(var i = 0; i < length; i++) {
			var element = document.getElementsByTagName(tagName)[i];
			if(element.className == parent.className) {
				var hv = this.getHoverImage(element.src);
				parent.preload(hv);
				element.onmouseover = function() {
					this.src = parent.getHoverImage(this.src);
				}
				element.onmouseout = function() {
					this.src = parent.getDefaultImage(this.src);
				}
			}
		}
	},
	
	getExtension : function(string) {
		return string.substr(string.lastIndexOf('.'), string.length);
	},
	
	getDefaultImage : function(image) {
		var extension = this.getExtension(image);
		return image.replace(this.hoverName,this.defaultName);
	},
	
	getHoverImage : function(image) {
		var extension = this.getExtension(image);
		return image.replace(this.defaultName,this.hoverName);
	},
	
	
	preload : function() {
		if(document.images) {
			if(!ary) var ary = new Array();
			var length = ary.length;
			var arg = this.preload.arguments;
			for(var i = 0; i < arg.length; i++) {
				ary[length] = new Image;
				ary[length].src = arg[i];
			}
		}
	}
}

//window.onload = function() { swapImage.init(); }
