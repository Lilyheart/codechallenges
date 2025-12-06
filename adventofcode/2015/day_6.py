import os
import re
import numpy as np

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 998996,
        "2": None
    },
    "actual": {
        "1": 569999,
        "2": 17836115
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
        raw_data = [line.strip().split(" ") for line in input_values.read().split("\n")]
        
    for d in raw_data:
        if len(d) == 5:
            d.pop(0)
        d.pop(2)
        d[1] = list(map(int, d[1].split(",")))
        d[2] = list(map(int, d[2].split(",")))
        
    # debug(raw_data)
    
    lights1 = np.zeros((1000, 1000), dtype=bool)
    lights2 = np.zeros((1000, 1000), dtype=int)
        
    for cmd, (x1, y1), (x2, y2) in raw_data:
        region = np.s_[x1:x2+1, y1:y2+1]
        if cmd == "on":
            lights1[region] = True
            lights2[region] += 1
        elif cmd == "off":
            lights1[region] = False
            lights2[region] = np.maximum(0, lights2[region] - 1)
        else:
            lights1[region] = ~lights1[region]
            lights2[region] += 2
       
    testStar(file, "1", np.sum(lights1))
    testStar(file, "2", np.sum(lights2))
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")