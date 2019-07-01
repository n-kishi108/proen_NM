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

    #まずはor検索とand検索ができるようにする
    rep = [
        {
            'before': '　',
            'after': ' '
        },
        {
            'before': "'",
            'after': ""
        },
        {
            'before': '+',
            'after': ''
        }
    ]
    for k in rep:
        keyword.replace(k['before'], k['after'])

    or_split = keyword.split(' OR ') #ORで文字列を分割
    res_use = []
    res_unuse = []
    for or_element in or_split:
        #ORで区切られた要素ごとにAND処理をする
        sp = or_element.split(' ')
        without = []
        response = []
        for el in sp:
            #半角スペースで区切ったキーワードを含む画像ファイルを全て抽出
            #list(response)に書き出し、それをlist(tmp_list)にネストする
            if el[:1] == '-':
                path = 'photo_searcher/static/data_store/' + el[1:] + '.keyword'
                without = add_key_words(path)
                res_unuse.extend(without)
            else:
                path = 'photo_searcher/static/data_store/' + el + '.keyword'
                response = add_key_words(path)
                res_use.extend(response)
    result = []
    for el in res_use:
        result.append(el)
    print('############')
    print(result)
    print('------')
    result.sort()
    print(result)
    print('------')
    tmp = set(result)
    print(tmp)
    print('------')
    rs = list(tmp)
    print(rs)
    # result = list(set(result))
    print('------')
    print(res_unuse)

    if without:
        #一致しないワードを除外
        for el in res_unuse:
            if el in result:
                result.remove(el)
    return result

#使用するワードをリストに追加
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

########################
#以下使ってないけど一応残す#
########################

#再帰的にリストの中の全ての要素の共通項を検出
def and_search(object):
    if len(object) < 2:
        return object[0]
    tmp = set(object[0]) & set(object[1])
    object.pop(0)
    object[0] = list(tmp)
    
    if len(object) >= 2:
        and_search(object)
    return object[0]

#キーワードを分割
def allocate_keywords_to_rightness(sp):
    key_list, or_list, without = []
    for el in sp:
        #除外する文字を吐き出す
        if el[:1] == '-':
            without.append(el[1:])
        if '+OR+' in el:
            v = el.split('+OR+')
            or_list[len(or_list):len(or_list)] = v #配列の末尾に要素を追加
    return key_list, or_list, without

#ダブルクォーテーションで囲まれた文字を返す
def get_group_word(keyword):
    response = []
    arg = ''
    switch = False
    for char in keyword:
        if char == '"': #もしダブルクォーテーションがきたら
            if switch:#ここまでがグループだ
                response.append(arg) #台詞を格納
                arg = ''
                switch = False
            else: #ここからグループだと定義
                switch = True
        else: #他の文字なら
            if switch:
                arg += char
    for el in response: #台詞部分をキーワードから削除
        keyword.replace(el, '')
        keyword.replace('"', '')
        keyword.replace('  ', ' ')
    return keyword, response