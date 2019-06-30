// shop_default.js
// 쇼핑몰 스킨 적용 기본 자바스크립트

// 이 소스는 가급적 수정하지 마십시오.
// 새로운 function 을 추가하려면 여기에 넣지 말고 같은 경로에 있는 'shop_public.js' 에 넣으십시오.

// 팝업 레이어 시각효과 (슬라이드=slide ,  페이드=fade , 미지정=normal)
	// 설정페이지에서 지정하게 되어 있지만 여기서 직접 지정해 줘도 됨.
	//TnTpopupeffect='slide'; // (slide, fade, normal)


//--------------------------------------------------------


// [iwindow 경로변환] 응용레이어 skin_shop/스킨명/3_plugin_iwindow/*.php
// shop_iwindow_OPEN(실행파일, iwin이름, get쿼리, 'width=,height=,left=,top=,move_left=,move_top=,btn_help=,btn_grow=,btn_close=,autoclose=1,titlebar=,new_iwin=,css_style=' ,'write_form')
function shop_iwindow_OPEN(exe, iwin_name, str_query, option_set, form_name){
	if(!Public_URL(exe)) exe=this_url+"&command=shop&plugin=3_plugin_iwindow&exe="+exe+"&"+str_query+"&clientTime="+TnT_time();
	if(form_name) exe=TnTencodeURICmp(exe)+TnTjoin_form_value(form_name);
	iwindow_OPEN(exe, iwin_name, str_query, option_set);
}


// url encodeURIComponent
function TnTencodeURICmp(url){
	var set_div;
	var q_str='';
	var url_div=url.split('?');
	var que=url.replace(url_div[0]+'?','');
	var que_div=que.split('&');
	for(i=0; i<que_div.length; ++i){
		set_div=que_div[i].split('=');
		q_str+='&'+set_div[0]+'='+encodeURIComponent(set_div[1]);
	}
	return url_div[0]+'?'+q_str+'&is_xmlhttp=1';
}


// form data
function TnTjoin_form_value(form_name){
	var el_type,el_name,el_value;
	var q_str='';
	if(!form_name) return '';
	var send_form=eval('document.'+form_name);
	var len=send_form.elements.length;
	for(i=0; i<len; ++i){
		el_type=send_form.elements[i].type;
		el_name=send_form.elements[i].name;
		el_value=send_form.elements[i].value;
		// if(send_form.elements[i].value=='') continue; // 빈값도 보냄
		if((el_type=='radio' || el_type=='checkbox') && send_form.elements[i].checked==false) continue;
		q_str+='&'+el_name+'='+encodeURIComponent(el_value);
	}
	return q_str;
}


//--------------------------------------------------
// ajax request 응용(매뉴얼->응용,확장 참조) form_name 이 있으면 해당폼값을 전송함
// twindow_OPEN(실행파일, div_id, get쿼리, 'width=,height=,left=,top=,move_left=,move_top=,css_style=',form_name,javascriptsrc,css)
function twindow_OPEN(exe,div_id,str_query,option_set,form_name,js_src,css_href,go_function){
	var layer_type,tm_evt_left,tm_evt_top,xm_obj,div_name,fdata,tmp;
	var Opt_Set=new Array();
	var OPT=TnT_option_set_chk(option_set).toLowerCase().split(',');
	for(i=0; i<OPT.length; ++i){TMP=OPT[i].split('='); Opt_Set[TMP[0]]=TMP[1];}
	if(!div_id) div_id='Twin_'+TnT_time();
	if(typeof(div_id)!='object') div_name=document.getElementById(div_id);
	else{
		div_name=div_id;
		if(div_id.id) div_id=div_id.id;
		else{div_id='Twin_'+TnT_time(); div_name.setAttribute('id',div_id);}
	}
	if(!div_name){
		div_name=document.createElement('div');
		div_name.setAttribute('id',div_id);
		document.body.appendChild(div_name);
		if(!Opt_Set['left'] && !Opt_Set['move_left']) Opt_Set['move_left']=8;// default left
		if(!Opt_Set['top'] && !Opt_Set['move_top']) Opt_Set['move_top']=8;// default top
		layer_type=1;
		back_mem_html='create_new_elem';
	}
	else 	back_mem_html=div_name.innerHTML;
	back_mem_elem=div_name;

	if(js_src) include__javascript(js_src);
	if(css_href) include__stylecss(css_href);

	if(Opt_Set['slide']){div_name.style.display='none'; layer_type=1;}
	else if(div_name.style.display!='inline') div_name.style.display='block';
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

	if(!Public_URL(exe)) exe=TnT_urlEncode(this_url)+"&plugin=3_plugin_twindow&exe="+exe; // 게시판과 다르게 변경한 부분
	else exe=TnT_urlEncode(exe);
	if(!exe.match(/\?/)) exe+='?';
	if(!exe.match(/command=shop/)) exe+='&command=shop';
	exe=exe+'&'+str_query+'&this_div='+div_id+'&is_xmlhttp=1&clientTime='+TnT_time();
	xm_obj = TnT_xmlRequest();
	xm_obj.open("POST",exe,true);
	xm_obj.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
	xm_obj.onreadystatechange = function(){
		if(xm_obj.readyState == 4){
			if(go_function) eval(go_function)(div_name,xm_obj.responseText);
			else div_name.innerHTML=xm_obj.responseText;
			//--------------------------- left,top control
			var sub_div=document.getElementById(div_id+'_sub');
			if(sub_div && div_name.style.position=='absolute' && parseInt(sub_div.style.width)>50){
				if(parseInt(sub_div.style.zoom)>100){
					var zm_w=parseInt(sub_div.style.width)*parseInt(sub_div.style.zoom)/100;
					var zm_h=parseInt(sub_div.style.height)*parseInt(sub_div.style.zoom)/100;
				}
				else{
					var zm_w=parseInt(sub_div.style.width);
					var zm_h=parseInt(sub_div.style.height);
				}
				var W_all=parseInt(div_name.style.left)+zm_w+25;
				var H_all=parseInt(div_name.style.top)+zm_h+50;
				var W_sc=document.body.clientWidth + document.body.scrollLeft;
				var H_sc=document.body.clientHeight + document.body.scrollTop;
				if(W_all>W_sc) div_name.style.left=(W_sc-zm_w-25>1)?(W_sc-zm_w-25):1;
				if(H_all>H_sc) div_name.style.top=(H_sc-zm_h-50>1)?(H_sc-zm_h-50):1;
			} //-------------------------- left,top control
			if(Opt_Set['slide']) TnT_slide(div_name,Opt_Set['slide'],'','',Opt_Set['slide_end_css'],Opt_Set['slide_end_function'],Opt_Set['slide_out']);
		}
	}
	fdata=TnTjoin_form_value(form_name);
	xm_obj.send(fdata);
}

