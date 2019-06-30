def save(keyword, tmplist):
    path = '../photo_searcher/static/data_store/' + keyword + '.keyword'
    with open(path, 'w') as w:
        for line in tmplist:
            w.write(line)
            
with open('../tfimg.all', 'r') as f:
    localStorage = None
    keyword = None
    tmplist = []
    for line in f:
        sp = line.split('\t')[0]
        if keyword is None: #keywordを設定。最初の処理
            keyword = sp
        elif keyword != sp: #新しいkeywordに変わったので一旦ファイルを保存する
            save(keyword, tmplist)
            keyword = sp #新たにkeywordを設定
            tmplist = [] #リストを初期化
        
        #行を読み込んでいく
        tmplist.append(line)