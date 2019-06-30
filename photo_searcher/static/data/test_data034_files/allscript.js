// JavaScript Document
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function mmLoadMenus() {
  if (window.mm_menu_0518074615_0) return;
      window.mm_menu_0518074615_0 = new Menu("root",85,16,"ＭＳ Ｐゴシック, Osaka",10,"#000000","#0000FF","#FFFFFF","#CCCCCC","left","middle",3,0,0,-5,7,true,true,true,0,true,true);
  mm_menu_0518074615_0.addMenuItem("SCITトップへ","window.open('/', '_top');");
   mm_menu_0518074615_0.hideOnMouseOut=false;
   mm_menu_0518074615_0.menuBorder=1;
   mm_menu_0518074615_0.menuLiteBgColor='';
   mm_menu_0518074615_0.menuBorderBgColor='#CCCCCC';
window.mm_menu_0518075215_0 = new Menu("root",76,16,"ＭＳ Ｐゴシック, Osaka",10,"#000000","#0000FF","#FFFFFF","#CCCCCC","left","middle",3,0,0,-5,7,true,true,true,0,true,true);
  mm_menu_0518075215_0.addMenuItem("htmlドアへ","window.open('/index_h.php', '_top');");
   mm_menu_0518075215_0.hideOnMouseOut=false;
   mm_menu_0518075215_0.menuBorder=1;
   mm_menu_0518075215_0.menuLiteBgColor='';
   mm_menu_0518075215_0.menuBorderBgColor='#CCCCCC';
window.mm_menu_0518075504_0 = new Menu("root",83,16,"ＭＳ Ｐゴシック, Osaka",10,"#000000","#0000FF","#FFFFFF","#CCCCCC","left","middle",3,0,0,-5,7,true,true,true,0,true,true);
  mm_menu_0518075504_0.addMenuItem("Flash&nbsp;ドアへ","window.open('/index_flash.php', '_top');");
   mm_menu_0518075504_0.hideOnMouseOut=false;
   mm_menu_0518075504_0.menuBorder=1;
   mm_menu_0518075504_0.menuLiteBgColor='';
   mm_menu_0518075504_0.menuBorderBgColor='#CCCCCC';
window.mm_menu_0518075708_0 = new Menu("root",92,16,"ＭＳ Ｐゴシック, Osaka",10,"#000000","#0000FF","#FFFFFF","#CCCCCC","left","middle",3,0,0,-5,7,true,true,true,0,true,true);
  mm_menu_0518075708_0.addMenuItem("サイトマップへ","window.open('/sitemap.html', '_top');");
   mm_menu_0518075708_0.hideOnMouseOut=false;
   mm_menu_0518075708_0.menuBorder=1;
   mm_menu_0518075708_0.menuLiteBgColor='';
   mm_menu_0518075708_0.menuBorderBgColor='#CCCCCC';

            window.mm_menu_0518080042_0 = new Menu("root",174,16,"ＭＳ Ｐゴシック, Osaka",10,"#000000","#0000FF","#FFFFFF","#CCCCCC","left","middle",3,0,0,-5,7,true,true,true,0,true,true);
  mm_menu_0518080042_0.addMenuItem("学校概要","window.open('/aboutus.php', '_top');");
  mm_menu_0518080042_0.addMenuItem("本校の特色","window.open('/aboutus_toku.php', '_top');");
  mm_menu_0518080042_0.addMenuItem("キャンパスライフ","window.open('/aboutus_life.php', '_top');");
  mm_menu_0518080042_0.addMenuItem("メッセージアーカイブ","window.open('/message.php', '_top');");
  mm_menu_0518080042_0.addMenuItem("併設マックデザインセンタ中野","window.open('/mdc/', '_top');");
   mm_menu_0518080042_0.hideOnMouseOut=false;
   mm_menu_0518080042_0.bgColor='#555555';
   mm_menu_0518080042_0.menuBorder=1;
   mm_menu_0518080042_0.menuLiteBgColor='';
   mm_menu_0518080042_0.menuBorderBgColor='#CCCCCC';
window.mm_menu_0518080620_0 = new Menu("root",194,16,"ＭＳ Ｐゴシック, Osaka",10,"#000000","#0000FF","#FFFFFF","#CCCCCC","left","middle",3,0,0,-5,7,true,true,true,0,true,true);
  mm_menu_0518080620_0.addMenuItem("ニュース＆トピックス","window.open('/news.php', '_top');");
  mm_menu_0518080620_0.addMenuItem("特別奨学生・懸賞作文特待生制度","window.open('/special.html', '_top');");
  mm_menu_0518080620_0.addMenuItem("4月期・10月期入学","window.open('/news/h_work.html', '_top');");
  mm_menu_0518080620_0.addMenuItem("03学園祭記録","window.open('/festival/fes03/', '_top');");
  mm_menu_0518080620_0.addMenuItem("04学園祭記録","window.open('/festival/fes04/', '_top');");
  mm_menu_0518080620_0.addMenuItem("05学園祭記録","window.open('/festival/fes05/', '_top');");
  mm_menu_0518080620_0.addMenuItem("06学園祭記録","window.open('/festival/fes06/', '_top');");
  mm_menu_0518080620_0.addMenuItem("07学園祭記録","window.open('/festival/fes07/', '_top');");
  mm_menu_0518080620_0.addMenuItem("08学園祭記録","window.open('/festival/fes08/', '_top');");
  mm_menu_0518080620_0.addMenuItem("在校生・卒業生からのひとこと","window.open('/g_message.php', '_top');");
   mm_menu_0518080620_0.hideOnMouseOut=false;
   mm_menu_0518080620_0.menuBorder=1;
   mm_menu_0518080620_0.menuLiteBgColor='';
   mm_menu_0518080620_0.menuBorderBgColor='#CCCCCC';

  window.mm_menu_0518081948_0 = new Menu("root",134,16,"ＭＳ Ｐゴシック, Osaka",10,"#000000","#0000FF","#FFFFFF","#CCCCCC","left","middle",3,0,0,-5,7,true,true,true,0,true,true);
  mm_menu_0518081948_0.addMenuItem("コースガイド","window.open('/c_guide.html', '_top');");
  mm_menu_0518081948_0.addMenuItem("専門課程","window.open('/course/specialist.html', '_top');");
  mm_menu_0518081948_0.addMenuItem("中野生涯学習センタ","window.open('/course/nakano_study.html', '_top');");
  mm_menu_0518081948_0.addMenuItem("高校連携科","window.open('/course/highschool_c.html', '_top');");
  mm_menu_0518081948_0.addMenuItem("教育訓練給付制度","window.open('/guide/kyufu.html', '_top');");
   mm_menu_0518081948_0.hideOnMouseOut=false;
   mm_menu_0518081948_0.menuBorder=1;
   mm_menu_0518081948_0.menuLiteBgColor='';
   mm_menu_0518081948_0.menuBorderBgColor='#CCCCCC';

      window.mm_menu_0518083946_0 = new Menu("root",194,16,"ＭＳ Ｐゴシック, Osaka",10,"#000000","#0000FF","#FFFFFF","#CCCCCC","left","middle",3,0,0,-5,7,true,true,true,0,true,true);
   mm_menu_0518083946_0.addMenuItem("募集要項","window.open('/yoko.html', '_top');");
  mm_menu_0518083946_0.addMenuItem("資料請求フォーム","window.open('/material/', '_top');");
  mm_menu_0518083946_0.addMenuItem("特別奨学生・懸賞作文特待生募集","window.open('/special.html', '_top');");
  mm_menu_0518083946_0.addMenuItem("入学募集受付","window.open('/news/h_work.html', '_top');");
  mm_menu_0518083946_0.addMenuItem("資料ダウンロード","window.open(/'download/', '_top');");
   mm_menu_0518083946_0.hideOnMouseOut=false;
   mm_menu_0518083946_0.bgColor='#555555';
   mm_menu_0518083946_0.menuBorder=1;
   mm_menu_0518083946_0.menuLiteBgColor='';
   mm_menu_0518083946_0.menuBorderBgColor='#CCCCCC';
window.mm_menu_0518084455_0 = new Menu("root",110,16,"ＭＳ Ｐゴシック, Osaka",10,"#000000","#0000FF","#FFFFFF","#CCCCCC","left","middle",3,0,0,-5,7,true,true,true,0,true,true);
  mm_menu_0518084455_0.addMenuItem("企業求人フォーム","window.open('/kyujin/', '_top');");
   mm_menu_0518084455_0.hideOnMouseOut=false;
   mm_menu_0518084455_0.menuBorder=1;
   mm_menu_0518084455_0.menuLiteBgColor='';
   mm_menu_0518084455_0.menuBorderBgColor='#CCCCCC';

  window.mm_menu_0518084805_0 = new Menu("root",86,16,"ＭＳ Ｐゴシック, Osaka",10,"#000000","#0000FF","#FFFFFF","#CCCCCC","left","middle",3,0,0,-5,7,true,true,true,0,true,true);
  mm_menu_0518084805_0.addMenuItem("SCIT&nbsp;掲示板","window.open('/bbs/04/f_bbs04.html', '_top');");
   mm_menu_0518084805_0.hideOnMouseOut=false;
   mm_menu_0518084805_0.menuBorder=1;
   mm_menu_0518084805_0.menuLiteBgColor='';
   mm_menu_0518084805_0.menuBorderBgColor='#CCCCCC';

  window.mm_menu_0518085008_0 = new Menu("root",74,16,"ＭＳ Ｐゴシック, Osaka",10,"#000000","#0000FF","#FFFFFF","#CCCCCC","left","middle",3,0,0,-5,7,true,true,true,0,true,true);
  mm_menu_0518085008_0.addMenuItem("SCIT&nbsp;blog","window.open('/blog/mt05/', '_top');");
   mm_menu_0518085008_0.hideOnMouseOut=false;
   mm_menu_0518085008_0.menuBorder=1;
   mm_menu_0518085008_0.menuLiteBgColor='';
   mm_menu_0518085008_0.menuBorderBgColor='#CCCCCC';

mm_menu_0518085008_0.writeMenus();
} 

