from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col,
    count,
    to_json,
    lag,
    regexp_extract,
    avg,
    hour,
    when,
    window,
    collect_list,
    lit,
    date_format,
    max as spark_max,
    from_json,
)
from pyspark.sql.types import StructType, StructField, StringType
from pyspark.sql.window import Window
from pyspark.sql.types import TimestampType
from datetime import datetime
import json
import uuid  # for generating unique id for each Job entry
from interactwithUi import alertUi

# from rdpcheck import checkrdp
# from malware_check import checkmalware
from gandcrab_malcheck import checkgandcrabmalware

spark = SparkSession.builder.appName("Read JSON File").getOrCreate()

file_path = "/home/jovyan/work/gandcrab.json"
# df = spark.read.json(file_path)
# df_selected = df.select(
#     col("@timestamp"),
#     col("log"),
#     col("message"),
#     col("ecs"),
#     col("event"),
#     col("agent.name").alias("name"),
#     col("agent.id").alias("id"),
#     col("agent.type").alias("type"),
#     col("winlog.event_id").alias("event_id"),
#     col("host.hostname").alias("hostname"),
# )

if __name__ == "__main__":
    checkgandcrabmalware(file_path)
    # df_selected.show()
