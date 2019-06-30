// JavaScript Document

window.onload=function(){
	if (location.href.indexOf("index.php") > 0){
		//onLoad();
	
	}
	if (location.href.indexOf("detail.php") > 0 ){
		onLoad();
	
	}
	if (location.href.indexOf("indextest.php") > 0){
		onLoad();
	
	}
	
	$('fw_del').onclick=function(){

	$('fw').value="";
	$('form1').submit();
	//	location.href="?fw=" ;

	}
	
	//for (i=0;i<=16;i++){
	//$("list_id_"+i).onclick =function(){
	//$("cate_selected").innerHTML="list_id_"+i;	
	//}
	//}

}





function savealert(idnum){
	if (idnum.substr(10,7)=="0000000"){
		res = confirm("このファイルはまだ保存されていません。\n先に基本情報の保存をしてください。");
		if(res){
			return false;
		}else{
			return false;
		}
	}else{
		return true;
	}
}
