// Pre-Processing for Analytic 2008.11.11 by Schinmullar.
// 2009.9.29 modified.
function fnGetUrlInitChr(){
	return(true);	// 2009.9.29
}

function dummy_fnGetUrlInitChr(){
	var rStr = '';
	var fnini = '';
	var uStr = '' + document.location;
		uStr = escape( uStr.replace(/\//,"") );
	var cc = new Array;
		cc = uStr.split(/\//);
	var uStrTail = uStr.substr(uStr.length-1,1);
		if( uStrTail == '/' ){ cc[cc.length++] = 'index.html'; }
	var addStr = '';

	// 2009.7.13 ///////////////////////////////////////////////////////////////////////////

	// 1st Level
	var fstLvlTbl = new Array;
	
	fstLvlTbl[fstLvlTbl.length++]={'dname':'an','dnum':'0'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'area','dnum':'1'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'bbs','dnum':'2'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'chubu','dnum':'3'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'column','dnum':'4'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'contents','dnum':'5'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'corporate','dnum':'6'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'enta','dnum':'7'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'error','dnum':'8'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'etc','dnum':'9'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'event','dnum':'A'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'feature','dnum':'B'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'flash','dnum':'C'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'hokkaido','dnum':'D'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'image','dnum':'E'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'info','dnum':'F'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'kansai','dnum':'G'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'lab','dnum':'H'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'life','dnum':'I'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'mai','dnum':'J'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'masp','dnum':'K'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'news','dnum':'L'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'photo','dnum':'M'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'ranking','dnum':'N'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'rss','dnum':'O'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'seibu','dnum':'P'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'select','dnum':'Q'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'senbatsu','dnum':'R'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'showa','dnum':'S'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'sitemap','dnum':'T'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'sp','dnum':'U'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'universalon','dnum':'V'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'weather','dnum':'W'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'weekly','dnum':'X'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'word','dnum':'Y'};
	fstLvlTbl[fstLvlTbl.length++]={'dname':'Sample_ct2146x_test','dnum':'Z'};

	if( cc[2] && cc.length > 3 ){
		addStr = '';
		{
			var i;
			for(i=0; i<fstLvlTbl.length; i++){
				if( cc[2] == fstLvlTbl[i].dname ){
					break;
				}
			}
			if( i<fstLvlTbl.length){
				addStr = fstLvlTbl[i].dnum;
			}else{
				addStr = cc[2].substr(0,1);	// undifined level name
				addStr = addStr.toLowerCase();
			}
		}
		rStr += addStr;
	}

	// 2nd
	if( cc[3] && cc.length > 4 ){
		addStr = '';
		{
			cc[3] = cc[3].replace(/[aiueo]/g,"");
			addStr = cc[3].substr(0,3);
			if( cc[3].length > 3 ){
				addStr += cc[3].substr(cc[3].length-1,1);
			}
		}
		rStr += addStr;
	}
	
	// 3rd
	if( cc[4] && cc.length > 5){
		addStr = '';
		{
			cc[4] = cc[4].replace(/[aiueo]/g,"");
			cc[4] = cc[4].substr(0, 7-rStr.length);
			addStr = cc[4];
		}
		rStr += addStr;
	}
	
	// sort of file
	addStr = '';
	{
		var gff = uStr.indexOf("/graph/");
		
		if( cc[cc.length-1] == "index.html" || cc[cc.length-1].substr(0,3) == "%3F" ){
			if( gff == -1 ){ addStr = "x"; }else{ addStr = "X"; }
		}else if( cc[cc.length-1].substr(0,5) == "m2009" && cc[cc.length-1].indexOf(".html",0)>-1){
			if( gff == -1 ){ addStr = "m"; }else{ addStr = "M"; }
		}else{
			if( gff == -1 ){ addStr = "2"; }else{ addStr = "3"; }
		}
	}
	rStr += addStr;
	
	return( rStr );
}

