'''
このファイルではMeCabを使って検索ワードの自然言語処理を行います。
'''
import sys
import MeCab  # ご存知MeCab
from photo_searcher import app
import re  # 正規表現操作

#与えられたキーワードを基本形に変換して配列として返還
def convert_to_basic_form(self, arg):

    tokenizer = MeCab.Tagger("-Ochasen -d /usr/local/lib/mecab/dic/mecab-ipadic-neologd")
    tokenizer.parse("")
    node = tokenizer.parseToNode(arg)
    keywords = []
    while node:
        if node.feature.split(",")[0] == u"名詞":
            keywords.append(node.surface)
        elif node.feature.split(",")[0] == u"形容詞":
            keywords.append(node.feature.split(",")[6])
        elif node.feature.split(",")[0] == u"動詞":
            keywords.append(node.feature.split(",")[6])
        node = node.next
    
    return keywords