from tinydb import TinyDB, Query, where
from tinydb.operations import add
import uuid

db_name = 'db.json'
db_table = 'pbs'

def get_db():
    db = TinyDB(db_name)
    pbs = db.all()
    db.close()
    return pbs

def get_pbsByDocId(id):
    db = TinyDB(db_name)
    table = db.table(db_table)
    pbs = table.get(doc_id = id)
    db.close()
    return pbs

def get_pbsById(id):
    db = TinyDB(db_name)
    table = db.table(db_table)
    pbs = table.get(where('_id') == id)
    db.close()
    return pbs

def create_aktiva(id, kat, type, value):
    db = TinyDB(db_name)
    Pbs = Query()
    katTbl = 'aktiva_liq' if kat == 'liq' else 'aktiva_immo'
    create_id = db.update(add(katTbl, [{'type': type, 'value': value}]), Pbs._id == id)
    db.close()
    return create_id