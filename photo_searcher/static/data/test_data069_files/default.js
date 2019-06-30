// Big-S	‹¤’ÊJS

//pop up
function openNewWin(url, name, w, h) {
	var newWin;
	var options = "toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes,";
	newWin = window.open(url, name,"width=" + w + ",height=" + h + options);
	newWin.focus();
}


//mouse over
function smartRollover() {
	if(document.getElementsByTagName) {
		var images = document.getElementsByTagName("img");

		for(var i=0; i < images.length; i++) {
			if(images[i].getAttribute("src").match("_o."))
			{
				images[i].onmouseover = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_o.", "_on."));
				}
				images[i].onmouseout = function() {
					this.setAttribute("src", this.getAttribute("src").replace("_on.", "_o."));
				}
			}
		}
	}
}

if(window.addEventListener) {
	window.addEventListener("load", smartRollover, false);
}
else if(window.attachEvent) {
	window.attachEvent("onload", smartRollover);
}


var top_dir = '';