function twindow_CLOSE(div_id){
	if(typeof(div_id)!='object') div_id=document.getElementById(div_id);
	if(div_id){div_id.style.display='none'; div_id.innerHTML='';}
}

function include__javascript(js_src){
	if(typeof(js_rem_src_str)=='undefined') js_rem_src_str='';
	if(!js_rem_src_str.match(js_src)){
		tmp=document.createElement('script');
		tmp.setAttribute('src',js_src);
		document.body.appendChild(tmp);
		js_rem_src_str+=js_src;
	}
}

function include__stylecss(css_href){
	if(typeof(css_rem_href_str)=='undefined') css_rem_href_str='';
	if(!css_rem_href_str.match(css_href)){
		tmp=document.createElement('link');
		tmp.setAttribute('rel','stylesheet');
		tmp.setAttribute('href',css_href);
		tmp.setAttribute('type','text/css');
		document.body.appendChild(tmp);
		css_rem_href_str+=css_href;
	}
}

function twindow_BACK(){
	if(back_mem_html=='create_new_elem') back_mem_elem.style.display='none';
	else back_mem_elem.innerHTML=back_mem_html;
}


// iwindow : Drag & Resize 기본 게시판 것에서 분리했음
function twindow_MOVE(it_Resize,evt,div_id,div_id_top){

	if(typeof(div_id)!='object') mv_act_objt=document.getElementById(div_id);
	else{
		mv_act_objt=div_id;
		if(!mv_act_objt.id) mv_act_objt.setAttribute('id','calendarTmpbox');
		div_id=mv_act_objt.id;
	}

	if(mv_act_objt.style.position!='absolute'){
		mv_act_objt.style.left=TnT_get_objLeft(mv_act_objt);
		mv_act_objt.style.top=TnT_get_objTop(mv_act_objt);
		if(it_Resize<1) mv_act_objt.style.position='absolute';
	}

	mv_act_objt.style.zIndex = ++iwinzidx;

	DragResize_start=1;
	Drg_x=(this_browser=='n')? evt.pageX : event.clientX;
	Drg_y=(this_browser=='n')? evt.pageY : event.clientY;

	temp1=parseInt(mv_act_objt.style.left);
	temp2=parseInt(mv_act_objt.style.top);

	iwindoWidth=parseInt(mv_act_objt.style.width);
	iwindoHeight=parseInt(mv_act_objt.style.height);

	if(!iwindoHeight){
		iwindoHeight=Drg_y-temp2+10;
	}

	// Drag
	if(it_Resize<1)	document.onmousemove=(this_browser=='n') ? Twin_TnTmoveAct_n : Twin_TnTmoveAct;
	// resize
	else{
		tw_frm=0;
		if(div_id_top){ // 좌 , 좌하
			tw_divTop=document.getElementById(div_id_top);
			if(tw_divTop) tw_frm=parseInt(tw_divTop.style.left);
		}

		if(it_Resize==1 || it_Resize==5){tw_crs=1;tw_row=0;} // 좌,우
		else if(it_Resize==2 || it_Resize==4){tw_crs=1;tw_row=1;} // 좌하,우하
		else{tw_crs=0;tw_row=1;} // 하

		if(!tw_frm){
			var zm_tmp=parseInt(mv_act_objt.style.zoom); // zoom
			if(zm_tmp>100){
				iwindoWidth=iwindoWidth*zm_tmp/100;
				iwindoHeight=iwindoHeight*zm_tmp/100;
				tw_crs=tw_crs/(zm_tmp/100);
				tw_row=tw_row/(zm_tmp/100);
			}
		}
		document.onmousemove=(this_browser=='n')? Twin_TnTresizeAct_n : Twin_TnTresizeAct ; // Resize
	}
	TnTL_clickTime=1;
}

