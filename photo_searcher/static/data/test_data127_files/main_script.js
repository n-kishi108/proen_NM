/* 기본변수
	this_url="세부적인 보드링크 url";
	this_skin="현재출력 스킨 디렉토리의 url/path";
	is_Admin="관리자 접속이면 1";
	is_Member='회원로그인이면 1';
*/








//------기본함수 활용 방법은 [사용자 매뉴얼]->[응용,확장] 참조할것


// 기본 윈도우창
// (1파일명 or URL, 2가로크기, 3세로크기, 4가로위치, 5세로위치, 6글번호, 7GET인수, 8스키롤, 9크기변경, 10타겟, 11윈도우 구분)
function xwindow_OPEN(exe,  div_w,  div_h,  coord_x,  coord_y,  no,  str,  scroll,  resize,  target,  wintype){
	linkurlsrc=(Public_URL(exe))? exe : this_url+"&command=exp_window"+(no>0?'&no='+no:'')+"&exe="+exe+"&"+str;
	if(wintype!=1)	OpenWin_smart(linkurlsrc,target,div_w,div_h,coord_x,coord_y,scroll,resize); // 메뉴없는 창
	else					OpenWin_variety(linkurlsrc,target,div_w,div_h,coord_x,coord_y,scroll,resize); // 메뉴있는 창
}


// 응용레이어 추가 생성방법및 옵션지정은 매뉴얼 참조
// iwindow_OPEN(실행파일, iwin이름, get쿼리, 'width=,height=,left=,top=,move_left=,move_top=,btn_help=,btn_grow=,btn_close=,autoclose=1,titlebar=,new_iwin=,css_style=')
function iwindow_OPEN(exe, iwin_name, str_query, option_set){
	var Opt_Set=new Array(); option_set=TnT_option_set_chk(option_set);
	var OPT=option_set.toLowerCase().split(',');
	for(i=0; i<OPT.length; ++i){TMP=OPT[i].split('='); Opt_Set[TMP[0]]=TMP[1];}
	if(value_renwl(Opt_Set['new_iwin'])){create_iwindow(TnT_time(),Opt_Set['css_style']);}
	else{
		iwchk=document.getElementById('TnTeIwin'+iwin_name);
		if(!iwchk) create_iwindow(iwin_name,Opt_Set['css_style']); else set_iwindow_focus_change(iwin_name);
	}
	TnTw_size=parseInt(Opt_Set['width']); if(!TnTw_size||TnTw_size<2) TnTw_size=250;
	TnTh_size=parseInt(Opt_Set['height']); if(!TnTh_size||TnTh_size<2) TnTh_size=250;
	if(Opt_Set['left'] && Opt_Set['left'].match(/[0-9]+%/)){
		Opt_Set['left']=parseInt(Opt_Set['left']);
		Opt_Set['left']=(document.body.clientWidth*Opt_Set['left']/100)+document.body.scrollLeft-(TnTw_size/2);
		if(Opt_Set['left']<document.body.scrollLeft)Opt_Set['left']=document.body.scrollLeft+1;
	}
	if(Opt_Set['top'] && Opt_Set['top'].match(/[0-9]+%/)){
		Opt_Set['top']=parseInt(Opt_Set['top']);
		Opt_Set['top']=(document.body.clientHeight*Opt_Set['top']/100)+document.body.scrollTop-(TnTh_size/2);
		if(Opt_Set['top']<document.body.scrollTop)Opt_Set['top']=document.body.scrollTop+1;
	}
	if(Opt_Set['function']) eval(Opt_Set['function']+"('"+exe+"','"+str_query+"','"+option_set+"')");
	else HideBox_id.src=(Public_URL(exe))? exe : this_url+"&command=iwindow&exe="+exe+"&"+str_query+"&clientTime="+TnT_time();
	iwindow_RESIZE(TnTw_size,TnTh_size);
	layer_large_btn.style.display=value_renwl(Opt_Set['btn_grow'])?'':'none';
	layer_help_btn.style.display=value_renwl(Opt_Set['btn_help'])?'':'none';
	layer_close_btn.style.display=value_renwl(Opt_Set['btn_close'],1)?'':'none';
	iwindowTopTr.style.display=value_renwl(Opt_Set['titlebar'],1)?'':'none';
	iwindowTopTr2.style.display=value_renwl(Opt_Set['titlebar'],1)?'none':'';
	layer_help_func=exe;
	TnT_layer_open(TnTw_size,TnTh_size,parseInt(Opt_Set['left']),parseInt(Opt_Set['top']),parseInt(Opt_Set['move_left']),parseInt(Opt_Set['move_top']));
	if(!value_renwl(Opt_Set['autoclose'],1)) TnTL_clickTime=1;
	return 1;
}
// option value
function value_renwl(setvalue,setdefault){
	if(!setvalue)setvalue=setdefault;
	if(setvalue=='yes' || setvalue=='y' || setvalue=='true' || parseInt(setvalue)==1) return true;
	return false;
}
// option str
function TnT_option_set_chk(str){
	if(!str) return '';
	return str.replace(/^\s+/,'').replace(/\s+$/,'').replace(/\s*,\s*/g,',').replace(/\s*=\s*/g,'=');
}

