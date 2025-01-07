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
import logging
from libs import job_id_create_list
from mongodbfunctions import insertData

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),  # Logs to the console
        logging.FileHandler("app.log"),  # Logs to a file named 'app.log'
    ],
)


def correlate_windows_firewall_attack(df):
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
        logging.info("Input DataFrame is empty or None, skipping rule.")
        return

    df_latest_day = group_logs_by_date_latest(df)

    df_2097 = df_latest_day.filter(col("event_id") == "2097")
    df_2099 = df_latest_day.filter(col("event_id") == "2099")
    df_2052 = df_latest_day.filter(col("event_id") == "2052")
    df_2059 = df_latest_day.filter(col("event_id") == "2059")
    df_5001 = df_latest_day.filter(col("event_id") == "5001")
    df_4104 = df_latest_day.filter(col("event_id") == "4104")

    count_2097 = df_2097.count()
    count_2099 = df_2099.count()
    count_2052 = df_2052.count()
    count_2059 = df_2059.count()
    count_5001 = df_5001.count()
    count_4104 = df_4104.count()

    if (
        count_2097 > 0
        or count_2099 > 0
        or count_2052 > 0
        or count_2059 > 0
        or count_5001 > 0
        or count_4104 > 0
    ):
        df_filtered = (
            df_2097.union(df_2099)
            .union(df_2052)
            .union(df_2059)
            .union(df_5001)
            .union(df_4104)
        )

        common_timestamp = df_filtered.agg({"@timestamp": "min"}).collect()[0][0]

        total_count = (
            count_2097 + count_2099 + count_2052 + count_2059 + count_5001 + count_4104
        )
        insertData(
            "report",
            job_id_create_list(
                "Windows_Firewall_Attack",
                f"Detected potential Windows Firewall attack with {total_count} events",
                "Critical",
            ),
        )

        logging.info(
            f"Detected potential Windows Firewall attack with {total_count} events at {common_timestamp}."
        )

        df_filtered.select(
            lit(common_timestamp).alias("Common_Timestamp"),  # Common timestamp
            col("event_id"),
            col("hostname"),
            col("message"),
        ).show(truncate=False)

    else:
        logging.info("No malicious activity detected in Windows Firewall logs.")
        insertData(
            "report",
            job_id_create_list(
                "Windows_Firewall_Attack",
                f"No malicious activity detected in Windows Firewall logs.",
                "Low"
            ),
        )
