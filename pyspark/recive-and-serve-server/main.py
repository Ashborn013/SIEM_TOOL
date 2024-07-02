from flask import Flask, request, jsonify
import json
import os
from sqlFuntions import *

app = Flask(__name__)


FILE_PATH = "/saveData/data.json"


@app.route("/save_json", methods=["POST"])
def save_json():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400

    if not os.path.exists(FILE_PATH):
        with open(FILE_PATH, "a") as json_file:
            pass
    with open(FILE_PATH, "a") as json_file:
        json_file.write(json.dumps(data))
        json_file.write("\n")

    return jsonify({"message": "JSON data saved successfully"}), 200


@app.route("/")
def home():
    return "Hello, World!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=223)