//--------------------------------------------------
// ajax request 응용(매뉴얼->응용,확장 참조)
// innerhtml_ON(실행파일, div_id, get쿼리, 'width=,height=,left=,top=,move_left=,move_top=,css_style=')
function innerhtml_ON(exe,div_id,str_query,option_set){
	var layer_type,tm_evt_left,tm_evt_top,xm_obj,div_name;
	var Opt_Set=new Array();
	option_set=TnT_option_set_chk(option_set);
	var OPT=option_set.toLowerCase().split(',');
	for(i=0; i<OPT.length; ++i){TMP=OPT[i].split('='); Opt_Set[TMP[0]]=TMP[1];}
	if(!div_id) div_id='TnTinnerdiv1';
	div_name=document.getElementById(div_id);
	if(!div_name){
		div_name=document.createElement('div');
		div_name.setAttribute('id',div_id);
		document.body.appendChild(div_name);
		if(!Opt_Set['left'] && !Opt_Set['move_left']) Opt_Set['move_left']=8;// default left
		if(!Opt_Set['top'] && !Opt_Set['move_top']) Opt_Set['move_top']=8;// default top
		layer_type=1;
	}
	div_name.style.display='block';
	if(Opt_Set['css_style']) div_name.style.cssText=div_name.style.cssText+'; '+Opt_Set['css_style']; // css
	if(Opt_Set['width']>1) div_name.style.width=Opt_Set['width'];
	if(Opt_Set['height']>1) div_name.style.height=Opt_Set['height'];
	if(Opt_Set['left']>=1) {layer_type=1; div_name.style.left=Opt_Set['left'];}
	if(Opt_Set['top']>=1) {layer_type=1; div_name.style.top=Opt_Set['top'];}
	if(Opt_Set['move_left'] || Opt_Set['move_top']){
		layer_type=1;
		if(this_browser=='n'){
			tm_evt_top=ns_pageY();
			tm_evt_left=ns_pageX();
		}
		else{
			tm_evt_top=ie_clientY() + document.body.scrollTop;
			tm_evt_left=ie_clientX() + document.body.scrollLeft;
		}
		if(Opt_Set['move_left']) div_name.style.left=tm_evt_left+parseInt(Opt_Set['move_left']);
		if(Opt_Set['move_top']) div_name.style.top=tm_evt_top+parseInt(Opt_Set['move_top']);
		if(parseInt(div_name.style.left) < 1) div_name.style.left=5;
		if(parseInt(div_name.style.top) < 1) div_name.style.top=5;
	}
	if(layer_type){
		div_name.style.position='absolute';
		div_name.style.visibility='visible';
		div_name.style.zIndex=++iwinzidx;
	}
	str_query=(str_query)?TnT_queryEncode(str_query):'';
	if(!Public_URL(exe)) exe=TnT_urlEncode(this_url)+"&command=innerhtml&exe="+exe;
	else exe=TnT_urlEncode(exe);
	exe=exe+'&'+str_query+'&inner_div='+div_id+'&is_xmlhttp=1&clientTime='+TnT_time();
	xm_obj = TnT_xmlRequest();
	xm_obj.open("POST",exe,true);
	xm_obj.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	xm_obj.onreadystatechange = function(){
		if(xm_obj.readyState == 4) div_name.innerHTML=xm_obj.responseText;
	}
	xm_obj.send('');
}

function TnT_queryEncode(query_str){
	if(query_str=="") return;
	var enc_query='';
	var Arr_tmp=query_str.split('&');
	for(i=0;i<Arr_tmp.length;i++){
		var Arr_tmp2 = Arr_tmp[i].split('=');
		enc_query += '&'+encodeURIComponent(Arr_tmp2[0])+'=';
		enc_query += (Arr_tmp2[1]) ? encodeURIComponent(Arr_tmp2[1]) : '';
	}
	return enc_query;
}

function TnT_urlEncode(url){
	var urlsplit=url.split('?');
	if(urlsplit.length<2) return url+'?';
	var tmp=urlsplit[0];
	urlsplit.shift();
	return tmp+'?'+TnT_queryEncode(urlsplit.join('?'));
}

function TnT_xmlRequest(){
	if(window.XMLHttpRequest) return new XMLHttpRequest();
	else return new ActiveXObject("Microsoft.XMLHTTP");
}

function innerhtml_OFF(div_id){
	if(div_id) div_id=document.getElementById(div_id);
	if(div_id){div_id.style.display='none'; div_id.innerHTML='';}
}
//--------------------------------------------------


// 대화상자 - ModalDialog
// (1파일명 or URL, 2가로크기, 3세로크기, 4가로위치, 5세로위치, 6글번호, 7GET인수, 8스크롤,9크기변경)
function dialog_OPEN(exe, div_w, div_h, coord_x, coord_y, no, str, scroll, resize){
	linkurlsrc= (Public_URL(exe))? exe : this_url+"&command=exp_dialog"+(no>0?'&no='+no:'')+"&exe="+exe+"&"+str;
	return OpenWin_Dialog(linkurlsrc,div_w,div_h,coord_x,coord_y,scroll,resize);
}



// 이미지 사이즈에 맞게 팝업창으로 출력(이미지url,가로,세로,이미지에link,재귀)
function imgSize_OPEN(imgURL,Wi,Hi,clickLINK,recnt){
	if(!imgURL) return;
	if(imgURL.match(/\.swf/i)) popup_win=window.open('','ipupimg','width=400,height=250,resizable=1,scrollbars=1'); // flash
	else{
		if(!recnt){tmpimg= new Image(); tmpimg.src=(imgURL);}
		if(tmpimg.width!=0 && tmpimg.height!=0){
			Wi=tmpimg.width;
			Hi=tmpimg.height;
			var limit_w=screen.width - 80; // 최대사이즈 w
			var limit_h=screen.height - 100; // 최대사이즈 h
			var usescroll='';
			if(limit_w<Wi){Wi=limit_w; usescroll=',scrollbars=1';}
			if(limit_h<Hi){Hi=limit_h; usescroll=',scrollbars=1';}
			if(!recnt) popup_win=window.open('','ipupimg','width='+Wi+',resizable=1,height='+Hi+usescroll);
			if(navigator.userAgent.match(/MSIE\s*(7|8|9)/i)) Hi+=22;
			popup_win.resizeTo(Wi+10,Hi+58);
		}
		else{
			if(!recnt)  popup_win=window.open('','ipupimg','width=400,height=400,resizable=1,scrollbars=1');
			if(!clickLINK) clickLINK='';
			recountID=setTimeout("imgSize_OPEN('"+imgURL+"','','','"+clickLINK+"',1)",300);
			return;
		}
	}
	popup_win.focus();
	popup_win.document.write("<html><head><title>Image Viewer</title>");
	popup_win.document.write("<script language=javascript>dragstart=0;is_left=0;is_top=0;x=0;y=0;"+
		"function move(ev){if(dragstart==1){is_left=temp1+event.clientX-x;is_top=temp2+event.clientY-y;onloadimg.style.left=is_left;"+
		"onloadimg.style.top=is_top;return false;}}function drags(this_img){onloadimg=this_img;"+
		"dragstart=1;temp1=parseInt(onloadimg.style.left+0);temp2=parseInt(onloadimg.style.top+0);x=event.clientX;y=event.clientY;document.onmousemove=move;}"+
		"function dragstop(){dragstart=0;if(is_left==temp1 && is_top==temp2) window.close();}</script>");
	popup_win.document.write("</head><body style='border-width:0; padding:0;' topmargin=0 rightmargin=0 leftmargin=0;");
	if(clickLINK) 	popup_win.document.write(" onclick=location.href='"+clickLINK+"'");
	popup_win.document.write("><table border=0 cellpadding=0 cellspacing=0 width=100% height=100%><tr><td align=center>");
	if(imgURL.match(/\.swf$/i)) popup_win.document.write("<embed src="+imgURL+" width='98%' height='98%'>");
	else popup_win.document.write("<img src="+imgURL+" style='cursor:pointer; position:relative;' border=0 onmousedown=drags(this) onmouseup=dragstop()>");
	popup_win.document.write("</td></tr></table></body></html>");
	popup_win.document.close();
}


