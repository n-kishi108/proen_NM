window.onload=function(){
  for(n=0;n<g_onload_functions.length;n++){
    if( typeof( window[ g_onload_functions[n] ] ) == "function" ){
      eval(g_onload_functions[n] + "()");
    }
  }
}