from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS
from db_controller import get_pbs, create_aktiva, get_pbsById
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
    myPbs = get_pbsById("b6a92189abfb4741ae8d90a18010d62f")
    return render_template('index.html', pbs=myPbs)

# Route for adding items
@app.route('/add', methods=['POST'])
def add_item():
    aktivaKat = request.form.get('aktivaKat')
    aktivaType = request.form.get('aktivaType')
    aktivaValue = request.form.get('aktivaValue')
    create_id = create_aktiva("b6a92189abfb4741ae8d90a18010d62f", aktivaKat, aktivaType, aktivaValue)
    return redirect(url_for('index'))

# Testroute
@app.route('/onlyget', methods=['GET'])
def get_req():
    return 'Only GETs here, idiot!'

if __name__ == '__main__':
    app.run(debug=True)