//------------------------------------------IE
function Twin_TnTmoveAct(){ // drag
	if(DragResize_start==1){
		mv_act_objt.style.left=temp1+event.clientX-Drg_x;
		mv_act_objt.style.top=temp2+event.clientY-Drg_y;
		return false;
	}
}
function Twin_TnTresizeAct(){// resize move
	if(DragResize_start==1){
		var re_x=(iwindoWidth+event.clientX-Drg_x)*tw_crs;
		var re_y=(iwindoHeight+event.clientY-Drg_y)*tw_row;
		if(tw_frm){
			tw_divTop.style.left=tw_frm-(iwindoWidth-re_x);
			re_x=re_x-((re_x-iwindoWidth)*2);
		}
		twindow_RESIZE(re_x,re_y,mv_act_objt);
		return false;
	}
}

//----------------------------------------------ECT
function Twin_TnTmoveAct_n(evt){ // drag
	if (DragResize_start==1){
		mv_act_objt.style.left=temp1+evt.pageX-Drg_x;
		mv_act_objt.style.top=temp2+evt.pageY-Drg_y;
		return false;
	}
}
function Twin_TnTresizeAct_n(evt){// resize move
	if (DragResize_start==1){
		var re_x=(iwindoWidth+evt.pageX-Drg_x)*tw_crs;
		var re_y=(iwindoHeight+evt.pageY-Drg_y)*tw_row;
		if(tw_frm){
			tw_divTop.style.left=tw_frm-(iwindoWidth-re_x);
			re_x=re_x-((re_x-iwindoWidth)*2);
		}
		twindow_RESIZE(re_x,re_y,mv_act_objt);
		return false;
	}
}
//------------------------------------

// end
function twindow_STOP(){
	document.onmousemove='';
	DragResize_start=0;
}


// 레이어 크기변경
function twindow_RESIZE(x,y,mv_act_objt){
	if(x>0) mv_act_objt.style.width=x;
	if(y>0) mv_act_objt.style.height=y;
}

// 전면으로
function twindow_UPSET(div_id){
	if(typeof(div_id)!='object'){
		document.getElementById(div_id).style.zIndex = ++iwinzidx;
		tnSlideoutMode[div_id]='stop';
	}
	else{
		div_id.style.zIndex = ++iwinzidx;
		tnSlideoutMode[div_id.id]='stop';
	}
}


//------------------------------------

// fade_in
function TnT_fadein(obj,course,slide_end_css,slide_end_function,slide_out){
	var start_opt=0;
	if(typeof(obj)!='object') obj=document.getElementById(obj);
	if(obj.style.display!='inline') obj.style.display='block';
	obj.style.filter="Alpha(opacity=0)";
	obj.style.MozOpacity=0;
	tnt_padein_act=function(){
		start_opt+=20; // 속도
		obj.style.filter='Alpha(opacity='+start_opt+')';
		obj.style.MozOpacity=start_opt/100;
		if(start_opt>99){
			clearInterval(TnT_pade_start);
			obj.style.filter='';
			obj.style.MozOpacity='';
			if(slide_end_css) obj.style.cssText+= '; '+slide_end_css;
			if(slide_end_function) eval(slide_end_function)(obj);
			if(slide_out>0) twindow_slide_out(obj,course,slide_out);
		}
	}
	TnT_pade_start=setInterval("tnt_padein_act()",1);
}

// fade_out
function TnT_fadeout(obj){
	var out_opt=100;
	if(typeof(obj)!='object') obj=document.getElementById(obj);
	twindow_CLOSE(obj); return; // fade out 없이 바로 종료시켜버릴때 이 줄을 적용
	obj.style.filter="Alpha(opacity=100)";
	obj.style.MozOpacity=1;
	tnt_padeout_act=function(){
		out_opt-=25; // 속도
		obj.style.filter='Alpha(opacity='+out_opt+')';
		obj.style.MozOpacity=out_opt/100;
		if(out_opt<1){
			clearInterval(TnT_pade_end);
			obj.style.filter='';
			obj.style.MozOpacity='';
			twindow_CLOSE(obj);
		}
	}
	TnT_pade_end=setInterval("tnt_padeout_act()",1);
}


//----------------------------------------------slide

