//<![CDATA[
msa_tracking=new Array(null,null,null,null,null,null);
try {
msa_cp="uu_news_";
msa_dn="msn.com";
msa_dt=new Date();
msa_v=msa_dt.getDay();
msa_v=(msa_v==0)?6:(msa_v-1);
msa_cp=msa_cp+(Math.floor((msa_dt.getTime()+32400000)/86400000)-msa_v);
msa_rand=Math.floor(Math.random()*1000000000);
msa_array=new Array(2000,1000,500,250,125);
msa_cleargif=new Array(
	'http://g.msn.com/0AD00006/1593569.11?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.12?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.13?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.21?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.22?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.23?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.31?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.32?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.33?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.41?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.42?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.43?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.51?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',	
	'http://g.msn.com/0AD00006/1593569.52?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K',
	'http://g.msn.com/0AD00006/1593569.53?!&amp;&amp;PID=6096902&amp;UIT=M&amp;TargetID=8085829&amp;AN='+msa_rand+'&amp;PG=JXXX0K'	
	);
	rnd=Math.random();
	for (i=0;i<msa_array.length;i++){
		if(msa_array[i]/msa_array[0]>rnd){
			_verify(msa_cp +"_"+i,msa_cleargif[i*3+1],msa_cleargif[i*3],msa_cleargif[i*3+2],i);
		}
	}
}
catch(e){}


function _verify(adid,cleargif,cleargif2,cleargif3,i) {
var dt=new Date();
dt.setTime(dt.getTime()+3600000*24*7);
if (getCookie(adid)!="yes")
	{
		document.cookie=adid+"=yes;expires="+dt.toGMTString()+";domain="+msa_dn+";path=/";
		if (getCookie(adid)!="yes") {
		msa_tracking[i]=new Image(); msa_tracking[i].src=cleargif3.replace(/[&]amp[;]/g,"&");

		}
		else {
		msa_tracking[i]=new Image(); msa_tracking[i].src=cleargif.replace(/[&]amp[;]/g,"&");

}

	}
	else {
		msa_tracking[i]=new Image(); msa_tracking[i].src=cleargif2.replace(/[&]amp[;]/g,"&");
	}
}


function getCookie(key){
	tmp=document.cookie+";";
	tmp1=tmp.indexOf(key,0);
	if (tmp1!=-1){
		tmp=tmp.substring(tmp1,tmp.length);
		start=tmp.indexOf("=",0)+1;
		end=tmp.indexOf(";",start);
		return(unescape(tmp.substring(start,end)));
	}
}
//]]>
