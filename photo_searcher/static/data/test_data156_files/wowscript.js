<!--
/*=====================================================================
*
*	Common Script Templet
*											modified		2004.07.30
*										by ZeroUpside(crowdy@knje.jp)

boolean function isImage(objstr)
string function ltrim(objstr)
string function rtrim(objstr)
string function Jtrim(objstr)
void function _cmdfocus(formobj)
boolean function ischecked( formobj, objname )
boolean function ichkdougi( formobj, objname )
boolean function isselected( formobj, objname )
boolean function issame( formobj1, formobj2, objname )
boolean function lengthCheck( formobj, minlength, maxlength, objname)
boolean function lengthMax( formobj, maxlength, objname)
boolean function isobj(formobj, objname, optpilsu, maxlength)
boolean function isalpha(formobj, objname, optpilsu, maxlength)
boolean function isnum(formobj, objname, optpilsu, maxlength)
boolean function isid(formobj, objname, optpilsu
boolean function ispass(formobj, objname, optpilsu, maxlength)
boolean function istelno(formobj, objname, optpilsu, maxlength)
boolean function isemail(formobj, objname, optpilsu, maxlength)
boolean function isKeyWord(formobj, objname, optpilsu, maxlength)
int function hlen(objstr)
boolean function chkymd(cmbYear, cmbMonth, cmbDay)
boolean function chkymd2(txtYear, cmbMonth, cmbDay)
void function actionmsg(message, direction )
string function getCookieVal(offset)
void function getCookie(name)
void function setCookie(name, value)
function CmdLogout()
void function CmdPopup(sURL,sWinName,sFeatures)
=======================================================================*/
var NUMBER = "0123456789";
var ALPHA_S = "abcdefghijklmnopqrstuvwxyz";
var ALPHA_L = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var ALPHA = ALPHA_S + ALPHA_L;
var CHAR_ETC = "!#$%&*+-./=?^_`{|}";
var HANKAKU = "ｱｧｲｨｳｩｴｪｵｫｶｶﾞｷｷﾞｸｸﾞｹｹﾞｺｺﾞｻｻﾞｼｼﾞｽｽﾞｾｾﾞｿｿﾞﾀﾀﾞﾁﾁﾞﾂﾂﾞﾃﾃﾞﾄﾄﾞﾅﾆﾇﾈﾉﾊﾊﾞﾊﾟﾋﾋﾞﾋﾟﾌﾌﾞﾌﾟﾍﾍﾞﾍﾟﾎﾎﾞﾎﾟﾏﾐﾑﾒﾓﾔｬﾕｭﾖｮﾗﾘﾙﾚﾛﾝｦ";

function isImage(objstr){
	if (objstr == '') return true;
	else {
		var atemp = objstr.split(".");
		var nsize = atemp.length;
		var strext = "";
		if (nsize > 0 ){
			strext = atemp[nsize-1].toLowerCase();
			if ( !(strext == "jpg" || strext == "gif") )
				return false;
			else return true;
		}
		return false;
	}
}

function ltrim(objstr){
	var i, j = 0;

	for ( i = 0; i < objstr.length ; i++){
		if (objstr.substr(i, 1) == ' ' ){
			j = j + 1
		}
		else{
			break;
		}
	}
	objstr = objstr.substr(j, objstr.length - j+1);
	return objstr;
}

function rtrim(objstr){
	var i, j = 0;

	for ( i = objstr.length - 1; i >= 0 ; i--){
		if (objstr.substr(i , 1) == ' ' ){
			j = j + 1
		}
		else{
			break;
		}
	}
	objstr = objstr.substr(0, objstr.length - j);
	return objstr;
}


function Jltrim(objstr){
	var i, j = 0;

	for ( i = 0; i < objstr.length ; i++){
		if (objstr.substr(i, 1) == '　' && objstr.substr(i, 1) == '　' ){
			j = j + 1
		}
		else{
			break;
		}
	}
	objstr = objstr.substr(j, objstr.length - j+1);
	return objstr;
}


function trim(objstr){

	objstr = ltrim(objstr);
	objstr = rtrim(objstr);
	objstr = Jltrim(objstr);

	return objstr;
}

function _cmdfocus(formobj){
	if( formobj.style.display != "none")
	{
		formobj.select();
		formobj.focus();
	}
}

