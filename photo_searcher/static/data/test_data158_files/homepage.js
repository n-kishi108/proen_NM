function setStartPage() {
      var b = document.body;
      var ua = navigator.userAgent;
      var ie = ua.indexOf("MSIE");
      var iever = parseInt(ua.substring(ie+5, ie+6, ie+7));
      var os = ua.indexOf("Windows");
      if(ie > 0 && iever >= 5 && os > 0 && !window.opera){
	 var homepage = "http://www.livedoor.com";
	 var jumpto = "http://www.livedoor.com/";
	 b.style.behavior = "url('#default#homepage')";
	 var is_home =
	     b.isHomePage(homepage) || b.isHomePage(homepage + "/");
          if(is_home)
              alert("livedoor はすでにスタートページに設定されています。");
          else
              pageTracker._trackPageview('/set/ldtop');
              b.setHomePage(homepage + "/");
	 is_home =
	     b.isHomePage(homepage) || b.isHomePage(homepage + "/");
	 if(is_home) {
	     document.location.replace(jumpto);
	 } else {
	     document.location.replace(homepage);
	 }
      }
      else {
          document.location.href="http://helpguide.livedoor.com/help/help/guide/grp189";
      }
}

