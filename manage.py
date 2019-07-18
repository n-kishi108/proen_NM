from photo_searcher import app
app.run( adebug = True, threaded = True)
#host >> IPアドレス。127.0.0.1はよく使うローカルのIPアドレス
#port >> ポート番号
#debug >> デバッグモード
#threaded >> False: 直列(default), True: 並列