// slide (twindow & 일반 공용)
function TnT_slide(obj,course,def_left,def_top,slide_end_css,slide_end_function,slide_out){

	// Effect:fade
	if(TnTpopupeffect=='fade'){TnT_fadein(obj,course,slide_end_css,slide_end_function,slide_out); return;}
	// Effect:normal
	if(TnTpopupeffect=='normal') course='normal';

	if(typeof(obj)!='object') obj=document.getElementById(obj);
	if(!obj) return;

	if(!course) course='left';
	if(!def_left) def_left=parseInt(obj.style.left); else obj.style.left=def_left;
	if(!def_top) def_top=parseInt(obj.style.top); else obj.style.top=def_top;
	if(!def_left && !def_top){
		if(obj.style.display!='inline') obj.style.display='block';
		def_left=TnT_get_objLeft(obj);
		def_top=TnT_get_objTop(obj);
		if(obj.style.display!='inline') obj.style.display='none';
	}
	if(course=='left')				{slide_start=document.body.scrollLeft-200; slide_end=def_left;}
	else if(course=='top')		{slide_start=document.body.scrollTop-300; slide_end=def_top;}
	else if(course=='right')		{slide_start=document.body.clientWidth + document.body.scrollLeft; slide_end=def_left;}
	else if(course=='bottom'){
		slide_start=document.body.clientHeight + document.body.scrollTop; slide_end=def_top;
		if(slide_end<document.body.scrollTop+15) slide_end=document.body.scrollTop+15;
	}
	else{
		if(obj.style.display!='inline') obj.style.display='block';
		if(slide_end_css) obj.style.cssText+= '; '+slide_end_css;
		if(slide_end_function) eval(slide_end_function)(obj);
		return;
	}
	tnt_slide_while=function(){
		if(Math.abs(slide_end-slide_start)<44) slide_start=slide_end; // 속도조절 44
		else if(slide_start<slide_end) slide_start+=43; // 속도조절 43
		else if(slide_start>slide_end) slide_start-=43; // 속도조절 43
		else {
			if(slide_end_css) obj.style.cssText+= '; '+slide_end_css;
			if(slide_end_function) eval(slide_end_function)(obj);
			clearInterval(twindow_sliding);
			if(slide_out>0) twindow_slide_out(obj,course,slide_out);
			return;
		}
		if(course=='left' || course=='right') obj.style.left=slide_start;
		else obj.style.top=slide_start;
		if(slide_start==slide_end){
			if(slide_end_css) obj.style.cssText+= '; '+slide_end_css;
			if(slide_end_function) eval(slide_end_function)(obj);
			clearInterval(twindow_sliding);
			if(slide_out>0) twindow_slide_out(obj,course,slide_out);
		}
	}
	tnt_slide_start=function(){
		if(obj.style.display!='inline') obj.style.display='block';
		obj.style.position='absolute';
		obj.style.visibility='visible';
	}
	setTimeout("tnt_slide_start()",1);
	twindow_sliding=setInterval("tnt_slide_while()",1);
}



function twindow_OUT(div_id,course){

	if(typeof(div_id)=='object'){
		var rem_div=div_id.id;
	}
	else{
		var rem_div=div_id;
		div_id=document.getElementById(div_id);
	}

	if(tnSlideoutMode[rem_div]=='stop') return;
	div_id.style.display='block';
	div_id.style.visibility='visible';

	// Effect:fade
	 if(TnTpopupeffect=='fade'){TnT_fadeout(div_id); return;}
	// Effect:normal
	if(TnTpopupeffect=='normal'){twindow_CLOSE(rem_div); return;}


	this_left=parseInt(div_id.style.left);
	this_top=parseInt(div_id.style.top);

	if(
		this_left < -200 ||
		this_top < -300 ||
		this_left > (document.body.clientWidth + document.body.scrollLeft) ||
		this_top > (document.body.clientHeight + document.body.scrollTop)
	){
		twindow_CLOSE(rem_div);
		return;
	}

	if(course=='left') div_id.style.left=this_left-45;
	else if(course=='right') div_id.style.left=this_left+45;
	else if(course=='bottom') div_id.style.top=this_top+45;
	else if(course=='top') div_id.style.top=this_top-45;
	else div_id.style.left=this_left+45; // right

	setTimeout("twindow_OUT('"+rem_div+"','"+course+"')",1);
}



tnSlideoutMode=[];
function twindow_slide_out(div_id,course,sec){
	if(typeof(div_id)=='object') div_id=div_id.id;
	tnSlideoutMode[div_id]='';
	if(!sec) twindow_OUT(div_id,course);
	else setTimeout("twindow_OUT('"+div_id+"','"+course+"')",sec*1000);
}

//----------------------------------------------slide



// enlargement
TnTlayerResize=0;
function twindow_ENLARGE(owner_div,sub_div){
	body_W=document.body.clientWidth;
	body_H=document.body.clientHeight;
	owner_div=document.getElementById(owner_div);
	sub_div=document.getElementById(sub_div);
	if(TnTlayerResize==0){
		it_tn_st_w=parseInt(sub_div.style.width);
		it_tn_st_h=parseInt(sub_div.style.height);
		add_W=(body_W - it_tn_st_w-40)/3; // 전체창크기를 3 분할로 단계별 확대
		add_H=(body_H - it_tn_st_h-60)/3;
	}
	newSize_w=parseInt(sub_div.style.width)+add_W;
	newSize_h=parseInt(sub_div.style.height)+add_H;
	if(body_W-30<newSize_w || body_H-50<newSize_h){
		newSize_w=it_tn_st_w;
		newSize_h=it_tn_st_h;
	}
	if(!newSize_h) newSize_h=newSize_w/4*3;
	var mv_left=(body_W-newSize_w)/2+document.body.scrollLeft;
	var mv_top=(body_H-newSize_h)/2+document.body.scrollTop;
	owner_div.style.left=mv_left>0?mv_left:1;
	owner_div.style.top=mv_top>0?mv_top:1;
	 twindow_RESIZE(newSize_w,newSize_h,sub_div);
	TnTlayerResize++;
	TnTL_clickTime=1;
}


