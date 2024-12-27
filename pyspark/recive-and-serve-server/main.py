from flask import Flask, request, jsonify
import os
import json
from sqlFuntions import *
from flask_cors import CORS
from mogodbFunctions import *
app = Flask(__name__)
CORS(app)

FILE_PATH = "/saveData/data.json"

# @app.route("/save_json", methods=["POST"])
# def save_json():
#     data = request.get_json()
#     if not data:
#         return jsonify({"error": "Invalid JSON data"}), 400

#     if not os.path.exists(FILE_PATH):
#         with open(FILE_PATH, "w") as json_file:
#             json.dump([], json_file)

#     with open(FILE_PATH, "r") as json_file:
#         try:
#             existing_data = json.load(json_file)
#         except json.JSONDecodeError:
#             existing_data = []

#     existing_data.append(data)

#     with open(FILE_PATH, "a") as json_file:
#         json.dump(existing_data, json_file)

#     return jsonify({"message": "JSON data saved successfully"}), 200
@app.route("/save_json", methods=["POST"])
def save_json():
    # Get JSON data from the request
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400

    # Ensure the file exists
    if not os.path.exists(FILE_PATH):
        with open(FILE_PATH, "w") as json_file:
            pass  # Create the file if it doesn't exist

    # Write the JSON object as a new line in the file
    try:
        with open(FILE_PATH, "a") as json_file:
            json_file.write(json.dumps(data) + "\n")
    except Exception as e:
        return jsonify({"error": f"Failed to write to file: {e}"}), 500

    return jsonify({"message": "JSON data saved successfully"}), 200
@app.route("/")
def home():
    return "W0rking"

@app.route("/brute_force", methods=["GET"])
def get_brute_force():
    data = query_data_brute_force()
    return jsonify(data), 200

@app.route("/user_account_changes", methods=["GET"])
def get_user_account_changes():
    data = query_data_user_account_changes()
    return jsonify(data), 200

@app.route("/spl_privilege_logons", methods=["GET"])
def get_spl_privilege_logons():
    data = query_data_spl_privilege_logons()
    return jsonify(data), 200

@app.route("/explicit_credential_logon", methods=["GET"])
def get_explicit_credential_logon():
    data = query_explicit_credential_logon()
    return jsonify(data), 200

@app.route("/extract_new_process_creation_logs", methods=["GET"])
def get_extract_new_process_creation_logs():
    data = query_extract_new_process_creation_logs()
    return jsonify(data), 200

@app.route("/Job_details", methods=["GET"])
def get_job_details():
    data = query_job_details()
    data = query_job_details_from_mongo()
    return jsonify(data), 200

@app.route("/userpass", methods=["GET"])
def get_userpass():
    data = query_user_data()
    return jsonify(data), 200

@app.route("/network_disconnection", methods=["GET"])
def get_network_disconnection():
    data = query_data_network_disconnection()
    return jsonify(data), 200

@app.route("/user_local_group_enumeration", methods=["GET"])
def get_user_local_group_enumeration():
    data = query_data_user_local_group_enumeration()
    return jsonify(data), 200

@app.route("/powershell_remote_auth", methods=["GET"])
def get_powershell_remote_auth():
    data = query_data_powershell_remote_auth()
    return jsonify(data), 200

@app.route("/hostnames",methods=["GET"])
def get_hostnames():
    data = quary_user_hostnames()
    return jsonify(data) , 200

@app.route("/track_user_activity", methods=["GET"])
def get_track_user_activity():
    data = query_user_activity()
    return jsonify(data), 200

@app.route("/unusual_login_times", methods=["GET"])
def get_unusual_login_times():
    data = query_unusual_login_times()
    return jsonify(data), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True, port=223)
