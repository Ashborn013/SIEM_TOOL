
from pymongo import MongoClient
from bson.objectid import ObjectId

def connectWithDb():
    client = MongoClient('mongodb://root:example@localhost:27017/')
    db = client['Main']
    return db



def viewAllData():
    db = connectWithDb()
    collection = db['logs']
    data = collection.find()
    return data


# insert into collection given colection name and json data
def insertData(collection_name, data):
    db = connectWithDb()
    collection = db[collection_name]
    collection.insert_one(data)


# retrive data given _id and collection name
def retrieveDataOneId(collection_name, id):
    db = connectWithDb()
    collection = db[collection_name]
    try:
        # Convert id to ObjectId
        object_id = ObjectId(id)
    except Exception as e:
            return f"Invalid ID format: {e}"
    
    data = collection.find_one({"_id": object_id})
    return data

def retrieveDataMultipleId(collection_name, ids):
    return [ retrieveDataOneId(collection_name, x) for x in ids]

