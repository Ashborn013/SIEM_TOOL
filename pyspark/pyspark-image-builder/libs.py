import uuid
from mongodbfunctions import insertData
import time
def job_id_create_list(job, message ,level) :
    return [time.time(), job, message, level, str(uuid.uuid4())]

def reportData(job, message ,level,ids) :
    return {
        "time" : time.time(),
        "job" : job,
        "message" : message,
        "level" : level,
        "job_id" : str(uuid.uuid4()),
        "logs_ids" : ids
    }


'''
time : string
job : string
message : string
level : string
job_id : string
logs_ids : list
'''