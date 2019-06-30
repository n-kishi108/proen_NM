// Google Analytics

var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");

var header = document.getElementsByTagName("head")[0];
var scriptTag = document.createElement("script");
scriptTag.setAttribute("src", gaJsHost + "google-analytics.com/ga.js");
scriptTag.setAttribute("type", "text/javascript");

header.appendChild(scriptTag);

function analytics() {
	try {
		var pageTracker = _gat._getTracker("UA-2040701-1");
		pageTracker._setDomainName(".kyoto-su.ac.jp");
		pageTracker._trackPageview();
	} catch(err) {
		// alert("Google Analytics:" + err);
	}
}

if (window.attachEvent) {
	window.attachEvent("onload", analytics);
} else {
	window.addEventListener("load", analytics, false);
}
