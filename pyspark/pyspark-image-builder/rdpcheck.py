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

from main import detect_special_privilege_logon,detect_user_account_changed

def isRdp_userLogin(df):
    suc = filter_logs_by_event_id(df, 4624)
    checkRdp = df.filter(col("LogonType") == 10)
    return True, checkRdp
    checkRdp.show()


def filter_logs_down_from_time(df, time):
    # Filter the DataFrame from the given timestamp to the end
    filtered_df = df.filter(col("@timestamp") >= time)
    # filtered_df.show()
    return filtered_df

def isRdp_userLogin(df):
    suc = filter_logs_by_event_id(df, 4624)
    checkRdp = df.filter(col("LogonType") == 10)
    return True, checkRdp
    checkRdp.show()

def detect_rdp_brute_force(df):
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
        print("Rdp Brute Force attempt detected .. !")
        return logs_under_one_min
    else:
        print("No brute force attack detected")
        return None


def rdp(df):
    failLogon = filter_logs_by_event_id(df, 4625)
    result = detect_rdp_brute_force(df)

    if result is not None:
        fromAttackTime = filter_logs_down_from_time(df, result.first()["@timestamp"])
        resultOf, data = isRdp_userLogin(fromAttackTime)
        if resultOf:
            ip_rows = data.select("RemoteIpAddress").collect()
            ip_addresses = [
                row.RemoteIpAddress
                for row in ip_rows
                if row.RemoteIpAddress is not None
            ]
            unique_ip_addresses = set(ip_addresses)
            print(f"{unique_ip_addresses} brute forced and has loged in")
            # alertUi(
            #     "RDP Attack",
            #     f"{unique_ip_addresses} brute forced and has loged in",
            #     "high",
            # )
            # user_behavior_anomaly(fromAttackTime)
            detect_special_privilege_logon(fromAttackTime)
            detect_user_account_changed(fromAttackTime)
            data.show()

        # result.show()
    else:
        print("No brute force attack detected")

def filter_logs_by_event_id(df, event_id):
    return df.filter(col("event_id") == event_id)


def checkrdp (spark,file_path):
    df_rdp = spark.read.json(file_path)
    df_selected_rdp = df_rdp.select(
        "@timestamp",
        "log",
        "message",
        "ecs",
        "event",
        col("agent.name").alias("name"),
        col("agent.id").alias("id"),
        col("agent.type").alias("type"),
        col("winlog.event_id").alias("event_id"),
        col("host.name").alias("hostname"),
        col("winlog.event_data.LogonType").alias("LogonType"),
        col("winlog.event_data.WorkstationName").alias("RemoteUserWorkStation"),
        col("winlog.event_data.IpAddress").alias("RemoteIpAddress"),
    )
    rdp(df_selected_rdp)
        
    