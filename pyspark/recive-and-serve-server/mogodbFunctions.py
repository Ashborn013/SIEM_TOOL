
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


def quaryHostNames_from_mongo():
    db = connectWithDb()
    collection = db['logs']
    results = list(collection.find())
    for result in results:
        if '_id' in result and isinstance(result['_id'], ObjectId):
            result['_id'] = str(result['_id'])
    
    out = []
    # return results
    for  i in results:
        try :
            hostname = i["host"]["hostname"]
            ips = i["host"]["ip"]
            macs = i["host"]["mac"]
            os = i["host"]["os"]
            out.append({"hostname":hostname,"ips":ips,"macs":macs,"os":os})
        except:
            pass
    return remove_duplicates(out)

def remove_duplicates(data):
    unique_data = []
    seen = set()
    
    for entry in data:
        # Convert the dictionary to a hashable type (tuple of sorted items)
        entry_tuple = (
            entry["hostname"],
            tuple(sorted(entry["ips"])),
            tuple(sorted(entry["macs"])),
            tuple(entry["os"].items())
        )
        
        if entry_tuple not in seen:
            seen.add(entry_tuple)
            unique_data.append(entry)
    
    return unique_data


