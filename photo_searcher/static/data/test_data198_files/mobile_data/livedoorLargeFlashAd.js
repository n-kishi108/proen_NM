var _livedoorLargeFlashAdHighSpeed;
function LiveDoorLargeFlashAd() {
    this.initialize.apply(this, arguments);
}

LiveDoorLargeFlashAd.prototype = {
    initialize: function(args) {
        this.flashName   = args.flashName;
        this.altImgName  = args.altImgName;
        this.minFlashVer = args.minFlashVer || 5;
        this.width    = args.width || 300;
        this.height   = args.height || 250;
        this.clickTAG = args.clickTAG; 
        this.gifclickTAG = args.gifclickTAG;
        var random_string = Math.random().toString(36).slice(2);
        this.adAreaId = 'ld_ad_area_' + random_string;
        this.imageAreaId = 'ld_ad_img_area_' + random_string;
        this.imageId     = 'ld_ad_img_' + random_string;
        this.flashAreaId = 'ld_ad_flash_area_' + random_string;
    },

    drawAdArea : function() {
        document.write('<div id="' + this.adAreaId + '" style="width:' + this.width + 'px;height:' + this.height + 'px;padding:0px;margin:0px;">');
        document.write(
                     '<div id="' + this.imageAreaId + '" style="width:' + this.width + 'px;height:' + this.height + 'px;padding:0px;margin:0px;display:none;">'
                   + '<a href="'+this.gifclickTAG+'" target="_new">'
                   + '<img id="' + this.imageId + '" alt="" width='+this.width+' height='+this.height+' border="0"></a>'
                   + '</div>'
              ); 
        document.write(
                     '<div id="' + this.flashAreaId + '" style="width:' + this.width + 'px;height:' + this.height + 'px;padding:0px;margin:0px;display:none">'
                   + '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
                   + ' codebase="http://fpdownload.adobe.com/pub/shockwave/cabs/flash/swflash.cab#version=' + this.minFlashVer + ',0,0,0"'
                   + ' id="movie" width="'+this.width+'" height="'+ this.height+'" style="margin:0;padding:0;">'
                   + '<param name="movie" value="'+this.flashName+'?clickTAG='+this.clickTAG+'"><param name="quality" value="high"><param name="wmode" value="transparent">'
                   + '<embed src="'+this.flashName+'?clickTAG='+this.clickTAG+'" quality="high"'
                   + ' swLiveConnect="false" width="'+this.width+'" height="' + this.height + '"'
                   + ' TYPE="application/x-shockwave-flash" pluginspage="http://www.adobe.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">'
                   + '</embed>'
                   + '</object>'
                   + '</div>'
              );
        document.write('</div>');
    },

    showAd : function() {
        var obj = this;
        obj._showAdWithCheckLineSpeed();
    },

    _showAdWithCheckLineSpeed : function() {
        if ( _livedoorLargeFlashAdHighSpeed != undefined ) {
            this._displayAd();
            return;
        }
        var start_time;
        var narrowband = 64 * 1024 ;
        var img_size = 2711;
        var img_name = 'http://image.click.livedoor.com/js/measuring_img/' + img_size  + 'k.gif?r=' + Math.random().toString(36).slice(2) ;
        var img = new Image();
        var obj = this;
        img.onload = function() {
            var end_time = new Date().getTime();
            loading_time = ( ( ( end_time - start_time ) / 2 )  / 1000 ) || 0.001 ;
            var line_speed = Math.round( img_size * 8   /  loading_time ) ;
            if ( line_speed > narrowband ) {
                _livedoorLargeFlashAdHighSpeed = 1;
                obj._displayAd();
            } else {
                _livedoorLargeFlashAdHighSpeed = 0;
                obj._displayAd();
            }
        };
        start_time = new Date().getTime();
        img.src = img_name;
    },

    _displayAd : function () {
        if ( _livedoorLargeFlashAdHighSpeed ) {
            var ad = document.getElementById(this.flashAreaId);
            ad.style.display = "block";
        } else {
            var img = document.getElementById(this.imageId);
            img.src= this.altImgName;
            var ad = document.getElementById(this.imageAreaId);
            ad.style.display = "block";
        }
    }, 

    _checkFlashPluginVersion : function() {
        var plugin = 0 ;
        if (navigator.mimeTypes
            && navigator.mimeTypes["application/x-shockwave-flash"]
            && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
            if (navigator.plugins && navigator.plugins["Shockwave Flash"])
                pos = navigator.plugins["Shockwave Flash"].description.indexOf("Shockwave Flash");
            pos += 16;
            var swver = navigator.plugins["Shockwave Flash"].description.substr(pos,1);
            var swver = ( navigator.plugins["Shockwave Flash"].description.substr(pos) ).split('.')[0];
            if ( swver >= this.minFlashVer ) plugin = 1;
        } else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0
            && (navigator.userAgent.indexOf("Windows")>=0)) {
            try {
                var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + this.minFlashVer );
                plugin = 1;
            } catch(e) {
                plugin = 0;
            }
        }
        return plugin;
    }
}

function livedoorLargeFlashAdShowAd( args ) {
    var ad =  new LiveDoorLargeFlashAd( args );
    ad.drawAdArea();
    ad.showAd();
}

