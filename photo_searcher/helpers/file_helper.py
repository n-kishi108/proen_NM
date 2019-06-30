from photo_searcher import app, BASE_DIR
import os
    
#ファイルを一行ずつ取得して配列として返す
def file_get_contents(filename):
    li = []  # listの定義。ArrayListのようなもの
    with open(filename, 'r') as f:  # fopen~fcloseの簡略化バージョン
        for row in f:  # fをrowとして全て回す
            row = row.strip()  # 改行コードの削除
            if(os.path.exists(BASE_DIR + '/static/data/' + row)):  # 存在しないファイルの除外
                li.append(row)  # リストに追加
    return li