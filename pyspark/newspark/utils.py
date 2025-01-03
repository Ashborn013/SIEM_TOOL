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