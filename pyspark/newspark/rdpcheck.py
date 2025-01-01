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

# from interactwithUi import alertUi
from utils import detect_special_privilege_logon, detect_user_account_changed


def isRdp_userLogin(df):
    suc = filter_logs_by_event_id(df, 4624)
    checkRdp = df.filter(col("LogonType") == 10)
    return True, checkRdp


def filter_logs_down_from_time(df, time):
    # Filter the DataFrame from the given timestamp to the end
    filtered_df = df.filter(col("@timestamp") >= time)
    # filtered_df.show()
    return filtered_df


def isRdp_userLogin(df):
    suc = filter_logs_by_event_id(df, 4624)
    checkRdp = df.filter(col("LogonType") == 10)
    return True, checkRdp


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
            user_behavior_anomaly(fromAttackTime)
            detect_special_privilege_logon(fromAttackTime)
            detect_user_account_changed(fromAttackTime)
            data.show()

        # result.show()
    else:
        print("No brute force attack detected")


def filter_logs_by_event_id(df, event_id):
    return df.filter(col("event_id") == event_id)


def user_behavior_anomaly(df):
    df = df.withColumn("@timestamp", col("@timestamp").cast(TimestampType()))

    # Grouping by user ID and calculating event count and average timestamp
    user_activity_df = df.groupBy("id").agg(
        count("event_id").alias("event_count"),
        avg(col("@timestamp").cast("long")).alias("avg_timestamp"),
    )

    # Flagging users with unusual event counts
    anomaly_df = user_activity_df.filter(
        col("event_count") > user_activity_df.agg(avg("event_count")).first()[0] * 2
    )
    anomaly_df.show()
    unusual_login_df = detect_unusual_login_times(df)  # Detecting unusual logins

    # Joining based on the user ID to see if flagged users had unusual login times
    if anomaly_df.count() > 0:
        flagged_users = anomaly_df.select("id").rdd.flatMap(lambda x: x).collect()
        print(f"Flagged users with unusual event counts: {flagged_users}")
        anomaly_df.show()
        # user_behavior_anomaly_db_save(anomaly_df)
        flagged_unusual_login_df = anomaly_df.join(unusual_login_df, "id", "inner")
        if flagged_unusual_login_df.count() > 0:
            print("Flagged users with unusual login times:")
            flagged_unusual_login_df.show()

        return anomaly_df
    else:
        print("No anomalies detected in user behavior.")
        return None


def detect_unusual_login_times(df):
    return df.filter(
        (col("event_id") == 4624)
        & ((hour(col("@timestamp")) < 6) | (hour(col("@timestamp")) > 18))
    )


def checkrdp(df_rdp):

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
    df_selected_rdp.show()
    rdp(df_selected_rdp)
