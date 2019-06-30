// Copyright (c) 2004-2007 koikikukan All Rights Reserved.
// http://www.koikikukan.com/
// License is granted if and only if this entire
// copyright notice is included. By Yujiro ARAKI.

// Ver1.00 initial version.
// Ver2.00 add the state maintenance function by cookie.
// Ver3.00 improve cookie processing.
// Ver3.01 corresponds to Mac+IE.
// Ver4.00 2005.03.31 add link display by block.
// Ver5.00 2005.08.22 add Ajax library.
// Ver5.01 2005.08.27 add flag of Ajax selection for subcategory.
// Ver6.00 2006.07.10 add archives.
// Ver6.01 2006.08.22 corresponds to image.
// Ver6.02 2006.11.26 fix bug(corresponds to image).
// Ver6.03 2007.01.30 add option to apply the anchor to year and improvement of performance.
// Ver7.00 2007.04.27 add function to stateless hold.

function deleteValue(name, nameEQ) {
    var ca = document.cookie.split(';');
    var newData = new Array();

    // Repeat by cookie
    for(var i = 0, len = ca.length; i < len; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {

            // Delete the corresponding name.
            var data = c.substring(nameEQ.length,c.length);
            var list = data.split('|');
            for(var x = 0; x < list.length; x++) {
                if (list[x] != name) {

                    // corresponds to Mac+IE
                    newData[newData.length] = list[x];
                }
            }
            return newData.join('|');
        }
    }

    // Return empty when cookie does not exist.
    return '';
}

function hasName(name, nameEQ) {
    var ca = document.cookie.split(';');
    for(var i = 0, len = ca.length; i < len; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            var data = c.substring(nameEQ.length,c.length);
            var list = data.split('|');
            for(var x = 0, len2 = list.length; x < len2; x++) {
                if (list[x] == name) {
                    return true;
                }
            }
            return false;
        }
    }
}

function createCookieByValue(name, onoff, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    } else {
        expires = "";
    }

    // Once delete a name from cookie.
    var newOnData = deleteValue(name, 'sidebarMenuOn=');
    var newOffData = deleteValue(name, 'sidebarMenuOff=');

    // Set up a name as new data.
    if (onoff == 'on') {
        if (newOnData != '') {
            newOnData += '|' + name;
        } else {
            newOnData = name;
        }
    } else {
        if (newOffData != '') {
            newOffData += '|' + name;
        } else {
            newOffData = name;
        }
    }

    // Save cookie.
    document.cookie = "sidebarMenuOn=" + newOnData + expires + "; path=/";
    document.cookie = "sidebarMenuOff=" + newOffData + expires + "; path=/";
}

function readCookieByValue(name) {

    // Search a menu.
    // Return empty if there is nothing to both.
    if (hasName(name, 'sidebarMenuOn=')) {
        return 'on';
    }
    if (hasName(name, 'sidebarMenuOff=')) {
        return 'off';
    }
    return null;
}

// リスト数取得
function getListCount(objLists, viewNum, idName, linkNumber, trackbackNumber, rightMarkForListNumber, subCategoryCount, leftMarkForListNumber, countTag, offsetValue) {

    var objItems;
    var href;
    var commentCounter = 0;

    // サブカテゴリーリスト
    if (subCategoryCount && (idName.indexOf('subcategories') == 0)) {
        objItems = objLists.getElementsByTagName('li');

    // 指定されたタグを使用
    } else if (countTag == 'li') {
        objItems = objLists.getElementsByTagName(countTag);

    // その他(aタグ)
    } else {
        objItems = objLists.getElementsByTagName('a');
    }

    // Recent Comments
    if (idName == 'comment') {
        for (i = 0, len = objItems.length; i < len; i++) { // Repeat a tag.
            href = objItems[i].getAttribute("href");
            if(href.indexOf('#') == -1){ // Count if '#' exists in a href attribute.
                commentCounter++;
            }
        }
    }

    // Trackback
    var counter;
    if (idName == 'trackback') {
        commentCounter = objItems.length / trackbackNumber;
    }

    // Subtract the unnecessary number of links.
    if (idName.indexOf('link') == 0) {
        var linkName;
        for (j = 0; j < linkNumber; j++) {
            linkName = 'link' + (j + 1);
            if (idName == linkName) {
                counter = objItems.length - offsetValue[j];
            }
        }
    } else {

        // Subtract the value of a counter from 'Recent Comments'
        counter = objItems.length - commentCounter;
    }

    // decoration counter
    if (leftMarkForListNumber) {
        counter = leftMarkForListNumber + counter;
    }
    if (rightMarkForListNumber) {
        counter = counter + rightMarkForListNumber;
    }

    return counter;
}

