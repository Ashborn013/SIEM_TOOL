import os
import json

def merge_ndjson_files(directory, output_file):
    # List to store all lines from all files
    merged_lines = []

    # Iterate over all files in the directory
    for filename in os.listdir(directory):
        if filename.endswith('.json') :
            file_path = os.path.join(directory, filename)
            with open(file_path, 'r', encoding='utf-8') as file:
                for line in file:
                    merged_lines.append(line.strip())

    # Write all lines to the output file
    with open(output_file, 'w', encoding='utf-8') as outfile:
        for line in merged_lines:
            outfile.write(line + '\n')

# Directory containing the .ndjson files
input_directory = '.'
# Output file path
output_file = 'altered.json'

# Merge the files
merge_ndjson_files(input_directory, output_file)