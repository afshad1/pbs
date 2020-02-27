from tinydb import TinyDB, Query, where
from tinydb.operations import add
import uuid

db_name = 'db.json'
db_table = 'pbs'

def get_pbs(id):
    db = TinyDB(db_name)
    table = db.table(db_table)
    pbs = table.get(doc_id = id)
    db.close()
    return pbs

def get_libs():
    db = TinyDB(db_name)
    table = db.table(db_table)
    libraries = table.all()
    db.close()
    return libraries

def get_pbsById(id):
    db = TinyDB(db_name)
    table = db.table(db_table)
    pbs = table.get(where('_id') == id)
    db.close()
    return pbs

def create_aktiva(id, kat, type, value):
    db = TinyDB(db_name)
    table = db.table(db_table)
    Pbs = Query()
    create_id = table.update(add('aktiva_liq', [{'type': type, 'value': value}]), Pbs._id == id)
    db.close()
    return create_id