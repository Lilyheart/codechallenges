import os
import re

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": -1,
        "2": 5
    },
    "actual": {
        "1": 232,
        "2": 1783
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
        raw_data = input_values.read()
        
    # debug(raw_data)
    
    floor = 0
    position = 0
    dirs = {"(": 1, ")": -1}
    
    for i, char in enumerate(raw_data, 1):
        floor += dirs[char]
        if position == 0 and floor < 0:
            position = i
    
    testStar(file, "1", floor)
    testStar(file, "2", position)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")