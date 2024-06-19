FROM python:3.11-slim

WORKDIR /dataSaveApp
ADD . /dataSaveApp
RUN mkdir  /dataStore
RUN pip install  -r requirements.txt
# RUN apt-get update -y
# RUN apt-get install -y iputils-ping
CMD ["python","-u", "consumer.py"]