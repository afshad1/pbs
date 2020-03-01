from tinydb import TinyDB, Query
import uuid

db = TinyDB('db.json')
db.purge_tables()

# table = db.table('pbs')
db.insert({
    '_id': uuid.uuid4().hex,
    'aktiva_liq': [{'type': 'Girokonten', 'value': '111111'}, {'type': 'Festgelder', 'value':'22222'}, {'type': 'Sparbücher', 'value':'33333'}],
    'aktiva_immo': [{'type': 'Eigenheime', 'value': '100000'}],
    })