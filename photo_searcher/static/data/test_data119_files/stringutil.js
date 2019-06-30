/*
  関  数 : ConvertDate
  引  数 : datestr 日付文字列
  戻  値 : 実行時の日付なら時間部分を、実行時の日付でないなら日付部分を返す。
  用  例 : ConvertDate('2007/01/02 12:34:56'); // 実行日が1/2でない場合は、
                                               // 月日の'01/02'を返す
           ConvertDate('2007/05/02 12:34:56'); // 実行日が5/2である場合は、
                                               // 時分の'12:34'を返す
           ConvertDate('2007/05/02 00:00:xx'); // 実行日が5/2でない場合は、
                                               // 時分の'05/02'を返す
           ConvertDate('2007/05/02 00:00:xx'); // 実行日が5/2である場合は、
                                               // 時分の'05/02'を返す
*/
function ConvertDate(datestr) {
  var pos = datestr.indexOf(' ');
  var date = datestr.substring(0, pos);
  var time = datestr.substring(pos + 1, datestr.length);

  var today = new Date();
  var yyyy = PadLeft(today.getFullYear(), 4, '0');
  var MM = PadLeft(today.getMonth() + 1, 2, '0');
  var dd = PadLeft(today.getDate(), 2, '0');
  var HH = time.substring(0,1);
  var mm = time.substring(3,4);
  var ss = time.substring(6,7);
  
  if (date == yyyy + '/' + MM + '/' + dd) {
    if ( HH + mm != '0000' ) {
      return time.substring(0, 5);
    }
  }
  
  if (pos != -1 )
  {
  	return date.substring(5,11);
  }
  else
  {
  	return datestr.substring(5,11);
  }
}


/*
  関  数 : ConvertDateLong
  引  数 : datestr 日付文字列
  戻  値 : 実行時の日付なら時間部分を、実行時の日付でないなら日付部分を返す。
  用  例 : ConvertDateLong('2007/01/02 12:34:56'); // 実行日が1/2でない場合は、
                                               // 日付部分の'2007/01/02'を返す
           ConvertDateLong('2007/05/02 12:34:56'); // 実行日が5/2である場合は、
                                               // 日時部分の'12:34:56'を返す
*/
function ConvertDateLong(datestr) {
  var pos = datestr.indexOf(' ');
  var date = datestr.substring(0, pos);
  var time = datestr.substring(pos + 1, datestr.length);

  var today = new Date();
  var yyyy = PadLeft(today.getFullYear(), 4, '0');
  var MM = PadLeft(today.getMonth() + 1, 2, '0');
  var dd = PadLeft(today.getDate(), 2, '0');
  
  if (date == yyyy + '/' + MM + '/' + dd) {
    return time;
  }
  else {
    return date;
  }
}

function ConvertDate_Test() {
  var output = "";
  var today = new Date();
  alert('test' + today);
  var yyyy = today.getFullYear();
  var MM = PadLeft(today.getMonth() + 1, 2, '0');
  var dd = PadLeft(today.getDate(), 2, '0');
  var HH = PadLeft(today.getHours(), 2, '0');
  var mm = PadLeft(today.getMinutes(), 2, '0');
  var ss = PadLeft(today.getSeconds(), 2, '0');
  var ff = PadLeft(today.getMilliseconds(), 2, '0');
  alert('test' + today);

  var datestr = yyyy + '/' + MM + '/' + dd + ' ' + HH + ':' + mm + ':' + ss;
  output = ConvertDate(datestr);
  if (output == yyyy + '/' + MM + '/' + dd) {
    alert('NG ' + output);
  }
  else {
    alert('OK ' + output);
  }
  
  datestr = '2000/01/02 11:22:33';
  output = ConvertDate(datestr);
  if ( output == '11:22:33' ) {
    alert('NG ' + output);
  }
  else {
    alert('OK ' + output);
  }
  
}

/*
  関  数 : DateToString
  引  数 : date 日付型変数（省略した場合は内部でnew Date()します）
  戻  値 : 実行時の日付なら時間部分を、実行時の日付でないなら日付部分を返す。
  用  例 : DateToString(date); // dateの時分が00:00なら
                               // '2007/01/02'を返す
           DateToString(date); // dateの時分が00:00でないなら
                               // '2007/01/02 12:34:56'を返す
*/
function DateToString(date) {
  if ( ! date ) {
    date = new Date();
  }
  var yyyy = date.getFullYear();
  var MM = PadLeft(date.getMonth() + 1, 2, '0');
  var dd = PadLeft(date.getDate(), 2, '0');
  var HH = PadLeft(date.getHours(), 2, '0');
  var mm = PadLeft(date.getMinutes(), 2, '0');
  var ss = PadLeft(date.getSeconds(), 2, '0');
  var ff = PadLeft(date.getMilliseconds(), 2, '0');
  if ( HH + mm + ss == '000000' ) {

    return yyyy + '/' + MM + '/' + dd;
  }
  else {
    return yyyy + '/' + MM + '/' + dd + ' ' + HH + ':' + mm + ':' + ss;
  }
}

/*
  関  数 : DateToStringWithoutSecond
  引  数 : date 日付型変数（省略した場合は内部でnew Date()します）
  戻  値 : 実行時の日付なら時間部分を、実行時の日付でないなら日付部分を返す。
  用  例 : DateToStringWithoutSecond(date); // dateの時分が00:00なら
                                            // '2007/01/02'を返す
           DateToStringWithoutSecond(date); // dateの時分が00:00でないなら
                                            // '2007/01/02 12:34:56'を返す
*/
function DateToStringWithoutSecond(date) {
  if ( ! date ) {
    date = new Date();
  }
  var yyyy = date.getFullYear();
  var MM = PadLeft(date.getMonth() + 1, 2, '0');
  var dd = PadLeft(date.getDate(), 2, '0');
  var HH = PadLeft(date.getHours(), 2, '0');
  var mm = PadLeft(date.getMinutes(), 2, '0');
  var ss = PadLeft(date.getSeconds(), 2, '0');
  var ff = PadLeft(date.getMilliseconds(), 2, '0');
  if ( HH + mm == '0000' ) {
    return yyyy + '/' + MM + '/' + dd;
  }
  else {
    return yyyy + '/' + MM + '/' + dd + ' ' + HH + ':' + mm;
  }
}

/*
  関  数 : PadLeft
  引  数 : input 入力文字列
           length パディング結果の文字列の長さ
           padding パディングする文字
  戻  値 : 左にパディングした文字列
  用  例 : PadLeft('\2,100-', 8, ' '); // ' \2,100-'
           PadLeft('3', 3, '0');       // '003'
           PadLeft('1234', 3, '0');    // '1234'
*/
function PadLeft(input, length, padding) {
  var output = input + '';
  if ( output.length > length )
    return output;
  while ( output.length < length )
    output = padding + output;
  return output;
}
/*
  関  数 : PadRight
  引  数 : input 入力文字列
           length パディング結果の文字列の長さ
           padding パディングする文字
  戻  値 : 左にパディングした文字列
  用  例 : PadLeft('\2,100-', 8, ' '); // '\2,100- '
           PadLeft('3', 3, '0');       // '300'
           PadLeft('1234', 3, '0');    // '1234'
*/
function PadRight(input, length, padding) {
  var output = input + '';
  if ( output.length > length )
    return output;
  while ( output.length < length )
    output = output + padding;
  return output;
}

