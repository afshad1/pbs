from flask import Flask
from flask_cors import CORS

# instantiate the app
app = Flask(__name__)

# enable CORS (Cross Origin Ressource Sharing)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)
