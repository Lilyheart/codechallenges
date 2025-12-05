import os
import re

os.chdir(os.path.dirname(os.path.abspath(__file__)))

DAY = int(re.search(r"day_(\d+)\.py", os.path.basename(__file__)).group(1))

answers = {
    "test": {
        "1": 2,
        "2": 11
    },
    "actual": {
        "1": 2572,
        "2": 2631
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
    
    dirs = {
        "^": (-1, 0),
        "v": ( 1, 0),
        ">": ( 0, 1),
        "<": ( 0,-1)
    }
    x, y = 0, 0
    visits = {(0, 0)}
    
    # debug(f"{x}, {y}")
    for dir in raw_data:
        x += dirs[dir][0]
        y += dirs[dir][1]
        visits.add((x, y))
        
    # debug(visits)
    
    positions = [[0, 0], [0, 0]]
    visits_2 = {(0, 0)}
    
    for i, dir in enumerate(raw_data):
        pos = positions[i % 2]
        pos[0] += dirs[dir][0]
        pos[1] += dirs[dir][1]
        visits_2.add((pos[0], pos[1]))
    
    testStar(file, "1", len(visits))
    testStar(file, "2", len(visits_2))
 
code(f"{DAY}_test.txt")
code(f"{DAY}.txt")