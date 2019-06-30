/*
IWINDOW(아이템 창) 레이어 생성 스크립트

	활용 가능한 변수
		* this_skin  :  본 스킨 디렉토리에 대한 경로( ....technote/skin_board/스킨명/ )
		* this_url  :  현재 출력된 보드의 주소( ....technote/board.php?board=보드명&page=3&....  )
		* TnTimgurl  : 공용 img 디렉토리 주소(....technote/img/)
		* is_Admin  :  관리자 로그인 상태이면 == 1
		* is_Member  :  회원 로그인 상태이면 == 1

	주의 및 참고
		* 태그내의 name=' '   혹은   id=' '   는 임의 삭제,수정 하면 안됨.
		* 쌍따옴표는 삽입하지 말것.
		* 소스 수정후 출력 확인시에는 부라우저에서 '새로고침'을 할것.
		* 단지 이미지 변경이 목적이라면 본 소스는 수정하지 말고,
			....technote/skin_board/스킨명/iwindow/immg/  내의 이미지 파일을 교체할것.
		* 기타 자세한 설명 : 사용자매뉴얼→[12,응용,확장]→[iwindow 아이템 창]
*/


document.write("<style type=text/css> ");
document.write(" .trsp_frame{filter:alpha(opacity=85); opacity:0.85;} "); // 테두리 투명도
document.write(" .trsp_body{filter:alpha(opacity=100); opacity:1.0;} "); // 본문 투명도
document.write(" </style>");


// iwindow 생성
function create_iwindow(no,css){

	var tempobj=document.createElement('div');
	tempobj.setAttribute('id','TnTeIwin'+no);
	if(css) tempobj.style.cssText=css;
	tempobj.style.position='absolute';
	tempobj.style.padding='0px 0px 0px 0px';
	tempobj.style.visibility='visible';

	tempobj.innerHTML=""+
	"<table border=0 cellpadding=0 cellspacing=0 style='filter:progid:DXImageTransform.Microsoft.Shadow(color=#cccccc,direction=135,strength=3);'><tr><td>"+
	"  <table border=0 cellpadding=0 cellspacing=0 onmouseover=set_iwindow_focus_change('"+no+"')>"+

	"    <tr id='TnTeiwinTopTr"+no+"'>"+
	"        <td class=trsp_frame width=10 height=27><img src="+this_skin+"/iwindow/immg/box1.gif></td>"+
	"        <td class=trsp_frame id='TnTeiwinToptd"+no+"' valign=top height=27 style='padding-top:4;' background="+this_skin+"/iwindow/immg/box2.gif>"+

	"           <table width=100% border=0 cellpadding=0 cellspacing=0><tr>"+
	"                <td onmousedown='DragResize_DN(0,event)' onmouseup='DragResize_UP()' width='99%' class='TnT_Layer_dragin'><"+it_img_tag+" src="+this_skin+"/iwindow/immg/title_default.gif border=0 id='TnTeiwintitle"+no+"' class='TnT_Layer_dragin' align=absmiddle></td>"+
	"                <td style='cursor:pointer; display:none;' onClick='TnT_layer_help()' id='TnTeiwinhelp"+no+"'><img src="+this_skin+"/iwindow/immg/btn_quest.gif class='TnT_Top_button' onmouseover=top_btn_act(this) onmouseout=top_btn_act(this)></td>"+
	"                <td style='cursor:pointer; display:none;' onClick='iwindow_ENLARGE()' id='TnTeiwinlarge"+no+"'><img src="+this_skin+"/iwindow/immg/btn_enlarg.gif class='TnT_Top_button' onmouseover=top_btn_act(this) onmouseout=top_btn_act(this)></td>"+
	"                <td style='cursor:pointer' onClick='iwindow_CLOSE()'  id='TnTeiwinclose"+no+"'><img src="+this_skin+"/iwindow/immg/btn_close.gif onmouseover=top_btn_act(this) onmouseout=top_btn_act(this)></td>"+
	"            </tr></table>"+

	"        </td>"+
	"        <td class=trsp_frame width=10 height=27><img src="+this_skin+"/iwindow/immg/box3.gif></td>"+
	"    </tr>"+

	"    <tr id='TnTeiwin2stTr"+no+"' style='display:none'>"+
	"        <td class=trsp_frame width=10 height=10><img src="+this_skin+"/iwindow/immg/box1_1.gif></td>"+
	"        <td class=trsp_frame height=10 background="+this_skin+"/iwindow/immg/box2_1.gif></td>"+
	"        <td class=trsp_frame width=10 height=10><img src="+this_skin+"/iwindow/immg/box3_1.gif></td>"+
	"    </tr>"+

	"    <tr>"+
	"        <td class=trsp_frame width=10 background="+this_skin+"/iwindow/immg/box4.gif></td>"+
	"        <td class=trsp_body bgcolor=#ffffff id='TnTeiwinCenter"+no+"' width=50 height=50>"+
	"                <iframe id='TnTeIwinframeid"+no+"' name='TnTeIwinframename"+no+"' frameBorder='0' scrolling='auto' width='100%' height='100%' onmouseover=drag_time_true()></iframe>"+
	"        </td>"+
	"        <td class=trsp_frame width=10 background="+this_skin+"/iwindow/immg/box5.gif></td>"+
	"      </tr>"+

	"    <tr>"+
	"        <td class=trsp_frame width=10 height=10><img src="+this_skin+"/iwindow/immg/box6.gif></td>"+
	"        <td class=trsp_frame height=10 background="+this_skin+"/iwindow/immg/box7.gif></td>"+
	"        <td class=trsp_frame width=10 height=10><"+it_img_tag+" src="+this_skin+"/iwindow/immg/box8.gif border=0 style='cursor:se-resize;' class=TnT_Layer_dragin onmousedown='DragResize_DN(1,event)' onmouseup='DragResize_UP()'></td>"+
	"    </tr>"+


	"</table>"+
	"</td></tr></table>";



	document.body.appendChild(tempobj);
	set_iwindow_focus_change(no);
}


