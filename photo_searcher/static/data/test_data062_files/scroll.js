var Win=(navigator.userAgent.indexOf("Win")!=-1);
var Mac=(navigator.userAgent.indexOf("Mac")!=-1);
var Explorer=(navigator.appName.indexOf("Explorer")!=-1);
var Netscape=(navigator.appName.indexOf("Netscape")!=-1);
var Version=navigator.appVersion.charAt(0);

var exec;
function getSCR(){
	var x=0
	var y=0;
	if(Explorer){
			x=document.body.scrollLeft;y=document.body.scrollTop;
	}else if(Netscape && Version=="5"){
			x=window.scrollX;y=window.scrollY;
	}else if(Netscape && Version=="4"){
			x=window.pageXOffset;y=window.pageYOffset;
	}
	return {x:x,y:y};
}

//スクロール実行部
function goSCR(x,y,cnt){
	var step=50;
	var rewrt=3;
	exec=getSCR();
	if(cnt++<step){
			var p=cnt/step;
			var q=p-1/Math.PI*Math.sin(Math.PI*p);
			var x_=exec.x+(x-exec.x)*q;
			var y_=exec.y+(y-exec.y)*q;
			window.scrollTo(x_,y_);
			setTimeout("goSCR("+x+","+y+","+cnt+");",rewrt);
	}
	getSCR();
}
function jumpToPageTop(){
	goSCR(0,0,0);
}