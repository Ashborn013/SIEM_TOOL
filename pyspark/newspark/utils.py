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
