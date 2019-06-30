var gnaviAlpha = new function(){

	/* get item */
	var menu = [];
	//menu[n]       : navi
	//menu[n].a     : navi's link
	//menu[n].child : navi's child	
	(function(){
		var naviP = document.getElementById('headGlobalNavi');
		var naviC = document.getElementById('GlobalNaviChild');	
		var li = naviP.getElementsByTagName('li');
		var cnt = 0;
		for(i=0; i<li.length; i++){
			if(li[i].className=='naviParent'){			
				menu[cnt] = li[i];
				menu[cnt].a = menu[cnt].getElementsByTagName('a')[0];
				menu[cnt].num = menu[cnt].id.replace('headGlobalNavi','');
				menu[cnt].child = document.getElementById('GlobalNaviChild'+menu[cnt].num);
				menu[cnt].timer = -1;
				kmsEFF.alpha(menu[cnt].child, 0);
				cnt++;
			}
		}
	})();

	var save = -1;
	/* event set */
	(function(){
		for(i=0; i<menu.length; i++){
			menu[i].a.i = i;
			menu[i].child.i = i;

			//menu over
			menu[i].a.onmouseover = function(){
				childOn(this.i);
			}
			//child over
			menu[i].child.onmouseover = function(){
				childOn(this.i);
			}
			//item out
			menu[i].a.onmouseout = function(){
				var id = this.i;
				childOff(this.i);
			}
			menu[i].child.onmouseout = function(){
				childOff(this.i);
			}
		}
	})();	

	/* move func */
	function childOn(id){
		if(!menu[id].a.dFlg){menu[id].a.className = 'childOn';}
		menu[id].child.style.display = 'block';
		kmsEFF.alphaAnime(
			menu[id].child,
			kmsEFF.getAlpha(menu[id].child),
			100,
			0.2
		);
	}
	function childOff(id){
		if(!menu[id].a.dFlg){menu[id].a.className = '';}

		kmsEFF.alphaAnime(
			menu[id].child,
			kmsEFF.getAlpha(menu[id].child),
			0,
			0.2,
			function(){	menu[id].child.style.display = 'none';}
		);
	}
}