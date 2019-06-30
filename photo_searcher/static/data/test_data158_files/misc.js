
function checkAll(form, flag) {
    for (var i = 0; i < form.elements.length; i++) {
	var e = form.elements[i];
	if(e.type == 'checkbox'){
	    e.checked = flag;
	}
    }
}

function toggleDisabled(e, flag) {
    e.disabled = flag;
}

function submitOnce(button) {
    submitOnce = function() {
        alert("ただいま処理中です。しばらくお待ち下さい。");
        return false;
    }
    button.disabled = true;
    return true;
}

function setStartPage() {
      var b = document.body;
      var ua = navigator.userAgent;
      var ie = ua.indexOf("MSIE");
      var iever = parseInt(ua.substring(ie+5, ie+6));
      var os = ua.indexOf("Windows");
      if(ie > 0 && iever >= 5 && os > 0 && !window.opera){
         var homepage = "http://www.livedoor.com";
         var jumpto = "http://www.livedoor.com/r/set_blog/";
         b.style.behavior = "url('#default#homepage')";
         var is_home =
             b.isHomePage(homepage) || b.isHomePage(homepage + "/");
          if(is_home)
              alert("livedoor はすでにスタートページに設定されています。");
          else
              b.setHomePage(homepage + "/");
         is_home =
             b.isHomePage(homepage) || b.isHomePage(homepage + "/");
         if(is_home) {
             document.location.replace(jumpto);
         }
      }
      else {
          document.location.href="http://helpguide.livedoor.com/start.html";
      }
}

function setMMTag(id, userid, url, jpg, width, height) {
    var location_array = location.href.split("/");
    var base_url = location_array[2];
    var livedoor_id = location_array[4];
    var reload_url = "http://" + base_url + "/u/" + livedoor_id + "/magical_maker";
    document.location.href = reload_url;
    self.focus();
}

function quickTrackBack(blog_cms_url, url, image) {
    var body = '<a href="' + url + '" target="_blank">';
    body += '<img src="' + image + '" border="0" />';
    body += '</a><br />';
    var loc = blog_cms_url + "?_tb" + encodeURIComponent(url);
    loc += '&_body=' + encodeURIComponent(body);
    document.location.href = loc;
}

function quickTrackBackWithInfo(blog_cms_url, url, image, info) {
    var body = '<a href="' + url + '" target="_blank">';
    body += '<img src="' + image + '" border="0" />';
    body += '</a><br />';
    if(info){
        body += info + '<br />';
    }
    var loc = blog_cms_url + "?_tb=" + encodeURIComponent(url);
    loc += '&_body=' + encodeURIComponent(body);
    document.location.href = loc;
}


function quickMovieTrackBack(blog_cms_url, pics_url, api_url,  movie_id, flash_player_host) {
    var body = '<script type="text/javascript" src="' + pics_url + '/js/movies.js"></script>';
    body += '<script language="JavaScript" type="text/javascript">movie("' + movie_id + '\", \"' + flash_player_host + '\", \"' + api_url + '\");</script>';
    var loc = blog_cms_url + "?bm=1&tb=1";
    loc += '&b=' + encodeURIComponent(body);
    loc += '&f=' + encodeURIComponent('$body$');
    document.location.href = loc;
}

function quickMMTrackBack(blog_cms_url, magical_maker_swf_url, image_url, mm_member_id, photo_id, photo_width, photo_height) {
    var body = '<img id="mmimg' + photo_id + '" src="' + image_url + '" width="' + photo_width + '" height="' + photo_height + '">';
    body += '<script language="JavaScript" src="' + magical_maker_swf_url + '?upwh=' + mm_member_id + '-' + photo_id + '-' + photo_width + '-' + photo_height + '"></script>';
    var loc = blog_cms_url + "?bm=1&tb=1";
    loc += '&b=' + encodeURIComponent(body);
    loc += '&f=' + encodeURIComponent('$body$');
    document.location.href = loc;
}
