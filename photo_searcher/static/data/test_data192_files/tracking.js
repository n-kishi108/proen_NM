function scTrackClickcount(linkGroup, linkTarget){
	/* linkGrounp -> project name,  linkTarget -> target place */

	/* set suiteID */
		var s=s_gi(s_account);

	/* !!MUST!! set s.linkTrackVars or s.linkTrackEvents (delimiter ",") */
	/* sample : s.linkTrackVars = 'prop1,eVar1,events'; */

		s.linkTrackVars='prop41';

	/* set Variable */
		s.prop41=linkGroup + ":" + linkTarget;

	/* send value */
		s.tl(this,'o', linkGroup + ":" + linkTarget);
}


function trackOmnitureVideoLink(videoFileName, videoStoryTitle, event, stat) {

	//omniture definitions:	
	// evar21 = pagename
	// evar22 = videoFilename
	// evar23 = videoStoryTitle
	// event18 = play_video
	// event19 = mid_video
	// event20 = end_video
	
	var tr_stat = "";
	var tr_pageName = "";
	var tr_videoFileName = "";
	var tr_videoStoryTitle = "";

	tr_stat = stat;
	tr_pageName = document.title;
	tr_videoFileName = videoFileName;
	tr_videoStoryTitle = videoStoryTitle;



	var s=s_gi(s_account);
	
	s.linkTrackVars="eVar21,eVar22,eVar23,events";
	s.linkTrackEvents=event;
	s.eVar21 = tr_pageName;
	s.eVar22 = tr_videoFileName;
	s.eVar23 = tr_videoStoryTitle;
	s.events=event;


	s.tl(this, 'o', tr_stat);
	//alert("tracking done for video: " + event + ",  tr_stat: " + tr_stat + ",  videofilename: " + tr_videoFileName + ",  videostoryTitle: " + tr_videoStoryTitle);
	return false;
}