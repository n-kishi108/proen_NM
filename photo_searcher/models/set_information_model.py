from photo_searcher import app
#File_helperをfileとしてimport
from photo_searcher.helpers.file_helper import file_get_contents

import random  # デバッグ用
import os
import re
import glob
import execjs

#views.search()で必要なデータを返す
def set_show_data(keyword):
    # rows = file_get_contents('photo_searcher/static/img_list.txt')[:100]
    if len(keyword) > 0:
        rows = search_img_data(keyword)
    else:
        rows = []

    row_cnt = len(rows)

    return rows, row_cnt

#キーワードに見合う画像の検索
def search_img_data(keyword):
    #先頭または末尾のの不要なスペースを削除
    keyword = keyword.replace('\u3000', ' ')
    keyword = keyword.replace('  ', ' ')
    while True:
        if keyword[:1] == ' ':
            keyword = keyword[1:]
        elif keyword[-1:] == ' ':
            keyword = keyword[:-1]
        else:
            break
    sp_or = keyword.split(' OR ') #ORで区切る
    res_use = []
    for el in sp_or:
        #AND検索
        sp_and = el.split(' ')
        tmp_and_use = []
        tmp_and_unuse = []
        for el2 in sp_and:
            pathes = []
            if(re.sub("\\D", "", el2)):
                num = re.sub("\\D", "", el2)
                    #数字のみ後方一致
                pathes = glob.glob('photo_searcher/static/data_store/fc/' + num + '.keyword')
                tmp_array = [add_key_num(path) for path in pathes]
                if tmp_array:
                    s = set(tmp_array[0])
                    for t in tmp_array:
                        s |= set(t)
                    tmp_and_use.append(list(s))
            elif el2[0] == '-':
                pathes = glob.glob('photo_searcher/static/data_store/tf/' + el2[1:] + '.keyword')
                tmp_array = [add_key_words(path) for path in pathes]
                if tmp_array:
                    s = set(tmp_array[0])
                    for t in tmp_array:
                        s |= set(t)
                    tmp_and_unuse.extend(list(s))
            else:
                pathes = glob.glob('photo_searcher/static/data_store/tf/*' + el2 + '*.keyword')
                tmp_array = [add_key_words(path) for path in pathes]
                if tmp_array:
                    s = set(tmp_array[0])
                    for t in tmp_array:
                        s |= set(t)
                    tmp_and_use.append(list(s))
        #キーワードに関する配列毎に共通項を抽出
        if len(tmp_and_use) > 0:
            tmp = set(tmp_and_use[0])
            for el3 in tmp_and_use:
                tmp &= set(el3)
            # tmp = list(tmp)
            res_use.extend(list(tmp))
        if len(tmp_and_unuse) > 0:
            for el in tmp_and_unuse:
                if el in res_use:
                    res_use.remove(el)
    return list(set(res_use))

#使用するワードをリストに追加
#キーワードに関する画像データを返す
def add_key_words(path):
    response = []
    if len(response) > 0:
        response.clear()
    if os.path.exists(path) and os.path.isfile(path):
        with open(path, 'r') as r:
            for line in r:
                img_path = line.split('\t')[2].replace('\n','')
                response.append(img_path[2:])  #「..」を削除する
    return response

def add_key_num(path):
    response = []
    if len(response) > 0:
        response.clear()
    if os.path.exists(path) and os.path.isfile(path):
        with open(path, 'r') as r:
            for line in r:
                img_path = line.split('\t')[1].replace('\n','')
                response.append(img_path[2:])  #「..」を削除する
    return response

#jsのlocalStorageを参照して画面テーマを取得
def get_theme():
    ctx = execjs.compile("""
        function getTheme() {
            if(localStorage.getItem('theme')) {
                return localStorage.getItem('theme');
                // if(localStorage.getItem('theme') == 'dark') {
                //     return 'rgb(25, 25, 25)';
                // }else{
                //     return 'rgb(250, 250, 250)';
                // }
            }else{
                // return 'rgb(250, 250, 250)';
                return 'light';
            }
        }
    """)
    return ctx.call('getTheme')