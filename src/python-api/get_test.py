import pymongo

client = pymongo.MongoClient(
    "mongodb://%s:%s@localhost:27018/?authMechanism=DEFAULT&authSource=admin" % ("simen", "simenerkul")
)

db = client["simen"]
items = db["simen2"]
query = {}
cursor = items.find(query)
document_list = list(cursor)

print(document_list)
