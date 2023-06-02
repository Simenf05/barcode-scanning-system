from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from ldap3 import Server, Connection, ALL

import os
import urllib.parse
from bson.json_util import dumps
import pymongo
import datetime
import hashlib
from pydantic import BaseModel

try:
    db_user = urllib.parse.quote_plus(os.environ['DB_USER'])
    db_pass = urllib.parse.quote_plus(os.environ['DB_PASS'])
except KeyError:
    db_user = "simen"
    db_pass = "simenerkul"

app = FastAPI()

products = {
    "simen3": {"data": "dette er simen ting"},
    "tomas3": {"data": "dette er tomas ting"},
}


def pass_hasher(password: str):
    return hashlib.sha256(password.encode()).hexdigest()


simen_userers = {
    "simen": {
        "username": "simen",
        "password": pass_hasher("simenerkul"),
        "auth": 5,
    },
    "simen2": {
        "username": "simen2",
        "password": pass_hasher("simen2"),
        "auth": 4,
    }
}


class Product(BaseModel):
    person: str
    itemID: str


class User(BaseModel):
    username: str
    password: str


@app.post('/check_user')
def check_user(user: User):
    auth = 0

    if user.username not in simen_userers.keys():
        raise HTTPException(status_code=403, detail="Access denied.")

    for i, users in enumerate(simen_userers.values()):

        if (user.username == users["username"]) and (pass_hasher(user.password) == users["password"]):

            auth = users["auth"]

    if auth == 0:
        raise HTTPException(status_code=403, detail="Access denied.")

    return {"auth": auth}


@app.post('/register_product')
def register_product(product: Product):
    client = pymongo.MongoClient(
        "mongodb://%s:%s@tech-database:27017/?authMechanism=DEFAULT&authSource=admin" % (db_user, db_pass))
    db = client["barcode-scanning"]

    items = db["items"]
    query = {"ID": str(product.itemID)}
    cursor = items.find(query)
    document_list = list(cursor)

    match len(document_list):
        case 0:
            return JSONResponse(dumps({"err": "Serverside error."}))
        case 1:
            pass
        case _:
            print("ERROR:     Multiple items with same id in db.")
            return JSONResponse(dumps({"err": "Serverside error."}))

    doc = document_list[0]

    if doc["lentOut"]:
        return JSONResponse({"code": 0, "msg": "already lent out"})

    items.update_one(query, {"$set": {"lentOut": {"$not": "$lentOut"}}})

    # inserting starts here

    events_col = db["events"]

    now = datetime.datetime.now()

    events_col.insert_one({
        "time": {
            "year": now.year,
            "month": now.month,
            "day": now.day,
            "hour": now.hour,
            "minute": now.minute,
            "second": now.second
        },
        "product_mongo_id": doc["_id"],
        "productID": product.itemID,
        "person": product.person,
        "type": "Lend out",
    })

    return JSONResponse({"code": 1, "msg": "register successful"})


@app.post('/returnProduct')
def return_products(product: Product):
    client = pymongo.MongoClient(
        "mongodb://%s:%s@tech-database:27017/?authMechanism=DEFAULT&authSource=admin" % (db_user, db_pass))
    db = client["barcode-scanning"]

    items = db["items"]
    query = {"ID": str(product.itemID)}
    cursor = items.find(query)
    document_list = list(cursor)

    match len(document_list):
        case 0:
            return JSONResponse(dumps({"err": "Serverside error."}))
        case 1:
            pass
        case _:
            print("ERROR:     Multiple items with same id in db.")
            return JSONResponse(dumps({"err": "Serverside error."}))

    doc = document_list[0]

    if not doc["lentOut"]:
        JSONResponse(dumps({"code": -1, "msg": "not lent out"}))

    items.update_one(query, {"$set": {"lentOut": {"$not": "$lentOut"}}})

    # inserting starts here

    events_col = db["events"]

    now = datetime.datetime.now()

    events_col.insert_one({
        "time": {
            "year": now.year,
            "month": now.month,
            "day": now.day,
            "hour": now.hour,
            "minute": now.minute,
            "second": now.second
        },
        "product_mongo_id": doc["_id"],
        "productID": product.itemID,
        "person": product.person,
        "type": "Returned",
    })

    return JSONResponse({"code": 1, "msg": "returned successfuly"})


@app.get('/products')
def all_products():
    return JSONResponse(dumps(products))


@app.get('/products/{id}')
def product_id(id):
    client = pymongo.MongoClient(
        "mongodb://%s:%s@tech-database:27017/?authMechanism=DEFAULT&authSource=admin" % (db_user, db_pass))
    db = client["barcode-scanning"]
    collection = db["items"]
    query = {"ID": str(id)}

    cursor = collection.find(query)
    document_list = list(cursor)

    match len(document_list):
        case 0:
            return JSONResponse(dumps({"err": "No product with that element."}))
        case 1:
            return JSONResponse(dumps(document_list[0]))
        case _:
            # this shouldn't happen !
            print("ERROR:     Multiple items with same id in db.")
            return JSONResponse(dumps(document_list))


def get_all_events() -> list:
    client = pymongo.MongoClient(
        "mongodb://%s:%s@tech-database:27017/?authMechanism=DEFAULT&authSource=admin" % (db_user, db_pass))
    db = client["barcode-scanning"]

    events_col = db["events"]
    cursor = events_col.find({})
    document_list = list(cursor)
    events_arr = []

    for document in document_list:
        events_arr.append(document)

    return events_arr


@app.get('/allEvents')
def all_events():
    events = get_all_events()
    return JSONResponse(dumps(events))


