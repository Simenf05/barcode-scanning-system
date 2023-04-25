from pymongo import MongoClient

client = MongoClient("mongodb://simen:simenerkul@127.0.0.1:27018/?authMechanism=DEFAULT&authSource=admin")

db = client["barcode-scanning"]
collection = db["items"]
query = {"ID": "4"}

cursor = collection.find(query)
document_list = list(cursor)

print(document_list)
