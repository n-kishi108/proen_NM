/**
 * 広告設置
 */
function makeScript(){
    var script_obj = document.createElement('script');
    var myprotocol = location.protocol;
    script_obj.src = myprotocol + '//plaza.rakuten.co.jp/opt/calendar/ad_calendar_parts_list.js?' + new Date().getTime(); 
    document.body.appendChild(script_obj);
}

/**
 * 設定js読込
 */
function jsonFeedAdCalendar(json_data){
    var urls        = new Array();
    var imgs        = new Array();
    var img_widths  = new Array();
    var img_heights = new Array();
    var jsoncnt     = 0;
    var url         = "";
    var img         = "";
    var img_width   = "";
    var img_height  = "";
    var randomIndex = 0;
    var index       = 0;

    // データが存在しない場合
    if(isNaN(json_data.length) == true || json_data.length == 0) {
        //広告設定無し
        return;
    }

    // 全件読み込んで配列に格納
    for (index=0; index < json_data.length; index++) {
        if( false == isNaN(parseInt(index))  ) {
            urls[index] = json_data[index]["url"];
            imgs[index] = json_data[index]["img"];
            img_widths[index]  = json_data[index]["img_width"];
            img_heights[index] = json_data[index]["img_height"];
            jsoncnt++;
        }
    }

    // ランダムで広告を取得
    randomIndex = Math.floor(Math.random() * jsoncnt);
    url  = urls[randomIndex];
    img  = imgs[randomIndex];
    img_width  = img_widths[randomIndex];
    img_height = img_heights[randomIndex];

    // 取得した項目をタグに設定
    var calendar_link = document.getElementById("calendar_link");

    // aタグ要素作成(リンク)
    var element = document.createElement('a');
    element.href = url;
    element.target = "_blank";

    // imgタグ要素作成(広告画像)
    var element2 = document.createElement('img');
    element2.src = 'http://plaza.rakuten.co.jp/img/calendar/' + img;
    element2.width  = img_width;
    element2.height = img_height;

    // 画像の表示を補正
    element2.style.borderStyle = "none";
    element2.style.verticalAlign  = 'bottom';

    // 作成したタグをcalendar_linkに設定
    calendar_link.appendChild(element);
    element.appendChild(element2);

    // 画像の表示位置を補正するために上下に空白を設定
    calendar_link.style.paddingTop     = '10px';
    calendar_link.style.paddingBottom  = '9px';

}

// JavaScripをonload時に実行させる
if (window.attachEvent) {
    window.attachEvent("onload", makeScript, true);
} else if (window.addEventListener) {
    window.addEventListener("load", makeScript, true);
}