// 이미지 사이즈에 맞게 iwindow 출력 
function iview_setimg(str_imgurl,str_query,str_option,recnt){
	var Wi=0;
	var Hi=0;
	if(!recnt){tmpimg= new Image(); tmpimg.src=(str_imgurl);}
	if((tmpimg.width!=0)&&(tmpimg.height!=0)){Wi=tmpimg.width; Hi=tmpimg.height;}
	else{setTimeout("iview_setimg('"+str_imgurl+"','"+str_query+"','"+str_option+"',1)",100); return;}
	with(HideBox_name.document){
		write("<html><body topmargin=0 leftmargin=0 style='padding:0; text-align:center;'><span>");
		write("<img src="+str_imgurl+" border=0 onclick='parent.iwindow_CLOSE()' style='cursor:pointer;'>");
		write("</span></body></html>");
		if(this_browser=='n') body.style.overflow='hidden';
		close();
	}
	TnTw_size=Wi+1;
	TnTh_size=Hi+1;
	iwindow_TITLE(this_skin+'/iwindow/immg/title_imgview.gif');
	iwindow_RESIZE(TnTw_size,TnTh_size);
}


// 접속형태가 일반 URL 인지 , 실행파일명인지 체크
function Public_URL(string){
	if(!string.match(/^\w+$/)) return 1;
}

function TnT_time(){return (new Date()).getTime();}


// 부라우저 상단 메뉴,버튼 '없는' 윈도우 창
function OpenWin_smart(Url,Target,Xsize,Ysize,left_is,top_is,Scroll,Resize){
		if(!Xsize || Xsize<40) Xsize=500;
		if(!Ysize || Ysize<40) Ysize=450;
		if(Resize != 'no' && Resize != 0 ) Resize=1;
		if(!left_is || left_is<1) left_is= (screen.width-Xsize)/2;
		if(!top_is || top_is<1) top_is= (screen.height-Ysize-200)/2;
		smart_Browser=window.open(Url,Target,'width='+Xsize+',height='+Ysize + ',left=' +left_is+ ',top=' +top_is+ ',scrollbars='+Scroll+',resizable='+Resize+',status=0');
		smart_Browser.focus();
}


// 부라우저 상단 메뉴,버튼 '있는' 윈도우 창
function OpenWin_variety(Url,Target,Xsize,Ysize,left_is,top_is){
		if(!Xsize || Xsize<40)Xsize=screen.width -80;
		if(!Ysize || Ysize<40)Ysize=screen.height -80;
		if(!left_is || left_is<1) left_is= (screen.width-Xsize)/2;
		if(!top_is || top_is<1) top_is= (screen.height-Ysize)/2;
		variety_Browser=window.open(Url,Target,'width='+Xsize+',height='+Ysize + ',left=' +left_is+ ',top=' +top_is + ',scrollbars=1,toolbar=1,location=1,directories=1,status=1,menubar=1,resizable=1,copyhistory=1');
		variety_Browser.focus();
}


// ModalDialog 박스1
function OpenWin_Dialog(Url,width_is,height_is,left_is,top_is,scroll_is,resize_is){
		if(Url=="") return;
		if(!width_is || width_is<40) width_is= 250;
		if(!height_is || height_is<40) height_is= 250;
		if(!left_is || left_is<1) left_is=  (screen.width-width_is)/2;
		if(!top_is || top_is<1) top_is=  (screen.height-height_is-200)/2;
		scroll_is=(scroll_is>0)?'1':'0';
		resize_is=(resize_is>0)?'1':'0';
		return_value=showModalDialog(Url,0,'dialogWidth:'+width_is+'px; dialogHeight:'+height_is+'px; dialogLeft:'+left_is+'px; dialogTop:'+top_is+'px; status:0; scroll:'+scroll_is+'; help:0; resizable:'+resize_is+';');
		return return_value;
		//  showModalDialog("abcd.html","window","font-family:Verdana; font-size:12; dialogHeight:310px; dialogWidth:480px; dialogLeft:30px; dialogTop:500px; status:no; help:no; scroll:no");
}


// ModalDialog 박스2(사용안함)
function OpenWin_Always(Url,width_is,height_is,left_is,top_is,scroll_is,resize_is){
		if(Url=="") return;
		if(!width_is || width_is<40) width_is= 250;
		if(!height_is || height_is<40) height_is= 250;
		if(!left_is || left_is<1) left_is=  (screen.width-width_is)/2;
		if(!top_is || top_is<1) top_is=  (screen.height-height_is-200)/2;
		scroll_is=(scroll_is>0)?'1':'0';
		resize_is=(resize_is>0)?'1':'0';
		return_value=showModelessDialog(Url,0,'dialogWidth:'+width_is+'px; dialogHeight:'+height_is+'px; dialogLeft:'+left_is+'px; dialogTop:'+top_is+'px; status:0; scroll:'+scroll_is+'; help:0; resizable:'+resize_is+';edge:raised;');
		return return_value;
		//  showModalDialog("abcd.html","window","font-family:Verdana; font-size:12; dialogHeight:310px; dialogWidth:480px; dialogLeft:30px; dialogTop:500px; status:no; help:no; scroll:no");
}






//-----------------------------------------------------------------------------------------

