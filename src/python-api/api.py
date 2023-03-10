from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

import os
import urllib.parse
from bson.json_util import dumps
import pymongo
import httpx
import asyncio
from pydantic import BaseModel
import ms_active_directory

try:
    db_user = urllib.parse.quote_plus(os.environ['DB_USER'])
    db_pass = urllib.parse.quote_plus(os.environ['DB_PASS'])
except:
    db_user = "simen"
    db_pass = "simenerkul"

app = FastAPI()

people = {"people": [
        "Simen",
        "tomas",
        "ole",
        "jonathan",
        "jon",
        "august",
        "felix"
    ]}

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

@app.post('/checkUser')
def checkUser(user: User):
    auth = 0
    
    if not user.username in simen_userers.keys():
        raise HTTPException(status_code=403, detail="Access denied.")
    
    for users in simen_userers.values():
        if (user.username == users["username"]) and (user.password == users["password"]):
            auth = users["auth"]
            
    if auth == 0:
        raise HTTPException(status_code=403, detail="Access denied.")
    
    return {"auth": auth}


@app.post('/registerProduct')
def registerProduct(product: Product):
    print(product)
    return JSONResponse({"suck": "myballs"})


@app.get('/products')
def allProducts():
    return JSONResponse(dumps(products))


@app.get('/products/{id}')
def productId(id):
    
    client = pymongo.MongoClient("mongodb://%s:%s@tech-database:27017/?authMechanism=DEFAULT&authSource=admin" % (db_user, db_pass))
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
            # this shouldnt happen !
            return JSONResponse(dumps(document_list))
        
    
    

@app.get('/people')
def allPeople():
    return JSONResponse(people)