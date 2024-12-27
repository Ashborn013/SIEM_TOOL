from time import sleep
import json
import os
import requests

URL = 'http://192.168.1.9:223/save_json'

def sendData(url,data):
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, headers=headers, data=json.dumps(data))
    print(response,response.text)

def preProcessData(data):
    json_data = json.loads(data)
    
    if "@metadata" in json_data:
        del json_data["@metadata"]
        
    if "winlog" in json_data:
        not_remove_list = ["computer_name","event_data","event_id","channel","provider_name"]
        for x in list(json_data["winlog"].keys()):
            if x not in not_remove_list:
                del json_data["winlog"][x]
    return json_data

while True : 


    try:
        with open("/dataStore/message.json", "r") as f:
            lines = f.readlines()


        if lines:
            # print("Ther is data")
            # print(lines)
            with open("/dataStore/data.lock", "a") as lock_file:
                pass

            for i in lines:
                sendData(URL,preProcessData(i))

            with open("/dataStore/message.json", "w") as f:
                f.writelines([])


    except Exception as e:
        # print(f"{str(e)}")
        with open("/dataStore/message.json", "w") as f:
            f.writelines(lines)

    finally:
        try:
            os.remove("/dataStore/data.lock")
        except:
            print("sleeping")
            sleep(3)

