function _get_id(a) {
    return document.getElementById ? document.getElementById(a) : null;
}

function _get_tag_name(a) {
    if (a == '*' || document.all) return document.all;
    return document.getElementsByTagName ? document.getElementsByTagName(a) : [];
}

function _is_index_of(a, b) {
    return a.indexOf(b) != -1 ? true : false;
}

function _is_empty(str) {
    var flg = false;
    if (str == null || str =="" || str == "undefined" || _trim(str).length == 0) flg = true;
    return flg;
}

function _to_upper(str) { return str.toUpperCase(); }

function _trim(a) {
    return a.replace(/^\s*|\s*$/g, '');
}

var id_name = {
    is_empty : 'is_emp',
    before   : 'b_list',
    after    : 'a_list',
    chkbox   : 'c_box_',
    m_tag    : 'movie_tag',
    parts    : 'parts'
};

function checkBox() {
    var f = document.all_search;
    var a = _get_id(id_name.is_empty);
    if (_is_empty(a.value)) {
        a.value = '';
        a.focus();
        return;
    } else {
        f.submit();
    }
}

function check_box() {
    var a = document.f_add.add_word;
    if (_is_empty(a.value)) {
        a.value = '';
        a.focus();
        return;
    } else {
        document.f_add.submit();
    }
}

function search_blur(obj, defval) {
    if (obj.value == "") {
        obj.value = defval;
    }

}

function search_focus(obj, defval) {
    if (obj.value == defval) {
        obj.value = "";
    }

}

function search_top(argfrm, argdomain, argdef) {
    if (argfrm.q.value == argdef) {
        return false;
    }

    var acturl = "";
    switch(argfrm.q_sel.value) {
        case "1":
            acturl = argdomain + "/combine_tag";
            break;
        case "2":
            acturl = argdomain + "/circle_tag";
            break;
        default:
           acturl = argdomain + "/combine_tag";
           break;
    }

    argfrm.action = acturl;
    argfrm.submit();
    return true;
}

function search_profile(argfrm, argdomain, argdef) {
    if (argfrm.q_dt.value == argdef) {
        if (argfrm.q_pro_sel.value == "1") {
            return false;
        }
        if (argfrm.q_pro_sel.value == "2") {
            argfrm.q_dt.value = "";
        }
    }
    var acturl = argdomain + "/profile";

    argfrm.action = acturl;
    argfrm.submit();
    return true;
}

function search_viewSet(obj, a) {
    var elem = _get_id(a);
    elem.style.display = (obj.value == 1) ? 'none' : 'block';
}

function search_q_pro_sel(obj) {
    obj.value = (obj.value == 1) ? 2 : 1;
}

function txt_enabled() {
    var a = _get_id("t_enabled");
    if (a) {
        if (a.disabled == true){
            a.style.background = "#FFFFFF";
            a.disabled = false;
        }
        else if (a.disabled == false) {
            a.style.background = "#CCCCCC";
            a.disabled = true;
        }
    }
}

function chkTextLength(obj) {
    var MAX = 255;
    var checked = true;
    if (MAX < obj.value.length) {
        var elem = _get_id("errors");
        _display_block(elem);
        elem.innerHTML = MAX + "文字以内で入力して下さい。 " + (obj.value.length - MAX) + "文字超過してます。";
        checked = false;
    }
    return checked;
}

function txt_focus(obj) {
    _txt_focus(obj);
    obj.onblur = _txt_blur;
}

function _txt_focus(obj) {
    obj.style.backgroundColor = "#FFF5EE";
}

function _txt_blur() {
    this.style.backgroundColor = "#FFF";
}

function _txt_enabled_bgcolor(obj) {
    obj.disabled = false;
    obj.style.backgroundColor = "#FFF";
}

function _txt_disabled_bgcolor(obj) {
    obj.disabled = true;
    obj.style.backgroundColor = "#EEE";
}

