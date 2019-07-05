'''
このファイルでは各ページへのルーティングとコントローラの処理を記述します
'''

#Flaskの必要モジュールをimport
from flask import render_template, request
#app本体をimport
from photo_searcher import app

#modelのimport
from photo_searcher.models.set_information_model import set_show_data
from photo_searcher.models.search_model import convert_to_basic_form
import urllib.parse

#
#127.0.0.1/をindexメソッドにルーティング
#
@app.route('/')
def index():

    # ファイルから画像リストを取得、その長さを測る
    # rows, row_cnt = set_show_data('')

    #レンダリング
    return render_template('index.html', page = 'index', file = '', row_cnt = '', message = '')


#
#127.0.0.1/search?をsearchメソッドにルーティング
#GETメソッドを許可
#
@app.route('/search', methods = ['GET', 'POST'])
def search():
    
    #GETパラメータの取得
    keyword = request.args.get('k')
    page = int(request.args.get('page'))  # ページ番号を取得

    # ファイルから画像リストを取得、その長さを測る
    rows, row_cnt = set_show_data(keyword)
    # links = [urllib.parse.quote(l) for l in rows]
    links = []
    for el in rows:
        links.append(urllib.parse.quote(el).replace('/', "%2F"))
    print(links)

    #レンダリング
    return render_template('index.html', page = 'search', section = page - 1, file = rows, links = links, row_cnt = row_cnt, message = keyword)

@app.route('/show', methods = ['GET', 'POST'])
def show():
    #GETパラメータの取得
    image_data = request.args.get('img').replace("%2F", '/')
    response = '/static' + image_data

    #レンダリング
    return render_template('show.html', image_url = response)