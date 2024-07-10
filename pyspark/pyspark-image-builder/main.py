from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count, to_json, lag
from pyspark.sql.window import Window
from pyspark.sql.types import TimestampType
from datetime import datetime
import json
from saveToSql import *

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

# ----------------- Functions -----------------


def filter_logs_by_event_id(df, event_id):
    return df.filter(col("event_id") == event_id)


def count_logs_by_hostname(df):
    return df.groupBy("hostname").agg(count("*").alias("log_count"))


def regex_query(df, query_list):
    result_df = None

    for query in query_list:
        filtered_df = df.filter(col("message").rlike(query))

        if result_df is None:
            result_df = filtered_df
        else:
            result_df = result_df.union(filtered_df)

    if result_df is not None:
        for field in result_df.schema.fields:
            if field.dataType.simpleString().startswith("map"):
                result_df = result_df.withColumn(field.name, to_json(col(field.name)))
        result_df = result_df.dropDuplicates()
        return result_df
    else:
        print("No matches found.")
        return None


def all_notable_event_id(df):
    ids = [
        27,
        104,
        140,
        1001,
        4624,
        4625,
        4648,
        4649,
        4657,
        4670,
        4672,
        4703,
        4713,
        4717,
        4718,
        4725,
        4732,
        4739,
        4769,
        4771,
        4776,
        4781,
        4782,
        4782,
        4798,
        4816,
        4946,
        4947,
        4948,
        5025,
        5027,
        5034,
        5142,
        6145,
        6273,
        6416,
        6423,
        7023,
        7045,
        24577,
        32850,
    ]
    union_df = None
    for i in ids:
        df_filter = filter_logs_by_event_id(df, i)
        if union_df is None:
            union_df = df_filter
        else:
            union_df = union_df.union(df_filter)
    return union_df









def detect_brute_force(df):
    df = df.withColumn("@timestamp", col("@timestamp").cast(TimestampType()))
    out_put = filter_logs_by_event_id(df, 4625)
    out_put = out_put.orderBy("@timestamp")

    windowSpec = Window.orderBy("@timestamp")
    out_put = out_put.withColumn(
        "time_diff",
        col("@timestamp").cast("long")
        - lag("@timestamp", 1).over(windowSpec).cast("long"),
    )

    logs_under_one_min = out_put.filter(col("time_diff") < 60)
    count = logs_under_one_min.count()

    if count > 10:
        detect_brute_force_db_save(logs_under_one_min)
        return logs_under_one_min
    else:
        return None


def detect_special_privilege_logon(df):
    df_filtered = df.filter(col("event_id") == "4672")
    count = df_filtered.count()

    if count > 0:
        print("Special privilege logon detected .. !")
        df_filtered.show()
        spl_privilege_logon_db_save(df_filtered) # db save function
        return df_filtered
    else:
        print("No special privilege logon detected.")
        return None


def detect_user_account_changed(df):
    df_filtered = df.filter(col("event_id") == "4738")
    count = df_filtered.count()
    user_account_change_db_save(df_filtered) # db save function
    if count > 0:
        print(f"User account change detected {count} times .. !")
        df_filtered.show()
        return df_filtered
    else:
        print("No user account change detected.")
        return None















def rule_engine(df, rules):
    for rule in rules:
        if df is None:
            print("DataFrame is None, skipping rule:", rule)
            continue

        if rule["type"] == "filter_by_event_id":
            df = filter_logs_by_event_id(df, rule["event_id"])
        elif rule["type"] == "count_by_hostname":
            df = count_logs_by_hostname(df)
        elif rule["type"] == "regex_query_test":
            df = regex_query(df, ["failed login", "error", "critical"])
        elif rule["type"] == "main_event_ids":
            df = all_notable_event_id(df)
        elif rule["type"] == "brute_force_detection":
            df = detect_brute_force(df)
        elif rule["type"] == "special_privilege_logon_detection":
            df = detect_special_privilege_logon(df)
        elif rule["type"] == "user_account_change":
            df = detect_user_account_changed(df)
    return df


# ----------------- Main -----------------------

rules = [
    # {"type": "filter_by_event_id", "event_id": "4625"},
    # {"type": "count_by_hostname"},
    # {"type": "special_privilege_logon_detection"}
    {"type": "filter_by_event_id", "event_id": "4738"},
    {"type": "user_account_change"},
    {"type": "brute_force_detection"},
    {"type": "special_privilege_logon_detection"},
    {"type": "user_account_change"},
    {"type": "main_event_ids"},
]

# Apply rules using the rule engine
# result_df = rule_engine(df_selected, rules)
# result_df.show(truncate=True)

output = detect_brute_force(df_selected)
if output is not None:
    print("Brute Force attempt detected .. !")
    output.show()
else:
    print("No brute force attack detected")

# test ing the functions

detect_brute_force              (df_selected)
detect_special_privilege_logon  (df_selected)
detect_user_account_changed     (df_selected)

# output_path = f"/home/jovyan/work/categorized_winlogbeat-{datetime.now().isoformat()}"
# result_df.coalesce(1).write.json(output_path)




spark.stop()
