from flask import Flask
from application import config
from application.config import DEBUG
from flask_cors import CORS

app = None

def create_app():
    app = Flask(__name__)
    app.config.from_object(DEBUG)
    app.app_context().push()
    return app

app=create_app()
CORS(app)


from application.controllers import *

if __name__=='__main__':
    app.run(host='0.0.0.0', port=5000)