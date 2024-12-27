FROM jupyter/pyspark-notebook:x86_64-spark-3.5.0
# USER root
RUN mkdir  ~/DataBaseStore
RUN touch ~/DataBaseStore/database.db

RUN pip install pyspark
RUN pip install mysql-connector-python pymongo
# CMD  ["tail", "-f", "/dev/null"]

# CMD [ "python", "/home/jovyan/work/main.py" ]