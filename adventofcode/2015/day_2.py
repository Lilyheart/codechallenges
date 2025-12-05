import os
import re

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 58+43,
        "2": 34+14
    },
    "actual": {
        "1": 1598415,
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
        print(f"Star {star} = {answer} (should be {correctAnswer}) {"🎄🎄🎄" if answer == correctAnswer else "❌"}")

def code(file):
    
    print(f"===== {file} =====")

    with open(os.path.join("input", file), "r", encoding="utf-8") as input_values:
        raw_data = [list(int(item) for item in line.strip().split("x")) for line in input_values.read().split("\n")]
    
    totalPaper = 0
    totalRibbon = 0
    
    for l, w, h in raw_data:
        totalPaper += (2*l*w + 2*w*h + 2*h*l + min(l*w, w*h, h*l))
        totalRibbon += 2 * ((l + w + h) - max(l, w, h))
        totalRibbon += l*w*h
    
    testStar(file, "1", totalPaper)
    testStar(file, "2", totalRibbon)
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")