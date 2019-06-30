
(function(){
	if(wordsFromReferrer&&wordsFromReferrer!=""){
		var word= wordsFromReferrer.replace(/%e3%80%80/g,"\+");
		word= word.replace(/%E3%80%80/g,"\+");
		word= word.replace(/%e3%80%81/g,"\+");
		word= word.replace(/%E3%80%81/g,"\+");
		word= word.replace(/%81%40/g,"\+");
		word= word.replace(/%20/g,"\+");
		word= word.replace(/%2C/g,"\+");
		word= word.replace(/%2B/g,"\+");
		if(word.slice(-1)=="+"){
			word=word.slice(0, -1);
		}
		word=decodeURI(word);
		while (word.search(/\+\+/i) != -1) {
			word= word.replace(/\+\+/g,"\+");
		}
		if(word.slice(-1)=="+"){
			word=word.slice(0, -1);
		}
		if(word.slice(0,1)=="+"){
			word=word.slice(1);
		}
		hintsWord=word.split("+").join(", ");
	}
}
)();


function showArrow(el){
	var iconRnd = Math.floor(Math.random() * 5);
		el.className = "showAdsArrow"+iconRnd;
}


function blockhover(el){
	el.className="blockhoverGeneral";

//el.style.backgroundColor="#eee";
}

function block(el){
	el.className="blockGeneral";
//el.style.backgroundColor="";
}


function hideArrow(el){
	el.className="hideAdsArrow";
}
function jumpAd(url){
	window.location.href=url;
}




function google_ad_request_done(google_ads) {
	var s = '';
	var i;

	if (google_ads.length == 0) {
		return;
	}

	if (google_ads[0].type="text" && google_ads.length > 0) {
		s='';
		s += '<div id="gadFooter" class="gadBox">';

		for(i=0; i < google_ads.length; ++i) {
			s += '<div class="hideAdsArrow" id="adCount'+i+'_footer" onmouseover="blockhover(this);" onmouseout="block(this);" onclick="jumpAd(\''+ google_ads[i].url+'\');">';
			var gad_title ='<a id="gAdTitle'+i+'_footer" class="gadTitle_footer">'+ google_ads[i].line1+'</a>';
			var gad_url ='<span class="gadDisplayURL_footer">'+google_ads[i].visible_url+'</span>';
			var gad_des ='<span id="gAdDesc'+i+'" class="gadDescription_footer">' + google_ads[i].line2 + google_ads[i].line3 +'</span>';
			s += gad_title + gad_des + gad_url;

			s += '</a></div>';

		}
		s += '<p id="gadLogo_footer"><a href="'+google_info.feedback_url+ '">Ads by Google</a></p>';

		s +='</div>';
	}
    document.write(s);
    if(hintsWord!=""){
	//	highlight(google_ads.length);
	}
    return;
}
if ( parent==self ){
	google_ad_channel='opt3';
	google_max_num_ads='1';
	google_skip = '3';
	google_ad_client='ca-cyberagent-ameblo_js';
	google_ad_output='js';
	google_ad_type='text';
	google_language='ja';
	google_encoding ='utf8';
	google_safe='high';
	google_ad_section='s1 s2';
	google_feedback = 'on';
//google_adtest = 'on';

}
