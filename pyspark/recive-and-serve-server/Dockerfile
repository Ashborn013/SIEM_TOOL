FROM python:3.11-slim-buster

# Set the working directory in the container to /app
RUN mkdir /saveData


# Add the current directory contents into the container at /app
ADD app/. /app
WORKDIR /app
# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 223

# Run app.py when the container launches
CMD ["python", "app/main.py"]
# CMD ["tail", "-f", "/dev/null"]