from fastapi import FastAPI
from fastapi.responses import JSONResponse

import os
import urllib.parse
from bson.json_util import dumps
import pymongo
import httpx
import asyncio
import pydantic
import ms_active_directory

db_user = urllib.parse.quote_plus(os.environ['DB_USER'])
db_pass = urllib.parse.quote_plus(os.environ['DB_PASS'])

app = FastAPI()

people = {"people": [
        "simen",
        "simen 2",
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
            return JSONResponse(dumps({"feil": "key"}))
        case 1: 
            return JSONResponse(dumps(document_list[0]))
        case _:
            # this shouldnt happen !
            return JSONResponse(dumps(document_list))
        
    
    

@app.get('/people')
def allPeople():
    return JSONResponse(people)