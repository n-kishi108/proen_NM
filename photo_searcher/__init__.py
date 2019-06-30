from flask import Flask
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
app = Flask(__name__, static_folder = 'static')
app.config.from_object('photo_searcher.config')

import photo_searcher.views