
function sendmail() {

  document.write('<a href="mailto:?subject=JanJan&body=');
  document.write(document.URL);
  document.write('">');
  document.write('<img src="http://www.janjan.jp/parts/image/op_sendmail.gif" alt="記事のＵＲＬをメールで送る" title="記事のＵＲＬをメールで送る" border="0" height="25" width="110"><\/a>');
}