// TnT_layer_open(width,height,절대위치x,절대위치y,이동위치W,이동위치H)
TnTL_clickTime=1;
function TnT_layer_open(Table_w,Table_h,fs_X,fs_Y,mv_W,mv_H){
	var clX,clY,mvX,mvY;
	mvX=(mv_W>=1 || mv_W<=-1)?mv_W:8;//x move
	mvY=(mv_H>=1 || mv_H<=-1)?mv_H:8;//y move
	iwindowLAYER.opened=true;
	if(this_browser=='n'){
		clY=(fs_Y > 0)?fs_Y:ns_pageY()+mvY;
		clX=(fs_X > 0)?fs_X:ns_pageX()+mvX;
	}
	else{
		clY=(fs_Y > 0)?fs_Y: ie_clientY()+ document.body.scrollTop+mvY;
		clX=(fs_X > 0)?fs_X: ie_clientX()+ document.body.scrollLeft+mvX;
	}
	if(clX+Table_w+15>document.body.clientWidth) clX=clX-Table_w-40; // 가로
	if(clY+Table_h+45>document.body.clientHeight+document.body.scrollTop) clY=clY-Table_h-40; // 세로
	if(clX<document.body.scrollLeft) clX=document.body.scrollLeft+3; // left
	if(clY<document.body.scrollTop) clY=document.body.scrollTop+3; // top
	iwindow_MOVE(clX,clY);
	iwindowLAYER.style.visibility='visible';
	TnTlayerResize=0; // 레이어 크기 변경 구분 숫자
	TnTL_clickTime=(new Date()).getTime(); // 레이어 출력 시간
}

def_iwinXY=0;
function ns_pageY(){if(mouseDN_Y==0) return def_iwinXY+=10; return mouseDN_Y;}
function ns_pageX(){if(mouseDN_X==0) return def_iwinXY+=20; return mouseDN_X;}
function ie_clientY(){if(!event) return def_iwinXY+=10; return event.clientY;}
function ie_clientX(){if(!event) return def_iwinXY+=20; return event.clientX;}



// 레이어 확대
function iwindow_ENLARGE(){
	body_W=document.body.clientWidth;
	body_H=document.body.clientHeight;
	if(TnTlayerResize==0){
		it_tn_st_w=parseInt(TntiwindowTable.width);
		it_tn_st_h=parseInt(TntiwindowTable.height);
		add_W=(body_W - it_tn_st_w-20)/3;
		add_H=(body_H - it_tn_st_h-40)/3;
	}
	newSize_w=parseInt(TntiwindowTable.width)+add_W;
	newSize_h=parseInt(TntiwindowTable.height)+add_H;
	if(body_W-20<newSize_w || body_H-40<newSize_h){
		newSize_w=it_tn_st_w;
		newSize_h=it_tn_st_h;
	}
	iwindow_MOVE((body_W-newSize_w)/2+document.body.scrollLeft,(body_H-newSize_h)/2+document.body.scrollTop);
	 iwindow_RESIZE(newSize_w,newSize_h);
	TnTlayerResize++;
	TnTL_clickTime=1;
}



// 레이어상단 help버튼
function TnT_layer_help(){
	OpenWin_smart('help.php?item=iwindow_help&function='+layer_help_func,'L_help',500,500,100,100,1,1);
	TnTL_clickTime=1;
}


// 레이어 위치 지정(절대위치Left,절대위치Top,상대위치Left,상대위치Top)
function iwindow_MOVE(L,T,mv_L,mv_T){
	if(L) iwindowLAYER.style.left=L;
	if(T) iwindowLAYER.style.top=T;
	if(mv_L) iwindowLAYER.style.left=parseInt(iwindowLAYER.style.left)+mv_L;
	if(mv_T) iwindowLAYER.style.top=parseInt(iwindowLAYER.style.top)+mv_T;
}

// 레이어 타이틀 이미지
function iwindow_TITLE(imgsrc){
		if(tntactiwin) HideBox_title.src=imgsrc; // 레이어 타이틀바에 출력될 이미지
}


// 레이어 크기변경
function iwindow_RESIZE(x,y){
	if(x>0) TntiwindowTable.width=x;
	if(y>0){ TntiwindowTable.height=y;
		TntiwindowTable.style.height=y;
	}
}


// 레이어 close
function iwindow_CLOSE(){
	iwindowLAYER.opened = false;
	iwindowLAYER.style.visibility = 'hidden';
	TnTL_clickTime=1;
}


// 레이어 메시지 출력
function iwindow_MESSAGE(msg,x,y,place,closetime){
	var isactiwn;
	if(place=='self'){// iwindow 현재위치에서 출력
		x=parseInt(iwindowLAYER.style.left);
		y=parseInt(iwindowLAYER.style.top);
		isactiwn=tntactiwin.replace(/TnTeIwin/,'');
	}
	iwindow_OPEN(this_url+'&command=public&exe=error_msg_iwindow&msg='+encodeURIComponent(msg),isactiwn,'','width=250,height=100,left='+x+',top='+y);
	if(closetime>10) setTimeout("iwindow_CLOSE()",closetime);
}


//--------------------



// iwindow 에서 상위 프레임에 레이어 출력(event,레이어id,[절대위치left,절대위치top,상대위치left,상대위치top])
function iwindow_sub_OPEN(evt,layer_id,abs_left,abs_top,each_left,each_top){
	var temp_layer=document.getElementById('TnT_TempLayer');
	var act_frame=HideBox_name;
	var act_div=act_frame.document.getElementById(layer_id);
	var act_w=parseInt(act_div.style.width);
	var act_h=parseInt(act_div.style.height);

	var i_left=parseInt(iwindowLAYER.style.left);
	var i_top=parseInt(iwindowLAYER.style.top);

	if(abs_left!=0 || abs_top!=0){ // 절대위치
		temp_layer.style.left = abs_left;
		temp_layer.style.top = abs_top;
	}
	else{//상대위치

		if(this_browser=='n'){
			temp_layer.style.left = evt.pageX+i_left+each_left+5; // 5: left border 보상
			temp_layer.style.top = evt.pageY+i_top-each_top+20; //20: head td 보상
		}
		else{
			temp_layer.style.left = act_frame.event.clientX+ act_frame.document.body.scrollLeft+i_left+each_left+5;  // 5: left border 보상
			temp_layer.style.top = act_frame.event.clientY+ act_frame.document.body.scrollTop+i_top-each_top+20; //20: head td 보상
		}
	}

	if(act_w>50){ //width 보상
		temp_layer.style.width=act_w;
		if(parseInt(temp_layer.style.left)+act_w>document.body.clientWidth+ document.body.scrollLeft){
			temp_layer.style.left=parseInt(temp_layer.style.left)-act_w-each_left*2;
		}
		if(parseInt(temp_layer.style.left)<1)temp_layer.style.left=1; // 가로
	}
	else 	temp_layer.style.width=50;


	if(act_h>10){ //height 보상
		temp_layer.style.height=act_h;
		if(parseInt(temp_layer.style.top)+act_h>document.body.clientHeight+ document.body.scrollTop){
			temp_layer.style.top=parseInt(temp_layer.style.top)-act_h+each_top*2;
		}
		if(parseInt(temp_layer.style.top)<1)temp_layer.style.top=1; // 세로
	}
	else temp_layer.style.height=10;

	temp_layer.innerHTML=act_div.innerHTML;
	temp_layer.style.visibility = 'visible';
	temp_layer.style.zIndex=1000;

}

