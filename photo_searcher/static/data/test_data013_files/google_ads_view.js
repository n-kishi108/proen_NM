var getCssProperty = function (targetObj, cssProperty) {
    try {
        if (targetObj.currentStyle) {
            return targetObj.currentStyle[cssProperty];
        } else {
            var style = document.defaultView.getComputedStyle(targetObj, null);
            return style.getPropertyValue(cssProperty);
        }
    } catch (e) {
        return '';
    }
}

var getCssStyle = function (selector, cssProperty) {
    var allCssStyle = document.styleSheets[0].rules || document.styleSheets[0].cssRules;

    for (var i = 0; i < allCssStyle.length; i++) {
        cssStyle = allCssStyle[i];
        if (cssStyle.selectorText.toLowerCase() == selector.toLowerCase()) {
            return cssStyle.style[cssProperty];
        }
    }
}

var onMouseOverBGColor = '';

function setG_AdsBGColor_IE (divId) {
    if (!divId) {
        divId = 'googleAdsDiv';
    }
    var google_ads_div = document.getElementById(divId);
    if (!google_ads_div) {
        return;
    }

    var base_ground_color = getCssProperty(document.getElementById('content-center'), 'backgroundColor');
    google_ads_div.style.backgroundColor = base_ground_color;

    var b_color = getCssProperty(google_ads_div.parentNode, 'borderBottomColor');
    var b_width = getCssProperty(google_ads_div.parentNode, 'borderBottomWidth');
    var b_style = getCssProperty(google_ads_div.parentNode, 'borderBottomStyle');

    google_ads_div.parentNode.style.borderColor = b_color;
    google_ads_div.parentNode.style.borderWidth = b_width;
    google_ads_div.parentNode.style.borderStyle = b_style;

    onMouseOverBGColor = getCssStyle("#content-center h4", 'backgroundColor');
}

function setG_AdsBGColor_Moz (divId) {
    if (!divId) {
        divId = 'googleAdsDiv';
    }
    var google_ads_div = document.getElementById(divId);
    if (!google_ads_div) {
        return;
    }

    var base_ground_color = getCssProperty(document.getElementById('content-center'), 'background-color');
    google_ads_div.style.backgroundColor = base_ground_color;

    var b_color = getCssProperty(google_ads_div.parentNode, 'border-bottom-color');
    var b_width = getCssProperty(google_ads_div.parentNode, 'border-bottom-width');
    var b_style = getCssProperty(google_ads_div.parentNode, 'border-bottom-style');

    google_ads_div.parentNode.style.borderColor = b_color;
    google_ads_div.parentNode.style.borderWidth = b_width;
    google_ads_div.parentNode.style.borderStyle = b_style;

    onMouseOverBGColor = getCssStyle("#content-center h4", 'backgroundColor');
}

function setBGColorOnMouseOver (obj) {
    obj.style.backgroundColor = onMouseOverBGColor;
}

if (window.addEventListener) {
    window.addEventListener("load", function() { setG_AdsBGColor_Moz('googleAdsDiv'); }, true);
} else if (window.attachEvent) {
    window.attachEvent("onload", function() { setG_AdsBGColor_IE('googleAdsDiv'); }, true);
}
