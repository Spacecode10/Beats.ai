from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message": "hello this is api"
    }
    return data

if __name__=='__main__':
    app.run(host='0.0.0.0')
    app.debug = True