import json

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

def processFile(input_file_path, output_file_path):
    with open(input_file_path, 'r') as infile, open(output_file_path, 'w') as outfile:
        for line in infile:
            processed_data = preProcessData(line)
            outfile.write(json.dumps(processed_data) + '\n')

# Example usage
input_file_path = 'altered.json'
output_file_path = 'output.json'
processFile(input_file_path, output_file_path)