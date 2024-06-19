from json import loads, dump
from kafka import KafkaConsumer
import os
from dotenv import load_dotenv

load_dotenv()

topic = os.getenv("KAFKA_TOPIC")

consumer = KafkaConsumer(
    f"{topic}",
    # bootstrap_servers=["localhost:9092"],
    bootstrap_servers=["192.168.1.9:9092"],
    value_deserializer=lambda x: loads(x.decode("utf-8")),
)


buffer = []


def updateFromBufferToFile():
    global buffer
    # with open("messages.json", "a") as f:
    #     for msg in buffer:
    #         dump(msg, f)
    #         f.write("\n")
    if os.path.exists("/dataStore/data.lock"):
        print("Lock file exists. Will not write to file or empty buffer.")
        return

    with open("/dataStore/message.json", "a") as f:
        for msg in buffer:
            dump(msg, f)
            f.write("\n")
    buffer = []

while True:
    messages = consumer.poll(timeout_ms=1000)  # wait for 5 seconds

    if not messages:
        if buffer:
            print("Writing from buffer to file")
            updateFromBufferToFile()
            
    else:
        for tp, records in messages.items():
            for record in records:
                # print(f"Received message: {record}")
                buffer.append(loads(record.value))