// リスト数設定
function setListNumber(buffer, listCount, menuTitle, listNumberPosition, tlspace) {

    // リスト数を前に表示
    if (listNumberPosition) {
        buffer[buffer.length] = listCount;
        if (tlspace) {
            buffer[buffer.length] = tlspace;
        }
        buffer[buffer.length] = menuTitle;

    // リスト数を後に表示
    } else {
        buffer[buffer.length] = menuTitle;
        if (tlspace) {
            buffer[buffer.length] = tlspace;
        }
        buffer[buffer.length] = listCount;
    }
}

// メニュータイトル+リスト数設定(block用)
function setMenuTitleForBlock(viewNum, buffer, listCount, menuTitle, listNumberPosition, tlspace) {

    // リスト数表示
    if (viewNum) {
        setListNumber(buffer, listCount, menuTitle, listNumberPosition, tlspace);

    // リスト数非表示
    } else {
        buffer[buffer.length] = menuTitle;
    }
}

// メニュータイトル+リスト数設定
function setMenuTitle(viewNum, buffer, listCount, menuTitle, listNumberPosition, tlspace) {

    // リスト数表示
    if (viewNum) {

        // リスト数を前に表示
        if (listNumberPosition) {
            buffer[buffer.length] = listCount;
            if (tlspace) {
                buffer[buffer.length] = tlspace;
            }
        }

        buffer[buffer.length] = menuTitle;

        // リスト数を後に表示
        if (!listNumberPosition) {
            if (tlspace) {
                buffer[buffer.length] = tlspace;
            }
            buffer[buffer.length] = listCount;
        }

    // リスト数非表示
    } else {
        buffer[buffer.length] = menuTitle;
    }
}