// 닫기
function iwindow_sub_CLOSE(){
	document.getElementById('TnT_TempLayer').style.visibility = 'hidden';
}




// 일반레이어 on/off 활용 (event,레이어id,[절대위치left,절대위치top,상대위치left,상대위치top])
function publicLayerDisplay(evt,layer_id,abs_left,abs_top,each_left,each_top,toggle){
	thislayer=document.getElementById(layer_id);
	if(evt=='close'){thislayer.style.visibility = 'hidden'; return;}
	if(toggle && thislayer.style.visibility =='visible') {thislayer.style.visibility = 'hidden'; return;}
	abs_left=parseInt(abs_left); abs_top=parseInt(abs_top);
	each_left=parseInt(each_left); each_top=parseInt(each_top);
	if(abs_left==0 && abs_top==0){
		abs_left=(this_browser=='n')? evt.pageX+each_left : event.clientX+document.body.scrollLeft+each_left;
		abs_top=(this_browser=='n')? evt.pageY-each_top : event.clientY+document.body.scrollTop-each_top;
	}
	thislayer.style.left = abs_left;
	thislayer.style.top =abs_top;
	var all_left_ck=TnT_get_objLeft(thislayer);
	var all_top_ck=TnT_get_objTop(thislayer);
	if(abs_left!=all_left_ck || abs_top!=all_top_ck){
		var p_left_ck=TnT_get_objLeft(thislayer.offsetParent);
		var p_top_ck=TnT_get_objTop(thislayer.offsetParent);
		thislayer.style.left=all_left_ck-p_left_ck*2;
		thislayer.style.top=all_top_ck-p_top_ck*2;
	}
	thislayer.style.visibility = 'visible';
}


//-----------------------------------




// iwindow : Drag & Resize --------------------------------------------------------

DragResize_start=0;
function DragResize_DN(it_Resize,evt,div_id){

	if(div_id){
		mv_act_objt=document.getElementById(div_id);
		if(mv_act_objt.style.position!='absolute'){
			mv_act_objt.style.left=TnT_get_objLeft(mv_act_objt);
			mv_act_objt.style.top=TnT_get_objTop(mv_act_objt);
			mv_act_objt.style.position='absolute';
		}
		mv_act_objt.style.zIndex=++iwinzidx;
	}
	else{mv_act_objt=iwindowLAYER;}

	DragResize_start=1;
	Drg_x=(this_browser=='n')? evt.pageX : event.clientX;
	Drg_y=(this_browser=='n')? evt.pageY : event.clientY;

	if(it_Resize<1){// Drag
		temp1=parseInt(mv_act_objt.style.left);
		temp2=parseInt(mv_act_objt.style.top);
		if(this_browser=='n')  document.onmousemove=TnTmoveAct_n;
		else document.onmousemove=TnTmoveAct;
	}
	else{// Resize
		iwindoWidth=parseInt(TntiwindowTable.width); // 가로
		iwindoHeight=parseInt(TntiwindowTable.height); // 세로
		if(this_browser=='n')  document.onmousemove=TnTresizeAct_n;
		else document.onmousemove=TnTresizeAct;
	}
	TnTL_clickTime=1;
}

function drag_time_true(){ // when iframe onmouseover
	if(DragResize_start==1 && this_browser!='n') iwindowLAYER.style.top=parseInt(iwindowLAYER.style.top)+100;
}

function TnTmoveAct(){ // drag
	if(DragResize_start==1){
		mv_act_objt.style.left=temp1+event.clientX-Drg_x;
		mv_act_objt.style.top=temp2+event.clientY-Drg_y;
		return false;
	}
}

// resize move
function TnTresizeAct(){
	if(DragResize_start==1){
		var re_x=iwindoWidth+event.clientX-Drg_x;
		var re_y=iwindoHeight+event.clientY-Drg_y;
		if(re_x<50 || re_y<50) return false;
		iwindow_RESIZE(re_x,re_y);
		return false;
	}
}


function TnTmoveAct_n(evt){ // drag
	if (DragResize_start==1){
		mv_act_objt.style.left=temp1+evt.pageX-Drg_x;
		mv_act_objt.style.top=temp2+evt.pageY-Drg_y;
		return false;
	}
}

// resize move
function TnTresizeAct_n(evt){
	if (DragResize_start==1){
		var re_x=iwindoWidth+evt.pageX-Drg_x;
		var re_y=iwindoHeight+evt.pageY-Drg_y;
		if(re_x<50 || re_y<50) return false;
		iwindow_RESIZE(re_x,re_y);
		return false;
	}
}


// end
function DragResize_UP(){
	document.onmousemove='';
	DragResize_start=0;
}
//-----------------------------------------------------------------------------------




// 부라우저 바탕화면 클릭시 레이어 자동으로 닫히게함(지워 버려도 됨) ----------------------
 document.onclick=iwindow_CLOSE_AUTO;
function iwindow_CLOSE_AUTO(){
	DragResize_start=0;
	if(TnTL_clickTime==1) return; // iwindow 를 드래그 ro 크기변경 동작후에는 자동닫기 적용안함(무조건 자동닫기 적용하려면 이 라인을 삭제)
	if(this_browser=='e'){
		if (event.srcElement.className=="TnT_Layer_dragin") return; // iwindow: Drag, Resize
		if (event.srcElement.className=="TnT_Top_button") return; // iwindow : TopButton
		if (event.srcElement.className=="TnT_Editor_button") return; // editor : Button
	}
	if((TnTL_clickTime+500)<(new Date()).getTime()){iwindow_CLOSE();}
}


