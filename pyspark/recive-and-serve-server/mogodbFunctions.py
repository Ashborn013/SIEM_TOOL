
from pymongo import MongoClient
from bson import ObjectId
import json
def connectWithDb():
    client = MongoClient('mongodb://mongo:27017/')
    db = client['Main']
    return db


def query_job_details_from_mongo():
    db = connectWithDb()
    collection = db['report']
    results = list(collection.find())
    for result in results:
        if '_id' in result and isinstance(result['_id'], ObjectId):
            result['_id'] = str(result['_id'])
    return results




def quaryHostNames_from_mongo():
    db = connectWithDb()
    collection = db['logs']
    
    results = collection.find({}, {"host.hostname": 1, "host.ip": 1, "host.mac": 1, "host.os": 1})  

    out = []
    seen = set()

    for i in results:
        try:
            entry = {
                "hostname": i["host"]["hostname"],
                "ips": sorted(i["host"]["ip"]),  
                "macs": sorted(i["host"]["mac"]),
                "os": i["host"]["os"]
            }
            entry_str = json.dumps(entry, sort_keys=True) 

            if entry_str not in seen:
                seen.add(entry_str)
                out.append(entry)

        except KeyError:
            continue  # Skip entries with missing fields
    
    return out