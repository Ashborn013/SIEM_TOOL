from json import loads, dumps
from kafka import KafkaConsumer
import os
import requests
from dotenv import load_dotenv
from time import sleep
from concurrent.futures import ThreadPoolExecutor

# Load environment variables
load_dotenv()

# Constants
topic = 'topic1'
URL = 'http://localhost:223/save_json'
MAX_WORKERS = 5  # Number of threads

# Kafka Consumer setup
consumer = KafkaConsumer(
    f"{topic}",
    bootstrap_servers=["127.0.0.1:9092"],
    value_deserializer=lambda x: loads(x.decode("utf-8")),
)

# Function to send data to the server
def sendData(url, data):
    headers = {'Content-Type': 'application/json'}
    try:
        response = requests.post(url, headers=headers, data=dumps(data))
        print(f"Server response: {response.status_code}, {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Error sending data to server: {e}")

# Function to preprocess data
def preProcessData(data):
    data = loads(data)
    if "@metadata" in data:
        del data["@metadata"]
    if "winlog" in data:
        not_remove_list = ["computer_name", "event_data", "event_id", "channel", "provider_name"]
        for key in list(data["winlog"].keys()):
            if key not in not_remove_list:
                del data["winlog"][key]
    return data

# Main processing loop
with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
    while True:
        try:
            # Poll messages from Kafka
            messages = consumer.poll(timeout_ms=1000)

            if not messages:
                print("No new messages from Kafka, sleeping...")
                sleep(1)  # Avoid tight loops when no messages
            else:
                for tp, records in messages.items():
                    for record in records:
                        raw_data = record.value
                        # print(f"Received raw data: {raw_data}")
                        
                        # Preprocess data
                        processed_data = preProcessData(raw_data)
                        
                        # Send data using a thread
                        executor.submit(sendData, URL, processed_data)

        except Exception as e:
            print(f"Error occurred: {str(e)}")