function ischeckNull( formobj, objname )
{
	if ( formobj.value == "" )
	{
		alert( objname + 'は必須入力 項目です。' );
		formobj.focus();
		return false;
	}
	return true;
}

function ischecked( formobj, objname )
{
	var pass;
	
	
	for( var i=0; i<formobj.length; i++ )
	{
		if ( formobj[i].checked == true )
		{
			pass = true;
		}
	}

	if ( !pass )
	{
		alert( objname + 'は必須入力 項目です。' );
		formobj[0].focus();
		return false;
	}
	return true;
}

function ischecked_NewsRelease( formobj, objname )
{
	var pass;

	if ( formobj.checked == true )
	{
		pass = true;
	}

	if ( !pass )
	{
		alert( objname + 'は必須入力 項目です。' );
		formobj.focus();
		return false;
	}
	return true;
}

function ischeckedShop( formobj, objname )
{
	var pass;
	
	
	for( var i=0; i<formobj.length; i++ )
	{
		if ( formobj[i].checked == true )
		{
			pass = true;
		}
	}

	if ( !pass )
	{
		alert( objname );
		formobj[0].focus();
		return false;
	}
	return true;
}

function ichkdougi( formobj, objname )
{
	var pass;
	
	if ( formobj.consent == 1 )
	{
	for( var i=0; i<formobj.length; i++ )
	{
		if ( formobj[i].checked == true )
		{
			pass = true;
		}
	  }
	}
	if ( !pass )
	{
		alert( objname + 'は必須入力 項目です。' );
		formobj[0].focus();
		return false;
	}
	return true;
}

function isselected( formobj, objname )
{
	if ( formobj.selectedIndex == 0 )
	{
		alert( objname + 'は必須入力 項目です。' );
		formobj.focus();
		return false;
	}
	return true;
}



function issame( formobj1, formobj2, objname )
{
	if ( formobj1.value != formobj2.value )
	{
		alert( objname + 'が一致していません。');
		formobj1.focus();
		return false;
	}

	return true;
}

function lengthCheck( formobj, minlength, maxlength, objname){
	if ( ( formobj.value.length < minlength) || (formobj.value.length > maxlength) ){
		alert( objname + 'は半角基準' + minlength + '字以上' + maxlength + '字以下作成して下さい。\n\n現在文字の長さ ' + formobj.value.length + '字');
		formobj.focus();
		return false;
	}
	else
		return true;
}

function lengthMax( formobj, maxlength, objname){
	var valuelen ;
	valuelen = hlen(formobj.value);

	if ( (valuelen > maxlength) ){
		alert( objname + 'は全角基準' + (maxlength / 2) + '字以下作成して下さい。\n\n現在文字の長さ ' + (valuelen / 2 ) + '字');
		formobj.focus();
		return false;
	}
	else
		return true;
}

function isobj(formobj, objname, optpilsu, maxlength){
	formobj.value = trim(formobj.value);
	var valuelen;
	valuelen = hlen(formobj.value);

	if (formobj == null ) {

	}
	else if (formobj.value == '' && optpilsu == 1){
		alert(objname + 'は必須入力項目です。');
		_cmdfocus(formobj);
		return false;
	}
	else if (arguments.length == 5 && arguments[4] > valuelen){
		_cmdfocus(formobj);
		alert(objname + 'は全角基準 ' + arguments[4] + '字以上作成して下さい。' + /*(全角は ' + (arguments[4] / 2) + '字)*/ '\n\n現在文字の長さ ' + valuelen + '字');
		return false;
	}
	else if (valuelen > maxlength && maxlength != 0){
		_cmdfocus(formobj);
		alert(objname + 'は全角基準 ' + maxlength + '字以下作成して下さい。' + /*(全角は ' + (maxlength / 2) + '字)*/ ' \n\n現在文字の長さ ' + valuelen + '字');
		return false;
	}
	else {
		return true;
	}
}