// 세션생성: ex)  <a ...  onclick="set_SESSION('myname','kiminho')">이름 세션 생성</a>
// 생성되는 세션키는 앞에 무조건 'TnTT' 가 붙게 된다. (로그인 보안 때문임)
// 예)     onclick="set_SESSION('myname','kiminho')" 로 세선 생성 했다면 ($_SESSION['TnTTmyname'] == 'kiminho') 가 생성됨.
function set_SESSION(key,value){
	if(key) document.getElementById('TnT_TempLayer').innerHTML = "<img src='"+ this_url+"&command=public&exe=set_session&skey="+key+"&svalue="+encodeURIComponent(value)+"' width=1 height=1>";
}

// 보드 검색폼
onloadCheck=0;
function search_select(check_img,field_name){
	hiddenselect=document.board_searchForm.shwhere;
	onloadCheck=1;
	if(hiddenselect.value=='wideSearch'){
		hiddenselect.value='';
		document.board_searchForm.search.value='';
		document.itwideshIcon.src=document.itwideshIcon.src.replace(/2\.gif$/,'1.gif');
	}
	if(hiddenselect.value.match(/[^\|]+$/))hiddenselect.value=hiddenselect.value+'|';
	if(check_img.src.match(/1\.gif$/)){
		if(field_name=='tbody_re'){// 댓글
			hiddenselect.value='';
			for(i=1; i<10; i++){
				tnicoid=document.getElementById('sh_ico_'+i);
				if(tnicoid) tnicoid.src=tnicoid.src.replace(/2\.gif$/,'1.gif');
			}
		}
		else{
			hiddenselect.value=hiddenselect.value.replace(/tbody_re\|*/,'');
			tnicoid=document.getElementById('sh_ico_re');
			if(tnicoid) tnicoid.src=tnicoid.src.replace(/2\.gif$/,'1.gif');
		}
		check_img.src=check_img.src.replace(/1\.gif$/,'2.gif');
		hiddenselect.value=hiddenselect.value+field_name+'|';
	}
	else if(check_img.src.match(/2\.gif$/)){
		check_img.src=check_img.src.replace(/2\.gif$/,'1.gif');
		hiddenselect.value=hiddenselect.value.replace(field_name+'|','');
	}
}
// 선택이미지 변환(검색폼)
function selected_chk(check_img,field_name){
	if(onloadCheck>0) return;
	if(field_name=='checked' && check_img.src.match(/1\.gif$/)) check_img.src=check_img.src.replace(/1\.gif$/,'2.gif');
}

// 쿠키생성 : 쿠키이름은 반드시 앞에 TnT 로 시작되는 이름으로 '보안적 제한' 함
function TnT_setcookie(name,value,utime,path){ //utime 은 시간 단위
	if(!name.match(/^TnT/)) name='TnT'+name; // 'TnT' 강제붙임
	if(!path) path='/';
	var todaydate = new Date();
	unixtime = todaydate.getTime();
	if(value==null) utime = 0;
	if(utime != null){
		extime = unixtime+(utime*3600*1000);
		todaydate.setTime(extime);
		expiretime = " expires=" + todaydate.toUTCString() +";";
	}
	else expiretime = "";
	document.cookie = name + "=" + escape(value) + "; path="+path+";"+expiretime;
}


// 쿠키읽기 : 쿠키이름은 반드시 앞에 TnT 로 시작되는 이름으로 '보안적 제한' 함
function TnT_getcookie(name){
	if(!name.match(/^TnT/)) name='TnT'+name; // 'TnT' 강제붙임
	var flag=document.cookie.indexOf(name+'=');
	if(flag == -1) return;
	flag += name.length+1;
	end = document.cookie.indexOf(';', flag);
	if(end == -1) end = document.cookie.length;
	return unescape(document.cookie.substring(flag, end));
}


// 글목록 섬네일 생성 img_w= ,  img_h= 를 지정하면 지정한 크기로 생성됨
function TnT_thumbnail(thisimg,imgpath,img_w,img_h){
	if(thisimg.style.xrest=='rest') return;
	thisimg.style.xrest='rest';
	thisimg.src=this_url+'&command=openfull&exe=img_nail&img_w='+img_w+'&img_h='+img_h+'&img='+imgpath;
}


// thisobj 의 Top
function TnT_get_objTop(thisobj){
	if(typeof(thisobj)!='object') thisobj=document.getElementById(thisobj);
	if (thisobj.offsetParent==document.body) return thisobj.offsetTop;
	else return thisobj.offsetTop + TnT_get_objTop(thisobj.offsetParent) - thisobj.scrollTop;
}

// thisobj 의 Left
function TnT_get_objLeft(thisobj){
	if(typeof(thisobj)!='object') thisobj=document.getElementById(thisobj);
	if (thisobj.offsetParent==document.body) return thisobj.offsetLeft;
	else return thisobj.offsetLeft + TnT_get_objLeft(thisobj.offsetParent) - thisobj.scrollLeft;
}

// thisobj 의 Center
function TnT_get_objCenter(thisobj){
	if(typeof(thisobj)!='object') thisobj=document.getElementById(thisobj);
	if (thisobj.offsetParent==document.body) return thisobj.offsetCenter;
	else return thisobj.offsetCenter + TnT_get_objCenter(thisobj.offsetParent);
}

// 말풍선 on/off
function balloon_on(str,obj,mv_right,mv_up){
	var alt_balloon=document.getElementById('TnT_TempLayer2');
	alt_balloon.innerHTML="<table cellpadding=0 cellspacing=0 border=0><tr><td width=4 height=21><img src="+this_skin+"/b_img/icons/alt_left.gif align=absmiddle></td><td background="+this_skin+"/b_img/icons/alt_center.gif style='color:#624c10; font-size:9pt; letter-spacing:-1; font-family:ms gothic;'><nobr>&nbsp;"+str+"&nbsp;</nobr></td><td width=5 height=21><img src="+this_skin+"/b_img/icons/alt_right.gif align=absmiddle></td></tr></table>";
	alt_balloon.style.left=TnT_get_objLeft(obj)+mv_right;
	alt_balloon.style.top=TnT_get_objTop(obj)-20-mv_up;
	alt_balloon.style.visibility = 'visible';
	alt_balloon.style.zIndex=++iwinzidx;
}function balloon_off(){document.getElementById('TnT_TempLayer2').style.visibility = 'hidden';}


