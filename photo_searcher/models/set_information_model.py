from photo_searcher import app
#File_helperをfileとしてimport
from photo_searcher.helpers.file_helper import file_get_contents

import random  # デバッグ用
import os

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
    # #ORを書くならANDの前
    # sp = keyword.split(' OR ') #ANDで区切る
    # result = []
    # res_use = []
    # for el in sp:
    #     path = 'photo_searcher/static/data_store/' + el + '.keyword'
    #     response = add_key_words(path)
    #     res_use.extend(response)
    # for el in res_use:
    #     result.append(el)
    # result = list(set(result))
    # res_use = []
    # return result

    #ORを書くならANDの前
    #先頭または末尾のの不要なスペースを削除
    while True:
        keyword.replace('　', ' ')
        keyword.replace('  ', ' ')
        if keyword[:1] == ' ':
            keyword = keyword[1:]
        elif keyword[-1:] == ' ':
            keyword = keyword[:-1]
        else:
            break
    sp_or = keyword.split(' OR ') #ORで区切る
    # result = []
    res_use = []
    for el in sp_or:
        #AND検索
        sp_and = el.split(' ')
        # res_and_use = []
        tmp_and_use = []
        for el2 in sp_and:
            path = 'photo_searcher/static/data_store/' + el2 + '.keyword'
            response = add_key_words(path)
            #キーワード毎に配列を作って格納
            tmp_and_use.append(response)
        
        #キーワードに関する配列毎に共通項を抽出
        if len(tmp_and_use) > 0:
            tmp = set(tmp_and_use[0])
            for el3 in tmp_and_use:
                tmp &= set(el3)
            # tmp = list(tmp)
            res_use.extend(list(tmp))
    return res_use

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