function isalpha(formobj, objname, optpilsu, maxlength){
	var str = ALPHA + " -_";
	var i, errorreturn = false;

	if ((arguments.length == 5 ? isobj(formobj, objname, optpilsu, maxlength, arguments[4]) : isobj(formobj, objname, optpilsu, maxlength)) != true){
	}
	else {
		for ( i = 0; i < formobj.value.length; i++){
			if (str.indexOf(formobj.value.substring(i, i+1)) < 0) {
				errorreturn = true;
				break;
			}
		}
		if ( formobj.value != '' && errorreturn == true) {
			alert(objname + 'は数字、 英、, \'_\', \'-\' のみが入力可能です。');
			_cmdfocus(formobj);
			return false;
		}
		else {
			return true;
		}
	}
}

function isnum(formobj, objname, optpilsu, maxlength){
	var str = NUMBER;
	var i, errorreturn = false;

	if ((arguments.length == 5 ? isobj(formobj, objname, optpilsu, maxlength, arguments[4]) : isobj(formobj, objname, optpilsu, maxlength)) != true){
	}
	else {
		for ( i = 0; i < formobj.value.length; i++){
			if (str.indexOf(formobj.value.substring(i, i+1)) < 0) {
				errorreturn = true;
				break;
			}
		}
		if ( formobj.value != '' && errorreturn == true) {
			alert(objname + 'は数字のみが入力可能です。');
			_cmdfocus(formobj);
			return false;
		}
		else {
			return true;
		}
	}
}
function isid(formobj, objname, optpilsu, maxlength){
	var str = NUMBER + ALPHA;
	var i, errorreturn = false;

	if ((arguments.length == 5 ? isobj(formobj, objname, optpilsu, maxlength, arguments[4]) : isobj(formobj, objname, optpilsu, maxlength)) != true){
	}
	else {
		for ( i = 0; i < formobj.value.length; i++){
			if (str.indexOf(formobj.value.substring(i, i+1)) < 0) {
				errorreturn = true;
				break;
			}
		}
		if ( formobj.value != '' && errorreturn == true) {
			alert(objname + 'は半角英文と半角数字のみが入力可能です。');
			_cmdfocus(formobj);
			return false;
		}
		else {
			return true;
		}
	}
}
function ispass(formobj, objname, optpilsu, maxlength){
	var str = NUMBER + ALPHA;
	var i, errorreturn = false;

	if ((arguments.length == 5 ? isobj(formobj, objname, optpilsu, maxlength, arguments[4]) : isobj(formobj, objname, optpilsu, maxlength)) != true){
	}
	else {
		for ( i = 0; i < formobj.value.length; i++){
			if (str.indexOf(formobj.value.substring(i, i+1)) < 0) {
				errorreturn = true;
				break;
			}
		}
		if ( formobj.value != '' && errorreturn == true) {
			alert(objname + 'は半角英文と半角数字のみが入力可能です。');
			_cmdfocus(formobj);
			return false;
		}
		else {
			return true;
		}
	}
}
function istelno(formobj, objname, optpilsu, maxlength){
	var str = NUMBER + "-()"
	var i, errorreturn = false;

	if ((arguments.length == 5 ? isobj(formobj, objname, optpilsu, maxlength, arguments[4]) : isobj(formobj, objname, optpilsu, maxlength)) != true){
	}
	else {
		for ( i = 0; i < formobj.value.length; i++){
			if (str.indexOf(formobj.value.substring(i, i+1)) < 0) {
				errorreturn = true;
				break;
			}
		}
		if ( formobj.value != '' && errorreturn == true) {
			alert(objname + 'は数字は \'-\'のみが入力可能です。');
			_cmdfocus(formobj);
			return false;
		}
		else {
			return true;
		}
	}
}

function isemail(formobj, objname, optpilsu, maxlength){
	if ((arguments.length == 5 ? isobj(formobj, objname, optpilsu, maxlength, arguments[4]) : isobj(formobj, objname, optpilsu, maxlength)) != true){
	}
	else if ( formobj.value !='' && formobj.value.search(/(\S+)@(\S+)\.(\S+)/) == -1  ){
		alert(objname + "はinfo@aise.jpのような形式でご入力して下さい。");
		_cmdfocus(formobj);
		return false;
	}
	else {
		return true;
	}
}




