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
    if page == 0:
        page = 1
    url = '/search?k=' + keyword + '&page='
    urls = []
    if page == 1:
        urls = [
            {
                'href': url + '1',
                'value': 'Prev'
            },
            {
                'href': url + '1',
                'value': '1'
            },
            {
                'href': url + '2',
                'value': '2'
            },
            {
                'href': url + '3',
                'value': '3'
            },
            {
                'href': url + '2',
                'value': 'Next'
            }
        ]
    else:
        urls = [
            {
                'href': url + str(page - 1),
                'value': 'Prev'
            },
            {
                'href': url + str(page - 1),
                'value': str(page - 1)
            },
            {
                'href': url + str(page),
                'value': str(page)
            },
            {
                'href': url + str(page + 1),
                'value': str(page + 1)
            },
            {
                'href': url + str(page + 1),
                'value': 'Next'
            }
        ]
    # print('>>' + page)

    # ファイルから画像リストを取得、その長さを測る
    rows, row_cnt = set_show_data(keyword)
    # links = [urllib.parse.quote(l) for l in rows]
    links = []
    for el in rows:
        links.append(urllib.parse.quote(el).replace('/', "%2F"))
    print(links)

    #レンダリング
    return render_template('index.html', page = 'search', section = page - 1, file = rows, links = links, row_cnt = row_cnt, message = keyword, urls =  urls)

@app.route('/show', methods = ['GET', 'POST'])
def show():
    #GETパラメータの取得
    image_data = request.args.get('img').replace("%2F", '/')
    response = '/static' + image_data

    #レンダリング
    return render_template('show.html', image_url = response)