iwinzidx=10;
tntactiwin='';
function set_iwindow_focus_change(no){
	if(tntactiwin=='TnTeIwin'+no) return;
	iwindowLAYER=document.getElementById('TnTeIwin'+no);
	iwindowTopTr=document.getElementById('TnTeiwinTopTr'+no);
	iwindowToptd=document.getElementById('TnTeiwinToptd'+no);
	HideBox_title=document.getElementById('TnTeiwintitle'+no);
	layer_help_btn=document.getElementById('TnTeiwinhelp'+no);
	layer_large_btn=document.getElementById('TnTeiwinlarge'+no);
	layer_close_btn=document.getElementById('TnTeiwinclose'+no);
	iwindowTopTr2=document.getElementById('TnTeiwin2stTr'+no);
	TntiwindowTable=document.getElementById('TnTeiwinCenter'+no);
	HideBox_id=document.getElementById('TnTeIwinframeid'+no);
	HideBox_name=eval('frames.TnTeIwinframename'+no);
	if(iwindowLAYER.style.zIndex<iwinzidx)iwindowLAYER.style.zIndex=++iwinzidx;
	tntactiwin='TnTeIwin'+no;
}

// 우.상단 버튼 onmouse over/out
function top_btn_act(img_this){
	img_this.src=(img_this.src.match(/2\.gif$/))?img_this.src.replace(/2\.gif$/,'.gif') : img_this.src.replace(/\.gif$/,'2.gif');
}

// iwindow 내 스크롤바
// iwindow 출력소스(html)의 자바스크립트 에 document.write(parent.iwindow_SCROLL()); 해 줘야 적용됨
function iwindow_SCROLL(){
	return '<style type=text/css> body{'	+
	' scrollbar-face-color:			#f3f3f3;' +
	' scrollbar-3dlight-color:	#ffffff;' +
	' scrollbar-highlight-color:	#ffffff;' +
	' scrollbar-shadow-color:	#eaeaea;' +
	' scrollbar-darkshadow-color:#ffffff;' +
	' scrollbar-track-color:		#ffffff;' +
	' scrollbar-arrow-color:		#dadada;' +
	'}</style>';
}

