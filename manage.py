from photo_searcher import app
app.run(host = '127.0.0.1', port = 5000, debug = True, threaded = True)
#host >> IPアドレス。127.0.0.1はよく使うローカルのIPアドレス
#port >> ポート番号
#debug >> デバッグモード
#threaded >> False: 直列(default), True: 並列