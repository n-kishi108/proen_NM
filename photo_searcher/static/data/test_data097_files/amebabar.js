/************************************************
 * for amebabar js
 * $Id: amebabar.js,v 1.3 2010/01/15 09:25:05 kosaka_tomohiro Exp $
 ************************************************/

(function(){
	if (document.barForm.q) {
		var qObj = document.barForm.q;
		if (typeof(wordsFromReferrerDe)!="undefined"&&wordsFromReferrerDe!="") {
			var keywords = wordsFromReferrerDe.replace(/\+/g, " ");
			qObj.value = keywords;
			qObj.style.color = '#000000';
			qObj.style.backgroundColor = '#ffff66';
		}
		qObj.onfocus = function(){
			qObj.select();
			qObj.style.color = '#000000';
		}
	}
}
)();
