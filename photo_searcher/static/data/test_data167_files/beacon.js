function nsTracker(pa,gr) {
	var ts=new Date().getTime(),d=document,n=navigator,w=window,l=d.location,b=d[d.compatMode=='CSS1Compat'?'documentElement':'body'],ua=n.userAgent,pa=!pa?l.pathname+l.search:pa,pr=l.protocol,
	op=!!w.opera,ie=!!w.attachEvent&&!op,wk=!!ua.match(/WebKit/),ff=!!ua.match(/Gecko/)&&!ua.match(/KHTML/),ms=!!ua.match(/Mobile.*Safari/),i,j,t,rd=Math.random(),r1=1,r2=0.01,v=3,
	ur=function(t){return pr+'//beacon.nikkansports.com/'+t+'/'+rd+'.gif'},
	ue=function(s,u){return typeof(encodeURIComponent)=='function'?u?encodeURI(s):encodeURIComponent(s):escape(s)},
	ud=function(s){return typeof(decodeURIComponent)=='function'?decodeURIComponent(s):unescape(s)},
	pi='ss='+(pr=='https:'?1:0)+'&po='+(l.port||'-')+'&dm='+ue(d.domain)+'&pa='+ue(pa)+'&r1='+r1+'&r2='+r2+'&v='+v,
	al=function(o,t,f,c){o.addEventListener?o.addEventListener(t,f,!!c):o.attachEvent?o.attachEvent('on'+t,f):0},
	ai=function(s){t=new Image(1,1);t.onload=function(){};t.src=s},
	fs=function(){if(r2<rd){return '-'}t=d.createElement(op?'div':'span');t.innerHTML='&nbsp;';t.lang='en';j=t.style;j.padding=0;j.border=j.fontSize='';d.body.appendChild(t);j=t.offsetHeight||'-';d.body.removeChild(t);return j},
	fl=function(){
		if(n.plugins&&!ie){
			return (t=n.mimeTypes['application/x-shockwave-flash'])&&(t=t.enabledPlugin)&&(t=t.description)&&(t=t.replace(/^[^0-9]+/,'').replace(/[^0-9]+/g,'.'))?t:'-';
		}else{
			for(i=11;i>=2;i--){
				try{t=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+i+"')");
					if(t){
						try{return t.GetVariable("$version").replace(/.*?([0-9]+),([0-9]+),([0-9]+).*/,'$1.$2.$3')}catch(e){}
						return i+'.0';
					}
				}catch(e){}
			}
			return '-';
		}
	},
	tk=function() {
		ai(ur('t')+'?sr='+((t=self.screen)?t.width+'x'+t.height:'-')+'&sc='+((t=self.screen)?t.colorDepth:'-')
			+'&la='+(n.language||n.browserLanguage||'-').toLowerCase()+'&cs='+ue(d.characterSet||d.charset||'-')+'&ce='+(n.cookieEnabled?1:0)
			+'&je='+(n.javaEnabled()?1:0)+'&fl='+fl()+'&fs='+fs()+'&rt='+(new Date().getTime()-ts)+'&'+pi+'&gr='+(gr||'-')+'&re='+(ue(d.referrer)||'-'));
	};
	if(r1<rd)return;
	if(!pr.match(/^https?:/))return;
	if(nsTracker.ld){
		tk();
	}else{
		al(w,'load',tk);
		al(w,'load',function(){
			if(r2<rd) {
				t=function(e){ai(ur('c')+'?xy='+(ie?(b.scrollLeft+event.clientX)+'x'+(b.scrollTop+event.clientY):e.pageX?e.pageX+'x'+e.pageY:'0x0')
				+'&sl='+(wk?w.innerWidth+'x'+w.innerHeight:Math.max(b.scrollWidth,b.clientWidth)+'x'+Math.max(b.scrollHeight,b.clientHeight))
				+'&cl='+(b.clientWidth+'x'+b.clientHeight)+'&dt='+(new Date().getTime()-ts)+'&'+pi)};
				for(i=0,j=d.getElementsByTagName('a');i<j.length;i++)al(j[i],'click',t);
			}
		});
	}
}
setTimeout(function(){nsTracker.ld=1},500);
