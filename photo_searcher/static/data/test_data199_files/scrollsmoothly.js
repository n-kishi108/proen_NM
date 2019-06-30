// EUC-JP
/**
 * scrollsmoothly.js
 * Copyright (c) 2008 KAZUMiX
 * http://d.hatena.ne.jp/KAZUMiX/20080418/scrollsmoothly
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * 更新履歴
 * 2009/02/12
 * スクロール先が画面左上にならない場合の挙動を修正
 * 2008/04/18
 * 公開
 *
*/
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(3(){2 B=0.1l;2 S=1m;2 d=f;2 n=0;2 o=0;2 C=\'\';2 p=q;2 D=T.U.V(\'#\');2 W=D[0];2 r=D[1];2 s=E;2 t=E;F(5,\'1n\',X);3 X(){Y();4(r){4(5.G&&!5.1o){Z(3(){u(0,0);v(\'#\'+r)},1p)}g{u(0,0);v(\'#\'+r)}}}3 F(h,H,I){4(h.10){h.10(H,I,q)}g 4(5.G){h.G(\'1q\'+H,3(){I.1r(h)})}}3 Y(){2 w=d.w;1s(2 i=0;i<w.1t;i++){2 J=w[i];2 K=J.U.V(\'#\');4(W==K[0]&&d.11(K[1])){F(J,\'1u\',12)}}}3 12(j){4(j){j.1v()}g 4(5.j){5.j.1w=q}v(1x.k)}3 v(k){2 L=d.11(k.1y(1));4(!L)9;2 a=L;2 x=0;2 y=0;1z(a){x+=a.1A;y+=a.1B;a=a.1C}2 M=13();n=b.14(x,M.x);o=b.14(y,M.y);C=k;4(!p){p=1D;N()}}3 N(){2 l=d.c.15||d.6.15;2 m=d.c.16||d.6.16;2 O=(n-l)*B;2 P=(o-m)*B;2 17=l+O;2 18=m+P;4((b.19(O)<1&&b.19(P)<1)||(s===l&&t===m)){u(n,o);p=q;T.k=C;s=t=E;9}g{u(1a(17),1a(18));s=l;t=m;Z(3(){N()},S)}}3 1b(){9{7:b.1c(f.6.1d,f.c.1d),8:b.1c(f.6.1e,f.c.1e)}}3 1f(){2 z={};4(5.1E){2 e=d.1F(\'1G\');1H(e.1I){1J=\'1K\';1L=\'A\';1M=\'A\';7=\'1g%\';8=\'1g%\';1N=\'A\';1O=\'A\';1P=\'1Q\';1R=\'1S\'}d.6.1T(e);2 7=e.1U;2 8=e.1V;d.6.1W(e);z={7:7,8:8}}g{z={7:d.c.1h||d.6.1h,8:d.c.1i||d.6.1i}}9 z}3 13(){4(5.1j&&5.1k){9{x:5.1j,y:5.1k}}2 Q=1b();2 R=1f();9{x:Q.7-R.7,y:Q.8-R.8}}}());',62,121,'||var|function|if|window|body|width|height|return|ele|Math|documentElement||box|document|else|eventTarget||event|hash|currentX|currentY|targetX|targetY|scrolling|false|incomingHash|prevX|prevY|scrollTo|setScroll|links|||result|0px|easing|targetHash|splitHref|null|addEvent|attachEvent|eventName|func|link|splitLinkHref|targetEle|maxScroll|scroll|vx|vy|documentSize|windowSize|interval|location|href|split|currentHref_WOHash|init|setOnClickHandler|setTimeout|addEventListener|getElementById|startScroll|getScrollMaxXY|min|scrollLeft|scrollTop|nextX|nextY|abs|parseInt|getDocumentSize|max|scrollWidth|scrollHeight|getWindowSize|100|clientWidth|clientHeight|scrollMaxX|scrollMaxY|25|80|load|opera|50|on|apply|for|length|click|preventDefault|returnValue|this|substr|while|offsetLeft|offsetTop|offsetParent|true|innerWidth|createElement|div|with|style|position|absolute|top|left|margin|padding|border|none|visibility|hidden|appendChild|offsetWidth|offsetHeight|removeChild'.split('|'),0,{}))