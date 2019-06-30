//soFlashObject
function soFlashObject() {
	this.majorVer = 0;
	this.minorVer = 0;
	this.revision = 0;
	this.beta = 0;
	this.tgtMajorVer = 1;
	this.tgtMinorVer = 0;
	this.tgtRevision = 0;
	this.altHtml = 'Please download the latest version of the free <a href="http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" target="_blank">Flash Player</a>';
	this.w = 200;
	this.h = 200;
	this.param = {};
	this.param.allowScriptAccess = 'always';
	this.param.quality = 'high';
	this.param.menu = 'false';
	this.verChk();
};

soFlashObject.prototype.verChk = function() {
	var np = navigator.plugins,nm = navigator.mimeTypes,mt = 'application/x-shockwave-flash',p=[0,0,0,0];
	if(nm && nm[mt] && nm[mt].enabledPlugin) {
		for(var i=0; i< np.length; i++) {
			p = np[i].description;
			if(p.indexOf('Flash') >= 0) {
				p = p.split(' ').join('').replace('ShockwaveFlash','');
				if(p.indexOf('r') >= 0) p = String(p.replace('r','.') + '.0').split('.');
				else if(p.indexOf('b') >= 0) p = p.replace('b','.0.').split('.');
				break;
			}
		}
	} else if(window.ActiveXObject) {
		try {
			var f = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
			p = f.GetVariable('$version').split(' ')[1].split(',');
		} catch(e) {};
	}
	with(this) {majorVer = Number(p[0]);minorVer = Number(p[1]);revision = Number(p[2]);beta = Number(p[3])};
};

soFlashObject.prototype.flaHtml = function() {
	if(!this.src) return false;
	if(!this.id) this.id = this.src.substring(0,this.src.indexOf('.'));
	var temp1 = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="'+this.w+'" height="'+this.h+'" id="'+this.id+'" align="middle">';
	var temp2 = '<embed width="'+this.w+'" height="'+this.h+'" name="'+this.id+'" align="middle" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"';
	temp1 += this.objParam('movie',this.src);
	temp2 += this.embParam('src',this.src);
	for(var prop in this.param) {temp1 += this.objParam(prop,this.param[prop]);temp2 += this.embParam(prop,this.param[prop])};
	temp1 += temp2 + ' /></object>';
	return temp1;
};

soFlashObject.prototype.objParam=function(a,b) {return '<param name="'+a+'" value="'+b+'" />'};
soFlashObject.prototype.embParam=function(a,b) {return ' '+a+'="'+b+'"'};
soFlashObject.prototype.enable=function() {var a = this.majorVer * 10000 + this.minorVer * 1000 + this.revision;var b = this.tgtMajorVer * 10000 + this.tgtMinorVer * 1000 + this.tgtRevision;return (a >= b)};
soFlashObject.prototype.flaWrite=function() {document.write(this.flaHtml())};
soFlashObject.prototype.altWrite=function() {document.write(this.altHtml)};
soFlashObject.prototype.write=function() {if(this.enable()) {this.flaWrite()} else {this.altWrite()}};
soFlashObject.prototype.getHtml=function() {if(this.enable()) {return this.flaHtml()} else {return this.altHtml}};

//create FlashObject
bp_path = 'http://postpet.jp/webmail/blog/';
bp_flash = new soFlashObject();
bp_flash.w = 150;
bp_flash.h = 150;
bp_flash.src = bp_path + 'clock_v1_momo.swf';
bp_flash.tgtMajorVer = 7;
bp_flash.altHtml = '<a href="http://www.macromedia.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" target="_blank"><img src="' + bp_path + 'clock_v1_alt.gif" width="150" height="150" border="0"></a>';
bp_flash.write();