function changeMode(mode, islock, isCheck, act_url) {

    if (typeof isCheck != "undefined" && isCheck) {
        var checked = doCheck();
        if (!checked) {
            return false;
        }
    }
    
    var f = document.f;
    var a = mode;

    f.target = "";

    if (_is_index_of(a, "_mov")) {
        a = a.split("_")[0];
        if (a == "confirm" || a == "refresh") _add_submit_data();
    }
    if (_is_index_of(a, "_css")) {
        var css = a.split("_");
        a = css[0];
        f.cmd.value = css[2];
    }

    if (typeof act_url != "undefined") f.action = act_url;
    
    f.mode.value = a;
    
    if (typeof islock != "undefined" && islock) { screenWait(); }

    f.submit();
}

function refresh(obj) {
    var f = document.f;
    var n = obj.name;
    f.pref_name.value = n;
    f.mode.value = "refresh";
    f.submit();
}

function reload() {
    var f = document.f;
    f.mode.value = "reload";
    f.submit();
}

function up_category_id(a, b) {
    var f = document.f;
    f.mode.value = "refresh";
    f.from_member_id.value = a;
    f.category_id.value = b;
    f.action = "friend_update";
    f.submit();
}

function changeAddCategory(a) {
    var f = document.f;
    f.mode.value = "execute";
    f.type.value = a;
    f.submit();
}

function changeTheme(a) {
    var uri = document.URL;
    if (uri.indexOf("?") != -1) {
        var base = uri.split("?");
        uri = base[0];
    }
    location.href = uri + "?theme_l_id=" + a;
}

function changeTarget(argindex, argdomain) {
    var docuri = document.URL;

    var requet_uri = docuri;
    var qry_theme = "";
    if (docuri.indexOf("?") != -1) {
        var aryuri = docuri.split("?");
        requet_uri = aryuri[0];
        var query_string = aryuri[1];
        var res = query_string.match(/theme_l_id=\d+/i);
        if (res) {
            qry_theme = "?" + res[0];
        }
    }

    var range_list = "";
    var res = requet_uri.match(/_(daily|weekly|monthly|total)_list$/i);
    if (res) {
        range_list = res[0];
    }
    else {
        range_list = "_daily_list";
    }

    var changeurl = "";
    switch(argindex) {
        case 0: // マイクリップ動画(登録数)
            changeurl = argdomain + "/rank_myclip" + range_list;
            break;
        case 1: // マイページ動画(アクセス数)
            changeurl = argdomain + "/rank_view" + range_list;
            break;
        case 2: // サークル動画(アクセス数)
            changeurl = argdomain + "/rank_view_media_movie" + range_list;
            break;
        case 3: // サークルページ(アクセス数)
            changeurl = argdomain + "/rank_view_circle" + range_list;
            break;
        case 4: // マイページ投票数
            changeurl = argdomain + "/rank_rating" + range_list;
            break;
        default:
            changeurl = argdomain + "/rank_myclip" + range_list;
            break;
    }

    location.href = changeurl + qry_theme;
    return true;
}

function css_preview() {
    var f = document.f;
    var tmp_action = f.action;
    f.action = f.preview_uri.value;
    f.target = "_blank";
    f.mode.value = "preview";
    f.submit();
    f.action = tmp_action;
}

function changeImage(f) {
    var image_src = f.image.src;
    var tmp_image = image_src.split("/");
    var tmp_filename = tmp_image.pop();
    var tmp_name = tmp_filename.split("_");
    tmp_name[1] = "p2";
    tmp_image.push(tmp_name.join("_"));
    image_src = tmp_image.join("/");
    window.opener.document.f.image.src = image_src;
    window.close();
    return false;
}

function openPopupWindow(url, name, w, h) {
    var sw = window.screen.width;
    var sh = window.screen.height;
    var x = Math.floor((sw - w) / 2);
    var y = Math.floor((sh - h) / 2);
    var opt = 'width=' + w + ',height=' + h + ',top=' + y + ',left=' + x;
    window.open(url, name, opt);
}

