var google_adnum = 0; /* only insert this line for your first ad unit */ 

function google_ad_request_done(google_ads) {

/*
* This function is required and is used to display
* the ads that are returned from the JavaScript
* request. You should modify the document.write
* commands so that the HTML they write out fits
* with your desired ad layout.
*/
var s = '';
var i;

/*
* Verify that there are actually ads to display.
*/
if (google_ads.length == 0) {
return;
}

/*
* If an image or flash ad is returned, display that ad.
* Otherwise, build a string containing all of the ads and
* then use a document.write() command to print that string.
*/

	if (google_ads.length == 1) {

		s += '<table width="400" height="280" align="middle" border="0" cellspacing="0" cellpadding="0"><tr><td>';
		s += '<p><span style="font-weight: bold; "><a href=\"' + google_info.feedback_url + '\" style="color:000000">Ads by Google</a></span></p>';
		s += '<br><br><a href="' + google_ads[0].url + '" style="text-decoration:none;">' +
		'<span style="font-weight: bold; text-decoration:underline; font-size:20pt; color:#1E5FCA; line-height:24pt;">' + google_ads[0].line1 + '</span></a><br><br><br>' +
		'<span style="font-weight: normal; COLOR: #000; font-size:16pt; line-height:20pt;">' + google_ads[0].line2 + google_ads[0].line3 +
		'</span><br><br>' +
		'<a href="' + google_ads[0].url + '" style="text-decoration:none;">' +
		'<span style="font-weight: normal; COLOR: #008000; font-size:20pt; line-height:24pt;">' + google_ads[0].visible_url + '</span></a><br>';
		s += '</tr></td></table><br>';

		document.write('<div>\n');
		document.write(s);
		document.write('</div>\n');

	}

	if (google_ads[0].type="text" && google_ads.length > 1) {

		for(i=0; i < google_ads.length; ++i) {
		s += '<a href="' + google_ads[i].url + '" style="text-decoration:none;">' +
		'<span style="font-weight: bold; text-decoration:underline; font-size:16px; color:#1E5FCA">' + google_ads[i].line1 + '</span></a>&nbsp;&nbsp;' +
		'<span style="font-weight: normal; COLOR: #000; font-size:12px">' + google_ads[i].line2 + google_ads[i].line3 + '&nbsp;' +
		'<a href="' + google_ads[i].url + '" style="text-decoration:none;"><span style="font-weight: normal; COLOR: #008000; font-size:14px">' + google_ads[i].visible_url + '</span></a>' +
		'<br></span><br>';
		}

		if (google_ads[0].bidtype == "CPC") { /* insert this snippet for each ad call */ 
			google_adnum = google_adnum + google_ads.length;
		}

		document.write('<div>\n');
		document.write('<p><span style="font-weight: bold; "><a href=\"' + google_info.feedback_url + '\" style="color:000000">Ads by Google</a></span></p>\n');
		document.write(s);
		document.write('</div>\n');

	}

}


google_ad_client = 'pub-1847813181958947'; // substitute your client_id (pub-#)
google_ad_output = 'js';
google_max_num_ads = '5';
google_ad_type = 'text';
google_feedback = 'on';
google_encoding = 'sjis';
google_skip = google_adnum; /* insert this snippet for each ad call */
