img = new Array();
imgh = new Array();


img[0] = "http://horizon1982.com/assets_c/2009/11/_MG_9314-thumb-550xauto-691.jpg";


img[1] = "http://horizon1982.com/assets_c/2009/11/IMG_1189-thumb-550xauto-688.jpg";


img[2] = "http://horizon1982.com/assets_c/2009/11/IMG_1189-thumb-550xauto-688.jpg";


img[3] = "http://horizon1982.com/assets_c/2009/06/_MG_5984-thumb-550xauto-682.jpg";


img[4] = "http://horizon1982.com/assets_c/2009/05/_MG_5652-thumb-550xauto-675.jpg";


img[5] = "http://horizon1982.com/assets_c/2008/06/MVI_0290_0001-2-thumb-550xauto-549.jpg";



img[6] = "http://horizon1982.com/assets_c/2008/05/2007_0523函館0047-thumb-550xauto-294.jpg";


img[7] = "http://horizon1982.com/assets_c/2008/03/topimage_test-thumb-550xauto-22.jpg";



n = Math.floor(Math.random()*img.length);
if (imgh[n] == 1){
	document.write("<img src='"+img[n]+"' height='160' class='topimage' />");
} else {
	document.write("<img src='"+img[n]+"' width='550' class='topimage' />");
}
