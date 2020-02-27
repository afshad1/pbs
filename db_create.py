from tinydb import TinyDB, Query
import uuid

db = TinyDB('db.json')
db.purge_tables()

table = db.table('pbs')
table.insert({
    '_id': uuid.uuid4().hex,
    'aktiva_liq': [{'type': 'Girokonten', 'value': '111111'}, {'type': 'Festgelder', 'value':'22222'}, {'type': 'Sparbücher', 'value':'33333'}]})
# table.insert({'_id': uuid.uuid4().hex, 'type': "Girokonten", 'value': '111111', 'value2': '22222'})
# table.insert({'_id': uuid.uuid4().hex, 'type': "Festgelder", 'value': '222222'})
# table.insert({'_id': uuid.uuid4().hex, 'type': "Sparbücher", 'value': '333333'})