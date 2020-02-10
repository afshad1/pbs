from flask import Flask, render_template
from flask_cors import CORS
#from flask_sqlalchemy import SQLAlchemy

# instantiate the app
app = Flask(__name__)
#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pbs.db'
#db = SQLAlchemy(app)

# enable CORS (Cross Origin Ressource Sharing)
CORS(app)

# Testdata
pbs_data = [
    {
        'username': 'broken person',
        'giro': '3432432',
        'fest': '12332434',
        'spar': '343',        
    }
]

# Add full database functionality later (start with tinydb first)
# class PBS(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     giro = db.Column(db.String(100), nullable=True)

#     def __repr__(self):
#         return 'PBS ' + str(self.id)

# Main index route
@app.route('/')
def index():
    return render_template('index.html', pbs=pbs_data)

# Testroute
@app.route('/onlyget', methods=['GET'])
def get_req():
    return 'Only GETs here, idiot!'

if __name__ == '__main__':
    app.run(debug=True)
