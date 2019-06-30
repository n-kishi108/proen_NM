/*
	shop_public.js

	쇼핑몰 관련 페이지 출력시 본 자바스크립트 파일은  기본적으로 로딩된다.
	사용자가 직접,  필요한 자바스크립트 코드를 여기에 작성해 넣고 사용하면 된다.
	새 function 을 넣을때는 기존 function 네임과 중복되지 않도록 항상 고유 단어를 앞에 붙여 네이밍 할것.
	-------------------------
	정식버전에 기본 제공되는 쇼핑몰 스킨에서는 작업 편의를 고려해 각각의 php 파일에
	자바스크립트 코드가 분산되어 있는데, 필요하다면 본 파일 하나에 모두 통합해 넣어 줘도 된다.
	단, php 변수가 포함된 자바스크립트 코드는 원래의 php 파일에 그대로 위치 되어야 한다.

*/




function public_js_test(){
	alert('テストです.');
}

/*shop_skin - standar - 2_view_list - list_default.php 상품목록  */
		// 탭버튼 move
		function n_tab_location_chng(num,param){
			var tmp_ob=document.getElementById('idx_tab__table');
			tmp_ob.style.backgroundImage=tmp_ob.style.backgroundImage.replace(/\d\.gif/i,num+'.gif');
			document.n_relocation_form.index_func_num.value=num;
			n_index_relocation(param,'page_fix');
		}

		// 출력변경
		function n_index_relocation(param,page_fix){
			var f=document.n_relocation_form;
			f.search.value=document.getElementById('n_option_btn_search').value;
			f.shwhere.value=get_n_shwhere_value();
			if(!page_fix) f.page.value='1';
			if(f.search.value=='検索  ' || f.search.value==''){f.search.value=''; f.shwhere.value='';}  // '찾기  ' 단어뒤에 스페이스 유지할것
			twindow_OPEN(this_url,'n_shop_local_index',param,'','n_relocation_form','');
		}

		// 검색실행(버튼클릭)
		function seh_bttn_click(){
			var sh_fld=document.getElementById('n_option_btn_search');
			if(sh_fld.value=='検索  '){sh_fld.value=''; sh_fld.focus();  return;}
			n_index_relocation();
		}

		// 검색실행(엔터키)
		function n_search_enter(evt,this_input){
			if(evt.keyCode==13 || evt.keyCode==14) n_index_relocation();
		}

		// '검색' 글자 제거
		function n_sh_def_clear(this_input){
			if(this_input.value=='検索  ') this_input.value=''; // '찾기  ' 단어뒤에 스페이스 유지할것
		}

		// 검색옵션 체크 변경시 자동으로 검색 실행
		function n_sh_chk_act(this_check){
			//if(!document.getElementById('n_option_btn_search').value) return;
			//if(typeof(n_sh_sleep)!='undefined') clearTimeout(n_sh_sleep);
			//n_sh_sleep=setTimeout("n_index_relocation()",1000); // 옵션체크 변경 1초후 자동검색
		}

		// 검색옵션 체크 리스트
		function get_n_shwhere_value(){
			var sh_where_join='';
			var chk_form=document.sh_where_check_form;
			for(i=0; i<chk_form.elements.length; ++i){
				if(chk_form.elements[i].checked==true) sh_where_join+=chk_form.elements[i].name+'|';
			}
			return sh_where_join;
		}

		// 옵션메뉴 하위 레이어 on/off (갯수,정렬,검색)
		function n_option_menu_toggle(menu_div,btn_div,disp){
			if(typeof(menu_div)!='object') menu_div=document.getElementById(menu_div);
			if(typeof(btn_div)!='object') btn_div=document.getElementById(btn_div);
			if(disp!='open' && (disp=='close' || menu_div.style.display=='block')){menu_div.style.display='none'; return;}
			menu_div.style.left=TnT_get_objLeft(btn_div);
			menu_div.style.top=TnT_get_objTop(btn_div)+19;
			menu_div.style.width=btn_div.style.width;
			menu_div.style.display='block';
		}

		// 목록수 변경
		function n_ch_idxmany(num){
			document.getElementById('n_option_btn_many').innerHTML=num;
			document.n_relocation_form.indexmany.value=num;
			//n_option_menu_toggle('n_option_idxmany','n_option_btn_many','close');
			n_index_relocation();
		}

		// 정렬변경
		function n_ch_sort(menu_div,key){
			document.n_relocation_form.sort.value=key;
			document.getElementById('n_option_btn_sort').innerHTML=menu_div.innerHTML;
			//n_option_menu_toggle('n_option_idxsort','n_option_btn_sort','close');
			n_index_relocation();
		}

		// 오름/내림차순 변경
		function n_ch_sort_ord(num){
			document.n_relocation_form.indexorder.value=num;
			n_index_relocation();
		}

		// [이전/다음] 버튼 & 페이지번호 클릭시 실행
		function n_move_next_prev(page,button_type){
			document.n_relocation_form.page.value=page;
			n_index_relocation('','page_fix'); // innerHTML load

			// 화면 포커싱
			var focus_ob=document.getElementById('idx_tab__table'); // focus id (이동위치)
				if(!focus_ob) return;
				if(button_type=='button_top') return; // 목록 상단의 [이전/다음] 버튼
				//if(button_type=='button_bottom') return; // 목록 하단의 [이전/다음] 버튼
				//if(button_type=='page_list') return; // 목록 하단의 페이지 번호

				if(this_browser=='n') location.href='#'+focus_ob.id; // no MSIE
				else focus_ob.focus(); // is MSIE
		}

		// 채크박스 선택비교 view
		function n_idx_chked_action(check_cnt){
			var check_list_num='';
			for(i=0; i<=check_cnt; ++i){
				tmpchk=document.getElementById('n_idx_chked_'+i);
				if(tmpchk && tmpchk.checked==true) check_list_num+='|'+tmpchk.value;
			}
			if(!check_list_num){alert('選択(チェック)された商品がありません。'); return;}
			var focus_ob=document.getElementById('idx_tab__table');
			if(focus_ob){
				if(this_browser=='n') location.href='#'+focus_ob.id;
				else focus_ob.focus();
			}
			n_tab_location_chng(3,'check_list_num='+check_list_num); //3=카탈로그
		}

		// mouseover - 배경색 변환
		function n_menubg_ch(obj){obj.style.backgroundColor=(obj.style.backgroundColor=='')?'#D5E7F3':'';}

		// 카탈로그 드래그 on
		function n_btn_display_on(div_id,btn_img_id){
			document.getElementById(btn_img_id).style.display='';
			document.getElementById(div_id).style.width='400'; // 카달록 width
		}
		// 카탈로그 드래그 off
		function n_btn_display_off(div_id,btn_img_this){
			div_id=document.getElementById(div_id);
			btn_img_this.style.display='none';
			div_id.style.width='100%';
			div_id.style.position='static';
		}
/*shop_skin - standar - 2_view_list - list_default.php 상품목록 끝 */