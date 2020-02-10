from flask import Flask, render_template
from flask_cors import CORS

# instantiate the app
app = Flask(__name__)

# enable CORS (Cross Origin Ressource Sharing)
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/onlyget', methods=['GET'])
def get_req():
    return 'Only GETs here, idiot!'

if __name__ == '__main__':
    app.run(debug=True)
