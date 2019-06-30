(function(){
	for(i=0; i<document.links.length; i++){
		if(document.links[i].hash=='#contentAll'){
			document.links[i].onclick = function(){
				var left = document.body.scrollLeft || document.documentElement.scrollLeft;
				scrollTo(left, 0);
				return false;
			}
		}
	}
})();
