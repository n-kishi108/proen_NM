var version = deconcept.SWFObjectUtil.getPlayerVersion();

function chkFlashVer(fv) {
	var chk_version = new Array(3);
	chk_version['major'] = 9;
	chk_version['minor'] = 0;
	chk_version['rev'] = 115;

	if(fv.major >= 10) return true;
	if(chk_version.major > fv.major) return false;
	if(chk_version.minor > fv.minor) return false;
	if(chk_version.rev > fv.rev) return false;
	return true;
}
