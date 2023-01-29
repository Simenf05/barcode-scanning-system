from fastapi import FastAPI
from fastapi.responses import JSONResponse

import httpx
import asyncio
import pydantic
import ms_active_directory


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
    "leah": {"leahting": "wowowow"}
}


@app.get('/products')
def allProducts():
    return JSONResponse(products)


@app.get('/products/{id}')
def productId(id: str):
    if not id in products.keys():
        return JSONResponse({"feil": "key"})
    return JSONResponse(products[id])
    
    

@app.get('/people')
def allPeople():
    return JSONResponse(people)