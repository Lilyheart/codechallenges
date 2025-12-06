import os
import re
import hashlib

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 609043,
        "2": None
    },
    "actual": {
        "1": 117946,
        "2": 3938038
    }
}

def debug(string):
    print(string)
    pass

def testStar(file, star, answer):
    correctAnswer = answers["test" if "test" in file.split(".")[0] else "actual"][star]
    if correctAnswer == None:
        print(f"Star {star} = {answer} (unknown answer) ❔")
    else:
        print(f"Star {star} = {answer} (should be {correctAnswer}) {"🎄🎄🎄" if answer == correctAnswer else "❌"}")

def code(file):
    
    print(f"===== {file} =====")

    with open(os.path.join("input", file), "r", encoding="utf-8") as input_values:
        raw_data = input_values.read().strip()
        
    # debug(raw_data)
    
    id1 = 0
    
    while(True):
        string = f"{raw_data}{id1}"
        if hashlib.md5(string.encode()).hexdigest().startswith("00000"):
            break
        id1 += 1
    
    id2 = id1
    
    while(True):
        string = f"{raw_data}{id2}"
        if hashlib.md5(string.encode()).hexdigest().startswith("000000"):
            break
        id2 += 1
    
    testStar(file, "1", id1)
    testStar(file, "2", id2)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")