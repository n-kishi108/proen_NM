<!--
	x = (screen.width  - 530) / 2;
	y = (screen.height - 210) / 2;
	
	var sel_length, end_length=0, start_length=0;
	var bl=0;
	var el=null;
	var visibility = "hidden";


	function check_bl(Body) {
		if(String("jadge")) {
 			bl=3;
		} else if(document.getElementById) {
 			bl=4;
		}
		if(document.getElementById(Body).setSelectionRange){
 	 		bl=2;
		} else if(document.selection.createRange){
 	 		bl=1;
		}
	}


	function get_pos(d) {
		if( d ) el=d;
	 	var ret=0;
	 	if( bl==1 ) {
	   		var sel=document.selection.createRange();
	   		sel_length = sel.text.length;
	   		var r=d.createTextRange();
	   		var all=el.value.length;
	   		r.moveToPoint(sel.offsetLeft,sel.offsetTop);
	   		r.moveEnd("textedit");
	   		end_length=r.text.length;
	   		start_length=all-end_length;
	   		if (start_length < 0) start_length = 0;
	 	} else if( bl==2 ) {
	     	start_length=d.selectionStart;
	     	end_length=d.value.length - d.selectionEnd;
	     	sel_length=d.selectionEnd-start_length;
	 	}else if( bl==3 ){
	     	//var ln=new String(d.value);
	     	//start_length=ln.length;
	     	//end_length=start_length;
	     	//sel_length=0;
	 	}


	}
	
	function atach_focus(ln){
	  if( bl == 1 ){
	    var e=el.createTextRange();
	    var tx=el.value.substr(0, ln);
	    var pl=tx.split(/\n/);
	    e.collapse(true);
	    e.moveStart("character",ln-pl.length+1);
	    e.text=e.text+"";
	    e.collapse(false);
	    e.select();
	  } else if( bl == 2 ){
	  	el.setSelectionRange(ln, ln);
	  } else if( bl == 3 ){
	  }
	  el.focus();
	}

	var strFile;
	function enclose(s, e) {
	  	if(!el) return;
	  	if (bl == 2) {
	  		get_pos(el);
	  	}
	  	var itext=el.value;
	  	
		if((bl == 3) || (bl == 4)) {		
	    	el.value = itext + s + e;
		} else if(bl) {
	    	var click_s = itext.substr(0, start_length);
	    	var click_m = itext.substr(start_length, sel_length);
	    	var click_e = itext.substr(start_length + sel_length, end_length);
	    	el.value=click_s + s + click_m + e + click_e;
	  	}
	  	atach_focus(s.length+e.length+start_length+sel_length);
	}
	
	function rtrim(argValue){

    	return String(argValue).replace(/[\n\r]/g, "");

	}
	function showColorPalette(event) {
		var x = getMouseX(event);
		var y = getMouseY(event);
		
		if(bl > 2) {
			subW = window.open('../../subs/colorselect.html','','width=200,height=100,scrollbars=no,location=no,menubar=no,left=' + y + ',top=' + x + '');
		} else {
			var objid = document.getElementById('layerColor');
			if (objid.style.visibility == "visible") {
				objid.style.visibility = "hidden";
			} else {
				strFile = '/subs/color.html';
				loadTextFile();
				objid.style.left = x;
				objid.style.top = y;
				objid.style.visibility = "visible";
			}
		}
	}
	
	function showIconPalette(event) {
		
		var x = getMouseX(event);
		var y = getMouseY(event);

		if(bl > 2) {
			subW = window.open('../../subs/emojiselect.html','','width=200,height=100,scrollbars=no,location=no,menubar=no,left=' + x + ',top=' + x + '');
		} else {	 
			var scrX = screen.width;
			
			
			var objid = document.getElementById('layerColor');
			var imageX = 205;
			
			if (x+imageX > scrX) {
				x = x - ((x+imageX) - scrX)
			}
			
			if (objid.style.visibility == "visible") {
				objid.style.visibility = "hidden";
			} else {
				strFile = '/subs/emoji.html';
				loadTextFile();
				objid.style.left = x;
				objid.style.top = y;
				objid.style.visibility = "visible";
			}
		}
	}
	function paletteset() {
		var objid = document.getElementById('layerColor');
		objid.style.visibility = "hidden";
		//var objid = document.getElementById('layerImage');
		//objid.style.visibility = "hidden";	
	}

	function createXMLHttpRequest(cbFunc)
	{
		var XMLhttpObject = null;
		try{
			XMLhttpObject = new XMLHttpRequest();
		}catch(e){
			try{
				XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){
				try{
					XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
				}catch(e){
					return null;
				}
			}
		}
		if (XMLhttpObject) XMLhttpObject.onreadystatechange = cbFunc;
		return XMLhttpObject;
	}
	
	function loadTextFile() {
		httpObj = createXMLHttpRequest(displayData);
		if (httpObj) {
			httpObj.open("GET",strFile,true);
			httpObj.send(null);
		}
	}

	function displayData() {
		if ((httpObj.readyState == 4) && (httpObj.status == 200)) {
			if (strFile == 'emoji.html') {
				var objid = document.getElementById('layerImage');
			} else {
				var objid = document.getElementById('layerColor');
			}
			objid.innerHTML = httpObj.responseText;
		}
	}
	
	function getMouseX(e){
	  if(window.opera)   
	          return e.clientX
	  else if(document.all)   
	          return document.body.scrollLeft+e.clientX
	  else if(document.layers||document.getElementById)
	          return e.pageX
	}
	
	function getMouseY(e){
	  if(window.opera) {
	  		return e.clientY
	  } else {
	  	if (document.all) {
	  		if (document.body.scrollTop == 0) {
	  			return document.documentElement.scrollTop+e.clientY
	  		} else {
	  			return document.body.scrollTop+e.clientY
	  		}
	  	} else {
	  		if(document.layers||document.getElementById) {
	  			return e.pageY
	  		}
	  	}
	}
	}
//-->