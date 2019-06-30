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

		var expLimit=new Date();
		//expLimit.setTime(expLimit.getTime()+(1000*60*10));
		expLimit.setTime(expLimit.getTime()+(1000*10));
		var expTime=expLimit.toGMTString();
		document.cookie="hitsTmpWords="+encodeURI(hintsWord)+";+expires="+expTime;
	}
}
)();

var FromSearchEngine = false;
(function(){
	var ref = document.referrer;
	if (/^http:\/\/search\.livedoor\.com\/search/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/sf\.livedoor\.com\/search/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/www\.google\.(co\.jp|com)\/search/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/images\.google\.(co\.jp|com)/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/blogsearch\.google\.co\.jp\/blogsearch/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/search\.yahoo\.co\.jp\/search/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/blog-search\.yahoo\.co\.jp\/search/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/search\.goo\.ne\.jp\/web.jsp/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/blog\.search\.goo\.ne\.jp\/search_goo\/result/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/search\.live\.com\/results\.aspx/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/search\.msn\.co\.jp/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/www\.excite\.co\.jp\/search.gw/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/www\.baidu\.jp/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/blog\.baidu\.jp/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/www\.bing\.com\.search/.test(ref)) FromSearchEngine = true;


	if (/^http:\/\/search\.nifty\.com\/websearch\/search/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/search\.nifty\.com\/blogsearch\/search/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/search\.www\.infoseek\.co\.jp\/Web/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/blogsearch\.fc2\.com/.test(ref)) FromSearchEngine = true;
	if (/^http:\/\/ask\.jp\/web\.asp/.test(ref)) FromSearchEngine = true;
})();



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

function highlight(adCount){
	var replaceTags=Array();
	for (i = 0; i < adCount; i++) {
		replaceTags.push("gAdTitle"+i);
		replaceTags.push("gAdDesc"+i);
	}
	if(replaceTags.length>0){
		for (i = 0; i < replaceTags.length; i++) {
			var gAdUnit=replaceTags[i];
			var adSrc=document.getElementById(gAdUnit);
			var adReplaseHTML=adSrc.innerHTML;
			var hintsWordsCount=hintsWord.split(", ");
			var hintsHighlight=Array();
			for (j = 0; j < hintsWordsCount.length; j++) {
				hintsHighlight[j]='<span style="background-color:#ffff66;color:#333333;border-bottom:1px dotted #333333;">'+hintsWordsCount[j]+'</span>';
				var Replasetag=adReplaseHTML.split(hintsWordsCount[j]);
				var tag="";
				for (k = 0; k < Replasetag.length; k++) {
						if (hintsHighlight[j] !=null) {
							tag = Replasetag.join(hintsHighlight[j]);
						}

				}
				adReplaseHTML=tag;
			}
		adSrc.innerHTML=adReplaseHTML;
		}
	}

}


function highlight2(adCount){
	var replaceTags=Array();
	for (i = 0; i < adCount; i++) {
		replaceTags.push("gAdTitle"+i);
		replaceTags.push("gAdDesc"+i);
	}
	if(replaceTags.length>0){
		for (i = 0; i < replaceTags.length; i++) {
			var gAdUnit=replaceTags[i];
			var adSrc=document.getElementById(gAdUnit);
			var adReplaseHTML=adSrc.innerHTML;
			var hintsWordsCount=tmpHintsWord.split(", ");
			var hintsHighlight=Array();
			for (j = 0; j < hintsWordsCount.length; j++) {
				hintsHighlight[j]='<span style="background-color:#ffff66;color:#333333;border-bottom:1px dotted #333333;">'+hintsWordsCount[j]+'</span>';
				var Replasetag=adReplaseHTML.split(hintsWordsCount[j]);
				var tag="";
				for (k = 0; k < Replasetag.length; k++) {
						if (hintsHighlight[j] !=null) {
							tag = Replasetag.join(hintsHighlight[j]);
						}

				}
				adReplaseHTML=tag;
			}
		adSrc.innerHTML=adReplaseHTML;
		}
	}

}

function linkAmebaSearch(str){
	var link="http://search.ameba.jp/search.html?q="+encodeURI(str);
	location.href=link;


}


