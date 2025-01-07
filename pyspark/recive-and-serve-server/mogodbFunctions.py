
from pymongo import MongoClient
from bson import ObjectId

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


