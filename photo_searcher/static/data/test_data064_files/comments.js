var hasChanged = 0;
var hasInited = 0;
var hostName = '.cocolog-nifty.com';

function validateEmail(s) {
    for (i=0; i<s.length; i++) {
        if(escape(s.charAt(i)).length > 3) {
            return false;
	}
    }
    return s.match(/^[\w.\?\/\&\+\#-]+@[\w-]+\.[\w.-]+$/);
}

function validateCommentForms (f, is_layer) {

    var e = is_layer ? f.form : f;

    if ((typeof(blogConfig) != 'undefined') &&
        blogConfig && (blogConfig["disallow_anon_comments"] == "0")) {
        if (!e.author.value || !e.email.value) {
            alert("名前とメールアドレスの入力は必須です。\n正しく入力後、再投稿してください。");
            return false;
        }
    }
    if (e.email.value && !validateEmail(e.email.value)) {
        alert('メールアドレスを正しく入力してください。');
        return false;
    }
    return true;
}

function appendConfigJS() {
    var blogURL = document.getElementsByTagName('h1')[0].getElementsByTagName('a')[0].href;
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = blogURL + '.config.js';
    document.documentElement.appendChild(script);
}

function setCookie (name, value, expires) {
    document.cookie = name + '=' + escape(value) + '; expires=' + expires.toGMTString() + '; domain=' + hostName + '; path=/';
}

function getCookie (name) {
    var key = name + '=';
    var c = document.cookie;
    var i = c.indexOf(key);
    if (i < 0) return '';
    var j = c.indexOf(';', i + key.length);
    if (j < 0) j = c.length;
    return unescape(c.substring(i + key.length, j));
}

function deleteCookie (name) {
    if (getCookie(name))
        setCookie(name, '', new Date(70, 0, 1, 0, 0, 1));
}

function rememberMe (f) {
    var now = new Date();
    now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000);
    if( f.author )
    	setCookie('typepadauthor', f.author.value, now);
    if( f.email )
    	setCookie('typepademail', f.email.value, now);
    if( f.url )
    	setCookie('typepadurl', f.url.value, now);
}

function forgetMe () {
    deleteCookie('typepadauthor');
    deleteCookie('typepademail');
    deleteCookie('typepadurl');
}

function setFormValues (f) {
    var val = getCookie("typepadauthor");
    if( f.author && !f.author.value && val)
    	f.author.value = val;
    val = getCookie("typepademail");
    if( f.email && !f.email.value && val)
    	f.email.value = val;
    val = getCookie("typepadurl");
    if( f.url && !f.url.value && val)
    	f.url.value = val;

    if ((!hasInited) && (typeof(blogConfig) != 'undefined') &&
        blogConfig ) {
        var labels = document.getElementsByTagName("label");
        for (var i = 0; i < labels.length; i++) {
            var attrFor;
            if (navigator.appName.toUpperCase().indexOf("MICROSOFT") >= 0) {
                var attr = labels[i].attributes['for'];
		if (!attr) continue;
                attrFor = attr.nodeValue;
            } else {
                attrFor = labels[i].getAttribute("for");
            }
            if (!attrFor) continue;
            if (attrFor.match("author|email")) {
                if (blogConfig["disallow_anon_comments"] == "0") {
                  labels[i].innerHTML += "(必須)";
                } else {
                  labels[i].innerHTML += "(任意)";
                }
            }
            else if (attrFor.match("url")) {
                labels[i].innerHTML += "(任意)";
            }
        }
        hasInited = 1;
    }
}

function unsetFormValues (f) {
    f.author.value = '';
    f.email.value = '';
    f.url.value = '';
}

function handleSubmit (f) {
    if (!validateCommentForms(f))
        return false;

    if (f.bakecookie && f.bakecookie.checked)
        rememberMe(f);
    else
        forgetMe();
}

function handleSubmitEvent( evt )
{
	evt = evt || event;
	var f = document.getElementById( "comment-form" ) ||
		document.comment_form || document.comments_form;
	return handleSubmit( f );
}

function handleCheck (e) {
    if (hasChanged) return;
    if (e.checked)
        setFormValues(e.form);
    else
        unsetFormValues(e.form);
}

function handleChange (e) {
    hasChanged = 1;
}

function doLoaded () {
    appendConfigJS();
	var f = document.getElementById( "comment-form" ) ||
		document.comment_form || document.comments_form;
    if( !f )
   		return;
   	f.onsubmit = handleSubmitEvent;
    setFormValues( f );
	if( f.author && f.author.value && f.bakecookie )
		f.bakecookie.checked = 1;

    var cnt = 0;
    var intervalId = setInterval(function () {
        if (typeof(blogConfig) != 'undefined') {
            setFormValues(f);
            clearInterval(intervalId);
        }
        if (cnt == 20) {
            clearInterval(intervalId);
        }
        cnt++;
    }, 100);
}
onload = doLoaded;

var theForm;
var requestSubmitted = false;
function disableButton (e) {
    if (!validateCommentForms(e, true))
        return false;

    if (!requestSubmitted) {
        e.disabled = true;
        theForm = e.form;
        requestSubmitted = true;
        setTimeout('submitIt()', 250);
    } else {
        return false;
    }
}

function submitIt () {
    // make sure we're posting
    if (theForm.bakecookie) handleSubmit(theForm);
    theForm.submit();
    return false;
}


/* comment registration */	
var showHideElements =
{
	"comments-open-login" : "none",
	"comments-open-logout" : "block",
	"comments-open-data" : "none",
	"comments-open-text" : "block",
	"comments-open-footer" : "block"
};

function commentSignIn()
{
	if( typeof commenterName == "undefined" || !commenterName )
		return;
	
	// insert name
	var e = document.getElementById( "commenter-name" );
	if( e )
		e.innerHTML = commenterName;
	
	// hide/show various elements
	for( var i in showHideElements )
	{
		e = document.getElementById( i );
		if( e )
			e.style.display = showHideElements[ i ];
	}
}

/* Loading maintenace mode settings */
if (typeof(serviceStatus) == 'undefined') {
    document.write('<script type="text/javascript" src="/.shared-pleasy/js/service_status.js"></script>');
    document.write('<script type="text/javascript" src="/.shared-pleasy/js/maintenance.js"></script>');
}
