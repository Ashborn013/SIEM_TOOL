from pymongo import MongoClient
from pyspark.sql import SparkSession
import bson

client = MongoClient('mongodb://mongo:27017/')  # Mongo container URI, assuming 'mongo' is the hostname of your MongoDB container
db = client['Main']  # Using 'Main' database
collection = db['logs']  # Using 'logs' collection

mongo_data = list(collection.find())

for document in mongo_data:
    document['_id'] = str(document['_id'])  # Convert _id to string

spark = SparkSession.builder \
    .appName("MongoDB to Spark") \
    .master("spark://spark:7077").getOrCreate()

rdd = spark.sparkContext.parallelize(mongo_data)
df = spark.read.json(rdd)

df.show(truncate=True)


