from photo_searcher import app
import os

port = int(os.environ.get("PORT", 5000))
app.run(host='0.0.0.0', port=port)
# app.run(host = '127.0.0.1', port = 5000, debug = True, threaded = True)
#host >> IPアドレス。127.0.0.1はよく使うローカルのIPアドレス
#port >> ポート番号
#debug >> デバッグモード
#threaded >> False: 直列(default), True: 並列