function doUpload() {
    var url = 'member_profile_image_upload';
    var w = 400;
    var h = 370;
    openPopupWindow(url, null, w, h);
    return false;
}

var ADD_CATEGORY_MAX = 100;

function addCategory() {
    var f = document.f;
    var elem = _get_id("dellBox");
    
    _display_none(elem);
    
    var len = f.selected_category.options.length;
    
    if (ADD_CATEGORY_MAX < len) {
        _display_block(elem);
        elem.innerHTML = ADD_CATEGORY_MAX + " 件以上登録することは出来ません。分類を削除してから登録して下さい。";
        return false;
    }
    
    var open_url = 'friend_category_update?page=' + escape(f.page.value);
    var w = 400;
    var h = 490;
    openPopupWindow(open_url, null, w, h);
    return false;
}

function delCategory() {
    var f = document.f;
    var elem = _get_id("dellBox");
    
    _display_none(elem);
    
    var len = f.selected_category.options.length;
    if (len == 1) {
        _display_block(elem);
        elem.innerHTML = "友達分類が登録されていません。";
        return false;
    }
    
    var open_url = 'friend_category_delete';
    var w = 400;
    var h = 380;
    openPopupWindow(open_url, null, w, h);
    return false;
}

function selectFavoriteTags() {
    var f = document.f;
    var open_url = 'hd_theme_tag_list?theme_l_id=' + escape(f.theme_l_id.options[f.theme_l_id.selectedIndex].value);
    var w = 400;
    var h = 320;
    openPopupWindow(open_url, null, w, h);
    return false;
}

function send110(url, d_id) {
    var open_url = url + '110_diary/?diary_id=' + escape(d_id);
    var w = 400;
    var h = 250;
    openPopupWindow(open_url, null, w, h);
    return false;
}

function copyListValues() {
    var b_box = _get_id(id_name.before);
    var a_box = _get_id(id_name.after);
    if (b_box && a_box) _copy_selected(b_box, a_box);
}

function delListValues() {
    var d_box = _get_id(id_name.after);
    if (d_box) _del_selected(d_box);
}

function _add_submit_data() {
    var a_box = _get_id(id_name.after);
    if (a_box) {
        for (var idx = 0; idx < a_box.length; idx++) {
            if (!a_box.options[idx].selected) {
                 a_box.options[idx].selected = true;
            }
        }
    }
}

function _del_selected(d_box) {
    var len = d_box.length;
    for (var idx = 0; idx < len; idx++) {
        if (d_box.options[idx].selected) {
            d_box.options[idx] = null;
            idx -= 1;
            len -= 1;
        }
    }
}

function _copy_selected(b_box, a_box) {
    var a_t = new Array();
    var a_v = new Array();
    var len = b_box.length;
    for (var idx = 0; idx < len; idx++) {
        if (b_box.options[idx].selected) {
            a_t[a_t.length] = b_box.options[idx].text;
            a_v[a_v.length] = b_box.options[idx].value;
            b_box.options[idx].selected = false;
        }
    }
    _add_selected(a_box, a_t, a_v);
}

function _add_selected(a_box, a_t, a_v) {
    len = a_box.length;
    for (var idx = 0; idx < a_t.length; idx++) {
        if (_is_duplicate_box(a_box, a_v[idx])) continue;
        a_box.options[a_box.length] = new Option(a_t[idx], a_v[idx]);
    }
}

function _is_duplicate_box(box, val) {
    var flg = false;
    for (var idx = 0; idx < box.length; idx++) {
        if (box.options[idx].value == val) {
            flg = true;
            break;
        }
    }
    return flg;
}

function showhide(a) {
    var elem = _get_id(a);
    if (elem) {
        if (elem.style.display == 'block') {
            elem.style.display = 'none';
        } else {
            elem.style.display = 'block';
        }
    }
}

function _display_block(elem) {
    if (elem) elem.style.display = "block";
}

function _display_none(elem) {
    if (elem) elem.style.display = "none";
}

