function Jump(frm){
	var obj=frm.elements["sel"].options;
	var idx=obj.selectedIndex;
	if(idx==0){
		/* 選択されていない場合 */
		alert("希望コースを選択してください");
	}else{
		/* 選択された値（URL)へ移動 */
		location.href=obj[idx].value;
	}
}