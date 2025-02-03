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
    collect_list,
    lit,
    date_format,
    max as spark_max,
    from_json,
)
from pyspark.sql.window import Window
from pyspark.sql.types import TimestampType
from datetime import datetime
import json
import uuid  # for generating unique id for each Job entry


def detect_special_privilege_logon(df):
    df_filtered = df.filter(col("event_id") == "4672")
    count = df_filtered.count()

    if count > 0:
        print("Special privilege logon detected .. !")
        df_filtered.show()
        # spl_privilege_logon_db_save(df_filtered)  # db save function
        # job_update(
        # job_id_create_list(
        #     "Special privilege logon",
        #     "Special privilege logon detected .. !",
        #     "Critical",
        # )
        # )
        return df_filtered
    else:
        print("No special privilege logon detected.")
        # job_update(
        #     job_id_create_list(
        #         "Special privilege logon", "No Special privilege ", "Low"
        #     )
        # )
        return None


def detect_user_account_changed(df):
    df_filtered = df.filter(col("event_id") == "4738")
    count = df_filtered.count()
    # user_account_change_db_save(df_filtered)  # db save function
    if count > 0:
        print(f"User account change detected {count} times .. !")
        # job_update(
        #     job_id_create_list(
        #         f"User account change",
        #         f"User account change detected {count} times",
        #         "Mid",
        #     )
        # )
        df_filtered.show()
        return df_filtered
    else:
        print("No user account change detected.")
        # job_update(
        #     job_id_create_list(
        #         f"User account change", f"No User account change detected", "Low"
        #     )
        # )

        return None


def filter_logs_by_event_id(df, event_id):
    return df.filter(col("event_id") == event_id)


def extract_new_process_creation_logs(df):
    df_filtered = df.filter(col("winlog.event_id") == 4688)
    df_exe = df_filtered.filter(col("message").contains(".exe"))

    if df_exe:
        df_exe = df_exe.withColumn(
            "exe_files", regexp_extract(col("message"), r"(.*\.exe)", 0)
        )
        # df_exe = df_exe.withColumn("exe_files", df_exe["exe_files"].cast(StringType()))
        count = df_exe.count()

        if count > 0:
            print(f"Found {count} logs with new process being created.")
            # job_update(
            #     job_id_create_list(
            #         "extract_new_process_creation_logs",
            #         f"Found {count} logs with new process being created.",
            #         "Mid",
            #     )
            # )
            df_exe.show(truncate=False)
            # new_process_creation_log_db_save(df_exe)
            return df_exe
        else:
            # job_update(
            #     job_id_create_list(
            #         "extract_new_process_creation_logs",
            #         "No logs with new process created",
            #         "Low",
            #     )
            # )
            print("No logs with new process created")
            return None
    else:
        # job_update(
        #     job_id_create_list(
        #         "extract_new_process_creation_logs",
        #         "No logs with new process created",
        #         "Low",
        #     )
        # )
        print("No logs with new process created")
        return None


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
        # detect_brute_force_db_save(logs_under_one_min)
        # job_update(
        #     job_id_create_list("Brute Force", "Brute Force detected", "Critical")
        # )
        logs_under_one_min.show()
        return logs_under_one_min
    else:
        # job_update(job_id_create_list("Brute Force", "Brute Force Not detected", "Low"))
        return None


def detect_brute_force_with_success(df):
    failed_logon_df = detect_brute_force(df)
    if failed_logon_df is not None:
        success_logon_df = filter_logs_by_event_id(df, 4624)
        correlated_df = success_logon_df.join(failed_logon_df, ["hostname"], "inner")
        if correlated_df.count() > 0:
            print("Brute Force followed by a successful logon detected.")
            correlated_df.show()
            return correlated_df
        else:
            print("No successful logon after brute force attack.")
            return None


def detect_user_local_group_enumeration(df):
    df_filtered = df.filter(col("event_id") == "4798")
    count = df_filtered.count()

    if count > 0:
        # job_update(
        #     job_id_create_list(
        #         "detect_user_local_group_enumeration",
        #         f"A user's local group membership was enumerated {count} times.",
        #         "High",
        #     )
        # )

        print(f"A user's local group membership was enumerated {count} times.")
        df_filtered.show(truncate=False)
        # detect_user_local_group_enumeration_db_save(df_filtered)
        return df_filtered
    else:
        # job_update(
        #     job_id_create_list(
        #         "detect_user_local_group_enumeration",
        #         f"No user local group membership enumeration detected.",
        #         "Low",
        #     )
        # )
        print("No user local group membership enumeration detected.")
        return None


def group_logs_by_date_latest(df):
    df_with_day = df.withColumn("day", date_format(col("@timestamp"), "yyyy-MM-dd"))
    latest_day = df_with_day.agg(spark_max("day")).collect()[0][0]
    # print(latest_day)
    df_latest_day = df_with_day.filter(col("day") == latest_day)
    return df_latest_day