function google_ad_request_done(google_ads) {
	var s ='';
    if(hintsWord!=""){
		var gadTitle = '<h4  onclick="linkAmebaSearch(hintsWord);" style="font-size:1em;cursor:pointer;"><span>【' + hintsWord + '】</span>をアメーバで検索</h4>';

		s += gadTitle;
	}


	var i;

	if (google_ads.length == 0) {
		return;
	}

	if (google_ads[0].type="text" && google_ads.length > 0) {
		s += '<div id="general" class="gadBox">';
		for(i=0; i < google_ads.length; ++i) {
			s += '<div class="hideAdsArrow" id="adCount'+i+'" onmouseover="blockhover(this);" onmouseout="block(this);" onclick="jumpAd(\''+ google_ads[i].url+'\');"><a class="genAnch" onclick="return false;" href="javascript:void(0)">';

var gad_title ="";
 if(hintsWord!=""){
	gad_title ='<span id="gAdTitle'+i+'" class="gadTitle_s">'+ google_ads[i].line1+'</span>';
}else{
	gad_title ='<span id="gAdTitle'+i+'" class="gadTitle">'+ google_ads[i].line1+'</span>';
}
			var gad_url ='<span class="gadDisplayURL">'+google_ads[i].visible_url+'</span>';
			var gad_des ='<span id="gAdDesc'+i+'" class="gadDescription">' + google_ads[i].line2 + google_ads[i].line3 +'</span>';
			s += gad_title + gad_des + gad_url;
			s += '</a></div>';

		}

		s +='</div>';
		s += '<p id="gadLogo_footer"><a href="'+google_info.feedback_url+ '">Ads by Google</a></p>';
	}
    document.write(s);

    if(hintsWord!=""){
		highlight(google_ads.length);
	}
    else if(tmpHintsWord!=""){
		highlight2(google_ads.length);
	}
    return;
}

function makeAd_channel(){

	var channel="ameblo";
	var pageURL=location.href;
	if(/ameblo.jp\//.test(pageURL)){
	//if(/kariblo.jp\//.test(pageURL)){
			var pageURLtail=pageURL.split("ameblo.jp\/")[1].split("/")[1];
			//var pageURLtail=pageURL.split("kariblo.jp\/")[1].split("/")[1];

			if(/day/.test(pageURLtail)||/theme/.test(pageURLtail)||/archive/.test(pageURLtail)){channel="opt9";}
			else if(/page-/.test(pageURLtail)){channel="opt7";}
			else if(/entry-/.test(pageURLtail)){
				channel="opt12";

			}
			else{channel="opt6";}
	}
	return channel;
}
function make_rnd(){
	if(parseInt(Math.random()*2)%2==0){
		return false;
	}else{
		return true;
	}
}

function google_hints_cookie(){
	var savedHintsWord="";
	var cookieStr=document.cookie+";";
	var cookieName="hitsTmpWords=";
	var start=cookieStr.indexOf(cookieName);
	if(start>-1){
		var end=cookieStr.indexOf(";",start);
		savedHintsWordEn=cookieStr.substring(start+cookieName.length,end);
		savedHintsWord=decodeURI(savedHintsWordEn);
	}

	return savedHintsWord;
}

var tmpHintsWord=google_hints_cookie();


if ( parent==self ){
	google_ad_channel=makeAd_channel();
	google_max_num_ads='3';
	if(hintsWord!=""){
		google_hints = hintsWord;
		google_ad_channel='opt1';
		google_max_num_ads='4';
	}else if(tmpHintsWord!=""){
		google_hints = tmpHintsWord;
		google_ad_channel='opt10';
		google_max_num_ads='3';

	}else if(google_ad_channel=='opt12'){
		if(meta_words){
			google_hints =meta_words.replace(",ブログ,アメブロ,アメーバ,ameba","");
		}
	}else{
		if("adEntryIndex" in window && adEntryIndex > 0){
			google_ad_channel='opt11';
		}
		if(FromSearchEngine){
			google_max_num_ads='4';
			google_ad_channel='opt4';
		}
		if("entryLeaveFlg" in window && entryLeaveFlg){
			google_max_num_ads='5';
			google_ad_channel='opt5';
		}
	}
	google_ad_client='ca-cyberagent-ameblo_js';
	google_ad_output='js';
	google_ad_type='text';
	google_language='ja';
	google_encoding ='utf8';
	google_safe='high';
	google_ad_section='s1 s2';
google_feedback ='on';
//google_adtest = 'on';

if(google_ad_channel=="opt10"||google_ad_channel=="opt1"){

}
}


