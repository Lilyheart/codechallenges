import os
import re
import numpy as np

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 13,
        "2": 43
    },
    "actual": {
        "1": 1553,
        "2": None
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
        print(f"Star {star} = {answer} (should be {correctAnswer}) {"✅" if answer == correctAnswer else "❌"}")

def code(file):
    
    print(f"===== {file} =====")

    with open(os.path.join("input", file), "r", encoding="utf-8") as input_values:
        raw_data = np.array([[1 if i == "@" else 0 for i in list(line)] for line in input_values.read().split("\n")])
        
    # debug(raw_data)
    
    count = 0
        
    def processRow(array):
        subcount = 0
        toRemove = []
        for row in range(len(array)):
            for col in range(len(array[row])):
                if array[row][col] != 1:
                    continue # stop looking at this col but look at the next one
                
                firstR = max(0, row - 1)
                firstC = max(0, col - 1)
                lastR = min(len(array)-1, row + 1)+1
                lastC = min(len(array[0])-1, col + 1)+1
                # debug(np.sum(raw_data[firstR:lastR, firstC:lastC] - raw_data[row][col]))
                if np.sum(array[firstR:lastR, firstC:lastC]) - 1 < 4:
                    toRemove.append((row, col))
                    subcount += 1
                    
        for r, c in toRemove:
            array[r][c] = 0
        return (subcount, array)


    star1Count, _ = processRow(np.copy(raw_data))
    
    # debug(raw_data)
    
    star2Count = 0
    star2Array = np.copy(raw_data)
    loop = 0
    hasChange = True
    while(hasChange):
        loop +=1 
        subCount, star2Array = processRow(star2Array)
        star2Count += subCount
        hasChange = subCount > 0
                    
    testStar(file, "1", star1Count)
    testStar(file, "2", star2Count)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")