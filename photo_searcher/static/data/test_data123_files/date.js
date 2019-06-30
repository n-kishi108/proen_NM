//¡“ú‚Ì“ú‚ğæ“¾
var date = new Date();
var flg = 0;
var kaisaibi = new Array("2009","6","20","(“y)","o","2009","6","27","(“y)","t","2009","7","4","(“y)","o","2009","7","11","(“y)","t","2009","7","18","(“y)","o","2009","7","25","(“y)","i","2009","7","26","(“ú)","ii","2009","8","1","(“y)","o","2009","8","8","(“y)","i","2009","8","9","(“ú)","ii","2009","8","20","(–Ø)","i","2009","8","21","(‹à)","ii","2009","8","26","(…)","t","2009","8","29","(“y)","o","2009","9","12","(“y)","t","2009","9","19","(“y)","o","2009","9","26","(“y)","t","2009","10","3","(“y)","o","2009","10","10","(“y)","t","2009","10","24","(“y)","t","2009","11","21","(“y)","t","2009","12","5","(“y)","t","2010","1","23","(“y)","t","2010","2","13","(“y)","t","2010","3","6","(“y)","t","2010","3","13","(“y)","t","2010","4","29","(j)","o");

//ŠJÃ“ú‚Ü‚Å‚ ‚Æ‰½“ú‚©æ“¾
function compareDate(year1, month1, day1, year2, month2, day2) {
    var dt1 = new Date(year1, month1 - 1, day1);
    var dt2 = new Date(year2, month2 - 1, day2);
    var diff = dt1 - dt2;
    var diffDay = diff / 86400000;//1“ú‚Í86400000ƒ~ƒŠ•b
    return diffDay;
}

//ŠJÃ“ú‚Ì·‚ğ‹‚ß‚é    «ŠJÃ“ú
for (i = 0;i < 150;i = i + 5) {
var days = compareDate(kaisaibi[i], kaisaibi[i+1], kaisaibi[i+2], date.getFullYear(), date.getMonth() + 1, date.getDate());
if (flg == 1) break;
if (days >= 0) {
	if (kaisaibi[i+4] == 'i') {
		document.write(kaisaibi[i+1]+'/'+kaisaibi[i+2]+kaisaibi[i+3]+'E'+kaisaibi[i+7]+kaisaibi[i+8]);
		flg = 1;
	} else if (kaisaibi[i+4] == 'ii') {
		document.write(kaisaibi[i-4]+'/'+kaisaibi[i-3]+kaisaibi[i-2]+'E'+kaisaibi[i+2]+kaisaibi[i+3]);
		flg = 1;
	} else {
		document.write(kaisaibi[i+1]+'Œ'+kaisaibi[i+2]+'“ú'+kaisaibi[i+3]);
		flg = 1;
	}
}
}