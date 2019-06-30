function ChangeStyle(styleTitle)
{
  var sheets = document.styleSheets;
  var images = new Array('SS','MM','LL');
  if (sheets){
    for (var i = 0; i < sheets.length; i++){
      if ((styleTitle && sheets[i].title == styleTitle) || sheets[i].title == 'base'){
        sheets[i].disabled = false;
      }else{
        sheets[i].disabled = true;
        document.getElementById(styleTitle).src = "img/" + styleTitle + "2.gif";
        for (j=0; j<=2; j++){
          if(images[j] != styleTitle){
            document.getElementById(images[j]).src = "img/" + images[j] + "1.gif";
          }
        }
      }
    }
  }
}

function FontZoom(){
	if(navigator.appName=="Microsoft Internet Explorer"){
		document.write("<IMG SRC=\"img/fontsize.gif\" WIDTH=\"75\" HEIGHT=\"18\" ALT=\"•¶ŽšƒTƒCƒY\" BORDER=\"0\" ALIGN=\"absmiddle\">");
		document.write("<a href=\"#\" onclick=\"javascript:ChangeStyle('SS');\"><img src=\"img/SS2.gif\" name=\"SS\" id=\"SS\" border=\"0\"></a>");
		document.write("<a href=\"#\" onclick=\"javascript:ChangeStyle('MM');\"><img src=\"img/MM1.gif\" name=\"MM\" id=\"MM\" border=\"0\"></a>");
		document.write("<a href=\"#\" onclick=\"javascript:ChangeStyle('LL');\"><img src=\"img/LL1.gif\" name=\"LL\" id=\"LL\" border=\"0\"></a>");
	}
}


function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}

function setColor() {
	var url = "css/";
	document.write('<LINK REL="alternate stylesheet" TYPE="text/css" HREF="'+url+'s.css" title="SS" media="print, screen">');
	document.write('<LINK REL="alternate stylesheet" TYPE="text/css" HREF="'+url+'m.css" title="MM" media="print, screen">');
	document.write('<LINK REL="alternate stylesheet" TYPE="text/css" HREF="'+url+'l.css" title="LL" media="print, screen">');
}

MM_reloadPage(true);
