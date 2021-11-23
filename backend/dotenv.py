"""
.env file parser/loader
author: Andy Chamberlain

libraries exist for this but its so simply I just decided to do it myself here instead of adding another dependency
"""

import os

def load_dotenv(path):
    lines = []
    with open(f"{path}/.env", "r") as f:
        # lines = f.read().split("\n")
        lines = f.readlines()
        
    # put each item into os.environ    
    for line in lines:
        name, value = line.split("=")
        os.environ[name] = value
