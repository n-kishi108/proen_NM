/*********************************/
/********* Charts for Gumball *********/
/*********************************/
function show_gumball(x, z) {
    // x is current slide, z is end of all slides, loop back to 1.    

    for (i=1; i <= z; i++) {
        if (i == x) {
            document.getElementById('rotate_gumball_' + i).style.display='';           
        }
        else {
            document.getElementById('rotate_gumball_' + i).style.display='none';
        }
    }

   if (x != z) document.getElementById('display_gumball').value = parseInt(x) + 1;
   else        document.getElementById('display_gumball').value = 1;
}


/*********************************/
/** Charts for Player Score Breakdown ***/
/*********************************/
function show_piechart(x) {
    var a = new Array('score', 'curve', 'diff', 'time');

    for (i=0; i < a.length; i++) {
        if (a[i] == x) {
            document.getElementById('piechart_' + a[i]).style.display='';
            document.getElementById('piechart_span_' + a[i]).className='on';
        }
        else {
            document.getElementById('piechart_' + a[i]).style.display='none';
            document.getElementById('piechart_span_' + a[i]).className='';
        }
    }
}

function hide_broken_img(img) {
 //to change file name if needed
   img.src='/i/mem/avatars/gamespot.gif';
}


function pmpop(pop_url) {
  popupWin = window.open(pop_url,'pmpop','width=778,height=480,scrollbars=1,menubar=0,toolbar=0,location=0,status=0,resizable=1');
}




function popup_action(url,force_reload) {

    popupWin = window.open(url, 'contactpop', 'width=260,height=260,resizable=1,scrollbars=0');

    if (force_reload) {
        // reload the current page with the updated data.
        window.location.reload(force_reload);
    }
}

function embed(tag){
    // msoft activex controls no longer start up 'activated' after april 11/06 (require focus to activate)
    // workaround requires object/embed tags to be included in external js
    // hence this func... sb
    // note: if 'allow script debugging' is *not* checked in ie settings, you will still get the activiation prompt!
    document.write(tag);
}

function genpop(url,name,width,height,resize,scroll) {
    popupWin = window.open(url, name,'width='+width+',height='+height+',resizable='+resize+',scrollbars='+scroll+',location=0,menubar=0,statusbar=0,toolbar=0');
    setTimeout("checkWindow(popupWin)", 50);
}

function checkWindow(windowToCheck) {
	if (!windowToCheck) {
  		// Check for cookie indicating the popup warning has been seen the 
  		// maximum number of times. If so, then don't display the warning.
  		var popupWarnings = getCookie("popupwarning");
  		var maxPopupWarnings = 1;
  		
  		if (popupWarnings < maxPopupWarnings) {
    		var popup = document.getElementById("popup_warning");
    		popup.style.display = "block";
    		centerPopup(popup);
		    setCookie("popupwarning", ++popupWarnings, getExpDate(1, 0, 0), "/");
		}
	}
}

function centerPopup(popup) {
    var iWidth = (window.innerWidth) ? window.innerWidth : document.body.offsetWidth;
    var iHeight = screen.height;
    popup.style.left = Math.round((iWidth / 2) - (popup.offsetWidth / 2)) + "px";
    popup.style.top = Math.round((iHeight / 4) - (popup.offsetHeight / 2)) + "px";
}


function checkSearch(obj) {
    var check=obj.qs.value;
    if (check) {
        obj.submit();
    } else {
        alert("“ü—Í‚µ‚Ä‚­‚¾‚³‚¢");
    }
}