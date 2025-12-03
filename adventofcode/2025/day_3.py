import os
import re

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 357,
        "2": 3121910778619
    },
    "actual": {
        "1": 17100,
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
        raw_data = [list(int(item) for item in list(line)) for line in input_values.read().split("\n")]
        
    # debug(raw_data)
    
    def findMax(array, place, totalplace):
        stopIndex = None if place == totalplace else place - totalplace
        digit = max(array[:stopIndex])
        index = array.index(digit)
        # debug(f"array {array}, place {place}, totalplace {totalplace}")
        # debug(f"array={array[:stopIndex]} gives {digit} @ {index}")

        
        return (digit, index)
    
    sum2 = 0
    digitsNeeded = 2
    
    for bank in raw_data:
        digits = ""
        index = 0
        for i in range(digitsNeeded):
            digit, index = findMax(bank[index:], i+1, digitsNeeded)
            digits += str(digit)
            index = index+1
        sum2 += int(digits)
    
    sum12 = 0
    digitsNeeded = 12
    
    for bank in raw_data:
        digits = ""
        leftIndex = 0
        for i in range(digitsNeeded):
            digit, index = findMax(bank[leftIndex:], i+1, digitsNeeded)
            digits += str(digit)
            leftIndex += index+1
        sum12 += int(digits)
        # debug(digits)
    
    testStar(file, "1", sum2)
    testStar(file, "2", sum12)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")