function initStyle(){
	if(typeof(doLoaded) != "undefined"){doLoaded();}

	//---タイトル・サブタイトル・URL取得用SCRIPT---------------------
	var titleItems = getByID('banner-body');
	var objtitle;
	objtitle = getByTagNameFromObj(titleItems, 'a');
	var vartitle;
	var varurl;
	if (objtitle[0]) {
		vartitle = objtitle[0].innerHTML;//タイトル取得
		varurl = objtitle[0].href;
		var objdesc = getByTagName('h2');
		var vardesc = objdesc[0].innerHTML;//ブログindexのURL取得
	} else {
		vartitle = "名前";
		var objdesc = getByTagName('h1');
		var vardesc = objdesc[0].innerHTML;
	}
	//---------------------------------------------------------------
	insertId('banner-body-bottom', '<div class="flash-banner"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" width="780" height="100" id="refbanner" align="middle"><param name="allowScriptAccess" value="sameDomain" /><param name="movie" value="http://template.cocolog-nifty.com/000076/three_column/component/ref01.swf?vartitle='+vartitle+'&vardesc='+vardesc+'&varurl='+varurl+'" /><param name="menu" value="false" /><param name="quality" value="high" /><param name="scale" value="noscale" /><param name="bgcolor" value="#FFFFFF" /><embed src="http://template.cocolog-nifty.com//000076/three_column/component/ref01.swf?vartitle='+vartitle+'&vardesc='+vardesc+'&varurl='+varurl+'" menu="false" quality="high"scale="noscale" bgcolor="#FFFFFF" width="780" height="100" name="refflash" align="middle" allowScriptAccess="sameDomain"type="application/x-shockwave-flash"pluginspage="http://www.macromedia.com/go/getflashplayer" /></object></div>');
	//---コメント---
	// ・テストでは「banner-body-bottom」のFLASHバナーを挿入していますが、
	// 他のDIVに挿入しても問題はありません。
	//
	// ・バナーサイズ
	// index: 780 x 100
	//---------------
}


//追加 function-----------------------------
function getByTagNameFromObj (obj, n) {
    var d = obj;
    if (d.getElementsByTagName)
        return d.getElementsByTagName(n);
    else if (d.all)
        return d.all[n];
}
//-----------------------------------------



function preinsertClassHTML(insertClass,  targetTag, insertTag, insertString, targetId, insertNumber){
	var classTag = targetTag;
	var classId = targetId;
	var insertNum = insertNumber;


	if(insertTag.length == 0){
		return;
	}
	if(targetTag.length == 0){
		classTag = 'div';
	}
	if(!targetId || targetId.length == 0){
		classId = '';
	}
	if(insertNumber == ''){
		insertNum = 0;
	}

	var regpre = new RegExp("<" + insertTag, "ig");
	var regpost = new RegExp("</"+insertTag, "ig");

	var oElement = getByTagName(classTag);
	if(!oElement){
		return;
	}
    var len = oElement.length;
    var targetstr;
    var num;
    for (num=0; num<len; num++) {
		if(oElement[num] != null){
		    var addstr="";
	        if (oElement[num].className == insertClass) {
	        	if(classId.length == 0 || oElement[num].id == classId){
	    	    	var tagnum = oElement[num].innerHTML.match(regpre);
    		    	if(!tagnum){
    		    		continue;
    	    		}
        			var morestr = oElement[num].innerHTML;
	        		var morestart = 0;
	        		var tagcount;
					for(tagcount=0; tagcount<tagnum.length; tagcount++){
			      		morestr = oElement[num].innerHTML.substring(morestart);
		    	  		if(morestr.search(regpost) == -1){
		      				break;
		      			}
			      		morecount = morestr.search(regpost);
		      			morestr = oElement[num].innerHTML.substring(morestart, morestart+morecount+3+insertTag.length);
	    	  			morestart += morecount+3+insertTag.length;
						//指定番目のみ
		        		if(insertNum > 0){
		        			if(tagcount+1 != insertNum){
		        				addstr += morestr;
	    	    				continue;
	    	    			}
	        			}
						if ((begin = morestr.search(regpre)) != -1) {
							var tmpstr = morestr.substring(begin);
							var innerstr = morestr.substring(0,begin);
							if ((end = tmpstr.search(regpost)) != -1) {
								addstr += innerstr + insertString + morestr.substring(begin);
							}
						}
					}
					oElement[num].innerHTML = addstr + oElement[num].innerHTML.substring(morestart);
				}
	        }
        }
    }
}

function insertClass(insertClass, targetTag, insertString, index, targetId){
	var classTag = targetTag;
	var classId = targetId;
	if(targetTag.length == 0){
		classTag = 'div';
	}
	if(index == null){
		index = 0;
	}
	if(!targetId || targetId.length == 0){
		classId = '';
	}

	var oElement = getByTagName(classTag);
	if(!oElement){
		return;
	}

    var len = oElement.length;
    var targetstr;
    var cattag;
    for (num=0; num<len; num++) {
		if(oElement[num] != null){
		    var addstr="";
	        if (oElement[num].className == insertClass) {
	        	if(classId.length == 0 || oElement[num].id == classId){
					targetstr = oElement[num].innerHTML;
   			    	if(targetstr.length < index){
			    		index = targetstr.length;
  					}
					if(index == -1){
						pre = targetstr.substr(0);
						cattag = insertString;
					}
					else{
						pre = targetstr.substr(0, index);
					}
					if(index != -1){
						cattag = insertString + targetstr.substring(index);
					}
					oElement[num].innerHTML = pre + cattag;
				}
			}
	    }
    }
}

