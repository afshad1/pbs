from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS
from db_controller import get_pbsByDocId, create_aktiva, get_pbsById, get_db

# instantiate the app
app = Flask(__name__)

# enable CORS (Cross Origin Ressource Sharing)
CORS(app)

# Main index route
@app.route("/")
def index():
    myPbs = get_db()
    return render_template("index.html", pbs=myPbs[0])

# Route for adding items
@app.route("/add", methods=['POST'])
def add_item():
    aktivaKat = request.form.get("aktivaKat")
    aktivaType = request.form.get("aktivaType")
    aktivaValue = request.form.get("aktivaValue")
    # Get first document
    firstDoc = get_db()[0]
    create_id = create_aktiva(firstDoc["_id"], aktivaKat, aktivaType, aktivaValue)
    return redirect(url_for("index"))

# Testroute
@app.route("/onlyget", methods=['GET'])
def get_req():
    return "Only GETs here, idiot!"

if __name__ == '__main__':
    app.run(debug=True)