function isKeyWord(formobj, objname, optpilsu, maxlength){
		formobj.value = trim(formobj.value);
		var valuelen;
		
		    var str_character;
		    var int_char_count;
		    var int_contents_length;
		    
		    int_char_count = 0;

		
		
		int_contents_length = formobj.value.length;
		for(k=0; k < int_contents_length; k++)
        {
	    str_character = formobj.value.charAt(k);
            if(escape(str_character).length > 4)
                int_char_count += 2;  
            else
                int_char_count++;
        }
        
		valuelen =	int_char_count;


		data = formobj.value;

		 for (var i=0; i < data .length; i++) { 
		  ch_char = data .charAt(i);

		  ch=ch_char.charCodeAt();
		  if( (ch >= 33 && ch <= 47) || (ch >= 58 && ch <= 64) || (ch >= 91 && ch <= 96) || (ch >= 123 && ch <= 126) ) {
		   alert("'" + ch_char+ "' は記事検索使用出来ない記号です。");
		   return false;
		  }
		 }

		if (formobj == null ) {

		}
		else if (formobj.value == '' && optpilsu == 1){
			alert(objname + 'を入力して下さい。');
			_cmdfocus(formobj);
			return false;
		}
		else if (arguments.length == 5 && arguments[4] > valuelen){
			_cmdfocus(formobj);
			alert(objname + 'は ' + arguments[4] + '字以上作成して下さい。' + /*(全角は ' + (arguments[4] / 2) + '字)*/ '\n\n現在文字の長さ ' + valuelen + '字');
			return false;
		}
		else if (valuelen > maxlength && maxlength != 0){
			_cmdfocus(formobj);
			alert(objname + 'は 全角' + (maxlength / 2) + '文字以下、半角' + maxlength + '文字以下で作成して下さい。' + /*(全角は ' + (maxlength / 2) + '字)*/ ' \n\n現在文字の長さ ' + int_contents_length + '字');
			return false;
		}
		else {
			return true;
		}
}

function ispostnum(formobj, objname, optpilsu, maxlength){
	var str = NUMBER;
	var i, errorreturn = false;

	for ( i = 0; i < formobj.value.length; i++){
		if (str.indexOf(formobj.value.substring(i, i+1)) < 0) {
			errorreturn = true;
			break;
		}
	}

	if ( formobj.value != '' && errorreturn == true) {
		alert(objname + 'は数字のみが入力可能です。');
		_cmdfocus(formobj);
		return false;
	} 
	else {
		if (formobj.value.length != 7 ){
			_cmdfocus(formobj);
			alert(objname + 'は1510064のように７数字でご入力下さい。');
			return false;
		}
		return true;
	}
}


function hlen(objstr){
	var i, j;
	var objcode;

	j = 0;
//alert (objstr.length);
	for ( i = 0; i < objstr.length ; i++){
		objcode	= objstr.charCodeAt(i);
//		alert (objcode);
	    objcode	= parseInt(objcode);
//		alert (objcode);
		if ((objcode > 255) || (objcode < 0)){
			j = j + 2;
		}
		else{
			j = j + 1;
		}
	}

	return j;
}

function chkymd(cmbYear, cmbMonth, cmbDay)
{
	var selectmonth = parseInt(cmbMonth.options[cmbMonth.selectedIndex].value, 10);

	if(isNaN(selectmonth)){
		cmbDay.length = 0;
			var option = new Option('-','');
			cmbDay.options[0] = option;
	}
	else{
		var monthday, i;

		selectmonth = selectmonth;// + 1;

		if (selectmonth == 1) monthday = 31;
		if (selectmonth == 3) monthday = 31;
		if (selectmonth == 4) monthday = 30;
		if (selectmonth == 5) monthday = 31;
		if (selectmonth == 6) monthday = 30;
		if (selectmonth == 7) monthday = 31;
		if (selectmonth == 8) monthday = 31;
		if (selectmonth == 9) monthday = 30;
		if (selectmonth == 10) monthday = 31;
		if (selectmonth == 11) monthday = 30;
		if (selectmonth == 12) monthday = 31;

		if(selectmonth == 2) {
			var y = cmbYear.options[cmbYear.selectedIndex].value;
			if ((y % 4) == 0) {
				if ((y % 100) == 0) {
					if ((y % 400) == 0)
					{ monthday = 29; }
					else
					{ monthday = 28; }
				}
				else
				{ monthday = 29; }
			}
			else
			{ monthday = 28; }
		}
		cmbDay.length = monthday;
		for(i=0 ; i < monthday ;i++) {
			if (i < 9)
			{ var option = new Option(i+1,'0'+(i+1)); }
			else
			{ var option = new Option(i+1, i+1); }
			cmbDay.options[i] = option;
		}
	}
	cmbDay.selectedIndex=0;
	return true;
}

