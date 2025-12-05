import os
import re
import numpy as np

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 3,
        "2": 14
    },
    "actual": {
        "1": 513,
        "2": 339668510830757
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
        raw_data = [line for line in input_values.read().split("\n")]
            
    freshIDs = sorted([[int(l) for l in line.split("-")] for line in raw_data[:raw_data.index("")]])
    ingredients = np.array([int(l) for l in raw_data[raw_data.index("")+1:]])
    
    # debug(freshIDs)
    # debug(ingredients)
    
    count = 0
    
    for ingredient in ingredients:
        for ids in freshIDs:
            if ingredient >= ids[0] and ingredient <= ids[1]:
                count += 1
                break
            
    # ================================================================================================
    
    cleanIDs = [freshIDs[0]]
    
    for id in range(1, 1+len(freshIDs[1:])):
        if (freshIDs[id][0] >= cleanIDs[-1][0]) and (freshIDs[id][0] <= cleanIDs[-1][1]):
            cleanIDs[-1][1] = max(cleanIDs[-1][1], freshIDs[id][1])
        else:
            cleanIDs.append(freshIDs[id])
                
    valid = 0
    for low, high in cleanIDs:
        valid += high - low + 1

    testStar(file, "1", count)
    testStar(file, "2", valid)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")