@app.get('/onlyReturnEvents')
def only_return_events():
    events = get_all_events()

    for event in events:
        if not event["type"] == "Returned":
            events.remove(event)

    return JSONResponse(dumps(events))


def sort_events(arr):
    try:
        arr2 = arr.copy()
        arr2.sort(key=lambda x: x["time"]["second"])
        arr2.sort(key=lambda x: x["time"]["minute"])
        arr2.sort(key=lambda x: x["time"]["hour"])
        arr2.sort(key=lambda x: x["time"]["day"])
        arr2.sort(key=lambda x: x["time"]["month"])
        arr2.sort(key=lambda x: x["time"]["year"])
        return arr2
    except Exception as err:
        print(err)
        return None


# this could use some optimization
@app.get('/onlyLendOutEvents')
def only_lend_out_events():
    events = get_all_events()

    events = sort_events(events)

    events_sorted_by_product = {}

    for event in events:
        if event["productID"] in events_sorted_by_product.keys():
            events_sorted_by_product[event["productID"]].append(event)
            continue

        events_sorted_by_product.update({event["productID"]: [event]})

    events = []

    for event_list in events_sorted_by_product.values():
        if event_list[-1]["type"] == "Lend out":
            events.append(event_list[-1])

    return JSONResponse(dumps(events))


@app.get('/lentOut')
def lent_out():
    client = pymongo.MongoClient(
        "mongodb://%s:%s@tech-database:27017/?authMechanism=DEFAULT&authSource=admin" % (db_user, db_pass))
    db = client["barcode-scanning"]

    events_col = db["items"]
    cursor = events_col.find({"lentOut": True})
    document_list = list(cursor)

    return JSONResponse(dumps(document_list))


@app.get('/people')
def all_people():
    try:
        server = Server('odin.kuben.it', get_info=ALL)

        with Connection(server, user="kuben\\simen", password="Q2w3e4r5", auto_bind=True) as conn:
            conn.search('dc=kuben,dc=it', '(&(ObjectClass=user)(GivenName=*))', attributes=['sn', 'objectclass', 'cn'])
            people = {"people": [name.cn.value for name in conn.entries]}

    except Exception as e:
        people = {'people': ['Christian Myhrvold', 'Lars Aalborg', 'Even Eleven', 'Alf Morten Salater-Daljord', 'Arvid-Andrè Johansen', 'Lars Einar Skageberg', 'ADK MDT', 'Klaus Gretland', 'Erik Richvoldsen', 'admin iktskolen', 'Shazia Mushtaq', 'Marte Svensdottir', 'even eleven', 'Salahudin Ahmad', 'Ilyas Ahmed', 'Ahmed Al-Rammahy', 'Mikkel Andersen', 'Fergus Askeland', 'Isaac Austbø', 'Yosra Azzam', 'Rahand Bakker', 'Oliver  Bing-Hansen', 'Ole Bjune-Grythe', 'August Brynsrud', 'Nikolas Catruna', 'Martin  Danielsen', 'Michail Dima Or Dhima', 'Viet Do', 'Jon Eier', 'Alan Frez', 'Simen Fritsvold', 'Adrian  Georgiev', 'Magnus Grøndahl', 'Thomas Gulbrandsen', 'Lukas Hansen', 'Herman Hasdahl-Solvang', 'Enrique Haugen Goodell', 'Joachim Hertaas', 'Mohammad Hijazi', 'Mohammad Hussain', 'Danyar Hussein', 'Håkon Hydle', 'Thuyavan Jeyakumar', 'Edgar Johansen', 'Espen Johansen', 'Leon Johansen', 'Mohammad Khalil', 'Armand Klokk-Brendryen', 'Thea Kornmo', 'Leo Longva', 'Kornel Lowczanin', 'Abdullahi Mahammud', 'Jonas Mathe', 'Christopher Matre-Alim', 'Fabricio Neto', 'Mathias Nilsen', 'Magnus Nyhagen', 'Jonathan Oyewumi', 'Liam Prestø', 'Emil Remseth-Løkling', 'Ali Salhab', 'Viu Santos', 'Evren Sarinc', 'Felix Seielstad', 'Behar Shala', 'Besnik Shala', 'Shuayb Shire', 'Iulian Simbotin', 'Sondre Skaug', 'Mikolaj Stepien', 'Kamil Szynalski', 'Oliver Sørheim-Erlandsson', 'Sanchay Thayananthan', 'Knut Tøllefsen', 'Krystian Walencki', 'Jonathan Woodhouse', 'Salahudin Ahmad', 'Ilyas Moen Ahmed', 'Ahmed Al-Rammahy', 'Mikkel Huth Andersen', 'Fergus Askeland', 'Rahand Bakker', 'Ole Bjune-Grythe', 'August Brynsrud', 'Viet-Uy Do', 'Jon Magnus Eier', 'Alan Enrique Frez', 'Simen Fritsvold', 'Thomas Gulbrandsen', 'Joachim Hertaas', 'Mohammad Ali Hijazi', 'Danyar Kardo Hussein', 'Thuyavan Jeyakumar', 'Edgar Johansen', 'Espen Kj�r Johansen', 'Leon Konlan Johansen', 'Leo Solbakken Longva', 'Mathias Nilsen', 'Magnus Nyhagen', 'Emil Remseth-L�kling', 'Ali Salhab', 'Viu San Santos', 'Evren Sarinc', 'Behar Jasin Shala', 'Besnik Shala', 'Mikolaj Stepien', 'Sanchay Thayananthan', 'Jonathan Woodhouse', 'Innmelding Domenet', 'Local Admin', 'Emilie Fostvedt', 'felles', 'elev_test ELEV TEST', 'Jon Mæle', 'Malin Øien Caspersen']}
        print(e)

    return JSONResponse(people)
