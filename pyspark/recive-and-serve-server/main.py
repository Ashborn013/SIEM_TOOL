from flask import Flask, request, jsonify
import sqlite3
import os
import json
from sqlFuntions import * 
app = Flask(__name__)

FILE_PATH = "/saveData/data.json"

@app.route("/save_json", methods=["POST"])
def save_json():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400

   
    if not os.path.exists(FILE_PATH):
        with open(FILE_PATH, "w") as json_file:
            json.dump([], json_file)

    # Read the existing data
    with open(FILE_PATH, "r") as json_file:
        try:
            existing_data = json.load(json_file)
        except json.JSONDecodeError:
            existing_data = []

    # Append the new data
    existing_data.append(data)

    # Save back the updated data
    with open(FILE_PATH, "w") as json_file:
        json.dump(existing_data, json_file, indent=4)

    return jsonify({"message": "JSON data saved successfully"}), 200

@app.route("/")
def home():
    return "Hello, World!"

def query_data(table_name):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name}")
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "timestamp": row[0],
            "log": row[1],
            "message": row[2],
            "ecs": row[3],
            "event": row[4],
            "name": row[5],
            "id": row[6],
            "type": row[7],
            "event_id": row[8],
            "hostname": row[9],
        }
        for row in rows
    ]

@app.route("/brute_force", methods=["GET"])
def get_brute_force():
    data = query_data("brute_force")
    return jsonify(data), 200

@app.route("/user_account_changes", methods=["GET"])
def get_user_account_changes():
    data = query_data("user_account_changes")
    return jsonify(data), 200

@app.route("/spl_privilege_logons", methods=["GET"])
def get_spl_privilege_logons():
    data = query_data("spl_privilege_logons")
    return jsonify(data), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=223)
