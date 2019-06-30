window.onerror = null;

var ver4 = (navigator.appVersion.charAt(0) >= "4");
var NN4  = ver4 && (navigator.appName.charAt(0) == "N");
var IE4  = ver4 && (navigator.appName.charAt(0) == "M");
var NN3  = ((navigator.appVersion.charAt(0) == "3") &&
            (navigator.appName.charAt(0) == "N"));

//MENU_TAB
if(NN3 || NN4 || IE4){
var img_st = new Array();
img_st[11] = new Image(); img_st[11].src = "/img/tab/top.gif"
img_st[12] = new Image(); img_st[12].src = "/img/tab/women.gif"
img_st[13] = new Image(); img_st[13].src = "/img/tab/game.gif"
img_st[14] = new Image(); img_st[14].src = "/img/tab/cd.gif"
img_st[15] = new Image(); img_st[15].src = "/img/tab/fig.gif"
img_st[16] = new Image(); img_st[16].src = "/img/tab/oth.gif"
img_st[17] = new Image(); img_st[17].src = "/img/tab/mk.gif"
img_st[18] = new Image(); img_st[18].src = "/img/tab/mkp.gif"

img_st[21] = new Image(); img_st[21].src = "/img/tab/top2.gif"
img_st[22] = new Image(); img_st[22].src = "/img/tab/women2.gif"
img_st[23] = new Image(); img_st[23].src = "/img/tab/game2.gif"
img_st[24] = new Image(); img_st[24].src = "/img/tab/cd2.gif"
img_st[25] = new Image(); img_st[25].src = "/img/tab/fig2.gif"
img_st[26] = new Image(); img_st[26].src = "/img/tab/oth2.gif"
img_st[27] = new Image(); img_st[27].src = "/img/tab/mk2.gif"
img_st[28] = new Image(); img_st[28].src = "/img/tab/mkp2.gif"
}

function ST_in(nam,num){
if(NN3 || NN4 || IE4) document.images[nam].src = img_st[num].src;
}

function ST_out(nam,num){
if(NN3 || NN4 || IE4) document.images[nam].src = img_st[num].src;
return false;
}


function Countdown(yy, mm, dd, days, msg1, msg2, msg3, msg4){
	var today = new Date();
	var xDay = new Date(yy, mm-1, dd);
	d = (xDay.getTime() - today.getTime()) / (24*60*60*1000);
	d = Math.ceil(d);
	if (d >15){
	}else if (d > 0){
		document.write(msg1);
		document.write(d);
		document.write(msg2);
	}else if (d == 0){
		document.write(msg3);
	}else{
		if (d * -1 < days || days == 0){
			document.write(msg4);
		}
	}
}

function Countdown2(yy, mm, dd, days, msg1, msg2, msg3, msg4){
	var today = new Date();
	var xDay = new Date(yy, mm-1, dd);
	d = (xDay.getTime() - today.getTime()) / (24*60*60*1000);
	d = Math.ceil(d);
	if (d >15){
	}else if (d > 0){
		document.write(msg1);
//		document.write(d);
		document.write(msg2);
	}else if (d == 0){
		document.write(msg3);
	}else{
		if (d * -1 < days || days == 0){
			document.write(msg4);
		}
	}
}
