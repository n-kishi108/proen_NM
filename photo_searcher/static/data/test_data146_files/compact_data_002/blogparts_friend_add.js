var profileFriendAdd = function (l_id, elm_id) {
    this.l_id = l_id;
    this.elm = document.getElementById(elm_id);
    if (!this.elm)
        return;
    var obj = this;
    this.elm.onclick = function () { obj.addFriend(); };
};
profileFriendAdd.prototype = {
    addFriend : function () {
        var api_url = "/internal_api/friend/add?"+this.queryString({
            target_id : this.l_id, rkey : rkey, uniq : Math.random().toString(36).slice(2)
        });
        this.callJSONP(api_url, function (json) {
            if ( json.status == "success" )
                alert("お気に入りに追加しました。");
            else {
                if (json.error == "friend.already_linked")
                    alert("既に登録されています。");
                else if (json.error == "login.not_login")
                    alert("ログインしてください。");
                else if (json.error == "login.profile_not_registered")
                    alert("プロフィールの作成が必要です。");
                else
                    alert("追加に失敗しました。");
            }
        });
    },
    callJSONP : function (api_url, cb_func) {
        var uniq_name = "profile_friendadd_callback_" + Math.random().toString(36).slice(2);
        var scr = document.createElement("script");
        scr.type = "text/javascript";
        scr.charset = "utf-8";
        scr.src = api_url + '&callback=' + uniq_name;
        scr.id = uniq_name;
        var obj = this;
        window[uniq_name] = function (json) {
            cb_func(json);
            var u_name = uniq_name;
            var obj2 = obj;
            setTimeout(function() {
                obj2.head.removeChild(document.getElementById(u_name));
                try{
                    window[u_name] = null;
                    delete window[u_name];
                } catch (e) {};
            }, 200);
        };
        obj.head = document.getElementsByTagName("head").item(0);
        setTimeout(function(){ obj.head.appendChild(scr); }, 100);
    },
    queryString : function (q) {
        var res = [];
        for (var i in q)
            res.push(i + "=" + encodeURIComponent(q[i]));
        return res.join("&");
    }
};
