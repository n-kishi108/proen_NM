function sbm(){	
	var url;
	var hatena_sbm;
	var bookmark_sbm;
	var livedoor_sbm;
	var twitter_sbm;
	var hatenauser_sbm;
	var name_title;
	this.do_sbm();

}
//ソーシャルブックマークへ追加
sbm.prototype = {
	do_sbm:function() {
		this.url = window.document.URL; // URLの取得
		this.name_title = document.title;
	
	//エレメントをidで取得
	//ページのURLを各ブックマークへパラメータとして渡す
		this.hatena_sbm = document.getElementById('hatena_sbm');
		this.hatenauser_sbm = document.getElementById('hatenauser_sbm');
		this.bookmark_sbm = document.getElementById('bookmark_sbm');
		this.livedoor_sbm = document.getElementById('livedoor_sbm');
		this.twitter_sbm = document.getElementById('twitter_sbm');
		this.name_title = $(".NewsTitle").text();
		
		//ページのURLを各ブックマークへパラメータとして渡す
		this.hatena_sbm.href = 'http://b.hatena.ne.jp/append?' + this.url;
		this.bookmark_sbm.href = 'http://news.ecnavi.jp/config/add/confirm?url=' + this.url;
		this.livedoor_sbm.href = 'http://clip.livedoor.com/clip/add?link=' + this.url + '&title=' + escape(this.name_title) + '&jump=myclip';
		this.twitter_sbm.href = 'javascript:_twitteradd();';
		try{
			this.hatenauser_sbm.src  = 'http://b.hatena.ne.jp/entry/image/' + this.url;
		}catch(e){
		}
		
		
	}
}

if(window.addEventListener) {
	window.addEventListener("load", function(){new sbm();}, false);
}else if (window.attachEvent) {
	window.attachEvent("onload", function(){new sbm();});
}

//みんなのトピックス
var this_url = window.document.URL; // URLの取得
var this_ttl = document.title;  // タイトルの取得


function _twitteradd() {
    var xfgd  = 'mainichijpedit';
    var fdsr = 'R_48d0d6ad6a202cacf54aebc96460e4c0';
    api = 'http://api.bit.ly/shorten' + '?version=2.0.1' + '&format=json' + '&callback=Callback' + '&login=' + xfgd + '&apiKey=' + fdsr + '&longUrl=';        
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = api + encodeURIComponent(location.href) ;
    document.body.appendChild(script);
}

function Callback(json) {
	this.name_title = $(".NewsTitle").text();
    var _url = 'http://twitter.com/home/?status=%e3%80%90%e6%af%8e%e6%97%a5%ef%bd%8a%ef%bd%90%e3%80%91' + encodeURIComponent( name_title+' '+json.results[location.href]['shortUrl']);
        location.href = _url;
}