from tinydb import TinyDB, Query
import uuid

db = TinyDB('db.json')
db.purge_tables()

# table = db.table('pbs')
# db.insert({
#     '_id': uuid.uuid4().hex,
#     'aktiva_liq': [{'_id': uuid.uuid4().hex, 'type': 'Girokonten', 'value': '111111'}, {'_id': uuid.uuid4().hex, 'type': 'Festgelder', 'value':'22222'}, {'_id': uuid.uuid4().hex, 'type': 'Sparbücher', 'value':'33333'}],
#     'aktiva_immo': [{'_id': uuid.uuid4().hex, 'type': 'Eigenheime', 'value': '100000'}],
#     })

db.insert({
    '_id': uuid.uuid4().hex,
    'kat': 'aktiva_liq',
    'type': 'Girokonten',
    'value': '111111',
})

db.insert({
    '_id': uuid.uuid4().hex,
    'kat': 'aktiva_liq',
    'type': 'Festgelder',
    'value': '22222',
})

db.insert({
    '_id': uuid.uuid4().hex,
    'kat': 'aktiva_liq',
    'type': 'Sparbücher',
    'value': '33333',
})

db.insert({
    '_id': uuid.uuid4().hex,
    'kat': 'aktiva_immo',
    'type': 'Eigenheime',
    'value': '100000',
})