// zoom
function twindow_ZOOM(zm,sub_div){
	var sub_div_ob=document.getElementById(sub_div);
	if(!sub_div_ob) return;
	sub_div_ob.style.zoom=zm;
	set_SESSION(sub_div+'_zoom',zm);
}

// number_format
function number_format_js(str){
	return (str+'').replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,');
}


// display : on/off
function display_toggle(divname,value){
	var d=(typeof(divname)!='object')? document.getElementById(divname) : divname;
	if(!d) return;
	if(value) d.style.display=value;
	else d.style.display=(d.style.display=='none')?'':'none';
}



// 달력
// onclick="TnT_open_calendar(this,0,0,'document.formname.y_name','document.formname.m_name','document.formname.d_name')"
// (this,년,월,년name,월name,일name)
// this 는 필수이다.
// 년,월은 직접 지정할수 있다. 0 일때는 현재 날짜 적용된다.
// 월필드명,일필드명 을 생략하면 년 필드에 20070314 형식으로 insert 한다.
function TnT_open_calendar(thisclick,y,m,yfld,mfld,dfld){
		if(!y){thisD=new Date(); y=thisD.getYear(); if(y<1000) y+=1900; if(!m)m=thisD.getMonth()+1;}
		tod_y=thisD.getFullYear(); tod_m=thisD.getMonth()+1; tod_d=thisD.getDate();
		var tmpHTML;
		var weekarr=new Array('<font color=#ff2222>S</font>','M','T','W','T','F','S');
		var chk_d=(y+(y-y%4)/4-(y-y%100)/100+(y-y%400)/400+m*2+(m*5-m*5%9)/9-(m<3?y%4||y%100==0&&y%400?2:3:4))%7;
		tmpHTML='<table width=170 height=140 bgcolor=#dddddd cellpadding=0 cellspacing=1 style="font-size:8pt; font-family:Tahoma;"><tbody style="background-color:#ffffff; padding:1 4 1 4"><tr><td align=right bgcolor=#dddddd colspan="7" style="font-size:10pt; font-family:Tahoma;"><nobr>';
		tmpHTML+='<img style="cursor:pointer;" title="year" src="'+TnTimgurl+'/board/arrow_left2.gif" align=absmiddle onclick="TnT_open_calendar(0,'+(y-1)+','+m+',\''+yfld+'\',\''+mfld+'\',\''+dfld+'\')">&nbsp; ';
		tmpHTML+='<img style="cursor:pointer;" title="month" src="'+TnTimgurl+'/board/arrow_left.gif" align=absmiddle onclick="TnT_open_calendar(0,'+(m==1?(y-1)+','+12:y+','+(m-1))+',\''+yfld+'\',\''+mfld+'\',\''+dfld+'\')"> ';
		tmpHTML+='&nbsp; <span title="close" style="font-weight:bold; font-size:8pt;">'+y+' . '+((m < 10) ? ('0' + m) : m)+'</span> &nbsp; ';
		tmpHTML+='<img style="cursor:pointer;" title="month" src="'+TnTimgurl+'/board/arrow_right.gif" align=absmiddle onclick="TnT_open_calendar(0,'+(m==12?(y+1)+','+1:y+','+(m+1))+',\''+yfld+'\',\''+mfld+'\',\''+dfld+'\')">&nbsp; ';
		tmpHTML+='<img style="cursor:pointer;" title="year" src="'+TnTimgurl+'/board/arrow_right2.gif" align=absmiddle onclick="TnT_open_calendar(0,'+(y+1)+','+m+',\''+yfld+'\',\''+mfld+'\',\''+dfld+'\')"> ';
		tmpHTML+=' &nbsp; &nbsp; <img style="cursor:pointer;" title="close" src="'+TnTimgurl+'/editor/bt_close.gif" align=absmiddle onclick="join_YMD_str()"> ';
		tmpHTML+='</nobr></td></tr><tr>';
		for (i=0; i < 7; i++) tmpHTML+='<td align=center style="font-weight:bold; font-size:7pt;">' + weekarr[i] + '</td>';
		for (i=0; i < 42; i++) {
			if (i%7==0) tmpHTML+='</tr><tr>';
			if (i < chk_d || i >= chk_d+(m*9-m*9%8)/8%2+(m==2?y%4 || y%100==0 && y%400 ? 28:29:30)) tmpHTML+='<td></td>';
			else{
				tmpHTML+='<td ';
				if((i+1-chk_d==tod_d) && m==tod_m && y==tod_y) tmpHTML+=' bgcolor=#ffddaa ';
				tmpHTML+=' onclick="join_YMD_str('+y+','+m+','+(i+1-chk_d)+','+yfld+','+mfld+','+dfld+')" onmouseover=this.style.backgroundColor="#dddddd" onmouseout=this.style.backgroundColor="" align=center style="cursor:pointer; color:' + (i%7?'#000000':'#ff2222') + '; font-size:8pt; font-family:Tahoma;">' + (i+1-chk_d) + '</td>';
			}
		}
		tmpHTML+='</tr></table>';
		calendarTmpLayer=document.getElementById('calendarTmpbox');
		if(!calendarTmpLayer){
			var tmpdiv=document.createElement('div');
			tmpdiv.setAttribute('id','calendarTmpbox');
			document.body.appendChild(tmpdiv);
			calendarTmpLayer=document.getElementById('calendarTmpbox');
			calendarTmpLayer.style.cssText='position:absolute; visibility:visible;';
		}
		calendarTmpLayer.innerHTML=tmpHTML;
		if(thisclick){
			calendarTmpLayer.style.visibility='visible';
			calendarTmpLayer.style.left=TnT_get_objLeft(thisclick)+20;
			calendarTmpLayer.style.top=TnT_get_objTop(thisclick)+20;
		}
}function join_YMD_str(y,m,d,yfld,mfld,dfld){
	calendarTmpLayer.style.visibility = 'hidden'; if(!yfld) return;
	if(m<10) m='0'+m; if(d<10) d='0'+d;
	if(!mfld || !dfld){yfld.value=y+''+m+''+d; return;}
	yfld.value=y; mfld.value=m; dfld.value=d;
}



