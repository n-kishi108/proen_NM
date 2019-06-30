this.maxWidth  = new Array("320", "160", "320");
this.maxHeight = new Array("240", "160", "320");

resizeImgObjects = new Array();
dummyImgObjects  = new Array();

function imgResize(type,img){
    var uAgent  = navigator.userAgent;
    dummyImgObj = new Image();
    dummyImgObj.src = img.src;

    if (navigator.appName == 'Microsoft Internet Explorer' &&  parseInt(navigator.appVersion) >= 4) {
        var index = "img_" + new Date().getTime() + new Date().getMilliseconds();
        var rdm = new String(Math.random());
        index += rdm.substr(2, 4);

        resizeImgObjects[index] = img;
        dummyImgObjects[index]  = dummyImgObj;

        resizeFuncName = "_imgResizeForIE(" + type + ", '" + index + "');";
        setTimeout(resizeFuncName, 800);
    } else {
        img.width  = img.naturalWidth;
        img.height = img.naturalHeight;

        _imgResize(type,img);
    }
}
function _imgResizeForIE(type, index) {
    imgObj   = resizeImgObjects[index];
    dummyObj = dummyImgObjects[index];

    if (imgObj.complete) {
        imgObj.width  = dummyObj.width;
        imgObj.height = dummyObj.height;
        _imgResize(type, imgObj);
    } else {
        imgObj.width  = this.maxWidth[type];
        imgObj.height = this.maxHeight[type];
    }
}
function _imgResize(type,img) {
    var max_w = this.maxWidth[type];
    var max_h = this.maxHeight[type];
    var w = 0;
    var h = 0;
    var ratio = 0;

    w = img.width;
    h = img.height;

    if(w>h){
        if(w>max_w){
            ratio = max_w / w;
            w = w * ratio;
            h = h * ratio;
        }
        if(h > max_h){
            ratio = max_h / h;
            h = h * ratio;
            w = w * ratio;
        }
    }else{
        if (h > max_h) {
            ratio = max_h / h;
            h = h * ratio;
            w = w * ratio;
        }
        if (w > max_w) {
            ratio = max_w / w;
            w = w * ratio;
            h = h * ratio;
        }
    }
    img.width  = w;
    img.height = h;
}
