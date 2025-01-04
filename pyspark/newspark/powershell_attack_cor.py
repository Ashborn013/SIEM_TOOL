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
from utils import group_logs_by_date_latest

def correlate_execution_policy_attack(df):
    df = df.select(
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
        
    if df is None or df.rdd.isEmpty():
        print("Input DataFrame is empty or None, skipping rule.")
        return

    df_latest_day = group_logs_by_date_latest(df)

    df_4104 = df_latest_day.filter(col("event_id") == "4104")
    df_4672 = df_latest_day.filter(col("event_id") == "4672")
    df_4798 = df_latest_day.filter(col("event_id") == "4798")

    count_4104 = df_4104.count()
    count_4672 = df_4672.count()
    count_4798 = df_4798.count()

    if count_4104 > 0 and count_4672 > 0 and count_4798 > 0:
        df_filtered = df_4104.union(df_4672).union(df_4798)

        common_timestamp = df_filtered.agg({"@timestamp": "min"}).collect()[0][0]

        total_count = count_4104 + count_4672 + count_4798
        # job_update(
        #     job_id_create_list(
        #         "Execution_Policy_Attack",
        #         f"Detected potential execution policy attack with {total_count}",
        #         "Critical",
        #     )
        # )
        print(
            f"Detected potential execution policy attack with {total_count} events at {common_timestamp}."
        )

        df_filtered.select(
            lit(common_timestamp).alias("Common_Timestamp"),  # Common timestamp
            col("event_id"),
            col("hostname"),
            col("message"),
        ).show(truncate=False)

    else:
        # job_update(
        #     job_id_create_list(
        #         "Execution_Policy_Attack",
        #         f"No execution policy attack detected.",
        #         "Low",
        #     )
        # )
        print(f"No execution policy attack detected.")
