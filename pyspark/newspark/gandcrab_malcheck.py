from pyspark.sql import SparkSession
from pyspark.sql.functions import col
from pyspark.sql.types import StructType, StructField, StringType, TimestampType, MapType
from utils import detect_special_privilege_logon, detect_brute_force_with_success, detect_user_local_group_enumeration

import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),  # Logs to the console
        logging.FileHandler("app.log"),  # Logs to a file named 'app.log'
    ],
)

# Define schema
schema = StructType([
    StructField("@timestamp", TimestampType(), True),
    StructField("@metadata", MapType(StringType(), StringType()), True),
    StructField("event", StructType([
        StructField("kind", StringType(), True),
        StructField("provider", StringType(), True),
        StructField("outcome", StringType(), True),
        StructField("action", StringType(), True),
        StructField("created", TimestampType(), True),
        StructField("code", StringType(), True)
    ]), True),
    StructField("log", StructType([
        StructField("level", StringType(), True)
    ]), True),
    StructField("message", StringType(), True),
    StructField("host", StructType([
        StructField("name", StringType(), True)
    ]), True),
    StructField("ecs", StructType([
        StructField("version", StringType(), True)
    ]), True),
    StructField("agent", StructType([
        StructField("ephemeral_id", StringType(), True),
        StructField("id", StringType(), True),
        StructField("name", StringType(), True),
        StructField("type", StringType(), True),
        StructField("version", StringType(), True)
    ]), True),
    StructField("winlog", StructType([
        StructField("api", StringType(), True),
        StructField("opcode", StringType(), True),
        StructField("provider_guid", StringType(), True),
        StructField("provider_name", StringType(), True),
        StructField("process", StructType([
            StructField("pid", StringType(), True),
            StructField("thread", StructType([
                StructField("id", StringType(), True)
            ]), True)
        ]), True),
        StructField("channel", StringType(), True),
        StructField("event_id", StringType(), True),
        StructField("computer_name", StringType(), True),
        StructField("task", StringType(), True),
        StructField("event_data", MapType(StringType(), StringType()), True),
        StructField("record_id", StringType(), True),
        StructField("keywords", StringType(), True)
    ]), True)
])

def detect_credential_access(df):
    credential_logs = df.filter(col("winlog.event_id") == "5379")
    if credential_logs.count() > 0:
        logging.info("Credential access detected.")
        credential_logs.show()
        return True
    else:
        logging.info("No credential access detected.")
        return False

def correlate_logs(df):
    logging.info("Starting log correlation...")
    malware_detected = False  # Flag to track if any suspicious activity is detected

    if detect_brute_force_with_success(df):
        malware_detected = True
    if detect_credential_access(df):
        malware_detected = True
    if detect_special_privilege_logon(df):
        malware_detected = True
    if detect_user_local_group_enumeration(df):
        malware_detected = True
    if malware_detected:
        logging.info("Malware detected based on log correlation.")
    else:
        logging.info("No malware detected based on log correlation.")

def checkgandcrabmalware(df):
    correlate_logs(df)
