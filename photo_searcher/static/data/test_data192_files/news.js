function tagNewsStory(top, dw_xsiteid) {
    if ( !dw_xsiteid ) {
        dw_xsiteid = 6;
    }
 top = top ? '-top' : '';
  fadeOut('tag-story-form' + top);
  window['new-tags'] = $('tags-text' + top).value;
  var target = '/gamespot/common/tags/save_tags.htm';
  doAjaxFix(target, 'tag-story-form' + top, 'tag-story-success' + top, function(){afterTagStory(top, dw_xsiteid)});
}
function afterTagStory(top, dw_xsiteid) {
  // check for gamespot uk
//  	dw = 'http://dw.com.com/redir?ltype=&siteid=' + dw_xsiteid + '&edid=3&asId=&astId=12&&ptId=&ontid=9349&useract=109&destURL=http://img.gamespot.com/gamespot/b.gif';
  
  var top = top ?'-top' : '';
  var form = $('tag-story-form' + top);
  var success = $('tag-story-success' + top);
//  var clrgif = document.createElement('img');
//  clrgif.setAttribute('src', dw);
//  document.body.appendChild(clrgif)
  form.style.display = 'none';
  fadeIn(success);
  delay(function(){foldToggle('tag-story' + top)},2);
  delay(function(){toggle(success);fadeIn(form);updateTexts(top)},3);
}
function updateTexts(top) {
  var tags = window['new-tags'];
 
  $('tags-text-top').value = tags;
  $('tags-text').value = tags;
}