var scrj = 1;
function softScrollBack() {
   if(navigator.appName == "Microsoft Internet Explorer" && document.compatMode == "CSS1Compat") {
      var scdist = document.body.parentNode.scrollTop;
   } else {
      var scdist = document.body.scrollTop;
   }
   if(scrj<50 && scdist) {
      scdist = (scdist>2) ? Math.ceil(scdist*.2) : 1;
      scrj++;
      scrollBy(0,-scdist);
      setTimeout("softScrollBack()",20);
   } else {
      scrollTo(0,0);
      scrj = 1;
   }
}

cnt = 1;
cnt2 = 0;
cnt3 = 0;
myArray = new Array("文字を","変えて","スクロール","させます","しかも、とまります");
space = "　　　　　　　　　　　　　　　　　　　　";
msg = space + myArray[cnt3];
function strIn() {
	cnt2 = cnt + 20;
	document.all["ID"].innerHTML = msg.substring(cnt,cnt2);
	if(cnt < 20){
		cnt++;
		setTimeout("strIn()",100);
	}else{
		setTimeout("strOut()", 3000);
	}
}
function strOut() {
	cnt2 = cnt + 20;
	document.all["ID"].innerHTML = msg.substring(cnt,cnt2);
	if(cnt < msg.length){
		cnt++;
		setTimeout("strOut()",100);
	}else{
		cnt3++;
		if(cnt3 == 5) cnt3 = 0;
		msg = space + myArray[cnt3];
		cnt = 1;
		setTimeout("strIn()",100);
	}
}
window.onload = strIn;

