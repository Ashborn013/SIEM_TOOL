import time
import uuid
import json
import bson

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


def df_to_dict(df):
    pandas_df = df.toPandas()    
    return pandas_df.to_dict(orient='records')
