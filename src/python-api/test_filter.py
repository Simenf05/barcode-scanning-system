arr = [{"_id": {"$oid": "64464fad02d8757c3d8c9bf6"}, "time": {"year": 2023, "month": 4, "day": 24, "hour": 9, "minute": 45, "second": 17}, "product_mongo_id": {"$oid": "64464f44231b6d15e5a52283"}, "productID": "180", "person": "simen fritsvold", "type": "Led out"}, {"_id": {"$oid": "64464fd702d8757c3d8c9bfa"}, "time": {"year": 2023, "month": 4, "day": 24, "hour": 9, "minute": 45, "second": 59}, "product_mongo_id": {"$oid": "64464f44231b6d15e5a52284"}, "productID": "181", "person": "jon eier", "type": "Lend out"}]

lend_out = [a for a in arr if a["type"] == "Lend out"]

print(lend_out)
