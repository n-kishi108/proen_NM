'''
このファイルでは各ページへのルーティングとコントローラの処理を記述します
'''

#Flaskの必要モジュールをimport
from flask import render_template, request
#app本体をimport
from photo_searcher import app

#modelのimport
from photo_searcher.models.set_information_model import set_show_data, get_theme
from photo_searcher.models.search_model import convert_to_basic_form
import urllib.parse, math

#
#127.0.0.1/をindexメソッドにルーティング
#
@app.route('/')
def index():
    # theme = get_theme()
    #レンダリング
    # return render_template('index.html', theme = theme, page = 'index', file = '', row_cnt = '', message = '')
    return render_template('index.html', page = 'index', file = '', row_cnt = '', message = '')

#
#127.0.0.1/search?をsearchメソッドにルーティング
#GETメソッドを許可
#
@app.route('/search', methods = ['GET', 'POST'])
def search():
    # theme = get_theme()
    #GETパラメータの取得
    keyword = request.args.get('k')
    page = int(request.args.get('page'))  # ページ番号を取得
    # ファイルから画像リストを取得、その長さを測る
    rows, row_cnt = set_show_data(keyword)
    if page == 0:
        page = 1
    url = '/search?k=' + keyword + '&page='
    urls = []
    # ページの総数, ヒット件数/表示件数から切り上げを求める
    page_max = math.ceil(row_cnt/100)
    if row_cnt > 0 and page > page_max:
        return render_template('404.html')
    if page_max == 1:
        urls = []
    elif page_max > 1:
        urls = [
			{
				'href': url + str(page - 1),
				'value': 'Prev'
			}
		]
    for index in range(page_max):
        urls.append(
            {
                'href': url + str(index+1),
                'value': str(index+1)
            }
        )
    urls.append(
        {
            'href': url + str(page + 1),
            'value': 'Next'
        }
    )
    links = []
    for el in rows:
        links.append(urllib.parse.quote(el).replace('/', "%2F"))

	#レンダリング
    # return render_template('index.html', theme = theme, page = 'search', section = page - 1, file = rows, links = links, row_cnt = row_cnt, message = keyword, urls =  urls)
    return render_template('index.html', page = 'search', section = page - 1, file = rows, links = links, row_cnt = row_cnt, message = keyword, urls =  urls)

@app.route('/show', methods = ['GET', 'POST'])
def show():
    # theme = get_theme()
    #GETパラメータの取得
    image_data = request.args.get('img').replace("%2F", '/')
    response = '/static' + image_data

    #レンダリング
    # return render_template('show.html', theme = theme, image_url = response)
    return render_template('show.html', image_url = response)

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404