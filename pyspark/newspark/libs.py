import time
import uuid


def fromMongoToSparkdf(spark, mongoList):
    rdd = spark.sparkContext.parallelize(mongoList)
    df = spark.read.json(rdd)
    return df


def job_id_create_list(job, message, level, ids=[]):
    return {
        "time": time.time(),
        "job": job,
        "message": message,
        "level": level,
        "job_id": str(uuid.uuid4()),
        "logs_ids": ids,
    }