function chkymd2(txtYear, cmbMonth, cmbDay)
{
	var selectmonth = parseInt(cmbMonth.options[cmbMonth.selectedIndex].value, 10);
	if(isNaN(selectmonth)){
		cmbDay.length = 0;
			var option = new Option('-','');
			cmbDay.options[0] = option;
	}
	else{
		var monthday, i;

		selectmonth = selectmonth;// + 1;

		if (selectmonth == 1) monthday = 31;
		if (selectmonth == 3) monthday = 31;
		if (selectmonth == 4) monthday = 30;
		if (selectmonth == 5) monthday = 31;
		if (selectmonth == 6) monthday = 30;
		if (selectmonth == 7) monthday = 31;
		if (selectmonth == 8) monthday = 31;
		if (selectmonth == 9) monthday = 30;
		if (selectmonth == 10) monthday = 31;
		if (selectmonth == 11) monthday = 30;
		if (selectmonth == 12) monthday = 31;

		if(selectmonth == 2) {
			var y = txtYear.value;
			if ((y % 4) == 0) {
				if ((y % 100) == 0) {
					if ((y % 400) == 0)
					{ monthday = 29; }
					else
					{ monthday = 28; }
				}
				else
				{ monthday = 29; }
			}
			else
			{ monthday = 28; }
		}
		cmbDay.length = monthday;
		for(i=0 ; i < monthday ;i++) {
			if (i < 9)
			{ var option = new Option(i+1+'日','0'+(i+1)); }
			else
			{ var option = new Option(i+1+'日', i+1); }
			cmbDay.options[i] = option;
		}
	}
	cmbDay.selectedIndex=0;
	return true;
}

function actionmsg(message, direction ){
	message = trim(message);
	direction = trim(direction);

	if(message != ""){
		alert(message);
	}
	if(direction != ""){
		if(direction.toUpperCase( ) == "BACK"){
			history.back();
		}
		else if(direction.toUpperCase() == "CLOSE"){
			window.close()
		}
		else if(direction.substr(0, 10).toUpperCase() == "JAVASCRIPT"){
			eval(direction.substr(11,direction.length));
		}
	}
}
function getCookieVal(offset){
	var endstr = document.cookie.indexOf(";", offset);
	if(endstr == -1){
		endstr = document.cookie.length;
	}
	return unescape(document.cookie.substring(offset, endstr));
}
function getCookie(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;

	while (i < clen) {
		var j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return getCookieVal (j);

		i = document.cookie.indexOf(" ", i) + 1;
		if (i == 0)
			break;
	}
	return null;
}

function setCookie(name, value){
	var argv 	= setCookie.arguments;
	var argc 	= setCookie.arguments.length;
	var expires	= (argc > 2) ? argv[2] : null;
	var path 	= (argc > 3) ? argv[3] : null;
	var domain 	= (argc > 4) ? argv[4] : null;
	var secure 	= (argc > 5) ? argv[5] : false;
	//document.cookie = name + "=" + escape (value) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
	document.cookie = name + "=" + escape( value ) + "; path=/;"
}

function CmdLogout() {
	document.cookie = "sOnOff=" + "" + ";expires=Thu, 01-Jan-70 00:00:01 GMT" ;
	//document.lovele.action="/top/popup_logout.asp";
	//document.lovele.submit();
	location.replace("/top/popup_logout.asp");
}

var hWnd;
function CmdPopup(sURL,sWinName,sFeatures){
	if(hWnd && !hWnd.closed){
		hWnd.close();
	}
	hWnd = window.open(sURL,sWinName,sFeatures);
}

function count_chkBox_KTM(boxName, chknum){
	var thisform=document.wowkorea;
	cnj_max = chknum; 
	cnj_count=0;
	chBoxName = boxName
	for(i=0; i<thisform[chBoxName].length; i++){
		if(thisform[chBoxName][i].checked) 
			cnj_count++;
	}
	if(cnj_count != cnj_max){
		alert( cnj_max + "check!");
	return false;
	}
	return true;
}
//-->