function changeAllbox_chk(obj) {
    var c_list = _search_check_box();
    var f = obj.checked == true ? true : false;
    _change_all_check_box(c_list, f);
}

function changeAllbox_txt(is_check) {
    var c_list = _search_check_box();
    _change_all_check_box(c_list, is_check);
}

function _search_check_box() {
    var c_list = new Array();
    for (var idx = 1;;idx++) {
        var a = _get_id(id_name.chkbox + idx);
        if (a) {
            c_list[c_list.length] = a;
        } else {
            break;
        }
    }
    return c_list;
}

function _change_all_check_box(c_list, f) {
    for (var idx = 0; idx < c_list.length; idx++) {
        if (f || !c_list[idx].checked) c_list[idx].checked = f;
        if (!f || c_list[idx].checked) c_list[idx].checked = f;
    }
}

function _enabledRadio(radio_array, is_enabled) {
    for (var idx = 0; idx < radio_array.length; idx++) {
        radio_array[idx].disabled = is_enabled;
    }
}

var MAX = 150;

function addFreeBox() {
    var a, b = "free_", c = "use_f_box", idx = 1;
    for (;;idx++) {
        a = _get_id(b + idx);
        if (a) {
            var cn;
            for (var jdx = 0; jdx < a.childNodes.length; jdx++) {
                cn = a.childNodes[jdx];
                if (
                    cn.nodeType == 1 && 
                    cn.tagName == "INPUT" && 
                    cn.getAttribute("type") == "text" &&
                    _is_empty(cn.value)
                ) {
                    cn.style.background = "#FFFF99";
                    cn.focus();
                    return false;
                } else if (
                    cn.nodeType == 1 && 
                    cn.tagName == "INPUT" && 
                    cn.getAttribute("type") == "text" &&
                    !_is_empty(cn.value)
                ) {
                    cn.style.background = "#FFFFFF";
                }
            }
            continue;
        }
        break;
    }
    
    if (MAX < idx) {
        return false;
    }
    
    a = _get_id(c);
    if (a) {
        var row_1 = a.insertRow(a.rows.length - 1);
            
        var cell_1 = row_1.insertCell(0);
        cell_1.className = "profile_left";
        cell_1.appendChild(document.createTextNode("フリー" + idx));
        
        var cell_2 = row_1.insertCell(1);
        cell_2.className = "profile_right";

        var table = document.createElement("TABLE");
        table.className = "prof_table";
        table.border = 0;
        table.cellpadding = 0;
        table.cellspacing = 0;
        
        var row_2 = table.insertRow(table.rows.length);
        
        var cell_3 = row_2.insertCell(0);
        cell_3.id = b + idx;
        cell_3.innerHTML = '項目名&nbsp;<input type="text" name="fkey' + idx + '" value="" size="15" >&nbsp;&nbsp;' +
                           '内容&nbsp;<input type="text" name="fval' + idx + '" value="" size="40" />';
        
        cell_2.appendChild(table);
        
        a = _get_id("fkey" + idx);
        a.focus();
    }
}

var SELECTED_MAX = 6;
var tag_count = 0;

function getTagsCount() {
    var tag_name = 'tag_name';
    var tag_value = '';
    for (var idx = 1; idx <= SELECTED_MAX; idx++) {
        tag_value = eval('window.opener.document.f.' + tag_name + idx).value;
        if (!_is_empty(tag_value)) tag_count++;
    }
}

function selectedTagNames() {
    var tag_id = 'f_tag_';
    var tags_nm = new Array();
    for (var idx = 1;; idx++) {
        var elem = _get_id(tag_id + idx);
        if (elem) {
            if (elem.checked == true) {
                tags_nm.push(elem.value);
            }
        }
        else {
            break;
        }
    }

    if (_chk_selected_count(tags_nm)) return false;
    
    var tag_name = 'tag_name';
    var tag_value = '';
    for (var idx = 0; idx < tags_nm.length; idx++) {
        if (_dup_tag_name(tags_nm[idx])) continue;
        for (var jdx = 1; jdx <= SELECTED_MAX; jdx++) {
            tag_value = eval('window.opener.document.f.' + tag_name + jdx);
            if (_is_empty(tag_value.value)) {
                tag_value.value = tags_nm[idx];
                break;
            }
        }
    }
    window.close();
}

