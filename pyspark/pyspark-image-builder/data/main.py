# How many LOGS based on an EventID
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count
from datetime import datetime
import json

spark = SparkSession.builder.appName("Read JSON File").getOrCreate()


file_path = "/home/jovyan/work/altered.json"

text_data = spark.read.text(file_path)
json_data = text_data.rdd.map(lambda row: json.loads(row.value))
df = spark.createDataFrame(json_data)

# Select necessary columns
df_selected = df.select(
    "@timestamp",
    "log",
    "message",
    "ecs",
    "event",
    col("agent").getItem("name").alias("name"),
    col("agent").getItem("id").alias("id"),
    col("agent").getItem("type").alias("type"),
    col("winlog").getItem("event_id").alias("event_id"),
    col("host").getItem("hostname").alias("hostname"),
)


def filter_logs_by_event_id(df, event_id):
    return df.filter(col("event_id") == event_id)


def count_logs_by_hostname(df):
    return df.groupBy("hostname").agg(count("*").alias("log_count"))


def rule_engine(df, rules):
    for rule in rules:
        if rule["type"] == "filter_by_event_id":
            df = filter_logs_by_event_id(df, rule["event_id"])
        elif rule["type"] == "count_by_hostname":
            df = count_logs_by_hostname(df)
    return df


# rules
rules = [
    {"type": "filter_by_event_id", "event_id": "4625"},
    {"type": "count_by_hostname"},
]

# Apply rules using the rule engine
result_df = rule_engine(df_selected, rules)

result_df.show(truncate=False)

output_path = f"/home/jovyan/work/categorized_winlogbeat-{datetime.now().isoformat()}"
result_df.coalesce(1).write.json(output_path)


spark.stop()