// 팝업레이어 on/off
function square_on(str,obj,mv_right,mv_up,style){
	var alt_square=document.getElementById('TnT_TempLayer2');
	alt_square.innerHTML="<div onmouseover=square_off(1) onmouseout=square_off() style='border:1px solid #888888; padding:3; background-color:#ffffff; color:#333333; text-align:left; line-height:140%; "+style+"' class=MenuTextColor>"+str+"</div>";
	alt_square.style.left=TnT_get_objLeft(obj)+mv_right;
	alt_square.style.top=TnT_get_objTop(obj)-20-mv_up;
	alt_square.style.visibility = 'visible';
}function square_off(sw){document.getElementById('TnT_TempLayer2').style.visibility=sw?'visible':'hidden';}


// 플래쉬
function insert_flash(src,w,h,conf_str){
	if(w) conf_str+=' width='+w;
	if(h) conf_str+=' height='+h;
	flash_obj = '<object '+conf_str+' type="application/x-shockwave-flash" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0">';
	flash_obj += '<param name="movie" value="'+src+'">';
	flash_obj += '<param name="quality" value="high">';
	flash_obj += '<param name="bgcolor" value="#ffffff">';
	flash_obj += '<param name="swliveconnect" value="true">';
	flash_obj += '<embed '+conf_str+' src="'+src+'" quality=high bgcolor="#ffffff" swliveconnect="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>';
	flash_obj += '</object>';
	document.write(flash_obj);
}

// embed
function document_write_embed(str){
	document.write('<embed '+str+'></embed>');
}

// object
function document_write_object(str,param){
	document.write('<object '+str+'>'+param+'</object>');
}



// onload 기본모드
		mouseDN_X=0;
		mouseDN_Y=0;
		if(navigator.userAgent.indexOf('MSIE') == -1){
			this_browser='n';
			document.onmousedown=function(n_evt){
				mouseDN_X=n_evt.pageX;
				mouseDN_Y=n_evt.pageY;
			}
			it_img_tag='input type=image '; // iwindow title
		}
		else{
			this_browser='e';
			it_img_tag='img ';
		}

		document.write("<div id='TnT_TempLayer' style='width:50px; position:absolute; visibility:hidden; z-Index:11; padding:0;'></div>");
		document.write("<div id='TnT_TempLayer2' style='position:absolute; visibility:hidden; z-Index:11; padding:0;'></div>");



//-----------이하는 본문 출력 해당 부분임-------------------------------------------------------------------------




// 댓글 입력칸 height 확대
function replyboxmove(form_name){
	form_name.tbody.style.height=parseInt(form_name.tbody.style.height)+120+'px';
}


// 댓글 전송
TnT_help_iwindow=0;
function replysubmit(form_name,limitleng,maxicon_name,no_right,no){

	if(form_name.tempspacE.value=='sending'){
		alert('既に転送しました。');
		return false;
	}

	if(no_right!='') return;
	if(form_name.name.value.length<2){
		alert('お名前を入力してください。');
		return false;
	}
	if(form_name.tbody.value.length<7){
		alert('内容を入力してください。');
		return false;
	}

	// 비공개 && !회원로그인 && !비번입력 && 도움말open
	if(form_name.it_secret.value && !is_Member && !form_name.mypass.value && TnT_help_iwindow==0){ // 비공개
		iwindow_OPEN('iwindow_help','','function=reply_no_passwd','width=300,height=110'); //답변대상글에 비번 없을때
		return;
	}

	isgdspan=document.getElementById('gdimg'+no);
	if(isgdspan && isgdspan.innerHTML && form_name.imgword.value.length<3){
		alert('スパム防止用の文字を入力してください。');
		return false;
	}

	if(!cnTtexTleN(form_name,limitleng,maxicon_name)) return; // 댓글 용량체크
	if(form_name.mail) form_name.mail.value='';
	form_name.submit();
	form_name.tempspacE.value='sending';
}


// 기본 입력글자 지움(이름,메일,비번)
function rep_img_clear(wh){
	wh.style.backgroundImage="";
}


// 댓글 -표정 아이콘 선택시 테두리선 변환
function faceicon_selection(formname,face_icon_ids,thisimg,invalue){
	var iconID;
	formname.face.value=invalue;
	for(i=0; i<20; i++){
		iconID=document.getElementById(face_icon_ids+'_'+i);
		if(iconID) iconID.style.cssText='';
	}
	thisimg.style.cssText="border:1px solid #00a800; background-color:#E3FE02;";
}


// 확장아이콘 open
function reply_exp_face_open(form_name,display_name){ 
	F_form=form_name;
	F_display=display_name;
	iwindow_OPEN('iwindow_faceicon','faceicon','','width=250,height=200,btn_grow=y');
}

// 확장아이콘 select
function TnTface_f_icon(selected_face,chgimgsrc){
	if(!selected_face) return;
	F_form.face.value=selected_face;
	F_display.innerHTML='<img src=' + chgimgsrc +' border=0 align=absmiddle> &nbsp; &nbsp;  &nbsp; &nbsp; ';
	F_display.style.cssText='';
	if(F_form.tbody.disabled==true) return;
	F_form.tbody.focus();
}

// 댓글쓰기 버튼 클릭
function minireply_wr_open(num){ 
	var table_name=eval('TnTmiNiwtable'+num);
	if(table_name.style.display=='none'){
		table_name.style.display='';
		var re_wr_form=eval('document.TnT_re_'+num);
		if(re_wr_form.tbody.disabled!=true) re_wr_form.tbody.focus();
	}
	else table_name.style.display='none';
}

