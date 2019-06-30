//mouse over
function imgChange(n){
	var imgsrc = document.images[n].src;
	if(imgsrc.indexOf("_on") < 0){document.images[n].src=imgsrc.substring(0,imgsrc.length-4) +"_on.gif";}
	else{document.images[n].src=imgsrc.substring(0,imgsrc.length-7) +".gif";}
}

function jpgChange(n){
	var imgsrc = document.images[n].src;
	if(imgsrc.indexOf("_on") < 0){document.images[n].src=imgsrc.substring(0,imgsrc.length-4) +"_on.jpg";}
	else{document.images[n].src=imgsrc.substring(0,imgsrc.length-7) +".jpg";}
}