function insertId(insertID, insertTag, index){
	var oElement = document.getElementById(insertID);
	if(index == null){
		index = 0;
	}
	if(!oElement){
		return;
	}

	var pre;
	var post;
	if(oElement.innerHTML.length < index){
		index = oElement.innerHTML.length;
	}
	if(index == -1){
		pre = oElement.innerHTML;
		post = "";
	}
	else{
		pre = oElement.innerHTML.substring(0, index);
		post = oElement.innerHTML.substring(index);
	}
	oElement.innerHTML = pre + insertTag + post;
}


// inner function
function getclassBrowser(){
	var ua=navigator.userAgent;
	var classname;
    if(ua.match(/MSIE/) != null){
		classname = 'className';
	}
	else{
		classname = 'class';
	}
	return classname;
}

function changeString2(node, tag, string, whichcase, insertIndex, id){

	var classId = id;
    var tagcount = 0;
    var tmpIndex=0;
    
	if(!id || id.length == 0){
		classId = '';
	}

	while(node){
		if(node.firstChild){
			if(node.id == classId){
				if(changeString2(node.firstChild, tag, string, whichcase, insertIndex, id) == -1){
					return -1;
				}
			}
		}
		// 入れ替え対象タグ
		if(node.nodeName.toLowerCase() == tag.toLowerCase()){
			changestr(node, string, whichcase, insertIndex);
			return -1;
		}
		node = node.nextSibling;
    }
}

function changeString(node, tag, string, whichcase, insertIndex, id){

	var classId = id;
    var tagcount = 0;
    var tmpIndex=0;
    
	if(!id || id.length == 0){
		classId = '';
	}

	while(node){
		if(node.firstChild){
			if(node.id == classId){
				changeString(node.firstChild, tag, string, whichcase, insertIndex, id);
			}
		}
		// 入れ替え対象タグ
		if(node.nodeName.toLowerCase() == tag.toLowerCase()){
			changestr(node, string, whichcase, insertIndex);
		}
		node = node.nextSibling;
    }
}


function changestr(node, string, whichcase, insertIndex){

	// replace
	if(whichcase == 1){
		node.innerHTML =string;
	}
	// insert
	else{
    	tmpIndex=insertIndex;

		if(insertIndex == -1 || insertIndex > node.innerHTML.length){
			tmpIndex = node.innerHTML.length;
		}
		var str = node.innerHTML;
       	node.innerHTML =str.substring(0, tmpIndex) + string + str.substring(tmpIndex);
	}
}


// Common Javascript
var themeBaseURI = 'http://exaple.org/specialstyles';

// put image and flash files to themeBaseURI/THEME/
//  filename should be THEME-CLASSNAME.gif or THEME-ID.swf.
//  like mybow-comment.gif and mybow-recent-updates.swf

function insertFlashMovie (theme, divs) {
    for (i in divs) {
        var swfURL = themeBaseURI + '/' + theme + '/' + theme + '-' + divs[i] + '.swf';
        insertHTML(divs[i], '<embed src="' + swfURL + '" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash" TYPE="application/x-shockwave-flash" </embed>');
    }
}

function insertHTML (divID, tag) {
    var e = getByID(divID);
    e.innerHTML = tag + e.innerHTML;
}

function replaceHTML (divID, tag) {
  var e = getByID(divID);
	if(!e){
		return;
	}
  e.innerHTML = tag;
}

function replaceImage (theme, divs) {
    for (i in divs) {
        var imageURL = themeBaseURI + '/' + theme + '/' + theme + '-' + divs[i] + '.gif';        
        var tag = '<img src="' + imageURL + '" alt="' + divs[i] + '" />';
        replaceHTML(divs[i], tag);
    }
}

function replaceButton (theme, classes) {
    for (i in classes) {
        // alert(theme + '/' + theme + '-' + classes[i] + '.gif');
        doReplaceLinkToImage(classes[i], theme + '/' + theme + '-' + classes[i] + '.gif', '');
    }
}

function doReplaceLinkToImage (className, imageFilename, title) {
    if (title) {
        title = 'alt="' + title + '" ';
    } else {
        title = '';
    }
    var imageURL = themeBaseURI + '/' + imageFilename;
    var tag = '<img src="' + imageURL + '" ' + title + '/>';
    doReplaceLinkInnerHTML (className, tag);
}

function doReplaceLinkInnerHTML (className, str) {
    var e = getByTagName('a');
    var len = e.length;
    for (i=0; i<len; i++) {
        if (e[i].className == className) {
            e[i].innerHTML = str;
        }
    }
}

function eraseSeparator () {
    var e = getByTagName('span');
    var len = e.length;
    for (i=0; i<len; i++) {
        if (e[i].className == 'separator') {
            e[i].innerHTML = '';
        }
    }
}

function getByID (n) {
    var d = window.document;
    if (d.getElementById)
        return d.getElementById(n);
    else if (d.all)
        return d.all[n];
}

function getByTagName (n) {
    var d = window.document;
    if (d.getElementsByTagName)
        return d.getElementsByTagName(n);
    else if (d.all)
        return d.all[n];
}

