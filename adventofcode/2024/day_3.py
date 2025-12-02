import os
import re

DAY = 3

answers = {
    "1": {
        "test": 161,
        "actual": 174561379
    },
    "2": {
        "test": 48,
        "actual": None # < 111972528
    }
}

def debug(string):
    # print(string)
    pass

def testStar(file, star, answer):
    correctAnswer = answers[star]["test" if "test" in file.split(".")[0] else "actual"]
    if correctAnswer == None:
        print(f"Star {star} = {answer} (unknown answer) ❔")
    else:
        print(f"Star {star} = {answer} (should be {correctAnswer}) {"✅" if answer == correctAnswer else "❌"}")

def code(file):
    
    print(f"===== {file} =====")

    with open(os.path.join("input", file), "r", encoding="utf-8") as input_values:
        raw_data = input_values.read().split("\n")
        
    sum1 = 0
    sum2 = 0
    isDo = True
    # debug(raw_data)
    for data in raw_data:
        for a, b in re.findall("mul\\(([0-9]+),([0-9]+)\\)", data):
            sum1 += int(a)*int(b)
            # debug(f"{a}x{b}={int(a)*int(b)}")
        # debug(re.findall("mul\\([0-9]+,[0-9]+\\)|do\\(\\)|don't\\(\\)", data))
        for d in re.findall("mul\\([0-9]+,[0-9]+\\)|do\\(\\)|don't\\(\\)", data):
            if d.startswith("don't"):
                isDo = False
            elif d.startswith("do"):
                isDo = True
            elif isDo:
                a, b = tuple(re.search("([0-9]+),([0-9]+)", d).group().split(","))
                sum2 += int(a)*int(b)
            
    testStar(file, "1", sum1)
    testStar(file, "2", sum2)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")