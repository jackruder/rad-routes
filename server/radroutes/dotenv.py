"""
.env file parser/loader
author: Andy Chamberlain

libraries exist for this but its so simply I just decided to do it myself here instead of adding another dependency
"""

import os

def load_dotenv(path):
    lines = []
    with open(f"{path}/.env", "r") as f:
        lines = f.read().split("\n")
    
    # split each line up by spaces (if there are no spaces it will still put the value into a length-1 list)
    for i, line in enumerate(lines):
        lines[i] = line.split(" ")

    # put each item into os.environ    
    for line in lines:
        for item in line:
            name, value = item.split("=")
            os.environ[name] = value
