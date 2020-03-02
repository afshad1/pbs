from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS
from db_controller import get_pbsByDocId, get_pbsById, get_db, delete_pbsById, get_pbsByKat, create_pbs

# instantiate the app
app = Flask(__name__)

# enable CORS (Cross Origin Ressource Sharing)
CORS(app)

# Main index route
@app.route("/")
def index():
    aktiva_liq = get_pbsByKat("aktiva_liq")
    aktiva_immo = get_pbsByKat("aktiva_immo")
    return render_template("index.html", aktiva_liq=aktiva_liq, aktiva_immo=aktiva_immo)

# Route for adding items
@app.route("/add", methods=['POST'])
def add_item():
    aktivaKat = request.form.get("aktivaKat")
    aktivaType = request.form.get("aktivaType")
    aktivaValue = request.form.get("aktivaValue")
    create_id = create_pbs(aktivaKat, aktivaType, aktivaValue)
    return redirect(url_for("index"))

@app.route("/delete/<item_id>", methods=['POST'])
def delete_item(item_id):
    delete_pbsById(item_id)   
    return redirect(url_for("index"))

# Testroute
@app.route("/onlyget", methods=['GET'])
def get_req():
    return "Only GETs here, idiot!"

if __name__ == '__main__':
    app.run(debug=True)
