import os
import re

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 2,
        "2": 2
    },
    "actual": {
        "1": 255,
        "2": 55
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
    
    print(f"===== {file}.txt =====")
    
    file1, file2 = file, file
    
    if "test" in file:
        file1 = file + "_1"
        file2 = file + "_2"

    with open(os.path.join("input", f"{file1}.txt"), "r", encoding="utf-8") as input_values:
        raw_data1 = input_values.read().split("\n")

    with open(os.path.join("input", f"{file2}.txt"), "r", encoding="utf-8") as input_values:
        raw_data2 = input_values.read().split("\n")
        
    # debug(raw_data)
    
    def vowelRule(s):
        return len(re.findall(r"[aeiou]", s)) >= 3
    
    def doubleLetterRule(s):
        return bool(re.search(r"(.)\1", s))
    
    def noStringRule(s):
        return not re.search(r"(ab|cd|pq|xy)", s)
    
    # =====
    
    def dupsRule(s):
        return bool(re.search(r"(..).*\1", s))
    
    def repeatRule(s):
        return bool(re.search(r"(.).\1", s))
    
    nice1 = 0
    
    for s in raw_data1:
        # debug(f"~~~~~~~~~~~{s}")
        if vowelRule(s) and doubleLetterRule(s) and noStringRule(s):
            # debug(f"**nice**")
            nice1 += 1
    
    nice2 = 0
    
    for s in raw_data2:
        # debug(f"~~~~~~~~~~~{s}")
        if dupsRule(s) and repeatRule(s):
            # debug(f"**nice**")
            nice2 += 1           
    
    testStar(file, "1", nice1)
    testStar(file, "2", nice2)
 
code(f"{DAY}_test")
code(f"{DAY}")