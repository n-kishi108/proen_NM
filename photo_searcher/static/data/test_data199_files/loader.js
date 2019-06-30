function ignite() {
  if (! new Array().push) return false;
  var A = new Array (
    'jquery-1.3.2.min.js',
    'scrollsmoothly.js',
    'jquery-1.3.2.utilities.min.js'
  );
  for (var i=0; i<A.length; i++) {
    document.write('<script type="text/javascript" src="/js/trendy/200810/'+A[i]+'"><\/script>');
  }
}
ignite();