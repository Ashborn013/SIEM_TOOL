FROM python:3.11-slim

WORKDIR /dataProcessApp
ADD . /dataProcessApp
# RUN mkdir  /dataStore
RUN pip install  -r requirements.txt
# RUN apt-get update -y
# RUN apt-get install -y iputils-ping
RUN mkdir  /dataStore
RUN touch /dataStore/message.json
CMD ["python","-u", "main.py"]