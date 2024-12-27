from time import sleep
from json import dumps
from kafka import KafkaProducer
import os
from dotenv import load_dotenv
import socket

load_dotenv()
def get_ip():
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    return ip_address


system_ip = '127.0.0.1'
# topic = os.getenv('KAFKA_TOPIC')
topic = "topic1"
producer = KafkaProducer(
    bootstrap_servers=[f"{system_ip}:9092"],
    value_serializer=lambda x: dumps(x).encode("utf-8"),
)


# for i in range(1000):
#     message = {"data": f"message number {i}"}
#     print(message)
#     producer.send(f"{topic}", value=message)
#     sleep(1)  # Sleep for a second


count = 0
with open("winlogbeat.json", "r") as f:
    ass = f.readlines()
    for a in ass:
        print(a)
        # message = {"data": f"message number {i}"}
        message = a
        count += 1
        if count == 100:
            # break
            sleep(0.5)
        producer.send(f"{topic}", value=message)

    # a = f.readline()
    # message = a
    # producer.send(f"{topic}", value=message)
    # count += 1


producer.flush()
