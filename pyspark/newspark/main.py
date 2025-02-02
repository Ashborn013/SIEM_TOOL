from pymongo import MongoClient
from pyspark.sql import SparkSession
import bson
from mongodbfunctions import viewAllData
from libs import fromMongoToSparkdf
from time import sleep
import logging
import signal
import sys
from utils import *

from rdpcheck import checkrdp
from malware_check import checkmalware
from windows_firewall_attack import correlate_windows_firewall_attack
from powershell_attack_cor import correlate_execution_policy_attack
from gandcrab_malcheck import checkgandcrabmalware

# Initialize logging


logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler(),  # Logs to the console
        logging.FileHandler("app.log"),  # Logs to a file named 'app.log'
    ],
)

# Initialize SparkSession
spark = (
    SparkSession.builder.appName("MongoDB to Spark")
    .master("spark://spark:7077")
    .getOrCreate()
)

count = 0
running = True


def signal_handler(sig, frame):
    global running
    logging.info("Shutting down gracefully...")
    running = False


signal.signal(signal.SIGINT, signal_handler)
signal.signal(signal.SIGTERM, signal_handler)


def app():
    global count, running
    while running:
        try:
            logging.info("Fetching data from MongoDB...")
            data = viewAllData()
            count2 = len(data)

            if count != count2:
                logging.info("Data change detected. Processing data...")
                df = fromMongoToSparkdf(
                    spark, data
                )  # this can be ran in the coreFunctions need to discuss
                coreFunctions(df)
                count = count2
            else:
                logging.info("No data change detected.")

        except Exception as e:
            logging.error(f"An error occurred: {e}", exc_info=True)

        finally:
            sleep(60)


def coreFunctions(df):
    checkrdp(df)
    checkmalware(df)
    correlate_windows_firewall_attack(df)
    correlate_execution_policy_attack(df)
    checkgandcrabmalware(df)

    # df.show(truncate=False, n=20)


if __name__ == "__main__":
    try:
        app()
    finally:
        logging.info("Stopping SparkSession...")
        spark.stop()
