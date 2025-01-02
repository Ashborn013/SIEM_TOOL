import requests
import json

url = "http://192.168.1.34:3000/api/alertmsg"  # ip shoud be your ip wher the Ui is running


def alertUi(title, msg, threat):
    payload = json.dumps({"message": msg, "threat": threat, "title": title})
    headers = {"Content-Type": "application/json"}

    response = requests.request("POST", url, headers=headers, data=payload)

    print(response.text)
    return response.text
