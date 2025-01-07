import os
import uuid
import time
from mysql.connector import pooling, Error
from pyspark.sql import DataFrame
from typing import List, Any

# ENV variables
DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = int(os.getenv("DB_PORT", "3306"))
DB_NAME = os.getenv("DB_NAME", "pyspark")
DB_USER = os.getenv("DB_USER", "root")
DB_PASS = os.getenv("DB_PASS", "root")

# Efficient Connection Mangement
connection_pool = pooling.MySQLConnectionPool(
    pool_name="ConnectionPool1",
    pool_size=5,
    pool_reset_session=True,  # reset session variables after connection is closed.
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME,
    user=DB_USER,
    password=DB_PASS,
)


def get_connection():
    return connection_pool.get_connection()


def execute_query(query: str, params: tuple = None, many: bool = False):
    conn = get_connection()
    try:
        with conn.cursor() as cursor:
            if many:
                cursor.executemany(query, params)
            else:
                cursor.execute(query, params)
            conn.commit()
    except Error as e:
        print(f"An error occurred: {e}")
        conn.rollback()
    finally:
        conn.close()


def create_table(table_name: str, columns: List[str]):
    query = f"""
    CREATE TABLE IF NOT EXISTS {table_name} (
        {', '.join(columns)}
    )
    """
    execute_query(query)


def insert_data(table_name: str, df: DataFrame):
    columns = df.columns
    placeholders = ", ".join(["%s"] * len(columns))
    query = f"""
    INSERT INTO {table_name} ({', '.join(columns)})
    VALUES ({placeholders})
    """

    pandas_df = df.toPandas()
    rows = [tuple(row) for row in pandas_df.to_numpy()]
    execute_query(query, rows, many=True)


def save_to_db(df: DataFrame, table_name: str):
    if df is not None and df.count() > 0:
        columns = [f"{col} TEXT" for col in df.columns]
        create_table(table_name, columns)
        insert_data(table_name, df)


def detect_brute_force_db_save(df: DataFrame):
    save_to_db(df, "brute_force")


def user_account_change_db_save(df: DataFrame):
    save_to_db(df, "user_account_changes")


def spl_privilege_logon_db_save(df: DataFrame):
    save_to_db(df, "spl_privilege_logons")


def explicit_credential_logon_db_save(df: DataFrame):
    save_to_db(df, "explicit_credential_logon")


def new_process_creation_log_db_save(df: DataFrame):
    save_to_db(df, "new_process_creation_log")


def detect_network_disconnection_db_save(df: DataFrame):
    save_to_db(df, "network_disconnection")


def detect_user_local_group_enumeration_db_save(df: DataFrame):
    save_to_db(df, "user_local_group_enum")


def powershell_remote_auth_db_save(df: DataFrame):
    save_to_db(df, "powershell_remote_auth")


def track_user_activity_db_save(df: DataFrame):
    save_to_db(df, "tract_user_activity")


def user_behavior_anomaly_db_save(df: DataFrame):
    save_to_db(df, "user_behavior_anomaly")


def save_unique_hostnames(hostnames: List[str]):
    create_table("hostname", ["hostname TEXT UNIQUE"])
    query = "INSERT IGNORE INTO hostname (hostname) VALUES (%s)"
    execute_query(query, [(hostname,) for hostname in set(hostnames)], many=True)


def detect_brute_force_with_success_db_save(df: DataFrame):
    save_to_db(df, "brute_force_success_logon")


def correlate_execution_policy_attack_db_save(df: DataFrame):
    save_to_db(df, "execution_policy_attack")


def detect_rdp_brute_force_db_save(df: DataFrame):
    save_to_db(df, "rdp_brute_force")


def correlate_windows_firewall_attack_db_save(df: DataFrame):
    save_to_db(df, "windows_firewall_attack")


def bonzi_malware_correlation_db_save(df: DataFrame):
    save_to_db(df, "bonzi_malware_correlation")


def job_id_create_list(job: str, message: str, level: str) -> List[Any]:
    return [time.time(), job, message, level, str(uuid.uuid4())]


def job_update(df: List[Any]):
    create_table(
        "Jobs", ["time TEXT", "Job TEXT", "message TEXT", "level TEXT", "Job_id TEXT"]
    )
    query = """
    INSERT INTO Jobs (time, Job, message, level, Job_id)
    VALUES (%s, %s, %s, %s, %s)
    """
    execute_query(query, tuple(df))