// 입력용량 체크(폼이름,제한용량,아이콘이름)
function cnTtexTleN(form_name,limitleng,maxicon_name,no,isgdimg){
	var textareaLeng = form_name.tbody.value.length;
	var cntlEn=limitleng-textareaLeng;
	//-----------
	if(!is_Admin){
		if(cntlEn<0){
			alert('制限容量を越えました。');
			if(form_name.tempspacE.value.length>10){
				form_name.tbody.value=form_name.tempspacE.value;
			}
			return;
		}
		if(isgdimg=='1'){// 스팸차단 문자 입력
			isgdspan=document.getElementById('gdimg'+no);
			if(isgdspan && !isgdspan.innerHTML){
				isgdspan.innerHTML="<span style='letter-spacing:-1;'>右側の絵文字を入力してください。(スパム防止)</span> "+
					"<input type=text name=imgword style='border:1px solid #ffaa66; width:50;'> "+
					"<img src="+this_url+"&command=public&exe=img_passwd&wh=reply&no="+no+"&t="+TnT_time()+" align=absmiddle>";
			}
		}
	}
	//----------
	if(no){
		document.getElementById('grapleft'+no).innerHTML=textareaLeng;
		document.getElementById('grapright'+no).innerHTML=cntlEn;
	}
	if(cntlEn<100 && maxicon_name.src.match(/bar_green\.gif/)){maxicon_name.src=maxicon_name.src.replace(/bar_green\.gif/,'bar_red.gif');}
	maxicon_name.width=50*textareaLeng/limitleng+1; // 50: 입력용량표시 그래프 너비
	if(textareaLeng>10){form_name.tempspacE.value=form_name.tbody.value;}
	return 1;
}


// 파일첨부,링크 로 본문삽입한 그림 : 링크창 띄우기
function TnT_Bimg_window(imgurl){
	if(!imgurl) return;
	OpenWin_smart(this_url+'&command=openfull&srcURL='+imgurl,'img_win',250,250,0,0,1,1);
}


// 이미지 출력 사이즈 제한
function TnT_Bimg_limit(imgid,limitsize){
	var imgname=document.getElementById(imgid);
	if(imgname.width>limitsize)imgname.width=limitsize;
}


// 댓글 쓰기 비공개 지정
var no_passwd_repl;
function replySecretconf(formName,mode){ 
	var reForm=eval(formName);
	var thisbutton=document.getElementById(formName+'_secret');
	if(!thisbutton) return;
	// 공개
	if(reForm.it_secret.value==1 || mode=='open'){
		reForm.it_secret.value='';
		thisbutton.src=thisbutton.src.replace(/2\.gif$/,'1.gif');
		no_passwd_repl='';
	}
	// 비공개
	else{
		reForm.it_secret.value=1;
		thisbutton.src=thisbutton.src.replace(/1\.gif$/,'2.gif');
		if(no_passwd_repl) iwindow_OPEN('iwindow_help','','function=reply_secret&to_name='+no_passwd_repl,'width=310,height=240'); //답변대상글에 비번 없을때
	}
}


// 본문 댓글 by 댓글 버튼
function mini_reply_re(parent_no,repl_no,repl_name,is_passwd,formstyle){
	if(formstyle=='4'){iwindow_MESSAGE('作成権限がありません','','','',2000); return;}
	if(formstyle=='3'){iwindow_OPEN('iwindow_re_write','','repnum='+repl_no+'&no='+parent_no,'width=500,height=150,btn_grow=y,autoclose=n'); return;} // iwindow
	re_wr_form=eval('TnT_re_'+parent_no);
	re_wr_form.reply_num.value=repl_no;
	document.getElementById('TnTmiNiwtable'+parent_no).style.display='';
	if(re_wr_form.tbody.disabled==true){	iwindow_MESSAGE('返答のトラックバック作成権限がありません','','','',2000); return;}
	re_wr_form.tbody.focus();
	re_wr_form.tbody.value='《Re》'+repl_name+" 님 ,\n";
	replySecretconf('TnT_re_'+parent_no,'open'); // 비공개 해제
	no_passwd_repl=(is_passwd) ? '' : repl_name ; // 답글대상에 비번이 있는지
	bg_recolor('#DCFF87');
	setTimeout("bg_recolor('')",300);
	setTimeout("bg_recolor('#DCFF87')",500);
	setTimeout("bg_recolor('')",1000);
}

// 댓글폼 깜박이기
function bg_recolor(bgcol){
	re_wr_form.tbody.style.backgroundColor=bgcol;
}

// 댓글 쓰기 관리자 옵션
function replyAdminconf(formName){ 
	istextstyle=eval(formName).textstyle.value;
	iwindow_OPEN('iwindow_replyoption','','formName='+formName+'&textstyle='+istextstyle,'width=130,height=100,btn_help=y');
}


// 본문내 파일첨부 삽입된것 확장자 변환(to 실행제한)저장된 파일 다운로드
function TnT_bodyOpenfile(thislink,filepath){
	thislink.href=this_url+'&command=openview&exe=file_down&mode=inbody&filepath='+filepath+'&';
}


// 본문글자크기 +,-
function bodyfontSize(mvsize,no){
	var bodycell=document.getElementById('bodytextID'+no);
	if(!bodycell) return;
	var tsize=parseInt(bodycell.style.fontSize);
	if(!tsize || tsize<3) tsize=9;
	bodycell.style.fontSize=tsize+mvsize+'pt';
	document.getElementById('TnT_TempLayer').innerHTML = "<img src='"+ this_url+"&command=item&exe=body_fontsize&fsize="+(tsize+mvsize)+"&nocachetime="+TnT_time()+"' width=1 height=0>";
}

// 투표실행 버튼 클릭
function vote_poll_check(alert_msg,f_this){
	if(alert_msg=='1'){alert('作成権限がありません。会員ログインしてください。'); return false;}
	if(alert_msg=='2'){alert('投票権限がありません。'); return false;}
	if(alert_msg=='3'){alert('既にこの記事に投稿済みです。'); return false;}
	radio_checked_in=0;
	for(i=0; i<f_this.poll_select.length; ++i){
		if(f_this.poll_select[i].checked==true) radio_checked_in=1;
	} if(radio_checked_in==0){alert('投票する対象を選択してください。'); return false;}
	return true;
}


// 댓글 쓰기 - 회원사진,캐릭터 삽입 여부 지정
function replyMyimghide(formName){
	var reForm=eval(formName);
	var thisbutton=document.getElementById(formName+'_myimg');
	if(!thisbutton) return;
	if(reForm.myimg_hide.value=='1'){//적용->미적용
		reForm.myimg_hide.value='';
		thisbutton.src=thisbutton.src.replace(/\d\.gif$/,'1.gif');
	}
	else{// 미적용->적용
		reForm.myimg_hide.value='1';
		thisbutton.src=thisbutton.src.replace(/\d\.gif$/,'2.gif');
	}
}