// 折りたたみ実行(タグ指定)
function FoldNavigationByTagName(idName, initMode, viewNum, countTag, sp, state) {

//--------------------------------------------------------
// Configuration
//--------------------------------------------------------

//--------------------------------------------------------
// メニュータイトル用設定データ
//--------------------------------------------------------

// リンク方式
// 折りたたみマークにリンク付与：'unblock'
// メニュータイトル枠全体にリンク付与 'block'
var linkType = 'block';

//-----------------------
// 折りたたみスピード
//-----------------------

// 全てのメニューのスピード
// 通常：'normal'
// 遅い：'slow'
var speed = 'normal';

// サブカテゴリーのスピード(speed が slow の場合のみ有効)
// 通常：'normal'
// 遅い：'slow'
var subcategorySpeed = 'normal';

//-----------------------
// 折りたたみマーク関連
//-----------------------

// 折りたたみマーク表示(メニュータイトル枠全体をリンクにする場合のみ有効)
// 表示する：true
// 表示しない：false
var displayMark = true;

// 折りたたみマーク
// 上：閉じている状態で表示されるマーク
// 下：開いている状態で表示されるマーク
// 画像を設定する場合は右辺を '<img src="[画像のURL]" />'; と書いてください
var openMarkForSideBarMenu  = '<img src="http://www.shinkoono.net/ono_dgn/img/open.gif" />';
var closeMarkForSideBarMenu = '<img src="http://www.shinkoono.net/ono_dgn/img/close.gif" />';

// 折りたたみマーク位置(折りたたみマークを表示する場合のみ有効)
// タイトル前に折りたたみマークを配置：true
// タイトル後に折りたたみマークを配置：false
// 左端または右端に折りたたみマークを配置：true
var preMarkForSideBarMenu = true;

// 折りたたみマーク画像(リンク方式が 'block' の場合のみ使われます)
// 画像を使用する：true
// 画像を使用しない：false
// var image = false;

//---------------
// リスト数関連
//---------------

// リスト数表示位置
// タイトル前にリスト数を表示：true
// タイトル後にリスト数を表示：false
var listNumberPosition = true;

// リスト数表示を括るマーク
var leftMarkForListNumber = '';
var rightMarkForListNumber = '';

// リンク数減算が必要なメニュー数
// リンク数を減算する必要があるメニューはここに含めてください
// 注:対象となるid属性名が「linkx(xは数字)」であること
// 減算するメニューがない場合:0
var linkNumber = 2;

// 減算する各メニューのオフセット値
// 注:対象となるid属性名が「linkx(xは数字)」であること
var offsetValue = new Array(linkNumber);
offsetValue[0] = 3;
offsetValue[1] = 2;

// トラックバック数の除数
// 注1:対象となるid属性名が「trackback」であること
// 注2:除算が不要な場合は'1'を設定すること
var trackbackNumber = 2;

// サブカテゴリーリスト数計数方法
// liタグで計数：true
// aタグで計数：false
// 注:他のタグを指定する場合はfalseを設定してください
var subCategoryCount = true;

//-------------------
// 表示位置補正関連
//-------------------

// タイトル表示位置補正フラグ(折りたたみマークを左端または右端に配置する場合)
// 補正する：true
// 補正しない：false
var modificationFlag = true;

// タイトル表示位置補正方向(折りたたみマークを左端または右端に配置する場合)
// ・タイトルを右方向に補正：true
// ・タイトルを左方向に補正：false
var centeringPosition = false;

// タイトル表示位置補正オフセット(折りたたみマークを左端または右端に配置した場合)
var offsetForCentering = 0;

// タイトルと折りたたみマークのスペース(上記以外で折りたたみマークを表示をする場合に有効)
// 折りたたみマークを左端または右端に配置する場合'0'を設定
var offsetForTitleAndMark = 0;

// タイトルとリスト数のスペース(リスト数を表示するメニューに有効)
var offsetForTitleAndLinkNumber = 1;

//--------------------------------------------------------
// サブカテゴリーリスト用設定データ
//--------------------------------------------------------

// サブカテゴリーフラグ
// サブカテゴリーの折りたたみを有効にする(別途テンプレート設定が必要)
// 有効にする：true
// 無効にする：false
var subCategory = false;

// サブカテゴリー用折りたたみマーク
// 上：閉じている状態で表示されるマーク
// 下：開いている状態で表示されるマーク
var openMarkForSubCategories  = 'B';
var closeMarkForSubCategories = 'A';

// サブカテゴリー用折りたたみマーク挿入位置
// カテゴリー前に折りたたみマークを配置：true
// カテゴリー後に折りたたみマークを配置：false
var preMarkForSubCategory = false;

// サブカテゴリーのタイトルとマークのスペース
var offsetForTitleAndMarkOfSubcategory = 0;

//--------------------------------------------------------
// アーカイブリスト用設定データ
//--------------------------------------------------------

// アーカイブリストフラグ
// サブカテゴリーの折りたたみを有効にする(別途テンプレート設定が必要)
// 有効にする：true
// 無効にする：false
var archives = true;

// アーカイブリスト用折りたたみマーク
// 上：閉じている状態で表示されるマーク
// 下：開いている状態で表示されるマーク
var openMarkForArchives  = 'B';
var closeMarkForArchives = 'A';

// アーカイブリスト用折りたたみマーク挿入位置
// カテゴリー前に折りたたみマークを配置：true
// カテゴリー後に折りたたみマークを配置：false
var preMarkForArchives = false;

// アーカイブリストのタイトルとマークのスペース
var offsetForTitleAndMarkOfArchives = 1;

// アーカイブリスト用折りたたみマーク使用
// 折りたたみマークを使用しない場合は年表示にリンクを設定
// 使用する：true
// 使用しない：false
var displayArchivesMark = false;

//--------------------------------------------------------
// 状態保持用設定データ
//--------------------------------------------------------

// 状態保持フラグ
// 有効にする：true
// 無効にする：false
var holdState = true;

//--------------------------------------------------------

    var openMark;  // The mark for opening, when having closed
    var closeMark; // The mark for closing, when open

    var idTitle = Array(idName,'name').join('');
    var idList = Array(idName,'list').join('');
    var objTitle = this.document.getElementById(idTitle);
    var objLists = this.document.getElementById(idList);

    if (!objTitle || !objLists) return;

    // 折りたたみマーク
    openMark = openMarkForSideBarMenu;
    closeMark = closeMarkForSideBarMenu;
    if (subCategory) {
        if (idName.indexOf('subcategories') == 0) {
            openMark = openMarkForSubCategories;
            closeMark = closeMarkForSubCategories;
        }
    }
    if (archives) {
        if (idName.indexOf('archive') == 0) {
            openMark = openMarkForArchives;
            closeMark = closeMarkForArchives;
        }
    }

    // 状態保持解除
    if (!state) {
        holdState = false;
    }

    var dispMode = objLists.style.display;
    if (!dispMode) {

        // Hold a fold-up state to cookie.
        if (holdState) {
            var cookie_initMode = readCookieByValue(idName);
            if(cookie_initMode){
                initMode = cookie_initMode;
            }
            createCookieByValue(idName, initMode, 365);
        }

        // 開始タグ
        var buffer = new Array();
        var tmpText;

        // 折りたたみスピードによって起動関数を変更
        if(sp != 'dummy'){
            speed = sp;
        }
        if(speed == 'slow') {
            tmpText = Array('FoldNavigationSlowly(',"'",idName,"','chng','');return(false);").join('');
        } else {
            tmpText = Array('FoldNavigation(',"'",idName,"','chng','');return(false);").join('');
        }
        var startTag = Array('<a class="foldmark" href="#" onclick="',tmpText,'" onkeypress="',tmpText,'">').join('');

        // 終了タグ
        var endTag = '</a>';

        // 表示する折りたたみマーク
        var foldMark = (initMode == 'off') ? openMark : closeMark;

        // メニュータイトル
        var menuTitle = objTitle.innerHTML;

        // パディング
        var padding = '';
        for (k = 0; k < offsetForCentering; k++) {
            padding += '&nbsp;';
        }

        // タイトルとリンク数のスペース
        var tlspace = '';
        for (l = 0; l < offsetForTitleAndLinkNumber; l++) {
            tlspace += '&nbsp;';
        }

        // タイトルとマークのスペース
        var tmspace = '';
        for (l = 0; l < offsetForTitleAndMark; l++) {
            tmspace += '&nbsp;';
        }

        // サブカテゴリー用タイトルとマークのスペース
        var scspace = '';
        for (l = 0; l < offsetForTitleAndMarkOfSubcategory; l++) {
            scspace += '&nbsp;';
        }

        // アーカイブリスト用タイトルとマークのスペース
        var alspace = '';
        for (l = 0; l < offsetForTitleAndMarkOfArchives; l++) {
            alspace += '&nbsp;';
        }

        // リスト数
        var listCount;
        if (viewNum) {
            listCount = getListCount(objLists, viewNum, idName, linkNumber, trackbackNumber, rightMarkForListNumber, subCategoryCount, leftMarkForListNumber, countTag, offsetValue);
        }

        // 折りたたみ表示つきタイトル生成

        // サブカテゴリーリスト
        if (subCategory && (idName.indexOf('subcategories') == 0)) {
            if (preMarkForSubCategory) {
                buffer[buffer.length] = startTag;
                buffer[buffer.length] = foldMark;
                buffer[buffer.length] = endTag;
                if (scspace) {
                    buffer[buffer.length] = scspace;
                }
                buffer[buffer.length] = menuTitle;
            } else {
                buffer[buffer.length] = menuTitle;
                if (scspace) {
                    buffer[buffer.length] = scspace;
                }
                buffer[buffer.length] = startTag;
                buffer[buffer.length] = foldMark;
                buffer[buffer.length] = endTag;
            }

        // アーカイブリスト
        } else if (archives && (idName.indexOf('archive') == 0)) {
            if (displayArchivesMark) {
                if (preMarkForArchives) {
                    buffer[buffer.length] = startTag;
                    buffer[buffer.length] = foldMark;
                    buffer[buffer.length] = endTag;
                    if (alspace) {
                        buffer[buffer.length] = alspace;
                    }
                    buffer[buffer.length] = menuTitle;
                } else {
                    buffer[buffer.length] = menuTitle;
                    if (alspace) {
                        buffer[buffer.length] = alspace;
                    }
                    buffer[buffer.length] = startTag;
                    buffer[buffer.length] = foldMark;
                    buffer[buffer.length] = endTag;
                }
            } else {
                buffer[buffer.length] = startTag;
                buffer[buffer.length] = menuTitle;
                buffer[buffer.length] = endTag;
            }

        // メニュータイトル
        } else {

            // 生成パターン決定(buffer生成)
            if (linkType == 'unblock') {

                // マーク前
                if (preMarkForSideBarMenu) {

                    // 折りたたみマーク設定
                    buffer[buffer.length] = startTag;
                    buffer[buffer.length] = foldMark;
                    buffer[buffer.length] = endTag;

                    // 表示位置補正
                    if(modificationFlag && centeringPosition) {
                        buffer[buffer.length] = padding;
                    }

                    // タイトルとマークのスペース
                    if(offsetForTitleAndMark) {
                        buffer[buffer.length] = tmspace;
                    }

                    // タイトル設定
                    setMenuTitle(viewNum, buffer, listCount, menuTitle, listNumberPosition, tlspace);

                    // 表示位置補正
                    if(modificationFlag && !centeringPosition) {
                        buffer[buffer.length] = padding;
                    }

                // マーク後
                } else {

                    // 表示位置補正
                    if(modificationFlag && centeringPosition) {
                        buffer[buffer.length] = padding;
                    }

                    // タイトル設定
                    setMenuTitle(viewNum, buffer, listCount, menuTitle, listNumberPosition, tlspace);

                    // タイトルとマークのスペース
                    if(offsetForTitleAndMark) {
                        buffer[buffer.length] = tmspace;
                    }

                    // 折りたたみマーク設定
                    buffer[buffer.length] = startTag;
                    buffer[buffer.length] = foldMark;
                    buffer[buffer.length] = endTag;

                    // 表示位置補正
                    if(modificationFlag && !centeringPosition) {
                        buffer[buffer.length] = padding;
                    }
                }

            // ブロック表示
            } else {
                buffer[buffer.length] = startTag;

                // マーク表示
                if (displayMark) {

                    // マーク前
                    if (preMarkForSideBarMenu) {
                        buffer[buffer.length] = foldMark;

                        // タイトルとマークのスペース
                        if(offsetForTitleAndMark) {
                            buffer[buffer.length] = tmspace;
                        }

                        setMenuTitleForBlock(viewNum, buffer, listCount, menuTitle, listNumberPosition, tlspace);

                    // マーク後
                    } else {
                        setMenuTitleForBlock(viewNum, buffer, listCount, menuTitle, listNumberPosition, tlspace);

                        // タイトルとマークのスペース
                        if(offsetForTitleAndMark) {
                            buffer[buffer.length] = tmspace;
                        }
                        buffer[buffer.length] = foldMark;
                    }

                // マーク非表示
                } else {
                    setMenuTitleForBlock(viewNum, buffer, listCount, menuTitle, listNumberPosition, tlspace);
                }
                buffer[buffer.length] = endTag;
            }
        }

        // 生成データをオブジェクトに設定
        objTitle.innerHTML = buffer.join('');

        // スタイル設定
        objLists.style.display = (initMode == 'off') ? 'none' : 'block';

    } else if (initMode == 'chng') {

        // 折りたたみマーク置換
        var objMarks = objTitle.getElementsByTagName('a');
        for (i = 0, len = objMarks.length; i < len; i++) {
            if (objMarks[i].className == 'foldmark') {

                if(linkType == 'block' && displayMark) {
                    var title = objMarks[i].innerHTML;

                    // 折りたたみマークの画像判定
                    var image = openMarkForSideBarMenu.search(/^</) != -1 ? true : false;
                    if (subCategory) {
                        if (idName.indexOf('subcategories') == 0) {
                            image = openMarkForSubCategories.search(/^</) != -1 ? true : false;
                        }
                    }
                    if (archives) {
                        if (idName.indexOf('archive') == 0) {
                            image = openMarkForArchives.search(/^</) != -1 ? true : false;
                        }
                    }
                    if(image){
                        if(dispMode == 'none'){
                            title = title.replace(/<.*>/, closeMark);
                        } else {
                            title = title.replace(/<.*>/, openMark);
                        }
                    } else {
                        if(dispMode == 'none'){
                           title = title.replace(openMark, closeMark);
                        } else {
                           title = title.replace(closeMark, openMark);
                        }
                    }
                    objMarks[i].innerHTML = title;
                } else if((linkType == 'unblock') || (subCategory && (idName.indexOf('subcategories') == 0)) || (archives && displayArchivesMark && (idName.indexOf('archive') == 0))) {
                    objMarks[i].innerHTML = (dispMode == 'none') ? closeMark : openMark;
                }
            }
        }

        // 折りたたみスピード
        if(sp != 'dummy'){
            speed = sp;
        }
        if(speed == 'slow' || (idName.indexOf('subcategories') == 0 && subcategorySpeed == 'slow')) {
            if(dispMode == 'none') {
                element = $(idList);
                options = {
                    afterFinish: function(effect) {
                        Element.undoClipping(effect.element);
//                        Element.show(effect.element); // prototype.js 修正要
                        element.style.display = 'block';
                    }
                };
                Effect.BlindDown(element, options);
            } else {
                element = $(idList);
                options = {
                    afterFinish: function(effect) {
                        Element.hide(effect.element);
                    }
                };
                Effect.BlindUp(element, options);
            }
        } else {

            // スタイル設定
            objLists.style.display = (dispMode == 'none') ? 'block' : 'none';
        }

        // Hold a fold-up state to cookie, when a change occurs.
        if (holdState) {
            if (dispMode == 'none') {
                createCookieByValue(idName, 'on', 365);
            } else {
                createCookieByValue(idName, 'off', 365);
            }
        }
    }
}

// 折りたたみ実行
function FoldNavigation(idName, initMode, viewNum) {
    FoldNavigationByTagName(idName, initMode, viewNum, 'dummy', 'dummy', true);
}

function FoldNavigationSlowly(idName, initMode, viewNum) {
    FoldNavigationByTagName(idName, initMode, viewNum, 'dummy', 'slow', true);
}

function FoldNavigationStateless(idName, initMode, viewNum) {
    FoldNavigationByTagName(idName, initMode, viewNum, 'dummy', 'dummy', false);
}
