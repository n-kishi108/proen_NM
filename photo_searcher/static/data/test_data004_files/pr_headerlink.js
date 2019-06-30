/**
 * headerlink広告
 */
function makeScript(){
    var script_obj = document.createElement('script');
    var myprotocol = location.protocol;
    script_obj.src = myprotocol + '//plaza.rakuten.co.jp/opt/pr/headerlink.js?' + new Date().getTime();
    document.body.appendChild(script_obj);
}

function jsonFeed(json_data){
    var urls    = new Array();
    var words   = new Array();
    var jsoncnt = 0;
    var url     = "";
    var word    = "";
    var randomIndex = 0;
    var index=0;
    if(isNaN(json_data.length) == false) {
        for (index=0; index < json_data.length; index++) {
            if( false == isNaN(parseInt(index))  ) {
                urls[index]  = json_data[index]["url"];
                words[index] = json_data[index]["word"];
                jsoncnt++;
            }
        } 

        randomIndex = Math.floor(Math.random() * jsoncnt);

        url  = urls[randomIndex];
        word = words[randomIndex];
    } else {
        url = json_data["url"];
        word = json_data["word"];
    }
    var headerlink_word = document.getElementById("headerlink_word");

    var element = document.createElement('a');
    element.href = url;
    element.target = "_blank";

    headerlink_word.appendChild(element);
    element.appendChild(document.createTextNode(word));
}

/* JavaScripをonload時に実行させる */
if (window.attachEvent) {
    window.attachEvent("onload", makeScript, true);
} else if (window.addEventListener) {
    window.addEventListener("load", makeScript, true);
}
