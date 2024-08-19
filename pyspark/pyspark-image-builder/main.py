from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count, to_json, lag , regexp_extract
from pyspark.sql.window import Window
from pyspark.sql.types import TimestampType
from datetime import datetime
import json
from saveToSql import *
import uuid # for generating unique id for each Job entry

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
        Job_Update(Job_id_create_list("Brute Force", "Brute Force detected", "Critical"))
        return logs_under_one_min
    else:
        Job_Update(Job_id_create_list("Brute Force", "Brute Force Not detected", "Low"))
        return None


def detect_special_privilege_logon(df):
    df_filtered = df.filter(col("event_id") == "4672")
    count = df_filtered.count()

    if count > 0:
        print("Special privilege logon detected .. !")
        df_filtered.show()
        spl_privilege_logon_db_save(df_filtered) # db save function
        Job_Update(Job_id_create_list("Special privilege logon", "Special privilege logon detected .. !", "Critical"))
        return df_filtered
    else:
        print("No special privilege logon detected.")
        Job_Update(Job_id_create_list("Special privilege logon", "No Special privilege ", "Low"))
        return None


def detect_user_account_changed(df):
    df_filtered = df.filter(col("event_id") == "4738")
    count = df_filtered.count()
    user_account_change_db_save(df_filtered) # db save function
    if count > 0:
        print(f"User account change detected {count} times .. !")
        Job_Update(Job_id_create_list(f"User account change", f"User account change detected {count} times", "Mid"))
        df_filtered.show()
        return df_filtered
    else:
        print("No user account change detected.")
        Job_Update(Job_id_create_list(f"User account change", f"No User account change detected", "Low"))

        return None


