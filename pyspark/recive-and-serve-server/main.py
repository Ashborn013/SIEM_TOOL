from threading import Timer
from flask import Flask, request, jsonify
import os
import json
from sqlFuntions import *
from flask_cors import CORS 
from mogodbFunctions import *
app = Flask(__name__)
CORS(app) 

log_buffer = []
BUFFER_LIMIT = 100  # Flush to MongoDB after 100 logs
FLUSH_INTERVAL = 5  # Flush every 5 seconds (in seconds)


def flush_buffer_to_mongodb():
    global log_buffer
    if log_buffer:  # Only flush if buffer has logs
        try:
            db = connectWithDb()
            collection = db["logs"]
            collection.insert_many(log_buffer)  # Insert all logs in buffer
            print(f"Inserted {len(log_buffer)} logs into MongoDB.")
            log_buffer.clear()  # Clear buffer after successful insertion
        except Exception as e:
            print(f"Failed to flush logs: {e}")

    # Schedule the next flush
    Timer(FLUSH_INTERVAL, flush_buffer_to_mongodb).start()

flush_buffer_to_mongodb() # Starts the Flush Timer

@app.route("/save_json", methods=["POST"])
def mongo_save():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400

    global log_buffer
    try:
        log_buffer.append(data)
        if len(log_buffer) >= BUFFER_LIMIT:
            flush_buffer_to_mongodb()
        return jsonify({"message": "Log buffered successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to buffer log: {e}"}), 500


@app.route("/")
def home():
    return "W0rking"

@app.route("/brute_force", methods=["GET"])
def get_brute_force():
    data = []
    return jsonify(data), 200

@app.route("/user_account_changes", methods=["GET"])
def get_user_account_changes():
    data = []
    return jsonify(data), 200

@app.route("/spl_privilege_logons", methods=["GET"])
def get_spl_privilege_logons():
    data = []
    return jsonify(data), 200

@app.route("/explicit_credential_logon", methods=["GET"])
def get_explicit_credential_logon():
    data = []
    return jsonify(data), 200

@app.route("/extract_new_process_creation_logs", methods=["GET"])
def get_extract_new_process_creation_logs():
    data = []
    return jsonify(data), 200
# Ok
@app.route("/Job_details", methods=["GET"])
def get_job_details():
    data = query_job_details_from_mongo()
    return jsonify(data), 200



@app.route("/network_disconnection", methods=["GET"])
def get_network_disconnection():
    data = []
    return jsonify(data), 200

@app.route("/user_local_group_enumeration", methods=["GET"])
def get_user_local_group_enumeration():
    data = []
    return jsonify(data), 200

@app.route("/powershell_remote_auth", methods=["GET"])
def get_powershell_remote_auth():
    data = []
    return jsonify(data), 200

@app.route("/hostnames",methods=["GET"])
def get_hostnames():
    data = []
    return jsonify(data) , 200

@app.route("/track_user_activity", methods=["GET"])
def get_track_user_activity():
    data = []
    return jsonify(data), 200

@app.route("/unusual_login_times", methods=["GET"])
def get_unusual_login_times():
    data = []
    return jsonify(data), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=223)