//-----------------------------------------------------------


//ajax UBOARD location
uboard_focus_rem=''; // stack
function UBOARD_CONNECT_ACTION(Config,pam,f_name,newdiv_id,new_option){

	// focus
	if(!newdiv_id && uboard_focus_rem.match(' '+Config['bb_focus_id']+' ')){// 두번째 연결부터 적용되게 함
		if(this_browser=='n' || Config['bb_focus_id'].match('#')){// IE 가 아니거나 포커스 id에 # 이 붙어 있으면
			location.href='#'+Config['bb_focus_id'].replace(/#/g,''); // 페이지 이동때마다 포커싱 됨
		}
		else{
			var bb_focus=document.getElementById(Config['bb_focus_id']);
			if(bb_focus) bb_focus.focus(); // 포커스 위치가 화면을 벗어난 경우에만 포커싱됨
		}
	}
	else if(!newdiv_id){
		uboard_focus_rem+=(' '+Config['bb_focus_id']+' '); // 첫번째 연결시 저장만 함
	}

	// 연결
	if(newdiv_id) Config['insert_div_id']=newdiv_id;
	if(new_option) Config['bb_option']+=new_option;
	twindow_OPEN(Config['bb_php_src'],Config['insert_div_id'],'bb_key1='+Config['bb_key1']+'&bb_key2='+Config['bb_key2']+'&no=&'+pam,Config['bb_option'],f_name,Config['js_src'],Config['css_href']);
}


// ajax UBOARD 기본 링크(이 함수로 직접 링크해도 된다.)
function ajax_UBOARD_link(set_func,param,f_name,newdiv_id,new_option){
	eval(set_func)(param+'&this_ub_set='+set_func,f_name,newdiv_id,new_option);
}


//-----------------------------------------------------------


// outerHTML
function get_div_outerhtml(div_obj){
	if(typeof(div_obj)!='object') div_obj=document.getElementById(div_obj);
	if(!div_obj) return '';
	if(this_browser!='n') return div_obj.outerHTML;
	tmp_div=document.getElementById('tmp_div_id');
	if(!tmp_div){
		tmp_div = document.createElement('div');
		tmp_div.setAttribute('id','tmp_div_id');
		document.body.appendChild(tmp_div);
	}
	tmp_div.appendChild(div_obj);
	var str=tmp_div.innerHTML;
	tmp_div.innerHTML='';
	return str;
}


// goods viewer menu
// "TnT_gs_view_menu(this,'상품글번호','is_eye=n,is_cart=n,is_wish=n,menu_left=50,menu_top=50','move_left=50,move_top=50',this_div)">
TSloadtime=new Date().getTime();
function TnT_gs_view_menu(this_ob,gs_no,set_Act,set_Opt,twin_div_id){
	// return;   // 미리보기 생략하려면 여기서 return 시키면 됨
	if(new Date().getTime()-TSloadtime<1500) return;
	var tmp_div=document.getElementById('viewtmp_div');
	if(this_ob=='this_close'){tmp_div.style.display='none'; return;}
	if(typeof(this_ob)!='object') this_ob=document.getElementById(this_ob);
	if(!this_ob) return;

	var Activ_set=[];
	var OPT=TnT_option_set_chk(set_Act).toLowerCase().split(',');
	for(i=0; i<OPT.length; ++i){TMP=OPT[i].split('='); Activ_set[TMP[0]]=TMP[1];}

	var set_Opt_arr=TnT_option_set_chk(set_Opt).toLowerCase().split('|');

	if(!tmp_div){
		tmp_div = document.createElement('div');
		tmp_div.setAttribute('id','viewtmp_div');
		document.body.appendChild(tmp_div);
		tmp_div.style.position='absolute';
		tmp_div.style.visibility='visible';
	}
	tmp_div.style.zIndex=++iwinzidx;
	tmp_div.style.left=TnT_get_objLeft(this_ob)+parseInt(Activ_set['menu_left']?Activ_set['menu_left']:2);
	tmp_div.style.top=TnT_get_objTop(this_ob)+parseInt(Activ_set['menu_top']?Activ_set['menu_top']:2);
	tmp_div.style.display='block';

	var tmp_html="<div ";
			if(twin_div_id) tmp_html+=" onclick=\"tnSlideoutMode['"+twin_div_id+"']='stop';\" "; // 슬라이드 중단
			tmp_html+=" style='border:1px solid #bbbbbb; border-color:#0080FF #C9C9C9 #C9C9C9 #F1F1F1; background-color:#e5e5e5; padding:1px 0 1px 0;margin:0 0 0 6px; cursor:pointer;'>";

		// [미리보기]
			var view_target=(TnT_getcookie('TnTshop_multview') || Activ_set['each_body'])? 'mult_iview'+gs_no :  'be_public_iview' ;// 공유창/멀티창 구분
			tmp_html+="<img ";
			if(Activ_set['is_eye']=='n') tmp_html+=" style='filter:alpha(opacity=20); opacity:0.20; cursor:default;' ";
			else if(Activ_set['body_link']=='y') tmp_html+=" onclick=\"location.href='"+this_url+"&subact=&plugin=&exe=&view=2_view_body&no="+gs_no+"'\" ";
			else tmp_html+=" onclick=\"twindow_OPEN('twindow_popupgoods','"+view_target+"','no="+gs_no+"','move_left=-380,move_top=-250,slide=bottom,"+set_Opt_arr[0]+"')\" ";
			tmp_html+=" src='"+shop_this_skin+"/s_img/icon/sml_eye.gif' border=0 align=absmiddle hspace=3 onmouseover=\"balloon_on('プレビュー',this,-23,7)\" onmouseout=\"balloon_off()\">";

		// [바구니]
			tmp_html+="<img ";
			if(Activ_set['is_cart']=='n') tmp_html+=" style='filter:alpha(opacity=20); opacity:0.20; cursor:default;' ";
			else tmp_html+=" onclick=\"twindow_OPEN('"+this_url+"&no="+gs_no+"&subact=cart&exe=save_cart&act_type=twindow_cart&save_after_url=','keukeu','','move_left=30,move_top=-100,slide=right,slide_out=2,"+set_Opt_arr[1]+"')\" ";
			tmp_html+=" src='"+shop_this_skin+"/s_img/icon/sml_basket.gif' border=0 align=absmiddle hspace=3 onmouseover=\"balloon_on('カート入り',this,-23,7)\" onmouseout=\"balloon_off()\">";

		// [보관]
			tmp_html+="<img ";
			if(Activ_set['is_wish']=='n') tmp_html+=" style='filter:alpha(opacity=20); opacity:0.20; cursor:default;' ";
			else tmp_html+=" onclick=\"twindow_OPEN('twindow_wish','thisid_wish','act=save&no="+gs_no+"','move_left=30,move_top=-100,slide=right,slide_out=2,"+set_Opt_arr[2]+"')\" ";
			tmp_html+=" src='"+shop_this_skin+"/s_img/icon/sml_wish.gif' border=0 align=absmiddle hspace=3 onmouseover=\"balloon_on('1日保管',this,-23,7)\" onmouseout=\"balloon_off()\">";

		// [바로구매]
			tmp_html+="<img ";
			if(Activ_set['is_cart']=='n') tmp_html+=" style='filter:alpha(opacity=20); opacity:0.20; cursor:default;' ";
			else tmp_html+=" onclick=location.href='/board.php?board=order&command=shop&subact=cart&no="+gs_no+"&exe=save_cart&act_type=buy&command=shop' ";
//			else tmp_html+=" onclick=location.href='"+this_url+"&subact=cart&no="+gs_no+"&exe=save_cart&act_type=buy&command=shop' "; jky
			tmp_html+=" src='"+shop_this_skin+"/s_img/icon/sml_buy.gif' border=0 align=absmiddle hspace=3 onmouseover=\"balloon_on('買う/予約',this,-20,7)\" onmouseout=\"balloon_off()\">";

	tmp_html+="</div>";
	tmp_div.innerHTML=tmp_html;
	if(typeof(n_gsview_sleep)!='undefined') clearTimeout(n_gsview_sleep);
	n_gsview_sleep=setTimeout("TnT_gs_view_menu('this_close')",3000); // 3초간 유지
}

// 미리보기 다중창 적용 체크
function multiview_check_chng(check_this){
	if(check_this.checked==true) TnT_setcookie('TnTshop_multview',1);
	else  TnT_setcookie('TnTshop_multview',''); 
}


// 이미지 width 조절
function tnt_imgwidth_reset(img_id,limit_width){
	if(typeof(img_id)!='object') img_id=document.getElementById(img_id);
	tnt_img_reset_while=function(){
		if(img_id.width>10){
			clearInterval(gsimg_set);
			if(img_id.width>limit_width) img_id.width=limit_width;
		}
	}
	if(img_id.width>10){if(img_id.width>limit_width) img_id.width=limit_width;}
	else{var gsimg_set=setInterval("tnt_img_reset_while()",100);}
}



// 본문에서 twindow 에 장바구니 담시
function cart_save_for_twindow(a_this,this_form,twindow_option){
	var tempobj=document.createElement('div');
	tempobj.setAttribute('id','TnTiCartDiv');
	tempobj.style.display='none';
	tempobj.innerHTML="<iframe name='TnTiCartDivName'></iframe>";
	document.body.appendChild(tempobj);
	after_twindow_option=twindow_option;
	sub_cart_left=TnT_get_objLeft(a_this)+30;
	sub_cart_top=TnT_get_objTop(a_this)-80;
	this_form.target='TnTiCartDivName';
	this_form.submit();
}function sub_cart_save_after(new_insert_num){twindow_OPEN('twindow_cart','is_target_cart','new_insert_num='+new_insert_num,'left='+sub_cart_left+',top='+sub_cart_top+','+after_twindow_option);}


// 화면상 장바구니 상품수 증가
function count_chng_cart(num){
	var cnt_span=document.getElementById('cnt_rem_cart');
	if(cnt_span && num) cnt_span.innerHTML=num;
}

// 화면상 보관함 상품수 증가
function count_chng_wish(num){
	var cnt_span=document.getElementById('cnt_rem_wish');
	if(cnt_span && num) cnt_span.innerHTML=num;
}


// 추가이미지 클릭시 상위 이미지 교체
function gd_img_src_replace(from_id,to_id,from_src){
	if(from_id && typeof(from_id)!='object') from_id=document.getElementById(from_id);
	if(to_id && typeof(to_id)!='object') to_id=document.getElementById(to_id);
	if(!to_id) return;
	if(!from_id && from_src) to_id.src=from_src;
	else if(from_id && to_id) to_id.src=from_id.src;
}



// ROLLING:  TnT_rolling_start("div_id=testdiv,roll_point=<!--#roll_point#-->,move_space=112,course=right,speed=1,delay=1");
function TnT_rolling_start(option_set){
		var Opt_Set=[];
		var OPT=TnT_option_set_chk(option_set).toLowerCase().split(',');
		for(i=0; i<OPT.length; ++i){TMP=OPT[i].split('='); Opt_Set[TMP[0]]=TMP[1];}
		var div_id=Opt_Set['div_id'];
		var div_ob = document.getElementById(div_id);
		if(typeof(RollStrsArray)=='undefined') RollStrsArray=[];
		RollStrsArray[div_id]=div_ob.innerHTML.split(Opt_Set['roll_point']);
		var size=RollStrsArray[div_id].length;
		if(size<1) return;
		size2=RollStrsArray[div_id][size-1].length;
		if(size2<40) RollStrsArray[div_id].pop();
		TnT_rolling_act(div_id,Opt_Set['move_space'],Opt_Set['course'],Opt_Set['speed']*10,Opt_Set['delay']*1000,0,0);
}function TnT_rolling_act(div_id,move_space,course,speed,delay,roll_count,restart){
		var div_ob = document.getElementById(div_id);
		roll_count+=2;
		if(course=='left') div_ob.style.left = -roll_count;
		else if(course=='top') div_ob.style.top = -roll_count;
		else if(course=='right') div_ob.style.left = roll_count-move_space;
		else if(course=='bottom') div_ob.style.top = roll_count-move_space;
		else div_ob.style.left = -roll_count;
		if(roll_count<move_space){
			setTimeout("TnT_rolling_act('"+div_id+"',"+move_space+",'"+course+"',"+speed+","+delay+","+roll_count+",0)",speed);
		}
		else{
			if(course=='right' || course=='bottom'){
				var size=RollStrsArray[div_id].length-1;
				RollStrsArray[div_id].unshift(RollStrsArray[div_id][size]);
				RollStrsArray[div_id].pop();
			}
			else{
				RollStrsArray[div_id].push(RollStrsArray[div_id][0]);
				RollStrsArray[div_id].shift();
			}
			if(course=='left') div_ob.style.left=0;
			else if(course=='top') div_ob.style.top=0;
			else if(course=='bottom') div_ob.style.top=-move_space;
			else if(course=='right') div_ob.style.left=-move_space;
			else div_ob.style.left=0;
			div_ob.innerHTML=RollStrsArray[div_id].join('');
			setTimeout("TnT_rolling_act('"+div_id+"',"+move_space+",'"+course+"',"+speed+","+delay+",0,1)",delay);
		}
}







// 좌측 하위메뉴 레이어 div 생성
document.write("<div id='shop_left_sub_layer' style='position:absolute; display:none;'></div>");

// 팝업레이어 effect
if(typeof(TnTpopupeffect)=='undefined') TnTpopupeffect='slide';

