function pitattoAD(ad_client, ad_start_count, ad_end_count, ad_total, ad_format, ad_width, ad_height, color_border, color_bg, color_link, color_text, color_url){
 var rf = document.referrer;
 var fh;
 try{
  fh = footer_height;
 }
 catch(e){
  fh = 16;
 }
 if(fh < 16){
  fh = 16;
 }
 var at;
 try{
  at = append_text;
 }
 catch(e){
  at = 0;
 }

 document.write('<iframe name="prov_frame"' + ' width="' + ad_width + 'px" height="' + (ad_height + fh) + 'px" frameborder="0" src="http://grp04.ias.rakuten.co.jp/advertise.html' + 
 '?rf=' + encodeURI(rf) + 
 '&prov-rf-end' + 
 '&cl='+ad_client + 
 '&to='+ad_total + 
 '&sc='+ad_start_count + 
 '&ec='+ad_end_count + 
 '&fm='+ad_format + 
 '&bd='+color_border + 
 '&bg='+color_bg + 
 '&lk='+color_link + 
 '&tx='+color_text + 
 '&ur='+color_url + 
 '&at='+at +
 '&url='+encodeURIComponent(parent.document.location) +
 '" marginwidth="0" marginheight="0" vspace="0" hspace="0" allowtransparency="true" scrolling="no" style="background-color:#' + color_bg +'"></iframe>');
}