def explicit_credential_logon(df):
    df_filtered = filter_logs_by_event_id(df, 4648)
    df_valid = regex_query(df_filtered, [r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'])

    if df_valid:
        df_valid = df_valid.withColumn("email", regexp_extract(col("message"), r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', 0))
        count = df_valid.count()

        if count > 0:
            Job_Update(Job_id_create_list("Explicit credentials logon", f"Logon with explicit credentials detected {count} times (Event ID 4648) with valid email addresses.. !", "High"))
            print(f"Logon with explicit credentials detected {count} times (Event ID 4648) with valid email addresses.. !")
            # event_4648_db_save(df_valid)  # db save function
            # Job_Update(Job_id_create_list("Event ID 4648", f"Logon with explicit credentials detected {count} times with valid email addresses", "High"))
            df_valid.show()
            explicit_credential_logon_db_save(df_valid)
            # return df_valid
        else:
            print("No valid logon with explicit credentials detected (Event ID 4648).")
            Job_Update(Job_id_create_list("Explicit credentials logon", "No valid logon with explicit credentials detected", "Low"))
            # return None
    else:
        print("No valid logon with explicit credentials detected (Event ID 4648).")
        Job_Update(Job_id_create_list("Explicit credentials logon", "No valid logon with explicit credentials detected", "Low"))
        # return None


def extract_new_process_creation_logs(df):
    df_filtered = df.filter(col("event_id") == 4688)
    df_exe = df_filtered.filter(col("message").contains(".exe"))

    if df_exe:
        df_exe = df_exe.withColumn("exe_files", regexp_extract(col("message"), r'(.*\.exe)', 0))
        # df_exe = df_exe.withColumn("exe_files", df_exe["exe_files"].cast(StringType()))
        count = df_exe.count()

        if count > 0:
            print(f"Found {count} logs with new process being created.")
            df_exe.show(truncate=False)
            return df_exe
        else:
            print("No logs with new process created")
            return None
    else:
        print("No logs with new process created")
        return None


def detect_network_disconnection(df):
    df_filtered = df.filter(col("event_id") == "27")  
    count = df_filtered.count()
    
    if count > 0:
        print(f"Network link disconnection detected {count} times.")
        df_filtered.show(truncate=False)
        return df_filtered
    else:
        print("No network link disconnection detected.")
        return None


    
def detect_user_local_group_enumeration(df):
    df_filtered = df.filter(col("event_id") == "4798") 
    count = df_filtered.count()
    
    if count > 0:
        print(f"A user's local group membership was enumerated {count} times.")
        df_filtered.show(truncate=False)
        return df_filtered
    else:
        print("No user local group membership enumeration detected.")
        return None


    
def powershell_remote_auth(df):
    df_filtered = df.filter(col("winlog.event_id") == "32850")
    count = df_filtered.count()
    if count > 0:
        print(f"PowerShell remote authentication detected {count} times!")
        df_filtered.show()
        return df_filtered
    else:
        print("No PowerShell remote authentication detected.")
        return None



def track_user_activity(df, agent_id):
    df_user_activity = df.filter(col("agent").getItem("id") == agent_id)
    
    if df_user_activity.count() > 0:
        df_user_activity.orderBy("@timestamp").show()
        return df_user_activity
    else:
        print(f"No activity found for agent ID: {agent_id}")
        return None
    


def detect_unusual_login_times(df):
    return df.filter((col("event_id") == 4624) & ((hour(col("@timestamp")) < 6) | (hour(col("@timestamp")) > 18)))

def user_behavior_anomaly(df):
    df = df.withColumn("@timestamp", col("@timestamp").cast(TimestampType()))

    # Grouping by user ID and calculating event count and average timestamp
    user_activity_df = df.groupBy("id").agg(
        count("event_id").alias("event_count"),
        avg(col("@timestamp").cast("long")).alias("avg_timestamp")
    )


    '''
    # Calculate the average event count across all users and store it in a new DataFrame
    avg_event_count_df = user_activity_df.agg(avg("event_count").alias("avg_event_count"))
    # Show the output of the avg_event_count_df
    avg_event_count_df.show()
    # Create a DataFrame that filters users with an event_count greater than the average event count
    filtered_df = user_activity_df.filter(col("event_count") > avg_event_count_df.first()["avg_event_count"])
    # Show the output of the filtered DataFrame
    filtered_df.show()
    '''



    # Flagging users with unusual event counts
    anomaly_df = user_activity_df.filter(col("event_count") > user_activity_df.agg(avg("event_count")).first()[0] * 2)
    anomaly_df.show()
    unusual_login_df = detect_unusual_login_times(df) #Detecting unusual logins

    # Joining based on the user ID to see if flagged users had unusual login times
    if anomaly_df.count() > 0:
        flagged_users = anomaly_df.select("id").rdd.flatMap(lambda x: x).collect()
        print(f"Flagged users with unusual event counts: {flagged_users}")
        anomaly_df.show()
        flagged_unusual_login_df = anomaly_df.join(unusual_login_df, "id", "inner")
        if flagged_unusual_login_df.count() > 0:
            print("Flagged users with unusual login times:")
            flagged_unusual_login_df.show()

        return anomaly_df
    else:
        print("No anomalies detected in user behavior.")
        return None    








def rule_engine(df, rules):
    for rule in rules:
        if df is None:
            print("DataFrame is None, skipping rule:", rule)
            continue

        if rule["type"] == "filter_by_event_id":
            filter_logs_by_event_id(df, rule["event_id"])
        elif rule["type"] == "count_by_hostname":
            count_logs_by_hostname(df)
        elif rule["type"] == "regex_query_test":
            regex_query(df, ["failed login", "error", "critical"])
        elif rule["type"] == "main_event_ids":
            all_notable_event_id(df)
        elif rule["type"] == "brute_force_detection":
            detect_brute_force(df)
        elif rule["type"] == "special_privilege_logon_detection":
            detect_special_privilege_logon(df)
        elif rule["type"] == "user_account_change":
            detect_user_account_changed(df)
        elif rule["type"] == "explicit_credential_logon":
            explicit_credential_logon(df)
        elif rule["type"] == "new_process_creation":
            extract_new_process_creation_logs(df)
        elif rule["type"] == "net_link_disconnection":
            detect_network_disconnection(df)
        elif rule["type"] == "user_grp_enum":
            detect_user_local_group_enumeration(df)
        elif rule["type"] == "powershell_remote_auth":
            powershell_remote_auth(df)
        elif rule["type"] == "track_activity":
            track_user_activity(df,"47c6da14-cd88-47c0-b99b-9096a7bde971")
        elif rule["type"] == "user_behavior_anomaly":
            df = user_behavior_anomaly(df)
    # return df


# ----------------- Main -----------------------

rules = [
    {"type": "filter_by_event_id", "event_id": "4738"},
    {"type": "brute_force_detection"},
    {"type": "special_privilege_logon_detection"},
    {"type": "user_account_change"},
    {"type": "explicit_credential_logon"},
    {"type": "new_process_creation"},
    {"type": "net_link_disconnection"},
    {"type": "user_grp_enum"},
    {"type": "powershell_remote_auth"},
    {"type": "track_activity"},
    {"type": "user_behavior_anomaly"},
]

# Apply rules using the rule engine
result_df = rule_engine(df_selected, rules)
# result_df.show(truncate=True)

# output = detect_brute_force(df_selected)
# if output is not None:
    # print("Brute Force attempt detected .. !")
    # output.show()
# else:
    # print("No brute force attack detected")

# testing the functions

# detect_brute_force              (df_selected)
# detect_special_privilege_logon  (df_selected)
# detect_user_account_changed     (df_selected)

# output_path = f"/home/jovyan/work/categorized_winlogbeat-{datetime.now().isoformat()}"
# result_df.coalesce(1).write.json(output_path)




spark.stop()
