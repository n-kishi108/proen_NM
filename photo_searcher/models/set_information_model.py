from photo_searcher import app
#File_helperをfileとしてimport
from photo_searcher.helpers.file_helper import file_get_contents

import random  # デバッグ用
import os

def set_show_data(keyword):
    # rows = file_get_contents('photo_searcher/static/img_list.txt')[:100]
    if len(keyword) > 0:
        rows = search_img_data(keyword)
    else:
        rows = []
    row_cnt  =len(rows)

    message = lambda : 'Fizz' if random.randrange(0, 2, 1) % 2 == 0 else 'Buzz'

    return rows, row_cnt, message


def search_img_data(keyword):
    path = 'photo_searcher/static/data_store/' + keyword + '.keyword'
    response = []
    if os.path.exists(path) and os.path.isfile(path):
        with open(path, 'r') as r:
            for line in r:
                img_path = line.split('\t')[2].replace('\n','')
                res = img_path[2:]
                response.append(res)
    return response