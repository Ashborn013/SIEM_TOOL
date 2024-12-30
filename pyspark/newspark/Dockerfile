FROM python:3.12-slim

# Install Java (required for Spark)
RUN apt-get update 
RUN apt-get install -y  openjdk-17-jdk
# RUN apt-get install -y python3-distutils

# Install pyspark
# RUN pip install distutils --break-package-system
RUN pip install pyspark pymongo[srv] pandas numpy

# Copy your application code
COPY . /app
WORKDIR /app

# Set the entrypoint
ENTRYPOINT ["python", "main.py"]