from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from ldap3 import Server, Connection, ALL

import os
import urllib.parse
from bson.json_util import dumps
import pymongo
import httpx
import asyncio
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

simen_userers = {
    "simen": {
        "username": "simen",
        "password": "simenerkul",
        "auth": 5,
    },
    "simen2": {
        "username": "simen2",
        "password": "simen2",
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

    for users in simen_userers.values():
        if (user.username == users["username"]) and (user.password == users["password"]):
            auth = users["auth"]

    if auth == 0:
        raise HTTPException(status_code=403, detail="Access denied.")

    return {"auth": auth}


@app.post('/register_product')
def register_product(product: Product):
    print(product)
    return JSONResponse({"suck": "myballs"})


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
            return JSONResponse(dumps(document_list))


@app.get('/people')
def all_people():

    server = Server('odin.kuben.it', get_info=ALL)

    with Connection(server, user="kuben\\simen", password="Q2w3e4r5", auto_bind=True) as conn:
        conn.search('dc=kuben,dc=it', '(&(ObjectClass=user)(GivenName=*))', attributes=['sn', 'objectclass', 'cn'])
        people = {"people": [name.cn.value for name in conn.entries]}

    return JSONResponse(people)