function _chk_selected_count(tags_nm) {
    var flg = false;
    if ((SELECTED_MAX - tag_count) < tags_nm.length) {
        var hid_mes = _get_id('h_mes');
        if (hid_mes) {
            hid_mes.style.display = '';
        }
        flg = true;
    }
    return flg;
}

function _dup_tag_name(val) {
    var flg = false;
    var tag_name = 'tag_name';
    var tag_value;
    for (var idx = 1; idx <= SELECTED_MAX; idx++) {
        tag_value = eval('window.opener.document.f.' + tag_name + idx);
        if (tag_value.value == val) {
            flg = true;
            break;
        }
    }
    return flg;
}

function deleteFriendCategory() {   
    var judge = false;
    for (var i = 1;; i++) {
        var elem = _get_id(id_name.chkbox + i);
        if (elem) {
            if (elem.checked) {
                judge = true;
                break;
            }
        } else {
            break;
        }
    }
    if (!judge) {
        var mes_area = _get_id("h_mes");
        var success = _get_id("success");
        if (mes_area) {
            mes_area.style.display = "block";
            if (success)
                success.style.display = "none";
            return false;
        }
    }
    changeMode("execute");
}

var change_style = {
    out  : function() {this.className = "j_def_button"},
    over : function() {this.className = "j_mouseover"},
    down : function() {this.className = "j_mousedown"},
    up   : function() {change_style.out}
};

function rollover(obj) {
    obj.className   = "j_def_button j_mouseover";
    obj.onmouseout  = change_style.out;
    obj.onmousedown = change_style.down;
    obj.onmouseup   = change_style.up;
}

var change_style_m = {
    out  : function() {this.className = "m_def_button"},
    over : function() {this.className = "m_mouseover"},
    down : function() {this.className = "m_mousedown"},
    up   : function() {change_style_m.out}
};

function rollover_m(obj) {
    obj.className   = "m_def_button m_mouseover";
    obj.onmouseout  = change_style_m.out;
    obj.onmousedown = change_style_m.down;
    obj.onmouseup   = change_style_m.up;
}

function sort_order(a) {
    var f = document.f;
    if (f.sort_order) f.sort_order.value = ((typeof a != "undefined") ? a : "");
    else if (f.p_so) f.p_so.value = typeof a != "undefined" ? a : "";
    changeMode('main');
}

function show_all_comment() {
    var f = document.f;
    f.sort_order.value = "";
    f.diary_id.value = "";
    f.word.value = "";
    f.keyword.value = "";
    changeMode('main');
}

function show_select_diary(a) {
    var f = document.f;
    a == "mov" ? f.p_mov.value = 1 : f.p_mov.value="";
    changeMode('main');
}

function enabledTextBox() {
    var f = document.f;
    if (f.movie_type[0].checked == true) {
        _txt_enabled_bgcolor(f.movie);
        _txt_disabled_bgcolor(f.objplayer);
        _txt_disabled_bgcolor(f.circle_id);
        if (f.public_type.value == 1) {
            _enabledRadio(f.is_tagpaste, false);
            if (f.is_tagpaste[0].checked) {
                _txt_enabled_bgcolor(f.circle_id);
            }
            else if (!f.is_tagpaste[1].checked) {
                f.is_tagpaste[0].checked = true;
            }
        }
    }
    else if (f.movie_type[1].checked == true) {
        _txt_enabled_bgcolor(f.objplayer);
        _txt_disabled_bgcolor(f.movie);
        _txt_disabled_bgcolor(f.circle_id);
        _enabledRadio(f.is_tagpaste, true);
        f.objplayer.focus();
    }
}
