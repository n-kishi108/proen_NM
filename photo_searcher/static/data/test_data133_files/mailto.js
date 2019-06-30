function display_mailto() {
	var mail = "";
	mail += "info";
	mail += "@";
	mail += "asaki.co.jp";
	try {
		document.getElementById("mailto").innerHTML = mail;
		document.getElementById("mailto").href = "mailto:" + mail;		
	} catch(e) { }
	try {
		document.getElementById("mailto2").innerHTML = mail;
		document.getElementById("mailto2").href = "mailto:" + mail;
	} catch(e) { }
}

if(window.addEventListener) {
	window.addEventListener("load", display_mailto, false);
} else if(window.attachEvent) {
	window.attachEvent("onload", display_mailto);
}
