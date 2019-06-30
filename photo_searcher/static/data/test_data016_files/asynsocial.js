
if( $("#hatena").length == 0 ){
	
longUrl = "http://journal.mycom.co.jp" + window["canoBase"];

var sbkmk = '<li id="hatena"><a href="http://b.hatena.ne.jp/entry/' + longUrl + '" title="このエントリーを含むはてなブックマーク"><img src="/images/b_entry.gif" width="16" height="12" style="border:0" alt="このエントリーを含むはてなブックマーク"></a><img src="http://b.hatena.ne.jp/entry/image/' + longUrl + '" alt=""></li>';

sbkmk += '<li id="yahoo"><a href="javascript:void window.open(';
sbkmk += "'http://bookmarks.yahoo.co.jp/bookmarklet/showpopup?t='+encodeURIComponent(document.title)+'&u='+encodeURIComponent(longUrl)+'&opener=bm&ei=UTF-8','popup','width=550px,height=480px,status=1,location=0,resizable=1,scrollbars=0,left=100,top=50',0);";
sbkmk += '"><img src="http://i.yimg.jp/images/sicons/ybm16.gif" width="16" height="16" alt="Yahoo!ブックマークに登録"></a></li>';

sbkmk += '<li id="livedoor"><a href="http://clip.livedoor.com/redirect?link=' + longUrl + '&title=' + document.title + '&ie=sjis" class="ldclip-redirect" title="この記事をクリップ！"><img src="http://parts.blog.livedoor.jp/img/cmn/clip_16_12_w.gif" width="16" height="12" alt="この記事をクリップ！"></a></li>';
sbkmk += '<li id="buzzurl"><a href="http://buzzurl.jp/entry/' + longUrl + '" title="Buzzurlにブックマーク" target="_blank"><img src="http://buzzurl.jp/static/image/api/icon/add_icon_mini_10.gif" alt="Buzzurlにブックマーク" style="border:0"></a><a href="http://buzzurl.jp/entry/' + longUrl + '" title="Buzzurlにブックマーク" target="_blank"></a></li>';

if( $("#twiticon").length == 0 ){
  sbkmk += '<li id="twiticon" style="cursor:pointer;font-size:70%;color:#555"><img title="記事についてつぶやく" style="border:0" alt="" src="/images/common/icon_twitter2.png" ></li>';
}

sbkmk += '<li id="mj-tensai">' + '<a href="http://api.journal.mycom.co.jp/tensai/tensaiUI.html?uri=';
sbkmk += htmlspecialchars(longUrl);
sbkmk += '" onclick="m_win(this.href,null,630,700); return false;">';
sbkmk += '<img title="この記事をブログに転載する" style="border:0" alt="この記事をブログに転載する" src="http://api.journal.mycom.co.jp/tensai/tensai-mini.gif" >' + "</a></li>";

$("#socialBookmarkList").append(sbkmk);

}

$(function(){
    $(document).cheatCode({
        code : '37,39,84,87',
        message : 'Left,Right,t,w',
        activated : function(){
            if( $.cookie("mjtwit") == "dbl" ){
                $.cookie("mjtwit",null,{ expires: 360 ,path: '/'});
                dblmode = "false";
                alert('mj-twitter DoubleClickMode OFF!');
            }else{
                $.cookie("mjtwit","dbl",{ expires: 360 ,path: '/'});
                dblmode = "true";
                alert('mj-twitter DoubleClickMode ON!');
                $("#mjtwit").css("display","block");
            }
        }
    });
});
